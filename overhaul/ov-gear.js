(function () {
  if (document.getElementById('pv-gear')) return;
  var h = document.documentElement, STEP = 40;
  var ROWS = ['....ccc....', '.cc.ccc.cc.', '.ccccccccc.', '..ccccccc..', 'cccc...cccc', 'cccc...cccc', 'cccc...cccc', '..ccccccc..', '.ccccccccc.', '.cc.ccc.cc.', '....ccc....'];
  var css = document.createElement('style');
  css.textContent =
    '#pv-gear{display:none}' +
    '@media (max-width:768px){' +
    '#pv-gear{display:flex;align-items:center;justify-content:center;position:fixed;right:12px;top:var(--gear-top,86px);z-index:1048;width:32px;height:32px;padding:0;cursor:pointer;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);transition:transform .12s,box-shadow .12s,background-color .2s,color .2s;-webkit-tap-highlight-color:transparent}' +
    '#pv-gear:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink)}' +
    '#pv-gear:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:3px}' +
    '#pv-gear svg{width:18px;height:18px;fill:currentColor;transition:rotate .5s cubic-bezier(.3,.8,.3,1)}' +
    'html.pv-gear-open #pv-gear{color:var(--game-ink,#1d2228);background:var(--game,var(--acc))}' +
    'html.pv-gear-open #pv-gear svg{rotate:90deg}' +
    'html.ov .pv-tray{top:calc(var(--gear-top,86px) + (var(--i) + 1) * ' + STEP + 'px)!important;translate:0 calc((var(--i) + 1) * -' + STEP + 'px);scale:.4;opacity:0;visibility:hidden;' +
    'transition:transform .12s,box-shadow .12s,translate .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),scale .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),opacity .2s calc(var(--i) * 40ms),visibility 0s linear .45s!important}' +
    'html.ov.pv-gear-open .pv-tray{translate:0 0;scale:1;opacity:1;visibility:visible;' +
    'transition:transform .12s,box-shadow .12s,translate .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),scale .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),opacity .2s calc(var(--i) * 40ms),visibility 0s!important}' +
    'html.pv-pop-on #pv-gear,html.ovt-on #pv-gear{visibility:hidden}' +
    '}' +
    '@media (max-width:768px) and (prefers-reduced-motion:reduce){#pv-gear svg,html.ov .pv-tray,html.ov.pv-gear-open .pv-tray{transition:none!important}}';
  document.head.appendChild(css);

  var g = document.createElement('button');
  g.id = 'pv-gear';
  g.type = 'button';
  g.title = 'Settings';
  g.setAttribute('aria-label', 'Settings');
  g.setAttribute('aria-expanded', 'false');
  var rects = '';
  ROWS.forEach(function (r, y) {
    for (var x = 0; x < r.length; x++) if (r.charAt(x) !== '.') rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
  });
  g.innerHTML = '<svg viewBox="0 0 11 11" shape-rendering="crispEdges" aria-hidden="true">' + rects + '</svg>';
  document.body.appendChild(g);

  var phone = window.matchMedia('(max-width: 768px)');
  function items() {
    return [document.getElementById('ug-sound-btn'), document.getElementById('ntfBell'), document.getElementById('pv-theme')].filter(function (el) { return el && !el.hidden; });
  }
  function layout() {
    var ref = document.getElementById('ug-info-btn');
    if (!ref || !ref.getClientRects().length) ref = document.getElementById('ug-hamburger');
    var top = ref && ref.getClientRects().length ? Math.round(ref.getBoundingClientRect().bottom + 6) : 86;
    h.style.setProperty('--gear-top', top + 'px');
    Array.prototype.forEach.call(document.querySelectorAll('.pv-tray'), function (el) { el.classList.remove('pv-tray'); });
    items().forEach(function (el, i) {
      el.classList.add('pv-tray');
      el.style.setProperty('--i', i);
    });
  }
  function isOpen() { return h.classList.contains('pv-gear-open'); }
  function set(open) {
    h.classList.toggle('pv-gear-open', open);
    g.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  g.addEventListener('click', function () {
    layout();
    set(!isOpen());
  });
  document.addEventListener('click', function (e) {
    if (!isOpen() || g.contains(e.target) || (e.target.closest && e.target.closest('.pv-tray'))) return;
    set(false);
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { set(false); g.focus(); }
  });
  function sync() {
    if (phone.matches) layout();
    else {
      set(false);
      Array.prototype.forEach.call(document.querySelectorAll('.pv-tray'), function (el) { el.classList.remove('pv-tray'); });
    }
  }
  sync();
  if (phone.addEventListener) phone.addEventListener('change', sync);
  else if (phone.addListener) phone.addListener(sync);
  window.addEventListener('resize', function () { if (phone.matches) layout(); }, { passive: true });
  var bell = document.getElementById('ntfBell');
  if (bell && window.MutationObserver) new MutationObserver(function () { if (phone.matches) layout(); }).observe(bell, { attributes: true, attributeFilter: ['hidden'] });
})();
