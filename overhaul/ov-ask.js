(function () {
  var history = [];
  var linksFor = {};
  var SITES = /(^|[\s("'])(findahelpline\.com|report\.cybertip\.org)/g;
  var FAIL = 'something went wrong on my end. try again in a moment.';
  var KEY = 'pv:tiredUntil';
  var left = null, until = 0, wake = 0;

  try { until = +localStorage.getItem(KEY) || 0; } catch (e) {}

  function state() {
    var tired = Date.now() < until;
    return { tired: tired, left: tired ? 0 : left, until: tired ? until : 0 };
  }
  function save() {
    try {
      if (until > Date.now()) localStorage.setItem(KEY, String(until));
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }
  function emit() {
    clearTimeout(wake);
    var st = state();
    if (st.tired) {
      wake = setTimeout(function () {
        until = 0;
        left = null;
        save();
        emit();
        window.parvusStatus();
      }, Math.min(until - Date.now() + 500, 2147483000));
    }
    try { document.dispatchEvent(new CustomEvent('parvus:limit', { detail: st })); } catch (e) {}
  }
  function take(d) {
    if (!d || typeof d.left !== 'number') return;
    left = d.left;
    until = d.left > 0 ? 0 : (+d.resetAt || 0);
    save();
    emit();
  }

  window.parvusLimit = state;
  window.parvusStatus = function () {
    return fetch('/parvus/status', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(take).catch(function () {});
  };

  window.parvusAsk = function (q) {
    return fetch('/parvus/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q: q, history: history.slice(-6), page: location.pathname })
    }).then(function (r) {
      return r.json().catch(function () { return {}; });
    }).then(function (d) {
      var a = d && d.answer ? String(d.answer) : FAIL;
      take(d);
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

  emit();
})();
