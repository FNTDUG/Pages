(function () {
  var h = document.documentElement, t;
  h.classList.add('ov');
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
  function outline() {
    Array.prototype.forEach.call(document.querySelectorAll('.ug-page-title'), function (t) {
      if (t.querySelector('.ov-t')) return;
      var text = t.textContent.trim();
      var sp = document.createElement('span');
      sp.className = 'ov-t';
      sp.setAttribute('data-t', text);
      sp.textContent = text;
      t.textContent = '';
      t.appendChild(sp);
    });
  }

  function ready() {
    if (document.getElementById('pv-theme')) return;
    outline();
    terminal();
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
