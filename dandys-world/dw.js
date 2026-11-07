(function () {
  var root = document.getElementById('dw');
  if (!root) return;
  var BASE = (root.getAttribute('data-base') || '/dandys-world/roster').replace(/\/$/, '');
  var SRC = root.getAttribute('data-src');
  var MEDIA = root.getAttribute('data-media') || '/dandys-world/img/';
  var gridView = root.querySelector('.dw-grid-view');
  var det = root.querySelector('.dw-detail');
  var list = root.querySelector('.dw-list');
  var chipsEl = root.querySelector('.dw-chips');
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RAR = ['Main', 'Common', 'Uncommon', 'Rare', 'Lethal'];
  var data = null, byId = {}, toons = [], tws = [], cur = null, busy = false;
  var st = { tab: 'toon', r: 'all' };

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

  var STAR_P = 'M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z';
  function stars(v) {
    var out = '<span class="dw-stars" role="img" aria-label="' + esc(v) + ' out of 5 stars">';
    for (var i = 1; i <= 5; i++) {
      var f = v >= i ? 1 : v > i - 1 ? v - (i - 1) : 0, gid = 'dws' + Math.random().toString(36).slice(2, 8);
      out += '<svg class="dw-star" viewBox="0 0 24 24" aria-hidden="true">' + (f > 0 && f < 1 ? '<defs><linearGradient id="' + gid + '"><stop offset="' + f + '" stop-color="#ffcf3a"/><stop offset="' + f + '" stop-color="#fff"/></linearGradient></defs>' : '') +
        '<path d="' + STAR_P + '" fill="' + (f >= 1 ? '#ffcf3a' : f > 0 ? 'url(#' + gid + ')' : 'rgba(255,255,255,.9)') + '" stroke="#1c1330" stroke-width="2" stroke-linejoin="round"/></svg>';
    }
    return out + '</span>';
  }
  var HEART_P = 'M16 28s-12-7.4-12-16a6.6 6.6 0 0 1 12-3.9A6.6 6.6 0 0 1 28 12c0 8.6-12 16-12 16z';
  function hearts(list) {
    return '<div class="dw-hearts" role="img" aria-label="' + list.length + ' hearts">' + list.map(function (h) {
      var main = /Main/.test(h);
      return '<svg viewBox="0 0 32 30" aria-hidden="true"><path d="' + HEART_P + '" fill="' + (main ? '#ffcf3a' : '#ff5d73') + '" stroke="#1c1330" stroke-width="2.5" stroke-linejoin="round"/><path d="M9 10.5a3.6 3.6 0 0 1 4.6-2.3" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>';
    }).join('') + (list.some(function (h) { return /Main/.test(h); }) ? '<small>Gold heart: Main Character</small>' : '') + '</div>';
  }

  function index() {
    toons = data.toons.map(function (c) { c.kind = 'toon'; return c; });
    tws = data.twisteds.map(function (t) { t.kind = 'twisted'; t.rarity = t.type; return t; });
    toons.concat(tws).forEach(function (c) { byId[c.id] = c; });
  }
  function rarityOf(c) { return c.kind === 'twisted' ? c.type : c.rarity; }
  function listFor(tab) { return tab === 'twisted' ? tws : toons; }

  function card(c) {
    var tw = c.kind === 'twisted', r = rarityOf(c), toon = tw ? byId[c.toon] : c;
    return '<a class="dw-card' + (tw ? ' dw-card--tw' : '') + '" href="' + BASE + '/' + esc(c.id) + '" data-id="' + esc(c.id) + '" style="--c:' + esc((toon && toon.col) || '#8a7ab0') + '" aria-label="' + esc(c.name + ', ' + r + (c.event ? ', Event' : '')) + '">' +
      '<img src="' + esc(media(tw ? c.head : c.icon)) + '" alt="" loading="lazy" decoding="async">' +
      (c.event ? '<span class="dw-ev">Event</span>' : '') +
      '<span class="dw-pip" data-r="' + esc(r) + '" title="' + esc(r) + '"></span>' +
      '<span class="dw-card-n">' + esc(c.name.replace(/^Twisted /, '')) + '</span></a>';
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
  function renderGrid() {
    root.querySelectorAll('.dw-tab').forEach(function (t) {
      var on = t.getAttribute('data-tab') === st.tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    renderChips();
    var src = listFor(st.tab).filter(function (c) { return st.r === 'all' || (st.r === 'Event' ? c.event : rarityOf(c) === st.r); });
    list.innerHTML = src.length ? src.map(card).join('') : '<p class="dw-none">Nothing here.</p>';
  }

  function saveRet() {
    try { sessionStorage.setItem('dw-ret', JSON.stringify({ tab: st.tab, r: st.r, y: Math.round(window.scrollY) })); } catch (e) {}
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
    try { sessionStorage.setItem('dw-restore', '1'); } catch (e) {}
    if (cur) { try { var r = JSON.parse(sessionStorage.getItem('dw-ret') || 'null') || {}; r.tab = cur.kind; sessionStorage.setItem('dw-ret', JSON.stringify(r)); } catch (e) {} }
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
      return '<a class="dw-panel dw-link" href="' + BASE + '/' + esc(t.id) + '" data-go="' + esc(t.id) + '"><img src="' + esc(media(t.head)) + '" alt="" loading="lazy"><small>Their Twisted</small><b>' + esc(t.name) + '</b><small>' + esc(t.type) + (t.trinket ? ' &middot; drops ' + esc(t.trinket) : '') + '</small></a>';
    }
    var o = byId[c.toon];
    if (!o) return '';
    return '<a class="dw-panel dw-link dw-link--toon" style="--lc:' + esc(o.col) + '" href="' + BASE + '/' + esc(o.id) + '" data-go="' + esc(o.id) + '"><img src="' + esc(media(o.icon)) + '" alt="" loading="lazy"><small>The Toon</small><b>' + esc(o.name) + '</b><small>' + esc(o.rarity) + (o.event ? ' &middot; Event' : '') + '</small></a>';
  }

  function navbox(c) {
    var l = listFor(c.kind), i = l.indexOf(c);
    var prev = l[(i - 1 + l.length) % l.length], next = l[(i + 1) % l.length];
    var rows = RAR.map(function (r) {
      var ids = l.filter(function (x) { return rarityOf(x) === r; });
      if (!ids.length) return '';
      return '<div class="dw-nav-r"><div class="dw-nav-k">' + esc(r) + '</div><div class="dw-nav-v">' + ids.map(function (x) {
        return '<a href="' + BASE + '/' + esc(x.id) + '" data-go="' + esc(x.id) + '"' + (x === c ? ' aria-current="page"' : '') + '>' + esc(x.name.replace(/^Twisted /, '')) + '</a>';
      }).join('') + '</div></div>';
    }).join('');
    return '<nav class="dw-panel dw-nav" aria-label="' + (c.kind === 'toon' ? 'All Toons' : 'All Twisteds') + '"><h2 class="dw-h2">' + (c.kind === 'toon' ? 'All Toons' : 'All Twisteds') + '</h2>' + rows +
      '<div class="dw-pn"><a href="' + BASE + '/' + esc(prev.id) + '" data-go="' + esc(prev.id) + '" rel="prev">&lsaquo; Previous<em>' + esc(prev.name) + '</em></a><a href="' + BASE + '/' + esc(next.id) + '" data-go="' + esc(next.id) + '" rel="next">Next &rsaquo;<em>' + esc(next.name) + '</em></a></div></nav>';
  }

  function top(c) {
    var l = listFor(c.kind), i = l.indexOf(c);
    var prev = l[(i - 1 + l.length) % l.length], next = l[(i + 1) % l.length];
    return '<div class="dw-top">' +
      '<a class="dw-btn" href="' + BASE + '/' + esc(prev.id) + '" data-go="' + esc(prev.id) + '" aria-label="Previous: ' + esc(prev.name) + '">&lsaquo;</a>' +
      '<span class="dw-count">' + (c.kind === 'toon' ? 'Toon' : 'Twisted') + ' ' + (i + 1) + ' / ' + l.length + '</span>' +
      '<a class="dw-btn" href="' + BASE + '/' + esc(next.id) + '" data-go="' + esc(next.id) + '" aria-label="Next: ' + esc(next.name) + '">&rsaquo;</a>' +
      '<a class="dw-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster" title="Back to the roster"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="#1c1330" stroke-width="3.6" stroke-linecap="round"/></svg></a></div>';
  }

  function toonPage(c) {
    var tags = '<span class="dw-tag" data-r="' + esc(c.rarity) + '">' + esc(c.rarity === 'Main' ? 'Main Character' : c.rarity) + '</span>' +
      (c.event ? '<span class="dw-tag" data-r="Event">Event Toon</span>' : '') +
      (c.designation ? '<span class="dw-tag">' + esc(c.designation) + '</span>' : '');
    var statRows = c.stats.map(function (s) {
      return '<li class="dw-stat"><span class="dw-stat-l">' + esc(s.label) + '</span>' + (s.v != null ? stars(s.v) : '<span>?</span>') +
        (s.note ? '<span class="dw-stat-n">' + esc(s.note.replace(/\//g, ' · ')) + (s.k === 'stealth' ? ' noise' : '') + '</span>' : '') + '</li>';
    }).join('');
    var abil = c.abilities.map(function (a) {
      return '<div class="dw-ab"><span class="dw-ab-i">' + (a.icon ? '<img src="' + esc(media(a.icon)) + '" alt="" loading="lazy">' : '<span aria-hidden="true">' + (a.kind === 'Passive' ? '&#9679;' : '&#9733;') + '</span>') + '</span>' +
        '<div class="dw-ab-n">' + esc(a.name) + (a.kind ? '<span class="dw-kind dw-kind--' + esc(a.kind) + '">' + esc(a.kind) + '</span>' : '') + '</div>' +
        '<div class="dw-rich">' + rich(a.desc) + '</div></div>';
    }).join('');
    var info = [['Gender', c.gender], ['Pronouns', c.pronouns], ['Released', c.released]].filter(function (x) { return x[1]; });
    return '<div class="dw-page">' + top(c) +
      '<div class="dw-hero"><div class="dw-artcol"><div class="dw-stage"><img class="dw-art" src="' + esc(media(c.art)) + '" alt="' + esc(c.name) + ', full render" decoding="async"></div></div>' +
      '<div class="dw-side"><div class="dw-panel"><h1 class="dw-name">' + esc(c.name) + '</h1>' + (c.full ? '<p class="dw-full">' + esc(c.full) + '</p>' : '') + '<div class="dw-tags">' + tags + '</div>' + hearts(c.hearts) + '</div>' +
      (c.desc ? '<div class="dw-panel"><p class="dw-quote dw-rich">' + esc(c.desc) + '<small>Introduction card</small></p></div>' : '') +
      '<div class="dw-panel"><h2 class="dw-h2">Stats</h2><ul class="dw-stats">' + statRows + '</ul></div>' +
      '<div class="dw-panel"><h2 class="dw-h2">Abilities</h2>' + abil + '</div></div></div>' +
      '<div class="dw-grid2"><div class="dw-panel"><h2 class="dw-h2">How to unlock</h2><div class="dw-rich">' + c.unlock.map(rich).join('') + '</div></div>' + counterpart(c) + '</div>' +
      (c.skins.length ? '<div class="dw-panel dw-sec"><h2 class="dw-h2">Skins <small>' + c.skins.length + '</small></h2><ul class="dw-skins">' + c.skins.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' : '') +
      (c.strategies ? '<details class="dw-more"><summary>Strategies</summary><div class="dw-rich">' + rich(c.strategies) + '</div></details>' : '') +
      (info.length ? '<div class="dw-panel dw-sec"><h2 class="dw-h2">Info</h2><dl class="dw-dl">' + info.map(function (x) { return '<dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('') + '</dl></div>' : '') +
      navbox(c) + foot(c) + '</div>';
  }

  function twPage(c) {
    var facts = [['Speed', c.speed], ['Attention span', c.attention_span], ['Detection range', c.detection_range], ['Drops', c.trinket]].filter(function (x) { return x[1]; });
    return '<div class="dw-page">' + top(c) +
      '<div class="dw-hero"><div class="dw-artcol"><div class="dw-stage"><img class="dw-art" src="' + esc(media(c.art)) + '" alt="' + esc(c.name) + ', full render" decoding="async"></div></div>' +
      '<div class="dw-side"><div class="dw-panel"><h1 class="dw-name">' + esc(c.name) + '</h1><div class="dw-tags"><span class="dw-tag" data-r="' + esc(c.type) + '">' + esc(c.type === 'Main' ? 'Main Twisted' : c.type) + '</span></div></div>' +
      (facts.length ? '<div class="dw-panel"><h2 class="dw-h2">Stats</h2><dl class="dw-dl">' + facts.map(function (x) { return '<dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('') + '</dl></div>' : '') +
      (c.mechanic ? '<div class="dw-panel"><h2 class="dw-h2">Mechanic</h2><div class="dw-rich">' + rich(c.mechanic) + '</div></div>' : '') +
      counterpart(c) + '</div></div>' +
      (c.research ? '<div class="dw-panel dw-sec"><h2 class="dw-h2">How it behaves</h2><div class="dw-rich">' + rich(c.research) + '</div></div>' : '') +
      (c.strategies ? '<details class="dw-more"><summary>Strategies</summary><div class="dw-rich">' + rich(c.strategies) + '</div></details>' : '') +
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
      det.innerHTML = '<div class="dw-page"><div class="dw-top"><a class="dw-x" href="' + BASE + '" data-back="1" aria-label="Back to the roster"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="#1c1330" stroke-width="3.6" stroke-linecap="round"/></svg></a></div><div class="dw-panel dw-missing"><h1 class="dw-name">Not found</h1><p>There is no Toon or Twisted called &ldquo;' + esc(id) + '&rdquo;.</p></div></div>';
      if (cover) cover.remove();
      return;
    }
    cur = c;
    var toon = c.kind === 'toon' ? c : byId[c.toon];
    det.className = 'dw-detail' + (c.kind === 'twisted' ? ' is-tw' : '');
    det.style.setProperty('--c', (toon && toon.col) || '#8a7ab0');
    det.innerHTML = c.kind === 'toon' ? toonPage(c) : twPage(c);
    markNames(det, c);
    document.title = c.name + ' | Dandy\'s World Roster | FNTD User Guide';
    if (cover) cover.remove();
    try { det.focus({ preventScroll: true }); } catch (e) {}
  }

  root.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    var tab = e.target.closest('.dw-tab');
    if (tab) { st.tab = tab.getAttribute('data-tab'); st.r = 'all'; renderGrid(); return; }
    var chip = e.target.closest('.dw-chip');
    if (chip) { st.r = chip.getAttribute('data-v'); renderGrid(); return; }
    var back = e.target.closest('[data-back]');
    if (back) { e.preventDefault(); toRoster(); return; }
    var go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); if (cur && go.getAttribute('data-go') === cur.id) return; leave(BASE + '/' + go.getAttribute('data-go')); return; }
    var a = e.target.closest('a.dw-card');
    if (a) { e.preventDefault(); saveRet(); leave(a.getAttribute('href')); }
  });
  root.addEventListener('keydown', function (e) {
    var tab = e.target.closest && e.target.closest('.dw-tab');
    if (tab && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      st.tab = st.tab === 'toon' ? 'twisted' : 'toon';
      st.r = 'all';
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
    document.querySelectorAll('.dw-wipe').forEach(function (x) { x.remove(); });
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
