(function () {
  if (document.getElementById('pv-gear')) return;
  var h = document.documentElement, KOFI = 'https://ko-fi.com/fntdug', ROBUX = 'https://www.roblox.com/game-pass/2040640989/100-Robux-donation';
  var RBX = ['.....xx.....', '...xxxxxx...', '.xxxxxxxxxx.', 'xxxxxxxxxxxx', 'xxxx....xxxx', 'xxxx....xxxx', 'xxxx....xxxx', 'xxxx....xxxx', 'xxxxxxxxxxxx', '.xxxxxxxxxx.', '...xxxxxx...', '.....xx.....'];
  var ROWS = ['......cccc......', '......cccc......', '..ccc.cccc.ccc..', '..cccccccccccc..', '..cccccccccccc..', '...cccccccccc...', 'ccccccc..ccccccc', 'cccccc....cccccc', 'cccccc....cccccc', 'ccccccc..ccccccc', '...cccccccccc...', '..cccccccccccc..', '..cccccccccccc..', '..ccc.cccc.ccc..', '......cccc......', '......cccc......'];
  var CUP = '<svg class="kofi-cup" viewBox="0 0 12 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h9v1H0zM0 1h3v1H0zM4 1h1v1H4zM6 1h6v1H6zM0 2h2v1H0zM7 2h2v1H7zM11 2h1v1h-1zM0 3h3v1H0zM6 3h3v1H6zM11 3h1v1h-1zM0 4h4v1H0zM5 4h6v1H5zM0 5h9v1H0zM1 6h7v1H1z"/></svg>';
  var CASE = '<svg class="sponsor-case" viewBox="0 0 12 9" shape-rendering="crispEdges" aria-hidden="true"><path d="M3 0h6v1H3zM3 1h1v1H3zM8 1h1v1H8zM0 2h12v1H0zM0 3h12v1H0zM0 4h5v1H0zM7 4h5v1H7zM0 5h5v1H0zM7 5h5v1H7zM0 6h12v1H0zM0 7h12v1H0zM0 8h12v1H0z"/></svg>';
  var PARVUS = '<svg viewBox="0 0 28 23" shape-rendering="crispEdges" aria-hidden="true"><path d="M7 0h3v1H7zM6 1h1v1H6zM10 1h1v1H10zM16 1h5v1H16zM5 2h1v1H5zM8 2h1v1H8zM10 2h1v1H10zM14 2h2v1H14zM21 2h2v1H21zM5 3h1v1H5zM8 3h1v1H8zM10 3h1v1H10zM13 3h2v1H13zM22 3h2v1H22zM5 4h1v1H5zM8 4h2v1H8zM12 4h1v1H12zM24 4h1v1H24zM5 5h1v1H5zM8 5h1v1H8zM11 5h1v1H11zM25 5h1v1H25zM5 6h1v1H5zM8 6h1v1H8zM11 6h1v1H11zM15 6h1v1H15zM21 6h1v1H21zM25 6h1v1H25zM5 7h1v1H5zM9 7h1v1H9zM12 7h1v1H12zM14 7h1v1H14zM16 7h1v1H16zM20 7h1v1H20zM22 7h1v1H22zM24 7h1v1H24zM5 8h1v1H5zM9 8h1v1H9zM12 8h1v1H12zM24 8h1v1H24zM2 9h3v1H2zM9 9h4v1H9zM24 9h2v1H24zM1 10h1v1H1zM4 10h1v1H4zM9 10h1v1H9zM12 10h1v1H12zM24 10h1v1H24zM26 10h1v1H26zM0 11h1v1H0zM27 11h1v1H27zM0 12h1v1H0zM27 12h1v1H27zM0 13h1v1H0zM27 13h1v1H27zM0 14h1v1H0zM27 14h1v1H27zM0 15h1v1H0zM27 15h1v1H27zM0 16h1v1H0zM27 16h1v1H27zM0 17h1v1H0zM27 17h1v1H27zM1 18h1v1H1zM26 18h1v1H26zM2 19h1v1H2zM25 19h1v1H25zM3 20h2v1H3zM23 20h2v1H23zM5 21h3v1H5zM20 21h3v1H20zM8 22h12v1H8z"/><path class="pv-ask-word" d="M2 15h3v1H2zM6 15h1v1H6zM9 15h1v1H9zM11 15h3v1H11zM15 15h2v1H15zM19 15h1v1H19zM21 15h1v1H21zM23 15h3v1H23zM2 16h1v1H2zM6 16h2v1H6zM9 16h1v1H9zM12 16h1v1H12zM15 16h1v1H15zM17 16h1v1H17zM19 16h1v1H19zM21 16h1v1H21zM23 16h1v1H23zM2 17h2v1H2zM6 17h1v1H6zM8 17h2v1H8zM12 17h1v1H12zM15 17h1v1H15zM17 17h1v1H17zM19 17h1v1H19zM21 17h1v1H21zM23 17h1v1H23zM25 17h1v1H25zM2 18h1v1H2zM6 18h1v1H6zM9 18h1v1H9zM12 18h1v1H12zM15 18h2v1H15zM19 18h3v1H19zM23 18h3v1H23z"/></svg>';
  var MAIL = '<svg class="mail-icon" viewBox="0 0 12 8" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h12v1H0zM0 1h1v1H0zM2 1h8v1H2zM11 1h1v1H11zM0 2h2v1H0zM3 2h6v1H3zM10 2h2v1H10zM0 3h3v1H0zM4 3h4v1H4zM9 3h3v1H9zM0 4h4v1H0zM8 4h4v1H8zM0 5h12v1H0zM0 6h12v1H0zM0 7h12v1H0z"/></svg>';
  var STAFF = '<svg class="staff-icon" viewBox="0 0 12 9" shape-rendering="crispEdges" aria-hidden="true"><path d="M2 0h2v1H2zM8 0h2v1H8zM1 1h4v1H1zM7 1h4v1H7zM1 2h4v1H1zM7 2h4v1H7zM2 3h2v1H2zM8 3h2v1H8zM1 5h4v1H1zM7 5h4v1H7zM0 6h5v3H0zM7 6h5v3H7z"/></svg>';
  var CHAT = '<svg class="discord-chat" viewBox="0 0 12 10" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 0h10v1H1zM0 1h12v1H0zM0 2h12v1H0zM0 3h2v1H0zM4 3h1v1H4zM7 3h1v1H7zM10 3h2v1H10zM0 4h2v1H0zM4 4h1v1H4zM7 4h1v1H7zM10 4h2v1H10zM0 5h12v1H0zM1 6h10v1H1zM2 7h3v1H2zM2 8h2v1H2zM2 9h1v1H2z"/></svg>';
  var EYE = ['....xxxx....', '..xx....xx..', '.x...xx...x.', 'x...xxxx...x', 'x...xxxx...x', '.x...xx...x.', '..xx....xx..', '....xxxx....'];
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
    '#pv-ask{display:none;align-items:center;justify-content:center;position:fixed;right:calc(22px + var(--gear-size));top:var(--gear-top,116px);z-index:1048;width:var(--gear-size);height:var(--gear-size);padding:0;cursor:pointer;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);transition:transform .12s,box-shadow .12s}' +
    'html.ov-talk-ready #pv-ask{display:flex}' +
    '#pv-ask:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    '#pv-ask:active{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    '#pv-ask:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:3px}' +
    '#pv-ask svg{pointer-events:none;width:28px;height:23px;fill:currentColor}' +
    '#pv-ask .pv-ask-word{fill:#fff}' +
    'html[data-theme="light"] #pv-ask .pv-ask-word{fill:var(--ink,#1d2228)}' +
    '@media (max-width:768px){#pv-ask svg{width:21px;height:17px}}' +
    'html.pv-pop-on #pv-ask,html.ovt-on #pv-ask,html.talk-on #pv-ask{visibility:hidden}' +
    '#pv-a11y{display:flex;align-items:center;justify-content:center;position:fixed;right:12px;top:var(--gear-top,116px);z-index:1047;width:var(--gear-size);height:var(--gear-size);padding:0;cursor:pointer;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm)}' +
    '#pv-a11y:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    '#pv-a11y:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:3px}' +
    '#pv-a11y svg{pointer-events:none;width:var(--gear-icon);height:calc(var(--gear-icon) * 2 / 3);fill:currentColor}' +
    '#pv-a11y[aria-expanded="true"]{color:var(--game-ink,#1d2228);background:var(--game,var(--acc))}' +
    'html:not(.pv-gear-open) #pv-a11y{pointer-events:none}' +
    '#pv-a11y-panel{position:fixed;right:calc(24px + var(--gear-size));top:var(--a11y-top,116px);z-index:1048;width:min(270px,calc(100vw - 48px - var(--gear-size)));box-sizing:border-box;max-height:calc(100vh - 24px);overflow:auto;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);box-shadow:var(--shadow,6px 6px 0 #000);font-family:var(--font-body);animation:pvA11yIn .18s cubic-bezier(.3,1.3,.5,1)}' +
    '#pv-a11y-panel[hidden]{display:none}' +
    '@keyframes pvA11yIn{from{opacity:0;translate:10px 0}}' +
    '.pv-a11y-h{margin:0;padding:12px 14px;font:400 14px/1.2 var(--font-head);text-transform:uppercase;letter-spacing:.04em;color:var(--game-ink,#1d2228);background:var(--game,var(--acc));border-bottom:var(--bw,3px) solid var(--ink)}' +
    '.pv-a11y-l{margin:0;padding:12px 14px 6px;font:700 12px/1.2 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}' +
    '.pv-a11y-opt{display:block;width:100%;padding:10px 14px;color:var(--text);background:none;border:0;border-bottom:2px solid var(--surface2);border-radius:0;font:700 14px/1.25 var(--font-body);text-align:left;cursor:pointer;box-shadow:inset 0 0 0 var(--sel-bar,var(--yellow));transition:box-shadow .3s steps(3,end),background-color .15s,color .15s}' +
    '.pv-a11y-opt:last-child{border-bottom:0}' +
    '.pv-a11y-opt:hover{background:var(--surface2)}' +
    '.pv-a11y-opt:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:-3px}' +
    '.pv-a11y-opt[aria-pressed="true"]{color:var(--sel-text,var(--yellow));box-shadow:inset 6px 0 0 var(--sel-bar,var(--yellow))}' +
    '.pv-a11y-opt small{display:block;margin-top:2px;font:500 12px/1.3 var(--font-body);color:var(--mute)}' +
    '.pv-a11y-opt.pv-a11y-dys{font-family:"OpenDyslexic",var(--font-body)}' +
    'html.pv-pop-on #pv-a11y,html.ovt-on #pv-a11y,html.pv-pop-on #pv-a11y-panel,html.ovt-on #pv-a11y-panel{visibility:hidden}' +
    '@media (prefers-reduced-motion:reduce){#pv-ask,#pv-gear svg,html.ov .pv-tray,html.ov.pv-gear-open .pv-tray{transition:none!important}#pv-a11y-panel{animation:none}}' +
    '.kofi-cup,.discord-chat,.sponsor-case,.card-bell,.mail-icon,.staff-icon{flex:none;fill:currentColor}.kofi-cup{width:calc(12*var(--ipx,2px));height:calc(7*var(--ipx,2px))}.discord-chat{width:calc(12*var(--ipx,2px));height:calc(10*var(--ipx,2px))}.sponsor-case{width:calc(12*var(--ipx,2px));height:calc(9*var(--ipx,2px))}.card-bell{width:calc(11*var(--ipx,2px));height:calc(12*var(--ipx,2px))}.mail-icon{width:calc(12*var(--ipx,2px));height:calc(8*var(--ipx,2px))}.staff-icon{width:calc(12*var(--ipx,2px));height:calc(9*var(--ipx,2px))}html.ov #ug-footer p.ov-foot-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:max-content;max-width:100%;margin:2px auto 14px;line-height:1;position:relative;left:-1.5px}html.ov #ug-footer p.ov-foot-chips a[href="/staff"]{grid-column:2}@media (max-width:480px){html.ov #ug-footer p.ov-foot-chips{grid-auto-flow:row;grid-template-columns:1fr 1fr}html.ov #ug-footer p.ov-foot-chips a:nth-child(3):last-child{grid-column:1 / -1;justify-self:center;width:calc(50% - 6px)}html.ov #ug-footer p.ov-foot-chips a[href="/staff"]{grid-column:auto}}html.ov #ug-footer .ug-top-row{position:relative;left:-2px}html.ov #ug-footer p.ov-foot-legal{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px}@media (max-width:480px){html.ov #ug-footer p.ov-foot-legal{display:flex;justify-content:center}}html.ov #ug-footer p.ov-foot-legal>a:first-child{justify-self:end}html.ov #ug-footer p.ov-foot-legal>a:last-child{justify-self:start}html.ov #ug-footer .ov-foot-sep{color:var(--mute)}html.ov #ug-footer p.ov-foot-chips a{--ipx:1.5px;display:flex;align-items:center;justify-content:center;gap:9px;min-height:40px;padding:0 14px;color:var(--text);background:var(--bg);border:2px solid var(--ink);border-radius:0;box-shadow:3px 3px 0 var(--ink);text-decoration:none;font-weight:700;transition:transform .12s,box-shadow .12s}html.ov #ug-footer p.ov-foot-chips a:hover{color:var(--text);transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--ink)}html.ov #ug-footer p.ov-foot-chips a:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink)}html.ov #ug-footer p.ov-foot-chips a:focus-visible{outline:3px solid var(--yellow);outline-offset:3px}html.ov .ug-mn-kofi,html.ov .ug-mn-discord,html.ov .ug-mn-sponsor,.ov-card-go{--ipx:1.5px}' +
    'html.ov a.ug-home-discord{gap:10px}' +
    'html.ov .ug-mn-kofi{display:flex;align-items:center;gap:10px;margin-top:12px;padding:12px 14px;color:#2a0f1c;background:var(--pink);border:var(--bw) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);font:700 14px/1 var(--font-body);text-decoration:none;transition:transform .12s,box-shadow .12s}' +
    'html.ov .ug-mn-kofi:hover{color:#2a0f1c;background:#ff8fbd;transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    '@media (max-width:768px){html.ov .ug-mn-kofi{margin-top:10px;padding:10px 12px;font-size:13px}}' +
    'html.ov .ov-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px}' +
    'html.ov .ug-mn-sponsor{text-decoration:none;display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;margin-top:12px;padding:12px 14px;color:#10260f;background:var(--green);border:var(--bw) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);font:700 14px/1 var(--font-body);text-align:left;cursor:pointer;transition:transform .12s,box-shadow .12s,background-color .13s}' +
    'html.ov .ug-mn-sponsor:hover{background:#9be59f;transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    'html.ov .ug-mn-sponsor:active{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    '@media (max-width:768px){html.ov .ug-mn-sponsor{margin-top:10px;padding:10px 12px;font-size:13px}}' +
    'html.ov #ug-hero a.ug-home-kofi{display:inline-flex;align-items:center;gap:10px;padding:11px 16px;color:#2a0f1c!important;background:var(--pink);border:var(--bw) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm);font:700 14px/1 var(--font-body);text-decoration:none!important;transition:transform .15s,box-shadow .15s}' +
    'html.ov #ug-hero a.ug-home-kofi:hover{color:#2a0f1c!important;background:#ff8fbd;transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover)}' +
    'html.ov #ug-hero a.ug-home-kofi:active{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    'html.ov .ug-mn-discord{transition:transform .12s,box-shadow .12s,background-color .13s,color .13s}' +
    'html.ov .inf-mode:active,html.ov #ug-info-btn:active,html.ov .ug-mn-discord:active,html.ov .ug-mn-kofi:active,html.ov #ug-sound-btn:active,html.ov .ntf-bell:active,html.ov #pv-theme:active,html.ov #pv-gear:active,html.ov .ug-home-discord:active,html.ov .pp-home:active{transform:translate(4px,4px)!important;box-shadow:0 0 0 var(--ink)!important}' +
    'html.ov .inf-mode.on,html.ov .inf-mode.on:hover{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    'html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow{position:relative;display:inline-grid;place-items:center;flex:none;width:22px;height:22px;box-sizing:border-box;margin-left:10px;font-size:0!important;line-height:0;opacity:1!important;color:var(--text);background:var(--surface);border:2px solid var(--ink);border-radius:0;box-shadow:2px 2px 0 var(--ink);-webkit-mask:none;mask:none;rotate:none;transition:transform .12s,box-shadow .12s,background-color .15s,color .15s}' +
    'html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{content:"";position:absolute;left:50%;bottom:4px;width:8px;height:2px;translate:-50% 0;background:currentColor;transition:height .2s steps(3,end)}' +
    'html.ov .ug-mn-section.open>.ug-mn-section-btn .ug-mn-section-arrow,html.ov .inf-drop.open>.inf-drop-btn .inf-drop-arrow{opacity:1!important;color:var(--yellow);background:#1d2228;border-color:var(--ink);transform:translate(2px,2px);box-shadow:0 0 0 var(--ink)}' +
    'html.ov .ug-mn-section.open>.ug-mn-section-btn .ug-mn-section-arrow::before,html.ov .inf-drop.open>.inf-drop-btn .inf-drop-arrow::before{height:12px;animation:pvCaret 1.05s steps(1,end) .2s infinite}' +
    '@keyframes pvCaret{0%{opacity:1}50%{opacity:0}}' +
    '@media (max-width:768px){html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow{width:20px;height:20px}html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{width:7px;bottom:3px}html.ov .ug-mn-section.open>.ug-mn-section-btn .ug-mn-section-arrow::before,html.ov .inf-drop.open>.inf-drop-btn .inf-drop-arrow::before{height:10px}}' +
    '@media (prefers-reduced-motion:reduce){html.ov .inf-mode,html.ov .ug-mn-discord,html.ov .ug-mn-kofi,html.ov .ug-mn-section-arrow,html.ov .inf-drop-arrow,html.ov .ug-mn-section-arrow::before,html.ov .inf-drop-arrow::before{transition:none;animation:none!important}}' +
    '#pv-sup{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(8,10,14,.62)}' +
    '#pv-sup[hidden]{display:none}' +
    '.pv-sup-box{position:relative;width:min(340px,100%);box-sizing:border-box;color:var(--text);background:var(--surface);border:var(--bw,3px) solid var(--ink);box-shadow:var(--shadow,6px 6px 0 #000);font-family:var(--font-body);animation:pvSupIn .22s cubic-bezier(.3,1.3,.5,1)}' +
    '@keyframes pvSupIn{from{opacity:0;scale:.92}}' +
    '.pv-sup-h{margin:0;padding:14px 52px 14px 16px;font:400 16px/1.2 var(--font-head);text-transform:uppercase;letter-spacing:.04em;color:#2a0f1c;background:var(--pink);border-bottom:var(--bw,3px) solid var(--ink)}' +
    '.pv-sup-x{position:absolute;top:8px;right:8px;display:grid;place-items:center;width:32px;height:32px;padding:0;color:var(--text);background:var(--surface);border:2px solid var(--ink);border-radius:0;box-shadow:2px 2px 0 var(--ink);font:700 16px/1 var(--font-body);cursor:pointer}' +
    '.pv-sup-x:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--ink)}' +
    '.pv-sup-x:focus-visible,.pv-sup-btn:focus-visible{outline:3px solid var(--yellow,#ffd23f);outline-offset:3px}' +
    '.pv-sup-p{margin:0;padding:14px 16px 4px;color:var(--mute);font:500 14px/1.45 var(--font-body)}' +
    '.pv-sup-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 16px 16px}' +
    '.pv-sup-btn{--ipx:2px;display:flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 12px;border:var(--bw,3px) solid var(--ink);border-radius:0;box-shadow:var(--shadow-sm,3px 3px 0 #000);font:700 15px/1 var(--font-body);text-decoration:none;transition:transform .12s,box-shadow .12s,background-color .13s}' +
    '.pv-sup-btn:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-sm-hover,5px 5px 0 #000)}' +
    '.pv-sup-btn:active{transform:translate(4px,4px);box-shadow:0 0 0 var(--ink)}' +
    '.pv-sup-rbx,.pv-sup-rbx:hover{color:#10260f;background:var(--green)}.pv-sup-rbx:hover{background:#9be59f}' +
    '.pv-sup-kofi,.pv-sup-kofi:hover{color:#2a0f1c;background:var(--pink)}.pv-sup-kofi:hover{background:#ff8fbd}' +
    '.robux-icon{flex:none;width:calc(12*var(--ipx,2px));height:calc(12*var(--ipx,2px));fill:currentColor}' +
    '@media (prefers-reduced-motion:reduce){.pv-sup-box{animation:none}.pv-sup-btn{transition:none}}';
  document.head.appendChild(css);
  document.addEventListener('touchstart', function () {}, { passive: true });
  function calm() {
    if (typeof window.ugMnSpinStop === 'function') Array.prototype.forEach.call(document.querySelectorAll('.ug-mn-section-btn'), function (b) { try { window.ugMnSpinStop(b); } catch (e) {} });
    if (typeof window._infStop === 'function') Array.prototype.forEach.call(document.querySelectorAll('.inf-drop-btn'), function (b) { try { window._infStop(b); } catch (e) {} });
    window.ugMnSpinStart = function () {};
    window._infSpin = function () {};
  }
  calm();
  if (typeof window.ugMobileOpen === 'function' && !window.ugMobileOpen._ov) {
    var menuOpen = window.ugMobileOpen;
    window.ugMobileOpen = function () {
      var info = document.getElementById('ug-info-panel');
      if (info && info.classList.contains('open') && typeof window.ugInfoClose === 'function') window.ugInfoClose();
      return menuOpen.apply(this, arguments);
    };
    window.ugMobileOpen._ov = true;
  }

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
  if (document.getElementById('ug-hamburger')) document.body.appendChild(g);

  var ask = document.createElement('button');
  ask.id = 'pv-ask';
  ask.type = 'button';
  ask.title = 'Ask Parvus';
  ask.setAttribute('aria-label', 'Ask Parvus');
  ask.innerHTML = PARVUS;
  ask.addEventListener('click', function () { if (window.ovTalkOpen) window.ovTalkOpen(ask); });
  document.body.appendChild(ask);

  var A11Y = [
    ['font', 'Text font', [['', 'Standard'], ['dyslexic', 'OpenDyslexic', '', 'pv-a11y-dys']]],
    ['cvd', 'Colour blindness', [['', 'Off'], ['protan', 'Protanopia', 'Red-blind'], ['deutan', 'Deuteranopia', 'Green-blind'], ['tritan', 'Tritanopia', 'Blue-blind']]],
    ['motion', 'Motion', [['', 'Full'], ['calm', 'Reduced', 'Parvus still moves. Reloads the page.']]]
  ];
  var ab = null, ap = null;
  function a11yOpen() { return !!ap && !ap.hidden; }
  function a11ySync() {
    Array.prototype.forEach.call(ap.querySelectorAll('.pv-a11y-opt'), function (b) {
      b.setAttribute('aria-pressed', window.pvA11y.get(b.getAttribute('data-k')) === b.getAttribute('data-v') ? 'true' : 'false');
    });
  }
  function a11yPlace() {
    var r = ab.getBoundingClientRect();
    var top = Math.max(12, Math.min(Math.round(r.top), window.innerHeight - ap.offsetHeight - 12));
    h.style.setProperty('--a11y-top', top + 'px');
  }
  function a11ySet(open) {
    if (!ap) return;
    ap.hidden = !open;
    ab.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      a11ySync();
      a11yPlace();
    }
  }
  if (window.pvA11y && document.getElementById('ug-hamburger')) {
    ab = document.createElement('button');
    ab.id = 'pv-a11y';
    ab.className = 'pv-tray';
    ab.style.setProperty('--i', '3');
    ab.type = 'button';
    ab.title = 'Accessibility';
    ab.setAttribute('aria-label', 'Accessibility settings');
    ab.setAttribute('aria-expanded', 'false');
    ab.setAttribute('aria-controls', 'pv-a11y-panel');
    var eye = '';
    EYE.forEach(function (r, y) {
      for (var x = 0; x < r.length; x++) if (r.charAt(x) !== '.') eye += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    });
    ab.innerHTML = '<svg viewBox="0 0 12 8" shape-rendering="crispEdges" aria-hidden="true">' + eye + '</svg>';
    ap = document.createElement('div');
    ap.id = 'pv-a11y-panel';
    ap.setAttribute('role', 'dialog');
    ap.setAttribute('aria-label', 'Accessibility settings');
    ap.hidden = true;
    var body = '<p class="pv-a11y-h">Accessibility</p>';
    A11Y.forEach(function (grp) {
      body += '<p class="pv-a11y-l" id="pv-a11y-' + grp[0] + '">' + grp[1] + '</p><div role="group" aria-labelledby="pv-a11y-' + grp[0] + '">';
      grp[2].forEach(function (o) {
        body += '<button type="button" class="pv-a11y-opt' + (o[3] ? ' ' + o[3] : '') + '" data-k="' + grp[0] + '" data-v="' + o[0] + '">' + o[1] + (o[2] ? '<small>' + o[2] + '</small>' : '') + '</button>';
      });
      body += '</div>';
    });
    ap.innerHTML = body;
    ap.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.pv-a11y-opt');
      if (!b) return;
      var k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
      if (window.pvA11y.get(k) === v) return;
      window.pvA11y.set(k, v);
      if (k === 'motion') { location.reload(); return; }
      a11ySync();
      a11yPlace();
    });
    ab.addEventListener('click', function () { a11ySet(!a11yOpen()); });
    document.body.appendChild(ab);
    document.body.appendChild(ap);
  }

  function items() {
    return [document.getElementById('ug-sound-btn'), document.getElementById('ntfBell'), document.getElementById('pv-theme'), document.getElementById('pv-a11y')].filter(function (el) { return el && !el.hidden; });
  }
  function layout() {
    var hb = document.getElementById('ug-hamburger');
    if (hb && hb.getClientRects().length) h.style.setProperty('--menu-w', Math.round(hb.getBoundingClientRect().width) + 'px');
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
    if (!open) a11ySet(false);
    g.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  g.addEventListener('click', function () {
    layout();
    set(!isOpen());
  });
  document.addEventListener('click', function (e) {
    if (!isOpen() || g.contains(e.target) || (e.target.closest && e.target.closest('.pv-tray, #pv-a11y-panel'))) return;
    set(false);
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && a11yOpen()) { a11ySet(false); ab.focus(); }
    else if (e.key === 'Escape' && isOpen()) { set(false); g.focus(); }
  });
  requestAnimationFrame(function () {
    layout();
    h.classList.add('pv-shell');
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  var resizeT = 0;
  window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(layout, 100); }, { passive: true });
  var bell = document.getElementById('ntfBell');
  if (bell && window.MutationObserver) new MutationObserver(layout).observe(bell, { attributes: true, attributeFilter: ['hidden'] });

  var ads = [], adMo = null, adRo = null, adRaf = 0, adT = 0;
  function adEdges() {
    var top = 0, bot = 0, H = window.innerHeight;
    ads.forEach(function (el) {
      var cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
      var r = el.getBoundingClientRect();
      if (r.height < 1 || r.bottom <= 0 || r.top >= H) return;
      if (r.top + r.bottom > H) bot = Math.max(bot, H - Math.max(r.top, 0));
      else top = Math.max(top, Math.min(r.bottom, H));
    });
    h.style.setProperty('--pv-ad-top', Math.round(top) + 'px');
    h.style.setProperty('--pv-ad-bot', Math.round(bot) + 'px');
  }
  function adQueue() {
    if (!adRaf) adRaf = requestAnimationFrame(function () { adRaf = 0; adEdges(); });
    clearTimeout(adT);
    adT = setTimeout(adEdges, 600);
  }
  function adFind() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-anchor-status]'), function (el) {
      if (ads.indexOf(el) !== -1) return;
      ads.push(el);
      adMo.observe(el, { attributes: true, attributeFilter: ['style', 'data-anchor-status'] });
      if (adRo) adRo.observe(el);
    });
    adQueue();
  }
  function adWatch() {
    var on = /(^|\s)(ovt-on|talk-on)(\s|$)/.test(h.className);
    if (on && !adMo) {
      ads = [];
      adMo = new MutationObserver(function (list) {
        if (list.some(function (m) { return m.type === 'childList'; })) adFind();
        else adQueue();
      });
      adRo = window.ResizeObserver ? new ResizeObserver(adQueue) : null;
      adMo.observe(h, { childList: true });
      adMo.observe(document.body, { childList: true });
      adFind();
      adEdges();
    } else if (!on && adMo) {
      adMo.disconnect();
      if (adRo) adRo.disconnect();
      adMo = adRo = null;
      ads = [];
      clearTimeout(adT);
    }
  }
  if (window.MutationObserver) new MutationObserver(adWatch).observe(h, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', function () { if (adMo) adQueue(); }, { passive: true });

  function link(cls, html) {
    var a = document.createElement('a');
    a.href = KOFI;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (cls) a.className = cls;
    a.innerHTML = html;
    return a;
  }
  Array.prototype.forEach.call(document.querySelectorAll('.ug-mn-discord, a.ug-home-discord'), function (a) {
    if (!a.querySelector('.discord-chat')) a.insertAdjacentHTML('beforeend', CHAT);
  });
  var dc = document.querySelector('.ug-mn-discord');
  if (dc && !document.querySelector('.ug-mn-kofi')) dc.parentNode.insertBefore(link('ug-mn-kofi', 'Support us' + CUP), dc.nextSibling);
  var kf = document.querySelector('.ug-mn-kofi');
  if (kf && !document.querySelector('.ug-mn-sponsor')) {
    var sp = document.createElement('a');
    sp.href = '/sponsor';
    sp.className = 'ug-mn-sponsor';
    sp.innerHTML = 'Sponsor' + CASE;
    kf.parentNode.insertBefore(sp, kf.nextSibling);
  }
  Array.prototype.forEach.call(document.querySelectorAll('a.ug-home-discord'), function (d) {
    var k = d.parentNode.querySelector('.ug-home-kofi');
    d.parentNode.classList.add('ov-cta-row');
    if (!k) d.parentNode.insertBefore(link('ug-home-kofi', 'Support us' + CUP), d.nextSibling);
    else if (!k.querySelector('.kofi-cup')) k.insertAdjacentHTML('beforeend', CUP);
  });
  var fd = document.querySelector('#ug-footer a[href*="discord.gg"]');
  if (fd) {
    var row = fd.parentNode;
    if (!row.querySelector('a[href*="ko-fi.com"]')) row.insertBefore(link('', 'Support us'), fd.nextSibling);
    row.classList.add('ov-foot-chips');
    Array.prototype.slice.call(row.childNodes).forEach(function (n) { if (n.nodeType === 3) row.removeChild(n); });
    [['a[href*="discord.gg"]', CHAT], ['a[href*="ko-fi.com"]', CUP], ['a[href^="mailto:"]', MAIL], ['a[href="/staff"]', STAFF]].forEach(function (x) {
      var a = row.querySelector(x[0]);
      if (a && !a.querySelector('svg')) a.insertAdjacentHTML('beforeend', x[1]);
    });
  }
  var pp = document.querySelector('#ug-footer a[href*="privacy-policy"]');
  var legal = pp && pp.parentNode;
  if (legal && !legal.classList.contains('ov-foot-legal') && legal.querySelectorAll('a').length === 2) {
    legal.classList.add('ov-foot-legal');
    Array.prototype.slice.call(legal.childNodes).forEach(function (n) { if (n.nodeType === 3) legal.removeChild(n); });
    var sep = document.createElement('span');
    sep.className = 'ov-foot-sep';
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = '|';
    legal.insertBefore(sep, legal.lastElementChild);
  }

  var sup = null, supFrom = null;
  function supBuild() {
    var px = '';
    RBX.forEach(function (r, y) {
      for (var x = 0; x < r.length; x++) if (r.charAt(x) !== '.') px += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    });
    var out = ' target="_blank" rel="noopener noreferrer"';
    sup = document.createElement('div');
    sup.id = 'pv-sup';
    sup.hidden = true;
    sup.innerHTML = '<div class="pv-sup-box" role="dialog" aria-modal="true" aria-labelledby="pv-sup-h">' +
      '<p class="pv-sup-h" id="pv-sup-h">Support us</p>' +
      '<button type="button" class="pv-sup-x" aria-label="Close">&#x2715;</button>' +
      '<p class="pv-sup-p">Every bit helps keep the guide running. Pick how you&#39;d like to chip in.</p>' +
      '<div class="pv-sup-row">' +
      '<a class="pv-sup-btn pv-sup-rbx" href="' + ROBUX + '"' + out + '>Robux<svg class="robux-icon" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">' + px + '</svg></a>' +
      '<a class="pv-sup-btn pv-sup-kofi" href="' + KOFI + '"' + out + '>Ko-fi' + CUP + '</a>' +
      '</div></div>';
    sup.addEventListener('click', function (e) {
      if (e.target === sup || (e.target.closest && e.target.closest('.pv-sup-x'))) supSet(false);
      else if (e.target.closest && e.target.closest('.pv-sup-btn')) setTimeout(function () { supSet(false); }, 0);
    });
    sup.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); supSet(false); return; }
      if (e.key !== 'Tab') return;
      var f = sup.querySelectorAll('button, a[href]'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.body.appendChild(sup);
  }
  function supSet(open) {
    if (!sup) supBuild();
    sup.hidden = !open;
    h.classList.toggle('pv-sup-on', open);
    if (open) {
      sup.querySelector('.pv-sup-rbx').focus();
    } else if (supFrom && document.contains(supFrom)) {
      try { supFrom.focus({ preventScroll: true }); } catch (e) {}
    }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="ko-fi.com"]');
    if (!a || a.classList.contains('pv-sup-btn') || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    var menu = document.getElementById('ug-mobile-nav');
    if (menu && menu.contains(a) && typeof window.ugMobileClose === 'function') window.ugMobileClose();
    supFrom = menu && menu.contains(a) ? document.getElementById('ug-hamburger') : a;
    supSet(true);
  }, true);
})();
