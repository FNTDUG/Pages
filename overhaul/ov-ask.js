(function () {
  var history = [];
  var linksFor = {};
  var SITES = /(^|[\s("'])(findahelpline\.com|report\.cybertip\.org)/g;
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
      if (d && Array.isArray(d.links) && d.links.length) linksFor[a] = d.links;
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
    var text = el.textContent, spots = [], m, pre = location.pathname.indexOf('/overhaul') === 0 ? '/overhaul' : '';
    (linksFor[text] || []).forEach(function (l) {
      var at = text.indexOf(l.text);
      if (at !== -1 && /^\//.test(l.href)) spots.push({ at: at, len: l.text.length, href: pre + l.href, out: false });
    });
    SITES.lastIndex = 0;
    while ((m = SITES.exec(text))) spots.push({ at: m.index + m[1].length, len: m[2].length, href: 'https://' + m[2], out: true });
    if (!spots.length) return;
    spots.sort(function (a, b) { return a.at - b.at; });
    var out = document.createDocumentFragment(), last = 0;
    spots.forEach(function (s) {
      if (s.at < last) return;
      out.appendChild(document.createTextNode(text.slice(last, s.at)));
      var a = document.createElement('a');
      a.href = s.href;
      if (s.out) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.textContent = text.slice(s.at, s.at + s.len);
      out.appendChild(a);
      last = s.at + s.len;
    });
    out.appendChild(document.createTextNode(text.slice(last)));
    el.textContent = '';
    el.appendChild(out);
  };
})();
