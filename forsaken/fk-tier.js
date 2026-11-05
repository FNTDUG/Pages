(function () {
  var root = document.getElementById('fkt');
  if (!root) return;
  var list = root.querySelector('.fkt-maps'), tabs = root.querySelector('.fk-tabs'), note = root.querySelector('.fkt-note');
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BASE = '/forsaken/roster/';
  var TIERS = ['D', 'C', 'B', 'A', 'S'];
  var data = null, side = 'survivor', byId = {}, sample = false;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function parseRank(v) {
    var m = /^\s*([DCBAS])\s*[-:]?\s*(\d{1,2})?\s*$/i.exec(String(v == null ? '' : v));
    if (!m) return null;
    var t = TIERS.indexOf(m[1].toUpperCase()), n = m[2] == null ? 5 : Math.max(0, Math.min(10, +m[2]));
    return { tier: TIERS[t], idx: t, n: n, score: t * 11 + n };
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
  function sampleList(d) {
    var maps = {}, out = [];
    d.characters.forEach(function (c) { if (c.map && c.bg && !maps[c.map]) { maps[c.map] = 1; out.push({ name: c.map, image: c.bg }); } });
    return out.map(function (m) {
      var ranks = {};
      d.characters.forEach(function (c) { var x = hash(m.name + c.id); ranks[c.id] = TIERS[Math.floor(x * 5)] + Math.floor(hash(c.id + m.name) * 11); });
      return { name: m.name, image: m.image, sided: Math.round(hash(m.name) * 100), ranks: ranks };
    });
  }

  function gauge(s) {
    var a = s == null ? 270 : 180 + s * 1.8;
    return '<div class="fkt-gauge' + (s == null ? ' fkt-unset' : '') + '" role="img" aria-label="' + esc(leanText(s) + (s == null ? '' : ', ' + s + ' out of 100')) + '" style="--a:' + a + 'deg">' +
      '<b class="fkt-gs" aria-hidden="true">S</b><b class="fkt-gk" aria-hidden="true">K</b><i class="fkt-needle" aria-hidden="true"></i></div>' +
      '<p class="fkt-lean">' + esc(leanText(s)) + '</p>';
  }

  function bar(r) {
    var p = 1.8 + (r.idx + r.n / 10) * 19.28;
    return '<span class="fkt-bar" aria-hidden="true"><span class="fkt-bar-f"></span><span class="fkt-bar-o"></span><span class="fkt-mk" style="--p:' + p.toFixed(2) + '%"></span></span>';
  }

  function item(c, r) {
    var label = c.name + ': ' + r.tier + ' tier, ' + r.n + ' out of 10';
    return '<li class="fkt-ch"><a class="fk-card" data-side="' + esc(c.side) + '" href="' + BASE + esc(c.id) + '" title="' + esc(label) + '" aria-label="' + esc(label) + '" data-google-vignette="false">' +
      '<img src="' + esc(c.card || c.image) + '" alt="" width="440" height="550" loading="lazy" decoding="async"><span class="fk-mo" aria-hidden="true"></span><span class="fk-card-n">' + esc(c.name) + '</span></a>' +
      bar(r) + '</li>';
  }

  function row(m, i) {
    var s = sidedOf(m.sided), ranks = m.ranks || {}, rows = [];
    Object.keys(ranks).forEach(function (id) {
      var c = byId[id], r = parseRank(ranks[id]);
      if (c && r && c.side === side) rows.push({ c: c, r: r });
    });
    rows.sort(function (a, b) { return b.r.score - a.r.score || a.c.name.localeCompare(b.c.name); });
    var id = 'fkt-' + slug(m.name);
    return '<section class="fkt-row" aria-labelledby="' + id + '" style="--i:' + i + '">' +
      '<div class="fkt-map fk-drawn">' + (m.image ? '<img class="fkt-map-bg" src="' + esc(m.image) + '" alt="" loading="lazy" decoding="async">' : '') +
      '<h2 class="fkt-map-n" id="' + id + '">' + esc(m.name) + '</h2>' + gauge(s) + '</div>' +
      '<div class="fkt-chars fk-drawn">' + (rows.length ? '<ul class="fkt-list" aria-label="' + esc(m.name) + ' ' + (side === 'killer' ? 'Killer' : 'Survivor') + ' rankings, best first">' + rows.map(function (x) { return item(x.c, x.r); }).join('') + '</ul>' : '<p class="fkt-empty">No ' + (side === 'killer' ? 'Killer' : 'Survivor') + ' rankings for this map yet.</p>') + '</div>' +
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

  function render() {
    var maps = (data.tierlist && data.tierlist.maps) || [];
    list.innerHTML = maps.length ? maps.map(row).join('') : '<p class="fkt-empty">No maps have been ranked yet.</p>';
    if (note) note.hidden = !sample;
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
    var maps = d.tierlist && d.tierlist.maps;
    if (!maps || !maps.length) { sample = true; d.tierlist = { maps: sampleList(d) }; }
    render();
  }).catch(function () {
    list.innerHTML = '<p class="fkt-empty">The tier list could not load. Try refreshing the page.</p>';
  });
})();
