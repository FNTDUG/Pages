(function () {
  var root = document.getElementById('fis');
  if (!root || !window.CFGame) return;
  var KT = 'ddf-tokens', KP = 'ddf-pearl', KG = 'ddf-got', START_TOKENS = 100;
  function load(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : (+v || 0); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) {} }
  var wallet = load(KT, START_TOKENS), pearls = load(KP, 0), gotByte = load(KG, 0);
  var stat = root.querySelector('.ddf-stat');
  function showStat() {
    if (!stat) return;
    stat.textContent = 'Faz Tokens: ' + wallet + ' · Pearls caught: ' + Math.min(pearls, 5) + ' / 5' + (gotByte ? ' · The Pearl unlocked' : '');
  }
  showStat();
  var PRIZE = [[1, 0, 1], [2, 12, 2], [3, 13, 5], [4, 14, 10], [5, 15, 20], [6, 16, 50], [7, 18, 100]];
  var api = window.CFGame({
    root: root,
    base: '/fwm/fishing/',
    ver: '?v=1',
    title: null,
    play: 18,
    idleTicks: 2,
    defaultReward: 'the-pearl',
    rewards: { 'the-pearl': ['The Pearl', 'the-pearl', 0, 'https://fnaf-world.fntduserguide.com/specs/bytes/the-pearl.webp', '/fwm/tech-specs/the-pearl', 'See it in the FWM Tech Specs'] },
    codes: { KeyA: 65, KeyD: 68, KeyS: 83, ArrowLeft: 65, ArrowRight: 68, ArrowDown: 83, Space: 83, Enter: 13, NumpadEnter: 13 },
    pad: { left: 65, right: 68, drop: 83 },
    tapZone: function () { var L = api && api.frame(); return !!L && L.f === 18; },
    endLine: function () { return 'You caught the Pearl 5 times at DeeDee’s Fishing Hole.'; },
    setup: function (api) {
      var S = api.S, O1 = api.O1, C = api.C, CS = api.CS, CA = api.CA, each = api.each, where = api.where, colSel = api.colSel, notCol = api.notCol, once = api.once, onceOnly = api.onceOnly, every = api.every, create = api.create, setPos = api.setPos, setDir = api.setDir, setSpeed = api.setSpeed, force = api.force, destroy = api.destroy, play = api.play, stopAll = api.stopAll, pressed = api.pressed, down = api.down, rnd = api.rnd, go = api.go, pick = api.pick, clicked = api.clicked, G = api.G;
      var START = {}, EV = {};
      function rel(e, to, dx, dy) { if (e && to) setPos(e, to.x + dx, to.y + dy); }
      function endCast() {
        var d = O1('drop');
        if (d) d.alt[0] = 2;
        each('left side', destroy);
        each('right side', destroy);
        each('bottom', destroy);
        each('Active 2', function (e) { e.alt[0] = 1; });
      }

      START[18] = function () {
        api.frame().mouseFrame = true;
        if (wallet < 10) { wallet = START_TOKENS; save(KT, wallet); }
        stopAll();
        play('City theme - Running lights draft1 loop', 1, true);
        each('item box', function (e) { e.alt[6] = 0; });
        each('pearl', function (e) { e.alt[0] = pearls; });
        CS('tokens', wallet);
        showStat();
      };

      EV[18] = function () {
        if (clicked('Active 2').length) { go('title'); return; }
        var box = O1('item box');
        each('Active 5', function (e) { rel(e, box, 0, 0); });
        if (box && clicked('item box').length && C('tokens') >= 10 && onceOnly('e63')) {
          CA('tokens', -10);
          wallet = C('tokens');
          save(KT, wallet);
          showStat();
          play('Cash_Register_Open_01', 13);
          box.alt[6] = 1;
        }
        if (box && box.alt[6] === 1 && every('e67', 500)) go(19);
      };

      START[19] = function () {
        stopAll();
        play('Water theme - Emerald Waterfalls', 1, true);
        each('pearl', function (e) { e.alt[0] = pearls; });
        for (var i = 0; i < 12; i++) pick(S('critter 4')).forEach(function (e) { setDir(e, 16); });
      };

      EV[19] = function () {
        var crit = function () { return where(S('critter 4'), function (e) { return !e.dead; }); };
        var drop = O1('drop'), rod = O1('Active 2'), pearl = O1('pearl'), pv = pearl ? pearl.alt[0] : 0;
        if (!drop) return;
        crit().forEach(function (e) { if (e.alt[0] === 0) { setSpeed(e, 5 + rnd(10)); e.alt[0] = 1; } });
        colSel(crit(), 'left side').a.forEach(function (e) { setDir(e, 0); e.alt[0] = 0; });
        colSel(crit(), 'right side').a.forEach(function (e) { setDir(e, 16); e.alt[0] = 0; });
        PRIZE.forEach(function (p) { colSel(crit(), 'prize line ' + p[0]).a.forEach(function (e) { force(e, p[1]); e.alt[0] = p[2]; }); });
        var hint = function () { each('Active 5', destroy); each('Active 6', destroy); };
        if (drop.alt[0] === 0 && !colSel([drop], 'left side').a.length && !(rod && colSel([rod], 'left side').a.length) && down(65)) { setPos(drop, drop.x - 10, drop.y); hint(); }
        if (drop.alt[0] === 0 && !colSel([drop], 'right side').a.length && !(rod && colSel([rod], 'right side').a.length) && down(68)) { setPos(drop, drop.x + 10, drop.y); hint(); }
        if (clicked('Active 4').length && drop.alt[0] === 0) drop.alt[0] = 1;
        if (drop.alt[0] === 1 && rod && rod.alt[0] === 0) { setPos(drop, drop.x, drop.y + 10); hint(); }
        var hb = O1('hitbox');
        var caught = hb ? colSel([hb], 'critter 4').b.filter(function (e) { return !e.dead; }) : [];
        if (caught.length && onceOnly('e28')) {
          var c = caught[0], v = c.alt[0];
          endCast();
          CS('won 2', v);
          var w = create('won', c, 16, -23);
          if (w) w.val = v;
          play('FANTASY_TONAL_SP_DSL31904', 2);
        }
        if (hb && colSel([hb], 'bottom').a.length) { endCast(); play('CARTOON_POP_DOUB_40013706', 2); }
        if (C('Counter') === 0) endCast();
        each('Active', function (e) { rel(e, drop, 1, -1); });
        if (hb) rel(hb, drop, 0, 40);
        if (drop.alt[0] === 0 && rod) rel(rod, drop, 1, -9);
        if (rod && rod.alt[0] === 1) crit().forEach(function (e) { setSpeed(e, 0); });
        if (every('e34', 1000) && C('Counter') > 0 && drop.alt[0] === 0) CA('Counter', -1);
        if (drop.alt[0] === 2) drop.alt[3] += 1;
        if (C('won 2') === 100) CS('got pearl', 1);
        [[4, 1], [3, 2], [2, 3], [1, 1], [0, 1], [0, 1]].forEach(function (r, i) {
          var ok = (r[0] === 0 ? pv === 0 : pv <= r[0]);
          var sel = ok ? colSel(crit(), 'prize line ' + r[1]).a : [];
          if (once('e' + (39 + i), sel.length > 0) && sel.length) pick(sel).forEach(destroy);
        });
        if (pressed(83) && drop.alt[0] === 0) drop.alt[0] = 1;
        if (rod) { each('Active 6', function (e) { rel(e, rod, -4, 56); }); each('Active 5', function (e) { rel(e, rod, 153, 56); }); }
        if (drop.alt[3] > 150 && onceOnly('e37')) {
          var won = C('won 2');
          wallet += won;
          save(KT, wallet);
          if (C('got pearl') === 1) { pearls += 1; save(KP, pearls); }
          showStat();
          if (pearls > 4 && !gotByte) {
            gotByte = 1;
            save(KG, 1);
            showStat();
            G.found = 'the-pearl';
            go('end');
            return;
          }
          go(18);
        }
      };

      return {
        START: START,
        EV: EV,
        QCOL: { 18: ['item box'], 19: ['critter 4', 'left side', 'right side', 'bottom', 'drop', 'Active 2', 'hitbox', 'prize line 1', 'prize line 2', 'prize line 3', 'prize line 4', 'prize line 5', 'prize line 6', 'prize line 7'] }
      };
    }
  });
  if (!api) return;
  window.DDF = api;
  api.state = function () {
    var L = api.frame();
    if (!L) return { frame: null };
    var d = api.O1('drop');
    return { frame: L.f, mode: api.mode(), t: L.loop, drop: d ? [d.x, d.y, d.alt[0], d.alt[3]] : null, counter: api.C('Counter'), won: api.C('won 2'), tokens: wallet, pearls: pearls, got: gotByte, critters: api.S('critter 4').filter(function (e) { return !e.dead; }).map(function (e) { return [e.x, e.y, e.alt[0], e.dir, e.speed]; }) };
  };
  api.wallet = function (t, p, g) { if (t != null) { wallet = t; save(KT, t); } if (p != null) { pearls = p; save(KP, p); } if (g != null) { gotByte = g; save(KG, g); } showStat(); };
})();
