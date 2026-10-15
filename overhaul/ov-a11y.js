(function () {
  if (window.pvA11y) return;
  var h = document.documentElement;
  var CVD = {
    protan: '1 0 0 0 0 0.4789 0.4769 0.0442 0 0 0.5973 -0.6887 1.0914 0 0 0 0 0 1 0',
    deutan: '1 0 0 0 0 0.1628 0.725 0.1122 0 0 0.4547 -0.6454 1.1907 0 0 0 0 0 1 0',
    tritan: '0.7412 -0.4072 0.666 0 0 0.0751 0.5852 0.3403 0 0 0 0 1 0 0 0 0 0 1 0'
  };
  var DYS = [['Space Grotesk', 80], ['Archivo Black', 85, 1], ['Audiowide', 85], ['Press Start 2P', 130], ['JetBrains Mono', 88], ['Franklin Gothic Medium', 74], ['Franklin Gothic', 74], ['ITC Franklin Gothic', 74], ['Arial', 75], ['Courier New', 85]];
  var OK = { font: { dyslexic: 1 }, cvd: CVD };
  var dysCss = '', dysEl = null, dysObs = null;
  var state = { font: '', cvd: '' };
  function read(k) {
    var v = null;
    try { v = localStorage.getItem('pv-' + k); } catch (e) {}
    return v && OK[k][v] ? v : '';
  }
  function defs() {
    if (document.getElementById('pv-cvd-defs')) return;
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var f = '';
    for (var k in CVD) f += '<filter id="pv-cvd-' + k + '" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="' + CVD[k] + '"/></filter>';
    s.id = 'pv-cvd-defs';
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    s.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    s.innerHTML = '<defs>' + f + '</defs>';
    (document.body || h).appendChild(s);
  }
  function faces() {
    if (dysCss) return dysCss;
    DYS.forEach(function (d) {
      for (var w = 100; w <= 900; w += 100) {
        ['normal', 'italic'].forEach(function (st) {
          dysCss += '@font-face{font-family:"' + d[0] + '";src:url(/overhaul/fonts/opendyslexic-' + (w < 600 && !d[2] ? 400 : 700) + '-' + st + '.woff2) format("woff2");font-weight:' + w + ';font-style:' + st + ';font-display:swap;size-adjust:' + d[1] + '%}';
        });
      }
    });
    return dysCss;
  }
  function last() {
    if (!dysEl) return;
    var host = document.body || document.head || h;
    if (host.lastChild !== dysEl) host.appendChild(dysEl);
  }
  function dysOn(on) {
    if (on) {
      if (!dysEl) {
        dysEl = document.createElement('style');
        dysEl.id = 'pv-dys';
        dysEl.textContent = faces();
      }
      last();
      if (!dysObs && window.MutationObserver) {
        dysObs = new MutationObserver(function (list) {
          for (var i = 0; i < list.length; i++) for (var j = 0; j < list[i].addedNodes.length; j++) {
            var n = list[i].addedNodes[j];
            if (n !== dysEl && (n.nodeName === 'STYLE' || n.nodeName === 'LINK')) { last(); return; }
          }
        });
        dysObs.observe(document, { childList: true, subtree: true });
      }
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', last);
    } else {
      if (dysObs) { dysObs.disconnect(); dysObs = null; }
      if (dysEl && dysEl.parentNode) dysEl.parentNode.removeChild(dysEl);
    }
  }
  function apply() {
    if (state.font) h.setAttribute('data-font', state.font);
    else h.removeAttribute('data-font');
    dysOn(state.font === 'dyslexic');
    if (state.cvd) {
      defs();
      h.setAttribute('data-cvd', state.cvd);
    } else h.removeAttribute('data-cvd');
  }
  state.font = read('font');
  state.cvd = read('cvd');
  apply();
  window.pvA11y = {
    get: function (k) { return state[k] || ''; },
    set: function (k, v) {
      if (!(k in state)) return;
      v = v && OK[k][v] ? v : '';
      state[k] = v;
      try {
        if (v) localStorage.setItem('pv-' + k, v);
        else localStorage.removeItem('pv-' + k);
      } catch (e) {}
      apply();
    }
  };
})();
