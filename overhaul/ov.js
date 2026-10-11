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
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700;800&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;700&display=swap';
  document.head.appendChild(font);
  var homeCss = document.createElement('link');
  homeCss.rel = 'stylesheet';
  homeCss.href = '/overhaul/parvus-home.css';
  document.head.appendChild(homeCss);

  function pad(n) { return ('0' + n).slice(-2); }
  function terminal() {
    var hero = document.getElementById('ug-hero-inner');
    if (!hero || document.querySelector('.ov-term')) return;
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var term = document.createElement('div');
    term.className = 'ov-term';
    term.innerHTML = '<div class="ov-term-bar"><span class="ov-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="ov-path">~' + path.replace(/[<>&]/g, '') + '</span><span class="ov-state"><i></i><span class="ov-state-text">booting</span></span><span class="ov-clock" aria-hidden="true"></span></div><div class="ov-term-screen" data-parvus-home></div>';
    hero.insertBefore(term, hero.firstChild);
    var stateEl = term.querySelector('.ov-state-text'), clock = term.querySelector('.ov-clock');
    setInterval(function () {
      var p = window.mascotPeek ? window.mascotPeek() : null;
      if (p) stateEl.textContent = p.thinking ? 'thinking' : p.mood ? p.mood : p.state;
      var d = new Date();
      clock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }, 500);
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    document.body.appendChild(js);
  }
  var title = '';
  function outline() {
    Array.prototype.forEach.call(document.querySelectorAll('.ug-page-title'), function (t) {
      if (t.querySelector('.ov-t')) return;
      var text = t.textContent.trim();
      if (!title) title = text;
      t.setAttribute('aria-label', text);
      t.textContent = '';
      text.split(' ').forEach(function (word, w) {
        var wd = document.createElement('span');
        wd.className = 'ov-w';
        wd.setAttribute('aria-hidden', 'true');
        word.split('').forEach(function (ch) {
          var sp = document.createElement('span');
          sp.className = 'ov-t';
          sp.setAttribute('data-t', ch);
          sp.textContent = ch;
          wd.appendChild(sp);
        });
        if (w) t.appendChild(document.createTextNode(' '));
        t.appendChild(wd);
      });
    });
  }

  function esc(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function band() {
    var hero = document.getElementById('ug-hero');
    if (!hero || document.querySelector('.ov-band-wrap')) return null;
    var words = [];
    if (title) words.push(title);
    Array.prototype.forEach.call(document.querySelectorAll('.info-card-section h4'), function (h4) { words.push(h4.textContent.trim()); });
    ['Guides', 'Tierlists', 'Metas', 'Stats', 'Patch notes', 'FNTD User Guide'].forEach(function (w) { if (words.length < 9 && words.indexOf(w) < 0) words.push(w); });
    var set = words.map(function (w) { return '<span class="ov-band-item">' + esc(w) + '</span>'; }).join('');
    var wrap = document.createElement('div');
    wrap.className = 'ov-band-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<div class="ov-band"><div class="ov-band-track"><div class="ov-band-set">' + set + '</div><div class="ov-band-set">' + set + '</div></div></div>';
    hero.parentNode.insertBefore(wrap, hero.nextSibling);
    var track = wrap.querySelector('.ov-band-track'), sets = track.children, unit = sets[0].getBoundingClientRect().width, base = sets[0].innerHTML;
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
    var t = setInterval(function () {
      tries++;
      var p = window.mascotPeek && window.mascotPeek();
      if (p && window.mascotSay && !p.thinking) {
        clearInterval(t);
        if (title) window.mascotSay('Welcome to ' + title + '!');
      } else if (tries > 20) clearInterval(t);
    }, 400);
  }

  function animate(b) {
    var g = window.gsap;
    h.classList.remove('ov-pre');
    if (!g || reduced) { greet(); return; }
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);
    var keep = 'transform,opacity,visibility';
    var tl = g.timeline();
    tl.from('.ov-term', { scaleY: 0.02, scaleX: 0.7, autoAlpha: 0, duration: 0.5, ease: 'steps(6)', transformOrigin: '50% 50%', clearProps: keep }, 0)
      .from('.ov-term-screen', { filter: 'brightness(4) saturate(0)', duration: 0.6, ease: 'power2.out', clearProps: 'filter' }, 0.45)
      .from('.ug-page-title .ov-t', { yPercent: -130, rotation: function () { return g.utils.random(-18, 18); }, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: 'bounce.out', clearProps: keep }, 0.35)
      .from(['.ug-status-badge', '.ug-page-title-area > .ug-page-desc', '.ug-page-title-area > div:not(.ug-page-title):not(.ug-status-badge)', '#ug-hero-inner > *:not(.ov-term):not(.ug-page-title-area):not(.ad-slot)'], { x: -24, autoAlpha: 0, duration: 0.45, stagger: 0.07, ease: 'back.out(1.8)', clearProps: keep }, 0.7)
      .call(greet, null, 1.2);
    if (b && window.ScrollTrigger) {
      var loop = g.to(b.track, { xPercent: -50, duration: 30 * b.copies, ease: 'none', repeat: -1 });
      window.ScrollTrigger.create({ onUpdate: function (self) {
        g.to(loop, { timeScale: self.direction * Math.min(5, 1 + Math.abs(self.getVelocity()) / 300), duration: 0.15, overwrite: true });
        g.to(loop, { timeScale: self.direction, duration: 1, delay: 0.2 });
      } });
    }
    if (window.ScrollTrigger) {
      var items = g.utils.toArray('.info-card-section, .metaMount, #unitEngine, .ug-status-inline-text, #ue-last-updated-loader');
      g.set(items, { autoAlpha: 0, y: 40 });
      window.ScrollTrigger.batch(items, { start: 'top 92%', once: true, onEnter: function (els) {
        g.to(els, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)', clearProps: keep });
      } });
    }
  }

  function ready() {
    if (document.getElementById('pv-theme')) return;
    outline();
    terminal();
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
