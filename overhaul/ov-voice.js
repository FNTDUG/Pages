(function () {
  if (window.parvusVoice) return;
  var SRC = '/overhaul/parvus-talk.m4a', VOLUME = 0.35, GAP = 75;
  var pool = [], turn = 0, timer = 0, primed = false;
  for (var k = 0; k < 4; k++) {
    var a = new Audio();
    a.preload = 'auto';
    a.src = SRC;
    a.preservesPitch = false;
    a.mozPreservesPitch = false;
    a.webkitPreservesPitch = false;
    pool.push(a);
  }
  function muted() {
    try { return localStorage.getItem('ug:sound') === 'off'; } catch (e) { return false; }
  }
  function prime() {
    if (primed) return;
    primed = true;
    pool.forEach(function (a) {
      a.volume = 0;
      try {
        var r = a.play();
        var done = function () { a.pause(); a.currentTime = 0; a.volume = VOLUME; };
        if (r && r.then) r.then(done, function () { primed = false; a.volume = VOLUME; });
        else done();
      } catch (e) { a.volume = VOLUME; }
    });
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) {
    window.addEventListener(t, prime, { capture: true, passive: true });
  });
  function blip() {
    if (muted()) return;
    var a = pool[turn++ % pool.length];
    a.volume = VOLUME;
    a.playbackRate = 0.92 + Math.random() * 0.16;
    try {
      a.currentTime = 0;
      var r = a.play();
      if (r && r.catch) r.catch(function () {});
    } catch (e) {}
  }
  function stop() {
    clearInterval(timer);
    timer = 0;
  }
  window.parvusVoice = {
    blip: blip,
    stop: stop,
    say: function (text) {
      stop();
      var n = Math.max(2, Math.min(14, Math.round(String(text || '').replace(/\s+/g, '').length / 5)));
      var count = 1;
      blip();
      timer = setInterval(function () {
        if (count++ >= n) { stop(); return; }
        blip();
      }, GAP);
    }
  };
})();
