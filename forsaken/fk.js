(function () {
  var root = document.getElementById('fk');
  if (!root) return;
  var BASE = root.getAttribute('data-base') || '/forsaken/roster';
  var SRC = root.getAttribute('data-src');
  var MEDIA = root.getAttribute('data-media') || '';
  function media(k) { return /^(https?:)?\/\//.test(k) || !k ? k : MEDIA + k; }
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
  var FROM = null;
  if (CHAR) {
    try {
      var hs = history.state && history.state.fkFrom ? { fkFrom: history.state.fkFrom, fkHops: history.state.fkHops || 0 } : null;
      var carried = sessionStorage.getItem('fk-from');
      sessionStorage.removeItem('fk-from');
      if (carried) hs = JSON.parse(carried);
      else if (!hs && document.referrer) {
        var rf = new URL(document.referrer);
        if (rf.origin === location.origin && /^\/forsaken\/(tierlist|meta-comps)(\.html)?\/?$/.test(rf.pathname)) hs = { fkFrom: rf.pathname + rf.search, fkHops: 0 };
      }
      if (hs && /^\/forsaken\/(tierlist|meta-comps)/.test(hs.fkFrom)) {
        FROM = hs;
        var stt0 = history.state && typeof history.state === 'object' ? history.state : {};
        var ns = {};
        for (var sk in stt0) ns[sk] = stt0[sk];
        ns.fkFrom = hs.fkFrom;
        ns.fkHops = hs.fkHops;
        history.replaceState(ns, '');
      }
    } catch (e) { FROM = null; }
  }
  var BACK_NAME = FROM ? (/meta-comps/.test(FROM.fkFrom) ? 'Meta Comps' : 'Tierlists & Maps') : 'The Forsaken';
  var BACK_HREF = FROM ? FROM.fkFrom : '';

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
    var G = data.groups || {};
    [['survivor', CLS], ['killer', data.killerClasses || []]].forEach(function (pair) {
      pair[1].forEach(function (k) { (G[k] || []).forEach(function (id) { if (byId[id] && byId[id].side === pair[0] && order[pair[0]].indexOf(id) < 0) order[pair[0]].push(id); }); });
      data.characters.forEach(function (c) { if (c.side === pair[0] && order[pair[0]].indexOf(c.id) < 0) order[pair[0]].push(c.id); });
    });
  }

  function card(c, i) {
    var nc = catsOf(c).length, multi = nc > 1;
    return '<a class="fk-card' + (multi ? ' fk-multi' : '') + '" href="' + BASE + '/' + c.id + '" data-id="' + c.id + '" data-side="' + c.side + '" data-google-vignette="false" style="' + vars(c) + ';--i:' + (i || 0) + '">' +
      '<img src="' + esc(c.card || c.image) + '"' + (c.cards ? ' srcset="' + c.cards.map(function (w) { return 'https://forsaken.fntduserguide.com/img/card/' + c.id + '-' + w + '.webp ' + w + 'w'; }).join(', ') + '" sizes="(max-width: 600px) 31vw, 200px"' : '') + ' alt="" crossorigin="anonymous" width="440" height="550" loading="lazy" decoding="async">' +
      '<span class="fk-mo" aria-hidden="true"></span>' + (nc ? '<img class="fk-badge" src="/forsaken/img/ui-multi-' + Math.min(nc, 4) + '.webp?v=2" alt="" width="240" height="240" decoding="async"><span class="fk-sr">, in ' + nc + (nc === 1 ? ' category' : ' categories') + '</span>' : '') + '<span class="fk-card-n">' + esc(c.name) + '</span></a>';
  }

  function groupsFor(tab) { return tab === 'killer' ? ((data && data.killerClasses) || []) : CLS; }
  function catsOf(c) { return c.cats && c.cats.length ? c.cats : c.cls && c.cls !== 'Killer' ? [c.cls] : []; }
  function groupIds(k, side) { var g = data.groups && data.groups[k]; return (g || order[side].filter(function (id) { return catsOf(byId[id]).indexOf(k) >= 0; })).filter(function (id) { return byId[id] && byId[id].side === side; }); }
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
      var list = groupIds(k, st.tab).map(function (id) { return byId[id]; });
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

  function fitNames(scope) {
    Array.prototype.forEach.call((scope || gridView).querySelectorAll('.fk-card-n'), function (n) {
      n.style.fontSize = '';
      var room = n.parentNode.clientWidth - 20;
      var w = n.scrollWidth;
      if (room > 0 && w > room) {
        var fs = parseFloat(getComputedStyle(n).fontSize);
        n.style.fontSize = Math.max(10, Math.floor(fs * room / w * 10) / 10) + 'px';
      }
    });
  }
  var fitT = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(fitT); fitT = requestAnimationFrame(function () { fitNames(); var pk = det.querySelector('.fk-pick'); if (pk) fitNames(pk); }); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!CHAR) fitNames(); else { var pk = det.querySelector('.fk-pick'); if (pk) fitNames(pk); } });

  function scopeOf(c) {
    var sc = null;
    try { sc = JSON.parse(sessionStorage.getItem('fk-scope') || 'null'); } catch (e) {}
    if (sc && sc.side === c.side && sc.ids && sc.ids.indexOf(c.id) >= 0) return { ids: sc.ids, label: sc.cls };
    return { ids: order[c.side], label: c.side === 'killer' ? 'Killer' : 'Survivor' };
  }

  function stat(label, val, cls, unit) {
    if (val == null || val === '') return '';
    var x = /^(.*?)\s*\((\+[^)]*)\)$/.exec(String(val));
    return '<div class="fk-stat' + (cls ? ' ' + cls : '') + '"><dt>' + esc(label) + '</dt><dd>' + esc(x ? x[1] : val) + (unit ? '<small>' + esc(unit) + '</small>' : '') + (x ? '<span class="fk-stat-x">' + esc(x[2]) + '</span>' : '') + '</dd></div>';
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
  function isSub(a) { return !!a.parent || / - /.test(a.name); }
  function subOf(a) { return (a.parent || a.name.split(' - ')[0]).trim().toUpperCase(); }
  function abId(a) { return 'ab-' + slug(a.name); }

  function slotIcon(a) {
    var img = a.icon ? '<img src="' + esc(a.icon) + '" alt="" width="80" height="80" loading="lazy" decoding="async">' : '';
    if (isPassive(a)) return '<span class="fk-dia">' + img + '</span>';
    return '<span class="fk-circ' + (a.icon ? ' fk-has' : '') + '">' + img + '<span class="fk-cd" aria-hidden="true"></span></span>';
  }

  function abGroups(c) {
    var mains = [], byKey = {};
    c.abilities.forEach(function (a) {
      if (isSub(a)) {
        var key = subOf(a);
        if (byKey[key]) { byKey[key].subs.push(a); return; }
      }
      var g = { main: a, subs: [] };
      mains.push(g);
      byKey[a.name.toUpperCase()] = g;
    });
    return mains.filter(function (g) { return isPassive(g.main); }).concat(mains.filter(function (g) { return !isPassive(g.main); }));
  }

  function abilitiesSection(c) {
    var groups = abGroups(c);
    if (!groups.length) return '';
    var tabs = groups.map(function (g, i) {
      var a = g.main, id = abId(a);
      return '<button type="button" role="tab" class="fk-slot" id="tab-' + id + '" data-ab="' + id + '" aria-controls="' + id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" aria-label="' + esc(a.name) + (isPassive(a) ? ', passive' : '') + (a.cd && !/^n\/?a$/i.test(a.cd) ? ', cooldown ' + esc(a.cd) : '') + '">' + slotIcon(a) + '<span class="fk-slot-l" aria-hidden="true">' + esc(a.name) + '</span></button>';
    }).join('');
    var panels = groups.map(function (g, i) {
      var id = abId(g.main);
      return '<div class="fk-abp" role="tabpanel" id="' + id + '" aria-labelledby="tab-' + id + '"' + (i ? ' hidden' : '') + '>' + [g.main].concat(g.subs).map(ability).join('') + '</div>';
    }).join('');
    return '<section class="fk-sec" aria-labelledby="fk-ab-h"><h2 class="fk-h2 fk-rv" style="--i:6" id="fk-ab-h">Abilities</h2><div class="fk-load fk-drawn fk-rv" role="tablist" aria-label="Abilities">' + tabs + '</div><div class="fk-abs fk-rv" style="--i:7">' + panels + '</div></section>';
  }

  function showAbility(tab, focus) {
    var list = tab.parentNode, id = tab.getAttribute('data-ab');
    Array.prototype.forEach.call(list.querySelectorAll('.fk-slot'), function (t) { var on = t === tab; if (!on) { var x = t.querySelector('.fk-cd.fk-cding'); if (x) x.classList.remove('fk-cding'); } t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    Array.prototype.forEach.call((list.closest('section') || det).querySelectorAll('.fk-abp'), function (p) {
      var on = p.id === id;
      p.hidden = !on;
      Array.prototype.forEach.call(p.querySelectorAll('video'), function (v) { if (!on && !v.paused) v.pause(); if (on && v.currentTime && v.muted) v.currentTime = 0; });
      if (on && !reduced) { p.classList.remove('fk-swap'); void p.offsetWidth; p.classList.add('fk-swap'); }
    });
    var cd = tab.querySelector('.fk-cd');
    if (cd && !reduced) { cd.classList.remove('fk-cding'); void cd.offsetWidth; cd.classList.add('fk-cding'); }
    if (focus) tab.focus();
    if (scrollbar) sbSync();
  }

  function itemsSection(c) {
    var items = data && data.items;
    if (c.side !== 'survivor' || !items || !items.length) return '';
    var tabs = items.map(function (it, i) {
      var id = 'it-' + slug(it.id || it.name), off = it.blocked && it.blocked.indexOf(c.id) >= 0;
      return '<button type="button" role="tab" class="fk-slot' + (off ? ' fk-slot--off' : '') + '" id="tab-' + id + '" data-ab="' + id + '" aria-controls="' + id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" aria-label="' + esc(it.name) + (off ? ', cannot be used' : '') + '"><span class="fk-circ fk-has"><img src="' + esc(it.icon) + '" alt="" width="80" height="80" loading="lazy" decoding="async"></span><span class="fk-slot-l" aria-hidden="true">' + esc(it.name) + '</span></button>';
    }).join('');
    var panels = items.map(function (it, i) {
      var id = 'it-' + slug(it.id || it.name), note = it.notes && it.notes[c.id], off = it.blocked && it.blocked.indexOf(c.id) >= 0;
      return '<div class="fk-abp" role="tabpanel" id="' + id + '" aria-labelledby="tab-' + id + '"' + (i ? ' hidden' : '') + '><article class="fk-ab fk-drawn' + (off ? ' fk-item--off' : '') + '">' +
        '<h3 class="fk-ab-n">' + esc(it.name) + '</h3>' + (it.quote ? '<p class="fk-ab-q">&ldquo;' + esc(it.quote) + '&rdquo;</p>' : '') +
        '<div class="fk-ab-b"><div class="fk-ab-i"><span class="fk-circ fk-has"><img src="' + esc(it.icon) + '" alt="" width="80" height="80" loading="lazy" decoding="async"></span></div><div>' +
        (note ? '<p class="fk-item-note">' + pills(esc(note)) + '</p>' : '') +
        '<div class="fk-rich">' + rich(it.desc) + '</div>' +
        (it.where ? '<p class="fk-ab-meta"><span>Found:</span> <b>' + esc(it.where) + '</b></p>' : '') +
        '</div></div></article></div>';
    }).join('');
    return '<section class="fk-sec" aria-labelledby="fk-it-h"><h2 class="fk-h2 fk-rv" style="--i:7" id="fk-it-h">Items</h2><div class="fk-load fk-drawn fk-rv" style="--i:7" role="tablist" aria-label="Items">' + tabs + '</div><div class="fk-abs fk-rv" style="--i:7">' + panels + '</div></section>';
  }

  function tc(s) { return String(s || '').toLowerCase().replace(/(^|[\s(/-])([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }); }
  function tabOf(list, a) {
    if (!isSub(a)) return abId(a);
    var k = subOf(a);
    return list.some(function (x) { return x.name.toUpperCase() === k; }) ? 'ab-' + slug(k) : abId(a);
  }
  function abFind(c, name) {
    var u = String(name).toUpperCase().trim(), ms = c.modes && c.modes.length > 1 ? c.modes : [c];
    for (var i = 0; i < ms.length; i++) {
      var list = i ? ms[i].abilities || [] : c.abilities;
      if (i && ms[i].name.toUpperCase() === u) return { m: i, id: '' };
      for (var j = 0; j < list.length; j++) if (list[j].name.toUpperCase() === u) return { m: i, id: tabOf(list, list[j]) };
    }
    return null;
  }
  function abBtn(r, label) { return '<button type="button" class="fk-abref" data-m="' + r.m + '" data-abref="' + esc(r.id) + '">' + label + '</button>'; }
  function refs(h, c) {
    return h.replace(/<b>([^<]+)<\/b>/g, function (m, n) { var r = abFind(c, n.replace(/&amp;/g, '&')); return r ? abBtn(r, n) : m; });
  }
  function cSide(x) { return x.id ? (byId[x.id] || {}).side : x.cls ? 'survivor' : x.side || ''; }
  function norm(x) { return typeof x === 'string' ? { id: x } : x; }
  function withText(x) { return (x['with'] || []).map(function (n) { return n.charAt(0) === '⟦' ? plain(n) : tc(n); }).join(', '); }
  function nameCol(k) {
    function rgb(h) { h = String(h).replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16) || 0; }); }
    function lum(v) { var l = v.map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; }
    function lift(v) { var t = 0, m = v; while (t < 1 && (lum(m) + 0.05) / 0.054 < 5) { t += 0.05; m = v.map(function (x) { return x + (255 - x) * t; }); } return m; }
    function sat(v) { var a = Math.max.apply(null, v), b = Math.min.apply(null, v); return a ? (a - b) / a : 0; }
    var best = [230, 230, 230], bs = -1;
    (k.colors || []).forEach(function (h) { var v = lift(rgb(h)), q = sat(v); if (q > bs + 0.02) { bs = q; best = v; } });
    return 'rgb(' + best.map(Math.round).join(',') + ')';
  }
  function who(x, c) {
    if (x.cls) return '<span class="fk-who fk-who--t">' + esc(x.cls) + 's</span>';
    if (x.text) return '<span class="fk-who fk-who--t">' + esc(x.text) + '</span>';
    var k = byId[x.id];
    if (!k) return '';
    var w = withText(x);
    return '<a class="fk-who" href="' + BASE + '/' + k.id + '" data-go="' + k.id + '" data-google-vignette="false"' + (k.id === c.id ? ' aria-current="page"' : '') + '><i aria-hidden="true"><img src="https://forsaken.fntduserguide.com/img/card/' + esc(k.id) + '-220.webp" alt="" width="220" height="275" loading="lazy" decoding="async"></i><span><b style="color:' + nameCol(k) + '">' + esc(k.name) + '</b>' + (w ? '<small>' + esc(w) + '</small>' : '') + '</span></a>';
  }
  function hpList(rows, c) {
    return '<ul class="fk-hp">' + rows.map(function (r) {
      return '<li>' + who({ id: r.id }, c) + '<span class="fk-hp-n">' + esc(r.hp) + '<small>Max HP</small></span><p>' + esc(r.how) + '</p></li>';
    }).join('') + '</ul>';
  }
  function kindTag(k) { return '<span class="fk-st-k">' + esc(k) + '</span>'; }
  function stRow(s, c) {
    var cs = (s.counters || []).map(norm).filter(function (x) { return s['for'] !== 'all' || cSide(x) !== c.side; });
    if (!s.text && !s.table && !cs.length) return '<div class="fk-st fk-st--e"><div class="fk-st-r"><span class="fk-st-n">' + esc(s.name) + '</span>' + kindTag(s.kind) + '<span class="fk-st-s">No write-up yet</span></div></div>';
    var body = '<div class="fk-rich">' + (s['for'] === c.id ? refs(rich(s.text), c) : rich(s.text)) + '</div>' + (s.table ? hpList(s.table, c) : '') +
      (cs.length ? '<div class="fk-st-c"><span class="fk-st-ck">Countered by</span><div class="fk-st-w">' + cs.map(function (x) { return who(x, c); }).join('') + '</div></div>' : '');
    return '<details class="fk-st"><summary><span class="fk-st-n">' + esc(s.name) + '</span>' + kindTag(s.kind) + '</summary><div class="fk-st-b">' + body + '</div></details>';
  }
  function ctRows(c, all) {
    var out = [];
    all.forEach(function (s) {
      if (s['for'] === c.id) return;
      var hit = null, owner = byId[s['for']];
      (s.counters || []).map(norm).forEach(function (x) {
        if (!hit && (x.id === c.id || (x.cls && c.side === 'survivor' && catsOf(c).indexOf(x.cls) >= 0))) hit = x;
      });
      if (hit) {
        var sub = hit.cls ? 'As a ' + hit.cls : withText(hit) ? 'With ' + withText(hit) : '';
        out.push('<details class="fk-st"><summary><span class="fk-st-n">' + (owner ? esc(owner.name) + ': ' : '') + esc(s.name) + '</span>' + kindTag(s.kind) + (sub ? '<span class="fk-st-s">' + esc(sub) + '</span>' : '') + '</summary><div class="fk-st-b"><div class="fk-rich">' + rich(s.text) + '</div>' +
          (owner ? '<p class="fk-st-o">' + who({ id: owner.id }, c) + '</p>' : '') + '</div></details>');
      }
      (s.table || []).forEach(function (r) {
        if (r.id !== c.id || !owner) return;
        out.push('<details class="fk-st"><summary><span class="fk-st-n">' + esc(owner.name) + ': ' + esc(s.name) + '</span>' + kindTag(s.kind) + '<span class="fk-st-s">' + esc(owner.name) + ' needs ' + esc(r.hp) + ' Max HP against ' + esc(c.name) + '</span></summary><div class="fk-st-b"><div class="fk-rich"><p>' + esc(r.how) + '</p>' + rich(s.text) + '</div><p class="fk-st-o">' + who({ id: owner.id }, c) + '</p></div></details>');
      });
    });
    return out;
  }
  function stratsSection(c) {
    var all = (data && data.strats) || [];
    if (!all.length) return '';
    var own = all.filter(function (s) { return s['for'] === c.id; }), sd = all.filter(function (s) { return s['for'] === c.side; }), ev = all.filter(function (s) { return s['for'] === 'all'; }), gen = sd.concat(ev), ct = ctRows(c, all);
    function grp(t, l) { return l.length ? '<h3 class="fk-st-g">' + t + '</h3>' + l.map(function (s) { return stRow(s, c); }).join('') : ''; }
    var tabs = [];
    if (own.length) tabs.push({ k: 'own', l: c.name, n: own.length, h: own.map(function (s) { return stRow(s, c); }).join('') });
    if (gen.length) tabs.push({ k: 'gen', l: 'General', n: gen.length, h: grp(c.side === 'killer' ? 'All Killers' : 'All Survivors', sd) + ev.map(function (s) { return stRow(s, c); }).join('') });
    if (ct.length) tabs.push({ k: 'ct', l: 'Counters', n: ct.length, h: ct.join('') });
    if (!tabs.length) return '';
    return '<section class="fk-sec fk-rv" style="--i:7" aria-labelledby="fk-st-h"><h2 class="fk-h2" id="fk-st-h">Strategies &amp; Techs</h2><div class="fk-st-tabs" role="tablist" aria-label="Strategies">' +
      tabs.map(function (t, i) { return '<button type="button" role="tab" class="fk-btn fk-st-t" id="tab-st-' + t.k + '" aria-controls="st-' + t.k + '" aria-selected="' + (i === 0) + '" tabindex="' + (i ? -1 : 0) + '">' + esc(t.l) + ' <b>' + t.n + '</b></button>'; }).join('') + '</div>' +
      tabs.map(function (t, i) { return '<div class="fk-stp fk-drawn" role="tabpanel" id="st-' + t.k + '" aria-labelledby="tab-st-' + t.k + '"' + (i ? ' hidden' : '') + '>' + t.h + '</div>'; }).join('') + '</section>';
  }
  function showStrat(tab, focus) {
    var list = tab.parentNode, id = tab.getAttribute('aria-controls');
    Array.prototype.forEach.call(list.querySelectorAll('.fk-st-t'), function (t) { var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    Array.prototype.forEach.call(list.parentNode.querySelectorAll('.fk-stp'), function (p) {
      var on = p.id === id;
      p.hidden = !on;
      if (on && !reduced) { p.classList.remove('fk-swap'); void p.offsetWidth; p.classList.add('fk-swap'); }
    });
    if (focus) tab.focus();
    sbSync();
  }
  function jumpAb(b) {
    var mb = det.querySelector('.fk-mode[data-mode="' + b.getAttribute('data-m') + '"]');
    if (mb && mb.getAttribute('aria-pressed') !== 'true') swapMode(mb);
    var id = b.getAttribute('data-abref'), tab = id && det.querySelector('#tab-' + id);
    if (tab) showAbility(tab);
    var sec = det.querySelector('section[aria-labelledby="fk-ab-h"]');
    if (sec) sec.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function vids(a) {
    var v = a.videos || [];
    return v.length ? '<div class="fk-ab-v">' + v.map(function (x) { return '<video ' + (reduced ? 'controls ' : 'muted loop disablepictureinpicture ') + 'playsinline preload="none" width="1280" height="720"' + (x.poster ? ' poster="' + esc(media(x.poster)) + '"' : '') + ' src="' + esc(media(x.src)) + '" aria-label="' + esc(tc(a.name)) + ' video"></video>'; }).join('') + '</div>' : '';
  }
  function ability(a, i) {
    var meta = [];
    if (isPassive(a)) meta.push('<b>Passive</b>');
    if (a.cd && !/^n\/?a$/i.test(a.cd)) meta.push('<span>Cooldown:</span> <b>' + esc(a.cd) + '</b>');
    return '<article class="fk-ab fk-drawn"' + (isSub(a) ? ' id="' + abId(a) + '"' : '') + '>' +
      '<h3 class="fk-ab-n">' + esc(a.name) + '</h3>' +
      (a.quote ? '<p class="fk-ab-q">' + esc(plain(a.quote)).replace(/\n+/g, '<br>') + '</p>' : '') +
      '<div class="fk-ab-b"><div class="fk-ab-i">' + slotIcon(a) + '</div><div>' +
      (meta.length ? '<p class="fk-ab-meta">' + meta.join('</p><p class="fk-ab-meta">') + '</p>' : '') +
      '<div class="fk-rich">' + rich(a.desc) + '</div>' + vids(a) +
      '</div></div></article>';
  }

  var GROUPS = ['Milestone', 'Shop', 'Special', 'Limited', 'Free'];
  var GCOL = { Milestone: '#ffc500', Shop: '#e6e6e6', Special: '#b97cff', Limited: '#ff3355', Free: '#8a8a8a' };

  function skinOrder(c) {
    var s = c.skins.slice();
    var rank = { Free: 0, Milestone: 1, Shop: 2, Special: 3, Limited: 4 };
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
        (k.img ? '<img data-src="' + esc(media(k.img)) + '" alt="" decoding="async">' : '') + '</b></button>';
    }).join('');
    var chips = '<div class="fk-sk-tools" role="group" aria-label="Show skins">' +
      '<button type="button" class="fk-btn" data-sg="all" aria-pressed="true">All <b>' + s.length + '</b></button>' +
      GROUPS.filter(function (g) { return counts[g]; }).map(function (g) { return '<button type="button" class="fk-btn" data-sg="' + g + '" aria-pressed="false">' + g + ' <b>' + counts[g] + '</b></button>'; }).join('') + '</div>';
    var legend = '<div class="fk-legend" aria-hidden="true">' + GROUPS.filter(function (g) { return counts[g]; }).map(function (g) {
      return '<span><i style="background:' + GCOL[g] + '"></i>' + (g === 'Limited' ? 'Limited (no longer sold)' : g === 'Milestone' ? 'Milestone (character level)' : g === 'Special' ? 'Special (events, packs, achievements)' : g) + '</span>';
    }).join('') + '</div>';
    root._web = { skins: s, parent: parent, rings: L.rings };
    return '<section class="fk-sec fk-rv" style="--i:8" aria-labelledby="fk-skins-h"><h2 class="fk-h2" id="fk-skins-h">Skins <small>' + s.length + '</small></h2>' + chips +
      '<div class="fk-skins"><div class="fk-webbox fk-drawn">' +
      '<div class="fk-web fk-pre" style="--ns:' + L.ns.toFixed(2) + '%;--fd:' + (L.rings * 210 + 350) + 'ms"><svg class="fk-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + paths + '</svg><div class="fk-fog" aria-hidden="true"></div>' + nodes +
      '<button type="button" class="fk-core" style="' + vars(c) + '" aria-label="Default ' + esc(c.name) + '"><img src="' + esc(c.image) + '" alt="" decoding="async"></button></div></div>' +
      '<div class="fk-pick fk-drawn" aria-live="polite"></div>' +
      '</div>' + legend + '</section>';
  }

  function big(url) { return media(String(url || '').replace(/-200\.webp$/, '-520.webp')); }

  function skinCard(c, src, name, alt) {
    return '<div class="fk-card fk-scard" data-side="' + esc(c.side) + '" style="' + vars(c) + '">' + (src ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '" decoding="async">' : '') + '<span class="fk-mo" aria-hidden="true"></span><span class="fk-card-n">' + esc(name) + '</span></div>';
  }

  function pick(c, i) {
    var w = root._web, box = det.querySelector('.fk-pick');
    if (!w || !box) return;
    Array.prototype.forEach.call(det.querySelectorAll('.fk-node'), function (n) { n.setAttribute('aria-pressed', String(+n.getAttribute('data-n') === i)); });
    Array.prototype.forEach.call(det.querySelectorAll('.fk-lines path'), function (p) { p.classList.remove('fk-hot'); });
    if (i < 0) {
      box.innerHTML = skinCard(c, c.card || c.image, c.name, c.name) + '<div class="fk-pick-info"><p class="fk-pick-how">Default &middot; Comes with ' + esc(c.name) + '</p><p class="fk-pick-cap">Pick a skin in the web to see it here.</p></div>';
      return;
    }
    var k = w.skins[i];
    for (var n = i; n >= 0; n = w.parent[n]) { var p = det.querySelector('.fk-lines path[data-n="' + n + '"]'); if (p) p.classList.add('fk-hot'); }
    var sa = AUDIO && AUDIO.skins[k.name];
    var audio = sa ? (sa.themes.length ? '<ul class="fk-themes fk-themes--sm">' + sa.themes.map(function (t) { return themeCard(t, c); }).join('') + '</ul>' : '') + (sa.voice.length ? '<p class="fk-pick-sub">Voicelines <b>' + sa.voice.length + '</b></p><div class="fk-pick-vl">' + voiceList(sa.voice, 6) + '</div>' : '') : (k.au ? '<p class="fk-pick-cap">Loading audio...</p>' : '');
    box.innerHTML = skinCard(c, k.img && big(k.img), k.name, k.name + ' skin') + '<div class="fk-pick-info"><p class="fk-pick-how" data-g="' + k.group + '">' + esc(k.group) + (k.how && k.how !== k.group ? ' &middot; ' + esc(k.how) : '') + '</p>' + (k.caption ? '<p class="fk-pick-cap">&ldquo;' + esc(k.caption) + '&rdquo;</p>' : '') + '</div>' + audio;
    fitNames(box);
    paintPlay();
    sbSync();
    var sc = box.querySelector('.fk-scard');
    if (sc && window.innerWidth > 860) {
      var r = sc.getBoundingClientRect(), over = r.bottom + 16 - window.innerHeight;
      if (over > 0) window.scrollBy({ top: over, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  function navbox(c) {
    function row(label, ids) {
      return '<div class="fk-nav-r"><div class="fk-nav-k">' + esc(label) + '</div><div class="fk-nav-v">' + ids.map(function (id) {
        var x = byId[id];
        return '<a href="' + BASE + '/' + id + '" data-go="' + id + '" data-google-vignette="false"' + (id === c.id ? ' aria-current="page"' : '') + '>' + esc(x.name) + '</a>';
      }).join('<span aria-hidden="true">&middot;</span>') + '</div></div>';
    }
    var sc = scopeOf(c), list = sc.ids, i = list.indexOf(c.id);
    var prev = byId[list[(i - 1 + list.length) % list.length]], next = byId[list[(i + 1) % list.length]];
    var html = '<nav class="fk-nav fk-drawn fk-rv" style="--i:9" aria-label="The Forsaken"><div class="fk-nav-h">The Forsaken</div>';
    CLS.forEach(function (k) { html += row(k + 's', groupIds(k, 'survivor')); });
    html += row('Killers', order.killer);
    html += '<div class="fk-pn"><a href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" rel="prev" data-google-vignette="false">&lsaquo; Previous<em>' + esc(prev.name) + '</em></a><a href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" rel="next" data-google-vignette="false">Next &rsaquo;<em>' + esc(next.name) + '</em></a></div></nav>';
    return html;
  }

  function modesOf(c) { return c.modes && c.modes.length > 1 ? c.modes : [{ name: c.name, image: c.image }]; }
  function artImgs(c) {
    return modesOf(c).map(function (m, i) { return '<img class="fk-art-m' + (i ? '' : ' fk-on') + '" src="' + esc(m.image) + '" alt="' + esc(m.name) + '"' + (i ? ' aria-hidden="true"' : '') + ' width="1200" height="1200" crossorigin="anonymous" decoding="async" loading="eager">'; }).join('');
  }
  function modesHtml(c) {
    if (!(c.modes && c.modes.length > 1)) return '';
    return '<div class="fk-modes fk-rv" style="--i:2" role="group" aria-label="' + esc(c.name) + ' forms">' + c.modes.map(function (m, i) { return '<button type="button" class="fk-btn fk-mode" data-mode="' + i + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + esc(m.name) + '</button>'; }).join('') + '</div>';
  }
  var frameImg = null;
  if (CHAR) { frameImg = new Image(); frameImg.src = '/forsaken/img/ui-frame.webp'; }
  function frameLayer(W, H, b) {
    if (!frameImg || !frameImg.complete || !frameImg.naturalWidth || !b) return null;
    var f = document.createElement('canvas');
    f.width = W; f.height = H;
    var x = f.getContext('2d'), S = 30, iw = frameImg.naturalWidth, ih = frameImg.naturalHeight;
    var sx = [0, S, iw - S, iw], sy = [0, S, ih - S, ih], dx = [0, b, W - b, W], dy = [0, b, H - b, H];
    try {
      for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
        if (i === 1 && j === 1) continue;
        x.drawImage(frameImg, sx[i], sy[j], sx[i + 1] - sx[i], sy[j + 1] - sy[j], dx[i], dy[j], dx[i + 1] - dx[i], dy[j + 1] - dy[j]);
      }
    } catch (e) { return null; }
    return f;
  }
  function modeChar(c, i) {
    var m = modesOf(c)[i] || {}, o = {}, k;
    for (k in c) o[k] = c[k];
    if (m.stats) for (k in m.stats) o[k] = m.stats[k];
    if (m.abilities) o.abilities = m.abilities;
    return o;
  }
  var APPLE = /Apple/.test(navigator.vendor || '');
  function thinFor(light, dpr) {
    if (APPLE) return dpr >= 2.5 ? (light ? 0.12 : 0.18) : (light ? 0.2 : 0.22);
    return light ? Math.max(0.2, Math.min(0.6, 0.72 - 0.15 * dpr)) : Math.max(0.3, Math.min(0.55, 0.6 - 0.07 * dpr));
  }
  function snapText(el) {
    var r = el.getBoundingClientRect();
    if (r.width < 4 || !document.createRange || !document.createTreeWalker) return null;
    var dpr = Math.min(3, window.devicePixelRatio || 1), P = 18;
    var W = Math.round(r.width * dpr), H = Math.round(r.height * dpr), PP = Math.round(P * dpr);
    var cv = document.createElement('canvas');
    cv.width = W; cv.height = H + PP;
    var c = cv.getContext('2d'), tw = document.createTreeWalker(el, 4), n, rg = document.createRange();
    c.textBaseline = 'alphabetic';
    if ('fontKerning' in c) c.fontKerning = 'normal';
    while ((n = tw.nextNode())) {
      var txt = n.textContent;
      if (!txt || !/\S/.test(txt)) continue;
      var cs = getComputedStyle(n.parentNode);
      c.font = (cs.fontStyle === 'normal' ? '' : cs.fontStyle + ' ') + cs.fontWeight + ' ' + parseFloat(cs.fontSize) * dpr + 'px ' + cs.fontFamily;
      c.fillStyle = cs.color;
      var fm = c.measureText('Hg'), fa = fm.fontBoundingBoxAscent, fd = fm.fontBoundingBoxDescent;
      var thin = thinFor(+cs.fontWeight < 600, dpr) * dpr;
      for (var i = 0; i < txt.length; i++) {
        var ch = txt.charAt(i);
        if (!/\S/.test(ch)) continue;
        rg.setStart(n, i); rg.setEnd(n, i + 1);
        var cr = rg.getBoundingClientRect();
        if (!cr.width && !cr.height) continue;
        var base = fa && fd ? (cr.top - r.top) * dpr + cr.height * dpr * fa / (fa + fd) : (cr.top - r.top + cr.height * 0.78) * dpr;
        c.fillText(ch, (cr.left - r.left) * dpr, PP + base);
        if (thin) { c.save(); c.globalCompositeOperation = 'destination-out'; c.lineWidth = thin; c.strokeText(ch, (cr.left - r.left) * dpr, PP + base); c.restore(); }
      }
    }
    var data;
    try { data = c.getImageData(0, PP, W, H).data; } catch (e) { return null; }
    return { cv: cv, ctx: c, base: data, W: W, H: H, P: PP, dpr: dpr, y: -P, w: r.width, h: r.height + P };
  }
  function burnText(tile, s, delay) {
    var DUR = 620;
    s.cv.className = 'fk-ash-t';
    s.cv.style.cssText = 'left:0;top:' + s.y + 'px;width:' + s.w + 'px;height:' + s.h + 'px';
    tile.appendChild(s.cv);
    Array.prototype.forEach.call(tile.querySelectorAll('dt,dd'), function (x) {
      if (x.animate) x.animate([{ opacity: 0 }, { opacity: 0, offset: 0.55 }, { opacity: 1 }], { duration: DUR + 120, delay: delay, easing: 'ease-out', fill: 'backwards' });
    });
    setTimeout(function () { ash(s.ctx, s.base, s.W, s.H, s.P, s.dpr, DUR, function () {}, function () { s.cv.remove(); }, null, 0.035); }, delay);
  }
  function applyMode(i) {
    if (!cur) return;
    var mc = modeChar(cur, i);
    var dl = det.querySelector('.fk-stats');
    if (dl) {
      var old = {};
      Array.prototype.forEach.call(dl.querySelectorAll('.fk-stat'), function (s) { old[s.querySelector('dt').textContent] = { v: s.querySelector('dd').textContent, el: s }; });
      var box = document.createElement('div');
      box.innerHTML = stats(mc);
      var nd = box.firstChild, burns = [];
      Array.prototype.forEach.call(nd.querySelectorAll('.fk-stat'), function (s) {
        var o = old[s.querySelector('dt').textContent];
        if (reduced || !o || o.v === s.querySelector('dd').textContent) return;
        var snap = snapText(o.el);
        if (snap) burns.push([s, snap]);
      });
      dl.parentNode.replaceChild(nd, dl);
      burns.forEach(function (b, i) { burnText(b[0], b[1], 90 + i * 110); });
    }
    var sec = det.querySelector('section[aria-labelledby="fk-ab-h"]');
    if (sec) {
      var wrap = document.createElement('div');
      wrap.innerHTML = abilitiesSection(mc);
      var ns = wrap.firstChild;
      if (ns) {
        Array.prototype.forEach.call(ns.querySelectorAll('.fk-rv'), function (x) { x.classList.remove('fk-rv'); });
        if (!reduced) Array.prototype.forEach.call(ns.querySelectorAll('.fk-load, .fk-abp:not([hidden])'), function (x) { x.classList.add('fk-swap'); });
        sec.parentNode.replaceChild(ns, sec);
      }
    }
    if (scrollbar) sbSync();
  }
  function swapMode(btn) {
    var art = det.querySelector('.fk-art'), imgs = art && art.querySelectorAll('.fk-art-m');
    if (!imgs) return;
    var to = imgs[+btn.getAttribute('data-mode')], from = art.querySelector('.fk-art-m.fk-on');
    if (!to || to === from || art._ash) return;
    Array.prototype.forEach.call(btn.parentNode.querySelectorAll('.fk-mode'), function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    applyMode(+btn.getAttribute('data-mode'));
    function go() {
      from.classList.remove('fk-on'); from.setAttribute('aria-hidden', 'true');
      to.classList.add('fk-on'); to.removeAttribute('aria-hidden');
    }
    var r = art.getBoundingClientRect();
    if (reduced || !from.complete || !from.naturalWidth || r.width < 20) { go(); return; }
    var fb = parseFloat(getComputedStyle(art).getPropertyValue('--fb')) || 9;
    var dpr = Math.min(1.5, window.devicePixelRatio || 1), W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    var cv = document.createElement('canvas');
    cv.className = 'fk-ash';
    cv.width = W; cv.height = H;
    var o = cv.getContext('2d'), iw = from.naturalWidth, ih = from.naturalHeight, s = Math.max(W / iw, H / ih), dw = iw * s, dh = ih * s, base;
    var bdg = art.querySelector('.fk-art-badge'), br = bdg && bdg.complete && bdg.naturalWidth ? bdg.getBoundingClientRect() : null;
    try {
      o.drawImage(from, (W - dw) / 2, (H - dh) * 0.28, dw, dh);
      if (br) { o.save(); o.shadowColor = 'rgba(0,0,0,.8)'; o.shadowBlur = 5 * dpr; o.shadowOffsetY = 3 * dpr; o.drawImage(bdg, (br.left - r.left) * dpr, (br.top - r.top) * dpr, br.width * dpr, br.height * dpr); o.restore(); }
      base = o.getImageData(0, 0, W, H).data;
    } catch (e) { go(); return; }
    if (br && bdg.animate) bdg.animate([{ opacity: 0, transform: 'scale(.55) rotate(-25deg)' }, { opacity: 1, transform: 'scale(1.08) rotate(3deg)', offset: 0.7 }, { opacity: 1, transform: 'none' }], { duration: 460, delay: 820, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
    var fr = frameLayer(W, H, fb * dpr);
    art._ash = 1;
    art.insertBefore(cv, art.querySelector('.fk-art-glow'));
    go();
    ash(o, base, W, H, 0, dpr, 760, function () {}, function () { cv.remove(); art._ash = 0; }, fr && function (c) { c.drawImage(fr, 0, 0); });
  }

  function detailHtml(c) {
    var sc = scopeOf(c), list = sc.ids, i = list.indexOf(c.id);
    var prev = byId[list[(i - 1 + list.length) % list.length]], next = byId[list[(i + 1) % list.length]];
    var side = c.side === 'killer' ? 'Killer' : 'Survivor';
    var tags = '<span class="fk-tag ' + (c.side === 'killer' ? 'fk-tag--killer' : 'fk-tag--survivor') + '">' + side + '</span>' + catsOf(c).map(function (k) { var note = c.catNotes && c.catNotes[k]; return '<span class="fk-tag' + (note ? ' fk-tag--note' : '') + '"' + (note ? ' title="' + esc(note) + '" tabindex="0" aria-label="' + esc(k + ': ' + note) + '"' : '') + '>' + esc(k) + (note ? '<sup aria-hidden="true">*</sup>' : '') + '</span>'; }).join('');
    var nameArt = c.title ? '<img src="' + esc(c.title) + '" alt="' + esc(c.name) + '" decoding="async">' : '<span>' + esc(c.name) + '</span>';
    var bg = c.bg ? '<div class="fk-bg" aria-hidden="true" style="--fk-map:url(&quot;' + esc(c.bg) + '&quot;)"><i></i><b></b></div>' : '';
    return bg + '<div class="fk-page">' +
      '<div class="fk-top">' +
      '<a class="fk-btn fk-arrow" href="' + BASE + '/' + prev.id + '" data-go="' + prev.id + '" data-dir="-1" aria-label="Previous: ' + esc(prev.name) + '" data-google-vignette="false">&lsaquo;</a>' +
      '<span class="fk-count">' + esc(sc.label) + ' ' + (i + 1) + ' / ' + list.length + '</span>' +
      '<a class="fk-btn fk-arrow" href="' + BASE + '/' + next.id + '" data-go="' + next.id + '" data-dir="1" aria-label="Next: ' + esc(next.name) + '" data-google-vignette="false">&rsaquo;</a>' +
      '<a class="fk-x" href="' + esc(BACK_HREF || BASE) + '" data-back="1" aria-label="Back to ' + esc(BACK_NAME) + '" title="Back to ' + esc(BACK_NAME) + '" data-google-vignette="false">' + esc(BACK_NAME) + '</a></div>' +
      '<div class="fk-hero" style="' + vars(c) + '">' +
      '<div class="fk-artcol"><div class="fk-art fk-rv" style="--i:0">' + artImgs(c) + '<span class="fk-art-glow" aria-hidden="true"></span><span class="fk-art-f" aria-hidden="true"></span>' + (catsOf(c).length ? '<img class="fk-art-badge" src="/forsaken/img/ui-multi-' + Math.min(catsOf(c).length, 4) + '.webp?v=2" alt="In ' + catsOf(c).length + (catsOf(c).length === 1 ? ' category' : ' categories') + '" title="' + esc(catsOf(c).join(', ')) + '" width="240" height="240" decoding="async">' : '') + '</div>' + modesHtml(c) + '</div>' +
      '<div class="fk-side">' +
      '<div class="fk-namebox fk-drawn fk-rv" style="--i:1"><h1 class="fk-name">' + nameArt + '</h1><div class="fk-tags">' + tags + '</div>' +
      (c.caption ? '<p class="fk-cap">&ldquo;' + esc(c.caption) + '&rdquo;</p>' : '') + '</div>' +
      '<div class="fk-statbox fk-drawn fk-rv" style="--i:3"><h2 class="fk-box-h">Stats</h2>' + stats(c) + '</div>' +
      '</div></div>' +
      '<section class="fk-sec fk-rv" style="--i:5" aria-labelledby="fk-ov-h"><h2 class="fk-h2" id="fk-ov-h">Overview</h2><div class="fk-ov fk-drawn">' +
      (c.lead ? '<p class="fk-lead">' + inline(c.lead) + '</p>' : '') +
      (c.description ? '<blockquote class="fk-desc">' + esc(plain(c.description)) + '</blockquote>' : '') + '</div></section>' +
      abilitiesSection(c) +
      stratsSection(c) +
      itemsSection(c) +
      '<div class="fk-audio" data-audio="' + esc(c.audio || '') + '"></div>' +
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
      document.title = c.name + ' | The Forsaken | FNTD User Guide';
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

  function dropPre() {
    var pre = document.querySelector('.fk-cover');
    if (pre) requestAnimationFrame(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); });
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
    dropPre();
    startWeb();
    loadAudio(c);
  }

  var AUDIO = null, player = null, playing = null, pending = null, muteNote = null;
  function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); }
  function playIcon() { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="fk-pi" d="M8 5.5v13l11-6.5z"/><path class="fk-pa" d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg>'; }
  function playButton(src, label, big) { return '<button type="button" class="fk-play' + (big ? ' fk-play--big' : '') + '" data-src="' + esc(media(src)) + '" aria-label="Play ' + esc(label) + '" aria-pressed="false">' + playIcon() + '</button>'; }
  function themeCard(t, owner) {
    var kind = t.kind === 'Chase' ? 'Chase theme' : 'Last Man Standing';
    return '<li class="fk-theme">' + playButton(t.src, t.name, true) + '<div class="fk-theme-b"><p class="fk-theme-k">' + kind + '</p><p class="fk-theme-n">' + esc(t.name) + '</p>' + (t.when ? '<p class="fk-theme-w">' + esc(t.when) + '</p>' : '') + (t.by ? '<p class="fk-theme-by">by ' + esc(t.by) + '</p>' : '') + '<p class="fk-theme-t" aria-hidden="true"></p></div></li>';
  }
  function voiceRow(v) {
    var label = v.text || v.when || 'voiceline';
    return '<li class="fk-vl">' + playButton(v.src, label) + '<div class="fk-vl-b">' + (v.text ? '<p class="fk-vl-t">' + esc(v.text) + '</p>' : '') + (v.when ? '<p class="fk-vl-w">' + esc(v.when) + '</p>' : '') + '</div></li>';
  }
  function voiceList(list, cap) {
    var clip = list.length > cap;
    return '<ul class="fk-vls' + (clip ? ' fk-vclip' : '') + '" style="--cap:' + cap + '">' + list.map(voiceRow).join('') + '</ul>' + (clip ? '<button type="button" class="fk-btn fk-vmore">Show all ' + list.length + '</button>' : '');
  }
  function loadAudio(c) {
    var box = det.querySelector('.fk-audio');
    if (!box || !c.audio) return;
    get('/forsaken/audio/' + c.id + '.json?v=' + c.audio).then(function (a) {
      if (!cur || cur.id !== c.id) return;
      AUDIO = a;
      var html = '';
      if (a.themes.length) html += '<section class="fk-sec" aria-labelledby="fk-th-h"><h2 class="fk-h2" id="fk-th-h">Themes <small>' + a.themes.length + '</small></h2><ul class="fk-themes">' + a.themes.map(function (t) { return themeCard(t, c); }).join('') + '</ul></section>';
      if (a.voice.length) html += '<section class="fk-sec" aria-labelledby="fk-vl-h"><h2 class="fk-h2" id="fk-vl-h">Voicelines <small>' + a.voice.length + '</small></h2><div class="fk-vlbox fk-drawn">' + voiceList(a.voice, 8) + '</div></section>';
      box.innerHTML = html;
      Array.prototype.forEach.call(det.querySelectorAll('.fk-node'), function (n) {
        var k = root._web && root._web.skins[+n.getAttribute('data-n')];
        if (k && a.skins[k.name] && !n.querySelector('.fk-node-au')) { n.insertAdjacentHTML('beforeend', '<span class="fk-node-au" aria-hidden="true"></span>'); n.setAttribute('aria-label', n.getAttribute('aria-label') + ', has audio'); }
      });
      var sel = det.querySelector('.fk-node[aria-pressed="true"]');
      if (sel) pick(cur, +sel.getAttribute('data-n'));
      sbSync();
    }).catch(function () {});
  }
  function hideMuteNote() { if (muteNote) muteNote.classList.remove('fk-on'); }
  function showMuteNote() {
    if (!muteNote) {
      muteNote = document.createElement('div');
      muteNote.className = 'fk-mutenote';
      muteNote.setAttribute('role', 'status');
      muteNote.innerHTML = '<span>Site sounds are muted.</span><button type="button" class="fk-btn fk-unmute">Unmute</button>';
      det.appendChild(muteNote);
    }
    muteNote.classList.add('fk-on');
    clearTimeout(muteNote._t);
    muteNote._t = setTimeout(hideMuteNote, 7000);
  }
  function paintPlay() {
    Array.prototype.forEach.call(det.querySelectorAll('.fk-play'), function (b) {
      var on = !!(playing && b.getAttribute('data-src') === playing && player && !player.paused);
      b.classList.toggle('fk-on', on);
      b.setAttribute('aria-pressed', String(on));
      if (!(playing && b.getAttribute('data-src') === playing)) b.style.removeProperty('--p');
    });
  }
  var raf = 0;
  function tick() {
    cancelAnimationFrame(raf);
    if (!player || !playing) return;
    var d = player.duration, p = d && isFinite(d) ? Math.min(1, player.currentTime / d) : 0;
    Array.prototype.forEach.call(det.querySelectorAll('.fk-play'), function (b) {
      if (b.getAttribute('data-src') !== playing) return;
      b.style.setProperty('--p', (p * 360).toFixed(2) + 'deg');
      var t = b.parentNode.querySelector('.fk-theme-t');
      if (t) t.textContent = fmt(player.currentTime) + (d && isFinite(d) ? ' / ' + fmt(d) : '');
    });
    if (!player.paused) raf = requestAnimationFrame(tick);
  }
  function waitOff() { Array.prototype.forEach.call(det.querySelectorAll('.fk-play.fk-wait'), function (b) { b.classList.remove('fk-wait'); }); }
  function playBtn(b) {
    var src = b.getAttribute('data-src');
    if (window.ugSoundMuted && window.ugSoundMuted()) { pending = b; showMuteNote(); return; }
    pending = null;
    if (!player) {
      player = new Audio();
      player.preload = 'auto';
      player.volume = 0.8;
      player.addEventListener('playing', function () { waitOff(); paintPlay(); tick(); });
      player.addEventListener('waiting', function () { Array.prototype.forEach.call(det.querySelectorAll('.fk-play'), function (x) { if (x.getAttribute('data-src') === playing) x.classList.add('fk-wait'); }); });
      player.addEventListener('pause', function () { paintPlay(); tick(); });
      player.addEventListener('seeked', tick);
      player.addEventListener('ended', function () { cancelAnimationFrame(raf); playing = null; waitOff(); paintPlay(); Array.prototype.forEach.call(det.querySelectorAll('.fk-theme-t'), function (t) { t.textContent = ''; }); });
      player.addEventListener('error', function () { var bad = playing; cancelAnimationFrame(raf); playing = null; waitOff(); Array.prototype.forEach.call(det.querySelectorAll('.fk-play'), function (x) { if (x.getAttribute('data-src') === bad) x.classList.add('fk-err'); }); paintPlay(); });
    }
    if (playing === src) { if (player.paused) player.play().catch(function () {}); else player.pause(); return; }
    if (!player.paused) player.pause();
    waitOff();
    playing = src;
    paintPlay();
    b.classList.add('fk-wait');
    player.src = src;
    player.play().catch(function () { if (playing === src) { playing = null; waitOff(); paintPlay(); } });
  }

  function showMissing(id) {
    cur = null;
    det.innerHTML = '<div class="fk-page"><div class="fk-top"><a class="fk-x" href="' + esc(BACK_HREF || BASE) + '" data-back="1" aria-label="Back to ' + esc(BACK_NAME) + '"></a></div><p class="fk-none">There is no character called &ldquo;' + esc(id) + '&rdquo; in The Forsaken.</p></div>';
    gridView.hidden = true;
    det.hidden = false;
    var m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex';
    document.head.appendChild(m);
    dropPre();
  }

  var sb = null, sbT = null;
  function sbSync() {
    if (!sb) return;
    var ch = det.clientHeight, sh = det.scrollHeight, cap = Math.round(sb.clientWidth * 34 / 60) + 1, th = sb.clientHeight - cap * 2;
    if (sh <= ch + 2) { sb.hidden = true; return; }
    sb.hidden = false;
    var h = Math.max(44, Math.round(th * ch / sh));
    sbT.style.height = h + 'px';
    sbT.style.transform = 'translateY(' + (cap + Math.round((th - h) * det.scrollTop / (sh - ch))) + 'px)';
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
    function ratio() { var th = sb.clientHeight - (Math.round(sb.clientWidth * 34 / 60) + 1) * 2 - sbT.offsetHeight; return th > 0 ? (det.scrollHeight - det.clientHeight) / th : 0; }
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

  var CORNER = (function () {
    var seed = 11;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function j(a) { return (rnd() * 2 - 1) * a; }
    var p = [], t = 5.2, x, y;
    for (x = 2; x <= 37; x += 1.5) p.push([x + j(0.3), 2 + j(0.55)]);
    p.push([39 + j(0.6), 2.6 + j(0.4)], [39.6 + j(0.4), 4.2 + j(0.5)], [38.4 + j(0.5), 2 + t + j(0.4)]);
    for (x = 36.5; x >= 2 + t; x -= 1.5) p.push([x + j(0.3), 2 + t + j(x > 30 ? 0.9 : 0.5)]);
    for (y = 2 + t + 1.5; y <= 37; y += 1.5) p.push([2 + t + j(y > 30 ? 0.9 : 0.5), y + j(0.3)]);
    p.push([2 + t + j(0.4), 38.6 + j(0.5)], [4.1 + j(0.5), 39.6 + j(0.4)], [2.6 + j(0.4), 39 + j(0.6)]);
    for (y = 37; y >= 2; y -= 1.5) p.push([2 + j(0.55), y + j(0.3)]);
    var nicks = [];
    for (var n = 0; n < 5; n++) { var along = 12 + rnd() * 22, horiz = rnd() > 0.5; nicks.push(horiz ? [along, 2 + rnd() * t, 0.6 + rnd() * 1.1, 0.7 + rnd() * 0.9] : [2 + rnd() * t, along, 0.7 + rnd() * 0.9, 0.6 + rnd() * 1.1]); }
    return { pts: p, nicks: nicks };
  })();
  var MO_COL = '#ece6da';
  function cornerPath(fx, fy) {
    var d = CORNER.pts.map(function (q, i) { return (i ? 'L' : 'M') + (fx ? 40 - q[0] : q[0]).toFixed(2) + ' ' + (fy ? 40 - q[1] : q[1]).toFixed(2); }).join('') + 'Z';
    var cut = CORNER.nicks.map(function (k) { var x = fx ? 40 - k[0] - k[2] : k[0], y = fy ? 40 - k[1] - k[3] : k[1]; return '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + k[2].toFixed(2) + '" height="' + k[3].toFixed(2) + '"/>'; }).join('');
    return { d: d, cut: cut };
  }
  function cornerSetUri() {
    var size = 160 * 0.26, k = size / 40, body = '', masks = '';
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(function (f, n) {
      var c = cornerPath(f[0], f[1]);
      masks += '<mask id="m' + n + '"><rect width="40" height="40" fill="#fff"/><g fill="#000">' + c.cut + '</g></mask>';
      body += '<g transform="translate(' + (f[0] ? 160 - size : 0).toFixed(2) + ' ' + (f[1] ? 200 - size : 0).toFixed(2) + ') scale(' + k.toFixed(4) + ')"><path mask="url(#m' + n + ')" fill="' + MO_COL + '" d="' + c.d + '"/></g>';
    });
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" preserveAspectRatio="none"><defs>' + masks + '</defs>' + body + '</svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/\(/g, '%28').replace(/\)/g, '%29') + '")';
  }
  root.style.setProperty('--mo', cornerSetUri());
  function drawCorners(dst, x0, y0, w, h, dpr) {
    var size = w * 0.26, sc = size / 40;
    var layer = document.createElement('canvas');
    layer.width = dst.canvas.width; layer.height = dst.canvas.height;
    var o = layer.getContext('2d');
    o.save();
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(function (f) {
      var ox = f[0] ? x0 + w - size : x0, oy = f[1] ? y0 + h - size : y0;
      o.save();
      o.beginPath();
      CORNER.pts.forEach(function (q, i) { var px = ox + (f[0] ? 40 - q[0] : q[0]) * sc, py = oy + (f[1] ? 40 - q[1] : q[1]) * sc; if (i) o.lineTo(px, py); else o.moveTo(px, py); });
      o.closePath();
      o.fillStyle = MO_COL; o.fill();
      o.globalCompositeOperation = 'destination-out';
      CORNER.nicks.forEach(function (k) { var nx = f[0] ? 40 - k[0] - k[2] : k[0], ny = f[1] ? 40 - k[1] - k[3] : k[1]; o.fillRect(ox + nx * sc, oy + ny * sc, k[2] * sc, k[3] * sc); });
      o.restore();
    });
    o.restore();
    dst.save();
    dst.shadowColor = 'rgba(0,0,0,.9)'; dst.shadowBlur = 2 * dpr;
    dst.drawImage(layer, 0, 0);
    dst.restore();
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
    o.textAlign = 'center';
    o.strokeText(c.name, W / 2, H - 12 * dpr);
    o.fillStyle = getComputedStyle(nameEl).color; o.fillText(c.name, W / 2, H - 12 * dpr);
    o.textAlign = 'start';
    if (tearImg && tearImg.complete && tearImg.naturalWidth) { try { o.drawImage(tearImg, 0, 0, W, H); } catch (e) {} }
    drawCorners(o, 2 * dpr, 2 * dpr, W - 4 * dpr, H - 4 * dpr, dpr);
    var bdg = cardEl.querySelector('.fk-badge');
    if (bdg && bdg.complete && bdg.naturalWidth) {
      var br = bdg.getBoundingClientRect();
      try { o.drawImage(bdg, (br.left - r.left) * dpr, (br.top - r.top) * dpr, br.width * dpr, br.height * dpr); } catch (e) {}
    }
    var base;
    try { base = o.getImageData(0, 0, W, H).data; } catch (e) { done(); return; }
    cardEl.classList.add('fk-burning');
    document.body.appendChild(cv);
    cardEl.style.visibility = 'hidden';
    gridView.classList.add('fk-dim');
    ash(ctx, base, W, H, P, dpr, 680, function () {
      done();
      setTimeout(function () { if (cv.isConnected) cv.remove(); }, 900);
    }, function () { cv.remove(); });
  }

  function ash(ctx, base, W, H, P, dpr, DUR, finish, end, over, soft) {
    soft = soft || 0.11;
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
    var parts = [], t0 = 0, last = 0, fired = 0;
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
          px[j] = 255; px[j + 1] = e < 0.35 ? 236 : e < 0.7 ? 140 : 70; px[j + 2] = e < 0.35 ? 160 : e < 0.7 ? 36 : 12; px[j + 3] = base[j + 3];
          continue;
        }
        var f = d < 0.03 + soft ? 0.15 + 0.85 * Math.pow((d - 0.03) / soft, 0.7) : 1;
        px[j] = base[j] * f; px[j + 1] = base[j + 1] * f; px[j + 2] = base[j + 2] * f; px[j + 3] = base[j + 3];
      }
      ctx.clearRect(0, 0, W, H + P);
      ctx.putImageData(out, 0, P);
      for (var sp = 0; sp < (W * H > 60000 ? 40 : 160) && k < 0.97; sp++) {
        var rx = (Math.random() * W) | 0, ry = (Math.random() * H) | 0, dd = field[ry * W + rx] - th;
        if (dd > -0.01 && dd < 0.035 && base[(ry * W + rx) * 4 + 3] > 40) parts.push({ x: rx, y: ry + P, vx: (Math.random() - 0.5) * 30 * dpr, vy: -(40 + Math.random() * 70) * dpr, life: 0.5 + Math.random() * 0.5, age: 0, r: (0.8 + Math.random() * 1.6) * dpr });
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
      if (over) over(ctx);
      if (k < 1 || parts.length) { requestAnimationFrame(frame); if (k >= 1 && !fired) { fired = 1; finish(); } return; }
      if (!fired) finish();
      end();
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
    try {
      if (dir) sessionStorage.setItem('fk-dir', String(dir)); else sessionStorage.removeItem('fk-dir');
      if (FROM && url.indexOf(BASE + '/') === 0) sessionStorage.setItem('fk-from', JSON.stringify({ fkFrom: FROM.fkFrom, fkHops: FROM.fkHops + 1 }));
    } catch (e) {}
    shade(dir, function () { location.assign(url); });
  }

  function step(dir) {
    if (!cur || busy) return;
    var list = scopeOf(cur).ids, i = list.indexOf(cur.id);
    leave(BASE + '/' + list[(i + dir + list.length) % list.length], dir);
  }

  function toRoster() {
    if (FROM) {
      if (busy) return;
      busy = true;
      var hops = FROM.fkHops + 1;
      shade(0, function () { if (history.length > hops) history.go(-hops); else location.assign(FROM.fkFrom); });
      return;
    }
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
      if (u === img) l.crossOrigin = 'anonymous';
      document.head.appendChild(l);
    });
  }
  function warm(e) {
    var a = e.target.closest && e.target.closest('a.fk-card, [data-go]');
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
    try { if (st.cls !== 'all') sessionStorage.setItem('fk-scope', JSON.stringify({ side: st.tab, cls: st.cls, ids: groupIds(st.cls, st.tab) })); else sessionStorage.removeItem('fk-scope'); } catch (err) {}
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
  det.addEventListener('play', function (e) {
    if (e.target.tagName !== 'VIDEO' || e.target.muted) return;
    Array.prototype.forEach.call(det.querySelectorAll('video'), function (v) { if (v !== e.target && !v.paused && !v.muted) v.pause(); });
    if (player && !player.paused) player.pause();
  }, true);
  var vio = null;
  function vidRun(v) {
    if (!v.isConnected) { if (vio) vio.unobserve(v); return; }
    if (v._vis && !v.closest('[hidden]')) { v.muted = true; v.preload = 'auto'; if (v.paused) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } }
    else if (!v.paused) v.pause();
  }
  function vidWatch() {
    if (reduced || !('IntersectionObserver' in window)) return;
    if (!vio) vio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target._vis = e.isIntersecting; vidRun(e.target); }); }, { threshold: 0.2 });
    Array.prototype.forEach.call(det.querySelectorAll('.fk-ab-v video:not([data-vw])'), function (v) { v.setAttribute('data-vw', ''); vio.observe(v); });
  }
  if ('MutationObserver' in window) new MutationObserver(vidWatch).observe(det, { childList: true, subtree: true });
  vidWatch();
  det.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d.classList && d.classList.contains('fk-st') && d.open) Array.prototype.forEach.call(d.parentNode.querySelectorAll('.fk-st[open]'), function (o) { if (o !== d) o.open = false; });
    sbSync();
  }, true);
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
    var ar = e.target.closest('.fk-abref');
    if (ar) { e.preventDefault(); jumpAb(ar); return; }
    var stt = e.target.closest('.fk-st-t');
    if (stt) { showStrat(stt); return; }
    var slot = e.target.closest('.fk-slot');
    if (slot) { e.preventDefault(); showAbility(slot); return; }
    var pb = e.target.closest('.fk-play');
    if (pb) { e.preventDefault(); playBtn(pb); return; }
    var vm = e.target.closest('.fk-vmore');
    if (vm) { var ul = vm.previousElementSibling; ul.classList.remove('fk-vclip'); vm.remove(); sbSync(); return; }
    var um = e.target.closest('.fk-unmute');
    if (um) { if (window.ugSoundToggle && window.ugSoundMuted && window.ugSoundMuted()) window.ugSoundToggle(); hideMuteNote(); if (pending) playBtn(pending); return; }
    var md = e.target.closest('.fk-mode');
    if (md) { swapMode(md); return; }
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
    var tl = e.target && e.target.closest && e.target.closest('.fk-load');
    if (tl && /^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) {
      e.preventDefault();
      var ts = Array.prototype.slice.call(tl.querySelectorAll('.fk-slot')), at = ts.indexOf(e.target.closest('.fk-slot'));
      var to = e.key === 'Home' ? 0 : e.key === 'End' ? ts.length - 1 : (at + (e.key === 'ArrowRight' ? 1 : -1) + ts.length) % ts.length;
      showAbility(ts[to], true);
      return;
    }
    var sl = e.target && e.target.closest && e.target.closest('.fk-st-tabs');
    if (sl && /^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) {
      e.preventDefault();
      var ss = Array.prototype.slice.call(sl.querySelectorAll('.fk-st-t')), sa = ss.indexOf(e.target.closest('.fk-st-t'));
      showStrat(ss[e.key === 'Home' ? 0 : e.key === 'End' ? ss.length - 1 : (sa + (e.key === 'ArrowRight' ? 1 : -1) + ss.length) % ss.length], true);
      return;
    }
    var sm = e.target && e.target.closest && e.target.closest('.fk-st summary');
    if (sm && /^(ArrowLeft|ArrowRight)$/.test(e.key)) return;
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
    if (window.fkNames) fkNames(root, d.characters, CHAR || null, BASE);
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
    dropPre();
    gridView.querySelector('.fk-list').innerHTML = '<p class="fk-none">The characters could not load. Refresh the page to try again.</p>';
  });
})();
