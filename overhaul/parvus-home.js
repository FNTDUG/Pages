if (document.querySelector("[data-parvus-home]")) {
(function () {
  var host = document.querySelector("[data-parvus-home]");
  if (host) host.innerHTML = "<div class=\"parvus-home\" id=\"parvusHome\">\n  <div class=\"ph-layer ph-back\" aria-hidden=\"true\"></div>\n  <div class=\"ph-layer ph-front\" aria-hidden=\"true\"></div>\n  <div class=\"ph-typing\" aria-hidden=\"true\"></div>\n<div class=\"mascot\" id=\"mascot\">\n  <div class=\"mascot-disco-room\" id=\"mascotDiscoRoom\" aria-hidden=\"true\">\n    <div class=\"mascot-disco-travel\" id=\"mascotDisco\"><div class=\"mascot-disco-drop\"><div class=\"mascot-disco\"></div></div></div>\n  </div>\n  <div class=\"mascot-travel\" id=\"mascotTravel\">\n    <div class=\"mascot-bubble px-ink\" id=\"mascotBubble\" data-ink-manual aria-hidden=\"true\"><span class=\"mascot-bubble-text\"></span></div>\n    <div class=\"mascot-face\" id=\"mascotFace\">\n      <div class=\"mascot-bob\">\n        <div class=\"mascot-sprite\" id=\"mascotSprite\" role=\"img\" aria-label=\"FNTD mascot\">\n        <div class=\"mascot-body\" id=\"mascotBody\"></div>\n        <div class=\"mascot-body-low\" id=\"mascotBodyLow\"></div>\n        <div class=\"mascot-dance\" id=\"mascotDance\"></div>\n        <div class=\"mascot-eyes\" id=\"mascotEyes\"></div>\n        <div class=\"mascot-holo\" id=\"mascotHolo\"></div>\n        <div class=\"mascot-hat-lift\">\n          <div class=\"mascot-hat\" id=\"mascotHat\"></div>\n          <div class=\"mascot-hat\" id=\"mascotHatDrop\"></div>\n        </div>\n      </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"mascot-shade-travel\" id=\"mascotShade\"><div class=\"mascot-shade\"></div></div>\n</div>\n</div>";
})();

(function () {
  var U = 12;     /* one art pixel */
  var M = 7;      /* how many art pixels of room the puddle gets around the box */
  var T = 3;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the splat: the ink hits small, overshoots with droplets flying out, then settles.
     s = puddle size, drop = how far past their resting spot the droplets are (null = not out yet),
     wild = how splashy the edge is while it's still moving */
  var FRAMES = [
    { s: 0.18, drop: null, ms: 60 },
    { s: 0.6,  drop: -2,   ms: 60, wild: 1.8 },
    { s: 1.12, drop: 1,    ms: 70, wild: 1.6 },
    { s: 0.96, drop: 0.4,  ms: 70, wild: 1.2, tail: 1 },
    { s: 1,    drop: 0,    ms: 0, tail: 1 }
  ];
  var SETTLED = FRAMES[FRAMES.length - 1];

  function rng(seed) {             /* small seeded random, so each puddle keeps its shape */
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
    for (k = 0; k < 3; k++) ink.lobes.push({ a: r() * 6.283, size: 1 + r() * 1.2 });      /* big bulges */
    var count = 4 + Math.floor(r() * 3);
    for (k = 0; k < count; k++) ink.drops.push({ a: (k + r() * 0.7) / count * 6.283, gap: 1 + r() * 1.4, wide: r() < 0.35 });
  }

  function setup(el, i) {
    var seed = parseInt(el.getAttribute('data-seed'), 10);
    if (isNaN(seed)) seed = 1234 + i * 977;
    var cv = document.createElement('canvas');
    cv.className = 'px-ink-canvas';
    cv.setAttribute('aria-hidden', 'true');
    el.insertBefore(cv, el.firstChild);
    el._ink = { cv: cv, timer: null, w: 0, h: 0, ext: null };
    shape(el._ink, seed);
    draw(el, SETTLED);
  }

  function noise(ink, th) {
    var v = 0;
    ink.waves.forEach(function (w) { v += w.a * Math.sin(w.f * th + w.p); });
    ink.lobes.forEach(function (l) {
      var d = Math.atan2(Math.sin(th - l.a), Math.cos(th - l.a));   /* angle between, -pi..pi */
      v += l.size * Math.exp(-d * d / 0.08);
    });
    return v;
  }

  function draw(el, f) {
    var ink = el._ink, W = el.offsetWidth, H = el.offsetHeight;
    ink.w = W; ink.h = H;
    var cols = Math.ceil(W / U) + 2 * (M + T), rows = Math.ceil(H / U) + 2 * (M + T);
    var cv = ink.cv;
    cv.width = cols * U; cv.height = rows * U;
    cv.style.width = cols * U + 'px'; cv.style.height = rows * U + 'px';
    var ox = -Math.round((cols * U - W) / 2), oy = -Math.round((rows * U - H) / 2);
    cv.style.left = ox + 'px';
    cv.style.top = oy + 'px';
    ink.ox = ox; ink.oy = oy;

    var hwF = W / U / 2, hhF = H / U / 2;          /* the box, in art pixels */
    var hw = hwF * f.s, hh = hhF * f.s, cx = cols / 2, cy = rows / 2;
    var inside = new Uint8Array(cols * rows), c, r;
    function at(c, r) { return c >= 0 && r >= 0 && c < cols && r < rows && inside[r * cols + c]; }

    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        var px = c + 0.5 - cx, py = r + 0.5 - cy;
        /* distance to a rounded box around the text, so the corners come out round like a puddle */
        var R = Math.min(hw, hh, 3.5);
        var dx = Math.max(Math.abs(px) - (hw - R), 0), dy = Math.max(Math.abs(py) - (hh - R), 0);
        var th = Math.atan2(py / (hhF + 1), px / (hwF + 1));
        var rad = Math.max(0.5, 1.4 + noise(ink, th) * (f.wild || 1)) * Math.min(1, f.s);
        if (Math.hypot(dx, dy) - R <= rad) inside[r * cols + c] = 1;
      }
    }
    if (f === SETTLED) { ink.pud = inside.slice(); ink.pc = cols; ink.pr = rows; }
    if (f.drop !== null) {
      var puddle = inside.slice();
      ink.drops.forEach(function (d) {
        /* walk out from the middle until we leave the puddle, then hop past it */
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
        l: -(ox + x.c0 * U - 3), t: -(oy + x.r0 * U - 3),
        r: ox + (x.c1 + 1) * U + 3 - W, b: oy + (x.r1 + 1) * U + 3 - H
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
    /* white outline: every ink pixel paints a slightly bigger white square first */
    ctx.fillStyle = col('--px-ink-outline');
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) if (at(c, r)) ctx.fillRect(c * U - 3, r * U - 3, U + 6, U + 6);
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
          if ((upEdge && pxr < -hw * 0.25 && pyr < 0) || (leftEdge && pyr < -hh * 0.2 && pxr < 0)) color = col('--px-ink-shine');   /* wet shine, top-left only */
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
    var vert = a.dir === 'b' || a.dir === 't';
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
    var q = tipAt(ink, { dir: dir, at: at });
    if (q === null) return 0;
    if (dir === 'b') return ink.oy + (q + 1) * U + 3 - ink.h;
    if (dir === 't') return -(ink.oy + q * U - 3);
    if (dir === 'r') return ink.ox + (q + 1) * U + 3 - ink.w;
    return -(ink.ox + q * U - 3);
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
      if (i === 3) el.classList.remove('is-splashing');   /* text shows as the ink settles */
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

  var boxes = Array.prototype.slice.call(document.querySelectorAll('.px-ink'));
  boxes.forEach(setup);

  /* redraw when the text changes the box size */
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target, ink = el._ink;
        if (!ink || ink.timer) return;
        if (el.offsetWidth !== ink.w || el.offsetHeight !== ink.h) draw(el, SETTLED);
      });
    });
    boxes.forEach(function (el) { ro.observe(el); });
  }

  /* splat once when each box first scrolls into view */
  var auto = boxes.filter(function (el) { return !el.hasAttribute('data-ink-manual'); });
  auto.forEach(function (el) { el.classList.add('is-splashing'); });
  if (window.IntersectionObserver) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); splash(e.target); }
      });
    }, { threshold: 0.4 });
    auto.forEach(function (el) { io.observe(el); });
  } else auto.forEach(function (el) { splash(el); });

  window.pxInk = {
    splash: splash,
    unsplash: unsplash,
    tip: tipSpill,
    point: function (el, dir, at) {
      var ink = el._ink;
      if (!ink) return;
      var a = { dir: dir, at: at };
      var ln = lane(ink, a, Math.round(ink.cv.width / U), Math.round(ink.cv.height / U), ink.w, ink.h);
      if (ink.arrow && ink.arrow.dir === dir && ink.arrow.ln === ln) return;
      a.ln = ln;
      ink.arrow = a;
      if (!ink.timer) { ink.quiet = true; draw(el, SETTLED); ink.quiet = false; }
    },
    redraw: function (el) { draw(el, SETTLED); },
    reshape: function (el) {
      if (!el._ink) return;
      shape(el._ink, Math.floor(Math.random() * 2147483647));
      el._ink.quiet = true; draw(el, SETTLED); el._ink.quiet = false;
    },
    reach: (M + T) * U + 3
  };
})();


