(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.ovRowLoop = function (box, opts) {
    opts = opts || {};
    var fine = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    if (!box || !window.gsap || (!fine && !window.Draggable)) return;
    var g = window.gsap, SPEED = 22;
    if (window.Draggable) g.registerPlugin(window.Draggable);
    if (window.InertiaPlugin) g.registerPlugin(window.InertiaPlugin);
    var on = false, auto = !reduced, pos = 0, raf = 0, last = 0, seen = false, resizeT = 0;
    var items = [], extra = [], step = 0, total = 0, drag = null, proxy = document.createElement('div'), slide = { x: 0 };
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
      step = base[1].offsetLeft - base[0].offsetLeft;
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
    }
    function norm(v) { return ((v % total) + total) % total; }
    function render() {
      pos = norm(pos);
      var lo = -step;
      items.forEach(function (el, i) {
        var x = norm(i * step - pos - lo) + lo;
        el.style.translate = Math.round(x - i * step) + 'px 0';
      });
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
    function settle() {
      var target = nearest(Math.round(pos / step) * step);
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
      var base = nearest(Math.round(pos / step) * step), d = Math.max(14, Math.min(30, step * 0.09));
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
        snap: function (v) { return Math.round(v / step) * step; }
      })[0];
      if (auto) { last = 0; raf = requestAnimationFrame(tick); }
    }
    function teardown() {
      on = false;
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
      new IntersectionObserver(function (es) { seen = es[0].isIntersecting; last = 0; }, { threshold: 0.2 }).observe(box);
    } else seen = true;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(sync, 150);
    }, { passive: true });
    sync();
  };
})();
