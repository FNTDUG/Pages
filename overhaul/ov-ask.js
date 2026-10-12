(function () {
  var history = [];
  var PATH = /(^|[\s("'])(\/(?:fntd1|fntd2|bbn|patch-notes|wiki|privacy-policy)(?:\/[^\s)"',!?;:]*)?)/g;
  var FAIL = 'something went wrong on my end. try again in a moment.';

  window.parvusAsk = function (q) {
    return fetch('/parvus/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q: q, history: history.slice(-6), page: location.pathname })
    }).then(function (r) {
      return r.json().catch(function () { return {}; });
    }).then(function (d) {
      var a = d && d.answer ? String(d.answer) : FAIL;
      if (d && d.ok) {
        history.push({ role: 'user', content: q }, { role: 'assistant', content: a });
        if (history.length > 12) history = history.slice(-12);
      }
      return a;
    }, function () {
      return FAIL;
    });
  };

  window.parvusLinkify = function (el) {
    if (!el) return;
    var text = el.textContent, out = document.createDocumentFragment(), last = 0, m, pre = location.pathname.indexOf('/overhaul') === 0 ? '/overhaul' : '';
    PATH.lastIndex = 0;
    while ((m = PATH.exec(text))) {
      var path = m[2].replace(/[.]+$/, ''), at = m.index + m[1].length;
      if (path.length < 2) continue;
      out.appendChild(document.createTextNode(text.slice(last, at)));
      var a = document.createElement('a');
      a.href = pre + path;
      a.textContent = path;
      out.appendChild(a);
      last = at + path.length;
    }
    if (!last) return;
    out.appendChild(document.createTextNode(text.slice(last)));
    el.textContent = '';
    el.appendChild(out);
  };
})();
