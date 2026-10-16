(function (g) {
  var FW = g.FW || (g.FW = {});
  var IMG = '/fnaf-world/img/';
  var WIKI = 'https://five-nights-at-freddys-world.fandom.com/wiki/';
  var GAME_ORDER = ["Five Nights at Freddy's", "Five Nights at Freddy's 2", "Five Nights at Freddy's 3", "Five Nights at Freddy's 4", "Five Nights at Freddy's 4: Halloween Edition", 'FNaF World'];
  var KIND = { party: 'Party member', boss: 'Boss', enemy: 'Enemy', npc: 'NPC' };
  FW.TABS = [['party', 'Party'], ['boss', 'Bosses'], ['enemy', 'Enemies'], ['npc', 'NPCs']];
  FW.SORTS = [['world', 'World'], ['hp', 'Health'], ['az', 'A to Z'], ['game', 'Game']];

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function num(v) {
    var m = String(v == null ? '' : v).replace(/,/g, '').match(/\d+/);
    return m ? Number(m[0]) : null;
  }
  function fmt(v) {
    if (v == null || v === '') return '?';
    return String(v).replace(/\d{4,}/g, function (d) { return d.replace(/\B(?=(\d{3})+(?!\d))/g, ','); });
  }
  function worldsOf(c) {
    if (c.kind === 'party') return c.world ? [c.world] : [];
    return c.worlds || [];
  }
  function hpOf(c) {
    if (c.kind === 'party') return c.health;
    if (c.hp) return num(c.hp[0] || c.hp[1]);
    return num(c.hp_text);
  }
  function gameOf(c) {
    return c.game || 'FNaF World';
  }
  function index(data) {
    if (data._ix) return data._ix;
    var ix = { world: {}, byId: {}, tabs: { party: [], boss: [], enemy: [], npc: [] } };
    data.worlds.forEach(function (w, i) { w.i = i; ix.world[w.key] = w; });
    data.party.concat(data.others).forEach(function (c) {
      ix.byId[c.id] = c;
      ix.tabs[c.kind].push(c);
    });
    data._ix = ix;
    return ix;
  }
  function worldOf(data, c) {
    var ix = index(data), w = worldsOf(c)[0];
    return (w && ix.world[w]) || data.worlds[0];
  }
  function byName(a, b) {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
  }
  function match(c, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return c.name.toLowerCase().indexOf(q) !== -1 || worldsOf(c).join(' ').toLowerCase().indexOf(q) !== -1 || (c.kind === 'party' && (c.attacks.join(' ') + ' ' + gameOf(c)).toLowerCase().indexOf(q) !== -1);
  }

  FW.groups = function (data, tab, sort, q) {
    var ix = index(data), items = ix.tabs[tab].filter(function (c) { return match(c, q); });
    if (sort === 'game' && tab !== 'party') sort = 'world';
    if (sort === 'hp') {
      items = items.slice().sort(function (a, b) {
        var x = hpOf(a), y = hpOf(b);
        if (x == null && y == null) return byName(a, b);
        if (x == null) return 1;
        if (y == null) return -1;
        return y - x || byName(a, b);
      });
      return items.length ? [{ key: 'hp', title: 'Most health first', items: items }] : [];
    }
    if (sort === 'az') {
      items = items.slice().sort(byName);
      return items.length ? [{ key: 'az', title: 'A to Z', items: items }] : [];
    }
    var out = [], map = {};
    items.forEach(function (c) {
      var k = sort === 'game' ? gameOf(c) : worldOf(data, c).key;
      if (!map[k]) { map[k] = { key: k, items: [] }; out.push(map[k]); }
      map[k].items.push(c);
    });
    out.forEach(function (gr) {
      if (sort === 'game') {
        gr.title = gr.key;
        gr.rank = GAME_ORDER.indexOf(gr.key) === -1 ? 50 : GAME_ORDER.indexOf(gr.key);
      } else {
        var w = ix.world[gr.key];
        gr.title = w.name;
        gr.world = w;
        gr.rank = w.i;
      }
    });
    out.sort(function (a, b) { return a.rank - b.rank || (a.title < b.title ? -1 : 1); });
    return out;
  };

  FW.order = function (data, tab, sort, q) {
    var list = [];
    FW.groups(data, tab, sort, q).forEach(function (gr) { list = list.concat(gr.items); });
    return list;
  };

  FW.card = function (data, c) {
    var w = worldOf(data, c), hp = hpOf(c);
    var h = '<li><a class="fw-card" href="#' + esc(c.id) + '" data-id="' + esc(c.id) + '" style="--wc:' + w.color + '">';
    h += '<span class="fw-card-art">' + (c.card ? '<img src="' + IMG + esc(c.card) + '" alt="" loading="lazy" decoding="async">' : '') + '</span>';
    if (c.kind !== 'npc') h += '<span class="fw-card-hp" title="Health"><svg viewBox="0 0 7 6" aria-hidden="true" focusable="false"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg>' + (hp == null ? '?' : fmt(hp)) + '<span class="fw-sr"> health</span></span>';
    if (c.n) h += '<span class="fw-card-no">#' + c.n + '</span>';
    h += '<span class="fw-card-name">' + esc(c.name) + '</span></a></li>';
    return h;
  };

  FW.grid = function (data, tab, sort, q) {
    var gs = FW.groups(data, tab, sort, q);
    if (!gs.length) return '<p class="fw-none">No characters match that search.</p>';
    return gs.map(function (gr) {
      var w = gr.world, col = w ? w.color : '#ffce1f';
      var h = '<section class="fw-sec" style="--wc:' + col + '">';
      h += '<h2 class="fw-sec-h">' + (w && w.bg ? '<span class="fw-sec-bg" style="background-image:url(' + IMG + esc(w.bg) + ')"></span>' : '') + '<span class="fw-sec-t">' + esc(gr.title) + '</span><span class="fw-sec-n">' + gr.items.length + '</span></h2>';
      h += '<ul class="fw-grid">' + gr.items.map(function (c) { return FW.card(data, c); }).join('') + '</ul></section>';
      return h;
    }).join('');
  };

  function wikiUrl(t) {
    var p = String(t || '').split('#');
    return WIKI + encodeURIComponent(p[0].replace(/ /g, '_')).replace(/%2F/g, '/') + (p[1] ? '#' + encodeURIComponent(p[1].replace(/ /g, '_')) : '');
  }
  function panel(title, body) {
    return '<section class="fwd-panel"><h3 class="fwd-h">' + title + '</h3>' + body + '</section>';
  }

  FW.detail = function (data, c, still) {
    var ix = index(data), w = worldOf(data, c), party = c.kind === 'party';
    var src = still ? c.card : (party ? c.idle : c.img);
    var h = '<div class="fwd-stage">';
    h += '<div class="fwd-char-wrap">';
    if (party && c.atk && !still) h += '<button type="button" class="fwd-char" aria-label="Play ' + esc(c.name) + '\'s attack animation">';
    else h += '<div class="fwd-char">';
    h += '<img class="fwd-anim" src="' + IMG + esc(src) + '" alt="' + esc(c.name) + '" decoding="async">';
    h += party && c.atk && !still ? '</button>' : '</div>';
    h += '<span class="fwd-ground" aria-hidden="true"></span></div>';
    if (c.quote) h += '<p class="fwd-quote">&ldquo;' + esc(c.quote) + '&rdquo;</p>';
    if (party && c.atk && !still) h += '<p class="fwd-hint">Tap them to see their attack</p>';
    h += '</div><div class="fwd-info">';
    h += '<p class="fwd-kicker">' + KIND[c.kind] + (c.n ? ' #' + c.n : '') + ' &middot; ' + esc(c.update) + '</p>';
    h += '<h2 class="fwd-name" id="fwd-name">' + esc(c.name) + '</h2><div class="fwd-chips">';
    worldsOf(c).forEach(function (k) {
      var ww = ix.world[k];
      if (ww) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + ww.color + '">' + esc(ww.name) + '</span>';
    });
    if (party) h += '<span class="fwd-chip">From ' + esc(gameOf(c)) + '</span>';
    h += '</div>';
    if (party) {
      var max = 0;
      data.party.forEach(function (p) { if (p.health > max) max = p.health; });
      h += '<section class="fwd-panel fwd-stat"><svg class="fwd-heart" viewBox="0 0 7 6" aria-hidden="true" focusable="false"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg><div class="fwd-stat-b"><p class="fwd-stat-l">Health <span>at level 0</span></p>';
      h += '<p class="fwd-stat-v">' + (c.health == null ? '?' : c.health) + '</p>';
      h += c.health == null ? '<p class="fwd-stat-note">The wiki doesn\'t list this one yet.</p>' : '<span class="fwd-bar"><span style="width:' + Math.round(c.health / max * 100) + '%"></span></span>';
      h += '</div></section>';
      h += panel('Attacks', '<ul class="fwd-atks">' + c.attacks.map(function (n) {
        var a = data.attacks[n] || {};
        var li = '<li class="fwd-atk" style="--c:' + (a.color || '#888') + '">';
        li += a.icon ? '<img src="' + IMG + esc(a.icon) + '" alt="" width="212" height="50" loading="lazy" decoding="async">' : '';
        li += '<div class="fwd-atk-b"><p class="fwd-atk-n">' + esc(n) + (a.colorName ? ' <span class="fwd-tag">' + esc(a.colorName) + (a.kind ? ' &middot; ' + esc(a.kind) : '') + '</span>' : '') + '</p>';
        if (a.desc) li += '<p class="fwd-atk-d">' + esc(a.desc) + '</p>';
        if (a.formula) li += '<p class="fwd-atk-f">Damage: <code>' + esc(a.formula) + '</code></p>';
        return li + '</div></li>';
      }).join('') + '</ul>');
      if (c.unlock) h += panel('How to get', '<p>' + esc(c.unlock) + '</p>');
    } else if (c.kind !== 'npc') {
      var rows = '';
      if (c.hp || c.atk) {
        rows += '<table class="fwd-tbl"><thead><tr><th scope="col"><span class="fw-sr">Stat</span></th><th scope="col">Normal</th><th scope="col">Hard</th></tr></thead><tbody>';
        rows += '<tr><th scope="row">Health</th><td>' + fmt(c.hp && c.hp[0]) + '</td><td>' + fmt(c.hp && c.hp[1]) + '</td></tr>';
        rows += '<tr><th scope="row">Attack</th><td>' + fmt(c.atk && c.atk[0]) + '</td><td>' + fmt(c.atk && c.atk[1]) + '</td></tr></tbody></table>';
      } else if (c.hp_text || c.atk_text) {
        rows += '<table class="fwd-tbl"><tbody>' + (c.hp_text ? '<tr><th scope="row">Health</th><td>' + esc(fmt(c.hp_text)) + '</td></tr>' : '') + (c.atk_text ? '<tr><th scope="row">Attack</th><td>' + esc(c.atk_text) + '</td></tr>' : '') + '</tbody></table>';
      } else rows = '<p class="fwd-stat-note">The wiki doesn\'t list stats for this one yet.</p>';
      h += panel('Stats', rows);
    }
    var about = '';
    if (c.about) about += '<p>' + esc(c.about) + '</p>';
    if (c.tips) about += '<h3 class="fwd-h fwd-h2">Tips</h3><p>' + esc(c.tips) + '</p>';
    if (about) h += panel('About', about);
    if (w.about && worldsOf(c).length) h += panel('About ' + esc(w.name), '<p>' + esc(w.about) + '</p>');
    h += '<p class="fwd-src">Info and art from the <a href="' + esc(wikiUrl(c.wiki)) + '" target="_blank" rel="noopener noreferrer">FNaF World Wiki</a> on Fandom (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>).</p>';
    return h + '</div>';
  };

  if (typeof document === 'undefined') return;
  var root = document.getElementById('fw');
  if (!root) return;
  var mount = root.querySelector('.fw-grids'), tabs = root.querySelectorAll('.fw-tab'), sortEl = root.querySelector('.fw-sort'), qEl = root.querySelector('.fw-q');
  var data = null, ix = null, state = { tab: 'party', sort: 'world', q: '' };
  var dlg = null, cur = null, order = [], pushed = false, lastFocus = null, atkT = 0, swipeX = null, swipeY = 0, qT = 0;
  function reduced() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }

  function render() {
    if (!data) return;
    mount.innerHTML = FW.grid(data, state.tab, state.sort, state.q);
    mount.setAttribute('aria-labelledby', 'fw-tab-' + state.tab);
    Array.prototype.forEach.call(tabs, function (t) {
      var on = t.getAttribute('data-tab') === state.tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    var game = sortEl.querySelector('option[value="game"]');
    if (game) game.disabled = state.tab !== 'party';
    if (state.tab !== 'party' && state.sort === 'game') { state.sort = 'world'; sortEl.value = 'world'; }
  }
  function pickTab(t, focus) {
    if (!t) return;
    state.tab = t.getAttribute('data-tab');
    render();
    if (focus) t.focus();
  }

  Array.prototype.forEach.call(tabs, function (t, i) {
    t.addEventListener('click', function () { pickTab(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = tabs.length, j = -1;
      if (k === 'ArrowRight') j = (i + 1) % n;
      else if (k === 'ArrowLeft') j = (i - 1 + n) % n;
      else if (k === 'Home') j = 0;
      else if (k === 'End') j = n - 1;
      if (j < 0) return;
      e.preventDefault();
      pickTab(tabs[j], true);
    });
  });
  sortEl.addEventListener('change', function () { state.sort = sortEl.value; render(); });
  qEl.addEventListener('input', function () {
    clearTimeout(qT);
    qT = setTimeout(function () { state.q = qEl.value.trim(); render(); }, 120);
  });
  mount.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('.fw-card') : null;
    if (!a || !data || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    open(a.getAttribute('data-id'), true);
  });

  var ICON_L = '<svg viewBox="0 0 8 12" aria-hidden="true" focusable="false"><path d="M5 0h3v2H6v2H4v1H3v2h1v1h2v2h2v2H5v-2H3V8H1V7H0V5h1V4h2V2h2z"/></svg>';
  var ICON_R = '<svg viewBox="0 0 8 12" aria-hidden="true" focusable="false"><path d="M3 0H0v2h2v2h2v1h1v2H4v1H2v2H0v2h3v-2h2V8h2V7h1V5H7V4H5V2H3z"/></svg>';
  function build() {
    dlg = document.createElement('div');
    dlg.className = 'fwd';
    dlg.hidden = true;
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-modal', 'true');
    dlg.setAttribute('aria-labelledby', 'fwd-name');
    dlg.innerHTML = '<div class="fwd-bg"></div><div class="fwd-shade"></div><div class="fwd-scroll"><div class="fwd-in"></div></div>' +
      '<div class="fwd-top"><button type="button" class="fwd-btn fwd-back" aria-label="Back to all characters">' + ICON_L + '<span aria-hidden="true">Back</span></button><span class="fwd-count" aria-live="polite"></span>' +
      '<button type="button" class="fwd-btn fwd-nav fwd-prev" aria-label="Previous character">' + ICON_L + '</button>' +
      '<button type="button" class="fwd-btn fwd-nav fwd-next" aria-label="Next character">' + ICON_R + '</button></div>';
    document.body.appendChild(dlg);
    dlg.querySelector('.fwd-back').addEventListener('click', close);
    dlg.querySelector('.fwd-prev').addEventListener('click', function () { step(-1); });
    dlg.querySelector('.fwd-next').addEventListener('click', function () { step(1); });
    dlg.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.fwd-char') : null;
      if (b && b.tagName === 'BUTTON') attack(b);
    });
    document.addEventListener('keydown', function (e) {
      if (dlg.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) {
        e.preventDefault();
        step(e.key === 'ArrowLeft' ? -1 : 1);
        return;
      }
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(dlg.querySelectorAll('button, a[href]'), function (x) { return x.offsetParent !== null || x === document.activeElement; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (!dlg.contains(document.activeElement)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    var sc = dlg.querySelector('.fwd-scroll');
    sc.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' || !(e.target.closest && e.target.closest('.fwd-stage'))) { swipeX = null; return; }
      swipeX = e.clientX;
      swipeY = e.clientY;
    });
    sc.addEventListener('pointerup', function (e) {
      if (swipeX == null) return;
      var dx = e.clientX - swipeX, dy = e.clientY - swipeY;
      swipeX = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    });
    sc.addEventListener('pointercancel', function () { swipeX = null; });
  }
  function attack(b) {
    if (!cur || !cur.atk) return;
    var img = b.querySelector('img');
    clearTimeout(atkT);
    img.src = IMG + cur.atk;
    b.classList.add('is-atk');
    atkT = setTimeout(function () {
      img.src = IMG + cur.idle;
      b.classList.remove('is-atk');
    }, 2400);
  }
  function preload(c) {
    if (!c) return;
    var i = new Image();
    i.src = IMG + (c.kind === 'party' ? c.idle : c.img);
  }
  function show(c, dir) {
    cur = c;
    clearTimeout(atkT);
    var w = worldOf(data, c), still = reduced();
    dlg.style.setProperty('--wc', w.color);
    dlg.querySelector('.fwd-bg').style.backgroundImage = 'url(' + IMG + w.bg + ')';
    var inner = dlg.querySelector('.fwd-in');
    inner.innerHTML = FW.detail(data, c, still);
    dlg.querySelector('.fwd-scroll').scrollTop = 0;
    var i = order.indexOf(c);
    dlg.querySelector('.fwd-count').textContent = (i + 1) + ' / ' + order.length;
    dlg.classList.toggle('fwd-solo', order.length < 2);
    if (!still && dir) {
      inner.classList.remove('fwd-go-l', 'fwd-go-r');
      void inner.offsetWidth;
      inner.classList.add(dir > 0 ? 'fwd-go-r' : 'fwd-go-l');
    }
    preload(order[(i + 1) % order.length]);
    preload(order[(i - 1 + order.length) % order.length]);
  }
  function open(id, push) {
    var c = ix && ix.byId[id];
    if (!c) return;
    if (!dlg) build();
    order = FW.order(data, state.tab, state.sort, state.q);
    if (order.indexOf(c) === -1) order = FW.order(data, c.kind, 'world', '');
    var was = !dlg.hidden;
    if (!was) {
      lastFocus = document.activeElement;
      dlg.hidden = false;
      document.documentElement.classList.add('fwd-on');
      if (!reduced()) {
        dlg.classList.remove('fwd-pop');
        void dlg.offsetWidth;
        dlg.classList.add('fwd-pop');
      }
    }
    show(c, 0);
    if (push && !was) {
      history.pushState({ fw: 1 }, '', '#' + id);
      pushed = true;
    } else if (location.hash !== '#' + id) history.replaceState(history.state, '', '#' + id);
    if (!was) dlg.querySelector('.fwd-back').focus();
  }
  function hide() {
    if (!dlg || dlg.hidden) return;
    clearTimeout(atkT);
    dlg.hidden = true;
    document.documentElement.classList.remove('fwd-on');
    var back = cur && mount.querySelector('.fw-card[data-id="' + cur.id + '"]');
    if (back) back.focus();
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
    cur = null;
  }
  function close() {
    if (pushed) {
      pushed = false;
      history.back();
      return;
    }
    history.replaceState(history.state, '', location.pathname + location.search);
    hide();
  }
  function step(d) {
    if (!cur || order.length < 2) return;
    var i = order.indexOf(cur);
    var c = order[(i + d + order.length) % order.length];
    show(c, d);
    history.replaceState(history.state, '', '#' + c.id);
  }
  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id && ix && ix.byId[id]) {
      var c = ix.byId[id];
      if (state.tab !== c.kind && (!dlg || dlg.hidden)) { state.tab = c.kind; render(); }
      open(id, false);
    } else {
      pushed = false;
      hide();
    }
  }
  window.addEventListener('popstate', fromHash);
  window.addEventListener('hashchange', fromHash);

  fetch('/fnaf-world/characters.json').then(function (r) {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function (d) {
    data = d;
    ix = index(d);
    root.classList.add('fw-ready');
    render();
    if (location.hash.length > 1) fromHash();
  }).catch(function () {
    var p = document.createElement('p');
    p.className = 'fw-none';
    p.textContent = 'The character details could not load. Refresh the page to try again.';
    mount.insertBefore(p, mount.firstChild);
  });
})(typeof window !== 'undefined' ? window : this);
