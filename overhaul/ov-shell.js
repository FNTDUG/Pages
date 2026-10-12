(function () {
  if (document.getElementById('pv-gear')) return;
  var h = document.documentElement, KOFI = 'https://ko-fi.com/fntdug';
  var ROWS = ['......cccc......', '......cccc......', '..ccc.cccc.ccc..', '..cccccccccccc..', '..cccccccccccc..', '...cccccccccc...', 'ccccccc..ccccccc', 'cccccc....cccccc', 'cccccc....cccccc', 'ccccccc..ccccccc', '...cccccccccc...', '..cccccccccccc..', '..cccccccccccc..', '..ccc.cccc.ccc..', '......cccc......', '......cccc......'];
  var CUP = '<svg class="kofi-cup" viewBox="0 0 12 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h9v1H0zM0 1h3v1H0zM4 1h1v1H4zM6 1h6v1H6zM0 2h2v1H0zM7 2h2v1H7zM11 2h1v1h-1zM0 3h3v1H0zM6 3h3v1H6zM11 3h1v1h-1zM0 4h4v1H0zM5 4h6v1H5zM0 5h9v1H0zM1 6h7v1H1z"/></svg>';
  var tray = 'translate .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),scale .36s cubic-bezier(.3,1.3,.5,1) calc(var(--i) * 40ms),opacity .2s calc(var(--i) * 40ms)';
  var css = document.createElement('style');
  css.textContent =
    'html{--gear-size:46px;--gear-step:54px;--gear-icon:24px}' +
    '@media (max-width:768px){html{--gear-size:32px;--gear-step:40px;--gear-icon:18px}}' +
    '#pv-gear{display:flex;align-items:center;justify-content:center;position:fixed;right:12px;top:var(--gear-top,116px);z-index:1048;width:var(--gear-size);height:var(--gear-size);padding:0;cursor:pointer;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);transition:transform .12s,box-shadow .12s,background-color .2s,color .2s;-webkit-tap-highlight-color:transparent}' +
    '#pv-gear:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    '#pv-gear:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink)}' +
    '#pv-gear:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:3px}' +
    '#pv-gear svg{pointer-events:none;width:var(--gear-icon);height:var(--gear-icon);fill:currentColor;transition:rotate .5s cubic-bezier(.3,.8,.3,1)}' +
    'html.pv-gear-open #pv-gear{color:var(--game-ink,#1d2228);background:var(--game,var(--acc))}' +
    'html.pv-gear-open #pv-gear svg{rotate:45deg}' +
    'html.ov .pv-tray{top:calc(var(--gear-top,116px) + (var(--i) + 1) * var(--gear-step))!important;translate:0 calc((var(--i) + 1) * var(--gear-step) * -1);scale:.4;opacity:0;visibility:hidden;' +
    'transition:transform .12s,box-shadow .12s,' + tray + ',visibility 0s linear .45s!important}' +
    'html.ov.pv-gear-open .pv-tray{translate:0 0;scale:1;opacity:1;visibility:visible;transition:transform .12s,box-shadow .12s,' + tray + ',visibility 0s!important}' +
    'html.pv-pop-on #pv-gear,html.ovt-on #pv-gear{visibility:hidden}' +
    '@media (prefers-reduced-motion:reduce){#pv-gear svg,html.ov .pv-tray,html.ov.pv-gear-open .pv-tray{transition:none!important}}' +
    '.kofi-cup{width:24px;height:14px;flex:none;fill:currentColor}' +
    'html.ov .ug-mn-kofi{display:flex;align-items:center;gap:10px;margin-top:12px;padding:12px 14px;color:#2a0f1c;background:var(--pink);border:var(--bw) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);font:700 14px/1 var(--font-body);text-decoration:none;transition:transform .12s,box-shadow .12s}' +
    'html.ov .ug-mn-kofi:hover{color:#2a0f1c;background:#ff8fbd;transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    '@media (max-width:768px){html.ov .ug-mn-kofi{margin-top:10px;padding:10px 12px;font-size:13px}}' +
    'html.ov .ug-mn-discord{transition:transform .12s,box-shadow .12s,background-color .13s,color .13s}' +
    'html.ov .inf-mode:active,html.ov #ug-info-btn:active,html.ov .ug-mn-discord:active,html.ov .ug-mn-kofi:active,html.ov #ug-sound-btn:active,html.ov .ntf-bell:active,html.ov #pv-theme:active,html.ov #pv-gear:active,html.ov .ug-home-discord:active,html.ov .pp-home:active{transform:translate(4px,4px)!important;box-shadow:0 0 0 var(--ink)!important}' +
    'html.ov .inf-mode.on,html.ov .inf-mode.on:hover{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    'html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow{position:relative;display:inline-grid;place-items:center;flex:none;width:22px;height:22px;box-sizing:border-box;margin-left:10px;font-size:0!important;line-height:0;opacity:1;color:var(--text);background:var(--surface);border:2px solid var(--ink);border-radius:0;box-shadow:2px 2px 0 var(--ink);-webkit-mask:none;mask:none;rotate:none;transition:transform .12s,box-shadow .12s,background-color .15s,color .15s}' +
    'html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{content:"";width:8px;height:14px;background:currentColor;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 4 7%27 shape-rendering=%27crispEdges%27%3E%3Cpath d=%27M0 0h1v1H0zM0 1h2v1H0zM1 2h2v1H1zM2 3h2v1H2zM1 4h2v1H1zM0 5h2v1H0zM0 6h1v1H0z%27/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 4 7%27 shape-rendering=%27crispEdges%27%3E%3Cpath d=%27M0 0h1v1H0zM0 1h2v1H0zM1 2h2v1H1zM2 3h2v1H2zM1 4h2v1H1zM0 5h2v1H0zM0 6h1v1H0z%27/%3E%3C/svg%3E") center/contain no-repeat;transition:rotate .24s steps(3,end)}' +
    'html.ov .ug-mn-section.open>.ug-mn-section-btn .ug-mn-section-arrow,html.ov .inf-drop.open>.inf-drop-btn .inf-drop-arrow{color:var(--yellow);background:#1d2228;border-color:#1d2228;transform:translate(2px,2px);box-shadow:0 0 0 var(--ink)}' +
    'html.ov .ug-mn-section.open>.ug-mn-section-btn .ug-mn-section-arrow::before,html.ov .inf-drop.open>.inf-drop-btn .inf-drop-arrow::before{rotate:90deg}' +
    '@media (max-width:768px){html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow{width:20px;height:20px}html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{width:6px;height:10.5px}}' +
    '@media (prefers-reduced-motion:reduce){html.ov .inf-mode,html.ov .ug-mn-discord,html.ov .ug-mn-kofi,html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow,html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{transition:none}}';
  document.head.appendChild(css);
  document.addEventListener('touchstart', function () {}, { passive: true });
  function calm() {
    if (typeof window.ugMnSpinStop === 'function') Array.prototype.forEach.call(document.querySelectorAll('.ug-mn-section-btn'), function (b) { try { window.ugMnSpinStop(b); } catch (e) {} });
    if (typeof window._infStop === 'function') Array.prototype.forEach.call(document.querySelectorAll('.inf-drop-btn'), function (b) { try { window._infStop(b); } catch (e) {} });
    window.ugMnSpinStart = function () {};
    window._infSpin = function () {};
  }
  calm();

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
  g.innerHTML = '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">' + rects + '</svg>';
  document.body.appendChild(g);

  function items() {
    return [document.getElementById('ug-sound-btn'), document.getElementById('ntfBell'), document.getElementById('pv-theme')].filter(function (el) { return el && !el.hidden; });
  }
  function layout() {
    var ref = document.getElementById('ug-info-btn');
    if (!ref || !ref.getClientRects().length) ref = document.getElementById('ug-hamburger');
    var top = ref && ref.getClientRects().length ? Math.round(ref.getBoundingClientRect().bottom + 6) : 116;
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
  layout();
  var resizeT = 0;
  window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(layout, 100); }, { passive: true });
  var bell = document.getElementById('ntfBell');
  if (bell && window.MutationObserver) new MutationObserver(layout).observe(bell, { attributes: true, attributeFilter: ['hidden'] });

  function link(cls, html) {
    var a = document.createElement('a');
    a.href = KOFI;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (cls) a.className = cls;
    a.innerHTML = html;
    return a;
  }
  var dc = document.querySelector('.ug-mn-discord');
  if (dc && !document.querySelector('.ug-mn-kofi')) dc.parentNode.insertBefore(link('ug-mn-kofi', 'Support us on Ko-fi' + CUP), dc.nextSibling);
  var fd = document.querySelector('#ug-footer a[href*="discord.gg"]');
  if (fd && !document.querySelector('#ug-footer a[href*="ko-fi.com"]')) {
    var k = link('', 'Ko-fi');
    fd.parentNode.insertBefore(k, fd.nextSibling);
    fd.parentNode.insertBefore(document.createTextNode('  |  '), k);
  }
})();
