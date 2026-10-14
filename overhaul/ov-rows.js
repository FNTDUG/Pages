(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INK_U = 8, INK_O = 2, INK_PAD = 1, INK_MIN = 12, INK_MAX = 26;
  var INK_C = { fill: '#151b2c', edge: '#070b14', shine: '#2a3554', outline: '#fafafa' };
  var APPEAR = [{ s: 0.18, drop: null, ms: 60 }, { s: 0.6, drop: -2, ms: 60, wild: 1.8 }, { s: 1.12, drop: 1, ms: 70, wild: 1.6 }, { s: 0.96, drop: 0.4, ms: 70, wild: 1.2 }, { s: 1, drop: 0, ms: 0 }];
  var BURST = [{ s: 1.08, drop: 1, ms: 60, wild: 1.7 }, { s: 1.13, drop: 2.2, ms: 70, wild: 1.5 }, { s: 0.97, drop: 0.6, ms: 70, wild: 1.2 }, { s: 1, drop: 0, ms: 0 }];
  var SETTLED = APPEAR[APPEAR.length - 1];
  var inkLayer = null;

  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function layer() {
    if (inkLayer && inkLayer.parentNode) return inkLayer;
    inkLayer = document.createElement('div');
    inkLayer.className = 'ov-row-ink-layer';
    inkLayer.setAttribute('aria-hidden', 'true');
    inkLayer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:1';
    document.body.appendChild(inkLayer);
    return inkLayer;
  }

  function shapeOf(seed, rows, out) {
    var r = rng(seed), waves = [], lobes = [], blobs = [], k;
    [3, 5, 7].forEach(function (f, n) { waves.push({ f: f, p: r() * 6.283, a: [0.45, 0.3, 0.2][n] }); });
    for (k = 0; k < 4; k++) lobes.push({ a: (r() - 0.5) * 2.8, size: 1 + r() * 1.4 });
    var nb = Math.max(2, Math.min(4, Math.round(rows / 18) + (r() < 0.5 ? 0 : 1))), reach = out - 4;
    for (k = 0; k < nb; k++) {
      var ry = Math.min(rows * (0.12 + r() * 0.1), rows / (nb * 1.4));
      blobs.push({ y: ry * 1.2 + (rows - ry * 2.4) * ((k + 0.2 + r() * 0.6) / nb), rx: reach * (0.45 + r() * 0.4), ry: ry, bx: r() * 2.5, p: r() * 6.283 });
    }
    var sh = { waves: waves, lobes: lobes, blobs: blobs, band: r() * 6.283 }, peak = 0, half = rows / 2;
    for (k = 0; k < 360; k++) peak = Math.max(peak, inkNoise(sh, k / 360 * 6.283));
    var grow = 1.13 * (1 + 0.16 * Math.max(0, peak) * 1.8);
    sh.k = 1;
    blobs.forEach(function (B) {
      sh.k = Math.min(sh.k, (out - 2 - B.bx) / (B.rx * grow), (half - Math.abs(B.y - half)) / (B.ry * grow));
    });
    sh.k = Math.max(0.2, sh.k);
    return sh;
  }
  function inkNoise(sh, th) {
    var v = 0;
    sh.waves.forEach(function (w) { v += w.a * Math.sin(w.f * th + w.p); });
    sh.lobes.forEach(function (l) { var d = Math.atan2(Math.sin(th - l.a), Math.cos(th - l.a)); v += l.size * Math.exp(-d * d / 0.08); });
    return v;
  }

  function Splash(side, seed) {
    var cv = document.createElement('canvas');
    cv.className = 'ov-row-ink';
    cv.style.cssText = 'position:absolute;display:none;image-rendering:pixelated;image-rendering:crisp-edges';
    layer().appendChild(cv);
    var ctx = cv.getContext('2d'), r = rng(seed), versions = [], cur = 0, drops = [], timer = null, lastBurst = 0, shown = false;
    var rows = 0, out = 0, at = { x: null, y: null }, shapes = {};
    for (var k = 0; k < 4; k++) versions.push(Math.floor(r() * 2147483647));
    cur = Math.floor(r() * versions.length);
    function shape() {
      var key = cur + ':' + rows + ':' + out;
      if (!shapes[key]) shapes[key] = shapeOf(versions[cur], rows, out);
      return shapes[key];
    }
    function newDrops() {
      drops = [];
      var count = 7 + Math.floor(r() * 4);
      for (var k = 0; k < count; k++) drops.push({ a: -1.3 + (k + r() * 0.7) / count * 2.6, gap: 1 + r() * 2.6, wide: r() < 0.4 });
    }
    newDrops();
    function draw(f) {
      if (!rows || !out) return;
      var sh = shape(), all = rows + 2 * INK_PAD, half = rows / 2, sc = Math.min(1, f.s), hh = half * sc, cy = INK_PAD + half;
      var inside = new Uint8Array(out * all), u, row;
      function idx(u, row) { return row * out + u; }
      function inCard(row) { return row >= INK_PAD && row < INK_PAD + rows; }
      function on(u, row) { if (u < 0) return inCard(row) && Math.abs(row + 0.5 - cy) <= hh; return u < out && row >= 0 && row < all && inside[idx(u, row)] === 1; }
      for (row = INK_PAD; row < INK_PAD + rows; row++) {
        for (u = 0; u < out - 1; u++) {
          var px = u + 0.5, py = row + 0.5 - cy, hit = false;
          for (var b = 0; b < sh.blobs.length && !hit; b++) {
            var B = sh.blobs[b], qx = (px - B.bx) / (B.rx * sh.k * f.s), qy = (py - (B.y - half) * sc) / (B.ry * sh.k * f.s);
            if (Math.hypot(qx, qy) <= 1 + 0.16 * inkNoise(sh, Math.atan2(qy, qx) + B.p) * (f.wild || 1)) hit = true;
          }
          if (!hit && Math.abs(py) <= hh && px <= (2.2 + 0.9 * Math.sin(row * 0.45 + sh.band)) * sc) hit = true;
          if (hit) inside[idx(u, row)] = 1;
        }
      }
      if (f.drop !== null) {
        var pud = inside.slice(), reach = (out - 4) * 0.5;
        drops.forEach(function (d) {
          var ux = Math.cos(d.a) * reach, uy = Math.sin(d.a) * (half + 1), len = Math.hypot(ux, uy), t = 0;
          ux /= len; uy /= len;
          while (t < out + all) {
            var tu = Math.floor(ux * t), tr = Math.floor(cy + uy * t);
            if (tu < 0 || tr < 0 || tu >= out || tr >= all || !pud[idx(tu, tr)]) break;
            t += 0.5;
          }
          t += d.gap + f.drop;
          var du = Math.floor(ux * t), dr = Math.floor(cy + uy * t);
          [[0, 0]].concat(d.wide ? [[0, 1]] : []).forEach(function (o) {
            var U2 = du + o[0], R2 = dr + o[1];
            if (U2 >= 0 && U2 < out - 1 && inCard(R2)) inside[idx(U2, R2)] = 1;
          });
        });
      }
      ctx.clearRect(0, 0, cv.width, cv.height);
      function cell(u) { return side === 'left' ? (out - 1 - u) * INK_U : u * INK_U; }
      ctx.fillStyle = INK_C.outline;
      for (row = 0; row < all; row++) for (u = 0; u < out; u++) if (inside[idx(u, row)]) ctx.fillRect(cell(u) - INK_O, row * INK_U - INK_O, INK_U + 2 * INK_O, INK_U + 2 * INK_O);
      for (row = 0; row < all; row++) {
        for (u = 0; u < out; u++) {
          if (!inside[idx(u, row)]) continue;
          var col = INK_C.fill;
          if (!on(u + 1, row) || !on(u - 1, row) || !on(u, row + 1) || !on(u, row - 1)) col = INK_C.edge;
          else if (on(u, row - 1) && !on(u, row - 2) && row + 0.5 - cy < 0 && u > 3) col = INK_C.shine;
          ctx.fillStyle = col;
          ctx.fillRect(cell(u), row * INK_U, INK_U, INK_U);
        }
      }
      ctx.clearRect(side === 'left' ? cv.width - INK_O : 0, 0, INK_O, cv.height);
    }
    function play(seq) {
      clearTimeout(timer);
      timer = null;
      if (reduced) { draw(SETTLED); return; }
      var i = 0;
      (function next() {
        var f = seq[i];
        draw(f);
        timer = ++i < seq.length ? setTimeout(next, f.ms) : null;
      })();
    }
    function swap() {
      var n = Math.floor(r() * (versions.length - 1));
      cur = n >= cur ? n + 1 : n;
    }
    return {
      place: function (x, y, h, room) {
        var nr = Math.max(4, Math.round(h / INK_U)), no = Math.min(INK_MAX, Math.floor(room / INK_U));
        if (no < INK_MIN || h < 32) { cv.style.display = 'none'; return false; }
        var resized = nr !== rows || no !== out;
        rows = nr; out = no;
        var left = Math.round(side === 'left' ? x - out * INK_U + 1 : x - 1), top = Math.round(y - INK_PAD * INK_U);
        if (resized) {
          cv.width = out * INK_U;
          cv.height = (rows + 2 * INK_PAD) * INK_U;
          cv.style.width = cv.width + 'px';
          cv.style.height = cv.height + 'px';
        }
        if (left !== at.x || top !== at.y) { cv.style.left = left + 'px'; cv.style.top = top + 'px'; at.x = left; at.y = top; }
        if (cv.style.display === 'none') cv.style.display = 'block';
        if (!shown) { if (resized) ctx.clearRect(0, 0, cv.width, cv.height); return true; }
        if (resized) {
          if (timer || reduced) draw(SETTLED);
          else { swap(); newDrops(); lastBurst = performance.now(); play(BURST); }
        }
        return true;
      },
      show: function () {
        if (shown) return;
        shown = true;
        swap();
        play(APPEAR);
      },
      burst: function () {
        if (!shown || reduced) return;
        var now = performance.now();
        if (now - lastBurst < 450) return;
        lastBurst = now;
        swap();
        newDrops();
        play(BURST);
      },
      hide: function () { cv.style.display = 'none'; },
      kill: function () { clearTimeout(timer); if (cv.parentNode) cv.parentNode.removeChild(cv); }
    };
  }

  window.ovRowLoop = function (box, opts) {
    opts = opts || {};
    var fine = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    if (!box || !window.gsap || (!fine && !window.Draggable)) return;
    var g = window.gsap, SPEED = 22;
    if (window.Draggable) g.registerPlugin(window.Draggable);
    if (window.InertiaPlugin) g.registerPlugin(window.InertiaPlugin);
    var on = false, auto = !reduced, pos = 0, raf = 0, last = 0, seen = false, resizeT = 0;
    var items = [], extra = [], step = 0, total = 0, drag = null, proxy = document.createElement('div'), slide = { x: 0 };
    var inks = null, geo = null, prevX = [], shift = 0;
    function kids() { return Array.prototype.slice.call(box.children); }
    function originals() { return kids().filter(function (el) { return !el.classList.contains('is-copy'); }); }
    function wants() {
      if (opts.fit === 'wrap') {
        var had = box.classList.contains('rowloop');
        box.classList.remove('rowloop');
        var k = originals();
        var res = k.length > 1 && k[k.length - 1].offsetTop > k[0].offsetTop + 2;
        if (had) box.classList.add('rowloop');
        return res;
      }
      var n = originals().length, vw = window.innerWidth;
      return n > 1 && n > (vw <= 600 ? 1 : vw <= 960 ? 2 : 3);
    }
    function copy(el) {
      var c = el.cloneNode(true), tint = el.style.getPropertyValue('--c');
      c.removeAttribute('style');
      if (tint) c.style.setProperty('--c', tint);
      c.classList.remove('reveal');
      c.classList.add('is-copy');
      c.setAttribute('aria-hidden', 'true');
      if (c.tagName === 'A' || c.tagName === 'BUTTON') c.tabIndex = -1;
      Array.prototype.forEach.call(c.querySelectorAll('a,button'), function (a) { a.tabIndex = -1; });
      return c;
    }
    function measure() {
      extra.forEach(function (c) { c.parentNode.removeChild(c); });
      extra = [];
      var base = kids();
      base.forEach(function (el) { el.style.translate = ''; });
      step = base[1].getBoundingClientRect().left - base[0].getBoundingClientRect().left || base[1].offsetLeft - base[0].offsetLeft;
      shift = 0;
      if (!fine) {
        var br0 = box.getBoundingClientRect(), r0 = base[0].getBoundingClientRect();
        shift = Math.round(box.clientLeft + (box.clientWidth - r0.width) / 2 - (r0.left - br0.left));
      }
      total = step * base.length;
      var need = box.clientWidth + step;
      while (total < need) {
        base.forEach(function (el) { var c = copy(el); box.appendChild(c); extra.push(c); });
        total += step * base.length;
      }
      items = kids();
      items.forEach(function (el) {
        el.setAttribute('draggable', 'false');
        Array.prototype.forEach.call(el.querySelectorAll('a,img'), function (a) { a.setAttribute('draggable', 'false'); });
      });
      if (inks) gauge();
    }
    function gauge() {
      var mine = box.style.clipPath;
      box.style.clipPath = '';
      var cs = getComputedStyle(box), m = /inset\(([^)]*)\)/.exec(cs.clipPath || '');
      box.style.clipPath = mine;
      var cut = m ? m[1].trim().split(/\s+/) : [], insetL = parseFloat(cut[3] || cut[1] || cut[0]) || 0;
      var own = items[0].offsetParent === box;
      function off(el, k) { return own ? el[k] + (k === 'offsetTop' ? box.clientTop : box.clientLeft) : el[k] - box[k]; }
      geo = {
        left0: off(items[0], 'offsetLeft'),
        clipL: Math.max(box.clientLeft, insetL),
        clipR: box.clientWidth + box.clientLeft,
        cards: items.map(function (el) { return { top: off(el, 'offsetTop'), h: el.offsetHeight, w: el.offsetWidth }; })
      };
      var gap = step - geo.cards[0].w, fit = Math.floor((geo.clipR - geo.left0 + gap) / step);
      var sh = /(-?[\d.]+)px\s+(-?[\d.]+)px/.exec(getComputedStyle(items[0]).boxShadow || ''), shadow = sh ? Math.max(0, parseFloat(sh[1])) : 0;
      geo.lineL = Math.max(geo.clipL, geo.left0);
      geo.lineR = Math.min(geo.clipR, geo.left0 + fit * step - gap + shadow);
      geo.clip = null;
      prevX = [];
    }
    function nearestCard(xs, line) {
      var best = -1, bestD = 1e9;
      xs.forEach(function (x, i) {
        var w = geo.cards[i].w, d = x <= line && x + w >= line ? 0 : Math.min(Math.abs(x - line), Math.abs(x + w - line));
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    }
    function inkFrame(xs) {
      if (!inks || !geo) return;
      var br = box.getBoundingClientRect();
      if (!br.width) { inks[0].hide(); inks[1].hide(); return; }
      var lr = layer().getBoundingClientRect(), vw = document.documentElement.clientWidth;
      var lines = [geo.lineL, geo.lineR], live = [false, false];
      [[0, geo.lineL, br.left + geo.lineL], [1, geo.lineR, vw - br.left - geo.lineR]].forEach(function (s) {
        var i = nearestCard(xs, s[1]), c = geo.cards[i];
        if (i < 0) return;
        live[s[0]] = inks[s[0]].place(br.left + s[1] - lr.left, br.top + c.top - lr.top, c.h, s[2] - 16);
      });
      var clip = live[0] || live[1] ? 'inset(0px ' + (live[1] ? box.offsetWidth - geo.lineR : 0) + 'px 0px ' + (live[0] ? geo.lineL : geo.clipL) + 'px)' : '';
      if (clip !== geo.clip) { box.style.clipPath = clip; geo.clip = clip; }
      xs.forEach(function (x, i) {
        var p = prevX[i], w = geo.cards[i].w;
        if (p !== undefined && Math.abs(p - x) < step) {
          [[0, lines[0]], [1, lines[1]]].forEach(function (s) {
            if ((p - s[1]) * (x - s[1]) < 0 || (p + w - s[1]) * (x + w - s[1]) < 0) inks[s[0]].burst();
          });
        }
        prevX[i] = x;
      });
    }
    function norm(v) { return ((v % total) + total) % total; }
    function render() {
      pos = norm(pos);
      var lo = -step, xs = inks && geo ? [] : null;
      items.forEach(function (el, i) {
        var x = norm(i * step - pos - lo) + lo;
        el.style.translate = Math.round(x - i * step) + 'px 0';
        if (xs) xs[i] = geo.left0 + Math.round(x);
      });
      if (xs) inkFrame(xs);
    }
    function nearest(target) {
      var d = norm(target - pos);
      if (d > total / 2) d -= total;
      return pos + d;
    }
    function glideTo(target, dur) {
      slide.x = pos;
      g.to(slide, { x: target, duration: dur || 0.45, ease: 'power3.out', overwrite: true, onUpdate: function () { pos = slide.x; render(); } });
    }
    function snapPos(v) { return Math.round((v + shift) / step) * step - shift; }
    function settle() {
      var target = nearest(snapPos(pos));
      if (Math.abs(target - pos) > 0.5) glideTo(target);
      idle();
    }
    function stopAuto() {
      idle();
      if (!auto) return;
      auto = false;
      cancelAnimationFrame(raf);
      idle();
    }
    var nudgeT = 0, hover = false, pressing = false, nt = null;
    function idle() {
      clearTimeout(nudgeT);
      if (!on || auto || reduced) return;
      nudgeT = setTimeout(nudge, 2500 + Math.random() * 500);
    }
    function nudge() {
      if (!on || auto) return;
      if (hover || pressing || !seen || document.hidden || box.querySelector(':focus-visible') || (drag && (drag.isDragging || drag.isThrowing)) || g.isTweening(slide)) { idle(); return; }
      var base = nearest(snapPos(pos)), d = Math.max(14, Math.min(30, step * 0.09));
      var move = function () { pos = slide.x; render(); };
      slide.x = pos;
      nt = g.timeline({ onComplete: function () { nt = null; idle(); } })
        .to(slide, { x: base + d, duration: 0.34, ease: 'power2.inOut', onUpdate: move })
        .to(slide, { x: base, duration: 0.4, ease: 'power2.inOut', onUpdate: move })
        .to(slide, { x: base + d, duration: 0.34, ease: 'power2.inOut', onUpdate: move }, '+=0.08')
        .to(slide, { x: base, duration: 0.55, ease: 'power2.inOut', onUpdate: move });
    }
    box.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      hover = true;
      if (nt) { nt.kill(); nt = null; settle(); }
    });
    box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = false; idle(); } });
    function tick(t) {
      if (!on || !auto) return;
      if (seen && !document.hidden) {
        var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
        pos += SPEED * dt;
        render();
      }
      last = t;
      raf = requestAnimationFrame(tick);
    }
    function build() {
      on = true;
      box.classList.add('rowloop');
      if (fine && opts.ink !== false) {
        var seed = Math.floor(Math.random() * 2147483647);
        inks = [Splash('left', seed), Splash('right', seed ^ 0x5bd1e995)];
        if (seen) { inks[0].show(); inks[1].show(); }
      }
      measure();
      pos = 0;
      render();
      if (fine) box.classList.remove('can-drag');
      else box.classList.add('can-drag');
      drag = fine ? null : window.Draggable.create(proxy, {
        type: 'x',
        trigger: box,
        inertia: !!window.InertiaPlugin,
        dragClickables: true,
        minimumMovement: 6,
        onPress: function () {
          pressing = true;
          stopAuto();
          g.killTweensOf(slide);
          g.set(proxy, { x: -pos });
          this.update();
        },
        onDragStart: function () { box.classList.add('is-dragging'); },
        onDrag: function () { pos = -this.x; render(); },
        onThrowUpdate: function () { pos = -this.x; render(); },
        onRelease: function () {
          pressing = false;
          box.classList.remove('is-dragging');
          var self = this;
          setTimeout(function () { if (!self.isThrowing) settle(); }, 0);
        },
        onThrowComplete: settle,
        snap: function (v) { return -snapPos(-v); }
      })[0];
      if (auto) { last = 0; raf = requestAnimationFrame(tick); }
    }
    function teardown() {
      on = false;
      if (inks) { inks[0].kill(); inks[1].kill(); inks = null; geo = null; box.style.clipPath = ''; }
      cancelAnimationFrame(raf);
      clearTimeout(nudgeT);
      if (drag) { drag.kill(); drag = null; }
      g.killTweensOf(slide);
      extra.forEach(function (c) { c.parentNode.removeChild(c); });
      extra = [];
      kids().forEach(function (el) { el.style.translate = ''; });
      box.classList.remove('rowloop', 'is-dragging', 'can-drag');
    }
    function sync() {
      var want = wants();
      if (want && !on) build();
      else if (!want && on) teardown();
      else if (on) { measure(); render(); }
    }
    box.addEventListener('focusin', function (e) {
      if (!on) return;
      stopAuto();
      var el = e.target.closest ? e.target.closest('.rowloop > *') : null;
      var i = items.indexOf(el);
      if (i >= 0 && e.target.matches && e.target.matches(':focus-visible')) { box.scrollLeft = 0; glideTo(nearest(i * step)); }
    });
    box.addEventListener('keydown', stopAuto);
    var outsideAt = -1e9, wheelTo = null, wheelT = 0;
    window.addEventListener('wheel', function (e) { if (!box.contains(e.target)) outsideAt = e.timeStamp; }, { passive: true });
    box.addEventListener('wheel', function (e) {
      if (!on || e.ctrlKey) return;
      var across = Math.abs(e.deltaX) > Math.abs(e.deltaY), d = across ? e.deltaX : e.deltaY;
      if (!across && e.timeStamp - outsideAt < 300) { outsideAt = e.timeStamp; return; }
      d *= e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? box.clientWidth : 1;
      if (!d) return;
      e.preventDefault();
      stopAuto();
      g.killTweensOf(proxy);
      wheelTo = pos + (wheelTo === null ? 0 : wheelTo - slide.x) + d;
      glideTo(wheelTo, 0.3);
      clearTimeout(wheelT);
      wheelT = setTimeout(function () { wheelTo = null; settle(); }, 180);
    }, { passive: false });
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        seen = es[0].isIntersecting;
        last = 0;
        if (seen && inks) { inks[0].show(); inks[1].show(); }
      }, { threshold: 0.2 }).observe(box);
    } else seen = true;
    window.addEventListener('resize', function () {
      if (inks) render();
      clearTimeout(resizeT);
      resizeT = setTimeout(sync, 150);
    }, { passive: true });
    if (window.ResizeObserver) {
      var shiftT = 0;
      new ResizeObserver(function () {
        if (!inks) return;
        clearTimeout(shiftT);
        shiftT = setTimeout(function () { if (inks) { gauge(); render(); } }, 60);
      }).observe(document.body);
    }
    sync();
  };
})();