(function () {
  var root = document.getElementById('mascot');
  var sprite = document.getElementById('mascotSprite');
  var travel = document.getElementById('mascotTravel');
  var face = document.getElementById('mascotFace');
  var shade = document.getElementById('mascotShade');
  var disco = document.getElementById('mascotDisco');
  var discoRoom = document.getElementById('mascotDiscoRoom');
  var bubble = document.getElementById('mascotBubble');
  var bubbleText = bubble && (bubble.querySelector('.mascot-bubble-text') || bubble);
  if (bubble) bubble.addEventListener('inkdraw', function () { nudge(); });
  if (!root || !sprite || !travel || !face) return;

  /* every timing is in milliseconds */
  var CFG = {
    hat:          '',     /* the hat he starts in: '', 'buildersclub', 'party' or 'pith' */
    partyHat: 'party',
    hatFallMs:      760,  /* how long a hat takes to tumble off and vanish */
    /* how each hat sits on him, in art pixels. lift raises it, nudge shifts it
       sideways, scale grows it from the brim. tune these in hat-fitting.html. */
    hatFit: {
      buildersclub: { lift: 21, nudge: -14, scale: 1.2 },
      party:        { lift: 42, nudge: -1, scale: 1.33 },
      pith:         { lift: 25, nudge: 0, scale: 1.12 }
    },
    idleFrameMs:   90,    /* how long the idle state lingers, not the breathing */
    breathMs:    2600,    /* one full breath in and back out again */
    breathEase:   0.35,   /* 0 gives every frame the same length, 1 lingers hard at each end */
    moveFrames:     1,    /* frames on the moving row, raise this when you draw more */
    moveFrameMs:  130,    /* how fast the moving animation plays */
    restMin:     1800,    /* shortest pause between actions */
    restMax:     4500,    /* longest pause between actions */
    glanceMs:     850,    /* how long he looks ahead before setting off */
    blinkMs:      130,    /* how long the eyes stay shut */
    blinkMin:    3500,    /* shortest gap between blinks */
    blinkMax:    8000,    /* longest gap between blinks */
    moveMinMs:   1200,    /* shortest drift */
    moveMaxMs:   8000,    /* longest drift */
    moveSpeed:  0.035,    /* pixels per millisecond while drifting */
    chanceIdle:  0.35,    /* how often the idle animation plays */
    chanceGlance: 0.25,   /* how often it looks left then right on its own */
    chanceTurn:  0.15,    /* how often it turns to face the other way */
    turnMs:       450,    /* how long the turn takes before it settles */
    followCursor: true,   /* eyes track the pointer when it is nearby */
    cursorIdleMs:2500,    /* after this long without the pointer it stops following */
    deadZone:      40,    /* pointer inside this many pixels counts as straight ahead */
    deadZoneHold: 0.6,    /* once looking a way, the pointer has to come this much closer to centre before the eyes come back */
    trackLag:     170,    /* the pointer has to settle this long in a new direction before the eyes follow */
    trackRadius:  340,    /* he only notices the pointer within this many pixels */
    frenzySpeed:  1.4,    /* pointer pixels per millisecond that counts as frantic */
    frenzyHoldMs:800,    /* how long the waving keeps up before he is pleased */
    clicksFor:     10,    /* clicks on him that make him cross */
    clickWindow: 5000,    /* the clicks have to land inside this long */
    tellMs:      1000,    /* how long the plain squint or smile shows first */
    moodMs:      5000,    /* how long the mood lasts, ignoring the pointer */
    readyMs:     1100,    /* he looks where he is going this long before setting off */
    sound:       true,    /* his voice and the text box, off makes him silent */
    volume:      0.65,    /* how loud he is, 0 to 1 */
    chatMin:     9000,    /* shortest gap between things he says */
    chatMax:    20000,    /* longest gap between things he says */
    chatMs:      4200,    /* how long the text box stays up, 0 stops him talking */
    linesUrl:      '',    /* optional json pool to load over the built-in one */
    deepScroll:   0.55,   /* how far down the page counts as "been scrolling" */
    dwellMs:     45000,   /* this long on one page counts as settled in */
    quietMs:     25000,   /* this long without the pointer counts as gone quiet */
    pokeMin:         2,   /* clicks in the window before he mentions it */
    pokeReplyMs:     1,   /* how soon he answers back after being poked */
    dashMs:        520,   /* how long he bolts for once he has had enough */
    dashSpeed:    0.42,   /* pixels per millisecond while bolting */
    faceDeadZone:   24,   /* pointer nearer his middle than this will not turn him */
    settleSpeed:  0.11,
    chanceRainbow: 100,
    rainbowMinMs:  6000,
    rainbowMaxMs: 10000,
    rainbowGapMs: 45000,
    rainbowFrameMs:  80,
    danceFrameMs:    90,
    chanceScreen:  1000,
    screenMinMs:   4000,
    screenMaxMs:   8000,
    screenGapMs:  30000,
    screenLookMin:  350,
    screenLookMax:  900,
    chanceWiggle:     1,
    chanceWiggleRest: 0.3,
    wiggleGapMs:   5000
  };

  /* what he can say, grouped by what is going on. edit freely: a bucket with no
     lines is simply skipped, and every bucket falls back to 'idle' */
  var LINES = {
      "idle": [
          "hi.",
          "i live here now.",
          "still here.",
          "i saw that.",
          "what are we looking at",
          "nice cursor.",
          "do not mind me.",
          "i am not going anywhere.",
          "this is my spot.",
          "go on then.",
          "take your time.",
          "zzz",
          "you are still reading this.",
          "somebody has to float here."
      ],
      "unit": [
          "{unit}? bold choice.",
          "you have been staring at {unit} for a while.",
          "{unit}. sure.",
          "i have seen better than {unit}. not many.",
          "everyone looks up {unit} eventually.",
          "{unit} is fine. fine is a word.",
          "reading {unit} twice will not change it.",
          "{unit} again?",
          "you already know what {unit} does.",
          "still {unit}."
      ],
      "tierlist": [
          "someone is always wrong about this list.",
          "you disagree with it. everyone does.",
          "the list does not care how you feel.",
          "scrolling until you find the one you like.",
          "ah. tier list opinions."
      ],
      "trade": [
          "do not accept that.",
          "that is a bad deal and you know it.",
          "count it again.",
          "they are lowballing you.",
          "the calculator does not lie. you might.",
          "walk away from that one."
      ],
      "clanwars": [
          "six slots. no more.",
          "you are overthinking the last slot.",
          "that team will not survive the restriction.",
          "banned element again?",
          "just bring the boss killer."
      ],
      "scrolling": [
          "you have been scrolling a while.",
          "that is a lot of scrolling.",
          "still going, then.",
          "the bottom is closer than you think.",
          "you passed the part you needed.",
          "{minutes} minutes on this page."
      ],
      "returning": [
          "{pages} pages. you are committed.",
          "you keep coming back.",
          "that is {pages} pages now.",
          "you could just bookmark it.",
          "a whole tour, this."
      ],
      "poked": [
          "stop that.",
          "i felt that.",
          "do not click me so much.",
          "i am not a button.",
          "keep going and see what happens."
      ],
      "quiet": [
          "are you still there?",
          "hello?",
          "you have not moved in a while.",
          "i will wait.",
          "take your time. i float."
      ]
  };

  /* the page tells him what it is showing rather than him digging through its
     markup. window.mascotContext can be an object or a function returning one,
     and whatever it gives wins over the guesses below. */
  function guess(fn) { try { return fn() || null; } catch (e) { return null; } }
  var startedAt = Date.now();
  var VISITS = (function () {
    try {
      var n = (parseInt(sessionStorage.getItem('mascot:pages'), 10) || 0) + 1;
      sessionStorage.setItem('mascot:pages', String(n));
      return n;
    } catch (e) { return 1; }
  })();
  var PAGE_OF = [
    [/tier ?list/i, 'tierlist'],
    [/trade/i, 'trade'],
    [/clan-?wars/i, 'clanwars'],
    [/unit-?engine/i, 'unit'],
    [/patch-?notes|news/i, 'news']
  ];
  function context() {
    var extra = window.mascotContext;
    if (typeof extra === 'function') extra = guess(extra);
    extra = extra || {};
    var path = location.pathname + ' ' + (document.title || '');
    var page = null;
    for (var i = 0; i < PAGE_OF.length; i++) if (PAGE_OF[i][0].test(path)) { page = PAGE_OF[i][1]; break; }
    var doc = document.documentElement;
    var room = Math.max(1, doc.scrollHeight - doc.clientHeight);
    var ctx = {
      page: page,
      /* only the engine's own heading, and only when it is really showing one */
      unit: guess(function () {
        var h = document.querySelector('#result .uhp-title');
        return h && h.textContent.trim().length < 48 ? h.textContent.trim() : null;
      }),
      scrolled: Math.min(1, (window.scrollY || doc.scrollTop || 0) / room),
      minutes: Math.floor((Date.now() - startedAt) / 60000),
      pages: VISITS,
      pokes: (function () {
        /* only the recent ones: the array is trimmed on a click, so without
           this a poke from minutes ago would still be worth a remark */
        var n = performance.now(), k = 0;
        for (var j = 0; j < clicks.length; j++) if (n - clicks[j] <= CFG.clickWindow) k++;
        return k;
      })(),
      quiet: performance.now() - (pointerAt || 0)
    };
    for (var k in extra) if (extra[k] !== null && extra[k] !== undefined) ctx[k] = extra[k];
    return ctx;
  }

  /* first match wins, so the specific ones come before the vague ones. weight
     is how often a rule gets picked when several match at once. */
  var RULES = [
    { bucket: 'unit',      weight: 5, when: function (c) { return !!c.unit; } },
    { bucket: 'poked',     weight: 4, when: function (c) { return c.pokes >= CFG.pokeMin; } },
    { bucket: 'quiet',     weight: 3, when: function (c) { return pointerAt && c.quiet > CFG.quietMs; } },
    { bucket: 'scrolling', weight: 3, when: function (c) { return c.scrolled > CFG.deepScroll; } },
    { bucket: 'returning', weight: 2, when: function (c) { return c.pages >= 3; } },
    { bucket: 'tierlist',  weight: 4, when: function (c) { return c.page === 'tierlist'; } },
    { bucket: 'trade',     weight: 4, when: function (c) { return c.page === 'trade'; } },
    { bucket: 'clanwars',  weight: 4, when: function (c) { return c.page === 'clanwars'; } },
    { bucket: 'rotations', weight: 3, when: function (c) { return !!c.rotations; } },
    { bucket: 'news',      weight: 4, when: function (c) { return c.page === 'news'; } },
    { bucket: 'idle',      weight: 2, when: function () { return true; } }
  ];

  function fill(line, c) {
    return line.replace(/\{(\w+)\}/g, function (whole, key) {
      return c[key] === null || c[key] === undefined ? whole : String(c[key]);
    });
  }
  /* a line still holding an unfilled {slot} is not usable with this context */
  function usable(line, c) { return fill(line, c).indexOf('{') === -1; }

  var recent = [];
  /* set when something specific prompted him, so that one answer comes from the
     bucket that fits rather than whatever the weights land on */
  var forced = '';
  function pickLine() {
    var c = context();
    var open = [], total = 0, i;
    if (forced) {
      var only = (LINES[forced] || []).filter(function (l) { return usable(l, c); });
      forced = '';
      if (only.length) {
        var pickf = only.filter(function (l) { return recent.indexOf(l) === -1; });
        var lf = (pickf.length ? pickf : only)[Math.floor(Math.random() * (pickf.length ? pickf.length : only.length))];
        recent.push(lf);
        while (recent.length > 8) recent.shift();
        return fill(lf, c);
      }
    }
    for (i = 0; i < RULES.length; i++) {
      var r = RULES[i], pool = LINES[r.bucket];
      if (!pool || !pool.length || !guess(function () { return r.when(c); })) continue;
      var fit = pool.filter(function (l) { return usable(l, c); });
      if (!fit.length) continue;
      open.push({ lines: fit, weight: r.weight });
      total += r.weight;
    }
    if (!open.length) return null;
    var roll = Math.random() * total, chosen = open[open.length - 1];
    for (i = 0; i < open.length; i++) { roll -= open[i].weight; if (roll <= 0) { chosen = open[i]; break; } }
    /* skip anything said lately, unless that would leave him nothing */
    var fresh = chosen.lines.filter(function (l) { return recent.indexOf(l) === -1; });
    var from = fresh.length ? fresh : chosen.lines;
    var line = from[Math.floor(Math.random() * from.length)];
    recent.push(line);
    while (recent.length > 8) recent.shift();
    return fill(line, c);
  }

  if (CFG.linesUrl) {
    fetch(CFG.linesUrl, { cache: 'default' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.buckets) for (var k in j.buckets) LINES[k] = j.buckets[k]; })
      .catch(function () {});
  }

  var SND = {
    text:  'https://sounds.fntduserguide.com/textsound1.m4a',
    close: 'https://sounds.fntduserguide.com/window-move.m4a',
    happy: ['https://sounds.fntduserguide.com/parvus-happy1.m4a',
            'https://sounds.fntduserguide.com/parvus-happy2.m4a'],
    angry: ['https://sounds.fntduserguide.com/parvus-Angry1.m4a',
            'https://sounds.fntduserguide.com/parvus-Angry2.m4a',
            'https://sounds.fntduserguide.com/parvus-Agnry3.m4a'],
    /* the moment his colour leaves the base one, and the moment it comes back */
    colourOn:  'https://sounds.fntduserguide.com/parvus-color-sound1.m4a',
    colourOff: 'https://sounds.fntduserguide.com/parvus-color-sound2.m4a',
    dash:      'https://sounds.fntduserguide.com/parvus-dash.m4a',
    hat:       'https://sounds.fntduserguide.com/parvus-hat.m4a'
  };

  var clips = {};
  [SND.text, SND.close, SND.colourOn, SND.colourOff, SND.dash, SND.hat].concat(SND.happy, SND.angry).forEach(function (url) {
    var a = new Audio();
    a.preload = 'auto';
    a.src = url;
    clips[url] = a;
  });
  /* Browsers want a clip's first play to happen inside a real gesture, and he
     speaks from the animation loop rather than from a click. So on the first
     interaction every clip is played muted and stopped again, which leaves them
     all unlocked for later. Without this only the angry sound, the one that does
     fire straight from a click, would ever be heard. */
  function prime(a) {
    if (a.primed) return;
    try {
      /* played for real, not muted: a muted play is allowed everywhere and so
         unlocks nothing. volume 0 keeps it silent instead. */
      a.volume = 0;
      var settle = function (ok) {
        try { a.pause(); a.currentTime = 0; } catch (e) {}
        a.volume = CFG.volume;
        if (ok) a.primed = true;
      };
      var r = a.play();
      if (r && r.then) r.then(function () { settle(true); }, function () { settle(false); });
      else settle(true);
    } catch (e) { a.volume = CFG.volume; }
  }
  /* older iOS only frees one clip per gesture, so the stragglers get another go
     on the next one rather than being written off after the first */
  function unlock() { for (var url in clips) prime(clips[url]); }
  /* capture, so this runs before the click handlers that want to make a noise */
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) {
    window.addEventListener(t, unlock, { capture: true, passive: true });
  });
  function play(what) {
    if (!CFG.sound) return;
    var url = what.length && typeof what !== 'string' ? what[Math.floor(Math.random() * what.length)] : what;
    var a = clips[url];
    if (!a) return;
    a.volume = CFG.volume;
    /* no gesture check of our own: the browser is the one that decides, and it
       lets a site the visitor uses often play straight away. a refusal just
       rejects, which is nothing to worry about. */
    try { a.currentTime = 0; var r = a.play(); if (r && r.catch) r.catch(function () {}); } catch (e) {}
  }

  /* row 0 holds the bodies and the hats, row 1 the eyes, so any body can wear
     any eyes and any hat. the breathing is done in css now, so each colour is a
     single frame rather than a run. */
  var BODY = { idle: 0, idleAngry: 1, idleHappy: 2, idleSad: 3, idleAdv: 4, idleDark: 5,
               move: 6, dash: 7, moveAdv: 8, moveHappy: 9, moveAngry: 10, moveSad: 11,
               rainbow: 'rainbow' };
  var RAINBOW = { frames: 21, rainbow: 2 };
  var WIGGLE = { rows: 5, top: 96, h: 126,
                 ms: [70, 70, 60, 70, 70, 240, 70, 70, 60, 70, 70, 100, 70, 70, 240, 70, 70, 60, 70, 70, 240, 70, 70, 60, 70, 70] };
  WIGGLE.total = WIGGLE.ms.reduce(function (a, b) { return a + b; }, 0);
  var HAT  = { buildersclub: 12, party: 14, pith: 15 };
  var HAT_BOX = { buildersclub: [0, 88], party: [0, 83], pith: [0, 80] };
  var EYE  = { base: 0, squint: 1, angry: 4, blinkC: 6, blinkR: 7, blinkL: 8, think: 13, pleased: 19 };
  var LOOK = [12, 14, 13, 15, 17, 16, 11, 18, 10];
  var body = document.getElementById('mascotBody');
  var bodyLow = document.getElementById('mascotBodyLow');
  var hatEl = document.getElementById('mascotHat');
  var hatDrop = document.getElementById('mascotHatDrop');
  var eyesEl = document.getElementById('mascotEyes');
  var danceEl = document.getElementById('mascotDance');
  var hatLift = sprite.querySelector('.mascot-hat-lift');
  var HOLO = { open: [60, 50, 60, 50, 70, 60, 80], idle: [650, 650, 650, 650, 650, 650, 650, 650], close: [60, 60, 50, 60, 50, 120] };
  HOLO.openT = HOLO.open.reduce(function (a, b) { return a + b; }, 0);
  HOLO.closeT = HOLO.close.reduce(function (a, b) { return a + b; }, 0);
  var holoEl = document.getElementById('mascotHolo');
  var DANCE = { frames: 24, hop: 12, head: [[12, 0], [0, 0], [-12, 0], [0, 0], [0, -12], [0, 0], [0, -12], [0, 0]] };
  /* the eyes row: nine looks in a 3x3 grid, then three blinks drawn for
     pupils centre, right and left, so the lids land where the eyes were */
  function eyeCol(dx, dy) { return LOOK[(dy + 1) * 3 + (dx + 1)]; }
  var SQUINT = EYE.squint;
  function blinkCol(dx) { return dx === 0 ? EYE.blinkC : (dx > 0 ? EYE.blinkR : EYE.blinkL); }
  var COL = { centre: eyeCol(0,0), lookLeft: eyeCol(-1,0), lookRight: eyeCol(1,0) };

  var roamLeft = 90, roamRight = 90;
  var size = 0, cell = 0, roam = 90, roamY = 60, roamUp = 60, roamDown = 60, bobRise = 0, edgeFit = false;
  function measure() {
    var cs = getComputedStyle(sprite);
    size = parseFloat(cs.width) || 160;
    cell = parseFloat(cs.height) || 179;
    roam = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam')) || 90;
    var left = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam-left'));
    var right = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam-right'));
    roamLeft = isNaN(left) ? roam : Math.max(0, left);
    roamRight = isNaN(right) ? roam : Math.max(0, right);
    roamY = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam-y')) || 60;
    var up = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam-up'));
    var down = parseFloat(getComputedStyle(root).getPropertyValue('--m-roam-down'));
    edgeFit = !isNaN(up) && !isNaN(down);
    roamUp = edgeFit ? up : roamY;
    roamDown = edgeFit ? down : roamY;
    bobRise = parseFloat(getComputedStyle(root).getPropertyValue('--m-rise')) || 0;
    /* the sheet is as wide as the frames demand, so the css can never drift from it */
    root.style.setProperty('--m-cols', String(Math.max(HAT.pith + 1, RAINBOW.frames)));
  }
  measure();
  window.addEventListener('resize', measure, { passive: true });

  var wiggleAt = 0, wiggleEnd = -Infinity;
  function wiggleFrame(bodyCol) {
    if (!wiggleAt || (state !== 'idle' && state !== 'rest') || typeof bodyCol !== 'number' || bodyCol >= WIGGLE.rows) return -1;
    var t = performance.now() - wiggleAt;
    if (t >= WIGGLE.total) { wiggleAt = 0; wiggleEnd = performance.now(); return -1; }
    for (var i = 0; i < WIGGLE.ms.length; i++) { t -= WIGGLE.ms[i]; if (t < 0) return i; }
    return -1;
  }
  function wiggleReady(now) { return !inRainbow(now) && now - wiggleEnd > CFG.wiggleGapMs; }
  function startIdle(now) {
    state = 'idle'; started = now;
    until = now + 8 * CFG.idleFrameMs;
    wiggleAt = 0;
    if (wiggleReady(now) && Math.random() < CFG.chanceWiggle) {
      wiggleAt = now;
      until = Math.max(until, now + WIGGLE.total);
    }
  }
  function show(bodyCol, eyeCol) {
    var bodyRow = 0, rainbowBody = bodyCol === BODY.rainbow;
    if (typeof bodyCol === 'string') {
      bodyRow = RAINBOW[bodyCol];
      bodyCol = Math.floor(performance.now() / CFG.rainbowFrameMs) % RAINBOW.frames;
    }
    var at = (-bodyCol * size) + 'px ' + (-bodyRow * cell) + 'px';
    body.style.backgroundPosition = at;
    var wf = wiggleFrame(bodyCol);
    bodyLow.classList.toggle('wiggle', wf >= 0);
    bodyLow.style.backgroundPosition = wf < 0 ? at :
      (-wf * size) + 'px ' + ((WIGGLE.top - bodyCol * WIGGLE.h) / 222 * cell) + 'px';
    var dancing = rainbowBody && CFG.danceFrameMs > 0 && !!danceEl && danceFrom > 0 && performance.now() >= danceFrom;
    var shift = '';
    if (dancing) {
      var df = Math.floor((performance.now() - danceFrom) / CFG.danceFrameMs) % DANCE.frames;
      var head = DANCE.head[Math.floor(df / 3)];
      danceEl.style.backgroundPosition = (-df * size) + 'px 0px';
      shift = 'translate(' + (head[0] * cell / 222).toFixed(2) + 'px,' + (head[1] * cell / 222).toFixed(2) + 'px)';
      eyeCol = EYE.pleased;
    }
    sprite.classList.toggle('dancing', dancing);
    eyesEl.style.transform = shift;
    if (hatLift) hatLift.style.transform = shift;
    var hf = state === 'screen' ? holoFrame(performance.now()) : -1;
    if (holoEl) {
      holoEl.classList.toggle('on', hf >= 0);
      if (hf >= 0) holoEl.style.backgroundPosition = (hf / 20 * 100).toFixed(3) + '% 0';
    }
    eyesEl.style.backgroundPosition = (-eyeCol * size) + 'px ' + (-cell) + 'px';
  }
  /* the hat he is actually wearing */
  var wearing = '';
  var fallTimer = 0, putOnTimer = 0;
  function fitOf(name) {
    var f = (CFG.hatFit && CFG.hatFit[name]) || {};
    return { lift: f.lift || 0, nudge: f.nudge || 0, scale: f.scale || 1 };
  }
  function dress(el, name) {
    var f = fitOf(name), art = cell / 222;      /* one art pixel on screen */
    el.style.backgroundPosition = (-HAT[name] * size) + 'px 0px';
    el.style.transformOrigin = '50% ' + (HAT_BOX[name][1] / 222 * 100).toFixed(2) + '%';
    el.style.setProperty('--m-fit', 'translate(' + (f.nudge * art).toFixed(2) + 'px,' +
      (-f.lift * art).toFixed(2) + 'px) scale(' + f.scale + ')');
  }
  /* How far a hat reaches above the sprite. It is drawn from row 0 of its cell
     and then scaled about its base and lifted, so the top ends up outside the
     box: the text box has to clear that rather than the top of his head. */
  function hatRise(name) {
    if (!name) return 0;
    var f = fitOf(name), top = HAT_BOX[name][0], brim = HAT_BOX[name][1];
    return Math.max(0, f.lift - brim + (brim - top) * f.scale) / 222 * cell;
  }
  var discoDrop = 0;
  function discoClear() {
    var rs = getComputedStyle(root);
    var rise = hatRise(wearing);
    if (inRainbow(performance.now()) && CFG.partyHat) {
      rise = Math.max(rise, hatRise(CFG.partyHat) + (CFG.danceFrameMs > 0 ? DANCE.hop * cell / 222 : 0));
    }
    var clear = parseFloat(rs.paddingTop) - rise - (parseFloat(rs.getPropertyValue('--m-rise')) || 0) - 6;
    var need = (disco ? disco.offsetWidth : 0) + 8;
    discoDrop = inRainbow(performance.now()) ? Math.max(0, need - clear) : 0;
    if (discoDrop) clear = need;
    root.style.setProperty('--m-disco-clear', Math.max(0, clear).toFixed(1) + 'px');
  }
  function put(name) {
    wearing = name || '';
    root.style.setProperty('--m-bubble-rise', hatRise(wearing).toFixed(1) + 'px');
    discoClear();
    if (!wearing) { hatEl.classList.remove('on'); return; }
    dress(hatEl, wearing);
    hatEl.classList.add('on');
  }
  /* Any change of hat drops the one he is in first, swapping included: the old
     one tumbles off on its own layer while the new one waits. */
  function wear(name) {
    name = name || '';
    if (name === wearing) return;
    var had = wearing;
    if (putOnTimer) { clearTimeout(putOnTimer); putOnTimer = 0; }
    if (fallTimer) { clearTimeout(fallTimer); fallTimer = 0; }
    hatDrop.classList.remove('falling');
    if (!had) { put(name); return; }        /* bare head, so nothing to drop */
    dress(hatDrop, had);
    put('');                                /* off his head straight away */
    void hatDrop.offsetWidth;               /* restart the animation cleanly */
    hatDrop.classList.add('falling');
    play(SND.hat);                          /* it comes off with a sound of its own */
    fallTimer = setTimeout(function () {
      hatDrop.classList.remove('falling');
      fallTimer = 0;
    }, CFG.hatFallMs);
    if (name) putOnTimer = setTimeout(function () { put(name); putOnTimer = 0; }, CFG.hatFallMs);
  }

  function bodyFor(moving, now) {
    if (now === undefined) now = performance.now();
    if (inMood(performance.now())) {
      if (mood === 'angry') return moving ? BODY.moveAngry : BODY.idleAngry;
      return moving ? BODY.moveHappy : BODY.idleHappy;
    }
    if (lit(performance.now())) return BODY.rainbow;
    return moving ? BODY.move : BODY.idle;
  }
  function plainBody() {
    return lit(performance.now()) ? BODY.rainbow : BODY.idle;
  }
  var rainbowUntil = -Infinity;
  function inRainbow(now) { return now < rainbowUntil; }
  function lit(now) { return inRainbow(now) && landedAt > 0; }
  var holoAt = 0, holoCloseAt = 0, holoEnded = -Infinity, holoLookAt = 0, holoDx = 0, holoDy = 0;
  function holoFrame(now) {
    var t = now - holoAt, i, a;
    if (t < HOLO.openT) { for (i = 0, a = 0; i < HOLO.open.length; i++) { a += HOLO.open[i]; if (t < a) return i; } }
    if (now < holoCloseAt) {
      var loop = HOLO.idle.length * HOLO.idle[0];
      return HOLO.open.length + Math.floor(((now - holoAt - HOLO.openT) % loop) / HOLO.idle[0]);
    }
    t = now - holoCloseAt;
    for (i = 0, a = 0; i < HOLO.close.length; i++) { a += HOLO.close[i]; if (t < a) return HOLO.open.length + HOLO.idle.length + i; }
    return -1;
  }
  function screenReady(now) {
    return !thinking && !inMood(now) && !inRainbow(now) && now - holoEnded > CFG.screenGapMs;
  }
  function startScreen(now) {
    state = 'screen'; started = now; wiggleAt = 0;
    holoAt = now; holoCloseAt = now + HOLO.openT + rand(CFG.screenMinMs, CFG.screenMaxMs);
    until = holoCloseAt + HOLO.closeT;
    holoLookAt = 0;
  }
  function rainbowReady(now) {
    return !inMood(now) && !inRainbow(now) && now - rainbowUntil > CFG.rainbowGapMs;
  }
  var rainbowFrom = 0, danceFrom = 0, landedAt = 0;
  function startRainbow(now) {
    rainbowFrom = now; rainbowUntil = now + rand(CFG.rainbowMinMs, CFG.rainbowMaxMs);
    if (!discoRoom) { landedAt = now; danceFrom = now; wear(hatNow()); }
  }
  function stopRainbow(now) { if (inRainbow(now)) rainbowUntil = now; }
  function hatNow() {
    if (lit(performance.now()) && CFG.partyHat) return CFG.partyHat;
    return baseHat;
  }
  function rand(a, b) { return a + Math.random() * (b - a); }

  var state = 'rest';
  var started = 0, until = 0, x = 0, y = 0, dir = 1, facing = 1;
  var dashX = 0, dashY = 0;            /* the way he is bolting, as a unit vector */
  var blinkAt = 0, blinkEnd = 0;
  var pointerX = 0, pointerY = 0, pointerAt = 0;
  var frenzy = 0, frenzyFor = 0;
  var moodUntil = 0, mood = '';        /* 'angry' after a poking, 'happy' after waving */
  var dashUntil = 0;                   /* he is bolting away from the pointer until this */
  /* which side the pointer is on, 1 for his right. the dead zone stops him
     flipping back and forth when it sits almost dead centre */
  function towardPointer() {
    var r = sprite.getBoundingClientRect();
    var ex = pointerX - (r.left + r.width / 2);
    return Math.abs(ex) < CFG.faceDeadZone ? facing : (ex > 0 ? 1 : -1);
  }
  function faceThePointer() {
    var way = towardPointer();
    if (way !== facing) look(way);
  }
  var clicks = [];
  function inMood(now) { return now < moodUntil; }
  /* in a mood the eyes are the squint or the smile, and blinking still works */
  function moodEyes(shut) {
    if (shut) return blinkCol(0);
    return mood === 'angry' ? EYE.angry : EYE.pleased;
  }
  function startMood(now, kind) {
    if (thinking) return;
    mood = kind; state = 'tell'; started = now; until = now + CFG.tellMs;
    frenzyFor = 0; frenzy = 0; clicks.length = 0;
    stopRainbow(now);
    wear(hatNow());
    hush(now, true);            /* he stops talking the moment his mood turns */
    play(kind === 'angry' ? SND.angry : SND.happy);
    /* having had enough, he bolts the opposite way from the pointer while
       keeping his eye on it, so he backs off rather than turning tail */
    if (kind === 'angry' && CFG.dashMs > 0) {
      var r = sprite.getBoundingClientRect();
      var ex = pointerX - (r.left + r.width / 2);
      var ey = pointerY - (r.top + r.height / 2);
      var len = Math.sqrt(ex * ex + ey * ey);
      /* straight down the middle of him, so there is no away to speak of */
      if (len < 1) { ex = (Math.random() < 0.5 ? -1 : 1); ey = 0; len = 1; }
      var ax = -ex / len, ay = -ey / len;
      /* already against a wall on an axis, so he takes that one the other way */
      if ((ax > 0 && x >= xMax()) || (ax < 0 && x <= xMin())) ax = -ax;
      if ((ay > 0 && y >= yBottom()) || (ay < 0 && y <= yTop())) ay = -ay;
      dashX = ax; dashY = ay;
      dir = ax >= 0 ? 1 : -1;
      faceThePointer();
      dashUntil = now + CFG.dashMs;
      play(SND.dash);
    }
  }

  /* the text box */
  var chatAt = 0, chatEnd = 0;
  function inkSpill() { return (bubble._ink && bubble._ink.ext) || { l: 0, t: 0, r: 0, b: 0 }; }
  function inkTip(dir, at) { return window.pxInk && window.pxInk.tip ? window.pxInk.tip(bubble, dir, at) : 0; }
  function point(dir, at) { if (window.pxInk && window.pxInk.point) window.pxInk.point(bubble, dir, at); }
  function room() { return ((root.closest && root.closest('.parvus-home')) || root).getBoundingClientRect(); }
  function fits(ext, rm) {
    bubble.classList.remove('below', 'side');
    bubble.style.setProperty('--m-bubble-nudge', '0px');
    var b = bubble.getBoundingClientRect(), s = sprite.getBoundingClientRect();
    var off = 0;
    if (b.left - ext.l < rm.left + 6) off = (rm.left + 6) - (b.left - ext.l);
    else if (b.right + ext.r > rm.right - 6) off = (rm.right - 6) - (b.right + ext.r);
    var at = s.left + s.width / 2 - (b.left + off);
    bubble.style.setProperty('--m-bubble-spill-b', Math.max(ext.b, inkTip('b', at)) + 'px');
    bubble.style.setProperty('--m-bubble-spill-t', Math.max(ext.t, inkTip('t', at)) + 'px');
    b = bubble.getBoundingClientRect();
    if (b.top - ext.t >= rm.top + 4) return { off: off, at: at, dir: 'b' };
    bubble.classList.add('below'); b = bubble.getBoundingClientRect();
    if (b.bottom + ext.b <= rm.bottom - 4) return { off: off, at: at, dir: 't' };
    bubble.classList.remove('below');
    return null;
  }
  function splat() {
    if (!window.pxInk) return;
    var rm = room();
    for (var i = 0; i < 8; i++) { window.pxInk.reshape(bubble); if (fits(inkSpill(), rm)) break; }
    nudge();
    window.pxInk.splash(bubble);
  }
  function nudge() {
    if (!chatEnd) return;
    var ext = inkSpill(), rm = room();
    var f = fits(ext, rm);
    if (!f) { sideways(ext, rm); return; }
    bubble.style.setProperty('--m-bubble-nudge', f.off.toFixed(1) + 'px');
    point(f.dir, f.at);
  }
  function sideways(ext, rm) {
    var s = sprite.getBoundingClientRect(), p = travel.getBoundingClientRect();
    var gap = parseFloat(getComputedStyle(root).getPropertyValue('--m-bubble-gap')) || 0;
    var B = window.pxInk ? window.pxInk.reach : 87;
    var roomR = rm.right - 6 - (s.right + gap) - 2 * B;
    var roomL = (s.left - gap) - (rm.left + 6) - 2 * B;
    bubble.style.setProperty('--m-bubble-side-w', Math.floor(Math.max(roomR, roomL, 120)) + 'px');
    bubble.classList.add('side');
    var b = bubble.getBoundingClientRect(), right = roomR >= roomL;
    var top = s.top + s.height * 0.3 - b.height / 2;
    top = Math.max(rm.top + 4 + ext.t, Math.min(top, rm.bottom - 4 - ext.b - b.height));
    var at = s.top + s.height * 0.3 - top;
    var left = right ? s.right + gap + Math.max(ext.l, inkTip('l', at)) : s.left - gap - Math.max(ext.r, inkTip('r', at)) - b.width;
    left = Math.max(rm.left + 6 + ext.l, Math.min(left, rm.right - 6 - ext.r - b.width));
    bubble.style.setProperty('--m-bubble-side-x', Math.round(left - p.left) + 'px');
    bubble.style.setProperty('--m-bubble-side-y', Math.round(top - p.top) + 'px');
    point(right ? 'l' : 'r', at);
  }
  function say(now, line) {
    if (!line) line = pickLine();
    if (!line) return;
    bubbleText.textContent = line;
    bubble.classList.add('on');
    chatEnd = now + CFG.chatMs;
    splat();
    play(SND.text);
  }
  function hush(now, quiet) {
    if (!chatEnd) return;
    chatEnd = 0;
    if (window.pxInk && window.pxInk.unsplash) window.pxInk.unsplash(bubble, function () { bubble.classList.remove('on'); });
    else bubble.classList.remove('on');
    chatAt = now + rand(CFG.chatMin, CFG.chatMax);
    if (!quiet) play(SND.close);
  }

  /* the hitbox is the sprite itself, so it travels with him */
  sprite.addEventListener('pointerdown', function () {
    var now = performance.now();
    clicks.push(now);
    while (clicks.length && now - clicks[0] > CFG.clickWindow) clicks.shift();
    if (clicks.length >= CFG.clicksFor && state !== 'tell' && !inMood(now)) startMood(now, 'angry');
    /* he answers a poking straight away rather than waiting out the usual gap,
       which is what made the poked lines look like they never fired */
    else if (clicks.length >= CFG.pokeMin && !chatEnd && !inMood(now) &&
             chatAt > now + CFG.pokeReplyMs) { chatAt = now + CFG.pokeReplyMs; forced = 'poked'; }
  });
  sprite.style.cursor = 'pointer';
  sprite.style.touchAction = 'manipulation';

  if (CFG.followCursor) {
    window.addEventListener('pointermove', function (e) {
      var now = performance.now();
      var gap = now - pointerAt;
      if (pointerAt && gap > 0 && gap < 200) {
        var moved = Math.abs(e.clientX - pointerX) + Math.abs(e.clientY - pointerY);
        frenzy = moved / gap;           /* pixels per millisecond */
      }
      pointerX = e.clientX; pointerY = e.clientY; pointerAt = now;
    }, { passive: true });
  }

  /* where the pointer sits, as whole steps, or null when it has gone quiet */
  var lastAim = 0;
  var aimDx = 0, aimDy = 0, aimLive = false, pendDx = 0, pendDy = 0, pendAt = 0;
  /* a step that sticks: once the eyes are over, the pointer has to come back
     well inside the dead zone before they centre, so a pointer hovering on the
     line does not rattle between two frames */
  function stepTo(v, prev) {
    var edge = prev === 0 ? CFG.deadZone : CFG.deadZone * CFG.deadZoneHold;
    return Math.abs(v) < edge ? 0 : (v > 0 ? 1 : -1);
  }
  function rawAim(now) {
    if (!CFG.followCursor || !pointerAt || now - pointerAt > CFG.cursorIdleMs) return null;
    if (now < moodUntil) return null;          /* in a mood, so the pointer is ignored */
    var r = sprite.getBoundingClientRect();
    var ex = pointerX - (r.left + r.width / 2);
    var ey = pointerY - (r.top + r.height / 2);
    /* out of range, so he pays it no attention */
    if (Math.sqrt(ex * ex + ey * ey) > CFG.trackRadius) return null;
    return { dx: stepTo(ex, aimDx), dy: stepTo(ey, aimDy) };
  }
  function cursorAim(now) {
    var raw = rawAim(now);
    if (raw === null) { aimLive = false; pendAt = 0; return null; }
    if (!aimLive) { aimLive = true; aimDx = raw.dx; aimDy = raw.dy; pendAt = 0; }
    else if (raw.dx !== aimDx || raw.dy !== aimDy) {
      /* the eyes wait for the pointer to settle rather than chasing every flick */
      if (!pendAt || raw.dx !== pendDx || raw.dy !== pendDy) { pendDx = raw.dx; pendDy = raw.dy; pendAt = now; }
      else if (now - pendAt >= CFG.trackLag) { aimDx = pendDx; aimDy = pendDy; pendAt = 0; }
    } else pendAt = 0;
    /* facing left mirrors the sprite, so flip the look to keep it on the pointer */
    return { dx: aimDx * facing, dy: aimDy };
  }
  /* he has just turned or finished a walk, so the pointer is worth another look
     even though it has not moved an inch */
  function remind() { if (pointerAt) pointerAt = performance.now(); }
  function cursorEye(now) {
    var aim = cursorAim(now);
    if (!aim) return null;
    lastAim = aim.dx;
    return eyeCol(aim.dx, aim.dy);
  }

  function look(way) {          /* 1 faces right, -1 faces left */
    facing = way;
    root.style.setProperty('--m-face', String(way));
    remind();
  }
  function place() {            /* keep him and his shadow over the same spot */
    travel.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    /* the shadow only follows him sideways: it belongs on the floor, so when he
       bolts upwards it stays put and shrinks instead of flying up with him */
    if (disco) disco.style.transform = 'translateX(' + x.toFixed(1) + 'px)';
    if (shade) {
      shade.style.transform = 'translate(' + x.toFixed(1) + 'px,' + Math.max(0, y).toFixed(1) + 'px)';
      var lift = Math.min(1, Math.max(0, -y) / (roamUp || roamY || 1));
      shade.style.opacity = String(1 - lift * 0.65);
      shade.style.scale = String(1 - lift * 0.3);
    }
    nudge();                    /* the text box travels with him, so it can hit the edge */
  }

  function yTop() {
    return -Math.max(0, roamUp - (edgeFit ? hatRise(wearing) + bobRise : 0));
  }
  function yBottom() { return Math.max(0, roamDown); }
  function pickHeight() { var lo = yTop(), hi = yBottom(); return lo + Math.random() * (hi - lo); }
  function xMin() { return -roamLeft; }
  function xMax() { return roamRight; }
  var moveTx = 0, moveTy = 0, moveVx = 0, moveVy = 0;

  var baseHat = CFG.hat || '';
  show(plainBody(), EYE.base);
  wear(hatNow());

  function rest(now) {
    state = 'rest';
    until = now + rand(CFG.restMin, CFG.restMax);
    wiggleAt = 0;
    if (wiggleReady(now) && Math.random() < CFG.chanceWiggleRest) {
      wiggleAt = now;
      until = Math.max(until, now + WIGGLE.total);
    }
    /* no drawing here: the loop below picks the right frame on the next tick,
       otherwise the base sprite flashes for one frame on the way in */
  }

  function next(now) {
    var watching = cursorAim(now) !== null;
    if (rainbowReady(now) && Math.random() < CFG.chanceRainbow) startRainbow(now);
    if (screenReady(now) && Math.random() < CFG.chanceScreen) { startScreen(now); return; }
    var roll = Math.random();
    /* he does not glance about on his own while he is watching the pointer */
    if (watching && roll >= CFG.chanceIdle && roll < CFG.chanceIdle + CFG.chanceGlance) roll += CFG.chanceGlance;
    if (roll < CFG.chanceIdle) {
      startIdle(now);
    } else if (roll < CFG.chanceIdle + CFG.chanceGlance) {
      state = 'glance'; started = now; until = now + CFG.glanceMs * 2;
    } else if (roll < CFG.chanceIdle + CFG.chanceGlance + CFG.chanceTurn) {
      state = 'turn'; started = now; until = now + CFG.turnMs;
      look(facing * -1);
    } else if (inRainbow(now)) {
      startIdle(now);
    } else {
      /* first he looks where he is going, then he sets off */
      state = 'ready'; started = now; until = now + CFG.readyMs;
      moveTx = xMin() + Math.random() * (xMax() - xMin());
      moveTy = pickHeight();
      dir = moveTx > x + 1 ? 1 : (moveTx < x - 1 ? -1 : (Math.random() < 0.5 ? -1 : 1));
    }
  }

  var last = 0, wasColoured = false, discoWas = false;
  if (discoRoom) discoRoom.addEventListener('transitionend', function () {
    if (!discoWas) discoRoom.classList.remove('leaving');
    else if (!landedAt) {
      landedAt = performance.now();
      var swap = !!wearing && !!CFG.partyHat && wearing !== CFG.partyHat;
      wear(hatNow());
      danceFrom = landedAt + (swap ? CFG.hatFallMs : 0);
    }
  });
  function tick(now) {
    if (!last) last = now;
    var dt = now - last; last = now;

    /* one pop whenever he leaves his usual colour and another when he returns */
    var coloured = inMood(now) || lit(now);
    if (coloured && !wasColoured) play(SND.colourOn);
    else if (wasColoured && !coloured) play(SND.colourOff);
    wasColoured = coloured;

    var partying = inRainbow(now);
    if (discoRoom && partying !== discoWas) {
      discoWas = partying;
      landedAt = 0;
      danceFrom = 0;
      discoClear();
      discoRoom.classList.toggle('on', partying);
      discoRoom.classList.toggle('leaving', !partying);
      if (partying) hush(now, true);
      else wear(hatNow());
    }

    /* waving the pointer around him fast enough for long enough makes him squint */
    if (now - pointerAt > 150) frenzy = 0;
    var nearby = cursorAim(now) !== null;
    if (nearby && frenzy > CFG.frenzySpeed) frenzyFor += dt; else frenzyFor = 0;
    if (frenzyFor >= CFG.frenzyHoldMs && state !== 'tell' && !inMood(now)) startMood(now, 'happy');

    /* blinking belongs to the calm states only */
    if (!blinkAt) blinkAt = now + rand(CFG.blinkMin, CFG.blinkMax);
    /* he can blink in any state now, the moving and angry poses have their own */
    var calm = (state !== 'tell');
    if (calm && now >= blinkAt && now < blinkAt + CFG.blinkMs) {
      blinkEnd = blinkAt + CFG.blinkMs;
    } else if (now >= blinkAt + CFG.blinkMs) {
      if (blinkEnd) blinkEnd = 0;
      if (now >= blinkAt) blinkAt = now + rand(CFG.blinkMin, CFG.blinkMax);
    }
    var shut = calm && blinkEnd && now < blinkEnd;

    /* he only pipes up once he has settled, never mid-walk or mid-mood */
    if (!chatAt) chatAt = now + rand(CFG.chatMin, CFG.chatMax);
    if (chatEnd) { if (now >= chatEnd) hush(now); }
    else if (CFG.chatMs > 0 && now >= chatAt && !inMood(now) && !partying &&
             (state === 'rest' || state === 'idle')) say(now);

    var bolting = now < dashUntil;
    /* once the bolt is over he drifts back down to his usual height */
    var hi = yBottom(), lo = inRainbow(now) ? Math.min(hi, Math.max(yTop(), discoDrop)) : yTop();
    if (!bolting && (y < lo || y > hi)) {
      var goal = y < lo ? lo : hi, back = CFG.settleSpeed * dt;
      y = Math.abs(goal - y) <= back ? goal : y + (goal > y ? back : -back);
      place();
    }

    if (state === 'tell') {
      /* the plain version of the mood comes first: a squint, or a pleased smile */
      if (bolting) {
        /* he stays turned towards it the whole way, even if it chases him */
        faceThePointer();
        /* squinting and bolting, still the plain body since the colour comes after */
        show(BODY.dash, EYE.angry);
        x += dashX * CFG.dashSpeed * dt;
        y += dashY * CFG.dashSpeed * dt;
        if (x > xMax()) x = xMax();
        if (x < xMin()) x = xMin();
        if (y > yBottom()) y = yBottom();
        if (y < yTop()) y = yTop();
        place();
      } else {
        /* the plain body wearing the squint or the smile, before the colour changes */
        show(plainBody(), mood === 'angry' ? EYE.angry : EYE.pleased);
      }
      /* the tell is over, so this is the frame his colour actually changes */
      /* the colour pop is handled up in tick */
      if (now >= until) { moodUntil = now + CFG.moodMs; dashUntil = 0; rest(now); }
    } else if (state === 'screen') {
      if (now >= holoLookAt) {
        var ndx = holoDx, ndy = holoDy;
        while (ndx === holoDx && ndy === holoDy) { ndx = Math.floor(Math.random() * 3) - 1; ndy = Math.floor(Math.random() * 3) - 1; }
        holoDx = ndx; holoDy = ndy;
        holoLookAt = now + rand(CFG.screenLookMin, CFG.screenLookMax);
      }
      show(plainBody(), shut ? blinkCol(holoDx) : eyeCol(holoDx, holoDy));
      if (now >= until) { holoEnded = now; remind(); rest(now); }
    } else if (state === 'think') {
      show(plainBody(), shut ? EYE.blinkR : EYE.think);
    } else if (state === 'rest') {
      var tracked = cursorEye(now);
      if (inMood(now)) show(bodyFor(false, now), moodEyes(shut));
      else if (shut) show(plainBody(), blinkCol(tracked === null ? 0 : lastAim));
      else if (tracked !== null) show(plainBody(), tracked);
      else show(plainBody(), EYE.base);   /* nothing going on, so the plain eyes */
      if (now >= until) next(now);
    } else if (state === 'idle') {
      var idleSeen = cursorEye(now);
      var idleBody = plainBody();
      /* the idle animation is the body only, so the eyes stay on the pointer */
      if (inMood(now)) show(bodyFor(false, now), moodEyes(shut));
      else if (shut) show(idleBody, blinkCol(idleSeen === null ? 0 : lastAim));
      else show(idleBody, idleSeen === null ? EYE.base : idleSeen);
      if (now >= until) rest(now);
    } else if (state === 'glance') {
      var seen = cursorEye(now);
      if (seen !== null) { rest(now); }          /* the pointer turned up, so watch it instead */
      else if (inMood(now)) {
        show(bodyFor(false, now), moodEyes(shut));
        if (now >= until) rest(now);
      } else {
        var way = (now - started) < CFG.glanceMs ? -1 : 1;
        if (shut) show(plainBody(), blinkCol(way));
        else show(plainBody(), way < 0 ? COL.lookLeft : COL.lookRight);
        if (now >= until) rest(now);
      }
    } else if (state === 'turn') {
      /* he turned, so he finds the pointer again from where he is now facing */
      var turnSeen = cursorEye(now);
      if (inMood(now)) show(bodyFor(false, now), moodEyes(shut));
      else if (shut) show(plainBody(), blinkCol(turnSeen === null ? 0 : lastAim));
      else show(plainBody(), turnSeen === null ? EYE.base : turnSeen);
      if (now >= until) rest(now);
    } else if ((state === 'ready' || state === 'move') && inRainbow(now)) {
      remind();
      rest(now);
    } else if (state === 'ready') {
      /* interest in the pointer drops here: he looks the way he is about to go */
      if (inMood(now)) show(bodyFor(false, now), moodEyes(shut));
      else show(plainBody(), eyeCol(dir === facing ? 1 : -1, moveTy - y > 24 ? 1 : (moveTy - y < -24 ? -1 : 0)));
      lastAim = 0;
      if (now >= until) {
        look(dir);
        var ddx = moveTx - x, ddy = moveTy - y, dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        var span = Math.max(CFG.moveMinMs, Math.min(CFG.moveMaxMs, dist / CFG.moveSpeed));
        var reach = Math.min(1, CFG.moveSpeed * span / dist);
        state = 'move'; started = now; until = now + span;
        moveVx = ddx * reach / span; moveVy = ddy * reach / span;
      }
    } else if (state === 'move') {
      /* the moving body wears whichever eyes suit the moment */
      if (inMood(now)) show(bodyFor(true, now), moodEyes(shut));
      else {
        var moveBody = bodyFor(true, now);
        if (typeof moveBody === 'number') moveBody += Math.floor((now - started) / CFG.moveFrameMs) % CFG.moveFrames;
        show(moveBody, shut ? blinkCol(0) : EYE.base);
      }
      x += moveVx * dt;
      if (x > xMax()) { x = xMax(); moveVx = 0; }
      if (x < xMin()) { x = xMin(); moveVx = 0; }
      y += moveVy * dt;
      if (y < yTop()) { y = yTop(); moveVy = 0; }
      if (y > yBottom()) { y = yBottom(); moveVy = 0; }
      place();
      /* he has shifted, so the pointer sits somewhere new relative to him */
      if (now >= until) { remind(); rest(now); }   /* he keeps facing the way he was going */
    }

    requestAnimationFrame(tick);
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    until = performance.now() + rand(CFG.restMin, CFG.restMax);
    requestAnimationFrame(tick);
  }

  /* handy while tuning: mascotFace(-1) turns him, mascotPeek() reports what he is doing */
  window.mascotFace = look;
  window.mascotMeasure = measure;
  /* handy while tuning: mascotWhy() shows the context he is picking against */
  window.mascotWhy = function () {
    var c = context();
    var hit = [];
    for (var i = 0; i < RULES.length; i++) {
      var r = RULES[i];
      if (LINES[r.bucket] && LINES[r.bucket].length && guess(function () { return r.when(c); })) hit.push(r.bucket + ' x' + r.weight);
    }
    return { context: c, matching: hit };
  };
  /* mascotHat('buildersclub'), mascotHat('pith'), or mascotHat() to knock it off */
  window.mascotHat = function (name) {
    baseHat = name && HAT[name] !== undefined ? name : '';
    wear(hatNow());
    return baseHat || 'none';
  };
  window.mascotWiggle = function () {
    var now = performance.now();
    if (inRainbow(now)) return false;
    state = 'idle'; started = now; wiggleAt = now;
    until = now + Math.max(8 * CFG.idleFrameMs, WIGGLE.total);
    return true;
  };
  window.mascotRainbow = function (on) {
    var now = performance.now();
    if (on === false) stopRainbow(now);
    else if (!inMood(now)) startRainbow(now);
    return inRainbow(now);
  };
  var thinking = false;
  window.mascotScreen = function () {
    var now = performance.now();
    if (thinking || inMood(now) || inRainbow(now)) return false;
    startScreen(now);
    return true;
  };
  window.mascotThink = function (on) {
    var now = performance.now();
    if (on === false) {
      if (!thinking) return false;
      thinking = false;
      hush(now, true);
      bubbleText.textContent = '';
      rest(now);
      return false;
    }
    if (thinking) return true;
    thinking = true;
    stopRainbow(now);
    wear(hatNow());
    wiggleAt = 0;
    state = 'think'; started = now;
    var spin = document.createElement('span');
    spin.className = 'mascot-think';
    bubbleText.textContent = '';
    bubbleText.appendChild(spin);
    bubble.classList.add('on');
    chatEnd = Infinity;
    splat();
    return true;
  };
  window.mascotSay = function (line) {
    var now = performance.now();
    if (thinking) { thinking = false; rest(now); }
    if (chatEnd) hush(now, true);
    say(now, line);
  };
  window.mascotMood = function () { return { mood: mood, until: Math.round(moodUntil), clicks: clicks.length }; };
  /* handy while tuning: mascotPeek() reports what it is doing */
  window.mascotPeek = function () {
    return { state: state, x: Math.round(x), y: Math.round(y), facing: facing, dir: dir,
             hat: wearing || 'none', mood: mood, inMood: inMood(performance.now()), thinking: thinking };
  };
})();


