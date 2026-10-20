(function () {
  var LINK = /\[([^\]\n]{1,200})\]\(((?:https?:\/\/|\/(?!\/))[^\s)]{0,500})\)/g;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function marks(s) {
    return esc(s).replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/\*([^*\n]+)\*/g, '<i>$1</i>');
  }

  function inline(s) {
    var out = '', last = 0, m;
    LINK.lastIndex = 0;
    while ((m = LINK.exec(s))) {
      out += marks(s.slice(last, m.index));
      out += '<a href="' + esc(m[2]) + '" rel="nofollow ugc noopener" target="_blank">' + marks(m[1]) + '</a>';
      last = LINK.lastIndex;
    }
    return out + marks(s.slice(last));
  }

  function rich(text, sub) {
    var lines = String(text || '').split('\n'), html = '', para = [], list = [];
    function flushPara() {
      if (para.length) html += '<p>' + para.join('<br>') + '</p>';
      para = [];
    }
    function flushList() {
      if (list.length) html += '<ul><li>' + list.join('</li><li>') + '</li></ul>';
      list = [];
    }
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      var t = ln.replace(/\s+$/, '');
      if (!t) { flushPara(); flushList(); continue; }
      if (/^##\s+/.test(t)) {
        flushPara(); flushList();
        html += '<' + sub + '>' + inline(t.replace(/^##\s+/, '')) + '</' + sub + '>';
        continue;
      }
      if (/^\s*[-*•]\s+/.test(t)) {
        flushPara();
        list.push(inline(t.replace(/^\s*[-*•]\s+/, '')));
        continue;
      }
      flushList();
      para.push(inline(t));
    }
    flushPara(); flushList();
    return html;
  }

  function panelHtml(b) {
    var style = '--ns-width:' + b.width + '%;--ns-height:' + (b.height ? b.height + 'px' : 'none') + ';--ns-align:' + (b.align === 'left' ? 'left' : 'center');
    var body = (b.title ? '<h2>' + inline(b.title) + '</h2>' : '') + rich(b.text, 'h3');
    return '<div class="ns-panel" style="' + style + '"><div class="ns-body">' + body + '</div></div>';
  }

  function cardHtml(b) {
    var style = '--wk-w:' + b.width + '%;--wk-align:' + (b.align === 'left' ? 'left' : 'center');
    var html = '<div class="info-card" style="' + style + '">';
    var secs = b.sections || [];
    for (var i = 0; i < secs.length; i++) {
      html += '<div class="info-card-section">' + (secs[i].title ? '<h4>' + inline(secs[i].title) + '</h4>' : '') + rich(secs[i].text, 'h5') + '</div>';
    }
    return html + '</div>';
  }

  var teams = {}, metaLoading = false, metaWaiting = [];

  function teamHtml(b) {
    teams[b.id] = b;
    return '<div class="wk-team" data-tid="' + esc(b.id) + '"></div>';
  }

  function teamUnits(b) {
    var out = [];
    for (var i = 0; i < b.units.length; i++) {
      var u = b.units[i], o = { name: u.name, label: u.label || '', byte: u.byte || '', chip: u.chip || '', enchant: u.enchant || '', replacement: u.replacement || '', caption: u.caption || '' };
      if (u.path) o.path = u.path;
      out.push(o);
    }
    return out;
  }

  function loadMeta(cb) {
    if (window.FntdMeta) { cb(); return; }
    metaWaiting.push(cb);
    if (metaLoading) return;
    metaLoading = true;
    var s = document.createElement('script');
    s.src = '/wiki-metas.js';
    s.onload = function () { var w = metaWaiting; metaWaiting = []; for (var i = 0; i < w.length; i++) w[i](); };
    (document.head || document.documentElement).appendChild(s);
  }

  function hydrate(root) {
    var els = root.querySelectorAll('.wk-team[data-tid]');
    if (!els.length) return;
    loadMeta(function () {
      for (var i = 0; i < els.length; i++) {
        var b = teams[els[i].getAttribute('data-tid')];
        if (b && els[i].isConnected) window.FntdMeta.render(els[i], b.title, teamUnits(b));
      }
    });
  }

  var FRAMES = {
    orange: '#ffa45b',
    white: '#ffffff',
    black: '#000000',
    purple: 'linear-gradient(180deg,#a855f7,#681f62)',
    uncommon: 'linear-gradient(180deg,#3FFF8E,#5CFF4E)',
    rare: 'linear-gradient(180deg,#2244B0,#57A4FE)',
    epic: 'linear-gradient(180deg,#8A01A1,#FD34FE)',
    mythic: 'linear-gradient(180deg,#FFF006,#FFD114)',
    exclusive: 'linear-gradient(180deg,#8CFFCB 0%,#14735B 25.1%,#33E7FF 50%,#154A76 74.6%,#4FA4FF 100%)',
    secret: 'linear-gradient(180deg,#FF8700,#FF0F0C)',
    nightmare: 'linear-gradient(180deg,#492590,#2A1E42)',
    apex: 'linear-gradient(180deg,#9D0078,#0063F8)',
    hero: 'linear-gradient(180deg,#FFCD19 0%,#353815 50%,#FFFB85 100%)',
    radiant: 'linear-gradient(180deg,#FF6600,#FFCC33)',
    shiny: 'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'
  };

  function frameBg(f) {
    if (/^#[0-9a-fA-F]{6}$/.test(String(f || ''))) return f;
    return FRAMES[f] || '';
  }

  function imageHtml(b) {
    if (!b.src) return '<div class="wk-img-empty">No image yet</div>';
    var bg = b.frame && b.frame !== 'none' ? frameBg(b.frame) : '';
    var t = bg ? b.thick : 0, r = b.radius || 0;
    return '<figure class="wk-img" style="--wk-w:' + b.width + '%">' +
      '<div class="wk-img-frame' + (b.frame === 'shiny' ? ' wk-img-shiny' : '') + '" style="padding:' + t + 'px;border-radius:' + r + 'px;' + (bg ? 'background:' + bg : '') + '">' +
      '<img src="' + esc(b.src) + '" alt="' + esc(b.alt) + '" loading="lazy" style="display:block;width:100%;height:auto;max-width:none;margin:0;border-radius:' + Math.max(0, r - t) + 'px"></div>' +
      (b.caption ? '<figcaption>' + inline(b.caption) + '</figcaption>' : '') + '</figure>';
  }

  function blockHtml(b) {
    if (b.type === 'image') return imageHtml(b);
    if (b.type === 'panel') return panelHtml(b);
    if (b.type === 'card') return cardHtml(b);
    if (b.type === 'team') return teamHtml(b);
    return '';
  }

  function blockEl(b) {
    var el = document.createElement('div');
    el.className = 'wk-block';
    el.setAttribute('data-id', b.id);
    el.setAttribute('data-type', b.type);
    el.innerHTML = blockHtml(b);
    return el;
  }

  function render(doc, mount, prev) {
    var blocks = (doc && doc.blocks) || [];
    var old = {};
    if (prev && prev.blocks) for (var i = 0; i < prev.blocks.length; i++) old[prev.blocks[i].id] = JSON.stringify(prev.blocks[i]);
    if (!/(^|\s)wk-doc(\s|$)/.test(mount.className)) mount.className += (mount.className ? ' ' : '') + 'wk-doc';
    var frag = document.createDocumentFragment();
    var changed = [];
    for (var j = 0; j < blocks.length; j++) {
      var el = blockEl(blocks[j]);
      if (prev && old[blocks[j].id] !== JSON.stringify(blocks[j])) changed.push(el);
      frag.appendChild(el);
    }
    mount.innerHTML = '';
    mount.appendChild(frag);
    hydrate(mount);
    for (var k = 0; k < changed.length; k++) changed[k].firstChild && changed[k].firstChild.classList.add('wk-flash');
    return mount;
  }

  window.WikiBlocks = { esc: esc, inline: inline, rich: rich, blockHtml: blockHtml, blockEl: blockEl, render: render, hydrate: hydrate, frames: FRAMES, frameBg: frameBg, teamUnits: teamUnits, loadMeta: loadMeta };
})();
