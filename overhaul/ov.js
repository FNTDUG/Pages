(function () {
  var h = document.documentElement, t;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  h.classList.add('ov');
  setTimeout(function () { h.classList.add('ov-ready'); }, 2500);
  if (!/(^|\.)fntduserguide\.com$/.test(location.hostname)) h.classList.add('ov-noads');
  try { t = localStorage.getItem('pv-theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  h.setAttribute('data-theme', t);
  [
    'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Audiowide&family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;700&display=swap',
    '/overhaul/parvus-home.css',
    '/overhaul/ov-pop.css'
  ].forEach(function (href) {
    if (href.indexOf('fonts.googleapis') !== -1 && document.querySelector('link[href*="family=Archivo+Black"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  });

  var SECTIONS = { fntd2: 'Five Nights TD 2', fntd1: 'Five Nights TD', bbn: 'Bite By Night', fwm: 'FNaF World Multiplayer', 'patch-notes': 'Patch notes', wiki: 'Community wiki', '404': 'Error 404' };
  var title = '';
  var PREFIX = { fntd1: /^FNTD ?1\s+/i, fntd2: /^FNTD ?2\s+/i, bbn: /^(BBN|Bite By Night)\s+/i, fwm: /^(FWM|FNaF World Multiplayer)\s+/i };
  function esc(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function gameKey() {
    var q = /[?&]game=([a-z0-9-]+)/.exec(location.search);
    if (q && SECTIONS[q[1]]) return q[1];
    var m = document.querySelector('meta[name="ov-section"]');
    if (m && m.content) return m.content.toLowerCase().replace(/\s+/g, '');
    return location.pathname.replace(/^\/overhaul(?=\/|$)/, '').split('/').filter(Boolean)[0] || '';
  }
  var game = gameKey();
  if (SECTIONS[game]) h.setAttribute('data-game', game);
  function section() { return SECTIONS[game] || 'FNTD User Guide'; }

  var NAV_PAGES = ['/fntd1', '/fntd2/fntd2-directory', '/bbn/bite-by-night-directory', '/fntd2/fntd2-index', '/fwm/fwm-directory'];
  var bare = NAV_PAGES.indexOf(location.pathname.replace(/^\/overhaul(?=\/|$)/, '').replace(/\.html$/, '').replace(/\/(index)?$/, '')) !== -1 || !!document.querySelector('meta[name="ov-bare"]') || (!document.querySelector('meta[name="ov-stage"]') && !!(window.matchMedia && window.matchMedia('(max-width: 960px)').matches));
  function hero() {
    var inner = document.getElementById('ug-hero-inner'), area = document.querySelector('.ug-page-title-area');
    if (!inner || !area || document.querySelector('.ov-hero')) return;
    var t = area.querySelector('.ug-page-title');
    if (t) {
      title = t.textContent.trim();
      var shown = title.replace(PREFIX[game] || /$^/, '') || title;
      var words = shown.split(' '), last = words.pop();
      t.innerHTML = (words.length ? esc(words.join(' ')) + ' ' : '') + '<span class="ov-hl"><span class="ov-hl-bg"></span>' + esc(last) + '</span>';
    }
    var wrap = document.createElement('div');
    var own = document.querySelector('meta[name="ov-stage"]'), tpl = own && document.getElementById(own.content);
    wrap.className = 'ov-hero' + (bare ? ' ov-hero--bare' : '') + (tpl && !bare ? ' ov-hero--own' : '');
    wrap.innerHTML = '<div class="ov-copy"><span class="ov-kicker"><i></i>' + esc(section()) + '</span></div>' + (bare ? '' : tpl ? '<div class="ov-stage"><div class="ov-screen">' + tpl.innerHTML + '</div></div>' : '<div class="ov-stage' + (reduced ? '' : ' ov-wait') + '"><div class="ov-screen"><div data-parvus-home></div></div></div>');
    inner.insertBefore(wrap, inner.firstChild);
    wrap.firstChild.appendChild(area);
    pins(wrap);
    nextBtn(wrap);
    gatherNotes(wrap, area, inner);
    document.addEventListener('pagenotes:ready', function () { gatherNotes(wrap, area, inner); });
    sizeScreen();
    fitTitle();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
    window.addEventListener('resize', function () { sizeScreen(); fitTitle(); }, { passive: true });
    load('/overhaul/ov-voice.js?v=20261021a');
    if (bare) {
      load('/overhaul/ov-ask.js');
      load('/overhaul/ov-ink.js', function () { load('/overhaul/ov-talk.js'); });
      return;
    }
    if (tpl) {
      document.dispatchEvent(new Event('ov:stage'));
      load('/overhaul/ov-ask.js');
      load('/overhaul/ov-ink.js', function () { load('/overhaul/ov-talk.js'); });
      return;
    }
    var js = document.createElement('script');
    js.src = '/overhaul/parvus-home.js';
    js.onload = function () {
      var home = document.getElementById('parvusHome');
      sizeScreen();
      if (home && window.ResizeObserver) new ResizeObserver(function () { requestAnimationFrame(sizeScreen); }).observe(home);
      chat();
    };
    document.body.appendChild(js);
  }

  function gatherNotes(wrap, area, inner) {
    var notes = null;
    Array.prototype.forEach.call(inner.children, function (el) { if (el.classList.contains('ov-notes')) notes = el; });
    if (!notes) {
      notes = document.createElement('div');
      notes.className = 'ov-notes';
    }
    function lead() {
      var first = null;
      Array.prototype.forEach.call(notes.children, function (el) { if (!first && el.classList.contains('ug-status-inline-text')) first = el; });
      return first;
    }
    Array.prototype.slice.call(area.children).concat(Array.prototype.slice.call(inner.children)).forEach(function (el) {
      if (el === wrap || el === notes || el.classList.contains('ug-page-title') || el.classList.contains('ug-status-badge') || el.classList.contains('ug-page-desc') || el.classList.contains('ad-slot') || el.querySelector('#cleanModeToggle')) return;
      if (el.classList.contains('ug-status-inline-text')) notes.appendChild(el);
      else if (el.tagName === 'DIV' && el.querySelector('[style*="Audiowide"]')) notes.insertBefore(el, lead());
    });
    var head = Array.prototype.filter.call(area.children, function (el) { return /Audiowide/.test(el.getAttribute('style') || '') && /^notes:?$/i.test(el.textContent.trim()); })[0];
    if (head) {
      var card = document.createElement('div');
      card.className = 'ov-note-card';
      var el = head;
      while (el && (el === head || (el.tagName === 'P' && !/discord/i.test(el.textContent)))) {
        var next = el.nextElementSibling;
        card.appendChild(el);
        el = next;
      }
      notes.insertBefore(card, notes.firstChild);
    }
    if (notes.children.length && !notes.parentNode) inner.insertBefore(notes, wrap.nextSibling);
  }

  var SPRITES = {
    pad: ['.gggggggggggg.', 'ggkggggggggygg', 'gkkkggggggbgcg', 'ggkggggggggygg', 'gggggggggggggg', 'ggggg....ggggg', 'gggg......gggg'],
    cursor: ['c.......', 'cc......', 'ccc.....', 'cccc....', 'ccccc...', 'cccccc..', 'ccccccc.', 'cccccccc', 'cccc....', 'cc.cc...', 'c..cc...', '....cc..', '....cc..'],
    heart: ['.gg...gg.', 'gcgg.gggg', 'gcggggggg', 'ggggggggg', '.ggggggg.', '..ggggg..', '...ggg...', '....g....'],
    coin: ['..yyyy..', '.yyyyyy.', 'yycyykyy', 'ycyyykyy', 'yyyyykyy', 'yyyyykyy', '.yyyyyy.', '..yyyy..'],
    floppy: ['bbcccckcb.', 'bbcccckcbb', 'bbccccccbb', 'bbbbbbbbbb', 'bbbbbbbbbb', 'bccccccccb', 'bckkkkkkcb', 'bccccccccb', 'bckkkkkccb', 'bccccccccb'],
    chat: ['.cccccccccc.', 'cccccccccccc', 'cccccccccccc', 'cckkckkckkcc', 'cckkckkckkcc', 'cccccccccccc', '.cccccccccc.', '..ccc.......', '..cc........', '..c.........'],
    signal: ['.........cc', '.........cc', '......gg.cc', '......gg.cc', '...gg.gg.cc', '...gg.gg.cc', 'gg.gg.gg.cc', 'gg.gg.gg.cc'],
    play: ['y.......', 'yyy.....', 'yyyyy...', 'yyyyyyy.', 'yyyyyyyy', 'yyyyyyy.', 'yyyyy...', 'yyy.....', 'y.......'],
    sparkle: ['....y....', '...yyy...', '...yyy...', '.yyyyyyy.', 'yyyyyyyyy', '.yyyyyyy.', '...yyy...', '...yyy...', '....y....'],
    key: ['ccccccccc', 'ckccccckc', 'ckccccckc', 'ckcckcckc', 'ckckckckc', 'cckccckcc', 'ccccccccc', 'mmmmmmmmm', 'mmmmmmmmm'],
    smile: ['..yyyyy..', '.yyyyyyy.', 'yykyyykyy', 'yykyyykyy', 'yyyyyyyyy', 'ykyyyyyky', '.ykkkkky.', '..yyyyy..'],
    file: ['ccccccm..', 'ccccccmm.', 'ccccccmmm', 'ccccccccc', 'cgggggccc', 'ccccccccc', 'ckkkkkkkc', 'ccccccccc', 'ckkkkkkcc', 'ccccccccc', 'ckkkkcccc', 'ccccccccc'],
    bell: ['.....y.....', '...yyyyy...', '..yyyyyyy..', '..ycyyyyy..', '..ycyyyyy..', '.yycyyyyyy.', '.yyyyyyyyy.', 'yyyyyyyyyyy', '...........', '....yyy....'],
    pie: ['..bbkgg..', '.bbbkggg.', 'bbbbkgggg', 'bbbbkgggg', 'bbbbkkkkk', 'bbbbkyyyy', 'bbbbkyyyy', '.bbbkyyy.', '..bbkyy..'],
    trash: ['...mmm...', 'mmmmmmmmm', '.........', '.bbbbbbb.', '.bkbkbkb.', '.bkbkbkb.', '.bkbkbkb.', '.bkbkbkb.', '.bbbbbbb.', '..bbbbb..'],
    gear: ['......mmmm......', '......mcmm......', '..mmm.mmmm.mmm..', '..mcmmmmmmmmmm..', '..mmmmcccmmmmm..', '...mmcmmmmmmm...', 'mmmmcmm..mmmmmmm', 'mcmmcm....mmmmmm', 'mcmmmm....mmmmmm', 'mmmmmmm..mmmmmmm', '...mmmmmmmmmm...', '..mmmmmmmmmmmm..', '..mmmmmmmmmmmm..', '..mmm.mmmm.mmm..', '......mmmm......', '......mmmm......'],
    lens: ['..cccc....', '.cbbbbc...', 'cbcbbbbc..', 'cbbbbbbc..', 'cbbbbbbc..', '.cbbbbc...', '..ccccgg..', '......ggg.', '.......ggg', '........gg'],
    bookmark: ['ggggggg', 'gcggggg', 'gcggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggggggg', 'ggg.ggg', 'gg...gg', 'g.....g'],
    joystick: ['..rrr.......', '.rcrrr......', '.rrrrr......', '..rrr.......', '...m........', '...m....yyy.', 'gggggggggggg', 'gggggggggggg', 'gggggggggggg'],
    arcade: ['.gggggggggg.', '.gyyyyyyyyg.', '.gggggggggg.', '.gkkkkkkkkg.', '.gckkkkkkkg.', '.gckkykkkcg.', '.gkkkkkkkcg.', '.gkkkkkkkkg.', '.gggggggggg.', 'ggrggggygbgg', 'gggggggggggg', '.gggggggggg.', '.ggggkkgggg.', '.gggggggggg.', '.gggggggggg.'],
    trophy: ['..yyyyyyyy..', 'yyycyyyyyyyy', 'y.ycyyyyyy.y', 'y.yyyyyyyy.y', '.yyyyyyyyyy.', '..yyyyyyyy..', '...yyyyyy...', '....yyyy....', '.....yy.....', '.....yy.....', '...yyyyyy...', '..gggggggg..', '..gggggggg..'],
    gg: ['.yyyyyyyyyyyyy.', 'yyyyyyyyyyyyyyy', 'yyyykkkyykkkyyy', 'yyykyyyykyyyyyy', 'yyykykkykykkyyy', 'yyykyykykyykyyy', 'yyyykkkyykkkyyy', 'yyyyyyyyyyyyyyy', '.yyyyyyyyyyyyy.'],
    levelup: ['.nnnnnnnnnnnnnnn.', 'nnnnnnnnnnnnnnnnn', 'nnnnknnnknknkknnn', 'nnnkkknnknknknknn', 'nnkkkkknknknkknnn', 'nnnnknnnknknknnnn', 'nnnnknnnkkknknnnn', 'nnnnnnnnnnnnnnnnn', '.nnnnnnnnnnnnnnn.'],
    drink: ['.mmmmmm.', 'mmmkmmmm', 'nnnnnnnn', 'ncnnnyyn', 'ncnnyynn', 'ncnyynnn', 'nnyyyyyn', 'nnnnyynn', 'nnnyynnn', 'nnyynnnn', 'nnnnnnnn', 'mmmmmmmm', '.mmmmmm.']
  };
  function art(rows) {
    var w = rows[0].length + 2, ht = rows.length + 2, grid = [], out = [], x, y, i, j;
    for (y = 0; y < ht; y++) {
      grid.push([]);
      for (x = 0; x < w; x++) grid[y].push(rows[y - 1] && x > 0 && x <= rows[y - 1].length ? rows[y - 1].charAt(x - 1) : '.');
    }
    for (y = 0; y < ht; y++) {
      out.push(grid[y].slice());
      for (x = 0; x < w; x++) {
        if (grid[y][x] !== '.') continue;
        for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
          if (grid[y + i] && grid[y + i][x + j] && grid[y + i][x + j] !== '.') out[y][x] = 'k';
        }
      }
    }
    var rects = '';
    for (y = 0; y < ht; y++) {
      for (x = 0; x < w;) {
        var ch = out[y][x], run = 1;
        if (ch === '.') { x++; continue; }
        while (x + run < w && out[y][x + run] === ch) run++;
        rects += '<rect class="' + ch + '" x="' + x + '" y="' + y + '" width="' + run + '" height="1"/>';
        x += run;
      }
    }
    return { w: w, h: ht, svg: '<svg viewBox="0 0 ' + w + ' ' + ht + '" shape-rendering="crispEdges" aria-hidden="true">' + rects + '</svg>' };
  }
  var SCENES = {
    '/fntd2/tierlists-1': { tint: 'yellow', go: 'Open TierLists' },
    '/fntd2/fntd2-index': { tint: 'blue', go: 'Open Metas & Info' },
    '/bbn/bite-by-night-tierlists': { tint: 'pink', go: 'Open TierLists & Maps' },
    '/bbn/killer-terminal': { tint: 'green', go: 'Open the Terminals' },
    '/fntd2/codes': { tint: 'green', go: 'Open Codes' },
    '/bbn/codes': { tint: 'blue', go: 'Open Codes' },
    '/fwm/roster': { tint: 'yellow', go: 'Open the Roster' },
    '/fwm/tech-specs': { tint: 'green', go: 'Open Tech Specs' },
    '/fwm/tierlist': { tint: 'pink', go: 'Open the TierList' },
    '/fwm/meta-teams': { tint: 'blue', go: 'Open Meta Teams' }
  };
  function directory() {
    var grid = document.querySelector('#ug-content .bbn-dir-grid');
    if (!grid || grid.getAttribute('data-ov')) return;
    grid.setAttribute('data-ov', '1');
    var out = document.createElement('div');
    out.className = 'ov-dir';
    Array.prototype.forEach.call(grid.querySelectorAll('.bbn-dir-col'), function (col) {
      var a = col.querySelector('a[href]'), label = col.querySelector('.bbn-dir-label'), desc = col.querySelector('.bbn-dir-desc');
      if (!a) return;
      var href = a.getAttribute('href'), sc = SCENES[href.replace(/^\/overhaul/, '')] || { tint: 'yellow' };
      var name = label ? label.textContent.trim() : (a.querySelector('img') || {}).alt || '';
      var card = document.createElement('a');
      card.className = 'ov-card ov-card--term' + (col.classList.contains('bbn-dir-col--wide') ? ' ov-card--wide' : '');
      card.href = href;
      card.style.setProperty('--c', 'var(--' + sc.tint + ')');
      card.innerHTML = '<span class="ov-term-frame"><span class="ov-term"><h3><span class="ov-term-p" aria-hidden="true">&gt;</span><span class="ov-term-t"></span><span class="ov-term-c" aria-hidden="true"></span></h3></span></span>' + (desc ? '<p></p>' : '') + '<span class="ov-card-go">' + esc(sc.go || 'Open ' + name) + ' <span class="arrow" aria-hidden="true">&rarr;</span></span>';
      card.querySelector('.ov-term-t').textContent = name;
      if (desc) card.querySelector('p').textContent = desc.textContent.trim();
      out.appendChild(card);
    });
    grid.parentNode.replaceChild(out, grid);
    if (reduced) return;
    Array.prototype.forEach.call(out.querySelectorAll('.ov-term'), function (el) { typer(el, 9); });
    if (window.MutationObserver) new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          var t = n.nodeType === 1 && n.querySelector('.ov-term');
          if (!t) return;
          var old = t.querySelector('.ov-term-type');
          if (old) old.parentNode.removeChild(old);
          typer(t, 9);
        });
      });
    }).observe(out, { childList: true });
  }
  function typer(el, U) {
    var TILE = 24, FREE = [2, 8, 12, 18], COLORS = ['#8b949e', '#8b949e', '#8b949e', '#79c0ff', '#d2a8ff', '#ffa657'];
    var layer = document.createElement('span'), lanes = [], cols = 0, tick = 0, timer = null, seen = false;
    layer.className = 'ov-term-type';
    layer.setAttribute('aria-hidden', 'true');
    el.insertBefore(layer, el.firstChild);
    function rand(n) { return Math.floor(Math.random() * n); }
    function sq(color, op) {
      var d = document.createElement('span');
      d.className = 'ov-sq';
      d.style.background = color;
      d.style.opacity = op;
      d.style.height = U + 'px';
      layer.appendChild(d);
      return d;
    }
    function layout() {
      cols = Math.floor(el.clientWidth / U);
      var rows = Math.floor(el.clientHeight / U), free = [], base, i;
      for (base = 0; base < rows; base += TILE) FREE.forEach(function (r) { if (base + r < rows) free.push(base + r); });
      var n = Math.max(1, Math.round(el.clientWidth / (640 * U / 12)));
      layer.innerHTML = '';
      lanes = [];
      for (i = 0; i < n; i++) {
        var lane = { x0: Math.floor(cols / n * i), span: Math.floor(cols / n), free: free, nodes: [], cursor: sq('#c9d1d9', 0.55), phase: 'pause', t: 8 + i * 17, pos: 0, line: null };
        lane.cursor.style.display = 'none';
        lanes.push(lane);
      }
    }
    function newLine(lane) {
      if (!lane.free.length) return null;
      var row = lane.free[rand(lane.free.length)], start = lane.x0 + 2 + rand(Math.max(1, lane.span - 44)), segs = [], n = 3 + rand(4), len = -1, k;
      for (k = 0; k < n; k++) { var w = 2 + rand(5); segs.push([w, COLORS[rand(COLORS.length)]]); len += w + 1; }
      lane.nodes.forEach(function (d) { d.remove(); });
      lane.nodes = segs.map(function (sg) { return sq(sg[1], 0.24); });
      return { row: row, start: start, segs: segs, len: len };
    }
    function draw(lane, blinkOn) {
      var L = lane.line;
      if (!L) return;
      var x = L.start, left = lane.pos;
      L.segs.forEach(function (sg, k) {
        var d = lane.nodes[k], vis = Math.max(0, Math.min(sg[0], left));
        d.style.display = vis ? 'block' : 'none';
        d.style.left = x * U + 'px';
        d.style.top = L.row * U + 'px';
        d.style.width = vis * U + 'px';
        left -= sg[0] + 1;
        x += sg[0] + 1;
      });
      var show = lane.phase === 'type' || lane.phase === 'erase' || (lane.phase === 'hold' && blinkOn);
      lane.cursor.style.display = show ? 'block' : 'none';
      lane.cursor.style.left = (L.start + lane.pos) * U + 'px';
      lane.cursor.style.top = L.row * U + 'px';
      lane.cursor.style.width = U + 'px';
    }
    function step() {
      tick++;
      var blinkOn = tick % 8 < 4;
      lanes.forEach(function (lane) {
        if (lane.phase === 'type') {
          if (lane.t > 0) lane.t--;
          else { lane.pos++; lane.t = Math.random() < 0.15 ? 3 : 0; if (lane.pos >= lane.line.len) { lane.phase = 'hold'; lane.t = 36; } }
        } else if (lane.phase === 'hold') {
          if (--lane.t <= 0) lane.phase = 'erase';
        } else if (lane.phase === 'erase') {
          lane.pos = Math.max(0, lane.pos - 2);
          if (lane.pos === 0) { lane.phase = 'pause'; lane.t = 14; }
        } else if (--lane.t <= 0) {
          lane.line = newLine(lane);
          lane.pos = 0;
          lane.t = lane.line ? 0 : 30;
          lane.phase = lane.line ? 'type' : 'pause';
        }
        draw(lane, blinkOn);
      });
    }
    function run() {
      var go = seen && !document.hidden;
      if (go && !timer) timer = setInterval(step, 70);
      else if (!go && timer) { clearInterval(timer); timer = null; }
    }
    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(el);
    document.addEventListener('visibilitychange', run);
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { seen = es[0].isIntersecting; run(); }).observe(el);
    else { seen = true; run(); }
  }
  var QUICK = {
    '/fntd1/charts-tierlists': ['pie', 'Top units for every role'],
    '/fntd1/other-charts': ['file', 'Titles and attack types'],
    '/fntd1/tierlists': ['trophy', 'Best picks for each slot'],
    '/fntd1/meta-teams': ['pad', 'Best team for every mode'],
    '/fntd1/pvp-ranked': ['gg', 'Final PvP tier list'],
    '/fntd1/boss-raids': ['heart', 'Teams, maps and modifiers'],
    '/fntd1/endless': ['signal', 'Meta team and map rewards'],
    '/fntd1/event-endless': ['sparkle', 'Event team and rewards'],
    '/fntd1/night-shift': ['bell', 'Teams and placements'],
    '/fntd2/unit-engine': ['gear', 'Stats, DPS and values'],
    '/fntd2/trade-calculator': ['coin', 'Check if a trade is fair'],
    '/fntd2/story-index': ['bookmark', 'Rewards and best nights'],
    '/fntd2/endless-index': ['signal', 'Teams and rewards per game'],
    '/fntd2/boss-raids-index': ['trophy', 'Teams, placements and OMC'],
    '/fntd2/challenges': ['key', 'Maps, rewards and teams'],
    '/fntd2/event-story-endless': ['sparkle', 'Current event teams']
  };
  function quick() {
    var grid = document.querySelector('#ug-content .f1-dir-grid');
    if (!grid || grid.getAttribute('data-ov')) return;
    grid.setAttribute('data-ov', '1');
    grid.classList.add('ov-quick');
    Array.prototype.forEach.call(grid.querySelectorAll('a.f1-dir-btn'), function (a) {
      var href = a.getAttribute('href'), key = href.replace(/^\/overhaul/, '').replace(/^https?:\/\/[^/]+/, ''), ext = /^https?:/.test(href) && href.indexOf(location.host) === -1;
      var q = QUICK[key] || (ext ? ['coin', 'Value Central calculator'] : ['sparkle', '']);
      var name = (a.querySelector('img') || {}).alt || a.textContent.trim();
      var card = document.createElement('a');
      card.className = 'ov-card ov-card--row';
      card.href = href;
      if (a.target) { card.target = a.target; card.rel = a.rel || 'noopener noreferrer'; }
      var ic = art(SPRITES[q[0]] || SPRITES.sparkle);
      card.innerHTML = '<span class="ov-card-ic ov-card-ic--px"><span style="width:' + ic.w * 2 + 'px;height:' + ic.h * 2 + 'px">' + ic.svg + '</span></span><span class="ov-row-text"><h3></h3>' + (q[1] ? '<p></p>' : '') + '</span><span class="arrow" aria-hidden="true">' + (ext ? '&#8599;' : '&rarr;') + '</span>';
      card.querySelector('h3').textContent = name.replace(/\s*\/\s*/g, ' / ');
      if (q[1]) card.querySelector('p').textContent = q[1];
      a.parentNode.replaceChild(card, a);
    });
  }

  function sticker(name, u, cls) {
    var a = art(SPRITES[name]), el = document.createElement('div');
    el.className = cls;
    el.style.width = a.w * u + 'px';
    el.style.height = a.h * u + 'px';
    el.style.setProperty('--u', u + 'px');
    el.innerHTML = '<div class="ov-spin"><div class="ov-bob">' + a.svg + '</div></div>';
    return el;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  var floats = [], aim = { x: 0, y: 0 }, cam = { x: 0, y: 0 }, camOn = false, spanW = 0, spanH = 0;
  function spanOf() {
    var vw = window.innerWidth;
    if (!spanH || vw !== spanW) {
      var probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none';
      document.body.appendChild(probe);
      spanW = vw;
      spanH = Math.max(probe.offsetHeight, window.innerHeight) + 240;
      probe.remove();
    }
    return spanH;
  }
  var TIERS = {
    near: { u: [5, 6], up: 4, d: [0.45, 0.65], cam: 16 },
    far: { u: [3, 3], up: 3, d: [0.12, 0.22], cam: 6 }
  };
  function floaters() {
    if (/[?&]float=0/.test(location.search) || document.querySelector('.ov-float')) return;
    var layer = document.createElement('div');
    layer.className = 'ov-float';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    var vw = window.innerWidth, span = spanOf(), phone = vw <= 600;
    var count = {
      far: phone ? 3 : Math.min(12, Math.max(5, Math.round(vw / 160))),
      near: phone ? 3 : Math.min(10, Math.max(5, Math.round(vw / 200)))
    };
    ['far', 'near'].forEach(function (tier) {
      var T = TIERS[tier];
      for (var i = 0; i < count[tier]; i++) {
        var f = { tier: tier, u: phone ? T.up : T.u[0] + Math.floor(Math.random() * (T.u[1] - T.u[0] + 1)), d: rnd(T.d[0], T.d[1]), cyc: null };
        f.name = free(f);
        f.el = sticker(f.name, f.u, 'ov-sticker ov-' + tier);
        f.w = parseFloat(f.el.style.width);
        layer.appendChild(f.el);
        var best = -1;
        for (var c = 0; c < 20; c++) {
          var cx = spot(f, vw), cy = Math.random(), dist = far(cx * vw, cy * span - 120, f);
          if (dist > best) { best = dist; f.fx = cx; f.fy = cy; }
        }
        f.x = f.fx * vw - f.w / 2;
        f.y = f.fy * span - 120;
        floats.push(f);
      }
    });
    float();
    if (!reduced) window.addEventListener('scroll', float, { passive: true });
    window.addEventListener('resize', float, { passive: true });
    if (!reduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', function (e) {
        aim.x = e.clientX / window.innerWidth - 0.5;
        aim.y = e.clientY / window.innerHeight - 0.5;
        if (!camOn) { camOn = true; requestAnimationFrame(pan); }
      }, { passive: true });
    }
  }
  function pan() {
    cam.x += (aim.x - cam.x) * 0.07;
    cam.y += (aim.y - cam.y) * 0.07;
    if (Math.abs(aim.x - cam.x) < 0.001 && Math.abs(aim.y - cam.y) < 0.001) { cam.x = aim.x; cam.y = aim.y; camOn = false; }
    float();
    if (camOn) requestAnimationFrame(pan);
  }
  function float() {
    var vw = window.innerWidth, span = spanOf(), top = document.documentElement.scrollHeight - window.innerHeight;
    var sy = reduced ? 0 : Math.max(0, Math.min(window.scrollY, Math.max(0, top)));
    floats.forEach(function (f) {
      var pos = f.fy * span - sy * f.d, cyc = Math.floor(pos / span), y = Math.round(pos - cyc * span - 120);
      if (f.cyc !== null && cyc !== f.cyc) reroll(f, y, vw);
      f.cyc = cyc;
      f.x = Math.round(f.fx * vw - f.w / 2);
      f.y = y;
      var k = TIERS[f.tier].cam;
      f.el.style.transform = 'translate(' + Math.round(f.x - cam.x * k * 2) + 'px,' + Math.round(y - cam.y * k * 2) + 'px)';
    });
  }
  var ovCol = 0;
  function spot(f, vw) {
    if (!ovCol) ovCol = parseFloat(getComputedStyle(h).getPropertyValue('--ov-col')) || 980;
    var col = Math.min(vw, ovCol + 48);
    var room = (vw - col) / 2 - f.w - 12;
    if (room < 8) return Math.random();
    var x = 6 + f.w / 2 + Math.random() * room;
    return (Math.random() < 0.5 ? x : vw - x) / vw;
  }
  function pick() {
    var names = Object.keys(SPRITES);
    return names[Math.floor(Math.random() * names.length)];
  }
  function free(self) {
    var used = {}, open = [];
    floats.forEach(function (o) { if (o !== self && o.tier === self.tier) used[o.name] = 1; });
    Object.keys(SPRITES).forEach(function (n) { if (!used[n]) open.push(n); });
    return open.length ? open[Math.floor(Math.random() * open.length)] : pick();
  }
  function far(x, y, self) {
    var best = Infinity;
    floats.forEach(function (o) {
      if (o === self) return;
      var dx = x - (o.x + o.w / 2), dy = y - o.y;
      best = Math.min(best, dx * dx + dy * dy);
    });
    return best;
  }
  function reroll(f, y, vw) {
    f.name = free(f);
    var a = art(SPRITES[f.name]);
    f.w = a.w * f.u;
    f.el.style.width = f.w + 'px';
    f.el.style.height = a.h * f.u + 'px';
    f.el.querySelector('.ov-bob').innerHTML = a.svg;
    var best = -1;
    for (var c = 0; c < 16; c++) {
      var cx = spot(f, vw), dist = far(cx * vw, y, f);
      if (dist > best) { best = dist; f.fx = cx; }
    }
  }
  function pins(card) {
    var phone = window.innerWidth <= 600, u = phone ? 4 : 5;
    var a = pick(), b = pick();
    while (b === a) b = pick();
    card.appendChild(sticker(a, u, 'ov-pin ov-pin-tl'));
    card.appendChild(sticker(b, u, 'ov-pin ov-pin-br'));
  }
  function wiggle(g) {
    if (reduced) return;
    function hop(b, k, v, d, wait) {
      var on = false;
      setTimeout(function step() {
        on = !on;
        var s = {};
        s[k] = on ? v : 0;
        g.set(b, s);
        setTimeout(step, d * 1000);
      }, wait * 1000);
    }
    g.utils.toArray('.ov-far .ov-bob').forEach(function (b) {
      var d = rnd(2.6, 4);
      hop(b, 'y', -3, d, rnd(0, 2) + d);
    });
    g.utils.toArray('.ov-near .ov-bob, .ov-pin .ov-bob').forEach(function (b) {
      var u = parseFloat(getComputedStyle(b.closest('[style*="--u"]')).getPropertyValue('--u')) || 5;
      var dy = rnd(1.4, 2.6), dx = rnd(2.2, 3.8);
      hop(b, 'y', -u, dy, rnd(0, 1.5) + dy / 2);
      hop(b, 'x', u * (Math.random() < 0.5 ? -1 : 1), dx, rnd(0, 2) + dx);
    });
    (function spin() {
      var list = g.utils.toArray('.ov-near .ov-spin');
      if (list.length) g.to(list[Math.floor(Math.random() * list.length)], { rotation: '+=360', duration: 0.6, ease: 'steps(4)' });
      setTimeout(spin, rnd(3500, 6500));
    })();
  }

  function fitTitle() {
    var t = document.querySelector('.ov-copy .ug-page-title');
    if (!t) return;
    if (t.querySelector('div')) return;
    t.style.fontSize = '';
    var size = parseFloat(getComputedStyle(t).fontSize);
    function over() {
      var box = t.getBoundingClientRect(), edge = box.left + t.clientWidth - parseFloat(getComputedStyle(t).paddingRight) + 1, rg = document.createRange();
      rg.selectNodeContents(t);
      return Array.prototype.some.call(rg.getClientRects(), function (r) { return r.right > edge; });
    }
    while (size > 22 && over()) {
      size -= 2;
      t.style.fontSize = size + 'px';
    }
  }

  var SCALE = 0.75;
  var screenSet = {};
  function nextBtn(wrap) {
    var here = location.pathname.replace(/\/+$/, '');
    var cur = null;
    Array.prototype.forEach.call(document.querySelectorAll('#ug-mobile-nav a.ug-mn-child[data-nav-href]'), function (a) {
      var p = a.getAttribute('data-nav-href');
      if ((here === p || here.indexOf(p + '/') === 0) && (!cur || p.length > cur.getAttribute('data-nav-href').length)) cur = a;
    });
    var sec = cur && cur.closest('.ug-mn-section');
    if (!sec) return;
    var list = sec.querySelectorAll('a.ug-mn-child[data-nav-href]');
    if (list.length < 2) return;
    var next = list[(Array.prototype.indexOf.call(list, cur) + 1) % list.length];
    var a = document.createElement('a');
    a.className = 'ov-next';
    a.href = next.getAttribute('href');
    a.innerHTML = '<span class="ov-next-k">Next</span><span class="ov-next-t">' + esc(next.firstChild.textContent.trim()) + '</span><span class="ov-next-a" aria-hidden="true">&rarr;</span>';
    var area = wrap.querySelector('.ug-page-title-area'), codes = area && area.querySelector('.ug-codes-btn');
    if (!area) return;
    if (codes) codes.parentNode.insertBefore(a, codes.nextSibling);
    else area.appendChild(a);
  }

  function sizeScreen() {
    var sc = document.querySelector('.ov-screen'), host = sc && sc.querySelector('[data-parvus-home]');
    if (!host) return;
    var home = document.getElementById('parvusHome');
    var cw = sc.clientWidth, ch = sc.clientHeight, edge = getComputedStyle(sc).boxSizing === 'border-box' ? sc.offsetHeight - ch : 0, hh = home ? home.offsetHeight * SCALE : 0;
    var w = cw / SCALE + 'px', mh = home ? Math.ceil(hh) + edge + 'px' : '', top = home ? Math.max(0, Math.round((Math.max(ch, Math.ceil(hh)) - hh) / 2)) + 'px' : '';
    if (screenSet.w !== w) host.style.width = screenSet.w = w;
    if (home && screenSet.mh !== mh) sc.style.minHeight = screenSet.mh = mh;
    if (home && screenSet.top !== top) host.style.top = screenSet.top = top;
  }

  function chat() {
    var sp = document.getElementById('mascotSprite');
    if (!sp || sp.getAttribute('data-ov-chat')) return;
    sp.setAttribute('data-ov-chat', '1');
    sp.setAttribute('role', 'button');
    sp.setAttribute('tabindex', '0');
    sp.setAttribute('aria-label', 'Ask Parvus');
    function go() { if (window.ovTalkOpen) window.ovTalkOpen(sp); }
    sp.addEventListener('click', go);
    sp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
    load('/overhaul/ov-ask.js');
    load('/overhaul/ov-ink.js', function () { load('/overhaul/ov-talk.js'); });
  }

  function load(src, done) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = done;
    document.body.appendChild(s);
  }
  function loadAll(list, done) {
    var left = list.length;
    list.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = s.onerror = function () { if (--left === 0) done(); };
      document.body.appendChild(s);
    });
  }

  function greet() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var p = window.mascotPeek && window.mascotPeek();
      if (p && window.mascotSay && !p.thinking) {
        clearInterval(iv);
        if (window.mascotTired && window.mascotTired()) window.mascotSay("zzz. i'm out of answers for now. come back once i've had a rest.");
        else if (title) window.mascotSay('Welcome to ' + title + '! ' + (window.matchMedia && window.matchMedia('(pointer: fine)').matches ? 'Click' : 'Tap') + ' me if you need help.');
      } else if (tries > 20) clearInterval(iv);
    }, 400);
  }

  function unwait() {
    var st = document.querySelector('.ov-stage');
    if (st) st.classList.remove('ov-wait');
  }
  function drop(g, tries) {
    var m = document.getElementById('mascot'), home = document.getElementById('parvusHome');
    if (!m || !home) {
      if ((tries || 0) < 30) setTimeout(function () { drop(g, (tries || 0) + 1); }, 100);
      else { unwait(); greet(); }
      return;
    }
    if (window.mascotRainbow) window.mascotRainbow(false);
    g.set(m, { y: -(home.offsetHeight + 60) });
    unwait();
    g.timeline({ onComplete: function () { g.set(m, { clearProps: 'transform' }); if (window.mascotWiggle) window.mascotWiggle(); greet(); } })
      .to(m, { y: 0, duration: 0.42, ease: 'power2.in', snap: { y: 12 } })
      .to(m, { y: -36, duration: 0.14, ease: 'steps(3)' })
      .to(m, { y: 0, duration: 0.16, ease: 'steps(3)' });
  }

  function animate() {
    var go = false;
    function run() { if (go) return; go = true; fitTitle(); intro(); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    setTimeout(run, 1200);
  }
  function intro() {
    var g = window.gsap;
    if (g && window.ovRowLoop) Array.prototype.forEach.call(document.querySelectorAll('.info-card, .ov-dir'), function (row) { try { window.ovRowLoop(row, row.classList.contains('ov-dir') ? { fit: 'wrap' } : undefined); } catch (e) {} });
    if (!g || reduced) { if (!bare) { unwait(); greet(); } return; }
    wiggle(g);
    var tl = g.timeline({ defaults: { ease: 'back.out(1.6)' } });
    function from(t, vars, at) { var els = g.utils.toArray(t); if (els.length) tl.from(els, vars, at); }
    from('.ov-hl-bg', { scaleX: 0, duration: 0.42, ease: 'steps(6)' }, 0.2);
    tl.call(fitTitle, null, 0.7);
    if (!bare) {
      from('.ov-screen', { scaleY: 0.02, filter: 'brightness(3)', duration: 0.45, ease: 'steps(5)', clearProps: 'transform,filter' }, 0);
      tl.call(function () { drop(g); }, null, 0.5);
    }
  }

  var TINTS = ['yellow', 'blue', 'pink', 'green'];
  function cards() {
    Array.prototype.forEach.call(document.querySelectorAll('.info-card'), function (row) {
      Array.prototype.slice.call(row.children).forEach(function (sec, i) {
        if (!sec.classList.contains('info-card-section') || sec.classList.contains('ov-card')) return;
        var head = sec.querySelector('h4'), body = sec.querySelector('p');
        var links = body ? Array.prototype.filter.call(body.querySelectorAll('a[href]'), function (a) { return /^\//.test(a.getAttribute('href')); }) : [];
        var link = links.length === 1 ? links[0] : null;
        var card = document.createElement(link ? 'a' : 'div');
        card.className = 'ov-card info-card-section' + (link ? '' : ' ov-card--static');
        card.style.setProperty('--c', 'var(--' + TINTS[i % TINTS.length] + ')');
        if (link) card.href = link.getAttribute('href');
        var name = head ? head.textContent.trim().replace(/:$/, '') : '';
        var html = '';
        if (body) {
          if (link && /^here$/i.test(link.textContent.trim())) {
            link.replaceWith('@@ov@@');
            html = (body.innerHTML.match(/[^.!?]*[.!?]+(?:\s+|$)|[^.!?]+$/g) || []).filter(function (t) { return t.indexOf('@@ov@@') === -1; }).join('').trim();
          } else {
            if (link) link.replaceWith.apply(link, Array.prototype.slice.call(link.childNodes));
            html = body.innerHTML.trim();
          }
        }
        card.innerHTML = '<span class="ov-card-ic"><i></i></span><h3></h3>' + (html ? '<p>' + html + '</p>' : '') + (link ? '<span class="ov-card-go"></span>' : '');
        card.querySelector('h3').textContent = name;
        if (link) card.querySelector('.ov-card-go').innerHTML = esc(name) + ' guide <span class="arrow" aria-hidden="true">&rarr;</span>';
        sec.replaceWith(card);
      });
    });
  }

  function fold(box) {
    if (box.children.length === 1 && box.firstElementChild.classList.contains('ov-fold')) return box.firstElementChild;
    var w = document.createElement('div');
    w.className = 'ov-fold';
    while (box.firstChild) w.appendChild(box.firstChild);
    box.appendChild(w);
    return w;
  }
  function drops() {
    Array.prototype.forEach.call(document.querySelectorAll('.ug-mn-section-items'), fold);
    var exp = window.infToggleExp;
    if (typeof exp !== 'function' || exp.ov) return;
    window.infToggleExp = function (row, body, arr) {
      if (body && !body.getAttribute('data-ads')) {
        var w = fold(body);
        if (typeof window._infAdSpot === 'function') {
          body.setAttribute('data-ads', '1');
          window._infAdSpot(w, null, 'inf-ad-sub');
        }
      }
      exp(row, body, arr);
      Array.prototype.forEach.call(document.querySelectorAll('.inf-exp-body.ov-open'), function (b) {
        if (b.style.maxHeight !== '2000px') b.classList.remove('ov-open');
      });
      if (body && body.style.maxHeight === '2000px') body.classList.add('ov-open');
    };
    window.infToggleExp.ov = true;
  }

  function ready() {
    if (document.getElementById('pv-theme')) return;
    try {
      drops();
      cards();
      directory();
      quick();
      hero();
    } finally {
      h.classList.add('ov-ready');
    }
    floaters();
    var touchRows = document.querySelector('.info-card, .ov-dir, [data-ov-rows]') && !(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    loadAll(['gsap'].concat(touchRows ? ['Draggable', 'InertiaPlugin'] : []).map(function (n) { return '/overhaul/gsap/' + n + '.min.js'; }).concat(['/overhaul/ov-rows.js']), animate);
    var btn = document.createElement('button');
    btn.id = 'pv-theme';
    btn.type = 'button';
    btn.title = 'Light or dark mode';
    btn.innerHTML = '<svg class="pv-sun" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="8" height="8"></rect><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"></path></svg><svg class="pv-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"></path></svg>';
    document.body.appendChild(btn);
    var lock = 0;
    function label() { btn.setAttribute('aria-label', h.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); }
    label();
    btn.addEventListener('click', function () {
      var now = Date.now();
      if (now < lock) return;
      lock = now + 800;
      btn.classList.add('is-cooling');
      btn.setAttribute('aria-disabled', 'true');
      setTimeout(function () { btn.classList.remove('is-cooling'); btn.removeAttribute('aria-disabled'); }, 800);
      var next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      h.setAttribute('data-theme', next);
      try { localStorage.setItem('pv-theme', next); } catch (e) {}
      label();
    });
    var placeT = 0;
    function place() {
      if (placeT || h.classList.contains('pv-shell')) return;
      placeT = requestAnimationFrame(function () { placeT = 0; placeNow(); });
    }
    function placeNow() {
      if (h.classList.contains('pv-shell')) return;
      var bell = document.getElementById('ntfBell');
      var ref = bell && !bell.hidden && bell.getClientRects().length ? bell : document.getElementById('ug-sound-btn');
      if (!ref) return;
      btn.style.top = Math.round(ref.getBoundingClientRect().bottom + (window.innerWidth > 768 ? 8 : 6)) + 'px';
    }
    place();
    var bell = document.getElementById('ntfBell');
    if (bell && window.MutationObserver) new MutationObserver(place).observe(bell, { attributes: true, attributeFilter: ['hidden', 'class', 'style'] });
    window.addEventListener('resize', place, { passive: true });
    load('/overhaul/ov-shell.js?v=20261021c', function () { if (!document.getElementById('pv-gear')) h.classList.add('pv-shell'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
