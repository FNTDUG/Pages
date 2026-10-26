(function () {
  var root = document.getElementById('fis');
  if (!root) return;
  var cv = root.querySelector('.fis-canvas'), g = cv.getContext('2d');
  var W = 960, H = 540, T = 64, STEP = 1000 / 60, BASE = '/fwm/fis/', AV = '?v=1';
  cv.width = W;
  cv.height = H;

  var META = {"freddy-idle":[75,98,30,30,50],"freddy-walk":[75,98,30,30,50],"freddy-jump":[75,98,30,30,50],"mouse":[76,66,27,27,50],"robot":[150,150,30,27,50],"shooter":[70,70,11,11,50],"blob":[50,50,16,16,50],"ufo":[67,67,11,11,50],"laser":[50,50,15,15,50],"tentacle":[69,196,11,11,50],"metalman":[193,290,10,10,50],"boss":[337,291,31,12,50],"shots":[57,58,18,18,700],"star":[40,40,5,5,100],"boom":[46,46,11,11,50],"bigboom":[115,115,21,21,20],"death":[248,229,48,16,62],"jump":[75,75,11,11,50],"bubble":[64,64,21,21,50],"talk":[90,90,2,2,50],"fan":[128,128,5,5,40],"cupcake":[60,60,1,1,0],"heart":[44,44,1,1,0],"shot-laser":[15,19,1,1,0],"cam-l":[44,77,1,1,0],"cam-r":[44,77,1,1,0],"boss-hurt":[158,185,1,1,0],"boss-dead":[158,185,1,1,0],"static":[90,90,1,1,0],"kitty":[89,133,1,1,0],"tile-sea":[64,64,1,1,0],"tile-tech":[128,128,1,1,0],"tile-dark":[128,128,1,1,0],"bg-space":[800,480,1,1,0],"bg-holes":[1800,480,1,1,0],"bg-curtain":[800,480,1,1,0],"bg-ceiling":[1000,300,1,1,0],"bg-floor":[720,144,1,1,0],"bg-wires":[1200,480,1,1,0],"tile-rock":[64,64,1,1,0]};
  var BOX = {
    'freddy-idle': [19, 10, 70, 95], mouse: [6, 25, 65, 66], robot: [3, 9, 147, 144], shooter: [10, 19, 62, 67], blob: [4, 5, 47, 44],
    ufo: [5, 12, 61, 52], laser: [0, 0, 50, 26], tentacle: [16, 5, 51, 196], metalman: [41, 14, 189, 290], boss: [150, 0, 336, 291],
    'cam-l': [0, 0, 43, 77], jump: [0, 3, 75, 71], cupcake: [8, 1, 53, 59], heart: [0, 0, 44, 44]
  };
  var IMG = {};
  function load(k) {
    if (IMG[k]) return IMG[k];
    var i = new Image();
    i.decoding = 'async';
    i.src = BASE + k + '.webp' + AV;
    IMG[k] = i;
    return i;
  }
  function ready(k) { var i = IMG[k]; return i && i.complete && i.naturalWidth; }
  function fr(k, t) { var m = META[k]; return m[2] > 1 ? Math.floor(t * STEP / m[4]) % m[2] : 0; }
  function part(k, t, a, n) { return a + Math.floor(t * STEP / META[k][4]) % n; }
  function spr(k, f, x, y, flip, sx2, sy2, alpha) {
    var m = META[k], im = IMG[k];
    if (!m || !ready(k)) return false;
    f = ((f % m[2]) + m[2]) % m[2];
    var sx = (f % m[3]) * m[0], sy = Math.floor(f / m[3]) * m[1], w = m[0] * (sx2 || 1), h = m[1] * (sy2 || sx2 || 1);
    if (alpha != null) g.globalAlpha = alpha;
    if (flip) {
      g.save();
      g.translate(Math.round(x + w), Math.round(y));
      g.scale(-1, 1);
      g.drawImage(im, sx, sy, m[0], m[1], 0, 0, w, h);
      g.restore();
    } else g.drawImage(im, sx, sy, m[0], m[1], Math.round(x), Math.round(y), w, h);
    if (alpha != null) g.globalAlpha = 1;
    return true;
  }
  function onBox(k, f, e, flip, anchor) {
    var m = META[k], b = BOX[k] || [0, 0, m[0], m[1]];
    var cxs = flip ? m[0] - (b[0] + b[2]) / 2 : (b[0] + b[2]) / 2;
    var x = e.x + e.w / 2 - cam.x - cxs, y;
    if (anchor === 'top') y = e.y - cam.y - b[1];
    else if (anchor === 'mid') y = e.y + e.h / 2 - cam.y - (b[1] + b[3]) / 2;
    else y = e.y + e.h - cam.y - b[3];
    return spr(k, f, x, y, flip);
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
        ['s', 50, 59, 13, 17], ['k', 58, 13], ['b', 55, 7],
        ['s', 62, 63, 1, 12], ['b', 66, 9], ['t', 67, 18],
        ['s', 70, 80, 10, 17], ['C', 75, 10], ['k', 79, 10],
        ['b', 85, 6], ['t', 88, 18], ['k', 92, 18], ['H', 90, 18],
        ['o', 96, 100, 4], ['C', 98, 4],
        ['E', 106, 18]
      ]
    },
    {
      name: 'Level 3: The Code Vault', w: 130, h: 16, water: false, look: 'tech', arena: 113,
      ops: [
        ['P', 4, 14], ['c', 10, 1], ['d', 16, 5], ['c', 22, 1],
        ['s', 26, 27, 12, 13], ['o', 29, 33, 9], ['C', 31, 9],
        ['d', 36, 4], ['c', 40, 1], ['d', 46, 6], ['H', 44, 14],
        ['s', 48, 49, 10, 13], ['o', 51, 55, 6], ['C', 53, 6],
        ['M', 74, 14], ['D', 83, 14],
        ['c', 88, 1], ['d', 92, 5], ['s', 91, 91, 12, 13], ['o', 93, 97, 8], ['C', 95, 8], ['H', 97, 14],
        ['B', 122, 14]
      ]
    }
  ];

  var DEF = {
    m: { w: 54, h: 38, hp: 6, touch: 5, spr: 'mouse' },
    r: { w: 110, h: 130, hp: 8, touch: 10, drop: 0.7, spr: 'robot' },
    L: { w: 44, h: 24, hp: 0, touch: 0, spr: 'laser' },
    c: { w: 40, h: 72, hp: 3, touch: 5, spr: 'cam-l' },
    k: { w: 48, h: 46, hp: 4, touch: 5, spr: 'shooter' },
    b: { w: 40, h: 36, hp: 4, touch: 5, spr: 'blob' },
    t: { w: 30, h: 185, hp: 7, touch: 10, drop: 0.6, spr: 'tentacle' },
    d: { w: 52, h: 34, hp: 11, touch: 5, spr: 'ufo' },
    M: { w: 110, h: 260, hp: 70, touch: 10, drop: 1, spr: 'metalman' },
    B: { w: 180, h: 270, hp: 220, touch: 10, spr: 'boss' }
  };
  var PICK = { C: { w: 46, h: 56 }, J: { w: 60, h: 64 }, H: { w: 34, h: 34 } };

  var G = { mode: 'title', t: 0, lv: 0, cup: 0, boots: false, frames: 0 };
  var P = null, map = null, cur = null, ents = [], shots = [], foes = [], parts = [], picks = [], beams = [], booms = [];
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
    booms = [];
    lockX = -1;
    P = { x: 0, y: 0, w: 36, h: 84, vx: 0, vy: 0, face: 1, ground: false, crouch: false, hp: 100, inv: 0, cool: 0, swim: 0, walk: 0, kb: 0, kbx: 0, air: 0 };
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
        P.x = o[1] * T + 14;
        P.y = o[2] * T - P.h;
        return;
      }
      if (opt.skip && opt.skip[n]) return;
      if (PICK[k]) {
        picks.push({ k: k, n: n, w: PICK[k].w, h: PICK[k].h, x: o[1] * T + (T - PICK[k].w) / 2, y: o[2] * T - PICK[k].h - 8, t: rnd(0, 60) });
        return;
      }
      if (k === 'E') {
        picks.push({ k: 'E', n: n, w: 64, h: 128, x: o[1] * T, y: o[2] * T - 128, t: 0 });
        return;
      }
      var d = DEF[k];
      if (!d) return;
      var e = { k: k, n: n, w: d.w, h: d.h, hp: d.hp, max: d.hp, touch: d.touch, drop: d.drop || 0.3, vx: 0, vy: 0, cd: rnd(30, 90), t: Math.floor(rnd(0, 100)), flash: 0, face: -1, on: k !== 'B' };
      e.x = o[1] * T + (T - d.w) / 2;
      if (k === 'L' || k === 'c') e.y = o[2] * T;
      else if (k === 'b' || k === 'd') e.y = o[2] * T - d.h / 2;
      else e.y = o[2] * T - d.h;
      if (k === 'm') e.vx = -2.4;
      if (k === 'b') { e.vx = 2.8; e.vy = 2.2; }
      if (k === 'd') { e.vx = 3.2; e.home = e.x; }
      if (k === 'M') { e.vx = -3.2; e.home = e.x; }
      if (k === 'B') e.x = o[1] * T - 80;
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
    cam.y = Math.max(0, Math.min(cur.h * T - H, P.y + P.h / 2 - H / 2 - 40));
  }

  function moveX(o, dx) {
    o.x += dx;
    var t0 = Math.floor(o.y / T), t1 = Math.floor((o.y + o.h - 0.001) / T), tx, ty;
    if (dx > 0) {
      tx = Math.floor((o.x + o.w - 0.001) / T);
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
    var t0 = Math.floor(o.x / T), t1 = Math.floor((o.x + o.w - 0.001) / T), tx, ty, v;
    if (dy > 0) {
      ty = Math.floor((o.y + o.h - 0.001) / T);
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
    for (var ty = Math.floor(y / T); ty <= Math.floor((y + h - 0.001) / T); ty++)
      for (var tx = Math.floor(x / T); tx <= Math.floor((x + w - 0.001) / T); tx++) if (solid(tile(tx, ty))) return false;
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
  function boom(x, y, big) { booms.push({ x: x, y: y, k: big ? 'bigboom' : 'boom', t: 0 }); }

  function hurt(n, fx) {
    if (P.inv > 0 || G.mode !== 'play') return;
    P.hp -= n;
    P.inv = 60;
    P.kb = 10;
    P.kbx = fx < P.x + P.w / 2 ? 6.4 : -6.4;
    P.vy = cur.water ? -6 : -10;
    snd('hurt');
    puff(P.x + P.w / 2, P.y + 30, 6, '#ff6a6a', 6);
    if (P.hp <= 0) {
      P.hp = 0;
      G.mode = 'dead';
      deadT = 0;
      snd('boom');
    }
  }

  function fire() {
    var n = Math.min(8, G.cup), w = 26 + n * 4, h = 14 + n * 3;
    shots.push({ x: P.face > 0 ? P.x + P.w : P.x - w, y: P.y + (P.crouch ? 22 : 40) - h / 2, w: w, h: h, vx: 18 * P.face, left: 480 + G.cup * 88, dmg: 1 + G.cup * 0.15, lvl: n, t: 0 });
    snd('shoot');
  }

  function foeShot(x, y, vx, vy, kind) {
    var s = { x: 0, y: 0, w: 24, h: 24, vx: vx, vy: vy, k: kind || 'star', t: 0 };
    if (kind === 'beam') { s.w = 12; s.h = 34; }
    s.x = x - s.w / 2;
    s.y = y - s.h / 2;
    foes.push(s);
  }

  function aimAt(e, sp) {
    var dx = P.x + P.w / 2 - (e.x + e.w / 2), dy = P.y + P.h / 2 - (e.y + e.h / 2), l = Math.sqrt(dx * dx + dy * dy) || 1;
    return [dx / l * sp, dy / l * sp];
  }

  function updPlayer() {
    var water = cur.water;
    var want = key.down && P.ground;
    if (want && !P.crouch) { P.y += 24; P.h = 60; P.crouch = true; }
    else if (!want && P.crouch && boxFree(P.x, P.y - 24, P.w, 24)) { P.y -= 24; P.h = 84; P.crouch = false; }
    var ax = (key.right ? 1 : 0) - (key.left ? 1 : 0);
    if (ax) P.face = ax;
    if (P.crouch) ax = 0;
    P.vx = ax * (water ? 5 : 6.4);
    if (P.kb > 0) { P.kb--; P.vx = P.kbx; }
    if (P.swim > 0) P.swim--;
    var jv = water ? (P.boots ? 16.4 : 14.4) : (P.boots ? 29.2 : 22.4);
    if (key.jumpHit && !P.crouch && (P.ground || (water && P.swim <= 0))) {
      P.vy = -jv;
      P.ground = false;
      P.swim = 16;
      P.air = 0;
      snd('jump');
    }
    if (!water && !key.jump && P.vy < -6) P.vy = -6;
    P.vy = Math.min(water ? 8.8 : 24, P.vy + (water ? 0.64 : 1.4));
    moveX(P, P.vx);
    var r = moveY(P, P.vy);
    if (r === 1) { P.ground = true; P.vy = 0; }
    else { P.ground = false; if (r === -1) P.vy = 0; }
    P.walk = P.ground && P.vx ? P.walk + 1 : 0;
    P.air = P.ground ? 0 : P.air + 1;
    if (P.cool > 0) P.cool--;
    if (key.fire && P.cool <= 0) { fire(); P.cool = Math.max(9, 18 - G.cup); }
    if (P.inv > 0) P.inv--;
  }

  function updShots() {
    var i, s, j, e;
    for (i = shots.length - 1; i >= 0; i--) {
      s = shots[i];
      s.x += s.vx;
      s.t++;
      s.left -= Math.abs(s.vx);
      var gone = s.left <= 0 || solid(tile(Math.floor((s.x + s.w / 2) / T), Math.floor((s.y + s.h / 2) / T)));
      if (!gone) for (j = 0; j < ents.length; j++) {
        e = ents[j];
        if (e.dying || !hit(s, e) || (e.k === 'B' && !e.on)) continue;
        gone = true;
        if (e.k === 'L') { snd('tink'); puff(s.x + s.w / 2, s.y, 3, '#ffffff', 4); break; }
        e.hp -= s.dmg;
        e.flash = 6;
        snd('hit');
        boom(s.x + (s.vx > 0 ? s.w : 0), s.y + s.h / 2, false);
        if (e.hp <= 0) kill(e);
        break;
      }
      if (gone) shots.splice(i, 1);
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
    boom(e.x + e.w / 2, e.y + e.h / 2, e.k === 'M' || e.k === 'r');
    if (e.k === 'M') { boom(e.x + 20, e.y + 60, true); boom(e.x + e.w - 20, e.y + e.h - 60, true); }
    if (Math.random() < e.drop) picks.push({ k: 'H', n: -1, w: 34, h: 34, x: e.x + e.w / 2 - 17, y: e.y + e.h / 2, vy: -6, fall: true, life: 600, t: 0 });
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
        e.vy = Math.min(20, e.vy + 1.4);
        if (moveY(e, e.vy) === 1) e.vy = 0;
        var ahead = e.vx < 0 ? e.x - 1 : e.x + e.w + 1, below = tile(Math.floor(ahead / T), Math.floor((e.y + e.h + 4) / T));
        if (moveX(e, e.vx) || (!solid(below) && below !== 2)) e.vx = -e.vx;
      } else if (k === 'r') {
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0 && near(e, 880, 240)) { foeShot(e.x + e.w / 2 + e.face * 50, e.y + 60, 8.8 * e.face, 0); e.cd = 100; snd('star'); }
      } else if (k === 'L') {
        if (e.cd <= 0 && near(e, 920, 1600)) { foeShot(e.x + e.w / 2, e.y + e.h + 18, 0, 16, 'beam'); e.cd = 75; }
      } else if (k === 'c') {
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0 && near(e, 800, 1040)) { foeShot(e.x + e.w / 2, e.y + e.h, 6.4 * e.face, 6.4, 'beam'); e.cd = 110; snd('star'); }
      } else if (k === 'k') {
        if (e.cd <= 0 && near(e, 1040, 480)) { foeShot(e.x, e.y + 20, -8, 0); e.cd = 80; }
      } else if (k === 'b') {
        if (moveX(e, e.vx)) e.vx = -e.vx;
        if (moveY(e, e.vy)) e.vy = -e.vy;
      } else if (k === 'd') {
        if (moveX(e, e.vx) || Math.abs(e.x - e.home) > 320) { e.vx = -e.vx; e.x += e.vx * 2; }
        if (e.cd <= 0 && near(e, 480, 1040) && P.y > e.y) { foeShot(e.x + e.w / 2, e.y + e.h + 18, 0, 12, 'beam'); e.cd = 70; }
      } else if (k === 'M') {
        if (!near(e, 1040, 800)) continue;
        e.vy = Math.min(20, e.vy + 1.4);
        if (moveY(e, e.vy) === 1) e.vy = 0;
        if (moveX(e, e.vx) || Math.abs(e.x - e.home) > 360) { e.vx = -e.vx; e.x += e.vx * 2; }
        e.face = P.x < e.x ? -1 : 1;
        if (e.cd <= 0) {
          var a = aimAt(e, 8.4), sp = e.hp < e.max / 2, gx = e.x + e.w / 2 + e.face * 60, gy = e.y + 120;
          foeShot(gx, gy, a[0], a[1]);
          if (sp) { foeShot(gx, gy, a[0] * 0.9 - a[1] * 0.35, a[1] * 0.9 + a[0] * 0.35); foeShot(gx, gy, a[0] * 0.9 + a[1] * 0.35, a[1] * 0.9 - a[0] * 0.35); }
          e.cd = sp ? 70 : 60;
          snd('star');
        }
      } else if (k === 'B' && e.on) {
        var hard = e.hp < e.max / 2;
        if (e.cd <= 0) {
          var b = aimAt(e, hard ? 9.6 : 8);
          foeShot(e.x - 20, e.y + 120, b[0], b[1]);
          e.cd = hard ? 50 : 70;
          snd('star');
        }
        e.bomb = (e.bomb || 160) - 1;
        if (e.bomb <= 0) {
          var n = hard ? 4 : 3, xs = [P.x + P.w / 2], lo = lockX + 96, hi = e.x - 140;
          while (xs.length < n) xs.push(rnd(lo, hi));
          xs.forEach(function (x) { beams.push({ x: x - 20, t: 0 }); });
          e.bomb = hard ? 200 : 260;
          snd('warn');
        }
      }
      if (e.touch && hit(e, P)) hurt(e.touch, e.x + e.w / 2);
    }
    for (var j = beams.length - 1; j >= 0; j--) {
      var bm = beams[j];
      bm.t++;
      if (bm.t > 50 && bm.t < 76 && P.x < bm.x + 40 && P.x + P.w > bm.x) hurt(3, bm.x + 20);
      if (bm.t === 50) snd('shoot');
      if (bm.t >= 76) beams.splice(j, 1);
    }
  }

  function updPicks() {
    for (var i = picks.length - 1; i >= 0; i--) {
      var p = picks[i];
      p.t++;
      if (p.fall) {
        p.vy = Math.min(12, p.vy + 0.8);
        if (moveY(p, p.vy) === 1) p.vy = 0;
        if (--p.life <= 0) { picks.splice(i, 1); continue; }
      }
      if (!hit(p, P)) continue;
      if (p.k === 'E') { snd('door'); G.mode = 'fade'; fadeT = 0; return; }
      if (p.k === 'H') { if (P.hp >= 100) continue; P.hp = Math.min(100, P.hp + 10); snd('pick'); }
      if (p.k === 'C') { G.cup = Math.min(9, G.cup + 1); banner = { text: 'Blaster upgraded! ' + G.cup + '/9', t: 140 }; snd('pick'); }
      if (p.k === 'J') { P.boots = G.boots = true; banner = { text: 'Jump Boost! You can jump higher', t: 160 }; snd('pick'); }
      if (p.n >= 0) got[p.n] = 1;
      puff(p.x + p.w / 2, p.y + p.h / 2, 10, p.k === 'H' ? '#ff6a8a' : '#fff27a', 6);
      picks.splice(i, 1);
    }
  }

  function updCam() {
    var tx = P.x + P.w / 2 - W / 2 + P.face * 96, ty = P.y + P.h / 2 - H / 2 - 40;
    cam.x += (tx - cam.x) * 0.12;
    cam.y += (ty - cam.y) * 0.12;
    if (lockX >= 0) cam.x = Math.max(cam.x, Math.min(lockX, cur.w * T - W));
    cam.x = Math.max(0, Math.min(cur.w * T - W, cam.x));
    cam.y = Math.max(0, Math.min(cur.h * T - H, cam.y));
  }

  function arena() {
    if (!cur.arena || lockX >= 0 || P.x < cur.arena * T + 32) return;
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
      if (deadT > 150 && key.okHit) retry();
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
      if (bs && fadeT % 8 === 0) { boom(bs.x + rnd(0, bs.w), bs.y + rnd(0, bs.h), fadeT % 16 === 0); snd('boom'); }
      if (fadeT === 130) {
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
    for (var j = booms.length - 1; j >= 0; j--) {
      var bb = booms[j], m = META[bb.k];
      bb.t++;
      if (bb.t * STEP > m[2] * m[4]) booms.splice(j, 1);
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
    rock: { tile: 'tile-rock', bg: '#04060f' },
    sea: { tile: 'tile-sea', bg: '#030a26' },
    tech: { tile: 'tile-tech', bg: '#060a18' }
  };

  function px(x, y, w, h, c) {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), w, h);
  }
  function tiled(k, par, y, h, alpha) {
    var m = META[k];
    if (!ready(k)) return;
    var s = h / m[1], w = m[0] * s, off = -((cam.x * par) % w);
    if (alpha != null) g.globalAlpha = alpha;
    for (var x = off - w; x < W + w; x += w) g.drawImage(IMG[k], Math.round(x), Math.round(y), Math.ceil(w) + 1, h);
    g.globalAlpha = 1;
  }

  function drawBg() {
    var look = cur ? cur.look : 'rock';
    g.fillStyle = LOOK[look].bg;
    g.fillRect(0, 0, W, H);
    if (!cur || look === 'rock') {
      tiled('bg-space', cur ? 0.08 : 0, 0, H);
      if (cur) {
        tiled('bg-holes', 0.25, -cam.y * 0.15, H + 60);
        tiled('bg-curtain', 0.45, -cam.y * 0.3, H + 120, 0.95);
      }
      return;
    }
    if (look === 'sea') {
      if (ready('tile-sea')) {
        g.globalAlpha = 0.09;
        var ox = -((cam.x * 0.5) % 64), oy = -((cam.y * 0.5) % 64);
        for (var y = oy - 64; y < H + 64; y += 64) for (var x = ox - 64; x < W + 64; x += 64) g.drawImage(IMG['tile-sea'], Math.round(x), Math.round(y), 64, 64);
        g.globalAlpha = 1;
      }
      for (var b = 0; b < 12; b++) {
        var bx = ((b * 173 - cam.x * 0.6) % (W + 120) + (W + 120)) % (W + 120) - 60;
        var by = H + 40 - ((G.t * (1.2 + (b % 3) * 0.5) + b * 97) % (H + 120));
        spr('bubble', fr('bubble', G.t + b * 7), bx, by, false, 0.5 + (b % 3) * 0.25, null, 0.8);
      }
      return;
    }
    if (ready('tile-dark')) {
      var dx = -((cam.x * 0.5) % 128), dy = -((cam.y * 0.5) % 128);
      for (var yy = dy - 128; yy < H + 128; yy += 128) for (var xx = dx - 128; xx < W + 128; xx += 128) g.drawImage(IMG['tile-dark'], Math.round(xx), Math.round(yy), 128, 128);
    }
    tiled('bg-wires', 0.6, -cam.y * 0.4, H + 80, 0.9);
  }

  function drawMap() {
    var L = LOOK[cur.look], im = IMG[L.tile], ok = ready(L.tile), big = L.tile === 'tile-tech';
    var x0 = Math.floor(cam.x / T), y0 = Math.floor(cam.y / T), x, y, v, sx, sy;
    for (y = y0; y <= y0 + Math.ceil(H / T); y++) for (x = x0; x <= x0 + Math.ceil(W / T); x++) {
      v = tile(x, y);
      if (!v || y >= cur.h || x >= cur.w || x < 0 || y < 0) continue;
      sx = Math.round(x * T - cam.x);
      sy = Math.round(y * T - cam.y);
      if (v === 3) {
        px(sx + 16, sy, 32, T, 'rgba(60,10,30,.85)');
        px(sx + 24, sy, 16, T, (G.t >> 3) % 2 ? '#ff4d6a' : '#ff8a5c');
        continue;
      }
      var cut = v === 2 ? 22 : T;
      if (ok) {
        if (big) g.drawImage(im, (x % 2) * 64, (y % 2) * 64, 64, cut, sx, sy, T, cut);
        else g.drawImage(im, 0, 0, 64, cut, sx, sy, T, cut);
      } else px(sx, sy, T, cut, '#24304a');
      if (v === 2) px(sx, sy + cut, T, 4, 'rgba(0,0,0,.45)');
    }
  }

  function drawFreddy(x, y, crouch, face, walk, air, t) {
    var k = air ? 'freddy-jump' : walk ? 'freddy-walk' : 'freddy-idle';
    var flip = face < 0, b = BOX['freddy-idle'], m = META['freddy-idle'];
    var cxs = flip ? m[0] - (b[0] + b[2]) / 2 : (b[0] + b[2]) / 2;
    var sy = crouch ? 0.72 : 1;
    var dx = x + 18 - cxs, dy = y + (crouch ? 60 : 84) - b[3] * sy;
    var f = air ? 15 + Math.min(14, Math.floor(air * 0.6)) : part(k, walk || t, 15, 15);
    if (!spr(k, f, dx, dy, flip, 1, sy)) px(x, y, 36, crouch ? 60 : 84, '#8a4b2a');
    var hx = dx + (flip ? m[0] - 47 : 47), hy = dy + 28 * sy;
    g.beginPath();
    g.ellipse(hx, hy, 30, 28 * sy + 2, 0, 0, 6.3);
    g.fillStyle = 'rgba(190,230,255,.13)';
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = 'rgba(210,240,255,.55)';
    g.stroke();
    g.beginPath();
    g.ellipse(hx - 12, hy - 12, 8, 5, -0.6, 0, 6.3);
    g.fillStyle = 'rgba(255,255,255,.35)';
    g.fill();
  }

  function drawEnt(e) {
    var x = e.x - cam.x;
    if (x > W + 200 || x + e.w < -200) return;
    var k = e.k, d = DEF[k], t = e.t;
    if (e.flash > 0 && (e.flash & 2)) g.filter = 'brightness(3)';
    if (k === 'c') onBox(e.face > 0 ? 'cam-r' : 'cam-l', 0, e, false, 'top');
    else if (k === 'L') onBox('laser', fr('laser', t), e, false, 'top');
    else if (k === 'b' || k === 'd') onBox(d.spr, fr(d.spr, t), e, false, 'mid');
    else if (k === 'm') onBox('mouse', part('mouse', t, 1, 5), e, e.vx < 0);
    else if (k === 'r') onBox('robot', part('robot', t, 15, 15), e, e.face < 0);
    else if (k === 'M') onBox('metalman', fr('metalman', t), e, e.face > 0);
    else if (k === 'B') {
      if (e.dying && ready('boss-dead')) spr('boss-dead', 0, e.x + e.w / 2 - cam.x - 79, e.y + e.h - cam.y - 185, false, 1.5);
      else onBox('boss', fr('boss', t), e, false);
    } else onBox(d.spr, fr(d.spr, t), e, false);
    g.filter = 'none';
  }

  function drawPick(p) {
    var bob = p.fall ? 0 : Math.sin(p.t / 12) * 6;
    if (p.fall && p.life < 150 && (p.t >> 2) % 2) return;
    var e = { x: p.x, y: p.y + bob, w: p.w, h: p.h };
    if (p.k === 'C') {
      onBox('cupcake', 0, e, false);
      g.beginPath();
      g.arc(p.x + p.w / 2 - cam.x, p.y + bob + p.h / 2 - cam.y, 40, 0, 6.3);
      g.strokeStyle = 'rgba(200,230,255,.45)';
      g.lineWidth = 2;
      g.stroke();
    } else if (p.k === 'J') onBox('jump', fr('jump', p.t), e, false, 'mid');
    else if (p.k === 'H') onBox('heart', 0, e, false);
    else if (p.k === 'E') {
      var x = p.x - cam.x, y = p.y - cam.y, gr = g.createLinearGradient(x, y, x, y + p.h);
      gr.addColorStop(0, 'rgba(120,200,255,.0)');
      gr.addColorStop(0.5, 'rgba(120,200,255,' + (0.45 + 0.2 * Math.sin(p.t / 10)) + ')');
      gr.addColorStop(1, 'rgba(120,200,255,.0)');
      g.fillStyle = gr;
      g.fillRect(x, y, p.w, p.h);
    }
  }

  function text(s, x, y, c, size, align, font) {
    g.font = (font || '700 ' + (size || 26) + 'px "Space Grotesk", Arial, sans-serif');
    g.textAlign = align || 'left';
    g.textBaseline = 'top';
    g.fillStyle = 'rgba(0,0,0,.75)';
    g.fillText(s, x + 2, y + 2);
    g.fillStyle = c || '#fff';
    g.fillText(s, x, y);
  }

  function drawHud() {
    if (!spr('heart', 0, 18, 14, false, 0.8)) px(18, 14, 34, 34, '#e33');
    text(String(Math.ceil(P.hp)), 62, 16, P.hp <= 25 ? '#ff9a9a' : '#d6d6d6', 30);
    spr('cupcake', 0, 140, 8, false, 0.75);
    text(G.cup + '/9', 190, 16, '#ffd6ec', 30);
    if (P.boots) spr('jump', 0, 270, 6, false, 0.55);
    var boss = ents.filter(function (e) { return (e.k === 'B' && e.on) || (e.k === 'M' && near(e, 1040, 800)); })[0];
    if (boss && !boss.dying) {
      var bw = 320, bx = W - bw - 24;
      text(boss.k === 'B' ? "SCOTT'S HEAD" : 'GIANT METALMAN', W - 24, 12, '#ffd23f', 22, 'right');
      px(bx - 2, 44, bw + 4, 16, '#000');
      px(bx, 46, bw, 12, '#3a1020');
      px(bx, 46, Math.max(0, bw * boss.hp / boss.max), 12, '#ff4d6a');
    }
    if (banner) {
      g.globalAlpha = Math.min(1, banner.t / 20);
      g.font = '700 26px "Space Grotesk", Arial, sans-serif';
      var tw = g.measureText(banner.text).width + 40;
      px(W / 2 - tw / 2, 84, tw, 46, 'rgba(6,10,30,.8)');
      text(banner.text, W / 2, 94, '#fff27a', 26, 'center');
      g.globalAlpha = 1;
    }
  }

  function wrap(s, max) {
    g.font = '700 24px "Space Grotesk", Arial, sans-serif';
    var words = s.split(' '), out = [], line = '';
    words.forEach(function (w) {
      var tryL = line ? line + ' ' + w : w;
      if (g.measureText(tryL).width > max && line) { out.push(line); line = w; } else line = tryL;
    });
    if (line) out.push(line);
    return out;
  }

  function drawDialog() {
    var line = dlg.lines[dlg.i].slice(0, dlg.ch), y0 = H - 160;
    px(24, y0, W - 48, 136, 'rgba(4,6,20,.9)');
    g.strokeStyle = 'rgba(160,200,255,.6)';
    g.lineWidth = 2;
    g.strokeRect(25, y0 + 1, W - 50, 134);
    if (!spr('talk', dlg.ch < dlg.lines[dlg.i].length ? (G.t >> 2) % 2 : 0, 44, y0 + 23)) px(44, y0 + 23, 90, 90, '#a22');
    spr('static', 0, 44, y0 + 23, false, 1, 1, 0.25 + 0.1 * Math.sin(G.t));
    wrap(line, W - 230).forEach(function (l, i) { text(l, 158, y0 + 30 + i * 34, '#fff', 24); });
    if (dlg.ch >= dlg.lines[dlg.i].length && (G.t >> 4) % 2) text('>', W - 60, y0 + 96, '#9fd8ff', 26);
  }

  function drawTitle() {
    drawBg();
    text('FNaF 57', W / 2, 90, '#ffd23f', 64, 'center', '400 44px "Press Start 2P", monospace');
    text('FREDDY IN SPACE', W / 2, 158, '#9fd8ff', 40, 'center', '400 36px "Press Start 2P", monospace');
    drawFreddy(W / 2 - 18, 250 + Math.round(Math.sin(G.t / 20) * 8), false, 1, 0, 0, G.t);
    var best = null;
    try { best = JSON.parse(localStorage.getItem('fis-best') || 'null'); } catch (e) {}
    if (best) text('Best: ' + best.cup + '/9 cupcakes, ' + fmtTime(best.time), W / 2, 372, '#ffd6ec', 22, 'center');
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function draw() {
    if (G.mode === 'title' || !cur) { drawTitle(); return; }
    if (G.mode === 'dead') {
      px(0, 0, W, H, '#000');
      var m = META.death, fx = P.x + P.w / 2 - cam.x - m[0] / 2, fy = P.y + P.h - cam.y - m[1] + 20;
      spr('death', Math.min(m[2] - 1, Math.floor(deadT * STEP / m[4])), fx, fy);
      if (deadT > 150) {
        text('FREDDY WAS DELETED', W / 2, 150, '#ff8a8a', 30, 'center');
        if ((G.t >> 4) % 2) text('Press Jump to try again', W / 2, 196, '#fff', 24, 'center');
      }
      return;
    }
    drawBg();
    drawMap();
    picks.forEach(drawPick);
    ents.forEach(drawEnt);
    beams.forEach(function (b) {
      var x = Math.round(b.x - cam.x);
      if (b.t < 50) {
        g.fillStyle = 'rgba(255,60,90,' + ((b.t >> 2) % 2 ? 0.28 : 0.12) + ')';
        g.fillRect(x + 12, 0, 16, H);
      } else {
        px(x, 0, 40, H, 'rgba(255,70,110,.55)');
        px(x + 12, 0, 16, H, '#fff');
      }
    });
    if (!(P.inv > 0 && (P.inv >> 2) % 2)) drawFreddy(P.x - cam.x, P.y - cam.y, P.crouch, P.face, P.walk, P.air > 2 ? P.air : 0, G.t);
    shots.forEach(function (s) {
      var m = META.shots, f = s.lvl * 2 + ((s.t >> 2) & 1);
      if (!spr('shots', f, s.x + s.w / 2 - cam.x - m[0] / 2, s.y + s.h / 2 - cam.y - m[1] / 2, s.vx < 0)) px(s.x - cam.x, s.y - cam.y, s.w, s.h, '#5ff');
    });
    foes.forEach(function (s) {
      var x = s.x - cam.x, y = s.y - cam.y;
      if (s.k === 'beam') { if (!spr('shot-laser', 0, x - 2, y, false, 1, 34 / 19)) px(x, y, s.w, s.h, '#ff4d6a'); }
      else if (!spr('star', fr('star', s.t), x + s.w / 2 - 20, y + s.h / 2 - 20)) px(x, y, s.w, s.h, '#ffe14d');
    });
    booms.forEach(function (b) {
      var m = META[b.k];
      spr(b.k, Math.floor(b.t * STEP / m[4]), b.x - cam.x - m[0] / 2, b.y - cam.y - m[1] / 2);
    });
    parts.forEach(function (q) { px(q.x - cam.x, q.y - cam.y, 4, 4, q.c); });
    drawHud();
    if (G.mode === 'dialog' && dlg) drawDialog();
    if (G.mode === 'pause') {
      px(0, 0, W, H, 'rgba(0,0,0,.55)');
      text('PAUSED', W / 2, 200, '#fff', 44, 'center');
      text('Press P or Esc to keep playing', W / 2, 262, '#c9d8ff', 24, 'center');
    }
    if (G.mode === 'fade') {
      var a = fadeT < 40 ? fadeT / 40 : 1 - (fadeT - 40) / 20;
      px(0, 0, W, H, 'rgba(0,0,0,' + Math.max(0, Math.min(1, a)) + ')');
    }
    if (G.mode === 'boom') { g.fillStyle = 'rgba(255,255,255,' + (fadeT % 16 < 3 ? 0.3 : 0) + ')'; g.fillRect(0, 0, W, H); }
    if (G.mode === 'end') {
      px(0, 0, W, H, 'rgba(2,4,16,.9)');
      text('CODE RECOVERED!', W / 2, 100, '#ffd23f', 48, 'center');
      text('Cupcakes: ' + endInfo.cup + '/9', W / 2, 190, '#ffd6ec', 28, 'center');
      text('Time: ' + fmtTime(endInfo.time) + (endInfo.best ? '   New best!' : ''), W / 2, 234, '#fff', 28, 'center');
      text('You unlocked', W / 2, 300, '#c9d8ff', 26, 'center');
      text(endInfo.reward.name, W / 2, 340, '#9fd8ff', 44, 'center');
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
  function loadAll() { Object.keys(META).forEach(load); }
  function begin() {
    var a = muted ? null : audio();
    if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    loadAll();
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
  ['bg-space', 'freddy-idle', 'freddy-walk', 'freddy-jump', 'tile-rock', 'bg-holes', 'bg-curtain', 'heart', 'cupcake'].forEach(load);
  syncButtons();
  if (document.fonts && document.fonts.load) document.fonts.load('36px "Press Start 2P"').then(draw, draw);
  run();

  window.FIS = {
    state: function () {
      var hpOf = function (k) { var e = ents.filter(function (x) { return x.k === k; })[0]; return e ? Math.round(e.hp) : null; };
      return { mode: G.mode, lv: G.lv, hp: P ? P.hp : null, cup: G.cup, boots: P ? P.boots : false, x: P ? Math.round(P.x) : 0, y: P ? Math.round(P.y) : 0, ents: ents.length, foes: foes.length, metal: hpOf('M'), boss: hpOf('B'), locked: lockX >= 0 };
    },
    warp: function (lv, tx, row) { loadAll(); startLevel(lv, null); if (tx != null) { P.x = tx * T + 14; P.y = row * T - P.h; snapCam(); } G.mode = 'play'; dlg = null; syncButtons(); run(); },
    give: function (cups, boots) { G.cup = cups; P.boots = G.boots = !!boots; },
    heal: function (n) { P.hp = n == null ? 100 : n; },
    foe: function (k) { var e = ents.filter(function (x) { return x.k === (k === 'boss' ? 'B' : 'M'); })[0]; return e ? Math.round(e.x) : null; }
  };
})();
