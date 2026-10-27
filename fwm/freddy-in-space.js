(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var LINES = ['', "What are you doing here? This game isn't finished yet!", "This game isn't due for release until 2030! Get out!", 'How did you access this game before release?', 'So, you are here to stop me...', 'You want to stop me from doing what? Making crazy spinoffs?', 'HA HA HA! I will never stop making spinoffs!', 'FNaF 57: Freddy in Space. Freddy was always destined for space.', 'Then FNaF 58: Poopets in Space.', 'FNaF 59: Cupcake Takes Manhattan.', "FNaF 60: Breakfast at Chica's. It's a romantic comedy. She's a killer with a heart of gold!", "FNaF 61: Freddy v Bonnie. It's the beginning of the Freddy Cinematic Universe.", "FNaF 61: Balloon Boy's Revenge. He steals EVERYONE'S flashlights; what a kidder.", "Oh, dead end. Busted. You'll never find my hideout.", 'WRONG! Wrong, wrong, go back. I think you missed it back there.', 'No, seriously, you missed my hideout. It was back the other way.', 'Very well. Come to me. I will add your distictiveness to my own.', 'I will grind up your code and use it for the game over screen!'];
  var QCOL = { 38: ['Active 2', 'Active 4', 'Active 6', 'walker', 'Active 11', 'blob', 'rollertank', 'UFO', 'Active 14', 'Active 13', 'follow', 'current level', 'hit box', 'vertical', 'Active 5', 'enemy bullet', 'Active', 'powerup', 'area 1', 'area 2', 'area 3', 'feel left', 'back wall', 'spring', 'teleport', 'heart', 'Active 10', 'Active 16', 'Active 17', 'trigger final', 'cutscene'] };
  var ONCOL = { 38: { 'Active': ['heart', 'trigger final', 'cutscene'], 'heart': ['Active'], 'trigger final': ['Active'], 'cutscene': ['Active'] } };
  var QBACK = { 38: { 'blob': 1 } };
  var api = window.CFGame({
    root: root,
    base: '/fwm/fis57/',
    legacyText: true,
    ver: '?v=2',
    title: 37,
    play: 38,
    endLine: function (G, secs) { return (G.cups || 0) + ' of 9 cupcakes in ' + Math.floor(secs / 60) + ':' + ('0' + Math.floor(secs % 60)).slice(-2) + '.'; },
    onFinish: function (G, secs) {
      try {
        var best = JSON.parse(localStorage.getItem('fis-best') || 'null');
        if (!best || G.cups > best.cup || (G.cups === best.cup && secs < best.time)) localStorage.setItem('fis-best', JSON.stringify({ cup: G.cups, time: secs }));
      } catch (e) {}
    },
    setup: function (api) {
    var S = api.S, O1 = api.O1, C = api.C, CS = api.CS, CA = api.CA, count = api.count, each = api.each, where = api.where, colSel = api.colSel, notCol = api.notCol, once = api.once, onceOnly = api.onceOnly, every = api.every, timer = api.timer, create = api.create, shoot = api.shoot, lookAt = api.lookAt, facing = api.facing, nearBorder = api.nearBorder, hide = api.hide, show = api.show, flash = api.flash, toFront = api.toFront, pick = api.pick, display = api.display, setPos = api.setPos, setX = api.setX, setY = api.setY, setDir = api.setDir, setSpeed = api.setSpeed, speedOf = api.speedOf, stopObj = api.stopObj, startObj = api.startObj, nextMovement = api.nextMovement, force = api.force, bg = api.bg, destroy = api.destroy, bounce = api.bounce, play = api.play, stopAll = api.stopAll, pressed = api.pressed, down = api.down, rnd = api.rnd, go = api.go, setZoom = api.setZoom, G = api.G;
    function gp() { return C('gun power'); }

    var START = {}, EV = {}, TRIG = {};
    START[37] = function () { each('Active', function (e) { flash(e, 100); }); stopAll(); play('Darkness Ahead', 1, true); };
    EV[37] = function () { if (pressed(13) || pressed(32) || pressed(16)) go(38); };

    START[39] = function () { stopAll(); play('die1', 6); };
    EV[39] = function () {
      if (every('g1', 40)) each('Active', function (e) { e.alt[0] += 1; });
      each('Active', function (e) { if (e.alt[0] > 1) e.alt[0] = 0; });
      each('Active', function (e) { if (e.alt[0] === 0) e.ink = 0; });
      each('Active', function (e) { if (e.alt[0] === 1) e.ink = 1; });
      if (timer('t2', 2000)) { play('die2', 6); var a = S('Active'); a.forEach(function (x) { destroy(x); create('Active 5', x, 0, 0); }); }
      if (timer('t5', 5000)) go('title');
    };
    TRIG[39] = { anim: function (e, a) { if (e.o.n === 'Active 5' && a === 0) destroy(e); } };

    START[38] = function () {
      each('area 3', function (e) { e.alt[0] = 75; });
      each('Perspective', toFront);
      each('Perspective 2', toFront);
      each('Perspective 3', toFront);
      each('UFO', stopObj);
      each('Active 20', stopObj);
    };

    TRIG[38] = {
      anim: function (e, a) {
        var n = e.o.n;
        if ((n === 'Active 5' || n === 'Active 7' || n === 'Active 8') && a === 0) { destroy(e); return; }
        if (n === 'textbox' && a === 0) { force(e, 12); each('Active 18', function (x) { show(x); x.alt[3] = 1; }); return; }
        if (n === 'textbox' && a === 13) destroy(e);
      },
      back: function (e) { if (e.o.n === 'blob') bounce(e); },
      col: function (a, b) {
        var A = a.o.n, B = b.o.n, fr, other;
        if ((A === 'Active' && B === 'heart') || (A === 'heart' && B === 'Active')) {
          destroy(A === 'heart' ? a : b);
          play('heart', 9);
          CA('life', 3);
          return;
        }
        if ((A === 'Active' && B === 'trigger final') || (A === 'trigger final' && B === 'Active')) { CS('final boss', 1); return; }
        if ((A === 'cutscene' && B === 'Active') || (A === 'Active' && B === 'cutscene')) {
          var cs = A === 'cutscene' ? a : b;
          if (cs.alt[0] !== 0) return;
          cs.alt[0] = 1;
          each('Active 18', function (x) { x.alt[1] += 1; });
          var a18 = O1('Active 18');
          if (a18) CS('text', a18.alt[1]);
          each('Active 18', hide);
          each('textbox', destroy);
          each('Active 18', function (x) { x.alt[3] = 0; x.alt[4] = 0; });
          each('Active 19', destroy);
        }
      }
    };

    var HITS = [['Active 4', 0], ['Active 6', 1], ['walker', 1], ['Active 11', 0], ['blob', 1], ['rollertank', 1], ['UFO', 1]];
    var FLASHERS = ['Active 4', 'Active 6', 'walker', 'Active 11', 'blob', 'rollertank', 'UFO', 'Active 14', 'Active 13'];
    var DAMAGE = [['enemy bullet', 3, 0, 1], ['Active 6', 5, 1, 0], ['Active 4', 10, 1, 0], ['walker', 5, 1, 0], ['Active 10', 3, 0, 0], ['Active 11', 5, 1, 0], ['blob', 5, 1, 0], ['rollertank', 10, 0, 0], ['UFO', 5, 0, 0], ['Active 16', 10, 0, 0], ['Active 17', 10, 0, 0], ['Active 13', 10, 1, 0]];
    var SHOTS = [20, 18, 16, 14, 10, 10, 10, 8, 7, 5], BANIM = [0, 12, 13, 14, 15, 16, 17, 18, 19, 19];

    EV[38] = function () {
      var area = C('area'), fb = C('final boss'), k;
      if (once('e1', area === 1)) { play('Blaster Cluster', 1, true); each('Perspective 2', hide); each('Perspective 3', hide); each('Active 9', destroy); }
      if (once('e2', area === 2)) { play('Boiling Point', 1, true); each('Perspective 2', show); each('Perspective 3', show); }
      if (once('e3', area === 3)) { play('Darkness Ahead', 1, true); each('Perspective 2', hide); each('Perspective 3', hide); }
      if (once('e4', fb === 1)) { play('Boiling Boss', 1, true); each('Perspective 2', hide); each('Perspective 3', hide); }
      var hb = O1('hit box'), fr = O1('Active');
      if (!hb || !fr) return;
      var fR = O1('feel right'), fL = O1('feel left'), f1 = O1('floor 1'), f2 = O1('floor 2'), ce = O1('ceiling'), f3 = O1('floor 3');
      setPos(fr, hb.x, hb.y + 34);
      setPos(fR, hb.x + 14, hb.y + 10);
      setPos(fL, hb.x - 16, hb.y + 10);
      setPos(f1, hb.x - 1, hb.y + 30);
      setPos(f2, hb.x - 1, hb.y + 44);
      setPos(ce, hb.x, hb.y - 24);
      if (f1) setPos(f3, f1.x, f1.y - 2);
      var R = down(39), Lf = down(37), Dn = down(40);
      if (R && !Lf && !bg(fR)) { setPos(hb, hb.x + 4, hb.y); setDir(fr, 0); }
      if (Lf && !R && C('final boss') === 0 && !bg(fL)) { setPos(hb, hb.x - 4, hb.y); setDir(fr, 16); }
      if (Lf && !R && C('final boss') === 1 && !bg(fL) && notCol([fL], 'back wall').length) { setPos(hb, hb.x - 4, hb.y); setDir(fr, 16); }
      if (!R && !Lf && !Dn && bg(f1)) force(fr, 0);
      if (R && bg(fR) && !Lf && !Dn && bg(f1)) force(fr, 0);
      if (Lf && bg(fL) && !R && !Dn && bg(f1)) force(fr, 0);
      if (!R && !Lf && !bg(f1)) force(fr, 12);
      if (!bg(f1) && C('jumped') === 0) { setPos(hb, hb.x, hb.y + 3); CA('fall', 1); }
      if (pressed(90) && bg(f1) && C('spring 2') === 0) { CS('jumped', 1); CS('going up', 40); play('jump1', 6); }
      if (pressed(90) && bg(f1) && C('spring 2') === 1) { CS('jumped', 1); CS('going up', 60); play('jump2', 6); }
      if (C('jumped') === 1 && !down(90)) { CS('jumped', 0); CS('going up', 0); }
      if (C('jumped') === 1 && C('going up') > 0) { CA('going up', -1); setPos(hb, hb.x, hb.y - 1); }
      if (C('jumped') === 1 && C('going up') > 10) setPos(hb, hb.x, hb.y - 2);
      if (C('jumped') === 1 && C('going up') > 20) setPos(hb, hb.x, hb.y - 2);
      if (C('jumped') === 1 && C('going up') > 30) setPos(hb, hb.x, hb.y - 2);
      if (C('jumped') === 1 && C('going up') > 35) setPos(hb, hb.x, hb.y - 2);
      if (C('jumped') === 1 && C('going up') === 0) CS('jumped', 0);
      if (R && !bg(fR) && bg(f1)) force(fr, 1);
      if (Lf && !bg(fL) && bg(f1)) force(fr, 1);
      if (R && !bg(f1)) force(fr, 12);
      if (Lf && !bg(f1)) force(fr, 12);
      if (bg(f1)) CS('fall', 0);
      if (bg(f2) && C('fall') > 10) CS('fall', 10);
      if (!bg(f1) && C('fall') > 0) setPos(hb, hb.x, hb.y + 2);
      if (!bg(f1) && C('fall') > 10) setPos(hb, hb.x, hb.y + 2);
      if (!bg(f1) && C('fall') > 20) setPos(hb, hb.x, hb.y + 1);
      if (bg(ce)) CS('jumped', 0);
      for (k = 0; k <= 9; k++) if (gp() === k && pressed(88)) { each('Active', function (a) { shoot(a, 'Active 2', 100, 0, true); }); play('shot' + Math.min(9, k + 1), 2); }
      for (k = 0; k <= 9; k++) if (gp() === k && down(88) && hb.alt[0] >= SHOTS[k]) { each('Active', function (a) { shoot(a, 'Active 2', 100, 0, true); }); hb.alt[0] = 0; play('shot' + Math.min(9, k + 1), 2); }
      each('Active 2', function (e) { e.alt[0] += 1; });
      each('Active 2', function (e) { if (e.alt[0] > gp() * 3 + 10) destroy(e); });
      if (down(88)) hb.alt[0] += 1;
      if (!down(88)) hb.alt[0] = 0;
      for (k = 0; k <= 9; k++) if (gp() === k) each('Active 2', function (e) { force(e, BANIM[k]); });
      if (Dn && !R && !Lf && bg(f1)) force(fr, 13);
      if (R && Lf && bg(f1)) force(fr, 0);
      if (gp() > 9) CS('gun power', 9);

      var cl = O1('current level'), fo = O1('follow');
      if (cl) setX(cl, hb.x);
      if (cl && hb.y > cl.y + 240 && cl.alt[0] === 0) cl.alt[0] = 48;
      if (cl && hb.y < cl.y - 240 && cl.alt[0] === 0) cl.alt[0] = -48;
      if (cl && cl.alt[0] > 0) { cl.alt[0] -= 2; setPos(cl, cl.x, cl.y + 20); }
      if (cl && cl.alt[0] < 0) { cl.alt[0] += 2; setPos(cl, cl.x, cl.y - 20); }
      var onV = function () { return colSel([hb], 'vertical').a.length > 0; };
      if (fo && cl && notCol([fo], 'current level').length && !onV()) { setSpeed(fo, 30); lookAt(fo, cl.x, cl.y); }
      if (fo && cl && colSel([fo], 'current level').a.length && !onV()) setSpeed(fo, 0);
      if (fo && onV() && notCol([fo], 'hit box').length && fo.alt[0] === 0) { setSpeed(fo, 45); lookAt(fo, hb.x, hb.y); }
      if (once('e78', !onV()) && fo) fo.alt[0] = 0;
      if (fo && onV() && colSel([fo], 'hit box').a.length) fo.alt[0] = 1;
      if (fo && fo.alt[0] === 1) { setPos(fo, hb.x, hb.y); setSpeed(fo, 0); }
      if (fo && cl && cl.y > fo.y) setY(fo, fo.y + 2);
      if (fo && cl && cl.y < fo.y) setY(fo, fo.y - 2);
      each('Active 4', function (e) { lookAt(e, hb.x, hb.y); });
      each('Active 6', function (e) { lookAt(e, hb.x, hb.y); });

      HITS.forEach(function (h) {
        var c = colSel(S('Active 2'), h[0]), B = h[1] ? where(c.b, function (e) { return e.vis; }) : c.b;
        if (!c.a.length || !B.length) return;
        play('hit', 12);
        var dmg = 5 + gp();
        c.a.forEach(destroy);
        B.forEach(function (e) { e.alt[0] -= dmg; e.alt[1] = 3; });
      });
      if (count('Active 16') > 0 && C('final boss') === 1) {
        var c14 = colSel(S('Active 2'), 'Active 14');
        if (c14.a.length) { play('hit', 12); var d14 = 5 + gp(); c14.a.forEach(destroy); c14.b.forEach(function (e) { e.alt[0] -= d14; e.alt[1] = 3; e.alt[6] = 8; }); }
      }
      var c13 = colSel(S('Active 2'), 'Active 13'), B13 = where(c13.b, function (e) { return e.vis; });
      if (c13.a.length && B13.length) { play('hit', 12); var d13 = 5 + gp(); c13.a.forEach(destroy); B13.forEach(function (e) { e.alt[0] -= d13; e.alt[1] = 3; }); }
      FLASHERS.forEach(function (n) { each(n, function (e) { if (e.alt[1] > 0) { e.ink = 1; e.alt[1] -= 1; } }); });
      FLASHERS.forEach(function (n) { each(n, function (e) { if (e.alt[1] === 0) e.ink = 0; }); });

      each('Active 4', function (e) { if (e.alt[0] < -50) { create('big pow', e, 2, -69); destroy(e); create('Active 5', e, 3, -71); play('pow2', 12); } });
      each('Active 6', function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 16, 31); play('pow2', 12); hide(e); } });
      each('walker', function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 1, -31); play('pow2', 12); hide(e); } });
      each('Active 11', function (e) { if (e.alt[0] < -25) { create('Active 5', e, -1, -22); play('pow2', 12); destroy(e); } });
      each('blob', function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 0, 0); play('pow2', 12); hide(e); } });
      each('rollertank', function (e) { if (e.alt[0] < -200) { create('Active 5', e, 23, -137); play('pow2', 12); destroy(e); create('big pow', e, 22, -184); create('big pow', e, 25, -121); create('big pow', e, 25, -58); } });
      each('UFO', function (e) { if (e.alt[0] < -50) { create('Active 5', e, 0, 0); play('pow2', 12); create('big pow', e, 0, 0); destroy(e); } });
      var bossDead = where(S('Active 14'), function (e) { return e.alt[0] < -1000; });
      if (once('e118', bossDead.length > 0)) {
        stopAll();
        bossDead.forEach(function (b) { create('Active 5', b, -46, -105); });
        play('pow2', 12);
        ['Active 16', 'Active 17', 'lazer mount 2', 'UFO'].forEach(function (n) { each(n, destroy); });
        bossDead.forEach(function (b) { force(b, 13); });
        bossDead.forEach(function (b) { [[-85, -166], [4, -171], [-75, -101], [4, -83]].forEach(function (p) { create('big pow', b, p[0], p[1]); }); });
        each('Active 6', destroy);
        each('enemy bullet', destroy);
        bossDead.forEach(function (b) { [[-17, -147], [-21, -93]].forEach(function (p) { create('big pow', b, p[0], p[1]); }); });
        bossDead.forEach(function (b) { nextMovement(b); setSpeed(b, 5); setDir(b, 24); });
      }
      each('Active 13', function (e) { if (e.alt[0] < -50 && e.vis) { play('pow2', 12); hide(e); create('big pow', e, -2, -123); create('big pow', e, -2, -49); create('Active 5', e, 1, -109); create('Active 5', e, 2, -56); } });
      if (count('big pow') > 0) each('big pow', function (e) {
        [[-20, -20], [17, -19], [-15, 14], [15, 15], [-27, -1], [36, 1], [0, -48]].forEach(function (p) { create('little pow', e, p[0], p[1]); });
        destroy(e);
      });
      if (count('little pow') > 0 && every('e121', 100)) pick(S('little pow')).forEach(function (e) { create('Active 5', e, 0, 0); destroy(e); play('pow2', 12); });
      each('Active 5', function (e) { if (e.alt[0] === 0) { for (var i = 0; i < 5; i++) create('flak', e, 0, 0); e.alt[0] = 1; } });
      if (count('flak') > 0) each('flak', function (e) { e.alt[0] += 1; setPos(e, e.x, e.y + 5); setSpeed(e, speedOf(e) - 10); });
      each('flak', function (e) { if (e.alt[0] > 10) destroy(e); });
      each('flak', function (e) { if (e.alt[1] === 0) { e.alt[1] = 1; setSpeed(e, 50 + rnd(150)); } });
      each('enemy bullet', function (e) { if (nearBorder(e)) destroy(e); });
      each('Active 4', function (e) { if (e.alt[3] > 100 && facing(e, 2093056)) { var b = create('enemy bullet', e, 3, -81); if (b) setDir(b, 16); e.alt[3] = 0; } });
      each('Active 11', function (e) { if (e.alt[3] > 100) { var b = create('enemy bullet', e, -20, -25); if (b) setDir(b, 16); e.alt[3] = 0; } });
      each('Active 4', function (e) { if (e.alt[3] > 100 && facing(e, 0xF000001F)) { var b = create('enemy bullet', e, 3, -81); if (b) setDir(b, 0); e.alt[3] = 0; } });
      if (count('enemy bullet') > 0) each('enemy bullet', function (e) { e.alt[0] += 1; });
      [[1, 'laser2'], [3, 'laser2'], [2, 'lazer5']].forEach(function (p) {
        var sel = where(S('enemy bullet'), function (e) { return e.alt[0] > 15 && e.alt[1] === 0; });
        if (sel.length && C('area') === p[0]) { sel.forEach(function (e) { e.alt[1] = 1; setSpeed(e, 50); }); play(p[1], 16); }
      });
      ['Active 6', 'Active 4', 'Active 11', 'rollertank', 'UFO'].forEach(function (n) { each(n, function (e) { e.alt[3] += 1; }); });
      each('Active 6', function (e) { if (e.alt[3] > 75 && facing(e, 0xFC000001)) { var b = create('enemy bullet', e, 0, 3, true); e.alt[3] = 0; if (b) setDir(b, 28); } });
      each('Active 6', function (e) { if (e.alt[3] > 75 && facing(e, 8323072)) { var b = create('enemy bullet', e, 0, 3, true); e.alt[3] = 0; if (b) setDir(b, 20); } });
      each('Active 6', function (e) { if (nearBorder(e)) e.alt[3] = 0; });
      each('Active 4', function (e) { if (nearBorder(e)) e.alt[3] = 0; });
      each('enemy bullet', function (e) { if (bg(e)) { create('Active 7', e, 0, 0); destroy(e); } });
      if (count('enemy bullet') > 0 && every('e142', 30)) each('enemy bullet', function (e) { create('Active 8', e, 0, 0); });
      colSel(S('Active 5'), 'enemy bullet').b.forEach(destroy);
      var pu = colSel([fr], 'powerup');
      if (once('e145', pu.a.length > 0)) { play('powerup', 15); pu.b.forEach(destroy); CA('gun power', 1); }
      if (colSel([fr], 'area 1').a.length) CS('area', 1);
      if (colSel([fr], 'area 2').a.length) CS('area', 2);
      if (colSel([fr], 'area 3').a.length) CS('area', 3);
      if (C('area') === 2 && count('Active 9') < 20 && every('e150', 500)) pick(S('make bubble')).forEach(function (e) { create('Active 9', e, 0, 0); });
      each('Active 9', function (e) { if (e.speed === 0) destroy(e); });
      each('Active 10', function (e) { if (bg(e)) e.alt[0] += 1; });
      each('lazer mount', function (e) { if (nearBorder(e)) e.alt[0] = 0; });
      each('lazer mount', function (e) { e.alt[0] += 1; });
      each('lazer mount 2', function (e) { e.alt[0] += 1; });
      each('lazer mount', function (e) { if (e.alt[0] > 100) { e.alt[0] = 0; e.alt[1] = 20; } });
      each('lazer mount', function (e) { if (e.alt[1] > 0) { create('Active 10', e, 0, 31); e.alt[1] -= 1; } });
      if (once('e157', where(S('lazer mount'), function (e) { return e.alt[1] > 0; }).length > 0)) play('turret', 12);
      each('Active 10', function (e) { if (e.alt[0] > 1) destroy(e); });
      each('Active 10', function (e) { if (nearBorder(e)) destroy(e); });
      each('Active 11', function (e) { if (nearBorder(e)) e.alt[3] = 0; });
      var sp = colSel([fr], 'spring');
      if (sp.a.length) { sp.b.forEach(destroy); CS('spring 2', 1); play('powerup', 15); }
      var a3 = O1('area 3');
      if (a3) each('Perspective', function (p) { setZoom(p, a3.alt[0]); });
      if (C('area') === 3) each('area 3', function (e) { if (e.alt[0] < 100) e.alt[0] += 5; });
      if (C('area') !== 3) each('area 3', function (e) { if (e.alt[0] > 75) e.alt[0] -= 5; });
      if (once('e167', C('area') === 1)) { each('walker', function (e) { e.alt[0] = 0; show(e); }); each('Active 6', function (e) { e.alt[0] = 0; show(e); }); }
      if (once('e168', C('area') === 2)) { each('blob', function (e) { show(e); e.alt[0] = 0; }); each('Active 13', function (e) { show(e); e.alt[0] = 0; }); }
      each('Active 6', function (e) { if (!e.vis) e.alt[3] = 0; });
      if (bg(fR) && bg(fL)) setPos(hb, hb.x, hb.y - 1);
      if (bg(f3)) setPos(hb, hb.x, hb.y - 1);
      if (colSel([fr], 'teleport').a.length) { play('teleport', 8); setPos(hb, 254, 4584); setPos(cl, 409, 4581); setPos(fo, 405, 4643); }
      if (every('e174', 100)) each('teleport', function (e) { e.alt[0] = rnd(20); });
      var tps = S('teleport');
      var t1 = where(tps, function (e) { return e.alt[0] === 1; }), tn = where(tps, function (e) { return e.alt[0] !== 1; });
      var a5h = where(S('Active 5'), function (e) { return e.alt[1] === 0; });
      if (a5h.length && t1.length) a5h.forEach(function (e) { create('heart', e, 0, 0); e.alt[1] = 1; });
      a5h = where(S('Active 5'), function (e) { return e.alt[1] === 0; });
      if (a5h.length && tn.length) a5h.forEach(function (e) { e.alt[1] = 1; });
      each('heart', function (e) { if (nearBorder(e)) destroy(e); });
      if (C('life') > 100) CS('life', 100);
      DAMAGE.forEach(function (d) {
        var c = colSel([hb], d[0]), B = d[2] ? where(c.b, function (e) { return e.vis; }) : c.b;
        if (!c.a.length || !B.length || hb.alt[7] !== 0) return;
        play('hurt', 12);
        if (d[3]) B.forEach(destroy);
        hb.alt[7] = 50;
        CA('life', -d[1]);
      });
      if (hb.alt[7] > 0) hb.alt[7] -= 1;
      var lifeE = O1('life'), h2 = O1('heart 2');
      if (once('e193', hb.alt[7] > 0)) { flash(fr, 50); if (lifeE) { lifeE.alpha = 1; flash(lifeE, 50); } if (h2) { h2.alpha = 1; flash(h2, 50); } }
      if (once('e194', hb.alt[7] === 0)) { show(fr); if (lifeE) { show(lifeE); lifeE.alpha = (255 - 150) / 255; } if (h2) { show(h2); h2.alpha = (255 - 150) / 255; } }
      each('heart', function (e) { if (!bg(e)) setPos(e, e.x, e.y + 2); });
      if (C('life') <= 0) { go(39); return; }
      each('rollertank', function (e) { if (nearBorder(e)) e.alt[3] = 0; });
      each('rollertank', function (e) { if (e.alt[3] > 100) { e.alt[3] = 0; e.alt[4] = 1 + rnd(6); } });
      var rt = where(S('rollertank'), function (e) { return e.alt[4] > 0; });
      if (rt.length && every('e199', 100)) { rt.forEach(function (e) { shoot(e, 'enemy bullet', 100, 393216); e.alt[4] -= 1; }); play('lazer6', 13); }
      var ufo0 = where(S('UFO'), function (e) { return e.alt[9] === 0; });
      if (ufo0.length && every('e201', 1000)) pick(ufo0).forEach(function (e) { startObj(e); e.alt[9] = 1; });
      each('UFO', function (e) { if (nearBorder(e)) e.alt[3] = 0; });
      each('UFO', function (e) { if (e.alt[3] > 40) { e.alt[3] = 0; e.alt[4] = 3; } });
      var uf = where(S('UFO'), function (e) { return e.alt[4] > 0; });
      if (uf.length && every('e204', 50)) { uf.forEach(function (e) { shoot(e, 'Active 10', 100, 16777216); e.alt[4] -= 1; }); play('lazer7', 13); }
      if (C('final boss') === 0 && fo) display(fo.x, fo.y);
      if (C('final boss') === 1) display(7808, 4641);
      if (C('final boss') === 1 && count('Active 15') < 30 && count('Active 16') > 0 && every('e208', 50)) pick(S('make bubble 2')).forEach(function (e) { create('Active 15', e, 0, 0); });
      each('Active 15', function (e) { if (e.speed === 0) destroy(e); });
      each('Active 14', function (e) { if (e.alt[6] > 0) { force(e, 12); e.alt[6] -= 1; } });
      each('Active 14', function (e) { if (e.alt[6] === 0) force(e, 0); });
      var c16 = where(S('Active 16'), function (e) { return e.aFrame === 22; });
      if (c16.length && rnd(3) === 1 && C('final boss') === 1) { c16.forEach(function (e) { shoot(e, 'enemy bullet', 50, 32768); }); play('lazer5', 13); }
      var c17 = where(S('Active 17'), function (e) { return e.aFrame === 22; });
      if (c17.length && rnd(3) === 1 && C('final boss') === 1) { play('lazer5', 13); c17.forEach(function (e) { shoot(e, 'enemy bullet', 50, 16384); }); }
      if (every('e214', 50)) each('Active 16', toFront);
      each('lazer mount 2', function (e) { if (nearBorder(e)) e.alt[0] = 0; });
      each('lazer mount 2', function (e) { if (e.alt[0] > 90) { e.alt[0] = 0; e.alt[1] = 10; } });
      var lm2 = where(S('lazer mount 2'), function (e) { return e.alt[1] > 0; });
      if (lm2.length && every('e217', 50)) { lm2.forEach(function (e) { create('Active 10', e, 0, 23); e.alt[1] -= 1; }); play('lazer7', 12); }
      var b218 = where(S('Active 14'), function (e) { return e.alt[0] < -1000; });
      if (b218.length) { b218.forEach(function (e) { force(e, 13); }); each('enemy bullet', destroy); each('heart', destroy); each('Active 18', function (e) { e.alt[10] = 1; }); }
      each('Active 18', function (e) { e.alt[0] = rnd(2); });
      each('Active 18', function (e) { if (e.alt[0] === 0) force(e, 0); });
      each('Active 18', function (e) { if (e.alt[0] === 1) force(e, 12); });
      if (count('textbox') === 0) each('Active 18', hide);
      each('Active 18', function (e) { if (e.alt[3] === 1) e.alt[4] += 1; });
      var a18x = where(S('Active 18'), function (e) { return e.alt[4] > 300; });
      if (a18x.length) { a18x.forEach(hide); each('textbox', function (e) { force(e, 13); }); play('Walkie_Talkie_Squelch_05', 18); a18x.forEach(function (e) { e.alt[4] = 0; e.alt[3] = 0; }); }
      if (where(S('Active 18'), function (e) { return e.vis; }).length) each('String', show);
      if (where(S('Active 18'), function (e) { return !e.vis; }).length) each('String', hide);
      for (k = 1; k < LINES.length; k++) if (once('t' + k, C('text') === k)) each('String', function (e) { e.text = LINES[k]; });
      if (once('e247', C('text') > 0)) {
        each('Active 18', function (a) { create('textbox', a, 264, 3); });
        each('Active 18', toFront);
        play('Walkie_Talkie_Squelch_03', 18);
        each('Active 18', function (a) { a.alt[3] = 0; a.alt[4] = 0; });
        each('String', toFront);
        CS('text', 0);
      }
      var a10 = where(S('Active 18'), function (e) { return e.alt[10] === 1; });
      if (a10.length && gp() > 0) CS('found new', 41);
      if (a10.length && gp() === 9) CS('found new', 48);
      if (a10.length && gp() === 0) CS('found new', 47);
      if (a10.length && every('e251', 5000)) { G.found = C('found new'); G.cups = gp(); go(43); }
      if (every('e253', 10000) && rnd(10) === 1 && onceOnly('e253')) each('Active 20', startObj);
    };
      return { START: START, EV: EV, TRIG: TRIG, QCOL: QCOL, ONCOL: ONCOL, QBACK: QBACK, SKIP: function (f, o) { return f === 38 && o.n === 'textbox'; } };
    }
  });
  if (!api) return;
  window.FIS = api;
  api.state = function () {
    var L = api.frame();
    if (!L) return { frame: null };
    var hb = api.O1('hit box'), b = api.O1('Active 14');
    return { frame: L.f, mode: api.mode(), t: L.loop, x: hb ? hb.x : 0, y: hb ? hb.y : 0, life: api.C('life'), gun: api.C('gun power'), area: api.C('area'), boss: b ? b.alt[0] : null, final: api.C('final boss'), cam: [L.camX, L.camY], objs: L.all.length };
  };
  api.warp = function (x, y) {
    var L = api.frame();
    api.setPos(api.O1('hit box'), x, y);
    api.setPos(api.O1('current level'), x, y);
    api.setPos(api.O1('follow'), x, y);
    api.setWindow(Math.max(0, Math.min(L.w - api.W, x - api.W / 2)), Math.max(0, Math.min(L.h - api.H, y - api.H / 2)));
  };
  api.set = function (name, v) { api.CS(name, v); };
})();
