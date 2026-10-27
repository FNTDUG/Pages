(function () {
  var root = document.getElementById('fis');
  if (!root) return;
  var cv = root.querySelector('.fis-canvas'), g = cv.getContext('2d');
  var BASE = '/fwm/fis57/', VER = '?v=1', W = 800, H = 480, DT = 1000 / 60;
  cv.width = W;
  cv.height = H;
  var scene = document.createElement('canvas'), sg = scene.getContext('2d');
  scene.width = W;
  scene.height = H;
  var hasFilter = typeof sg.filter === 'string';
  var D = null, SHEETS = [], MASKS = {}, PAT = {}, loaded = false, loadErr = false;
  var COS = [256, 251, 236, 212, 181, 142, 97, 49, 0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251];
  var SIN = [0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251, 256, 251, 236, 212, 181, 142, 97, 49];
  var CSS = [2599, 0, 844, 31, 479, 30, 312, 29, 210, 28, 137, 27, 78, 26, 25, 25, 0, 24];
  var ACCEL = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 320, 336, 352, 368, 384, 400, 416, 432, 448, 480, 512, 544, 560, 592, 624, 640, 672, 688, 720, 736, 768, 784, 816, 848, 864, 896, 928, 944, 976, 992, 1024, 1120, 1216, 1312, 1440, 1536, 1632, 1728, 1824, 1952, 2048, 2240, 2432, 2688, 2880, 3072, 3264, 3456, 3712, 3904, 4096, 6544, 4914, 5216, 5732, 6144, 6553, 6962, 7366, 7780, 8192, 9836, 11672, 13316, 14960, 16604, 18248, 19892, 21504, 25600, 25600];
  var MVAP = [0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, -4, 0, -8, 0, 0, 0, -2, -2, 2, 2, -4, -4, 4, 4, -8, -8, 8, 8, -4, 4, -8, 8, 0, 0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, 0, 0, 4, 0, 8, 0, 0, -2, 2, 2, -2, -4, 4, 4, -4, -8, 8, 8, -8, 4, 4, 8, 8, 0, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 4, 0, 8, 0, 0, 0, 2, 2, -2, -2, 4, 4, -4, -4, 8, 8, -8, -8, 4, -4, 8, -8, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 0, 0, -4, 0, -8, 0, 0, 2, -2, -2, 2, 4, -4, -4, 4, 8, -8, -8, 8, -4, -4, -8, -8, 0, 0];
  var TWO = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  var APPROX = [3, 1, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0, 0, 0, 1, 2, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 1, 2, 0];
  var MASKB = [0xFFFFFFFC, 0xFFFFFFFE, 0xFFFFFFFF], PLUSANG = [-4, 4, -2, 2, -1, 1], PLUSTRY = [-4, 4, -4, 4, -4, 4];
  var LINES = ['', "What are you doing here? This game isn't finished yet!", "This game isn't due for release until 2030! Get out!", 'How did you access this game before release?', 'So, you are here to stop me...', 'You want to stop me from doing what? Making crazy spinoffs?', 'HA HA HA! I will never stop making spinoffs!', 'FNaF 57: Freddy in Space. Freddy was always destined for space.', 'Then FNaF 58: Poopets in Space.', 'FNaF 59: Cupcake Takes Manhattan.', "FNaF 60: Breakfast at Chica's. It's a romantic comedy. She's a killer with a heart of gold!", "FNaF 61: Freddy v Bonnie. It's the beginning of the Freddy Cinematic Universe.", "FNaF 61: Balloon Boy's Revenge. He steals EVERYONE'S flashlights; what a kidder.", "Oh, dead end. Busted. You'll never find my hideout.", 'WRONG! Wrong, wrong, go back. I think you missed it back there.', 'No, seriously, you missed my hideout. It was back the other way.', 'Very well. Come to me. I will add your distictiveness to my own.', 'I will grind up your code and use it for the game over screen!'];
  var REWARD = { 41: { name: 'Jack-O-Bonnie', id: 'jack-o-bonnie', img: 'https://fnaf-world.fntduserguide.com/idle/jack-o-bonnie.webp' }, 47: { name: 'Coffee', id: 'coffee', img: 'https://fnaf-world.fntduserguide.com/idle/coffee.webp' }, 48: { name: 'Purple Guy', id: 'purple-guy', img: 'https://fnaf-world.fntduserguide.com/idle/purple-guy.webp' } };
  var REB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 31, 0, 1, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 24, 25, 26, 27, 27, 28, 28, 28, 28, 29, 29, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 23, 24, 25, 28, 27, 26, 25, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 20, 21, 22, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 8, 7, 6, 5, 4, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16, 17, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 16, 15, 14, 13, 12, 11, 10, 9, 8, 12, 13, 14, 15, 15, 16, 16, 16, 16, 17, 17, 18, 19, 20, 21, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7, 8, 9, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 0, 1, 2, 0, 0, 1, 1, 2, 3, 4, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 28, 29, 30, 31, 31, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 25, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10, 11, 12, 13, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var QCOL = { 38: ['Active 2', 'Active 4', 'Active 6', 'walker', 'Active 11', 'blob', 'rollertank', 'UFO', 'Active 14', 'Active 13', 'follow', 'current level', 'hit box', 'vertical', 'Active 5', 'enemy bullet', 'Active', 'powerup', 'area 1', 'area 2', 'area 3', 'feel left', 'back wall', 'spring', 'teleport', 'heart', 'Active 10', 'Active 16', 'Active 17', 'trigger final', 'cutscene'] };
  var ONCOL = { 38: { 'Active': ['heart', 'trigger final', 'cutscene'], 'heart': ['Active'], 'trigger final': ['Active'], 'cutscene': ['Active'] } };
  var QBACK = { 38: { 'blob': 1 } };

  var L = null, GLOBAL = { found: 0, cups: 0, start: 0 }, mode = 'idle', seq = 0;

  function rnd(n) { return Math.floor(Math.random() * n); }
  function trunc(v) { return v < 0 ? Math.ceil(v) : Math.floor(v); }
  function IM(h) { return D.images[h]; }

  function mask(h) {
    if (MASKS[h]) return MASKS[h];
    var im = IM(h);
    if (!im) return null;
    var c = document.createElement('canvas'), w = im[3], hh = im[4];
    c.width = w;
    c.height = hh;
    var x = c.getContext('2d');
    x.drawImage(SHEETS[im[0]], im[1], im[2], w, hh, 0, 0, w, hh);
    var d = x.getImageData(0, 0, w, hh).data, rows = [];
    for (var y = 0; y < hh; y++) {
      var runs = [], s = -1;
      for (var i = 0; i < w; i++) {
        var on = d[(y * w + i) * 4 + 3] !== 0;
        if (on && s < 0) s = i;
        else if (!on && s >= 0) { runs.push(s, i); s = -1; }
      }
      if (s >= 0) runs.push(s, w);
      rows.push(runs);
    }
    MASKS[h] = rows;
    return rows;
  }

  function animHead(o) {
    if (o._ah) return o._ah;
    var raw = o.anims || {}, max = 0, k, a, d, n;
    for (k in raw) if (+k + 1 > max) max = +k + 1;
    var anims = [], ex = [];
    for (a = 0; a < max; a++) {
      ex[a] = raw[a] ? 1 : 0;
      if (!raw[a]) { anims[a] = null; continue; }
      var an = { dirs: [], trigo: [], anti: [] };
      for (d = 0; d < 32; d++) {
        var v = raw[a][d];
        an.dirs[d] = v ? { min: v[0], max: v[1], rep: v[2], back: v[3], frames: v[4] } : null;
        an.trigo[d] = 0;
        an.anti[d] = 0;
      }
      anims[a] = an;
    }
    for (a = 0; a < max; a++) {
      if (!ex[a]) {
        var found = false;
        if (a < 12) for (n = 0; n < 4; n++) { var t = APPROX[a * 4 + n]; if (ex[t]) { anims[a] = anims[t]; found = true; break; } }
        if (!found) for (n = 0; n < max; n++) if (ex[n]) { anims[a] = anims[n]; break; }
      } else approximate(anims[a], a);
    }
    o._ah = { max: max, anims: anims };
    return o._ah;
  }

  function approximate(an, nAnim) {
    for (var d = 0; d < 32; d++) {
      if (!an.dirs[d]) {
        var d2, d3, c1, c2;
        for (d2 = 0, c1 = d + 1; d2 < 32; d2++, c1++) { c1 &= 31; if (an.dirs[c1]) { an.trigo[d] = c1; break; } }
        for (d3 = 0, c2 = d - 1; d3 < 32; d3++, c2--) { c2 &= 31; if (an.dirs[c2]) { an.anti[d] = c2; break; } }
        if (c1 === c2 || d2 < d3) an.trigo[d] |= 0x40;
        else if (d3 < d2) an.anti[d] |= 0x40;
      } else if (nAnim < 16 && TWO[nAnim] === 0) an.dirs[d].min = an.dirs[d].max;
    }
  }

  function setImg(e, h) {
    e.img = h;
    var im = IM(h);
    if (im) { e.w = im[3]; e.h = im[4]; e.hx = im[5]; e.hy = im[6]; e.ax = im[7]; e.ay = im[8]; }
  }

  function initAnim(e) {
    e.rcAnim = 1;
    e.aStopped = false;
    e.aForced = 0;
    e.aDirForced = 0;
    e.aSpeedForced = 0;
    e.aCounter = 0;
    e.aFrame = 0;
    e.aOff = null;
    e.aDirOff = null;
    e.aOn = -1;
    e.aMin = -1;
    e.aMax = -1;
    e.aPrev = -1;
    e.aDir = -1;
    e.aNF = 0;
    animations(e);
  }

  function animate(e) { if (e.t === 2) animations(e); }

  function animations(e) {
    e.oldX = e.x;
    e.oldY = e.y;
    e.oldImg = e.img;
    animIn(e, 1);
  }

  function animIn(e, vbl) {
    var ah = animHead(e.o);
    if (!ah.max) return;
    var speed = e.speed, anim = e.rcAnim, ad, image;
    if (e.aSpeedForced) speed = e.aSpeedForced - 1;
    if (anim === 1) {
      if (speed === 0) anim = 0;
      if (speed >= 75) anim = 2;
    }
    if (e.aForced) anim = e.aForced - 1;
    if (anim !== e.aOn) {
      e.aOn = anim;
      if (anim >= ah.max) anim = ah.max - 1;
      var an = ah.anims[anim];
      if (an !== e.aOff) {
        e.aOff = an;
        e.aDir = -1;
        e.aFrame = 0;
        e.aCounter = 0;
      }
    }
    if (!e.aOff) return;
    var dir = e.dir % 32;
    if (e.aDirForced) dir = e.aDirForced - 1;
    if (e.aDir !== dir) {
      e.aDir = dir;
      ad = e.aOff.dirs[dir];
      if (!ad) {
        if (e.aOff.anti[dir] & 0x40) dir = e.aOff.anti[dir] & 0x3F;
        else if (e.aOff.trigo[dir] & 0x40) dir = e.aOff.trigo[dir] & 0x3F;
        else {
          var off = dir;
          if (e.aPrev < 0) dir = e.aOff.trigo[dir] & 0x3F;
          else {
            dir -= e.aPrev;
            dir &= 31;
            if (dir > 15) dir = e.aOff.trigo[off] & 0x3F;
            else dir = e.aOff.anti[off] & 0x3F;
          }
        }
        ad = e.aOff.dirs[dir];
      } else {
        e.aPrev = dir;
      }
      if (e.aDirOff !== ad) {
        e.aDirOff = ad;
        e.aRep = ad.rep;
        e.aRepLoop = ad.back;
        if (ad.min !== e.aMin || ad.max !== e.aMax) {
          e.aMin = ad.min;
          e.aMax = ad.max;
          e.aDeltaSp = ad.max - ad.min;
          e.aDelta = ad.min;
          e.aSpeed = -1;
        }
        e.aNF = ad.frames.length;
        if (e.aFrame >= e.aNF) e.aFrame = 0;
        image = ad.frames[e.aFrame];
        if (!e.aStopped) setImg(e, image);
        if (e.aNF === 1) {
          if (e.aMin === 0) e.aNF = 0;
          return;
        }
      }
    }
    if (vbl === 0) return;
    if (e.aNF === 0) return;
    var delta = e.aDeltaSp;
    if (speed !== e.aSpeed) {
      e.aSpeed = speed;
      if (delta === 0) {
        e.aDelta = e.aMin;
        if (e.aSpeedForced) e.aDelta = e.aSpeedForced - 1;
      } else {
        var ds = e.maxS - e.minS;
        if (ds === 0) {
          delta = Math.floor(delta / 2) + e.aMin;
          e.aDelta = delta;
        } else {
          delta = trunc(delta * speed / ds) + e.aMin;
          if (delta > e.aMax) delta = e.aMax;
          e.aDelta = delta;
        }
      }
    }
    ad = e.aDirOff;
    if (e.aDelta === 0 || e.aStopped) return;
    var counter = e.aCounter, frame = e.aFrame;
    counter += e.aDelta;
    while (counter > 100) {
      counter -= 100;
      frame++;
      if (frame >= e.aNF) {
        frame = e.aRepLoop;
        if (e.aRep !== 0) {
          e.aRep--;
          if (e.aRep === 0) {
            e.aFrame = e.aNF - 1;
            e.aNF = 0;
            if (e.aForced) { e.aForced = 0; e.aDirForced = 0; e.aSpeedForced = 0; }
            if (e.aFrame < ad.frames.length) setImg(e, ad.frames[e.aFrame]);
            e.aCounter = counter;
            trigAnim(e, e.aOn);
            return;
          }
        }
      }
    }
    e.aCounter = counter;
    e.aFrame = frame;
    setImg(e, ad.frames[frame]);
  }

  function force(e, a) {
    if (!e || e.t !== 2) return;
    e.aForced = a + 1;
    animIn(e, 0);
  }

  function setDir(e, d) {
    d &= 31;
    if (e.dir !== d) {
      e.dir = d;
      if (e.t === 2) animIn(e, 0);
    }
  }

  function dirFromMask(mask) {
    if (mask === 0 || mask === -1) return rnd(32);
    var count = 0, found = 0, i;
    for (i = 0; i < 32; i++) if ((mask >>> i) & 1) { count++; found = i; }
    if (count === 1) return found;
    count = rnd(count);
    for (i = 0; i < 32; i++) if ((mask >>> i) & 1) { count--; if (count < 0) return i; }
    return 0;
  }

  function dirAtStart(mask) {
    var cpt = 0, i;
    for (i = 0; i < 32; i++) if ((mask >>> i) & 1) cpt++;
    if (cpt === 0) return 0;
    cpt = rnd(cpt);
    for (i = 0; i < 32; i++) if ((mask >>> i) & 1) { cpt--; if (cpt < 0) return i; }
    return 0;
  }

  function dirFromPente(x, y) {
    if (x === 0) return y >= 0 ? 24 : 8;
    if (y === 0) return x >= 0 ? 0 : 16;
    var fx = false, fy = false, dir, i;
    if (x < 0) { fx = true; x = -x; }
    if (y < 0) { fy = true; y = -y; }
    var d = (x * 256) / y;
    for (i = 0; ; i += 2) if (d >= CSS[i]) break;
    dir = CSS[i + 1];
    if (fy) { dir = -dir + 32; dir &= 31; }
    if (fx) { dir -= 8; dir &= 31; dir = -dir; dir &= 31; dir += 8; dir &= 31; }
    return dir;
  }

  function make(oi, x, y, ly, dir, shot) {
    var o = D.objs[oi];
    if (!o) return null;
    var f = o.fl || 0, nm = o.n, fr = L.f;
    var e = { id: seq++, oi: oi, o: o, t: o.t, x: x, y: y, cx: 0, cy: 0, ly: ly, vis: o.t < 2 ? true : o.vis !== false, alt: [], dir: 0, speed: 0, minS: 0, maxS: 0, img: -1, w: 0, h: 0, hx: 0, hy: 0, ax: 0, ay: 0, ink: 0, alpha: 1, flash: 0, flashCpt: 0, dead: false, noCall: false, sleep: false, chk: true, moveFlag: false, mv: null, val: 0, text: '', colOn: true };
    for (var i = 0; i < 26; i++) e.alt[i] = (o.vals && o.vals[i]) || 0;
    if (o.inkraw && o.inkraw.length >= 16) { e.add = parseInt(o.inkraw.slice(0, 2), 16) === 9; e.alpha = parseInt(o.inkraw.slice(14, 16), 16) / 255; }
    if (o.t === 7) { e.val = o.cnt[0]; e.min = o.cnt[1]; e.max = o.cnt[2]; }
    if (o.t === 3) e.text = (o.txt && o.txt.paras && o.txt.paras[0] && o.txt.paras[0].text) || '';
    e.fixed = !!(f & 0x800);
    e.hasMove = !!(f & 0x10);
    e.neverKill = !!(f & 0x2000);
    e.qcol = !!(QCOL[fr] && QCOL[fr].indexOf(nm) >= 0);
    e.oncol = (ONCOL[fr] && ONCOL[fr][nm]) || null;
    e.qback = !!(QBACK[fr] && QBACK[fr][nm]);
    e.neverSleep = (f & 0x8000) ? !!(f & 0x4000) : e.qcol;
    if (o.t >= 7 || o.t === 3) e.neverSleep = true;
    if (o.t === 2) {
      if (shot) {
        e.dir = dir & 31;
        e.mv = { t: 13, wait: true };
        e.vis = false;
        e.colOn = false;
        e.speed = shot;
        e.minS = shot;
        e.maxS = shot;
      } else initMove(e, 0, dir);
      initAnim(e);
    }
    L.all.push(e);
    (L.by[oi] = L.by[oi] || []).push(e);
    return e;
  }

  function initMove(e, n, dir) {
    var ms = e.o.mov, m = ms && ms[n];
    if (dir != null && dir >= 0 && dir < 32) e.dir = dir;
    if (!m) { e.mv = { t: 0 }; e.speed = 0; e.chk = true; if (n === 0) e.dir = 0; return; }
    e.mvn = n;
    if (dir === -1) e.dir = dirAtStart(m.dir >>> 0);
    if (m.t === 4) {
      var dec = m.dec ? (m.dec <= 100 ? ACCEL[m.dec] : m.dec << 8) : 0;
      e.mv = { t: 4, mb: m.sp << 8, dec: dec, rand: m.rnd, ang: m.ang, maskB: MASKB[m.ang] | 0, blocked: false, last: -1, sec: (100 - m.sec) / 8, secCpt: (100 - m.sec) / 8, stop: 0, colCount: 0 };
      e.speed = m.sp;
      e.maxS = m.sp;
      e.minS = dec ? 0 : m.sp;
      e.cx = 0;
      e.cy = 0;
      if (!m.mas) ballStop(e);
    } else if (m.t === 5) {
      e.mv = { t: 5, m: m, xs: e.x, ys: e.y, back: false, pause: 0, calc: 0, speed: 0, stop: 0, n: 0, cos: 0, sin: 0, len: 0, xo: 0, yo: 0, xd: 0, yd: 0, branch: false };
      e.minS = m.min;
      e.maxS = m.max;
      goAvant(e, 0);
      if (!m.mas) pathStop(e);
      e.speed = e.mv.speed;
      if (!m.steps.length) pathStop(e);
    } else {
      e.mv = { t: 0 };
      e.speed = 0;
      e.chk = true;
    }
  }

  function setX(e, x) {
    var t = e.mv ? e.mv.t : -1;
    if (t === 5) {
      var mv = e.mv, x2 = e.x;
      e.x = x;
      x2 -= mv.xo;
      x -= x2;
      x2 = mv.xd - mv.xo + x;
      mv.xd = x2;
      x2 = mv.xo;
      mv.xo = x;
      x2 -= x;
      mv.xs -= x2;
      e.moveFlag = true;
      e.chk = true;
      return;
    }
    if (t === 0) { if (e.x !== x) { e.x = x; e.moveFlag = true; } e.chk = true; return; }
    if (t === 4 || t === 13) { if (e.x !== x) { e.x = x; e.moveFlag = true; e.chk = true; } return; }
    if (e.x !== x) { e.x = x; e.chk = true; }
  }
  function setY(e, y) {
    var t = e.mv ? e.mv.t : -1;
    if (t === 5) {
      var mv = e.mv, y2 = e.y;
      e.y = y;
      y2 -= mv.yo;
      y -= y2;
      y2 = mv.yd - mv.yo + y;
      mv.yd = y2;
      y2 = mv.yo;
      mv.yo = y;
      y2 -= y;
      mv.ys -= y2;
      e.moveFlag = true;
      e.chk = true;
      return;
    }
    if (t === 0) { if (e.y !== y) { e.y = y; e.moveFlag = true; } e.chk = true; return; }
    if (t === 4 || t === 13) { if (e.y !== y) { e.y = y; e.moveFlag = true; e.chk = true; } return; }
    if (e.y !== y) { e.y = y; e.chk = true; }
  }
  function setPos(e, x, y) { if (!e) return; setX(e, x); setY(e, y); }

  function setSpeed(e, s) {
    if (!e || !e.mv) return;
    if (s < 0) s = 0;
    if (s > 250) s = 250;
    if (e.mv.t === 4) { e.speed = s; e.mv.mb = s << 8; e.mv.stop = 0; e.moveFlag = true; }
    else if (e.mv.t === 5) { e.mv.speed = s; e.speed = s; e.moveFlag = true; }
  }
  function speedOf(e) { return e ? e.speed : 0; }

  function ballStop(e) {
    var m = e.mv;
    if (m.stop === 0) { m.stop = e.speed | 0x8000; e.speed = 0; m.mb = 0; e.moveFlag = true; }
  }
  function ballStart(e) {
    var m = e.mv, s = m.stop;
    if (s !== 0) { s &= 0x7FFF; e.speed = s; m.mb = s << 8; m.stop = 0; e.moveFlag = true; }
  }
  function stopObj(e) { if (!e || !e.mv) return; if (e.mv.t === 4) ballStop(e); else if (e.mv.t === 5) pathStop(e); }
  function startObj(e) { if (!e || !e.mv) return; if (e.mv.t === 4) ballStart(e); else if (e.mv.t === 5) pathStart(e); }
  function nextMovement(e) {
    var ms = e.o.mov;
    if (ms && (e.mvn || 0) + 1 < ms.length) initMove(e, (e.mvn || 0) + 1, null);
  }

  function makeMove(e, speed, angle) {
    L.colCount++;
    if (e.mv) e.mv.colCount = L.colCount;
    e.moveFlag = false;
    if (speed === 0) { collide(e); return false; }
    var shift = Math.floor(speed * 32), x, y;
    while (shift > 2048) {
      x = e.x * 65536 + (e.cx & 0xFFFF);
      y = e.y * 65536 + (e.cy & 0xFFFF);
      x += COS[angle] * 2048;
      y += SIN[angle] * 2048;
      e.cx = x & 0xFFFF;
      e.x = Math.floor(x / 65536);
      e.cy = y & 0xFFFF;
      e.y = Math.floor(y / 65536);
      if (collide(e)) return true;
      if (e.moveFlag) break;
      shift -= 2048;
    }
    if (!e.moveFlag) {
      x = e.x * 65536 + (e.cx & 0xFFFF);
      y = e.y * 65536 + (e.cy & 0xFFFF);
      x += COS[angle] * shift;
      y += SIN[angle] * shift;
      e.cx = x & 0xFFFF;
      e.x = Math.floor(x / 65536);
      e.cy = y & 0xFFFF;
      e.y = Math.floor(y / 65536);
      if (collide(e)) return true;
    }
    return e.moveFlag;
  }

  function collide(e) {
    e.moveFlag = false;
    if (e.dead) return false;
    if (e.qback && bgAt(e, e.x, e.y)) trigBack(e);
    if (e.oncol && !e.dead) {
      for (var i = 0; i < e.oncol.length; i++) {
        var list = S(e.oncol[i]);
        for (var j = 0; j < list.length; j++) {
          var b = list[j];
          if (b.dead || !ov(e, b)) continue;
          var key = Math.min(e.id, b.id) + ':' + Math.max(e.id, b.id);
          L.colNow[key] = 1;
          if (L.colPrev[key]) continue;
          trigCol(e, b);
          if (e.dead) return false;
        }
      }
    }
    return false;
  }

  function tst(e, x, y) {
    if (e.qback) return !bgAt(e, x, y);
    return true;
  }
  function mvbTest(e, dir) {
    var x = e.x * 65536 + (e.cx & 0xFFFF), y = e.y * 65536 + (e.cy & 0xFFFF);
    x += COS[dir] * 2048;
    y += SIN[dir] * 2048;
    return tst(e, Math.floor(x / 65536), Math.floor(y / 65536));
  }

  function approachSprite(e, destX, destY, maxX, maxY) {
    var presX = destX, presY = destY, loinX = maxX, loinY = maxY;
    var x = trunc((presX + loinX) / 2), y = trunc((presY + loinY) / 2), oldX, oldY;
    for (var guard = 0; guard < 64; guard++) {
      if (tst(e, x, y)) {
        loinX = x; loinY = y; oldX = x; oldY = y;
        x = trunc((loinX + presX) / 2);
        y = trunc((loinY + presY) / 2);
        if (x === oldX && y === oldY) {
          if (loinX !== presX || loinY !== presY) { if (tst(e, presX, presY)) { x = presX; y = presY; } }
          return [true, x, y];
        }
      } else {
        presX = x; presY = y; oldX = x; oldY = y;
        x = trunc((loinX + presX) / 2);
        y = trunc((loinY + presY) / 2);
        if (x === oldX && y === oldY) {
          if (loinX !== presX || loinY !== presY) { if (tst(e, loinX, loinY)) return [true, loinX, loinY]; }
          return [false, x, y];
        }
      }
    }
    return [false, x, y];
  }

  function mbApproach(e, flag) {
    var pt = approachSprite(e, e.x, e.y, e.oldX, e.oldY);
    if (pt[0]) { e.x = pt[1]; e.y = pt[2]; return; }
    var index = (e.dir >> 2) * 18;
    do {
      if (tst(e, e.x + MVAP[index], e.y + MVAP[index + 1])) { e.x += MVAP[index]; e.y += MVAP[index + 1]; return; }
      index += 2;
    } while (MVAP[index] !== 0 || MVAP[index + 1] !== 0);
    if (!flag) { e.x = e.oldX; e.y = e.oldY; if (e.oldImg >= 0) setImg(e, e.oldImg); }
  }

  function bounce(e) {
    var m = e.mv;
    if (!m || m.t !== 4) return;
    if (m.stop !== 0) return;
    if (L.loop === m.last) return;
    m.last = L.loop;
    if (m.colCount === L.colCount) mbApproach(e, m.blocked);
    var x = e.x - 8, y = e.y - 8, reb = 0;
    if (!tst(e, x, y)) reb |= 1;
    x += 16;
    if (!tst(e, x, y)) reb |= 2;
    y += 16;
    if (!tst(e, x, y)) reb |= 4;
    x -= 16;
    if (!tst(e, x, y)) reb |= 8;
    var dir = REB[reb * 32 + e.dir] & m.maskB;
    if (!mvbTest(e, dir)) {
      var angles = PLUSTRY[m.ang * 2 + 1], a2 = angles, ok = false;
      do {
        dir -= angles;
        dir &= 31;
        if (mvbTest(e, dir)) { ok = true; break; }
        dir += 2 * angles;
        dir &= 31;
        if (mvbTest(e, dir)) { ok = true; break; }
        dir -= angles;
        dir &= 31;
        angles += a2;
      } while (angles <= 16);
      if (!ok) {
        m.blocked = true;
        e.dir = rnd(32) & m.maskB;
        e.moveFlag = true;
        return;
      }
    }
    m.blocked = false;
    e.dir = dir;
    var r = rnd(100);
    if (r < m.rand) {
      r >>= 2;
      if (r < 25) {
        r -= 12;
        r &= 31;
        r &= m.maskB;
        if (mvbTest(e, r)) { e.dir = r; e.moveFlag = true; return; }
      }
    }
    dir = e.dir & 7;
    if (m.secCpt !== 12) {
      if (dir === 0) {
        m.secCpt--;
        if (m.secCpt < 0) {
          dir = e.dir + PLUSANG[rnd(2) + m.ang * 2];
          dir &= 31;
          if (mvbTest(e, dir)) { e.dir = dir; m.secCpt = m.sec; }
        }
      } else m.secCpt = m.sec;
    }
    e.moveFlag = true;
  }

  function goAvant(e, n) {
    var mv = e.mv, st = mv.m.steps;
    if (n >= st.length) { pathStop(e); return; }
    var s = st[n];
    mv.back = false;
    mv.n = n;
    mv.pause = s[7];
    mv.cos = s[4];
    mv.sin = s[5];
    mv.xo = e.x;
    mv.yo = e.y;
    mv.xd = e.x + s[2];
    mv.yd = e.y + s[3];
    e.dir = s[1];
    branche(e);
  }
  function goArriere(e, n) {
    var mv = e.mv, st = mv.m.steps;
    if (n >= st.length) { pathStop(e); return; }
    var s = st[n];
    mv.back = true;
    mv.n = n;
    mv.cos = -s[4];
    mv.sin = -s[5];
    mv.xo = e.x;
    mv.yo = e.y;
    mv.xd = e.x - s[2];
    mv.yd = e.y - s[3];
    e.dir = (s[1] + 16) & 31;
    branche(e);
  }
  function branche(e) {
    var mv = e.mv, s = mv.m.steps[mv.n], speed = s[0];
    mv.len = s[6];
    if (mv.pause !== 0) {
      mv.pause = mv.pause * 20;
      speed |= 0x8000;
      mv.stop = speed;
    }
    if (mv.stop !== 0) speed = 0;
    if (speed !== mv.speed || speed !== 0) {
      mv.speed = speed;
      e.moveFlag = true;
      mv.branch = true;
    }
    e.speed = mv.speed;
  }
  function pathStop(e) {
    var mv = e.mv;
    if (mv.stop === 0) mv.stop = mv.speed | 0x8000;
    mv.speed = 0;
    e.moveFlag = true;
  }
  function pathStart(e) {
    var mv = e.mv;
    if (mv.stop & 0x8000) {
      mv.speed = mv.stop & 0x7FFF;
      mv.pause = 0;
      mv.stop = 0;
      e.moveFlag = true;
    }
  }
  function theEnd(e) {
    var mv = e.mv;
    mv.speed = 0;
    mv.stop = 0;
    e.moveFlag = true;
    mv.branch = false;
    return true;
  }
  function reposAtEnd(e) {
    var mv = e.mv;
    if (mv.m.repos) { e.x = mv.xs; e.y = mv.ys; }
  }

  function mtMove(e, step) {
    var mv = e.mv;
    step += mv.calc;
    var s2 = step >>> 16;
    if (s2 < mv.len) {
      mv.calc = step;
      e.x = trunc(s2 * mv.cos / 16384) + mv.xo;
      e.y = trunc(s2 * mv.sin / 16384) + mv.yo;
      collide(e);
      return e.moveFlag;
    }
    s2 -= mv.len;
    step = (s2 << 16) | (step & 0xFFFF);
    if (mv.speed !== 0) step = Math.floor(step / mv.speed);
    step >>= 5;
    L.vblCount += step & 0xFFFF;
    e.x = mv.xd;
    e.y = mv.yd;
    collide(e);
    if (e.moveFlag) return true;
    var number = mv.n, st = mv.m.steps;
    mv.calc = 0;
    if (!mv.back) {
      number++;
      if (number < st.length) { goAvant(e, number); return e.moveFlag; }
      mv.n = number;
      if (mv.m.rev) {
        mv.back = true;
        number--;
        goArriere(e, number);
        return e.moveFlag;
      }
      reposAtEnd(e);
      if (!mv.m.loop) { theEnd(e); return e.moveFlag; }
      goAvant(e, 0);
      return e.moveFlag;
    }
    mv.pause = st[number][7];
    number--;
    if (number >= 0) { goArriere(e, number); return e.moveFlag; }
    reposAtEnd(e);
    if (!mv.m.loop) { theEnd(e); return e.moveFlag; }
    mv.back = false;
    goAvant(e, 0);
    return e.moveFlag;
  }

  function pathMove(e) {
    var mv = e.mv;
    e.rcAnim = 1;
    animate(e);
    if (e.dead) return;
    if (mv.speed === 0) {
      var p = mv.pause;
      if (p === 0) { e.speed = 0; collide(e); return; }
      p -= DT;
      if (p > 0) { mv.pause = p; e.speed = 0; collide(e); return; }
      mv.pause = 0;
      mv.speed = mv.stop & 0x7FFF;
      mv.stop = 0;
      e.speed = mv.speed;
    }
    var calc = 256, brk;
    L.vblCount = 256;
    for (var guard = 0; guard < 400; guard++) {
      brk = false;
      L.vblStep = calc;
      calc *= mv.speed;
      calc <<= 5;
      if (calc <= 0x80000) L.moveStep = calc;
      else {
        calc = mv.speed ? Math.floor((0x80000 >>> 5) / mv.speed) : 0;
        L.vblStep = calc;
        L.moveStep = 0x80000;
      }
      mv.branch = false;
      var flag = mtMove(e, L.moveStep);
      if (flag && !mv.branch) break;
      if (L.vblCount === L.vblStep) break;
      if (L.vblCount > L.vblStep) { L.vblCount -= L.vblStep; calc = L.vblCount; continue; }
      calc = L.vblCount * mv.speed;
      calc <<= 5;
      mtMove(e, calc);
      break;
    }
  }

  function ballMove(e) {
    var m = e.mv;
    e.rcAnim = 1;
    animate(e);
    if (e.dead) return;
    if (m.dec !== 0) {
      var sp = m.mb;
      if (sp > 0) {
        sp -= m.dec;
        if (sp < 0) sp = 0;
        m.mb = sp;
        e.speed = sp >> 8;
      }
    }
    makeMove(e, e.speed, e.dir);
  }

  function bulletMove(e) {
    var m = e.mv;
    if (m.wait) { m.wait = false; e.colOn = true; e.vis = true; }
    animate(e);
    if (e.dead) return;
    makeMove(e, e.speed, e.dir);
    if (e.x < -64 || e.x > L.w + 64 || e.y < -64 || e.y > L.h + 64) { destroy(e); e.noCall = true; }
    if (e.chk) { e.chk = false; collide(e); }
  }

  function staticMove(e) {
    animate(e);
    if (e.dead) return;
    if (e.chk) { e.chk = false; collide(e); }
  }

  function moveObj(e) {
    var t = e.mv ? e.mv.t : -1;
    if (t === 4) ballMove(e);
    else if (t === 5) pathMove(e);
    else if (t === 13) bulletMove(e);
    else staticMove(e);
  }

  function handle(e) {
    if (e.noCall) return;
    if (e.t !== 2) {
      if (e.flash) { e.flashCpt -= DT; if (e.flashCpt < 0) { e.flashCpt = e.flash; e.vis = !e.vis; } }
      return;
    }
    if (!e.sleep) {
      if (e.flash) { e.flashCpt -= DT; if (e.flashCpt < 0) { e.flashCpt = e.flash; e.vis = !e.vis; } }
      moveObj(e);
      if (e.neverSleep || e.dead) return;
      var x1 = e.x - e.hx, y1 = e.y - e.hy, x2 = x1 + e.w, y2 = y1 + e.h;
      if (x2 >= L.xmin && x1 <= L.xmax && y2 >= L.ymin && y1 <= L.ymax) return;
      if (x2 >= L.kxmin && x1 <= L.kxmax && y2 >= L.kymin && y1 <= L.kymax) { e.sleep = true; return; }
      if (!e.neverKill) destroy(e);
      return;
    }
    var a1 = e.x - e.hx, b1 = e.y - e.hy, a2 = a1 + e.w, b2 = b1 + e.h;
    if (a2 >= L.xmin && a1 <= L.xmax && b2 >= L.ymin && b1 <= L.ymax) e.sleep = false;
  }

  function destroy(e) { if (e && !e.dead) { e.dead = true; e.noCall = true; } }

  function buildGrid() {
    L.grid = {};
    L.obst.forEach(function (r, i) {
      var gl = L.grid[r[4]] = L.grid[r[4]] || {};
      for (var gx = Math.floor(r[0] / 256); gx <= Math.floor((r[0] + r[2] - 1) / 256); gx++)
        for (var gy = Math.floor(r[1] / 256); gy <= Math.floor((r[1] + r[3] - 1) / 256); gy++) {
          var k = gx + ',' + gy;
          (gl[k] = gl[k] || []).push(i);
        }
    });
  }

  function maskRect(h, bx, by, r) {
    var rows = mask(h);
    if (!rows) return true;
    var y1 = Math.max(by, r[1]), y2 = Math.min(by + rows.length, r[1] + r[3]), x1 = r[0] - bx, x2 = r[0] + r[2] - bx;
    for (var y = y1; y < y2; y++) {
      var runs = rows[y - by];
      for (var i = 0; i < runs.length; i += 2) if (runs[i] < x2 && runs[i + 1] > x1) return true;
    }
    return false;
  }

  function bgAt(e, x, y) {
    if (!e || e.img < 0) return false;
    var gl = L.grid[e.ly];
    if (!gl) return false;
    var bx = x - e.hx, by = y - e.hy, bw = e.w, bh = e.h, seen = {};
    for (var gx = Math.floor(bx / 256); gx <= Math.floor((bx + bw - 1) / 256); gx++)
      for (var gy = Math.floor(by / 256); gy <= Math.floor((by + bh - 1) / 256); gy++) {
        var list = gl[gx + ',' + gy];
        if (!list) continue;
        for (var i = 0; i < list.length; i++) {
          var id = list[i];
          if (seen[id]) continue;
          seen[id] = 1;
          var r = L.obst[id];
          if (r[0] < bx + bw && r[0] + r[2] > bx && r[1] < by + bh && r[1] + r[3] > by && maskRect(e.img, bx, by, r)) return true;
        }
      }
    return false;
  }
  function bg(e) { return !!e && bgAt(e, e.x, e.y); }

  function ov(a, b) {
    if (!a || !b || a === b || a.dead || b.dead || a.ly !== b.ly || !a.colOn || !b.colOn || a.img < 0 || b.img < 0) return false;
    var ax = a.x - a.hx, ay = a.y - a.hy, bx = b.x - b.hx, by = b.y - b.hy;
    var x1 = Math.max(ax, bx), y1 = Math.max(ay, by), x2 = Math.min(ax + a.w, bx + b.w), y2 = Math.min(ay + a.h, by + b.h);
    if (x1 >= x2 || y1 >= y2) return false;
    var ma = mask(a.img), mb = mask(b.img);
    if (!ma || !mb) return true;
    for (var y = y1; y < y2; y++) {
      var ra = ma[y - ay], rb = mb[y - by];
      for (var i = 0; i < ra.length; i += 2) {
        var l1 = Math.max(ra[i] + ax, x1), r1 = Math.min(ra[i + 1] + ax, x2);
        if (l1 >= r1) continue;
        for (var j = 0; j < rb.length; j += 2) if (rb[j] + bx < r1 && rb[j + 1] + bx > l1) return true;
      }
    }
    return false;
  }

  function S(name) {
    var ois = L.names[name];
    if (!ois) return [];
    var out = [];
    for (var j = 0; j < ois.length; j++) {
      var list = L.by[ois[j]];
      if (list) for (var i = 0; i < list.length; i++) out.push(list[i]);
    }
    return out;
  }
  function O1(name) { var l = S(name); for (var i = 0; i < l.length; i++) if (!l[i].dead) return l[i]; return l[0] || null; }
  function C(name) { var e = O1(name); return e ? e.val : 0; }
  function CS(name, v) { var e = O1(name); if (e) e.val = Math.max(e.min, Math.min(e.max, v)); }
  function CA(name, v) { var e = O1(name); if (e) CS(name, e.val + v); }
  function count(name) { return S(name).length; }
  function each(name, f) { var l = S(name); for (var i = 0; i < l.length; i++) f(l[i]); }
  function where(list, f) { var o = []; for (var i = 0; i < list.length; i++) if (f(list[i])) o.push(list[i]); return o; }

  function colSel(aList, bName) {
    var bl = S(bName), A = [], B = [];
    for (var i = 0; i < aList.length; i++) {
      var a = aList[i], hit = false;
      for (var j = 0; j < bl.length; j++) if (ov(a, bl[j])) { hit = true; if (B.indexOf(bl[j]) < 0) B.push(bl[j]); }
      if (hit) A.push(a);
    }
    return { a: A, b: B };
  }
  function notCol(aList, bName) {
    var bl = S(bName);
    return where(aList, function (a) { for (var j = 0; j < bl.length; j++) if (ov(a, bl[j])) return false; return true; });
  }

  function once(id, cond) {
    var was = L.once[id];
    L.once[id] = cond;
    return cond && !was;
  }
  function every(id, ms) {
    var c = L.every[id];
    if (c === undefined) c = ms;
    c -= DT;
    if (c > 0) { L.every[id] = c; return false; }
    L.every[id] = c + ms;
    return true;
  }
  function timer(id, ms) {
    if (L.timers[id] || L.ms < ms) return false;
    L.timers[id] = 1;
    return true;
  }

  function create(name, parent, dx, dy, action) {
    var ois = L.names[name];
    if (!ois || !parent) return null;
    var x = parent.x + (dx || 0), y = parent.y + (dy || 0);
    if (action) { x += parent.ax - parent.hx; y += parent.ay - parent.hy; }
    return make(ois[0], x, y, parent.ly, -1);
  }
  function shoot(e, name, speed, mask, useDir) {
    var ois = L.names[name];
    if (!ois || !e) return null;
    var x = e.x + e.ax - e.hx, y = e.y + e.ay - e.hy;
    return make(ois[0], x, y, e.ly, useDir ? e.dir : dirFromMask(mask), speed);
  }
  function lookAt(e, x, y) {
    var d = dirFromPente(x - e.x, y - e.y) & 31;
    if (e.dir !== d) e.dir = d;
  }
  function facing(e, mask) { return ((mask >>> e.dir) & 1) === 1; }
  function nearBorder(e) {
    var x = e.x - e.hx, y = e.y - e.hy;
    if (x <= L.camX) return true;
    if (x + e.w >= L.camX + W) return true;
    if (y <= L.camY) return true;
    if (y + e.h >= L.camY + H) return true;
    return false;
  }
  function hide(e) { if (e) { e.vis = false; e.flash = 0; } }
  function show(e) { if (e) { e.vis = true; e.flash = 0; } }
  function flash(e, ms) { if (e) { e.flash = ms; e.flashCpt = ms; } }
  function toFront(e) { var i = L.all.indexOf(e); if (i >= 0) { L.all.splice(i, 1); L.all.push(e); } }
  function pick(list) { return list.length ? [list[rnd(list.length)]] : []; }
  function display(x, y) { L.disp = [x, y]; }

  var AC = null, BUF = {}, LOADING = {}, CH = {}, MUS = null, muted = false;
  try { muted = localStorage.getItem('fis-mute') === '1'; } catch (e) {}
  function audio() {
    if (AC) return AC;
    var A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    try { AC = new A(); } catch (e) { AC = null; }
    return AC;
  }
  function loadSnd(name, cb) {
    if (BUF[name]) { if (cb) cb(BUF[name]); return; }
    var f = D.sounds[name], a = audio();
    if (!f || !a) return;
    if (LOADING[name]) { if (cb) LOADING[name].push(cb); return; }
    LOADING[name] = cb ? [cb] : [];
    fetch(BASE + 'snd/' + encodeURIComponent(f) + VER).then(function (r) { return r.arrayBuffer(); }).then(function (ab) {
      return new Promise(function (ok, no) { a.decodeAudioData(ab, ok, no); });
    }).then(function (b) {
      BUF[name] = b;
      LOADING[name].forEach(function (c) { c(b); });
      delete LOADING[name];
    }).catch(function () { delete LOADING[name]; });
  }
  function play(name, ch, loop) {
    if (muted || !D.sounds[name]) return;
    if (loop && /\.mp3$/.test(D.sounds[name])) { music(name); return; }
    var a = audio();
    if (!a) return;
    if (a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    var stamp = L ? L.loop : 0;
    loadSnd(name, function (b) {
      if (!L || L.loop - stamp > 30) return;
      if (CH[ch]) { try { CH[ch].stop(); } catch (e) {} }
      var s = a.createBufferSource();
      s.buffer = b;
      s.loop = !!loop;
      s.connect(a.destination);
      s.start();
      CH[ch] = s;
      s.onended = function () { if (CH[ch] === s) delete CH[ch]; };
    });
  }
  function music(name) {
    if (MUS && MUS.dataset.n === name) return;
    stopMusic();
    MUS = new Audio(BASE + 'snd/' + encodeURIComponent(D.sounds[name]) + VER);
    MUS.dataset.n = name;
    MUS.loop = true;
    MUS.volume = 0.8;
    var p = MUS.play();
    if (p && p.catch) p.catch(function () {});
  }
  function stopMusic() { if (MUS) { try { MUS.pause(); } catch (e) {} MUS = null; } }
  function stopAll() {
    stopMusic();
    for (var k in CH) { try { CH[k].stop(); } catch (e) {} }
    CH = {};
  }

  var KEY = {}, PREV = {}, TAP = {};
  function down(k) { return !!KEY[k]; }
  function pressed(k) { return (!!KEY[k] && !PREV[k]) || !!TAP[k]; }

  function setWindow(nx, ny) {
    var ox = L.camX, oy = L.camY, dx = nx - ox, dy = ny - oy;
    L.camX = nx;
    L.camY = ny;
    L.xmin = nx - 64 < 0 ? L.kxmin : nx - 64;
    L.ymin = ny - 16 < 0 ? L.kymin : ny - 16;
    L.xmax = nx + W + 64 > L.w ? L.kxmax : nx + W + 64;
    L.ymax = ny + H + 16 > L.h ? L.kymax : ny + H + 16;
    if (dx === 0 && dy === 0) return;
    for (var i = 0; i < L.all.length; i++) {
      var e = L.all[i];
      if (e.t >= 32) continue;
      var X, Y;
      if (e.fixed) { X = e.x + dx; Y = e.y + dy; }
      else {
        var ly = L.layers[e.ly] || [1, 1, 16], fl = ly[2], odx = ox, ndx = nx, ody = oy, ndy = ny;
        if (fl & 1) { odx = ly[0] * ox; ndx = ly[0] * nx; }
        if (fl & 2) { ody = ly[1] * oy; ndy = ly[1] * ny; }
        X = trunc((e.x + odx) - ndx + dx);
        Y = trunc((e.y + ody) - ndy + dy);
      }
      if (X === e.x && Y === e.y) continue;
      if (e.t === 2 && e.hasMove && e.mv) { setX(e, X); setY(e, Y); }
      else { e.x = X; e.y = Y; }
    }
  }

  function startFrame(f) {
    var fr = D.frames[f];
    L = { f: f, w: fr.w, h: fr.h, layers: fr.layers, all: [], by: {}, names: {}, obst: [], bd: [], camX: 0, camY: 0, loop: 0, ms: 0, once: {}, every: {}, timers: {}, onceOnly: {}, next: null, disp: null, colCount: 0, colPrev: {}, colNow: {}, vblCount: 0, vblStep: 0, moveStep: 0 };
    L.kxmin = -480;
    L.kymin = -300;
    L.kxmax = fr.w + 480;
    L.kymax = fr.h + 300;
    setWindow(0, 0);
    fr.layers.forEach(function () { L.bd.push([]); });
    fr.inst.forEach(function (it) {
      var o = D.objs[it[0]];
      if (!o) return;
      if (!L.names[o.n]) L.names[o.n] = [];
      if (L.names[o.n].indexOf(it[0]) < 0) L.names[o.n].push(it[0]);
    });
    fr.inst.forEach(function (it) {
      var o = D.objs[it[0]];
      if (!o) return;
      if (o.t < 2) {
        L.bd[it[3]].push({ o: o, x: it[1], y: it[2] });
        if (o.ob === 1) L.obst.push([it[1], it[2], o.w, o.h, it[3]]);
        return;
      }
      if (f === 38 && o.n === 'textbox') return;
      make(it[0], it[1], it[2], it[3], -1);
    });
    buildGrid();
    if (f === 43) each('found new', function (e) { e.val = GLOBAL.found; });
    if (START[f]) START[f]();
  }

  function gp() { return C('gun power'); }

  var START = {}, EV = {}, TRIG = {};
  START[37] = function () { each('Active', function (e) { flash(e, 100); }); stopAll(); play('Darkness Ahead', 1, true); };
  EV[37] = function () { if (pressed(13) || pressed(32) || pressed(16)) L.next = 38; };

  START[39] = function () { stopAll(); play('die1', 6); };
  EV[39] = function () {
    if (every('g1', 40)) each('Active', function (e) { e.alt[0] += 1; });
    each('Active', function (e) { if (e.alt[0] > 1) e.alt[0] = 0; });
    each('Active', function (e) { if (e.alt[0] === 0) e.ink = 0; });
    each('Active', function (e) { if (e.alt[0] === 1) e.ink = 1; });
    if (timer('t2', 2000)) { play('die2', 6); var a = S('Active'); a.forEach(function (x) { destroy(x); create('Active 5', x, 0, 0); }); }
    if (timer('t5', 5000)) L.next = 37;
  };
  TRIG[39] = { anim: function (e, a) { if (e.o.n === 'Active 5' && a === 0) destroy(e); } };

  START[43] = function () { stopAll(); play('FANTASY_TONAL_SP_DSL32001', 1); };
  EV[43] = function () {
    var f = C('found new'), map = { 41: 0, 42: 12, 43: 13, 44: 14, 45: 15, 46: 16, 47: 17, 48: 18 };
    for (var k = 41; k <= 48; k++) {
      if (once('r' + k, C('found new') === k)) { each('Active', function (e) { force(e, map[k]); }); GLOBAL.found = k; CS('found new', 0); }
    }
    if (timer('t4', 4000)) L.next = 'end';
  };

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
  function trigAnim(e, a) { var t = TRIG[L.f]; if (t && t.anim) t.anim(e, a); }
  function trigBack(e) { var t = TRIG[L.f]; if (t && t.back) t.back(e); }
  function trigCol(a, b) { var t = TRIG[L.f]; if (t && t.col) t.col(a, b); }

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
    if (a3) L.zoom = a3.alt[0];
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
    if (C('life') <= 0) { L.next = 39; return; }
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
    if (a10.length && every('e251', 5000)) { GLOBAL.found = C('found new'); GLOBAL.cups = gp(); L.next = 43; }
    if (every('e253', 10000) && rnd(10) === 1 && !L.onceOnly.e253) { L.onceOnly.e253 = true; each('Active 20', startObj); }
  };

  function tick() {
    if (!L) return;
    L.loop++;
    L.ms += DT;
    L.colNow = {};
    for (var i = 0; i < L.all.length; i++) handle(L.all[i]);
    var ev = EV[L.f];
    if (ev) ev();
    var keep = [];
    for (var j = 0; j < L.all.length; j++) if (!L.all[j].dead) keep.push(L.all[j]);
    if (keep.length !== L.all.length) {
      L.all = keep;
      for (var k in L.by) L.by[k] = L.by[k].filter(function (e) { return !e.dead; });
    }
    L.colPrev = L.colNow;
    if (L.f === 38 && L.disp) {
      var x = L.disp[0] - W / 2, y = L.disp[1] - H / 2;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + W > L.w) x = L.w - W;
      if (y + H > L.h) y = L.h - H;
      setWindow(x, y);
    }
    PREV = {};
    for (var kk in KEY) PREV[kk] = KEY[kk];
    TAP = {};
    if (L.next != null) {
      var n = L.next;
      if (n === 'end') { finish(); return; }
      if (n === 37) { mode = 'title'; stopAll(); startFrame(37); syncButtons(); return; }
      startFrame(n);
      if (n === 38) GLOBAL.start = Date.now();
    }
  }

  function pattern(h) {
    if (PAT[h]) return PAT[h];
    var im = IM(h);
    if (!im) return null;
    var c = document.createElement('canvas');
    c.width = im[3];
    c.height = im[4];
    c.getContext('2d').drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], 0, 0, im[3], im[4]);
    PAT[h] = sg.createPattern(c, 'repeat');
    return PAT[h];
  }

  function render() {
    sg.setTransform(1, 0, 0, 1, 0, 0);
    sg.globalAlpha = 1;
    sg.fillStyle = '#000';
    sg.fillRect(0, 0, W, H);
    if (!L) return;
    for (var li = 0; li < L.layers.length; li++) {
      var ly = L.layers[li], ox = L.camX * ly[0], oy = L.camY * ly[1];
      if (!(ly[2] & 16) || (ly[2] & 131072)) continue;
      L.bd[li].forEach(function (b) {
        var o = b.o, x = b.x - ox, y = b.y - oy;
        if (o.t === 1) {
          var im = IM(o.img);
          if (!im || x > W || y > H || x + im[3] < 0 || y + im[4] < 0) return;
          sg.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], Math.round(x), Math.round(y), im[3], im[4]);
          return;
        }
        if (x > W || y > H || x + o.w < 0 || y + o.h < 0) return;
        if (o.img != null) {
          var p = pattern(o.img);
          if (!p) return;
          sg.save();
          sg.translate(Math.round(x), Math.round(y));
          sg.fillStyle = p;
          sg.fillRect(0, 0, o.w, o.h);
          sg.restore();
        } else if (o.col) {
          sg.fillStyle = '#' + o.col;
          sg.fillRect(Math.round(x), Math.round(y), o.w, o.h);
        }
      });
      for (var i = 0; i < L.all.length; i++) {
        var e = L.all[i];
        if (e.ly !== li || e.dead || e.sleep || !e.vis || e.t >= 32) continue;
        var ex = e.x - L.camX, ey = e.y - L.camY;
        sg.globalAlpha = e.alpha;
        if (e.t === 7) { drawCounter(e, ex, ey); sg.globalAlpha = 1; continue; }
        if (e.t === 3) { drawText(e, ex, ey); sg.globalAlpha = 1; continue; }
        if (e.img < 0) { sg.globalAlpha = 1; continue; }
        var im2 = IM(e.img);
        if (!im2 || ex - im2[5] > W || ey - im2[6] > H || ex - im2[5] + im2[3] < 0 || ey - im2[6] + im2[4] < 0) { sg.globalAlpha = 1; continue; }
        if (e.ink === 1 && hasFilter) sg.filter = 'invert(1)';
        if (e.add) sg.globalCompositeOperation = 'lighter';
        sg.drawImage(SHEETS[im2[0]], im2[1], im2[2], im2[3], im2[4], Math.round(ex - im2[5]), Math.round(ey - im2[6]), im2[3], im2[4]);
        if (e.add) sg.globalCompositeOperation = 'source-over';
        if (e.ink === 1 && hasFilter) sg.filter = 'none';
        sg.globalAlpha = 1;
      }
      if (L.f === 38) for (var pi = 0; pi < L.all.length; pi++) { var pe = L.all[pi]; if (pe.ly === li && pe.t >= 32 && pe.vis && !pe.dead && /^Perspective/.test(pe.o.n)) persp(pe); }
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(scene, 0, 0);
  }

  var tmp = document.createElement('canvas'), tg = tmp.getContext('2d');
  tmp.width = W;
  tmp.height = H;
  function persp(e) {
    var x = e.o.ext || '', fx = parseInt(x.slice(16, 18), 16) || 0, zoom = parseInt(x.slice(24, 26), 16) || 0, waves = parseInt(x.slice(40, 42), 16) || 1;
    if (e.o.n === 'Perspective' && L.zoom) zoom = L.zoom;
    tg.clearRect(0, 0, W, H);
    tg.drawImage(scene, 0, 0);
    var col = 2, xx;
    if (fx === 0) {
      var c = zoom / 1350;
      sg.fillStyle = '#000';
      sg.fillRect(0, 0, W, H);
      for (xx = 0; xx < W; xx += col) {
        var u = (xx + col / 2) / W - 0.5, f = 1 - c * (1 - Math.cos(2 * Math.PI * u)), sh = H * f;
        sg.drawImage(tmp, xx, (H - sh) / 2, col, sh, xx, 0, col, H);
      }
    } else if (fx === 2) {
      sg.fillStyle = '#000';
      sg.fillRect(0, 0, W, H);
      for (xx = 0; xx < W; xx += col) {
        var dy = zoom * Math.sin(2 * Math.PI * waves * xx / W);
        sg.drawImage(tmp, xx, 0, col, H, xx, dy, col, H);
        if (dy > 0) sg.drawImage(tmp, xx, 0, col, 1, xx, 0, col, dy);
        else if (dy < 0) sg.drawImage(tmp, xx, H - 1, col, 1, xx, H + dy, col, -dy);
      }
    }
  }

  function digitIndex(c) { return c === '-' ? 10 : c === '+' ? 11 : c === '.' ? 12 : c === 'e' ? 13 : +c; }
  function drawCounter(e, x, y) {
    var dg = e.o.digits;
    if (!dg) return;
    var s = String(Math.round(e.val)), xx = x;
    for (var i = s.length - 1; i >= 0; i--) {
      var im = IM(dg[digitIndex(s[i])]);
      if (!im) continue;
      xx -= im[3];
      sg.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], Math.round(xx), Math.round(y - im[4]), im[3], im[4]);
    }
  }

  function drawText(e, x, y) {
    var t = e.o.txt || {}, p = (t.paras && t.paras[0]) || {}, big = p.font === 28;
    sg.font = big ? '700 40px Tahoma, Verdana, sans-serif' : '700 21px "Courier New", Courier, monospace';
    sg.fillStyle = '#' + (p.color || 'ffffff');
    sg.textBaseline = 'top';
    sg.textAlign = 'left';
    var words = String(e.text).split(' '), line = '', lines = [], w = t.w || 400;
    words.forEach(function (wd) { var test = line ? line + ' ' + wd : wd; if (sg.measureText(test).width > w && line) { lines.push(line); line = wd; } else line = test; });
    if (line) lines.push(line);
    lines.forEach(function (l, i) { sg.fillText(l, Math.round(x), Math.round(y + i * 23)); });
  }

  var startBtn = root.querySelector('.fis-start'), pauseBtn = root.querySelector('.fis-pause'), muteBtn = root.querySelector('.fis-mute'), fullBtn = root.querySelector('.fis-full'), endBox = root.querySelector('.fis-end');
  var paused = false;
  function syncButtons() {
    var live = mode === 'play';
    startBtn.hidden = mode === 'play' || !loaded;
    pauseBtn.hidden = !live;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
    muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
    root.classList.toggle('fis-live', live);
  }
  function begin() {
    if (!loaded) return;
    var a = muted ? null : audio();
    if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    endBox.hidden = true;
    paused = false;
    mode = 'play';
    KEY = {};
    PREV = {};
    TAP = {};
    startFrame(38);
    GLOBAL.start = Date.now();
    syncButtons();
    run();
    try { cv.focus({ preventScroll: true }); } catch (e) { cv.focus(); }
  }
  function finish() {
    stopAll();
    var r = REWARD[GLOBAL.found] || REWARD[41], secs = (Date.now() - GLOBAL.start) / 1000;
    endBox.querySelector('.fis-end-img').src = r.img;
    endBox.querySelector('.fis-end-img').alt = r.name;
    endBox.querySelector('.fis-end-name').textContent = r.name;
    endBox.querySelector('.fis-end-link').href = '/fwm/roster/' + r.id;
    endBox.querySelector('.fis-end-cups').textContent = GLOBAL.cups + ' of 9 cupcakes in ' + Math.floor(secs / 60) + ':' + ('0' + Math.floor(secs % 60)).slice(-2) + '.';
    endBox.hidden = false;
    try {
      var best = JSON.parse(localStorage.getItem('fis-best') || 'null');
      if (!best || GLOBAL.cups > best.cup || (GLOBAL.cups === best.cup && secs < best.time)) localStorage.setItem('fis-best', JSON.stringify({ cup: GLOBAL.cups, time: secs }));
    } catch (e) {}
    mode = 'title';
    startFrame(37);
    syncButtons();
  }
  function pause(on) {
    if (mode !== 'play') return;
    paused = on;
    if (on) { stopMusic(); if (AC && AC.suspend) AC.suspend(); }
    else if (AC && AC.resume) AC.resume();
    syncButtons();
  }
  startBtn.addEventListener('click', begin);
  root.querySelector('.fis-again').addEventListener('click', begin);
  pauseBtn.addEventListener('click', function () { pause(!paused); });
  muteBtn.addEventListener('click', function () {
    muted = !muted;
    try { localStorage.setItem('fis-mute', muted ? '1' : '0'); } catch (e) {}
    if (muted) stopAll();
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

  var CODES = { ArrowLeft: 37, ArrowRight: 39, ArrowDown: 40, ArrowUp: 38, KeyZ: 90, KeyX: 88, Enter: 13, NumpadEnter: 13, Space: 32, ShiftLeft: 16, ShiftRight: 16 };
  function typing(t) { return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); }
  window.addEventListener('keydown', function (e) {
    if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Escape' || e.code === 'KeyP') { if (mode === 'play') { e.preventDefault(); pause(!paused); } return; }
    var k = CODES[e.code];
    if (!k) return;
    if (mode !== 'play') {
      if ((k === 13 || k === 32) && loaded && document.activeElement && root.contains(document.activeElement)) { e.preventDefault(); begin(); }
      return;
    }
    if (paused) return;
    e.preventDefault();
    if (!KEY[k] && !e.repeat) TAP[k] = true;
    KEY[k] = true;
  });
  window.addEventListener('keyup', function (e) { var k = CODES[e.code]; if (k) KEY[k] = false; });
  window.addEventListener('blur', function () { KEY = {}; pause(true); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(true); });
  Array.prototype.forEach.call(root.querySelectorAll('.fis-pad [data-k]'), function (b) {
    var k = { left: 37, right: 39, down: 40, jump: 90, fire: 88 }[b.getAttribute('data-k')];
    function on(e) { e.preventDefault(); if (paused) pause(false); if (!KEY[k]) TAP[k] = true; KEY[k] = true; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) {} }
    function off() { KEY[k] = false; b.classList.remove('on'); }
    b.addEventListener('pointerdown', on);
    b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off);
    b.addEventListener('lostpointercapture', off);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });

  var raf = 0, last = 0, acc = 0, seen = true;
  function frame(t) {
    raf = 0;
    if (!seen || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (!last) last = t;
    var d = Math.min(100, t - last);
    last = t;
    if (!loaded) { loadingScreen(); return; }
    if (mode !== 'play' || paused) {
      if (mode !== 'play' && L && L.f === 37) { acc += d; while (acc >= DT) { tick(); acc -= DT; } }
      render();
      if (paused) { g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.font = '700 40px Tahoma, sans-serif'; g.textAlign = 'center'; g.fillText('PAUSED', W / 2, H / 2); }
      return;
    }
    acc += d;
    var n = 0;
    while (acc >= DT && n < 5) { tick(); acc -= DT; n++; }
    if (n === 5) acc = 0;
    render();
  }
  function loadingScreen() {
    g.fillStyle = '#000';
    g.fillRect(0, 0, W, H);
    g.fillStyle = loadErr ? '#ff8a8a' : '#9fd8ff';
    g.font = '700 22px Tahoma, sans-serif';
    g.textAlign = 'center';
    g.fillText(loadErr ? 'Could not load the game. Refresh to try again.' : 'Loading...', W / 2, H / 2);
  }
  function run() { if (!raf && seen && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) {
      seen = es[0].intersectionRatio > 0.25;
      if (!seen) pause(true);
      else run();
    }, { threshold: [0, 0.25, 0.5] }).observe(cv);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });

  fetch(BASE + 'data.json' + VER).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    D = d;
    var n = d.atlases, left = n;
    for (var i = 0; i < n; i++) {
      var im = new Image();
      im.onload = function () { if (--left === 0) { loaded = true; mode = 'title'; startFrame(37); syncButtons(); } };
      im.onerror = function () { loadErr = true; };
      im.src = BASE + 'atlas' + i + '.webp' + VER;
      SHEETS.push(im);
    }
  }).catch(function () { loadErr = true; });
  syncButtons();
  run();

  window.FIS = {
    state: function () {
      if (!L) return { frame: null };
      var hb = O1('hit box'), b = O1('Active 14');
      return { frame: L.f, mode: mode, t: L.loop, x: hb ? hb.x : 0, y: hb ? hb.y : 0, life: C('life'), gun: C('gun power'), area: C('area'), boss: b ? b.alt[0] : null, final: C('final boss'), cam: [L.camX, L.camY], objs: L.all.length };
    },
    warp: function (x, y) {
      var hb = O1('hit box'), cl = O1('current level'), fo = O1('follow');
      setPos(hb, x, y);
      setPos(cl, x, y);
      setPos(fo, x, y);
      var nx = Math.max(0, Math.min(L.w - W, x - W / 2)), ny = Math.max(0, Math.min(L.h - H, y - H / 2));
      setWindow(nx, ny);
    },
    set: function (name, v) { CS(name, v); },
    key: function (k, on) { if (on && !KEY[k]) TAP[k] = true; KEY[k] = on; },
    begin: begin,
    scene: scene,
    inWall: function (name) { return S(name).filter(function (e) { return !e.dead && !e.sleep && bg(e); }).map(function (e) { return [e.x, e.y]; }); },
    tick: function (n) { for (var i = 0; i < (n || 1); i++) tick(); },
    objs: function (name) { return S(name).map(function (e) { return { x: e.x, y: e.y, dir: e.dir, vis: e.vis, sleep: e.sleep, dead: e.dead, speed: e.speed, ly: e.ly, frame: e.aFrame, anim: e.aOn, alt: e.alt.slice(0, 11) }; }); },
    dump: function () { return L.all.filter(function (e) { return !e.dead && e.vis && !e.sleep; }).map(function (e) { return [e.o.n, e.ly, e.x, e.y, [e.x - e.hx, e.y - e.hy, e.w, e.h], e.dir, e.img]; }); }
  };
})();
