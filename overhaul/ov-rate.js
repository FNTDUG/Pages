(function () {
  var pick = document.getElementById('ratePick');
  var row = document.getElementById('rateStars');
  var show = document.getElementById('rateShow');
  if (!pick || !row || !show) return;
  var avgEl = document.getElementById('rateAvg');
  var countEl = document.getElementById('rateCount');
  var msg = document.getElementById('rateMsg');
  var PATH = 'M5 0h2v2H5zM4 2h4v1H4zM0 3h12v1H0zM1 4h10v1H1zM2 5h8v1H2zM3 6h6v1H3zM2 7h8v1H2zM2 8h3v1H2zM7 8h3v1H7zM1 9h3v1H1zM8 9h3v1H8zM1 10h2v1H1zM9 10h2v1H9z';
  var SVG = '<svg viewBox="0 0 12 11" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><path d="' + PATH + '"/></svg>';
  var saved = 0, chosen = 0, sent = 0, busy = false, timer = 0;

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {}
    return null;
  }
  function words(v) {
    var n = v / 2;
    return n + (n === 1 ? ' star' : ' stars');
  }
  function stars(input) {
    var h = '';
    for (var i = 0; i < 5; i++) {
      h += '<span class="rs">' + SVG + '<span class="rs-on">' + SVG + '</span>';
      if (input) h += '<label class="rs-l" for="pvRate' + (i * 2 + 1) + '"><span class="sr">' + words(i * 2 + 1) + '</span></label><label class="rs-r" for="pvRate' + (i * 2 + 2) + '"><span class="sr">' + words(i * 2 + 2) + '</span></label>';
      h += '</span>';
    }
    return h;
  }
  var radios = '';
  for (var r = 1; r <= 10; r++) radios += '<input class="sr" type="radio" name="pvRate" id="pvRate' + r + '" value="' + r + '">';
  row.insertAdjacentHTML('beforebegin', radios);
  row.innerHTML = stars(true);
  show.innerHTML = stars(false);
  var pickStars = row.querySelectorAll('.rs');
  var showStars = show.querySelectorAll('.rs');

  function fillPick(v, hot) {
    for (var i = 0; i < 5; i++) {
      pickStars[i].style.setProperty('--f', Math.max(0, Math.min(2, v - i * 2)) * 50 + '%');
      pickStars[i].classList.toggle('is-hot', hot && Math.ceil(v / 2) - 1 === i);
    }
  }
  function check(v) {
    var el = v ? document.getElementById('pvRate' + v) : null;
    if (el) el.checked = true;
    else Array.prototype.forEach.call(pick.querySelectorAll('input'), function (x) { x.checked = false; });
  }
  function totals(j) {
    var n = j && j.n > 0 ? j.n : 0;
    var avg = n ? Number(j.avg) || 0 : 0;
    for (var i = 0; i < 5; i++) showStars[i].style.setProperty('--f', Math.round(Math.max(0, Math.min(1, avg - i)) * 12) / 12 * 100 + '%');
    avgEl.textContent = n ? avg.toFixed(1) : '--';
    countEl.textContent = n ? 'From ' + n.toLocaleString() + (n === 1 ? ' rating' : ' ratings') : 'No ratings yet. Be the first!';
    show.setAttribute('aria-label', n ? 'Rated ' + avg.toFixed(1) + ' out of 5' : 'No ratings yet');
  }
  function say(text, kind) {
    msg.textContent = text;
    msg.className = 'rate-msg' + (kind ? ' is-' + kind : '');
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
  function done() {
    busy = false;
    pick.classList.remove('is-busy');
    if (chosen && chosen !== sent) send();
  }
  function send() {
    if (busy) return;
    busy = true;
    sent = chosen;
    pick.classList.add('is-busy');
    say('Saving...');
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
        totals(j);
        if (chosen === sent) say('Thanks! You rated the guide ' + words(saved) + '. You can change it any time.', 'ok');
      } else {
        chosen = sent = saved;
        check(saved);
        fillPick(saved);
        if (j && j.error === 'limit') say('This internet connection has already used all its ratings.', 'bad');
        else if (j && j.error === 'changes') say('You have changed your rating a lot today. Try again tomorrow.', 'bad');
        else say('Your rating could not be saved. Try again.', 'bad');
      }
      done();
    }, function () {
      chosen = sent = saved;
      check(saved);
      fillPick(saved);
      say('Your rating could not be saved. Check your connection and try again.', 'bad');
      done();
    });
  }

  pick.addEventListener('change', function (e) {
    var v = Number(e.target.value);
    if (!(v >= 1 && v <= 10)) return;
    chosen = v;
    fillPick(v);
    say('You picked ' + words(v) + '.');
    clearTimeout(timer);
    timer = setTimeout(function () { if (chosen !== sent || chosen !== saved) send(); }, 700);
  });
  row.addEventListener('pointerover', function (e) {
    var l = e.target.closest ? e.target.closest('label') : null;
    if (l) fillPick(Number(l.htmlFor.slice(6)), true);
  });
  row.addEventListener('pointerleave', function () { fillPick(chosen); });

  saved = Number(store('pv-rate')) || 0;
  if (!(saved >= 1 && saved <= 10)) saved = 0;
  chosen = sent = saved;
  if (saved) {
    check(saved);
    say('You rated the guide ' + words(saved) + '. Pick again to change it.');
  }
  fillPick(saved);
  totals(null);
  countEl.textContent = 'Loading ratings...';
  fetch('/rating', { cache: 'no-store' }).then(function (res) { return res.json(); }).then(totals, function () {
    countEl.textContent = 'Ratings are unavailable right now.';
  });
})();
