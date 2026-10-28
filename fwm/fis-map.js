(function () {
  var root = document.getElementById('fm');
  if (!root) return;
  var BASE = '/fwm/fis57/map/', VER = '?v=2', MW = 8000, MH = 5000, OFFY = 200, TILE = 1000;
  var DY = { cupcake: -36, spring: -38, teleport: -38, heart: -16, start: -96, boss: 0 };
  var CATS = {
    cupcake: { name: 'Cupcakes', icon: 'cupcake' },
    place: { name: 'Landmarks', icon: 'spring' },
    boss: { name: 'Boss', icon: 'boss' }
  };
  var PINS = [
    { cat: 'cupcake', icon: 'cupcake', x: 1407, y: 30, name: 'Cupcake 1', below: true },
    { cat: 'cupcake', icon: 'cupcake', x: 3964, y: 346, name: 'Cupcake 2' },
    { cat: 'cupcake', icon: 'cupcake', x: 1263, y: 815, name: 'Cupcake 3' },
    { cat: 'cupcake', icon: 'cupcake', x: 1999, y: 1103, name: 'Cupcake 4' },
    { cat: 'cupcake', icon: 'cupcake', x: 2511, y: 2255, name: 'Cupcake 5' },
    { cat: 'cupcake', icon: 'cupcake', x: 6959, y: 2511, name: 'Cupcake 6' },
    { cat: 'cupcake', icon: 'cupcake', x: 2479, y: 3599, name: 'Cupcake 7' },
    { cat: 'cupcake', icon: 'cupcake', x: 6607, y: 3055, name: 'Cupcake 8' },
    { cat: 'cupcake', icon: 'cupcake', x: 47, y: 4495, name: 'Cupcake 9' },
    { cat: 'place', icon: 'start', x: 254, y: 450, name: 'Start', text: 'Freddy starts the game here.' },
    { cat: 'place', icon: 'spring', x: 5891, y: 1180, name: 'Jump Boost', short: 'Boost', text: 'Pick it up to jump 50% higher for the rest of the game.' },
    { cat: 'place', icon: 'teleport', x: 5882, y: 111, name: 'Teleporter', text: 'Sends Freddy to the bottom-left corridor.', to: 12, go: 'Show the exit' },
    { cat: 'place', icon: 'teleport', x: 254, y: 4560, name: 'Teleporter exit', short: 'TP exit', text: 'Where the teleporter drops Freddy.', to: 11, go: 'Show the teleporter' },
    { cat: 'place', icon: 'heart', x: 672, y: 1088, name: 'Heart', text: 'Restores some health.' },
    { cat: 'boss', icon: 'boss', x: 7877, y: 4600, name: "Scott's Head", short: 'Boss', text: 'The final boss. Beat him to finish the game.' }
  ];
  var view = root.querySelector('.fm-view'), world = root.querySelector('.fm-world'), tiles = root.querySelector('.fm-tiles'), pinLayer = root.querySelector('.fm-pins'), pop = root.querySelector('.fm-pop');
  var s = 0.1, tx = 0, ty = 0, minS = 0.05, maxS = 1, loaded = {}, on = { cupcake: true, place: true, boss: true }, openPin = null, raf = 0;
  try { var saved = JSON.parse(localStorage.getItem('fm-cats') || 'null'); if (saved) for (var k in on) if (k in saved) on[k] = !!saved[k]; } catch (e) {}

  var ov = document.createElement('img');
  ov.className = 'fm-ov';
  ov.src = BASE + 'overview.webp' + VER;
  ov.alt = '';
  ov.draggable = false;
  world.insertBefore(ov, tiles);

  PINS.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'fm-pin fm-pin--' + p.cat + (p.below ? ' fm-pin--below' : '');
    b.setAttribute('aria-label', p.name);
    b.innerHTML = '<img src="' + BASE + 'i_' + p.icon + '.png' + VER + '" alt="" draggable="false">';
    b.addEventListener('click', function (e) { e.stopPropagation(); openPop(i); });
    p.el = b;
    pinLayer.appendChild(b);
  });

  function fit() { return Math.min(view.clientWidth / MW, view.clientHeight / MH); }
  function clamp() {
    var vw = view.clientWidth, vh = view.clientHeight, w = MW * s, h = MH * s;
    tx = w <= vw ? (vw - w) / 2 : Math.min(0, Math.max(vw - w, tx));
    ty = h <= vh ? (vh - h) / 2 : Math.min(0, Math.max(vh - h, ty));
  }
  function draw() {
    raf = 0;
    clamp();
    world.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
    if (s >= 0.22) {
      var x0 = Math.max(0, Math.floor(-tx / s / TILE)), y0 = Math.max(0, Math.floor(-ty / s / TILE));
      var x1 = Math.min(Math.ceil(MW / TILE) - 1, Math.floor((view.clientWidth - tx) / s / TILE)), y1 = Math.min(Math.ceil(MH / TILE) - 1, Math.floor((view.clientHeight - ty) / s / TILE));
      for (var gy = y0; gy <= y1; gy++) for (var gx = x0; gx <= x1; gx++) {
        var key = gx + '_' + gy;
        if (loaded[key]) continue;
        var im = document.createElement('img');
        im.className = 'fm-tile';
        im.alt = '';
        im.draggable = false;
        im.decoding = 'async';
        im.style.left = gx * TILE + 'px';
        im.style.top = gy * TILE + 'px';
        im.src = BASE + 't_' + key + '.webp' + VER;
        tiles.appendChild(im);
        loaded[key] = im;
      }
    }
    tiles.style.visibility = s >= 0.22 ? '' : 'hidden';
    var big = s >= 0.16 && view.clientWidth >= 600;
    PINS.forEach(function (p) {
      var show = on[p.cat];
      p.el.hidden = !show;
      if (!show) return;
      p.el.style.transform = 'translate(' + Math.round(tx + p.x * s) + 'px,' + Math.round(ty + (p.y + OFFY + (p.below ? 26 : DY[p.icon] || 0)) * s) + 'px)';
      p.el.classList.toggle('fm-pin--sm', !big);
    });
    if (openPin != null) placePop();
    root.querySelector('.fm-zoom-val').textContent = Math.round(s / fit() * 100) + '%';
  }
  function later() { if (!raf) raf = requestAnimationFrame(draw); }
  function zoomAt(ns, cx, cy) {
    ns = Math.max(minS, Math.min(maxS, ns));
    tx = cx - (cx - tx) * ns / s;
    ty = cy - (cy - ty) * ns / s;
    s = ns;
    later();
  }
  function flyTo(x, y, ns) {
    s = Math.max(minS, Math.min(maxS, ns));
    tx = view.clientWidth / 2 - x * s;
    ty = view.clientHeight / 2 - (y + OFFY) * s;
    draw();
  }
  function reset() { minS = fit(); s = minS; tx = 0; ty = 0; draw(); }

  function openPop(i) {
    var p = PINS[i];
    openPin = i;
    var t = '<p class="fm-pop-kick">' + CATS[p.cat].name.replace(/s$/, '') + '</p><h3>' + p.name + '</h3>';
    if (p.cat === 'cupcake') t += '<p>' + p.name.split(' ')[1] + ' of 9. Every cupcake you carry powers up your blaster.</p>';
    if (p.text) t += '<p>' + p.text + '</p>';
    if (p.to != null) t += '<button type="button" class="fm-pop-go">' + p.go + '</button>';
    pop.querySelector('.fm-pop-body').innerHTML = t;
    pop.hidden = false;
    var go = pop.querySelector('.fm-pop-go');
    if (go) go.addEventListener('click', function () { var d = PINS[p.to]; flyTo(d.x, d.y, Math.max(s, 0.35)); openPop(p.to); });
    PINS.forEach(function (q, k) { q.el.classList.toggle('fm-pin--on', k === i); });
    placePop();
  }
  function closePop() { openPin = null; pop.hidden = true; PINS.forEach(function (q) { q.el.classList.remove('fm-pin--on'); }); }
  function placePop() {
    var p = PINS[openPin];
    if (!p || !on[p.cat]) { closePop(); return; }
    var big = s >= 0.16 && view.clientWidth >= 600, ph = big ? 58 : (view.clientWidth < 600 ? 32 : 42), x = tx + p.x * s, w = pop.offsetWidth, h = pop.offsetHeight, vw = view.clientWidth;
    var anchor = ty + (p.y + OFFY + (p.below ? 26 : DY[p.icon] || 0)) * s;
    var topEdge = p.below ? ty + (p.y + OFFY + (DY[p.icon] || 0)) * s : anchor - ph;
    var botEdge = p.below ? anchor + ph : ty + (p.y + OFFY + 26) * s;
    var vh = view.clientHeight, left = Math.max(8, Math.min(vw - w - 8, x - w / 2)), top = topEdge - h - 10;
    if (top < 8) top = botEdge + 10;
    if (top + h > vh - 8) top = Math.max(8, vh - h - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }
  pop.querySelector('.fm-pop-x').addEventListener('click', closePop);

  var pts = {}, drag = null, moved = false, lastTap = 0;
  view.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.fm-pin,.fm-pop,.fm-ctl')) return;
    view.setPointerCapture(e.pointerId);
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(pts);
    if (ids.length === 1) { drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty }; moved = false; }
    else if (ids.length === 2) {
      var a = pts[ids[0]], b = pts[ids[1]], r = view.getBoundingClientRect();
      drag = { pinch: Math.hypot(a.x - b.x, a.y - b.y), s: s, cx: (a.x + b.x) / 2 - r.left, cy: (a.y + b.y) / 2 - r.top, tx: tx, ty: ty };
    }
    view.classList.add('fm-grab');
  });
  view.addEventListener('pointermove', function (e) {
    if (!pts[e.pointerId]) return;
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(pts);
    if (drag && drag.pinch && ids.length >= 2) {
      var a = pts[ids[0]], b = pts[ids[1]], r = view.getBoundingClientRect(), d = Math.hypot(a.x - b.x, a.y - b.y);
      var ns = Math.max(minS, Math.min(maxS, drag.s * d / drag.pinch)), cx = (a.x + b.x) / 2 - r.left, cy = (a.y + b.y) / 2 - r.top;
      s = ns;
      tx = cx - (drag.cx - drag.tx) * ns / drag.s;
      ty = cy - (drag.cy - drag.ty) * ns / drag.s;
      moved = true;
      later();
    } else if (drag && !drag.pinch) {
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      tx = drag.tx + dx;
      ty = drag.ty + dy;
      later();
    }
  });
  function up(e) {
    if (!pts[e.pointerId]) return;
    delete pts[e.pointerId];
    var ids = Object.keys(pts);
    if (!ids.length) {
      view.classList.remove('fm-grab');
      if (!moved && drag && !drag.pinch) {
        var now = Date.now(), r = view.getBoundingClientRect();
        if (now - lastTap < 320) zoomAt(s * 2, e.clientX - r.left, e.clientY - r.top);
        else closePop();
        lastTap = now;
      }
      drag = null;
    } else if (ids.length === 1) { var p = pts[ids[0]]; drag = { x: p.x, y: p.y, tx: tx, ty: ty }; }
  }
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (t) { view.addEventListener(t, function (e) { e.preventDefault(); }, { passive: false }); });
  view.addEventListener('touchmove', function (e) { if (e.touches.length > 1 || drag) e.preventDefault(); }, { passive: false });
  view.addEventListener('touchstart', function (e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  view.addEventListener('pointerup', up);
  view.addEventListener('pointercancel', up);
  view.addEventListener('wheel', function (e) {
    e.preventDefault();
    var r = view.getBoundingClientRect();
    zoomAt(s * Math.pow(1.0011, -e.deltaY * (e.deltaMode === 1 ? 33 : 1)), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  view.addEventListener('keydown', function (e) {
    var step = 80, c = { x: view.clientWidth / 2, y: view.clientHeight / 2 };
    if (e.key === 'ArrowLeft') tx += step; else if (e.key === 'ArrowRight') tx -= step;
    else if (e.key === 'ArrowUp') ty += step; else if (e.key === 'ArrowDown') ty -= step;
    else if (e.key === '+' || e.key === '=') zoomAt(s * 1.4, c.x, c.y);
    else if (e.key === '-' || e.key === '_') zoomAt(s / 1.4, c.x, c.y);
    else if (e.key === 'Escape') closePop();
    else return;
    e.preventDefault();
    later();
  });
  root.querySelector('[data-z=in]').addEventListener('click', function () { zoomAt(s * 1.5, view.clientWidth / 2, view.clientHeight / 2); });
  root.querySelector('[data-z=out]').addEventListener('click', function () { zoomAt(s / 1.5, view.clientWidth / 2, view.clientHeight / 2); });
  root.querySelector('[data-z=fit]').addEventListener('click', function () { closePop(); reset(); });

  var legend = root.querySelector('.fm-legend');
  Object.keys(CATS).forEach(function (c) {
    var n = PINS.filter(function (p) { return p.cat === c; }).length;
    var lab = document.createElement('label');
    lab.className = 'fm-cat';
    lab.innerHTML = '<input type="checkbox"' + (on[c] ? ' checked' : '') + '><img src="' + BASE + 'i_' + CATS[c].icon + '.png' + VER + '" alt=""><span>' + CATS[c].name + '</span><b>' + n + '</b>';
    lab.querySelector('input').addEventListener('change', function (e) {
      on[c] = e.target.checked;
      try { localStorage.setItem('fm-cats', JSON.stringify(on)); } catch (x) {}
      draw();
    });
    legend.appendChild(lab);
  });
  var list = root.querySelector('.fm-list');
  PINS.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'fm-item';
    b.innerHTML = '<img src="' + BASE + 'i_' + p.icon + '.png' + VER + '" alt=""><span>' + (p.short || p.name) + '</span>';
    b.setAttribute('aria-label', 'Go to ' + p.name);
    b.addEventListener('click', function () {
      if (!on[p.cat]) { on[p.cat] = true; var cb = legend.querySelectorAll('input')[Object.keys(CATS).indexOf(p.cat)]; if (cb) cb.checked = true; }
      flyTo(p.x, p.y, Math.max(s, 0.45));
      openPop(i);
      if (window.matchMedia('(max-width: 900px)').matches) view.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    list.appendChild(b);
  });

  if (window.ResizeObserver) new ResizeObserver(function () { var f = fit(); var was = s <= minS * 1.001; minS = f; if (was || s < f) s = f; draw(); }).observe(view);
  reset();
  window.FM = { state: function () { return { s: s, tx: tx, ty: ty, tiles: Object.keys(loaded).length, open: openPin }; }, flyTo: flyTo, open: openPop };
})();
