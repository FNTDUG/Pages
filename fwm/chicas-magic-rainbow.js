(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var VOICE = { 1: 'voice02', 2: 'voice03', 3: 'voice04', 4: 'voice05', 5: 'voice06', 6: 'voice07', 7: 'voice08', 8: 'voice09', 9: 'voice10', 10: 'voice11', 11: 'voice12', 12: 'voice13', 13: 'voice14', 14: 'voice15', 15: 'voice16', 16: 'voice17', 17: 'voice18', 18: 'voice19', 19: 'voice20', 20: 'Ug', 21: 'voice22', 22: 'voice23', 23: 'voice24', 24: 'voice25', 25: 'voice26', 26: 'HA', 27: 'voice28', 28: 'voice29', 29: 'voice30', 30: 'voice31', 31: 'voice32', 32: 'voice33', 33: 'voice34', 34: 'voice17' };
  var PETALS = [256, 1, 16777216, 65536, 16, 268435456, 1048576, 4096];
  var BEAMS = [16777216, 67108864, 4194304, 1048576, 268435456, 1073741824, 262144];
  var api = window.CFGame({
    root: root,
    base: '/fwm/rainbow/',
    ver: '?v=1',
    title: null,
    play: 44,
    idleTicks: 30,
    defaultReward: 43,
    codes: { ArrowLeft: 37, ArrowRight: 39, KeyZ: 90, KeyX: 88, Enter: 13, NumpadEnter: 13, Space: 32 },
    pad: { left: 37, right: 39, jump: 90 },
    endLine: function () { return ''; },
    setup: function (api) {
      var S = api.S, O1 = api.O1, C = api.C, CS = api.CS, CA = api.CA, count = api.count, each = api.each, where = api.where, colSel = api.colSel, notCol = api.notCol, once = api.once, every = api.every, create = api.create, shoot = api.shoot, lookAt = api.lookAt, hide = api.hide, show = api.show, display = api.display, setPos = api.setPos, setX = api.setX, setDir = api.setDir, setSpeed = api.setSpeed, speedOf = api.speedOf, force = api.force, bg = api.bg, destroy = api.destroy, play = api.play, stopAll = api.stopAll, playing = api.playing, pressed = api.pressed, down = api.down, rnd = api.rnd, go = api.go, nearBorder = api.nearBorder, G = api.G;
      var START = {}, EV = {};
      function live(name) { return S(name).filter(function (e) { return !e.dead; }); }
      function one(name) { return live(name)[0] || null; }
      function bgAny(name) { return live(name).some(function (e) { return bg(e); }); }
      function hits(name) { var hb = one('hit box'); return hb ? colSel(live(name), 'hit box').a : []; }
      function rel(name, ref, dx, dy) { var r = one(ref); if (r) each(name, function (e) { if (!e.dead) setPos(e, r.x + dx, r.y + dy); }); }
      function moveBy(name, dx, dy) { each(name, function (e) { if (!e.dead) setPos(e, e.x + dx, e.y + dy); }); }
      function alt(name, i, v) { each(name, function (e) { if (!e.dead) e.alt[i] = v; }); }

      START[44] = function () {
        play('Rainbow2', 1, true);
        play('voice01', 2);
        each('Date & Time', function (e) { api.clock(e, 'reset'); api.clock(e, 'start'); });
      };

      EV[44] = function () {
        var R = down(39), Lf = down(37), Z = down(90);
        if (R && !bgAny('feel right')) { moveBy('hit box', 4, 0); each('Active', function (e) { setDir(e, 0); }); }
        if (R && bgAny('feel right') && bgAny('floor 1')) each('Active', function (e) { force(e, 0); });
        if (Lf && bgAny('feel left') && bgAny('floor 1')) each('Active', function (e) { force(e, 0); });
        if (Lf && !bgAny('feel left')) { moveBy('hit box', -4, 0); each('Active', function (e) { setDir(e, 16); }); }
        if (!R && !Lf && bgAny('floor 1')) each('Active', function (e) { force(e, 0); });
        if (!R && !Lf && !bgAny('floor 1')) each('Active', function (e) { force(e, 12); });
        if (!bgAny('floor 1') && C('jumped') === 0) { moveBy('hit box', 0, 3); CA('fall', 1); }
        if (pressed(90) && bgAny('floor 1')) { CS('jumped', 1); CS('going up', 50); play('cjump2', 3); each('Active 19', destroy); }
        if (C('jumped') === 1 && !Z) { CS('jumped', 0); CS('going up', 0); }
        if (C('jumped') === 1 && C('going up') > 0) { CA('going up', -1); moveBy('hit box', 0, -1); }
        if (C('jumped') === 1 && C('going up') > 10) moveBy('hit box', 0, -2);
        if (C('jumped') === 1 && C('going up') > 20) moveBy('hit box', 0, -2);
        if (C('jumped') === 1 && C('going up') > 30) moveBy('hit box', 0, -2);
        if (C('jumped') === 1 && C('going up') > 35) moveBy('hit box', 0, -2);
        if (C('jumped') === 1 && C('going up') === 0) CS('jumped', 0);
        if (R && !bgAny('feel right') && bgAny('floor 1')) each('Active', function (e) { force(e, 1); });
        if (Lf && !bgAny('feel left') && bgAny('floor 1')) each('Active', function (e) { force(e, 1); });
        if (R && !bgAny('floor 1')) each('Active', function (e) { force(e, 12); });
        if (Lf && !bgAny('floor 1')) each('Active', function (e) { force(e, 12); });
        if (bgAny('floor 1')) CS('fall', 0);
        if (bgAny('floor 2') && C('fall') > 10) CS('fall', 10);
        if (!bgAny('floor 1') && C('fall') > 0) moveBy('hit box', 0, 2);
        if (!bgAny('floor 1') && C('fall') > 10) moveBy('hit box', 0, 2);
        if (!bgAny('floor 1') && C('fall') > 20) moveBy('hit box', 0, 2);
        if (!bgAny('floor 1') && C('fall') > 30) moveBy('hit box', 0, 2);
        if (bgAny('ceiling')) CS('jumped', 0);
        if (down(88)) each('hit box', function (e) { if (!e.dead) e.alt[0] += 1; });
        if (!down(88)) alt('hit box', 0, 0);
        if (bgAny('floor 3')) moveBy('hit box', 0, -1);
        var A = one('Active');
        if (A) display(A.x + 1, A.y - 98);

        var mr = one('magic_rainbow');
        if (mr && A) {
          if (mr.x > A.x) setX(mr, mr.x - 1);
          if (mr.x > A.x + 100) setX(mr, mr.x - 1);
          if (mr.x > A.x + 300) setX(mr, mr.x - 1);
          if (mr.x > A.x + 500) setX(mr, mr.x - 1);
          if (mr.x < A.x) setX(mr, mr.x + 1);
          if (mr.x < A.x - 100) setX(mr, mr.x + 1);
          if (mr.x < A.x - 300) setX(mr, mr.x + 1);
          if (mr.x < A.x - 500) setX(mr, mr.x + 1);
        }
        if (A) each('Active 3', function (e) { lookAt(e, A.x - 3, A.y - 14); });
        var a3 = one('Active 3');
        if (a3) each('Active 4', function (e) { setDir(e, a3.dir); });

        if (A && one('hit box')) {
          var flags = notCol(colSel([A], 'Active 5').b, 'checkpoint');
          if (colSel([A], 'Active 5').a.length && flags.length) {
            rel('checkpoint', 'hit box', 0, 0);
            play('checkpoint', 4);
            flags.forEach(function (f) { create('Active 13', f, 21, -99); });
          }
        }
        var hb = one('hit box');
        if (hb && hb.alt[3] === 1 && A) {
          for (var i = 0; i < 15; i++) create('blood', A, -4, -26);
          for (var j = 0; j < 7; j++) create('blood', A, 1, -48);
          play('die', 5);
          destroy(hb);
        }
        moveBy('blood', 0, 4);
        live('blood').forEach(function (e) { if (bg(e)) { api.paste(e, 0); destroy(e); } });
        if (hits('Active 9').length) alt('hit box', 3, 1);
        if (hits('Active 10').length) alt('hit box', 3, 1);
        if (count('hit box') === 0 && C('deaths') < 34 && every('e47', 1000)) {
          var cp = one('checkpoint');
          var nh = cp ? create('hit box', cp, 1, -16) : null;
          play('respawn', 5);
          alt('trigger', 0, 0);
          alt('trigger 2', 0, 0);
          alt('magic_rainbow', 1, 0);
          alt('trigger 5', 0, 0);
          alt('trigger 6', 0, 0);
          alt('trigger 7', 0, 0);
          alt('trigger 8', 0, 0);
          each('Active 9', destroy);
          alt('trigger 9', 0, 0);
          each('Active 10', destroy);
          if (nh) { each('magic_rainbow', function (e) { setX(e, nh.x); }); display(nh.x, nh.y - 58); }
        }
        rel('Active', 'hit box', 0, 34);
        rel('feel right', 'hit box', 25, 6);
        rel('feel left', 'hit box', -26, 6);
        rel('floor 1', 'hit box', -1, 30);
        rel('floor 2', 'hit box', -1, 44);
        rel('ceiling', 'hit box', 0, -24);
        rel('floor 3', 'hit box', -1, 30);
        rel('Active 3', 'magic_rainbow', -32, -47);
        rel('Active 4', 'magic_rainbow', 30, -48);
        if (count('hit box') === 0) each('Active', hide);
        if (count('hit box') > 0) each('Active', show);
        live('blood').forEach(function (e) { if (e.alt[0] === 0) { e.alt[0] = 1; setSpeed(e, 10 + rnd(70)); } });
        if (once('e52', count('hit box') === 0)) { CA('deaths', 1); alt('magic_rainbow', 1, 0); }
        for (var d = 1; d <= 34; d++) if (once('v' + d, C('deaths') === d)) { play(VOICE[d], 2); if (d === 34) CS('game over', 1); }

        var trg = where(hits('trigger'), function (e) { return e.alt[0] === 0; });
        if (once('e87', trg.length > 0)) {
          live('Active 2').forEach(function (e) { PETALS.forEach(function (m) { shoot(e, 'Active 6', 100, m); }); });
          play('petal', 8);
          trg.forEach(function (e) { e.alt[0] = 1; });
        }
        live('Active 6').forEach(function (e) { if (nearBorder(e)) destroy(e); });
        if (hits('Active 6').length) alt('hit box', 3, 1);
        if (hits('lazer').length) alt('hit box', 3, 1);
        if (hits('spikes').length && C('WIN') === 0) alt('hit box', 3, 1);
        if (where(hits('spikes 2'), function (e) { return e.alt[0] > 0; }).length) alt('hit box', 3, 1);
        if (where(hits('spikes 2'), function (e) { return e.alt[1] > 0; }).length) alt('hit box', 3, 1);
        if (hits('Active 7').length) alt('hit box', 3, 1);
        var t2 = where(hits('trigger 2'), function (e) { return e.alt[0] === 0; });
        if (t2.length) { alt('magic_rainbow', 1, 50); t2.forEach(function (e) { e.alt[0] = 1; }); }
        var beam = where(live('magic_rainbow'), function (e) { return e.alt[1] > 0; });
        if (beam.length && every('e96', 50)) beam.forEach(function (e) { e.alt[1] -= 1; BEAMS.forEach(function (m) { shoot(e, 'Active 7', 100, m); }); });
        live('Active 7').forEach(function (e) { if (bg(e)) destroy(e); });
        if (where(live('magic_rainbow'), function (e) { return e.alt[1] > 0; }).length && every('e98', 50)) play('rainbow', 12);
        live('lazer').forEach(function (e) { if (e.alt[0] > 5) destroy(e); });
        live('lazer').forEach(function (e) { if (nearBorder(e)) destroy(e); });
        if (hits('trigger 3').length) alt('Active 8', 0, 1);
        live('Active 8').forEach(function (e) { if (e.alt[0] === 1) e.alt[1] += 2; });
        live('Active 8').forEach(function (e) { if (e.alt[1] > 60) shoot(e, 'lazer', 100, 16777216); });
        live('Active 8').forEach(function (e) { if (e.alt[1] > 100) e.alt[1] = 0; });
        if (once('e105', where(live('Active 8'), function (e) { return e.alt[1] > 50; }).length > 0)) play('blazer', 15);
        if (hits('trigger 4').length) { alt('Active 8', 0, 0); alt('Active 8', 1, 0); }
        var t5 = where(hits('trigger 5'), function (e) { return e.alt[0] === 0; });
        if (t5.length) { t5.forEach(function (e) { e.alt[0] = 1; }); alt('spikes', 0, 11); play('spikes', 16); }
        var t6 = where(hits('trigger 6'), function (e) { return e.alt[0] === 0; });
        if (t6.length) { play('spikes', 16); alt('spikes 2', 0, 11); t6.forEach(function (e) { e.alt[0] = 1; }); }
        var t7 = where(hits('trigger 7'), function (e) { return e.alt[0] === 0; });
        if (t7.length) { play('logs', 16); live('log shoot').forEach(function (e) { shoot(e, 'Active 9', 100, 65536); }); t7.forEach(function (e) { e.alt[0] = 1; }); }
        var t8 = where(hits('trigger 8'), function (e) { return e.alt[0] === 0; });
        if (t8.length) { play('logs', 16); live('log shoot').forEach(function (e) { shoot(e, 'Active 9', 100, 65536); }); live('log shoot 2').forEach(function (e) { shoot(e, 'Active 9', 100, 65536); }); t8.forEach(function (e) { e.alt[0] = 1; }); }
        var t9 = where(hits('trigger 9'), function (e) { return e.alt[0] === 0; });
        if (t9.length) { t9.forEach(function (e) { e.alt[0] = 1; }); alt('magic_rainbow', 6, 1); }
        live('spikes').forEach(function (e) { if (e.alt[0] > 0) { e.alt[0] -= 1; setPos(e, e.x, e.y - 30); } });
        live('spikes 2').forEach(function (e) { if (e.alt[0] > 0) { e.alt[0] -= 1; setPos(e, e.x, e.y + 40); } });
        live('spikes').forEach(function (e) { if (e.alt[0] === 1) e.alt[1] = 11; });
        live('spikes 2').forEach(function (e) { if (e.alt[0] === 1) e.alt[1] = 11; });
        live('spikes').forEach(function (e) { if (e.alt[1] > 0) { e.alt[1] -= 1; setPos(e, e.x, e.y + 30); } });
        live('spikes 2').forEach(function (e) { if (e.alt[1] > 0) { e.alt[1] -= 1; setPos(e, e.x, e.y - 40); } });
        var hx = one('hit box') ? one('hit box').x : 0;
        live('spikes').forEach(function (e) { if (e.alt[0] === 0 && e.alt[1] === 0) setX(e, hx); });
        live('spikes 2').forEach(function (e) { if (e.alt[0] === 0 && e.alt[1] === 0) setX(e, hx); });
        if (count('Active 9') > 0) live('Active 9').forEach(function (e) { e.alt[0] += 1; });
        live('Active 9').forEach(function (e) { if (e.alt[0] > 200) destroy(e); });
        if (where(live('magic_rainbow'), function (e) { return e.alt[6] === 1; }).length && C('WIN') === 0 && every('e122', 1000)) {
          live('Active 3').forEach(function (e) { create('Active 10', e, 0, 0); });
          live('Active 4').forEach(function (e) { create('Active 10', e, 0, 0); });
          play('eye', 11);
        }
        var hb2 = one('hit box');
        live('Active 10').forEach(function (e) { if (speedOf(e) === 0) { setSpeed(e, 100); if (hb2) lookAt(e, hb2.x, hb2.y); } });
        live('Active 10').forEach(function (e) { if (bg(e)) destroy(e); });
        colSel(live('spikes'), 'Active 10').b.forEach(function (e) { for (var k = 0; k < 3; k++) create('blood', e, 0, 0); destroy(e); });
        if (hits('win').length && C('WIN') === 0 && C('Counter') === 0) { CS('WIN', 1); play('voice29', 2); CS('found new', 43); }
        if (hits('win').length && C('WIN') === 0 && C('Counter') > 0) { CS('WIN', 1); play('voice34', 2); CS('found new', 44); }
        if (C('WIN') === 1) each('hit box', function (e) { if (!e.dead) setPos(e, 11794, 572); });
        if (C('WIN') === 1) {
          each('Active 10', destroy);
          each('Active 3', hide);
          each('Active 4', hide);
          each('magic_rainbow', function (e) { force(e, 12); });
          each('great job', show);
          each('Date & Time', function (e) { api.clock(e, 'stop'); });
        }
        if (C('game over') === 1) each('you suck', show);
        if (C('deaths') === 33) { each('magic_rainbow', function (e) { force(e, 12); }); each('Active 3', hide); each('Active 4', hide); }
        if (C('deaths') === 34) { each('magic_rainbow', function (e) { force(e, 0); }); each('Active 3', show); each('Active 4', show); }
        var hb3 = one('hit box');
        if (C('deaths') === 33 && count('hit box') > 0 && every('e133', 250) && !playing('mutesounds')) {
          live('Active 3').forEach(function (e) { if (hb3) api.shootToward(e, 'lazer', 100, hb3.x, hb3.y); });
          play('rainbow', 6);
          live('Active 4').forEach(function (e) { if (hb3) api.shootToward(e, 'lazer', 100, hb3.x, hb3.y); });
        }
        if (C('WIN') === 1 && every('e134', 3000)) { G.found = C('found new') || 43; go(43); return; }
        if (C('game over') === 1 && every('e135', 2000)) { go('title'); return; }
        if (C('Counter') > 0 && every('e136', 1000)) CA('Counter', -1);
        if (api.clicked('Active 12').length && C('deaths') < 33) {
          stopAll();
          each('Active 12', destroy);
          CS('deaths', 33);
          play('mutesounds', 2);
          play('RecordScratch_S08MU_1244', 3);
        }
        live('Active 13').forEach(function (e) { if (speedOf(e) === 0) destroy(e); });
      };

      return { START: START, EV: EV, QCOL: { 44: ['hit box', 'Active', 'Active 5', 'checkpoint', 'Active 6', 'Active 7', 'Active 9', 'Active 10', 'lazer', 'spikes', 'spikes 2', 'trigger', 'trigger 2', 'trigger 3', 'trigger 4', 'trigger 5', 'trigger 6', 'trigger 7', 'trigger 8', 'trigger 9', 'win', 'Active 12'] } };
    }
  });
  if (!api) return;
  window.CMR = api;
  api.state = function () {
    var L = api.frame();
    if (!L) return { frame: null };
    var hb = api.S('hit box').filter(function (e) { return !e.dead; })[0];
    return { frame: L.f, mode: api.mode(), t: L.loop, x: hb ? hb.x : null, y: hb ? hb.y : null, deaths: api.C('deaths'), win: api.C('WIN'), counter: api.C('Counter'), jumped: api.C('jumped'), fall: api.C('fall'), cam: [L.camX, L.camY] };
  };
})();
