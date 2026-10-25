(function () {
  var COLS = ['--acc', '--yellow', '--blue', '--pink', '--green'];
  var layer = null, lastW = 0, resizeT = 0;

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
    var rnd = seed(location.pathname), cell = vw <= 600 ? 110 : 150, html = '';
    for (var y = -cell / 2; y < vh + cell / 2; y += cell) {
      for (var x = -cell / 2; x < vw + cell / 2; x += cell) {
        var n = rnd() < 0.45 ? 2 : 1;
        for (var k = 0; k < n; k++) {
          var w = Math.round(cell * (0.5 + rnd() * 1.1)), h = Math.round(cell * (0.5 + rnd() * 1.1));
          var l = Math.round(x + (rnd() - 0.5) * cell * 0.8), t = Math.round(y + (rnd() - 0.5) * cell * 0.8);
          var cls = 'fwc-b' + (rnd() < 0.22 ? ' fwc-o' : '') + (rnd() < 0.12 ? ' fwc-ink' : '');
          var col = COLS[Math.floor(rnd() * COLS.length)];
          var dx = Math.round((rnd() - 0.5) * 14), dy = Math.round((rnd() - 0.5) * 14);
          var dur = Math.round(18 + rnd() * 22), del = -Math.round(rnd() * dur);
          html += '<i class="' + cls + '" style="left:' + l + 'px;top:' + t + 'px;width:' + w + 'px;height:' + h + 'px;--c:var(' + col + ');--r:' + ((rnd() - 0.5) * 5).toFixed(1) + 'deg;--dx:' + dx + 'px;--dy:' + dy + 'px;animation-duration:' + dur + 's;animation-delay:' + del + 's"></i>';
        }
      }
    }
    layer.innerHTML = html;
    lastW = vw;
  }

  function start() {
    if (!document.documentElement.classList.contains('ov') || layer) return;
    layer = document.createElement('div');
    layer.className = 'fwc';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    build();
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { if (Math.abs(window.innerWidth - lastW) > 80) build(); }, 250);
    }, { passive: true });
    document.addEventListener('visibilitychange', function () { layer.classList.toggle('fwc-paused', document.hidden); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
