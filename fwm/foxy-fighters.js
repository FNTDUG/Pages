(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var LINES = { 1: 'Fredbear1b', 2: 'ToyChica1', 3: 'NChica1', 4: 'JJ1', 5: 'Villain_Line_1_Take_2', 6: 'Foxy1', 7: 'Villain_Line_3_Take_1', 8: 'Foxy2', 9: 'ToyChica2_2', 10: 'ToyChica3_2', 30: 'barrelroll', 31: 'ToyChica2_2', 32: 'Villain_Line_4_Take_1', 50: 'Villain_Line_5_Take_2', 51: 'NChica2', 52: 'ToyChicaNO2', 55: 'Foxy3', 11: 'ToyChica3c_2', 12: 'ToyChica3b_2' };
  var TEXT = { 1: "What's this, a space shooter?", 2: "Alrighty! I'm ready for action!", 3: "Sorry I'm late for the party; fashionably late of course!", 4: "Let's kick this party into high gear!", 5: 'Fools! How dare you challenge me!', 6: 'Souldozer! I should have known it was you!', 7: "I wasn't fully appreciated in my last outing...", 8: "Well, we're here to take back what's ours!", 9: 'Bingo! Got him!', 10: "You won't get tired of my voice, will you?", 30: 'Do a barrel roll!', 31: 'Bingo! Got him!', 32: "Fools! Turn back now and I'll spare your lives!", 50: "IMPOSSIBLE! You haven't seen the last of me!", 51: 'At least I went down in a blaze of glory!', 52: 'NOOOOOOOOOOOOOOOOOOOOO!!!', 55: 'Great job guys, err.... GALS!' };
  var LATER = [[1, 150, 'Holy crap! Is that my voice?!'], [1, 300, "Voice acting?! NOOOOO! He's gone too far this time!"], [1, 550, 'You need to shut this game DOWN!'], [6, 200, "You're not even in the right game!"], [7, 200, "But now I'm back to show you my full power!"], [8, 150, 'This will be your last cameo!'], [30, 100, "Sorry, I'm not sure what came over me."], [32, 250, "Or, more likely, I'll just chase you around and kill you anyway!"], [50, 250, "Well, actually yes this is the last you'll see of me."], [55, 200, "I see the processing core! Let's blow it up and get out of here!"]];
  var CALL = [[1, 2000, 1, null], [2, 3000, 3, 'Chica plane'], [3, 1000, 4, 'Chica plane 2'], [4, 1000, 2, 'Chica plane 3'], [5, 4000, 6, null], [6, 500, 5, null], [7, 500, 6, null], [8, 500, 5, null], [9, 100, 3, null], [10, 100, 3, null], [11, 100, 3, null], [12, 100, 3, null]];
  var SPREAD = [8, 2, -2147483648, 536870912, 1073741824, 1, 4, 16, 268435456];
  var api = window.CFGame({
    root: root,
    base: '/fwm/foxyfighters/',
    ver: '?v=2',
    title: null,
    play: 35,
    defaultReward: 42,
    idleTicks: 1,
    codes: { KeyW: 87, KeyA: 65, KeyS: 83, KeyD: 68, ArrowUp: 87, ArrowLeft: 65, ArrowDown: 83, ArrowRight: 68, ShiftLeft: 16, ShiftRight: 16, Space: 16, Enter: 13, NumpadEnter: 13 },
    pad: { left: 65, right: 68, up: 87, down: 83, fire: 16 },
    endLine: function () { return ''; },
    setup: function (api) {
      var S = api.S, C = api.C, CS = api.CS, CA = api.CA, count = api.count, each = api.each, where = api.where, colSel = api.colSel, notCol = api.notCol, once = api.once, onceOnly = api.onceOnly, every = api.every, create = api.create, shoot = api.shoot, lookAt = api.lookAt, hide = api.hide, show = api.show, setPos = api.setPos, setX = api.setX, setDir = api.setDir, setSpeed = api.setSpeed, speedOf = api.speedOf, force = api.force, destroy = api.destroy, play = api.play, stopAll = api.stopAll, playing = api.playing, down = api.down, rnd = api.rnd, go = api.go, nearBorder = api.nearBorder, toFront = api.toFront, pick = api.pick, nextMovement = api.nextMovement, G = api.G;
      var START = {}, EV = {}, TRIG = {};
      function live(name) { return S(name).filter(function (e) { return !e.dead; }); }
      function one(name) { return live(name)[0] || null; }
      function all(name, f) { live(name).forEach(f); }
      function moveBy(name, dx, dy) { all(name, function (e) { setPos(e, e.x + dx, e.y + dy); }); }
      function rel(name, ref, dx, dy) { var r = one(ref); if (r) all(name, function (e) { setPos(e, r.x + dx, r.y + dy); }); }
      function vis(name) { return live(name).some(function (e) { return e.vis; }); }
      function invis(name) { return live(name).some(function (e) { return !e.vis; }); }
      function anim(e, n) { return !!e && e.aOn === n; }
      function eff(name, n) { all(name, function (e) { if (e.alt[n] === 0) api.setEffect(e, 'Blend'); }); all(name, function (e) { if (e.alt[n] > 0) { api.setEffect(e, 'Add'); e.alt[n] -= 1; } }); }
      function hurt() { all('Active', function (e) { e.alt[2] = 5; }); }
      var PLANES = ['Chica plane', 'Chica plane 2', 'Chica plane 3'];

      START[35] = function () {
        stopAll();
        play('Fearless Fighter2', 1, true);
        each('Active 3', destroy);
        api.hideCursor();
        each('String', hide);
        CS('phase', 1);
        each('Active 5', destroy);
        each('Active 6', destroy);
        each('Active 7', destroy);
      };

      EV[35] = function () {
        var mv = one('move'), beat = C('beat'), k, i;
        var ok = function () { return mv && mv.alt[0] === 1 && C('beat') === 0; };
        if (down(68) && mv && notCol([mv], 'right wall').length && ok()) setPos(mv, mv.x + 5, mv.y);
        if (down(65) && mv && notCol([mv], 'left wall').length && ok()) setPos(mv, mv.x - 5, mv.y);
        if (down(87) && mv && notCol([mv], 'top wall').length && ok()) { setPos(mv, mv.x, mv.y - 5); all('Active', function (e) { force(e, 12); }); }
        if (down(83) && mv && notCol([mv], 'bottom wall').length && ok()) { setPos(mv, mv.x, mv.y + 5); all('Active', function (e) { force(e, 13); }); }
        rel('Active', 'move', 0, 0);
        if (!down(87) && !down(83)) all('Active', function (e) { force(e, 0); });
        all('bullet', function (e) { if (nearBorder(e)) destroy(e); });
        var cw = C('current weapon'), F = down(16);
        if (cw === 0 && F && every('e9', 130) && C('beat') === 0) { play('shot', 9); all('shoot from', function (e) { shoot(e, 'bullet', 100, 1); }); all('shoot from 2', function (e) { shoot(e, 'bullet', 100, 1); }); }
        if (cw === 4 && F && every('e10', 80) && C('beat') === 0) { play('shot', 9); all('shoot from', function (e) { shoot(e, 'bullet', 100, 1); }); all('shoot from 2', function (e) { shoot(e, 'bullet', 100, 1); }); }
        if (cw === 1 && F && every('e11', 220) && C('beat') === 0) {
          play('laser', 9);
          var made = [];
          all('move', function (e) { SPREAD.forEach(function (m) { var b = shoot(e, 'bullet', 200, m); if (b) made.push(b); }); });
          made.forEach(function (b) { b.alt[0] = 1; });
        }
        if (cw === 3 && F && every('e12', 90) && C('beat') === 0) { play('homing', 9); var A = one('Active'), hb = A ? create('bullet', A, 41, 34) : null; if (hb) hb.alt[0] = 3; }
        if (cw === 2 && F && every('e13', 500) && count('laserball') < 2 && C('beat') === 0) { play('firelaser', 19); var A2 = one('Active'); if (A2) create('laserball', A2, 67, 17); }
        all('bullet', function (e) { if (e.alt[0] === 0) setPos(e, e.x + 10, e.y); });
        var P = one('Active');
        if (P && anim(P, 0)) { rel('shoot from', 'Active', 30, 23); rel('shoot from 2', 'Active', 30, 35); }
        if (P && anim(P, 12)) { rel('shoot from', 'Active', 30, 7); rel('shoot from 2', 'Active', 30, 48); }
        if (P && anim(P, 13)) { rel('shoot from', 'Active', 30, 7); rel('shoot from 2', 'Active', 30, 48); }
        if (every('e18', 200)) all('Active 2', function (e) { if (e.x > -1300) setPos(e, e.x - 1, e.y); });
        if (every('e19', 10)) { moveBy('fast clouds', -5, 0); moveBy('fast clouds 2', -10, 0); moveBy('fast clouds 3', -20, 0); }
        all('fast clouds', function (e) { if (e.x <= -1000) setPos(e, 1000, 0); });
        all('fast clouds 2', function (e) { if (e.x <= -1000) setX(e, 1000); });
        all('fast clouds 3', function (e) { if (e.x <= -1000) setX(e, 1000); });
        CALL.forEach(function (c) {
          if (C('phase') === c[0] && every('call' + c[0], c[1]) && onceOnly('call' + c[0])) {
            CS('what character 2', c[2]);
            if (c[3]) all(c[3], nextMovement);
            CS('comm', C('phase'));
          }
        });
        if (once('e35', C('comm') > 0)) {
          each('Active 3', destroy);
          var mf = one('make from');
          if (mf) create('Active 3', mf, 47, -58);
          play('Walkie_Talkie_Squelch_05', 3);
          all('what character', toFront);
          all('String', toFront);
        }
        var a3 = one('Active 3');
        if (a3 && anim(a3, 13)) { all('what character', show); all('String', show); }
        if (a3 && !anim(a3, 13)) { all('what character', hide); all('String', hide); }
        if (count('Active 3') === 0) all('what character', hide);
        var comm = C('comm'), wv = vis('what character');
        for (k in LINES) if (once('ln' + k, comm === +k && wv)) {
          play(LINES[k], 4);
          if (+k === 11) all('spin', show);
          if (+k === 12) { all('big', show); all('spin', hide); all('spin 2', hide); }
        }
        var ends = [[1, function () { all('make enemies', function (e) { e.alt[0] = 10; }); }, true], [2, null, true], [3, null, true], [4, function () { all('make enemies', function (e) { e.alt[0] = 15; }); }, true], [5, null, true], [6, null, true], [7, null, true], [8, function () { all('make enemies', function (e) { e.alt[0] = 15; }); }, false], [9, null, true], [10, null, true], [11, function () { all('spin', hide); all('spin 2', hide); }, true], [12, function () { all('big', hide); }, true], [30, null, false], [31, null, false], [32, null, false], [50, null, false], [51, null, false], [52, null, false], [55, function () { CS('beat', 1); }, false]];
        ends.forEach(function (en) {
          if (!playing(LINES[en[0]]) && C('comm') === en[0] && vis('what character') && every('end' + en[0], 110)) {
            CS('close', 1);
            CS('comm', 0);
            if (en[2]) CA('phase', 1);
            if (en[1]) en[1]();
          }
        });
        if (C('close') === 1) {
          play('Walkie_Talkie_Squelch_05', 3);
          all('what character', hide);
          all('Active 3', function (e) { force(e, 12); });
          CS('comm', 0);
          CS('close', 0);
        }
        if (once('e81', vis('what character'))) { api.setVolume(1, 25); all('Active 3', function (e) { e.alt[0] = 0; }); api.setVolume(9, 25); api.setVolume(8, 25); api.setVolume(12, 25); api.setVolume(14, 25); api.setVolume(19, 10); }
        if (once('e82', invis('what character'))) [1, 9, 8, 12, 14, 19].forEach(function (ch) { api.setVolume(ch, 100); });
        if (vis('what character')) all('Active 3', function (e) { e.alt[0] += 1; });
        comm = C('comm');
        for (k in TEXT) if (once('tx' + k, comm === +k)) {
          all('String', function (e) { api.setText(e, TEXT[k]); });
          if (+k === 5) all('Active 9', function (e) { setSpeed(e, 3); });
          if (+k === 51) CS('what character 2', 4);
          if (+k === 52) CS('what character 2', 3);
          if (+k === 55) CS('what character 2', 5);
        }
        LATER.forEach(function (l, n) {
          var hit = C('comm') === l[0] && live('Active 3').some(function (e) { return e.alt[0] === l[1]; });
          if (once('lt' + n, hit)) {
            all('String', function (e) { api.setText(e, l[2]); });
            if (l[0] === 8) CS('stage progress', 1);
          }
        });
        if (C('comm') === 11 && live('Active 3').some(function (e) { return e.alt[0] > 200; }) && every('e111', 250)) {
          var hid = where(live('spin 2'), function (e) { return !e.vis; });
          if (hid.length) pick(hid).forEach(show);
        }
        var wc2 = C('what character 2'), WC = { 1: 0, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16 };
        if (WC[wc2] != null) all('what character', function (e) { force(e, WC[wc2]); });
        if (api.pathEnded(one('Chica plane'))) all('Chica plane', function (e) { nextMovement(e); setSpeed(e, 10); e.alt[0] = 1; });
        if (api.pathEnded(one('Chica plane 2')) && onceOnly('e121')) all('Chica plane 2', function (e) { nextMovement(e); setSpeed(e, 10); e.alt[0] = 1; });
        if (api.pathEnded(one('Chica plane 3'))) all('Chica plane 3', function (e) { nextMovement(e); setSpeed(e, 10); e.alt[0] = 1; });
        PLANES.forEach(function (pn, n) { var f = one('plane follow ' + (n + 1)); all(pn, function (e) { if (e.alt[0] === 1 && f) lookAt(e, f.x, f.y); }); });
        [[0, 2000, 10], [1, 2000, 10], [2, 1000, 5]].forEach(function (q) {
          var sel = where(live(PLANES[q[0]]), function (e) { return e.alt[0] === 1; });
          if (sel.length && every('pf' + q[0], q[1]) && rnd(2) === 1) sel.forEach(function (e) { e.alt[1] = q[2]; });
        });
        [0, 1, 2].forEach(function (q) {
          var sel = where(live(PLANES[q]), function (e) { return e.alt[1] > 0; });
          if (sel.length && every('ps' + q, 100) && C('beat') === 0) { play('shot', 9); sel.forEach(function (e) { shoot(e, 'bullet', 100, 1); e.alt[1] -= 1; }); }
        });
        if (every('e132', 1000)) all('Active', toFront);
        all('bullet', function (e) { if (e.alt[3] === 0) { create('muzzle', e, 0, -3); e.alt[3] = 1; } });
        all('Active 4', function (e) { if (nearBorder(e)) destroy(e); });
        [['Active', -44, 8], ['Chica plane', -45, 15], ['Chica plane 2', -38, 23], ['Chica plane 3', -39, 19]].forEach(function (x, n) {
          if (count(x[0]) > 0 && every('ex' + n, 50)) all(x[0], function (e) { create('Active 4', e, x[1], x[2]); });
        });
        moveBy('Active 4', -10, 0);
        if (api.pathEnded(mv)) mv.alt[0] = 1;
        eff('Active 5', 1);
        colSel(live('Active 5'), 'left wall').a.forEach(function (e) { destroy(e); CA('minor kills', -1); });
        all('Active 5', function (e) { if (e.alt[0] < -1) { play('pow2', 8); destroy(e); create('POW 2', e, 0, 0); CA('minor kills', 1); } });
        var ws = [C('stage progress') > 0, invis('what character'), C('comm') === 0, count('Active 7') === 0, count('Active 6') === 0, count('Active 5') === 0];
        var me = one('make enemies'), dr = one('drop rat');
        if (ws.every(Boolean) && me && me.alt[0] === 0 && me.alt[1] === 0 && dr && dr.alt[0] === 0 && every('e149', 1000)) CA('stage progress', 1);
        if (me && me.alt[0] > 0 && me.alt[2] === 0 && every('e150', 200)) { me.alt[0] -= 1; create('Active 5', me, 15, 86); }
        if (me && me.alt[0] > 0 && me.alt[2] === 1 && every('e151', 200)) { me.alt[0] -= 1; var a5 = create('Active 5', me, 20, 402); if (a5) api.selectMovement(a5, 1); }
        moveBy('POW 2', -10, 0);
        moveBy('POW', -5, 0);
        if (every('e155', 1000)) all('make enemies', function (e) { e.alt[2] = rnd(2); });
        if (dr && dr.alt[0] > 0 && every('e157', 1000)) { create('Active 6', dr, 0, 0); dr.alt[0] -= 1; }
        colSel(live('Active 6'), 'bottom wall').a.forEach(function (e) { e.alt[4] = 1; });
        all('Active 6', function (e) { if (e.alt[4] === 0) { setSpeed(e, 10 + rnd(10)); e.alt[3] = 1; } });
        if (every('e160', 1000)) all('Active 6', function (e) { setDir(e, api.dirFromMask(29360128)); });
        all('Active 6', function (e) { if (e.alt[4] === 1 && nearBorder(e)) destroy(e); });
        var h6 = colSel(live('bullet'), 'Active 6');
        if (h6.a.length) { h6.b.forEach(function (e) { e.alt[0] -= 1; e.alt[1] = 3; }); h6.a.forEach(destroy); play('hit4', 12); }
        eff('Active 6', 1);
        all('Active 6', function (e) { if (e.alt[0] < -8) { create('POW 2', e, -2, 18); destroy(e); play('pow2', 8); CA('kills', 1); } });
        var h7 = colSel(live('bullet'), 'Active 7');
        if (h7.a.length) { h7.a.forEach(destroy); play('hit4', 12); h7.b.forEach(function (e) { e.alt[0] -= 1; e.alt[1] = 3; }); }
        eff('Active 7', 1);
        all('Active 7', function (e) { if (e.alt[0] < -60) { play('pow2', 8); create('POW', e, 0, 0); destroy(e); create('muzzle', e, -45, -17); CA('kills', 1); } });
        if (every('e170', 3000)) all('Active 7', function (e) { e.alt[4] = 3; });
        var s7 = where(live('Active 7'), function (e) { return e.alt[4] > 0; });
        if (s7.length && every('e171', 250)) { s7.forEach(function (e) { shoot(e, 'Active 8', 75, 65536); e.alt[4] -= 1; }); play('laser', 14); }
        all('Active 8', function (e) { if (nearBorder(e)) destroy(e); });
        if (count('Active 6') > 0) all('Active 6', function (e) { e.alt[6] += 1; });
        var s6 = where(live('Active 6'), function (e) { return e.alt[6] > 100; });
        if (s6.length) { var tgt = one('Active'); s6.forEach(function (e) { e.alt[6] = 0; if (tgt) api.shootToward(e, 'Active 8', 50, tgt.x, tgt.y); }); play('laser', 14); }
        var h8 = colSel(live('Active 8'), 'move');
        if (h8.a.length) { h8.a.forEach(destroy); hurt(); play('hurt', 14); CA('health', -1); }
        var hm = colSel(live('missile'), 'move');
        if (hm.a.length) { hurt(); play('hurt', 14); CA('health', -1); hm.a.forEach(destroy); }
        if (once('e177', colSel(live('laser'), 'move').a.length > 0)) { hurt(); play('hurt', 14); CA('health', -1); }
        ['Active'].concat(PLANES).forEach(function (n) { all(n, function (e) { if (e.alt[2] === 0) api.setEffect(e, 'Blend'); }); });
        ['Active'].concat(PLANES).forEach(function (n) { all(n, function (e) { if (e.alt[2] > 0) { e.alt[2] -= 1; api.setEffect(e, 'Add'); } }); });
        var c5 = colSel(live('Active 5'), 'Active');
        if (c5.a.length) { play('hurt', 14); hurt(); c5.a.forEach(function (e) { e.alt[0] -= 10; }); CA('health', -1); }
        PLANES.forEach(function (pn) { var c = colSel(live('Active 5'), pn); if (c.a.length) { play('hurt', 14); c.b.forEach(function (e) { e.alt[2] = 5; }); c.a.forEach(function (e) { e.alt[0] -= 10; }); } });
        var c6 = colSel(live('Active 6'), 'Active');
        if (c6.a.length) { hurt(); c6.a.forEach(function (e) { e.alt[0] -= 10; }); play('hurt', 14); CA('health', -1); }
        PLANES.forEach(function (pn) {
          var c = colSel(live('Active 6'), pn), b = where(c.b, function (e) { return speedOf(e) > 0; });
          if (c.a.length && b.length) { b.forEach(function (e) { e.alt[2] = 5; }); colSel(c.a, pn).a.forEach(function (e) { e.alt[0] -= 10; }); play('hurt', 14); }
        });
        var sp = C('stage progress');
        if (once('sp3', sp === 3)) all('make enemies', function (e) { e.alt[0] = 5; });
        if (once('sp5', sp === 5)) { all('make enemies', function (e) { e.alt[0] = 5; }); all('drop rat', function (e) { e.alt[0] = 2; }); }
        if (once('sp7', sp === 7)) all('make enemies', function (e) { e.alt[0] = 15; });
        if (once('sp9', sp === 9)) all('drop rat', function (e) { e.alt[0] = 10; });
        if (once('sp10', sp === 10)) all('make enemies', function (e) { e.alt[0] = 15; });
        if (once('sp12', sp === 12)) { all('make enemies', function (e) { e.alt[0] = 10; }); all('drop rat', function (e) { e.alt[0] = 10; }); }
        if (once('sp14', sp === 14)) all('make enemies', function (e) { e.alt[1] = 2; });
        me = one('make enemies');
        if (me && me.alt[1] > 0 && every('e201', 3000)) { me.alt[1] -= 1; create('Active 7', me, 19, 101); }
        if (once('sp16', sp === 16)) { all('make enemies', function (e) { e.alt[1] = 2; }); all('drop rat', function (e) { e.alt[0] = 10; }); }
        if (once('sp17', sp === 17)) CS('phase', 9);
        var sd = one('souldozer');
        if (every('e204', 15000) && invis('what character') && sd && sd.alt[1] < 4) all('make enemies', function (e) { e.alt[0] = 5 + rnd(10); });
        if (once('sp8', sp === 8)) { CS('comm', 30); CS('what character 2', 1); }
        if (once('sp13', sp === 13)) { CS('comm', 31); CS('what character 2', 3); }
        if (once('sp18', sp === 18)) { all('make enemies', function (e) { e.alt[1] = 1; }); all('drop rat', function (e) { e.alt[0] = 10; }); all('make enemies', function (e) { e.alt[0] = 30; }); }
        if (once('sp20', sp === 20)) { CS('comm', 32); all('souldozer', function (e) { api.selectMovement(e, 1); e.alt[1] = 1; }); CS('what character 2', 6); }
        all('souldozer', function (e) { if (speedOf(e) === 0 && e.alt[1] === 1) { api.selectMovement(e, 2); e.alt[1] = 2; } });
        rel('cannon 1', 'souldozer', -56, -411);
        sd = one('souldozer');
        var hp = sd ? sd.alt[0] : 0;
        if (sd && sd.alt[1] === 2 && every('e211', 5000)) { [65536, 32768, 16384, 131072, 8192].forEach(function (m) { shoot(sd, 'Active 8', 75, m); }); play('laser', 14); }
        if (sd && sd.alt[1] === 2 && every('e212', 9000)) { all('cannon 1', function (c) { [65536, 32768, 16384, 131072, 262144].forEach(function (m) { shoot(c, 'Active 8', 75, m); }); }); play('laser', 14); }
        var hs = colSel(live('bullet'), 'souldozer');
        if (hs.a.length && sd && sd.alt[1] < 4 && C('stage progress') >= 20) { sd.alt[0] -= 1; sd.alt[2] = 1; hs.a.forEach(destroy); }
        eff('souldozer', 2);
        hp = sd ? sd.alt[0] : 0;
        [[-200, 1000], [-400, 950], [-500, 900], [-600, 850], [-750, 800], [-1000, 100]].forEach(function (q) {
          if (sd && hp < q[0] && every('sm' + q[0], q[1])) pick(live('smoke gen')).forEach(function (g) { create('Active 10', g, 0, 0); });
        });
        if (sd && hp < -1250 && every('sm1250', 500)) pick(live('smoke gen')).forEach(function (g) { create('POW 2', g, 0, 0); });
        if (sd && hp < -1500 && every('sm1500', 200)) pick(live('smoke gen')).forEach(function (g) { create('POW 2', g, 0, 0); });
        if (sd && hp < -2000 && every('sm2000', 100)) { pick(live('smoke gen')).forEach(function (g) { create('POW', g, 0, 0); }); play('pow2', 8); }
        if (sd && hp < -2000 && every('bp1', 750)) [[8, -362], [-136, -282], [58, -234]].forEach(function (o) { create('POW 2', sd, o[0], o[1]); });
        if (sd && hp < -2000 && every('bp2', 900)) [[-34, -261], [43, -299], [-5, -191]].forEach(function (o) { create('POW 2', sd, o[0], o[1]); });
        if (sd && hp < -2000 && every('bp3', 1100)) [[-186, -215], [-90, -385], [131, -393]].forEach(function (o) { create('POW 2', sd, o[0], o[1]); });
        if (count('Active 10') > 0) moveBy('Active 10', -3, 0);
        if (once('e230', !!sd && hp < -2000)) { api.selectMovement(sd, 3); setPos(sd, sd.x - 1, sd.y + 1); api.forceAnimSpeed(sd, 0); sd.alt[1] = 4; CS('comm', 50); }
        if (sd && hp < -2000 && every('e231', 100)) { setPos(sd, sd.x - 1, sd.y + 1); moveBy('smoke gen', -1, 1); }
        if (once('e232', C('comm') === 50)) CS('what character 2', 6);
        if (once('e233', C('comm') === 51)) CS('what character 2', 4);
        if (once('e234', C('comm') === 52)) CS('what character 2', 3);
        if (once('e235', C('comm') === 55)) CS('what character 2', 5);
        if (once('e236', !!sd && hp < -1000)) { play('laser2', 15); create('laser', sd, -250, -324); }
        all('laser', function (e) { if (nearBorder(e)) destroy(e); });
        var p2 = one('Chica plane 2');
        if (p2 && p2.alt[5] === 1 && every('e239', 100)) { play('pow2', 8); create('POW 2', p2, -1, 17); }
        if (p2 && p2.alt[5] === 1 && speedOf(p2) === 0) destroy(p2);
        if (p2 && p2.alt[5] === 1 && every('e241', 1000) && onceOnly('e241')) CS('comm', 51);
        if (p2 && p2.alt[5] === 1 && every('e242', 6000) && onceOnly('e242')) CS('comm', 52);
        if (sd && hp < -2000 && every('e243', 15000) && onceOnly('e243')) { destroy(sd); CS('comm', 55); }
        if (C('beat') === 1) {
          all('Chica plane', function (e) { api.selectMovement(e, 0); });
          all('Chica plane 3', function (e) { api.selectMovement(e, 0); });
          moveBy('Chica plane', 5, 0);
          moveBy('Chica plane 3', 5, 0);
          moveBy('move', 5, 0);
        }
        if (live('Chica plane 3').some(function (e) { return e.alt[25] === 1; }) && onceOnly('e245')) play('badinfluence', 16);
        if (once('e246', C('beat') === 1)) { play('launch', 17); each('health', hide); each('Active 11', hide); each('Active 12', hide); }
        p2 = one('Chica plane 2');
        if (count('laser') > 0 && p2) all('laser', function (e) { lookAt(e, p2.x, p2.y); });
        if (P && colSel([P], 'souldozer').a.length && every('e248', 1000)) { CA('health', -1); play('hurt', 14); hurt(); }
        if (once('e249', C('phase') === 5)) { each('Active 11', show); each('Active 12', show); each('health', show); }
        if (C('health') <= 0) { go(36); return; }
        all('ready', function (e) { if (speedOf(e) === 0) e.alt[0] += 1; });
        all('ready', function (e) { if (e.alt[0] > 75) { create('ready2', e, 0, 0); destroy(e); } });
        all('souldozer', function (e) { e.alt[12] += 1; });
        sd = one('souldozer');
        var rw = one('right wall');
        if (sd && rw && sd.alt[0] < -500 && sd.alt[12] === 300 && sd.alt[0] > -2000 && C('beat') === 0) { play('rocket2', 8); [[-25, -161], [-25, 15], [-25, 191]].forEach(function (o) { create('missile', rw, o[0], o[1]); }); }
        if (sd && rw && sd.alt[0] < -750 && sd.alt[12] === 600 && sd.alt[0] > -2000 && C('beat') === 0) { [[-25, -73], [-25, 103]].forEach(function (o) { create('missile', rw, o[0], o[1]); }); play('rocket2', 8); }
        all('souldozer', function (e) { if (e.alt[12] > 600) e.alt[12] = 0; });
        if (count('missile') > 0) all('missile', function (e) { e.alt[0] += 3; setSpeed(e, e.alt[0]); });
        all('missile', function (e) { if (nearBorder(e) && e.alt[0] > 50) destroy(e); });
        if (count('missile') > 0 && every('e260', 50)) all('missile', function (e) { create('Active 4', e, 38, 2); });
        if (sd && sd.alt[0] < -1200 && sd.alt[0] > -2000 && every('e261', 10000) && C('beat') === 0) sd.alt[11] = 5;
        if (sd && sd.alt[11] > 0 && sd.alt[0] > -2000 && every('e262', 250)) { sd.alt[11] -= 1; shoot(sd, 'laser', 100, 65536); play('laser2', 8); }
        if (C('beat') === 1 && every('e263', 3000) && onceOnly('e263')) { each('score', show); play('stat2', 15); }
        CS('health 2', C('health'));
        all('rank', function (e) { e.alt[0] = C('kills') + C('health 2'); });
        if (C('minor kills') > 103) CS('minor kills', 103);
        all('score', function (e) { if (e.vis) e.alt[0] += 1; });
        var sc = live('score').some(function (e) { return e.vis && e.alt[0] > 50; });
        if (sc && onceOnly('e267')) { each('kills', show); CA('kills', C('minor kills')); play('stat2', 15); }
        if (live('score').some(function (e) { return e.vis && e.alt[0] > 100; }) && onceOnly('e268')) { each('health 2', show); play('stat2', 15); }
        if (live('score').some(function (e) { return e.vis && e.alt[0] > 150; }) && onceOnly('e269')) { play('stat2', 15); each('rank', show); }
        all('rank', function (e) { if (e.alt[0] < 160) force(e, 13); });
        all('rank', function (e) { if (e.alt[0] >= 160 && e.alt[0] < 175) force(e, 12); });
        all('rank', function (e) { if (e.alt[0] >= 175) force(e, 0); });
        if (once('e273', C('comm') === 1)) each('Active 13', show);
        var rk = live('rank').filter(function (e) { return e.vis; });
        if (rk.some(function (e) { return e.alt[0] < 175; })) CS('found new', 42);
        if (rk.some(function (e) { return e.alt[0] >= 175; })) CS('found new', 45);
        if (rk.length && every('e276', 3000)) { G.found = C('found new') || 42; go(43); return; }
        if (C('current weapon') > 4) CS('current weapon', 0);
        all('bullet', function (e) {
          if (e.alt[0] === 0 || e.alt[0] === 4) force(e, 0);
          if (e.alt[0] === 1) force(e, 12);
          if (e.alt[0] === 2) force(e, 13);
          if (e.alt[0] === 3) { force(e, 14); api.selectMovement(e, 1); }
        });
        var lb = where(live('laserball'), function (e) { return e.alt[0] > -30; });
        if (lb.length && every('e283', 30)) { var made2 = []; lb.forEach(function (e) { var b = shoot(e, 'bullet', 200, 1); if (b) made2.push(b); e.alt[0] -= 1; }); made2.forEach(function (b) { b.alt[0] = 2; }); }
        all('laserball', function (e) { if (e.alt[0] <= -30) destroy(e); });
        ['Active 5', 'Active 6', 'Active 7'].forEach(function (n) { var t = one(n); if (t) all('bullet', function (e) { if (e.alt[0] === 3) lookAt(e, t.x, t.y); }); });
        all('POW 2', function (e) { if (e.alt[2] === 0) e.alt[2] = rnd(15) + 1; });
        sd = one('souldozer');
        var p2w = where(live('POW 2'), function (e) { return e.alt[2] === 1; });
        if (p2w.length && count('Active 14') === 0 && (sd ? sd.alt[0] : 0) > -1500) p2w.forEach(function (e) { e.alt[2] = 2; create('Active 14', e, 0, 0); });
        all('Active 14', function (e) { if (nearBorder(e)) destroy(e); });
        moveBy('Active 14', -3, 0);
        P = one('Active');
        if (P) colSel([P], 'Active 14').b.forEach(function (e) { CS('current weapon', e.alt[0]); destroy(e); play('powerup55', 21); });
        all('Active 14', function (e) { if (e.alt[0] === 0) e.alt[0] = rnd(4) + 1; });
        all('Active 14', function (e) { var A = { 1: 12, 2: 0, 3: 13, 4: 14 }[e.alt[0]]; if (A != null) force(e, A); });
        all('Active 14', function (e) { if (e.alt[0] > 4) e.alt[0] = 1; });
        all('Active 14', function (e) { if (e.alt[0] === C('current weapon')) e.alt[0] += 1; });
      };

      TRIG[35] = {
        anim: function (e, a) {
          var n = e.o.n;
          if ((n === 'POW' || n === 'POW 2' || n === 'muzzle' || n === 'Active 4' || n === 'Active 10' || n === 'ready2') && a === 0) { destroy(e); return; }
          if (n === 'Active 3' && a === 0) { force(e, 13); return; }
          if (n === 'Active 3' && a === 12) destroy(e);
        },
        col: function (a, b) {
          var A = a.o.n, B = b.o.n;
          if ((A === 'bullet' && B === 'Active 5') || (A === 'Active 5' && B === 'bullet')) {
            var en = A === 'Active 5' ? a : b, bu = A === 'bullet' ? a : b;
            en.alt[0] -= 1;
            en.alt[1] = 3;
            destroy(bu);
            play('hit4', 12);
            each('Active 13', hide);
            return;
          }
          if ((A === 'laser' && B === 'Chica plane 2') || (A === 'Chica plane 2' && B === 'laser')) {
            var pl = A === 'laser' ? b : a, lz = A === 'laser' ? a : b;
            play('hit5', 15);
            destroy(lz);
            pl.alt[5] = 1;
            api.selectMovement(pl, 3);
            create('POW', pl, 53, 8);
          }
        }
      };

      START[36] = function () { stopAll(); };
      EV[36] = function () {
        if (count('Active') > 0 && every('d1', 100)) { play('pow2', 19); all('Active', function (e) { create('POW 2', e, -6, 13); }); }
        all('Active', function (e) { if (speedOf(e) === 0) { create('POW', e, 18, 9); destroy(e); } });
        moveBy('POW', -10, 0);
        moveBy('POW 2', -10, 0);
        if (count('Active') === 0 && every('d7', 1000) && onceOnly('d7')) each('Active 2', show);
        if (count('Active') === 0 && every('d8', 3000)) { go('title'); return; }
      };
      TRIG[36] = { anim: function (e, a) { if ((e.o.n === 'POW' || e.o.n === 'POW 2') && a === 0) destroy(e); } };

      return { START: START, EV: EV, TRIG: TRIG, QCOL: { 35: ['move', 'right wall', 'left wall', 'top wall', 'bottom wall', 'bullet', 'Active 5', 'Active 6', 'Active 7', 'Active 8', 'missile', 'laser', 'Active', 'Chica plane', 'Chica plane 2', 'Chica plane 3', 'souldozer', 'Active 14'] }, ONCOL: { 35: { 'bullet': ['Active 5'], 'Active 5': ['bullet'], 'laser': ['Chica plane 2'], 'Chica plane 2': ['laser'] } } };
    }
  });
  if (!api) return;
  window.FF = api;
  api.state = function () {
    var L = api.frame();
    if (!L) return { frame: null };
    var P = api.S('Active').filter(function (e) { return !e.dead; })[0], sd = api.S('souldozer').filter(function (e) { return !e.dead; })[0];
    return { frame: L.f, mode: api.mode(), t: L.loop, x: P ? P.x : null, y: P ? P.y : null, health: api.C('health'), phase: api.C('phase'), comm: api.C('comm'), stage: api.C('stage progress'), weapon: api.C('current weapon'), boss: sd ? [sd.alt[0], sd.alt[1]] : null, beat: api.C('beat'), kills: api.C('kills'), minor: api.C('minor kills') };
  };
})();
