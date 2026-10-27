(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var api = window.CFGame({
    root: root,
    base: '/fwm/foxyexe/',
    ver: '?v=3',
    title: null,
    play: 41,
    first: 40,
    defaultReward: 46,
    codes: { KeyA: 65, KeyD: 68, ArrowLeft: 65, ArrowRight: 68, Enter: 13, NumpadEnter: 13, Space: 32 },
    pad: { left: 65, right: 68 },
    endLine: function () { return ''; },
    setup: function (api) {
      var S = api.S, O1 = api.O1, C = api.C, CS = api.CS, CA = api.CA, count = api.count, each = api.each, where = api.where, colSel = api.colSel, notCol = api.notCol, once = api.once, onceOnly = api.onceOnly, every = api.every, create = api.create, lookAt = api.lookAt, nearBorder = api.nearBorder, hide = api.hide, show = api.show, display = api.display, setPos = api.setPos, setX = api.setX, setY = api.setY, setDir = api.setDir, force = api.force, destroy = api.destroy, play = api.play, stopAll = api.stopAll, playing = api.playing, down = api.down, rnd = api.rnd, go = api.go, setAlphaCoef = api.setAlphaCoef, setZoom = api.setZoom, G = api.G;
      var START = {}, EV = {};

      START[40] = function () { stopAll(); play('boot', 1); };

      EV[40] = function () {
        var cur = O1('Active'), ic = O1('Active 2'), a5 = O1('Active 5');
        if (!cur || !ic || !a5) return;
        var click = api.pressed(1), over = colSel([cur], 'Active 2').a.length > 0;
        if (click && over && ic.alt[0] === 0 && ic.alt[1] === 0) { each('Active 4', show); ic.alt[0] = 15; ic.alt[1] = 2; }
        if (click && over && ic.alt[0] > 0 && ic.alt[1] === 0) a5.alt[0] = 10;
        if (ic.alt[0] > 0) ic.alt[0] -= 1;
        if (ic.alt[1] > 0) ic.alt[1] -= 1;
        if (a5.alt[0] > 1) { force(a5, 12); a5.alt[0] -= 1; }
        if (a5.alt[0] === 1) go(41);
      };

      START[41] = function () {
        api.hideCursor();
        each('Active 9', function (e) { e.alt[0] = 255; });
      };

      EV[41] = function () {
        var P = O1('Active');
        if (!P) return;
        if (down(68) && P.x < 7800 && C('area') !== 4) { setPos(P, P.x + 3, P.y); setDir(P, 0); force(P, 1); each('Active 3', function (e) { e.alt[0] += 1; }); each('Active 13', destroy); }
        if (down(65) && P.x > 200 && C('area') !== 4) { setPos(P, P.x - 3, P.y); setDir(P, 16); force(P, 1); each('Active 3', function (e) { e.alt[0] += 1; }); each('Active 13', destroy); }
        if (!down(68) && !down(65)) force(P, 0);
        if (once('e4', C('area') === 1)) play('Listen', 1, true);
        if (once('e5', C('area') === 2)) play('Flee', 1, true);
        if (once('e6', C('area') === 3)) play('Sure Step', 1, true);
        if (once('e7', C('area') === 4)) { force(P, 0); each('Active 8', destroy); play('scream2', 1); }
        display(P.x, P.y - 210);
        var t2 = O1('trigger 2');
        if (t2) each('Perspective', function (p) { setZoom(p, t2.alt[0]); });
        each('Active 4', function (e) { lookAt(e, P.x, P.y); });
        var a3 = O1('Active 3');
        if (a3) CS('Counter', a3.alt[0]);
        if (every('e9', 100)) ['Active 2', 'Active 3', 'Active 5'].forEach(function (n) { each(n, function (e) { setAlphaCoef(e, rnd(100)); }); });
        if (colSel([P], 'trigger').a.length) each('Active 2', function (e) { force(e, 12); });
        if (down(68) && every('e11', 100) && C('area') !== 4) each('trigger 2', function (e) { e.alt[0] += 1; });
        if (down(65) && every('e12', 100) && P.x > 200 && C('area') !== 4) each('trigger 2', function (e) { e.alt[0] -= 1; });
        each('trigger 2', function (e) { if (e.alt[0] > 900) e.alt[0] = 900; });
        if (once('e14', colSel([P], 'trigger 2').a.length > 0)) { setY(P, P.y + 480); setX(P, 1000); CA('area', 1); }
        each('Active 4', function (e) { if (nearBorder(e) && e.alt[0] === 0) { destroy(e); e.alt[0] = 1; } });
        [[68, 200, 'e17'], [65, -200, 'e18']].forEach(function (k) {
          if (C('area') !== 2) return;
          var sel = where(S('Active 3'), function (e) { return e.alt[0] > 200; });
          if (!sel.length || count('Active 4') !== 0 || !down(k[0])) return;
          if (!every(k[2], 1000) || rnd(10) !== 1) return;
          play('XSCREAM2', 4);
          var made = create('Active 4', P, k[1], 0);
          sel.forEach(function (e) { e.alt[0] = 0; });
          if (made) lookAt(made, P.x, P.y);
        });
        if (!down(68) && !down(65)) each('Active 3', function (e) { e.alt[0] = 0; });
        if (P.x >= 7800) each('Active 3', function (e) { e.alt[0] = 0; });
        if (P.x <= 200) each('Active 3', function (e) { e.alt[0] = 0; });
        if (once('e22', C('area') === 3)) { each('Perspective', hide); each('Perspective 2', show); }
        if (C('area') === 3) each('Active 6', function (e) { if (e.x < P.x + 400) e.alt[0] = 1; });
        if (once('e24', colSel([P], 'Active 6').a.length > 0 && notCol([P], 'Active 7').length > 0)) { play('scream (2)', 5); CA('lives', -1); each('Active 9', function (e) { e.alt[0] = 0; }); }
        each('Active 6', function (e) { if (e.alt[0] === 1) setPos(e, e.x - 1, e.y); });
        if (once('e26', C('area') === 4)) { each('Perspective', hide); each('Perspective 2', hide); }
        if (C('area') === 4 && every('e27', 4000) && onceOnly('e27')) { G.found = C('found new') || 46; go(43); return; }
        var hit = where(colSel([P], 'Active 4').b, function (e) { return e.alt[0] === 0; });
        if (hit.length) { CA('lives', -1); hit.forEach(function (e) { destroy(e); e.alt[0] = 1; }); play('scream (2)', 5); each('Active 9', function (e) { e.alt[0] = 0; }); }
        each('Active 9', function (e) { if (e.alt[0] < 255) { setAlphaCoef(e, e.alt[0]); e.alt[0] += 5; } });
        if (once('e31', C('lives') === 0)) { go(42); return; }
        if (once('e32', C('area') === 4)) CS('found new', 46);
      };

      START[42] = function () { stopAll(); play('base', 1); };
      EV[42] = function () { if (!playing('base') && every('g2', 100)) go('title'); };

      return { START: START, EV: EV, QCOL: { 40: ['Active', 'Active 2'], 41: ['Active', 'trigger', 'trigger 2', 'Active 6', 'Active 7', 'Active 4'] } };
    }
  });
  if (!api) return;
  window.FXE = api;
  api.state = function () {
    var L = api.frame();
    if (!L) return { frame: null };
    var P = api.O1('Active');
    return { frame: L.f, mode: api.mode(), t: L.loop, x: P ? P.x : 0, y: P ? P.y : 0, area: api.C('area'), lives: api.C('lives'), zoom: (api.O1('trigger 2') || { alt: [0] }).alt[0], cam: [L.camX, L.camY] };
  };
})();