/* Parvus's home: typing lines on top of the tiled code background.
   Usage: ParvusHome.mount(document.querySelector('.parvus-home'));
   The container needs a .ph-typing child (see index.html). Works at any width and height:
   it only types on the rows the front tile leaves empty, so everything stays on the 12px grid. */
(function () {
  'use strict';
  var U = 12;                         // one art pixel
  var TILE_ROWS = 24;                 // the tiles repeat every 24 pixels down
  var FREE_ROWS = [2, 8, 12, 18];     // rows left empty in the front tile, for typing
  var COLORS = ['#8b949e', '#8b949e', '#8b949e', '#79c0ff', '#d2a8ff', '#ffa657'];
  var TICK_MS = 70;

  function rand(n) { return Math.floor(Math.random() * n); }

  function ParvusHome(el, opts) {
    opts = opts || {};
    this.el = el;
    this.layer = el.querySelector('.ph-typing');
    if (!this.layer) { this.layer = document.createElement('div'); this.layer.className = 'ph-typing'; el.appendChild(this.layer); }
    this.lanesPer = opts.pixelsPerTyper || 640;   // one typing line per ~640px of width
    this.lanes = [];
    this.timer = null;
    this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.layout();
    var self = this;
    if (window.ResizeObserver) { this.ro = new ResizeObserver(function () { self.layout(); }); this.ro.observe(el); }
    document.addEventListener('visibilitychange', function () { document.hidden ? self.stop() : self.start(); });
    this.start();
  }

  ParvusHome.prototype.layout = function () {
    var cols = Math.floor(this.el.clientWidth / U), rows = Math.floor(this.el.clientHeight / U);
    var free = [];
    for (var base = 0; base < rows; base += TILE_ROWS) FREE_ROWS.forEach(function (r) { if (base + r < rows) free.push(base + r); });
    var n = Math.max(1, Math.round(this.el.clientWidth / this.lanesPer));
    this.layer.innerHTML = '';
    this.lanes = [];
    for (var i = 0; i < n; i++) {
      var lane = { x0: Math.floor(cols / n * i), span: Math.floor(cols / n), free: free, nodes: [], cursor: null,
                   phase: 'pause', t: 8 + i * 17, pos: 0, line: null };
      lane.cursor = this.square('#c9d1d9', 0.55); lane.cursor.style.display = 'none';
      this.lanes.push(lane);
    }
    this.cols = cols;
  };

  ParvusHome.prototype.square = function (color, opacity) {
    var d = document.createElement('div');
    d.className = 'ph-sq';
    d.style.background = color;
    d.style.opacity = opacity;
    this.layer.appendChild(d);
    return d;
  };

  ParvusHome.prototype.newLine = function (lane) {
    if (!lane.free.length) return null;
    var row = lane.free[rand(lane.free.length)];
    var start = lane.x0 + 2 + rand(Math.max(1, lane.span - 44));
    var segs = [], n = 3 + rand(4), len = -1;
    for (var s = 0; s < n; s++) { var w = 2 + rand(5); segs.push([w, COLORS[rand(COLORS.length)]]); len += w + 1; }
    lane.nodes.forEach(function (d) { d.remove(); });
    var self = this;
    lane.nodes = segs.map(function (sg) { return self.square(sg[1], 0.24); });
    return { row: row, start: start, segs: segs, len: len };
  };

  ParvusHome.prototype.draw = function (lane, blinkOn) {
    var L = lane.line;
    if (!L) return;
    var x = L.start, left = lane.pos;
    L.segs.forEach(function (sg, i) {
      var d = lane.nodes[i], vis = Math.max(0, Math.min(sg[0], left));
      d.style.display = vis ? 'block' : 'none';
      d.style.left = x * U + 'px'; d.style.top = L.row * U + 'px'; d.style.width = vis * U + 'px';
      left -= sg[0] + 1; x += sg[0] + 1;
    });
    var show = lane.phase === 'type' || lane.phase === 'erase' || (lane.phase === 'hold' && blinkOn);
    lane.cursor.style.display = show ? 'block' : 'none';
    lane.cursor.style.left = (L.start + lane.pos) * U + 'px';
    lane.cursor.style.top = L.row * U + 'px';
    lane.cursor.style.width = U + 'px';
  };

  ParvusHome.prototype.step = function () {
    this.tick = (this.tick || 0) + 1;
    var blinkOn = this.tick % 8 < 4, self = this;
    this.lanes.forEach(function (lane) {
      if (lane.phase === 'type') {
        if (lane.t > 0) lane.t--;
        else { lane.pos++; lane.t = Math.random() < 0.15 ? 3 : 0; if (lane.pos >= lane.line.len) { lane.phase = 'hold'; lane.t = 36; } }
      } else if (lane.phase === 'hold') {
        if (--lane.t <= 0) lane.phase = 'erase';
      } else if (lane.phase === 'erase') {
        lane.pos = Math.max(0, lane.pos - 2);
        if (lane.pos === 0) { lane.phase = 'pause'; lane.t = 14; }
      } else {
        if (--lane.t <= 0) { lane.line = self.newLine(lane); lane.pos = 0; lane.t = 0; lane.phase = lane.line ? 'type' : 'pause'; if (!lane.line) lane.t = 30; }
      }
      self.draw(lane, blinkOn);
    });
  };

  ParvusHome.prototype.start = function () {
    if (this.reduced || this.timer) return;
    var self = this;
    this.timer = setInterval(function () { self.step(); }, TICK_MS);
  };
  ParvusHome.prototype.stop = function () { clearInterval(this.timer); this.timer = null; };

  window.ParvusHome = { mount: function (el, opts) { return new ParvusHome(el, opts); } };
})();

