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
    'https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;700&display=swap',
    '/overhaul/parvus-home.css'
  ].forEach(function (href) {
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
    return location.pathname.split('/').filter(Boolean)[0] || '';
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
    window.addEventListener('resize', sizeScreen, { passive: true });
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    js.onload = function () {
      var home = document.getElementById('parvusHome');
      sizeScreen();
      if (home && window.ResizeObserver) new ResizeObserver(sizeScreen).observe(home);
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
    gear: ['....ccc....', '.cc.ccc.cc.', '.ccccccccc.', '..ccccccc..', 'cccc...cccc', 'cccc...cccc', 'cccc...cccc', '..ccccccc..', '.ccccccccc.', '.cc.ccc.cc.', '....ccc....'],
    lens: ['..cccc....', '.cbbbbc...', 'cbcbbbbc..', 'cbbbbbbc..', 'cbbbbbbc..', '.cbbbbc...', '..ccccgg..', '......ggg.', '.......ggg', '........gg'],
    bookmark: ['ggggggg', 'gcggggg', 'gcggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggg.ggg', 'gg...gg', 'g.....g']
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

  var floats = [];
  function floaters() {
    if (/[?&]float=0/.test(location.search) || document.querySelector('.ov-float')) return;
    var layer = document.createElement('div');
    layer.className = 'ov-float';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    var vw = window.innerWidth, phone = vw <= 600, n = phone ? 5 : Math.min(16, Math.max(8, Math.round(vw / 120)));
    for (var i = 0; i < n; i++) {
      var u = phone ? 4 : 4 + Math.floor(Math.random() * 3), el = sticker(pick(), u, 'ov-sticker');
      layer.appendChild(el);
      floats.push({ el: el, u: u, fx: Math.random(), fy: Math.random(), d: rnd(0.15, 0.6), w: parseFloat(el.style.width), cyc: null });
    }
    float();
    if (!reduced) window.addEventListener('scroll', float, { passive: true });
    window.addEventListener('resize', float, { passive: true });
  }
  function float() {
    var vw = window.innerWidth, span = window.innerHeight + 240, sy = reduced ? 0 : window.scrollY;
    floats.forEach(function (f) {
      var pos = f.fy * span - sy * f.d, cyc = Math.floor(pos / span);
      if (f.cyc !== null && cyc !== f.cyc) reroll(f);
      f.cyc = cyc;
      var x = Math.round(f.fx * vw - f.w / 2), y = Math.round(pos - cyc * span - 120);
      f.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
  }
  function pick() {
    var names = Object.keys(SPRITES);
    return names[Math.floor(Math.random() * names.length)];
  }
  function reroll(f) {
    var a = art(SPRITES[pick()]);
    f.w = a.w * f.u;
    f.el.style.width = f.w + 'px';
    f.el.style.height = a.h * f.u + 'px';
    f.el.querySelector('.ov-bob').innerHTML = a.svg;
    f.fx = Math.random();
    f.d = rnd(0.15, 0.6);
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
    g.utils.toArray('.ov-sticker .ov-bob, .ov-pin .ov-bob').forEach(function (b) {
      var u = parseFloat(getComputedStyle(b.closest('[style*="--u"]')).getPropertyValue('--u')) || 5;
      g.to(b, { y: -u * 2, duration: rnd(1.4, 2.6), ease: 'steps(2)', yoyo: true, repeat: -1, delay: rnd(0, 1.5) });
      g.to(b, { x: u * (Math.random() < 0.5 ? -1 : 1), duration: rnd(2.2, 3.8), ease: 'steps(1)', yoyo: true, repeat: -1, delay: rnd(0, 2) });
    });
    (function spin() {
      var list = g.utils.toArray('.ov-sticker .ov-spin');
      if (list.length) g.to(list[Math.floor(Math.random() * list.length)], { rotation: '+=360', duration: 0.6, ease: 'steps(4)' });
      setTimeout(spin, rnd(3500, 6500));
    })();
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

  function load(src, done) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = done;
    document.body.appendChild(s);
  }

  function greet() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var p = window.mascotPeek && window.mascotPeek();
      if (p && window.mascotSay && !p.thinking) {
        clearInterval(iv);
        if (title) window.mascotSay('Welcome to ' + title + '!');
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

  function animate() {
    var g = window.gsap;
    h.classList.remove('ov-pre');
    if (!g || reduced) { unwait(); greet(); return; }
    wiggle(g);
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);
    var keep = 'transform,opacity,visibility';
    var ink = getComputedStyle(h).getPropertyValue('--ink').trim() || '#000';
    var tl = g.timeline({ defaults: { ease: 'back.out(1.6)' } });
    var split = null;
    try { if (window.SplitText) split = window.SplitText.create('.ov-copy .ug-page-title', { type: 'lines,words,chars', mask: 'lines', linesClass: 'ov-line' }); } catch (e) { split = null; }
    tl.from('.ov-hero', { x: -16, y: -16, autoAlpha: 0, boxShadow: '22px 22px 0 ' + ink, duration: 0.4, ease: 'power3.in', clearProps: keep + ',boxShadow' }, 0)
      .from('.ov-screen', { scaleY: 0.02, filter: 'brightness(3)', duration: 0.45, ease: 'steps(5)', clearProps: 'transform,filter' }, 0.35)
      .from('.ov-kicker', { y: 12, autoAlpha: 0, duration: 0.45, clearProps: keep }, 0.25)
      .from(split ? split.chars : '.ov-copy .ug-page-title', split ? { yPercent: 130, duration: 0.5, stagger: 0.02 } : { y: 26, autoAlpha: 0, duration: 0.55, clearProps: keep }, 0.3)
      .from('.ov-hl-bg', { scaleX: 0, duration: 0.42, ease: 'steps(6)' }, 0.66)
      .from(['.ov-copy .ug-status-badge', '.ov-copy .ug-page-desc'], { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: keep }, 0.58)
      .from('.ov-notes > *', { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: keep }, 0.75)
      .call(function () { if (split) split.revert(); }, null, 1.3)
      .call(function () { drop(g); }, null, 0.9);
    if (window.ScrollTrigger) {
      var items = g.utils.toArray('.info-card-section, .metaMount, #unitEngine, #ue-last-updated-loader');
      g.set(items, { autoAlpha: 0, y: 36 });
      window.ScrollTrigger.batch(items, { start: 'top 92%', once: true, onEnter: function (els) {
        g.to(els, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.7)', clearProps: keep });
      } });
    }
  }

  function ready() {
    if (document.getElementById('pv-theme')) return;
    hero();
    floaters();
    load('/overhaul/gsap/gsap.min.js', function () {
      load('/overhaul/gsap/ScrollTrigger.min.js', function () {
        load('/overhaul/gsap/SplitText.min.js', animate);
      });
    });
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
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
