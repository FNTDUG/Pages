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

  function blockHtml(b) {
    if (b.type === 'panel') return panelHtml(b);
    if (b.type === 'card') return cardHtml(b);
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
    for (var k = 0; k < changed.length; k++) changed[k].firstChild && changed[k].firstChild.classList.add('wk-flash');
    return mount;
  }

  window.WikiBlocks = { esc: esc, inline: inline, rich: rich, blockHtml: blockHtml, blockEl: blockEl, render: render };
})();
