(function () {
  if (window.pvA11y) return;
  var h = document.documentElement;
  var CVD = {
    protan: '1 0 0 0 0 0.4789 0.4769 0.0442 0 0 0.5973 -0.6887 1.0914 0 0 0 0 0 1 0',
    deutan: '1 0 0 0 0 0.1628 0.725 0.1122 0 0 0.4547 -0.6454 1.1907 0 0 0 0 0 1 0',
    tritan: '0.7412 -0.4072 0.666 0 0 0.0751 0.5852 0.3403 0 0 0 0 1 0 0 0 0 0 1 0'
  };
  var DYS = [['Space Grotesk', 80], ['Archivo Black', 85, 1], ['Audiowide', 85], ['Press Start 2P', 130], ['JetBrains Mono', 88], ['Franklin Gothic Medium', 74], ['Franklin Gothic', 74], ['ITC Franklin Gothic', 74], ['Arial', 75], ['Courier New', 85]];
  var OK = { font: { dyslexic: 1 }, cvd: CVD, motion: { calm: 1 } };
  var PARVUS = /mascot|px-body|px-wrap|ovt-dots|msg-dots/;
  var dysCss = '', dysEl = null, dysObs = null, calmEl = null, calmT = 0;
  var state = { font: '', cvd: '', motion: '' };
  var realMM = window.matchMedia ? window.matchMedia.bind(window) : null;
  window.pvRealMatchMedia = realMM;
  if (realMM) window.matchMedia = function (q) {
    if (state.motion && /prefers-reduced-motion/.test(q)) return realMM(/no-preference/.test(q) ? 'not all' : 'all');
    return realMM(q);
  };
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
    var host = document.body || document.head || h;
    [dysEl, calmEl].forEach(function (el) {
      if (el && el.parentNode && host.lastChild !== el) host.appendChild(el);
    });
  }
  function split(sel) {
    var out = [], d = 0, cur = '';
    for (var i = 0; i < sel.length; i++) {
      var c = sel.charAt(i);
      if (c === '(') d++;
      else if (c === ')') d--;
      if (c === ',' && !d) { out.push(cur); cur = ''; } else cur += c;
    }
    out.push(cur);
    return out;
  }
  function calmRules(list, out) {
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (r.media && r.cssRules && /prefers-reduced-motion:\s*reduce/.test(r.media.mediaText)) {
        for (var j = 0; j < r.cssRules.length; j++) {
          var sr = r.cssRules[j];
          if (!sr.selectorText) continue;
          var keep = split(sr.selectorText).filter(function (x) { return !PARVUS.test(x); });
          if (keep.length) out.push(keep.join(',') + '{' + sr.style.cssText + '}');
        }
      } else if (r.media && r.cssRules && /prefers-reduced-motion:\s*no-preference/.test(r.media.mediaText)) {
        for (var k = 0; k < r.cssRules.length; k++) {
          var nr = r.cssRules[k], off = '';
          if (!nr.selectorText) continue;
          if (nr.style.animationName || nr.style.animation) off += 'animation:none!important;';
          if (nr.style.transitionProperty || nr.style.transition) off += 'transition:none!important;';
          var sel = split(nr.selectorText).filter(function (x) { return !PARVUS.test(x); });
          if (off && sel.length) out.push(sel.join(',') + '{' + off + '}');
        }
      } else if (r.cssRules && !r.media) calmRules(r.cssRules, out);
    }
  }
  function calmBuild() {
    calmT = 0;
    if (!state.motion || !calmEl) return;
    var out = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sh = document.styleSheets[i];
      if (sh.ownerNode === calmEl) continue;
      try { calmRules(sh.cssRules, out); } catch (e) {}
    }
    var css = out.join('');
    if (calmEl.textContent !== css) calmEl.textContent = css;
    last();
  }
  function calmSoon() { if (!calmT) calmT = setTimeout(calmBuild, 30); }
  function watch() {
    if (dysObs || !window.MutationObserver) return;
    dysObs = new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) for (var j = 0; j < list[i].addedNodes.length; j++) {
        var n = list[i].addedNodes[j];
        if (n === dysEl || n === calmEl) continue;
        if (n.nodeName === 'STYLE' || n.nodeName === 'LINK' || (n.querySelector && n.querySelector('style,link'))) {
          last();
          if (state.motion) {
            calmSoon();
            Array.prototype.forEach.call(n.nodeName === 'LINK' ? [n] : n.querySelectorAll ? n.querySelectorAll('link') : [], function (l) { l.addEventListener('load', calmSoon); });
          }
          return;
        }
      }
    });
    dysObs.observe(document, { childList: true, subtree: true });
  }
  function calmOn(on) {
    if (on) {
      if (!calmEl) {
        calmEl = document.createElement('style');
        calmEl.id = 'pv-calm';
      }
      if (!calmEl.parentNode) (document.body || document.head || h).appendChild(calmEl);
      calmBuild();
      watch();
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', calmBuild);
      window.addEventListener('load', calmBuild);
    } else if (calmEl && calmEl.parentNode) calmEl.parentNode.removeChild(calmEl);
  }
  function dysOn(on) {
    if (on) {
      if (!dysEl) {
        dysEl = document.createElement('style');
        dysEl.id = 'pv-dys';
        dysEl.textContent = faces();
      }
      if (!dysEl.parentNode) (document.body || document.head || h).appendChild(dysEl);
      last();
      watch();
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', last);
    } else if (dysEl && dysEl.parentNode) dysEl.parentNode.removeChild(dysEl);
  }
  function apply() {
    if (state.font) h.setAttribute('data-font', state.font);
    else h.removeAttribute('data-font');
    dysOn(state.font === 'dyslexic');
    if (state.motion) h.setAttribute('data-motion', state.motion);
    else h.removeAttribute('data-motion');
    calmOn(!!state.motion);
    if (state.cvd) {
      defs();
      h.setAttribute('data-cvd', state.cvd);
    } else h.removeAttribute('data-cvd');
  }
  state.font = read('font');
  state.cvd = read('cvd');
  state.motion = read('motion');
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
