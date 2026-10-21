(function () {
  if (window.parvusVoice) return;
  var SRC = '/overhaul/parvus-talk.wav', VOLUME = 0.35, CHAR_MS = 34, COMMA_MS = 120, STOP_MS = 220;
  var ctx = null, gain = null, buf = null, loading = null;

  function muted() {
    if (window.ugSoundMuted) return window.ugSoundMuted();
    try { return localStorage.getItem('ug:sound') === 'off'; } catch (e) { return false; }
  }
  function load() {
    if (loading || !ctx) return;
    loading = fetch(SRC).then(function (r) { return r.arrayBuffer(); }).then(function (data) {
      return new Promise(function (ok, no) {
        var p = ctx.decodeAudioData(data, ok, no);
        if (p && p.then) p.then(ok, no);
      });
    }).then(function (b) { buf = b; }, function () { loading = null; });
  }
  function make() {
    var C = window.AudioContext || window.webkitAudioContext;
    if (ctx || !C) return;
    ctx = new C();
    gain = ctx.createGain();
    gain.gain.value = VOLUME;
    gain.connect(ctx.destination);
  }
  function idle() {
    if (window.requestIdleCallback) requestIdleCallback(make, { timeout: 4000 });
    else setTimeout(make, 1500);
  }
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle);
  function wake(e) {
    if (e && e.isTrusted === false) return;
    make();
    if (!ctx) return;
    if (ctx.state === 'suspended' && !muted()) {
      var r = ctx.resume();
      if (r && r.catch) r.catch(function () {});
    }
    load();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) {
    window.addEventListener(t, wake, { capture: true, passive: true });
  });

  function blip() {
    if (!ctx || !buf || muted() || ctx.state !== 'running') return;
    var s = ctx.createBufferSource();
    s.buffer = buf;
    s.playbackRate.value = 0.94 + Math.random() * 0.12;
    s.connect(gain);
    s.start();
  }

  function type(shown, rest, text, done) {
    var i = 0, said = 0, timer = 0, live = true;
    text = String(text || '');
    shown.textContent = '';
    rest.textContent = text;
    function step() {
      if (!live) return;
      i++;
      shown.textContent = text.slice(0, i);
      rest.textContent = text.slice(i);
      var ch = text.charAt(i - 1);
      if (/\S/.test(ch) && said++ % 2 === 0) blip();
      if (i >= text.length) {
        live = false;
        if (done) done();
        return;
      }
      timer = setTimeout(step, /[.!?]/.test(ch) && /\s/.test(text.charAt(i)) ? STOP_MS : /[,;:]/.test(ch) ? COMMA_MS : CHAR_MS);
    }
    timer = setTimeout(step, CHAR_MS);
    return {
      cancel: function () { live = false; clearTimeout(timer); },
      finish: function () {
        if (!live) return;
        live = false;
        clearTimeout(timer);
        shown.textContent = text;
        rest.textContent = '';
        if (done) done();
      }
    };
  }

  window.parvusVoice = {
    blip: blip,
    type: type,
    ready: function () { return !!(ctx && buf && ctx.state === 'running'); }
  };
})();