(function () {
  'use strict';
  var BG = '#070b14';
  var TILE = 480;
  var FRAME_MS = 33;
  var LAYERS = [
    { px: 3, speed: 0.12, count: 30, lo: 0.22, hi: 0.5, big: false },
    { px: 6, speed: 0.3, count: 9, lo: 0.35, hi: 0.7, big: false },
    { px: 6, speed: 0.55, count: 3, lo: 0.6, hi: 0.95, big: true }
  ];
  var TINTS = ['#ffffff', '#ffffff', '#c9d1d9', '#c9d1d9', '#a5d6ff', '#79c0ff', '#d2a8ff', '#ffa657'];
  var EVENT_GAP = [20000, 40000];
  var FIRST_EVENT = [8000, 14000];
  var SHOT_GAP = [4000, 9000];
  var GLIMMER_S = 0.8;

  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function snap(v, g) { return Math.round(v / g) * g; }

  function Stars(opts) {
    opts = opts || {};
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'ph-stars-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(this.canvas, document.body.firstChild);
    this.ctx = this.canvas.getContext('2d');
    this.startAt = opts.startAt || 0;
    this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.tiles = {};
    this.event = null;
    this.nextEvent = performance.now() + rand(FIRST_EVENT[0], FIRST_EVENT[1]);
    this.shots = [];
    this.nextShot = performance.now() + rand(2000, 4000);
    this.running = false;
    var self = this;
    this.resize = function () {
      var dpr = window.devicePixelRatio || 1;
      self.canvas.width = Math.round(window.innerWidth * dpr);
      self.canvas.height = Math.round(window.innerHeight * dpr);
      self.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      self.ctx.imageSmoothingEnabled = false;
      self.draw();
    };
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', function () { if (!self.running) self.draw(); }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) self.loop(); });
    this.resize();
    this.loop();
  }

  Stars.prototype.tile = function (li, tx, ty) {
    var key = li + ':' + tx + ':' + ty;
    if (this.tiles[key]) return this.tiles[key];
    var L = LAYERS[li], r = rng((li + 1) * 1000003 + (tx + 5000) * 7919 + (ty + 5000) * 104729), out = [];
    for (var i = 0; i < L.count; i++) {
      out.push({
        x: snap(r() * TILE, L.px), y: snap(r() * TILE, L.px),
        c: TINTS[Math.floor(r() * TINTS.length)],
        a: L.lo + r() * (L.hi - L.lo),
        tw: r() < 0.3 ? 0.6 + r() * 1.8 : 0,
        ph: r() * 6.283,
        gl: r() < (li === 0 ? 0.06 : 0.25) ? { per: 5 + r() * 9, off: r() * 14 } : null
      });
    }
    return (this.tiles[key] = out);
  };

  Stars.prototype.region = function () {
    return Math.max(0, Math.round(this.startAt - window.scrollY));
  };

  Stars.prototype.drawStars = function (t, top, vw, vh) {
    var ctx = this.ctx, sy = window.scrollY, self = this;
    LAYERS.forEach(function (L, li) {
      var off = sy * L.speed;
      var y0 = top + off, y1 = vh + off;
      for (var ty = Math.floor(y0 / TILE); ty <= Math.floor(y1 / TILE); ty++) {
        for (var tx = 0; tx * TILE < vw; tx++) {
          self.tile(li, tx, ty).forEach(function (s) {
            var x = tx * TILE + s.x, y = Math.round(ty * TILE + s.y - off);
            if (y < top - L.px * 3 || y > vh) return;
            var a = s.a;
            if (s.tw && !self.reduced) a *= 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph));
            ctx.globalAlpha = a;
            ctx.fillStyle = s.c;
            ctx.fillRect(x, y, L.px, L.px);
            if (L.big) {
              ctx.globalAlpha = a * 0.45;
              ctx.fillRect(x - L.px, y, L.px, L.px); ctx.fillRect(x + L.px, y, L.px, L.px);
              ctx.fillRect(x, y - L.px, L.px, L.px); ctx.fillRect(x, y + L.px, L.px, L.px);
            }
            if (s.gl && !self.reduced) {
              var g = (t + s.gl.off) % s.gl.per;
              if (g < GLIMMER_S) {
                var f = Math.sin(Math.PI * g / GLIMMER_S), q = L.px, reach = L.big ? 3 : 2;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.min(1, a + f * 0.6);
                ctx.fillRect(x, y, q, q);
                for (var k = 1; k <= reach; k++) {
                  ctx.globalAlpha = f * (0.85 - (k - 1) * 0.3);
                  ctx.fillRect(x - k * q, y, q, q); ctx.fillRect(x + k * q, y, q, q);
                  ctx.fillRect(x, y - k * q, q, q); ctx.fillRect(x, y + k * q, q, q);
                }
                ctx.globalAlpha = f * 0.3;
                ctx.fillRect(x - q, y - q, q, q); ctx.fillRect(x + q, y - q, q, q);
                ctx.fillRect(x - q, y + q, q, q); ctx.fillRect(x + q, y + q, q, q);
              }
            }
          });
        }
      }
    });
    ctx.globalAlpha = 1;
  };

  Stars.prototype.startEvent = function (now, top, vw, vh) {
    var room = vh - top;
    if (room < 200) { this.nextEvent = now + 4000; return; }
    var d2 = Math.random() < 0.5 ? 1 : -1;
    this.event = { kind: 'sat', t0: now, dur: rand(13000, 17000), dir: d2, y: rand(0.15, 0.7), drift: rand(-0.08, 0.08) };
  };

  Stars.prototype.drawEvent = function (now, top, vw, vh) {
    var e = this.event, ctx = this.ctx, p = (now - e.t0) / e.dur, room = vh - top;
    if (p >= 1) { this.event = null; this.nextEvent = now + rand(EVENT_GAP[0], EVENT_GAP[1]); return; }
    if (e.kind === 'sat') {
      var sx = e.dir > 0 ? -40 + p * (vw + 80) : vw + 40 - p * (vw + 80);
      var syy = top + (e.y + e.drift * p) * room;
      sx = snap(sx, 3); syy = snap(syy, 3);
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#79c0ff';
      ctx.fillRect(sx - 15, syy, 9, 3); ctx.fillRect(sx + 6, syy, 9, 3);
      ctx.fillStyle = '#c9d1d9';
      ctx.fillRect(sx - 3, syy - 3, 6, 9);
      ctx.fillRect(sx - 6, syy, 3, 3); ctx.fillRect(sx + 3, syy, 3, 3);
      if (Math.floor((now - e.t0) / 500) % 2 === 0) { ctx.globalAlpha = 0.95; ctx.fillStyle = '#ff7b72'; ctx.fillRect(sx - 1, syy - 6, 3, 3); }
    }
    ctx.globalAlpha = 1;
  };

  Stars.prototype.drawShots = function (now, top, vw, vh) {
    var ctx = this.ctx, room = vh - top;
    if (now >= this.nextShot) {
      if (room >= 150) {
        this.shots.push({ t0: now, dur: rand(800, 1300), len: rand(700, 1100), x: rand(0.1, 0.9) * vw, y: rand(0.02, 0.45), dx: Math.random() < 0.5 ? 1 : -1, tail: 8 + Math.floor(rand(0, 6)) });
      }
      this.nextShot = now + rand(SHOT_GAP[0], SHOT_GAP[1]);
    }
    this.shots = this.shots.filter(function (sh) { return now - sh.t0 < sh.dur; });
    this.shots.forEach(function (sh) {
      var p = (now - sh.t0) / sh.dur, dist = p * sh.len;
      var hx = sh.x + sh.dx * dist * 0.87, hy = top + sh.y * room + dist * 0.5;
      var fade = p > 0.7 ? (1 - p) / 0.3 : 1;
      for (var i = 0; i < sh.tail; i++) {
        var tx = snap(hx - sh.dx * i * 9 * 0.87, 3), ty = snap(hy - i * 9 * 0.5, 3);
        ctx.globalAlpha = fade * (1 - i / sh.tail) * (i ? 0.6 : 1);
        ctx.fillStyle = i ? '#a5d6ff' : '#ffffff';
        ctx.fillRect(tx, ty, i ? 3 : 6, i ? 3 : 6);
      }
    });
    ctx.globalAlpha = 1;
  };

  Stars.prototype.draw = function () {
    var ctx = this.ctx, vw = window.innerWidth, vh = window.innerHeight, top = this.region();
    var now = performance.now(), t = now / 1000;
    ctx.clearRect(0, 0, vw, vh);
    if (top >= vh) return;
    ctx.fillStyle = BG;
    ctx.fillRect(0, top, vw, vh - top);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, top, vw, vh - top);
    ctx.clip();
    this.drawStars(t, top, vw, vh);
    if (!this.reduced) {
      if (!this.event && now >= this.nextEvent) this.startEvent(now, top, vw, vh);
      if (this.event) this.drawEvent(now, top, vw, vh);
      this.drawShots(now, top, vw, vh);
    }
    ctx.restore();
  };

  Stars.prototype.loop = function () {
    if (this.reduced || this.running) return;
    this.running = true;
    var self = this, last = 0;
    (function frame(now) {
      if (document.hidden) { self.running = false; return; }
      if (!now || now - last >= FRAME_MS) { last = now || 0; self.draw(); }
      requestAnimationFrame(frame);
    })();
  };

  window.ParvusStars = { mount: function (opts) { return new Stars(opts); } };
})();

