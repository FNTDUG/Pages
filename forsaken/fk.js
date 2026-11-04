(function () {
  var root = document.getElementById('fk');
  if (!root) return;
  var BASE = root.getAttribute('data-base') || '/forsaken/roster';
  var SRC = root.getAttribute('data-src');
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var gridView = root.querySelector('.fk-grid-view');
  var det = root.querySelector('.fk-detail');
  var data = null, byId = {}, order = { survivor: [], killer: [] };
  var CLS = ['Survivalist', 'Sentinel', 'Support'];
  var st = { tab: 'survivor', cls: 'all', q: '' };
  var cur = null, busy = false, webIO = null;
  var titleEl = null, titleHtml = '', descEl = null, descText = '', docTitle = document.title;

  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var SE = { atropa: '#ba03fc', bleeding: '#fc030b', poisoned: '#00b506', blindness: '#061f9c', burning: '#ff6200', corrupted: '#c70007', glitched: '#00ff1e', helpless: '#8a8a8a', hallucination: '#8600cf', hemorrhage: '#870005', insanity: '#eeff00', nausea: '#24d13e', oblivious: '#bababa', slowness: '#2d3af7', confused: '#10c784', stunned: '#6e6e6e', subspaced: '#d609bb', weakness: '#8c8c8c', vulnerable: '#8c8c8c', gouged: '#ff0011', hacked: '#00b3ff', invisibility: '#a3a3a3', regeneration: '#11ff00', resistance: '#004cff', speed: '#3baaeb', strength: '#ff7700', undetectable: '#b8b8b8', purified: '#d6bfff', slateskin: '#595959', overheal: '#00ff15', marked: '#ffe600', resonance: '#b8eaff', imprisoned: '#ff0008', disoriented: '#ff0008' };
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  function lvl(v) { v = String(v || '').trim(); return /^\d+$/.test(v) ? (ROMAN[+v] || v) : v; }
  function plain(s) { return String(s || '').replace(/\*\*/g, '').replace(/\u27e6([^|\u27e7]*)\|?([^\u27e7]*)\u27e7/g, function (m, n, l) { return n + (l ? ' ' + lvl(l) : ''); }); }
  function pills(h) {
    return h.replace(/\u27e6([^|\u27e7]*)\|?([^\u27e7]*)\u27e7/g, function (m, n, l) {
      var col = SE[n.toLowerCase()] || '#cfcfcf';
      return '<span class="fk-se" style="--se:' + col + '">' + n + (l ? ' <i>' + lvl(l) + '</i>' : '') + '</span>';
    });
  }
  function c1(c) { return (c.colors && c.colors[0]) || '#333'; }
  function c2(c) { return (c.colors && c.colors[c.colors.length - 1]) || '#000'; }
  function vars(c) { return '--c1:' + esc(c1(c)) + ';--c2:' + esc(c2(c)); }
  function inline(s) { return pills(esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')); }

  function rich(text) {
    var lines = String(text || '').split('\n'), out = '', depth = 0, para = [];
    function flushPara() { if (para.length) { out += '<p>' + para.join('<br>') + '</p>'; para = []; } }
    function setDepth(d) { while (depth < d) { out += '<ul>'; depth++; } while (depth > d) { out += '</ul>'; depth--; } }
    lines.forEach(function (raw) {
      var l = raw.replace(/\s+$/, '');
      var bullet = /^(\*+)\s*(.*)$/.exec(l);
      if (bullet && !/^\*\*[^*]+\*\*/.test(l)) {
        flushPara();
        setDepth(Math.min(bullet[1].length, 3));
        out += '<li>' + inline(bullet[2]) + '</li>';
        return;
      }
      setDepth(0);
      if (!l.trim()) { flushPara(); return; }
      para.push(inline(l.trim()));
    });
    flushPara();
    setDepth(0);
    return out;
  }

  function get(url) {
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (t) { return JSON.parse(t.replace(/,(\s*[\]}])/g, '$1')); });
  }

  function index() {
    data.characters.forEach(function (c) { byId[c.id] = c; });
    CLS.forEach(function (k) { data.characters.forEach(function (c) { if (c.side === 'survivor' && c.cls === k) order.survivor.push(c.id); }); });
    data.characters.forEach(function (c) { if (c.side === 'survivor' && CLS.indexOf(c.cls) < 0) order.survivor.push(c.id); });
    data.characters.forEach(function (c) { if (c.side === 'killer') order.killer.push(c.id); });
  }

  function card(c, i) {
    return '<a class="fk-card" href="' + BASE + '/' + c.id + '" data-id="' + c.id + '" data-side="' + c.side + '" data-google-vignette="false" style="' + vars(c) + ';--i:' + (i || 0) + '">' +
      '<img src="' + esc(c.image) + '" alt="" width="300" height="300" loading="lazy" decoding="async">' +
      '<span class="fk-card-n">' + esc(c.name) + '</span></a>';
  }

  function match(c) {
    if (c.side !== st.tab) return false;
    if (st.tab === 'survivor' && st.cls !== 'all' && c.cls !== st.cls) return false;
    if (st.q && c.name.toLowerCase().indexOf(st.q) < 0) return false;
    return true;
  }

  function renderGrid(anim) {
    var box = gridView.querySelector('.fk-list'), n = 0;
    function deal(c) { return card(c, n++); }
    var chips = gridView.querySelector('.fk-chips');
    chips.hidden = st.tab !== 'survivor';
    Array.prototype.forEach.call(gridView.querySelectorAll('.fk-tab'), function (b) {
      var on = b.getAttribute('data-tab') === st.tab;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    Array.prototype.forEach.call(chips.querySelectorAll('.fk-chip'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cls') === st.cls ? 'true' : 'false'); });
    var q = gridView.querySelector('.fk-q');
    q.placeholder = st.tab === 'killer' ? 'Search Killers' : 'Search Survivors';
    var html = '';
    if (st.tab === 'survivor' && !st.q) {
      CLS.forEach(function (k) {
        if (st.cls !== 'all' && st.cls !== k) return;
        var list = order.survivor.map(function (id) { return byId[id]; }).filter(function (c) { return c.cls === k; });
        if (!list.length) return;
        html += '<section class="fk-group" aria-labelledby="fk-g-' + slug(k) + '"><h2 class="fk-cls" id="fk-g-' + slug(k) + '">' + esc(k) + 's <span aria-hidden="true">&middot;</span> ' + list.length + '</h2>' +
          (data.classes && data.classes[k] ? '<p class="fk-cls-d">' + esc(data.classes[k]) + '</p>' : '') +
          '<div class="fk-cards">' + list.map(deal).join('') + '</div></section>';
      });
    } else {
      var list = order[st.tab].map(function (id) { return byId[id]; }).filter(match);
      html = list.length ? '<div class="fk-cards">' + list.map(deal).join('') + '</div>' : '<p class="fk-none">No ' + (st.tab === 'killer' ? 'Killers' : 'Survivors') + ' match &ldquo;' + esc(st.q) + '&rdquo;.</p>';
    }
    box.innerHTML = html;
    if (anim && !reduced) {
      box.classList.remove('fk-deal');
      void box.offsetWidth;
      box.classList.add('fk-deal');
      var pulse = root.querySelector('.fk-pulse');
      if (pulse && anim === 'tab') {
        pulse.className = 'fk-pulse';
        void pulse.offsetWidth;
        pulse.className = 'fk-pulse fk-pulse--' + st.tab;
      }
      clearTimeout(box._t);
      box._t = setTimeout(function () { box.classList.remove('fk-deal'); }, 1400);
    }
  }

  function stat(label, val, extra) {
    if (val == null || val === '') return '';
    return '<tr><th scope="row">' + esc(label) + '</th><td>' + esc(val) + (extra || '') + '</td></tr>';
  }


  function stats(c) {
    return '<table class="fk-stats">' +
      stat('Health', c.health) +
      stat('Walk speed', c.speed) +
      stat('Sprint speed', c.sprint) +
      stat('Stamina', c.stamina) +
      stat('Stamina drain', c.staminaLoss != null ? c.staminaLoss + '/s' : null) +
      stat('Stamina regen', c.staminaGain != null ? c.staminaGain + '/s' : null) +
      stat('Terror radius', c.terror) +
      stat('Cost', c.cost) +
      stat('Difficulty', c.difficulty) +
      stat('Pronouns', c.pronouns) +
      '</table>';
  }

  function isPassive(a) { return /passive/i.test(a.key); }
  function isSub(a) { return / - /.test(a.name); }
  function abId(a) { return 'ab-' + slug(a.name); }
  function keyLabel(a) { return isPassive(a) ? 'Passive' : a.key; }

  function slotIcon(a, big) {
    var img = a.icon ? '<img src="' + esc(a.icon) + '" alt="" width="64" height="64" loading="lazy" decoding="async">' : '';
    if (isPassive(a)) return '<span class="fk-dia">' + img + '</span>';
    return '<span class="fk-circ' + (a.icon ? ' fk-has' : '') + '">' + img + '<span class="fk-cd" aria-hidden="true"></span>' + (a.key ? '<span class="fk-key">' + esc(a.key) + '</span>' : '') + '</span>';
  }

  function loadout(c) {
    var main = c.abilities.filter(function (a) { return !isSub(a); });
    if (!main.length) return '';
    var pas = main.filter(isPassive), act = main.filter(function (a) { return !isPassive(a); });
    return '<div class="fk-load fk-rv" role="list" aria-label="Ability slots">' + pas.concat(act).map(function (a) {
      return '<a role="listitem" class="fk-slot" href="#' + abId(a) + '" data-ab="' + abId(a) + '" aria-label="' + esc(a.name) + ', ' + esc(keyLabel(a)) + (a.cd && a.cd !== 'N/A' ? ', cooldown ' + esc(a.cd) : '') + '">' + slotIcon(a) + '<span class="fk-slot-l" aria-hidden="true">' + esc(a.name) + '</span></a>';
    }).join('') + '</div>';
  }

  function ability(a, i) {
    var long = (a.desc || '').length > 520;
    var kc = isPassive(a) ? '<span class="fk-kc fk-kc--p">Passive</span>' : a.key ? '<span class="fk-kc">' + esc(a.key) + '</span>' : '';
    var cd = a.cd && !/^n\/?a$/i.test(a.cd) ? '<span class="fk-cdp">Cooldown ' + esc(a.cd) + '</span>' : '';
    return '<article class="fk-ab fk-rv" id="' + abId(a) + '" style="--i:' + Math.min(i + 6, 14) + '">' +
      '<div class="fk-ab-i">' + slotIcon(a) + '</div><div>' +
      '<div class="fk-ab-h"><h3 class="fk-ab-n">' + esc(a.name) + '</h3>' + kc + cd + '</div>' +
      (a.quote ? '<p class="fk-ab-q">' + esc(plain(a.quote)).replace(/\n+/g, '<br>') + '</p>' : '') +
      '<div class="fk-rich' + (long ? ' fk-clip' : '') + '">' + rich(a.desc) + '</div>' +
      (long ? '<button type="button" class="fk-more" aria-expanded="false">Show more</button>' : '') +
      '</div></article>';
  }

  var GROUPS = ['Milestone', 'Shop', 'Limited', 'Free'];
  var GCOL = { Milestone: '#ffc500', Shop: '#e6e6e6', Limited: '#ff3355', Free: '#8a8a8a' };

  function skinOrder(c) {
    var s = c.skins.slice();
    var rank = { Free: 0, Milestone: 1, Shop: 2, Limited: 3 };
    s.sort(function (a, b) {
      if (rank[a.group] !== rank[b.group]) return rank[a.group] - rank[b.group];
      if (a.group === 'Milestone') return (a.level || 0) - (b.level || 0);
      if (a.group === 'Shop') return (a.price || 0) - (b.price || 0);
      return 0;
    });
    return s;
  }

  function webLayout(n) {
    var caps = [6, 12, 18, 24, 30, 36], rings = [], left = n, i = 0;
    while (left > 0) { var k = Math.min(caps[Math.min(i, caps.length - 1)], left); rings.push(k); left -= k; i++; }
    if (rings.length > 1 && rings[rings.length - 1] < 4) { rings[rings.length - 2] += rings.pop(); }
    var R = rings.length, ns = 10, minR = 26, maxR = 26, rad = [];
    for (var it = 0; it < 4; it++) {
      minR = R === 1 ? 26 : 8.5 + ns / 2 + 3;
      maxR = R === 1 ? 26 : 49.5 - ns / 2;
      var gap = R === 1 ? 99 : (maxR - minR) / (R - 1), lim = Math.min(11, gap * 0.8);
      rad = rings.map(function (count, ri) { return R === 1 ? minR : minR + gap * ri; });
      rings.forEach(function (count, ri) { lim = Math.min(lim, (2 * Math.PI * rad[ri] / count) * 0.78); });
      ns = lim;
    }
    var pos = [];
    rings.forEach(function (count, ri) {
      var r = rad[ri];
      var off = (ri % 2 ? 0.5 : 0) * (Math.PI * 2 / count) - Math.PI / 2;
      for (var j = 0; j < count; j++) {
        var a = off + j / count * Math.PI * 2;
        pos.push({ x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, a: a, ring: ri + 1, k: j });
      }
    });
    return { pos: pos, rings: R, ns: ns };
  }

  function angDist(a, b) { var d = Math.abs(a - b) % (Math.PI * 2); return d > Math.PI ? Math.PI * 2 - d : d; }

  function skinsSection(c) {
    if (!c.skins || !c.skins.length) return '';
    var s = skinOrder(c), L = webLayout(s.length), counts = {};
    s.forEach(function (k) { counts[k.group] = (counts[k.group] || 0) + 1; });
    var parent = [];
    var paths = '';
    L.pos.forEach(function (p, i) {
      var px = 50, py = 50, best = -1;
      if (p.ring > 1) {
        var bd = 9;
        L.pos.forEach(function (q, j) { if (q.ring === p.ring - 1) { var d = angDist(q.a, p.a); if (d < bd) { bd = d; best = j; } } });
        px = L.pos[best].x; py = L.pos[best].y;
      }
      parent.push(best);
      var mx = (px + p.x) / 2 + (p.y - py) * 0.08, my = (py + p.y) / 2 - (p.x - px) * 0.08;
      var len = Math.ceil(Math.sqrt((p.x - px) * (p.x - px) + (p.y - py) * (p.y - py)) + 2);
      paths += '<path data-n="' + i + '" d="M' + px.toFixed(2) + ' ' + py.toFixed(2) + 'Q' + mx.toFixed(2) + ' ' + my.toFixed(2) + ' ' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + '" style="--len:' + len + ';--r:' + p.ring + '"/>';
    });
    var nodes = s.map(function (k, i) {
      var p = L.pos[i];
      return '<button type="button" class="fk-node' + (k.group === 'Limited' ? ' fk-taken' : '') + '" data-n="' + i + '" data-g="' + k.group + '" aria-pressed="false" aria-label="' + esc(k.name) + ' (' + esc(k.how || k.group) + ')" style="left:' + p.x.toFixed(2) + '%;top:' + p.y.toFixed(2) + '%;--r:' + p.ring + ';--k:' + p.k + '"><i></i><b>' +
        (k.img ? '<img data-src="' + esc(k.img) + '" alt="" referrerpolicy="no-referrer" decoding="async">' : '') + '</b></button>';
    }).join('');
    var chips = '<div class="fk-chips" role="group" aria-label="Show skins">' +
      '<button type="button" class="fk-chip" data-sg="all" aria-pressed="true">All<b>' + s.length + '</b></button>' +
      GROUPS.filter(function (g) { return counts[g]; }).map(function (g) { return '<button type="button" class="fk-chip" data-sg="' + g + '" aria-pressed="false">' + g + '<b>' + counts[g] + '</b></button>'; }).join('') + '</div>';
    var legend = '<div class="fk-legend" aria-hidden="true">' + GROUPS.filter(function (g) { return counts[g]; }).map(function (g) {
      return '<span><i style="background:' + GCOL[g] + '"></i>' + (g === 'Limited' ? 'Limited (no longer sold)' : g === 'Milestone' ? 'Milestone (character level)' : g) + '</span>';
    }).join('') + '</div>';
    var rows = s.map(function (k, i) {
      return '<tr data-g="' + k.group + '"><td>' + (k.img ? '<img data-src="' + esc(k.img) + '" alt="" referrerpolicy="no-referrer" width="44" height="44" decoding="async">' : '') + '</td><td><b>' + esc(k.name) + '</b></td><td>' + esc(k.group) + '</td><td>' + esc(k.how || '?') + '</td></tr>';
    }).join('');
    root._web = { skins: s, parent: parent, rings: L.rings };
    return '<section class="fk-sec fk-rv" style="--i:8" aria-labelledby="fk-skins-h"><h2 class="fk-h2" id="fk-skins-h">Skins <small>' + s.length + ' skins</small></h2>' +
      '<div class="fk-sk-tools">' + chips + '<div class="fk-views" role="group" aria-label="Skin view"><button type="button" class="fk-view" data-v="web" aria-pressed="true">Web</button><button type="button" class="fk-view" data-v="list" aria-pressed="false">List</button></div></div>' +
      '<div class="fk-skins">' +
      '<div class="fk-web fk-pre" style="--ns:' + L.ns.toFixed(2) + '%;--fd:' + (L.rings * 210 + 350) + 'ms"><svg class="fk-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + paths + '</svg><div class="fk-fog" aria-hidden="true"></div>' + nodes +
      '<button type="button" class="fk-core" style="' + vars(c) + '" aria-label="Default ' + esc(c.name) + '"><img src="' + esc(c.image) + '" alt="" decoding="async"></button></div>' +
      '<div class="fk-pick" aria-live="polite"></div>' +
      '<div class="fk-sk-list" hidden><table class="fk-sk-table"><thead><tr><th scope="col"><span class="fk-sr">Picture</span></th><th scope="col">Skin</th><th scope="col">Type</th><th scope="col">How to get</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '</div>' + legend + '</section>';
  }

  function big(url) { return String(url || '').replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/420'); }

  function pick(c, i) {
    var w = root._web, box = det.querySelector('.fk-pick');
    if (!w || !box) return;
    Array.prototype.forEach.call(det.querySelectorAll('.fk-node'), function (n) { n.setAttribute('aria-pressed', String(+n.getAttribute('data-n') === i)); });
    Array.prototype.forEach.call(det.querySelectorAll('.fk-lines path'), function (p) { p.classList.remove('fk-hot'); });
    if (i < 0) {
      box.innerHTML = '<div class="fk-pick-img" style="' + vars(c) + ';background:linear-gradient(160deg,' + esc(c1(c)) + ',' + esc(c2(c)) + ')"><img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" style="object-fit:cover"></div><div><p class="fk-pick-n">Default</p><p class="fk-pick-how">Comes with ' + esc(c.name) + '</p><p class="fk-pick-cap">Pick a node in the web to see a skin.</p></div>';
      return;
    }
    var k = w.skins[i];
    for (var n = i; n >= 0; n = w.parent[n]) { var p = det.querySelector('.fk-lines path[data-n="' + n + '"]'); if (p) p.classList.add('fk-hot'); }
    box.innerHTML = '<div class="fk-pick-img">' + (k.img ? '<img src="' + esc(big(k.img)) + '" alt="' + esc(k.name) + ' skin" referrerpolicy="no-referrer">' : '') + '</div><div><p class="fk-pick-n">' + esc(k.name) + '</p><p class="fk-pick-how" data-g="' + k.group + '">' + esc(k.group) + (k.how && k.how !== k.group ? ' &middot; ' + esc(k.how) : '') + '</p>' + (k.caption ? '<p class="fk-pick-cap">&ldquo;' + esc(k.caption) + '&rdquo;</p>' : '') + '</div>';
  }

  function navbox(c) {
    function row(label, ids) {
      return '<div class="fk-nav-r"><div class="fk-nav-k">' + esc(label) + '</div><div class="fk-nav-v">' + ids.map(function (id) {
        var x = byId[id];
        return '<a href="' + BASE + '/' + id + '" data-go="' + id + '" data-google-vignette="false"' + (id === c.id ? ' aria-current="page"' : '') + '>' + esc(x.name) + '</a>';
      }).join('<span aria-hidden="true">&middot;</span>') + '</div></div>';
    }
    var list = order[c.side], i = list.indexOf(c.id);
    var prev = byId[list[(i - 1 + list.length) % list.length]], next = byId[list[(i + 1) % list.length]];
    var html = '<nav class="fk-nav fk-rv" style="--i:9" aria-label="Forsaken Roster"><div class="fk-nav-h">Forsaken Roster</div>';
    CLS.forEach(function (k) { html += row(k + 's', order.survivor.filter(function (id) { return byId[id].cls === k; })); });
    html += row('Killers', order.killer);
    html += '<div class="fk-pn"><a href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" rel="prev" data-google-vignette="false">&lsaquo; Previous<em>' + esc(prev.name) + '</em></a><a href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" rel="next" data-google-vignette="false">Next &rsaquo;<em>' + esc(next.name) + '</em></a></div></nav>';
    return html;
  }

  function detailHtml(c) {
    var list = order[c.side], i = list.indexOf(c.id);
    var prev = byId[list[(i - 1 + list.length) % list.length]], next = byId[list[(i + 1) % list.length]];
    var side = c.side === 'killer' ? 'Killer' : 'Survivor';
    var tags = '<span class="fk-tag' + (c.side === 'killer' ? ' fk-tag--killer' : '') + '">' + side + '</span>' + (c.side === 'survivor' && c.cls ? '<span class="fk-tag">' + esc(c.cls) + '</span>' : '') + (c.cost ? '<span class="fk-tag">' + esc(c.cost) + '</span>' : '');
    var nameArt = c.title ? '<img src="' + esc(c.title) + '" alt="' + esc(c.name) + '" decoding="async">' : '<span>' + esc(c.name) + '</span>';
    return '<div class="fk-top"><a class="fk-back" href="' + BASE + '" data-back="1" data-google-vignette="false"><span aria-hidden="true">&lsaquo;</span> Roster</a>' +
      '<span class="fk-count">' + side + ' ' + (i + 1) + ' / ' + list.length + '</span>' +
      '<a class="fk-arrow" href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" aria-label="Previous: ' + esc(prev.name) + '" data-google-vignette="false">&lsaquo;</a>' +
      '<a class="fk-arrow" href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" aria-label="Next: ' + esc(next.name) + '" data-google-vignette="false">&rsaquo;</a></div>' +
      '<div class="fk-hero" style="' + vars(c) + '">' +
      '<div class="fk-art fk-rv" style="--i:0"><img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" width="900" height="900" decoding="async"><span class="fk-art-glow" aria-hidden="true"></span></div>' +
      '<div class="fk-side">' +
      '<div class="fk-name fk-rv" style="--i:1">' + nameArt + '</div>' +
      '<div class="fk-tags fk-rv" style="--i:2">' + tags + '</div>' +
      (c.caption ? '<p class="fk-cap fk-rv" style="--i:3">&ldquo;' + esc(c.caption) + '&rdquo;</p>' : '') +
      '<div class="fk-box fk-rv" style="--i:4"><h2 class="fk-box-h">Stats</h2>' + stats(c) + '</div>' +
      '</div></div>' +
      '<section class="fk-sec fk-rv" style="--i:5" aria-labelledby="fk-ov-h"><h2 class="fk-h2" id="fk-ov-h">Overview</h2>' +
      (c.lead ? '<p class="fk-lead">' + inline(c.lead) + '</p>' : '') +
      (c.description ? '<blockquote class="fk-desc">' + esc(plain(c.description)) + '</blockquote>' : '') + '</section>' +
      (c.abilities.length ? '<section class="fk-sec" aria-labelledby="fk-ab-h"><h2 class="fk-h2 fk-rv" style="--i:6" id="fk-ab-h">Abilities <small>' + c.abilities.length + '</small></h2>' + loadout(c) + '<div class="fk-abs">' + c.abilities.map(ability).join('') + '</div></section>' : '') +
      skinsSection(c) +
      navbox(c) +
      '<p class="fk-src">Stats, abilities and skins are from the FORSAKEN Wiki on Fandom.</p>';
  }

  function headerFor(c) {
    if (!titleEl) {
      titleEl = document.querySelector('.ug-page-title');
      descEl = document.querySelector('.ug-page-desc');
      if (titleEl) titleHtml = titleEl.innerHTML;
      if (descEl) descText = descEl.textContent;
    }
    if (c) {
      document.title = c.name + ' | Forsaken Roster | FNTD User Guide';
      if (titleEl) {
        if (titleEl.querySelector('.ov-hl')) {
          var w = c.name.split(' '), last = w.pop();
          titleEl.innerHTML = (w.length ? esc(w.join(' ')) + ' ' : '') + '<span class="ov-hl"><span class="ov-hl-bg"></span>' + esc(last) + '</span>';
        } else titleEl.textContent = c.name;
      }
      if (descEl) {
        var t = plain(c.lead), cut = t.indexOf('. ', 120);
        descEl.textContent = cut > 0 && t.length > 240 ? t.slice(0, cut + 1) : t;
      }
    } else {
      document.title = docTitle;
      if (titleEl) titleEl.innerHTML = titleHtml;
      if (descEl) descEl.textContent = descText;
    }
  }

  function startWeb() {
    var web = det.querySelector('.fk-web');
    if (!web) return;
    function load(el) { Array.prototype.forEach.call(el.querySelectorAll('img[data-src]'), function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }); }
    function go() {
      load(web);
      if (reduced) { web.classList.remove('fk-pre'); web.classList.add('fk-done'); return; }
      web.classList.add('fk-go');
      web.classList.remove('fk-pre');
      var t = (root._web.rings * 210 + 350) + 1700;
      setTimeout(function () { if (web.isConnected) { web.classList.remove('fk-go'); web.classList.add('fk-done'); } }, t);
    }
    if (webIO) webIO.disconnect();
    if (!('IntersectionObserver' in window)) { go(); return; }
    webIO = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { webIO.disconnect(); webIO = null; go(); }
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0.2 });
    webIO.observe(web);
  }

  function showDetail(id, mode) {
    var c = byId[id];
    if (!c) { showMissing(id); return; }
    cur = c;
    det.innerHTML = '<div class="fk-page">' + detailHtml(c) + '</div>';
    det.classList.remove('fk-reveal');
    gridView.inert = true;
    gridView.setAttribute('aria-hidden', 'true');
    det.hidden = false;
    document.documentElement.classList.add('fk-on');
    headerFor(c);
    pick(c, -1);
    det.scrollTop = 0;
    try { det.focus({ preventScroll: true }); } catch (e) {}
    if (!reduced && mode !== 'quiet') { void det.offsetWidth; det.classList.add('fk-reveal'); }
    startWeb();
  }

  function showMissing(id) {
    cur = null;
    det.innerHTML = '<div class="fk-page"><div class="fk-top"><a class="fk-back" href="' + BASE + '" data-back="1"><span aria-hidden="true">&lsaquo;</span> Roster</a></div><p class="fk-none">There is no character called &ldquo;' + esc(id) + '&rdquo; on the roster.</p></div>';
    gridView.inert = true;
    gridView.setAttribute('aria-hidden', 'true');
    det.hidden = false;
    document.documentElement.classList.add('fk-on');
    var m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex';
    document.head.appendChild(m);
  }

  function showGrid() {
    if (document.documentElement.classList.contains('fk-char')) { location.href = BASE; return; }
    cur = null;
    if (webIO) { webIO.disconnect(); webIO = null; }
    det.hidden = true;
    det.innerHTML = '';
    gridView.inert = false;
    gridView.removeAttribute('aria-hidden');
    document.documentElement.classList.remove('fk-on');
    headerFor(null);
  }

  function idFromPath() {
    var p = location.pathname.replace(/\/+$/, '');
    if (p.indexOf(BASE + '/') !== 0) return '';
    return decodeURIComponent(p.slice(BASE.length + 1).split('/')[0]);
  }

  function depth() { return (history.state && history.state.fkn) || 0; }

  function push(id) {
    var n = depth() + 1;
    history.pushState({ fk: id, fkn: n }, '', BASE + '/' + id);
  }

  function burn(cardEl, done) {
    var img = cardEl.querySelector('img');
    var c = byId[cardEl.getAttribute('data-id')];
    var r = cardEl.getBoundingClientRect();
    if (reduced || !img || !img.complete || !img.naturalWidth || r.width < 20) { done(); return; }
    var dpr = Math.min(1.5, window.devicePixelRatio || 1);
    var pad = 70, W = Math.round(r.width * dpr), H = Math.round(r.height * dpr), P = Math.round(pad * dpr);
    var cv = document.createElement('canvas');
    cv.className = 'fk-burn';
    cv.width = W; cv.height = H + P;
    cv.style.cssText = 'left:' + r.left + 'px;top:' + (r.top - pad) + 'px;width:' + r.width + 'px;height:' + (r.height + pad) + 'px';
    var ctx = cv.getContext('2d');
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var o = off.getContext('2d');
    var g = o.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, c1(c)); g.addColorStop(1, c2(c));
    o.fillStyle = g; o.fillRect(0, 0, W, H);
    var iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(W / iw, H / ih), dw = iw * s, dh = ih * s;
    try { o.drawImage(img, (W - dw) / 2, (H - dh) * 0.22, dw, dh); } catch (e) { done(); return; }
    var sh = o.createLinearGradient(0, 0, 0, H);
    sh.addColorStop(0.52, 'rgba(0,0,0,0)'); sh.addColorStop(0.78, 'rgba(0,0,0,.55)'); sh.addColorStop(1, 'rgba(0,0,0,.85)');
    o.fillStyle = sh; o.fillRect(0, 0, W, H);
    var nameEl = cardEl.querySelector('.fk-card-n'), fs = parseFloat(getComputedStyle(nameEl).fontSize) * dpr;
    o.font = '800 ' + fs + 'px "Rubik", system-ui, sans-serif';
    o.textBaseline = 'alphabetic';
    o.lineJoin = 'round';
    o.lineWidth = 4 * dpr; o.strokeStyle = '#000';
    o.strokeText(c.name, 10 * dpr, H - 9 * dpr);
    o.fillStyle = '#fff'; o.fillText(c.name, 10 * dpr, H - 9 * dpr);
    o.strokeStyle = '#fff'; o.lineWidth = 2.2 * dpr; o.strokeRect(4 * dpr, 4 * dpr, W - 8 * dpr, H - 8 * dpr);
    var base;
    try { base = o.getImageData(0, 0, W, H).data; } catch (e) { done(); return; }
    var GS = 6 * dpr, gw = Math.ceil(W / GS) + 2, gh = Math.ceil(H / GS) + 2, grid = new Float32Array(gw * gh);
    for (var q = 0; q < grid.length; q++) grid[q] = Math.random();
    var GS2 = 22 * dpr, gw2 = Math.ceil(W / GS2) + 2, grid2 = new Float32Array(gw2 * (Math.ceil(H / GS2) + 2));
    for (q = 0; q < grid2.length; q++) grid2[q] = Math.random();
    var field = new Float32Array(W * H);
    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var gx = x / GS, gy = y / GS, ix = gx | 0, iy = gy | 0, fx = gx - ix, fy = gy - iy;
        fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
        var a0 = grid[iy * gw + ix], a1 = grid[iy * gw + ix + 1], b0 = grid[(iy + 1) * gw + ix], b1 = grid[(iy + 1) * gw + ix + 1];
        var nz = (a0 + (a1 - a0) * fx) + ((b0 + (b1 - b0) * fx) - (a0 + (a1 - a0) * fx)) * fy;
        var gx2 = x / GS2, gy2 = y / GS2, jx = gx2 | 0, jy = gy2 | 0, hx = gx2 - jx, hy = gy2 - jy;
        hx = hx * hx * (3 - 2 * hx); hy = hy * hy * (3 - 2 * hy);
        var c0 = grid2[jy * gw2 + jx], c1v = grid2[jy * gw2 + jx + 1], d0 = grid2[(jy + 1) * gw2 + jx], d1 = grid2[(jy + 1) * gw2 + jx + 1];
        var nz2 = (c0 + (c1v - c0) * hx) + ((d0 + (d1 - d0) * hx) - (c0 + (c1v - c0) * hx)) * hy;
        var edge = Math.min(x, W - x) / (W / 2);
        field[y * W + x] = (1 - y / H) * 0.6 + edge * 0.1 + nz2 * 0.2 + nz * 0.1;
      }
    }
    var out = ctx.createImageData(W, H), px = out.data;
    var parts = [], t0 = 0, DUR = 680, last = 0;
    cardEl.classList.add('fk-burning');
    document.body.appendChild(cv);
    cardEl.style.visibility = 'hidden';
    gridView.classList.add('fk-dim');
    function frame(now) {
      if (!t0) { t0 = now; last = now; }
      var k = Math.min(1, (now - t0) / DUR), dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      var th = -0.04 + k * (0.55 + 0.5 * k);
      for (var i = 0, j = 0; i < field.length; i++, j += 4) {
        var d = field[i] - th;
        if (d < 0) { px[j + 3] = 0; continue; }
        if (d < 0.03) {
          var e = d / 0.03;
          px[j] = 255; px[j + 1] = e < 0.35 ? 236 : e < 0.7 ? 140 : 70; px[j + 2] = e < 0.35 ? 160 : e < 0.7 ? 36 : 12; px[j + 3] = 255;
          continue;
        }
        var f = d < 0.14 ? 0.15 + 0.85 * Math.pow((d - 0.03) / 0.11, 0.7) : 1;
        px[j] = base[j] * f; px[j + 1] = base[j + 1] * f; px[j + 2] = base[j + 2] * f; px[j + 3] = base[j + 3];
      }
      ctx.clearRect(0, 0, W, H + P);
      ctx.putImageData(out, 0, P);
      for (var sp = 0; sp < 40 && k < 0.97; sp++) {
        var rx = (Math.random() * W) | 0, ry = (Math.random() * H) | 0, dd = field[ry * W + rx] - th;
        if (dd > -0.01 && dd < 0.035) parts.push({ x: rx, y: ry + P, vx: (Math.random() - 0.5) * 30 * dpr, vy: -(40 + Math.random() * 70) * dpr, life: 0.5 + Math.random() * 0.5, age: 0, r: (0.8 + Math.random() * 1.6) * dpr });
      }
      ctx.globalCompositeOperation = 'lighter';
      for (var pi = parts.length - 1; pi >= 0; pi--) {
        var pt = parts[pi];
        pt.age += dt; pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy *= 0.985;
        if (pt.age >= pt.life) { parts.splice(pi, 1); continue; }
        var al = (1 - pt.age / pt.life) * (0.6 + Math.random() * 0.4);
        ctx.fillStyle = 'rgba(255,' + (120 + ((Math.random() * 90) | 0)) + ',40,' + al.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, 6.283); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      if (k < 1 || parts.length) { requestAnimationFrame(frame); if (k >= 1 && !cv._fired) { cv._fired = 1; finish(); } return; }
      if (!cv._fired) finish();
      cv.remove();
    }
    function finish() {
      cardEl.style.visibility = '';
      cardEl.classList.remove('fk-burning');
      gridView.classList.remove('fk-dim');
      done();
      setTimeout(function () { if (cv.isConnected) cv.remove(); }, 900);
    }
    requestAnimationFrame(frame);
  }

  function wipe(dir, mid) {
    if (reduced || !Element.prototype.animate) { mid(); return; }
    var w = document.createElement('div');
    w.className = 'fk-wipe';
    document.body.appendChild(w);
    var L = dir < 0;
    var from = L ? 'polygon(100% 0,100% 0,100% 100%,100% 100%)' : 'polygon(0 0,0 0,0 100%,0 100%)';
    var full = 'polygon(0 0,100% 0,100% 100%,0 100%)';
    var to = L ? 'polygon(0 0,0 0,0 100%,0 100%)' : 'polygon(100% 0,100% 0,100% 100%,100% 100%)';
    var cover = L ? 'polygon(-12% 0,100% 0,100% 100%,0 100%)' : 'polygon(0 0,112% 0,100% 100%,0 100%)';
    var a = w.animate([{ clipPath: from }, { clipPath: cover, offset: 0.85 }, { clipPath: full }], { duration: 230, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' });
    a.onfinish = function () {
      mid();
      var b = w.animate([{ clipPath: full }, { clipPath: to }], { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
      b.onfinish = function () { w.remove(); };
    };
  }

  function step(dir) {
    if (!cur || busy) return;
    var list = order[cur.side], i = list.indexOf(cur.id);
    var id = list[(i + dir + list.length) % list.length];
    goTo(id, dir);
  }

  function goTo(id, dir) {
    if (busy) return;
    busy = true;
    wipe(dir || 1, function () { push(id); showDetail(id, 'quiet'); busy = false; });
  }

  function backToGrid() {
    if (document.documentElement.classList.contains('fk-char')) { location.href = BASE; return; }
    var n = depth();
    if (n > 0) { history.go(-n); return; }
    history.pushState({ fkn: 0 }, '', BASE);
    showGrid();
    renderGrid();
  }

  gridView.addEventListener('click', function (e) {
    var tab = e.target.closest('.fk-tab');
    if (tab) { if (tab.getAttribute('data-tab') === st.tab) return; st.tab = tab.getAttribute('data-tab'); st.cls = 'all'; renderGrid('tab'); return; }
    var chip = e.target.closest('.fk-chip');
    if (chip) { if (chip.getAttribute('data-cls') === st.cls) return; st.cls = chip.getAttribute('data-cls'); renderGrid('cls'); return; }
    var a = e.target.closest('.fk-card');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || busy) return;
    e.preventDefault();
    busy = true;
    var id = a.getAttribute('data-id');
    burn(a, function () { push(id); showDetail(id); busy = false; });
  });

  gridView.addEventListener('keydown', function (e) {
    var tab = e.target.closest('.fk-tab');
    if (!tab || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    st.tab = st.tab === 'survivor' ? 'killer' : 'survivor';
    st.cls = 'all';
    renderGrid('tab');
    gridView.querySelector('.fk-tab[data-tab="' + st.tab + '"]').focus();
  });

  gridView.addEventListener('input', function (e) {
    if (!e.target.classList.contains('fk-q')) return;
    st.q = e.target.value.trim().toLowerCase();
    renderGrid();
  });

  det.addEventListener('click', function (e) {
    var back = e.target.closest('[data-back]');
    if (back && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) { e.preventDefault(); backToGrid(); return; }
    var go = e.target.closest('[data-go]');
    if (go && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) {
      e.preventDefault();
      var id = go.getAttribute('data-go');
      if (cur && id === cur.id) return;
      var dir = +go.getAttribute('data-dir') || (cur && order[byId[id].side].indexOf(id) < order[cur.side].indexOf(cur.id) ? -1 : 1);
      goTo(id, dir);
      return;
    }
    var slot = e.target.closest('.fk-slot');
    if (slot) {
      e.preventDefault();
      var t = document.getElementById(slot.getAttribute('data-ab'));
      if (t) {
        t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        Array.prototype.forEach.call(det.querySelectorAll('.fk-ab'), function (x) { x.classList.toggle('fk-on', x === t); });
      }
      return;
    }
    var more = e.target.closest('.fk-more');
    if (more) {
      var r = more.previousElementSibling, open = more.getAttribute('aria-expanded') === 'true';
      r.classList.toggle('fk-clip', open);
      more.setAttribute('aria-expanded', String(!open));
      more.textContent = open ? 'Show more' : 'Show less';
      return;
    }
    var node = e.target.closest('.fk-node');
    if (node) { pick(cur, +node.getAttribute('data-n')); return; }
    if (e.target.closest('.fk-core')) { pick(cur, -1); return; }
    var sg = e.target.closest('[data-sg]');
    if (sg) {
      var g = sg.getAttribute('data-sg');
      Array.prototype.forEach.call(det.querySelectorAll('[data-sg]'), function (b) { b.setAttribute('aria-pressed', String(b === sg)); });
      Array.prototype.forEach.call(det.querySelectorAll('.fk-node, .fk-sk-table tbody tr'), function (n) { n.classList.toggle('fk-off', g !== 'all' && n.getAttribute('data-g') !== g); });
      return;
    }
    var v = e.target.closest('.fk-view');
    if (v) {
      var list = v.getAttribute('data-v') === 'list';
      Array.prototype.forEach.call(det.querySelectorAll('.fk-view'), function (b) { b.setAttribute('aria-pressed', String(b === v)); });
      det.querySelector('.fk-web').hidden = list;
      det.querySelector('.fk-pick').hidden = list;
      var tbl = det.querySelector('.fk-sk-list');
      tbl.hidden = !list;
      det.querySelector('.fk-skins').style.gridTemplateColumns = list ? 'minmax(0,1fr)' : '';
      if (list) Array.prototype.forEach.call(tbl.querySelectorAll('img[data-src]'), function (im) { im.loading = 'lazy'; im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!cur || det.hidden) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Escape') { backToGrid(); }
  });

  window.addEventListener('popstate', function () {
    if (!data) return;
    var id = idFromPath();
    if (id) { if (!cur || cur.id !== id) showDetail(id, 'quiet'); }
    else if (cur || det.hidden === false) { showGrid(); }
  });

  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  get(SRC).then(function (d) {
    data = d;
    index();
    gridView.querySelector('.fk-tab[data-tab="survivor"] .fk-tab-n').textContent = order.survivor.length;
    gridView.querySelector('.fk-tab[data-tab="killer"] .fk-tab-n').textContent = order.killer.length;
    renderGrid();
    var id = idFromPath();
    if (id) {
      if (byId[id]) st.tab = byId[id].side;
      renderGrid();
      history.replaceState({ fk: id, fkn: 0 }, '', location.pathname);
      showDetail(id);
    } else {
      history.replaceState({ fkn: 0 }, '', location.pathname + location.search);
    }
  }).catch(function () {
    gridView.querySelector('.fk-list').innerHTML = '<p class="fk-none">The roster could not load. Refresh the page to try again.</p>';
  });
})();
