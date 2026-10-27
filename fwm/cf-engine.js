window.CFGame = function (opt) {
  var root = opt.root;
  if (!root) return null;
  var cv = root.querySelector('.fis-canvas'), g = cv.getContext('2d');
  var BASE = opt.base, VER = opt.ver || '?v=1', W = 800, H = 480, DT = 1000 / 60;
  cv.width = W;
  cv.height = H;
  var scene = document.createElement('canvas'), sg = scene.getContext('2d');
  scene.width = W;
  scene.height = H;
  var D = null, SHEETS = [], MASKS = {}, PAT = {}, loaded = false, loadErr = false;
  var COS = [256, 251, 236, 212, 181, 142, 97, 49, 0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251];
  var SIN = [0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251, 256, 251, 236, 212, 181, 142, 97, 49];
  var CSS = [2599, 0, 844, 31, 479, 30, 312, 29, 210, 28, 137, 27, 78, 26, 25, 25, 0, 24];
  var ACCEL = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 320, 336, 352, 368, 384, 400, 416, 432, 448, 480, 512, 544, 560, 592, 624, 640, 672, 688, 720, 736, 768, 784, 816, 848, 864, 896, 928, 944, 976, 992, 1024, 1120, 1216, 1312, 1440, 1536, 1632, 1728, 1824, 1952, 2048, 2240, 2432, 2688, 2880, 3072, 3264, 3456, 3712, 3904, 4096, 6544, 4914, 5216, 5732, 6144, 6553, 6962, 7366, 7780, 8192, 9836, 11672, 13316, 14960, 16604, 18248, 19892, 21504, 25600, 25600];
  var MVAP = [0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, -4, 0, -8, 0, 0, 0, -2, -2, 2, 2, -4, -4, 4, 4, -8, -8, 8, 8, -4, 4, -8, 8, 0, 0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, 0, 0, 4, 0, 8, 0, 0, -2, 2, 2, -2, -4, 4, 4, -4, -8, 8, 8, -8, 4, 4, 8, 8, 0, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 4, 0, 8, 0, 0, 0, 2, 2, -2, -2, 4, 4, -4, -4, 8, 8, -8, -8, 4, -4, 8, -8, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 0, 0, -4, 0, -8, 0, 0, 2, -2, -2, 2, 4, -4, -4, 4, 8, -8, -8, 8, -4, -4, -8, -8, 0, 0];
  var TWO = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  var APPROX = [3, 1, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 2, 0, 1, 2, 0, 0, 0, 1, 2, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 1, 2, 0];
  var MASKB = [0xFFFFFFFC, 0xFFFFFFFE, 0xFFFFFFFF], PLUSANG = [-4, 4, -2, 2, -1, 1], PLUSTRY = [-4, 4, -4, 4, -4, 4];
  var REWARDS = { 41: ['Jack-O-Bonnie', 'jack-o-bonnie'], 42: ['Jack-O-Chica', 'jack-o-chica'], 43: ['Animdude', 'animdude'], 44: ['Mr. Chipper', 'mr-chipper'], 45: ['Nightmare BB', 'nightmare-balloon-boy'], 46: ['Nightmarionne', 'nightmarionne'], 47: ['Coffee', 'coffee'], 48: ['Purple Guy', 'purple-guy'], 'nightmare-mangle': ['Nightmare Mangle', 'nightmare-mangle', 1] };
  var REB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 31, 0, 1, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 24, 25, 26, 27, 27, 28, 28, 28, 28, 29, 29, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 23, 24, 25, 28, 27, 26, 25, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 20, 21, 22, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 8, 7, 6, 5, 4, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16, 17, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 16, 15, 14, 13, 12, 11, 10, 9, 8, 12, 13, 14, 15, 15, 16, 16, 16, 16, 17, 17, 18, 19, 20, 21, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7, 8, 9, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 0, 1, 2, 0, 0, 1, 1, 2, 3, 4, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 28, 29, 30, 31, 31, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 25, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10, 11, 12, 13, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var QCOL = {}, ONCOL = {}, QBACK = {}, SKIP = null;

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
    if (o.inkraw && o.inkraw.length >= 16) {
      var ie = parseInt(o.inkraw.slice(0, 2), 16) | (parseInt(o.inkraw.slice(2, 4), 16) << 8);
      e.add = (ie & 0xFFF) === 9;
      if (ie & 0x1000) e.alpha = parseInt(o.inkraw.slice(14, 16), 16) / 255;
      else if ((ie & 0xFFF) === 1) e.alpha = 1 - Math.min(128, le(o.inkraw, 8, 4)) / 128;
      else e.alpha = 1;
    }
    if (o.t === 7) { e.val = o.cnt[0]; e.min = o.cnt[1]; e.max = o.cnt[2]; }
    if (o.t >= 32 && o.ext && /^Perspective/.test(o.n)) e.px = parsePersp(o.ext);
    if (o.t >= 32 && o.ext && /^Date & Time/.test(o.n)) e.clock = parseClock(o.ext);
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
    } else if (m.t === 1) {
      e.mv = { t: 1, x1: m.dx + e.x, x2: m.fx + e.x, y1: m.dy + e.y, y2: m.fy + e.y, stopped: 0, old: 0 };
      e.speed = 0;
      e.minS = 0;
      e.maxS = 100;
      L.noCursor = true;
      L.mouseFrame = true;
    } else {
      e.mv = { t: 0 };
      e.speed = 0;
      e.chk = true;
    }
  }

  function mouseMove(e) {
    var mv = e.mv, nx = e.x, ny = e.y;
    if (MOUSE.on) {
      nx = Math.max(mv.x1, Math.min(mv.x2, Math.round(MOUSE.x + L.camX)));
      ny = Math.max(mv.y1, Math.min(mv.y2, Math.round(MOUSE.y + L.camY)));
    }
    var sp = Math.min(250, (Math.abs(nx - e.x) + Math.abs(ny - e.y)) << 2);
    if (sp) { mv.stopped = 0; mv.old = sp; }
    if (++mv.stopped > 10) mv.old = 0;
    e.speed = mv.old;
    e.x = nx;
    e.y = ny;
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
      e.pathEnd = L.loop;
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
    else if (t === 1) mouseMove(e);
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

  function destroy(e) {
    if (!e || e.dead) return;
    e.dead = true;
    e.noCall = true;
    if (e.t === 2 && e.o.fout && e.vis) { e.fading = { t: 0, dur: e.o.fout }; e.sleep = false; }
  }

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
    var rows = mask(h), bm = r[5] != null ? mask(r[5]) : null;
    if (!rows) return true;
    var y1 = Math.max(by, r[1]), y2 = Math.min(by + rows.length, r[1] + r[3]), x1 = r[0] - bx, x2 = r[0] + r[2] - bx;
    for (var y = y1; y < y2; y++) {
      var runs = rows[y - by];
      if (bm) {
        var br = bm[y - r[1]];
        if (!br) continue;
        for (var i = 0; i < runs.length; i += 2)
          for (var j = 0; j < br.length; j += 2) if (runs[i] + bx < br[j + 1] + r[0] && runs[i + 1] + bx > br[j] + r[0]) return true;
        continue;
      }
      for (var k = 0; k < runs.length; k += 2) if (runs[k] < x2 && runs[k + 1] > x1) return true;
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
  function count(name) {
    var n = S(name).length, ois = L.names[name];
    if (ois) for (var i = 0; i < L.all.length; i++) if (L.all[i].fading && L.all[i].byOut && ois.indexOf(L.all[i].oi) >= 0) n++;
    return n;
  }
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
  function shootToward(e, name, speed, tx, ty) {
    var ois = L.names[name];
    if (!ois || !e) return null;
    var x = e.x + e.ax - e.hx, y = e.y + e.ay - e.hy;
    return make(ois[0], x, y, e.ly, dirFromPente(tx - x, ty - y) & 31, speed);
  }
  var TILE = 512;
  function decal(ly, tx, ty) {
    var k = ly + ':' + tx + ':' + ty, t = L.decal[k];
    if (!t) {
      var c = document.createElement('canvas');
      c.width = TILE;
      c.height = TILE;
      t = L.decal[k] = { c: c, g: c.getContext('2d'), x: tx * TILE, y: ty * TILE, ly: ly };
      L.decals.push(t);
    }
    return t;
  }
  function paste(e, ob) {
    var im = e && e.img >= 0 && IM(e.img);
    if (!im) return;
    var x = Math.round(e.x - e.hx), y = Math.round(e.y - e.hy);
    for (var tx = Math.floor(x / TILE); tx <= Math.floor((x + im[3] - 1) / TILE); tx++)
      for (var ty = Math.floor(y / TILE); ty <= Math.floor((y + im[4] - 1) / TILE); ty++) {
        var t = decal(e.ly, tx, ty);
        t.g.globalAlpha = e.alpha;
        t.g.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], x - t.x, y - t.y, im[3], im[4]);
      }
    if (ob === 1) { L.obst.push([x, y, e.w, e.h, e.ly, e.img]); buildGrid(); }
  }
  function clicked(name) {
    if (!pressed(1) || !MOUSE.on) return [];
    var mx = MOUSE.x + L.camX, my = MOUSE.y + L.camY;
    return S(name).filter(function (e) {
      if (e.dead || !e.vis || e.img < 0) return false;
      var px = Math.floor(mx - (e.x - e.hx)), py = Math.floor(my - (e.y - e.hy));
      if (px < 0 || py < 0 || px >= e.w || py >= e.h) return false;
      var rows = mask(e.img), r = rows && rows[py];
      if (!rows) return true;
      for (var i = 0; r && i < r.length; i += 2) if (px >= r[i] && px < r[i + 1]) return true;
      return false;
    });
  }
  function clock(e, act) {
    if (!e || !e.clock) return;
    if (act === 'reset') e.clock.ms = 0;
    else if (act === 'start') e.clock.on = true;
    else if (act === 'stop') e.clock.on = false;
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

  var SFX_VOL = opt.sfxVol || 0.45, MUS_VOL = opt.musVol || 0.4, GAIN = null, AC = null, BUF = {}, LOADING = {}, CH = {}, MUS = null, muted = false;
  try { muted = localStorage.getItem('fis-mute') === '1'; } catch (e) {}
  function audio() {
    if (AC) return AC;
    var A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    try { AC = new A(); GAIN = AC.createGain(); GAIN.gain.value = SFX_VOL; GAIN.connect(AC.destination); } catch (e) { AC = null; }
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
  var SND_END = {}, SND_TOK = {}, GT = 0, quiet = false, CHV = {}, CHG = {};
  function setVolume(ch, v) {
    CHV[ch] = Math.max(0, Math.min(100, v)) / 100;
    if (CHG[ch]) CHG[ch].gain.value = CHV[ch];
    if (MUS && MUS.ch === ch && MUS.gain) MUS.gain.gain.value = MUS_VOL * CHV[ch];
  }
  function selectMovement(e, n) { if (e && e.t === 2) initMove(e, n, null); }
  function forceAnimSpeed(e, sp) { if (e && e.t === 2) e.aSpeedForced = sp + 1; }
  function setEffect(e, name) { if (e) e.add = name === 'Add'; }
  function setText(e, txt) { if (e) e.text = String(txt); }
  function pathEnded(e) { return !!e && e.pathEnd === L.loop; }
  function playing(name) { return (SND_END[name] || 0) > GT; }
  function play(name, ch, loop) {
    if (!D.sounds[name]) return;
    var t0 = GT;
    SND_END[name] = t0 + (BUF[name] ? BUF[name].duration * 1000 : 3000);
    SND_TOK[name] = t0;
    if (quiet) return;
    if (muted) {
      if (!loop && !BUF[name]) loadSnd(name, function (b) { if (SND_TOK[name] === t0) SND_END[name] = t0 + b.duration * 1000; });
      return;
    }
    if (loop && /\.mp3$/.test(D.sounds[name])) { music(name, ch); return; }
    if (MUS && MUS.ch === ch) stopMusic();
    var a = audio();
    if (!a) return;
    if (a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    var stamp = L ? L.loop : 0;
    loadSnd(name, function (b) {
      if (!L || L.loop - stamp > 30) return;
      if (CH[ch]) { try { CH[ch].stop(); } catch (e) {} }
      var s = a.createBufferSource(), gn = a.createGain();
      s.buffer = b;
      s.loop = !!loop;
      gn.gain.value = CHV[ch] == null ? 1 : CHV[ch];
      s.connect(gn);
      gn.connect(GAIN || a.destination);
      CHG[ch] = gn;
      s.start();
      if (!loop && SND_TOK[name] === t0) SND_END[name] = GT + b.duration * 1000;
      CH[ch] = s;
      s.onended = function () { if (CH[ch] === s) delete CH[ch]; };
    });
  }
  function music(name, ch) {
    if (MUS && MUS.n === name) return;
    stopMusic();
    if (CH[ch]) { try { CH[ch].stop(); } catch (e) {} delete CH[ch]; }
    var a = audio();
    if (!a) return;
    if (a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    var m = MUS = { n: name, ch: ch, src: null, gain: null };
    loadSnd(name, function (b) {
      if (MUS !== m) return;
      var src = a.createBufferSource(), gn = a.createGain();
      src.buffer = b;
      src.loop = true;
      gn.gain.value = MUS_VOL * (CHV[ch] == null ? 1 : CHV[ch]);
      src.connect(gn);
      gn.connect(a.destination);
      src.start();
      m.src = src;
      m.gain = gn;
    });
  }
  function stopMusic() {
    if (!MUS) return;
    if (MUS.src) { try { MUS.src.stop(); } catch (e) {} }
    delete BUF[MUS.n];
    MUS = null;
  }
  function stopAll() {
    stopMusic();
    SND_END = {};
    SND_TOK = {};
    for (var k in CH) { try { CH[k].stop(); } catch (e) {} }
    CH = {};
  }

  var KEY = {}, PREV = {}, TAP = {}, MOUSE = { x: 0, y: 0, on: false };
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
        if (fl & 1) { odx = trunc(ly[0] * ox); ndx = trunc(ly[0] * nx); }
        if (fl & 2) { ody = trunc(ly[1] * oy); ndy = trunc(ly[1] * ny); }
        X = e.x + odx - ndx + dx;
        Y = e.y + ody - ndy + dy;
      }
      if (X === e.x && Y === e.y) continue;
      if (e.t === 2 && e.hasMove && e.mv) { setX(e, X); setY(e, Y); }
      else { e.x = X; e.y = Y; }
    }
  }

  function startFrame(f) {
    var fr = D.frames[f];
    L = { f: f, w: fr.w, h: fr.h, layers: fr.layers, all: [], by: {}, names: {}, obst: [], bd: [], camX: 0, camY: 0, loop: 0, ms: 0, once: {}, every: {}, timers: {}, onceOnly: {}, next: null, disp: null, colCount: 0, colPrev: {}, colNow: {}, vblCount: 0, vblStep: 0, moveStep: 0, decal: {}, decals: [] };
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
        L.bd[it[3]].push({ o: o, x: it[1], y: it[2], a: o.inkraw && o.inkraw.length >= 16 ? parseInt(o.inkraw.slice(14, 16), 16) / 255 : 1 });
        if (o.ob === 1) L.obst.push([it[1], it[2], o.w, o.h, it[3], o.t === 1 && o.coll !== 0 ? o.img : null]);
        return;
      }
      if (it[4] || (SKIP && SKIP(f, o))) return;
      make(it[0], it[1], it[2], it[3], -1);
    });
    buildGrid();
    if (f === 43) each('found new', function (e) { e.val = GLOBAL.found; });
    else hideArt();
    if (START[f]) START[f]();
    root.classList.toggle('fis-nopad', !!L.mouseFrame);
    cv.style.cursor = mode === 'play' && L.noCursor ? 'none' : '';
  }

  var START = {}, EV = {}, TRIG = {};
  START[43] = function () {
    stopAll();
    play('FANTASY_TONAL_SP_DSL32001', 1);
    var r = REWARDS[GLOBAL.found];
    if (r && r[2]) { each('Active', hide); showArt(r[1]); }
  };
  var art = null;
  function placeArt() {
    if (!art || art.hidden) return;
    var w = cv.offsetWidth, h = cv.offsetHeight;
    art.style.left = (cv.offsetLeft + w * 281 / W) + 'px';
    art.style.top = (cv.offsetTop + h * 148 / H) + 'px';
    art.style.width = (w * 250 / W) + 'px';
    art.style.height = (h * 250 / H) + 'px';
  }
  function showArt(slug) {
    if (!art) {
      art = document.createElement('img');
      art.alt = '';
      art.style.cssText = 'position:absolute;pointer-events:none;image-rendering:auto';
      cv.parentNode.appendChild(art);
      window.addEventListener('resize', placeArt);
    }
    art.src = 'https://fnaf-world.fntduserguide.com/idle/' + slug + '.webp';
    art.hidden = false;
    placeArt();
  }
  function hideArt() { if (art) art.hidden = true; }
  EV[43] = function () {
    var map = { 41: 0, 42: 12, 43: 13, 44: 14, 45: 15, 46: 16, 47: 17, 48: 18 };
    for (var k = 41; k <= 48; k++) {
      if (once('r' + k, C('found new') === k)) { each('Active', function (e) { force(e, map[k]); }); GLOBAL.found = k; CS('found new', 0); }
    }
    if (timer('t4', 4000)) L.next = 'end';
  };
  function trigAnim(e, a) { var t = TRIG[L.f]; if (t && t.anim) t.anim(e, a); }
  function trigBack(e) { var t = TRIG[L.f]; if (t && t.back) t.back(e); }
  function trigCol(a, b) { var t = TRIG[L.f]; if (t && t.col) t.col(a, b); }
  function go(n) { L.next = n; }
  function onceOnly(id) { if (L.onceOnly[id]) return false; L.onceOnly[id] = true; return true; }
  function setAlphaCoef(e, c) { if (e) e.alpha = Math.max(0, Math.min(255, 255 - c)) / 255; }
  function setZoom(e, z) { if (e && e.px) e.px.zoom = z; }
  function frameInfo() { return L; }
  var api = { S: S, O1: O1, C: C, CS: CS, CA: CA, count: count, each: each, where: where, colSel: colSel, notCol: notCol, once: once, onceOnly: onceOnly, every: every, timer: timer, create: create, shoot: shoot, lookAt: lookAt, facing: facing, nearBorder: nearBorder, hide: hide, show: show, flash: flash, toFront: toFront, pick: pick, display: display, setPos: setPos, setX: setX, setY: setY, setDir: setDir, setSpeed: setSpeed, speedOf: speedOf, stopObj: stopObj, startObj: startObj, nextMovement: nextMovement, force: force, bg: bg, destroy: destroy, bounce: bounce, play: play, stopAll: stopAll, playing: playing, pressed: pressed, down: down, rnd: rnd, go: go, setAlphaCoef: setAlphaCoef, setZoom: setZoom, frame: frameInfo, G: GLOBAL, shootToward: shootToward, paste: paste, clicked: clicked, clock: clock, setVolume: setVolume, selectMovement: selectMovement, forceAnimSpeed: forceAnimSpeed, setEffect: setEffect, setText: setText, pathEnded: pathEnded, dirFromMask: dirFromMask };
  var CFG = opt.setup(api) || {};
  ['START', 'EV', 'TRIG'].forEach(function (k) { var src = CFG[k] || {}; var dst = k === 'START' ? START : k === 'EV' ? EV : TRIG; for (var f in src) dst[f] = src[f]; });
  QCOL = CFG.QCOL || {};
  ONCOL = CFG.ONCOL || {};
  QBACK = CFG.QBACK || {};
  SKIP = CFG.SKIP || null;

  function tick() {
    if (!L) return;
    L.loop++;
    L.ms += DT;
    GT += DT;
    for (var ci = 0; ci < L.all.length; ci++) if (L.all[ci].clock && L.all[ci].clock.on) L.all[ci].clock.ms += DT;
    L.colNow = {};
    for (var i = 0; i < L.all.length; i++) handle(L.all[i]);
    var ev = EV[L.f];
    if (ev) ev();
    var keep = [], gone = false;
    for (var j = 0; j < L.all.length; j++) {
      var fe = L.all[j];
      if (fe.fading) { fe.fading.t += DT; if (fe.fading.t >= fe.fading.dur) fe.fading = null; }
      if (fe.dead && !fe.byOut) { gone = true; fe.byOut = true; }
      if (!fe.dead || fe.fading) keep.push(fe);
    }
    if (gone || keep.length !== L.all.length) {
      L.all = keep;
      for (var k in L.by) L.by[k] = L.by[k].filter(function (e) { return !e.dead; });
    }
    L.colPrev = L.colNow;
    if (L.disp) {
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
      if (n === 'title') { toTitle(); return; }
      startFrame(n);
      if (n === opt.play) GLOBAL.start = Date.now();
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
      var ly = L.layers[li], ox = L.camX * ((ly[2] & 1) ? ly[0] : 1), oy = L.camY * ((ly[2] & 2) ? ly[1] : 1);
      if (!(ly[2] & 16) || (ly[2] & 131072)) continue;
      L.bd[li].forEach(function (b) {
        var o = b.o, x = b.x - ox, y = b.y - oy;
        if (b.a === 0) return;
        sg.globalAlpha = b.a == null ? 1 : b.a;
        if (o.t === 1) {
          var im = IM(o.img);
          if (!im || x > W || y > H || x + im[3] < 0 || y + im[4] < 0) return;
          sg.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], Math.round(x), Math.round(y), im[3], im[4]);
          sg.globalAlpha = 1;
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
        sg.globalAlpha = 1;
      });
      sg.globalAlpha = 1;
      for (var di = 0; di < L.decals.length; di++) {
        var dc = L.decals[di], dx = dc.x - ox, dy = dc.y - oy;
        if (dc.ly === li && dx < W && dy < H && dx + TILE > 0 && dy + TILE > 0) sg.drawImage(dc.c, Math.round(dx), Math.round(dy));
      }
      for (var i = 0; i < L.all.length; i++) {
        var e = L.all[i];
        if (e.ly !== li || (e.dead && !e.fading) || !e.vis) continue;
        if (e.t >= 32) { if (e.px) persp(e); else if (e.clock) drawClock(e); continue; }
        if (e.sleep) continue;
        var ex = e.x - L.camX, ey = e.y - L.camY;
        sg.globalAlpha = e.fading ? e.alpha * Math.max(0, 1 - e.fading.t / e.fading.dur) : e.alpha;
        if (e.t === 7) { drawCounter(e, ex, ey); sg.globalAlpha = 1; continue; }
        if (e.t === 3) { drawText(e, ex, ey); sg.globalAlpha = 1; continue; }
        if (e.img < 0) { sg.globalAlpha = 1; continue; }
        var im2 = IM(e.img);
        if (!im2 || ex - im2[5] > W || ey - im2[6] > H || ex - im2[5] + im2[3] < 0 || ey - im2[6] + im2[4] < 0) { sg.globalAlpha = 1; continue; }
        if (e.add) sg.globalCompositeOperation = 'lighter';
        if (e.ink === 1) sg.drawImage(inverted(e.img), Math.round(ex - im2[5]), Math.round(ey - im2[6]));
        else sg.drawImage(SHEETS[im2[0]], im2[1], im2[2], im2[3], im2[4], Math.round(ex - im2[5]), Math.round(ey - im2[6]), im2[3], im2[4]);
        if (e.add) sg.globalCompositeOperation = 'source-over';
        sg.globalAlpha = 1;
      }
    }
    if (opt.overlay) { sg.setTransform(1, 0, 0, 1, 0, 0); sg.globalAlpha = 1; opt.overlay(sg, L, mode === 'play'); }
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(scene, 0, 0);
  }

  var selLocked = false;
  function lockSelect(on) {
    selLocked = on;
    var st = document.documentElement.style;
    st.webkitUserSelect = on ? 'none' : '';
    st.userSelect = on ? 'none' : '';
    st.webkitTouchCallout = on ? 'none' : '';
    if (on) { try { var sel = window.getSelection(); if (sel) sel.removeAllRanges(); } catch (e) {} }
  }
  document.addEventListener('selectstart', function (e) { if (selLocked) e.preventDefault(); });
  cv.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  var INV = {};
  function inverted(h) {
    if (INV[h]) return INV[h];
    var im = IM(h), c = document.createElement('canvas'), x = c.getContext('2d');
    c.width = im[3];
    c.height = im[4];
    x.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], 0, 0, im[3], im[4]);
    x.globalCompositeOperation = 'difference';
    x.fillStyle = '#fff';
    x.fillRect(0, 0, im[3], im[4]);
    x.globalCompositeOperation = 'destination-in';
    x.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], 0, 0, im[3], im[4]);
    INV[h] = c;
    return c;
  }
  var tmp = document.createElement('canvas'), tg = tmp.getContext('2d');
  function le(hex, pos, n) { var v = 0; for (var i = n - 1; i >= 0; i--) v = v * 256 + parseInt(hex.substr(pos + i * 2, 2), 16); return v; }
  function parsePersp(hex) {
    if (!hex || hex.length < 52) return null;
    var off = le(hex, 32, 4);
    if (off > 0x7FFFFFFF) off -= 0x100000000;
    return { w: le(hex, 8, 2), h: le(hex, 12, 2), fx: le(hex, 16, 1), vert: le(hex, 18, 1) === 1, zoom: le(hex, 24, 4) | 0, off: off, waves: le(hex, 40, 4) | 0, pdir: le(hex, 48, 1) };
  }
  function parseClock(hex) {
    if (!hex || hex.length < 348) return null;
    var face = '';
    for (var i = 0; i < 32; i++) { var c = le(hex, 212 + i * 4, 2); if (!c) break; face += String.fromCharCode(c); }
    var fh = le(hex, 156, 4);
    if (fh > 0x7FFFFFFF) fh -= 0x100000000;
    return { w: le(hex, 0, 2), h: le(hex, 4, 2), size: Math.abs(fh) || 12, bold: le(hex, 188, 4) >= 600, face: face || 'Tahoma', col: '#' + hex.substr(340, 2) + hex.substr(342, 2) + hex.substr(344, 2), on: false, ms: 0 };
  }
  function drawClock(e) {
    var c = e.clock, t = Math.floor(c.ms / 1000);
    var txt = ('0' + Math.floor(t / 3600)).slice(-2) + ':' + ('0' + (Math.floor(t / 60) % 60)).slice(-2) + ':' + ('0' + (t % 60)).slice(-2);
    sg.fillStyle = c.col;
    sg.font = (c.bold ? '700 ' : '400 ') + c.size + 'px ' + c.face + ', sans-serif';
    sg.textAlign = 'center';
    sg.textBaseline = 'middle';
    sg.fillText(txt, e.x + c.w / 2, e.y + c.h / 2);
    sg.textBaseline = 'alphabetic';
  }
  function persp(e) {
    var p = e.px, X = e.x, Y = e.y, IW = p.w, IH = p.h, Z = p.zoom, i, v;
    if (tmp.width !== IW || tmp.height !== IH) { tmp.width = IW; tmp.height = IH; }
    tg.clearRect(0, 0, IW, IH);
    tg.drawImage(scene, -X, -Y);
    var WI = (p.waves * 360) / IH, dl = 3.141592 / 180;
    sg.save();
    sg.beginPath();
    sg.rect(X, Y, IW, IH);
    sg.clip();
    sg.fillStyle = '#000';
    sg.fillRect(X, Y, IW, IH);
    if (p.fx === 0 && !p.vert) for (i = 0; i <= IW; i++) { v = trunc(Math.max(1, IH + Math.sin((i - Math.floor(IW / 2)) / (IW / 3.1415) + 3.1415 / 2) * Z - Z)); sg.drawImage(tmp, i, Math.floor(IH / 2) - Math.floor(v / 2), 1, v, X + i, Y, 1, IH); }
    else if (p.fx === 0 && p.vert) for (i = 0; i <= IH; i++) { v = trunc(Math.max(1, IW + Math.sin((i - Math.floor(IH / 2)) / (IH / 3.1415) + 3.1415 / 2) * Z - Z)); sg.drawImage(tmp, Math.floor(IW / 2) - Math.floor(v / 2), i, v, 1, X, Y + i, IW, 1); }
    else if (p.fx === 1 && !p.vert) for (i = 0; i <= IW; i++) { var cz = trunc(((p.pdir ? IW - i - 1 : i) * Z) / IW); v = trunc(IH / ((IH + cz) / IH) + 0.5); sg.drawImage(tmp, i, Math.floor(IH / 2) - Math.floor(v / 2), 1, v, X + i, Y, 1, IH); }
    else if (p.fx === 1 && p.vert) for (i = 0; i <= IH; i++) { var cz2 = trunc(((p.pdir ? IH - i - 1 : i) * Z) / IH); v = trunc(IW / ((IW + cz2) / IW) + 0.5); sg.drawImage(tmp, Math.floor(IW / 2) - Math.floor(v / 2), i, v, 1, X, Y + i, IW, 1); }
    else if (p.fx === 2 && !p.vert) for (i = 0; i <= IW; i++) { v = Math.max(1, trunc(IH + Math.sin((i * WI + p.off) * dl) * Z - Z)); sg.drawImage(tmp, i, Math.floor(IH / 2) - Math.floor(v / 2), 1, v, X + i, Y, 1, IH); }
    else if (p.fx === 2 && p.vert) for (i = 0; i <= IH; i++) { v = Math.max(1, trunc(IW + Math.sin((i * WI + p.off) * dl) * Z - Z)); sg.drawImage(tmp, Math.floor(IW / 2) - Math.floor(v / 2), i, v, 1, X, Y + i, IW, 1); }
    else if (p.fx === 3 && !p.vert) { sg.clearRect(X, Y, IW, IH); for (i = 0; i <= IH; i++) sg.drawImage(tmp, 0, i, IW, 1, X + trunc(Math.sin((i * WI + p.off) * dl) * Z), Y + i, IW, 1); }
    else if (p.fx === 3 && p.vert) { sg.clearRect(X, Y, IW, IH); for (i = 0; i <= IW; i++) sg.drawImage(tmp, i, 0, 1, IH, X + i, Y + trunc(Math.sin((i * WI + p.off) * dl) * Z), 1, IH); }
    else sg.drawImage(tmp, X, Y);
    sg.restore();
  }

  function digitIndex(c) { return c === '-' ? 10 : c === '+' ? 11 : c === '.' ? 12 : c === 'e' ? 13 : +c; }
  function drawCounter(e, x, y) {
    var bar = e.o.bar;
    if (bar) {
      var span = e.max - e.min, horiz = bar[0] === 3, full = horiz ? bar[1] : bar[2];
      var n = span > 0 ? Math.floor(((e.val - e.min) * full) / span) : 0;
      if (n <= 0) return;
      var bw = horiz ? n : bar[1], bh = horiz ? bar[2] : n, inv = (bar[3] & 0x100) !== 0;
      var bx = x - (horiz && inv ? n - bar[1] : 0), by = y - (!horiz && inv ? n - bar[2] : 0);
      if (bar[4] === 2) {
        var c1 = '#' + bar[5], c2 = '#' + bar[6];
        if (inv) { var tc = c1; c1 = c2; c2 = tc; }
        var gr = bar[7] ? sg.createLinearGradient(0, by, 0, by + bh) : sg.createLinearGradient(bx, 0, bx + bw, 0);
        gr.addColorStop(0, c1);
        gr.addColorStop(1, c2);
        sg.fillStyle = gr;
      } else sg.fillStyle = '#' + bar[5];
      sg.fillRect(Math.round(bx), Math.round(by), bw, bh);
      return;
    }
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

  var FACES = { System: 'Arial, Helvetica, sans-serif', Terminal: '"Courier New", Courier, monospace', Tahoma: 'Tahoma, Verdana, sans-serif', 'OCR A Extended': '"OCR A Extended", "OCR A Std", "Courier New", monospace' };
  function drawText(e, x, y) {
    var t = e.o.txt || {}, p = (t.paras && t.paras[0]) || {}, big = p.font === 28;
    var fnt = !opt.legacyText && D.fonts && D.fonts[p.font];
    if (fnt) {
      var size = fnt[1], tw = t.w || 400;
      sg.font = (fnt[3] ? 'italic ' : '') + (fnt[2] >= 600 ? '700 ' : '400 ') + size + 'px ' + (FACES[fnt[0]] || '"' + fnt[0] + '", sans-serif');
      sg.fillStyle = '#' + (p.color || 'ffffff');
      sg.textBaseline = 'top';
      var al = (p.flags & 1) ? 'center' : (p.flags & 2) ? 'right' : 'left';
      sg.textAlign = al;
      var ax = al === 'center' ? x + tw / 2 : al === 'right' ? x + tw : x, out = [], cur = '';
      String(e.text).split(' ').forEach(function (wd) { var test = cur ? cur + ' ' + wd : wd; if (sg.measureText(test).width > tw && cur) { out.push(cur); cur = wd; } else cur = test; });
      if (cur) out.push(cur);
      out.forEach(function (l, i) { sg.fillText(l, Math.round(ax), Math.round(y + i * Math.round(size * 1.2))); });
      sg.textAlign = 'left';
      return;
    }
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
    if (live !== selLocked) lockSelect(live);
    cv.style.cursor = live && L.noCursor ? 'none' : '';
    var mousey = !!(L && L.mouseFrame);
    if (root.classList.contains('fis-nopad') !== mousey) root.classList.toggle('fis-nopad', mousey);
  }
  function begin() {
    if (!loaded) return;
    var a = muted ? null : audio();
    if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    if (a) { try { var un = a.createBufferSource(); un.buffer = a.createBuffer(1, 1, 22050); un.connect(a.destination); un.start(0); } catch (e) {} }
    if (PHONE && !isFS() && !pseudo) enterFS();
    endBox.hidden = true;
    paused = false;
    rotPaused = false;
    mode = 'play';
    KEY = {};
    PREV = {};
    TAP = {};
    GLOBAL.found = 0;
    CHV = {};
    startFrame(opt.first != null ? opt.first : opt.play);
    GLOBAL.start = Date.now();
    syncButtons();
    run();
    checkRot();
    try { cv.focus({ preventScroll: true }); } catch (e) { cv.focus(); }
  }
  function toTitle() {
    stopAll();
    mode = 'title';
    if (stage && (pseudo || (PHONE && isFS()))) exitFS();
    else if (stage) checkRot();
    if (opt.title != null) startFrame(opt.title);
    else {
      L = null;
      quiet = true;
      startFrame(opt.play);
      for (var i = 0; i < (opt.idleTicks || 0); i++) tick();
      quiet = false;
      L.idle = true;
      stopAll();
    }
    syncButtons();
  }
  function finish() {
    stopAll();
    var f = GLOBAL.found || opt.defaultReward || 41, r = REWARDS[f] || REWARDS[41], secs = (Date.now() - GLOBAL.start) / 1000;
    endBox.querySelector('.fis-end-img').src = 'https://fnaf-world.fntduserguide.com/idle/' + r[1] + '.webp';
    endBox.querySelector('.fis-end-img').alt = r[0];
    endBox.querySelector('.fis-end-name').textContent = r[0];
    endBox.querySelector('.fis-end-link').href = '/fwm/roster/' + r[1];
    var line = endBox.querySelector('.fis-end-cups');
    if (line) line.textContent = opt.endLine ? opt.endLine(GLOBAL, secs) : 'Finished in ' + Math.floor(secs / 60) + ':' + ('0' + Math.floor(secs % 60)).slice(-2) + '.';
    endBox.hidden = false;
    if (opt.onFinish) { try { opt.onFinish(GLOBAL, secs); } catch (e) {} }
    toTitle();
  }
  function pause(on) {
    if (mode !== 'play') return;
    paused = on;
    if (on) { if (AC && AC.suspend) AC.suspend(); }
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
    else {
      var a = audio();
      if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
    }
    syncButtons();
  });
  var stage = root.querySelector('.fis-stage'), pseudo = false, rotPaused = false, wantFS = false;
  var PHONE = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches) && Math.min(screen.width, screen.height) <= 600;
  if (!document.getElementById('fis-fs-css')) {
    var fsCss = document.createElement('style');
    fsCss.id = 'fis-fs-css';
    fsCss.textContent = '.fis-stage.fis-pseudo{position:fixed;inset:0;z-index:2147483647;max-width:none;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center;border:0;box-shadow:none;background:#070b18}' +
      '.fis-stage.fis-pseudo .fis-canvas{flex:1 1 0;min-height:0;width:auto;height:auto;max-width:100vw;aspect-ratio:800/480;object-fit:contain;margin:0 auto}' +
      '.fis-x{display:none;position:absolute;top:6px;left:50%;z-index:4;width:40px;height:40px;margin-left:-20px;align-items:center;justify-content:center;padding:0;font:700 18px/1 system-ui,sans-serif;color:#fff;background:rgba(7,11,24,.55);border:2px solid rgba(255,255,255,.7);border-radius:50%;cursor:pointer}' +
      '.fis-stage:fullscreen .fis-x,.fis-stage.fis-pseudo .fis-x{display:flex}' +
      '.fis-rotate{display:none;position:absolute;left:0;top:0;z-index:6;width:100%;aspect-ratio:800/480;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px;box-sizing:border-box;background:#070b18;color:#fff;text-align:center;font:400 11px/1.7 "Press Start 2P",monospace}' +
      '.fis-rotate p{margin:0}' +
      '.fis-rotate-ico{width:30px;height:50px;border:3px solid #fff;border-radius:7px;animation:fisRot 1.8s ease-in-out infinite}' +
      '@keyframes fisRot{0%,25%{transform:rotate(0)}55%,100%{transform:rotate(90deg)}}' +
      '@media (prefers-reduced-motion:reduce){.fis-rotate-ico{animation:none;transform:rotate(90deg)}}' +
      '.fis-stage.fis-portrait .fis-rotate{display:flex}' +
      '.fis .fis-stage .fis-pad{position:absolute;inset:0;z-index:3;padding:0;margin:0;background:transparent;border:0;pointer-events:none}' +
      '.fis.fis-nopad .fis-stage .fis-pad{display:none!important}' +
      '.fis .fis-pad .fis-stick-zone{position:absolute;left:0;top:0;bottom:0;width:50%;display:block;pointer-events:auto;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}' +
      '.fis .fis-pad .fis-stick{position:absolute;left:var(--sx,22%);top:var(--sy,70%);display:block;width:var(--ring,110px);height:var(--ring,110px);transform:translate(-50%,-50%);border-radius:50%;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.35);box-sizing:border-box;pointer-events:none}' +
      '.fis .fis-pad .fis-knob{position:absolute;left:27%;top:27%;display:block;width:46%;height:46%;border-radius:50%;background:rgba(255,255,255,.42);border:2px solid rgba(255,255,255,.75);box-sizing:border-box}' +
      '.fis .fis-pad .fis-acts{position:absolute;right:max(14px,4%);bottom:max(14px,6%);display:flex;flex-direction:row;align-items:flex-end;gap:12px;pointer-events:none}' +
      '.fis .fis-pad .fis-act{position:relative;flex:none!important;display:flex;align-items:center;justify-content:center;width:var(--act,80px);height:var(--act,80px);min-width:0;min-height:0;max-height:none!important;padding:0;border-radius:50%;background:rgba(255,255,255,.22);border:2px solid rgba(255,255,255,.28);box-shadow:none;color:#fff;font:900 var(--actf,15px)/1 Arial,Helvetica,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 rgba(0,0,0,.35),0 0 4px rgba(0,0,0,.25);pointer-events:auto;touch-action:none;-webkit-tap-highlight-color:transparent}' +
      '.fis .fis-pad .fis-act:first-child:not(:last-child){margin-bottom:calc(var(--act,80px) * .55)}' +
      '.fis .fis-pad .fis-act[data-k=jump]{background:rgba(38,160,40,.42);border-color:rgba(150,235,140,.45)}' +
      '.fis .fis-pad .fis-act[data-k=fire]{background:rgba(205,38,38,.42);border-color:rgba(255,150,150,.45)}' +
      '.fis .fis-pad .fis-act.on{transform:scale(.94);filter:brightness(1.3)}';
    document.head.appendChild(fsCss);
  }
  var rot = document.createElement('div');
  rot.className = 'fis-rotate';
  rot.innerHTML = '<div class="fis-rotate-ico" aria-hidden="true"></div><p>Turn your phone sideways to play</p>';
  stage.appendChild(rot);
  var xBtn = document.createElement('button');
  xBtn.type = 'button';
  xBtn.className = 'fis-x';
  xBtn.setAttribute('aria-label', 'Exit full screen');
  xBtn.textContent = '\u2715';
  stage.appendChild(xBtn);
  function isFS() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  function lockLand() { try { var o = screen.orientation; if (o && o.lock) o.lock('landscape').catch(function () {}); } catch (e) {} }
  function pseudoOn() { pseudo = true; stage.classList.add('fis-pseudo'); document.documentElement.style.overflow = 'hidden'; checkRot(); }
  function pseudoOff() { pseudo = false; stage.classList.remove('fis-pseudo'); document.documentElement.style.overflow = ''; }
  function realFS(onFail) {
    var req = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (!req) { if (onFail) onFail(); return; }
    try {
      var pr = req.call(stage, { navigationUI: 'hide' });
      if (pr && pr.then) pr.then(function () { pseudoOff(); lockLand(); }, function () { if (onFail) onFail(); });
      else { pseudoOff(); lockLand(); }
    } catch (e) { if (onFail) onFail(); }
  }
  function enterFS() { wantFS = true; if (portraitNow()) { checkRot(); return; } realFS(pseudoOn); }
  function leaveFS() {
    if (isFS()) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
    if (pseudo) pseudoOff();
    try { screen.orientation.unlock(); } catch (e) {}
  }
  function exitFS() { wantFS = false; leaveFS(); checkRot(); }
  function portraitNow() { return PHONE && window.innerHeight > window.innerWidth; }
  function checkRot() {
    var portrait = portraitNow() && mode === 'play';
    if (portrait && (pseudo || isFS())) leaveFS();
    else if (!portrait && PHONE && wantFS && mode === 'play' && !pseudo && !isFS()) pseudoOn();
    stage.classList.toggle('fis-portrait', portrait);
    if (portrait && !paused) { rotPaused = true; pause(true); }
    else if (!portrait && rotPaused) { rotPaused = false; if (paused) pause(false); }
  }
  stage.addEventListener('pointerdown', function () { if (PHONE && pseudo && !isFS() && !portraitNow()) realFS(null); }, true);
  window.addEventListener('resize', checkRot);
  window.addEventListener('orientationchange', function () { setTimeout(checkRot, 250); });
  document.addEventListener('fullscreenchange', checkRot);
  xBtn.addEventListener('click', exitFS);
  if (fullBtn) {
    fullBtn.addEventListener('click', function () {
      if (isFS() || pseudo) exitFS();
      else enterFS();
    });
  }

  var CODES = opt.codes || { ArrowLeft: 37, ArrowRight: 39, ArrowDown: 40, ArrowUp: 38, KeyZ: 90, KeyX: 88, KeyA: 65, KeyD: 68, KeyW: 87, KeyS: 83, Enter: 13, NumpadEnter: 13, Space: 32, ShiftLeft: 16, ShiftRight: 16 };
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
  function mouseAt(e) {
    var r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    MOUSE.x = (e.clientX - r.left) * W / r.width;
    MOUSE.y = (e.clientY - r.top) * H / r.height;
    MOUSE.on = true;
  }
  cv.addEventListener('pointermove', mouseAt);
  cv.addEventListener('pointerdown', function (e) {
    mouseAt(e);
    if (mode !== 'play' || paused || e.button !== 0) return;
    if (!KEY[1]) TAP[1] = true;
    KEY[1] = true;
  });
  window.addEventListener('pointerup', function (e) { if (e.button === 0) KEY[1] = false; });
  cv.addEventListener('pointercancel', function () { KEY[1] = false; });
  Array.prototype.forEach.call(root.querySelectorAll('.fis-pad [data-k]'), function (b) {
    var k = (opt.pad || { left: 37, right: 39, down: 40, jump: 90, fire: 88 })[b.getAttribute('data-k')];
    function on(e) { e.preventDefault(); if (paused) pause(false); if (!KEY[k]) TAP[k] = true; KEY[k] = true; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) {} }
    function off() { KEY[k] = false; b.classList.remove('on'); }
    b.addEventListener('pointerdown', on);
    b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off);
    b.addEventListener('lostpointercapture', off);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    b.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
  });
  var zone = root.querySelector('.fis-stick-zone');
  if (zone) {
    var ring = zone.querySelector('.fis-stick'), knob = zone.querySelector('.fis-knob'), acts = root.querySelector('.fis-acts');
    var PK = opt.pad || { left: 37, right: 39, down: 40, jump: 90, fire: 88 }, sid = null, scx = 0, scy = 0;
    var sizePad = function () {
      var ch = cv.clientHeight || zone.clientHeight;
      if (!ch) return;
      zone.style.setProperty('--ring', Math.round(Math.max(64, Math.min(130, ch * 0.34))) + 'px');
      if (!acts) return;
      var sz = Math.round(Math.max(46, Math.min(92, ch * 0.21)));
      acts.style.setProperty('--act', sz + 'px');
      acts.style.setProperty('--actf', Math.round(Math.max(10, Math.min(16, sz * 0.19))) + 'px');
    };
    var stickKeys = function (ax, ay) {
      var set = function (k, v) { if (k == null) return; if (v && !KEY[k]) TAP[k] = true; KEY[k] = v; };
      set(PK.left, ax < -0.3);
      set(PK.right, ax > 0.3);
      set(PK.up, ay < -0.45);
      set(PK.down, ay > (PK.up != null ? 0.45 : 0.65));
    };
    var stickMove = function (e) {
      var r = zone.getBoundingClientRect(), R = ring.offsetWidth / 2 || 1, dx = e.clientX - r.left - scx, dy = e.clientY - r.top - scy, m = Math.sqrt(dx * dx + dy * dy);
      if (m > R) { dx *= R / m; dy *= R / m; }
      knob.style.transform = 'translate(' + Math.round(dx) + 'px,' + Math.round(dy) + 'px)';
      stickKeys(dx / R, dy / R);
    };
    var stickEnd = function (e) {
      if (e.pointerId !== sid) return;
      sid = null;
      ring.style.left = '';
      ring.style.top = '';
      ring.style.opacity = '';
      knob.style.transform = '';
      stickKeys(0, 0);
    };
    var tapId = null;
    zone.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      if (opt.tapZone && mode === 'play' && !paused) {
        var cr = cv.getBoundingClientRect(), gx = (e.clientX - cr.left) * W / cr.width, gy = (e.clientY - cr.top) * H / cr.height;
        if (opt.tapZone(gx, gy)) {
          mouseAt(e);
          tapId = e.pointerId;
          if (!KEY[1]) TAP[1] = true;
          KEY[1] = true;
          return;
        }
      }
      if (sid !== null) return;
      if (paused) pause(false);
      sid = e.pointerId;
      try { zone.setPointerCapture(sid); } catch (x) {}
      var r = zone.getBoundingClientRect(), R = ring.offsetWidth / 2;
      scx = Math.max(R, Math.min(r.width - R, e.clientX - r.left));
      scy = Math.max(R, Math.min(r.height - R, e.clientY - r.top));
      ring.style.left = scx + 'px';
      ring.style.top = scy + 'px';
      stickMove(e);
    });
    zone.addEventListener('pointermove', function (e) { if (e.pointerId === sid) stickMove(e); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { zone.addEventListener(t, function (e) { if (e.pointerId === tapId) { tapId = null; KEY[1] = false; return; } stickEnd(e); }); });
    zone.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
    zone.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    if (window.ResizeObserver) { var ro = new ResizeObserver(sizePad); ro.observe(zone); ro.observe(cv); }
    window.addEventListener('resize', sizePad);
    sizePad();
  }

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
      if (mode !== 'play' && L && opt.title != null && L.f === opt.title) { acc += d; while (acc >= DT) { tick(); acc -= DT; } }
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
      im.onload = function () { if (--left === 0) { loaded = true; toTitle(); } };
      im.onerror = function () { loadErr = true; };
      im.src = BASE + 'atlas' + i + '.webp' + VER;
      SHEETS.push(im);
    }
  }).catch(function () { loadErr = true; });
  syncButtons();
  run();

  api.tick = function (n) { for (var i = 0; i < (n || 1); i++) tick(); };
  api.begin = begin;
  api.render = function () { render(); return scene; };
  api.scene = scene;
  api.mode = function () { return mode; };
  api.mousePos = function () { return MOUSE; };
  api.sheet = function (h) { var im = IM(h); return im ? [SHEETS[im[0]], im] : null; };
  api.music = function () { return MUS ? { n: MUS.n, on: !!MUS.src, ctx: AC ? AC.state : null } : null; };
  api.mouse = function (x, y) { MOUSE.x = x; MOUSE.y = y; MOUSE.on = true; };
  api.hideCursor = function () { if (L) L.noCursor = true; };
  api.key = function (k, on) { if (on && !KEY[k]) TAP[k] = true; KEY[k] = on; };
  api.inWall = function (name) { return S(name).filter(function (e) { return !e.dead && !e.sleep && bg(e); }).map(function (e) { return [e.x, e.y]; }); };
  api.objs = function (name) { return S(name).map(function (e) { return { x: e.x, y: e.y, dir: e.dir, vis: e.vis, sleep: e.sleep, dead: e.dead, speed: e.speed, ly: e.ly, frame: e.aFrame, anim: e.aOn, alt: e.alt.slice(0, 11) }; }); };
  api.dump = function () { return L.all.filter(function (e) { return !e.dead && e.vis && !e.sleep; }).map(function (e) { return [e.o.n, e.ly, e.x, e.y, [e.x - e.hx, e.y - e.hy, e.w, e.h], e.dir, e.img]; }); };
  api.setWindow = function (x, y) { setWindow(x, y); };
  api.W = W;
  api.H = H;
  return api;
};
