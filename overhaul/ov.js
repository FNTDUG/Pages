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
  function section() {
    var m = document.querySelector('meta[name="ov-section"]');
    if (m && m.content) return m.content;
    var first = location.pathname.split('/').filter(Boolean)[0] || '';
    return SECTIONS[first] || 'FNTD User Guide';
  }

  function hero() {
    var inner = document.getElementById('ug-hero-inner'), area = document.querySelector('.ug-page-title-area');
    if (!inner || !area || document.querySelector('.ov-hero')) return;
    var t = area.querySelector('.ug-page-title');
    if (t) {
      title = t.textContent.trim();
      var words = title.split(' '), last = words.pop();
      t.innerHTML = (words.length ? esc(words.join(' ')) + ' ' : '') + '<span class="ov-hl">' + esc(last) + '</span>';
    }
    var wrap = document.createElement('div');
    wrap.className = 'ov-hero';
    wrap.innerHTML = '<div class="ov-copy"><span class="ov-kicker"><i></i>' + esc(section()) + '</span></div><div class="ov-stage"><div data-parvus-home></div></div>';
    inner.insertBefore(wrap, inner.firstChild);
    wrap.firstChild.appendChild(area);
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    document.body.appendChild(js);
  }

  function band() {
    var heroEl = document.getElementById('ug-hero');
    if (!heroEl || document.querySelector('.ov-band-wrap')) return null;
    var words = [];
    if (title) words.push(title);
    Array.prototype.forEach.call(document.querySelectorAll('.info-card-section h4'), function (h4) { words.push(h4.textContent.trim()); });
    ['Guides', 'Tierlists', 'Metas', 'Stats', 'Patch notes', 'Community'].forEach(function (w) { if (words.length < 9 && words.indexOf(w) < 0) words.push(w); });
    var set = words.map(function (w) { return '<span class="ov-band-item">' + esc(w) + '</span>'; }).join('');
    var wrap = document.createElement('div');
    wrap.className = 'ov-band-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<div class="ov-band"><div class="ov-band-track"><div class="ov-band-set">' + set + '</div><div class="ov-band-set">' + set + '</div></div></div>';
    heroEl.parentNode.insertBefore(wrap, heroEl.nextSibling);
    var track = wrap.querySelector('.ov-band-track'), sets = track.children, base = sets[0].innerHTML;
    var unit = sets[0].getBoundingClientRect().width;
    var copies = Math.max(1, Math.ceil((wrap.getBoundingClientRect().width + 160) / Math.max(unit, 1)));
    var html = '';
    for (var i = 0; i < copies; i++) html += base;
    sets[0].innerHTML = html;
    sets[1].innerHTML = html;
    return { track: track, copies: copies };
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

  function animate(b) {
    var g = window.gsap;
    h.classList.remove('ov-pre');
    if (!g || reduced) { greet(); return; }
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);
    var keep = 'transform,opacity,visibility';
    var ink = getComputedStyle(h).getPropertyValue('--ink').trim() || '#000';
    var tl = g.timeline({ defaults: { ease: 'back.out(1.6)' } });
    tl.from('.ov-kicker', { y: 12, autoAlpha: 0, duration: 0.45, clearProps: keep }, 0.05)
      .from('.ov-copy .ug-page-title', { y: 26, autoAlpha: 0, duration: 0.55, clearProps: keep }, 0.12)
      .from('.ov-hl', { clipPath: 'inset(0 100% 0 0)', duration: 0.42, ease: 'steps(6)', clearProps: 'clipPath' }, 0.45)
      .from('.ov-stage', { x: -16, y: -16, autoAlpha: 0, boxShadow: '22px 22px 0 ' + ink, duration: 0.4, ease: 'power3.in', clearProps: keep + ',boxShadow' }, 0.25)
      .from(['.ov-copy .ug-status-badge', '.ov-copy .ug-page-desc', '.ov-copy .ug-page-title-area > div:not(.ug-page-title):not(.ug-status-badge)', '#ug-hero-inner > *:not(.ov-hero):not(.ad-slot)'], { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: keep }, 0.4)
      .call(greet, null, 1.1);
    if (b && window.ScrollTrigger) {
      var loop = g.to(b.track, { xPercent: -50, duration: 30 * b.copies, ease: 'none', repeat: -1 });
      window.ScrollTrigger.create({ onUpdate: function (self) {
        g.to(loop, { timeScale: self.direction * Math.min(5, 1 + Math.abs(self.getVelocity()) / 300), duration: 0.15, overwrite: true });
        g.to(loop, { timeScale: self.direction, duration: 1, delay: 0.2 });
      } });
    }
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
    var b = band();
    load('/overhaul/gsap/gsap.min.js', function () {
      load('/overhaul/gsap/ScrollTrigger.min.js', function () { animate(b); });
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
