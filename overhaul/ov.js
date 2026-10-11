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
    var notes = document.createElement('div');
    notes.className = 'ov-notes';
    Array.prototype.slice.call(area.children).concat(Array.prototype.slice.call(inner.children)).forEach(function (el) {
      if (el === wrap || el.classList.contains('ug-page-title') || el.classList.contains('ug-status-badge') || el.classList.contains('ug-page-desc') || el.classList.contains('ad-slot') || el.querySelector('#cleanModeToggle')) return;
      if (el.classList.contains('ug-status-inline-text') || (el.tagName === 'DIV' && el.querySelector('[style*="Audiowide"]'))) notes.appendChild(el);
    });
    if (notes.children.length) inner.insertBefore(notes, wrap.nextSibling);
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    js.onload = sky;
    document.body.appendChild(js);
  }

  var stars = null;
  function skyLook() {
    var cs = getComputedStyle(h), v = function (n) { return cs.getPropertyValue(n).trim(); };
    if (h.getAttribute('data-theme') === 'light') return { tints: [v('--ink'), v('--ink'), v('--mute'), v('--game'), v('--game')], hot: [v('--ink'), v('--game')], fade: 0.45 };
    return { tints: [v('--text'), v('--text'), v('--mute'), v('--mute'), v('--game'), v('--yellow')], hot: [v('--text'), v('--game')], fade: 0.8 };
  }
  function sky() {
    if (!window.ParvusStars) return;
    var look = skyLook();
    if (!stars) { stars = window.ParvusStars.mount({ startAt: 0, bg: null, tints: look.tints, hot: look.hot, fade: look.fade }); return; }
    stars.tints = look.tints;
    stars.hot = look.hot;
    stars.fade = look.fade;
    stars.tiles = {};
    stars.draw();
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
      sky();
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
