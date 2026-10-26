(function () {
  var root = document.getElementById('fis');
  if (!root) return;
  var cv = root.querySelector('.fis-canvas'), g = cv.getContext('2d');
  var W = 384, H = 224, T = 16, STEP = 1000 / 60;
  cv.width = W;
  cv.height = H;

  var ART = {
    freddy: '', mouse: '', robot: '', laser: '', camera: '', seaweed: '', blob: '', tentacle: '', drone: '',
    metalman: '', boss: '', cupcake: '', heart: '', boost: '', door: ''
  };
  var IMG = {};
  Object.keys(ART).forEach(function (k) {
    if (!ART[k]) return;
    var i = new Image();
    i.src = ART[k];
    IMG[k] = i;
  });
  function art(k, x, y, w, h, flip) {
    var i = IMG[k];
    if (!i || !i.complete || !i.naturalWidth) return false;
    g.save();
    if (flip) {
      g.translate(x + w, y);
      g.scale(-1, 1);
      g.drawImage(i, 0, 0, w, h);
    } else g.drawImage(i, x, y, w, h);
    g.restore();
    return true;
  }

  var REWARDS = {
    none: { name: 'Coffee', id: 'coffee', img: 'https://fnaf-world.fntduserguide.com/idle/coffee.webp' },
    some: { name: 'Jack-O-Bonnie', id: 'jack-o-bonnie', img: 'https://fnaf-world.fntduserguide.com/idle/jack-o-bonnie.webp' },
    all: { name: 'Purple Guy', id: 'purple-guy', img: 'https://fnaf-world.fntduserguide.com/idle/purple-guy.webp' }
  };

  var LEVELS = [
    {
      name: 'Level 1: Rocky Planet', w: 120, h: 16, water: false, look: 'rock',
      ops: [
        ['P', 4, 14], ['m', 9, 14],
        ['s', 14, 24, 12, 13], ['L', 20, 1],
        ['r', 28, 14],
        ['s', 31, 32, 12, 13], ['s', 33, 38, 10, 10], ['C', 36, 10],
        ['e', 41, 44, 14, 14], ['H', 42, 15],
        ['c', 46, 1], ['m', 50, 14], ['r', 56, 14],
        ['J', 59, 14], ['s', 62, 63, 10, 13], ['s', 64, 65, 6, 13],
        ['L', 70, 1], ['s', 72, 73, 10, 13], ['o', 76, 81, 7], ['C', 79, 7], ['L', 75, 1], ['m', 78, 14],
        ['r', 86, 14], ['c', 90, 1], ['r', 95, 14], ['m', 98, 14],
        ['s', 102, 103, 10, 13], ['o', 105, 109, 6], ['C', 108, 6], ['H', 104, 10],
        ['E', 115, 14]
      ]
    },
    {
      name: 'Level 2: Under the Sea', w: 110, h: 20, water: true, look: 'sea',
      talk: ['Oh good, you found the underwater part.', 'Everybody loves the underwater part.'],
      ops: [
        ['P', 4, 18], ['t', 12, 18],
        ['s', 18, 22, 11, 17], ['k', 22, 11],
        ['b', 27, 8], ['s', 30, 31, 1, 9],
        ['s', 32, 38, 6, 6], ['C', 35, 6],
        ['t', 40, 18], ['k', 47, 18], ['H', 44, 18],
        ['s', 50, 60, 13, 17], ['k', 59, 13], ['b', 55, 7],
        ['s', 62, 63, 1, 12], ['b', 66, 9], ['t', 67, 18],
        ['s', 70, 80, 10, 17], ['C', 75, 10], ['k', 79, 10],
        ['b', 85, 6], ['t', 88, 18], ['k', 92, 18], ['H', 90, 18],
        ['o', 96, 100, 4], ['C', 98, 4],
        ['E', 106, 18]
      ]
    },
    {
      name: 'Level 3: The Code Vault', w: 130, h: 16, water: false, look: 'tech', arena: 106,
      ops: [
        ['P', 4, 14], ['c', 10, 1], ['d', 16, 5], ['c', 22, 1],
        ['s', 26, 27, 12, 13], ['o', 29, 33, 9], ['C', 31, 9],
        ['d', 36, 4], ['c', 40, 1], ['d', 46, 6], ['H', 44, 14],
        ['s', 48, 49, 10, 13], ['o', 51, 55, 6], ['C', 53, 6],
        ['M', 74, 14], ['D', 83, 14],
        ['c', 88, 1], ['d', 92, 5], ['s', 91, 91, 11, 13], ['o', 94, 97, 8], ['C', 95, 8], ['H', 97, 14],
        ['B', 122, 14]
      ]
    }
  ];

  var DEF = {
    m: { w: 14, h: 10, hp: 6, touch: 5 },
    r: { w: 20, h: 28, hp: 8, touch: 10, drop: 0.7 },
    L: { w: 12, h: 8, hp: 0, touch: 0 },
    c: { w: 14, h: 10, hp: 3, touch: 5 },
    k: { w: 14, h: 22, hp: 4, touch: 5 },
    b: { w: 16, h: 14, hp: 4, touch: 5 },
    t: { w: 12, h: 30, hp: 7, touch: 10, drop: 0.6 },
    d: { w: 18, h: 10, hp: 11, touch: 5 },
    M: { w: 30, h: 42, hp: 70, touch: 10, drop: 1 },
    B: { w: 56, h: 96, hp: 220, touch: 10 }
  };
  var PICK = { C: { w: 12, h: 12 }, J: { w: 14, h: 14 }, H: { w: 10, h: 9 } };

  var G = { mode: 'title', t: 0, lv: 0, cup: 0, boots: false, frames: 0 };
  var P = null, map = null, cur = null, ents = [], shots = [], foes = [], parts = [], picks = [], beams = [];
  var cam = { x: 0, y: 0 }, lockX = -1, banner = null, dlg = null, deadT = 0, fadeT = 0, endInfo = null, got = {}, check = null;
  var key = { left: false, right: false, down: false, jump: false, fire: false, jumpHit: false, fireHit: false, okHit: false };

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function hit(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
  function tile(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= cur.w || ty >= cur.h) return 1;
    return map[ty][tx];
  }
  function solid(v) { return v === 1 || v === 3; }

  function build(i, opt) {
    opt = opt || {};
    cur = LEVELS[i];
    G.lv = i;
    map = [];
    var x, y;
    for (y = 0; y < cur.h; y++) {
      map.push([]);
      for (x = 0; x < cur.w; x++) map[y].push(y === 0 || y >= cur.h - 2 || x < 2 || x >= cur.w - 2 ? 1 : 0);
    }
    ents = [];
    shots = [];
    foes = [];
    parts = [];
    picks = [];
    beams = [];
    lockX = -1;
    P = { x: 0, y: 0, w: 12, h: 22, vx: 0, vy: 0, face: 1, ground: false, crouch: false, hp: 100, inv: 0, cool: 0, swim: 0, walk: 0, kb: 0, kbx: 0 };
    cur.ops.forEach(function (o, n) {
      var k = o[0];
      if (k === 's' || k === 'e') {
        for (y = o[3]; y <= o[4]; y++) for (x = o[1]; x <= o[2]; x++) if (y >= 0 && y < cur.h && x >= 0 && x < cur.w) map[y][x] = k === 's' ? 1 : 0;
        return;
      }
      if (k === 'o') {
        for (x = o[1]; x <= o[2]; x++) map[o[3]][x] = 2;
        return;
      }
      if (k === 'D') {
        if (!opt.open) for (y = 1; y < o[2]; y++) map[y][o[1]] = 3;
        cur.gate = o[1];
        return;
      }
      if (k === 'P') {
        P.x = o[1] * T + 2;
        P.y = o[2] * T - P.h;
        return;
      }
      if (opt.skip && opt.skip[n]) return;
      if (PICK[k]) {
        picks.push({ k: k, n: n, w: PICK[k].w, h: PICK[k].h, x: o[1] * T + (T - PICK[k].w) / 2, y: o[2] * T - PICK[k].h - 2, t: rnd(0, 60) });
        return;
      }
      if (k === 'E') {
        picks.push({ k: 'E', n: n, w: 16, h: 32, x: o[1] * T, y: o[2] * T - 32, t: 0 });
        return;
      }
      var d = DEF[k];
      if (!d) return;
      var e = { k: k, n: n, w: d.w, h: d.h, hp: d.hp, max: d.hp, touch: d.touch, drop: d.drop || 0.3, vx: 0, vy: 0, cd: rnd(30, 90), t: rnd(0, 100), flash: 0, face: -1, on: k !== 'B' };
      e.x = o[1] * T + (T - d.w) / 2;
      if (k === 'L' || k === 'c') e.y = o[2] * T;
      else if (k === 'b' || k === 'd') e.y = o[2] * T - d.h / 2;
      else e.y = o[2] * T - d.h;
      if (k === 'm') e.vx = -0.6;
      if (k === 'b') { e.vx = 0.7; e.vy = 0.55; }
      if (k === 'd') { e.vx = 0.8; e.home = e.x; }
      if (k === 'M') e.vx = -0.8;
      if (k === 'B') e.x = o[1] * T - 20;
      ents.push(e);
    });
    if (opt.x != null) { P.x = opt.x; P.y = opt.y; }
    got = {};
    if (opt.skip) for (var s in opt.skip) got[s] = 1;
    snapCam();
    banner = { text: cur.name, t: 150 };
  }

  function snapCam() {
    cam.x = Math.max(0, Math.min(cur.w * T - W, P.x + P.w / 2 - W / 2));
    cam.y = Math.max(0, Math.min(cur.h * T - H, P.y + P.h / 2 - H / 2 - 10));
  }

  function moveX(o, dx) {
    o.x += dx;
    var t0 = Math.floor(o.y / T), t1 = Math.floor((o.y + o.h - 1) / T), tx, ty;
    if (dx > 0) {
      tx = Math.floor((o.x + o.w - 1) / T);
      for (ty = t0; ty <= t1; ty++) if (solid(tile(tx, ty))) { o.x = tx * T - o.w; return true; }
    } else if (dx < 0) {
      tx = Math.floor(o.x / T);
      for (ty = t0; ty <= t1; ty++) if (solid(tile(tx, ty))) { o.x = (tx + 1) * T; return true; }
    }
    return false;
  }
  function moveY(o, dy) {
    var bottom = o.y + o.h;
    o.y += dy;
    var t0 = Math.floor(o.x / T), t1 = Math.floor((o.x + o.w - 1) / T), tx, ty, v;
    if (dy > 0) {
      ty = Math.floor((o.y + o.h - 1) / T);
      for (tx = t0; tx <= t1; tx++) {
        v = tile(tx, ty);
        if (solid(v) || (v === 2 && bottom <= ty * T + 0.01)) { o.y = ty * T - o.h; return 1; }
      }
    } else if (dy < 0) {
      ty = Math.floor(o.y / T);
      for (tx = t0; tx <= t1; tx++) if (solid(tile(tx, ty))) { o.y = (ty + 1) * T; return -1; }
    }
    return 0;
  }
  function boxFree(x, y, w, h) {
    for (var ty = Math.floor(y / T); ty <= Math.floor((y + h - 1) / T); ty++)
      for (var tx = Math.floor(x / T); tx <= Math.floor((x + w - 1) / T); tx++) if (solid(tile(tx, ty))) return false;
    return true;
  }

  var ac = null, muted = false;
  try { muted = localStorage.getItem('fis-mute') === '1'; } catch (e) {}
  function audio() {
    if (ac) return ac;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { ac = new C(); } catch (e) { ac = null; }
    return ac;
  }
  var SND = {
    shoot: ['square', 900, 500, 0.06, 0.035], jump: ['square', 260, 620, 0.12, 0.04], hurt: ['sawtooth', 240, 70, 0.22, 0.06],
    hit: ['square', 260, 140, 0.05, 0.035], tink: ['triangle', 1500, 1300, 0.04, 0.03], pick: ['triangle', 660, 1400, 0.25, 0.06],
    star: ['triangle', 500, 900, 0.08, 0.025], warn: ['square', 520, 520, 0.08, 0.02], boom: ['noise', 0, 0, 0.35, 0.09], door: ['triangle', 300, 900, 0.4, 0.05]
  };
  function snd(k) {
    if (muted) return;
    var a = audio(), s = SND[k];
    if (!a || !s) return;
    if (a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    var t = a.currentTime, v = a.createGain();
    v.gain.setValueAtTime(s[4], t);
    v.gain.exponentialRampToValueAtTime(0.0001, t + s[3]);
    v.connect(a.destination);
    if (s[0] === 'noise') {
      var n = Math.floor(a.sampleRate * s[3]), b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var src = a.createBufferSource();
      src.buffer = b;
      src.connect(v);
      src.start(t);
      return;
    }
    var o = a.createOscillator();
    o.type = s[0];
    o.frequency.setValueAtTime(s[1], t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, s[2]), t + s[3]);
    o.connect(v);
    o.start(t);
    o.stop(t + s[3] + 0.02);
  }

  function puff(x, y, n, col, sp) {
    for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: rnd(-sp, sp), vy: rnd(-sp, sp), life: rnd(14, 30), c: col });
  }

  function hurt(n, fx) {
    if (P.inv > 0 || G.mode !== 'play') return;
    P.hp -= n;
    P.inv = 60;
    P.kb = 10;
    P.kbx = fx < P.x + P.w / 2 ? 1.6 : -1.6;
    P.vy = cur.water ? -1.5 : -2.5;
    snd('hurt');
    puff(P.x + P.w / 2, P.y + 8, 6, '#ff6a6a', 1.5);
    if (P.hp <= 0) {
      P.hp = 0;
      G.mode = 'dead';
      deadT = 0;
      snd('boom');
      puff(P.x + P.w / 2, P.y + P.h / 2, 30, '#ffb347', 2.5);
    }
  }

  function fire() {
    var n = G.cup, size = n >= 6 ? 3 : n >= 3 ? 2 : 1;
    shots.push({ x: P.face > 0 ? P.x + P.w : P.x - 6, y: P.y + (P.crouch ? 5 : 9) - (size - 1), w: 6 + size * 2, h: 1 + size, vx: 4.5 * P.face, left: 90 + n * 25, dmg: 1 + n * 0.15, size: size });
    snd('shoot');
  }

  function foeShot(x, y, vx, vy, kind) {
    foes.push({ x: x - 3, y: y - 3, w: kind === 'star' ? 8 : 6, h: kind === 'beam' ? 10 : kind === 'star' ? 8 : 4, vx: vx, vy: vy, k: kind || 'ball', t: 0 });
    if (kind === 'beam') { foes[foes.length - 1].w = 3; }
  }

  function aimAt(e, sp) {
    var dx = P.x + P.w / 2 - (e.x + e.w / 2), dy = P.y + P.h / 2 - (e.y + e.h / 2), l = Math.sqrt(dx * dx + dy * dy) || 1;
    return [dx / l * sp, dy / l * sp];
  }

  function updPlayer() {
    var water = cur.water;
    var want = key.down && P.ground;
    if (want && !P.crouch) { P.y += 8; P.h = 14; P.crouch = true; }
    else if (!want && P.crouch && boxFree(P.x, P.y - 8, P.w, 8)) { P.y -= 8; P.h = 22; P.crouch = false; }
    var ax = (key.right ? 1 : 0) - (key.left ? 1 : 0);
    if (ax) P.face = ax;
    if (P.crouch) ax = 0;
    P.vx = ax * (water ? 1.25 : 1.6);
    if (P.kb > 0) { P.kb--; P.vx = P.kbx; }
    if (P.swim > 0) P.swim--;
    var jv = water ? (P.boots ? 4.1 : 3.6) : (P.boots ? 7.3 : 5.6);
    if (key.jumpHit && !P.crouch && (P.ground || (water && P.swim <= 0))) {
      P.vy = -jv;
      P.ground = false;
      P.swim = 16;
      snd('jump');
    }
    if (!water && !key.jump && P.vy < -1.5) P.vy = -1.5;
    P.vy = Math.min(water ? 2.2 : 6, P.vy + (water ? 0.16 : 0.35));
    moveX(P, P.vx);
    var r = moveY(P, P.vy);
    if (r === 1) { P.ground = true; P.vy = 0; }
    else { P.ground = false; if (r === -1) P.vy = 0; }
    P.walk = P.ground && P.vx ? P.walk + 1 : 0;
    if (P.cool > 0) P.cool--;
    if (key.fire && P.cool <= 0) { fire(); P.cool = Math.max(9, 18 - G.cup); }
    if (P.inv > 0) P.inv--;
  }

  function updShots() {
    var i, s, j, e;
    for (i = shots.length - 1; i >= 0; i--) {
      s = shots[i];
      s.x += s.vx;
      s.left -= Math.abs(s.vx);
      var gone = s.left <= 0 || solid(tile(Math.floor((s.x + s.w / 2) / T), Math.floor((s.y + s.h / 2) / T)));
      if (!gone) for (j = 0; j < ents.length; j++) {
        e = ents[j];
        if (e.dying || !hit(s, e) || (e.k === 'B' && !e.on)) continue;
        gone = true;
        if (e.k === 'L') { snd('tink'); puff(s.x, s.y, 3, '#ffffff', 1); break; }
        e.hp -= s.dmg;
        e.flash = 6;
        snd('hit');
        puff(s.x + (s.vx > 0 ? s.w : 0), s.y, 3, '#ffe27a', 1.2);
        if (e.hp <= 0) kill(e);
        break;
      }
      if (gone) { if (s.left > 0) puff(s.x + s.w / 2, s.y, 2, '#9ff', 0.8); shots.splice(i, 1); }
    }
    for (i = foes.length - 1; i >= 0; i--) {
      s = foes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.t++;
      var out = s.t > 400 || solid(tile(Math.floor((s.x + s.w / 2) / T), Math.floor((s.y + s.h / 2) / T)));
      if (!out && hit(s, P)) { hurt(3, s.x); out = true; }
      if (out) foes.splice(i, 1);
    }
  }

  function kill(e) {
    e.hp = 0;
    if (e.k === 'B') { e.dying = 1; G.mode = 'boom'; fadeT = 0; foes = []; beams = []; return; }
    e.dead = true;
    snd('boom');
    puff(e.x + e.w / 2, e.y + e.h / 2, e.k === 'M' ? 40 : 14, '#ffb347', e.k === 'M' ? 3 : 2);
    if (Math.random() < e.drop) picks.push({ k: 'H', n: -1, w: 10, h: 9, x: e.x + e.w / 2 - 5, y: e.y + e.h / 2, vy: -1.5, fall: true, life: 600, t: 0 });
    if (e.k === 'M') {
      got[e.n] = 1;
      for (var y = 1; y < cur.h; y++) if (map[y][cur.gate] === 3) map[y][cur.gate] = 0;
      banner = { text: 'The way is open!', t: 120 };
    }
  }

  function near(e, dx, dy) {
    return Math.abs(P.x + P.w / 2 - (e.x + e.w / 2)) < dx && Math.abs(P.y + P.h / 2 - (e.y + e.h / 2)) < dy;
  }

  function updEnts() {
    for (var i = ents.length - 1; i >= 0; i--) {
      var e = ents[i];
      if (e.dead) { ents.splice(i, 1); continue; }
      if (e.flash > 0) e.flash--;
      e.t++;
      if (e.dying) continue;
      if (e.cd > 0) e.cd--;
      var k = e.k;
      if (k === 'm') {
        e.vy = Math.min(5, e.vy + 0.35);
        if (moveY(e, e.vy) === 1) e.vy = 0;
        var ahead = e.vx < 0 ? e.x - 1 : e.x + e.w + 1;
        if (moveX(e, e.vx) || !solid(tile(Math.floor(ahead / T), Math.floor((e.y + e.h + 2) / T))) && tile(Math.floor(ahead / T), Math.floor((e.y + e.h + 2) / T)) !== 2) e.vx = -e.vx;
      } else if (k === 'r') {
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0 && near(e, 220, 60)) { foeShot(e.x + e.w / 2 + e.face * 10, e.y + 10, 2.2 * e.face, 0); e.cd = 100; snd('star'); }
      } else if (k === 'L') {
        if (e.cd <= 0 && near(e, 230, 400)) { foeShot(e.x + e.w / 2, e.y + e.h + 4, 0, 4, 'beam'); e.cd = 75; }
      } else if (k === 'c') {
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0 && near(e, 200, 260)) { foeShot(e.x + e.w / 2, e.y + e.h, 1.6 * e.face, 1.6); e.cd = 110; snd('star'); }
      } else if (k === 'k') {
        if (e.cd <= 0 && near(e, 260, 120)) { foeShot(e.x, e.y + 8, -2, 0); e.cd = 80; }
      } else if (k === 'b') {
        if (moveX(e, e.vx)) e.vx = -e.vx;
        if (moveY(e, e.vy)) e.vy = -e.vy;
      } else if (k === 'd') {
        if (moveX(e, e.vx) || Math.abs(e.x - e.home) > 80) { e.vx = -e.vx; e.x += e.vx * 2; }
        if (e.cd <= 0 && near(e, 120, 260) && P.y > e.y) { foeShot(e.x + e.w / 2, e.y + e.h + 2, 0, 3, 'beam'); e.cd = 70; }
      } else if (k === 'M') {
        if (!near(e, 260, 200)) continue;
        e.vy = Math.min(5, e.vy + 0.35);
        if (moveY(e, e.vy) === 1) e.vy = 0;
        if (moveX(e, e.vx) || e.t % 150 === 0) e.vx = -e.vx;
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0) {
          var a = aimAt(e, 2.1), sp = e.hp < e.max / 2;
          foeShot(e.x + e.w / 2, e.y + 12, a[0], a[1], 'star');
          if (sp) { foeShot(e.x + e.w / 2, e.y + 12, a[0] * 0.9 - a[1] * 0.35, a[1] * 0.9 + a[0] * 0.35, 'star'); foeShot(e.x + e.w / 2, e.y + 12, a[0] * 0.9 + a[1] * 0.35, a[1] * 0.9 - a[0] * 0.35, 'star'); }
          e.cd = sp ? 70 : 60;
          snd('star');
        }
      } else if (k === 'B' && e.on) {
        var hard = e.hp < e.max / 2;
        if (e.cd <= 0) {
          var b = aimAt(e, hard ? 2.4 : 2);
          foeShot(e.x + 10, e.y + 30, b[0], b[1], 'star');
          e.cd = hard ? 50 : 70;
          snd('star');
        }
        e.bomb = (e.bomb || 160) - 1;
        if (e.bomb <= 0) {
          var n = hard ? 4 : 3, xs = [P.x + P.w / 2], lo = lockX + 24, hi = e.x - 20;
          while (xs.length < n) xs.push(rnd(lo, hi));
          xs.forEach(function (x) { beams.push({ x: x - 5, t: 0 }); });
          e.bomb = hard ? 200 : 260;
          snd('warn');
        }
      }
      if (e.touch && hit(e, P)) hurt(e.touch, e.x + e.w / 2);
    }
    for (var j = beams.length - 1; j >= 0; j--) {
      var bm = beams[j];
      bm.t++;
      if (bm.t > 50 && bm.t < 76 && P.x < bm.x + 10 && P.x + P.w > bm.x) hurt(3, bm.x + 5);
      if (bm.t === 50) snd('shoot');
      if (bm.t >= 76) beams.splice(j, 1);
    }
  }

  function updPicks() {
    for (var i = picks.length - 1; i >= 0; i--) {
      var p = picks[i];
      p.t++;
      if (p.fall) {
        p.vy = Math.min(3, p.vy + 0.2);
        if (moveY(p, p.vy) === 1) p.vy = 0;
        if (--p.life <= 0) { picks.splice(i, 1); continue; }
      }
      if (!hit(p, P)) continue;
      if (p.k === 'E') { snd('door'); G.mode = 'fade'; fadeT = 0; return; }
      if (p.k === 'H') { if (P.hp >= 100) continue; P.hp = Math.min(100, P.hp + 10); snd('pick'); }
      if (p.k === 'C') { G.cup = Math.min(9, G.cup + 1); banner = { text: 'Blaster upgraded! ' + G.cup + '/9', t: 140 }; snd('pick'); }
      if (p.k === 'J') { P.boots = G.boots = true; banner = { text: 'Jump Boost! You can jump higher', t: 160 }; snd('pick'); }
      if (p.n >= 0) got[p.n] = 1;
      puff(p.x + p.w / 2, p.y + p.h / 2, 10, p.k === 'H' ? '#ff6a8a' : '#fff27a', 1.5);
      picks.splice(i, 1);
    }
  }

  function updCam() {
    var tx = P.x + P.w / 2 - W / 2 + P.face * 24, ty = P.y + P.h / 2 - H / 2 - 10;
    cam.x += (tx - cam.x) * 0.12;
    cam.y += (ty - cam.y) * 0.12;
    if (lockX >= 0) cam.x = Math.max(cam.x, Math.min(lockX, cur.w * T - W));
    cam.x = Math.max(0, Math.min(cur.w * T - W, cam.x));
    cam.y = Math.max(0, Math.min(cur.h * T - H, cam.y));
  }

  function arena() {
    if (!cur.arena || lockX >= 0 || P.x < cur.arena * T + 8) return;
    lockX = cur.w * T - W;
    for (var y = 1; y < cur.h - 2; y++) map[y][cur.arena - 1] = 3;
    var skip = {};
    for (var s in got) skip[s] = 1;
    ents.forEach(function (e) { if (e.k !== 'B') skip[e.n] = 1; });
    check = { lv: G.lv, x: P.x, y: P.y, cup: G.cup, boots: P.boots, skip: skip };
    talk(['So. You found your way into FNaF 57.', 'It does not come out until 2030. You are early.', 'Leave the code with me and nobody gets deleted.'], function () {
      ents.forEach(function (e) { if (e.k === 'B') e.on = true; });
    });
  }

  function talk(lines, after) {
    dlg = { lines: lines, i: 0, ch: 0, after: after };
    G.mode = 'dialog';
  }

  function startLevel(i, carry) {
    var boots = G.boots;
    build(i);
    P.boots = boots;
    if (carry && carry.hp) P.hp = carry.hp;
    G.cupAt = G.cup;
    G.bootsAt = boots;
    check = null;
    G.mode = 'play';
    if (cur.talk) talk(cur.talk, null);
  }

  function retry() {
    if (check && check.lv === G.lv) {
      build(G.lv, { skip: check.skip, open: true, x: check.x, y: check.y });
      G.cup = check.cup;
      P.boots = G.boots = check.boots;
      banner = null;
      G.mode = 'play';
      check = null;
      arena();
      return;
    }
    G.cup = G.cupAt;
    G.boots = G.bootsAt;
    startLevel(G.lv, null);
    P.boots = G.boots;
  }

  function step() {
    G.t++;
    if (G.mode === 'play') {
      G.frames++;
      updPlayer();
      updShots();
      updEnts();
      updPicks();
      arena();
      updCam();
    } else if (G.mode === 'dialog') {
      var line = dlg.lines[dlg.i];
      if (dlg.ch < line.length) {
        dlg.ch += 1;
        if (key.okHit) dlg.ch = line.length;
      } else if (key.okHit) {
        dlg.i++;
        dlg.ch = 0;
        if (dlg.i >= dlg.lines.length) {
          G.mode = 'play';
          var f = dlg.after;
          dlg = null;
          if (f) f();
        }
      }
    } else if (G.mode === 'dead') {
      deadT++;
      if (deadT > 70 && key.okHit) retry();
    } else if (G.mode === 'fade') {
      fadeT++;
      if (fadeT === 40) {
        if (G.lv + 1 < LEVELS.length) startLevel(G.lv + 1, { hp: P.hp });
        fadeT = 41;
      }
      if (fadeT > 60 && G.mode === 'fade') G.mode = 'play';
    } else if (G.mode === 'boom') {
      fadeT++;
      var bs = ents.filter(function (e) { return e.k === 'B'; })[0];
      if (bs && fadeT % 6 === 0) { puff(bs.x + rnd(0, bs.w), bs.y + rnd(0, bs.h), 10, fadeT % 12 ? '#ffb347' : '#ffffff', 2.5); snd('boom'); }
      if (fadeT === 110) {
        ents = ents.filter(function (e) { return e.k !== 'B'; });
        talk(['...Fine. Take your code.', 'I will just start working on FNaF 58.'], finish);
      }
    }
    for (var i = parts.length - 1; i >= 0; i--) {
      var q = parts[i];
      q.x += q.vx;
      q.y += q.vy;
      q.vx *= 0.94;
      q.vy *= 0.94;
      if (--q.life <= 0) parts.splice(i, 1);
    }
    if (banner && --banner.t <= 0) banner = null;
    key.jumpHit = key.fireHit = key.okHit = false;
  }

  function finish() {
    G.mode = 'end';
    var r = G.cup === 0 ? REWARDS.none : G.cup >= 9 ? REWARDS.all : REWARDS.some;
    endInfo = { reward: r, cup: G.cup, time: G.frames / 60 };
    var best = null;
    try { best = JSON.parse(localStorage.getItem('fis-best') || 'null'); } catch (e) {}
    if (!best || G.cup > best.cup || (G.cup === best.cup && endInfo.time < best.time)) {
      try { localStorage.setItem('fis-best', JSON.stringify({ cup: G.cup, time: endInfo.time })); } catch (e) {}
      endInfo.best = true;
    }
    showEnd();
  }

  var LOOK = {
    rock: { sky: ['#0b0820', '#2a1440'], tile: '#5a3d58', top: '#9b7590', dark: '#3a2638', far: '#241532' },
    sea: { sky: ['#03202b', '#0b4a57'], tile: '#1d5050', top: '#4fb3a0', dark: '#0f3434', far: '#08303a' },
    tech: { sky: ['#070b18', '#16203a'], tile: '#454f66', top: '#93a2c0', dark: '#2a3144', far: '#121a2e' }
  };
  var STARS = [];
  for (var si = 0; si < 90; si++) STARS.push([rnd(0, 800), rnd(0, 300), Math.random() < 0.2 ? 2 : 1, rnd(0.1, 0.4)]);

  function px(x, y, w, h, c) {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), w, h);
  }

  function drawBg() {
    var L = LOOK[cur ? cur.look : 'rock'], gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, L.sky[0]);
    gr.addColorStop(1, L.sky[1]);
    g.fillStyle = gr;
    g.fillRect(0, 0, W, H);
    var cx = cur ? cam.x : G.t * 0.5;
    STARS.forEach(function (s) {
      var x = ((s[0] - cx * s[3]) % 800 + 800) % 800, y = s[1] % H;
      if (x < W) px(x, y, s[2], s[2], cur && cur.look === 'sea' ? 'rgba(160,255,240,.35)' : 'rgba(255,255,255,.75)');
    });
    if (!cur) return;
    g.fillStyle = L.far;
    var off = -(cam.x * 0.35) % 96;
    for (var x = off - 96; x < W + 96; x += 48) {
      var hgt = 40 + ((Math.floor((x - off) / 48) * 37) % 50 + 50) % 50;
      if (cur.look === 'tech') g.fillRect(Math.round(x), H - hgt - 30, 30, hgt + 30);
      else {
        g.beginPath();
        g.moveTo(x, H);
        g.lineTo(x + 30, H - hgt - 20);
        g.lineTo(x + 70, H);
        g.fill();
      }
    }
    if (cur.look === 'sea') {
      for (var b = 0; b < 14; b++) {
        var bx = (b * 61 - cam.x * 0.6) % (W + 40);
        if (bx < -20) bx += W + 40;
        var by = H - ((G.t * (0.4 + (b % 3) * 0.2) + b * 47) % (H + 20));
        g.strokeStyle = 'rgba(180,255,245,.35)';
        g.beginPath();
        g.arc(bx, by, 2 + (b % 3), 0, 6.3);
        g.stroke();
      }
    }
  }

  function drawMap() {
    var L = LOOK[cur.look], x0 = Math.floor(cam.x / T), y0 = Math.floor(cam.y / T), x, y, v, sx, sy;
    for (y = y0; y <= y0 + H / T + 1; y++) for (x = x0; x <= x0 + W / T + 1; x++) {
      v = tile(x, y);
      if (!v || y >= cur.h || x >= cur.w || x < 0 || y < 0) continue;
      sx = Math.round(x * T - cam.x);
      sy = Math.round(y * T - cam.y);
      if (v === 2) {
        px(sx, sy, T, 5, L.top);
        px(sx, sy + 5, T, 2, L.dark);
        continue;
      }
      if (v === 3) {
        px(sx + 3, sy, 10, T, '#3b0f1a');
        px(sx + 5, sy, 6, T, (G.t >> 3) % 2 ? '#ff4d6a' : '#ff8a5c');
        continue;
      }
      px(sx, sy, T, T, L.tile);
      if (!solid(tile(x, y - 1)) && tile(x, y - 1) !== 2) px(sx, sy, T, 3, L.top);
      if (!solid(tile(x, y + 1))) px(sx, sy + T - 2, T, 2, L.dark);
      if (cur.look === 'tech') { px(sx + 2, sy + 5, 2, 2, L.dark); px(sx + 12, sy + 5, 2, 2, L.dark); }
      else if ((x * 7 + y * 13) % 5 === 0) px(sx + 5 + (x % 3) * 2, sy + 7, 3, 2, L.dark);
    }
  }

  function drawFreddy(x, y, crouch, face, walk, inAir) {
    if (art('freddy', x - 2, y - 2, 16, crouch ? 16 : 24, face < 0)) return;
    var f = face, cx = x + 6, top = crouch ? y - 6 : y;
    var leg = walk ? (Math.floor(walk / 6) % 2 ? 2 : -2) : 0;
    if (!crouch) {
      px(cx - 4, y + 17, 3, 5 + (inAir ? -1 : 0), '#6b3a1f');
      px(cx + 1, y + 17, 3, 5, '#6b3a1f');
      if (leg) { px(cx - 4 + leg, y + 20, 3, 2, '#3d2010'); }
      px(cx - 5, y + 9, 10, 9, '#8a4b2a');
      px(cx - 3, y + 11, 6, 5, '#c8885a');
      px(cx - 2, y + 9, 4, 2, '#111');
    } else {
      px(cx - 6, y + 4, 12, 8, '#8a4b2a');
      px(cx - 3, y + 6, 6, 4, '#c8885a');
    }
    px(cx - 5, top, 10, 9, '#8a4b2a');
    px(cx - 6, top - 2, 3, 3, '#8a4b2a');
    px(cx + 3, top - 2, 3, 3, '#8a4b2a');
    px(cx - 3, top - 5, 6, 4, '#151515');
    px(cx - 4, top - 2, 8, 1, '#151515');
    px(cx + (f > 0 ? 0 : -4), top + 5, 4, 3, '#d9a070');
    px(cx + (f > 0 ? 1 : -3), top + 2, 2, 2, '#3fb7ff');
    px(cx + (f > 0 ? 3 : -5), top + 5, 2, 1, '#222');
    var gy = crouch ? y + 5 : y + 9;
    px(f > 0 ? cx + 4 : cx - 10, gy, 6, 3, '#9aa6b8');
    px(f > 0 ? cx + 9 : cx - 11, gy, 2, 2, '#5ff');
    g.strokeStyle = 'rgba(190,240,255,.65)';
    g.beginPath();
    g.arc(Math.round(cx), Math.round(top + 3), 9, 0, 6.3);
    g.stroke();
    g.fillStyle = 'rgba(190,240,255,.12)';
    g.fill();
  }

  function drawEnt(e) {
    var x = Math.round(e.x - cam.x), y = Math.round(e.y - cam.y), k = e.k, fl = e.flash > 0 && (e.flash & 2);
    if (x > W + 60 || x + e.w < -60) return;
    if (fl) { px(x, y, e.w, e.h, '#ffffff'); return; }
    var map2 = { m: 'mouse', r: 'robot', L: 'laser', c: 'camera', k: 'seaweed', b: 'blob', t: 'tentacle', d: 'drone', M: 'metalman', B: 'boss' };
    if (art(map2[k], x, y, e.w, e.h, e.face > 0)) return;
    var t = e.t;
    if (k === 'm') {
      px(x + 1, y + 2, 12, 6, '#9aa0ad');
      px(x + (e.vx < 0 ? 0 : 10), y, 4, 5, '#c7ccd6');
      px(x + (e.vx < 0 ? 1 : 11), y - 2, 1, 2, '#c7ccd6');
      px(x + (e.vx < 0 ? 3 : 13), y - 2, 1, 2, '#c7ccd6');
      px(x + 3, y + 8, 2, 2, '#444');
      px(x + 9 + ((t >> 3) % 2), y + 8, 2, 2, '#444');
      px(x + (e.vx < 0 ? 1 : 12), y + 2, 1, 1, '#ff4040');
    } else if (k === 'r') {
      px(x + 2, y + 6, 16, 16, '#3d4658');
      px(x + 4, y, 12, 8, '#4d586e');
      px(x + 5 + (e.face > 0 ? 2 : 0), y + 2, 3, 3, '#7dff6a');
      px(x + 10 + (e.face > 0 ? 2 : 0), y + 2, 3, 3, '#7dff6a');
      var on = (t >> 4) % 2;
      px(x + 5, y + 9, 4, 4, on ? '#ffd23f' : '#7a5c10');
      px(x + 11, y + 9, 4, 4, on ? '#7a5c10' : '#ffd23f');
      px(x + 5, y + 15, 4, 4, on ? '#7a5c10' : '#40c0ff');
      px(x + 11, y + 15, 4, 4, on ? '#40c0ff' : '#10507a');
      px(x, y + 22, 8, 6, '#2b3242');
      px(x + 12, y + 22, 8, 6, '#2b3242');
      px(e.face > 0 ? x + 18 : x - 3, y + 9, 5, 5, '#5a667e');
    } else if (k === 'L') {
      px(x, y, 12, 5, '#5b6274');
      px(x + 3, y + 5, 6, 3, e.cd < 15 && (t >> 1) % 2 ? '#ffffff' : '#ff3b5c');
    } else if (k === 'c') {
      px(x + 6, y - 2, 2, 3, '#333');
      px(x, y, 14, 7, '#8b93a3');
      px(x + (e.face > 0 ? 9 : 1), y + 5, 4, 4, '#2a2f3a');
      px(x + (e.face > 0 ? 10 : 2), y + 6, 2, 2, '#ff3b3b');
    } else if (k === 'k') {
      for (var s = 0; s < 4; s++) px(x + 4 + Math.round(Math.sin((t + s * 9) / 9) * 2), y + 4 + s * 5, 7, 6, s % 2 ? '#2f8f3a' : '#3fae4a');
      px(x + 3, y + 2, 9, 6, '#3fae4a');
      px(x + 4, y + 3, 3, 3, '#111');
      px(x + 8, y + 3, 3, 3, '#111');
      px(x + 5, y + 4, 1, 1, '#ffe14d');
      px(x + 9, y + 4, 1, 1, '#ffe14d');
    } else if (k === 'b') {
      var c1 = (t >> 4) % 2 ? '#ff7ad9' : '#6ab8ff', c2 = (t >> 4) % 2 ? '#6ab8ff' : '#ff7ad9';
      g.fillStyle = c1;
      g.beginPath(); g.arc(x + 6, y + 7, 6, 0, 6.3); g.fill();
      g.fillStyle = c2;
      g.beginPath(); g.arc(x + 11, y + 6, 5, 0, 6.3); g.fill();
      g.beginPath(); g.arc(x + 9, y + 11, 3, 0, 6.3); g.fill();
    } else if (k === 't') {
      for (var q = 0; q < 6; q++) px(x + 3 + Math.round(Math.sin((t + q * 7) / 11) * (q / 2)), y + q * 5, 7 - (q < 2 ? 2 : 0), 6, q % 2 ? '#7b3aa8' : '#9a52cc');
      px(x + 5, y + 2, 2, 2, '#ffe14d');
    } else if (k === 'd') {
      px(x, y + 3, 18, 5, '#8b93a3');
      px(x + 5, y, 8, 4, '#b8c0cf');
      px(x + 8, y + 8, 2, 2, (t >> 3) % 2 ? '#ff3b3b' : '#ffd23f');
    } else if (k === 'M') {
      var bob = (t >> 3) % 2;
      px(x + 2, y + 34, 26, 8, '#9aa3b4');
      for (var sp = 0; sp < 6; sp++) px(x + 2 + sp * 5, y + 40, 3, 2, '#e6ecf5');
      px(x + 6, y + 14 + bob, 18, 20, '#c3cad8');
      px(x + 9, y + 18 + bob, 12, 3, '#7b8496');
      px(x + 8, y + 2 + bob, 14, 12, '#d9dfe9');
      px(x + 10 + (e.face > 0 ? 3 : 0), y + 6 + bob, 3, 3, '#111');
      px(x + 15 + (e.face > 0 ? 3 : 0), y + 6 + bob, 3, 3, '#111');
      px(e.face > 0 ? x + 24 : x - 4, y + 16 + bob, 10, 4, '#7b8496');
      px(e.face > 0 ? x + 30 : x - 6, y + 15 + bob, 4, 6, '#4b5263');
    } else if (k === 'B') {
      px(x + 6, y + 84, 44, 12, '#454f66');
      px(x + 10, y + 78, 36, 8, '#5b6680');
      g.fillStyle = 'rgba(120,230,255,.18)';
      g.fillRect(x + 8, y + 10, 40, 70);
      g.strokeStyle = 'rgba(160,240,255,.7)';
      g.strokeRect(x + 8.5, y + 10.5, 39, 69);
      px(x + 14, y, 4, 12, '#6b7790');
      px(x + 26, y - 6, 4, 18, '#6b7790');
      px(x + 38, y, 4, 12, '#6b7790');
      var hy = y + 26 + Math.round(Math.sin(t / 20) * 3);
      px(x + 16, hy, 24, 28, e.on && (t >> 2) % 6 === 0 ? '#e8b48f' : '#d9a07a');
      px(x + 14, hy + 8, 3, 8, '#c98c66');
      px(x + 39, hy + 8, 3, 8, '#c98c66');
      px(x + 16, hy - 2, 24, 6, '#3a2a20');
      px(x + 19, hy + 9, 6, 2, '#2a1c14');
      px(x + 31, hy + 9, 6, 2, '#2a1c14');
      px(x + 20, hy + 12, 4, 3, '#fff');
      px(x + 32, hy + 12, 4, 3, '#fff');
      px(x + 21, hy + 13, 2, 2, '#111');
      px(x + 33, hy + 13, 2, 2, '#111');
      px(x + 23, hy + 21, 10, 2, '#7a2f2f');
      px(x - 8, y + 50, 16, 6, '#8b93a3');
      px(x - 12, y + 46, 6, 4, '#c3cad8');
      px(x - 12, y + 56, 6, 4, '#c3cad8');
    }
  }

  function drawPick(p) {
    var x = Math.round(p.x - cam.x), y = Math.round(p.y - cam.y + (p.fall ? 0 : Math.sin(p.t / 12) * 2));
    if (p.fall && p.life < 150 && (p.t >> 2) % 2) return;
    if (p.k === 'C') {
      if (art('cupcake', x, y, p.w, p.h)) return;
      px(x + 1, y + 6, 10, 6, '#a0522d');
      px(x + 2, y + 7, 1, 5, '#c97a4a');
      px(x + 6, y + 7, 1, 5, '#c97a4a');
      px(x, y + 2, 12, 5, '#ff8ac7');
      px(x + 2, y, 8, 3, '#ffb3dc');
      px(x + 3, y + 3, 2, 2, '#fff');
      px(x + 7, y + 3, 2, 2, '#fff');
      px(x + 4, y + 4, 1, 1, '#000');
      px(x + 8, y + 4, 1, 1, '#000');
      px(x + 5, y - 3, 2, 3, '#fff27a');
    } else if (p.k === 'J') {
      if (art('boost', x, y, p.w, p.h)) return;
      g.fillStyle = 'rgba(120,255,140,' + (0.25 + 0.2 * Math.sin(p.t / 8)) + ')';
      g.fillRect(x - 3, y - 3, 20, 20);
      px(x + 2, y + 6, 4, 8, '#3fd16a');
      px(x + 8, y + 6, 4, 8, '#3fd16a');
      px(x + 1, y + 12, 6, 2, '#1f7a3a');
      px(x + 7, y + 12, 6, 2, '#1f7a3a');
      px(x + 5, y, 4, 2, '#e6ffe9');
      px(x + 4, y + 2, 6, 2, '#e6ffe9');
    } else if (p.k === 'H') {
      if (art('heart', x, y, p.w, p.h)) return;
      drawHeart(x, y, '#ff4d6a');
    } else if (p.k === 'E') {
      if (art('door', x, y, p.w, p.h)) return;
      px(x - 2, y - 2, 20, 36, '#2a3144');
      g.fillStyle = 'rgba(120,200,255,' + (0.45 + 0.25 * Math.sin(p.t / 10)) + ')';
      g.fillRect(x + 1, y + 1, 14, 31);
      px(x + 5, y + 12, 6, 2, '#fff');
      px(x + 8, y + 10, 2, 6, '#fff');
    }
  }

  function drawHeart(x, y, c) {
    px(x + 1, y, 3, 2, c);
    px(x + 6, y, 3, 2, c);
    px(x, y + 2, 10, 3, c);
    px(x + 1, y + 5, 8, 2, c);
    px(x + 3, y + 7, 4, 2, c);
  }

  function text(s, x, y, c, size, align) {
    g.font = (size || 8) + 'px "Press Start 2P", monospace';
    g.textAlign = align || 'left';
    g.textBaseline = 'top';
    g.fillStyle = '#000';
    g.fillText(s, x + 1, y + 1);
    g.fillStyle = c || '#fff';
    g.fillText(s, x, y);
  }

  function drawHud() {
    drawHeart(8, 8, '#ff4d6a');
    text(String(Math.ceil(P.hp)), 22, 9, P.hp <= 25 ? '#ff8a8a' : '#fff');
    px(70, 6, 12, 12, 'rgba(0,0,0,0)');
    px(71, 14, 10, 4, '#a0522d');
    px(70, 10, 12, 4, '#ff8ac7');
    px(72, 8, 8, 2, '#ffb3dc');
    text(G.cup + '/9', 86, 9, '#ffd6ec');
    if (P.boots) { px(124, 10, 4, 6, '#3fd16a'); px(129, 10, 4, 6, '#3fd16a'); }
    var boss = ents.filter(function (e) { return (e.k === 'B' && e.on) || (e.k === 'M' && near(e, 260, 200)); })[0];
    if (boss && !boss.dying) {
      var bw = 140, bx = W - bw - 10;
      text(boss.k === 'B' ? "SCOTT'S HEAD" : 'GIANT METALMAN', W - 10, 6, '#ffd23f', 8, 'right');
      px(bx - 1, 17, bw + 2, 7, '#000');
      px(bx, 18, bw, 5, '#3a1020');
      px(bx, 18, Math.max(0, bw * boss.hp / boss.max), 5, '#ff4d6a');
    }
    if (banner) {
      var a = Math.min(1, banner.t / 20);
      g.globalAlpha = a;
      g.font = '8px "Press Start 2P", monospace';
      var tw = g.measureText(banner.text).width + 16;
      px(W / 2 - tw / 2, 36, tw, 18, 'rgba(10,14,40,.85)');
      text(banner.text, W / 2, 41, '#fff27a', 8, 'center');
      g.globalAlpha = 1;
    }
  }

  function wrap(s, max) {
    g.font = '8px "Press Start 2P", monospace';
    var words = s.split(' '), out = [], line = '';
    words.forEach(function (w) {
      var tryL = line ? line + ' ' + w : w;
      if (g.measureText(tryL).width > max && line) { out.push(line); line = w; } else line = tryL;
    });
    if (line) out.push(line);
    return out;
  }

  function drawDialog() {
    var line = dlg.lines[dlg.i].slice(0, dlg.ch);
    px(10, H - 66, W - 20, 56, 'rgba(6,10,30,.92)');
    g.strokeStyle = '#7fd8ff';
    g.strokeRect(10.5, H - 65.5, W - 21, 55);
    px(18, H - 58, 36, 40, '#1b2238');
    px(24, H - 52, 24, 28, (G.t >> 2) % 3 ? '#d9a07a' : '#e8b48f');
    px(24, H - 54, 24, 6, '#3a2a20');
    px(28, H - 43, 5, 2, '#2a1c14');
    px(39, H - 43, 5, 2, '#2a1c14');
    px(31, H - 32, 10, 2 + ((G.t >> 3) % 2) * 2, '#7a2f2f');
    for (var s = 0; s < 6; s++) px(18, H - 58 + ((G.t * 3 + s * 17) % 40), 36, 1, 'rgba(255,255,255,.18)');
    wrap(line, W - 90).forEach(function (l, i) { text(l, 62, H - 56 + i * 12, '#fff'); });
    if (dlg.ch >= dlg.lines[dlg.i].length && (G.t >> 4) % 2) text('>', W - 26, H - 24, '#7fd8ff');
  }

  function drawTitle() {
    drawBg();
    text('FNaF 57', W / 2, 40, '#ffd23f', 16, 'center');
    text('FREDDY IN SPACE', W / 2, 66, '#7fd8ff', 16, 'center');
    text('A fan remake', W / 2, 92, '#c9b8ff', 8, 'center');
    drawFreddy(W / 2 - 6, 120 + Math.round(Math.sin(G.t / 20) * 4), false, 1, 0, true);
    var best = null;
    try { best = JSON.parse(localStorage.getItem('fis-best') || 'null'); } catch (e) {}
    if (best) text('Best: ' + best.cup + '/9 cupcakes, ' + fmtTime(best.time), W / 2, 168, '#ffd6ec', 8, 'center');
    if ((G.t >> 5) % 2) text('Press Start', W / 2, 190, '#fff', 8, 'center');
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function draw() {
    g.imageSmoothingEnabled = false;
    if (G.mode === 'title' || !cur) { drawTitle(); return; }
    drawBg();
    drawMap();
    picks.forEach(drawPick);
    ents.forEach(drawEnt);
    beams.forEach(function (b) {
      var x = Math.round(b.x - cam.x);
      if (b.t < 50) {
        if ((b.t >> 2) % 2) px(x + 3, 16 - cam.y, 4, 6, '#ff4d6a');
        g.fillStyle = 'rgba(255,77,106,.12)';
        g.fillRect(x + 3, 0, 4, H);
      } else {
        px(x, 0, 10, H, 'rgba(255,90,120,.55)');
        px(x + 3, 0, 4, H, '#fff');
      }
    });
    if (G.mode !== 'dead' && !(P.inv > 0 && (P.inv >> 2) % 2)) drawFreddy(P.x - cam.x, P.y - cam.y, P.crouch, P.face, P.walk, !P.ground);
    shots.forEach(function (s) {
      px(s.x - cam.x, s.y - cam.y, s.w, s.h, s.size > 2 ? '#fff27a' : s.size > 1 ? '#9ff' : '#5ff');
      px(s.x - cam.x + (s.vx > 0 ? s.w - 2 : 0), s.y - cam.y, 2, s.h, '#fff');
    });
    foes.forEach(function (s) {
      var x = Math.round(s.x - cam.x), y = Math.round(s.y - cam.y);
      if (s.k === 'star') {
        var r = (s.t >> 2) % 2;
        px(x + 3, y, 2, 8, '#ffe14d');
        px(x, y + 3, 8, 2, '#ffe14d');
        if (r) { px(x + 1, y + 1, 2, 2, '#fff8b0'); px(x + 5, y + 5, 2, 2, '#fff8b0'); }
        else { px(x + 5, y + 1, 2, 2, '#fff8b0'); px(x + 1, y + 5, 2, 2, '#fff8b0'); }
      } else if (s.k === 'beam') {
        px(x, y, s.w, s.h, '#ff4d6a');
        px(x + 1, y, 1, s.h, '#fff');
      } else {
        px(x, y, s.w, s.h, '#ff7a3d');
        px(x + 1, y + 1, s.w - 2, s.h - 2, '#ffd23f');
      }
    });
    parts.forEach(function (q) { px(q.x - cam.x, q.y - cam.y, 2, 2, q.c); });
    if (cur.look === 'sea') { g.fillStyle = 'rgba(40,160,180,.10)'; g.fillRect(0, 0, W, H); }
    drawHud();
    if (G.mode === 'dialog' && dlg) drawDialog();
    if (G.mode === 'pause') {
      px(0, 0, W, H, 'rgba(0,0,0,.55)');
      text('PAUSED', W / 2, 90, '#fff', 16, 'center');
      text('Press P or Esc to keep playing', W / 2, 120, '#c9b8ff', 8, 'center');
    }
    if (G.mode === 'dead') {
      px(0, 0, W, H, 'rgba(60,0,10,' + Math.min(0.6, deadT / 80) + ')');
      if (deadT > 40) text('FREDDY WAS DELETED', W / 2, 88, '#ff8a8a', 8, 'center');
      if (deadT > 70 && (G.t >> 4) % 2) text('Press Jump to try again', W / 2, 112, '#fff', 8, 'center');
    }
    if (G.mode === 'fade') {
      var a = fadeT < 40 ? fadeT / 40 : 1 - (fadeT - 40) / 20;
      px(0, 0, W, H, 'rgba(0,0,0,' + Math.max(0, Math.min(1, a)) + ')');
    }
    if (G.mode === 'boom') { g.fillStyle = 'rgba(255,255,255,' + (fadeT % 12 < 3 ? 0.35 : 0) + ')'; g.fillRect(0, 0, W, H); }
    if (G.mode === 'end') {
      px(0, 0, W, H, 'rgba(4,8,24,.88)');
      text('CODE RECOVERED!', W / 2, 40, '#ffd23f', 16, 'center');
      text('Cupcakes: ' + endInfo.cup + '/9', W / 2, 80, '#ffd6ec', 8, 'center');
      text('Time: ' + fmtTime(endInfo.time) + (endInfo.best ? '  NEW BEST' : ''), W / 2, 96, '#fff', 8, 'center');
      text('You unlocked', W / 2, 124, '#c9b8ff', 8, 'center');
      text(endInfo.reward.name, W / 2, 140, '#7fd8ff', 16, 'center');
    }
  }

  var startBtn = root.querySelector('.fis-start'), pauseBtn = root.querySelector('.fis-pause'), muteBtn = root.querySelector('.fis-mute'), fullBtn = root.querySelector('.fis-full'), endBox = root.querySelector('.fis-end');
  function syncButtons() {
    var live = G.mode !== 'title' && G.mode !== 'end';
    startBtn.hidden = G.mode !== 'title';
    pauseBtn.hidden = !live;
    pauseBtn.textContent = G.mode === 'pause' ? 'Resume' : 'Pause';
    pauseBtn.setAttribute('aria-pressed', G.mode === 'pause' ? 'true' : 'false');
    muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
    muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
    root.classList.toggle('fis-live', live);
  }
  function begin() {
    var a = muted ? null : audio();
    if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    G.cup = 0;
    G.boots = false;
    G.frames = 0;
    endBox.hidden = true;
    startLevel(0, null);
    syncButtons();
    run();
    try { cv.focus({ preventScroll: true }); } catch (e) { cv.focus(); }
  }
  function showEnd() {
    var r = endInfo.reward;
    endBox.querySelector('.fis-end-img').src = r.img;
    endBox.querySelector('.fis-end-img').alt = r.name;
    endBox.querySelector('.fis-end-name').textContent = r.name;
    endBox.querySelector('.fis-end-link').href = '/fwm/roster/' + r.id;
    endBox.querySelector('.fis-end-cups').textContent = endInfo.cup + ' of 9 cupcakes in ' + fmtTime(endInfo.time) + '.';
    endBox.hidden = false;
    syncButtons();
  }
  function pause(on) {
    if (on && (G.mode === 'play' || G.mode === 'dialog')) { G.resume = G.mode; G.mode = 'pause'; }
    else if (!on && G.mode === 'pause') G.mode = G.resume || 'play';
    syncButtons();
    draw();
  }
  startBtn.addEventListener('click', begin);
  root.querySelector('.fis-again').addEventListener('click', begin);
  pauseBtn.addEventListener('click', function () { pause(G.mode !== 'pause'); });
  muteBtn.addEventListener('click', function () {
    muted = !muted;
    try { localStorage.setItem('fis-mute', muted ? '1' : '0'); } catch (e) {}
    if (!muted) audio();
    syncButtons();
  });
  if (fullBtn) {
    var fsTarget = root.querySelector('.fis-stage');
    if (!(fsTarget.requestFullscreen || fsTarget.webkitRequestFullscreen)) fullBtn.hidden = true;
    fullBtn.addEventListener('click', function () {
      var d = document;
      if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      else (fsTarget.requestFullscreen || fsTarget.webkitRequestFullscreen).call(fsTarget);
    });
  }

  var KEYS = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowDown: 'down', KeyS: 'down', ArrowUp: 'jump', KeyW: 'jump', Space: 'jump', KeyZ: 'jump', KeyK: 'jump', KeyX: 'fire', KeyJ: 'fire', KeyC: 'fire' };
  function typing(t) { return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); }
  function press(k, on) {
    if (on && !key[k]) {
      if (k === 'jump') { key.jumpHit = true; key.okHit = true; }
      if (k === 'fire') { key.fireHit = true; key.okHit = true; }
    }
    key[k] = on;
  }
  window.addEventListener('keydown', function (e) {
    if (typing(e.target) || G.mode === 'title' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Escape' || e.code === 'KeyP') {
      if (G.mode === 'play' || G.mode === 'dialog' || G.mode === 'pause') { e.preventDefault(); pause(G.mode !== 'pause'); }
      return;
    }
    if (G.mode === 'pause' || G.mode === 'end') return;
    if (e.code === 'Enter') { key.okHit = true; e.preventDefault(); return; }
    var k = KEYS[e.code];
    if (!k) return;
    e.preventDefault();
    press(k, true);
  });
  window.addEventListener('keyup', function (e) {
    var k = KEYS[e.code];
    if (k) key[k] = false;
  });
  window.addEventListener('blur', function () {
    for (var k in key) key[k] = false;
    pause(true);
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(true); });

  Array.prototype.forEach.call(root.querySelectorAll('.fis-pad [data-k]'), function (b) {
    var k = b.getAttribute('data-k');
    function on(e) {
      e.preventDefault();
      if (G.mode === 'pause') pause(false);
      press(k, true);
      b.classList.add('on');
      try { b.setPointerCapture(e.pointerId); } catch (x) {}
    }
    function off() { key[k] = false; b.classList.remove('on'); }
    b.addEventListener('pointerdown', on);
    b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off);
    b.addEventListener('lostpointercapture', off);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });
  cv.addEventListener('pointerdown', function () { if (G.mode === 'dialog' || G.mode === 'dead') key.okHit = true; });

  var raf = 0, last = 0, acc = 0, seen = true;
  function frame(t) {
    raf = 0;
    if (!seen || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = t;
    var d = Math.min(100, t - last);
    last = t;
    if (G.mode === 'pause' || G.mode === 'end') { acc = 0; draw(); return; }
    acc += d;
    var n = 0;
    while (acc >= STEP && n < 5) { step(); acc -= STEP; n++; }
    if (n === 5) acc = 0;
    draw();
  }
  function run() {
    if (!raf && seen && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); }
  }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) {
      seen = es[0].intersectionRatio > 0.25;
      if (!seen) pause(true);
      else run();
    }, { threshold: [0, 0.25, 0.5] }).observe(cv);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });
  syncButtons();
  if (document.fonts && document.fonts.load) document.fonts.load('8px "Press Start 2P"').then(draw, draw);
  run();

  window.FIS = {
    state: function () { return { mode: G.mode, lv: G.lv, hp: P ? P.hp : null, cup: G.cup, boots: P ? P.boots : false, x: P ? Math.round(P.x) : 0, y: P ? Math.round(P.y) : 0, ents: ents.length, foes: foes.length }; },
    warp: function (lv, tx, row) { startLevel(lv, null); if (tx != null) { P.x = tx * T + 2; P.y = row * T - P.h; snapCam(); } G.mode = 'play'; dlg = null; syncButtons(); run(); },
    give: function (cups, boots) { G.cup = cups; P.boots = G.boots = !!boots; },
    heal: function () { P.hp = 100; }
  };
})();
