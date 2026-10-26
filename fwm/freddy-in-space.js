(function () {
  var root = document.getElementById('fis');
  if (!root) return;
  var cv = root.querySelector('.fis-canvas'), g = cv.getContext('2d');
  var BASE = '/fwm/fis57/', VER = '?v=1', W = 800, H = 480, STEP = 1000 / 60;
  cv.width = W;
  cv.height = H;
  var scene = document.createElement('canvas'), sg = scene.getContext('2d');
  scene.width = W;
  scene.height = H;
  var hasFilter = typeof sg.filter === 'string';
  var D = null, SHEETS = [], SPANS = {}, PAT = {}, loaded = false, loadErr = false;
  var ACC = [0.0078125, 0.01171875, 0.015625, 0.0234375, 0.03125, 0.0390625, 0.046875, 0.0625, 0.078125, 0.09375, 0.1875, 0.21875, 0.25, 0.28125, 0.3125, 0.34375, 0.375, 0.40625, 0.4375, 0.46875, 0.5625, 0.625, 0.6875, 0.75, 0.8125, 0.875, 0.9375, 1.0, 1.0625, 1.125, 1.25, 1.3125, 1.375, 1.4375, 1.5, 1.5625, 1.625, 1.6875, 1.75, 1.875, 2.0, 2.125, 2.1875, 2.3125, 2.4375, 2.5, 2.625, 2.6875, 2.8125, 2.875, 3.0, 3.0625, 3.1875, 3.3125, 3.375, 3.5, 3.625, 3.6875, 3.8125, 3.875, 4.0, 4.375, 4.75, 5.125, 5.625, 6.0, 6.375, 6.75, 7.125, 7.625, 8.0, 8.75, 9.5, 10.5, 11.25, 12.0, 12.75, 13.5, 14.5, 15.25, 16.0, 25.5625, 19.1953125, 20.375, 22.390625, 24.0, 25.59765625, 27.1953125, 28.7734375, 30.390625, 32.0, 38.421875, 45.59375, 52.015625, 58.4375, 64.859375, 71.28125, 77.703125, 84.0, 100.0, 100.0];
  var LINES = ['', "What are you doing here? This game isn't finished yet!", "This game isn't due for release until 2030! Get out!", 'How did you access this game before release?', 'So, you are here to stop me...', 'You want to stop me from doing what? Making crazy spinoffs?', 'HA HA HA! I will never stop making spinoffs!', 'FNaF 57: Freddy in Space. Freddy was always destined for space.', 'Then FNaF 58: Poopets in Space.', 'FNaF 59: Cupcake Takes Manhattan.', "FNaF 60: Breakfast at Chica's. It's a romantic comedy. She's a killer with a heart of gold!", "FNaF 61: Freddy v Bonnie. It's the beginning of the Freddy Cinematic Universe.", "FNaF 61: Balloon Boy's Revenge. He steals EVERYONE'S flashlights; what a kidder.", "Oh, dead end. Busted. You'll never find my hideout.", 'WRONG! Wrong, wrong, go back. I think you missed it back there.', 'No, seriously, you missed my hideout. It was back the other way.', 'Very well. Come to me. I will add your distictiveness to my own.', 'I will grind up your code and use it for the game over screen!'];
  var REWARD = { 41: { name: 'Jack-O-Bonnie', id: 'jack-o-bonnie', img: 'https://fnaf-world.fntduserguide.com/idle/jack-o-bonnie.webp' }, 47: { name: 'Coffee', id: 'coffee', img: 'https://fnaf-world.fntduserguide.com/idle/coffee.webp' }, 48: { name: 'Purple Guy', id: 'purple-guy', img: 'https://fnaf-world.fntduserguide.com/idle/purple-guy.webp' } };

  var L = null, GLOBAL = { found: 0, cups: 0, start: 0 }, mode = 'idle', seq = 0;

  function rnd(n) { return Math.floor(Math.random() * n); }
  function IM(h) { return D.images[h]; }

  function spans(h) {
    if (SPANS[h]) return SPANS[h];
    var im = IM(h);
    if (!im) return null;
    var c = document.createElement('canvas'), w = im[3], hh = im[4];
    c.width = w;
    c.height = hh;
    var x = c.getContext('2d');
    x.drawImage(SHEETS[im[0]], im[1], im[2], w, hh, 0, 0, w, hh);
    var d = x.getImageData(0, 0, w, hh).data, s = new Int16Array(hh * 2);
    for (var y = 0; y < hh; y++) {
      var a = -1, b = -1;
      for (var i = 0; i < w; i++) if (d[(y * w + i) * 4 + 3] > 40) { if (a < 0) a = i; b = i; }
      s[y * 2] = a;
      s[y * 2 + 1] = b;
    }
    SPANS[h] = s;
    return s;
  }

  function nearestDir(dirs, d) {
    if (dirs[d] !== undefined) return d;
    var best = null, bd = 99;
    for (var k in dirs) {
      var kk = +k, dd = Math.abs(kk - d);
      dd = Math.min(dd, 32 - dd);
      if (dd < bd) { bd = dd; best = kk; }
    }
    return best;
  }

  function make(oi, x, y, ly) {
    var o = D.objs[oi];
    if (!o) return null;
    var e = { id: seq++, oi: oi, o: o, t: o.t, x: x, y: y, ly: ly, vis: o.t < 2 ? true : o.vis !== false, alt: [], dir: 0, fa: -1, ca: -1, cd: -1, fr: 0, cnt: 0, loops: -1, done: false, fin: -1, ink: 0, alpha: 1, fl: 0, flT: 0, flOn: true, dead: false, m: null, mi: 0, val: 0, text: '' };
    for (var i = 0; i < 26; i++) e.alt[i] = (o.vals && o.vals[i]) || 0;
    if (o.inkraw && o.inkraw.length >= 16) { e.add = parseInt(o.inkraw.slice(0, 2), 16) === 9; e.alpha = parseInt(o.inkraw.slice(14, 16), 16) / 255; }
    if (o.t === 7) { e.val = o.cnt[0]; e.min = o.cnt[1]; e.max = o.cnt[2]; }
    if (o.t === 3) e.text = (o.txt && o.txt.paras && o.txt.paras[0] && o.txt.paras[0].text) || '';
    if (o.anims) {
      var a0 = o.anims[0] || o.anims[Object.keys(o.anims)[0]];
      if (a0) e.dir = +Object.keys(a0)[0] || 0;
    }
    setMov(e, 0, true);
    L.all.push(e);
    (L.by[oi] = L.by[oi] || []).push(e);
    return e;
  }

  function dirFromMask(mask) {
    if (mask === -1 || mask === 0xFFFFFFFF) return rnd(32);
    var c = [];
    for (var i = 0; i < 32; i++) if ((mask >>> i) & 1) c.push(i);
    return c.length ? c[rnd(c.length)] : 0;
  }

  function setMov(e, idx, initial) {
    var ms = e.o.mov, m = ms && ms[idx];
    e.mi = idx;
    if (!m || !m.t) { e.m = null; return; }
    if (m.t === 4) {
      var d = dirFromMask(m.dir);
      if (m.ang === 0) d &= ~3;
      else if (m.ang === 1) d &= ~1;
      e.m = { t: 4, sp: m.mas || !initial ? m.sp : 0, max: m.sp, dec: m.dec ? (m.dec <= 100 ? ACC[m.dec] : m.dec) : 0, ang: m.ang };
      e.dir = d;
    } else if (m.t === 5) {
      var steps = m.steps.map(function (s) { var len = s[6] || Math.sqrt(s[2] * s[2] + s[3] * s[3]) || 1; return { sp: s[0], dir: s[1], dx: s[2], dy: s[3], len: len, cos: s[2] / len, sin: s[3] / len, pause: s[7] }; });
      var ex = 0, ey = 0;
      steps.forEach(function (s) { ex += s.dx; ey += s.dy; });
      e.m = { t: 5, steps: steps, i: 0, left: 0, rev: false, loop: m.loop, repos: m.repos, revEnd: m.rev, sp: 0, max: m.max, min: m.min, stopped: false, pauseT: 0, ex: ex, ey: ey, cos: 0, sin: 0, run: m.mas };
      if (steps.length) pathStep(e, 0);
      if (!m.mas) { e.m.stopped = true; e.m.sp = 0; }
    } else e.m = null;
  }

  function pathStep(e, index) {
    var m = e.m, n = m.steps.length;
    if (index > n - 1) {
      if (m.repos && !m.revEnd) { e.x -= m.ex; e.y -= m.ey; }
      if (!m.rev && m.revEnd) { m.rev = true; pathStep(e, m.i); }
      else if (m.loop) pathStep(e, 0);
      else { m.stopped = true; m.sp = 0; m.fin = true; }
      return;
    }
    if (index < 0) {
      m.rev = false;
      pathStep(e, 0);
      if (!m.loop) { m.stopped = true; m.sp = 0; m.fin = true; }
      return;
    }
    m.i = index;
    var s = m.steps[index];
    m.left = s.len;
    m.cos = m.rev ? -s.cos : s.cos;
    m.sin = m.rev ? -s.sin : s.sin;
    if (s.pause && !m.paused) {
      m.paused = true;
      m.pauseT = Math.round(s.pause / 50 * 60);
      m.sp = 0;
      return;
    }
    m.paused = false;
    e.dir = m.rev ? (s.dir + 16) & 31 : s.dir;
    m.sp = s.sp;
  }

  function moveObj(e) {
    var m = e.m;
    if (!m) return;
    if (m.t === 4) {
      if (m.sp <= 0) return;
      var mv = m.sp * 0.125, a = e.dir * Math.PI / 16;
      e.x += Math.cos(a) * mv;
      e.y -= Math.sin(a) * mv;
      if (m.dec) m.sp = Math.max(0, m.sp - m.dec);
    } else if (m.t === 5) {
      if (m.stopped) return;
      if (m.paused) {
        if (--m.pauseT <= 0) pathStep(e, m.i);
        return;
      }
      if (m.sp <= 0) return;
      var mv2 = m.sp * 0.125;
      m.left -= mv2;
      if (m.left <= 0) mv2 += m.left;
      e.x += m.cos * mv2;
      e.y += m.sin * mv2;
      if (m.left <= 0) pathStep(e, m.rev ? m.i - 1 : m.i + 1);
    } else if (m.t === 'shoot') {
      var a2 = e.dir * Math.PI / 16, mv3 = m.sp * 0.125;
      e.x += Math.cos(a2) * mv3;
      e.y -= Math.sin(a2) * mv3;
      var b = box(e);
      var inside = b && b[0] + b[2] > 0 && b[1] + b[3] > 0 && b[0] < L.w && b[1] < L.h;
      if (inside) m.been = true;
      else if (m.been) e.dead = true;
    }
  }

  function speedOf(e) { return e.m ? (e.m.t === 5 ? (e.m.stopped ? 0 : e.m.sp) : e.m.sp || 0) : 0; }

  function animIndex(e) {
    var an = e.o.anims;
    if (e.fa >= 0 && an[e.fa]) return e.fa;
    if (speedOf(e) > 0 && an[1]) return 1;
    if (an[0]) return 0;
    return +Object.keys(an)[0];
  }

  function entry(e) {
    var an = e.o.anims;
    if (!an) return null;
    var a = animIndex(e), dirs = an[a];
    if (!dirs) return null;
    var d = nearestDir(dirs, e.dir);
    if (a !== e.ca) {
      e.ca = a;
      e.cd = d;
      e.fr = 0;
      e.cnt = 0;
      e.done = false;
      e.loops = dirs[d][2] === 0 ? -1 : dirs[d][2];
    } else if (d !== e.cd) {
      e.cd = d;
      if (e.fr > dirs[d][4].length - 1) e.fr = 0;
    }
    return dirs[d];
  }

  function curImg(e) {
    if (e.t < 2) return e.o.img;
    var en = entry(e);
    if (!en) return null;
    return en[4][Math.min(e.fr, en[4].length - 1)];
  }

  function stepAnim(e) {
    if (e.t !== 2) return;
    var en = entry(e);
    if (!en || e.done) return;
    var n = en[4].length, sp;
    if (en[0] === en[1]) sp = en[0];
    else if (e.m && e.m.t === 5 && e.m.max !== e.m.min) sp = Math.min(en[1], (en[1] - en[0]) * speedOf(e) / (e.m.max - e.m.min) + en[0]);
    else sp = (en[1] - en[0]) / 2 + en[0];
    e.cnt += sp;
    while (e.cnt > 100) {
      e.cnt -= 100;
      e.fr++;
      if (e.fr > n - 1) {
        if (e.loops > 0) e.loops--;
        if (e.loops === 0) {
          e.fr = n - 1;
          e.done = true;
          e.fin = e.ca;
          if (e.fa >= 0) e.fa = -1;
          break;
        }
        e.fr = Math.min(en[3], n - 1);
      }
    }
  }

  function force(e, a) {
    if (!e.o.anims || !e.o.anims[a]) return;
    if (e.fa === a || (e.fa < 0 && e.ca === a && !e.done)) { e.fa = a; return; }
    e.fa = a;
    e.ca = -1;
    entry(e);
  }

  function box(e) {
    if (e.t === 7) {
      var dg = e.o.digits, s = String(Math.round(e.val)), w = 0, hh = 0;
      if (dg) for (var i = 0; i < s.length; i++) { var im0 = IM(dg[digitIndex(s[i])]); if (im0) { w += im0[3]; hh = Math.max(hh, im0[4]); } }
      return [e.x - w, e.y - hh, w, hh, null];
    }
    if (e.t === 3) return [e.x, e.y, (e.o.txt && e.o.txt.w) || 100, (e.o.txt && e.o.txt.h) || 20, null];
    var h = curImg(e);
    if (h == null) return null;
    var im = IM(h);
    if (!im) return null;
    return [e.x - im[5], e.y - im[6], im[3], im[4], h];
  }

  function digitIndex(c) { return c === '-' ? 10 : c === '+' ? 11 : c === '.' ? 12 : c === 'e' ? 13 : +c; }

  function buildGrid() {
    L.grid = {};
    L.obst.forEach(function (r, i) {
      for (var gx = Math.floor(r[0] / 256); gx <= Math.floor((r[0] + r[2] - 1) / 256); gx++)
        for (var gy = Math.floor(r[1] / 256); gy <= Math.floor((r[1] + r[3] - 1) / 256); gy++) {
          var k = gx + ',' + gy;
          (L.grid[k] = L.grid[k] || []).push(i);
        }
    });
  }

  function ovRect(e, b, r) {
    var x1 = Math.max(b[0], r[0]), y1 = Math.max(b[1], r[1]), x2 = Math.min(b[0] + b[2], r[0] + r[2]), y2 = Math.min(b[1] + b[3], r[1] + r[3]);
    if (x1 >= x2 || y1 >= y2) return false;
    if (b[4] == null) return true;
    var s = spans(b[4]);
    if (!s) return true;
    var bx = Math.floor(b[0]), by = Math.floor(b[1]);
    for (var y = Math.floor(y1); y < y2; y++) {
      var row = y - by, a = s[row * 2], c = s[row * 2 + 1];
      if (a < 0) continue;
      if (bx + a < x2 && bx + c + 1 > x1) return true;
    }
    return false;
  }

  function ovBg(e) {
    if (!e || e.dead) return false;
    var b = box(e);
    if (!b) return false;
    var seen = {};
    for (var gx = Math.floor(b[0] / 256); gx <= Math.floor((b[0] + b[2] - 1) / 256); gx++)
      for (var gy = Math.floor(b[1] / 256); gy <= Math.floor((b[1] + b[3] - 1) / 256); gy++) {
        var list = L.grid[gx + ',' + gy];
        if (!list) continue;
        for (var i = 0; i < list.length; i++) {
          var id = list[i];
          if (seen[id]) continue;
          seen[id] = 1;
          if (L.obst[id][4] !== e.ly) continue;
          if (ovRect(e, b, L.obst[id])) return true;
        }
      }
    return false;
  }

  function ov(a, b) {
    if (!a || !b || a.dead || b.dead || a === b) return false;
    var A = box(a), B = box(b);
    if (!A || !B) return false;
    var x1 = Math.max(A[0], B[0]), y1 = Math.max(A[1], B[1]), x2 = Math.min(A[0] + A[2], B[0] + B[2]), y2 = Math.min(A[1] + A[3], B[1] + B[3]);
    if (x1 >= x2 || y1 >= y2) return false;
    var sa = A[4] != null ? spans(A[4]) : null, sb = B[4] != null ? spans(B[4]) : null;
    var ax = Math.floor(A[0]), ay = Math.floor(A[1]), bx = Math.floor(B[0]), by = Math.floor(B[1]);
    for (var y = Math.floor(y1); y < y2; y++) {
      var l1 = -1e9, r1 = 1e9, l2 = -1e9, r2 = 1e9;
      if (sa) { var ra = y - ay; if (sa[ra * 2] < 0) continue; l1 = ax + sa[ra * 2]; r1 = ax + sa[ra * 2 + 1] + 1; }
      if (sb) { var rb = y - by; if (sb[rb * 2] < 0) continue; l2 = bx + sb[rb * 2]; r2 = bx + sb[rb * 2 + 1] + 1; }
      if (Math.max(l1, l2, x1) < Math.min(r1, r2, x2)) return true;
    }
    return false;
  }

  function S(name) {
    var ois = L.names[name];
    if (!ois) return [];
    var out = [];
    for (var j = 0; j < ois.length; j++) {
      var list = L.by[ois[j]];
      if (list) for (var i = 0; i < list.length; i++) if (!list[i].dead) out.push(list[i]);
    }
    return out;
  }
  function O1(name) { return S(name)[0] || null; }
  function C(name) { var e = O1(name); return e ? e.val : 0; }
  function CS(name, v) { var e = O1(name); if (e) e.val = Math.max(e.min, Math.min(e.max, v)); }
  function CA(name, v) { var e = O1(name); if (e) CS(name, e.val + v); }
  function count(name) { return S(name).length; }
  function any(list, f) { for (var i = 0; i < list.length; i++) if (f(list[i])) return true; return false; }
  function ovAny(e, name) { var l = S(name); for (var i = 0; i < l.length; i++) if (ov(e, l[i])) return true; return false; }

  function once(id, cond) {
    var was = L.once[id];
    L.once[id] = cond;
    return cond && !was;
  }
  function every(id, ms) {
    var t = L.every[id] || 0;
    t += STEP;
    if (t >= ms) { L.every[id] = t - ms; return true; }
    L.every[id] = t;
    return false;
  }

  function create(name, parent, dx, dy) {
    var ois = L.names[name];
    if (!ois || !parent) return null;
    var e = make(ois[0], parent.x + dx, parent.y + dy, parent.ly);
    return e;
  }
  function actionPoint(e) {
    var h = curImg(e), im = h != null ? IM(h) : null;
    if (!im) return [e.x, e.y];
    return [e.x - im[5] + im[7], e.y - im[6] + im[8]];
  }
  function shoot(e, name, speed, mask, parentDir) {
    var ois = L.names[name];
    if (!ois) return null;
    var p = actionPoint(e), s = make(ois[0], p[0], p[1], e.ly);
    s.dir = parentDir ? e.dir : dirFromMask(mask);
    s.m = { t: 'shoot', sp: speed, been: false };
    return s;
  }
  function lookAt(e, x, y) {
    var a = Math.atan2(-(y - e.y), x - e.x), d = Math.round(a / (Math.PI / 16));
    e.dir = ((d % 32) + 32) % 32;
  }
  function facing(e, mask) { return ((mask >>> e.dir) & 1) === 1; }
  function nearBorder(e) {
    var b = box(e);
    if (!b) return false;
    var ly = L.layers[e.ly] || [1, 1], sx = b[0] - L.camX * ly[0], sy = b[1] - L.camY * ly[1];
    return sx < 0 || sy < 0 || sx + b[2] > W || sy + b[3] > H;
  }
  function setSpeed(e, v) { if (e.m) e.m.sp = Math.max(0, v); }
  function hide(e) { e.vis = false; e.fl = 0; }
  function show(e) { e.vis = true; e.fl = 0; e.flOn = true; }
  function flash(e, ms) { e.fl = Math.max(1, Math.round(ms / STEP)); e.flT = 0; }
  function toFront(e) { var i = L.all.indexOf(e); if (i >= 0) { L.all.splice(i, 1); L.all.push(e); } }
  function pick(list) { return list.length ? [list[rnd(list.length)]] : []; }

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
    var stamp = L ? L.t : 0;
    loadSnd(name, function (b) {
      if (!L || L.t - stamp > 30) return;
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

  var KEY = {}, PREV = {};
  function down(k) { return !!KEY[k]; }
  function pressed(k) { return !!KEY[k] && !PREV[k]; }

  function startFrame(f) {
    var fr = D.frames[f];
    L = { f: f, w: fr.w, h: fr.h, layers: fr.layers, all: [], by: {}, names: {}, obst: [], bd: [], camX: 0, camY: 0, t: 0, once: {}, every: {}, onceOnly: {}, start: true, persp: [], next: null };
    fr.layers.forEach(function () { L.bd.push([]); });
    fr.inst.forEach(function (it) {
      var o = D.objs[it[0]];
      if (!o) return;
      (L.names[o.n] = L.names[o.n] || []);
      if (L.names[o.n].indexOf(it[0]) < 0) L.names[o.n].push(it[0]);
      if (o.t < 2) {
        L.bd[it[3]].push({ o: o, x: it[1], y: it[2] });
        if (o.ob === 1) L.obst.push([it[1], it[2], o.w, o.h, it[3]]);
        return;
      }
      if (f === 38 && o.n === 'textbox') return;
      make(it[0], it[1], it[2], it[3]);
    });
    buildGrid();
    if (f === 43) S('found new').forEach(function (e) { e.val = GLOBAL.found; });
  }

  function gp() { return C('gun power'); }

  var EV = {};
  EV[37] = function () {
    if (L.start) { S('Active').forEach(function (e) { flash(e, 100); }); stopAll(); play('Darkness Ahead', 1, true); }
    if (pressed(13) || pressed(32) || pressed(16)) L.next = 38;
  };
  EV[39] = function () {
    if (every('g1', 40)) S('Active').forEach(function (e) { e.alt[0] += 1; });
    S('Active').forEach(function (e) { if (e.alt[0] > 1) e.alt[0] = 0; e.ink = e.alt[0] === 1 ? 1 : 0; });
    if (L.start) { stopAll(); play('die1', 6); }
    if (L.t === 120) { play('die2', 6); var a = O1('Active'); if (a) { a.dead = true; create('Active 5', a, 0, 0); } }
    S('Active 5').forEach(function (e) { if (e.fin === 0) e.dead = true; });
    if (L.t === 300) L.next = 37;
  };
  EV[43] = function () {
    if (L.start) { stopAll(); play('FANTASY_TONAL_SP_DSL32001', 1); }
    var f = C('found new'), map = { 41: 0, 42: 12, 43: 13, 44: 14, 45: 15, 46: 16, 47: 17, 48: 18 };
    if (map[f] !== undefined && once('r1', true)) { S('Active').forEach(function (e) { force(e, map[f]); }); GLOBAL.found = f; CS('found new', 0); }
    if (L.t === 240) { L.next = 'end'; }
  };

  EV[38] = function () {
    var area = C('area'), fb = C('final boss');
    var hb = O1('hit box'), fr = O1('Active');
    if (once('e1', area === 1)) { play('Blaster Cluster', 1, true); S('Perspective 2').forEach(hide); S('Perspective 3').forEach(hide); S('Active 9').forEach(function (e) { e.dead = true; }); }
    if (once('e2', area === 2)) { play('Boiling Point', 1, true); S('Perspective 2').forEach(show); S('Perspective 3').forEach(show); }
    if (once('e3', area === 3)) { play('Darkness Ahead', 1, true); S('Perspective 2').forEach(hide); S('Perspective 3').forEach(hide); }
    if (once('e4', fb === 1)) { play('Boiling Boss', 1, true); S('Perspective 2').forEach(hide); S('Perspective 3').forEach(hide); }
    if (!hb || !fr) return;
    var fl1 = O1('floor 1');
    fr.x = hb.x; fr.y = hb.y + 34;
    var fR = O1('feel right'), fL = O1('feel left'), f2 = O1('floor 2'), ce = O1('ceiling'), f3 = O1('floor 3');
    if (fR) { fR.x = hb.x + 14; fR.y = hb.y + 10; }
    if (fL) { fL.x = hb.x - 16; fL.y = hb.y + 10; }
    if (fl1) { fl1.x = hb.x - 1; fl1.y = hb.y + 30; }
    if (f2) { f2.x = hb.x - 1; f2.y = hb.y + 44; }
    if (ce) { ce.x = hb.x; ce.y = hb.y - 24; }
    if (f3 && fl1) { f3.x = fl1.x; f3.y = fl1.y - 2; }
    var R = down(39), Lf = down(37), Dn = down(40), Z = down(90);
    if (R && !Lf && !ovBg(fR)) { hb.x += 4; fr.dir = 0; }
    if (Lf && !R && fb === 0 && !ovBg(fL)) { hb.x -= 4; fr.dir = 16; }
    if (Lf && !R && fb === 1 && !ovBg(fL) && !ovAny(fL, 'back wall')) { hb.x -= 4; fr.dir = 16; }
    if (!R && !Lf && !Dn && ovBg(fl1)) force(fr, 0);
    if (R && ovBg(fR) && !Lf && !Dn && ovBg(fl1)) force(fr, 0);
    if (Lf && ovBg(fL) && !R && !Dn && ovBg(fl1)) force(fr, 0);
    if (!R && !Lf && !ovBg(fl1)) force(fr, 12);
    if (!ovBg(fl1) && C('jumped') === 0) { hb.y += 3; CA('fall', 1); }
    if (pressed(90) && ovBg(fl1) && C('spring 2') === 0) { CS('jumped', 1); CS('going up', 40); play('jump1', 6); }
    if (pressed(90) && ovBg(fl1) && C('spring 2') === 1) { CS('jumped', 1); CS('going up', 60); play('jump2', 6); }
    if (C('jumped') === 1 && !Z) { CS('jumped', 0); CS('going up', 0); }
    if (C('jumped') === 1 && C('going up') > 0) { CA('going up', -1); hb.y -= 1; }
    if (C('jumped') === 1 && C('going up') > 10) hb.y -= 2;
    if (C('jumped') === 1 && C('going up') > 20) hb.y -= 2;
    if (C('jumped') === 1 && C('going up') > 30) hb.y -= 2;
    if (C('jumped') === 1 && C('going up') > 35) hb.y -= 2;
    if (C('jumped') === 1 && C('going up') === 0) CS('jumped', 0);
    if (R && !ovBg(fR) && ovBg(fl1)) force(fr, 1);
    if (Lf && !ovBg(fL) && ovBg(fl1)) force(fr, 1);
    if (R && !ovBg(fl1)) force(fr, 12);
    if (Lf && !ovBg(fl1)) force(fr, 12);
    if (ovBg(fl1)) CS('fall', 0);
    if (ovBg(f2) && C('fall') > 10) CS('fall', 10);
    if (!ovBg(fl1) && C('fall') > 0) hb.y += 2;
    if (!ovBg(fl1) && C('fall') > 10) hb.y += 2;
    if (!ovBg(fl1) && C('fall') > 20) hb.y += 1;
    if (ovBg(ce)) CS('jumped', 0);
    var g = gp(), shot = 'shot' + Math.min(9, g + 1);
    if (g >= 0 && g <= 9 && pressed(88)) { shoot(fr, 'Active 2', 100, 0, true); play(shot, 2); }
    var thr = [20, 18, 16, 14, 10, 10, 10, 8, 7, 5];
    if (g >= 0 && g <= 9 && down(88) && hb.alt[0] >= thr[g]) { shoot(fr, 'Active 2', 100, 0, true); hb.alt[0] = 0; play(shot, 2); }
    S('Active 2').forEach(function (e) { e.alt[0] += 1; });
    S('Active 2').forEach(function (e) { if (e.alt[0] > gp() * 3 + 10) e.dead = true; });
    if (down(88)) hb.alt[0] += 1;
    if (!down(88)) hb.alt[0] = 0;
    var ba = [0, 12, 13, 14, 15, 16, 17, 18, 19, 19][Math.max(0, Math.min(9, gp()))];
    S('Active 2').forEach(function (e) { force(e, ba); });
    if (Dn && !R && !Lf && ovBg(fl1)) force(fr, 13);
    if (R && Lf && ovBg(fl1)) force(fr, 0);
    if (gp() > 9) CS('gun power', 9);
    var cl = O1('current level'), fo = O1('follow');
    if (cl && fo) {
      cl.x = hb.x;
      if (hb.y > cl.y + 240 && cl.alt[0] === 0) cl.alt[0] = 48;
      if (hb.y < cl.y - 240 && cl.alt[0] === 0) cl.alt[0] = -48;
      if (cl.alt[0] > 0) { cl.alt[0] -= 2; cl.y += 20; }
      if (cl.alt[0] < 0) { cl.alt[0] += 2; cl.y -= 20; }
      var onV = ovAny(hb, 'vertical');
      if (!ov(fo, cl) && !onV) { setSpeed(fo, 30); lookAt(fo, cl.x, cl.y); }
      if (ov(fo, cl) && !onV) setSpeed(fo, 0);
      if (onV && !ov(fo, hb) && fo.alt[0] === 0) { setSpeed(fo, 45); lookAt(fo, hb.x, hb.y); }
      if (once('e78', !onV)) fo.alt[0] = 0;
      if (onV && ov(fo, hb)) fo.alt[0] = 1;
      if (fo.alt[0] === 1) { fo.x = hb.x; fo.y = hb.y; setSpeed(fo, 0); }
      if (cl.y > fo.y) fo.y += 2;
      if (cl.y < fo.y) fo.y -= 2;
    }
    S('Active 4').forEach(function (e) { lookAt(e, hb.x, hb.y); });
    S('Active 6').forEach(function (e) { lookAt(e, hb.x, hb.y); });
    var hitList = [['Active 4', false], ['Active 6', true], ['walker', true], ['Active 11', false], ['blob', true], ['rollertank', true], ['UFO', true]];
    hitList.forEach(function (hl) {
      S('Active 2').forEach(function (b) {
        S(hl[0]).forEach(function (en) {
          if (b.dead || (hl[1] && !en.vis) || !ov(b, en)) return;
          play('hit', 12);
          b.dead = true;
          en.alt[0] -= 5 + gp();
          en.alt[1] = 3;
        });
      });
    });
    if (count('Active 16') > 0 && C('final boss') === 1) S('Active 2').forEach(function (b) {
      S('Active 14').forEach(function (en) {
        if (b.dead || !ov(b, en)) return;
        play('hit', 12); b.dead = true; en.alt[0] -= 5 + gp(); en.alt[1] = 3; en.alt[6] = 8;
      });
    });
    S('Active 2').forEach(function (b) {
      S('Active 13').forEach(function (en) {
        if (b.dead || !en.vis || !ov(b, en)) return;
        play('hit', 12); b.dead = true; en.alt[0] -= 5 + gp(); en.alt[1] = 3;
      });
    });
    ['Active 4', 'Active 6', 'walker', 'Active 11', 'blob', 'rollertank', 'UFO', 'Active 14', 'Active 13'].forEach(function (n) {
      S(n).forEach(function (e) { if (e.alt[1] > 0) { e.ink = 1; e.alt[1] -= 1; } });
    });
    ['Active 4', 'Active 6', 'walker', 'Active 11', 'blob', 'rollertank', 'UFO', 'Active 14', 'Active 13'].forEach(function (n) {
      S(n).forEach(function (e) { if (e.alt[1] === 0) e.ink = 0; });
    });
    S('Active 4').forEach(function (e) { if (e.alt[0] < -50) { create('big pow', e, 2, -69); e.dead = true; create('Active 5', e, 3, -71); play('pow2', 12); } });
    S('Active 6').forEach(function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 16, 31); play('pow2', 12); hide(e); } });
    S('walker').forEach(function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 1, -31); play('pow2', 12); hide(e); } });
    S('Active 11').forEach(function (e) { if (e.alt[0] < -25) { create('Active 5', e, -1, -22); play('pow2', 12); e.dead = true; } });
    S('blob').forEach(function (e) { if (e.alt[0] < -25 && e.vis) { create('Active 5', e, 0, 0); play('pow2', 12); hide(e); } });
    S('rollertank').forEach(function (e) { if (e.alt[0] < -200) { create('Active 5', e, 23, -137); play('pow2', 12); e.dead = true; create('big pow', e, 22, -184); create('big pow', e, 25, -121); create('big pow', e, 25, -58); } });
    S('UFO').forEach(function (e) { if (e.alt[0] < -50) { create('Active 5', e, 0, 0); play('pow2', 12); create('big pow', e, 0, 0); e.dead = true; } });
    var boss = O1('Active 14');
    if (once('e118', !!boss && boss.alt[0] < -1000)) {
      stopAll();
      create('Active 5', boss, -46, -105);
      play('pow2', 12);
      ['Active 16', 'Active 17', 'lazer mount 2', 'UFO', 'Active 6', 'enemy bullet'].forEach(function (n) { S(n).forEach(function (e) { e.dead = true; }); });
      force(boss, 13);
      [[-85, -166], [4, -171], [-75, -101], [4, -83], [-17, -147], [-21, -93]].forEach(function (p) { create('big pow', boss, p[0], p[1]); });
      setMov(boss, 1, false);
      setSpeed(boss, 5);
      boss.dir = 24;
    }
    S('Active 13').forEach(function (e) { if (e.alt[0] < -50 && e.vis) { play('pow2', 12); hide(e); create('big pow', e, -2, -123); create('big pow', e, -2, -49); create('Active 5', e, 1, -109); create('Active 5', e, 2, -56); } });
    S('big pow').forEach(function (e) {
      [[-20, -20], [17, -19], [-15, 14], [15, 15], [-27, -1], [36, 1], [0, -48]].forEach(function (p) { create('little pow', e, p[0], p[1]); });
      e.dead = true;
    });
    if (count('little pow') > 0 && every('e121', 100)) pick(S('little pow')).forEach(function (e) { create('Active 5', e, 0, 0); e.dead = true; play('pow2', 12); });
    S('Active 5').forEach(function (e) { if (e.fin === 0) e.dead = true; });
    S('Active 5').forEach(function (e) { if (e.alt[0] === 0) { for (var i = 0; i < 5; i++) create('flak', e, 0, 0); e.alt[0] = 1; } });
    S('flak').forEach(function (e) { e.alt[0] += 1; e.y += 5; setSpeed(e, (e.m ? e.m.sp : 0) - 10); });
    S('flak').forEach(function (e) { if (e.alt[0] > 10) e.dead = true; });
    S('flak').forEach(function (e) { if (e.alt[1] === 0) { e.alt[1] = 1; setSpeed(e, 50 + rnd(150)); } });
    S('enemy bullet').forEach(function (e) { if (nearBorder(e)) e.dead = true; });
    S('Active 4').forEach(function (e) { if (e.alt[3] > 100 && facing(e, 2093056)) { var b = create('enemy bullet', e, 3, -81); if (b) b.dir = 16; e.alt[3] = 0; } });
    S('Active 11').forEach(function (e) { if (e.alt[3] > 100) { var b = create('enemy bullet', e, -20, -25); if (b) b.dir = 16; e.alt[3] = 0; } });
    S('Active 4').forEach(function (e) { if (e.alt[3] > 100 && facing(e, 0xF000001F)) { var b = create('enemy bullet', e, 3, -81); if (b) b.dir = 0; e.alt[3] = 0; } });
    S('enemy bullet').forEach(function (e) { e.alt[0] += 1; });
    S('enemy bullet').forEach(function (e) {
      if (e.alt[0] > 15 && e.alt[1] === 0) {
        var a = C('area');
        if (a === 1 || a === 3) { e.alt[1] = 1; setSpeed(e, 50); play('laser2', 16); }
        else if (a === 2) { e.alt[1] = 1; setSpeed(e, 50); play('lazer5', 16); }
      }
    });
    ['Active 6', 'Active 4', 'Active 11', 'rollertank', 'UFO'].forEach(function (n) { S(n).forEach(function (e) { e.alt[3] += 1; }); });
    S('Active 6').forEach(function (e) { if (e.alt[3] > 75 && facing(e, 0xFC000001)) { var p = actionPoint(e), b = create('enemy bullet', { x: p[0], y: p[1], ly: e.ly }, 0, 3); e.alt[3] = 0; if (b) b.dir = 28; } });
    S('Active 6').forEach(function (e) { if (e.alt[3] > 75 && facing(e, 8323072)) { var p = actionPoint(e), b = create('enemy bullet', { x: p[0], y: p[1], ly: e.ly }, 0, 3); e.alt[3] = 0; if (b) b.dir = 20; } });
    S('Active 6').forEach(function (e) { if (nearBorder(e)) e.alt[3] = 0; });
    S('Active 4').forEach(function (e) { if (nearBorder(e)) e.alt[3] = 0; });
    S('enemy bullet').forEach(function (e) { if (ovBg(e)) { create('Active 7', e, 0, 0); e.dead = true; } });
    S('Active 7').forEach(function (e) { if (e.fin === 0) e.dead = true; });
    if (count('enemy bullet') > 0 && every('e142', 30)) S('enemy bullet').forEach(function (e) { create('Active 8', e, 0, 0); });
    S('Active 8').forEach(function (e) { if (e.fin === 0) e.dead = true; });
    S('Active 5').forEach(function (x) { S('enemy bullet').forEach(function (b) { if (ov(x, b)) b.dead = true; }); });
    var pu = S('powerup').filter(function (p) { return ov(fr, p); });
    if (once('e145', pu.length > 0)) { play('powerup', 15); pu.forEach(function (p) { p.dead = true; }); CA('gun power', 1); }
    if (ovAny(fr, 'area 1')) CS('area', 1);
    if (ovAny(fr, 'area 2')) CS('area', 2);
    if (ovAny(fr, 'area 3')) CS('area', 3);
    if (C('area') === 2 && count('Active 9') < 20 && every('e150', 500)) pick(S('make bubble')).forEach(function (e) { create('Active 9', e, 0, 0); });
    S('Active 9').forEach(function (e) { if (e.m && e.m.stopped) e.dead = true; });
    S('Active 10').forEach(function (e) { if (ovBg(e)) e.alt[0] += 1; });
    S('lazer mount').forEach(function (e) { if (nearBorder(e)) e.alt[0] = 0; });
    S('lazer mount').forEach(function (e) { e.alt[0] += 1; });
    S('lazer mount 2').forEach(function (e) { e.alt[0] += 1; });
    S('lazer mount').forEach(function (e) { if (e.alt[0] > 100) { e.alt[0] = 0; e.alt[1] = 20; } });
    var firing = false;
    S('lazer mount').forEach(function (e) { if (e.alt[1] > 0) { create('Active 10', e, 0, 31); e.alt[1] -= 1; firing = true; } });
    if (once('e157', S('lazer mount').some(function (e) { return e.alt[1] > 0; }) || firing)) play('turret', 12);
    S('Active 10').forEach(function (e) { if (e.alt[0] > 1) e.dead = true; });
    S('Active 10').forEach(function (e) { if (nearBorder(e)) e.dead = true; });
    S('Active 11').forEach(function (e) { if (nearBorder(e)) e.alt[3] = 0; });
    S('blob').forEach(function (e) { if (ovBg(e)) bounce(e); });
    S('spring').forEach(function (e) { if (ov(fr, e)) { e.dead = true; CS('spring 2', 1); play('powerup', 15); } });
    var a3 = O1('area 3');
    if (L.start && a3) a3.alt[0] = 75;
    if (a3) {
      L.zoom = a3.alt[0];
      if (C('area') === 3 && a3.alt[0] < 100) a3.alt[0] += 5;
      if (C('area') !== 3 && a3.alt[0] > 75) a3.alt[0] -= 5;
    }
    if (once('e167', C('area') === 1)) { S('walker').forEach(function (e) { e.alt[0] = 0; show(e); }); S('Active 6').forEach(function (e) { e.alt[0] = 0; show(e); }); }
    if (once('e168', C('area') === 2)) { S('blob').forEach(function (e) { show(e); e.alt[0] = 0; }); S('Active 13').forEach(function (e) { show(e); e.alt[0] = 0; }); }
    S('Active 6').forEach(function (e) { if (!e.vis) e.alt[3] = 0; });
    if (ovBg(fR) && ovBg(fL)) hb.y -= 1;
    if (ovBg(f3)) hb.y -= 1;
    if (ovAny(fr, 'teleport')) { play('teleport', 8); hb.x = 254; hb.y = 4584; if (cl) { cl.x = 409; cl.y = 4581; } if (fo) { fo.x = 405; fo.y = 4643; } }
    var tp = O1('teleport');
    if (every('e174', 100)) S('teleport').forEach(function (e) { e.alt[0] = rnd(20); });
    S('Active 5').forEach(function (e) {
      if (e.alt[1] === 0 && tp && tp.alt[0] === 1) { create('heart', e, 0, 0); e.alt[1] = 1; }
      else if (e.alt[1] === 0) e.alt[1] = 1;
    });
    S('heart').forEach(function (e) { if (nearBorder(e)) e.dead = true; });
    S('heart').forEach(function (e) { if (ov(fr, e)) { e.dead = true; play('heart', 9); CA('life', 3); } });
    if (C('life') > 100) CS('life', 100);
    var dmg = [['enemy bullet', 3, false, true], ['Active 6', 5, true], ['Active 4', 10, true], ['walker', 5, true], ['Active 10', 3, false], ['Active 11', 5, true], ['blob', 5, true], ['rollertank', 10, false], ['UFO', 5, false], ['Active 16', 10, false], ['Active 17', 10, false], ['Active 13', 10, true]];
    dmg.forEach(function (d) {
      if (hb.alt[7] !== 0) return;
      var hitE = S(d[0]).filter(function (e) { return (!d[2] || e.vis) && ov(hb, e); });
      if (!hitE.length) return;
      play('hurt', 12);
      if (d[3]) hitE.forEach(function (e) { e.dead = true; });
      hb.alt[7] = 50;
      CA('life', -d[1]);
    });
    if (hb.alt[7] > 0) hb.alt[7] -= 1;
    var lifeE = O1('life'), h2 = O1('heart 2');
    if (once('e193', hb.alt[7] > 0)) { flash(fr, 50); if (lifeE) { lifeE.alpha = 1; flash(lifeE, 50); } if (h2) { h2.alpha = 1; flash(h2, 50); } }
    if (once('e194', hb.alt[7] === 0)) { show(fr); if (lifeE) { show(lifeE); lifeE.alpha = 1 - 150 / 255; } if (h2) { show(h2); h2.alpha = 1 - 150 / 255; } }
    S('heart').forEach(function (e) { if (!ovBg(e)) e.y += 2; });
    if (C('life') <= 0) { L.next = 39; return; }
    S('rollertank').forEach(function (e) { if (nearBorder(e)) e.alt[3] = 0; });
    S('rollertank').forEach(function (e) { if (e.alt[3] > 100) { e.alt[3] = 0; e.alt[4] = 1 + rnd(6); } });
    if (every('e199', 100)) S('rollertank').forEach(function (e) { if (e.alt[4] > 0) { shoot(e, 'enemy bullet', 100, 393216); e.alt[4] -= 1; play('lazer6', 13); } });
    if (L.start) S('UFO').forEach(function (e) { if (e.m) { e.m.stopped = true; } });
    if (every('e201', 1000)) pick(S('UFO').filter(function (e) { return e.alt[9] === 0; })).forEach(function (e) { if (e.m) { e.m.stopped = false; if (!e.m.sp) pathStep(e, e.m.i); } e.alt[9] = 1; });
    S('UFO').forEach(function (e) { if (nearBorder(e)) e.alt[3] = 0; });
    S('UFO').forEach(function (e) { if (e.alt[3] > 40) { e.alt[3] = 0; e.alt[4] = 3; } });
    if (every('e204', 50)) S('UFO').forEach(function (e) { if (e.alt[4] > 0) { shoot(e, 'Active 10', 100, 16777216); e.alt[4] -= 1; play('lazer7', 13); } });
    if (ovAny(fr, 'trigger final')) CS('final boss', 1);
    if (C('final boss') === 0 && fo) { L.cx = fo.x; L.cy = fo.y; }
    if (C('final boss') === 1) { L.cx = 7808; L.cy = 4641; }
    if (C('final boss') === 1 && count('Active 15') < 30 && count('Active 16') > 0 && every('e208', 50)) pick(S('make bubble 2')).forEach(function (e) { create('Active 15', e, 0, 0); });
    S('Active 15').forEach(function (e) { if (e.m && e.m.stopped) e.dead = true; });
    S('Active 14').forEach(function (e) { if (e.alt[6] > 0) { force(e, 12); e.alt[6] -= 1; } });
    S('Active 14').forEach(function (e) { if (e.alt[6] === 0 && e.alt[0] >= -1000) force(e, 0); });
    if (C('final boss') === 1) {
      S('Active 16').forEach(function (e) { if (e.fr === 22 && rnd(3) === 1) { shoot(e, 'enemy bullet', 50, 32768); play('lazer5', 13); } });
      S('Active 17').forEach(function (e) { if (e.fr === 22 && rnd(3) === 1) { play('lazer5', 13); shoot(e, 'enemy bullet', 50, 16384); } });
    }
    if (every('e214', 50)) S('Active 16').forEach(toFront);
    S('lazer mount 2').forEach(function (e) { if (nearBorder(e)) e.alt[0] = 0; });
    S('lazer mount 2').forEach(function (e) { if (e.alt[0] > 90) { e.alt[0] = 0; e.alt[1] = 10; } });
    if (every('e217', 50)) S('lazer mount 2').forEach(function (e) { if (e.alt[1] > 0) { create('Active 10', e, 0, 23); e.alt[1] -= 1; play('lazer7', 12); } });
    var a18 = O1('Active 18');
    if (boss && boss.alt[0] < -1000) { force(boss, 13); S('enemy bullet').forEach(function (e) { e.dead = true; }); S('heart').forEach(function (e) { e.dead = true; }); if (a18) a18.alt[10] = 1; }
    if (a18) {
      a18.alt[0] = rnd(2);
      force(a18, a18.alt[0] === 0 ? 0 : 12);
    }
    S('cutscene').forEach(function (cs) {
      if (cs.alt[0] === 0 && ov(cs, fr) && a18) {
        cs.alt[0] = 1;
        a18.alt[1] += 1;
        CS('text', a18.alt[1]);
        hide(a18);
        S('textbox').forEach(function (e) { e.dead = true; });
        a18.alt[3] = 0;
        a18.alt[4] = 0;
        S('Active 19').forEach(function (e) { e.dead = true; });
      }
    });
    if (count('textbox') === 0 && a18) hide(a18);
    S('textbox').forEach(function (e) { if (e.fin === 0) { force(e, 12); if (a18) { show(a18); a18.alt[3] = 1; } } });
    if (a18 && a18.alt[3] === 1) a18.alt[4] += 1;
    if (a18 && a18.alt[4] > 300) { hide(a18); S('textbox').forEach(function (e) { force(e, 13); }); play('Walkie_Talkie_Squelch_05', 18); a18.alt[4] = 0; a18.alt[3] = 0; }
    S('textbox').forEach(function (e) { if (e.fin === 13) e.dead = true; });
    var str = O1('String');
    if (str && a18) { if (a18.vis) show(str); else hide(str); }
    var tx = C('text');
    if (tx > 0 && tx < LINES.length && once('t' + tx, true) && str) str.text = LINES[tx];
    for (var k = 1; k < LINES.length; k++) if (C('text') !== k) L.once['t' + k] = false;
    if (once('e247', C('text') > 0) && a18) {
      create('textbox', a18, 264, 3);
      toFront(a18);
      play('Walkie_Talkie_Squelch_03', 18);
      a18.alt[3] = 0;
      a18.alt[4] = 0;
      if (str) toFront(str);
      CS('text', 0);
    }
    if (a18 && a18.alt[10] === 1) {
      if (gp() > 0) CS('found new', 41);
      if (gp() === 9) CS('found new', 48);
      if (gp() === 0) CS('found new', 47);
      if (every('e251', 5000)) { GLOBAL.found = C('found new'); GLOBAL.cups = gp(); L.next = 43; }
    }
    if (L.start) S('Active 20').forEach(function (e) { if (e.m) e.m.stopped = true; });
    if (every('e253', 10000) && rnd(10) === 1 && !L.onceOnly.e253) { L.onceOnly.e253 = true; S('Active 20').forEach(function (e) { if (e.m) { e.m.stopped = false; pathStep(e, e.m.i); } }); }
  };

  var REB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 31, 0, 1, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 24, 25, 26, 27, 27, 28, 28, 28, 28, 29, 29, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 23, 24, 25, 28, 27, 26, 25, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 20, 21, 22, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 8, 7, 6, 5, 4, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16, 17, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 16, 15, 14, 13, 12, 11, 10, 9, 8, 12, 13, 14, 15, 15, 16, 16, 16, 16, 17, 17, 18, 19, 20, 21, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7, 8, 9, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 0, 1, 2, 0, 0, 1, 1, 2, 3, 4, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 28, 29, 30, 31, 31, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 25, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10, 11, 12, 13, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  function testAt(e, x, y) { var ox = e.x, oy = e.y; e.x = x; e.y = y; var hit = ovBg(e); e.x = ox; e.y = oy; return !hit; }
  function testDir(e, d) { var a = d * Math.PI / 16; return testAt(e, e.x + Math.cos(a) * 8, e.y - Math.sin(a) * 8); }
  function bounce(e) {
    if (!e.m || e.lastBounce === L.t) return;
    e.lastBounce = L.t;
    var x = e.x - 8, y = e.y - 8, reb = 0;
    if (testAt(e, x, y)) reb |= 1;
    if (testAt(e, x + 16, y)) reb |= 2;
    if (testAt(e, x + 16, y + 16)) reb |= 4;
    if (testAt(e, x, y + 16)) reb |= 8;
    var mask = [0xFFFFFFFC, 0xFFFFFFFE, 0xFFFFFFFF][e.m.ang || 0], v = REB[reb * 32 + e.dir] & mask;
    if (!testDir(e, v)) {
      var step = [-4, 4, -4, 4, -4, 4][(e.m.ang || 0) * 2 + 1], st = step, free = false;
      while (st <= 16) {
        v = (v - st) & 31;
        if (testDir(e, v)) { free = true; break; }
        v = (v + 2 * st) & 31;
        if (testDir(e, v)) { free = true; break; }
        v = (v - st) & 31;
        st += step;
      }
      if (!free) v = rnd(32);
    }
    e.dir = v;
    var a = v * Math.PI / 16, mv = e.m.sp * 0.125;
    e.x += Math.cos(a) * mv;
    e.y -= Math.sin(a) * mv;
  }

  function tick() {
    if (!L) return;
    for (var i = 0; i < L.all.length; i++) {
      var e = L.all[i];
      if (e.dead) continue;
      moveObj(e);
      e.fin = -1;
      stepAnim(e);
      if (e.fl) { if (++e.flT >= e.fl) { e.flT = 0; e.flOn = !e.flOn; } } else e.flOn = true;
    }
    var ev = EV[L.f];
    if (ev) ev();
    L.start = false;
    L.t++;
    var keep = [];
    for (var j = 0; j < L.all.length; j++) if (!L.all[j].dead) keep.push(L.all[j]);
    if (keep.length !== L.all.length) {
      L.all = keep;
      for (var k in L.by) L.by[k] = L.by[k].filter(function (e) { return !e.dead; });
    }
    PREV = {};
    for (var kk in KEY) PREV[kk] = KEY[kk];
    camera();
    if (L.next != null) {
      var n = L.next;
      if (n === 'end') { finish(); return; }
      if (n === 37) { mode = 'title'; stopAll(); startFrame(37); syncButtons(); return; }
      startFrame(n);
      if (n === 38) { GLOBAL.start = Date.now(); }
    }
  }

  function camera() {
    if (L.f !== 38) { L.camX = 0; L.camY = 0; return; }
    var cx = L.cx != null ? L.cx : W / 2, cy = L.cy != null ? L.cy : H / 2;
    L.camX = Math.max(0, Math.min(L.w - W, Math.round(cx - W / 2)));
    L.camY = Math.max(0, Math.min(L.h - H, Math.round(cy - H / 2)));
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

  function drawImg(h, x, y) {
    var im = IM(h);
    if (!im) return;
    sg.drawImage(SHEETS[im[0]], im[1], im[2], im[3], im[4], Math.round(x - im[5]), Math.round(y - im[6]), im[3], im[4]);
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
        if (e.ly !== li || e.dead || !e.vis || !e.flOn) continue;
        if (e.t >= 32) continue;
        var fixed = e.o.fl & 2048, ex = e.x - (fixed ? 0 : ox), ey = e.y - (fixed ? 0 : oy);
        sg.globalAlpha = e.alpha;
        if (e.t === 7) { drawCounter(e, ex, ey); sg.globalAlpha = 1; continue; }
        if (e.t === 3) { drawText(e, ex, ey); sg.globalAlpha = 1; continue; }
        var h = curImg(e);
        if (h == null) { sg.globalAlpha = 1; continue; }
        var im2 = IM(h);
        if (!im2 || ex - im2[5] > W || ey - im2[6] > H || ex - im2[5] + im2[3] < 0 || ey - im2[6] + im2[4] < 0) { sg.globalAlpha = 1; continue; }
        if (e.ink === 1 && hasFilter) sg.filter = 'invert(1)';
        if (e.add) sg.globalCompositeOperation = 'lighter';
        drawImg(h, ex, ey);
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
    KEY[k] = true;
  });
  window.addEventListener('keyup', function (e) { var k = CODES[e.code]; if (k) KEY[k] = false; });
  window.addEventListener('blur', function () { KEY = {}; pause(true); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(true); });
  Array.prototype.forEach.call(root.querySelectorAll('.fis-pad [data-k]'), function (b) {
    var k = { left: 37, right: 39, down: 40, jump: 90, fire: 88 }[b.getAttribute('data-k')];
    function on(e) { e.preventDefault(); if (paused) pause(false); KEY[k] = true; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) {} }
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
      if (mode !== 'play' && L && L.f === 37) { acc += d; while (acc >= STEP) { titleTick(); acc -= STEP; } }
      render();
      if (paused) { g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.font = '700 40px Tahoma, sans-serif'; g.textAlign = 'center'; g.fillText('PAUSED', W / 2, H / 2); }
      return;
    }
    acc += d;
    var n = 0;
    while (acc >= STEP && n < 5) { tick(); acc -= STEP; n++; }
    if (n === 5) acc = 0;
    render();
  }
  function titleTick() {
    for (var i = 0; i < L.all.length; i++) { var e = L.all[i]; e.fin = -1; stepAnim(e); if (e.fl) { if (++e.flT >= e.fl) { e.flT = 0; e.flOn = !e.flOn; } } }
    if (L.start) { S('Active').forEach(function (e) { flash(e, 100); }); L.start = false; }
    L.t++;
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
      var hb = O1('hit box');
      return { frame: L.f, mode: mode, t: L.t, x: hb ? Math.round(hb.x) : 0, y: hb ? Math.round(hb.y) : 0, life: C('life'), gun: C('gun power'), area: C('area'), boss: O1('Active 14') ? O1('Active 14').alt[0] : null, final: C('final boss'), cam: [L.camX, L.camY], objs: L.all.length };
    },
    warp: function (x, y) { var hb = O1('hit box'), cl = O1('current level'), fo = O1('follow'); if (hb) { hb.x = x; hb.y = y; } if (cl) { cl.x = x; cl.y = y; } if (fo) { fo.x = x; fo.y = y; } },
    set: function (name, v) { CS(name, v); },
    key: function (k, on) { KEY[k] = on; },
    begin: begin,
    scene: scene,
    dump: function () { return L.all.filter(function (e) { return !e.dead && e.vis; }).map(function (e) { var b = box(e); return [e.o.n, e.ly, Math.round(e.x), Math.round(e.y), b && b.slice(0, 4).map(Math.round), e.dir, b && b[4]]; }); }
  };
})();
