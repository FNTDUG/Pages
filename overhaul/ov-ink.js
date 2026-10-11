(function () {
  var M = 7;
  var T = 3;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FRAMES = [
    { s: 0.18, drop: null, ms: 60 },
    { s: 0.6,  drop: -2,   ms: 60, wild: 1.8 },
    { s: 1.12, drop: 1,    ms: 70, wild: 1.6 },
    { s: 0.96, drop: 0.4,  ms: 70, wild: 1.2, tail: 1 },
    { s: 1,    drop: 0,    ms: 0, tail: 1 }
  ];
  var SETTLED = FRAMES[FRAMES.length - 1];

  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shape(ink, seed) {
    var r = rng(seed), k;
    ink.waves = []; ink.lobes = []; ink.drops = [];
    [3, 5, 7].forEach(function (f, n) { ink.waves.push({ f: f, p: r() * 6.283, a: [0.45, 0.3, 0.2][n] }); });
    for (k = 0; k < 3; k++) ink.lobes.push({ a: r() * 6.283, size: 1 + r() * 1.2 });
    var count = 4 + Math.floor(r() * 3);
    for (k = 0; k < count; k++) ink.drops.push({ a: (k + r() * 0.7) / count * 6.283, gap: 1 + r() * 1.4, wide: r() < 0.35 });
  }

  function unit(el) { return parseFloat(getComputedStyle(el).getPropertyValue('--ink-u')) || 12; }
  function edgeW(U) { return Math.max(2, Math.round(U / 4)); }

  function setup(el, i) {
    var seed = parseInt(el.getAttribute('data-seed'), 10);
    if (isNaN(seed)) seed = 1234 + i * 977;
    var cv = document.createElement('canvas');
    cv.className = 'px-ink-canvas';
    cv.setAttribute('aria-hidden', 'true');
    el.insertBefore(cv, el.firstChild);
    el._ink = { cv: cv, timer: null, w: 0, h: 0, ext: null, u: unit(el) };
    shape(el._ink, seed);
    draw(el, SETTLED);
  }

  function noise(ink, th) {
    var v = 0;
    ink.waves.forEach(function (w) { v += w.a * Math.sin(w.f * th + w.p); });
    ink.lobes.forEach(function (l) {
      var d = Math.atan2(Math.sin(th - l.a), Math.cos(th - l.a));
      v += l.size * Math.exp(-d * d / 0.08);
    });
    return v;
  }

  function draw(el, f) {
    var ink = el._ink, W = el.offsetWidth, H = el.offsetHeight;
    var U = ink.u = unit(el), O = edgeW(U);
    ink.w = W; ink.h = H;
    var cols = Math.ceil(W / U) + 2 * (M + T), rows = Math.ceil(H / U) + 2 * (M + T);
    var cv = ink.cv;
    cv.width = cols * U; cv.height = rows * U;
    cv.style.width = cols * U + 'px'; cv.style.height = rows * U + 'px';
    var ox = -Math.round((cols * U - W) / 2), oy = -Math.round((rows * U - H) / 2);
    cv.style.left = ox + 'px';
    cv.style.top = oy + 'px';
    ink.ox = ox; ink.oy = oy;

    var hwF = W / U / 2, hhF = H / U / 2;
    var hw = hwF * f.s, hh = hhF * f.s, cx = cols / 2, cy = rows / 2;
    var inside = new Uint8Array(cols * rows), c, r;
    function at(c, r) { return c >= 0 && r >= 0 && c < cols && r < rows && inside[r * cols + c]; }

    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        var px = c + 0.5 - cx, py = r + 0.5 - cy;
        var R = Math.min(hw, hh, 3.5);
        var dx = Math.max(Math.abs(px) - (hw - R), 0), dy = Math.max(Math.abs(py) - (hh - R), 0);
        var th = Math.atan2(py / (hhF + 1), px / (hwF + 1));
        var rad = Math.max(0.5, 1.4 + noise(ink, th) * (f.wild || 1)) * Math.min(1, f.s);
        if (Math.hypot(dx, dy) - R <= rad) inside[r * cols + c] = 1;
      }
    }
    if (f === SETTLED) { ink.pud = inside.slice(); ink.pc = cols; ink.pr = rows; }
    var puddle = null;
    if (f.drop !== null) {
      puddle = inside.slice();
      ink.drops.forEach(function (d) {
        var ux = Math.cos(d.a) * (hwF + 1), uy = Math.sin(d.a) * (hhF + 1), len = Math.hypot(ux, uy);
        ux /= len; uy /= len;
        var t = 0;
        while (t < cols + rows) {
          var tc = Math.floor(cx + ux * t), tr = Math.floor(cy + uy * t);
          if (tc < 0 || tr < 0 || tc >= cols || tr >= rows || !puddle[tr * cols + tc]) break;
          t += 0.5;
        }
        t += d.gap + f.drop;
        var dc = Math.floor(cx + ux * t), dr = Math.floor(cy + uy * t);
        [[0, 0]].concat(d.wide ? [[1, 0]] : []).forEach(function (o) {
          var C = dc + o[0], R = dr + o[1];
          if (C >= 0 && R >= 0 && C < cols && R < rows) inside[R * cols + C] = 1;
        });
      });
    }

    if (f === SETTLED) {
      var x = bounds(inside, cols, rows);
      ink.ext = !x ? { l: 0, t: 0, r: 0, b: 0 } : {
        l: -(ox + x.c0 * U - O), t: -(oy + x.r0 * U - O),
        r: ox + (x.c1 + 1) * U + O - W, b: oy + (x.r1 + 1) * U + O - H
      };
    }

    var a = ink.arrow, tipQ = f.tail && a && ink.pud && ink.pc === cols && ink.pr === rows ? tipAt(ink, a) : null;
    if (tipQ !== null) {
      var vert = a.dir === 'b' || a.dir === 't', sgn = a.dir === 'b' || a.dir === 'r' ? 1 : -1;
      var ln = lane(ink, a, cols, rows, W, H);
      for (var o2 = -2; o2 <= 2; o2++) {
        for (var q2 = 0; q2 < (vert ? rows : cols); q2++) {
          var C2 = vert ? ln + o2 : q2, R2 = vert ? q2 : ln + o2, i2 = R2 * cols + C2;
          if (C2 < 0 || R2 < 0 || C2 >= cols || R2 >= rows || !puddle || puddle[i2]) continue;
          if ((q2 - (vert ? cy : cx)) * sgn > 0) inside[i2] = 0;
        }
      }
      var q = Math.floor(vert ? cy : cx);
      while ((tipQ - q) * sgn > 0 && (vert ? at(ln, q) : at(q, ln))) q += sgn;
      for (; (tipQ - q) * sgn >= 0; q += sgn) {
        var w = (tipQ - q) * sgn === 1 ? 1 : 0;
        for (var o = -w; o <= w; o++) {
          var C = vert ? ln + o : q, Rw = vert ? q : ln + o;
          if (C >= 0 && Rw >= 0 && C < cols && Rw < rows) inside[Rw * cols + C] = 1;
        }
      }
    }

    var css = getComputedStyle(el);
    var col = function (n) { return css.getPropertyValue(n).trim(); };
    var ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = col('--px-ink-outline');
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) if (at(c, r)) ctx.fillRect(c * U - O, r * U - O, U + 2 * O, U + 2 * O);
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        if (!at(c, r)) continue;
        var edge = !at(c + 1, r) || !at(c - 1, r) || !at(c, r + 1) || !at(c, r - 1);
        var color = col('--px-ink');
        if (edge) color = col('--px-ink-edge');
        else {
          var upEdge = at(c, r - 1) && (!at(c, r - 2) || !at(c + 1, r - 1) || !at(c - 1, r - 1));
          var leftEdge = at(c - 1, r) && (!at(c - 2, r) || !at(c - 1, r + 1) || !at(c - 1, r - 1));
          var pxr = c + 0.5 - cx, pyr = r + 0.5 - cy;
          if ((upEdge && pxr < -hw * 0.25 && pyr < 0) || (leftEdge && pyr < -hh * 0.2 && pxr < 0)) color = col('--px-ink-shine');
        }
        ctx.fillStyle = color;
        ctx.fillRect(c * U, r * U, U, U);
      }
    }
    if (f === SETTLED && !ink.quiet) el.dispatchEvent(new Event('inkdraw'));
  }

  function bounds(mask, cols, rows) {
    var c0 = cols, c1 = -1, r0 = rows, r1 = -1, c, r;
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) if (mask[r * cols + c]) {
      if (c < c0) c0 = c; if (c > c1) c1 = c; if (r < r0) r0 = r; if (r > r1) r1 = r;
    }
    return c1 < 0 ? null : { c0: c0, c1: c1, r0: r0, r1: r1 };
  }

  function lane(ink, a, cols, rows, W, H) {
    var U = ink.u, vert = a.dir === 'b' || a.dir === 't';
    var mid = vert ? cols / 2 : rows / 2, half = (vert ? W : H) / U / 2;
    var lo = Math.ceil(mid - half) + 1, hi = Math.floor(mid + half) - 2;
    var ln = Math.floor((a.at - (vert ? ink.ox : ink.oy)) / U);
    return lo > hi ? Math.floor(mid) : Math.max(lo, Math.min(hi, ln));
  }

  function tipAt(ink, a) {
    var cols = ink.pc, rows = ink.pr, vert = a.dir === 'b' || a.dir === 't', sgn = a.dir === 'b' || a.dir === 'r' ? 1 : -1;
    var ln = lane(ink, a, cols, rows, ink.w, ink.h), far = null, o, q;
    for (o = -2; o <= 2; o++) {
      for (q = 0; q < (vert ? rows : cols); q++) {
        var c = vert ? ln + o : q, r = vert ? q : ln + o;
        if (c < 0 || r < 0 || c >= cols || r >= rows || !ink.pud[r * cols + c]) continue;
        if (far === null || (q - far) * sgn > 0) far = q;
      }
    }
    return far === null ? null : far + sgn * T;
  }

  function tipSpill(el, dir, at) {
    var ink = el._ink;
    if (!ink || !ink.pud) return 0;
    var U = ink.u, O = edgeW(U);
    var q = tipAt(ink, { dir: dir, at: at });
    if (q === null) return 0;
    if (dir === 'b') return ink.oy + (q + 1) * U + O - ink.h;
    if (dir === 't') return -(ink.oy + q * U - O);
    if (dir === 'r') return ink.ox + (q + 1) * U + O - ink.w;
    return -(ink.ox + q * U - O);
  }

  function splash(el) {
    var ink = el._ink;
    if (!ink) return;
    clearTimeout(ink.timer);
    if (reduce) { el.classList.remove('is-splashing'); return; }
    el.classList.add('is-splashing');
    var i = 0;
    (function next() {
      var f = FRAMES[i];
      ink.timer = null;
      draw(el, f);
      if (i === 3) el.classList.remove('is-splashing');
      if (++i < FRAMES.length) ink.timer = setTimeout(next, f.ms);
      else ink.timer = null;
    })();
  }

  function unsplash(el, done) {
    var ink = el._ink;
    if (!ink) { if (done) done(); return; }
    clearTimeout(ink.timer);
    el.classList.add('is-splashing');
    var i = reduce ? -1 : FRAMES.length - 2;
    (function next() {
      if (i < 0) {
        ink.cv.getContext('2d').clearRect(0, 0, ink.cv.width, ink.cv.height);
        ink.timer = null;
        if (done) done();
        return;
      }
      var f = FRAMES[i--];
      draw(el, f);
      ink.timer = setTimeout(next, f.ms);
    })();
  }


  window.pxInkChat = {
    splash: splash,
    unsplash: unsplash,
    tip: tipSpill,
    point: function (el, dir, at) {
      var ink = el._ink;
      if (!ink) return;
      var U = ink.u;
      var a = { dir: dir, at: at };
      var ln = lane(ink, a, Math.round(ink.cv.width / U), Math.round(ink.cv.height / U), ink.w, ink.h);
      if (ink.arrow && ink.arrow.dir === dir && ink.arrow.ln === ln) return;
      a.ln = ln;
      ink.arrow = a;
      if (!ink.timer) { ink.quiet = true; draw(el, SETTLED); ink.quiet = false; }
    },
    attach: function (el) { if (!el._ink) setup(el, Math.floor(Math.random() * 100000)); },
    redraw: function (el) { draw(el, SETTLED); },
    reshape: function (el) {
      if (!el._ink) return;
      shape(el._ink, Math.floor(Math.random() * 2147483647));
      el._ink.quiet = true; draw(el, SETTLED); el._ink.quiet = false;
    }
  };
})();
