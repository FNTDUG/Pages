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
  function idFromPath() {
    var p = location.pathname.replace(/\/+$/, '');
    if (p.indexOf(BASE + '/') !== 0) return '';
    return decodeURIComponent(p.slice(BASE.length + 1).split('/')[0]);
  }
  var CHAR = idFromPath();
  if (CHAR) document.documentElement.classList.add('fk-char', 'fk-on');

  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var SE = { atropa: '#ba03fc', bleeding: '#fc030b', poisoned: '#00b506', blindness: '#061f9c', burning: '#ff6200', corrupted: '#c70007', glitched: '#00ff1e', helpless: '#8a8a8a', hallucination: '#8600cf', hemorrhage: '#870005', insanity: '#eeff00', nausea: '#24d13e', oblivious: '#bababa', slowness: '#2d3af7', confused: '#10c784', stunned: '#6e6e6e', subspaced: '#d609bb', weakness: '#8c8c8c', vulnerable: '#8c8c8c', gouged: '#ff0011', hacked: '#00b3ff', invisibility: '#a3a3a3', regeneration: '#11ff00', resistance: '#004cff', speed: '#3baaeb', strength: '#ff7700', undetectable: '#b8b8b8', purified: '#d6bfff', slateskin: '#595959', overheal: '#00ff15', marked: '#ffe600', resonance: '#b8eaff', imprisoned: '#ff0008', disoriented: '#ff0008' };
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  function lvl(v) { v = String(v || '').trim(); return /^\d+$/.test(v) ? (ROMAN[+v] || v) : v; }
  function plain(s) { return String(s || '').replace(/\*\*/g, '').replace(/\u27e6([^|\u27e7]*)\|?([^\u27e7]*)\u27e7/g, function (m, n, l) { return n + (l ? ' ' + lvl(l) : ''); }); }
  function pills(h) {
    return h.replace(/\u27e6([^|\u27e7]*)\|?([^\u27e7]*)\u27e7/g, function (m, n, l) {
      var key = n.toLowerCase(), col = SE[key] || '#cfcfcf', inner = n + (l ? ' <i>' + lvl(l) + '</i>' : '');
      if (data && data.effects && data.effects[key]) return '<button type="button" class="fk-se" data-se="' + esc(key) + '" aria-expanded="false" style="--se:' + col + '">' + inner + '</button>';
      return '<span class="fk-se" style="--se:' + col + '">' + inner + '</span>';
    });
  }
  function c1(c) { return (c.colors && c.colors[0]) || '#333'; }
  function c2(c) { return (c.colors && c.colors[c.colors.length - 1]) || '#000'; }
  function vars(c) { return '--c1:' + esc(c1(c)) + ';--c2:' + esc(c2(c)); }
  function inline(s) { return pills(esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*\*/g, '')); }

  function rich(text) {
    var lines = String(text || '').split('\n'), out = '', depth = 0, para = [];
    function flushPara() { if (para.length) { out += '<p>' + para.join('<br>') + '</p>'; para = []; } }
    function setDepth(d) { while (depth < d) { out += '<ul>'; depth++; } while (depth > d) { out += '</ul>'; depth--; } }
    lines.forEach(function (raw) {
      var l = raw.replace(/\s+$/, '');
      var bullet = /^(\u2022+)\s*(.*)$/.exec(l), stars = bullet ? bullet[1].length : 0, rest = bullet ? bullet[2] : l;
      if (stars > 0) {
        flushPara();
        setDepth(Math.min(stars, 3));
        out += '<li>' + inline(rest) + '</li>';
        return;
      }
      l = rest;
      setDepth(0);
      if (!l.trim()) { flushPara(); return; }
      para.push(inline(l.trim()));
    });
    flushPara();
    setDepth(0);
    return out;
  }

  function get(url) {
    var key = 'fkc:' + url, hit = null;
    try { hit = JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (e) {}
    if (hit && Date.now() - hit.t < 300000) return Promise.resolve(JSON.parse(hit.v));
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (t) {
      var v = t.replace(/,(\s*[\]}])/g, '$1');
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: v })); } catch (e) {}
      return JSON.parse(v);
    });
  }

  function index() {
    data.characters.forEach(function (c) { byId[c.id] = c; });
    CLS.forEach(function (k) { data.characters.forEach(function (c) { if (c.side === 'survivor' && c.cls === k) order.survivor.push(c.id); }); });
    data.characters.forEach(function (c) { if (c.side === 'survivor' && CLS.indexOf(c.cls) < 0) order.survivor.push(c.id); });
    data.characters.forEach(function (c) { if (c.side === 'killer') order.killer.push(c.id); });
  }

  function card(c, i) {
    return '<a class="fk-card" href="' + BASE + '/' + c.id + '" data-id="' + c.id + '" data-side="' + c.side + '" data-google-vignette="false" style="' + vars(c) + ';--i:' + (i || 0) + '">' +
      '<img src="' + esc(c.card || c.image) + '" alt="" width="440" height="550" loading="lazy" decoding="async">' +
      '<span class="fk-card-n">' + esc(c.name) + '</span></a>';
  }

  function groupsFor(tab) { return tab === 'killer' ? ((data && data.killerClasses) || []) : CLS; }
  function catsOf(c) { return c.side === 'killer' ? (c.cats || []) : [c.cls]; }
  function groupTitle(tab, k) { return tab === 'killer' ? k : k + 's'; }

  function renderGrid(anim) {
    var box = gridView.querySelector('.fk-list'), n = 0;
    function deal(c) { return card(c, n++); }
    var groups = groupsFor(st.tab);
    if (st.cls !== 'all' && groups.indexOf(st.cls) < 0) st.cls = 'all';
    Array.prototype.forEach.call(gridView.querySelectorAll('.fk-tab'), function (b) {
      var on = b.getAttribute('data-tab') === st.tab;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    var chips = gridView.querySelector('.fk-chips');
    chips.setAttribute('aria-label', st.tab === 'killer' ? 'Killer type' : 'Survivor class');
    chips.hidden = !groups.length;
    chips.innerHTML = ['all'].concat(groups).map(function (k) {
      return '<button type="button" class="fk-chip fk-btn" data-cls="' + esc(k) + '" aria-pressed="' + (k === st.cls ? 'true' : 'false') + '">' + (k === 'all' ? 'All' : esc(k)) + '</button>';
    }).join('');
    var html = '';
    groups.forEach(function (k) {
      if (st.cls !== 'all' && st.cls !== k) return;
      var list = order[st.tab].map(function (id) { return byId[id]; }).filter(function (c) { return catsOf(c).indexOf(k) >= 0; });
      if (!list.length) return;
      html += '<section class="fk-group" aria-labelledby="fk-g-' + slug(k) + '"><h2 class="fk-cls" id="fk-g-' + slug(k) + '">' + esc(groupTitle(st.tab, k)) + ' <b>' + list.length + '</b></h2>' +
        (data.classes && data.classes[k] ? '<p class="fk-cls-d">' + esc(data.classes[k]) + '</p>' : '') +
        '<div class="fk-cards">' + list.map(deal).join('') + '</div></section>';
    });
    if (!html) html = '<div class="fk-cards">' + order[st.tab].map(function (id) { return deal(byId[id]); }).join('') + '</div>';
    box.innerHTML = html;
    fitNames();
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

  function fitNames() {
    Array.prototype.forEach.call(gridView.querySelectorAll('.fk-card-n'), function (n) {
      n.style.fontSize = '';
      var room = n.parentNode.clientWidth - (parseFloat(getComputedStyle(n).left) || 12) * 2 + 2;
      var w = n.scrollWidth;
      if (room > 0 && w > room) {
        var fs = parseFloat(getComputedStyle(n).fontSize);
        n.style.fontSize = Math.max(10, Math.floor(fs * room / w * 10) / 10) + 'px';
      }
    });
  }
  var fitT = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(fitNames); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!CHAR) fitNames(); });

  function stat(label, val, cls, unit) {
    if (val == null || val === '') return '';
    return '<div class="fk-stat' + (cls ? ' ' + cls : '') + '"><dt>' + esc(label) + '</dt><dd>' + esc(val) + (unit ? '<small>' + esc(unit) + '</small>' : '') + '</dd></div>';
  }

  function stats(c) {
    var terror = c.terror ? String(c.terror).replace(/\s*studs?$/i, '') : '';
    return '<dl class="fk-stats">' +
      stat('Health', c.health, 'fk-stat--hp') +
      stat('Max stamina', c.stamina) +
      stat('Walk speed', c.speed) +
      stat('Sprint speed', c.sprint) +
      stat('Stamina loss', c.staminaLoss, '', '/s') +
      stat('Stamina gain', c.staminaGain, '', '/s') +
      stat('Terror radius', terror, '', terror && /^[\d.]+$/.test(terror) ? 'studs' : '') +
      stat('Cost', c.cost) +
      stat('Difficulty', c.difficulty) +
      stat('Pronouns', c.pronouns, c.terror ? '' : 'fk-stat--wide') +
      '</dl>';
  }

  function isPassive(a) { return /passive/i.test(a.key); }
  function isSub(a) { return / - /.test(a.name); }
  function abId(a) { return 'ab-' + slug(a.name); }

  function slotIcon(a) {
    var img = a.icon ? '<img src="' + esc(a.icon) + '" alt="" width="80" height="80" loading="lazy" decoding="async">' : '';
    if (isPassive(a)) return '<span class="fk-dia">' + img + '</span>';
    return '<span class="fk-circ' + (a.icon ? ' fk-has' : '') + '">' + img + '<span class="fk-cd" aria-hidden="true"></span></span>';
  }

  function loadout(c) {
    var main = c.abilities.filter(function (a) { return !isSub(a); });
    if (!main.length) return '';
    var pas = main.filter(isPassive), act = main.filter(function (a) { return !isPassive(a); });
    return '<div class="fk-load fk-drawn fk-rv" role="list" aria-label="Abilities">' + pas.concat(act).map(function (a) {
      return '<a role="listitem" class="fk-slot" href="#' + abId(a) + '" data-ab="' + abId(a) + '" aria-label="' + esc(a.name) + (isPassive(a) ? ', passive' : '') + (a.cd && !/^n\/?a$/i.test(a.cd) ? ', cooldown ' + esc(a.cd) : '') + '">' + slotIcon(a) + '<span class="fk-slot-l" aria-hidden="true">' + esc(a.name) + '</span></a>';
    }).join('') + '</div>';
  }

  function ability(a, i) {
    var long = (a.desc || '').length > 520;
    var meta = [];
    if (isPassive(a)) meta.push('<b>Passive</b>');
    if (a.cd && !/^n\/?a$/i.test(a.cd)) meta.push('<span>Cooldown:</span> <b>' + esc(a.cd) + '</b>');
    return '<article class="fk-ab fk-drawn fk-rv" id="' + abId(a) + '" style="--i:' + Math.min(i + 6, 14) + '">' +
      '<h3 class="fk-ab-n">' + esc(a.name) + '</h3>' +
      (a.quote ? '<p class="fk-ab-q">' + esc(plain(a.quote)).replace(/\n+/g, '<br>') + '</p>' : '') +
      '<div class="fk-ab-b"><div class="fk-ab-i">' + slotIcon(a) + '</div><div>' +
      (meta.length ? '<p class="fk-ab-meta">' + meta.join('</p><p class="fk-ab-meta">') + '</p>' : '') +
      '<div class="fk-rich' + (long ? ' fk-clip' : '') + '">' + rich(a.desc) + '</div>' +
      (long ? '<button type="button" class="fk-btn fk-more" aria-expanded="false">Show more</button>' : '') +
      '</div></div></article>';
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
    var chips = '<div class="fk-sk-tools" role="group" aria-label="Show skins">' +
      '<button type="button" class="fk-btn" data-sg="all" aria-pressed="true">All <b>' + s.length + '</b></button>' +
      GROUPS.filter(function (g) { return counts[g]; }).map(function (g) { return '<button type="button" class="fk-btn" data-sg="' + g + '" aria-pressed="false">' + g + ' <b>' + counts[g] + '</b></button>'; }).join('') + '</div>';
    var legend = '<div class="fk-legend" aria-hidden="true">' + GROUPS.filter(function (g) { return counts[g]; }).map(function (g) {
      return '<span><i style="background:' + GCOL[g] + '"></i>' + (g === 'Limited' ? 'Limited (no longer sold)' : g === 'Milestone' ? 'Milestone (character level)' : g) + '</span>';
    }).join('') + '</div>';
    root._web = { skins: s, parent: parent, rings: L.rings };
    return '<section class="fk-sec fk-rv" style="--i:8" aria-labelledby="fk-skins-h"><h2 class="fk-h2" id="fk-skins-h">Skins <small>' + s.length + '</small></h2>' + chips +
      '<div class="fk-skins"><div class="fk-webbox fk-drawn">' +
      '<div class="fk-web fk-pre" style="--ns:' + L.ns.toFixed(2) + '%;--fd:' + (L.rings * 210 + 350) + 'ms"><svg class="fk-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + paths + '</svg><div class="fk-fog" aria-hidden="true"></div>' + nodes +
      '<button type="button" class="fk-core" style="' + vars(c) + '" aria-label="Default ' + esc(c.name) + '"><img src="' + esc(c.image) + '" alt="" decoding="async"></button></div></div>' +
      '<div class="fk-pick fk-drawn" aria-live="polite"></div>' +
      '</div>' + legend + '</section>';
  }

  function big(url) { return String(url || '').replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/420'); }

  function pick(c, i) {
    var w = root._web, box = det.querySelector('.fk-pick');
    if (!w || !box) return;
    Array.prototype.forEach.call(det.querySelectorAll('.fk-node'), function (n) { n.setAttribute('aria-pressed', String(+n.getAttribute('data-n') === i)); });
    Array.prototype.forEach.call(det.querySelectorAll('.fk-lines path'), function (p) { p.classList.remove('fk-hot'); });
    if (i < 0) {
      box.innerHTML = '<div class="fk-pick-img" style="' + vars(c) + ';background:linear-gradient(160deg,' + esc(c1(c)) + ',' + esc(c2(c)) + ')"><img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" style="object-fit:cover"></div><div><p class="fk-pick-n">Default</p><p class="fk-pick-how">Comes with ' + esc(c.name) + '</p><p class="fk-pick-cap">Pick a skin in the web to see it here.</p></div>';
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
    var html = '<nav class="fk-nav fk-drawn fk-rv" style="--i:9" aria-label="Forsaken Roster"><div class="fk-nav-h">Forsaken Roster</div>';
    CLS.forEach(function (k) { html += row(k + 's', order.survivor.filter(function (id) { return byId[id].cls === k; })); });
    html += row('Killers', order.killer);
    html += '<div class="fk-pn"><a href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" rel="prev" data-google-vignette="false">&lsaquo; Previous<em>' + esc(prev.name) + '</em></a><a href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" rel="next" data-google-vignette="false">Next &rsaquo;<em>' + esc(next.name) + '</em></a></div></nav>';
    return html;
  }

  function detailHtml(c) {
    var list = order[c.side], i = list.indexOf(c.id);
    var prev = byId[list[(i - 1 + list.length) % list.length]], next = byId[list[(i + 1) % list.length]];
    var side = c.side === 'killer' ? 'Killer' : 'Survivor';
    var tags = '<span class="fk-tag' + (c.side === 'killer' ? ' fk-tag--killer' : '') + '">' + side + '</span>' + (c.side === 'survivor' && c.cls ? '<span class="fk-tag">' + esc(c.cls) + '</span>' : '') + (c.side === 'killer' ? (c.cats || []).map(function (k) { return '<span class="fk-tag">' + esc(k) + '</span>'; }).join('') : '') + (c.cost ? '<span class="fk-tag">' + esc(c.cost) + '</span>' : '');
    var nameArt = c.title ? '<img src="' + esc(c.title) + '" alt="' + esc(c.name) + '" decoding="async">' : '<span>' + esc(c.name) + '</span>';
    var bg = c.bg ? '<div class="fk-bg" aria-hidden="true" style="--fk-map:url(&quot;' + esc(c.bg) + '&quot;)"><i></i><b></b></div>' : '';
    return bg + '<div class="fk-page">' +
      '<div class="fk-top">' +
      '<a class="fk-btn fk-arrow" href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" aria-label="Previous: ' + esc(prev.name) + '" data-google-vignette="false">&lsaquo;</a>' +
      '<span class="fk-count">' + side + ' ' + (i + 1) + ' / ' + list.length + '</span>' +
      '<a class="fk-btn fk-arrow" href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" aria-label="Next: ' + esc(next.name) + '" data-google-vignette="false">&rsaquo;</a>' +
      '<a class="fk-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster" title="Back to the roster" data-google-vignette="false">Roster</a></div>' +
      '<div class="fk-hero" style="' + vars(c) + '">' +
      '<div class="fk-art fk-rv" style="--i:0"><img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" width="900" height="900" decoding="async"><span class="fk-art-glow" aria-hidden="true"></span></div>' +
      '<div class="fk-side">' +
      '<div class="fk-namebox fk-drawn fk-rv" style="--i:1"><div class="fk-name">' + nameArt + '</div><div class="fk-tags">' + tags + '</div>' +
      (c.caption ? '<p class="fk-cap">&ldquo;' + esc(c.caption) + '&rdquo;</p>' : '') + '</div>' +
      '<div class="fk-statbox fk-drawn fk-rv" style="--i:3"><h2 class="fk-box-h">Stats</h2>' + stats(c) + '</div>' +
      '</div></div>' +
      '<section class="fk-sec fk-rv" style="--i:5" aria-labelledby="fk-ov-h"><h2 class="fk-h2" id="fk-ov-h">Overview</h2><div class="fk-ov fk-drawn">' +
      (c.lead ? '<p class="fk-lead">' + inline(c.lead) + '</p>' : '') +
      (c.description ? '<blockquote class="fk-desc">' + esc(plain(c.description)) + '</blockquote>' : '') + '</div></section>' +
      (c.abilities.length ? '<section class="fk-sec" aria-labelledby="fk-ab-h"><h2 class="fk-h2 fk-rv" style="--i:6" id="fk-ab-h">Abilities</h2>' + loadout(c) + '<div class="fk-abs">' + c.abilities.map(ability).join('') + '</div></section>' : '') +
      skinsSection(c) +
      navbox(c) +
      '<p class="fk-src">' + (c.map ? 'Background: ' + esc(c.map) + '. ' : '') + 'Stats, abilities and skins are from the FORSAKEN Wiki on Fandom.</p></div>';
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

  function showDetail(id) {
    var c = byId[id];
    if (!c) { showMissing(id); return; }
    cur = c;
    det.innerHTML = detailHtml(c);
    gridView.hidden = true;
    det.hidden = false;
    headerFor(c);
    pick(c, -1);
    try { det.focus({ preventScroll: true }); } catch (e) {}
    scrollbar();
    var dir = 0;
    try { dir = +sessionStorage.getItem('fk-dir') || 0; sessionStorage.removeItem('fk-dir'); } catch (e) {}
    if (!reduced) { if (dir) unwipe(dir); else det.classList.add('fk-reveal'); }
    startWeb();
  }

  function showMissing(id) {
    cur = null;
    det.innerHTML = '<div class="fk-page"><div class="fk-top"><a class="fk-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster"></a></div><p class="fk-none">There is no character called &ldquo;' + esc(id) + '&rdquo; on the roster.</p></div>';
    gridView.hidden = true;
    det.hidden = false;
    var m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex';
    document.head.appendChild(m);
  }

  var sb = null, sbT = null;
  function sbSync() {
    if (!sb) return;
    var ch = det.clientHeight, sh = det.scrollHeight, th = sb.clientHeight;
    if (sh <= ch + 2) { sb.hidden = true; return; }
    sb.hidden = false;
    var h = Math.max(44, Math.round(th * ch / sh));
    sbT.style.height = h + 'px';
    sbT.style.transform = 'translateY(' + Math.round((th - h) * det.scrollTop / (sh - ch)) + 'px)';
  }
  function scrollbar() {
    if (sb) { sbSync(); return; }
    sb = document.createElement('div');
    sb.className = 'fk-sb';
    sb.setAttribute('aria-hidden', 'true');
    sbT = document.createElement('div');
    sbT.className = 'fk-sb-t';
    sb.appendChild(sbT);
    document.body.appendChild(sb);
    det.addEventListener('scroll', sbSync, { passive: true });
    window.addEventListener('resize', sbSync);
    if ('ResizeObserver' in window) new ResizeObserver(sbSync).observe(det.firstElementChild || det);
    var startY = 0, startTop = 0;
    function ratio() { var th = sb.clientHeight - sbT.offsetHeight; return th > 0 ? (det.scrollHeight - det.clientHeight) / th : 0; }
    sbT.addEventListener('pointerdown', function (e) {
      e.preventDefault(); e.stopPropagation();
      startY = e.clientY; startTop = det.scrollTop;
      sb.classList.add('fk-drag');
      try { sbT.setPointerCapture(e.pointerId); } catch (err) {}
    });
    sbT.addEventListener('pointermove', function (e) { if (sb.classList.contains('fk-drag')) det.scrollTop = startTop + (e.clientY - startY) * ratio(); });
    function end(e) { sb.classList.remove('fk-drag'); try { sbT.releasePointerCapture(e.pointerId); } catch (err) {} }
    sbT.addEventListener('pointerup', end);
    sbT.addEventListener('pointercancel', end);
    sb.addEventListener('pointerdown', function (e) {
      if (e.target !== sb) return;
      var r = sbT.getBoundingClientRect();
      det.scrollBy({ top: (e.clientY < r.top ? -1 : 1) * det.clientHeight * 0.9, behavior: reduced ? 'auto' : 'smooth' });
    });
    sbSync();
    setTimeout(sbSync, 400);
    window.addEventListener('load', sbSync);
  }

  var tearImg = null;
  if (!CHAR) { tearImg = new Image(); tearImg.src = '/forsaken/img/ui-card.webp'; }

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
    o.strokeText(c.name, 12 * dpr, H - 12 * dpr);
    o.fillStyle = '#fff'; o.fillText(c.name, 12 * dpr, H - 12 * dpr);
    if (tearImg && tearImg.complete && tearImg.naturalWidth) { try { o.drawImage(tearImg, 0, 0, W, H); } catch (e) {} }
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
      done();
      setTimeout(function () { if (cv.isConnected) cv.remove(); }, 900);
    }
    requestAnimationFrame(frame);
  }

  function shade(dir, done) {
    if (reduced || !Element.prototype.animate) { done(); return; }
    var w = document.createElement('div');
    w.className = 'fk-wipe';
    document.body.appendChild(w);
    var full = 'polygon(0 0,100% 0,100% 100%,0 100%)', a;
    if (!dir) {
      w.style.clipPath = full;
      a = w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 170, easing: 'ease-in', fill: 'forwards' });
    } else {
      var L = dir < 0;
      var from = L ? 'polygon(100% 0,100% 0,100% 100%,100% 100%)' : 'polygon(0 0,0 0,0 100%,0 100%)';
      var cover = L ? 'polygon(-12% 0,100% 0,100% 100%,0 100%)' : 'polygon(0 0,112% 0,100% 100%,0 100%)';
      a = w.animate([{ clipPath: from }, { clipPath: cover, offset: 0.85 }, { clipPath: full }], { duration: 240, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' });
    }
    a.onfinish = done;
  }

  function unwipe(dir) {
    if (reduced || !Element.prototype.animate) return;
    var w = document.createElement('div');
    w.className = 'fk-wipe';
    w.style.clipPath = 'polygon(0 0,100% 0,100% 100%,0 100%)';
    document.body.appendChild(w);
    var to = dir < 0 ? 'polygon(0 0,0 0,0 100%,0 100%)' : 'polygon(100% 0,100% 0,100% 100%,100% 100%)';
    var b = w.animate([{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }, { clipPath: to }], { duration: 320, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    b.onfinish = function () { w.remove(); };
  }

  function leave(url, dir) {
    if (busy) return;
    busy = true;
    try { if (dir) sessionStorage.setItem('fk-dir', String(dir)); else sessionStorage.removeItem('fk-dir'); } catch (e) {}
    shade(dir, function () { location.assign(url); });
  }

  function step(dir) {
    if (!cur || busy) return;
    var list = order[cur.side], i = list.indexOf(cur.id);
    leave(BASE + '/' + list[(i + dir + list.length) % list.length], dir);
  }

  function toRoster() {
    try { sessionStorage.setItem('fk-restore', '1'); } catch (e) {}
    leave(BASE, 0);
  }

  var fetched = {};
  function prefetch(url, img) {
    [url, img].forEach(function (u) {
      if (!u || fetched[u]) return;
      fetched[u] = 1;
      var l = document.createElement('link');
      l.rel = 'prefetch';
      l.href = u;
      document.head.appendChild(l);
    });
  }
  function warm(e) {
    var a = e.target.closest && e.target.closest('.fk-card, [data-go]');
    if (!a) return;
    var id = a.getAttribute('data-id') || a.getAttribute('data-go'), c = byId[id];
    prefetch(BASE + '/' + id, c && c.image);
  }
  root.addEventListener('pointerover', warm, { passive: true });
  root.addEventListener('focusin', warm);
  root.addEventListener('touchstart', warm, { passive: true });

  gridView.addEventListener('click', function (e) {
    var tab = e.target.closest('.fk-tab');
    if (tab) { if (tab.getAttribute('data-tab') === st.tab) return; st.tab = tab.getAttribute('data-tab'); st.cls = 'all'; renderGrid('tab'); return; }
    var chip = e.target.closest('.fk-chip');
    if (chip) { if (chip.getAttribute('data-cls') === st.cls) return; st.cls = chip.getAttribute('data-cls'); renderGrid('cls'); return; }
    var a = e.target.closest('.fk-card');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || busy) return;
    e.preventDefault();
    var id = a.getAttribute('data-id');
    try { sessionStorage.setItem('fk-ret', JSON.stringify({ tab: st.tab, cls: st.cls, y: window.scrollY })); } catch (err) {}
    busy = true;
    burn(a, function () { busy = false; leave(BASE + '/' + id, 0); });
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

  var tip = null, tipFor = null;
  function hideTip() {
    if (!tip || !tipFor) return;
    tip.classList.remove('fk-tip-on');
    tipFor.setAttribute('aria-expanded', 'false');
    tipFor.removeAttribute('aria-describedby');
    tipFor = null;
  }
  function showTip(btn) {
    var key = btn.getAttribute('data-se'), txt = data && data.effects && data.effects[key];
    if (!txt) return;
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'fk-tip';
      tip.id = 'fk-tip';
      tip.setAttribute('role', 'tooltip');
      document.body.appendChild(tip);
    }
    if (tipFor && tipFor !== btn) tipFor.setAttribute('aria-expanded', 'false');
    tipFor = btn;
    tip.style.setProperty('--se', btn.style.getPropertyValue('--se'));
    tip.innerHTML = '<strong>' + btn.innerHTML.replace(/<\/?i>/g, '') + '</strong>' + esc(txt);
    tip.style.left = '0px'; tip.style.top = '0px';
    var r = btn.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    var x = Math.max(12, Math.min(window.innerWidth - tw - 12, r.left + r.width / 2 - tw / 2));
    var y = r.top - th - 12;
    if (y < 8) y = r.bottom + 12;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-describedby', 'fk-tip');
    tip.classList.add('fk-tip-on');
  }
  det.addEventListener('pointerover', function (e) { var b = e.target.closest('button.fk-se'); if (b && e.pointerType === 'mouse') showTip(b); });
  det.addEventListener('pointerout', function (e) { var b = e.target.closest('button.fk-se'); if (b && b === tipFor && e.pointerType === 'mouse' && !b.contains(e.relatedTarget)) hideTip(); });
  det.addEventListener('focusin', function (e) { var b = e.target.closest('button.fk-se'); if (b) showTip(b); });
  det.addEventListener('focusout', function (e) { if (e.target === tipFor) hideTip(); });
  det.addEventListener('scroll', hideTip, { passive: true });
  window.addEventListener('resize', hideTip);

  det.addEventListener('click', function (e) {
    var back = e.target.closest('[data-back]');
    if (back && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) { e.preventDefault(); toRoster(); return; }
    var go = e.target.closest('[data-go]');
    if (go && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) {
      e.preventDefault();
      var id = go.getAttribute('data-go');
      if (cur && id === cur.id) return;
      var dir = +go.getAttribute('data-dir') || (cur && byId[id].side === cur.side && order[cur.side].indexOf(id) < order[cur.side].indexOf(cur.id) ? -1 : 1);
      leave(BASE + '/' + id, dir);
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
    var se = e.target.closest('button.fk-se');
    if (se) { showTip(se); return; }
    if (tipFor) hideTip();
    var node = e.target.closest('.fk-node');
    if (node) { pick(cur, +node.getAttribute('data-n')); return; }
    if (e.target.closest('.fk-core')) { pick(cur, -1); return; }
    var sg = e.target.closest('[data-sg]');
    if (sg) {
      var g = sg.getAttribute('data-sg');
      Array.prototype.forEach.call(det.querySelectorAll('[data-sg]'), function (b) { b.setAttribute('aria-pressed', String(b === sg)); });
      Array.prototype.forEach.call(det.querySelectorAll('.fk-node'), function (n) { n.classList.toggle('fk-off', g !== 'all' && n.getAttribute('data-g') !== g); });
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!cur || det.hidden) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Escape') { if (tipFor) hideTip(); else toRoster(); }
  });

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    busy = false;
    Array.prototype.forEach.call(document.querySelectorAll('.fk-wipe, .fk-burn'), function (x) { x.remove(); });
    gridView.classList.remove('fk-dim');
    Array.prototype.forEach.call(gridView.querySelectorAll('.fk-burning'), function (x) { x.classList.remove('fk-burning'); x.style.visibility = ''; });
  });

  get(SRC).then(function (d) {
    data = d;
    index();
    if (CHAR) { showDetail(CHAR); return; }
    if (d.gridBg) root.style.setProperty('--fk-grid-bg', 'url("' + d.gridBg + '")');
    gridView.querySelector('.fk-tab[data-tab="survivor"] .fk-tab-n').textContent = order.survivor.length;
    gridView.querySelector('.fk-tab[data-tab="killer"] .fk-tab-n').textContent = order.killer.length;
    var ret = null;
    try { if (sessionStorage.getItem('fk-restore')) ret = JSON.parse(sessionStorage.getItem('fk-ret') || 'null'); sessionStorage.removeItem('fk-restore'); } catch (e) {}
    if (ret) { if (ret.tab === 'killer' || ret.tab === 'survivor') st.tab = ret.tab; if (ret.cls) st.cls = ret.cls; }
    renderGrid();
    if (ret && ret.y) {
      var mine = false, tries = 0;
      var stop = function () { mine = true; };
      ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, stop, { once: true, passive: true }); });
      (function again() {
        if (mine) return;
        if (Math.abs(window.scrollY - ret.y) > 2) window.scrollTo(0, ret.y);
        if (++tries < 14) setTimeout(again, tries < 4 ? 80 : 200);
      })();
    }
  }).catch(function () {
    gridView.querySelector('.fk-list').innerHTML = '<p class="fk-none">The roster could not load. Refresh the page to try again.</p>';
  });
})();
