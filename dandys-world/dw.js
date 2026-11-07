(function () {
  var root = document.getElementById('dw');
  if (!root) return;
  var BASE = (root.getAttribute('data-base') || '/dandys-world/roster').replace(/\/$/, '');
  var SRC = root.getAttribute('data-src');
  var MEDIA = root.getAttribute('data-media') || '/dandys-world/img/';
  var det = root.querySelector('.dw-detail');
  var list = root.querySelector('.dw-list');
  var chipsEl = root.querySelector('.dw-chips');
  var titleEl = root.querySelector('.dw-title');
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RAR = ['Main', 'Common', 'Uncommon', 'Rare', 'Lethal'];
  var data = null, byId = {}, toons = [], tws = [], cur = null, busy = false;
  var st = { tab: 'toon', r: 'all', sel: '' };

  function idFromPath() {
    var p = location.pathname.replace(/^\/overhaul(?=\/)/, '').replace(/\/+$/, '');
    if (p.indexOf(BASE + '/') !== 0) return '';
    var id = p.slice(BASE.length + 1);
    try { id = decodeURIComponent(id); } catch (e) {}
    return id.toLowerCase();
  }
  var CHAR = idFromPath();
  if (CHAR) document.documentElement.classList.add('dw-char', 'dw-on');

  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function media(p) { return p ? MEDIA + p : ''; }
  function inline(s) { return esc(s).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>'); }
  function rich(text) {
    var blocks = String(text || '').split(/\n{2,}/), html = '';
    blocks.forEach(function (b) {
      var lines = b.split('\n').filter(function (l) { return l.trim(); });
      if (!lines.length) return;
      var items = [], para = [];
      function flush() { if (para.length) { html += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; } }
      function flushList() { if (items.length) { html += '<ul>' + items.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ul>'; items = []; } }
      lines.forEach(function (l) {
        if (/^\s*•/.test(l)) { flush(); items.push(l.replace(/^\s*•\s*/, '')); }
        else { flushList(); para.push(l); }
      });
      flush();
      flushList();
    });
    return html;
  }

  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<linearGradient id="dwmg" x1="0" x2="1"><stop offset="0" stop-color="#5f5f64"/><stop offset=".22" stop-color="#cfcfd3"/><stop offset=".5" stop-color="#a7a7ac"/><stop offset=".8" stop-color="#8a8a90"/><stop offset="1" stop-color="#4f4f54"/></linearGradient>' +
    '<pattern id="dwdp" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="none"/><rect x="1" y="3" width="5" height="1.6" rx=".8" fill="#fff" opacity=".35"/><rect x="1" y="3.9" width="5" height=".8" rx=".4" fill="#000" opacity=".3"/></pattern>' +
    '<radialGradient id="dwrg" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ff9a9a"/><stop offset=".45" stop-color="#e42222"/><stop offset="1" stop-color="#6d0505"/></radialGradient>' +
    '<radialGradient id="dwgl"><stop offset="0" stop-color="#ff3b3b" stop-opacity=".85"/><stop offset="1" stop-color="#ff3b3b" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="dwgb" x1="0" x2="1"><stop offset="0" stop-color="#d9e2ea" stop-opacity=".32"/><stop offset=".5" stop-color="#e9eef2" stop-opacity=".14"/><stop offset="1" stop-color="#c9d3dc" stop-opacity=".3"/></linearGradient>' +
    '<symbol id="dw-mb" viewBox="0 0 120 150"><rect x="54" y="-4" width="12" height="9" rx="2" fill="#111"/>' +
    '<path d="M22 20C22 11 38 5 60 5S98 11 98 20L100 23H20Z" fill="url(#dwmg)" stroke="#000" stroke-width="2"/><path d="M22 20C22 11 38 5 60 5S98 11 98 20L100 23H20Z" fill="url(#dwdp)"/>' +
    '<rect x="16" y="21" width="88" height="99" rx="9" fill="url(#dwgb)" stroke="#000" stroke-width="2.5"/></symbol>' +
    '<symbol id="dw-mf" viewBox="0 0 120 150"><rect x="22" y="28" width="6" height="84" rx="3" fill="#fff" opacity=".3"/><rect x="95" y="30" width="2.5" height="80" rx="1.25" fill="#fff" opacity=".2"/>' +
    '<path d="M12 19H108V25H12Z" fill="url(#dwmg)" stroke="#000" stroke-width="2"/><path d="M12 19H108V25H12Z" fill="url(#dwdp)"/>' +
    '<circle cx="60" cy="13" r="12" fill="url(#dwgl)" style="opacity:var(--glow,0);transition:opacity .4s"/><circle cx="60" cy="13" r="6.5" fill="url(#dwrg)" stroke="#2a0000" stroke-width="1.6"/><rect x="58.8" y="8" width="2.4" height="10" rx="1.2" fill="#5a0000" transform="rotate(-18 60 13)"/>' +
    '<path d="M13 119C13 128 24 134 36 136V142H84V136C96 134 107 128 107 119Z" fill="url(#dwmg)" stroke="#000" stroke-width="2"/><path d="M13 119C13 128 24 134 36 136V142H84V136C96 134 107 128 107 119Z" fill="url(#dwdp)"/>' +
    '<ellipse cx="60" cy="119" rx="47" ry="5.5" fill="#4a4a4e" stroke="#000" stroke-width="2"/><ellipse cx="60" cy="119.4" rx="40" ry="3.5" fill="#18181a"/>' +
    '<rect x="32" y="140" width="56" height="7" rx="2.5" fill="#57575c" stroke="#000" stroke-width="2"/>' +
    '<circle cx="60" cy="131" r="7.5" fill="none" stroke="#000" stroke-width="5"/><circle cx="60" cy="131" r="7.5" fill="none" stroke="#e02020" stroke-width="2.8"/>' +
    '<path d="M60 131V123.5M60 131L53.5 134.8M60 131L66.5 134.8" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M60 131V123.5M60 131L53.5 134.8M60 131L66.5 134.8" stroke="#e02020" stroke-width="2.2" stroke-linecap="round"/><circle cx="60" cy="131" r="2.2" fill="#b80f0f" stroke="#000" stroke-width="1"/></symbol>' +
    '</defs></svg>';
  if (!document.getElementById('dwmg')) document.body.insertAdjacentHTML('afterbegin', SPRITE);

  var STAR_P = 'M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z';
  function star(f) {
    var gid = 'dws' + Math.random().toString(36).slice(2, 8);
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (f > 0 && f < 1 ? '<defs><linearGradient id="' + gid + '"><stop offset="' + f + '" stop-color="#fff"/><stop offset="' + f + '" stop-color="rgba(255,255,255,.18)"/></linearGradient></defs>' : '') +
      '<path d="' + STAR_P + '" fill="' + (f >= 1 ? '#fff' : f > 0 ? 'url(#' + gid + ')' : 'rgba(255,255,255,.16)') + '" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  }
  function stars(v) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += star(v >= i ? 1 : v > i - 1 ? v - (i - 1) : 0);
    return out;
  }
  var HEART_P = 'M16 28s-12-7.4-12-16a6.6 6.6 0 0 1 12-3.9A6.6 6.6 0 0 1 28 12c0 8.6-12 16-12 16z';
  function heartIcons(list) {
    return list.map(function (h) {
      return '<svg viewBox="0 0 32 30" aria-hidden="true"><path d="' + HEART_P + '" fill="#fff" stroke="#000" stroke-width="2.4" stroke-linejoin="round"/></svg>';
    }).join('');
  }
  function bar(k, label, inner, aria, text) {
    return '<li class="dw-bar" data-k="' + k + '"><span class="dw-bar-l dw-o">' + esc(label) + '</span><span class="dw-bar-v' + (text ? ' is-text dw-o' : '') + '"' + (aria ? ' role="img" aria-label="' + esc(aria) + '"' : '') + '>' + inner + '</span></li>';
  }
  function toonBars(c, notes) {
    var out = bar('health', 'Health', heartIcons(c.hearts), c.hearts.length + ' hearts');
    c.stats.forEach(function (s) {
      out += bar(s.k, s.label, s.v != null ? stars(s.v) : '?', s.label + ': ' + s.v + ' out of 5 stars');
      if (notes && s.note) out = out.replace(/<\/li>$/, '<span class="dw-stat-n">' + esc(s.note.replace(/\//g, ' · ')) + (s.k === 'stealth' ? ' noise' : '') + '</span></li>');
    });
    return out;
  }
  function first(s) { return String(s || '').split('\n')[0]; }
  function index() {
    toons = data.toons.map(function (c) { c.kind = 'toon'; return c; });
    tws = data.twisteds.map(function (t) { t.kind = 'twisted'; t.rarity = t.type; return t; });
    toons.concat(tws).forEach(function (c) { byId[c.id] = c; });
  }
  function rarityOf(c) { return c.kind === 'twisted' ? c.type : c.rarity; }
  function listFor(tab) { return tab === 'twisted' ? tws : toons; }
  function toonOf(c) { return c.kind === 'toon' ? c : byId[c.toon]; }

  function machine(c, on) {
    var tw = c.kind === 'twisted', r = rarityOf(c), t = toonOf(c), name = c.name.replace(/^Twisted /, '');
    return '<a class="dw-mc' + (tw ? ' dw-mc--tw' : '') + (c.event && !tw ? ' is-ev' : '') + (on && st.sel === c.id ? ' is-on' : '') + '" href="' + BASE + '/' + esc(c.id) + '" data-id="' + esc(c.id) + '" data-r="' + esc(r) + '" style="--c:' + esc((t && t.col) || '#888') + '" aria-label="' + esc(c.name + ', ' + r + (c.event ? ', Event' : '')) + '"' + (on && st.sel === c.id ? ' aria-current="true"' : '') + '>' +
      '<span class="dw-mc-m"><svg aria-hidden="true"><use href="#dw-mb"/></svg><span class="dw-mc-glass"><span class="dw-ink"></span><img src="' + esc(media(c.head || c.icon)) + '" alt="" loading="lazy" decoding="async"><span class="dw-pour"></span></span><svg aria-hidden="true"><use href="#dw-mf"/></svg></span>' +
      '<span class="dw-mc-n dw-o' + (name.length > 9 ? ' is-long' : '') + '">' + esc(name) + '</span></a>';
  }

  function renderChips() {
    var src = listFor(st.tab), have = {}, ev = false;
    src.forEach(function (c) { have[rarityOf(c)] = 1; if (c.event) ev = true; });
    var opts = [['all', 'All']].concat(RAR.filter(function (r) { return have[r]; }).map(function (r) { return [r, r]; }));
    if (ev) opts.push(['Event', 'Event']);
    if (!opts.some(function (o) { return o[0] === st.r; })) st.r = 'all';
    chipsEl.innerHTML = opts.map(function (o) {
      return '<button type="button" class="dw-chip"' + (o[0] !== 'all' ? ' data-r="' + esc(o[0]) + '"' : '') + ' data-v="' + esc(o[0]) + '" aria-pressed="' + (st.r === o[0]) + '">' + (o[0] !== 'all' ? '<i></i>' : '') + esc(o[1]) + '</button>';
    }).join('');
  }
  function shown() {
    return listFor(st.tab).filter(function (c) { return st.r === 'all' || (st.r === 'Event' ? c.event : rarityOf(c) === st.r); });
  }
  function renderGrid() {
    root.querySelectorAll('.dw-tab').forEach(function (t) {
      var on = t.getAttribute('data-tab') === st.tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    if (titleEl) titleEl.textContent = st.tab === 'twisted' ? 'Select Twisted' : 'Select Toon';
    renderChips();
    var src = shown();
    list.innerHTML = src.length ? src.map(function (c) { return machine(c, false); }).join('') : '<p class="dw-none">Nothing here.</p>';
  }
  function fill(id) {
    var prev = list.querySelector('.dw-mc.is-on');
    if (prev) { prev.classList.remove('is-on', 'is-filling'); prev.removeAttribute('aria-current'); }
    st.sel = id;
    var el = list.querySelector('.dw-mc[data-id="' + id + '"]');
    if (el) {
      void el.offsetWidth;
      el.classList.add('is-on', 'is-filling');
      el.setAttribute('aria-current', 'true');
    }
  }

  function saveRet() {
    try { sessionStorage.setItem('dw-ret', JSON.stringify({ tab: st.tab, r: st.r, sel: st.sel, y: Math.round(window.scrollY) })); } catch (e) {}
  }
  function flood(url, delay) {
    if (busy) return;
    busy = true;
    if (reduced || !Element.prototype.animate) { location.assign(url); return; }
    setTimeout(function () {
      var w = document.createElement('div');
      w.className = 'dw-flood';
      document.body.appendChild(w);
      var a = w.animate([{ height: '0' }, { height: '125vh' }], { duration: 560, easing: 'cubic-bezier(.55,0,.6,1)', fill: 'forwards' });
      a.onfinish = function () { location.assign(url); };
    }, delay || 0);
  }
  function open(id) {
    if (!byId[id] || busy) return;
    fill(id);
    saveRet();
    flood(BASE + '/' + id, reduced ? 0 : 900);
  }
  function leave(url) {
    if (busy) return;
    busy = true;
    if (reduced || !Element.prototype.animate) { location.assign(url); return; }
    var w = document.createElement('div');
    w.className = 'dw-wipe';
    document.body.appendChild(w);
    var a = w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'ease-in', fill: 'forwards' });
    a.onfinish = function () { location.assign(url); };
  }
  function toRoster() {
    try {
      sessionStorage.setItem('dw-restore', '1');
      if (cur) { var r = JSON.parse(sessionStorage.getItem('dw-ret') || 'null') || {}; r.tab = cur.kind; r.sel = cur.id; sessionStorage.setItem('dw-ret', JSON.stringify(r)); }
    } catch (e) {}
    leave(BASE);
  }
  function step(dir) {
    if (!cur) return;
    var l = listFor(cur.kind), i = l.indexOf(cur);
    leave(BASE + '/' + l[(i + dir + l.length) % l.length].id);
  }

  function counterpart(c) {
    if (c.kind === 'toon') {
      var t = byId[c.twisted];
      if (!t) return '';
      return '<a class="dw-panel dw-link" href="' + BASE + '/' + esc(t.id) + '" data-go="' + esc(t.id) + '"><img src="' + esc(media(t.head)) + '" alt="" loading="lazy"><small>Their Twisted</small><b class="dw-o">' + esc(t.name) + '</b><small>' + esc(t.type) + (t.trinket ? ' &middot; drops ' + esc(t.trinket) : '') + '</small></a>';
    }
    var o = byId[c.toon];
    if (!o) return '';
    return '<a class="dw-panel dw-link dw-link--toon" style="--lc:' + esc(o.col) + '" href="' + BASE + '/' + esc(o.id) + '" data-go="' + esc(o.id) + '"><img src="' + esc(media(o.head || o.icon)) + '" alt="" loading="lazy"><small>The Toon</small><b class="dw-o">' + esc(o.name) + '</b><small>' + esc(o.rarity) + (o.event ? ' &middot; Event' : '') + '</small></a>';
  }

  function navbox(c) {
    var l = listFor(c.kind), i = l.indexOf(c);
    var prev = l[(i - 1 + l.length) % l.length], next = l[(i + 1) % l.length];
    var rows = RAR.map(function (r) {
      var ids = l.filter(function (x) { return rarityOf(x) === r; });
      if (!ids.length) return '';
      return '<div class="dw-nav-r"><div class="dw-nav-k dw-o">' + esc(r) + '</div><div class="dw-nav-v">' + ids.map(function (x) {
        return '<a href="' + BASE + '/' + esc(x.id) + '" data-go="' + esc(x.id) + '"' + (x === c ? ' aria-current="page"' : '') + '>' + esc(x.name.replace(/^Twisted /, '')) + '</a>';
      }).join('') + '</div></div>';
    }).join('');
    return '<nav class="dw-panel dw-nav" aria-label="' + (c.kind === 'toon' ? 'All Toons' : 'All Twisteds') + '"><h2 class="dw-h2 dw-o">' + (c.kind === 'toon' ? 'All Toons' : 'All Twisteds') + '</h2>' + rows +
      '<div class="dw-pn"><a href="' + BASE + '/' + esc(prev.id) + '" data-go="' + esc(prev.id) + '" rel="prev">&lsaquo; Previous<em>' + esc(prev.name) + '</em></a><a href="' + BASE + '/' + esc(next.id) + '" data-go="' + esc(next.id) + '" rel="next">Next &rsaquo;<em>' + esc(next.name) + '</em></a></div></nav>';
  }

  var XSVG = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M4 4l12 12M16 4L4 16" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
  function top(c) {
    var l = listFor(c.kind), i = l.indexOf(c);
    var prev = l[(i - 1 + l.length) % l.length], next = l[(i + 1) % l.length];
    return '<div class="dw-top">' +
      '<a class="dw-btn dw-o" href="' + BASE + '/' + esc(prev.id) + '" data-go="' + esc(prev.id) + '" aria-label="Previous: ' + esc(prev.name) + '">&lsaquo;</a>' +
      '<span class="dw-count dw-o">' + (c.kind === 'toon' ? 'Toon' : 'Twisted') + ' ' + (i + 1) + ' / ' + l.length + '</span>' +
      '<a class="dw-btn dw-o" href="' + BASE + '/' + esc(next.id) + '" data-go="' + esc(next.id) + '" aria-label="Next: ' + esc(next.name) + '">&rsaquo;</a>' +
      '<a class="dw-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster" title="Back to the roster">' + XSVG + '</a></div>';
  }

  function toonPage(c) {
    var tags = '<span class="dw-tag" data-r="' + esc(c.rarity) + '">' + esc(c.rarity === 'Main' ? 'Main Character' : c.rarity) + '</span>' +
      (c.event ? '<span class="dw-tag" data-r="Event">Event Toon</span>' : '') +
      (c.designation ? '<span class="dw-tag">' + esc(c.designation) + '</span>' : '');
    var abil = c.abilities.map(function (a, n) {
      return '<div class="dw-ab"><span class="dw-ab-i">' + (a.icon ? '<img src="' + esc(media(a.icon)) + '" alt="" loading="lazy">' : '<span aria-hidden="true">' + (n + 1) + '</span>') + '</span>' +
        '<div class="dw-ab-n dw-o">' + esc(a.name) + (a.kind ? '<em>' + esc(a.kind) + '</em>' : '') + '</div>' +
        '<div class="dw-rich">' + rich(a.desc) + '</div></div>';
    }).join('');
    var reward = c.mastery && c.mastery.reward;
    var info = [['Gender', c.gender], ['Pronouns', c.pronouns], ['Released', c.released]].filter(function (x) { return x[1]; });
    return '<div class="dw-page">' + top(c) +
      '<div class="dw-hero"><div class="dw-artcol"><div class="dw-stage"><img class="dw-art" src="' + esc(media(c.art)) + '" alt="' + esc(c.name) + ', full render" decoding="async"></div></div>' +
      '<div class="dw-side"><div class="dw-panel dw-stripes"><h1 class="dw-name dw-o">' + esc(c.name) + '</h1>' + (c.full ? '<p class="dw-full">' + esc(c.full) + '</p>' : '') + '<div class="dw-tags">' + tags + '</div></div>' +
      (c.desc ? '<div class="dw-panel dw-stripes"><p class="dw-quote dw-rich">&ldquo;' + esc(c.desc) + '&rdquo;<small>Introduction card</small></p></div>' : '') +
      '<div class="dw-panel dw-stripes"><h2 class="dw-h2 dw-o">Stats</h2><ul class="dw-bars">' + toonBars(c, true) + '</ul></div>' +
      '<div class="dw-panel dw-stripes"><h2 class="dw-h2 dw-o">Abilities</h2>' + abil + '</div></div></div>' +
      '<div class="dw-grid2"><div class="dw-panel dw-stripes"><h2 class="dw-h2 dw-o">How to unlock</h2><div class="dw-rich">' + c.unlock.map(rich).join('') + '</div></div>' + counterpart(c) + '</div>' +
      (c.skins.length ? '<div class="dw-panel dw-stripes dw-sec" id="skins"><h2 class="dw-h2 dw-o">Skins <small>' + c.skins.length + '</small></h2><ul class="dw-skins">' + c.skins.map(function (s) { return '<li class="dw-o' + (reward && reward.indexOf(s) !== -1 ? ' is-reward' : '') + '">' + esc(s) + '</li>'; }).join('') + '</ul></div>' : '') +
      (c.mastery ? '<div class="dw-panel dw-stripes dw-sec" id="mastery"><h2 class="dw-h2 dw-o">Mastery</h2><ul class="dw-tasks">' + c.mastery.tasks.map(function (t) { return '<li class="dw-o">' + esc(t) + '</li>'; }).join('') + '</ul>' + (reward ? '<p class="dw-reward dw-o">Reward: <b>' + esc(reward) + '</b></p>' : '') + '</div>' : '') +
      (c.strategies ? '<details class="dw-more dw-stripes dw-sec" id="strategies"><summary class="dw-o">Strategies</summary><div class="dw-rich">' + rich(c.strategies) + '</div></details>' : '') +
      (info.length ? '<div class="dw-panel dw-stripes dw-sec"><h2 class="dw-h2 dw-o">Info</h2><dl class="dw-dl">' + info.map(function (x) { return '<dt class="dw-o">' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('') + '</dl></div>' : '') +
      navbox(c) + foot(c) + '</div>';
  }

  function twPage(c) {
    var facts = [['Speed', c.speed], ['Attention span', c.attention_span], ['Detection range', c.detection_range], ['Drops', c.trinket]].filter(function (x) { return x[1]; });
    return '<div class="dw-page">' + top(c) +
      '<div class="dw-hero"><div class="dw-artcol"><div class="dw-stage"><img class="dw-art" src="' + esc(media(c.art)) + '" alt="' + esc(c.name) + ', full render" decoding="async"></div></div>' +
      '<div class="dw-side"><div class="dw-panel dw-stripes"><h1 class="dw-name dw-o">' + esc(c.name) + '</h1><div class="dw-tags"><span class="dw-tag" data-r="' + esc(c.type) + '">' + esc(c.type === 'Main' ? 'Main Twisted' : c.type) + '</span></div></div>' +
      (facts.length ? '<div class="dw-panel dw-stripes"><h2 class="dw-h2 dw-o">Stats</h2><dl class="dw-dl">' + facts.map(function (x) { return '<dt class="dw-o">' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('') + '</dl></div>' : '') +
      (c.mechanic ? '<div class="dw-panel dw-stripes"><h2 class="dw-h2 dw-o">Mechanic</h2><div class="dw-rich">' + rich(c.mechanic) + '</div></div>' : '') +
      counterpart(c) + '</div></div>' +
      (c.research ? '<div class="dw-panel dw-stripes dw-sec"><h2 class="dw-h2 dw-o">How it behaves</h2><div class="dw-rich">' + rich(c.research) + '</div></div>' : '') +
      (c.strategies ? '<details class="dw-more dw-stripes dw-sec" id="strategies"><summary class="dw-o">Strategies</summary><div class="dw-rich">' + rich(c.strategies) + '</div></details>' : '') +
      navbox(c) + foot(c) + '</div>';
  }

  function foot(c) {
    return '<p class="dw-foot">Stats, abilities and art are from the <a href="' + esc(data.source + '/wiki/' + encodeURIComponent(c.name.replace(/ /g, '_'))) + '" target="_blank" rel="noopener">' + esc(c.name) + ' page on the Dandy\'s World Wiki</a> (Fandom).</p>';
  }

  var NAME_RE = null;
  function nameRe() {
    if (NAME_RE) return NAME_RE;
    var names = toons.concat(tws).map(function (c) { return c.name; }).sort(function (a, b) { return b.length - a.length; });
    NAME_RE = new RegExp('(^|[^A-Za-z0-9])(' + names.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')(?![A-Za-z0-9]|\'s World| \\(Trinket\\))', 'g');
    return NAME_RE;
  }
  function markNames(scope, self) {
    var byName = {};
    toons.concat(tws).forEach(function (c) { byName[c.name] = c; });
    var re = nameRe();
    scope.querySelectorAll('.dw-rich, .dw-dl dd').forEach(function (box) {
      var w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = w.nextNode())) nodes.push(n);
      nodes.forEach(function (t) {
        if (t.parentElement.closest('a, .dw-n')) return;
        var s = t.nodeValue, m, last = 0, frag = null;
        re.lastIndex = 0;
        while ((m = re.exec(s))) {
          var c = byName[m[2]];
          if (!c) continue;
          frag = frag || document.createDocumentFragment();
          var at = m.index + m[1].length;
          if (at > last) frag.appendChild(document.createTextNode(s.slice(last, at)));
          var el;
          if (c === self) { el = document.createElement('span'); el.className = 'dw-n dw-n--self dw-n--' + (c.kind === 'toon' ? 'toon' : 'tw'); }
          else { el = document.createElement('a'); el.className = 'dw-n dw-n--' + (c.kind === 'toon' ? 'toon' : 'tw'); el.href = BASE + '/' + c.id; el.setAttribute('data-go', c.id); }
          el.textContent = m[2];
          frag.appendChild(el);
          last = at + m[2].length;
        }
        if (!frag) return;
        if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
        t.parentNode.replaceChild(frag, t);
      });
    });
  }

  function showDetail(id) {
    var c = byId[id];
    var cover = document.querySelector('.dw-cover');
    det.hidden = false;
    if (!c) {
      det.className = 'dw-detail';
      det.innerHTML = '<div class="dw-page"><div class="dw-top"><a class="dw-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster">' + XSVG + '</a></div><div class="dw-panel dw-stripes dw-missing"><h1 class="dw-name dw-o">Not found</h1><p>There is no Toon or Twisted called &ldquo;' + esc(id) + '&rdquo;.</p></div></div>';
      if (cover) cover.remove();
      return;
    }
    cur = c;
    var toon = toonOf(c);
    det.className = 'dw-detail' + (c.kind === 'twisted' ? ' is-tw' : '');
    det.style.setProperty('--c', (toon && toon.col) || '#777');
    det.innerHTML = c.kind === 'toon' ? toonPage(c) : twPage(c);
    markNames(det, c);
    document.title = c.name + ' | Dandy\'s World Roster | FNTD User Guide';
    if (cover) cover.remove();
    var h = location.hash.slice(1), target = h && /^[a-z]+$/.test(h) ? det.querySelector('#' + h) : null;
    if (target) {
      if (target.tagName === 'DETAILS') target.open = true;
      requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
    }
    try { det.focus({ preventScroll: true }); } catch (e) {}
  }

  root.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    var tab = e.target.closest('.dw-tab');
    if (tab) { st.tab = tab.getAttribute('data-tab'); st.r = 'all'; st.sel = ''; renderGrid(); return; }
    var chip = e.target.closest('.dw-chip');
    if (chip) { st.r = chip.getAttribute('data-v'); renderGrid(); return; }
    var back = e.target.closest('[data-back]');
    if (back) { e.preventDefault(); toRoster(); return; }
    var go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); if (cur && go.getAttribute('data-go') === cur.id) return; leave(BASE + '/' + go.getAttribute('data-go')); return; }
    var mc = e.target.closest('a.dw-mc');
    if (mc) {
      e.preventDefault();
      open(mc.getAttribute('data-id'));
    }
  });
  root.addEventListener('keydown', function (e) {
    var tab = e.target.closest && e.target.closest('.dw-tab');
    if (tab && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      st.tab = st.tab === 'toon' ? 'twisted' : 'toon';
      st.r = 'all';
      st.sel = '';
      renderGrid();
      root.querySelector('.dw-tab[data-tab="' + st.tab + '"]').focus();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (!cur || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (t && t.closest && t.closest('summary') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Escape') { e.preventDefault(); toRoster(); }
  });
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    busy = false;
    document.querySelectorAll('.dw-wipe, .dw-flood').forEach(function (x) { x.remove(); });
  });

  fetch(SRC).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    data = d;
    index();
    var tn = root.querySelector('.dw-tab[data-tab="toon"] .dw-tab-n'), wn = root.querySelector('.dw-tab[data-tab="twisted"] .dw-tab-n');
    if (tn) tn.textContent = toons.length;
    if (wn) wn.textContent = tws.length;
    if (CHAR) { showDetail(CHAR); return; }
    var ret = null;
    try { if (sessionStorage.getItem('dw-restore')) ret = JSON.parse(sessionStorage.getItem('dw-ret') || 'null'); sessionStorage.removeItem('dw-restore'); } catch (e) {}
    if (ret) { if (ret.tab === 'toon' || ret.tab === 'twisted') st.tab = ret.tab; if (ret.r) st.r = ret.r; }
    renderGrid();
    if (ret && ret.y) {
      var tries = 0;
      (function again() { window.scrollTo(0, ret.y); if (Math.abs(window.scrollY - ret.y) > 4 && tries++ < 20) setTimeout(again, 60); })();
    }
  }).catch(function () {
    list.innerHTML = '<p class="dw-none">The roster could not load. Refresh the page to try again.</p>';
    var cover = document.querySelector('.dw-cover');
    if (cover) cover.remove();
  });
})();
