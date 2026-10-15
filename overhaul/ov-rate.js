(function () {
  var box = document.getElementById('rate');
  var row = document.getElementById('rateStars');
  var txt = document.getElementById('rateTxt');
  if (!box || !row || !txt) return;
  var PATH = 'M5 0h2v2H5zM4 2h4v1H4zM0 3h12v1H0zM1 4h10v1H1zM2 5h8v1H2zM3 6h6v1H3zM2 7h8v1H2zM2 8h3v1H2zM7 8h3v1H7zM1 9h3v1H1zM8 9h3v1H8zM1 10h2v1H1zM9 10h2v1H9z';
  var SVG = '<svg viewBox="0 0 12 11" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><path d="' + PATH + '"/></svg>';
  var saved = 0, chosen = 0, sent = 0, busy = false, timer = 0, noteT = 0;
  var avg = 0, n = 0, loaded = false, hover = 0, focused = false, note = '', ptr = 0;

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {}
    return null;
  }
  function words(v) {
    var s = v / 2;
    return s + (s === 1 ? ' star' : ' stars');
  }
  var h = '';
  for (var r = 1; r <= 10; r++) h += '<input class="sr" type="radio" name="pvRate" id="pvRate' + r + '" value="' + r + '">';
  for (var i = 0; i < 5; i++) {
    h += '<span class="rs">' + SVG + '<span class="rs-on">' + SVG + '</span>';
    h += '<label class="rs-l" for="pvRate' + (i * 2 + 1) + '"><span class="sr">' + words(i * 2 + 1) + '</span></label>';
    h += '<label class="rs-r" for="pvRate' + (i * 2 + 2) + '"><span class="sr">' + words(i * 2 + 2) + '</span></label></span>';
  }
  row.innerHTML = h;
  var live = document.createElement('p');
  live.className = 'sr';
  live.setAttribute('role', 'status');
  box.appendChild(live);
  var stars = row.querySelectorAll('.rs');

  function mine(v) {
    return 'Your vote: <b class="rate-you">' + v / 2 + '</b>' + (v === 2 ? ' star' : ' stars');
  }
  function avgText() {
    if (!loaded) return 'Loading ratings...';
    var t = n ? '<span class="rate-n">' + n.toLocaleString() + (n === 1 ? ' Vote' : ' Votes') + '</span>' : 'No votes yet. Be the first!';
    if (saved) t += ' &middot; <span>' + mine(saved) + '</span>';
    return t;
  }
  function paint() {
    var v = hover || (focused ? chosen : 0);
    for (var i = 0; i < 5; i++) {
      var f = v ? Math.max(0, Math.min(2, v - i * 2)) * 50 : Math.round(Math.max(0, Math.min(1, avg - i)) * 12) / 12 * 100;
      stars[i].style.setProperty('--f', f + '%');
      stars[i].classList.toggle('is-hot', !!hover && Math.ceil(hover / 2) - 1 === i);
    }
    var tip = hover && !(note && hover === chosen);
    txt.className = 'rate-txt' + (/^!/.test(note) && !tip ? ' is-bad' : '');
    if (tip) txt.textContent = 'Rate it ' + words(hover);
    else if (note) txt.textContent = note.replace(/^!/, '');
    else if (focused && chosen) txt.innerHTML = mine(chosen);
    else txt.innerHTML = avgText();
  }
  function flash(text) {
    note = text;
    live.textContent = text.replace(/^!/, '');
    clearTimeout(noteT);
    if (text && text !== 'Saving...') noteT = setTimeout(function () { note = ''; paint(); }, 4500);
    paint();
  }
  function check(v) {
    var el = v ? document.getElementById('pvRate' + v) : null;
    if (el) el.checked = true;
    else Array.prototype.forEach.call(row.querySelectorAll('input'), function (x) { x.checked = false; });
  }
  function totals(j) {
    loaded = true;
    n = j && j.n > 0 ? j.n : 0;
    avg = n ? Number(j.avg) || 0 : 0;
    row.setAttribute('aria-label', n ? 'Rate the guide. Rated ' + avg.toFixed(1) + ' out of 5 from ' + n + (n === 1 ? ' rating' : ' ratings') : 'Rate the guide. No ratings yet');
    paint();
  }
  function browserId() {
    var id = store('pv-rate-id');
    if (id && /^[0-9a-f]{16,32}$/.test(id)) return id;
    var a = new Uint8Array(12);
    (window.crypto || window.msCrypto).getRandomValues(a);
    id = '';
    for (var i = 0; i < a.length; i++) id += (a[i] < 16 ? '0' : '') + a[i].toString(16);
    store('pv-rate-id', id);
    return id;
  }
  function fail(text) {
    chosen = sent = saved;
    check(saved);
    flash('!' + text);
  }
  function done() {
    busy = false;
    box.classList.remove('is-busy');
    if (chosen && chosen !== sent) send();
  }
  function send() {
    if (busy) return;
    busy = true;
    sent = chosen;
    box.classList.add('is-busy');
    flash('Saving...');
    fetch('/rating/vote', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ v: sent, b: browserId() })
    }).then(function (res) {
      return res.json().catch(function () { return { ok: false }; });
    }).then(function (j) {
      if (j && j.ok) {
        saved = j.v;
        store('pv-rate', String(saved));
        loaded = true;
        n = j.n;
        avg = Number(j.avg) || 0;
        totals(j);
        if (chosen === sent) flash('Thanks! You gave the guide ' + words(saved) + '.');
      } else if (j && j.error === 'limit') fail('This internet connection has already used all its ratings.');
      else if (j && j.error === 'changes') fail('You have changed your rating a lot today. Try again tomorrow.');
      else fail('Your rating could not be saved. Try again.');
      done();
    }, function () {
      fail('Your rating could not be saved. Check your connection.');
      done();
    });
  }

  row.addEventListener('change', function (e) {
    var v = Number(e.target.value);
    if (!(v >= 1 && v <= 10)) return;
    chosen = v;
    note = '';
    paint();
    clearTimeout(timer);
    timer = setTimeout(function () { if (chosen !== sent || chosen !== saved) send(); }, 700);
  });
  row.addEventListener('pointerover', function (e) {
    var l = e.target.closest ? e.target.closest('label') : null;
    if (!l) return;
    hover = Number(l.htmlFor.slice(6));
    paint();
  });
  row.addEventListener('pointerleave', function () {
    hover = 0;
    paint();
  });
  row.addEventListener('pointerdown', function () { ptr = Date.now(); });
  row.addEventListener('focusin', function () {
    focused = Date.now() - ptr > 600;
    paint();
  });
  row.addEventListener('focusout', function () {
    focused = false;
    paint();
  });

  saved = Number(store('pv-rate')) || 0;
  if (!(saved >= 1 && saved <= 10)) saved = 0;
  chosen = sent = saved;
  check(saved);
  paint();
  fetch('/rating', { cache: 'no-store' }).then(function (res) { return res.json(); }).then(totals, function () {
    loaded = true;
    txt.textContent = 'Ratings are unavailable right now.';
  });
})();
