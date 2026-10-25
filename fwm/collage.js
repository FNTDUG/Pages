(function () {
  var COLS = ['--acc', '--acc', '--acc', '--yellow', '--yellow', '--blue', '--blue', '--pink', '--pink', '--green', '--surface'];
  var layer = null, lastW = 0, resizeT = 0, hopT = 0, still = false;

  function seed(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  function build() {
    var vw = window.innerWidth, vh = Math.max(window.innerHeight, screen.height || 0);
    var rnd = seed(location.pathname), u = vw <= 600 ? 24 : 32, cell = u * 4, html = '';
    for (var y = -cell; y < vh + cell; y += cell) {
      for (var x = -cell; x < vw + cell; x += cell) {
        if (rnd() > 0.42) continue;
        var w = u * (2 + Math.floor(rnd() * 6)), h = u * (2 + Math.floor(rnd() * 6));
        var l = x + u * Math.floor(rnd() * 3), t = y + u * Math.floor(rnd() * 3);
        var col = COLS[Math.floor(rnd() * COLS.length)];
        html += '<i class="fwc-b" style="left:' + l + 'px;top:' + t + 'px;width:' + w + 'px;height:' + h + 'px;--c:var(' + col + ')"></i>';
      }
    }
    layer.innerHTML = html;
    layer.style.setProperty('--u', u + 'px');
    lastW = vw;
  }

  function hop() {
    var bs = layer.children;
    if (bs.length && !document.hidden) {
      for (var i = 0; i < 2; i++) {
        var b = bs[Math.floor(Math.random() * bs.length)], d = Math.random();
        b.style.setProperty('--x', (d < 0.25 ? -1 : d < 0.5 ? 1 : 0) * 12 + 'px');
        b.style.setProperty('--y', (d >= 0.5 && d < 0.75 ? -1 : d >= 0.75 ? 1 : 0) * 12 + 'px');
      }
    }
    hopT = setTimeout(hop, 1800 + Math.random() * 1600);
  }

  function start() {
    if (!document.documentElement.classList.contains('ov') || layer) return;
    layer = document.createElement('div');
    layer.className = 'fwc';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    build();
    still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!still) hopT = setTimeout(hop, 1500);
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { if (Math.abs(window.innerWidth - lastW) > 80) build(); }, 250);
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
