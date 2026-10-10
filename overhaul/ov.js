(function () {
  var h = document.documentElement, t;
  h.classList.add('ov');
  try { t = localStorage.getItem('pv-theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  h.setAttribute('data-theme', t);
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap';
  document.head.appendChild(font);

  function ready() {
    if (document.getElementById('pv-theme')) return;
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
