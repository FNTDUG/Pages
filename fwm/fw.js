(function (g) {
  var FW = g.FW || (g.FW = {});
  var DATA = 'https://raw.githubusercontent.com/FNTDUG/characters.json/main/fnafworld.json';
  var LISTS = [['party', 'party'], ['bosses', 'boss'], ['enemies', 'enemy'], ['npcs', 'npc'], ['bytes', 'byte'], ['chips', 'chip'], ['armor', 'armor']];
  var GROUPS = { byte: 'bytes', chip: 'chips', armor: 'armor' };
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
  var GAME_ORDER = ["Five Nights at Freddy's", "Five Nights at Freddy's 2", "Five Nights at Freddy's 3", "Five Nights at Freddy's 4", "Five Nights at Freddy's 4: Halloween Edition", 'FNaF World'];
  var KIND = { party: 'Party member', boss: 'Boss', enemy: 'Enemy', npc: 'NPC', byte: 'Byte', chip: 'Chip', armor: 'Mendo-Armor', move: 'Move', grind: 'Grind method' };
  var HEART = '<path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/>';
  var SHIELD = '<path d="M0 0h7v4H6v1H5v1H4v1H3V6H2V5H1V4H0z"/>';
  var TIER_TABS = [['party', 'party', 'Party'], ['moves', 'move', 'Moves'], ['bytes', 'byte', 'Bytes'], ['chips', 'chip', 'Chips'], ['armor', 'armor', 'Mendo-Armor']];
  var TIERS = [{ id: 's', name: 'S', color: '#ff4d6a' }, { id: 'a', name: 'A', color: '#ff9a2e' }, { id: 'b', name: 'B', color: '#ffd93b' }, { id: 'c', name: 'C', color: '#5ccf4f' }, { id: 'd', name: 'D', color: '#4fb4ff' }];
  var COIN = '<path d="M2 0h3v1h1v1h1v3H6v1H5v1H2V6H1V5H0V2h1V1h1zm1 2v3h1V2z"/>';

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
    if (c.world) return [c.world];
    return c.worlds || [];
  }
  function hpOf(c) {
    if (c.kind === 'byte' || c.kind === 'armor') return num(c.price);
    if (c.kind === 'party') return num(c.health);
    if (!c.health) return null;
    return num(c.health.normal != null ? c.health.normal : c.health.hard);
  }
  function slug(s) {
    return String(s || '').toLowerCase().replace(/&/g, 'and').replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x';
  }
  function gameOf(c) {
    return c.game || 'FNaF World';
  }
  function index(data) {
    if (data._ix) return data._ix;
    var ix = { world: {}, group: { byte: {}, chip: {}, armor: {} }, byId: {}, tabs: { party: [], boss: [], enemy: [], npc: [], byte: [], chip: [], armor: [], move: [], grind: [] } };
    (data.worlds || []).forEach(function (w, i) { w.i = i; ix.world[w.name] = w; });
    Object.keys(GROUPS).forEach(function (k) {
      ((data.groups || {})[GROUPS[k]] || []).forEach(function (gr, i) { gr.i = i; ix.group[k][gr.name] = gr; });
    });
    LISTS.forEach(function (l) {
      (data[l[0]] || []).forEach(function (c) {
        if (!c || !c.name) return;
        c.kind = l[1];
        if (!c.id) c.id = slug(c.name);
        while (ix.byId[c.id] && ix.byId[c.id] !== c) c.id += '-' + l[1];
        ix.byId[c.id] = c;
        ix.tabs[l[1]].push(c);
      });
    });
    var users = {};
    ['party', 'boss', 'enemy'].forEach(function (k) {
      ix.tabs[k].forEach(function (c) { (c.attacks || []).forEach(function (n) { (users[n] = users[n] || []).push(c); }); });
    });
    Object.keys(data.attacks || {}).forEach(function (n) {
      var a = data.attacks[n] || {}, c = { name: n, kind: 'move', icon: a.icon, hex: a.hex, color: a.color, type: a.type, description: a.description, damage: a.damage, users: users[n] || [] };
      c.world = c.users[0] && worldsOf(c.users[0])[0];
      c.id = slug(n);
      while (ix.byId[c.id]) c.id += '-move';
      ix.byId[c.id] = c;
      ix.tabs.move.push(c);
    });
    data._ix = ix;
    return ix;
  }
  function worldOf(data, c) {
    var ix = index(data), w = worldsOf(c)[0];
    return (w && ix.world[w]) || data.worlds[0] || { name: '', color: '#ffce1f', i: 99 };
  }
  function groupOf(data, c) {
    var gs = index(data).group[c.kind];
    return gs && c.group ? gs[c.group] || null : null;
  }
  function colorOf(data, c) {
    if (c.kind === 'move') return c.hex || '#5b6894';
    var gr = groupOf(data, c);
    return gr && gr.color ? gr.color : worldOf(data, c).color;
  }
  function byName(a, b) {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
  }
  function match(c, q) {
    if (!q) return true;
    q = q.toLowerCase();
    var extra = c.kind === 'party' ? (c.attacks || []).join(' ') + ' ' + gameOf(c) : (c.group || '') + ' ' + (c.effect || '');
    return (c.name + ' ' + worldsOf(c).join(' ') + ' ' + extra).toLowerCase().indexOf(q) !== -1;
  }

  FW.groups = function (data, tab, sort, q) {
    var ix = index(data), items = ix.tabs[tab].filter(function (c) { return match(c, q); });
    if (sort === 'game' && tab !== 'party') sort = 'world';
    if (sort === 'group' && !GROUPS[tab]) sort = 'world';
    if (sort === 'price') {
      items = items.slice().sort(function (a, b) {
        var x = num(a.price), y = num(b.price);
        if (x == null && y == null) return byName(a, b);
        if (x == null) return 1;
        if (y == null) return -1;
        return x - y || byName(a, b);
      });
      return items.length ? [{ key: 'price', title: 'Cheapest first', items: items }] : [];
    }
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
      var gr = sort === 'group' ? groupOf(data, c) : null;
      var k = sort === 'game' ? gameOf(c) : sort === 'group' ? (gr ? gr.name : c.group || 'Other') : worldOf(data, c).name;
      if (!map[k]) { map[k] = { key: k, items: [] }; out.push(map[k]); }
      map[k].items.push(c);
    });
    out.forEach(function (gr) {
      if (sort === 'game') {
        gr.title = gr.key;
        gr.rank = GAME_ORDER.indexOf(gr.key) === -1 ? 50 : GAME_ORDER.indexOf(gr.key);
      } else if (sort === 'group') {
        var g2 = ix.group[tab][gr.key], w0 = worldsOf(gr.items[0])[0], same = gr.items.every(function (c) { return worldsOf(c)[0] === w0; });
        gr.title = gr.key;
        gr.color = g2 && g2.color;
        gr.icon = g2 && g2.icon;
        gr.world = same && ix.world[w0] ? { name: gr.key, color: gr.color || ix.world[w0].color, background: ix.world[w0].background } : { name: gr.key, color: gr.color || '#ffce1f' };
        gr.rank = g2 ? g2.i : 99;
      } else {
        var w = ix.world[gr.key] || worldOf(data, gr.items[0]);
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

  function firstOf(c) {
    return c.kind === 'party' ? c.idle || '' : /^(boss|enemy|npc|byte|armor|grind)$/.test(c.kind) ? c.image || '' : '';
  }
  function artImg(c, src, attrs) {
    var f = firstOf(c);
    if (f) return '<img data-still="' + esc(f) + '"' + attrs + '>';
    return src ? '<img src="' + esc(src) + '"' + attrs + '>' : '';
  }

  FW.card = function (data, c) {
    var hp = hpOf(c), gr = groupOf(data, c), art = (c.kind === 'chip' && gr ? gr.icon : '') || (c.kind === 'move' ? c.icon : '');
    var h = '<li><a class="fw-card fw-card--' + c.kind + '" href="' + (FW.linkBase ? esc(FW.linkBase + encodeURIComponent(c.id)) : '#' + esc(c.id)) + '" data-id="' + esc(c.id) + '" data-google-vignette="false" style="--wc:' + esc(colorOf(data, c)) + '">';
    h += '<span class="fw-card-art">' + artImg(c, art, ' alt="" loading="lazy" decoding="async"') + '</span>';
    if (c.kind === 'byte' || c.kind === 'armor') {
      if (hp === 0) h += '<span class="fw-card-hp fw-card-cost" title="Price">Free</span>';
      else if (hp != null) h += '<span class="fw-card-hp fw-card-cost" title="Price"><svg viewBox="0 0 7 7" aria-hidden="true" focusable="false">' + COIN + '</svg>' + fmt(hp) + '<span class="fw-sr"> Faz Tokens</span></span>';
    } else if (c.kind !== 'npc' && c.kind !== 'chip' && c.kind !== 'move' && c.kind !== 'grind') h += '<span class="fw-card-hp" title="Health"><svg viewBox="0 0 7 6" aria-hidden="true" focusable="false">' + HEART + '</svg>' + (hp == null ? '?' : fmt(hp)) + '<span class="fw-sr"> health</span></span>';
    if (c.tier && ROMAN[c.tier]) h += '<span class="fw-card-no"><span class="fw-sr">Tier </span>' + ROMAN[c.tier] + '</span>';
    h += '<span class="fw-card-name">' + esc(c.name) + '</span></a></li>';
    return h;
  };

  FW.grid = function (data, tab, sort, q) {
    var gs = FW.groups(data, tab, sort, q);
    if (!gs.length) return '<p class="fw-none">Nothing matches that search.</p>';
    return gs.map(function (gr) {
      var w = gr.world, col = w ? w.color : '#ffce1f';
      var h = '<section class="fw-sec" style="--wc:' + col + '">';
      h += '<h2 class="fw-sec-h">' + (w && w.background ? '<span class="fw-sec-bg" style="background-image:url(&quot;' + esc(w.background) + '&quot;)"></span>' : '') + '<span class="fw-sec-t">' + esc(gr.title) + '</span><span class="fw-sec-n">' + gr.items.length + '</span></h2>';
      h += '<ul class="fw-grid">' + gr.items.map(function (c) { return FW.card(data, c); }).join('') + '</ul></section>';
      return h;
    }).join('');
  };

  function panel(title, body) {
    return '<section class="fwd-panel"><h3 class="fwd-h">' + title + '</h3>' + body + '</section>';
  }
  function movesPanel(data, c) {
    if (!c.attacks || !c.attacks.length) return '';
    return panel('Moves', '<ul class="fwd-atks">' + c.attacks.map(function (n) {
      var a = (data.attacks || {})[n] || {};
      var li = '<li class="fwd-atk" style="--c:' + esc(a.hex || '#888') + '">';
      li += a.icon ? '<img src="' + esc(a.icon) + '" alt="" width="214" height="50" loading="lazy" decoding="async">' : '';
      li += '<div class="fwd-atk-b"><p class="fwd-atk-n">' + esc(n) + (a.type ? ' <span class="fwd-tag">' + esc(a.type) + '</span>' : '') + '</p>';
      if (a.description) li += '<p class="fwd-atk-d">' + esc(a.description) + '</p>';
      if (a.damage) li += '<p class="fwd-atk-f">Damage: <code>' + esc(a.damage) + '</code></p>';
      return li + '</div></li>';
    }).join('') + '</ul>');
  }

  function specDetail(data, c, still, extra) {
    var ix = index(data), w = worldOf(data, c), gr = groupOf(data, c), chip = c.kind === 'chip', armor = c.kind === 'armor';
    var src = chip ? (gr && gr.icon) : c.image;
    var h = '<div class="fwd-stage"><div class="fwd-char-wrap"><div class="fwd-char' + (chip ? ' fwd-char--chip' : armor ? ' fwd-char--armor' : ' fwd-char--byte') + '">';
    if (still && !chip) h += artImg(c, src, ' class="fwd-anim" alt="' + esc(c.name) + '" decoding="async"');
    else if (src) h += '<img class="fwd-anim" src="' + esc(src) + '" alt="' + esc(c.name) + '" decoding="async">';
    h += '</div><span class="fwd-ground" aria-hidden="true"></span></div>';
    if (chip && c.image) h += '<img class="fwd-banner" src="' + esc(c.image) + '" alt="" width="400" height="100" decoding="async">';
    h += '</div><div class="fwd-info">';
    h += '<p class="fwd-kicker">' + (chip ? esc(c.group || '') + ' chip' : (armor ? KIND.armor : 'Byte') + (c.tier ? ' &middot; Tier ' + esc(c.tier) : c.group ? ' &middot; ' + esc(c.group) : '')) + '</p>';
    h += '<h2 class="fwd-name" id="fwd-name">' + esc(c.name) + '</h2><div class="fwd-chips">';
    worldsOf(c).forEach(function (k) {
      var ww = ix.world[k];
      if (ww) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + ww.color + '">' + esc(ww.name) + '</span>';
    });
    if (gr) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + esc(gr.color || '#2b3870') + '">' + esc(gr.name) + '</span>';
    h += '</div>' + (extra || '');
    if (armor && num(c.defense) != null) {
      var df = num(c.defense);
      h += '<section class="fwd-panel fwd-stat"><svg class="fwd-heart fwd-shield" viewBox="0 0 7 7" aria-hidden="true" focusable="false">' + SHIELD + '</svg><div class="fwd-stat-b"><p class="fwd-stat-l">Defense</p>';
      h += '<p class="fwd-stat-v">+' + fmt(df) + '</p></div></section>';
    }
    if ((c.kind === 'byte' || armor) && num(c.price) != null) {
      var pr = num(c.price);
      h += '<section class="fwd-panel fwd-stat"><svg class="fwd-heart fwd-coin" viewBox="0 0 7 7" aria-hidden="true" focusable="false">' + COIN + '</svg><div class="fwd-stat-b"><p class="fwd-stat-l">Price <span>in Faz Tokens</span></p>';
      h += '<p class="fwd-stat-v">' + (pr === 0 ? 'Free' : fmt(pr)) + '</p></div></section>';
    }
    if (c.effect) h += panel('What it does', '<p>' + esc(c.effect) + '</p>');
    if (c.unlock) h += panel(chip ? 'Where to find it' : 'How to get', '<p>' + esc(c.unlock) + '</p>');
    if (gr && gr.about) h += panel('About ' + esc(gr.name) + (chip ? ' chips' : ''), '<p>' + esc(gr.about) + '</p>');
    if (w.about && worldsOf(c).length) h += panel('About ' + esc(w.name), '<p>' + esc(w.about) + '</p>');
    return h + '</div>';
  }

  function moveDetail(data, c, extra) {
    var h = '<div class="fwd-stage"><div class="fwd-char-wrap"><div class="fwd-char fwd-char--move">';
    if (c.icon) h += '<img class="fwd-anim" src="' + esc(c.icon) + '" alt="' + esc(c.name) + '" decoding="async">';
    h += '</div></div></div><div class="fwd-info">';
    h += '<p class="fwd-kicker">' + KIND.move + (c.type ? ' &middot; ' + esc(c.type) : '') + '</p>';
    h += '<h2 class="fwd-name" id="fwd-name">' + esc(c.name) + '</h2><div class="fwd-chips">';
    if (c.color) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + esc(colorOf(data, c)) + '">' + esc(c.color) + '</span>';
    h += '<span class="fwd-chip">' + c.users.length + (c.users.length === 1 ? ' character has it' : ' characters have it') + '</span>';
    h += '</div>' + (extra || '');
    if (c.description) h += panel('What it does', '<p>' + esc(c.description) + '</p>');
    if (c.damage) h += panel('Damage', '<p class="fwd-atk-f"><code>' + esc(c.damage) + '</code></p>');
    if (c.users.length) h += panel('Who has it', '<ul class="fwd-users">' + c.users.map(function (u) {
      return '<li><a href="#' + esc(u.id) + '" data-id="' + esc(u.id) + '" data-google-vignette="false" style="--wc:' + esc(colorOf(data, u)) + '">' + artImg(u, '', ' alt="" loading="lazy" decoding="async"') + esc(u.name) + '</a></li>';
    }).join('') + '</ul>');
    return h + '</div>';
  }

  FW.looks = function (c) {
    var l = [{ name: 'Default', idle: c.idle, attack: c.attackAnimation, overworld: c.overworld, credits: c.credits }];
    (c.skins || []).forEach(function (s) { if (s && s.name && (s.idle || s.overworld)) l.push(s); });
    return l;
  };
  function creditRows(cr) {
    var h = '';
    if (cr && typeof cr === 'object') Object.keys(cr).forEach(function (k) {
      var v = [].concat(cr[k]).filter(Boolean);
      if (v.length) h += '<div class="fwd-cr-r"><dt>' + esc(k.charAt(0).toUpperCase() + k.slice(1)) + '</dt><dd>' + v.map(esc).join(', ') + '</dd></div>';
    });
    return h;
  }
  function creditBox(cr) {
    var r = creditRows(cr);
    return '<section class="fwd-panel fwd-cr"' + (r ? '' : ' hidden') + '><h3 class="fwd-h">Credits</h3><dl>' + r + '</dl></section>';
  }
  function lookBar(c) {
    var l = FW.looks(c), h = '';
    if (l.some(function (s) { return s.overworld; })) h += '<div class="fwd-view" role="group" aria-label="View"><span class="fwd-view-k" aria-hidden="true"></span><button type="button" class="fwd-seg" data-view="battle" aria-pressed="true">Battle</button><button type="button" class="fwd-seg" data-view="overworld" aria-pressed="false"' + (l[0].overworld ? '' : ' disabled') + '>Overworld</button></div>';
    if (l.length > 1) h += '<button type="button" class="fwd-skins" aria-haspopup="dialog">Skins<span class="fwd-skins-n">' + l.length + '</span></button>';
    return h;
  }

  function grindDetail(data, c, still) {
    var ix = index(data), m = c.method, f = c.foe, alt = f ? f.name : c.name;
    var h = '<div class="fwd-stage"><div class="fwd-char-wrap"><div class="fwd-char">';
    if (c.image) h += still ? artImg(c, c.image, ' class="fwd-anim" alt="' + esc(alt) + '" decoding="async"') : '<img class="fwd-anim" src="' + esc(c.image) + '" alt="' + esc(alt) + '" decoding="async">';
    h += '</div><span class="fwd-ground" aria-hidden="true"></span></div></div><div class="fwd-info">';
    h += '<p class="fwd-kicker">' + KIND.grind + (m.kicker ? ' &middot; ' + esc(m.kicker) : '') + '</p>';
    h += '<h2 class="fwd-name" id="fwd-name">' + esc(c.name) + '</h2><div class="fwd-chips">';
    worldsOf(c).forEach(function (k) {
      var ww = ix.world[k];
      if (ww) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + ww.color + '">' + esc(ww.name) + '</span>';
    });
    if (f) h += '<a class="fwd-chip fwd-chip-a" href="/fwm/roster#' + esc(f.id) + '">' + esc(f.name) + '</a>';
    h += '</div>';
    var rw = (m.rewards || []).filter(function (r) { return r && r.name; });
    var modes = [['normal', 'Normal'], ['hard', 'Hard']].filter(function (md) { return rw.some(function (r) { return r[md[0]] != null && r[md[0]] !== ''; }); });
    if (rw.length && modes.length) {
      var t = '<table class="fwd-tbl"><thead><tr><th scope="col"><span class="fw-sr">Reward</span></th>' + modes.map(function (md) { return '<th scope="col">' + md[1] + '</th>'; }).join('') + '</tr></thead><tbody>';
      rw.forEach(function (r) {
        t += '<tr><th scope="row">' + esc(r.name) + '</th>' + modes.map(function (md) { return '<td>' + esc(r[md[0]] == null || r[md[0]] === '' ? '?' : fmt(r[md[0]])) + '</td>'; }).join('') + '</tr>';
      });
      h += panel('Rewards per win', t + '</tbody></table>');
    }
    (m.sections || []).forEach(function (sc) {
      if (!sc || !sc.title) return;
      var b = '';
      if (sc.text) b += '<p>' + esc(sc.text) + '</p>';
      if (sc.steps && sc.steps.length) b += '<ol class="fwd-steps">' + sc.steps.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
      if (sc.rows && sc.rows.length) b += '<ul class="fwd-rows">' + sc.rows.map(function (r) {
        var ww = ix.world[r.world];
        return '<li><span class="fwd-chip' + (ww ? ' fwd-chip-w" style="--wc:' + esc(ww.color) : '') + '">' + esc(r.label || '') + '</span><p>' + (ww ? '<span class="fwd-row-w">' + esc(ww.name) + '</span>' : '') + esc(r.text || '') + '</p></li>';
      }).join('') + '</ul>';
      if (b) h += panel(esc(sc.title), b);
    });
    if (f && f.about) h += panel('About ' + esc(f.name), '<p>' + esc(f.about) + '</p>');
    return h + '</div>';
  }
  FW.grinds = function (data) {
    var l = index(data).tabs.grind;
    if (!l.length) return '<p class="fw-none">No grind methods yet.</p>';
    return '<ul class="fw-grid fw-grind-grid">' + l.map(function (c) { return FW.card(data, c); }).join('') + '</ul>';
  };
  FW.addGrinds = function (data, g) {
    var ix = index(data);
    ix.tabs.grind = [];
    ((g && g.methods) || []).forEach(function (m) {
      if (!m || !m.name) return;
      var f = m.boss ? ix.byId[slug(m.boss)] || null : null;
      if (f && f.kind !== 'boss' && f.kind !== 'enemy') f = null;
      var c = { kind: 'grind', name: m.name, method: m, foe: f, image: m.image || (f && f.image) || '', worlds: m.world ? [m.world] : f ? worldsOf(f) : [] };
      c.id = m.id || slug(m.name);
      while (ix.byId[c.id]) c.id += '-grind';
      ix.byId[c.id] = c;
      ix.tabs.grind.push(c);
    });
  };

  FW.detail = function (data, c, still, extra) {
    if (c.kind === 'grind') return grindDetail(data, c, still);
    if (c.kind === 'move') return moveDetail(data, c, extra);
    if (GROUPS[c.kind]) return specDetail(data, c, still, extra);
    var ix = index(data), w = worldOf(data, c), party = c.kind === 'party';
    var anim = party && c.attackAnimation && !still;
    var src = party ? c.idle : c.image;
    var h = '<div class="fwd-stage">';
    h += '<div class="fwd-char-wrap">';
    if (anim) h += '<button type="button" class="fwd-char" aria-label="Play ' + esc(c.name) + '\'s move animation">';
    else h += '<div class="fwd-char">';
    h += still ? artImg(c, src, ' class="fwd-anim" alt="' + esc(c.name) + '" decoding="async"') : '<img class="fwd-anim" src="' + esc(src) + '" alt="' + esc(c.name) + '" decoding="async">';
    h += anim ? '</button>' : '</div>';
    h += '<span class="fwd-ground" aria-hidden="true"></span></div>';
    if (c.quote) h += '<p class="fwd-quote">&ldquo;' + esc(c.quote) + '&rdquo;</p>';
    if (anim) h += '<p class="fwd-hint">Tap them to see a move</p>';
    if (party) h += lookBar(c);
    h += '</div><div class="fwd-info">';
    h += '<p class="fwd-kicker">' + KIND[c.kind] + '</p>';
    h += '<h2 class="fwd-name" id="fwd-name">' + esc(c.name) + '</h2><div class="fwd-chips">';
    worldsOf(c).forEach(function (k) {
      var ww = ix.world[k];
      if (ww) h += '<span class="fwd-chip fwd-chip-w" style="--wc:' + ww.color + '">' + esc(ww.name) + '</span>';
    });
    if (party) h += '<span class="fwd-chip">From ' + esc(gameOf(c)) + '</span>';
    h += '</div>' + (extra || '');
    if (party) {
      var hp = num(c.health);
      h += '<section class="fwd-panel fwd-stat"><svg class="fwd-heart" viewBox="0 0 7 6" aria-hidden="true" focusable="false"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg><div class="fwd-stat-b"><p class="fwd-stat-l">Health</p>';
      h += '<p class="fwd-stat-v">' + (hp == null ? '?' : fmt(hp)) + '</p>';
      if (hp == null) h += '<p class="fwd-stat-note">Not known yet.</p>';
      h += '</div></section>';
      h += movesPanel(data, c);
      h += creditBox(c.credits);
      if (c.unlock) h += panel('How to get', '<p>' + esc(c.unlock) + '</p>');
    } else if (c.kind !== 'npc') {
      var rows = '';
      var hs = c.health || {}, at = c.attack || {};
      var modes = [['normal', 'Normal'], ['hard', 'Hard']].filter(function (m) { return [hs[m[0]], at[m[0]]].some(function (v) { return v != null && v !== ''; }); });
      if (modes.length) {
        var cells = function (o) { return modes.map(function (m) { return '<td>' + esc(fmt(o[m[0]])) + '</td>'; }).join(''); };
        rows += '<table class="fwd-tbl"><thead><tr><th scope="col"><span class="fw-sr">Stat</span></th>' + modes.map(function (m) { return '<th scope="col">' + m[1] + '</th>'; }).join('') + '</tr></thead><tbody>';
        rows += '<tr><th scope="row">Health</th>' + cells(hs) + '</tr>';
        rows += '<tr><th scope="row">Attack</th>' + cells(at) + '</tr></tbody></table>';
      } else rows = '<p class="fwd-stat-note">Stats aren\'t known for this one yet.</p>';
      h += panel('Stats', rows) + movesPanel(data, c);
    }
    if (!party && c.credits) h += creditBox(c.credits);
    var about = '';
    if (c.about) about += '<p>' + esc(c.about) + '</p>';
    if (c.tips) about += '<h3 class="fwd-h fwd-h2">Tips</h3><p>' + esc(c.tips) + '</p>';
    if (about) h += panel('About', about);
    if (w.about && worldsOf(c).length) h += panel('About ' + esc(w.name), '<p>' + esc(w.about) + '</p>');
    return h + '</div>';
  };

  function pick(data, kind, v) {
    var n = String(v && typeof v === 'object' ? v.name || '' : v || '').trim().toLowerCase();
    if (!n) return null;
    var list = index(data).tabs[kind] || [];
    for (var i = 0; i < list.length; i++) if (list[i].name.toLowerCase() === n || list[i].id === n) return list[i];
    return null;
  }
  function slot(data, kind, v) {
    var c = pick(data, kind, v), name = v && typeof v === 'object' ? v.name : v;
    var h = c ? FW.card(data, c) : '<li><span class="fw-card fw-card--empty"><span class="fw-card-art"></span><span class="fw-card-name">' + (name ? esc(name) : 'Empty') + '</span></span></li>';
    if (v && v.caption) h = h.slice(0, -5) + '<span class="fw-slot-cap">' + esc(v.caption) + '</span></li>';
    return h;
  }
  function part(data, title, kind, list) {
    var items = (list || []).slice(0, 4);
    while (items.length < 4) items.push('');
    return '<div class="fw-team-part fw-team-part--' + kind + '"><h3 class="fw-team-h">' + title + '</h3><ul class="fw-grid fw-team-grid' + (kind === 'party' ? '' : ' fw-team-grid--sm') + '">' + items.map(function (v) { return slot(data, kind, v); }).join('') + '</ul></div>';
  }
  FW.pages = function (meta) {
    var ps = ((meta && meta.pages) || []).filter(function (p) { return p && p.pageTitle && p.order; });
    return ps.length ? ps : [{ pageTitle: 'Meta Teams', order: Object.keys((meta && meta.metas) || {}) }];
  };
  function teamWorld(data, t) {
    var ix = index(data), want = String(t.world || '').trim().toLowerCase(), n = {}, best = null;
    for (var k in ix.world) if (k.toLowerCase() === want) return ix.world[k];
    (t.party1 || []).concat(t.party2 || []).forEach(function (v) {
      var c = pick(data, 'party', v), w = c && worldOf(data, c);
      if (!w || !w.name) return;
      n[w.name] = (n[w.name] || 0) + 1;
      if (!best || n[w.name] > n[best.name]) best = w;
    });
    return best || data.worlds[0];
  }
  FW.team = function (data, name, t) {
    var w = teamWorld(data, t);
    var h = '<section class="fw-sec fw-team" style="--wc:' + esc(w.color) + '">';
    h += '<h2 class="fw-sec-h">' + (w.background ? '<span class="fw-sec-bg" style="background-image:url(&quot;' + esc(w.background) + '&quot;)"></span>' : '') + '<span class="fw-sec-t">' + esc(name) + '</span></h2>';
    if (t.caption) h += '<p class="fw-team-cap">' + esc(t.caption) + '</p>';
    h += '<div class="fw-team-body">' + part(data, 'Party 1', 'party', t.party1) + part(data, 'Party 2', 'party', t.party2) + part(data, 'Bytes', 'byte', t.bytes) + part(data, 'Chips', 'chip', t.chips) + '</div>';
    if (t.notes) h += '<p class="fw-team-note">' + esc(t.notes) + '</p>';
    return h + '</section>';
  };
  FW.teams = function (data, meta, page) {
    var m = (meta && meta.metas) || {}, ps = FW.pages(meta), p = ps[page] || ps[0];
    var names = p.order.filter(function (n) { return m[n]; });
    if (!names.length) return '<p class="fw-none">No teams here yet.</p>';
    return names.map(function (n) { return FW.team(data, n, m[n]); }).join('');
  };

  function tierRows(tl) {
    return tl && tl.tiers && tl.tiers.length ? tl.tiers : TIERS;
  }
  function slotName(v) {
    return String(v && typeof v === 'object' ? v.name || '' : v || '').trim().toLowerCase();
  }
  FW.tierTabs = function (tl) {
    var ls = (tl && tl.lists) || {};
    return TIER_TABS.filter(function (t) { return ls[t[0]]; });
  };
  FW.tierCount = function (tl, key) {
    var l = ((tl && tl.lists) || {})[key] || {}, n = 0;
    tierRows(tl).forEach(function (t) { n += (l[t.id] || []).length; });
    return n;
  };
  FW.tierOf = function (tl, c) {
    var want = c.name.toLowerCase(), out = null;
    FW.tierTabs(tl).forEach(function (tt) {
      if (out || tt[1] !== c.kind) return;
      var l = tl.lists[tt[0]] || {}, ms = (tl.msg || {})[tt[0]] || {};
      tierRows(tl).forEach(function (t) {
        if (out || !(l[t.id] || []).some(function (v) { return slotName(v) === want || slotName(v) === c.id; })) return;
        out = { tier: t, msg: '' };
        for (var k in ms) if (k.toLowerCase() === want) out.msg = ms[k];
      });
    });
    return out;
  };
  FW.tierPanel = function (tl, c) {
    var r = FW.tierOf(tl, c);
    if (!r) return '';
    var n = r.tier.name || r.tier.id;
    return '<section class="fwd-panel fwd-stat fwd-tierp" style="--tc:' + esc(r.tier.color || '#ffce1f') + '"><span class="fwd-tier-b" aria-hidden="true">' + esc(n) + '</span><div class="fwd-stat-b"><p class="fwd-stat-l">' + esc(n) + ' tier</p>' + (r.msg ? '<p class="fwd-tier-m">' + esc(r.msg) + '</p>' : '') + '</div></section>';
  };
  FW.tiers = function (data, tl, key) {
    var tt = FW.tierTabs(tl).filter(function (t) { return t[0] === key; })[0];
    if (!tt) return '<p class="fw-none">Nothing ranked here yet.</p>';
    var l = tl.lists[key] || {}, note = (tl.notes || {})[key], h = '';
    tierRows(tl).forEach(function (t) {
      var items = l[t.id] || [];
      if (!items.length) return;
      h += '<section class="fw-tier" style="--tc:' + esc(t.color || '#ffce1f') + '"><h2 class="fw-tier-h"><span class="fw-tier-l">' + esc(t.name || t.id) + '</span><span class="fw-sr"> tier</span></h2>';
      h += '<ul class="fw-grid fw-tier-grid fw-tier-grid--' + tt[1] + '">' + items.map(function (v) { return slot(data, tt[1], v); }).join('') + '</ul></section>';
    });
    if (!h) return '<p class="fw-none">Nothing ranked here yet.</p>';
    return (note ? '<p class="fw-tier-note">' + esc(note) + '</p>' : '') + h;
  };

  if (typeof document === 'undefined') return;
  var root = document.getElementById('fw');
  if (!root) return;
  var mount = root.querySelector('.fw-grids'), tabs = root.querySelectorAll('.fw-tab'), sortBtn = root.querySelector('.fw-sort'), menu = root.querySelector('.fw-menu'), sortVal = root.querySelector('.fw-sort-v'), qEl = root.querySelector('.fw-q');
  var firstTab = tabs[0] && tabs[0].getAttribute('data-tab'), tierMode = !!root.getAttribute('data-tiers'), grindMode = !!root.getAttribute('data-grind'), metaSrc = root.getAttribute('data-meta') || root.getAttribute('data-tiers') || root.getAttribute('data-grind'), meta = null, scope = null;
  var baseSort = root.getAttribute('data-sort') || 'world';
  var data = null, ix = null, state = { tab: firstTab || (metaSrc ? '0' : 'party'), sort: baseSort, q: '' };
  var activeOpt = null, stills = {};
  var dlg = null, cur = null, order = [], pushed = false, lastFocus = null, atkT = 0, swipeX = null, swipeY = 0, qT = 0, lookI = 0, view = 'battle';
  var listBase = !metaSrc && root.hasAttribute('data-pages') ? root.getAttribute('data-pages') : '';
  var pageMatch = listBase && location.pathname.indexOf(listBase) === 0 ? location.pathname.slice(listBase.length).replace(/\/+$/, '') : '';
  var pageId = pageMatch ? decodeURIComponent(pageMatch) : '', isPage = !!pageId, RET = 'fw-ret' + listBase;
  if (listBase && !isPage) FW.linkBase = listBase;
  function pageUrl(c) { return listBase + encodeURIComponent(c.id); }
  function retGet() { try { return JSON.parse(sessionStorage.getItem(RET) || 'null'); } catch (e) { return null; } }
  function retSet() { try { sessionStorage.setItem(RET, JSON.stringify({ tab: state.tab, sort: state.sort, q: state.q, y: window.scrollY || window.pageYOffset || 0 })); } catch (e) {} }
  function reduced() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }

  var firsts = {};
  function firstFrame(url) {
    if (!firsts[url]) firsts[url] = grabFirst(url).catch(function () {
      return grabFirst(url + (url.indexOf('?') < 0 ? '?' : '&') + 'still=1');
    });
    return firsts[url];
  }
  function grabFirst(url) {
    return new Promise(function (ok, no) {
      var im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = function () {
        try {
          var w = im.naturalWidth, h = im.naturalHeight, cv = document.createElement('canvas');
          cv.width = w;
          cv.height = h;
          var g = cv.getContext('2d');
          g.drawImage(im, 0, 0);
          var px = g.getImageData(0, 0, w, h).data, x0 = w, y0 = h, x1 = -1, y1 = -1;
          for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3]) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
          if (x1 < 0) return no();
          var cw = x1 - x0 + 1, ch = y1 - y0 + 1, k = Math.min(1, 220 / Math.max(cw, ch)), out = document.createElement('canvas');
          out.width = Math.round(cw * k);
          out.height = Math.round(ch * k);
          var o = out.getContext('2d');
          o.imageSmoothingQuality = 'high';
          o.drawImage(cv, x0, y0, cw, ch, 0, 0, out.width, out.height);
          out.toBlob(function (b) { if (b) ok(URL.createObjectURL(b)); else no(); }, 'image/png');
        } catch (e) { no(); }
      };
      im.onerror = no;
      im.src = url;
    });
  }
  function stillCards(box) {
    var list = box.querySelectorAll('img[data-still]:not([src])');
    function go(img) {
      var u = img.getAttribute('data-still');
      firstFrame(u).then(function (s) { img.src = s; }, function () { img.src = u; });
    }
    if (box.fwIo) box.fwIo.disconnect();
    if (!window.IntersectionObserver) { Array.prototype.forEach.call(list, go); return; }
    box.fwIo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        box.fwIo.unobserve(e.target);
        go(e.target);
      });
    }, { rootMargin: '400px' });
    Array.prototype.forEach.call(list, function (img) { box.fwIo.observe(img); });
  }

  function stillMoves() {
    Array.prototype.forEach.call(mount.querySelectorAll('.fw-card--move .fw-card-art img'), function (img) {
      var src = img.getAttribute('src');
      function put() {
        var m = stills[src];
        if (!m) {
          if (!img.naturalWidth) return;
          m = document.createElement('canvas');
          m.width = img.naturalWidth;
          m.height = img.naturalHeight;
          try { m.getContext('2d').drawImage(img, 0, 0); } catch (e) { return; }
          stills[src] = m;
        }
        var cv = document.createElement('canvas');
        cv.width = m.width;
        cv.height = m.height;
        cv.setAttribute('aria-hidden', 'true');
        cv.getContext('2d').drawImage(m, 0, 0);
        if (img.parentNode) img.parentNode.replaceChild(cv, img);
      }
      if (stills[src] || (img.complete && img.naturalWidth)) put();
      else img.addEventListener('load', put);
    });
  }

  function render() {
    if (!data) return;
    if (grindMode) {
      mount.innerHTML = FW.grinds(data);
      stillCards(mount);
      return;
    }
    if (meta) {
      mount.innerHTML = tierMode ? FW.tiers(data, meta, state.tab) : FW.teams(data, meta, +state.tab);
      if (tierMode) stillMoves();
      stillCards(mount);
      if (tabs.length) mount.setAttribute('aria-labelledby', 'fw-tab-' + state.tab);
      Array.prototype.forEach.call(tabs, function (t) {
        var on = t.getAttribute('data-tab') === state.tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      return;
    }
    syncSort();
    mount.innerHTML = FW.grid(data, state.tab, state.sort, state.q);
    stillCards(mount);
    mount.setAttribute('aria-labelledby', 'fw-tab-' + state.tab);
    Array.prototype.forEach.call(tabs, function (t) {
      var on = t.getAttribute('data-tab') === state.tab, n = t.querySelector('.fw-tab-n');
      if (n) n.textContent = ix.tabs[t.getAttribute('data-tab')].length;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    var ph = qEl && qEl.getAttribute('data-ph-' + state.tab), qLab = ph && root.querySelector('label[for="' + qEl.id + '"]');
    if (ph) { qEl.placeholder = ph; if (qLab) qLab.textContent = ph; }
    syncSort();
  }
  function allOpts() {
    return Array.prototype.slice.call(menu.querySelectorAll('[role="option"]'));
  }
  function opts() {
    return allOpts().filter(function (o) { return !o.hidden; });
  }
  function fits(o) {
    var t = o.getAttribute('data-tabs');
    return !t || (' ' + t + ' ').indexOf(' ' + state.tab + ' ') !== -1;
  }
  function syncSort() {
    var ok = allOpts().some(function (o) { return o.getAttribute('data-v') === state.sort && fits(o); });
    if (!ok) state.sort = baseSort;
    allOpts().forEach(function (o) {
      var v = o.getAttribute('data-v');
      o.hidden = !fits(o);
      o.setAttribute('aria-selected', v === state.sort ? 'true' : 'false');
      if (v === state.sort) sortVal.textContent = o.getAttribute('data-l');
    });
  }
  function setActive(o) {
    if (activeOpt) activeOpt.classList.remove('is-active');
    activeOpt = o || null;
    if (activeOpt) {
      activeOpt.classList.add('is-active');
      menu.setAttribute('aria-activedescendant', activeOpt.id);
    } else menu.removeAttribute('aria-activedescendant');
  }
  function openMenu() {
    syncSort();
    menu.hidden = false;
    sortBtn.setAttribute('aria-expanded', 'true');
    setActive(menu.querySelector('[aria-selected="true"]') || opts()[0]);
    menu.focus();
  }
  function closeMenu(focus) {
    if (menu.hidden) return;
    menu.hidden = true;
    sortBtn.setAttribute('aria-expanded', 'false');
    setActive(null);
    if (focus) sortBtn.focus();
  }
  function choose(o) {
    if (!o || o.hidden) return;
    state.sort = o.getAttribute('data-v');
    closeMenu(true);
    render();
  }
  function pickTab(t, focus) {
    if (!t) return;
    state.tab = t.getAttribute('data-tab');
    render();
    if (focus) t.focus();
  }

  function bindTabs() {
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
  }
  bindTabs();
  function metaTabs() {
    var wrap = root.querySelector('.fw-tabs'), ps;
    if (grindMode) ps = [];
    else if (tierMode) ps = FW.tierTabs(meta).map(function (t) { return [t[0], t[2], FW.tierCount(meta, t[0])]; });
    else ps = FW.pages(meta).map(function (p, i) { return [String(i), p.pageTitle, p.order.filter(function (n) { return meta.metas && meta.metas[n]; }).length]; });
    if (ps.length) state.tab = ps[0][0];
    if (ps.length < 2 || !wrap) {
      mount.removeAttribute('role');
      return;
    }
    wrap.innerHTML = ps.map(function (p, i) {
      return '<button type="button" role="tab" class="fw-tab" id="fw-tab-' + esc(p[0]) + '" data-tab="' + esc(p[0]) + '" aria-controls="fw-panel" aria-selected="' + (i ? 'false' : 'true') + '"' + (i ? ' tabindex="-1"' : '') + '>' + esc(p[1]) + ' <span class="fw-tab-n">' + p[2] + '</span></button>';
    }).join('');
    wrap.hidden = false;
    tabs = wrap.querySelectorAll('.fw-tab');
    bindTabs();
  }
  if (sortBtn) {
    sortBtn.addEventListener('click', function () {
      if (menu.hidden) openMenu();
      else closeMenu(true);
    });
    sortBtn.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      openMenu();
    });
    menu.addEventListener('keydown', function (e) {
      var list = opts(), i = list.indexOf(activeOpt), k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowUp') {
        e.preventDefault();
        setActive(list[(i + (k === 'ArrowDown' ? 1 : -1) + list.length) % list.length]);
      } else if (k === 'Home' || k === 'End') {
        e.preventDefault();
        setActive(list[k === 'Home' ? 0 : list.length - 1]);
      } else if (k === 'Enter' || k === ' ') {
        e.preventDefault();
        choose(activeOpt);
      } else if (k === 'Escape') {
        e.preventDefault();
        closeMenu(true);
      } else if (k === 'Tab') closeMenu(false);
    });
    menu.addEventListener('click', function (e) {
      choose(e.target.closest ? e.target.closest('[role="option"]') : null);
    });
    menu.addEventListener('pointermove', function (e) {
      var o = e.target.closest ? e.target.closest('[role="option"]') : null;
      if (o && o !== activeOpt) setActive(o);
    });
    document.addEventListener('pointerdown', function (e) {
      if (!menu.hidden && !menu.parentNode.contains(e.target)) closeMenu(false);
    });
    window.addEventListener('blur', function () { closeMenu(false); });
  }
  if (qEl) qEl.addEventListener('input', function () {
    clearTimeout(qT);
    qT = setTimeout(function () { state.q = qEl.value.trim(); render(); }, 120);
  });
  mount.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('.fw-card') : null;
    if (FW.linkBase) { if (a) retSet(); return; }
    if (!a || !data || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    scope = meta ? (tierMode || grindMode ? mount : a.closest('.fw-team')) : null;
    open(a.getAttribute('data-id'), true);
  });

  var warmed = {};
  function warm(e) {
    var a = FW.linkBase && e.target.closest ? e.target.closest('.fw-card') : null;
    if (!a || warmed[a.href]) return;
    warmed[a.href] = 1;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = a.href;
    document.head.appendChild(l);
    if (ix) preload(ix.byId[a.getAttribute('data-id')]);
  }
  mount.addEventListener('pointerover', warm);
  mount.addEventListener('touchstart', warm, { passive: true });
  mount.addEventListener('focusin', warm);

  var ICON_L = '<svg viewBox="0 0 8 12" aria-hidden="true" focusable="false"><path d="M5 0h3v2H6v2H4v1H3v2h1v1h2v2h2v2H5v-2H3V8H1V7H0V5h1V4h2V2h2z"/></svg>';
  var ICON_R = '<svg viewBox="0 0 8 12" aria-hidden="true" focusable="false"><path d="M3 0H0v2h2v2h2v1h1v2H4v1H2v2H0v2h3v-2h2V8h2V7h1V5H7V4H5V2H3z"/></svg>';
  function build() {
    dlg = document.createElement('div');
    dlg.className = 'fwd' + (isPage ? ' fwd--page' : '');
    dlg.hidden = !isPage;
    if (!isPage) {
      dlg.setAttribute('role', 'dialog');
      dlg.setAttribute('aria-modal', 'true');
      dlg.tabIndex = -1;
    }
    dlg.setAttribute('aria-labelledby', 'fwd-name');
    dlg.innerHTML = '<div class="fwd-bg"></div><div class="fwd-shade"></div><div class="fwd-scroll"><div class="fwd-in"></div></div>' +
      '<div class="fwd-sk" hidden><div class="fwd-sk-box" role="dialog" aria-modal="true" aria-labelledby="fwd-sk-t"><div class="fwd-sk-hd"><h2 class="fwd-h" id="fwd-sk-t">Skins</h2><button type="button" class="fwd-sk-x" aria-label="Close skins">&times;</button></div><ul class="fwd-sk-list"></ul></div></div>' +
      (isPage
        ? '<div class="fwd-top"><a class="fwd-btn fwd-back" href="' + esc(listBase.replace(/\/$/, '')) + '">' + ICON_L + '<span>Roster</span></a><span class="fwd-count"></span>' +
          '<a class="fwd-btn fwd-nav fwd-prev" rel="prev" aria-label="Previous">' + ICON_L + '</a>' +
          '<a class="fwd-btn fwd-nav fwd-next" rel="next" aria-label="Next">' + ICON_R + '</a></div>'
        : '<div class="fwd-top"><button type="button" class="fwd-btn fwd-back" aria-label="Back to the list">' + ICON_L + '<span aria-hidden="true">Back</span></button><span class="fwd-count" aria-live="polite"></span>' +
          '<button type="button" class="fwd-btn fwd-nav fwd-prev" aria-label="Previous">' + ICON_L + '</button>' +
          '<button type="button" class="fwd-btn fwd-nav fwd-next" aria-label="Next">' + ICON_R + '</button></div>');
    document.body.appendChild(dlg);
    if (!isPage) {
      dlg.querySelector('.fwd-back').addEventListener('click', close);
      dlg.querySelector('.fwd-prev').addEventListener('click', function () { step(-1); });
      dlg.querySelector('.fwd-next').addEventListener('click', function () { step(1); });
    }
    dlg.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.fwd-char') : null;
      if (b && b.tagName === 'BUTTON') attack(b);
      if (e.target.closest && cur) {
        if (e.target.closest('.fwd-skins')) { skinsSet(true); return; }
        if (e.target.closest('.fwd-sk-x') || e.target.classList.contains('fwd-sk')) { skinsSet(false); return; }
        var lk = e.target.closest('.fwd-seg, .fwd-tile');
        if (lk) {
          if (lk.hasAttribute('data-look')) lookI = +lk.getAttribute('data-look');
          else view = lk.getAttribute('data-view');
          applyLook();
          if (lk.hasAttribute('data-look')) skinsSet(false);
          return;
        }
      }
      var u = e.target.closest ? e.target.closest('.fwd-users a[data-id]') : null;
      var c = u && ix.byId[u.getAttribute('data-id')];
      if (!c || !cur || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      if (isPage) { location.href = pageUrl(c); return; }
      history.pushState({ fw: 1, from: cur.id }, '', '#' + c.id);
      order = (cur.users || [c]).slice();
      show(c, 1);
      dlg.focus({ preventScroll: true });
    });
    document.addEventListener('keydown', function (e) {
      if (dlg.hidden) return;
      if (isPage) {
        if (e.key === 'Escape') { var bb = dlg.querySelector('.fwd-back'); if (bb) bb.click(); return; }
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.altKey && !e.ctrlKey && !e.metaKey && order.length > 1) {
          var to = dlg.querySelector(e.key === 'ArrowLeft' ? '.fwd-prev' : '.fwd-next');
          if (to && to.href) location.href = to.href;
        }
        return;
      }
      var sk = dlg.querySelector('.fwd-sk'), skOn = !sk.hidden;
      if (e.key === 'Escape') { e.preventDefault(); if (skOn) skinsSet(false); else close(); return; }
      if (!skOn && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) {
        e.preventDefault();
        step(e.key === 'ArrowLeft' ? -1 : 1);
        return;
      }
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call((skOn ? sk : dlg).querySelectorAll('button, a[href]'), function (x) { return x.offsetParent !== null || x === document.activeElement; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (document.activeElement === dlg) { e.preventDefault(); (e.shiftKey ? last : skOn ? first : dlg.querySelector('.fwd-back')).focus(); }
      else if (!(skOn ? sk : dlg).contains(document.activeElement)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
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
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (isPage) { var to = dlg.querySelector(dx < 0 ? '.fwd-next' : '.fwd-prev'); if (to && to.href) location.href = to.href; }
        else step(dx < 0 ? 1 : -1);
      }
    });
    sc.addEventListener('pointercancel', function () { swipeX = null; });
  }
  function skinsSet(on) {
    var sk = dlg.querySelector('.fwd-sk');
    if (on === !sk.hidden) return;
    if (!on) {
      sk.hidden = true;
      var b = dlg.querySelector('.fwd-skins');
      if (b) b.focus({ preventScroll: true });
      return;
    }
    var still = reduced();
    sk.querySelector('.fwd-sk-list').innerHTML = FW.looks(cur).map(function (s, i) {
      var u = s.idle || s.overworld || cur.idle, a = ' alt="" decoding="async"';
      return '<li><button type="button" class="fwd-tile" data-look="' + i + '" aria-pressed="' + (i === lookI ? 'true' : 'false') + '">' + (still ? '<img data-still="' + esc(u) + '"' + a + '>' : '<img src="' + esc(u) + '"' + a + '>') + '<span>' + esc(s.name) + '</span></button></li>';
    }).join('');
    sk.style.setProperty('--wc', dlg.style.getPropertyValue('--wc'));
    sk.hidden = false;
    if (still) stillCards(sk);
    var t = sk.querySelector('.fwd-tile[aria-pressed=true]') || sk.querySelector('.fwd-tile');
    if (t) t.focus({ preventScroll: true });
  }
  function applyLook() {
    var s = FW.looks(cur)[lookI] || {}, img = dlg.querySelector('.fwd-anim');
    if (view === 'overworld' && !s.overworld) view = 'battle';
    clearTimeout(atkT);
    var ch = dlg.querySelector('.fwd-char');
    ch.classList.remove('is-atk');
    ch.classList.toggle('is-still', view !== 'battle' || !s.attack);
    img.src = view === 'overworld' ? s.overworld : s.idle || cur.idle;
    img.classList.toggle('is-ow', view === 'overworld');
    img.alt = cur.name + (lookI ? ' (' + s.name + ')' : '') + (view === 'overworld' ? ' in the overworld' : '');
    var hint = dlg.querySelector('.fwd-hint');
    if (hint) hint.style.visibility = view !== 'battle' || !s.attack ? 'hidden' : '';
    var vw = dlg.querySelector('.fwd-view');
    if (vw) vw.classList.toggle('is-ow', view === 'overworld');
    var cb = dlg.querySelector('.fwd-cr');
    if (cb) {
      var cr = creditRows(s.credits);
      cb.querySelector('dl').innerHTML = cr;
      cb.hidden = !cr;
    }
    Array.prototype.forEach.call(dlg.querySelectorAll('.fwd-seg, .fwd-tile'), function (x) {
      var on = x.hasAttribute('data-look') ? +x.getAttribute('data-look') === lookI : x.getAttribute('data-view') === view;
      x.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (x.getAttribute('data-view') === 'overworld') x.disabled = !s.overworld;
    });
  }
  function attack(b) {
    var s = cur && FW.looks(cur)[lookI];
    if (!s || view !== 'battle' || !s.attack) return;
    var img = b.querySelector('img'), back = s.idle || cur.idle;
    clearTimeout(atkT);
    img.src = s.attack;
    b.classList.add('is-atk');
    atkT = setTimeout(function () {
      img.src = back;
      b.classList.remove('is-atk');
    }, 2400);
  }
  function preload(c) {
    var u = c && (c.kind === 'party' ? c.idle : c.image);
    if (!u) return;
    var i = new Image();
    i.src = u;
  }
  function show(c, dir) {
    cur = c;
    lookI = 0;
    view = 'battle';
    dlg.querySelector('.fwd-sk').hidden = true;
    clearTimeout(atkT);
    var w = worldOf(data, c), still = reduced();
    dlg.style.setProperty('--wc', w.color);
    dlg.querySelector('.fwd-bg').style.backgroundImage = w.background ? 'url("' + String(w.background).replace(/["\\]/g, '') + '")' : 'none';
    var inner = dlg.querySelector('.fwd-in');
    inner.innerHTML = FW.detail(data, c, still, tierMode ? FW.tierPanel(meta, c) : '');
    stillCards(inner);
    dlg.querySelector('.fwd-scroll').scrollTop = 0;
    var i = order.indexOf(c);
    dlg.querySelector('.fwd-count').textContent = (i + 1) + ' / ' + order.length;
    if (isPage) {
      var pv = order[(i - 1 + order.length) % order.length], nx = order[(i + 1) % order.length];
      dlg.querySelector('.fwd-prev').href = pageUrl(pv);
      dlg.querySelector('.fwd-prev').setAttribute('aria-label', 'Previous: ' + pv.name);
      dlg.querySelector('.fwd-next').href = pageUrl(nx);
      dlg.querySelector('.fwd-next').setAttribute('aria-label', 'Next: ' + nx.name);
    }
    dlg.classList.toggle('fwd-solo', order.length < 2);
    var fm = fromMove();
    dlg.querySelector('.fwd-back').setAttribute('aria-label', fm && fm !== c ? 'Back to ' + fm.name : 'Back to the list');
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
    if (meta) order = scope ? Array.prototype.map.call(scope.querySelectorAll('.fw-card--' + c.kind + '[data-id]'), function (x) { return ix.byId[x.getAttribute('data-id')]; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; }) : [c];
    else order = FW.order(data, state.tab, state.sort, state.q);
    if (order.indexOf(c) === -1) order = meta ? [c] : FW.order(data, c.kind, 'world', '');
    var fm = fromMove();
    if (fm && fm.users.indexOf(c) !== -1) order = fm.users.slice();
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
    if (!was) dlg.focus({ preventScroll: true });
  }
  function hide() {
    if (!dlg || dlg.hidden) return;
    clearTimeout(atkT);
    dlg.hidden = true;
    document.documentElement.classList.remove('fwd-on');
    var back = cur && (scope || mount).querySelector('.fw-card[data-id="' + cur.id + '"]');
    if (back) back.focus();
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
    cur = null;
  }
  function fromMove() {
    var f = history.state && history.state.from && ix.byId[history.state.from];
    return f && f.kind === 'move' ? f : null;
  }
  function close() {
    if (fromMove()) {
      history.back();
      return;
    }
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
      if (!meta && state.tab !== c.kind && (!dlg || dlg.hidden)) { state.tab = c.kind; render(); }
      if (meta && (!dlg || dlg.hidden)) {
        scope = null;
        var tt = tierMode ? FW.tierTabs(meta).filter(function (t) { return t[1] === c.kind; })[0] : null;
        if (tt && tt[0] !== state.tab) { state.tab = tt[0]; render(); }
        if (tt || grindMode) scope = mount;
      }
      open(id, false);
    } else {
      pushed = false;
      hide();
    }
  }
  function page() {
    var c = ix.byId[pageId];
    if (!c) {
      mount.innerHTML = '<p class="fw-none">There is no character at this address. <a href="' + esc(listBase.replace(/\/$/, '')) + '">Back to the Roster</a></p>';
      return;
    }
    root.classList.add('fw-page');
    document.documentElement.classList.add('fwd-on');
    var mn = document.getElementById('ug-main');
    if (mn) mn.inert = true;
    var ret = retGet();
    order = FW.order(data, c.kind, (ret && ret.sort) || baseSort, '');
    if (order.indexOf(c) === -1) order = FW.order(data, c.kind, 'world', '');
    if (!dlg) build();
    show(c, 0);
    var h2 = dlg.querySelector('h2.fwd-name');
    if (h2) {
      var h1 = document.createElement('h1');
      h1.className = h2.className;
      h1.id = h2.id;
      h1.innerHTML = h2.innerHTML;
      h2.parentNode.replaceChild(h1, h2);
    }
    var bk = dlg.querySelector('.fwd-back'), ru = null;
    try { ru = document.referrer ? new URL(document.referrer) : null; } catch (e) { ru = null; }
    var home = listBase.replace(/\/$/, ''), name = 'Roster';
    if (ru && ru.origin === location.origin && ru.pathname.indexOf(listBase) !== 0 && ru.pathname.replace(/\/+$/, '') !== home) {
      var best = null;
      Array.prototype.forEach.call(document.querySelectorAll('#ug-mobile-nav a[data-nav-href]'), function (a) {
        var p = a.getAttribute('data-nav-href');
        if ((ru.pathname === p || ru.pathname.indexOf(p + '/') === 0) && (!best || p.length > best.getAttribute('data-nav-href').length)) best = a;
      });
      name = best ? best.firstChild.textContent.trim() : ru.pathname === '/' ? 'Home' : 'Back';
      bk.href = document.referrer;
      bk.addEventListener('click', function (e) {
        if (history.length < 2 || e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault();
        history.back();
      });
    }
    bk.querySelector('span').textContent = name;
    bk.setAttribute('aria-label', 'Back to ' + name);
  }
  if (!isPage) {
    window.addEventListener('popstate', fromHash);
    window.addEventListener('hashchange', fromHash);
  }

  function get(u) {
    return fetch(u, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (t) {
      return JSON.parse(t.replace(/,(\s*[\]}])/g, '$1'));
    });
  }
  Promise.all([root.getAttribute('data-src') || DATA].concat(metaSrc ? [root.getAttribute('data-specs'), metaSrc] : []).map(function (u) { return u ? get(u) : null; })).then(function (r) {
    var d = r[0];
    if (metaSrc) {
      if (r[1]) ['bytes', 'chips', 'armor', 'groups'].forEach(function (k) { d[k] = r[1][k]; });
      meta = r[2] || {};
      metaTabs();
    }
    data = d;
    ix = index(d);
    if (grindMode) FW.addGrinds(d, meta);
    root.classList.add('fw-ready');
    if (isPage) { page(); return; }
    if (FW.linkBase && location.hash.length > 1 && ix.byId[decodeURIComponent(location.hash.slice(1))]) { location.replace(FW.linkBase + location.hash.slice(1)); return; }
    var nav = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null, ret = FW.linkBase ? retGet() : null;
    var back = ret && ((nav && nav.type === 'back_forward') || (document.referrer && document.referrer.indexOf(location.origin + listBase) === 0));
    if (back) {
      if (ret.tab && ix.tabs[ret.tab]) state.tab = ret.tab;
      if (ret.sort) state.sort = ret.sort;
      if (ret.q && qEl) { state.q = ret.q; qEl.value = ret.q; }
    }
    render();
    if (back && ret.y) {
      var moved = false, stop = function () { moved = true; };
      ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, stop, { once: true, passive: true }); });
      var goY = function () { if (!moved && Math.abs((window.scrollY || window.pageYOffset) - ret.y) > 4) window.scrollTo(0, ret.y); };
      requestAnimationFrame(goY);
      [250, 700, 1500].forEach(function (ms) { setTimeout(goY, ms); });
      window.addEventListener('load', goY, { once: true });
    }
    if (location.hash.length > 1) fromHash();
  }).catch(function () {
    mount.innerHTML = '<p class="fw-none">' + (tierMode ? 'The TierList' : grindMode ? 'The grind methods' : 'The characters') + ' could not load. Refresh the page to try again.</p>';
  });
})(typeof window !== 'undefined' ? window : this);
