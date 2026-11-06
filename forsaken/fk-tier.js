(function () {
  var root = document.getElementById('fkt');
  if (!root) return;
  var list = root.querySelector('.fkt-maps'), tabs = root.querySelector('.fk-tabs'), top = root.querySelector('.fkt-top');
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BASE = '/forsaken/roster/';
  var TIERS = ['D', 'C', 'B', 'A', 'S'];
  var data = null, side = 'killer', mmr = 'low', byId = {}, sample = false;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function parseRank(v) {
    var m = /^\s*([DCBAS])\s*[-:]?\s*(\d)?\s*$/i.exec(String(v == null ? '' : v));
    if (!m) return null;
    var t = TIERS.indexOf(m[1].toUpperCase()), n = m[2] == null ? 2.5 : Math.max(1, Math.min(4, +m[2]));
    return { tier: TIERS[t], idx: t, n: n, score: t * 5 + n };
  }
  function sidedOf(v) { var n = parseFloat(v); return isFinite(n) ? Math.max(0, Math.min(100, n)) : null; }
  function leanText(s) {
    if (s == null) return 'Not rated yet';
    if (s < 15) return 'Very Survivor sided';
    if (s < 40) return 'Survivor sided';
    if (s <= 60) return 'Balanced';
    if (s <= 85) return 'Killer sided';
    return 'Very Killer sided';
  }

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }
  function sampleRank(a, b) { return TIERS[Math.floor(hash(a + b) * 5)] + (1 + Math.floor(hash(b + a) * 4)); }
  function sampleList(d) {
    var maps = {}, out = [], high = {}, low = {};
    d.characters.forEach(function (c) { if (c.map && c.bg && !maps[c.map]) { maps[c.map] = 1; out.push({ name: c.map, image: c.bg }); } });
    d.characters.forEach(function (c) { if (c.side === 'survivor') { high[c.id] = sampleRank('high', c.id); low[c.id] = sampleRank('low', c.id); } });
    return {
      maps: out.map(function (m) {
        var ranks = {};
        d.characters.forEach(function (c) { if (c.side === 'killer') ranks[c.id] = sampleRank(m.name, c.id); });
        return { name: m.name, image: m.image, sided: Math.round(hash(m.name) * 100), ranks: ranks };
      }),
      survivors: { high: high, low: low }
    };
  }

  function gauge(s) {
    var a = s == null ? 270 : 180 + s * 1.8;
    return '<div class="fkt-gauge' + (s == null ? ' fkt-unset' : '') + '" role="img" aria-label="' + esc(leanText(s) + (s == null ? '' : ', ' + s + ' out of 100')) + '" style="--a:' + a + 'deg">' +
      '<b class="fkt-gs" aria-hidden="true">S</b><b class="fkt-gk" aria-hidden="true">K</b><i class="fkt-needle" aria-hidden="true"></i></div>' +
      '<p class="fkt-lean">' + esc(leanText(s)) + '</p>';
  }

  function bar(r) {
    var p = 1.8 + (r.idx + (r.n - 0.5) / 4) * 19.28;
    return '<span class="fkt-bar" aria-hidden="true"><span class="fkt-bar-f"></span><span class="fkt-bar-o"></span><span class="fkt-mk" style="--p:' + p.toFixed(2) + '%"></span></span>';
  }

  function card(c, label) {
    return '<a class="fk-card" data-side="' + esc(c.side) + '" href="' + BASE + esc(c.id) + '" title="' + esc(label) + '" aria-label="' + esc(label) + '" data-google-vignette="false">' +
      '<img src="' + esc(c.card || c.image) + '"' + (c.cards ? ' srcset="' + c.cards.map(function (w) { return '/forsaken/img/card/' + c.id + '-' + w + '.webp ' + w + 'w'; }).join(', ') + '" sizes="(max-width: 600px) 84px, 96px"' : '') + ' alt="" width="440" height="550" loading="lazy" decoding="async"><span class="fk-mo" aria-hidden="true"></span><span class="fk-card-n">' + esc(c.name) + '</span></a>';
  }
  function item(c, r) {
    return '<li class="fkt-ch">' + card(c, c.name + ': ' + r.tier + ' tier' + (r.n % 1 ? '' : ', ' + r.n + ' out of 4')) + bar(r) + '</li>';
  }

  function row(m, i) {
    var s = sidedOf(m.sided), ranks = m.ranks || {}, rows = [];
    Object.keys(ranks).forEach(function (id) {
      var v = ranks[id], o = v && typeof v === 'object' ? v : { rank: v }, c = byId[id], r = parseRank(o.rank);
      if (c && r && c.side === 'killer') rows.push({ c: c, r: r, k: rows.length, note: o.note ? String(o.note) : '' });
    });
    rows.sort(function (a, b) { return b.r.score - a.r.score || a.k - b.k; });
    var why = notesOf(TIERS.slice().reverse().map(function (t) { return [t, rows.filter(function (x) { return x.r.tier === t; })]; }));
    var id = 'fkt-' + slug(m.name);
    return '<section class="fkt-row" aria-labelledby="' + id + '" style="--i:' + i + '">' +
      '<div class="fkt-map fk-drawn">' + (m.image ? '<img class="fkt-map-bg" src="' + esc(m.image) + '" alt="" loading="lazy" decoding="async">' : '') +
      '<h2 class="fkt-map-n" id="' + id + '">' + esc(m.name) + '</h2>' + gauge(s) + '</div>' +
      '<div class="fkt-chars fk-drawn">' + (rows.length ? '<ul class="fkt-list" aria-label="' + esc(m.name) + ' Killer rankings, best first">' + rows.map(function (x) { return item(x.c, x.r); }).join('') + '</ul>' : '<p class="fkt-empty">No Killer rankings for this map yet.</p>') +
      (why ? '<details class="fkt-mwhy"><summary>Why they are ranked here</summary><dl>' + why + '</dl></details>' : '') + '</div>' +
      '</section>';
  }

  function fit(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('.fk-card-n'), function (n) {
      n.style.fontSize = '';
      var room = n.parentNode.clientWidth - 8, w = n.scrollWidth;
      if (room > 0 && w > room) n.style.fontSize = Math.max(11, Math.floor(parseFloat(getComputedStyle(n).fontSize) * room / w * 10) / 10) + 'px';
    });
  }

  var io = null;
  function watch() {
    var gs = list.querySelectorAll('.fkt-row');
    if (reduced || !('IntersectionObserver' in window)) { Array.prototype.forEach.call(gs, function (g) { g.classList.add('fkt-in'); }); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('fkt-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
    Array.prototype.forEach.call(gs, function (g) { io.observe(g); });
  }

  function digits(t) { return String(t).split(/(\d+)/).map(function (x, i) { return i % 2 ? '<span class="fkt-d">' + x + '</span>' : esc(x); }).join(''); }
  function notesOf(tiers) {
    var out = '';
    tiers.forEach(function (tx) {
      var t = tx[0], groups = [];
      tx[1].forEach(function (x) {
        if (!x.note) return;
        var g = groups.filter(function (q) { return q.note === x.note; })[0];
        if (g) g.xs.push(x); else groups.push({ note: x.note, xs: [x] });
      });
      groups.forEach(function (g) { out += '<div class="fkt-why" data-t="' + t + '"><dt><b class="fkt-wt" aria-label="' + t + ' tier">' + t + '</b>' + esc(names(g.xs)) + '</dt><dd>' + digits(g.note) + '</dd></div>'; });
    });
    return out;
  }
  function names(xs) { var n = xs.map(function (x) { return x.c.name; }); return n.length < 2 ? n[0] : n.slice(0, -1).join(', ') + ' & ' + n[n.length - 1]; }
  function board() {
    var sv = (data.tierlist && data.tierlist.survivors) || {}, list0 = sv[mmr] || {}, ranks = list0.ranks || list0, about = list0.ranks ? list0.about : '';
    var by = { S: [], A: [], B: [], C: [], D: [] }, any = false;
    Object.keys(ranks).forEach(function (id) {
      var v = ranks[id], o = v && typeof v === 'object' ? v : { rank: v }, c = byId[id], r = parseRank(o.rank);
      if (c && r && c.side === 'survivor') { by[r.tier].push({ c: c, r: r, k: by[r.tier].length, note: o.note ? String(o.note) : '' }); any = true; }
    });
    var name = mmr === 'low' ? 'Low MMR' : 'High MMR';
    var html = '<div class="fkt-mmr" role="group" aria-label="Survivor tier list">' + ['low', 'high'].map(function (k) { return '<button type="button" class="fk-btn" data-mmr="' + k + '" aria-pressed="' + (k === mmr) + '">' + (k === 'low' ? 'Low MMR' : 'High MMR') + '</button>'; }).join('') + '</div>' +
      (about ? '<p class="fkt-about">' + digits(about) + '</p>' : '');
    if (!any) return html + '<div class="fkt-board fk-drawn"><p class="fkt-empty">No ' + name + ' Survivor rankings yet.</p></div>';
    var order = TIERS.slice().reverse();
    order.forEach(function (t) { by[t].sort(function (a, b) { return b.r.n - a.r.n || a.k - b.k; }); });
    html += '<div class="fkt-board fk-drawn" role="list" aria-label="' + name + ' Survivor tier list">' + order.map(function (t) {
      var xs = by[t];
      return '<section class="fkt-tier" role="listitem" data-t="' + t + '" aria-label="' + t + ' tier"><h2 class="fkt-tl" aria-hidden="true">' + t + '</h2>' +
        (xs.length ? '<ul class="fkt-tlist">' + xs.map(function (x) { return '<li class="fkt-tc">' + card(x.c, x.c.name + ': ' + t + ' tier') + '</li>'; }).join('') + '</ul>' : '<p class="fkt-tnone">None</p>') + '</section>';
    }).join('') + '</div>';
    var notes = notesOf(order.map(function (t) { return [t, by[t]]; }));
    if (notes) html += '<div class="fkt-notes fk-drawn"><details class="fkt-mwhy"><summary>Why they are ranked here</summary><dl>' + notes + '</dl></details></div>';
    return html;
  }

  function render() {
    if (top) top.hidden = side !== 'killer';
    if (side === 'survivor') {
      list.innerHTML = board();
    } else {
      var maps = (data.tierlist && data.tierlist.maps) || [];
      list.innerHTML = maps.length ? maps.map(row).join('') : '<p class="fkt-empty">No maps have been ranked yet.</p>';
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(list); });
    fit(list);
    watch();
  }

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.fk-tab');
    if (!b || b.getAttribute('data-tab') === side) return;
    side = b.getAttribute('data-tab');
    Array.prototype.forEach.call(tabs.querySelectorAll('.fk-tab'), function (t) { var on = t === b; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    render();
  });
  list.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mmr]');
    if (!b || b.getAttribute('data-mmr') === mmr) return;
    mmr = b.getAttribute('data-mmr');
    render();
    var nb = list.querySelector('[data-mmr="' + mmr + '"]');
    if (nb) nb.focus();
  });
  tabs.addEventListener('keydown', function (e) {
    if (!/^(ArrowLeft|ArrowRight)$/.test(e.key)) return;
    var ts = Array.prototype.slice.call(tabs.querySelectorAll('.fk-tab')), at = ts.indexOf(document.activeElement);
    if (at < 0) return;
    e.preventDefault();
    var to = ts[(at + (e.key === 'ArrowRight' ? 1 : -1) + ts.length) % ts.length];
    to.focus(); to.click();
  });
  var ft = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(ft); ft = requestAnimationFrame(function () { fit(list); }); });

  fetch(root.getAttribute('data-src'), { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    data = d;
    d.characters.forEach(function (c) { byId[c.id] = c; });
    if (d.gridBg) root.style.setProperty('--fk-grid-bg', 'url("' + d.gridBg + '")');
    if (!d.tierlist) { sample = true; d.tierlist = sampleList(d); }
    render();
  }).catch(function () {
    list.innerHTML = '<p class="fkt-empty">The tier list could not load. Try refreshing the page.</p>';
  });
})();
