(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var VOICE = { 1: 'voice02', 2: 'voice03', 3: 'voice04', 4: 'voice05', 5: 'voice06', 6: 'voice07', 7: 'voice08', 8: 'voice09', 9: 'voice10', 10: 'voice11', 11: 'voice12', 12: 'voice13', 13: 'voice14', 14: 'voice15', 15: 'voice16', 16: 'voice17', 17: 'voice18', 18: 'voice19', 19: 'voice20', 20: 'Ug', 21: 'voice22', 22: 'voice23', 23: 'voice24', 24: 'voice25', 25: 'voice26', 26: 'HA', 27: 'voice28', 28: 'voice29', 29: 'voice30', 30: 'voice31', 31: 'voice32', 32: 'voice33', 33: 'voice34', 34: 'voice17' };
  var PETALS = [256, 1, 16777216, 65536, 16, 268435456, 1048576, 4096];
  var BEAMS = [16777216, 67108864, 4194304, 1048576, 268435456, 1073741824, 262144];
  var ROUTES = [["trigger",1272,1236,416,1012,416,[],[1224,416,1200,416,1176,416,1152,416,1128,416,1104,416,1080,416,1056,416,1032,416,1012,416,1012,416]],["trigger",1572,1536,416,1536,416,[],[1536,416,1536,416,1536,416,1536,416,1536,416,1536,416,1536,416,1536,416,1536,416]],["trigger",1972,1937,146,1937,6,[1909,209,1933,155],[1937,128,1937,78,1937,42,1937,12,1937,-8,1937,-24,1937,-30,1937,-24,1937,6,1937,6]],["trigger",2372,2337,146,2337,16,[2309,209,2333,155],[2337,128,2337,78,2337,42,2337,12,2337,-8,2337,-24,2337,-30,2337,-24,2337,6,2337,16]],["trigger",2722,2686,416,2686,416,[],[2686,389,2686,335,2686,318,2686,348,2686,386,2686,416,2686,416,2686,416,2686,416]],["trigger",3722,3686,416,3686,416,[],[3686,416,3686,416,3686,416,3686,416,3686,416,3686,416,3686,416]],["trigger",5472,5436,262,5436,189,[5304,418,5328,416,5352,416,5376,389,5400,335,5424,283],[5436,245,5436,215,5436,193,5436,175,5436,169,5436,169,5436,189]],["trigger",11172,11136,416,11136,416,[],[11136,416,11136,416,11136,416,11136,416,11136,416,11136,416,11136,416]],["trigger 8",7372,7338,416,7290,416,[],[7334,407,7310,353,7286,299,7262,255,7238,225,7214,199,7190,181,7166,171,7162,190,7162,215,7162,215,7174,188,7198,134,7222,82,7246,44,7270,14,7290,-5,7290,25,7290,59,7290,101,7290,151,7290,205,7290,271,7290,337,7290,403,7290,416,7290,416,7290,416,7290,416,7290,416,7290,416,7290,416,7290,416,7290,416,7290,416]],["trigger 7",7772,7736,416,7736,416,[],[7736,416,7736,416,7736,389,7736,335,7736,283,7736,245,7736,215,7736,193,7736,175,7736,169,7736,169,7736,199,7736,235,7736,277,7736,329,7736,385,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416,7736,416]],["trigger 8",8126,8089,162,8089,216,[8033,218,8057,216,8081,180],[8089,153,8089,99,8089,55,8089,25,8089,-1,8089,-19,8089,-29,8089,-35,8089,-11,8089,21,8089,63,8089,111,8089,165,8089,217,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216,8089,216]],["trigger 5",5072,5036,262,4960,181,[4924,418,4948,416,4972,398,4996,344,5020,290],[5028,250,5004,220,4980,196,4960,181]],["trigger 5",5472,5436,262,5360,181,[5324,418,5348,416,5372,398,5396,344,5420,290],[5428,250,5404,220,5380,196,5360,181]],["trigger 5",5672,5636,262,5560,181,[5524,418,5548,416,5572,398,5596,344,5620,290],[5628,250,5604,220,5580,196,5560,181]],["trigger 5",6342,6306,262,6230,181,[6194,418,6218,416,6242,398,6266,344,6290,290],[6298,250,6274,220,6250,196,6230,181]],["trigger 6",6422,6386,416,6386,416,[],[6386,416,6386,416,6386,416,6386,416]],["trigger 5",6522,6486,262,6410,181,[6374,418,6398,416,6422,398,6446,344,6470,290],[6478,250,6454,220,6430,196,6410,181]],["trigger 5",6945,6910,262,6834,181,[6794,418,6818,416,6842,407,6866,353,6890,299],[6906,255,6882,225,6858,199,6834,181,6834,181]],["trigger 5",7822,7786,262,7710,181,[7674,418,7698,416,7722,398,7746,344,7770,290],[7778,250,7754,220,7730,196,7710,181]],["trigger 5",9672,9636,262,9560,181,[9524,418,9548,416,9572,398,9596,344,9620,290],[9628,250,9604,220,9580,196,9560,181]],["trigger 5",10022,9986,262,9910,181,[9874,418,9898,416,9922,398,9946,344,9970,290],[9978,250,9954,220,9930,196,9910,181]],["trigger 5",10872,10836,262,10760,181,[10724,418,10748,416,10772,398,10796,344,10820,290],[10828,250,10804,220,10780,196,10760,181]]];
  var CHEATS = false, FIRED = {}, CB = [77, 457, 67, 20], TELE = -1, BEAM_UNTIL = -1, RAYS = [18, 20, 22, 24, 26, 28, 30];
  var TPX = 150, TPW = 30, TPG = 4;
  try { CHEATS = localStorage.getItem('cmr-cheats') === '1'; } catch (e) {}
  function setCheats(on) { CHEATS = on; try { localStorage.setItem('cmr-cheats', on ? '1' : '0'); } catch (e) {} }
  function dot(g, x, y, r, fill) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = '#0b0d12'; g.fill(); g.beginPath(); g.arc(x, y, r - 1.5, 0, Math.PI * 2); g.fillStyle = fill; g.fill(); }
  function rayDots(g, L, x, y, dx, dy, len, step) {
    for (var k = step; k < len; k += step) {
      var px = x + dx * k - L.camX, py = y + dy * k - L.camY;
      if (px < -10 || px > 810 || py < -10 || py > 490) continue;
      dot(g, px, py, 3.5, '#ff3b3b');
    }
  }
  function blocked(L, x, y) {
    for (var i = 0; i < L.obst.length; i++) { var r = L.obst[i]; if (r[4] === 3 && r[3] < 100 && x >= r[0] && x < r[0] + r[2] && y >= r[1] && y < r[1] + r[3]) return true; }
    return false;
  }
  function drawAttacks(g, L) {
    var mr = api.S('magic_rainbow').filter(function (e) { return !e.dead; })[0];
    if (mr && mr.alt[1] > 0) BEAM_UNTIL = L.loop + 45;
    api.S('trigger 2').concat(api.S('trigger 9')).forEach(function (t) { if (!t.dead && t.alt[0] === 0 && !(t.o.n === 'trigger 9' && mr && mr.alt[6] === 1)) dot(g, t.x - 36 - L.camX, 416 - L.camY, 8, '#ff3b3b'); });
    if (mr && L.loop <= BEAM_UNTIL) {
      var ox = mr.x + mr.ax - mr.hx, oy = mr.y + mr.ay - mr.hy, zones = [];
      RAYS.forEach(function (d) {
        var a = d * Math.PI / 16, dx = Math.cos(a), dy = -Math.sin(a), len = (399 - oy) / dy, hit = len, k;
        for (k = 8; k < len; k += 8) if (blocked(L, ox + dx * k, oy + dy * k)) { hit = k; break; }
        rayDots(g, L, ox, oy, dx, dy, hit, 26);
        if (hit < len) return;
        var x1 = ox + dx * len, x2 = ox + dx * ((431 - oy) / dy), pad = 16 + 12 / Math.abs(dy);
        zones.push([Math.min(x1, x2) - pad, Math.max(x1, x2) + pad]);
      });
      for (var gx = Math.floor(L.camX / 16) * 16 + 8; gx < L.camX + 800; gx += 16) {
        var bad = zones.some(function (z) { return gx >= z[0] && gx <= z[1]; });
        dot(g, gx - L.camX, 452 - L.camY, bad ? 4 : 3.5, bad ? '#ff3b3b' : '#3fe060');
      }
    }
    api.S('Active 10').concat(api.S('lazer')).forEach(function (e) {
      if (e.dead || !e.speed || (e.o.n === 'lazer' && !e.fromEye)) return;
      var a = e.dir * Math.PI / 16;
      rayDots(g, L, e.x, e.y, Math.cos(a), -Math.sin(a), Math.max(120, e.speed * 4), 22);
    });
  }
  function drawCheats(g, L) {
    var lab = api.sheet(5856), x = api.sheet(6326);
    if (lab) {
      g.drawImage(lab[0], lab[1][1], lab[1][2], lab[1][3], lab[1][4], CB[0], CB[1], lab[1][3], lab[1][4]);
      g.fillStyle = 'rgb(239,239,239)';
      g.fillRect(CB[0] + 15, CB[1] + 5, 50, 11);
      g.fillStyle = '#111';
      g.font = '900 10px "Arial Black", Arial, sans-serif';
      g.textAlign = 'left';
      g.textBaseline = 'alphabetic';
      g.fillText('CHEATS', CB[0] + 16, CB[1] + 14.5, 47);
    }
    if (CHEATS && x) g.drawImage(x[0], x[1][1], x[1][2], x[1][3], x[1][4], CB[0] + 3, CB[1] + 6, x[1][3], x[1][4]);
    if (!CHEATS) return;
    g.font = '900 11px "Arial Black", Arial, sans-serif';
    g.textAlign = 'center';
    for (var b = 0; b < 9; b++) {
      var bx = TPX + b * (TPW + TPG);
      g.fillStyle = '#3a3d44';
      g.fillRect(bx, CB[1] + 2, TPW, 16);
      g.fillStyle = 'rgb(239,239,239)';
      g.fillRect(bx + 1, CB[1] + 3, TPW - 2, 14);
      g.fillStyle = '#111';
      g.fillText(String(b + 1), bx + TPW / 2, CB[1] + 14.5);
    }
    g.textAlign = 'left';
    drawAttacks(g, L);
    var spk = function (n) { return api.S(n).some(function (e) { return !e.dead && (e.alt[0] > 0 || e.alt[1] > 0); }); };
    var trig = {}, HZ = { trigger: function () { return api.count('Active 6') > 0; }, 'trigger 7': function () { return api.count('Active 9') > 0; }, 'trigger 8': function () { return api.count('Active 9') > 0; }, 'trigger 5': function () { return spk('spikes'); }, 'trigger 6': function () { return spk('spikes 2'); } };
    ['trigger', 'trigger 5', 'trigger 6', 'trigger 7', 'trigger 8'].forEach(function (n) { api.S(n).forEach(function (e) { if (!e.dead) trig[n + ':' + e.x] = e; }); });
    ROUTES.forEach(function (r) {
      var key = r[0] + ':' + r[1], t = trig[key];
      if (!t) return;
      var f = FIRED[key];
      if (t.alt[0] !== 0 && !(f != null && (HZ[r[0]]() || L.loop - f < 30))) return;
      var cx = L.camX, cy = L.camY, i;
      if (r[1] - cx < -500 || r[1] - cx > 1300) return;
      for (i = 0; i < r[6].length; i += 2) dot(g, r[6][i] - cx, r[6][i + 1] - cy, 4, '#f4f4f4');
      for (i = 0; i < r[7].length; i += 2) dot(g, r[7][i] - cx, r[7][i + 1] - cy, 4.5, '#3fe060');
      g.beginPath(); g.arc(r[4] - cx, r[5] - cy, 10, 0, Math.PI * 2); g.lineWidth = 5; g.strokeStyle = '#0b0d12'; g.stroke(); g.lineWidth = 3; g.strokeStyle = '#3fe060'; g.stroke();
      dot(g, r[2] - cx, r[3] - cy, 8, '#ff3b3b');
    });
  }
  var api = window.CFGame({
    root: root,
    base: '/fwm/rainbow/',
    ver: '?v=1',
    title: null,
    play: 44,
    idleTicks: 30,
    overlay: function (g, L) { if (L && L.f === 44) drawCheats(g, L); },
    tapZone: function (x, y) { return y >= CB[1] - 6 && y <= CB[1] + CB[3] + 6 && x < (CHEATS ? TPX + 9 * (TPW + TPG) : CB[0] + CB[2]) + 4; },
    defaultReward: 43,
    codes: { ArrowLeft: 37, ArrowRight: 39, KeyZ: 90, KeyX: 88, KeyC: 67, Digit1: 49, Digit2: 50, Digit3: 51, Digit4: 52, Digit5: 53, Digit6: 54, Digit7: 55, Digit8: 56, Digit9: 57, Enter: 13, NumpadEnter: 13, Space: 32 },
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
        BEAM_UNTIL = -1;
        FIRED = {};
        TELE = -1;
        play('Rainbow2', 1, true);
        play('voice01', 2);
        each('Date & Time', function (e) { api.clock(e, 'reset'); api.clock(e, 'start'); });
      };

      EV[44] = function () {
        var R = down(39), Lf = down(37), Z = down(90), mp = api.mousePos();
        if (pressed(67) || (pressed(1) && mp.on && mp.x >= CB[0] && mp.x < CB[0] + CB[2] && mp.y >= CB[1] && mp.y < CB[1] + CB[3])) setCheats(!CHEATS);
        for (var dk = 1; dk <= 9; dk++) if (pressed(48 + dk)) TELE = dk - 1;
        if (CHEATS && pressed(1) && mp.on && mp.y >= CB[1] && mp.y < CB[1] + CB[3] && mp.x >= TPX && mp.x < TPX + 9 * (TPW + TPG)) { var tpn = Math.floor((mp.x - TPX) / (TPW + TPG)); if (mp.x - TPX - tpn * (TPW + TPG) < TPW) TELE = tpn; }
        if (TELE >= 0) {
          var flag = live('Active 5').sort(function (a, b) { return a.x - b.x; })[TELE], cpo = one('checkpoint'), thb = one('hit box');
          TELE = -1;
          if (CHEATS && flag && cpo && C('WIN') === 0) {
            setPos(cpo, flag.x + 15, 416);
            if (thb) {
              setPos(thb, cpo.x + 1, cpo.y - 16);
              CS('jumped', 0); CS('going up', 0); CS('fall', 0);
              ['trigger', 'trigger 2', 'trigger 5', 'trigger 6', 'trigger 7', 'trigger 8', 'trigger 9'].forEach(function (n) { alt(n, 0, 0); });
              alt('magic_rainbow', 1, 0);
              if (flag.x < 8322) alt('magic_rainbow', 6, 0);
              alt('Active 8', 0, 0); alt('Active 8', 1, 0);
              each('Active 9', destroy); each('Active 10', destroy); each('Active 6', destroy); each('Active 7', destroy); each('lazer', destroy);
              each('magic_rainbow', function (e) { setX(e, thb.x); });
              display(thb.x, thb.y - 58);
              play('respawn', 5);
            }
          }
        }
        ['trigger', 'trigger 5', 'trigger 6', 'trigger 7', 'trigger 8'].forEach(function (n) { S(n).forEach(function (e) { var k = n + ':' + e.x; if (e.alt[0] === 0) delete FIRED[k]; else if (FIRED[k] == null) FIRED[k] = api.frame().loop; }); });
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
          if (!(CHEATS && C('deaths') >= 32)) {
            for (var i = 0; i < 15; i++) create('blood', A, -4, -26);
            for (var j = 0; j < 7; j++) create('blood', A, 1, -48);
          }
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
        if (once('e52', count('hit box') === 0)) {
          var prevD = C('deaths');
          CA('deaths', 1);
          alt('magic_rainbow', 1, 0);
          if (CHEATS && prevD >= 33) CS('deaths', 33);
          else if (CHEATS && C('deaths') >= 33) CS('deaths', 32);
        }
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
          live('Active 3').forEach(function (e) { var lz = hb3 ? api.shootToward(e, 'lazer', 100, hb3.x, hb3.y) : null; if (lz) lz.fromEye = true; });
          play('rainbow', 6);
          live('Active 4').forEach(function (e) { var lz = hb3 ? api.shootToward(e, 'lazer', 100, hb3.x, hb3.y) : null; if (lz) lz.fromEye = true; });
        }
        if (C('WIN') === 1 && every('e134', 3000)) { G.found = C('found new') || 43; go(43); return; }
        if (C('game over') === 1 && every('e135', 2000)) { go('title'); return; }
        if (C('Counter') > 0 && every('e136', 1000)) CA('Counter', -1);
        var vmp = api.mousePos(), vlab = pressed(1) && vmp.on && vmp.x >= 4 && vmp.x < 74 && vmp.y >= 455 && vmp.y < 480 && live('Active 12').length > 0;
        if ((api.clicked('Active 12').length || vlab) && C('deaths') < 33) {
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
