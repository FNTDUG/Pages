(function () {
  var h = document.documentElement, t;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  h.classList.add('ov');
  if (!reduced) {
    h.classList.add('ov-pre');
    setTimeout(function () { h.classList.remove('ov-pre'); }, 3000);
  }
  try { t = localStorage.getItem('pv-theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  h.setAttribute('data-theme', t);
  [
    'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Audiowide&family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;700&display=swap',
    '/overhaul/parvus-home.css',
    '/overhaul/ov-pop.css'
  ].forEach(function (href) {
    if (href.indexOf('fonts.googleapis') !== -1 && document.querySelector('link[href*="family=Archivo+Black"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  });

  var SECTIONS = { fntd2: 'FNTD2', fntd1: 'FNTD1', bbn: 'Bite By Night', 'patch-notes': 'Patch notes', wiki: 'Community wiki' };
  var title = '';
  function esc(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function gameKey() {
    var q = /[?&]game=([a-z0-9-]+)/.exec(location.search);
    if (q && SECTIONS[q[1]]) return q[1];
    var m = document.querySelector('meta[name="ov-section"]');
    if (m && m.content) return m.content.toLowerCase().replace(/\s+/g, '');
    return location.pathname.replace(/^\/overhaul(?=\/|$)/, '').split('/').filter(Boolean)[0] || '';
  }
  var game = gameKey();
  if (SECTIONS[game]) h.setAttribute('data-game', game);
  function section() { return SECTIONS[game] || 'FNTD User Guide'; }

  function hero() {
    var inner = document.getElementById('ug-hero-inner'), area = document.querySelector('.ug-page-title-area');
    if (!inner || !area || document.querySelector('.ov-hero')) return;
    var t = area.querySelector('.ug-page-title');
    if (t) {
      title = t.textContent.trim();
      var words = title.split(' '), last = words.pop();
      t.innerHTML = (words.length ? esc(words.join(' ')) + ' ' : '') + '<span class="ov-hl"><span class="ov-hl-bg"></span>' + esc(last) + '</span>';
    }
    var wrap = document.createElement('div');
    wrap.className = 'ov-hero';
    wrap.innerHTML = '<div class="ov-copy"><span class="ov-kicker"><i></i>' + esc(section()) + '</span></div><div class="ov-stage' + (reduced ? '' : ' ov-wait') + '"><div class="ov-screen"><div data-parvus-home></div></div></div>';
    inner.insertBefore(wrap, inner.firstChild);
    wrap.firstChild.appendChild(area);
    pins(wrap);
    var notes = document.createElement('div');
    notes.className = 'ov-notes';
    Array.prototype.slice.call(area.children).concat(Array.prototype.slice.call(inner.children)).forEach(function (el) {
      if (el === wrap || el.classList.contains('ug-page-title') || el.classList.contains('ug-status-badge') || el.classList.contains('ug-page-desc') || el.classList.contains('ad-slot') || el.querySelector('#cleanModeToggle')) return;
      if (el.classList.contains('ug-status-inline-text') || (el.tagName === 'DIV' && el.querySelector('[style*="Audiowide"]'))) notes.appendChild(el);
    });
    if (notes.children.length) inner.insertBefore(notes, wrap.nextSibling);
    sizeScreen();
    fitTitle();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
    window.addEventListener('resize', function () { sizeScreen(); fitTitle(); }, { passive: true });
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    js.onload = function () {
      var home = document.getElementById('parvusHome');
      sizeScreen();
      if (home && window.ResizeObserver) new ResizeObserver(sizeScreen).observe(home);
      chat();
    };
    document.body.appendChild(js);
  }

  var SPRITES = {
    pad: ['.gggggggggggg.', 'ggkggggggggygg', 'gkkkggggggbgcg', 'ggkggggggggygg', 'gggggggggggggg', 'ggggg....ggggg', 'gggg......gggg'],
    cursor: ['c.......', 'cc......', 'ccc.....', 'cccc....', 'ccccc...', 'cccccc..', 'ccccccc.', 'cccccccc', 'cccc....', 'cc.cc...', 'c..cc...', '....cc..', '....cc..'],
    heart: ['.gg...gg.', 'gcgg.gggg', 'gcggggggg', 'ggggggggg', '.ggggggg.', '..ggggg..', '...ggg...', '....g....'],
    coin: ['..yyyy..', '.yyyyyy.', 'yycyykyy', 'ycyyykyy', 'yyyyykyy', 'yyyyykyy', '.yyyyyy.', '..yyyy..'],
    floppy: ['bbcccckcb.', 'bbcccckcbb', 'bbccccccbb', 'bbbbbbbbbb', 'bbbbbbbbbb', 'bccccccccb', 'bckkkkkkcb', 'bccccccccb', 'bckkkkkccb', 'bccccccccb'],
    chat: ['.cccccccccc.', 'cccccccccccc', 'cccccccccccc', 'cckkckkckkcc', 'cckkckkckkcc', 'cccccccccccc', '.cccccccccc.', '..ccc.......', '..cc........', '..c.........'],
    signal: ['.........cc', '.........cc', '......gg.cc', '......gg.cc', '...gg.gg.cc', '...gg.gg.cc', 'gg.gg.gg.cc', 'gg.gg.gg.cc'],
    play: ['y.......', 'yyy.....', 'yyyyy...', 'yyyyyyy.', 'yyyyyyyy', 'yyyyyyy.', 'yyyyy...', 'yyy.....', 'y.......'],
    sparkle: ['....y....', '...yyy...', '...yyy...', '.yyyyyyy.', 'yyyyyyyyy', '.yyyyyyy.', '...yyy...', '...yyy...', '....y....'],
    key: ['ccccccccc', 'ckccccckc', 'ckccccckc', 'ckcckcckc', 'ckckckckc', 'cckccckcc', 'ccccccccc', 'mmmmmmmmm', 'mmmmmmmmm'],
    smile: ['..yyyyy..', '.yyyyyyy.', 'yykyyykyy', 'yykyyykyy', 'yyyyyyyyy', 'ykyyyyyky', '.ykkkkky.', '..yyyyy..'],
    file: ['ccccccm..', 'ccccccmm.', 'ccccccmmm', 'ccccccccc', 'cgggggccc', 'ccccccccc', 'ckkkkkkkc', 'ccccccccc', 'ckkkkkkcc', 'ccccccccc', 'ckkkkcccc', 'ccccccccc'],
    bell: ['.....y.....', '...yyyyy...', '..yyyyyyy..', '..ycyyyyy..', '..ycyyyyy..', '.yycyyyyyy.', '.yyyyyyyyy.', 'yyyyyyyyyyy', '...........', '....yyy....'],
    pie: ['..bbkgg..', '.bbbkggg.', 'bbbbkgggg', 'bbbbkgggg', 'bbbbkkkkk', 'bbbbkyyyy', 'bbbbkyyyy', '.bbbkyyy.', '..bbkyy..'],
    trash: ['...mmm...', 'mmmmmmmmm', '.........', '.bbbbbbb.', '.bkbkbkb.', '.bkbkbkb.', '.bkbkbkb.', '.bkbkbkb.', '.bbbbbbb.', '..bbbbb..'],
    gear: ['......mmmm......', '......mcmm......', '..mmm.mmmm.mmm..', '..mcmmmmmmmmmm..', '..mmmmcccmmmmm..', '...mmcmmmmmmm...', 'mmmmcmm..mmmmmmm', 'mcmmcm....mmmmmm', 'mcmmmm....mmmmmm', 'mmmmmmm..mmmmmmm', '...mmmmmmmmmm...', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '..mmm.mmmm.mmm..', '......mmmm......', '......mmmm......'],
    lens: ['..cccc....', '.cbbbbc...', 'cbcbbbbc..', 'cbbbbbbc..', 'cbbbbbbc..', '.cbbbbc...', '..ccccgg..', '......ggg.', '.......ggg', '........gg'],
    bookmark: ['ggggggg', 'gcggggg', 'gcggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggg.ggg', 'gg...gg', 'g.....g'],
    joystick: ['..rrr.......', '.rcrrr......', '.rrrrr......', '..rrr.......', '...m........', '...m....yyy.', 'gggggggggggg', 'gggggggggggg', 'gggggggggggg'],
    arcade: ['.gggggggggg.', '.gyyyyyyyyg.', '.gggggggggg.', '.gkkkkkkkkg.', '.gckkkkkkkg.', '.gckkykkkcg.', '.gkkkkkkkcg.', '.gkkkkkkkkg.', '.gggggggggg.', 'ggrggggygbgg', 'gggggggggggg', '.gggggggggg.', '.ggggkkgggg.', '.gggggggggg.', '.gggggggggg.'],
    trophy: ['..yyyyyyyy..', 'yyycyyyyyyyy', 'y.ycyyyyyy.y', 'y.yyyyyyyy.y', '.yyyyyyyyyy.', '..yyyyyyyy..', '...yyyyyy...', '....yyyy....', '.....yy.....', '.....yy.....', '...yyyyyy...', '..gggggggg..', '..gggggggg..'],
    gg: ['.yyyyyyyyyyyyy.', 'yyyyyyyyyyyyyyy', 'yyyykkkyykkkyyy', 'yyykyyyykyyyyyy', 'yyykykkykykkyyy', 'yyykyykykyykyyy', 'yyyykkkyykkkyyy', 'yyyyyyyyyyyyyyy', '.yyyyyyyyyyyyy.'],
    levelup: ['.nnnnnnnnnnnnnnn.', 'nnnnnnnnnnnnnnnnn', 'nnnnknnnknknkknnn', 'nnnkkknnknknknknn', 'nnkkkkknknknkknnn', 'nnnnknnnknknknnnn', 'nnnnknnnkkknknnnn', 'nnnnnnnnnnnnnnnnn', '.nnnnnnnnnnnnnnn.'],
    drink: ['.mmmmmm.', 'mmmkmmmm', 'nnnnnnnn', 'ncnnnyyn', 'ncnnyynn', 'ncnyynnn', 'nnyyyyyn', 'nnnnyynn', 'nnnyynnn', 'nnyynnnn', 'nnnnnnnn', 'mmmmmmmm', '.mmmmmm.']
  };
  function art(rows) {
    var w = rows[0].length + 2, ht = rows.length + 2, grid = [], out = [], x, y, i, j;
    for (y = 0; y < ht; y++) {
      grid.push([]);
      for (x = 0; x < w; x++) grid[y].push(rows[y - 1] && x > 0 && x <= rows[y - 1].length ? rows[y - 1].charAt(x - 1) : '.');
    }
    for (y = 0; y < ht; y++) {
      out.push(grid[y].slice());
      for (x = 0; x < w; x++) {
        if (grid[y][x] !== '.') continue;
        for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
          if (grid[y + i] && grid[y + i][x + j] && grid[y + i][x + j] !== '.') out[y][x] = 'k';
        }
      }
    }
    var rects = '';
    for (y = 0; y < ht; y++) {
      for (x = 0; x < w;) {
        var ch = out[y][x], run = 1;
        if (ch === '.') { x++; continue; }
        while (x + run < w && out[y][x + run] === ch) run++;
        rects += '<rect class="' + ch + '" x="' + x + '" y="' + y + '" width="' + run + '" height="1"/>';
        x += run;
      }
    }
    return { w: w, h: ht, svg: '<svg viewBox="0 0 ' + w + ' ' + ht + '" shape-rendering="crispEdges" aria-hidden="true">' + rects + '</svg>' };
  }
  function sticker(name, u, cls) {
    var a = art(SPRITES[name]), el = document.createElement('div');
    el.className = cls;
    el.style.width = a.w * u + 'px';
    el.style.height = a.h * u + 'px';
    el.style.setProperty('--u', u + 'px');
    el.innerHTML = '<div class="ov-spin"><div class="ov-bob">' + a.svg + '</div></div>';
    return el;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  var floats = [], aim = { x: 0, y: 0 }, cam = { x: 0, y: 0 }, camOn = false;
  var TIERS = {
    near: { u: [5, 6], up: 4, d: [0.45, 0.65], cam: 16 },
    far: { u: [3, 3], up: 3, d: [0.12, 0.22], cam: 6 }
  };
  function floaters() {
    if (/[?&]float=0/.test(location.search) || document.querySelector('.ov-float')) return;
    var layer = document.createElement('div');
    layer.className = 'ov-float';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    var vw = window.innerWidth, span = window.innerHeight + 240, phone = vw <= 600;
    var count = {
      far: phone ? 3 : Math.min(12, Math.max(5, Math.round(vw / 160))),
      near: phone ? 3 : Math.min(10, Math.max(5, Math.round(vw / 200)))
    };
    ['far', 'near'].forEach(function (tier) {
      var T = TIERS[tier];
      for (var i = 0; i < count[tier]; i++) {
        var f = { tier: tier, u: phone ? T.up : T.u[0] + Math.floor(Math.random() * (T.u[1] - T.u[0] + 1)), d: rnd(T.d[0], T.d[1]), cyc: null };
        f.name = free(f);
        f.el = sticker(f.name, f.u, 'ov-sticker ov-' + tier);
        f.w = parseFloat(f.el.style.width);
        layer.appendChild(f.el);
        var best = -1;
        for (var c = 0; c < 20; c++) {
          var cx = spot(f, vw), cy = Math.random(), dist = far(cx * vw, cy * span - 120, f);
          if (dist > best) { best = dist; f.fx = cx; f.fy = cy; }
        }
        f.x = f.fx * vw - f.w / 2;
        f.y = f.fy * span - 120;
        floats.push(f);
      }
    });
    float();
    if (!reduced) window.addEventListener('scroll', float, { passive: true });
    window.addEventListener('resize', float, { passive: true });
    if (!reduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', function (e) {
        aim.x = e.clientX / window.innerWidth - 0.5;
        aim.y = e.clientY / window.innerHeight - 0.5;
        if (!camOn) { camOn = true; requestAnimationFrame(pan); }
      }, { passive: true });
    }
  }
  function pan() {
    cam.x += (aim.x - cam.x) * 0.07;
    cam.y += (aim.y - cam.y) * 0.07;
    if (Math.abs(aim.x - cam.x) < 0.001 && Math.abs(aim.y - cam.y) < 0.001) { cam.x = aim.x; cam.y = aim.y; camOn = false; }
    float();
    if (camOn) requestAnimationFrame(pan);
  }
  function float() {
    var vw = window.innerWidth, span = window.innerHeight + 240, sy = reduced ? 0 : window.scrollY;
    floats.forEach(function (f) {
      var pos = f.fy * span - sy * f.d, cyc = Math.floor(pos / span), y = Math.round(pos - cyc * span - 120);
      if (f.cyc !== null && cyc !== f.cyc) reroll(f, y, vw);
      f.cyc = cyc;
      f.x = Math.round(f.fx * vw - f.w / 2);
      f.y = y;
      var k = TIERS[f.tier].cam;
      f.el.style.transform = 'translate(' + Math.round(f.x - cam.x * k * 2) + 'px,' + Math.round(y - cam.y * k * 2) + 'px)';
    });
  }
  function spot(f, vw) {
    var col = Math.min(vw, (parseFloat(getComputedStyle(h).getPropertyValue('--ov-col')) || 980) + 48);
    var room = (vw - col) / 2 - f.w - 12;
    if (room < 8) return Math.random();
    var x = 6 + f.w / 2 + Math.random() * room;
    return (Math.random() < 0.5 ? x : vw - x) / vw;
  }
  function pick() {
    var names = Object.keys(SPRITES);
    return names[Math.floor(Math.random() * names.length)];
  }
  function free(self) {
    var used = {}, open = [];
    floats.forEach(function (o) { if (o !== self && o.tier === self.tier) used[o.name] = 1; });
    Object.keys(SPRITES).forEach(function (n) { if (!used[n]) open.push(n); });
    return open.length ? open[Math.floor(Math.random() * open.length)] : pick();
  }
  function far(x, y, self) {
    var best = Infinity;
    floats.forEach(function (o) {
      if (o === self) return;
      var dx = x - (o.x + o.w / 2), dy = y - o.y;
      best = Math.min(best, dx * dx + dy * dy);
    });
    return best;
  }
  function reroll(f, y, vw) {
    f.name = free(f);
    var a = art(SPRITES[f.name]);
    f.w = a.w * f.u;
    f.el.style.width = f.w + 'px';
    f.el.style.height = a.h * f.u + 'px';
    f.el.querySelector('.ov-bob').innerHTML = a.svg;
    var best = -1;
    for (var c = 0; c < 16; c++) {
      var cx = spot(f, vw), dist = far(cx * vw, y, f);
      if (dist > best) { best = dist; f.fx = cx; }
    }
  }
  function pins(card) {
    var phone = window.innerWidth <= 600, u = phone ? 4 : 5;
    var a = pick(), b = pick();
    while (b === a) b = pick();
    card.appendChild(sticker(a, u, 'ov-pin ov-pin-tl'));
    card.appendChild(sticker(b, u, 'ov-pin ov-pin-br'));
  }
  function wiggle(g) {
    if (reduced) return;
    g.utils.toArray('.ov-far .ov-bob').forEach(function (b) {
      g.to(b, { y: -3, duration: rnd(2.6, 4), ease: 'steps(1)', yoyo: true, repeat: -1, delay: rnd(0, 2) });
    });
    g.utils.toArray('.ov-near .ov-bob, .ov-pin .ov-bob').forEach(function (b) {
      var u = parseFloat(getComputedStyle(b.closest('[style*="--u"]')).getPropertyValue('--u')) || 5;
      g.to(b, { y: -u * 2, duration: rnd(1.4, 2.6), ease: 'steps(2)', yoyo: true, repeat: -1, delay: rnd(0, 1.5) });
      g.to(b, { x: u * (Math.random() < 0.5 ? -1 : 1), duration: rnd(2.2, 3.8), ease: 'steps(1)', yoyo: true, repeat: -1, delay: rnd(0, 2) });
    });
    (function spin() {
      var list = g.utils.toArray('.ov-near .ov-spin');
      if (list.length) g.to(list[Math.floor(Math.random() * list.length)], { rotation: '+=360', duration: 0.6, ease: 'steps(4)' });
      setTimeout(spin, rnd(3500, 6500));
    })();
  }

  function fitTitle() {
    var t = document.querySelector('.ov-copy .ug-page-title');
    if (!t) return;
    if (t.querySelector('div')) return;
    t.style.fontSize = '';
    var size = parseFloat(getComputedStyle(t).fontSize);
    function over() {
      var box = t.getBoundingClientRect(), edge = box.left + t.clientWidth - parseFloat(getComputedStyle(t).paddingRight) + 1, rg = document.createRange();
      rg.selectNodeContents(t);
      return Array.prototype.some.call(rg.getClientRects(), function (r) { return r.right > edge; });
    }
    while (size > 22 && over()) {
      size -= 2;
      t.style.fontSize = size + 'px';
    }
  }

  var SCALE = 0.75;
  function sizeScreen() {
    var sc = document.querySelector('.ov-screen'), host = sc && sc.querySelector('[data-parvus-home]');
    if (!host) return;
    host.style.width = sc.clientWidth / SCALE + 'px';
    var home = document.getElementById('parvusHome');
    if (!home) return;
    var hh = home.offsetHeight * SCALE, edge = getComputedStyle(sc).boxSizing === 'border-box' ? sc.offsetHeight - sc.clientHeight : 0;
    sc.style.minHeight = Math.ceil(hh) + edge + 'px';
    host.style.top = Math.max(0, Math.round((sc.clientHeight - hh) / 2)) + 'px';
  }

  function chat() {
    var sp = document.getElementById('mascotSprite');
    if (!sp || sp.getAttribute('data-ov-chat')) return;
    sp.setAttribute('data-ov-chat', '1');
    sp.setAttribute('role', 'button');
    sp.setAttribute('tabindex', '0');
    sp.setAttribute('aria-label', 'Ask Parvus');
    function go() { if (window.ovTalkOpen) window.ovTalkOpen(sp); }
    sp.addEventListener('click', go);
    sp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
    load('/overhaul/ov-ink.js', function () { load('/overhaul/ov-talk.js'); });
  }

  function load(src, done) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = done;
    document.body.appendChild(s);
  }
  function loadAll(list, done) {
    var left = list.length;
    list.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = s.onerror = function () { if (--left === 0) done(); };
      document.body.appendChild(s);
    });
  }

  function greet() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var p = window.mascotPeek && window.mascotPeek();
      if (p && window.mascotSay && !p.thinking) {
        clearInterval(iv);
        if (title) window.mascotSay('Welcome to ' + title + '! ' + (window.matchMedia && window.matchMedia('(pointer: fine)').matches ? 'Click' : 'Tap') + ' me if you need help.');
      } else if (tries > 20) clearInterval(iv);
    }, 400);
  }

  function unwait() {
    var st = document.querySelector('.ov-stage');
    if (st) st.classList.remove('ov-wait');
  }
  function drop(g, tries) {
    var m = document.getElementById('mascot'), home = document.getElementById('parvusHome');
    if (!m || !home) {
      if ((tries || 0) < 30) setTimeout(function () { drop(g, (tries || 0) + 1); }, 100);
      else { unwait(); greet(); }
      return;
    }
    if (window.mascotRainbow) window.mascotRainbow(false);
    g.set(m, { y: -(home.offsetHeight + 60) });
    unwait();
    g.timeline({ onComplete: function () { g.set(m, { clearProps: 'transform' }); if (window.mascotWiggle) window.mascotWiggle(); greet(); } })
      .to(m, { y: 0, duration: 0.42, ease: 'power2.in', snap: { y: 12 } })
      .to(m, { y: -36, duration: 0.14, ease: 'steps(3)' })
      .to(m, { y: 0, duration: 0.16, ease: 'steps(3)' });
  }

  function rowLoop(box) {
    if (!box || !window.Draggable) return;
    var g = window.gsap, SPEED = 22;
    g.registerPlugin(window.Draggable);
    if (window.InertiaPlugin) g.registerPlugin(window.InertiaPlugin);
    var on = false, auto = !reduced, pos = 0, raf = 0, last = 0, seen = false, resizeT = 0;
    var items = [], extra = [], step = 0, total = 0, drag = null, proxy = document.createElement('div'), slide = { x: 0 };
    function kids() { return Array.prototype.slice.call(box.children); }
    function wants() {
      var n = kids().filter(function (el) { return !el.classList.contains('is-copy'); }).length, vw = window.innerWidth;
      return n > 1 && n > (vw <= 600 ? 1 : vw <= 960 ? 2 : 3);
    }
    function copy(el) {
      var c = el.cloneNode(true), tint = el.style.getPropertyValue('--c');
      c.removeAttribute('style');
      if (tint) c.style.setProperty('--c', tint);
      c.classList.add('is-copy');
      c.setAttribute('aria-hidden', 'true');
      if (c.tagName === 'A' || c.tagName === 'BUTTON') c.tabIndex = -1;
      Array.prototype.forEach.call(c.querySelectorAll('a,button'), function (a) { a.tabIndex = -1; });
      return c;
    }
    function measure() {
      extra.forEach(function (c) { c.parentNode.removeChild(c); });
      extra = [];
      var base = kids();
      step = base[1].offsetLeft - base[0].offsetLeft;
      total = step * base.length;
      var need = box.clientWidth + step;
      while (total < need) {
        base.forEach(function (el) { var c = copy(el); box.appendChild(c); extra.push(c); });
        total += step * base.length;
      }
      items = kids();
      items.forEach(function (el) {
        el.setAttribute('draggable', 'false');
        Array.prototype.forEach.call(el.querySelectorAll('a,img'), function (a) { a.setAttribute('draggable', 'false'); });
      });
    }
    function norm(v) { return ((v % total) + total) % total; }
    function render() {
      pos = norm(pos);
      var lo = -step;
      items.forEach(function (el, i) {
        var x = norm(i * step - pos - lo) + lo;
        el.style.translate = Math.round(x - i * step) + 'px 0';
      });
    }
    function nearest(target) {
      var d = norm(target - pos);
      if (d > total / 2) d -= total;
      return pos + d;
    }
    function glideTo(target, dur) {
      slide.x = pos;
      g.to(slide, { x: target, duration: dur || 0.45, ease: 'power3.out', overwrite: true, onUpdate: function () { pos = slide.x; render(); } });
    }
    function settle() {
      var target = nearest(Math.round(pos / step) * step);
      if (Math.abs(target - pos) > 0.5) glideTo(target);
    }
    function stopAuto() {
      if (!auto) return;
      auto = false;
      cancelAnimationFrame(raf);
    }
    function tick(t) {
      if (!on || !auto) return;
      if (seen && !document.hidden) {
        var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
        pos += SPEED * dt;
        render();
      }
      last = t;
      raf = requestAnimationFrame(tick);
    }
    function build() {
      on = true;
      box.classList.add('rowloop');
      measure();
      pos = 0;
      render();
      drag = window.Draggable.create(proxy, {
        type: 'x',
        trigger: box,
        inertia: !!window.InertiaPlugin,
        dragClickables: true,
        minimumMovement: 6,
        onPress: function () {
          stopAuto();
          g.killTweensOf(slide);
          g.set(proxy, { x: -pos });
          this.update();
        },
        onDragStart: function () { box.classList.add('is-dragging'); },
        onDrag: function () { pos = -this.x; render(); },
        onThrowUpdate: function () { pos = -this.x; render(); },
        onRelease: function () {
          box.classList.remove('is-dragging');
          var self = this;
          setTimeout(function () { if (!self.isThrowing) settle(); }, 0);
        },
        onThrowComplete: settle,
        snap: function (v) { return Math.round(v / step) * step; }
      })[0];
      if (auto) { last = 0; raf = requestAnimationFrame(tick); }
    }
    function teardown() {
      on = false;
      cancelAnimationFrame(raf);
      if (drag) { drag.kill(); drag = null; }
      g.killTweensOf(slide);
      extra.forEach(function (c) { c.parentNode.removeChild(c); });
      extra = [];
      kids().forEach(function (el) { el.style.translate = ''; });
      box.classList.remove('rowloop', 'is-dragging');
    }
    function sync() {
      var want = wants();
      if (want && !on) build();
      else if (!want && on) teardown();
      else if (on) { measure(); render(); }
    }
    box.addEventListener('focusin', function (e) {
      if (!on) return;
      stopAuto();
      var el = e.target.closest ? e.target.closest('.rowloop > *') : null;
      var i = items.indexOf(el);
      if (i >= 0) { box.scrollLeft = 0; glideTo(nearest(i * step)); }
    });
    box.addEventListener('keydown', stopAuto);
    var outsideAt = -1e9, wheelTo = null, wheelT = 0;
    window.addEventListener('wheel', function (e) { if (!box.contains(e.target)) outsideAt = e.timeStamp; }, { passive: true });
    box.addEventListener('wheel', function (e) {
      if (!on || e.ctrlKey) return;
      var across = Math.abs(e.deltaX) > Math.abs(e.deltaY), d = across ? e.deltaX : e.deltaY;
      if (!across && e.timeStamp - outsideAt < 300) { outsideAt = e.timeStamp; return; }
      d *= e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? box.clientWidth : 1;
      if (!d) return;
      e.preventDefault();
      stopAuto();
      g.killTweensOf(proxy);
      wheelTo = pos + (wheelTo === null ? 0 : wheelTo - slide.x) + d;
      glideTo(wheelTo, 0.3);
      clearTimeout(wheelT);
      wheelT = setTimeout(function () { wheelTo = null; settle(); }, 180);
    }, { passive: false });
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) { seen = es[0].isIntersecting; last = 0; }, { threshold: 0.2 }).observe(box);
    } else seen = true;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(sync, 150);
    }, { passive: true });
    sync();
  }

  function animate() {
    var g = window.gsap;
    h.classList.remove('ov-pre');
    if (g) Array.prototype.forEach.call(document.querySelectorAll('.info-card'), function (row) { try { rowLoop(row); } catch (e) {} });
    if (!g || reduced) { unwait(); greet(); return; }
    wiggle(g);
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);
    var keep = 'transform,opacity,visibility';
    var ink = getComputedStyle(h).getPropertyValue('--ink').trim() || '#000';
    var tl = g.timeline({ defaults: { ease: 'back.out(1.6)' } });
    var split = null;
    try { if (window.SplitText) split = window.SplitText.create('.ov-copy .ug-page-title', { type: 'words,chars' }); } catch (e) { split = null; }
    tl.from('.ov-hero', { x: -16, y: -16, autoAlpha: 0, boxShadow: '22px 22px 0 ' + ink, duration: 0.4, ease: 'power3.in', clearProps: keep + ',boxShadow' }, 0)
      .from('.ov-screen', { scaleY: 0.02, filter: 'brightness(3)', duration: 0.45, ease: 'steps(5)', clearProps: 'transform,filter' }, 0.35)
      .from('.ov-kicker', { y: 12, autoAlpha: 0, duration: 0.45, clearProps: keep }, 0.25)
      .from(split ? split.chars : '.ov-copy .ug-page-title', split ? { yPercent: 60, autoAlpha: 0, duration: 0.5, stagger: 0.02 } : { y: 26, autoAlpha: 0, duration: 0.55, clearProps: keep }, 0.3)
      .from('.ov-hl-bg', { scaleX: 0, duration: 0.42, ease: 'steps(6)' }, 0.66)
      .from(['.ov-copy .ug-status-badge', '.ov-copy .ug-page-desc'], { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: keep }, 0.58)
      .from('.ov-notes > *', { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: keep }, 0.75)
      .call(function () { if (split) split.revert(); fitTitle(); }, null, 1.3)
      .call(function () { drop(g); }, null, 0.9);
    if (window.ScrollTrigger) {
      var items = g.utils.toArray('.info-card.rowloop, .info-card:not(.rowloop) > .info-card-section, .metaMount, #unitEngine, #ue-last-updated-loader');
      g.set(items, { autoAlpha: 0, y: 36 });
      window.ScrollTrigger.batch(items, { start: 'top 92%', once: true, onEnter: function (els) {
        g.to(els, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.7)', clearProps: keep });
      } });
    }
  }

  var TINTS = ['yellow', 'blue', 'pink', 'green'];
  function cards() {
    Array.prototype.forEach.call(document.querySelectorAll('.info-card'), function (row) {
      Array.prototype.slice.call(row.children).forEach(function (sec, i) {
        if (!sec.classList.contains('info-card-section') || sec.classList.contains('ov-card')) return;
        var head = sec.querySelector('h4'), body = sec.querySelector('p');
        var links = body ? Array.prototype.filter.call(body.querySelectorAll('a[href]'), function (a) { return /^\//.test(a.getAttribute('href')); }) : [];
        var link = links.length === 1 ? links[0] : null;
        var card = document.createElement(link ? 'a' : 'div');
        card.className = 'ov-card info-card-section' + (link ? '' : ' ov-card--static');
        card.style.setProperty('--c', 'var(--' + TINTS[i % TINTS.length] + ')');
        if (link) card.href = link.getAttribute('href');
        var name = head ? head.textContent.trim().replace(/:$/, '') : '';
        var html = '';
        if (body) {
          if (link && /^here$/i.test(link.textContent.trim())) {
            link.replaceWith('@@ov@@');
            html = (body.innerHTML.match(/[^.!?]*[.!?]+(?:\s+|$)|[^.!?]+$/g) || []).filter(function (t) { return t.indexOf('@@ov@@') === -1; }).join('').trim();
          } else {
            if (link) link.replaceWith.apply(link, Array.prototype.slice.call(link.childNodes));
            html = body.innerHTML.trim();
          }
        }
        card.innerHTML = '<span class="ov-card-ic"><i></i></span><h3></h3>' + (html ? '<p>' + html + '</p>' : '') + (link ? '<span class="ov-card-go"></span>' : '');
        card.querySelector('h3').textContent = name;
        if (link) card.querySelector('.ov-card-go').innerHTML = esc(name) + ' guide <span class="arrow" aria-hidden="true">&rarr;</span>';
        sec.replaceWith(card);
      });
    });
  }

  function fold(box) {
    if (box.children.length === 1 && box.firstElementChild.classList.contains('ov-fold')) return box.firstElementChild;
    var w = document.createElement('div');
    w.className = 'ov-fold';
    while (box.firstChild) w.appendChild(box.firstChild);
    box.appendChild(w);
    return w;
  }
  function drops() {
    Array.prototype.forEach.call(document.querySelectorAll('.ug-mn-section-items'), fold);
    var exp = window.infToggleExp;
    if (typeof exp !== 'function' || exp.ov) return;
    window.infToggleExp = function (row, body, arr) {
      if (body && !body.getAttribute('data-ads')) {
        var w = fold(body);
        if (typeof window._infAdSpot === 'function') {
          body.setAttribute('data-ads', '1');
          window._infAdSpot(w, null, 'inf-ad-sub');
        }
      }
      exp(row, body, arr);
      Array.prototype.forEach.call(document.querySelectorAll('.inf-exp-body.ov-open'), function (b) {
        if (b.style.maxHeight !== '2000px') b.classList.remove('ov-open');
      });
      if (body && body.style.maxHeight === '2000px') body.classList.add('ov-open');
    };
    window.infToggleExp.ov = true;
  }

  function ready() {
    if (document.getElementById('pv-theme')) return;
    drops();
    cards();
    hero();
    floaters();
    loadAll(['gsap', 'ScrollTrigger', 'SplitText', 'Draggable', 'InertiaPlugin'].map(function (n) { return '/overhaul/gsap/' + n + '.min.js'; }), animate);
    var btn = document.createElement('button');
    btn.id = 'pv-theme';
    btn.type = 'button';
    btn.title = 'Light or dark mode';
    btn.innerHTML = '<svg class="pv-sun" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="8" height="8"></rect><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"></path></svg><svg class="pv-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"></path></svg>';
    document.body.appendChild(btn);
    var lock = 0;
    function label() { btn.setAttribute('aria-label', h.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); }
    label();
    btn.addEventListener('click', function () {
      var now = Date.now();
      if (now < lock) return;
      lock = now + 800;
      btn.classList.add('is-cooling');
      btn.setAttribute('aria-disabled', 'true');
      setTimeout(function () { btn.classList.remove('is-cooling'); btn.removeAttribute('aria-disabled'); }, 800);
      var next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      h.setAttribute('data-theme', next);
      try { localStorage.setItem('pv-theme', next); } catch (e) {}
      label();
    });
    function place() {
      var bell = document.getElementById('ntfBell');
      var ref = bell && !bell.hidden && bell.getClientRects().length ? bell : document.getElementById('ug-sound-btn');
      if (!ref) return;
      btn.style.top = Math.round(ref.getBoundingClientRect().bottom + (window.innerWidth > 768 ? 8 : 6)) + 'px';
    }
    place();
    var bell = document.getElementById('ntfBell');
    if (bell && window.MutationObserver) new MutationObserver(place).observe(bell, { attributes: true, attributeFilter: ['hidden', 'class', 'style'] });
    window.addEventListener('resize', place, { passive: true });
    load('/overhaul/ov-shell.js');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