(function () {
  var home = document.getElementById('parvusHome');
  var m = document.getElementById('mascot');
  var t = document.getElementById('mascotTravel');
  if (!home || !m || !t || !window.ParvusHome) return;
  var U = 12, G = 48, stars = null;
  function mod(v) { return ((v % U) + U) % U; }
  function fit() {
    var left0 = Math.round((home.clientWidth - m.offsetWidth) / 2);
    var left = left0 - mod(left0 + t.offsetLeft + 3);
    var top = mod(U - 3 - t.offsetTop);
    m.style.left = left + 'px';
    m.style.top = top + 'px';
    home.style.height = Math.ceil((top + m.offsetHeight) / G) * G + 'px';
    var restTop = top + t.offsetTop;
    m.style.setProperty('--m-roam-up', restTop + 'px');
    m.style.setProperty('--m-roam-down', (home.clientHeight - restTop - t.offsetHeight) + 'px');
    var restLeft = left + t.offsetLeft;
    m.style.setProperty('--m-roam-left', restLeft + 'px');
    m.style.setProperty('--m-roam-right', (home.clientWidth - restLeft - t.offsetWidth) + 'px');
    if (window.mascotMeasure) window.mascotMeasure();
    if (stars && stars.startAt !== home.offsetHeight) { stars.startAt = home.offsetHeight; stars.draw(); }
  }
  fit();
  window.addEventListener('resize', fit, { passive: true });
  ParvusHome.mount(home);
  
})();

}
