(function () {
  var root = document.getElementById('fkc');
  if (!root) return;
  var list = root.querySelector('.fkc-list');
  var BASE = '/forsaken/roster/';
  var byId = {};

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }

  function card(c, label, sizes) {
    return '<a class="fk-card" data-side="' + esc(c.side) + '" href="' + BASE + esc(c.id) + '" title="' + esc(label) + '" aria-label="' + esc(label) + '" data-google-vignette="false">' +
      '<img src="' + esc(c.card || c.image) + '"' + (c.cards ? ' srcset="' + c.cards.map(function (w) { return '/forsaken/img/card/' + c.id + '-' + w + '.webp ' + w + 'w'; }).join(', ') + '" sizes="' + sizes + '"' : '') + ' alt="" width="440" height="550" loading="lazy" decoding="async"><span class="fk-mo" aria-hidden="true"></span><span class="fk-card-n">' + esc(c.name) + '</span></a>';
  }

  function plural(role, n) { return n === 1 ? role : role + 's'; }

  function comp(id, o) {
    var k = byId[id];
    if (!k || k.side !== 'killer' || !o) return '';
    var team = o.team || {}, members = [], mix = [];
    Object.keys(team).forEach(function (role) {
      var ids = [].concat(team[role] || []), n = 0;
      ids.forEach(function (sid) { var c = byId[sid]; if (c && c.side === 'survivor') { members.push({ c: c, role: role }); n++; } });
      if (n) mix.push('<li>' + n + ' ' + esc(plural(role, n)) + '</li>');
    });
    var hid = 'fkc-' + esc(k.id);
    return '<section class="fkc-comp fk-drawn" id="' + esc(k.id) + '" aria-labelledby="' + hid + '">' +
      '<div class="fkc-killer">' + card(k, k.name, '(max-width: 600px) 170px, 220px') +
      '<h2 class="fkc-kn" id="' + hid + '">Against ' + esc(k.name) + '</h2>' +
      (o.about ? '<p class="fkc-about">' + esc(o.about) + '</p>' : '') +
      (mix.length ? '<ul class="fkc-mix" aria-label="Team makeup">' + mix.join('') + '</ul>' : '') + '</div>' +
      (members.length ? '<ul class="fkc-team" aria-label="Survivor team against ' + esc(k.name) + '">' + members.map(function (m) {
        return '<li class="fkc-m">' + card(m.c, m.c.name + ', ' + m.role, '(max-width: 600px) 84px, 130px') + '<span class="fkc-role">' + esc(m.role) + '</span></li>';
      }).join('') + '</ul>' : '<p class="fkc-empty">No Survivors picked for this team yet.</p>') +
      '</section>';
  }

  function fit(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('.fk-card-n'), function (n) {
      n.style.fontSize = '';
      var room = n.parentNode.clientWidth - 8, w = n.scrollWidth;
      if (room > 0 && w > room) n.style.fontSize = Math.max(11, Math.floor(parseFloat(getComputedStyle(n).fontSize) * room / w * 10) / 10) + 'px';
    });
  }

  function render(d) {
    var comps = d.comps || {}, html = Object.keys(comps).map(function (id) { return comp(id, comps[id]); }).join('');
    list.innerHTML = html || '<p class="fkc-empty">No Meta Comps have been added yet.</p>';
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(list); });
    fit(list);
    if (location.hash) { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t && t.scrollIntoView) t.scrollIntoView(); }
  }

  var ft = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(ft); ft = requestAnimationFrame(function () { fit(list); }); });

  fetch(root.getAttribute('data-src'), { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    d.characters.forEach(function (c) { byId[c.id] = c; });
    if (d.gridBg) root.style.setProperty('--fk-grid-bg', 'url("' + d.gridBg + '")');
    render(d);
  }).catch(function () {
    list.innerHTML = '<p class="fkc-empty">The Meta Comps could not load. Try refreshing the page.</p>';
  });
})();
