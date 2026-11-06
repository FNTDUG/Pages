(function () {
  var SURVIVOR = '#c8c8ff', KILLER = '#ffc8c8';
  var KILLERS = { c00lkidd: '#c71414', slasher: '#b98a13', 'john-doe': '#eed169', noli: '#38239e', '1x1x1x1': '#32e132', 'guest-666': '#c80000', nosferatu: '#651c32', azure: '#ee17ff' };
  var ALIAS = { Sixer: 'guest-666', HelperBot: 'helperbot' };
  var TEXT = '.fk-cap,.fk-lead,.fk-desc,.fk-ab-q,.fk-rich,.fk-item-note,.fk-hp p,.fk-who--t,.fk-pick-cap,.fk-vl-t,.fk-cls-d,.fkt-about,.fkt-why dt,.fkt-why dd,.fkc-about,.fkc-tip p';
  var SKIP = 'a,button,summary,h1,h2,h3,.fk-cn,script,style,svg';

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  window.fkNames = function (root, chars, self, base) {
    if (!root || !chars || root._fkNames) return;
    root._fkNames = 1;
    base = (base || '/forsaken/roster').replace(/\/$/, '');
    var byName = {}, byId = {};
    chars.forEach(function (c) { if (c && c.id && c.name) { byName[c.name] = c; byId[c.id] = c; } });
    Object.keys(ALIAS).forEach(function (a) { if (byId[ALIAS[a]]) byName[a] = byId[ALIAS[a]]; });
    var keys = Object.keys(byName).sort(function (a, b) { return b.length - a.length; });
    if (!keys.length) return;
    var re = new RegExp('(^|[^A-Za-z0-9])(' + keys.map(escRe).join('|') + ')(?![A-Za-z0-9])', 'g');

    function colour(c) { return c.side === 'killer' ? (KILLERS[c.id] || KILLER) : SURVIVOR; }
    function mark(c, label) {
      var el;
      if (c.id === self) {
        el = document.createElement('span');
        el.className = 'fk-cn fk-cn--self';
      } else {
        el = document.createElement('a');
        el.className = 'fk-cn';
        el.href = base + '/' + c.id;
        el.setAttribute('data-go', c.id);
        el.setAttribute('data-google-vignette', 'false');
        if (label !== c.name) el.title = c.name;
      }
      el.style.setProperty('--cn', colour(c));
      el.textContent = label;
      return el;
    }
    function doText(t) {
      var s = t.nodeValue;
      if (!s || s.length < 4) return;
      re.lastIndex = 0;
      if (!re.test(s)) return;
      var p = t.parentElement;
      if (!p || p.closest(SKIP) || !p.closest(TEXT)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = re.exec(s))) {
        var at = m.index + m[1].length;
        if (at > last) frag.appendChild(document.createTextNode(s.slice(last, at)));
        frag.appendChild(mark(byName[m[2]], m[2]));
        last = at + m[2].length;
      }
      if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      p.replaceChild(frag, t);
    }
    function scan(node) {
      if (node.nodeType === 3) { doText(node); return; }
      if (node.nodeType !== 1) return;
      var boxes = [];
      if (node.matches(TEXT)) boxes.push(node);
      else if (node.closest(TEXT)) boxes.push(node);
      Array.prototype.push.apply(boxes, node.querySelectorAll(TEXT));
      boxes.forEach(function (b) {
        var w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT), list = [], n;
        while ((n = w.nextNode())) list.push(n);
        list.forEach(doText);
      });
    }
    scan(root);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.isConnected) scan(n); }); });
    }).observe(root, { childList: true, subtree: true });
  };
})();
