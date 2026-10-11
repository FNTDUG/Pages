(function () {
  var h = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CW = 210, CH = 222, EYE = { base: 0, blinkC: 6, pleased: 19 };
  var SND = { text: 'https://sounds.fntduserguide.com/textsound1.m4a', close: 'https://sounds.fntduserguide.com/window-move.m4a' };
  var SILENT = 'data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';
  var THINKING = "I can't answer questions just yet. My brain is still being built, but soon I'll be able to help you find guides, tier lists and patch notes.";

  window.parvusAsk = window.parvusAsk || function () {
    return new Promise(function (resolve) { setTimeout(function () { resolve(THINKING); }, 900); });
  };

  var voice = new Audio(), primed = false;
  function prime() {
    if (primed) return;
    primed = true;
    voice.src = SILENT;
    try { var r = voice.play(); if (r && r.catch) r.catch(function () { primed = false; }); } catch (e) { primed = false; }
  }
  function play(url) {
    if (!primed) return;
    voice.src = url;
    voice.volume = 0.65;
    try { var r = voice.play(); if (r && r.catch) r.catch(function () {}); } catch (e) {}
  }

  var talk = document.createElement('div');
  talk.className = 'ovt';
  talk.id = 'ovTalk';
  talk.hidden = true;
  talk.setAttribute('role', 'dialog');
  talk.setAttribute('aria-modal', 'true');
  talk.setAttribute('aria-labelledby', 'ovtTitle');
  talk.innerHTML =
    '<div class="ovt-veil"></div>' +
    '<div class="ovt-box">' +
      '<div class="ovt-side">' +
        '<div class="ovt-view" aria-hidden="true"><div class="ovt-zoom"><div class="ovt-sprite"><div class="ovt-body"></div><div class="ovt-eyes"></div></div></div></div>' +
        '<div class="ovt-side-text"><span class="ovt-name">Parvus</span><p class="ovt-note">I can\'t answer questions yet. My AI is coming soon.</p></div>' +
      '</div>' +
      '<div class="ovt-main">' +
        '<div class="ovt-head"><h2 id="ovtTitle">Ask Parvus</h2><button class="ovt-x" type="button" aria-label="Close">&#x2715;</button></div>' +
        '<div class="ovt-log" aria-live="polite"></div>' +
        '<form class="ovt-form" autocomplete="off"><label class="ovt-sr" for="ovtInput">Message Parvus</label><input id="ovtInput" type="text" maxlength="300" placeholder="Ask Parvus something..."><button class="ovt-send" type="submit">Send</button></form>' +
      '</div>' +
    '</div>';
  document.body.appendChild(talk);

  var veil = talk.querySelector('.ovt-veil'), box = talk.querySelector('.ovt-box'), view = talk.querySelector('.ovt-view');
  var zoom = talk.querySelector('.ovt-zoom'), sprite = talk.querySelector('.ovt-sprite'), eyes = talk.querySelector('.ovt-eyes');
  var log = talk.querySelector('.ovt-log'), form = talk.querySelector('.ovt-form'), input = talk.querySelector('#ovtInput'), closeBtn = talk.querySelector('.ovt-x');
  var tl = null, open = false, busy = false, blinkT = 0, greeted = false, opener = null;

  function cell(el, col, row) { el.style.backgroundPosition = (-col * CW) + 'px ' + (-row * CH) + 'px'; }
  function eyesAt(col) { cell(eyes, col, 1); }
  function blinkLoop() {
    clearTimeout(blinkT);
    if (!open) return;
    blinkT = setTimeout(function () {
      eyesAt(EYE.blinkC);
      setTimeout(function () { eyesAt(EYE.base); }, 130);
      blinkLoop();
    }, 3000 + Math.random() * 4000);
  }
  function fit() {
    var vw = view.clientWidth, vh = view.clientHeight, S = vw >= 300 ? 2 : 2 / 3;
    sprite.style.left = Math.round(vw / 2 - 105 * S) + 'px';
    sprite.style.top = Math.round(vh / 2 - 92 * S) + 'px';
    sprite.style.transform = 'scale(' + S + ')';
  }

  function scrollLog() { log.scrollTop = log.scrollHeight; }
  function addMsg(who, text) {
    var m = document.createElement('div');
    m.className = 'ovt-msg ' + (who === 'me' ? 'ovt-msg-me' : 'ovt-msg-pv');
    if (text) m.textContent = text;
    log.appendChild(m);
    scrollLog();
    return m;
  }
  function inkMsg(m) {
    var ink = window.pxInkChat;
    if (!ink) return;
    ink.attach(m);
    var side = window.innerWidth > 760;
    var cs = getComputedStyle(log);
    var avail = log.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var e, ht, left;
    for (var k = 0; k < 5; k++) {
      ink.reshape(m);
      e = m._ink.ext;
      ht = m.offsetHeight;
      if (side) ink.point(m, 'l', Math.round(ht / 2));
      left = side ? Math.max(e.l, ink.tip(m, 'l', Math.round(ht / 2))) : e.l;
      if (m.offsetWidth + left + e.r <= avail) break;
      m.style.maxWidth = Math.floor(avail - left - e.r) + 'px';
    }
    m.style.margin = Math.round(e.t) + 'px 0 ' + Math.round(e.b) + 'px ' + Math.round(left) + 'px';
    scrollLog();
    ink.splash(m);
  }
  function pvLine(text) {
    var m = addMsg('pv', '');
    var shown = document.createElement('span'), rest = document.createElement('span');
    rest.className = 'rest';
    rest.setAttribute('aria-hidden', 'true');
    rest.textContent = text;
    m.appendChild(shown);
    m.appendChild(rest);
    inkMsg(m);
    play(SND.text);
    if (reduced) { shown.textContent = text; rest.textContent = ''; return Promise.resolve(); }
    return new Promise(function (resolve) {
      var i = 0;
      setTimeout(function step() {
        i = Math.min(text.length, i + 2);
        shown.textContent = text.slice(0, i);
        rest.textContent = text.slice(i);
        if (i < text.length) setTimeout(step, 22);
        else resolve();
      }, 200);
    });
  }
  function thinking() {
    var m = addMsg('pv', '');
    m.setAttribute('aria-label', 'Parvus is thinking');
    m.innerHTML = '<span class="ovt-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    inkMsg(m);
    return m;
  }

  function afterOpen() {
    var g = window.gsap;
    if (g) g.set([box, zoom], { clearProps: 'transform' });
    fit();
    eyesAt(EYE.base);
    blinkLoop();
    if (window.matchMedia('(pointer: fine)').matches) input.focus();
    else closeBtn.focus();
    if (!greeted) {
      greeted = true;
      pvLine('Hi! What can I help you with?');
    }
  }
  function afterClose() {
    talk.hidden = true;
    h.classList.remove('ovt-on');
    if (tl) tl.timeScale(1);
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }
  function openTalk(from) {
    if (open) return;
    open = true;
    opener = from || null;
    prime();
    talk.hidden = false;
    h.classList.add('ovt-on');
    fit();
    eyesAt(EYE.pleased);
    var g = window.gsap;
    if (!g || reduced) { afterOpen(); return; }
    var b = box.getBoundingClientRect(), r = from && from.getBoundingClientRect ? from.getBoundingClientRect() : null;
    var ox = r ? Math.round(r.left + r.width / 2 - b.left) : Math.round(b.width / 2), oy = r ? Math.round(r.top + r.height * 0.3 - b.top) : Math.round(b.height / 2);
    if (tl) tl.kill();
    g.set(box, { transformOrigin: ox + 'px ' + oy + 'px' });
    tl = g.timeline({ onComplete: afterOpen, onReverseComplete: afterClose });
    tl.fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'none' }, 0)
      .fromTo(box, { scale: 0.06, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 0)
      .fromTo(zoom, { scale: 0.45 }, { scale: 1, duration: 0.7, ease: 'expo.out' }, 0.1)
      .fromTo(talk.querySelectorAll('.ovt-main > *'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.3);
  }
  function closeTalk() {
    if (!open) return;
    open = false;
    clearTimeout(blinkT);
    play(SND.close);
    if (!tl || reduced || !window.gsap) { afterClose(); return; }
    tl.timeScale(1.6).reverse();
  }

  closeBtn.addEventListener('click', closeTalk);
  veil.addEventListener('click', closeTalk);
  document.addEventListener('keydown', function (e) {
    if (open && e.key === 'Escape') { e.stopPropagation(); closeTalk(); }
  }, true);
  window.addEventListener('resize', function () { if (open) fit(); }, { passive: true });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q || busy) return;
    busy = true;
    input.value = '';
    addMsg('me', q);
    var wait = thinking();
    var done = function (text) {
      return new Promise(function (resolve) {
        if (!window.pxInkChat || reduced) { resolve(); return; }
        window.pxInkChat.unsplash(wait, resolve);
      }).then(function () {
        wait.remove();
        return pvLine(text);
      }).then(function () { busy = false; });
    };
    Promise.resolve().then(function () { return window.parvusAsk(q); }).then(function (answer) {
      return done(String(answer || '...'));
    }, function () {
      return done('Something went wrong. Try again in a moment.');
    });
  });

  window.ovTalkOpen = openTalk;
})();
