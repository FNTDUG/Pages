// ─── SHARED NAV ───────────────────────────────────────────────────────────────
// Edit the two templates below to add/remove tabs or change nav style.
// Changes here instantly apply to every page — no per-page edits needed.
// ─────────────────────────────────────────────────────────────────────────────

const MOBILE_NAV_BODY = `
<a href="/" class="ug-mn-link" data-nav-href="/">Home</a>
<!-- HIDDEN-NEWS
<a href="/news" class="ug-mn-link" data-nav-href="/news">News</a>
-->
<div class="ug-mn-section">
  <button class="ug-mn-section-btn" onclick="ugMnToggle(this)">FNTD1 <span class="ug-mn-section-arrow">/</span></button>
  <div class="ug-mn-section-items">
    <a href="/fntd1/meta-teams"     class="ug-mn-child" data-nav-href="/fntd1/meta-teams">Meta Teams</a>
    <a href="/fntd1/charts-tierlists" class="ug-mn-child" data-nav-href="/fntd1/charts-tierlists">Charts</a>
    <a href="/fntd1/tierlists"      class="ug-mn-child" data-nav-href="/fntd1/tierlists">TierLists</a>
    <a href="/fntd1/other-charts"   class="ug-mn-child" data-nav-href="/fntd1/other-charts">Other Charts</a>
    <a href="/fntd1/pvp-ranked"     class="ug-mn-child" data-nav-href="/fntd1/pvp-ranked">PvP/Ranked</a>
    <a href="/fntd1/endless"        class="ug-mn-child" data-nav-href="/fntd1/endless">Endless</a>
    <a href="/fntd1/event-endless"  class="ug-mn-child" data-nav-href="/fntd1/event-endless">Event Endless</a>
    <a href="/fntd1/night-shift"    class="ug-mn-child" data-nav-href="/fntd1/night-shift">Night Shift</a>
    <a href="/fntd1/boss-raids"     class="ug-mn-child" data-nav-href="/fntd1/boss-raids">Boss Raids</a>
  </div>
</div>
<div class="ug-mn-section">
  <button class="ug-mn-section-btn" onclick="ugMnToggle(this)">FNTD2 <span class="ug-mn-section-arrow">/</span></button>
  <div class="ug-mn-section-items">
    <a href="/fntd2/meta-teams"       class="ug-mn-child" data-nav-href="/fntd2/meta-teams">Meta Teams</a>
    <a href="/fntd2/unit-engine"         class="ug-mn-child" data-nav-href="/fntd2/unit-engine">Unit Engine</a>
    <a href="/fntd2/trade-calculator"    class="ug-mn-child" data-nav-href="/fntd2/trade-calculator">Trade Calculator</a>
    <a href="/fntd2/tierlists-1"         class="ug-mn-child" data-nav-href="/fntd2/tierlists-1">TierLists</a>
    <a href="/fntd2/story-index"         class="ug-mn-child" data-nav-href="/fntd2/story-index">Story &amp; Index</a>
    <a href="/fntd2/endless-index"       class="ug-mn-child" data-nav-href="/fntd2/endless-index">Endless &amp; Index</a>
    <a href="/fntd2/boss-raids-index"    class="ug-mn-child" data-nav-href="/fntd2/boss-raids-index">Boss Raids &amp; Index</a>
    <a href="/fntd2/challenges"          class="ug-mn-child" data-nav-href="/fntd2/challenges">Challenges</a>
    <!-- HIDDEN-EVENT-SE: delete this comment wrapper to bring the link back
    <a href="/fntd2/event-story-endless" class="ug-mn-child" data-nav-href="/fntd2/event-story-endless">Event Story &amp; Endless</a>
    -->
  </div>
</div>
<div class="ug-mn-section">
  <button class="ug-mn-section-btn" onclick="ugMnToggle(this)">BBN <span class="ug-mn-section-arrow">/</span></button>
  <div class="ug-mn-section-items">
    <a href="/bbn/bite-by-night-tierlists" class="ug-mn-child" data-nav-href="/bbn/bite-by-night-tierlists">TierLists &amp; Maps</a>
    <a href="/bbn/killer-terminal"         class="ug-mn-child" data-nav-href="/bbn/killer-terminal">Killer Terminal</a>
    <a href="/bbn/survivor-terminal"       class="ug-mn-child" data-nav-href="/bbn/survivor-terminal">Survivor Terminal</a>
  </div>
</div>
<div class="ug-mn-section">
  <button class="ug-mn-section-btn" onclick="ugMnToggle(this)">Patch Notes <span class="ug-mn-section-arrow">/</span></button>
  <div class="ug-mn-section-items">
    <a href="/patch-notes/fntd1-1"        class="ug-mn-child" data-nav-href="/patch-notes/fntd1-1">FNTD1</a>
    <a href="/patch-notes"                class="ug-mn-child" data-nav-href="/patch-notes">FNTD2</a>
    <a href="/patch-notes/bbn-patch-notes" class="ug-mn-child" data-nav-href="/patch-notes/bbn-patch-notes">BBN</a>
  </div>
</div>
<div class="ug-mn-discord-wrap">
  <a href="https://discord.gg/6Y84tuFBB3" target="_blank" rel="noopener noreferrer" class="ug-mn-discord">Join Discord</a>
</div>`;

const DESKTOP_NAV_INNER = `
<a href="/" class="ug-tn-link" data-nav-href="/">Home</a>
<!-- HIDDEN-NEWS
<a href="/news" class="ug-tn-link" data-nav-href="/news">News</a>
-->
<div class="ug-tn-item">
  <button class="ug-tn-btn" onclick="ugTnToggle(this)">FNTD1 <span class="ug-tn-arrow">/</span></button>
  <div class="ug-tn-drop">
    <a href="/fntd1/meta-teams"       data-nav-href="/fntd1/meta-teams">Meta Teams</a>
    <a href="/fntd1/charts-tierlists" data-nav-href="/fntd1/charts-tierlists">Charts</a>
    <a href="/fntd1/tierlists"        data-nav-href="/fntd1/tierlists">TierLists</a>
    <a href="/fntd1/other-charts"     data-nav-href="/fntd1/other-charts">Other Charts</a>
    <a href="/fntd1/pvp-ranked"       data-nav-href="/fntd1/pvp-ranked">PvP/Ranked</a>
    <a href="/fntd1/endless"          data-nav-href="/fntd1/endless">Endless</a>
    <a href="/fntd1/event-endless"    data-nav-href="/fntd1/event-endless">Event Endless</a>
    <a href="/fntd1/night-shift"      data-nav-href="/fntd1/night-shift">Night Shift</a>
    <a href="/fntd1/boss-raids"       data-nav-href="/fntd1/boss-raids">Boss Raids</a>
  </div>
</div>
<div class="ug-tn-item">
  <button class="ug-tn-btn" onclick="ugTnToggle(this)">FNTD2 <span class="ug-tn-arrow">/</span></button>
  <div class="ug-tn-drop">
    <a href="/fntd2/meta-teams"        data-nav-href="/fntd2/meta-teams">Meta Teams</a>
    <a href="/fntd2/unit-engine"          data-nav-href="/fntd2/unit-engine">Unit Engine</a>
    <a href="/fntd2/trade-calculator"     data-nav-href="/fntd2/trade-calculator">Trade Calculator</a>
    <a href="/fntd2/tierlists-1"          data-nav-href="/fntd2/tierlists-1">TierLists</a>
    <a href="/fntd2/story-index"          data-nav-href="/fntd2/story-index">Story &amp; Index</a>
    <a href="/fntd2/endless-index"        data-nav-href="/fntd2/endless-index">Endless &amp; Index</a>
    <a href="/fntd2/boss-raids-index"     data-nav-href="/fntd2/boss-raids-index">Boss Raids &amp; Index</a>
    <a href="/fntd2/challenges"           data-nav-href="/fntd2/challenges">Challenges</a>
    <!-- HIDDEN-EVENT-SE: delete this comment wrapper to bring the link back
    <a href="/fntd2/event-story-endless"  data-nav-href="/fntd2/event-story-endless">Event Story &amp; Endless</a>
    -->
  </div>
</div>
<div class="ug-tn-item">
  <button class="ug-tn-btn" onclick="ugTnToggle(this)">BBN <span class="ug-tn-arrow">/</span></button>
  <div class="ug-tn-drop">
    <a href="/bbn/bite-by-night-tierlists" data-nav-href="/bbn/bite-by-night-tierlists">TierLists &amp; Maps</a>
    <a href="/bbn/killer-terminal"         data-nav-href="/bbn/killer-terminal">Killer Terminal</a>
    <a href="/bbn/survivor-terminal"       data-nav-href="/bbn/survivor-terminal">Survivor Terminal</a>
  </div>
</div>
<div class="ug-tn-item">
  <button class="ug-tn-btn" onclick="ugTnToggle(this)">Patch Notes <span class="ug-tn-arrow">/</span></button>
  <div class="ug-tn-drop">
    <a href="/patch-notes/fntd1-1"         data-nav-href="/patch-notes/fntd1-1">FNTD1</a>
    <a href="/patch-notes"                 data-nav-href="/patch-notes">FNTD2</a>
    <a href="/patch-notes/bbn-patch-notes" data-nav-href="/patch-notes/bbn-patch-notes">BBN</a>
  </div>
</div>
<a href="https://discord.gg/6Y84tuFBB3" target="_blank" rel="noopener noreferrer" class="ug-tn-link">Discord</a>`;

const NAV_CSS = `<style>
#ug-topnav{display:none!important}
#ug-hamburger{display:flex!important;text-transform:uppercase}
.ug-mn-close{display:none!important}
#ug-mobile-nav{will-change:transform;width:min(290px,88vw)!important}
#ug-overlay{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;z-index:1040!important}
#ug-info-btn{display:flex;align-items:center;position:fixed;top:47px;right:12px;z-index:1099;background:linear-gradient(135deg,rgba(58,10,56,.95),rgba(18,3,38,.95));border:1px solid rgba(255,164,91,.45);border-radius:22px;padding:9px 13px 9px 10px;cursor:pointer;color:rgba(255,255,255,.9);font-family:'Audiowide',sans-serif;font-size:10px;letter-spacing:.4px;transition:background .15s,border-color .15s,box-shadow .15s;box-shadow:0 2px 14px rgba(0,0,0,.6),0 0 0 1px rgba(104,31,98,.3)}
#ug-info-btn:hover{background:linear-gradient(135deg,rgba(104,31,98,.95),rgba(58,10,56,.95));border-color:rgba(255,164,91,.7);box-shadow:0 2px 18px rgba(0,0,0,.7),0 0 0 1px rgba(255,164,91,.2)}
/* Sound toggle — same shell as the Menu/INFO buttons, round because it is
   icon-only. Two states: speaker with waves (on), speaker with a cross and a
   red pill (off).
   z-index sits just under the INFO overlay (1048) and panel (1050), unlike the
   INFO button itself at 1099 which stays on top so it can be tapped to close.
   The sound button has no job while a panel is open, so it slides underneath
   instead of floating over the panel's content. The nav drawer and the INFO
   panel are both anchored right and wider than this button, so either one
   covers it completely. */
#ug-sound-btn{display:flex;align-items:center;justify-content:center;position:fixed;top:86px;right:12px;z-index:1047;width:32px;height:32px;padding:0;background:linear-gradient(135deg,rgba(58,10,56,.95),rgba(18,3,38,.95));border:1px solid rgba(255,164,91,.45);border-radius:50%;cursor:pointer;color:rgba(255,255,255,.92);transition:background .15s,border-color .15s,box-shadow .15s,color .15s;box-shadow:0 2px 14px rgba(0,0,0,.6),0 0 0 1px rgba(104,31,98,.3)}
#ug-sound-btn:hover{background:linear-gradient(135deg,rgba(104,31,98,.95),rgba(58,10,56,.95));border-color:rgba(255,164,91,.7);box-shadow:0 2px 18px rgba(0,0,0,.7),0 0 0 1px rgba(255,164,91,.2)}
#ug-sound-btn svg{width:16px;height:16px;display:block}
#ug-sound-btn .ug-snd-off{display:none}
#ug-sound-btn.muted{color:#ff9090;border-color:rgba(255,120,120,.55);background:linear-gradient(135deg,rgba(74,12,26,.95),rgba(26,4,12,.95))}
#ug-sound-btn.muted .ug-snd-on{display:none}
#ug-sound-btn.muted .ug-snd-off{display:block}
/* A mobile anchor ad is fixed to the bottom of the viewport above everything, so
   it covers the last row of the panel. Raising the panel over it is not an option —
   that obscures a served ad — so the panel reserves the anchor's measured height
   instead. --ug-anchor is 0 until one is actually detected, so no dead space when
   anchors are off or on desktop. */
:root{--ug-anchor:0px}
@media(max-width:768px){#ug-info-panel{padding-bottom:calc(var(--ug-anchor) + 34px)}}
#ug-info-panel{position:fixed;top:0;right:0;width:min(290px,88vw);height:100vh;background:linear-gradient(180deg,#0d0120 0%,#070110 100%);border-left:1px solid rgba(255,164,91,.12);z-index:1050;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-6px 0 40px rgba(0,0,0,.9);scrollbar-width:thin;scrollbar-color:rgba(255,164,91,.2) transparent}
#ug-info-panel::-webkit-scrollbar{width:3px}
#ug-info-panel::-webkit-scrollbar-thumb{background:rgba(255,164,91,.25);border-radius:2px}
#ug-info-panel .ug-mn-header{position:sticky;top:0;z-index:2}
#ug-info-panel.open{transform:translateX(0)}
#ug-info-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.62);z-index:1048}
#ug-info-overlay.open{display:block}
@media(max-width:768px){
  #ug-hamburger:hover,#ug-hamburger:focus,#ug-hamburger:active{background:linear-gradient(135deg,rgba(58,10,56,.95),rgba(18,3,38,.95))!important;border-color:rgba(255,164,91,.45)!important;box-shadow:0 2px 14px rgba(0,0,0,.6),0 0 0 1px rgba(104,31,98,.3)!important;outline:none!important}
  #ug-info-btn:hover,#ug-info-btn:focus,#ug-info-btn:active{background:linear-gradient(135deg,rgba(58,10,56,.95),rgba(18,3,38,.95))!important;border-color:rgba(255,164,91,.45)!important;box-shadow:0 2px 14px rgba(0,0,0,.6),0 0 0 1px rgba(104,31,98,.3)!important;outline:none!important}
  #ug-sound-btn:hover,#ug-sound-btn:focus,#ug-sound-btn:active{background:linear-gradient(135deg,rgba(58,10,56,.95),rgba(18,3,38,.95))!important;border-color:rgba(255,164,91,.45)!important;box-shadow:0 2px 14px rgba(0,0,0,.6),0 0 0 1px rgba(104,31,98,.3)!important;outline:none!important}
  #ug-sound-btn.muted:hover,#ug-sound-btn.muted:focus,#ug-sound-btn.muted:active{background:linear-gradient(135deg,rgba(74,12,26,.95),rgba(26,4,12,.95))!important;border-color:rgba(255,120,120,.55)!important}
}
@media(min-width:769px){
  #ug-hamburger{top:14px;right:12px;padding:11px 20px 11px 16px;font-size:13px;border-radius:28px;gap:8px}
  #ug-hamburger .hmb-icon{font-size:21px}
  #ug-info-btn{top:63px;right:12px;padding:14px 20px 14px 16px;font-size:13px;border-radius:28px;gap:8px}
  #ug-sound-btn{top:116px;right:12px;width:46px;height:46px}
  #ug-sound-btn svg{width:22px;height:22px}
  #ug-mobile-nav{width:350px!important}
  #ug-info-panel{width:420px}
  .ug-mn-brand-logo{width:44px;height:44px}
  .ug-mn-brand-name{font-size:16px}
  .ug-mn-close{width:40px;height:40px;font-size:20px}
  .ug-mn-link{font-size:15px;padding:16px 24px}
  .ug-mn-section-btn{font-size:13px;padding:15px 24px}
  .ug-mn-child{font-size:14px;padding:13px 24px 13px 36px}
  .ug-mn-discord{font-size:14px}
}
.inf-drop{border-bottom:1px solid rgba(255,164,91,0.1)}
.inf-drop-btn{display:flex;align-items:center;justify-content:space-between;width:100%;padding:13px 18px;background:none;border:none;color:rgba(255,255,255,.7);font-family:'Audiowide',sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;text-align:left;transition:background .12s,color .12s}
.inf-drop-btn:hover{background:rgba(255,164,91,.05)}
.inf-drop.open>.inf-drop-btn{color:#ffa45b}
.inf-drop-arrow{font-size:13px;opacity:.55;font-family:monospace,Arial;transition:opacity .12s,color .12s;min-width:.8em;text-align:center}
.inf-drop.open .inf-drop-arrow{opacity:1;color:#ffa45b}
.ug-mn-section-btn{color:rgba(255,255,255,.7)!important}
.ug-mn-section.open>.ug-mn-section-btn{color:#ffa45b!important}
.inf-drop-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.inf-drop.open .inf-drop-body{max-height:4000px}
.inf-drop-inner{padding:10px 14px 16px;display:flex;flex-direction:column;gap:8px}
.inf-mg-item{display:flex;align-items:center;gap:12px;width:100%;background:#1a1b1e;border:none;border-radius:8px;padding:14px;position:relative;cursor:pointer;text-align:left;font-family:'Audiowide',sans-serif;color:#e8e8e8;font-size:13px;letter-spacing:.5px;transition:background .12s,transform .08s}
.inf-mg-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#ffa45b;border-radius:3px 0 0 3px;box-shadow:0 0 8px rgba(255,164,91,.25)}
.inf-mg-item:hover{background:#232427}
.inf-mg-item:active{transform:scale(.99)}
.inf-mg-play{display:flex;align-items:center;justify-content:center;width:30px;height:30px;flex-shrink:0;border-radius:50%;background:rgba(255,164,91,.15)}
.inf-mg-play::before{content:'';display:block;width:0;height:0;border-style:solid;border-width:6px 0 6px 9px;border-color:transparent transparent transparent #ffa45b;margin-left:2px}
.inf-mg-name{flex:1;line-height:1.4}
.inf-mg-wrap{display:flex;flex-direction:column}
.inf-mg-drop{max-height:0;overflow:hidden;transition:max-height .3s ease}
.inf-mg-wrap.open .inf-mg-drop{max-height:80vh;margin-top:8px}
.inf-mg-video-wrap{position:relative;cursor:pointer;border-radius:8px;overflow:hidden;background:#000;border:1px solid rgba(255,164,91,.25);line-height:0}
.inf-mg-video{display:block;width:100%;height:auto;max-height:76vh;background:#000}
.inf-mg-fs-hint{position:absolute;bottom:6px;right:8px;background:rgba(0,0,0,.62);color:#fff;font-size:8px;font-family:'Press Start 2P',monospace;padding:4px 6px;border-radius:5px;pointer-events:none;letter-spacing:.5px}
.inf-mg-fs{position:fixed;inset:0;z-index:20000;background:#000;display:flex;align-items:center;justify-content:center}
.inf-mg-fs video{width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;background:#000}
.inf-mg-fs-close{position:fixed;top:14px;right:16px;z-index:20001;width:42px;height:42px;border-radius:50%;background:rgba(20,10,30,.82);border:1px solid rgba(255,164,91,.4);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.inf-card{background:#1a1b1e;border-radius:8px;padding:12px 14px;position:relative;line-height:1.75}
.inf-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#ffa45b;border-radius:3px 0 0 3px;box-shadow:0 0 8px rgba(255,164,91,.25)}
.inf-card h4{font-family:'Audiowide',sans-serif;font-size:15px;color:#ffa45b;margin:0 0 6px;letter-spacing:.5px}
.inf-card p{font-size:13px;color:#ccc;line-height:1.75;margin:0}
.inf-card p+p{margin-top:6px}
.inf-img{display:inline-flex;vertical-align:middle;width:38px;height:38px;border-radius:10px;padding:2px;margin:0 3px;flex-shrink:0;overflow:hidden}
.inf-img img{width:100%;height:100%;object-fit:contain;border-radius:8px;display:block;background:rgba(10,8,22,.9)}
/* Status Effects icons are pixel art — keep the edges crisp instead of letting
   the browser smooth them. Scoped to that tab so no other badge is affected. */
#inf-status-effects-inner .inf-img img{image-rendering:pixelated;image-rendering:crisp-edges}
.inf-rarity-nightmare{background:linear-gradient(135deg,#492590,#2A1E42)}
.inf-rarity-secret{background:linear-gradient(135deg,#FF8800,#FF0C0C)}
.inf-rarity-mythic{background:linear-gradient(135deg,#FFB81F,#FFFF00)}
.inf-rarity-exclusive{background:linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))}
.inf-rarity-epic{background:linear-gradient(135deg,#FF35FF,#87009F)}
.inf-rarity-rare{background:linear-gradient(135deg,#58A6FF,#1C3AA0)}
.inf-rarity-uncommon{background:linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))}
.inf-rarity-apex{background:linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))}
.inf-rarity-hero{background:linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))}
.inf-rarity-radiant{background:linear-gradient(135deg,#FF6600,#FFCC33)}
@keyframes infShiny{0%{background-position:0% 50%}100%{background-position:200% 50%}}
.inf-rarity-shiny{background:linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red);background-size:200% auto;animation:infShiny 6s linear infinite}
.inf-shiny-text{background:linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;font-weight:600;animation:infShiny 6s linear infinite}
.ug-status-badge{white-space:nowrap}
@media(max-width:768px){.ug-status-badge{font-size:8px;padding:4px 10px}#ug-info-panel{height:-webkit-fill-available;height:100dvh}}
.inf-subdrop{border-bottom:1px solid rgba(255,164,91,.06)}
.inf-subdrop-btn{display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;background:none;border:none;cursor:pointer;text-align:left;transition:background .12s}
.inf-subdrop-btn:hover{background:rgba(255,164,91,.04)}
.inf-subdrop.open>.inf-subdrop-btn{background:rgba(255,164,91,.05)}
.inf-subdrop-body{max-height:0;overflow:hidden;transition:max-height .35s ease}
.inf-subdrop.open .inf-subdrop-body{max-height:2400px}
.inf-subdrop-inner{padding:8px 10px 12px;display:flex;flex-direction:column;gap:6px}
.inf-reward-row{display:flex;align-items:center;gap:8px}
.inf-reward-name{font-size:13px;color:#ccc;flex:1;min-width:0;word-break:break-word}
.inf-reward-chance{font-size:13px;color:#ffa45b;font-family:Audiowide,sans-serif;white-space:nowrap;flex-shrink:0}
/* ── INFO panel mode switch + rotations ── */
/* #ug-info-btn is fixed at z-index 1099, above the panel's 1050, so it hangs over
   the top-right of the panel and lands on the Rotations button. The top padding
   clears its lower edge: it sits at top:47px on a phone and top:63px from 769px up,
   and is taller on desktop. */
.inf-modes{display:flex;gap:6px;padding:32px 14px 0;background:rgba(4,1,12,.96)}
@media(min-width:769px){.inf-modes{padding:46px 14px 0}}
.inf-mode{flex:1;padding:8px 6px;background:rgba(255,255,255,.04);border:1px solid rgba(255,164,91,.18);border-radius:7px;color:rgba(255,255,255,.55);font-family:'Audiowide',sans-serif;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;line-height:1.35;transition:background .13s,border-color .13s,color .13s}
.inf-mode.on{background:rgba(255,164,91,.13);border-color:rgba(255,164,91,.5);color:#ffa45b}
.inf-rt{display:block;font-family:'Press Start 2P',cursive;font-size:7px;letter-spacing:1px;margin-top:5px;color:rgba(255,255,255,.38)}
.inf-mode.on .inf-rt{color:rgba(255,164,91,.85)}
.inf-rt.soon{color:#ff8f6b}
#inf-rot{display:none}
#ug-info-panel[data-mode="rot"] #inf-rot{display:block}
#ug-info-panel[data-mode="rot"] #ug-info-body{display:none}
#ug-info-panel.searching #inf-rot{display:none!important}
.rot-row{display:flex;align-items:center;gap:10px}
.rot-row h4{margin:0}
.rot-main{flex:1;min-width:0}
.rot-meta{font-size:11px;color:rgba(255,255,255,.45);line-height:1.5;margin-top:2px}
.rot-price{font-size:13.5px;font-weight:700;color:#e8e8e8;margin-top:3px}
/* ── Hero upgrade paths ── */
.hp-wrap{margin-top:8px}
.hp-wrap .inf-subdrop{margin-top:6px;border-radius:8px;overflow:hidden;background:rgba(255,255,255,.035);border:1px solid rgba(255,164,91,.16);transition:background .14s,border-color .14s}
.hp-wrap .inf-subdrop.open{background:rgba(255,164,91,.08);border-color:rgba(255,164,91,.45)}
.hp-wrap .inf-subdrop-btn{padding:10px 12px;gap:10px}
.hp-btn-label{font-family:'Audiowide',sans-serif;font-size:10.5px;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,255,255,.7);flex:1;text-align:left;transition:color .14s}
.inf-subdrop.open .hp-btn-label{color:#ffa45b}
.hp-arrow{font-family:monospace,Arial;font-size:15px;line-height:1;color:rgba(255,164,91,.65);flex-shrink:0;display:inline-block;transition:transform .2s ease,color .14s}
.inf-subdrop.open .hp-arrow{transform:rotate(90deg);color:#ffa45b}
.hp-tier{display:flex;gap:11px;align-items:flex-start;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
/* An ad is appended at the foot of an opened sub-drop, which makes it the last
   child — so the final tier needs its rule dropped when one follows, and the ad's
   own top border would double up with it. */
.hp-tier:last-child,.hp-tier:has(+ .inf-ad){border-bottom:none}
.hp-wrap .inf-ad-sub{border-top:none;padding-top:10px}
.hp-img{width:42px;height:42px;flex-shrink:0;object-fit:contain;display:block}
.hp-main{flex:1;min-width:0}
.hp-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
.hp-name{font-family:'Audiowide',sans-serif;font-size:11px;color:#e8e8e8;letter-spacing:.5px}
.hp-cost{font-family:'Audiowide',sans-serif;font-size:10px;color:#ffa45b;white-space:nowrap;flex-shrink:0}
.hp-quest{font-size:13px;color:#ccc;line-height:1.7;margin-top:4px}
.hp-eff{font-size:12.5px;color:#ccc;line-height:1.6;margin-top:3px}
.rot-group{font-family:'Audiowide',sans-serif;font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,164,91,.85);padding:12px 0 2px}
.rot-group:first-child{padding-top:2px}
.rot-obj{font-size:12px;color:#ccc;line-height:1.7}
.rot-wait{padding:24px 16px;text-align:center;color:rgba(255,255,255,.4);font-size:13px}
/* ── INFO panel search ── */
.inf-topstick{position:sticky;top:0;z-index:3}
.inf-topstick .ug-mn-header{position:static}
.inf-search{padding:11px 14px;background:rgba(4,1,12,.96);border-bottom:1px solid rgba(255,164,91,.14)}
.inf-sfield{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,164,91,.22);border-radius:7px;padding:9px 10px;transition:border-color .13s,background .13s}
.inf-sfield:focus-within{border-color:rgba(255,164,91,.6);background:rgba(255,255,255,.07)}
.inf-sicon{width:13px;height:13px;flex-shrink:0}
.inf-sicon circle,.inf-sicon line{stroke:#ffa45b;stroke-width:2;fill:none;stroke-linecap:round;opacity:.6}
#inf-q{flex:1;min-width:0;background:none;border:none;outline:none;color:#fff;font-family:inherit;font-size:16px;line-height:1.3;padding:0;appearance:none;-webkit-appearance:none;border-radius:0}
@media(min-width:769px){.inf-sfield{padding:7px 10px}#inf-q{font-size:13px}}
#inf-q::placeholder{color:rgba(255,255,255,.3)}
#inf-q::-webkit-search-cancel-button,#inf-q::-webkit-search-decoration{-webkit-appearance:none;display:none}
.inf-sclear{display:none;width:17px;height:17px;flex-shrink:0;align-items:center;justify-content:center;border:none;border-radius:50%;background:rgba(255,255,255,.13);color:rgba(255,255,255,.6);font-size:10px;line-height:1;cursor:pointer;padding:0;font-family:inherit}
.inf-scount{display:none;margin-top:8px;font-family:'Press Start 2P',cursive;font-size:7px;letter-spacing:1.5px;color:rgba(255,164,91,.85);line-height:1.6;justify-content:space-between;gap:12px}
#ug-info-panel.searching .inf-sclear{display:flex}
#ug-info-panel.searching .inf-scount{display:flex}
#ug-info-panel.searching #ug-info-body{display:none}
#inf-results{display:none;padding-bottom:22px}
#ug-info-panel.searching #inf-results{display:block}
.inf-rgroup{font-family:'Audiowide',sans-serif;font-size:9px;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,164,91,.85);padding:14px 14px 7px;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.inf-rgroup em{font-style:normal;font-family:'Press Start 2P',cursive;font-size:7px;letter-spacing:1px;color:rgba(255,255,255,.32)}
.inf-ritems{padding:0 14px;display:flex;flex-direction:column;gap:8px}
.inf-hit{display:flex;align-items:center;gap:10px;cursor:pointer}
.inf-hit h4{margin:0}
.inf-hit mark{background:rgba(255,164,91,.26);color:#ffd2a8;border-radius:2px;padding:0 1px}
.inf-hmain{flex:1;min-width:0}
.inf-hcat{font-family:monospace,Arial;font-size:9px;letter-spacing:.5px;text-transform:uppercase;color:rgba(255,255,255,.34);margin-top:3px}
.inf-hgo{color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6;flex-shrink:0}
.inf-btxt{display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:8px;background:#100e14;font-family:'Audiowide',sans-serif;font-size:15px;color:#fff}
.inf-drop{transition:background .4s ease}
.inf-drop.inf-flash{background:rgba(255,164,91,.09)}
.inf-rempty{padding:26px 18px;text-align:center;color:rgba(255,255,255,.4);font-size:13px;line-height:1.7}
.inf-rmore{padding:16px 14px;text-align:center;font-family:'Press Start 2P',cursive;font-size:7px;letter-spacing:1px;color:rgba(255,255,255,.3);line-height:1.8}
/* ── INFO panel ad slots ── */
.ug-cad{margin:20px 0;padding:16px 0;border-top:1px solid rgba(255,164,91,.14);border-bottom:1px solid rgba(255,164,91,.14)}
.ug-cad:empty{display:none}
/* Clean-Mode retired in favour of the per-ad close button. Hidden rather than
   cut from 30 files: the pill's wrapper exists only to hold it, and the page's
   own toggle script no-ops against an element nobody can click. */
div:has(> #cleanModeToggle:only-child){display:none!important}
#cleanModeToggle,.clean-text{display:none!important}
.ug-xd{display:flex;justify-content:flex-end;margin:0 0 18px}
.ug-xd-btn{position:relative;width:23px;height:23px;flex-shrink:0;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,164,91,.28);color:rgba(255,255,255,.5);font-size:10px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;font-family:inherit;transition:background .13s,color .13s}
.ug-xd-btn::after{content:'';position:absolute;inset:-8px}
.ug-xd-btn:hover{background:rgba(255,164,91,.15);color:#ffa45b}
.ug-rail-in .ug-xd{margin:0 0 10px}
.ug-cad:has(ins[data-ad-status="unfilled"]),.inf-ad:has(ins[data-ad-status="unfilled"]),.ug-rail:has(ins[data-ad-status="unfilled"]){display:none!important}
@media(min-width:1200px){.ug-cad{display:none!important}}
.ug-rail{position:absolute;z-index:500;display:none;pointer-events:auto}
.ug-rail-in{position:sticky;top:180px;text-align:center}
@media(max-width:1199px){.ug-rail{display:none!important}}
.inf-ad{padding:26px 14px;border-top:1px solid rgba(255,164,91,.1);border-bottom:1px solid rgba(255,164,91,.1)}
.inf-ad-in{padding:16px 0;border-top:1px solid rgba(255,164,91,.1);border-bottom:1px solid rgba(255,164,91,.1)}
.inf-ad-sub{padding:14px 0 2px;border-top:1px solid rgba(255,164,91,.1);border-bottom:0}
.inf-ad:empty{padding:0;border:0;min-height:0;margin:0}
.inf-ad-label{font-family:monospace,Arial;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.34);margin-bottom:9px}
.inf-ad ins{display:block}
/* ── Site footer (single-source: content + style come from the worker) ── */
#ug-footer{position:relative;overflow:hidden;background:linear-gradient(180deg,#120326 0%,#3a0a38 30%,#681f62 55%,#3a0a38 78%,#120326 100%);box-shadow:0 -4px 28px rgba(104,31,98,.45);padding:22px 20px;text-align:center;font-size:13px;color:#fff;line-height:2.2;margin-top:24px}
#ug-footer::before{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0px,transparent 3px,rgba(0,0,0,.07) 3px,rgba(0,0,0,.07) 4px)}
#ug-footer p{position:relative;z-index:1}
#ug-footer a{color:#ffa45b;text-decoration:none;position:relative;z-index:1}
#ug-footer a:hover{text-decoration:underline}
</style>`;
// Single-source site footer — injected into every page's <footer id="ug-footer">.
// Change links/text here once instead of in each page.
const FOOTER_HTML = `
      <p>HUGE thanks to <a href="https://vgen.co/epiiepsi" target="_blank" rel="noopener noreferrer">eps</a> for the mascot art work — you can commission them and see more of their work there if you want to support them!</p>
      <p><a href="https://discord.gg/6Y84tuFBB3" target="_blank" rel="noopener noreferrer">Discord</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="https://vgen.co/epiiepsi" target="_blank" rel="noopener noreferrer">eps Portfolio</a></p>
      <p><a href="/privacy-policy" rel="noopener">Privacy Policy</a></p>
      <p>&copy; 2025 www.fntduserguide.com</p>`;

// ─── SOUND GOVERNOR ───────────────────────────────────────────────────────────
// Injected into <head> so it is in place before any page script can create a
// sound. Every noise on the site funnels through HTMLMediaElement.play(): the
// BBN terminals' new Audio() voice lines, the <audio> tags inside the Unit
// Engine and Trade Calculator (which arrive long after load, fetched from the
// characters.json repo and inlined with createContextualFragment), and the INFO
// panel's videos. Patching the prototype once covers all of them, whenever they
// appear, without touching a single page.
//
// Muting STOPS audio rather than turning it down. A media element left playing
// at volume 0 still holds the device's audio focus, and on phones that pauses
// or ducks whatever the visitor already had going — so turning our sound "off"
// would kill their music. Video is treated differently: it is muted but left
// running, so a video someone is watching is silenced, not interrupted.
const SOUND_GOVERNOR = `<script>
(function(){
  var KEY='ug:sound';
  var muted=false;
  try{muted=localStorage.getItem(KEY)==='off';}catch(e){}
  var ctxs=[];

  function silence(el){
    if(el.tagName==='VIDEO'){
      // Only mark what we muted ourselves, so unmuting later never un-silences
      // something a page deliberately kept quiet (the BBN camera feed sets
      // muted=true on purpose).
      if(!el.muted){el.muted=true;el.setAttribute('data-ug-silenced','');}
    }else{
      try{el.pause();}catch(e){}
    }
  }
  function restore(el){
    if(el.getAttribute&&el.getAttribute('data-ug-silenced')!==null){
      el.muted=false;el.removeAttribute('data-ug-silenced');
    }
  }
  function applyAll(){
    var m=document.querySelectorAll('audio,video');
    for(var i=0;i<m.length;i++){if(muted){silence(m[i]);}else{restore(m[i]);}}
    for(var j=0;j<ctxs.length;j++){try{if(muted){ctxs[j].suspend();}else{ctxs[j].resume();}}catch(e){}}
  }

  var MP=window.HTMLMediaElement&&HTMLMediaElement.prototype;
  if(MP&&MP.play){
    var nativePlay=MP.play;
    MP.play=function(){
      if(muted){
        if(this.tagName==='VIDEO'){silence(this);}
        // Resolve rather than reject: callers treat a rejection as "autoplay was
        // blocked" and retry on first tap, which would just fail again.
        else{try{this.pause();}catch(e){}return Promise.resolve();}
      }
      return nativePlay.apply(this,arguments);
    };
  }
  // Catches anything that starts without going through play() — an autoplay
  // attribute, say. 'play' does not bubble, hence capture.
  document.addEventListener('play',function(e){if(muted)silence(e.target);},true);

  // Nothing uses Web Audio today, but a suspended context is the only way to
  // stop it holding audio focus if anything ever does.
  ['AudioContext','webkitAudioContext'].forEach(function(n){
    var C=window[n];if(!C)return;
    function W(o){var c=new C(o);ctxs.push(c);if(muted){try{c.suspend();}catch(e){}}return c;}
    W.prototype=C.prototype;window[n]=W;
  });

  function paint(){
    var b=document.getElementById('ug-sound-btn');if(!b)return;
    b.classList.toggle('muted',muted);
    b.setAttribute('aria-pressed',muted?'true':'false');
    var lbl=muted?'Unmute site sounds':'Mute site sounds';
    b.setAttribute('aria-label',lbl);b.setAttribute('title',lbl);
  }
  window.ugSoundPaint=paint;
  window.ugSoundMuted=function(){return muted;};
  window.ugSoundToggle=function(){
    muted=!muted;
    try{localStorage.setItem(KEY,muted?'off':'on');}catch(e){}
    applyAll();paint();
  };
  if(muted){
    document.addEventListener('DOMContentLoaded',applyAll);
    window.addEventListener('load',applyAll);
  }
})();
<\/script>`;

// The button itself. Appended to <body> on every page, including the Privacy
// Policy (it is site chrome, not game content). The speaker cone is always
// drawn; the waves and the cross swap on the .muted class, so the two states
// read differently at a glance rather than relying on colour alone.
const SOUND_BTN_HTML = `<button id="ug-sound-btn" onclick="ugSoundToggle()" aria-label="Mute site sounds" title="Mute site sounds" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" stroke-linejoin="round"></path><g class="ug-snd-on"><path d="M15.8 9.3a4 4 0 0 1 0 5.4"></path><path d="M18.4 6.8a7.5 7.5 0 0 1 0 10.4"></path></g><g class="ug-snd-off"><path d="M16.5 9.5l5 5"></path><path d="M21.5 9.5l-5 5"></path></g></svg></button>
<script>ugSoundPaint();<\/script>`;

// ─── INFO PANEL ADS ───────────────────────────────────────────────────────────
// Swap PANEL_AD_SLOT for a dedicated in-article unit, then set PANEL_AD_FLUID to
// true. Until then it runs on the site-wide display slot so the placement is
// visible end to end.
// ─────────────────────────────────────────────────────────────────────────────
// ─── PER-AD DISMISS ───────────────────────────────────────────────────────────
// A close button above every ad. It sits in our own bar with clear separation —
// never over the ad iframe, which would both obscure the unit and invite the
// mis-taps that trigger Google's Confirm Click penalty.
//
// This replaced Clean-Mode as the way readers turn ads off. Set XDISMISS_ALL to
// false to fall back to running it only on the paths listed below.
// ─────────────────────────────────────────────────────────────────────────────
const XDISMISS_ALL = true;
const XDISMISS_PAGES = {
  '/fntd2/tierlists-1': true
};
function xdActive(pathname) {
  if (XDISMISS_ALL) return true;
  const p = pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  return XDISMISS_PAGES[p] === true;
}
const XDISMISS_HTML = `<script>
(function(){
  function close(box){
    var t=(box.className||'').indexOf('ug-rail-in')!==-1&&box.parentNode?box.parentNode:box;
    t.setAttribute('data-dismissed','1');
    t.style.display='none';
  }
  function bar(box){
    if(box.getAttribute('data-xd'))return;
    if(!box.querySelector('ins.adsbygoogle'))return;
    box.setAttribute('data-xd','1');
    var b=document.createElement('div');
    b.className='ug-xd';
    var btn=document.createElement('button');
    btn.className='ug-xd-btn';
    btn.setAttribute('aria-label','Close this ad');
    btn.setAttribute('type','button');
    btn.innerHTML='&#x2715;';
    btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();close(box);});
    b.appendChild(btn);
    box.insertBefore(b,box.firstChild);
  }
  function scan(){
    var sel='#ug-main .ad-slot, #ug-info-panel .inf-ad, .ug-rail-in';
    var n=document.querySelectorAll(sel);
    for(var i=0;i<n.length;i++)bar(n[i]);
  }
  var t=null,last=0;
  function run(){last=Date.now();t=null;scan();}
  function sched(){
    if(Date.now()-last>600){run();return;}
    if(!t)t=setTimeout(run,300);
  }
  scan();sched();
  window.addEventListener('load',sched);
  if(typeof MutationObserver!=='undefined'){
    ['ug-main','ug-info-panel'].forEach(function(id){
      var root=document.getElementById(id);
      if(root)new MutationObserver(sched).observe(root,{childList:true,subtree:true});
    });
    new MutationObserver(sched).observe(document.body,{childList:true});
  }
})();
<\/script>`;

// ─── MOBILE IN-CONTENT ADS ────────────────────────────────────────────────────
// One ad per CONTENT_AD_EVERY px of rendered content, below CONTENT_AD_MAXW only
// (wider viewports get the side rails instead). Swap CONTENT_AD_SLOT for its own
// unit to separate it from the panel in reporting.
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT_AD_SLOT = '6967580595';
const CONTENT_AD_EVERY = 1400;
const CONTENT_AD_MAXW = 1200;
const CONTENT_AD_HTML = `<script>
(function(){
  if(!document.querySelector('#ug-main ins.adsbygoogle'))return;
  var content=document.getElementById('ug-content');
  if(!content)return;
  var obs=null;
  function clean(){var t=document.getElementById('cleanModeToggle');return !!(t&&t.classList.contains('on'));}
  function fill(d){
    if(d.getAttribute('data-on')||clean())return;
    d.setAttribute('data-on','1');
    var ins=document.createElement('ins');
    ins.className='adsbygoogle';
    ins.style.cssText='display:block;text-align:center';
    ins.setAttribute('data-ad-client','ca-pub-7017245771068026');
    ins.setAttribute('data-ad-slot','${CONTENT_AD_SLOT}');
    ins.setAttribute('data-ad-layout','in-article');
    ins.setAttribute('data-ad-format','fluid');
    d.appendChild(ins);
    try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
    _unfilled(d,ins);
  }
  function _unfilled(box,ins){
    [1600,4000].forEach(function(ms){setTimeout(function(){
      if(ins.getAttribute('data-ad-status')==='unfilled')box.style.display='none';
    },ms);});
  }
  function watch(anchor){
    if(anchor.getAttribute('data-adspot'))return;
    anchor.setAttribute('data-adspot','1');
    anchor._go=function(){
      if(anchor.getAttribute('data-adset')||clean())return;
      anchor.setAttribute('data-adset','1');
      var d=document.createElement('div');
      d.className='ug-cad ad-slot';
      if(anchor.parentNode)anchor.parentNode.insertBefore(d,anchor.nextSibling);
      fill(d);
    };
    if(typeof IntersectionObserver==='undefined'){anchor._go();return;}
    if(!obs)obs=new IntersectionObserver(function(es){
      for(var i=0;i<es.length;i++)if(es[i].isIntersecting){var t=es[i].target;obs.unobserve(t);if(t._go)t._go();}
    },{rootMargin:'300px 0px'});
    obs.observe(anchor);
  }
  function place(){
    if(window.innerWidth>=${CONTENT_AD_MAXW}||clean())return;
    var kids=Array.prototype.slice.call(content.children),acc=0,i,el,cn;
    for(i=0;i<kids.length;i++){
      el=kids[i];cn=String(el.className||'');
      if(cn.indexOf('ug-cad')!==-1||cn.indexOf('ad-slot')!==-1){acc=0;continue;}
      acc+=el.offsetHeight;
      if(acc>=${CONTENT_AD_EVERY}){acc=0;watch(el);}
    }
  }
  var t=null;function sched(){clearTimeout(t);t=setTimeout(place,400);}
  sched();
  window.addEventListener('load',sched);
  window.addEventListener('resize',sched,{passive:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(sched).observe(content);
  var ct=document.getElementById('cleanModeToggle');
  if(ct)ct.addEventListener('click',function(){setTimeout(place,60);});
})();
<\/script>`;

// ─── DESKTOP SIDE RAILS ───────────────────────────────────────────────────────
// Swap RAIL_AD_SLOT for a dedicated vertical display unit. Until then it runs on
// the site-wide display slot so the placement is visible end to end.
// ─────────────────────────────────────────────────────────────────────────────
const RAIL_AD_SLOT = '9010982209';
const RAIL_MIN = 180;
const RAIL_WIDE = 330;
const RAIL_HTML = `<script>
(function(){
  if(!document.querySelector('#ug-main ins.adsbygoogle'))return;
  var content=document.getElementById('ug-content');
  if(!content)return;
  var rails=null,railW=0;
  function clean(){var t=document.getElementById('cleanModeToggle');return !!(t&&t.classList.contains('on'));}
  function build(){
    rails={};
    ['left','right'].forEach(function(side){
      var wrap=document.createElement('div');
      wrap.className='ug-rail ad-slot';
      var inner=document.createElement('div');
      inner.className='ug-rail-in';
      wrap.appendChild(inner);
      document.body.appendChild(wrap);
      rails[side]={wrap:wrap,inner:inner};
    });
  }
  function fill(r){
    if(r.inner.getAttribute('data-on')||clean())return;
    r.inner.setAttribute('data-on','1');
    var ins=document.createElement('ins');
    ins.className='adsbygoogle';
    ins.style.cssText='display:inline-block;width:'+railW+'px;height:600px';
    ins.setAttribute('data-ad-client','ca-pub-7017245771068026');
    ins.setAttribute('data-ad-slot','${RAIL_AD_SLOT}');
    r.inner.appendChild(ins);
    try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
    [1600,4000].forEach(function(ms){setTimeout(function(){
      if(ins.getAttribute('data-ad-status')==='unfilled'){r.wrap.setAttribute('data-dismissed','1');r.wrap.style.display='none';}
    },ms);});
  }
  function hide(){if(rails){rails.left.wrap.style.display='none';rails.right.wrap.style.display='none';}}
  function layout(){
    if(clean()){hide();return;}
    var box=content.getBoundingClientRect();
    var free=Math.floor((window.innerWidth-box.width)/2);
    var need=railW||${RAIL_MIN};
    if(free<need||window.innerWidth<1200){hide();return;}
    if(!rails)build();
    if(!railW)railW=free>=${RAIL_WIDE}?300:160;
    var off=Math.max(8,Math.floor((free-railW)/2));
    var top=box.top+(window.scrollY||window.pageYOffset);
    var h=content.offsetHeight;
    ['left','right'].forEach(function(side){
      var w=rails[side].wrap;
      if(w.getAttribute('data-dismissed'))return;
      w.style.display='block';
      w.style.top=top+'px';
      w.style.height=h+'px';
      w.style.width=railW+'px';
      w.style[side]=off+'px';
    });
    fill(rails.left);fill(rails.right);
  }
  var t=null;
  function sched(){clearTimeout(t);t=setTimeout(layout,150);}
  layout();sched();
  window.addEventListener('resize',sched,{passive:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(sched).observe(content);
  var ct=document.getElementById('cleanModeToggle');
  if(ct)ct.addEventListener('click',function(){setTimeout(layout,60);});
})();
<\/script>`;

const PANEL_AD_SLOT = '6967580595';
const PANEL_AD_FLUID = true;
const PANEL_AD = `
    <div class="inf-ad ad-slot" data-ad-ph></div>`;

const INFO_HTML = `<button id="ug-info-btn" onclick="ugInfoToggle()" aria-label="Info panel">INFO</button>
<div id="ug-info-overlay" onclick="ugInfoClose()"></div>
<div id="ug-info-panel" role="dialog" aria-label="Info">
  <div class="inf-topstick">
  <div class="ug-mn-header">
    <div class="ug-mn-brand">
      <img class="ug-mn-brand-logo" src="https://images.fntduserguide.com/glowy.webp" alt="FNTD">
      <span class="ug-mn-brand-name" style="letter-spacing:2px">INFO</span>
    </div>
    <button class="ug-mn-close" onclick="ugInfoClose()" aria-label="Close">&#x2715;</button>
  </div>
  <div class="inf-modes">
    <button class="inf-mode on" data-mode="info" onclick="infMode('info')">Information</button>
    <button class="inf-mode" data-mode="rot" onclick="infMode('rot')">Rotations<span class="inf-rt" id="inf-rot-t"></span></button>
  </div>
  <div class="inf-search">
    <div class="inf-sfield">
      <svg class="inf-sicon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5"></circle><line x1="10.8" y1="10.8" x2="15" y2="15"></line></svg>
      <input id="inf-q" type="search" placeholder="Search Info..." autocomplete="off" spellcheck="false" aria-label="Search Info" oninput="infSearch(this.value)" onfocus="infSearchFocus()">
      <button class="inf-sclear" onclick="infSearchClear(true)" aria-label="Clear search">&#x2715;</button>
    </div>
    <div class="inf-scount" id="inf-scount"></div>
  </div>
  </div>
  <div id="inf-results"></div>
  <div id="ug-info-body" style="flex:1">${PANEL_AD}
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Attack Types <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-attack-types-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Bytes <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-bytes-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Chips <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-chips-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="community-quests" onclick="infToggle(this)">Community Quests <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-community-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Elements <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-elements-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Enchants <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-enchants-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="endless-quests" onclick="infToggle(this)">Endless Quests <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-endless-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Establishments <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-establishments-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="evolutions" onclick="infToggle(this)">Evolutions <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-evolutions-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="prestige" onclick="infToggle(this)">Faz-rating Prestige <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-prestige-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="foods" onclick="infToggle(this)">Food <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-foods-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="hero-quests" onclick="infToggle(this)">Hero Quests &amp; Paths <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-hero-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="loading-screens" onclick="infToggle(this)">Loading Screens <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-loading-screens-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="materials" onclick="infToggle(this)">Materials <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-materials-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Minigames <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-minigames-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="permanent-quests" onclick="infToggle(this)">Permanent Quests <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-permanent-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="pets" onclick="infToggle(this)">Pets <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-pets-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="potions" onclick="infToggle(this)">Potions <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-potions-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="presents" onclick="infToggle(this)">Presents <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-presents-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Shiny Transfer <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-shiny-transfer-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="shop-quests" onclick="infToggle(this)">Shop Quests <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-shop-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Stat Chips <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-endo-chips-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Status Effects <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-status-effects-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="titles" onclick="infToggle(this)">Titles <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-titles-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="skins" onclick="infToggle(this)">Unit Skins <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-skins-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" data-lazy="banners" onclick="infToggle(this)">User Banners <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-banners-inner"></div></div>
    </div>
  </div>
  <div id="inf-rot">${PANEL_AD}
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Banners <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-rot-banners-inner"><div class="rot-wait">Loading rotations...</div></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Merchant <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-rot-merchant-inner"><div class="rot-wait">Loading rotations...</div></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Quest Shop <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-rot-quests-inner"><div class="rot-wait">Loading rotations...</div></div></div>
    </div>
  </div>
</div>
<script>
var _ugInfoSY=0;
var _ugPanelAdsPushed=false;
function ugPanelAds(){
  if(_ugPanelAdsPushed)return;
  var t=document.getElementById('cleanModeToggle');
  if(t&&t.classList.contains('on'))return;
  var ph=document.querySelectorAll('#ug-info-panel [data-ad-ph]');
  if(!ph.length)return;
  _ugPanelAdsPushed=true;
  for(var i=0;i<ph.length;i++)_infAdWatch(ph[i]);
}
function ugInfoOpen(){var p=document.getElementById('ug-info-panel');var o=document.getElementById('ug-info-overlay');_ugInfoSY=window.scrollY||window.pageYOffset;p.classList.add('open');o.classList.add('open');document.body.style.position='fixed';document.body.style.top='-'+_ugInfoSY+'px';document.body.style.left='0';document.body.style.right='0';ugPanelAds();infRotBoot();}
function ugInfoClose(){document.getElementById('ug-info-panel').classList.remove('open');document.getElementById('ug-info-overlay').classList.remove('open');document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.right='';window.scrollTo(0,_ugInfoSY);document.querySelectorAll('.inf-drop.open').forEach(function(d){d.classList.remove('open');var b=d.querySelector('.inf-drop-btn');if(b)_infStop(b);var db=d.querySelector('.inf-drop-body');if(db)db.style.maxHeight='';});document.querySelectorAll('.inf-subdrop.open').forEach(function(d){d.classList.remove('open');});document.querySelectorAll('.inf-exp-body').forEach(function(b){b.style.maxHeight='0';});_infExp=null;var _q=document.getElementById('inf-q');if(_q&&_q.value){_q.value='';_infRunSearch('');}}
var _infTimers=new Map();var _IF=['/','-','\\\\','|'];
function _infSpin(btn){if(_infTimers.has(btn))clearInterval(_infTimers.get(btn));var a=btn.querySelector('.inf-drop-arrow');if(!a)return;var i=0;a.textContent=_IF[0];_infTimers.set(btn,setInterval(function(){i=(i+1)%_IF.length;a.textContent=_IF[i];},135));}
function _infStop(btn){if(_infTimers.has(btn)){clearInterval(_infTimers.get(btn));_infTimers.delete(btn);}var a=btn.querySelector('.inf-drop-arrow');if(a)a.textContent='/';}
function infToggle(btn){
  var s=btn.closest('.inf-drop');var wasOpen=s.classList.contains('open');var lazy=btn.getAttribute('data-lazy');
  document.querySelectorAll('.inf-drop.open').forEach(function(d){if(d!==s){d.classList.remove('open');var b=d.querySelector('.inf-drop-btn');if(b)_infStop(b);infClose(d.querySelector('.inf-drop-body'));}});
  s.classList.toggle('open');wasOpen?_infStop(btn):_infSpin(btn);
  var body=s.querySelector('.inf-drop-body');
  if(wasOpen){infClose(body);return;}
  if(lazy){var loaded=(lazy==='presents')?_presentsLoaded:_catLoaded[lazy];infLoad(lazy);if(!loaded){if(body){body.style.transition='none';body.style.maxHeight='0';}return;}}
  infOpen(body);
}
function _infClearEnd(body){if(body._infEnd){body.removeEventListener('transitionend',body._infEnd);body._infEnd=null;}}
function infOpen(body){if(!body)return;infTabAds(body.querySelector('.inf-drop-inner'));_infClearEnd(body);body.style.transition='max-height .3s ease';body.style.maxHeight=body.scrollHeight+'px';var f=function(){body.style.maxHeight='none';_infClearEnd(body);};body._infEnd=f;body.addEventListener('transitionend',f);var _av=body.querySelector('video[data-inf-autoplay]');if(_av){if(!_av.getAttribute('src')){var _ds=_av.getAttribute('data-src');if(_ds)_av.src=_ds;}_av.play().catch(function(){});}}
function infClose(body){if(!body)return;var _mv=body.querySelectorAll('video');for(var _i=0;_i<_mv.length;_i++){try{_mv[_i].pause();_mv[_i].currentTime=0;}catch(e){}}body.querySelectorAll('.inf-mg-wrap.open').forEach(function(w){w.classList.remove('open');});_infClearEnd(body);body.style.transition='none';body.style.maxHeight=body.scrollHeight+'px';body.offsetHeight;body.style.transition='max-height .3s ease';body.style.maxHeight='0';}
function infLoad(lazy){if(lazy==='titles')return infLoadTitles();if(lazy==='presents')return infLoadPresents();if(lazy==='evolutions')return infLoadEvolutions();if(lazy==='hero-quests')return infLoadHeroQuests();if(lazy==='shop-quests')return infLoadShopQuests();if(lazy==='endless-quests')return infLoadEndlessQuests();if(lazy==='permanent-quests')return infLoadPermanentQuests();if(lazy==='community-quests')return infLoadCommunityQuests();if(lazy==='prestige')return infLoadPrestige();return infLoadCategory(lazy);}
function infSubToggle(btn){var s=btn.closest('.inf-subdrop');var par=s.parentElement;par.querySelectorAll('.inf-subdrop.open').forEach(function(d){if(d!==s)d.classList.remove('open');});s.classList.toggle('open');if(s.classList.contains('open'))infEntryAd(s.querySelector('.inf-subdrop-inner'));}
// Single expandable card open at a time, across all tabs
var _infExp=null;
function infToggleExp(row,body,arr){
  var wasThis=_infExp&&_infExp.body===body;
  if(_infExp){_infExp.body.style.maxHeight='0';_infExp.row.style.marginBottom='0';if(_infExp.arr)_infExp.arr.textContent='/';_infExp=null;}
  if(wasThis)return;
  infEntryAd(body);body.style.maxHeight='2000px';row.style.marginBottom='8px';if(arr)arr.textContent='-';_infExp={row:row,body:body,arr:arr};
  var pb=row.closest('.inf-drop-body');if(pb)pb.style.maxHeight='none';
}
function infLightbox(src){
  if(!src)return;
  var o=document.getElementById('inf-lightbox');
  if(!o){o=document.createElement('div');o.id='inf-lightbox';o.style.cssText='position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center;cursor:zoom-out';o.addEventListener('click',function(){o.style.display='none';o.innerHTML='';});document.body.appendChild(o);}
  o.innerHTML='';var im=document.createElement('img');im.src=src;im.style.cssText='max-width:92vw;max-height:92vh;border-radius:10px;box-shadow:0 0 40px rgba(0,0,0,.85)';o.appendChild(im);o.style.display='flex';
}
var _presentsLoaded=false;
var PRESENTS_CFG={
  overrides:{
  'Hero Present 1':{name:'Golden Freddy Present'},
  'Hero Present 2':{name:'Puppet Present'},
  'Hero Present 3':{name:'Springtrap Present'},
  'ManglePresent':{name:'Mangle Present'},
  'PartyGlockPresent':{name:'Party Glock Present'},
  'PPCPresent':{name:'Party Packer Cupcake Present'},
  'PuppetsAlliancePresent':{name:"Puppet's Alliance Present"},
  'ScarecrowPresent':{name:'Scarecrow Freddy Present'},
  'SlasherBonniePresent':{name:'Slasher Bonnie Present'},
  'Sweetheart Present':{name:'Sweetheart Toy Foxy Present'},
  'DreadbearPresent':{name:'Dreadbear Present'},
  'Endo02Present':{name:'Endo 02 Present'},
  'HalloweenPresent':{name:'Halloween Present'},
  'JackOBonniePresent':{name:"Jack'O Bonnie"},
  'Season1Present':{name:'Season 1 Present'},
  'ShadowBonniePresent':{name:'Shadow Bonnie Present'},
    // Any field is optional — only define what you want to change:
    // 'Present Name':{name:'Display Name'}          ← just rename
    // 'Present Name':{rarity:'epic'}                ← just change rarity
    // 'Present Name':{image:'https://...'}          ← just change image
    // 'Present Name':{name:'X',image:'https://...',rarity:'epic'}  ← all three
  },
  add:{
    // Add a brand new present not in the source JSON:
    // 'New Present':{rarity:'rare',image:'https://...',rewards:[{name:'X',type:'Unit',rarity:'epic',chance:100}]}
  },
  rewardOverrides:{
    // Override fields on a reward inside a specific present (any field optional):
    // 'Present Name':{'Reward Name':{rarity:'epic'}}
  },
  addRewards:{
    // Add extra rewards to an existing present:
    // 'Present Name':[{name:'Extra Reward',type:'Unit',rarity:'epic',chance:10}]
  }
};
function infLoadPresents(){
  if(_presentsLoaded)return;_presentsLoaded=true;
  var pEl=document.getElementById('inf-presents-inner');
  if(pEl){var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);}
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  Promise.all([
    J('/inf-data/presents',null),
    J('/inf-data/units',[]),
    J('/inf-data/skins',{}),
    J('/inf-data/pets',{}),
    J('/inf-data/banners',{}),
    J('/inf-data/loading-screens',{}),
    J('/inf-data/materials',{}),
    J('/inf-data/foods',{}),
    J('/inf-data/potions',{})
  ]).then(function(res){
    var presentsData=res[0];
    if(!presentsData){throw new Error('no presents');}
    // Combined reward lookup keyed "type|name" → {img,rarity}
    var rewMap={};
    function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
    function addArr(type,arr){(Array.isArray(arr)?arr:[]).forEach(function(u){if(u.name)rewMap[type+'|'+u.name.toLowerCase()]={img:u.imgNormal||'',rarity:nr(u.rarity)};});}
    function addObj(type,obj){var ck=INF_REWARD_CFG_KEY[type];var ovs=(ck&&INFO_CFG[ck]&&INFO_CFG[ck].overrides)||{};Object.keys(obj||{}).forEach(function(n){var o=obj[n]||{};var ov=ovs[n]||{};rewMap[type+'|'+n.toLowerCase()]={img:ov.image||o.image||'',rarity:nr(ov.rarity||o.rarity),name:ov.name||''};});}
    addArr('unit',res[1]);addObj('skin',res[2]);addObj('pet',res[3]);addObj('banner',res[4]);addObj('loading screen',res[5]);addObj('material',res[6]);addObj('food',res[7]);addObj('potion',res[8]);
    if(pEl)pEl.innerHTML='';
    buildPresents(pEl,presentsData,rewMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){if(pEl){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load presents.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);}});
}
// The presents feed types Tokens and Souls as "Currency", but both are ordinary
// materials and nothing else in the panel has a currency concept. Correcting it
// per present would mean a rewardOverrides entry in all 12 presents that give
// each; one remap by name fixes the label and the lookup everywhere at once.
// "Material" matches the casing the feed already uses for its other 17 rewards.
var REWARD_TYPE_FIX={'tokens':'Material','souls':'Material'};
function buildPresents(pEl,data,rewMap){
  if(!pEl||!data)return;
  // A reward's declared type does not always match the feed it lives in: the
  // presents feed types Tokens and Souls as "Currency", but both are materials.
  // Falling back to the name when the typed key misses means an item resolves
  // wherever it was added, with no per-item wiring. rewMap is built units-first,
  // so a unit still wins a name shared with a food or pet.
  var byName={};
  Object.keys(rewMap).forEach(function(k){var n=k.slice(k.indexOf('|')+1);if(!byName[n])byName[n]=rewMap[k];});
  var _RO=['radiant','hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
  function _rr(r){var i=_RO.indexOf((r||'').toLowerCase());return i===-1?_RO.length:i;}
  var _RG={radiant:'linear-gradient(135deg,#FF6600,#FFCC33)',nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))',shiny:'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'};
  var allData={};
  Object.keys(data).forEach(function(k){allData[k]=data[k];});
  Object.keys(PRESENTS_CFG.add||{}).forEach(function(k){allData[k]=PRESENTS_CFG.add[k];});
  Object.keys(allData).sort(function(a,b){var rd=_rr(allData[a].rarity)-_rr(allData[b].rarity);return rd!==0?rd:a.localeCompare(b);}).forEach(function(name){
    var p=allData[name];
    var ov=PRESENTS_CFG.overrides[name]||{};
    var displayName=ov.name||name;
    var displayImg=ov.image||p.image||'';
    var displayRar=(ov.rarity||p.rarity||'').toLowerCase();
    var rewards=(p.rewards||[]).slice();
    var rovs=PRESENTS_CFG.rewardOverrides[name]||{};
    rewards=rewards.map(function(r){var ro=rovs[r.name||'']||{};var nm=ro.name||r.name;var lk=(nm||'').toLowerCase();var ty=ro.type||REWARD_TYPE_FIX[lk]||r.type;var look=rewMap[((ty||'Unit').toLowerCase())+'|'+lk]||byName[lk]||{};return {type:ty,name:(look.name||nm),amount:r.amount,chance:r.chance,rarity:(ro.rarity||look.rarity||r.rarity||'').toLowerCase(),img:look.img||''};});
    (PRESENTS_CFG.addRewards[name]||[]).forEach(function(r){rewards.push(r);});
    rewards.sort(function(a,b){var rd=_rr(a.rarity)-_rr(b.rarity);return rd!==0?rd:(a.name||'').localeCompare(b.name||'');});
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;cursor:pointer';
    var badge=document.createElement('span');badge.className='inf-img'+(displayRar?' inf-rarity-'+displayRar:'');
    var img=document.createElement('img');img.src=displayImg;img.alt=displayName;badge.appendChild(img);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=displayName;
    var arr=document.createElement('span');arr.style.cssText='color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6';arr.textContent='/';
    row.appendChild(badge);row.appendChild(h4);row.appendChild(arr);card.appendChild(row);
    var body=document.createElement('div');body.className='inf-exp-body';body.style.cssText='max-height:0;overflow:hidden;transition:max-height .3s ease';
    var inner=document.createElement('div');inner.style.cssText='margin-top:8px;padding:8px;background:rgba(0,0,0,.4);border-radius:6px;display:flex;flex-direction:column;gap:6px';
    rewards.forEach(function(r){
      var rar=(r.rarity||'').toLowerCase();
      var imgU=r.img||'';
      var rrow=document.createElement('div');rrow.className='inf-reward-row';
      var rb=document.createElement('span');rb.className='inf-img'+(rar?' inf-rarity-'+rar:'');
      if(!rar)rb.style.background='rgba(25,24,40,.9)';
      var ri=document.createElement('img');ri.src=imgU;ri.alt=r.name||'';rb.appendChild(ri);
      var rname=document.createElement('div');rname.className='inf-reward-name';
      var _rg=_RG[rar];
      if(_rg){rname.style.cssText='background:'+_rg+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600;flex:1;min-width:0;font-size:13px;word-break:break-word';}
      rname.textContent=(r.name||'')+(r.type?' ('+r.type+')':'');
      var rchance=document.createElement('div');rchance.className='inf-reward-chance';rchance.textContent=r.chance!=null?r.chance+'%':'';
      if((r.type||'').toLowerCase()==='unit'&&r.name){rrow.style.cursor='pointer';(function(un){rrow.addEventListener('click',function(e){e.stopPropagation();window.location.href='/fntd2/unit-engine/'+encodeURIComponent(un.split(' ').join('-'));});})(r.name);}
      rrow.appendChild(rb);rrow.appendChild(rname);rrow.appendChild(rchance);inner.appendChild(rrow);
    });
    body.appendChild(inner);card.appendChild(body);
    row.addEventListener('click',function(){infToggleExp(row,body,arr);});
    pEl.appendChild(card);
  });
}
// ── Evolutions tab (like Bytes/Enchants; ingredient images pulled from every JSON source) ──
// Each entry: { name:'Result Unit', display:'optional shown title', ing:[ ['qty','Ingredient'], ... ] }
// Ingredient names are matched (case-insensitive) against units + materials + foods + potions +
// presents + skins + pets. EVO_ALIAS maps names that differ from the JSON key; unmatched names
// still render with a neutral badge and no image.
var EVO_ALIAS={
  'trash-o-tron':'Trash o Tron','mech-lizabeth':'Mecha-Lizabeth',
  'blossom chicas':'Blossom Chica','overgrown foxies':'Overgrown Foxy',
  'batteries':'Battery','tvs':'Television','tv':'Television',
  'raid tokens':'Raid Coins','pickles':'Jar of Pickles',
  'mechanical bomb':'Mechanical Bombs','hazzard sign':'Hazard Sign',
  'paperpals':'PaperPals'
};
var EVOLUTIONS=[
  {name:'Ice Cream Mech Suit',ing:[['75','Ice Cream Cones'],['50','Spring'],['15','Ash'],['25','Television']]},
  {name:'Void Shaper Shadow Freddy',ing:[['1','Shadow Freddy'],['1','Shadow Hands'],['25','Agony'],['500','Souls']]},
  {name:'Ocular Nightmare BB',ing:[['1','Nightmare BB'],['1','Nightmare Balloons'],['250','Souls'],['100','Ash'],['50','Agony']]},
  {name:'Pyro Spring Bonnie',ing:[['1','Patient White Rabbit'],['1','Pyro Armguard'],['1','Pyro Chestplate'],['1','Pyro Helmet'],['1','Pyro Leggings'],['2500','Souls'],['250','Spring']]},
  {name:'Scott Cawthon',ing:[['1','Rare Scott'],['1','Scott Plushie']]},
  {name:'Ragequit Scott',ing:[['1','Epic Scott'],['1','Scott Cawthon']]},
  {name:'Theory Crusher Scott',ing:[['1','Mythic Scott'],['1','Ragequit Scott']]},
  {name:'Overlord Scott',ing:[['1','Secret Scott'],['1','Theory Crusher Scott']]},
  {name:'Planet Buster Scott',ing:[['1','Nightmare Scott'],['1','Overlord Scott']]},
  {name:'Mr. Hippo',ing:[['1','Happy Frog'],['250','Souls'],['80','Golden Fazbear Trophy'],['10','Nedd Bear'],['25','Orville Elephant'],['20','PigPatch'],['50','Spring'],['5','Salvage Token']]},
  {name:'Cthulhu Nightmare Foxy',ing:[['3','Cthulhu Coin']]},
  {name:'Patient White Rabbit',ing:[['1','Vessel Plushtrap'],['1000','Souls'],['100','Springs'],['100','Challenge Tokens'],['25','Agony']]},
  {name:'Purple Guy',ing:[['1','Golden Freddy','pet'],['1','Mangle','pet'],['1','Puppet','pet']]},
  {name:'Spring Duo',ing:[['450','Spring'],['300','Phantom Freddy'],['125','Phantom Chica'],['50','Phantom Foxy'],['100','Ash'],['450','Battery']]},
  {name:'Harvest Festival Foxy',ing:[['30','Ghost Bonnies'],['10','Mummy Freddys']]},
  {name:'Mummy Freddy',ing:[['10','Ghost Bonnies']]},
  {name:'Kronos Endo Freddy',ing:[['1','Time Lord Withered Freddy'],['3','Blossom Chicas'],['20','Overgrown Foxies'],['1','Clock']]},
  {name:'Hero PaperPals',display:'Hero Paperpals',ing:[['1','Paperpals'],['10','Springs'],['10','Batteries'],['20','Souls']]},
  {name:'Fathomless Withered Foxy',ing:[['1','Shark Withered Foxy'],['1','Deep Sea Calamity Endo'],['25','Serpent Endos'],['1','Pressure Sensor'],['250','Apocalypse Presents']]},
  {name:'Deep Sea Calamity Endo',ing:[['25','Serpent Endos'],['3','Ships'],['250','AFK Presents']]},
  {name:'Gaia Chica',ing:[['1','Blossom Chica'],['1','Grassy Heart'],['2','Clocks'],['25','Agony'],['200','Raid Coins'],['250','Souls']]},
  {name:'Nature Reclaimed Foxy',ing:[['1','Overgrown Foxy'],['1','Clock'],['200','Agony'],['250','Batteries'],['300','Springs']]},
  {name:'Afterbite Withered Golden Freddy',ing:[['1','Withered Golden Freddy'],['1','Hazzard Sign'],['100','Springs'],['250','Souls'],['50K','Tokens']]},
  {name:'Foxy.exe',ing:[['1','Withered Foxy'],['1','Glitched TV'],['50','TVs'],['50','Batteries'],['25K','Tokens']]},
  {name:'Commander Withered Freddy',ing:[['1','Withered Freddy'],['1','Colonel Hat'],['50','Springs'],['50','Ash'],['25K','Tokens']]},
  {name:'Trash-o-Tron',ing:[['1','Pan Stan'],['1','Bucket Bob'],['1','No. 1 Crate'],['50','Batteries'],['100','Springs'],['25','Salvage Tokens']]},
  {name:'Bombwork Cupcake',ing:[['1','Clockwork Cupcake'],['1','Mechanical Bomb'],['200','Ash'],['150','Batteries'],['75','Springs'],['5','Raid Coins']]},
  {name:'Party Never Ends Cupcake',ing:[['1','Cupcake'],['1','Assortment of Costumes'],['5','Ice Cream Cones'],['175','Sodas'],['125','Candy Bars'],['15','Chocolate Freddy']]},
  {name:'Arch Angler Toy Bonnie',ing:[['1','Fisherman Toy Bonnie'],['1','Shark Withered Foxy'],['1','Shark'],['175','Agony'],['300','Soda']]},
  {name:'Mech-Lizabeth',ing:[['1','Elizabeth'],['3','Endo 01s'],['1','Ice Cream Mech Suit'],['50','Ice Cream Cones']]},
  {name:'Mechanic Endo 01',ing:[['1','Endo 01'],['1','Welding Gear'],['100','Pickles'],['100','Springs'],['150','TVs'],['15','Raid Coins']]},
  {name:'Aqua Strike Toy Chica',ing:[['1','Toy Chica'],['12','Mythic+ Water Element Units'],['1','Water Balloons'],['100','Ice Cream Cones'],['50','Season 5 Present'],['15','Raid Coins']]},
  {name:'Salvaged Toy Bonnie',ing:[['1','Toy Bonnie'],['12','Mythic+ Dark Element Units'],['1','Cloak'],['100','Ash'],['50','Season 5 Presents'],['15','Raid Coins']]},
  {name:'Circus Baby',ing:[['1','Ballora'],['1','Elizabeth'],['125','Ice Cream Cone'],['15','Funtime Freddy']]},
  {name:'Leviathan Mangle',ing:[['200','Freddy With a Glock'],['75','Beach Ball']]},
  {name:'Valkyrie Chica',ing:[['200','Freddy With a Glock'],['75','Grenade']]},
  {name:'Deadeye Freddy',ing:[['200','Freddy With a Glock'],['75','Cowboy Hat']]},
  {name:'Gravelord Foxy',ing:[['200','Freddy With a Glock'],['75','Gravestone']]},
  {name:'Undead Chica',ing:[['10','Ghost Bonnie']]},
  {name:'BBnJ',ing:[['30','Ghost Bonnie'],['10','Mummy Freddy']]},
  {name:'Masked Bullies',ing:[['25','Nightmare Freddy'],['10','Nightmare Bonnie'],['5','Nightmare Foxy'],['10','Freddy'],['10','Bonnie'],['10','Chica'],['15','Foxy'],['150','Agony']]},
  {name:'Silver Key',ing:[['5','Silver Ingot']]},
  {name:'Gold Key',ing:[['8','Gold Ingot']]},
  {name:'Faz Key',ing:[['10','Faz Ingot']]},
  {name:'Soul Key',ing:[['12','Soul Ingot']]},
  {name:'Glitch Key',ing:[['5','Bronze Ingot'],['5','Silver Ingot'],['5','Gold Ingot'],['3','Faz Ingot'],['3','Soul Ingot'],['10','Glitch Ingot']]}
];
function infLoadEvolutions(){
  if(_catLoaded.evolutions)return;_catLoaded.evolutions=true;
  var pEl=document.getElementById('inf-evolutions-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  Promise.all([
    J('/inf-data/units',[]),
    J('/inf-data/materials',{}),
    J('/inf-data/foods',{}),
    J('/inf-data/potions',{}),
    J('/inf-data/presents',{}),
    J('/inf-data/skins',{}),
    J('/inf-data/pets',{})
  ]).then(function(res){
    // Combined name -> {img,rarity,pool,name} lookup. Units added first so they win
    // any name collision (e.g. "Cupcake" is both a unit and a food).
    var lut={};
    function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
    function put(pool,name,img,rar,keyName){if(!name)return;var k=(keyName||name).toLowerCase();var entry={img:img||'',rarity:nr(rar),pool:pool,name:name};lut[pool+':'+k]=entry;if(!lut[k])lut[k]=entry;}
    (Array.isArray(res[0])?res[0]:[]).forEach(function(u){put('unit',u.name,u.imgNormal,u.rarity);});
    function addObj(pool,obj){var ck=INF_REWARD_CFG_KEY[pool];var ovs=(ck&&INFO_CFG[ck]&&INFO_CFG[ck].overrides)||{};Object.keys(obj||{}).forEach(function(n){var o=obj[n]||{};var ov=ovs[n]||{};put(pool,ov.name||n,ov.image||o.image,ov.rarity||o.rarity,n);});}
    addObj('material',res[1]);addObj('food',res[2]);addObj('potion',res[3]);addObj('present',res[4]);addObj('skin',res[5]);addObj('pet',res[6]);
    pEl.innerHTML='';
    buildEvolutions(pEl,lut);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
var EVO_PLACEHOLDER='https://images.fntduserguide.com/placeholder-freddy.png';
function buildEvolutions(pEl,lut){
  if(!pEl)return;
  var RG={radiant:'linear-gradient(135deg,#FF6600,#FFCC33)',nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))'};
  var RO=['radiant','hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
  function rank(r){var i=RO.indexOf((r||'').toLowerCase());return i===-1?RO.length:i;}
  function cap(p){return p?p.charAt(0).toUpperCase()+p.slice(1):'';}
  // A 3rd ingredient element (e.g. 'pet') forces which pool to pull from when a
  // name exists in more than one (e.g. a pet named the same as a unit).
  function look(nm,hint){
    var raw=(nm||'').toLowerCase();
    var ks=[];var al=EVO_ALIAS[raw];if(al)ks.push(al.toLowerCase());
    ks.push(raw);if(raw.slice(-1)==='s')ks.push(raw.slice(0,-1));
    var i;
    if(hint){for(i=0;i<ks.length;i++){if(lut[hint+':'+ks[i]])return lut[hint+':'+ks[i]];}}
    for(i=0;i<ks.length;i++){if(lut[ks[i]])return lut[ks[i]];}
    return null;
  }
  // Sort evolutions by result rarity, then alphabetically (same as the other tabs).
  var evos=EVOLUTIONS.slice().sort(function(a,b){
    var rd=rank((look(a.name)||{}).rarity)-rank((look(b.name)||{}).rarity);
    return rd!==0?rd:(a.display||a.name).localeCompare(b.display||b.name);
  });
  evos.forEach(function(ev){
    var head=look(ev.name)||{};
    var displayName=ev.display||ev.name;
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;cursor:pointer';
    var badge=document.createElement('span');badge.className='inf-img'+(head.rarity?' inf-rarity-'+head.rarity:'');
    if(!head.rarity)badge.style.background='rgba(25,24,40,.9)';
    var img=document.createElement('img');img.src=head.img||EVO_PLACEHOLDER;img.alt=displayName;badge.appendChild(img);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=displayName+(head.pool?' ('+cap(head.pool)+')':'');
    var arr=document.createElement('span');arr.style.cssText='color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6';arr.textContent='/';
    row.appendChild(badge);row.appendChild(h4);row.appendChild(arr);card.appendChild(row);
    var body=document.createElement('div');body.className='inf-exp-body';body.style.cssText='max-height:0;overflow:hidden;transition:max-height .3s ease';
    var inner=document.createElement('div');inner.style.cssText='margin-top:8px;padding:8px;background:rgba(0,0,0,.4);border-radius:6px;display:flex;flex-direction:column;gap:6px';
    var ings=ev.ing.map(function(pair){
      var m=look(pair[1],pair[2]);
      return {qty:pair[0],nm:m?m.name:pair[1],rar:m?m.rarity:'',iu:m?m.img:'',pool:m?m.pool:''};
    }).sort(function(a,b){var rd=rank(a.rar)-rank(b.rar);return rd!==0?rd:a.nm.localeCompare(b.nm);});
    var reqLbl=document.createElement('div');reqLbl.textContent=(ings.length===1?'REQUIREMENT':'REQUIREMENTS');reqLbl.style.cssText="font-family:'Audiowide',sans-serif;font-size:13px;color:#ffa45b;letter-spacing:.5px";inner.appendChild(reqLbl);
    ings.forEach(function(o){
      var qty=o.qty;var nm=o.nm;var rar=o.rar;var iu=o.iu;
      var rrow=document.createElement('div');rrow.className='inf-reward-row';
      var rb=document.createElement('span');rb.className='inf-img'+(rar?' inf-rarity-'+rar:'');
      if(!rar)rb.style.background='rgba(25,24,40,.9)';
      var ri=document.createElement('img');ri.src=iu||EVO_PLACEHOLDER;ri.alt=nm;rb.appendChild(ri);
      var rname=document.createElement('div');rname.className='inf-reward-name';
      var g=RG[rar];
      if(g){rname.style.cssText='background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600;flex:1;min-width:0;font-size:13px;word-break:break-word';}
      rname.textContent=nm+(o.pool?' ('+cap(o.pool)+')':'');
      var rq=document.createElement('div');rq.className='inf-reward-chance';rq.textContent='×'+qty;
      if(o.pool==='unit'){rrow.style.cursor='pointer';(function(un){rrow.addEventListener('click',function(e){e.stopPropagation();window.location.href='/fntd2/unit-engine/'+encodeURIComponent(un.split(' ').join('-'));});})(nm);}
      rrow.appendChild(rb);rrow.appendChild(rname);rrow.appendChild(rq);inner.appendChild(rrow);
    });
    body.appendChild(inner);card.appendChild(body);
    row.addEventListener('click',function(){infToggleExp(row,body,arr);});
    pEl.appendChild(card);
  });
}
// ── Hero Quests tab ─────────────────────────────────────────────────────
// Each hero shows its unit render + present render, then the quests to unlock it.
// Images/rarities are pulled from the units + presents JSON by name.
// Upgrade paths for the reworked heroes: 3 paths x 5 tiers each, art in the
// site-images bucket under <unit>-paths/. Tier 5 is gated behind a quest rather
// than tokens, so those carry q as well as the cost.
var HERO_PATH_BASE='https://images.fntduserguide.com/';
var HERO_PATHS={"Golden Freddy":[[{"i":"golden-freddy-path1-tier1.png","c":"Free","e":"This unit Gains +5% Damage per Neutral unit on the team."},{"i":"golden-freddy-path1-tier2.png","c":"Free","e":"Attacks follow-up for 20% damage on hit."},{"i":"golden-freddy-path1-tier3.png","c":"25k Tokens","e":"Every 10s, attacking teleports this unit to the main target, following-up for 10% damage and applying 25% Bleed."},{"i":"golden-freddy-path1-tier4.png","c":"50k Tokens","e":"Teleporting summons a clone at the previous location that deals 25% of this units damage and lasts for 15s."},{"i":"golden-freddy-path1-tier5.png","c":"Quest","e":"Clone duration increased to 25s. Enemies passing a clone are Stunned for 1s and take 250% damage. When a clone expires, this unit follows up in a Full AOE for 100% damage.","q":"Reach 300 cumulative waves in Game 1 Endless with Golden Freddy equipped"}],[{"i":"golden-freddy-path2-tier1.png","c":"Free","e":"Units in range gain +1% Damage per wave passed, up to +10%."},{"i":"golden-freddy-path2-tier2.png","c":"Free","e":"Neutral Units in range gain +10% Damage."},{"i":"golden-freddy-path2-tier3.png","c":"30k Tokens","e":"Wave bonus increases to +3% Damage per wave, up to +30% and the Neutral unit bonus increases to +15%."},{"i":"golden-freddy-path2-tier4.png","c":"60k Tokens","e":"Refunds all cash spent on this unit and generates $25,000. Increase income gain by 20% and give all units in range +15% Range."},{"i":"golden-freddy-path2-tier5.png","c":"Quest","e":"Gains +1% Damage and +0.5% Range per wave. Every 15s, two random Neutral units in range gain +15% Damage and Range for 10s.","q":"Defeat 10,000 enemies with Golden Freddy equipped"}],[{"i":"golden-freddy-path3-tier1.png","c":"Free","e":"Attacks Slow enemies by 10% for 5s. This slow cannot stack."},{"i":"golden-freddy-path3-tier2.png","c":"Free","e":"Gain +30% Range."},{"i":"golden-freddy-path3-tier3.png","c":"35k Tokens","e":"Every 12s, deals 150% Damage to enemies in range and Stuns them for 1.5s."},{"i":"golden-freddy-path3-tier4.png","c":"75k Tokens","e":"Increase Slow to 40%. Slowed enemies take 10% more Damage and this unit deals 25% more damage to enemies in stun Lockout."},{"i":"golden-freddy-path3-tier5.png","c":"Quest","e":"Increase Stun to 2s, enemies in Stun Lockout are Slowed by 10% for 12s. Unlock \\u201cIt's Me\\u201d which Stuns all enemies for 5s and deals 500% Damage.","q":"Clear 20 nights with Golden Freddy equipped"}]],"Puppet":[[{"i":"puppet-path1-tier1.png","c":"Free","e":"This unit gains +5% Damage for every second it does not attack. This boost is lost after attacking."},{"i":"puppet-path1-tier2.png","c":"Free","e":"This unit gains +2% Damage and +3% Range for every enemy in its range."},{"i":"puppet-path1-tier3.png","c":"35k Tokens","e":"Deals 1% more Damage to an enemy for every second it remains in range (max of 30%)."},{"i":"puppet-path1-tier4.png","c":"75k Tokens","e":"Unlocks \\"Wind The Music Box\\". This unit will stop attacking while winding and starts storing increased base damage for it's next attack. Manual winding increases the scaling speed by 1.5x."},{"i":"puppet-path1-tier5.png","c":"Quest","e":"This unit will gain increased range when winding, and stored Damage is multiplied based on how greater the enemies health is than this units damage. Manual winding is increased to 2x speed.","q":"Clear 15 nights with Puppet equipped"}],[{"i":"puppet-path2-tier1.png","c":"Free","e":"Attacks Slow enemies by 10% for 5s. This Slow cannot stack."},{"i":"puppet-path2-tier2.png","c":"Free","e":"Every 5s, summon a soul that deals 20% Damage and Slows by 10% for 3s upon contact."},{"i":"puppet-path2-tier3.png","c":"25k Tokens","e":"After a summon contacts an enemy, it gains 3% more contact damage and moves 5% faster. While in this units Range, release a small Full AOE pulse every 2s for 50% Damage."},{"i":"puppet-path2-tier4.png","c":"50k Tokens","e":"On this units cooldown, summons a ghost for 50% of this unit's Damage as health. The ghost explodes for 25% Damage in a small AOE when defeated."},{"i":"puppet-path2-tier5.png","c":"Quest","e":"This unit gains +5% Damage for each enemy on the track and each of its summons. Summons now Slow enemies by 20% for 5s.","q":"Deal 250 million damage with summons while Puppet is equipped"}],[{"i":"puppet-path3-tier1.png","c":"Free","e":"Enemies in range receive 10% Light Wither."},{"i":"puppet-path3-tier2.png","c":"Free","e":"Light units in range gain +10% Damage."},{"i":"puppet-path3-tier3.png","c":"30k Tokens","e":"Increases Light Wither to 30% and applies 10% Wither for all other elements."},{"i":"puppet-path3-tier4.png","c":"60k Tokens","e":"Strings the 2 nearest units, granting +20% Damage and +10% Range. Light units instead gain +30% Damage and +20% Range."},{"i":"puppet-path3-tier5.png","c":"Quest","e":"Increases the string cap to 4. When a strung unit attacks, this unit follows up for 25% Damage (1s CD) and strung units Stun enemies for 1.5s on hit.","q":"Reach 300 cumulative waves in Endless 2 with Puppet equipped"}]],"Springtrap":[[{"i":"springtrap-path1-tier1.webp","c":"Free","e":"Gain +15% Damage."},{"i":"springtrap-path1-tier2.webp","c":"Free","e":"This unit and nearby Fire units gain +10% Range."},{"i":"springtrap-path1-tier3.webp","c":"25k Tokens","e":"Double this units Fire Wither values."},{"i":"springtrap-path1-tier4.webp","c":"50k Tokens","e":"Unlocks Ignited Rage, granting Fire units +40% Damage and +20% Range for 30s."},{"i":"springtrap-path1-tier5.webp","c":"Quest","e":"Each Ignited Rage use permanently retains 30% of its buff values, up to 5 times.","q":"Complete 20 nights with Springtrap equipped"}],[{"i":"springtrap-path2-tier1.webp","c":"Free","e":"Attacks apply 10% Burn."},{"i":"springtrap-path2-tier2.webp","c":"Free","e":"Deal 5% more damage per burn instance on the enemy, up to 20%."},{"i":"springtrap-path2-tier3.webp","c":"30k Tokens","e":"Increases this units Burn by 50%."},{"i":"springtrap-path2-tier4.webp","c":"60k Tokens","e":"Burn damage taken in Range is increased by 30%, and burning enemies in range are Slowed by 20%."},{"i":"springtrap-path2-tier5.webp","c":"Quest","e":"Increases this unit's Burn to 75% and its Slow to 35%. Attacks gain bonus damage equal to 20% of currently remaining Burn damage on target.","q":"Deal 500 million damage with Springtrap equipped"}],[{"i":"springtrap-path3-tier1.webp","c":"Free","e":"Attacks apply 10% Bleed."},{"i":"springtrap-path3-tier2.webp","c":"Free","e":"Attacks follow up with an axe for 20% damage."},{"i":"springtrap-path3-tier3.webp","c":"35k Tokens","e":"Axe follow ups continue at 90%, 80%, 60%, 40%, and 20% damage until one misses."},{"i":"springtrap-path3-tier4.webp","c":"75k Tokens","e":"After 5 missed follow up attacks, deal 100% Damage in a Full AOE and place 3 audio lures that Slow enemies in their area by 20%."},{"i":"springtrap-path3-tier5.webp","c":"Quest","e":"Every attack has a 5% chance to trigger a Springlock Failure, dealing 400% damage and 400% Bleed for 5s in double this units range. This unit is stunned for its next 2 attacks, then gains +25% Damage for 10s.","q":"Deal 500 million Bleed damage with Springtrap equipped"}]],"Nightmare Fredbear":[[{"i":"nightmare-fredbear-path1-tier1.webp","c":"Free","e":"Deals 5% more damage to enemies afflicted by a Status Effect."},{"i":"nightmare-fredbear-path1-tier2.webp","c":"Free","e":"Deals 10% more damage to enemies afflicted by a Status Effect."},{"i":"nightmare-fredbear-path1-tier3.webp","c":"25k Tokens","e":"Increases this unit's Damage based on Fear stacks, with Dark units gaining 1/4 of the bonus. At maximum Fear, deal 200% of this unit's Damage in an AOE Pulse and give all units +20% Damage for 10s, resetting Fear."},{"i":"nightmare-fredbear-path1-tier4.webp","c":"50k Tokens","e":"Increases the Pulse's Damage to 250% and retain 10% of maximum Fear after it activates. Enemies hit by the Pulse receive a permanent 5% Dark Wither."},{"i":"nightmare-fredbear-path1-tier5.webp","c":"Quest","e":"Dark Units also receive the Full Fear Damage bonus, while Non-Dark units receive Half. Increases the Pulse's Damage boost to 25% and retain 20% of maximum Fear.","q":"Reach 300 cumulative waves in Game 4 Endless with Nightmare Fredbear equipped"}],[{"i":"nightmare-fredbear-path2-tier1.webp","c":"Free","e":"Attacks Slow enemies by 10%."},{"i":"nightmare-fredbear-path2-tier2.webp","c":"Free","e":"Increases Slow to 15%."},{"i":"nightmare-fredbear-path2-tier3.webp","c":"30k Tokens","e":"Increases Slow to 20% and applies Wither equal to current Fear Stack. At maximum Fear, transform into Nightmare for 20s and deal 25% more damage to Slowed enemies, then reset Fear."},{"i":"nightmare-fredbear-path2-tier4.webp","c":"60k Tokens","e":"Transforming releases a wave that slows all enemies by 25% and applies Death. Nightmare transformation duration increased to 25s."},{"i":"nightmare-fredbear-path2-tier5.webp","c":"Quest","e":"Nightmare transformation gains 1s per Dark unit equipped and releases it's wave every 5s. Nightmare deals 50% more damage to slowed enemies.","q":"Reach 500 cumulative waves in Boss Raids with Nightmare Fredbear equipped"}],[{"i":"nightmare-fredbear-path3-tier1.webp","c":"Free","e":"Dark units receive +3% Damage for each Dark unit in Range (max +15%)."},{"i":"nightmare-fredbear-path3-tier2.webp","c":"Free","e":"Increases the Dark unit Damage boost to +5% and its cap to +25%."},{"i":"nightmare-fredbear-path3-tier3.webp","c":"35k Tokens","e":"Unlocks \\"Nightmarish Cry\\". While active, this unit cam attack anywhere on the map and deals up to 50% more Damage based on distance, then resets Fear. Duration increases by 0.5s per Fear stack held on use."},{"i":"nightmare-fredbear-path3-tier4.webp","c":"75k Tokens","e":"Nightmarish Cry Stuns every enemy for 0.8s, increases it's distance bonus Damage Cap to 75% and grants this unit +5% Damage per Placed Dark Unit. (Max 25%)"},{"i":"nightmare-fredbear-path3-tier5.webp","c":"Quest","e":"Increases the global Stun to 1s and the Dark unit Damage boost cap to +50%. Nightmarish Cry increases duration by 1s per Fear stack used.","q":"Deal 1 billion damage with Dark units while Nightmare Fredbear is equipped"}]],"Ennard":[[{"i":"ennard-path1-tier1.png","c":"Free","e":"Attacks Stun enemies for 0.8s."},{"i":"ennard-path1-tier2.png","c":"Free","e":"Increases Stun duration."},{"i":"ennard-path1-tier3.png","c":"25k Tokens","e":"Every 12s, release a Full AOE shock that deals 70% damage and Stuns enemies for 1s."},{"i":"ennard-path1-tier4.png","c":"50k Tokens","e":"Reduces the shock interval to 10s. Shocks grant Electric units in range +25% Damage for 5s."},{"i":"ennard-path1-tier5.png","c":"Quest","e":"Increases shock damage to 85%, Stun duration to 1.2s, and it's Electric Damage boost to +30% for 7s.","q":"Reach 300 cumulative waves in Game 5 Endless with Ennard equipped"}],[{"i":"ennard-path2-tier1.png","c":"Free","e":"Every 6s, places a coil trap that deals 20% damage upon contact, up to 3 traps."},{"i":"ennard-path2-tier2.png","c":"Free","e":"Increase coil trap damage to 25%."},{"i":"ennard-path2-tier3.png","c":"25k Tokens","e":"Coil traps gain range equal to 25% of this units range, allowing this unit to attack enemies within their Range. Increases trap cap to 5."},{"i":"ennard-path2-tier4.png","c":"50k Tokens","e":"Increases coil trap damage to 30%. Units in range gain +15% Range, and every fourth attack leaves a coil trap behind."},{"i":"ennard-path2-tier5.png","c":"Quest","e":"Coil traps inherit 50% of this units Range. Triggering one grants units in range +15% Damage and +20% Range for 10s. Coil traps are now left every third attack.","q":"Reach 500 cumulative waves in Boss Raids with Ennard equipped"}],[{"i":"ennard-path3-tier1.png","c":"Free","e":"Units in range gain +5% Damage."},{"i":"ennard-path3-tier2.png","c":"Free","e":"Damage boost increased to +10%."},{"i":"ennard-path3-tier3.png","c":"35k Tokens","e":"Unlocks an Active that syncs to a selected unit. Every 10s, this unit follows up for 25% of the synced units Damage, and deals 2 shield damage when that unit attacks."},{"i":"ennard-path3-tier4.png","c":"75k Tokens","e":"Increases follow up shield damage to 5, reduces its cooldown to 7s, and grants the synced unit +15% Damage."},{"i":"ennard-path3-tier5.png","c":"Quest","e":"Follow up attacks deal 35% of the synced units Damage on a 5s CD. The synced unit gains +20% Damage, while all units in Range gain +15% Damage and -5% Cooldown.","q":"Deal 1 billion damage while Ennard is equipped"}]],"Michael Afton":[[{"i":"michael-afton-path1-tier1.webp","c":"Free","e":"Gain +15% Damage."},{"i":"michael-afton-path1-tier2.webp","c":"Free","e":"Every 15s, summons an ally with health equal to 100% of this unit's damage."},{"i":"michael-afton-path1-tier3.webp","c":"25k Tokens","e":"Summons are created on this unit's CD with 50% Damage as health. When a summon dies, enemies in a small area receive 15% Rust Wither."},{"i":"michael-afton-path1-tier4.webp","c":"50k Tokens","e":"This unit gains +2% Damage for every one of its summons on the track."},{"i":"michael-afton-path1-tier5.webp","c":"Quest","e":"Unlocks an Active that consumes a chosen amount of Scrap to create up to 50 bonus summons with 10% health per Scrap. Summon health increases by 1% per Scrap held, up to 20%. Attacks generate 3 Scrap, enemy deaths generate 1, and Boss deaths generate 15.","q":"Deal 300 million damage with summons while Michael Afton is equipped"}],[{"i":"michael-afton-path2-tier1.webp","c":"Free","e":"Every 15s, rotate between +15% Damage, +15% Range, and -10% cooldown."},{"i":"michael-afton-path2-tier2.webp","c":"Free","e":"Unlocks an Active that places up to 3 audio lures. Lures have 25% of this units Damage and Range, and Slow enemies by 5% for 3s on hit."},{"i":"michael-afton-path2-tier3.webp","c":"35k Tokens","e":"Unlocks an Active that selects ads, generating cash and granting a different effect for each ad."},{"i":"michael-afton-path2-tier4.webp","c":"75k Tokens","e":"Increases the ad cap by 1, and enhances all ads. Every 15s, places a TV trap with a random ad; only one of each ad may exist at once."},{"i":"michael-afton-path2-tier5.webp","c":"Quest","e":"Attacks generate a trap in range that deals 100% Damage on contact and Slows enemies by 25% for 5s.","q":"Reach 300 cumulative waves in Game 6 Endless with Michael Afton equipped"}],[{"i":"michael-afton-path3-tier1.webp","c":"Free","e":"Attacks apply 15% Bleed."},{"i":"michael-afton-path3-tier2.webp","c":"Free","e":"Attacks Slow enemies by 10% for 5s."},{"i":"michael-afton-path3-tier3.webp","c":"30k Tokens","e":"Rust units gain +20% Damage and +15% Range. Bleed damage dealt in range is increased by 25%."},{"i":"michael-afton-path3-tier4.webp","c":"60k Tokens","e":"Slow increased to 30%. The first enemy is slowed by 40%, and receives 5% Bleed every second."},{"i":"michael-afton-path3-tier5.webp","c":"Quest","e":"Every third attack applies 100% Bleed for 5s to all enemies hit, and deal 30% more damage to bleeding enemies.","q":"Deal 500 million Bleed damage while Michael Afton is equipped"}]],"Vengeful Spirit":[[{"i":"vengeful-spirit-path1-tier1.webp","c":"Free","e":"Dark and Neutral units gain +10% Damage and +20% Range."},{"i":"vengeful-spirit-path1-tier2.webp","c":"Free","e":"Increase the Damage boost to +15%."},{"i":"vengeful-spirit-path1-tier3.webp","c":"25k Tokens","e":"Attacks against Marked enemies consume their Marks to increase the attacks Damage (40s CD). When a Dark or Neutral unit attacks, this unit performs a follow up attack for 10% Damage (6s CD)."},{"i":"vengeful-spirit-path1-tier4.webp","c":"50k Tokens","e":"Reduces the attack boost CD to 30s, and Dark and Neutral units receive -5% CD. Follow up Damage is increased to 15%, and its CD is reduced to 6s."},{"i":"vengeful-spirit-path1-tier5.webp","c":"Quest","e":"Dark and Neutral units gain +30% Crit Chance. This unit gains 25% Crit Damage, and an additional +5% per Dark and Neutral unit on the team. Half of this boost is shared to other units in range. Follow up attack damage is increased to 25%, and the area of effect is now also increased to 45 Degrees.","q":"Reach 300 cumulative waves in Game 7 Endless with Vengeful Spirit equipped"}],[{"i":"vengeful-spirit-path2-tier1.webp","c":"Free","e":"Gain +15% Crit Chance and +25% Crit Damage"},{"i":"vengeful-spirit-path2-tier2.webp","c":"Free","e":"Increase Crit Chance to +20% and Crit Damage to +40%"},{"i":"vengeful-spirit-path2-tier3.webp","c":"35k Tokens","e":"Attacks consume Marks to increase this unit's Crit Rate by 1% and Crit Damage by 3% per Mark for 15s (60s CD). After landing a Critical Hit, this unit repeatedly follows-up for 50% Damage until an attack doesn't Crit or a follow-up cap of 3 is hit."},{"i":"vengeful-spirit-path2-tier4.webp","c":"75k Tokens","e":"Unlocks the Playtime ability and increases the follow-up cap to 4."},{"i":"vengeful-spirit-path2-tier5.webp","c":"Quest","e":"Reduces Playtime's CD to 90s, resets the CD of the tier 3 Critical Boost when Playtime is activated and increases the follow-up cap to 5.","q":"Defeat 10,000 enemies with Vengeful Spirit equipped"}],[{"i":"vengeful-spirit-path3-tier1.webp","c":"Free","e":"Enemies in range are Slowed by 10%"},{"i":"vengeful-spirit-path3-tier2.webp","c":"Free","e":"Slow increased to 15%. Attacks inflict 5% Dark and Neutral Wither."},{"i":"vengeful-spirit-path3-tier3.webp","c":"30k Tokens","e":"Slow increases by 1% per second an enemy remains in range up to 30%. Wither is no longer a fixed value and is now equal to 1/4 Marks consumed"},{"i":"vengeful-spirit-path3-tier4.webp","c":"60k Tokens","e":"Wither is now 1/2 of Marks consumed and inflicts Bleed equal to the amount of Marks consumed over 3s."},{"i":"vengeful-spirit-path3-tier5.webp","c":"Quest","e":"When an enemy attempts to leave this units range, release a Full AOE attack for 25% damage and Stun enemies hit for 2s and increases the Damage of Dark and Neutral units by +20% for 15s (3s CD).","q":"Deal 500 million Bleed damage while Vengeful Spirit is equipped"}]],"Animdude":[[{"i":"animdude-path1-tier1.webp","c":"Free","e":"Units in range gain +5% Damage and Range."},{"i":"animdude-path1-tier2.webp","c":"Free","e":"Increases the boost to +10% Damage and Range"},{"i":"animdude-path1-tier3.webp","c":"30k Tokens","e":"Unlocks My Favorite Creation, allowing a selected unit to gain +50% Damage and +25% Range. In PVP, the unit selected is also 25% cheaper and a second unit can be selected."},{"i":"animdude-path1-tier4.webp","c":"60k Tokens","e":"Follows-up when a buffed unit attack with a 1s CD. Increased the selected units boosts to +55% Damage and +30% Range."},{"i":"animdude-path1-tier5.webp","c":"Quest","e":"Follow-ups gain additional damage equal to 30% of the buffed unit's damage. Increases the Damage boost to +65% and allows it to inherit this unit's equipped Byte Passive.","q":"Deal 100 million damage with Animdude"}],[{"i":"animdude-path2-tier1.webp","c":"Free","e":"Attacks Slow enemies for 8s."},{"i":"animdude-path2-tier2.webp","c":"Free","e":"Increases the Slow to 15%"},{"i":"animdude-path2-tier3.webp","c":"35k Tokens","e":"Enemies leaving Range are struck by a 4th Wall for 150% Damage and are Stunned for 2s. Unlocks \\"A World Under My Control\\" with one selectable Chip."},{"i":"animdude-path2-tier4.webp","c":"75k Tokens","e":"Increases 4th Wall damage to 200%."},{"i":"animdude-path2-tier5.webp","c":"Quest","e":"Increases 4th Wall damage to 250% and increases stun to 3s. \\"A World Under My Control\\" can select 2 Chips.","q":"Defeat 10,000 enemies with Animdude equipped"}],[{"i":"animdude-path3-tier1.webp","c":"Free","e":"This unit gains +20% Critical Damage."},{"i":"animdude-path3-tier2.webp","c":"Free","e":"Increases this units Critical Damage Boost to +30%."},{"i":"animdude-path3-tier3.webp","c":"25k Tokens","e":"Attacks Follow-up for 30% Damage. Repeated Follow-ups against the same enemy gain +10% damage up to +50%."},{"i":"animdude-path3-tier4.webp","c":"50k Tokens","e":"Units in range gain +15% Damage. Each Critical Hit increases their Crit Chance by +1% up to +30%."},{"i":"animdude-path3-tier5.webp","c":"Quest","e":"Deals +30% damage to Bosses and increases follow-up Damage to 50%. Critical Hits apply 15% Wither for 5s.","q":"Deal 1 billion damage with Electricity or Light units while Animdude is equipped"}]],"Old Man Consequences":[[{"i":"old-man-consequences-path1-tier1.webp","c":"Free","e":"Deals +20% damage to enemies in the outer half of this units range. Enemies in the inner half are Slowed by 10%."},{"i":"old-man-consequences-path1-tier2.webp","c":"Free","e":"Deals +10% damage to Bosses."},{"i":"old-man-consequences-path1-tier3.png","c":"25k Tokens","e":"Attacks follow-up on Bosses for 30% Damage. Nearby Water units gain +10% Range, increased to +20% when a Boss is alive."},{"i":"old-man-consequences-path1-tier4.webp","c":"50k Tokens","e":"Each follow-up against the same Boss grants +3% Damage until it dies and Slows it by 1%, up to 10%. Units in range gain +10% Range."},{"i":"old-man-consequences-path1-tier5.png","c":"Quest","e":"Unlocks: The One That Got Away. When a Boss tries to leave this units range automatically trigger this active at 2x Damage regardless of CD, then put it on CD.","q":"Complete 500 cumulative Boss Raid waves with Old Man Consequences equipped"}],[{"i":"old-man-consequences-path2-tier1.webp","c":"Free","e":"Gains +10% Range. Nearby Water units gain +5% Range."},{"i":"old-man-consequences-path2-tier2.webp","c":"Free","e":"Gains +1% Damage for each enemy on the map."},{"i":"old-man-consequences-path2-tier3.webp","c":"30k Tokens","e":"Places two Pools that deal 150% Damage on contact. Water Units in range gain +10% Damage."},{"i":"old-man-consequences-path2-tier4.webp","c":"60k Tokens","e":"Increases the Pool cap to 3 and Pool damage to 150%. The water unit buff increases to +20%. Deals 10% more damage to an enemy for each Pool they've triggered."},{"i":"old-man-consequences-path2-tier5.webp","c":"Quest","e":"Increases the Pool cap to 5. Interacting with a Pool removes it, granting Water Units in range an additional +10% Damage and this unit +100% Damage for 120s. Retain +25% Damage permanently after this ends. (Max 1 time)","q":"Defeat 75 bosses with Old Man Consequences equipped"}],[{"i":"old-man-consequences-path3-tier1.webp","c":"Free","e":"Every 10s, Hook the leading enemy and stun it for 1s."},{"i":"old-man-consequences-path3-tier2.webp","c":"Free","e":"Hooks deal 100% Damage and Slow enemies by 15% for 10s."},{"i":"old-man-consequences-path3-tier3.webp","c":"35k Tokens","e":"Hooks hit in a small Circle, Slow by 20% for 10s, and Knockback enemies 2 tiles. Bosses are Stunned for 2s instead."},{"i":"old-man-consequences-path3-tier4.webp","c":"75k Tokens","e":"Casts an additional Hook at the highest-health enemy on the map and increases the Hook Damage to 200%."},{"i":"old-man-consequences-path3-tier5.webp","c":"Quest","e":"Increases the Stun on Hook to 2s. Bosses receive Knockback instead of Stun and the Slow increases to 30%.","q":"Deal 1 billion damage with Water units while Old Man Consequences is equipped"}]]};
var HERO_QUESTS=[
  {unit:'Golden Freddy', present:'Hero Present 1', quests:[
    'Beat Game 1 Night 6',
    'Reach wave 50 in Game 1 Endless',
    'Obtain 3 Mythic Units OR 1 Secret Unit'
  ]},
  {unit:'Puppet', present:'Hero Present 2', quests:[
    'Beat Game 2 Night 6',
    'Reach wave 50 in Game 2 Endless with at least 3 Withered Animatronics',
    'Obtain 3 Shiny Units',
    'Reach Level 100 on 3 Units',
    'Obtain Withered Freddy, Bonnie, Chica, and Foxy',
    'Reach 2.5k Faz-Rating',
    'Enchant Withered Animatronics 250 times'
  ]},
  {unit:'Springtrap', present:'Hero Present 3', quests:[
    'Get 25k Faz-Rating',
    'Get to wave 100 on Game 3 Endless',
    'Reach Level 100 on Phantom BB',
    'Summon 1 Withered Golden Freddy',
    'Beat Nightmare Game 3 Night 6 with only 3 units',
    'Roll Phantom on 3 Phantom units'
  ]},
  {unit:'Old Man Consequences', present:'Old Man Consequences Present', quests:[
    'Reach wave 100 on Boss Raid with every unit sharing the same element',
    'Obtain Time Lord Withered Freddy',
    'Open 50 Boss Raid Presents',
    'Beat Game 1 Night 6 on Nightmare Mode',
    'Beat Game 2 Night 6 on Nightmare Mode',
    'Beat Game 3 Night 6 on Nightmare Mode'
  ]},
  {unit:'Nightmare Fredbear', present:'Nightmare Fredbear Present', quests:[
    'Complete Game 4 Night 6 on Nightmare Mode',
    'Get to wave 135 with Dark element only on Boss Raid',
    'Delete 50 Light units',
    'Obtain 4 units with "Nightmare" in the name',
    'Get to wave 100 in Game 4 with only Dark element units'
  ]},
  {unit:'Ennard', present:'Ennard Present', quests:[
    'Get to Boss Raid 135 with only Electric units',
    'Buy 1250 items from the Merchant',
    'Beat all Game 5 nights on Nightmare',
    'Get to wave 100 in Endless 5 with Elizabeth on the team'
  ]},
  {unit:'Chipper', present:'Chipper Present', header:'Obtainment', quests:[
    'Beating the Minigame on Game 5 (Circus Baby) through Normal Ending has a 5% chance to drop his present, beating it through Secret Ending has a 10% chance'
  ]},
  {unit:'Animdude', present:'Animdude Present', quests:[
    'Reach 1.25k Trophies',
    'Beat 5 Minigames',
    'Play 30 PvP games',
    'Kill 250 Special enemies'
  ]},
  {unit:'Michael Afton', present:'Michael Afton Present', quests:[
    'Complete all Game 6 nights on Nightmare Mode',
    'Kill 5k enemies',
    'Complete Game 5 Night 6 with 3+ Rust element units, 5 times',
    'Complete Game 3 Night 6 with 3+ Rust element units, 5 times',
    'Open 100 Establishment Card Packs',
    'Reach wave 100 on Game 6 Endless with Ennard and 2+ Rust units'
  ]},
  {unit:'Vengeful Spirit', present:'Vengeful Spirit Present', quests:[
    'Spend 10,000 Souls',
    'Beat all Game 7 Nights on Nightmare Mode',
    'Beat 20 Springtrap Bosses',
    'Beat 25 Nights with Springtrap equipped',
    'Beat Game 7 Custom Night on max difficulty'
  ]}
];
function infLoadHeroQuests(){
  if(_catLoaded['hero-quests'])return;_catLoaded['hero-quests']=true;
  var pEl=document.getElementById('inf-hero-quests-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
  Promise.all([J('/inf-data/units',[]),J('/inf-data/presents',{})]).then(function(res){
    var uMap={};(Array.isArray(res[0])?res[0]:[]).forEach(function(u){if(u.name)uMap[u.name.toLowerCase()]={img:u.imgNormal||'',rarity:nr(u.rarity)};});
    var pMap={};Object.keys(res[1]||{}).forEach(function(n){var o=res[1][n]||{};pMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity)};});
    pEl.innerHTML='';
    buildHeroQuests(pEl,uMap,pMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildHeroQuests(pEl,uMap,pMap){
  if(!pEl)return;
  HERO_QUESTS.forEach(function(h){
    var u=uMap[h.unit.toLowerCase()]||{};
    var p=pMap[h.present.toLowerCase()]||{};
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var ub=document.createElement('span');ub.className='inf-img'+(u.rarity?' inf-rarity-'+u.rarity:'');ub.style.margin='0';if(!u.rarity)ub.style.background='rgba(25,24,40,.9)';
    var ui=document.createElement('img');ui.src=u.img||'';ui.alt=h.unit;ub.appendChild(ui);
    var pb=document.createElement('span');pb.className='inf-img'+(p.rarity?' inf-rarity-'+p.rarity:'');pb.style.margin='0';if(!p.rarity)pb.style.background='rgba(25,24,40,.9)';
    var pi=document.createElement('img');pi.src=p.img||'';pi.alt=h.present;pb.appendChild(pi);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=h.unit;
    var badges=document.createElement('div');badges.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0';badges.appendChild(ub);badges.appendChild(pb);
    row.appendChild(badges);row.appendChild(h4);card.appendChild(row);
    var qh=document.createElement('div');qh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';qh.textContent=h.header||'Quests';card.appendChild(qh);
    h.quests.forEach(function(q){var qd=document.createElement('div');qd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';qd.textContent='● '+q;card.appendChild(qd);});
    buildHeroPaths(card,h.unit);
    pEl.appendChild(card);
  });
}
// Heroes whose paths are not out yet (Chipper at time of writing) simply get no
// sub-drops rather than three empty ones — they appear when their art does.
function buildHeroPaths(card,unit){
  var paths=HERO_PATHS[unit];
  if(!paths||!paths.length)return;
  var slug=String(unit).toLowerCase().split(' ').join('-');
  var wrap=document.createElement('div');wrap.className='hp-wrap';
  var ph=document.createElement('div');
  ph.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';
  ph.textContent='Paths';
  wrap.appendChild(ph);
  paths.forEach(function(tiers,pi){
    if(!tiers||!tiers.length)return;
    var sd=document.createElement('div');sd.className='inf-subdrop';
    var btn=document.createElement('button');btn.className='inf-subdrop-btn';btn.type='button';
    btn.onclick=function(){infSubToggle(btn);};
    var lbl=document.createElement('span');lbl.className='hp-btn-label';lbl.textContent='Path '+(pi+1);
    var arr=document.createElement('span');arr.className='hp-arrow';arr.textContent='›';
    btn.appendChild(lbl);btn.appendChild(arr);
    var body=document.createElement('div');body.className='inf-subdrop-body';
    var inner=document.createElement('div');inner.className='inf-subdrop-inner';
    tiers.forEach(function(t,ti){
      var row=document.createElement('div');row.className='hp-tier';
      var im=document.createElement('img');im.className='hp-img';im.src=HERO_PATH_BASE+slug+'-paths/'+t.i;im.alt='Tier '+(ti+1);im.loading='lazy';
      var main=document.createElement('div');main.className='hp-main';
      var head=document.createElement('div');head.className='hp-head';
      var nm=document.createElement('span');nm.className='hp-name';nm.textContent='Tier '+(ti+1);
      var cost=document.createElement('span');cost.className='hp-cost';cost.textContent=t.c||'Free';
      head.appendChild(nm);head.appendChild(cost);
      main.appendChild(head);
      if(t.q){var qd=document.createElement('div');qd.className='hp-quest';qd.textContent='● '+t.q;main.appendChild(qd);}
      var ed=document.createElement('div');ed.className='hp-eff';ed.textContent=t.e||'';main.appendChild(ed);
      row.appendChild(im);row.appendChild(main);inner.appendChild(row);
    });
    body.appendChild(inner);sd.appendChild(btn);sd.appendChild(body);wrap.appendChild(sd);
  });
  card.appendChild(wrap);
}
var SHOP_QUESTS=[
  {unit:'Funtime Chica', present:'Funtime Chica Present', cost:20000, quests:[
    'Reach Wave 150 on Boss Raids with 3+ Light Units',
    'Have Units receive Funtime Foxys Boost for 850 seconds (14m)',
    'Defeat 650 Dark Enemies',
    'Use 3 Types of Chicas and Beat Game 6 on Nightmare Mode'
  ]},
  {unit:'Henry Emily', present:'Henry Emily Present', cost:50000, quests:[
    'Buy 5 Units from the Merchant',
    'Roll Endo 01 from any Banner',
    'Get 250 kills with Summons',
    'Summon 650 times'
  ]},
  {unit:'Scrap Baby', present:'Scrap Baby Present', cost:60000, quests:[
    'Reach Wave 100 in Endless Game 6 with 3+ Rust Units',
    'Kill 20 Game 6 Bosses',
    'Delete 10 Fire Units',
    'Get 850 kills with Elizabeth Unit'
  ]},
  {unit:'Music Man', present:'Music Man Present', cost:40000, quests:[
    'Beat 15 Nights with Electric Units only',
    'Reach Wave 165 on Boss Raids with Electric Units only',
    'Reach Wave 115 on Endless Game 6 with 3+ Electric Units',
    'Dance for 15 seconds in any Game 6 Map'
  ]},
  {unit:'El Chip', present:'El Chip Present', cost:30000, quests:[
    'Buy 25 Food Items from the Merchant',
    'Reach Wave 120 on Endless Game 4 with 2+ Nature Units',
    'Roll Scooped Enchant on any Unit',
    'Feed Units a total of 100 times'
  ]},
  {unit:'Stitchwraith', present:'Stitchwraith Present', cost:50000, quests:[
    'Beat 10 Nights with 4+ Light Units',
    'Beat 10 Nights with 4+ Dark Units',
    'Reach Wave 200 on Boss Raids with 4+ Dark or Light Element Units',
    'Spend 1000 Souls'
  ]},
  {unit:'Malachite Foxy', present:'Malachite Foxy Present', cost:40000, quests:[
    'Deal 1 Billion damage',
    'Reach wave 200 in any endless',
    'Deal 100 Million poison damage'
  ]},
  {unit:'Phantom Endo 02', present:'Phantom Endo 02 Present', cost:30000, quests:[
    'Deal 250 Million damage in endless with Dark units',
    'Reach wave 150 in game 3 endless with Dark units',
    'Clear 15 Game 3 Nights with 3+ Dark units'
  ]},
  {unit:'Phantom Withered Chica', present:'Phantom Withered Chica Present', cost:25000, quests:[
    'Reach wave 100 in Game 7 endless with 4+ Dark units',
    'Clear Game 3 Night 6 on Nightmare',
    'Clear 25 nights using only Dark units'
  ]},
  {unit:'White Lily Toy Foxy', present:'White Lily Toy Foxy Present', cost:50000, quests:[
    'Deal 500 Million damage in Endless with Nature units',
    'clear  Challenge with 3+ Nature units',
    'Salvage 3 Fire units',
    'Reach Wave 200 on Boss Raids with 4+ Nature units'
  ]},
];
function infLoadShopQuests(){
  if(_catLoaded['shop-quests'])return;_catLoaded['shop-quests']=true;
  var pEl=document.getElementById('inf-shop-quests-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
  Promise.all([J('/inf-data/units',[]),J('/inf-data/presents',{})]).then(function(res){
    var uMap={};(Array.isArray(res[0])?res[0]:[]).forEach(function(u){if(u.name)uMap[u.name.toLowerCase()]={img:u.imgNormal||'',rarity:nr(u.rarity)};});
    var pMap={};Object.keys(res[1]||{}).forEach(function(n){var o=res[1][n]||{};pMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity)};});
    pEl.innerHTML='';
    buildShopQuests(pEl,uMap,pMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildShopQuests(pEl,uMap,pMap){buildShopStyle(pEl,SHOP_QUESTS,uMap,pMap);}
function buildShopStyle(pEl,list,uMap,pMap){
  if(!pEl)return;
  list.forEach(function(h){
    var u=uMap[h.unit.toLowerCase()]||{};
    var p=pMap[h.present.toLowerCase()]||{};
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var ub=document.createElement('span');ub.className='inf-img'+(u.rarity?' inf-rarity-'+u.rarity:'');ub.style.margin='0';if(!u.rarity)ub.style.background='rgba(25,24,40,.9)';
    var ui=document.createElement('img');ui.src=u.img||'';ui.alt=h.unit;ub.appendChild(ui);
    var pb=document.createElement('span');pb.className='inf-img'+(p.rarity?' inf-rarity-'+p.rarity:'');pb.style.margin='0';if(!p.rarity)pb.style.background='rgba(25,24,40,.9)';
    var pi=document.createElement('img');pi.src=p.img||'';pi.alt=h.present;pb.appendChild(pi);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=h.unit;
    var badges=document.createElement('div');badges.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0';badges.appendChild(ub);badges.appendChild(pb);
    row.appendChild(badges);row.appendChild(h4);card.appendChild(row);
    var ch=document.createElement('div');ch.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';ch.textContent='Unlock Cost';card.appendChild(ch);
    var cd=document.createElement('div');cd.style.cssText='font-size:13px;color:#ccc;line-height:1.7;margin-bottom:6px';cd.textContent='● '+Number(h.cost).toLocaleString()+' Tokens';card.appendChild(cd);
    var qh=document.createElement('div');qh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';qh.textContent='Quests';card.appendChild(qh);
    h.quests.forEach(function(q){var qd=document.createElement('div');qd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';qd.textContent='● '+q;card.appendChild(qd);});
    pEl.appendChild(card);
  });
}
// ── Endless Quests tab ──────────────────────────────────────────────────
// Completing a set unlocks a drop chance for that unit's present rather than
// the present itself, so the reward line differs from Hero/Shop Quests.
var ENDLESS_REWARD='Unit Present for the first time completing, After which 2% chance for this Units present to drop after Wave 100';
var ENDLESS_QUESTS=[
  {unit:'Sparky', present:'Sparky Present', mode:'Endless 1', quests:[
    'Reach Wave 100',
    'Beat Game 1 Night 6 on Normal',
    'Enchant a Unit 50 times',
    'Purchase 25 Items or Units from the Merchant',
    'Salvage 10 times'
  ]},
  {unit:'Toy Foxy', present:'Toy Foxy Present', mode:'Endless 2', quests:[
    'Reach Wave 100 with a Water Unit on your team',
    'Beat Game 2 Night 6 on Normal',
    'Delete 25 Uncommon Foxys',
    'Enchant 50 times',
    'Purchase 35 Items or Units from the Merchant',
    'Salvage 25 times'
  ]},
  {unit:'Fredtrap', present:'Fredtrap Present', mode:'Endless 3', quests:[
    'Reach Wave 100 with a Hero Unit on your team',
    'Beat Game 3 Night 6',
    'Spend 10,000 Tokens',
    'Purchase 5 Establishment 1 Packs',
    'Salvage 50 times'
  ]},
  {unit:'Nightmare Shadow Bonnie', present:'Nightmare Shadow Bonnie Present', mode:'Endless 4', quests:[
    'Reach Wave 100 with a Dark Element Unit on your team',
    'Beat Game 4 Night 6 on Normal with a Hero on your team',
    'Roll a 1% or lower Enchant',
    'Salvage 50 times',
    'Spend 10,000 Tokens',
    'Obtain a Mythic+ Rarity Unit in Shiny form'
  ]},
  {unit:'Funtime Bonnie', present:'Funtime Bonnie Present', mode:'Endless 5', quests:[
    'Reach Wave 100 with an Electric Unit on your team',
    'Beat Game 5 Night 6 on Normal with a Hero Unit on your team',
    'Roll Vengeance Enchant',
    'Purchase 50 Items or Units from the Merchant',
    'Obtain 3 Hero Units',
    'Salvage 100 times'
  ]},
  {unit:'Showtime Freddy', present:'Showtime Freddy Present', mode:'Endless 6', quests:[
    'Reach Wave 100 with a Rust Element Unit and Hero on your team',
    'Beat Game 6 Night 6 on Normal',
    'Beat Game 1 Night 6 on Nightmare',
    'Roll Vengeance Enchant on a Hero Unit',
    'Obtain a Secret Rarity Unit from any Banner',
    'Reach Wave 50 on Boss Raids',
    'Reach Tier 25 on any Battle Pass'
  ]},
  {unit:'Hoax Purple Guy', present:'Hoax Purple Guy Present', mode:'Endless 7', quests:[
    'Deal 1,000,000 Bleed damage',
    'Beat 100 Nights',
    'Beat 10 Nights with Withered Golden Freddy on your team'
  ]}
];
function infLoadEndlessQuests(){
  if(_catLoaded['endless-quests'])return;_catLoaded['endless-quests']=true;
  var pEl=document.getElementById('inf-endless-quests-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
  Promise.all([J('/inf-data/units',[]),J('/inf-data/presents',{})]).then(function(res){
    var uMap={};(Array.isArray(res[0])?res[0]:[]).forEach(function(u){if(u.name)uMap[u.name.toLowerCase()]={img:u.imgNormal||'',rarity:nr(u.rarity)};});
    var pMap={};Object.keys(res[1]||{}).forEach(function(n){var o=res[1][n]||{};pMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity)};});
    pEl.innerHTML='';
    buildEndlessQuests(pEl,uMap,pMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildEndlessQuests(pEl,uMap,pMap){
  if(!pEl)return;
  ENDLESS_QUESTS.forEach(function(h){
    var u=uMap[h.unit.toLowerCase()]||{};
    var p=pMap[h.present.toLowerCase()]||{};
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var ub=document.createElement('span');ub.className='inf-img'+(u.rarity?' inf-rarity-'+u.rarity:'');ub.style.margin='0';if(!u.rarity)ub.style.background='rgba(25,24,40,.9)';
    var ui=document.createElement('img');ui.src=u.img||'';ui.alt=h.unit;ub.appendChild(ui);
    var pb=document.createElement('span');pb.className='inf-img'+(p.rarity?' inf-rarity-'+p.rarity:'');pb.style.margin='0';if(!p.rarity)pb.style.background='rgba(25,24,40,.9)';
    var pi=document.createElement('img');pi.src=p.img||'';pi.alt=h.present;pb.appendChild(pi);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=h.unit;
    var badges=document.createElement('div');badges.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0';badges.appendChild(ub);badges.appendChild(pb);
    row.appendChild(badges);row.appendChild(h4);card.appendChild(row);
    var mh=document.createElement('div');mh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';mh.textContent='Mode';card.appendChild(mh);
    var md=document.createElement('div');md.style.cssText='font-size:13px;color:#ccc;line-height:1.7;margin-bottom:6px';md.textContent='● '+h.mode;card.appendChild(md);
    var qh=document.createElement('div');qh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';qh.textContent='Quests';card.appendChild(qh);
    h.quests.forEach(function(q){var qd=document.createElement('div');qd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';qd.textContent='● '+q;card.appendChild(qd);});
    var rh=document.createElement('div');rh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin:6px 0 2px;text-transform:uppercase';rh.textContent='Reward';card.appendChild(rh);
    var rd=document.createElement('div');rd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';rd.textContent='● '+ENDLESS_REWARD;card.appendChild(rd);
    pEl.appendChild(card);
  });
}

// ── Permanent / Community Quests tabs ───────────────────────────────────
// Same shape as Hero/Shop Quests, except a reward can be a skin rather than a
// present. Skin entries carry { skin: "<skin name>" } and nothing else: the art
// comes from the skins feed and the matching pet from the pets feed, which name
// it identically, so the one name resolves both halves of the bundle.
var PERMANENT_QUESTS=[
  {unit:'Bones of the Past Nightmare Freddy', present:'Bones of the Past Nightmare Freddy Present', quests:[
    'Get 1500 kills with Fire or Dark units',
    'Get 500 kills with a Summon',
    'Obtain 2 Nightmare units from Summons or Presents',
    "Reach Wave 120 on Boss Raids with 3 Fire units and the Gravelord's Hook modifier equipped"
  ]},
  {unit:'Foxy Fighters', present:'Foxy Fighters Present', quests:[
    'Obtain 250 trophies',
    'Send 50 enemies in PvP',
    'Win 2 PvP games',
    'Open 5 Skin Boxes'
  ]}
];
var COMMUNITY_QUESTS=[
  {unit:'Fallen Angel Nightmarionne', present:'Fallen Angel Nightmarionne Present', quests:[
    'Reach Wave 150 on Boss Raids with The Puppet and only Dark element units',
    'Get The Puppet to level 100',
    'Get Vengeance on The Puppet',
    'Kill 5000 enemies with Light element units'
  ]},
  {unit:'Firework Shadow Freddy', present:'Firework Shadow Freddy Present', quests:[
    'Kill 1000 enemies with Shadow Freddy',
    'Reach Wave 100 with Shadow Freddy and 3+ Fire element units in Endless 2',
    'Sell 5 Fire element units',
    'Clear 20 Nights with Shadow Freddy equipped'
  ]},
  {skin:'Scooped Ice Cream Michael', quests:[
    'Get Michael Afton to level 100',
    'Reach Wave 100 in Endless 6 with Michael Afton and 3+ Electric element units',
    'Get Scooped or rarer on Michael Afton',
    'Clear Game 5 Night 6 on Nightmare with Michael Afton equipped',
    'Clear 20 Nights with Michael Afton equipped'
  ]},
  {skin:'Glacier Springtrap', quests:[
    'Kill 5000 enemies with Water element units',
    'Reach Wave 100 on Endless 3 with Springtrap, 3+ Water units, and no other Fire units',
    'Reach Wave 150 on Boss Raids with only Water element units'
  ]},
  {unit:'King in Purple Purple Guy', present:'King in Purple Purple Guy Present', quests:[
    'Reach Wave 150 in Boss Raids with 2 Dark and 2 Light element units',
    'Reach level 100 on any Dark element unit',
    'Kill 5000 enemies with Light element units',
    'Kill 5000 enemies with Dark element units',
    'Roll Vengeance or higher on any Light element unit'
  ]},
  {unit:'Dirt Boss Freddy', present:'Dirt Boss Freddy Present', quests:[
    'Kill 1500 enemies with any Freddy',
    'Reach Wave 150 in Endless with 3 Rust element units',
    'Sell 5 Rust element units',
    'Clear 20 Nights with any Freddy'
  ]},
  {skin:'Island Vacation Dragon Endo 01', quests:[
    'Get Dragon Endo 01 to level 100',
    'Reach Wave 100 on Endless 6 with Dragon Endo 01 and 3+ Fire element units',
    'Reach Wave 150 in Boss Raids with Dragon Endo 01 equipped 3 times',
    'Clear Game 7 Night 7 on 20 difficulty with 2 Fire units',
    'Clear 20 Nights with Dragon Endo 01 equipped'
  ]},
  {skin:'Ballad of the Streets Ballora', quests:[
    'Kill 5000 enemies with Electric element units',
    'Reach Wave 100 on Endless 3 with any Ballora unit, 3+ Electric units, and no other Rust units',
    'Reach Wave 150 on Boss Raids with only Electric element units'
  ]}
];
function infLoadQuestSet(key, innerId, list){
  if(_catLoaded[key])return;_catLoaded[key]=true;
  var pEl=document.getElementById(innerId);
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
  Promise.all([J('/inf-data/units',[]),J('/inf-data/presents',{}),J('/inf-data/skins',{}),J('/inf-data/pets',{})]).then(function(res){
    var uMap={};(Array.isArray(res[0])?res[0]:[]).forEach(function(u){if(u.name)uMap[u.name.toLowerCase()]={img:u.imgNormal||'',rarity:nr(u.rarity)};});
    var pMap={};Object.keys(res[1]||{}).forEach(function(n){var o=res[1][n]||{};pMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity)};});
    var sMap={};Object.keys(res[2]||{}).forEach(function(n){var o=res[2][n]||{};sMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity),unit:o.unit||''};});
    var petMap={};Object.keys(res[3]||{}).forEach(function(n){var o=res[3][n]||{};petMap[n.toLowerCase()]={img:o.image||'',rarity:nr(o.rarity)};});
    pEl.innerHTML='';
    buildQuestSet(pEl,list,uMap,pMap,sMap,petMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function infLoadPermanentQuests(){infLoadQuestSet('permanent-quests','inf-permanent-quests-inner',PERMANENT_QUESTS);}
function infLoadCommunityQuests(){infLoadQuestSet('community-quests','inf-community-quests-inner',COMMUNITY_QUESTS);}
function buildQuestSet(pEl,list,uMap,pMap,sMap,petMap){
  if(!pEl)return;
  list.forEach(function(h){
    // A unit reward shows the unit next to its present, exactly like Hero/Shop
    // Quests. A skin reward is a cosmetic bundle instead: the skin ships with a
    // pet carrying the same name, so it shows those two rather than the base
    // unit, and spells the pairing out under Reward. Only Community Quests has
    // skin entries today. A skin with no matching pet still renders, as one
    // badge and a plain "... Skin" reward.
    var isSkin=!!h.skin;
    var sEntry=isSkin?(sMap[h.skin.toLowerCase()]||{}):null;
    var pet=isSkin?(petMap&&petMap[h.skin.toLowerCase()]||null):null;
    var title=isSkin?h.skin:h.unit;
    var u=isSkin?{img:sEntry.img||'',rarity:sEntry.rarity||''}:(uMap[(h.unit||'').toLowerCase()]||{});
    var r=isSkin?pet:(pMap[(h.present||'').toLowerCase()]||{});
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    // Unreleased entries resolve to nothing yet; leave the badge as an empty
    // plate rather than an <img> with no src, which renders a broken icon.
    function badge(src,rar){
      var b=document.createElement('span');
      b.className='inf-img'+(rar?' inf-rarity-'+rar:'');
      b.style.margin='0';
      if(!rar)b.style.background='rgba(25,24,40,.9)';
      if(src){var i=document.createElement('img');i.src=src;i.alt=title;b.appendChild(i);}
      return b;
    }
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=title;
    var badges=document.createElement('div');badges.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0';badges.appendChild(badge(u.img,u.rarity));
    if(r)badges.appendChild(badge(r.img,r.rarity));
    row.appendChild(badges);row.appendChild(h4);card.appendChild(row);
    var qh=document.createElement('div');qh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:2px;text-transform:uppercase';qh.textContent='Quests';card.appendChild(qh);
    h.quests.forEach(function(q){var qd=document.createElement('div');qd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';qd.textContent='● '+q;card.appendChild(qd);});
    // Skin bundles state what you actually get, styled like the Endless tab's
    // Reward. Unit entries keep showing their present as a badge, which already
    // says it, so they get no Reward line.
    if(isSkin){
      var rh=document.createElement('div');rh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin:6px 0 2px;text-transform:uppercase';rh.textContent='Reward';card.appendChild(rh);
      var rd=document.createElement('div');rd.style.cssText='font-size:13px;color:#ccc;line-height:1.7';rd.textContent='● '+title+(pet?' Skin & Pet':' Skin');card.appendChild(rd);
    }
    pEl.appendChild(card);
  });
}
// Prestige Shop items are looked up generically across every item source (skins/units/presents/pets/etc.)
var PRESTIGE_SHOP=[
  {name:'Radiant Astral Bonnie', type:'skin', cost:10}
];
function infLoadTitles(){
  if(_catLoaded['titles'])return;_catLoaded['titles']=true;
  var pEl=document.getElementById('inf-titles-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  fetch('/inf-data/titles').then(function(r){return r.json();}).then(function(data){
    pEl.innerHTML='';buildTitles(pEl,data);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildTitles(pEl,data){
  if(!pEl||!data)return;
  var names=Object.keys(data).sort(function(a,b){return a.localeCompare(b,'en',{sensitivity:'base'});});
  names.forEach(function(n){
    var t=data[n]||{};
    var card=document.createElement('div');card.className='inf-card';
    var h4=document.createElement('h4');
    h4.style.cssText='margin:0;font-size:15px;line-height:1.6;word-break:break-word';
    if(t.css){h4.style.background=t.css;h4.style.webkitBackgroundClip='text';h4.style.backgroundClip='text';h4.style.webkitTextFillColor='transparent';}
    h4.textContent=n;
    card.appendChild(h4);
    pEl.appendChild(card);
  });
  if(!names.length){var e=document.createElement('p');e.style.cssText='color:#888;font-size:11px;padding:12px 14px';e.textContent='No titles yet.';pEl.appendChild(e);}
}
function infLoadPrestige(){
  if(_catLoaded['prestige'])return;_catLoaded['prestige']=true;
  var pEl=document.getElementById('inf-prestige-inner');
  if(!pEl)return;
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  function J(u,fb){return fetch(u).then(function(r){return r.json();}).catch(function(){return fb;});}
  function nr(r){r=(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
  Promise.all([
    J('/inf-data/units',[]),J('/inf-data/presents',{}),J('/inf-data/skins',{}),
    J('/inf-data/pets',{}),J('/inf-data/materials',{}),J('/inf-data/foods',{}),
    J('/inf-data/potions',{}),J('/inf-data/banners',{}),J('/inf-data/loading-screens',{})
  ]).then(function(res){
    var map={};
    function addArr(src){if(Array.isArray(src))src.forEach(function(o){if(o&&o.name){var k=o.name.toLowerCase();if(!map[k])map[k]={img:o.imgNormal||o.image||o.img||'',rarity:nr(o.rarity)};}});}
    function addObj(src){if(src&&typeof src==='object'&&!Array.isArray(src))Object.keys(src).forEach(function(n){var o=src[n];if(o&&typeof o==='object'){var k=n.toLowerCase();if(!map[k])map[k]={img:o.image||o.img||o.imgNormal||'',rarity:nr(o.rarity)};}});}
    addArr(res[0]);for(var i=1;i<res.length;i++)addObj(res[i]);
    pEl.innerHTML='';
    buildPrestige(pEl,map);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildPrestige(pEl,map){
  if(!pEl)return;
  var hc=document.createElement('div');hc.className='inf-card';
  var hr=document.createElement('div');hr.style.cssText='display:flex;align-items:center;gap:12px';
  var him=document.createElement('img');him.src='https://images.fntduserguide.com/toy%20chuddy.png';him.alt='Toy Chuddy';him.style.cssText='width:60px;height:60px;object-fit:contain;flex-shrink:0';
  var ht=document.createElement('div');
  var h1=document.createElement('div');h1.style.cssText='font-family:Audiowide,sans-serif;color:#ffa45b;font-size:1.05em;margin-bottom:2px';h1.textContent='Welcome Back!';
  var h2=document.createElement('div');h2.style.cssText='color:#ccc;font-size:13px';h2.textContent='What would you like to do today?';
  ht.appendChild(h1);ht.appendChild(h2);hr.appendChild(him);hr.appendChild(ht);hc.appendChild(hr);pEl.appendChild(hc);
  var ec=document.createElement('div');ec.className='inf-card';
  var ep=document.createElement('div');ep.style.cssText='color:#ccc;font-size:13px;line-height:1.65';ep.textContent='Upon reaching 100k Faz-Rating, you have the option to Prestige. When you Prestige, you gain 10 Prestige Tokens that can be used in the Prestige Shop and your Faz-Rating milestones are refreshed. If you have more than 100k Faz-Rating when Prestiging, only 100k is taken away';
  ec.appendChild(ep);pEl.appendChild(ec);
  var sc=document.createElement('div');sc.className='inf-card';
  var sh=document.createElement('div');sh.style.cssText='color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif;margin-bottom:8px;text-transform:uppercase';sh.textContent='Prestige Shop';sc.appendChild(sh);
  var pt=map['prestige token']||{};
  PRESTIGE_SHOP.forEach(function(it){
    var m=map[it.name.toLowerCase()]||{};
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var ib=document.createElement('span');ib.className='inf-img'+(m.rarity?' inf-rarity-'+m.rarity:'');ib.style.margin='0';if(!m.rarity)ib.style.background='rgba(25,24,40,.9)';
    var ii=document.createElement('img');ii.src=m.img||'';ii.alt=it.name;ib.appendChild(ii);
    var nm=document.createElement('div');var g=INF_RG[m.rarity];var _nb='flex:1;min-width:0;font-size:13px;font-weight:600;word-break:break-word;';
    if(g){nm.style.cssText=_nb+'background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text';}else{nm.style.cssText=_nb+'color:#e8e8e8';}
    nm.textContent=it.name+(it.type?' ('+it.type+')':'');
    var cost=document.createElement('div');cost.style.cssText='display:flex;align-items:center;gap:5px;flex-shrink:0';
    var cn=document.createElement('span');cn.style.cssText='color:#ffcc33;font-weight:600;font-size:13px';cn.textContent=Number(it.cost).toLocaleString();
    var tb=document.createElement('span');tb.className='inf-img'+(pt.rarity?' inf-rarity-'+pt.rarity:'');tb.style.margin='0';if(!pt.rarity)tb.style.background='rgba(25,24,40,.9)';tb.title='Prestige Tokens';
    var ti=document.createElement('img');ti.src=pt.img||INF_COINS_IMG;ti.alt='Prestige Tokens';tb.appendChild(ti);
    cost.appendChild(cn);cost.appendChild(tb);
    row.appendChild(ib);row.appendChild(nm);row.appendChild(cost);sc.appendChild(row);
  });
  pEl.appendChild(sc);
}
// ── Generic category tabs (banners / pets / skins / loading-screens / materials / potions / foods) ──
var COS_BASE='https://cosmetics.fntduserguide.com';
var ITM_BASE='https://items.fntduserguide.com';
var INF_RO=['radiant','hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
function infRr(r){var i=INF_RO.indexOf((r||'').toLowerCase());return i===-1?INF_RO.length:i;}
var INF_RG={radiant:'linear-gradient(135deg,#FF6600,#FFCC33)',nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))'};
function infHl(t){return String(t).replace(/\\[([^\\]]*)\\]/g,'<span style="color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif">$1</span>').replace(/\\{([^\\}]*)\\}/g,'<strong style="color:#e8e8e8">$1</strong>').replace(/~([a-z]+):([^~]*)~/g,function(_,rar,txt){var g=INF_RG[rar];return g?'<span style="background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600">'+txt+'</span>':txt;});}
function infDur(s){s=Number(s);if(!isFinite(s))return String(s);if(s>=60){var m=Math.round(s/60*10)/10;return s+'s ('+m+'m)';}return s+'s';}
var INFO_SOURCES={
  banners:          {url:'/inf-data/banners',         mode:'lightbox'},
  pets:             {url:'/inf-data/pets',            mode:'sub', shiny:true, shinyName:'gradient', fields:[{key:'speed',label:'Speed',bold:true}]},
  skins:            {url:'/inf-data/skins',           mode:'sub', shiny:true, shinyName:'plain', unitLookup:true, fields:[{key:'unit',label:'Unit',unitRow:true}]},
  'loading-screens':{url:'/inf-data/loading-screens', mode:'lightbox'},
  materials:        {url:'/inf-data/materials',       mode:'sub', fields:[{key:'description',label:'Description'},{key:'obtainment',label:'Obtainment'}]},
  potions:          {url:'/inf-data/potions',         mode:'card', render:function(it){var L=[];if(it.description)L.push('[DESCRIPTION]<br>● '+it.description);if(it.type!=null&&it.type!=='')L.push('[TYPE]<br>● {'+it.type+'}');return L.join('<br>');}},
  foods:            {url:'/inf-data/foods',           mode:'card', render:function(it){return it.exp!=null?'[EXP]<br>● {'+it.exp+'}':'';}}
};
// Same override/add logic as PRESENTS_CFG — any field optional. Keyed by category.
//   overrides: { 'Item Name':{name:'New Name'} / {rarity:'epic'} / {image:'https://...'} / any field }
//   add:       { 'New Item':{rarity:'rare',image:'https://...',<fields>} }
//   hide:      [ 'Exact Item Name', ... ]   ← removes those entries from the tab
var INFO_CFG={
  banners:          {overrides:{}, add:{}, hide:[]},
  pets:             {overrides:{}, add:{}, hide:['Shiny Signed Glacier Springtrap','Shiny Signed Scooped Ice Cream Michael','Shiny Signed Ballad of the Streets Ballora','Shiny Signed Island Vacation Dragon Endo 01']},
  skins:            {overrides:{}, add:{}, hide:['Shiny Signed Glacier Springtrap','Shiny Signed Scooped Ice Cream Michael','Shiny Signed Ballad of the Streets Ballora','Shiny Signed Island Vacation Dragon Endo 01']},
  'loading-screens':{overrides:{}, add:{}, hide:[]},
  materials:        {overrides:{
    // Obtainment text lives here rather than in materials.json so it can be
    // edited without a bucket upload. Values render through infHl(), which
    // writes with innerHTML - so <br>, [HEADER] and {bold} all work, and each
    // line after the first needs its own bullet.
    'Soul': {description:''},
    'Agony':                {obtainment:'Game 4 Nights 30%<br>● Game 4 Custom Nights 30.7-45%'},
    'Ash':                  {obtainment:'Nights'},
    'Balloon':              {obtainment:'Merchant'},
    'Battery':              {obtainment:'Nights'},
    'Beach Ball':           {obtainment:'OG Event Summer Endless'},
    'Bones':                {obtainment:'Halloween Event Endless'},
    'Bronze Ingot':         {obtainment:'Medieval Event Dungeon 1'},
    'Bronze Key':           {obtainment:'Crafted from Bronze Ingot'},
    'Challenge Tokens':     {obtainment:'Challenges'},
    'Clan Coins':           {obtainment:'Clan Quests'},
    'Cloak':                {obtainment:'Game 2 Night 6 5%<br>● Game 2 Night 7 5.1-7.5%'},
    'Colonel Hat':          {obtainment:'Game 2 Night 1 10%'},
    'Cowboy Hat':           {obtainment:'OG Event Western Endless'},
    'Cthulhu Coin':         {obtainment:'Clan Tournaments'},
    'Dragon Tokens':        {obtainment:'Medieval Event Endless'},
    'Easter Eggs':          {obtainment:'Easter Egg Enemies during Easter Event'},
    'Endo Chip':            {obtainment:'Challenges<br>● Challenge Shop<br>● Clan Shop<br>● Codes<br>● Community Pass<br>● Raid Shop<br>● Salvage Shop'},
    'Faz Ingot':            {obtainment:'Medieval Event Dungeon 3'},
    'Faz Key':              {obtainment:'Crafted from Faz Ingot'},
    'Glitch Ingot':         {obtainment:'Medieval Event Dungeon 6'},
    'Glitch Key':           {obtainment:'Crafted from Glitch Ingot'},
    'Glitched TV':          {obtainment:'Game 3 Night 2 12%'},
    'Gold Ingot':           {obtainment:'Medieval Event Dungeon 4'},
    'Gold Key':             {obtainment:'Crafted from Gold Ingot'},
    'Golden Fazbear Trophy':{obtainment:'Game 7 Nights 30%<br>● Game 7 Custom Nights 30.7-45%'},
    'Gravestone':           {obtainment:'OG Event Halloween Endless'},
    'Grenade':              {obtainment:'OG Event Military Endless'},
    'Hazard Sign':          {obtainment:'Game 1 Night 6, 7%<br>● Game 1 Custom Night 7.2-10.5%'},
    'Ice Cream Cone':       {obtainment:'Game 5 Nights 30%<br>● Game 5 Custom Nights 30.7-45%'},
    'Ice Cream Mech Suit':  {obtainment:'Crafted from Ice Cream Cone'},
    'Jar of Pickles':       {obtainment:'Game 6 Nights 30%<br>● Game 6 Custom Nights 30.7-45%'},
    'Plush':                {obtainment:'Merchant'},
    'Prestige Stone':       {obtainment:'TBA'},
    'PvP Token':            {obtainment:'Ranked PvP Matches'},
    'Raid Coins':           {obtainment:'Boss Raids<br>● Clan Pass<br>● Codes'},
    'Remnant':              {obtainment:'Boss Raids Shop'},
    'Salvage Token':        {obtainment:'Salvaging'},
    'Silver Ingot':         {obtainment:'Medieval Event Dungeon 2'},
    'Silver Key':           {obtainment:'Crafted from Silver Ingot'},
    'Soldering Iron':       {obtainment:'Custom Nights<br>● Clan Shop<br>● Salvage Shop'},
    'Spring':               {obtainment:'Nights'},
    'Springlock':           {obtainment:'Challenges<br>● Challenge Shop<br>● Codes<br>● Raid Shop<br>● Salvage Shop'},
    'Television':           {obtainment:'Nights'},
    'Tower Coin':           {obtainment:'Codes<br>● The Tower'},
    'Trick Or Treat Ticket':{obtainment:'Halloween Event Nights'},
    'Water Balloons':       {obtainment:'Game 2 Night 2, 10%'},
    'Welding Gear':         {obtainment:'Game 2 Night 4, 5%'},
    'Soul':                 {obtainment:'Nights'},
    'Soul Ingot':           {obtainment:'Medieval Event Dungeon 5'},
    'Soul Key':             {obtainment:'Crafted from Soul Ingot'},
  }, add:{}, hide:['Normal Material']},
  potions:          {overrides:{}, add:{}, hide:[]},
  foods:            {overrides:{}, add:{}, hide:[]}
};
// Reward/ingredient type (as used in the Presents & Evolutions lookups) → its INFO_CFG key,
// so category overrides (rarity/name/image) apply everywhere an item shows up, not just its own tab.
var INF_REWARD_CFG_KEY={skin:'skins',pet:'pets',banner:'banners','loading screen':'loading-screens',material:'materials',food:'foods',potion:'potions'};
var INF_COINS_IMG='https://images.fntduserguide.com/coins.webp';
var _catLoaded={};
function infLoadCategory(catKey){
  if(_catLoaded[catKey])return;_catLoaded[catKey]=true;
  var pEl=document.getElementById('inf-'+catKey+'-inner');
  if(!pEl)return;
  var src=INFO_SOURCES[catKey];
  var ld=document.createElement('p');ld.style.cssText='color:#888;font-size:11px;padding:12px 14px';ld.textContent='Loading...';pEl.appendChild(ld);
  fetch(src.url)
    .then(function(r){return r.json();})
    .then(function(data){
      if(src.unitLookup){
        fetch('/inf-data/units')
          .then(function(r){return r.json();}).catch(function(){return [];})
          .then(function(arr){
            var um={};(Array.isArray(arr)?arr:[]).forEach(function(u){if(u.name)um[u.name.toLowerCase()]={rarity:(u.rarity||'').toLowerCase(),img:u.imgNormal||''};});
            pEl.innerHTML='';buildCategory(pEl,catKey,data,um);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
          });
      } else { pEl.innerHTML='';buildCategory(pEl,catKey,data,null);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b); }
    })
    .catch(function(){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);});
}
function buildCategory(pEl,catKey,data,unitRar){
  if(!pEl||!data)return;
  var src=INFO_SOURCES[catKey];
  var cfg=INFO_CFG[catKey]||{overrides:{},add:{}};
  var ovs=cfg.overrides||{};
  var hideSet={};(cfg.hide||[]).forEach(function(h){hideSet[String(h).toLowerCase()]=1;});
  var allData={};
  Object.keys(data).forEach(function(k){if(!hideSet[k.toLowerCase()])allData[k]=data[k];});
  Object.keys(cfg.add||{}).forEach(function(k){if(!hideSet[k.toLowerCase()])allData[k]=cfg.add[k];});

  // Fold "Shiny X" variants into their base item
  var shinyMap={};
  if(src.shiny){
    Object.keys(allData).forEach(function(k){
      if(/^shiny /i.test(k)){
        var baseName=k.replace(/^shiny /i,'');
        var baseKey=Object.keys(allData).filter(function(x){return !/^shiny /i.test(x)&&x.toLowerCase()===baseName.toLowerCase();})[0];
        if(baseKey){shinyMap[baseKey]=allData[k];delete allData[k];}
      }
    });
  }

  Object.keys(allData).sort(function(a,b){
    var ra=(ovs[a]&&ovs[a].rarity)||allData[a].rarity||'';
    var rb=(ovs[b]&&ovs[b].rarity)||allData[b].rarity||'';
    var rd=infRr(ra)-infRr(rb);
    return rd!==0?rd:a.localeCompare(b);
  }).forEach(function(name){
    var base=allData[name]||{};
    var ov=ovs[name]||{};
    var displayName=ov.name||name;
    var displayImg=ov.image||base.image||'';
    var displayRar=(ov.rarity||base.rarity||'').toLowerCase();
    var card=document.createElement('div');card.className='inf-card';

    // ── Card style (potions / food): flat card with description, like bytes/chips ──
    if(src.mode==='card'){
      var crow=document.createElement('div');crow.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
      var cbadge=document.createElement('span');cbadge.className='inf-img'+(displayRar?' inf-rarity-'+displayRar:'');
      if(!displayRar)cbadge.style.background='rgba(25,24,40,.9)';
      var cimg=document.createElement('img');cimg.src=displayImg;cimg.alt=displayName;cbadge.appendChild(cimg);
      var ch4=document.createElement('h4');ch4.style.margin='0';ch4.textContent=displayName;
      crow.appendChild(cbadge);crow.appendChild(ch4);card.appendChild(crow);
      var merged={};Object.keys(base).forEach(function(k){merged[k]=base[k];});Object.keys(ov).forEach(function(k){merged[k]=ov[k];});
      var desc=src.render?src.render(merged):'';
      if(desc){var cp=document.createElement('p');cp.innerHTML=infHl(desc);card.appendChild(cp);}
      pEl.appendChild(card);
      return;
    }

    // ── Lightbox style (banners / loading screens): click to fullscreen image ──
    if(src.mode==='lightbox'){
      var lrow=document.createElement('div');lrow.style.cssText='display:flex;align-items:center;gap:10px;cursor:zoom-in';
      var lbadge=document.createElement('span');lbadge.className='inf-img'+(displayRar?' inf-rarity-'+displayRar:'');
      if(!displayRar)lbadge.style.background='rgba(25,24,40,.9)';
      var limg=document.createElement('img');limg.src=displayImg;limg.alt=displayName;lbadge.appendChild(limg);
      var lh4=document.createElement('h4');lh4.style.cssText='margin:0;flex:1';lh4.textContent=displayName;
      lrow.appendChild(lbadge);lrow.appendChild(lh4);card.appendChild(lrow);
      lrow.addEventListener('click',function(){infLightbox(displayImg);});
      pEl.appendChild(card);
      return;
    }

    // ── Sub-dropdown style (pets / skins / materials): bytes/chips-style sections ──
    var shiny=shinyMap[name];
    var extraRow=null;
    if(shiny){
      extraRow=document.createElement('div');extraRow.style.cssText='display:flex;align-items:center;gap:10px;margin-top:8px';
      var _sb=document.createElement('span');_sb.className='inf-img inf-rarity-shiny';
      var _si=document.createElement('img');_si.src=shiny.image||'';_si.alt='Shiny '+displayName;_sb.appendChild(_si);
      var _sn=document.createElement('h4');_sn.style.cssText='margin:0;flex:1';_sn.textContent='Shiny '+displayName;
      extraRow.appendChild(_sb);extraRow.appendChild(_sn);
    }
    pEl.appendChild(buildOneSub(catKey,name,base,ov,unitRar,extraRow));
  });
}
function buildOneSub(catKey,name,base,ov,unitData,extraRow){
  var src=INFO_SOURCES[catKey];ov=ov||{};base=base||{};
  var displayName=ov.name||name;
  var displayImg=ov.image||base.image||'';
  var displayRar=(ov.rarity||base.rarity||'').toLowerCase();
  var card=document.createElement('div');card.className='inf-card';
  var inner=document.createElement('div');inner.style.cssText='margin-top:8px;padding:8px;background:rgba(0,0,0,.4);border-radius:6px;font-size:13px;line-height:1.75';
  (src.fields||[]).forEach(function(f){
    var v=ov[f.key]!==undefined?ov[f.key]:base[f.key];
    if(v===undefined||v===null||v==='')return;
    if(!f.unitRow){var hd=document.createElement('div');hd.style.cssText=inner.children.length?'margin-top:8px':'';hd.innerHTML=infHl('['+String(f.label).toUpperCase()+']');inner.appendChild(hd);}
    if(f.unitRow&&unitData){
      var u=unitData[String(v).toLowerCase()]||{};
      var rr=document.createElement('div');rr.className='inf-reward-row';rr.style.marginTop='4px';rr.style.cursor='pointer';
      var rb=document.createElement('span');rb.className='inf-img'+(u.rarity?' inf-rarity-'+u.rarity:'');if(!u.rarity)rb.style.background='rgba(25,24,40,.9)';
      var ri=document.createElement('img');ri.src=u.img||'';ri.alt=v;rb.appendChild(ri);
      var rn=document.createElement('div');rn.className='inf-reward-name';rn.innerHTML=infHl(u.rarity?('~'+u.rarity+':'+v+'~'):v);
      rr.appendChild(rb);rr.appendChild(rn);inner.appendChild(rr);
      (function(un){rr.addEventListener('click',function(e){e.stopPropagation();window.location.href='/fntd2/unit-engine/'+encodeURIComponent(un.split(' ').join('-'));});})(v);
    } else {
      var ln=document.createElement('div');ln.style.cssText='font-size:13px;color:#ccc;line-height:1.75;margin-top:4px';
      ln.innerHTML=infHl('● '+(f.bold?('{'+v+'}'):v));
      inner.appendChild(ln);
    }
  });
  var hasInner=inner.children.length>0;
  var hasBody=hasInner||extraRow;
  var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px'+(hasBody?';cursor:pointer':'');
  var badge=document.createElement('span');badge.className='inf-img'+(displayRar?' inf-rarity-'+displayRar:'');if(!displayRar)badge.style.background='rgba(25,24,40,.9)';
  var img=document.createElement('img');img.src=displayImg;img.alt=displayName;badge.appendChild(img);
  var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=displayName;
  row.appendChild(badge);row.appendChild(h4);
  var arr=null;
  if(hasBody){arr=document.createElement('span');arr.style.cssText='color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6';arr.textContent='/';row.appendChild(arr);}
  card.appendChild(row);
  if(hasBody){
    var body=document.createElement('div');body.className='inf-exp-body';body.style.cssText='max-height:0;overflow:hidden;transition:max-height .3s ease';
    if(extraRow)body.appendChild(extraRow);
    if(hasInner)body.appendChild(inner);
    card.appendChild(body);
    row.addEventListener('click',function(){infToggleExp(row,body,arr);});
  }
  return card;
}
// ── Attack Types ────────────────────────────────────────────────────────
// Hardcoded and text-only — there are no icons for these, so the cards are
// just a name and a description, no badge. Listed A-Z.
// To edit: change the rows below. Supports [HEADER], {bold} and <br>.
var ATTACK_TYPES=[
  {name:'Cone AOE',   desc:'Damages enemies in a forward-facing spread that widens with distance.'},
  {name:'Continuous', desc:'Continuously attacks enemies while they stay in range. Can combine with other attack types.'},
  {name:'Explosion',  desc:'Damages enemies within a circular radius around a target point.'},
  {name:'Full',       desc:'Damages every enemy on the map.'},
  {name:'Full AOE',   desc:'Damages every enemy currently in this unit’s range.'},
  {name:'Line',       desc:'Damages all enemies in a straight path extending from the unit.'},
  {name:'Ricochet',   desc:'Attacks bounce between multiple enemies in range.'},
  {name:'Single',     desc:'Damages one enemy per attack.'},
  {name:'Support',    desc:'Units provide boosts to other units within their range.'}
];
(function(){
  var el=document.getElementById('inf-attack-types-inner');
  if(!el)return;
  ATTACK_TYPES.forEach(function(a){
    var card=document.createElement('div');card.className='inf-card';
    var h4=document.createElement('h4');h4.textContent=a.name;card.appendChild(h4);
    var p=document.createElement('p');p.innerHTML=infHl(a.desc);card.appendChild(p);
    el.appendChild(card);
  });
})();
// ── Elements ────────────────────────────────────────────────────────────
// Hardcoded, styled like the Bytes tab: icon badge + name on one row, details
// beneath. Icons are the base-element entries copied from ELEMENT_ICONS in the
// Unit Engine; the badge border and the element name both use the Unit Engine's
// ELEMENT_TEXT_GRADIENT (the same green it puts on element passive titles).
// To edit: change the rows below. Supports [HEADER], {bold} and <br>.
var ELEMENT_GRAD='linear-gradient(90deg,#b7ff9c,#79ff5c,#9aff72,#6dff52,#b7ff9c)';
var ELEM_IB='https://images.fntduserguide.com/';
// Dual elements are listed after the eight base ones. A dual carries both of
// its parents' effects (one line per parent), which is how the Unit Engine's
// ELEMENT_INFO describes them too — keep the two in step when editing.
// Universal comes last: it is all eight base elements at once, not a dual.
var ELEMENTS=[
  {name:'Neutral',     img:ELEM_IB+'neutralelement.webp',
   desc:'[ENEMY]<br>● Takes {0.85x} damage<br>[UNIT]<br>● {+3%} To all stats'},
  {name:'Nature',      img:ELEM_IB+'natureelement.webp',
   desc:'[ENEMY]<br>● {5%} HP regen/sec to nearby enemies ({4 studs})<br>[UNIT]<br>● {+1} Stock per placement'},
  {name:'Dark',        img:ELEM_IB+'darkelement.webp',
   desc:'[ENEMY]<br>● {1.15x} Base damage dealt (effectively does nothing)<br>[UNIT]<br>● {+3%} Damage'},
  {name:'Water',       img:ELEM_IB+'waterelement.webp',
   desc:'[ENEMY]<br>● {-30%} Movement speed & immune to slows<br>[UNIT]<br>● {+3%} Range to all units on the map (stacks indefinitely)'},
  {name:'Rust',        img:ELEM_IB+'rustelement.webp',
   desc:'[ENEMY]<br>● {-0.15x} Movement speed & {+20%} HP<br>[UNIT]<br>● {+3%} Cooldown & {+6%} damage'},
  {name:'Electricity', img:ELEM_IB+'electricityelement.webp',
   desc:'[ENEMY]<br>● {1.15x} Movement speed boost<br>[UNIT]<br>● {-1%} Cooldown to all units in range (caps at {15%})'},
  {name:'Fire',        img:ELEM_IB+'fireelement.webp',
   desc:'[ENEMY]<br>● {-6%} Damage taken from burn effects<br>[UNIT]<br>● Attacks apply {3%} burn/second'},
  {name:'Light',       img:ELEM_IB+'lightelement.webp',
   desc:'[ENEMY]<br>● {-35%} Stun duration<br>[UNIT]<br>● {-3%} Cooldown'},
  {name:'Dark/Light',        img:ELEM_IB+'dark%3Alightelement.webp',
   desc:'[ENEMY]<br>● {1.15x} Base damage dealt (effectively does nothing)<br>● {-35%} Stun duration<br>[UNIT]<br>● {+3%} Damage<br>● {-3%} Cooldown'},
  {name:'Electricity/Light', img:ELEM_IB+'electricity%3Alightelement.webp',
   desc:'[ENEMY]<br>● {1.15x} Movement speed boost<br>● {-35%} Stun duration<br>[UNIT]<br>● {-1%} Cooldown to all units in range (caps at {15%})<br>● {-3%} Cooldown'},
  {name:'Fire/Rust',         img:ELEM_IB+'fire%3Arustelement.webp',
   desc:'[ENEMY]<br>● {-6%} Damage taken from burn effects<br>● {-0.15x} Movement speed & {+20%} HP<br>[UNIT]<br>● Attacks apply {3%} burn/second<br>● {+3%} Cooldown & {+6%} damage'},
  {name:'Nature/Rust',       img:ELEM_IB+'nature%3Arustelement.webp',
   desc:'[ENEMY]<br>● {5%} HP regen/sec to nearby enemies ({4 studs})<br>● {-0.15x} Movement speed & {+20%} HP<br>[UNIT]<br>● {+1} Stock per placement<br>● {+3%} Cooldown & {+6%} damage'},
  {name:'Nature/Dark',       img:ELEM_IB+'nature%3Adarkelement.webp',
   desc:'[ENEMY]<br>● {5%} HP regen/sec to nearby enemies ({4 studs})<br>● {1.15x} Base damage dealt (effectively does nothing)<br>[UNIT]<br>● {+1} Stock per placement<br>● {+3%} Damage'},
  {name:'Dark/Water',        img:ELEM_IB+'dark%3Awaterelement.webp',
   desc:'[ENEMY]<br>● {1.15x} Base damage dealt (effectively does nothing)<br>● {-30%} Movement speed & immune to slows<br>[UNIT]<br>● {+3%} Damage<br>● {+3%} Range to all units on the map (stacks indefinitely)'},
  {name:'Water/Electricity', img:ELEM_IB+'water%3Aelectricityelement.webp',
   desc:'[ENEMY]<br>● {-30%} Movement speed & immune to slows<br>● {1.15x} Movement speed boost<br>[UNIT]<br>● {+3%} Range to all units on the map (stacks indefinitely)<br>● {-1%} Cooldown to all units in range (caps at {15%})'},
  // Universal is neither a base nor a dual — it carries all eight base elements
  // at once, so its two lists are the eight base rows above concatenated in the
  // same order. If a base element's numbers change, change them here too.
  {name:'Universal',         img:ELEM_IB+'universalelement.png',
   desc:'[ENEMY]<br>● Takes {0.85x} damage<br>● {5%} HP regen/sec to nearby enemies ({4 studs})<br>● {1.15x} Base damage dealt (effectively does nothing)<br>● {-30%} Movement speed & immune to slows<br>● {-0.15x} Movement speed & {+20%} HP<br>● {1.15x} Movement speed boost<br>● {-6%} Damage taken from burn effects<br>● {-35%} Stun duration<br>[UNIT]<br>● {+3%} To all stats<br>● {+1} Stock per placement<br>● {+3%} Damage<br>● {+3%} Range to all units on the map (stacks indefinitely)<br>● {+3%} Cooldown & {+6%} damage<br>● {-1%} Cooldown to all units in range (caps at {15%})<br>● Attacks apply {3%} burn/second<br>● {-3%} Cooldown'}
];
(function(){
  var el=document.getElementById('inf-elements-inner');
  if(!el)return;
  function _elHl(t){return String(t).replace(/\\[([^\\]]*)\\]/g,'<span style="color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif">$1</span>').replace(/\\{([^\\}]*)\\}/g,'<strong style="color:#e8e8e8">$1</strong>');}
  ELEMENTS.forEach(function(e){
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var badge=document.createElement('span');badge.className='inf-img';badge.style.background=ELEMENT_GRAD;
    var im=document.createElement('img');im.src=e.img;im.alt=e.name;im.loading='lazy';badge.appendChild(im);
    var h4=document.createElement('h4');h4.textContent=e.name;
    h4.style.cssText='margin:0;background:'+ELEMENT_GRAD+';-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent';
    row.appendChild(badge);row.appendChild(h4);card.appendChild(row);
    var p=document.createElement('p');p.innerHTML=_elHl(e.desc);card.appendChild(p);
    el.appendChild(card);
  });
})();
// ── Status Effects ──────────────────────────────────────────────────────
// Hardcoded, styled like the Elements tab: icon badge + name on one row,
// description beneath. Listed A-Z. Icons are the pixel-art status heads from
// the images bucket, named after the effect (anti-regen.webp, bleed.webp, …).
// Each row carries three colours sampled from its own art:
//   c  = the badge gradient's bright stop, and the name's darker stop
//   g2 = the badge gradient's deep stop   (badge reads bright -> deep, like
//        the rarity badges' #FF8800 -> #FF0C0C)
//   t1 = the name gradient's light stop   (kept light so it stays legible)
// To edit: change the rows below. Supports [HEADER], {bold} and <br>.
var STAT_IB='https://images.fntduserguide.com/';
var STATUS_EFFECTS=[
  {key:'anti-regen',name:'Anti-Regen',c:'#4ade80',g2:'#148f41',t1:'#86e9aa',
   desc:'Reduces enemy health regeneration by a %'},
  {key:'bleed',     name:'Bleed',     c:'#e0313f',g2:'#7e0e17',t1:'#e96f78',
   desc:'Enemies take damage every second based on a % of a unit’s damage'},
  {key:'burn',      name:'Burn',      c:'#ff8a1f',g2:'#994900',t1:'#feaf66',
   desc:'Enemies take damage every second based on a % of a unit’s damage'},
  {key:'death',     name:'Death',     c:'#b8bcc8',g2:'#667195',t1:'#e0e1e7',
   desc:'Has special effects depending on the unit that marked the enemy'},
  {key:'malware',   name:'Malware',   c:'#4dfd8a',g2:'#00c544',t1:'#93fdb8',
   desc:'Affected units take {+35%} damage from DoT effects and are Stunned {15%} longer'},
  {key:'marked',    name:'Marked',    c:'#ff5252',g2:'#cc0000',t1:'#ff9999',
   desc:'Has special effects depending on the unit that marked the enemy'},
  {key:'poison',    name:'Poison',    c:'#a8d61a',g2:'#4c6208',t1:'#c3e94d',
   desc:'Enemies take damage every second based on a % of a unit’s damage'},
  {key:'rooted',    name:'Rooted',    c:'#5cb469',g2:'#276330',t1:'#8cca96',
   desc:'Slow that increases by {2%} every second, up to {30%}, then Stuns affected enemies after they reach {30%} Slow from Rooted'},
  {key:'scarred',   name:'Scarred',   c:'#c2569b',g2:'#702254',t1:'#d48aba',
   desc:'Non-boss enemies lose {0.25%} of their health every second'},
  {key:'slow',      name:'Slow',      c:'#7fc7dd',g2:'#2690b0',t1:'#b7dfeb',
   desc:'Reduces enemy movement speed by a % (max {60%})'},
  {key:'soaked',    name:'Soaked',    c:'#35a8ff',g2:'#0063af',t1:'#7cc6ff',
   desc:'Enemies receive {+10%} damage from Water units. Fire units deal {+25%} damage and remove Soaked. Electric units deal {+10%} damage, Stun affected enemies for {1.5s}, and remove Soaked'},
  {key:'stun',      name:'Stun',      c:'#7fd6f0',g2:'#11aad8',t1:'#beeaf7',
   desc:'Freezes an enemy in place for a duration ({7s} CD)'},
  {key:'wither',    name:'Wither',    c:'#a98fc4',g2:'#66418d',t1:'#ccbddc',
   desc:'Increases the damage enemies receive by a %'}
];
(function(){
  var el=document.getElementById('inf-status-effects-inner');
  if(!el)return;
  STATUS_EFFECTS.forEach(function(s){
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var badge=document.createElement('span');badge.className='inf-img';
    badge.style.background='linear-gradient(135deg,'+s.c+','+s.g2+')';
    var im=document.createElement('img');im.src=STAT_IB+s.key+'.webp';im.alt=s.name;im.loading='lazy';
    badge.appendChild(im);
    var h4=document.createElement('h4');h4.textContent=s.name;
    h4.style.cssText='margin:0;background:linear-gradient(135deg,'+s.t1+','+s.c+');-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent';
    row.appendChild(badge);row.appendChild(h4);card.appendChild(row);
    var p=document.createElement('p');p.innerHTML=infHl(s.desc);card.appendChild(p);
    el.appendChild(card);
  });
})();
// ── Endo Chips ──────────────────────────────────────────────────────────
// Hardcoded, styled like the Bytes/Enchants tab. Each card = a rarity badge
// (a gradient-coloured letter, or the Glitched render) + its drop chance and
// stat range. To edit: change labels/gradients/chance/range below.
// Optional note card shown above the list (like the Bytes/Chips [_top] blurb).
// Set to a string to show it; supports [HEADER], {bold}, ~rarity:text~ and <br>.
var ENDO_CHIPS_TOP="[Stat Rolls/Locks]<br>● You can reroll the {Stats} of your unit with {Endo Chips}, and you can lock {Stats} that you don't want to reroll with {Springlocks}. For better luck when rolling {Stats}, you can build {Worthiness} on a unit when it kills Enemies. It takes {10k kills} for {max Worthiness} and a unit's worst {Stat} roll at {max Worthiness} is {A tier}. If your unit is {Fully Glitched} (FG) it will have a flashy new purple border";
var ENDO_CHIPS=[
  {label:'D',  grad:'linear-gradient(135deg,#E6E6E6,#8C8C8C)', chance:'[CHANCE]<br>● {29.9% (1/3.3)}', range:'[RANGE]<br>● DMG {0% ~ 5%}<br>● RNG/CD {0% ~ 2.5%}'},
  {label:'C',  grad:'linear-gradient(135deg,#6BFF5C,#2A9D3A)', chance:'[CHANCE]<br>● {35% (1/2.8)}',   range:'[RANGE]<br>● DMG {5% ~ 10%}<br>● RNG/CD {2.5% ~ 5%}'},
  {label:'B',  grad:'linear-gradient(135deg,#58A6FF,#1C3AA0)', chance:'[CHANCE]<br>● {28% (1/3.5)}',   range:'[RANGE]<br>● DMG {10% ~ 15%}<br>● RNG/CD {5% ~ 7.5%}'},
  {label:'A',  grad:'linear-gradient(135deg,#FF35FF,#87009F)', chance:'[CHANCE]<br>● {5% (1/20)}',    range:'[RANGE]<br>● DMG {15% ~ 18%}<br>● RNG/CD {7.5% ~ 9%}'},
  {label:'S',  grad:'linear-gradient(135deg,#FFB81F,#FFFF00)', chance:'[CHANCE]<br>● {1.5% (1/66)}',  range:'[RANGE]<br>● DMG {18% ~ 20%}<br>● RNG/CD {9% ~ 10%}'},
  {label:'SS', grad:'linear-gradient(135deg,#FFB81F,#FFD700)', chance:'[CHANCE]<br>● {0.5% (1/200)}',  range:'[RANGE]<br>● DMG {20% ~ 22%}<br>● RNG/CD {10% ~ 11%}'},
  {img:'https://images.fntduserguide.com/glitched-removebg-preview%20(1).png', grad:'linear-gradient(135deg,#9913CD,#6801B7,#000000,#6801B7,#E9C1FE,#9913CD)', chance:'[CHANCE]<br>● {0.1% (1/1k)}', range:'[RANGE]<br>● DMG {25%}<br>● RNG/CD {12.5%}'}
];
(function(){
  var el=document.getElementById('inf-endo-chips-inner');
  if(!el)return;
  var _ecRG={nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))'};
  function _ecHl(t){return String(t).replace(/\\[([^\\]]*)\\]/g,'<span style="color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif">$1</span>').replace(/\\{([^\\}]*)\\}/g,'<strong style="color:#e8e8e8">$1</strong>').replace(/~([a-z]+):([^~]*)~/g,function(_,rar,txt){var g=_ecRG[rar];return g?'<span style="background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600">'+txt+'</span>':txt;});}
  if(ENDO_CHIPS_TOP){var _tc=document.createElement('div');_tc.className='inf-card';var _tp=document.createElement('p');_tp.innerHTML=_ecHl(ENDO_CHIPS_TOP);_tc.appendChild(_tp);el.appendChild(_tc);}
  ENDO_CHIPS.forEach(function(ch){
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
    var badge=document.createElement('span');badge.className='inf-img';badge.style.background=ch.grad;
    if(ch.img){
      var im=document.createElement('img');im.src=ch.img;im.alt='Glitched';badge.appendChild(im);
    }else{
      var inner=document.createElement('div');inner.style.cssText='width:100%;height:100%;border-radius:8px;background:rgba(10,8,22,.9);display:flex;align-items:center;justify-content:center';
      var lt=document.createElement('span');lt.textContent=ch.label;
      lt.style.cssText='font-family:Audiowide,sans-serif;font-weight:700;line-height:1;font-size:'+(ch.label.length>1?'13px':'20px')+';background:'+ch.grad+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text';
      inner.appendChild(lt);badge.appendChild(inner);
    }
    var cEl=document.createElement('div');cEl.style.cssText='flex:1;min-width:0;font-size:13px;color:#ccc;line-height:1.7';cEl.innerHTML=_ecHl(ch.chance);
    row.appendChild(badge);row.appendChild(cEl);
    var rEl=document.createElement('div');rEl.style.cssText='font-size:13px;color:#ccc;line-height:1.7';rEl.innerHTML=_ecHl(ch.range);
    card.appendChild(row);card.appendChild(rEl);
    el.appendChild(card);
  });
})();
// ── Establishments list ────────────────────────────────────────────────
// Boost cards obtained from Establishment Card Packs. Cards are grouped under
// their pack (each an expandable dropdown) and show rarity, boost and drop odds.
// Clicking a card image opens it fullscreen (same lightbox as the User Banners /
// Loading Screens tabs). Images live in the R2 bucket below, keyed by a slug of
// the name (e.g. "Fazbear Mafia" -> fazbear-mafia.png).
var EST_BASE='https://items.fntduserguide.com/establishments/';
var ESTABLISHMENTS=[
  {name:'Fazbear Mafia',rarity:'secret',desc:'+10% Token Boost'},
  {name:'Arcade',rarity:'rare',desc:'+2.5% Token Boost'},
  {name:'Tshirt',rarity:'rare',desc:'3% Merchant Discount'},
  {name:'Crying Helpy',rarity:'secret',desc:'10% Merchant Discount'},
  {name:'Bonnie and Chica Fight',rarity:'mythic',desc:'7.5% Merchant Discount'},
  {name:'Scrooge McHelpy',rarity:'nightmare',desc:'+12.5% Token Boost'},
  {name:'Chocolate Coin',rarity:'uncommon',desc:'+1.5% Token Boost'},
  {name:'Paycheck',rarity:'mythic',desc:'+7.5% Token Boost'},
  {name:'Ticket Eater',rarity:'epic',desc:'+5% Token Boost'},
  {name:'Sale',rarity:'uncommon',desc:'2% Merchant Discount'},
  {name:'Pimptrap',rarity:'nightmare',desc:'12.5% Merchant Discount'},
  {name:'Puppet Souls',rarity:'secret',desc:'+5% Soul Boost'},
  {name:'Catalog',rarity:'epic',desc:'5% Merchant Discount'},
  {name:'Freddy Fazboost',rarity:'secret',desc:'+5% Faz-Rating Boost'},
  {name:'Springbonnie',rarity:'nightmare',desc:'+8% Soul Boost'},
  {name:'Shhh',rarity:'mythic',desc:'+3% Soul Boost'},
  {name:'You Won!',rarity:'nightmare',desc:'+5% Luck Boost'},
  {name:'Clover',rarity:'mythic',desc:'+2% Luck Boost'},
  {name:'Peaceful Luck',rarity:'secret',desc:'+4% Luck Boost'},
  {name:"Foxy's Throne",rarity:'nightmare',desc:'+10% Faz-Rating Boost'},
  {name:'In the jar',rarity:'mythic',desc:'+2% Faz-Rating Boost'},
  {name:'Raid Coin Card Uncommon',rarity:'uncommon',desc:'+1.5% Raid Coin Boost'},
  {name:'Raid Coin Card Rare',rarity:'rare',desc:'+2.5% Raid Coin Boost'},
  {name:'Raid Coin Card Epic',rarity:'epic',desc:'+5% Raid Coin Boost'},
  {name:'Raid Coin Card Mythical',rarity:'mythic',desc:'+7.5% Raid Coin Boost'},
  {name:'Raid Coin Card Secret',rarity:'secret',desc:'+10% Raid Coin Boost'},
  {name:'Raid Coin Card Nightmare',rarity:'nightmare',desc:'+12.5% Raid Coin Boost'},
  {name:'Raid Coin Card Apex',rarity:'apex',desc:'+20% Raid Coin Boost'},
  {name:'Coin Card Apex',rarity:'apex',desc:'+20% Tokens Boost'},
  {name:'Faz Rating Card Apex',rarity:'apex',desc:'+17.5% Faz-Rating Boost'},
  {name:'Luck Card Apex',rarity:'apex',desc:'+7.5% Luck Boost'}
];
// Card packs — Cost/Type + per-rarity pull weights. Odds are derived from these
// and the card rarities/weights above.
var EST_PACKS=[
  {name:'Establishment Card Pack',rarity:'epic',cost:'1000 Tokens',rarities:{uncommon:60,rare:32.5,epic:5,mythic:2.5,secret:0.5,nightmare:0.1},cards:['Arcade','Tshirt','Bonnie and Chica Fight','Chocolate Coin','Paycheck','Ticket Eater','Sale','Catalog','Shhh','Clover','In the jar','Fazbear Mafia','Crying Helpy','Scrooge McHelpy','Pimptrap','Puppet Souls','Freddy Fazboost','Springbonnie','You Won!','Peaceful Luck',"Foxy's Throne"]},
  {name:'Establishment Card Pack 2',rarity:'epic',cost:'30 Souls',rarities:{uncommon:60,rare:32.5,epic:5,mythic:2.5,secret:0.5,nightmare:0.1,apex:0.01},cards:['Raid Coin Card Uncommon','Raid Coin Card Rare','Raid Coin Card Epic','Raid Coin Card Mythical','Raid Coin Card Secret','Raid Coin Card Nightmare','Raid Coin Card Apex','Luck Card Apex','Coin Card Apex','Faz Rating Card Apex']}
];
(function(){
  var el=document.getElementById('inf-establishments-inner');
  if(!el)return;
  var RO=['radiant','hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
  var RG={radiant:'linear-gradient(135deg,#FF6600,#FFCC33)',nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))',shiny:'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'};
  function rank(r){var i=RO.indexOf((r||'').toLowerCase());return i===-1?RO.length:i;}
  function slug(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
  var estBy={};ESTABLISHMENTS.forEach(function(e){estBy[e.name]=e;});
  EST_PACKS.forEach(function(pack){
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;cursor:pointer';
    var badge=document.createElement('span');badge.className='inf-img inf-rarity-'+pack.rarity;
    var pim=document.createElement('img');pim.src=EST_BASE+slug(pack.name)+'.png';pim.alt=pack.name;badge.appendChild(pim);
    var col=document.createElement('div');col.style.cssText='flex:1;min-width:0';
    var h4=document.createElement('h4');h4.style.cssText='margin:0';h4.textContent=pack.name;
    var sub=document.createElement('div');sub.style.cssText='font-size:14px;color:#fff;font-weight:700;margin-top:3px';sub.textContent='Cost: '+pack.cost;
    col.appendChild(h4);col.appendChild(sub);
    var arr=document.createElement('span');arr.style.cssText='color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6';arr.textContent='/';
    row.appendChild(badge);row.appendChild(col);row.appendChild(arr);card.appendChild(row);
    var body=document.createElement('div');body.className='inf-exp-body';body.style.cssText='max-height:0;overflow:hidden;transition:max-height .3s ease';
    var inner=document.createElement('div');inner.style.cssText='margin-top:8px;padding:8px;background:rgba(0,0,0,.4);border-radius:6px;display:flex;flex-direction:column;gap:6px';
    pack.cards.map(function(cn){
      var e=estBy[cn]||{};var r=e.rarity||'';
      return {name:cn,rarity:r,desc:e.desc||'',chance:(pack.rarities[r]!=null?pack.rarities[r]:0)};
    }).sort(function(a,b){var rd=rank(a.rarity)-rank(b.rarity);return rd!==0?rd:a.name.localeCompare(b.name);}).forEach(function(c){
      var iu=EST_BASE+slug(c.name)+'.png';
      var rrow=document.createElement('div');rrow.className='inf-reward-row';
      var rb=document.createElement('span');rb.className='inf-img'+(c.rarity?' inf-rarity-'+c.rarity:'');rb.style.cursor='zoom-in';
      var ri=document.createElement('img');ri.src=iu;ri.alt=c.name;rb.appendChild(ri);
      (function(u){rb.addEventListener('click',function(ev){ev.stopPropagation();infLightbox(u);});})(iu);
      var cc=document.createElement('div');cc.style.cssText='flex:1;min-width:0';
      var cnm=document.createElement('div');cnm.className='inf-reward-name';cnm.style.fontFamily="'Audiowide',sans-serif";cnm.style.color='#ffa45b';cnm.textContent=c.name;
      var cd=document.createElement('div');var g=RG[c.rarity];
      if(g){cd.style.cssText='font-size:12px;margin-top:2px;font-weight:600;background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text';}
      else{cd.style.cssText='font-size:12px;color:#fff;margin-top:2px';}
      cd.textContent=c.desc;
      cc.appendChild(cnm);cc.appendChild(cd);
      var rq=document.createElement('div');rq.className='inf-reward-chance';rq.textContent=c.chance+'%';
      rrow.appendChild(rb);rrow.appendChild(cc);rrow.appendChild(rq);inner.appendChild(rrow);
    });
    body.appendChild(inner);card.appendChild(body);
    row.addEventListener('click',function(){infToggleExp(row,body,arr);});
    el.appendChild(card);
  });
})();
// ── Minigames list ────────────────────────────────────────────────────
// Each entry is either a video button or a text box. Add/reorder freely.
// A { text: '...' } box can sit at the top or between any video buttons.
// Text boxes support the same formatting as the other tabs:
//   [Header]  {bold}  ~rarity:text~   and <br> for line breaks.
var MINIGAMES=[
  { text:'[Circus Baby Minigame]<br>[Location]<br>● Game 5<br>● To Trigger this Minigame you must defeat the {Arcade} Enemy, with a {10%} chance of spawning on Waves {5} and {12} respectively' },
  { video:'Circus Baby (Normal Ending)', url:'https://images.fntduserguide.com/babynormal.mp4' },
  { video:'Circus Baby (Secret Ending)', url:'https://images.fntduserguide.com/cbminigameDsdf.mp4' },
  { text:'[Foxy Go Minigame]<br>[Location]<br>● Game 2<br>● To Trigger this Minigame you must defeat the {Arcade} Enemy, with a {10%} chance of spawning on Waves {5} and {12} respectively' },
  { video:'Foxy Go (Normal Ending)', url:'https://images.fntduserguide.com/gogogo.mp4' }
];
(function(){
  var el=document.getElementById('inf-minigames-inner');
  if(!el)return;
  var RG={nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))',shiny:'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'};
  function hl(t){return String(t).replace(/\\[([^\\]]*)\\]/g,'<span style="color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif">$1</span>').replace(/\\{([^\\}]*)\\}/g,'<strong style="color:#e8e8e8">$1</strong>').replace(/~([a-z]+):([^~]*)~/g,function(_,rar,txt){var g=RG[rar];return g?'<span style="background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600">'+txt+'</span>':txt;});}
  MINIGAMES.forEach(function(it){
    if(!it)return;
    if(it.text!=null){
      var c=document.createElement('div');c.className='inf-card';
      var p=document.createElement('p');p.innerHTML=hl(it.text);c.appendChild(p);el.appendChild(c);
    }else if(it.video!=null){
      var url=it.url;
      var wrap=document.createElement('div');wrap.className='inf-mg-wrap';
      var b=document.createElement('button');b.type='button';b.className='inf-mg-item';
      var pl=document.createElement('span');pl.className='inf-mg-play';
      var nm=document.createElement('span');nm.className='inf-mg-name';nm.textContent=it.video;
      b.appendChild(pl);b.appendChild(nm);
      var drop=document.createElement('div');drop.className='inf-mg-drop';
      var vw=document.createElement('div');vw.className='inf-mg-video-wrap';
      var v=document.createElement('video');v.className='inf-mg-video';v.loop=true;v.playsInline=true;
      v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');v.preload='metadata';
      var hint=document.createElement('span');hint.className='inf-mg-fs-hint';hint.textContent='Tap to fullscreen';
      vw.appendChild(v);vw.appendChild(hint);drop.appendChild(vw);
      // Click the button: slide the inline preview open (or closed) and play it.
      b.addEventListener('click',function(){
        var isOpen=wrap.classList.contains('open');
        el.querySelectorAll('.inf-mg-wrap.open').forEach(function(w){if(w!==wrap){w.classList.remove('open');var ov=w.querySelector('.inf-mg-video');if(ov){try{ov.pause();ov.currentTime=0;}catch(e){}}}});
        if(isOpen){wrap.classList.remove('open');try{v.pause();v.currentTime=0;}catch(e){}return;}
        wrap.classList.add('open');
        if(!v.getAttribute('src'))v.src=url;
        v.play().catch(function(){});
      });
      // Tap the preview: go fullscreen at the same spot; resume inline on exit.
      vw.addEventListener('click',function(){
        var t=0;try{t=v.currentTime||0;}catch(e){}
        try{v.pause();}catch(e){}
        infPlayMinigame(url,{startTime:t,onExit:function(ct){
          try{v.currentTime=ct;}catch(e){}
          if(wrap.classList.contains('open'))v.play().catch(function(){});
        }});
      });
      wrap.appendChild(b);wrap.appendChild(drop);el.appendChild(wrap);
    }
  });
})();
(function(){
  var el=document.getElementById('inf-shiny-transfer-inner');
  if(!el)return;
  var msg="This can be found in the Workshop under the Enchant interface (see video). At the cost of Souls, you can transfer the Shiny status from one unit, to a non-Shiny version of that EXACT unit. You cannot transfer Shiny to a unit that isn't the unit you're taking Shiny away from (I.E Shiny Freddy to Normal Chica). The best way to use this is if you have a non-Shiny with really good Stats and a good Enchant, but open a Shiny of the same unit later on. This allows you to give Shiny to an already set up unit without having to spend all those resources again";
  var c=document.createElement('div');c.className='inf-card';
  var p=document.createElement('p');p.style.cssText='font-size:13px;color:#ccc;line-height:1.7;margin:0';p.textContent=msg;
  c.appendChild(p);el.appendChild(c);
  var vw=document.createElement('div');vw.className='inf-mg-video-wrap';
  var v=document.createElement('video');v.className='inf-mg-video';v.loop=true;v.playsInline=true;
  v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');v.preload='none';
  v.setAttribute('data-inf-autoplay','1');v.setAttribute('data-src','https://images.fntduserguide.com/shinytransfer.mp4');
  var hint=document.createElement('span');hint.className='inf-mg-fs-hint';hint.textContent='Tap to fullscreen';
  vw.appendChild(v);vw.appendChild(hint);el.appendChild(vw);
  // Tap the preview: fullscreen at the same spot; resume inline on exit if the tab is still open.
  vw.addEventListener('click',function(){
    var t=0;try{t=v.currentTime||0;}catch(e){}
    try{v.pause();}catch(e){}
    infPlayMinigame(v.getAttribute('data-src'),{startTime:t,onExit:function(ct){
      try{v.currentTime=ct;}catch(e){}
      var dp=el.closest('.inf-drop');if(dp&&dp.classList.contains('open'))v.play().catch(function(){});
    }});
  });
})();
function infPlayMinigame(url,opts){
  opts=opts||{};
  var fs=document.createElement('div');fs.className='inf-mg-fs';
  var v=document.createElement('video');
  v.src=url;v.controls=true;v.playsInline=true;
  v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');
  var startAt=opts.startTime||0;
  if(startAt>0){var _seek=function(){try{v.currentTime=startAt;}catch(e){}};if(v.readyState>=1)_seek();else v.addEventListener('loadedmetadata',_seek,{once:true});}
  var _exited=false;
  var close=document.createElement('button');close.className='inf-mg-fs-close';
  close.setAttribute('aria-label','Close');close.innerHTML='&#x2715;';
  function done(){
    if(_exited)return;_exited=true;
    var ct=0;try{ct=v.currentTime||0;}catch(e){}
    try{v.pause();}catch(e){}
    document.removeEventListener('fullscreenchange',onFsChange);
    document.removeEventListener('webkitfullscreenchange',onFsChange);
    var fsel=document.fullscreenElement||document.webkitFullscreenElement;
    if(fsel){(document.exitFullscreen||document.webkitExitFullscreen||function(){}).call(document);}
    if(fs.parentNode)fs.parentNode.removeChild(fs);
    if(opts.onExit){try{opts.onExit(ct);}catch(e){}}
  }
  function onFsChange(){
    var fsel=document.fullscreenElement||document.webkitFullscreenElement;
    if(fsel===fs){fs._entered=true;}else if(fs._entered){done();}
  }
  close.addEventListener('click',function(e){e.stopPropagation();done();});
  fs.addEventListener('click',function(e){if(e.target===fs)done();});
  v.addEventListener('webkitendfullscreen',done);
  fs.appendChild(v);fs.appendChild(close);document.body.appendChild(fs);
  v.play().catch(function(){});
  // Try real fullscreen; the fixed overlay already covers the screen as a fallback.
  var rq=fs.requestFullscreen||fs.webkitRequestFullscreen||fs.msRequestFullscreen;
  if(rq){
    document.addEventListener('fullscreenchange',onFsChange);
    document.addEventListener('webkitfullscreenchange',onFsChange);
    try{var pr=rq.call(fs);if(pr&&pr.catch)pr.catch(function(){});}catch(e){}
  }else if(v.webkitEnterFullscreen){
    if(v.readyState>=1){try{v.webkitEnterFullscreen();}catch(e){}}
    else{v.addEventListener('loadedmetadata',function(){try{v.webkitEnterFullscreen();}catch(e){}},{once:true});}
  }
}
var _rotData=null,_rotAt=0,_rotDrawn=false,_rotBooted=false,_rotReloading=false;
function _rotDig(o){return (o&&o.data&&o.data.data)||null;}
function infRotFetch(){
  if(_rotData)return Promise.resolve(_rotData);
  return fetch('/rotations').then(function(r){return r.json();}).then(function(j){
    if(j&&j.banners){_rotData=j;_rotAt=(j.banners.data&&j.banners.data.refreshAt)||0;_infIdx=null;infRotTick();}
    return _rotData;
  }).catch(function(){return null;});
}
function infRotTick(){
  var el=document.getElementById('inf-rot-t');if(!el)return;
  if(!_rotAt){el.textContent='';return;}
  var left=_rotAt-Math.floor(Date.now()/1000);
  if(left<=0){
    el.textContent='refreshing';el.className='inf-rt soon';
    if(!_rotReloading){_rotReloading=true;setTimeout(function(){
      _rotData=null;_rotDrawn=false;_rotReloading=false;
      infRotFetch().then(function(){
        var p=document.getElementById('ug-info-panel');
        if(p&&p.getAttribute('data-mode')==='rot')infRotRender();
      });
    },25000);}
    return;
  }
  var m=Math.floor(left/60);
  el.textContent=(m>=60?(Math.floor(m/60)+'h '+(m%60)+'m'):(m>0?m+'m':left+'s'));
  el.className='inf-rt'+(left<300?' soon':'');
}
var ROT_TYPE_FEED={pet:'pets',skin:'skins',food:'foods',potion:'potions',material:'materials',present:'presents',banner:'banners'};
var ROT_POOL_LABEL={Lobby:'Coins'};
// Merchant types with no feed behind them. Music has no wiki JSON, so every track
// falls back to the soundtrack sleeve rather than rendering a blank badge.
var ROT_TYPE_ART={music:{img:'https://images.fntduserguide.com/Aog%20Background%20Removed.png',rarity:'uncommon'}};
function _rotPMap(){var d=_infFeedData['presents']||{},m={},n;for(n in d){var o=d[n]||{};m[n.toLowerCase()]={img:o.image||'',rarity:_infNr(o.rarity)};}return m;}
function _rotLook(name,type){
  var k=String(name||'').toLowerCase();
  var fk=ROT_TYPE_FEED[String(type||'').toLowerCase()];
  if(fk){
    var d=_infFeedData[fk];
    if(d)for(var n in d)if(n.toLowerCase()===k){var it=d[n]||{};return {img:it.image||'',rarity:_infNr(it.rarity)};}
  }
  var u=_infUnitMap[k];
  if(u&&u.img)return u;
  var a=_infAnyLookup(name);
  if(a&&a.img)return a;
  var t=ROT_TYPE_ART[String(type||'').toLowerCase()];
  if(t)return t;
  return u||a||{};
}
function _rotCard(name,rarity,meta,type,metaCls,disp){
  var look=_rotLook(name,type);
  var rar=_infNr(rarity)||_infNr(look.rarity)||'';
  var g=INF_RG[rar];
  var badge='<span class="inf-img'+(g?' inf-rarity-'+_infEsc(rar):'')+'"'+(g?'':' style="background:rgba(25,24,40,.9)"')+'>'+(look.img?'<img src="'+_infEsc(look.img)+'" alt="" loading="lazy">':'')+'</span>';
  return '<div class="inf-card"><div class="rot-row">'+badge+'<div class="rot-main"><h4>'+_infEsc(disp||name)+'</h4>'+(meta?'<div class="rot-meta'+(metaCls?' '+metaCls:'')+'">'+_infEsc(meta)+'</div>':'')+'</div></div></div>';
}
function _rotNum(n){var v=Number(n);return isFinite(v)?v.toLocaleString('en-US'):String(n);}
function infRotRender(){
  if(_rotDrawn||!_rotData)return;
  _rotDrawn=true;
  var el,b=(_rotDig(_rotData.banners)||{}).banners;
  el=document.getElementById('inf-rot-banners-inner');
  if(el){
    if(b){var h='';Object.keys(b).forEach(function(cur){
      h+='<div class="rot-group">'+_infEsc(ROT_POOL_LABEL[cur]||cur)+'</div>';
      (b[cur]||[]).forEach(function(u){h+=_rotCard(u.name,u.rarity,'');});
    });el.innerHTML=h;}
    else el.innerHTML='<div class="rot-wait">Rotations unavailable.</div>';
    el.removeAttribute('data-ads');
  }
  var m=(_rotDig(_rotData.merchant)||{}).items;
  el=document.getElementById('inf-rot-merchant-inner');
  if(el){
    if(m){
      var sorted=m.slice().sort(function(a,z){return (a.slot||0)-(z.slot||0);}),h2='',groups=[],by={};
      sorted.forEach(function(i){var g=i.category||'Other';if(!by[g]){by[g]=[];groups.push(g);}by[g].push(i);});
      groups.sort(function(a,z){return (a==='Units'?0:1)-(z==='Units'?0:1);});
      groups.forEach(function(g){
        h2+='<div class="rot-group">'+_infEsc(g)+'</div>';
        by[g].forEach(function(i){
          var amt=(i.amounts&&i.amounts[0]>1)?(' x'+i.amounts[0]):'';
          h2+=_rotCard(i.name,'',_rotNum(i.price)+' '+i.currency+amt,i.type,'rot-price',i.name+(i.type?' ('+i.type+')':''));
        });
      });
      el.innerHTML=h2;
    }
    else el.innerHTML='<div class="rot-wait">Rotations unavailable.</div>';
    el.removeAttribute('data-ads');
  }
  var q=(_rotDig(_rotData.questShop)||{}).quests;
  el=document.getElementById('inf-rot-quests-inner');
  if(el){
    el.innerHTML='';
    if(q&&q.length)buildShopStyle(el,q.map(function(x){
      var rw=(x.rewards||[])[0]||{};
      var pres=rw.name||'';
      var unit=pres.replace(' Present','').replace(' Bundle','').replace(' Skin','');
      return {unit:unit||x.name,present:pres,cost:x.price,quests:x.objectives||[]};
    }),_infUnitMap,_rotPMap());
    else el.innerHTML='<div class="rot-wait">Rotations unavailable.</div>';
    el.removeAttribute('data-ads');
  }
}
function infMode(m){
  var p=document.getElementById('ug-info-panel');if(!p)return;
  p.setAttribute('data-mode',m);
  var bs=p.querySelectorAll('.inf-mode');
  for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].getAttribute('data-mode')===m);
  // The rotations slot ships inside a display:none container, so it had no box for
  // the observer to see when ugPanelAds() swept the panel. Re-watch it now that the
  // view is showing; _infAdFill's own guard keeps it to one impression.
  if(m==='rot'){
    var ph=p.querySelectorAll('#inf-rot [data-ad-ph]');
    for(var j=0;j<ph.length;j++)if(!ph[j].getAttribute('data-ad-on'))_infAdWatch(ph[j]);
    Promise.all([infRotFetch(),_infLoadFeeds()]).then(function(){infRotRender();});
  }
}
var UG_OURS={'ug-info-panel':1,'ug-info-overlay':1,'ug-mobile-nav':1,'ug-overlay':1,'ug-hamburger':1,'ug-info-btn':1,'ug-sound-btn':1};
function ugAnchorPad(){
  var h=0;
  if(window.innerWidth<=768){
    var n=document.body.children;
    for(var i=0;i<n.length;i++){
      var el=n[i];
      if(UG_OURS[el.id])continue;
      if(String(el.className||'').indexOf('ug-')===0)continue;
      var cs;try{cs=getComputedStyle(el);}catch(e){continue;}
      if(cs.position!=='fixed'||cs.display==='none')continue;
      var r=el.getBoundingClientRect();
      if(r.height<20||r.height>260)continue;
      if(r.bottom<window.innerHeight-4)continue;
      if(r.width<window.innerWidth*0.6)continue;
      if(r.height>h)h=r.height;
    }
  }
  document.documentElement.style.setProperty('--ug-anchor',Math.round(h)+'px');
}
function ugAnchorWatch(){
  ugAnchorPad();
  [600,2000,5000].forEach(function(ms){setTimeout(ugAnchorPad,ms);});
  window.addEventListener('resize',ugAnchorPad,{passive:true});
  if(typeof MutationObserver!=='undefined')new MutationObserver(function(){
    clearTimeout(ugAnchorPad._t);ugAnchorPad._t=setTimeout(ugAnchorPad,250);
  }).observe(document.body,{childList:true});
}
function infRotBoot(){
  if(_rotBooted)return;_rotBooted=true;
  var p=document.getElementById('ug-info-panel');
  if(p&&!p.getAttribute('data-mode'))p.setAttribute('data-mode','info');
  infRotFetch();
  setInterval(infRotTick,15000);
  ugAnchorWatch();
}
function _infRotRows(){
  var S=[],d=_rotData;if(!d)return S;
  var b=(_rotDig(d.banners)||{}).banners;
  if(b)Object.keys(b).forEach(function(cur){
    var lab=ROT_POOL_LABEL[cur]||cur;
    (b[cur]||[]).forEach(function(u){S.push({n:u.name,c:'rot-banners',cl:'Banners - '+lab,rar:_infNr(u.rarity),m:'In the '+lab+' banner right now'});});
  });
  var m=(_rotDig(d.merchant)||{}).items;
  if(m)m.forEach(function(i){S.push({n:i.name,c:'rot-merchant',cl:'Merchant',t:i.type,m:i.type+' - '+_rotNum(i.price)+' '+i.currency});});
  var q=(_rotDig(d.questShop)||{}).quests;
  if(q)q.forEach(function(x){S.push({n:x.name,c:'rot-quests',cl:'Quest Shop',m:_rotNum(x.price)+' Tokens'});});
  S.forEach(function(r){var u=_rotLook(r.n,r.t);if(u){if(!r.img)r.img=u.img;if(!r.rar)r.rar=_infNr(u.rarity);}});
  return S;
}
var INF_AD_EVERY=10,_infAdObs=null;
function _infAdFill(ph){
  if(!ph||ph.getAttribute('data-ad-on'))return;
  var t=document.getElementById('cleanModeToggle');
  if(t&&t.classList.contains('on'))return;
  ph.setAttribute('data-ad-on','1');
  var ins=document.createElement('ins');
  ins.className='adsbygoogle';
  ins.style.cssText='display:block;text-align:center';
  ins.setAttribute('data-ad-client','ca-pub-7017245771068026');
  ins.setAttribute('data-ad-slot','${PANEL_AD_SLOT}');
  ${PANEL_AD_FLUID ? "ins.setAttribute('data-ad-layout','in-article');ins.setAttribute('data-ad-format','fluid');" : "ins.setAttribute('data-ad-format','auto');ins.setAttribute('data-full-width-responsive','true');"}
  ph.appendChild(ins);
  try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
  [1600,4000].forEach(function(ms){setTimeout(function(){
    if(ins.getAttribute('data-ad-status')==='unfilled')ph.style.display='none';
  },ms);});
}
function _infAdWatch(ph){
  if(!ph)return;
  if(typeof IntersectionObserver==='undefined'){_infAdFill(ph);return;}
  if(!_infAdObs)_infAdObs=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++)if(es[i].isIntersecting){var t=es[i].target;_infAdObs.unobserve(t);if(t._adGo)t._adGo();else _infAdFill(t);}
  },{root:document.getElementById('ug-info-panel'),rootMargin:'250px 0px'});
  _infAdObs.observe(ph);
}
function _infAdPh(cls){var d=document.createElement('div');d.className='inf-ad ad-slot '+cls;d.setAttribute('data-ad-ph','');return d;}
function _infAdSpot(parent,anchor,cls){
  var probe=anchor||parent;
  if(!probe||probe.getAttribute('data-adspot'))return;
  probe.setAttribute('data-adspot','1');
  probe._adGo=function(){
    if(probe.getAttribute('data-adset'))return;
    var t=document.getElementById('cleanModeToggle');
    if(t&&t.classList.contains('on'))return;
    probe.setAttribute('data-adset','1');
    var d=_infAdPh(cls);
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(d,anchor.nextSibling);
    else parent.appendChild(d);
    _infAdFill(d);
  };
  if(typeof IntersectionObserver==='undefined'){probe._adGo();return;}
  _infAdWatch(probe);
}
function infTabAds(inner){
  if(!inner||inner.getAttribute('data-ads'))return;
  // Rotation lists are one continuous pool, so an ad dropped every 10 rows lands
  // mid-list and buries the rest of the summons. They take a single ad after the
  // last row instead; the reference tabs keep the interleaved placement.
  var isRot=String(inner.id||'').indexOf('inf-rot-')===0;
  if(isRot&&inner.querySelector('.rot-wait'))return;
  inner.setAttribute('data-ads','1');
  var kids=[],i,c;
  for(i=0;i<inner.children.length;i++){c=inner.children[i];if(String(c.className).indexOf('inf-ad')===-1)kids.push(c);}
  if(!kids.length)return;
  if(isRot){_infAdSpot(inner,kids[kids.length-1],'inf-ad-in');return;}
  for(i=INF_AD_EVERY-1;i<kids.length;i+=INF_AD_EVERY)_infAdSpot(inner,kids[i],'inf-ad-in');
}
function infEntryAd(body){
  if(!body||body.getAttribute('data-ads'))return;
  body.setAttribute('data-ads','1');
  _infAdSpot(body,null,'inf-ad-sub');
}
var _infIdx=null,_infFeedData={},_infUnitMap={},_infFeedsLoaded=false,_infQTimer=null;
function _infNr(r){r=String(r||'').toLowerCase().trim();return r==='mythical'?'mythic':(r==='legendary'?'exclusive':r);}
var INF_FEED_CATS=[['presents','Presents'],['pets','Pets'],['skins','Unit Skins'],['banners','User Banners'],['loading-screens','Loading Screens'],['materials','Materials'],['foods','Food'],['potions','Potions'],['titles','Titles']];
var INF_SHARED_CATS=[['bytes','Bytes'],['chips','Chips'],['enchants','Enchants']];
function _infSlug(n){return String(n).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function _infEsc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function _infPlain(s){return String(s==null?'':s).replace(/<br\\s*\\/?>/gi,' ').replace(/~[a-z]+:([^~]*)~/g,'$1').replace(/<[^>]*>/g,'').replace(/[\\[\\]{}]/g,'').replace(/\\s+/g,' ').trim();}
function _infAnyLookup(name){
  var k=String(name||'').toLowerCase(),u=_infUnitMap[k];
  if(u&&u.img)return u;
  for(var i=0;i<INF_FEED_CATS.length;i++){
    var d=_infFeedData[INF_FEED_CATS[i][0]];if(!d)continue;
    for(var n in d)if(n.toLowerCase()===k){var it=d[n]||{};return {img:it.image||'',rarity:_infNr(it.rarity)};}
  }
  return {};
}
function _infQuestRows(list){return list.map(function(q){var u=_infUnitMap[String(q.unit||'').toLowerCase()]||{};var r=q.skin?('Skin · '+q.skin):(q.present?('Present · '+q.present):'');return {n:q.unit,img:u.img,rar:u.rarity,m:(r?r+' · ':'')+((q.quests&&q.quests.length)||0)+' quests'};});}
function _infStaticRows(){
  var S=[];
  function add(key,label,rows){for(var i=0;i<rows.length;i++){if(!rows[i].n)continue;rows[i].c=key;rows[i].cl=label;S.push(rows[i]);}}
  add('attack-types','Attack Types',ATTACK_TYPES.map(function(x){return {n:x.name,m:_infPlain(x.desc)};}));
  add('elements','Elements',ELEMENTS.map(function(x){return {n:x.name,img:x.img,grad:ELEMENT_GRAD,m:_infPlain(x.desc)};}));
  add('status-effects','Status Effects',STATUS_EFFECTS.map(function(x){return {n:x.name,img:STAT_IB+x.key+'.webp',grad:'linear-gradient(135deg,'+x.c+','+x.g2+')',m:_infPlain(x.desc)};}));
  add('stat-chips','Stat Chips',ENDO_CHIPS.map(function(x){return {n:(x.label||'Glitched')+' Stat Chip',grad:x.grad,txt:x.label,img:x.img,m:_infPlain(x.chance)+' · '+_infPlain(x.range)};}));
  add('shiny-transfer','Shiny Transfer',[{n:'Shiny Transfer',m:'Move Shiny status between two copies of the same unit, in the Workshop'}]);
  add('establishments','Establishments',ESTABLISHMENTS.map(function(x){return {n:x.name,rar:x.rarity,img:EST_BASE+_infSlug(x.name)+'.png',m:_infPlain(x.desc)};}));
  add('minigames','Minigames',MINIGAMES.filter(function(x){return x.video;}).map(function(x){return {n:x.video,m:'Minigame clip'};}));
  add('evolutions','Evolutions',EVOLUTIONS.map(function(x){var u=_infAnyLookup(x.name);return {n:x.display||x.name,img:u.img||EVO_PLACEHOLDER,rar:u.rarity,m:(x.ing||[]).map(function(i){return i[0]+'× '+i[1];}).join(' · ')};}));
  add('hero-quests','Hero Quests & Paths',_infQuestRows(HERO_QUESTS));
  add('shop-quests','Shop Quests',_infQuestRows(SHOP_QUESTS));
  add('endless-quests','Endless Quests',_infQuestRows(ENDLESS_QUESTS));
  add('permanent-quests','Permanent Quests',_infQuestRows(PERMANENT_QUESTS));
  add('community-quests','Community Quests',_infQuestRows(COMMUNITY_QUESTS));
  add('prestige','Faz-rating Prestige',PRESTIGE_SHOP.map(function(x){var u=_infAnyLookup(x.name);return {n:x.name,img:u.img,rar:u.rarity,m:x.type+' · '+x.cost+' Faz-rating'};}));
  var sh=window._infShared;
  if(sh)INF_SHARED_CATS.forEach(function(p){
    var d=sh[p[0]];if(!d)return;var rows=[];
    for(var n in d){var e=d[n]||{};rows.push(p[0]==='enchants'?{n:n,grad:e.color,img:e.url,m:''}:{n:n,rar:_infNr(e.rarity),img:e.url,m:''});}
    add(p[0],p[1],rows);
  });
  return S;
}
function _infFeedMeta(k,it){
  if(k==='titles'){var c=(it.stops&&it.stops.length)||0;return c?c+' colour'+(c===1?'':'s'):'';}
  if(k==='pets')return it.speed!=null?'Speed '+it.speed:'';
  if(k==='skins')return it.unit?'Unit · '+it.unit:'';
  if(k==='foods')return it.exp!=null?'EXP '+it.exp:'';
  if(k==='materials'||k==='potions')return it.description||it.type||'';
  if(k==='presents'){var r=it.rewards&&it.rewards[0];var b=(String(it.bundle)==='True'||it.bundle===true)?'Bundle · ':'';return b+(r&&r.name?(r.type+' · '+r.name):'');}
  return '';
}
function _infFeedRows(){
  var S=[];
  INF_FEED_CATS.forEach(function(p){
    var k=p[0],data=_infFeedData[k];if(!data)return;
    var cfg=INFO_CFG[k]||{},ov=cfg.overrides||{},hide=cfg.hide||[],addl=cfg.add||{};
    for(var n in data){
      if(hide.indexOf(n)!==-1)continue;
      var it=data[n]||{},o=ov[n]||{};
      if(k==='titles'){S.push({n:o.name||n,c:k,cl:p[1],grad:it.css,rar:'',m:_infFeedMeta(k,it)});continue;}
      S.push({n:o.name||n,c:k,cl:p[1],img:o.image||it.image,rar:_infNr(o.rarity||it.rarity),m:_infFeedMeta(k,it)});
    }
    for(var a in addl)S.push({n:a,c:k,cl:p[1],img:addl[a].image,rar:addl[a].rarity,m:_infFeedMeta(k,addl[a])});
  });
  return S;
}
function _infLoadFeeds(){
  if(_infFeedsLoaded)return Promise.resolve();
  var jobs=INF_FEED_CATS.map(function(p){
    return fetch('/inf-data/'+p[0]).then(function(r){return r.json();}).then(function(d){_infFeedData[p[0]]=d;}).catch(function(){});
  });
  jobs.push(infRotFetch());
  jobs.push(fetch('/inf-data/units').then(function(r){return r.json();}).then(function(d){
    (Array.isArray(d)?d:[]).forEach(function(u){if(u.name)_infUnitMap[u.name.toLowerCase()]={img:u.imgNormal||'',rarity:_infNr(u.rarity)};});
  }).catch(function(){}));
  return Promise.all(jobs).then(function(){_infFeedsLoaded=true;_infIdx=null;});
}
function _infIndex(){if(!_infIdx)_infIdx=_infStaticRows().concat(_infFeedRows()).concat(_infRotRows());return _infIdx;}
function _infMark(name,q){
  var i=name.toLowerCase().indexOf(q);
  if(i===-1)return _infEsc(name);
  return _infEsc(name.slice(0,i))+'<mark>'+_infEsc(name.slice(i,i+q.length))+'</mark>'+_infEsc(name.slice(i+q.length));
}
function _infCard(r,q){
  var rar=String(r.rar||'').toLowerCase();
  var bg=r.grad||(rar?'':'rgba(25,24,40,.9)');
  var badge='<span class="inf-img'+(!r.grad&&rar?' inf-rarity-'+_infEsc(rar):'')+'"'+(bg?' style="background:'+_infEsc(bg)+'"':'')+'>'+(r.img?'<img src="'+_infEsc(r.img)+'" alt="" loading="lazy">':(r.txt?'<span class="inf-btxt">'+_infEsc(r.txt)+'</span>':''))+'</span>';
  return '<div class="inf-card"><div class="inf-hit" data-cat="'+_infEsc(r.c)+'">'+badge+'<div class="inf-hmain"><h4>'+_infMark(r.n,q)+'</h4><div class="inf-hcat">'+_infEsc(r.cl)+'</div></div><span class="inf-hgo">&#8250;</span></div></div>';
}
var INF_CAT_INNER={'stat-chips':'endo-chips','rot-banners':'rot-banners','rot-merchant':'rot-merchant','rot-quests':'rot-quests'};
function infGo(cat){
  infMode(String(cat).indexOf('rot-')===0?'rot':'info');
  var inner=document.getElementById('inf-'+(INF_CAT_INNER[cat]||cat)+'-inner');
  var drop=inner&&inner.closest('.inf-drop');
  var btn=drop&&drop.querySelector('.inf-drop-btn');
  if(!btn)return;
  infSearchClear(false);
  if(!drop.classList.contains('open'))infToggle(btn);
  var panel=document.getElementById('ug-info-panel'),stick=document.querySelector('.inf-topstick');
  function place(smooth){
    var top=drop.offsetTop-((stick&&stick.offsetHeight)||0);if(top<0)top=0;
    if(smooth){try{panel.scrollTo({top:top,behavior:'smooth'});return;}catch(e){}}
    panel.scrollTop=top;
  }
  place(true);
  setTimeout(function(){place(false);},360);
  setTimeout(function(){place(false);},700);
  drop.classList.add('inf-flash');
  setTimeout(function(){drop.classList.remove('inf-flash');},1400);
}
function _infPaint(q){
  var rows=_infIndex(),hits=[],i;
  for(i=0;i<rows.length;i++)if(String(rows[i].n).toLowerCase().indexOf(q)!==-1)hits.push(rows[i]);
  hits.sort(function(a,b){
    var ai=String(a.n).toLowerCase().indexOf(q),bi=String(b.n).toLowerCase().indexOf(q);
    if(ai!==bi)return ai-bi;
    if(a.cl!==b.cl)return a.cl<b.cl?-1:1;
    return String(a.n)<String(b.n)?-1:1;
  });
  var CAP=80,shown=hits.slice(0,CAP),order=[],gm={};
  shown.forEach(function(r){if(!gm[r.cl]){gm[r.cl]=[];order.push(r.cl);}gm[r.cl].push(r);});
  var h='';
  if(!hits.length)h='<div class="inf-rempty">No matches for “'+_infEsc(q)+'”'+(_infFeedsLoaded?'':'<br>Still loading the rest of the guide…')+'</div>';
  else{
    order.forEach(function(g){
      h+='<div class="inf-rgroup">'+_infEsc(g)+' <em>'+gm[g].length+'</em></div><div class="inf-ritems">';
      gm[g].forEach(function(r){h+=_infCard(r,q);});
      h+='</div>';
    });
    if(hits.length>CAP)h+='<div class="inf-rmore">SHOWING '+CAP+' OF '+hits.length+'</div>';
  }
  document.getElementById('inf-results').innerHTML=h;
  var cats=order.length;
  document.getElementById('inf-scount').innerHTML='<span>'+hits.length+' RESULT'+(hits.length===1?'':'S')+'</span><span>'+cats+' CATEGOR'+(cats===1?'Y':'IES')+'</span>';
}
function _infRunSearch(v){
  var q=String(v||'').trim().toLowerCase(),p=document.getElementById('ug-info-panel');
  if(q.length<2){p.classList.remove('searching');document.getElementById('inf-results').innerHTML='';document.getElementById('inf-scount').innerHTML='';return;}
  p.classList.add('searching');
  _infPaint(q);
  if(!_infFeedsLoaded)_infLoadFeeds().then(function(){
    var cur=String((document.getElementById('inf-q')||{}).value||'').trim().toLowerCase();
    if(cur===q)_infPaint(q);
  });
}
function infSearch(v){clearTimeout(_infQTimer);_infQTimer=setTimeout(function(){_infRunSearch(v);},130);}
function infSearchClear(focusIt){var i=document.getElementById('inf-q');if(i){i.value='';if(focusIt)i.focus();else i.blur();}clearTimeout(_infQTimer);_infRunSearch('');}
function infSearchFocus(){var i=document.getElementById('inf-q');if(i&&i.value){i.value='';clearTimeout(_infQTimer);_infRunSearch('');}}
var _infNavLock=0,_infPtr=null;
(function(){
  var rs=document.getElementById('inf-results');if(!rs)return;
  function hit(e){var t=e.target;return t&&t.closest?t.closest('.inf-hit'):null;}
  function go(h){if(!h)return;var c=h.getAttribute('data-cat');if(c){_infNavLock=Date.now();infGo(c);}}
  rs.addEventListener('pointerdown',function(e){var h=hit(e);_infPtr=h?{x:e.clientX,y:e.clientY,t:Date.now(),h:h}:null;},{passive:true});
  rs.addEventListener('pointercancel',function(){_infPtr=null;},{passive:true});
  rs.addEventListener('pointerup',function(e){
    var p=_infPtr;_infPtr=null;
    if(!p||hit(e)!==p.h)return;
    if(Math.abs(e.clientX-p.x)>10||Math.abs(e.clientY-p.y)>10)return;
    if(Date.now()-p.t>900)return;
    e.preventDefault();go(p.h);
  },{passive:false});
  rs.addEventListener('click',function(e){
    if(Date.now()-_infNavLock<800)return;
    go(hit(e));
  });
})();
function ugInfoToggle(){document.getElementById('ug-info-panel').classList.contains('open')?ugInfoClose():ugInfoOpen()}
document.addEventListener('keydown',function(e){if(e.key==='Escape')ugInfoClose()});
(function(){var ip=document.getElementById('ug-info-panel');ip.addEventListener('wheel',function(e){e.stopPropagation();var atT=ip.scrollTop<=0&&e.deltaY<0;var atB=ip.scrollTop+ip.clientHeight>=ip.scrollHeight-1&&e.deltaY>0;if(atT||atB)e.preventDefault();},{passive:false});ip.addEventListener('touchmove',function(e){e.stopPropagation();},{passive:true});})();
(function(){
  fetch('https://raw.githubusercontent.com/FNTDUG/characters.json/main/metas.json')
    .then(function(r){return r.json();})
    .then(function(d){
      var sh=(d&&d.shared)||{};window._infShared=sh;_infIdx=null;
      var DESCS={
        bytes:{
        _top: [
           '[AGONIZATION]<br>● Requiring a Remnanet. This action can give 1 of 4 Agonization States<br>[1] No Change<br>[2] Reroll Stats within the Bytes Stat Range<br>[3] Rerolls Stats and Raise the Bytes Stat Ranges by {1% ~ 30%} e.g. {1% > 1.3%}<br>[4] Rerolls Byte Stats within its Range, add a random Byte Passive, and increases the Passives Range by {-5% ~ 10%} e.g. {1% > 1.1%}'
         ],
         'The Box': '[OBTAINMENT]<br>● 0.05% Drop chance when opening any present<br>[STATS]<br>● COOLDOWN: {+10% ~ -10%}<br>● RANGE: {-20% ~ +20%}<br>● DAMAGE: {-20% ~ +20%}',
         'Boss Drain': '[OBTAINMENT]<br>● Purchasable for 50 Raid Coins the in Boss Raids Shop<br>[STATS]<br>● DAMAGE: {0% ~ +10%}<br>● BOSS DAMAGE: {-20% ~ +25%}',
         'Reaper': '[OBTAINMENT]<br>● 0.01% Drop chance when killing any Enemy<br>[STAT]<br>● CRIT DAMAGE {0% ~ +40%}',
         'KABOOM!': '[OBTAINMENT]<br>● 3% Drop chance after completing any Quest<br>[PASSIVE]<br>● Unit Attack Type Changes to Circle<br>[STATS]<br>● RANGE: {0% ~ +25%}',
         'The Fan': '[OBTAINMENT]<br>● 0.5% Drop chance when selecting a Modifier in Boss Raids<br>[PASSIVE]<br>● Slow based on Bytes Stats<br>[STATS]<br>● CHARGE COOLDOWN: {30s ~ 25s}<br>● SLOW%: {-5% ~ -20%}<br>● SLOW DURATION: {2s ~ 5s}<br>● APPLY DURATION: {3s ~ 8s}',
         'UFO': '[OBTAINMENTS]<br>● 100% Drop chance when winning a minigame<br>● 25% Drop chance when losing a minigame<br>[PASSIVES]<br>● Able to give any single Element Boost<br>● If the Unit and UFO share the same Element, gain a Damage Boost<br>[STATS]<br>● DAMAGE (Same Element): {+2% ~ +10%}<br>● ACTIVE DAMAGE: {+10% ~ +35%}',
         'Pearl': '[OBTAINMENT]<br>● 1% Drop chance when losing a Stock (not Story)<br>[STAT]<br>● INCOME: {-50% ~ +50%}',
         'Neon Bee': '[OBTAINMENT]<br>● 0.05% Drop chance when Summoning<br>[PASSIVE]<br>● {+5%} Damage per unique DoT instance on an Enemy<br>[STATS]<br>● DoT Damage: {+5%}<br>● DoT Duration: {-25 ~ +25%}',
         'Medpod': "[OBTAINMENT]<br>● 0.085% chance per card from Card Packs<br>[PASSIVE]<br>● Reduces enemy regeneration in the equipped unit's range<br>[STATS]<br>● Anti-Regen: {0% ~ -25%}"
        },
        chips:{
         _top: [
           '[OBTAINMENT]<br>● Select a Game, then Night 7, and a difficulty level of 2 or higher. Each rarity of Chip is a ~rare:30%~, ~epic:20%~, ~mythic:20%~, ~secret:15%~, ~nightmare:15%~ drop chance respectively. Whether or not it is Part A or Part B is random',
           '[BASE STATS]<br>● Buff Potency: {+6% ~ +30%}<br>● Follow Up Damage: {+6% ~ +30%}<br>● Damage: {+5% ~ +25%}<br>● Cooldown: {-2.5% ~ -12.5%}<br>● DoT Damage: {+6% ~ +30%}<br>● Crit Chance: {+5% ~ +25%}<br>● Range: {+5% ~ +25%}<br>● Crit Damage: {+8% ~ +40%}',
           '[STAT BONUSES]<br>[Chip Rarity]<br>~nightmare:● Nightmare: +5%~<br>~secret:● Secret: +3.75%~<br>~mythic:● Mythic: +2.5%~<br>~epic:● Epic: +1.25%~<br>[SubStats]<br>● Chips can have {3} or {4 SubStats} when obtained. Chips with {3 SubStats} can be upgraded to have {4 SubStats}, at the cost of Tokens by the Workshop entrance. Chips with {4 SubStats} gain a {20% Buff}<br>{3 SubStats Range}<br>● Buff Potency: {+2% ~ +10%}<br>● Follow Up Damage: {+2.5% ~ +12.5%}<br>● Damage: {+2% ~ +10%}<br>● Cooldown: {-1% ~ -5%}<br>● DoT Damage: {+2% ~ +10%}<br>● Crit Chance: {+1.5% ~ +7.5%}<br>● Range: {+2% ~ +10%}<br>● Crit Damage: {+3% ~ +15%}'
         ],
         'Overwhelming Power': '[OBTAINMENT]<br>● Game 1<br>[SYNERGY BOOST]<br>● {+15%} Damage<br>[SYNERGY PASSIVE]<br>● Buff Damage by {+0.5%} per enemy in Range ({+5%} cap)',
         'Rapid Strikes': '[OBTAINMENT]<br>● Game 3<br>[SYNERGY BOOSTS]<br>● {-5%} Cooldown<br>● {+25%} Follow Up Damage<br>[SYNERGY PASSIVE]<br>● Enemies hit by Follow Ups take {+15%} Damage from this Unit for 3s',
         'Crowd Culler': '[OBTAINMENT]<br>● Game 5<br>[SYNERGY PASSIVE]<br>● Buff Damage by {+5%} for each enemy in Range (cap of {+25%})',
         'Weak Point': '[OBTAINMENT]<br>● Game 2<br>[SYNERGY BOOSTS]<br>● {+15%} Crit Rate<br>● {+30%} Crit Damage',
         'Eye Augmentation': '[OBTAINMENT]<br>● Game 4<br>[SYNERGY BOOSTS]<br>● {+15%} Range<br>● {+10%} Damage',
         'Blazing Fire': '[OBTAINMENT]<br>● Game 6<br>[SYNERGY BOOST]<br>● {+20%} DoT Damage<br>[SYNERGY PASSIVE]<br>● When applying Burn to an enemy for the first time, Buff this Units Damage by {20%} for 10s (does not stack)',
         'Serrated Edge': '[OBTAINMENT]<br>● Game 7<br>[SYNERGY BOOST]<br>● {+30%} Bleed Damage<br>[SYNERGY PASSIVE]<br>● When applying Bleed, gain {+5%} Damage and {+15%} Range for 10s (does not stack)'
        },
        enchants:{
         'Damage': '[OBTAINMENT]<br>● 25.8% from Enchanting<br>[BOOST]<br>● {+15%} Damage',
         'Range': '[OBTAINMENT]<br>● 25.8% from Enchanting<br>[BOOST]<br>● {+15%} Range',
         'Speed': '[OBTAINMENT]<br>● 25.8% from Enchanting<br>[BOOST]<br>● {-12.5%} Cooldown',
         'Engineer': '[OBTAINMENT]<br>● 12% from Enchanting<br>[BOOST]<br>● {+50%} Unit EXP',
         'Puppets Nightmare': '[OBTAINMENT]<br>● 10% from Enchanting<br>[BOOST]<br>● {+25%} Range',
         'Investor': '[OBTAINMENT]<br>● 2% from Enchanting<br>[BOOSTS]<br>● {+25%} Income<br>● {-10%} Cost',
         'Haywire': '[OBTAINMENT]<br>● 1.5% from Enchanting<br>[BOOST]<br>● {-25%} Cooldown',
         'Phantom': '[OBTAINMENT]<br>● 0.5% from Enchanting<br>[PITY]<br>● 300<br>[BOOSTS]<br>● {+10%} Damage<br>● {-12%} Cooldown<br>● {+35%} Range',
         'Blighted': '[OBTAINMENT]<br>● 0.25% from Enchanting<br>[PITY]<br>● 900<br>[BOOSTS]<br>● {+12.5%} Damage<br>● {-25%} Cooldown<br>● {+5%} Range',
         'Shadow': '[OBTAINMENT]<br>● 0.1% from Enchanting<br>[PITY]<br>● 1500<br>[BOOSTS]<br>● {+50%} Damage<br>● {-12.5%} Cooldown',
         'Scooped': '[OBTAINMENT]<br>● 0.05% from Enchanting<br>[PITY]<br>● 2500<br>[BOOSTS]<br>● {+50%} Crit Damage<br>● {+50%} Crit Chance',
         'Springlocked': '[OBTAINMENT]<br>● 0.04% from Enchanting<br>[PITY]<br>● 3000<br>[BOOSTS]<br>● {+80%} Damage<br>● {+10%} Range<br>● {+30%} True Damage<br>● {+10%} Cooldown',
         'Vengeance': '[OBTAINMENT]<br>● 0.02% from Enchanting<br>[PITY]<br>● 6000<br>[BOOSTS]<br>● {+90%} Damage<br>● {+15%} Range<br>● {-5%} Cooldown',
         'Hijacked': '[OBTAINMENT]<br>● 0.004% from Enchanting<br>[PITY]<br>● 30000<br>[BOOSTS]<br>● {+120%} Damage<br>● {+5%} Range<br>● {-7.5%} Cooldown<br>[PASSIVE]<br>● Locks Units placements to 1, in return gain {+180%} Damage per placement lost',
         'Champion': '[OBTAINMENT]<br>● Exclusive<br>[BOOSTS]<br>● {+75%} Damage<br>● {+20%} Range<br>● {-12%} Cooldown',
         'Prototype': '[OBTAINMENT]<br>● Exclusive<br>[BOOSTS]<br>● {+100%} Damage<br>● {+20%} True Damage<br>● {+10%} Range<br>● {-12%} Cooldown',
         'Thespian': '[OBTAINMENT]<br>● Exclusive<br>[BOOSTS]<br>● {+100%} Damage<br>● {+20%} True Damage<br>● {+10%} Range<br>● {-12%} Cooldown'
        }
      };
      var RAR_GRAD={nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))',shiny:'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'};
      function hl(t){return t.replace(/\\[([^\\]]*)\\]/g,'<span style="color:#ffa45b;font-weight:600;font-size:1.01em;font-family:Audiowide,sans-serif">$1</span>').replace(/\\{([^\\}]*)\\}/g,'<strong style="color:#e8e8e8">$1</strong>').replace(/~([a-z]+):([^~]*)~/g,function(_,rar,txt){var g=RAR_GRAD[rar];return g?'<span style="background:'+g+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600">'+txt+'</span>':txt;});}
      function textCard(desc){var c=document.createElement('div');c.className='inf-card';var p=document.createElement('p');p.innerHTML=hl(desc);c.appendChild(p);return c;}
      function card(name,imgUrl,rarCls,borderBg,desc,imgUrl2){
        var c=document.createElement('div');c.className='inf-card';
        var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
        function mkBadge(src,alt){
          var b=document.createElement('span');b.className='inf-img'+(rarCls?' inf-rarity-'+rarCls:'');
          if(borderBg)b.style.background=borderBg;
          var i=document.createElement('img');i.src=src||'';i.alt=alt;b.appendChild(i);
          return b;
        }
        var badge=mkBadge(imgUrl,name);
        var h4=document.createElement('h4');h4.style.margin='0';h4.textContent=name;
        if(imgUrl2){
          // Two-part item (chips drop as Part A or Part B): show both side by
          // side, same grouping the Hero/Shop Quest cards use for unit+present.
          badge.style.margin='0';
          var badge2=mkBadge(imgUrl2,name+' Part B');badge2.style.margin='0';
          var badges=document.createElement('div');
          badges.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0';
          badges.appendChild(badge);badges.appendChild(badge2);
          h4.style.flex='1';
          row.appendChild(badges);
        }else{
          row.appendChild(badge);
        }
        row.appendChild(h4);c.appendChild(row);
        var p=document.createElement('p');if(desc)p.innerHTML=hl(desc);c.appendChild(p);
        return c;
      }
      // Chips drop as Part A or Part B; the shared feed only carries Part A, so
      // the B renders are listed here and shown as a second badge.
      var CHIP_PART_B={
        'Blazing Fire':'https://images.fntduserguide.com/blazing%20fire%20B.png',
        'Crowd Culler':'https://images.fntduserguide.com/crowd%20culler%20B.png',
        'Eye Augmentation':'https://images.fntduserguide.com/eye%20B.png',
        'Overwhelming Power':'https://images.fntduserguide.com/overwhemling%20B.png',
        'Rapid Strikes':'https://images.fntduserguide.com/rapid%20B.png',
        'Serrated Edge':'https://images.fntduserguide.com/serrated%20edge%20B.png',
        'Weak Point':'https://images.fntduserguide.com/weak%20point%20B.png'
      };
      var RAR_ORDER=['hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
      function rarRank(r){var i=RAR_ORDER.indexOf((r||'').toLowerCase());return i===-1?RAR_ORDER.length:i;}
      function sorted(obj,getRar){return Object.keys(obj).sort(function(a,b){var rd=rarRank(getRar(obj[a]))-rarRank(getRar(obj[b]));return rd!==0?rd:a.localeCompare(b);});}
      function addTops(el,tops){if(!tops)return;(Array.isArray(tops)?tops:[tops]).forEach(function(t){el.appendChild(textCard(t));});}
      var bEl=document.getElementById('inf-bytes-inner');
      if(bEl){addTops(bEl,DESCS.bytes._top);if(sh.bytes)sorted(sh.bytes,function(v){return v.rarity;}).forEach(function(n){var b=sh.bytes[n];bEl.appendChild(card(n,b.url,b.rarity,null,(DESCS.bytes[n]||'')));});}
      var cEl=document.getElementById('inf-chips-inner');
      if(cEl){addTops(cEl,DESCS.chips._top);if(sh.chips)sorted(sh.chips,function(v){return v.rarity;}).forEach(function(n){var c=sh.chips[n];cEl.appendChild(card(n,c.url,c.rarity,null,(DESCS.chips[n]||''),CHIP_PART_B[n]));});}
      var eEl=document.getElementById('inf-enchants-inner');
      if(eEl&&sh.enchants){addTops(eEl,DESCS.enchants._top);var _eSeen={};Object.keys(DESCS.enchants).forEach(function(n){if(n==='_top')return;if(sh.enchants[n]){_eSeen[n]=1;var e=sh.enchants[n];eEl.appendChild(card(n,e.url,null,e.color,(DESCS.enchants[n]||'')));}});Object.keys(sh.enchants).sort(function(a,b){return a.localeCompare(b);}).forEach(function(n){if(!_eSeen[n]){var e=sh.enchants[n];eEl.appendChild(card(n,e.url,null,e.color,''));}});}
    })
    .catch(function(){});
})();
<\/script>`;


// ── Work In Progress notice ─────────────────────────────────────────────
// Flip a page to true to show the notice on it. That is the only edit needed;
// the overlay is injected by the worker, so the page files stay untouched.
const WIP_PAGES = {
  '/fntd2/tierlists-1':         true,
  '/fntd2/meta-teams':          true,
  '/fntd2/story-index':         true,
  '/fntd2/endless-index':       true,
  '/fntd2/boss-raids-index':    true,
  '/fntd2/event-story-endless': true,
  '/fntd2/unit-engine':         true,
  '/news':                      false
};
// Requests arrive as clean URLs, but tolerate a .html suffix or trailing slash
// so the flag still applies if a page is reached that way.
function infoPanelActive(pathname) {
  const p = pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  return p === '/fntd2' || p.indexOf('/fntd2/') === 0;
}
function wipActive(pathname) {
  let p = String(pathname || '').replace(/\.html$/, '').replace(/\/+$/, '');
  if (p === '') p = '/';
  if (WIP_PAGES[p] === true) return true;
  // Deep links (/fntd2/tierlists-1/Golden-Freddy) are served the base page, so
  // they need the notice too when that page is flagged.
  for (const base in WIP_PAGES) {
    if (WIP_PAGES[base] === true && p.indexOf(base + '/') === 0) return true;
  }
  return false;
}
const WIP_HTML = `
<style>
.wip-veil{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(4,3,10,.82);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.wip-panel{position:relative;width:min(520px,100%);border-radius:16px;overflow:hidden;background:linear-gradient(135deg,rgba(58,10,56,.96),rgba(18,3,38,.96));border:1px solid rgba(255,164,91,.45);box-shadow:0 18px 60px rgba(0,0,0,.75);animation:wipIn .22s ease-out}
@keyframes wipIn{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
/* A horizontal shift advances a diagonal gradient by dx*sin(angle), so the travel
   distance and the stop period must agree or the loop jumps. At 45deg a 40px shift
   advances the pattern by 40*sin(45)=28.284px. No background-size: scaling a
   repeating gradient changes its period and breaks that again. */
.wip-stripe{height:5px;opacity:.85;background-image:repeating-linear-gradient(45deg,#ffa45b 0 14.142px,#3a2410 14.142px 28.284px);animation:wipSlide 1.1s linear infinite}
@keyframes wipSlide{from{background-position:0 0}to{background-position:40px 0}}
@media (prefers-reduced-motion:reduce){.wip-stripe{animation:none}}
.wip-body{padding:26px 26px 22px;text-align:center}
.wip-kicker{font-family:'Press Start 2P',monospace;font-size:11px;line-height:1.7;color:#ffa45b;letter-spacing:.5px;text-shadow:0 0 14px rgba(255,164,91,.35);margin-bottom:14px}
.wip-msg{font-size:14.5px;line-height:1.75;color:#e6e2ef;max-width:40ch;margin:0 auto}
.wip-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;padding:18px 26px 24px}
.wip-btn{font-family:'Audiowide',sans-serif;font-size:12px;letter-spacing:.6px;padding:12px 22px;border-radius:9px;cursor:pointer;transition:background .14s,border-color .14s,color .14s,transform .1s;border:1px solid rgba(255,164,91,.45);background:rgba(255,164,91,.07);color:#ffa45b}
.wip-btn:hover{background:rgba(255,164,91,.16);border-color:#ffa45b}
.wip-btn:active{transform:translateY(1px)}
.wip-btn.secondary{border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.62);background:rgba(255,255,255,.04)}
.wip-btn.secondary:hover{color:#fff;border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.08)}
.wip-btn:focus-visible{outline:2px solid #ffa45b;outline-offset:2px}
@media (max-width:520px){.wip-kicker{font-size:9px}.wip-msg{font-size:13.5px}.wip-btn{width:100%}}
</style>
<div class="wip-veil" id="wipVeil" role="dialog" aria-modal="true" aria-labelledby="wipKicker" aria-describedby="wipMsg">
  <div class="wip-panel">
    <div class="wip-stripe" aria-hidden="true"></div>
    <div class="wip-body">
      <div class="wip-kicker" id="wipKicker">WORK IN PROGRESS</div>
      <p class="wip-msg" id="wipMsg">This page is currently a Work In Progress from the last update. Our team is working on updating it ASAP!</p>
    </div>
    <div class="wip-actions">
      <button class="wip-btn" id="wipContinue" type="button">Continue</button>
      <button class="wip-btn secondary" id="wipBack" type="button">Back</button>
    </div>
  </div>
</div>
<script>
(function(){
  var veil=document.getElementById('wipVeil');
  if(!veil)return;
  var prevOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  function dismiss(){
    if(veil.parentNode)veil.parentNode.removeChild(veil);
    document.body.style.overflow=prevOverflow;
    document.removeEventListener('keydown',onKey);
  }
  function onKey(e){ if(e.key==='Escape')dismiss(); }
  // Continue lets them read the page anyway; Escape does the same, being the
  // non-destructive choice.
  document.getElementById('wipContinue').addEventListener('click',dismiss);
  document.addEventListener('keydown',onKey);
  // Back returns where they came from, or the section index if opened directly.
  document.getElementById('wipBack').addEventListener('click',function(){
    if(document.referrer&&history.length>1)history.back();
    else window.location.href='/fntd2';
  });
  document.getElementById('wipContinue').focus();
})();
<\/script>`;

// ── GitHub outage notice ────────────────────────────────────────────────
// Every content page pulls its data at runtime from GitHub: raw.githubusercontent
// for units/metas/patch notes, githack for the Unit Engine and Trade Calculator
// fragments. When GitHub breaks those requests fail and the page renders empty,
// so this explains why instead of leaving a bare "Failed to load" line.
//
// Deliberately hard to trigger — three things must ALL hold:
//   1. a real request to a GitHub host failed on this page,
//   2. this site's own origin is still reachable (so it is not the visitor's
//      connection), and
//   3. /gh-health, checked from the edge, agrees GitHub is unhealthy.
// A visitor whose page loaded fine can never see it. A visitor who is simply
// offline fails step 2, so it stays silent rather than blaming GitHub.
//
// Same panel as the WIP notice; only the wording and buttons differ.
const OUTAGE_HTML = `
<style>
.gho-veil{position:fixed;inset:0;z-index:9001;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(4,3,10,.82);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.gho-veil[hidden]{display:none}
.gho-panel{position:relative;width:min(520px,100%);border-radius:16px;overflow:hidden;background:linear-gradient(135deg,rgba(58,10,56,.96),rgba(18,3,38,.96));border:1px solid rgba(255,164,91,.45);box-shadow:0 18px 60px rgba(0,0,0,.75);animation:ghoIn .22s ease-out}
@keyframes ghoIn{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
/* Same 45deg stripe geometry as the WIP notice: a 40px shift advances the
   pattern by 40*sin(45)=28.284px, so the travel and the stop period must agree
   or the loop visibly jumps. */
.gho-stripe{height:5px;opacity:.85;background-image:repeating-linear-gradient(45deg,#ffa45b 0 14.142px,#3a2410 14.142px 28.284px);animation:ghoSlide 1.1s linear infinite}
@keyframes ghoSlide{from{background-position:0 0}to{background-position:40px 0}}
@media (prefers-reduced-motion:reduce){.gho-stripe{animation:none}}
.gho-body{padding:26px 26px 22px;text-align:center}
.gho-kicker{font-family:'Press Start 2P',monospace;font-size:11px;line-height:1.7;color:#ffa45b;letter-spacing:.5px;text-shadow:0 0 14px rgba(255,164,91,.35);margin-bottom:14px}
.gho-msg{font-size:14.5px;line-height:1.75;color:#e6e2ef;max-width:40ch;margin:0 auto}
.gho-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;padding:18px 26px 24px}
.gho-btn{font-family:'Audiowide',sans-serif;font-size:12px;letter-spacing:.6px;padding:12px 22px;border-radius:9px;cursor:pointer;transition:background .14s,border-color .14s,color .14s,transform .1s;border:1px solid rgba(255,164,91,.45);background:rgba(255,164,91,.07);color:#ffa45b}
.gho-btn:hover{background:rgba(255,164,91,.16);border-color:#ffa45b}
.gho-btn:active{transform:translateY(1px)}
.gho-btn.secondary{border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.62);background:rgba(255,255,255,.04)}
.gho-btn.secondary:hover{color:#fff;border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.08)}
.gho-btn:focus-visible{outline:2px solid #ffa45b;outline-offset:2px}
@media (max-width:520px){.gho-kicker{font-size:9px}.gho-msg{font-size:13.5px}.gho-btn{width:100%}}
</style>
<div class="gho-veil" id="ghoVeil" hidden role="dialog" aria-modal="true" aria-labelledby="ghoKicker" aria-describedby="ghoMsg">
  <div class="gho-panel">
    <div class="gho-stripe" aria-hidden="true"></div>
    <div class="gho-body">
      <div class="gho-kicker" id="ghoKicker">GITHUB IS DOWN</div>
      <p class="gho-msg" id="ghoMsg">This site loads its unit data, TierLists and Patch Notes from GitHub, which is currently having an outage. Those sections will fill back in on their own once GitHub recovers.</p>
    </div>
    <div class="gho-actions">
      <button class="gho-btn" id="ghoRetry" type="button">Try Again</button>
      <button class="gho-btn secondary" id="ghoDismiss" type="button">Continue</button>
    </div>
  </div>
</div>`;

const OUTAGE_SCRIPT = `<script>
(function(){
  var HOSTS={'raw.githubusercontent.com':1,'raw.githack.com':1,'rawcdn.githack.com':1,'cdn.jsdelivr.net':1,'api.github.com':1};
  function isGH(u){ try{ return HOSTS[new URL(u,location.href).hostname]===1; }catch(e){ return false; } }

  var fired=false,pending=false,timer=null;

  // One dropped request on mobile looks exactly like the first second of an
  // outage, so a failure only opens an investigation — the authoritative retry
  // happens edge-side inside /gh-health.
  function suspect(){
    if(fired||pending||timer)return;
    timer=setTimeout(function(){ timer=null; diagnose(); },1200);
  }

  function diagnose(){
    if(fired||pending)return;
    pending=true;
    // Step 1: our own origin. If that is unreachable the visitor is offline or
    // we are down; either way it is not GitHub, so say nothing at all.
    fetch('/_up',{cache:'no-store'})
      .then(function(r){ if(!r.ok)throw new Error('origin'); return fetch('/gh-health',{cache:'no-store'}); })
      .then(function(r){ return r.json(); })
      .then(function(j){ if(j&&j.ok===false){ show(); } else { pending=false; } })
      .catch(function(){ pending=false; });
  }

  function show(){
    if(fired)return;
    var veil=document.getElementById('ghoVeil');
    if(!veil)return;
    fired=true;
    veil.hidden=false;
    var prev=document.body.style.overflow;
    document.body.style.overflow='hidden';
    function dismiss(){
      veil.hidden=true;
      document.body.style.overflow=prev;
      document.removeEventListener('keydown',onKey);
    }
    function onKey(e){ if(e.key==='Escape')dismiss(); }
    document.addEventListener('keydown',onKey);
    document.getElementById('ghoDismiss').addEventListener('click',dismiss);
    document.getElementById('ghoRetry').addEventListener('click',function(){ location.reload(); });
    document.getElementById('ghoRetry').focus();
  }

  // Observe fetch without changing it: the caller still receives the original
  // promise, and our listener settles on its own branch.
  var _fetch=window.fetch;
  if(_fetch){
    window.fetch=function(input){
      var u=(typeof input==='string')?input:(input&&input.url);
      var p=_fetch.apply(this,arguments);
      if(u&&isGH(u)) p.then(function(r){ if(!r.ok)suspect(); },function(){ suspect(); });
      return p;
    };
  }

  // tierlist.js and metas.html use XHR rather than fetch.
  var _open=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(m,u){ this._ghoUrl=u; return _open.apply(this,arguments); };
  var _send=XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send=function(){
    var x=this;
    if(x._ghoUrl&&isGH(x._ghoUrl)){
      x.addEventListener('error',suspect);
      x.addEventListener('load',function(){ if(x.status>=400)suspect(); });
    }
    return _send.apply(this,arguments);
  };

  // <script src="...githack..."> failures surface as resource errors, not through
  // fetch or XHR, and only in the capture phase.
  window.addEventListener('error',function(e){
    var t=e&&e.target;
    if(!t||t===window)return;
    var u=t.src||t.href;
    if(u&&(t.tagName==='SCRIPT'||t.tagName==='LINK')&&isGH(u)) suspect();
  },true);
})();
<\/script>`;

// Reward tooltip, shared by any page with reward tiles (Challenges today, the
// nights rewards UI next). It reuses the #metaTip element and .mt-* styling the
// metas engine already puts on the page, so a reward hover and a unit hover are
// the same object rather than two that drift apart. On a page where metas has
// not loaded there is no #metaTip, and this quietly does nothing.
//
// Mark a tile with the reward as JSON and it gets the hover:
//   el.setAttribute('data-rwtip', JSON.stringify({name, qty, rarity, icon, label, note}))
//   label titles the amount row ("Amount" unless given); note adds a second line
//   under it, for a drop that has odds as well as an amount. Both optional.
//   el.setAttribute('data-rwtip-tap', '')   // optional, see below
//
// Delegated from document rather than bound per tile, because this script is
// appended to the end of <body> and pages build their tiles during parse — a
// bound helper would not exist yet for anything rendered up front.
//
// tap is opt-in. It listens in the capture phase so it can swallow the event
// before a card's own handler sees it, which is right for a tile sitting loose
// in a popup but wrong for one inside a clickable card, where it would stop the
// card opening. Hover needs no such care and is always on.
const REWARD_TIP = `<script>
(function(){
  // lets a page tell whether the worker is in the loop, so a file opened
  // directly can install its own copy without doubling up when deployed
  window.__ugRewardTip=1;
  var RG={uncommon:'linear-gradient(90deg,#5CFF4D,#3FFF8F)',rare:'linear-gradient(90deg,#58A6FF,#1C3AA0)',
    epic:'linear-gradient(90deg,#FF35FF,#87009F)',mythic:'linear-gradient(90deg,#FFB81F,#FFFF00)',
    secret:'linear-gradient(90deg,#FF8800,#FF0C0C)',nightmare:'linear-gradient(90deg,#492590,#2A1E42)',
    apex:'linear-gradient(90deg,#9D0078,#0063F8)',hero:'linear-gradient(90deg,#FFCD19,#353815,#FFFB85)',
    exclusive:'linear-gradient(90deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',
    radiant:'linear-gradient(90deg,#FF6600,#FFCC33)'};
  function els(){var t=document.getElementById('metaTip'),i=document.getElementById('metaTipInner');return t&&i?[t,i]:null;}
  function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):'';}
  function row(){var d=document.createElement('div');d.className='mt-row';return d;}
  function text(s){var d=document.createElement('div');d.className='mt-text';d.textContent=s;return d;}
  function show(el,cfg){
    var e=els();if(!e)return;
    var tip=e[0],inner=e[1],rar=(cfg.rarity||'').toLowerCase(),bg=RG[rar]||'#888888';
    tip.style.background=bg;tip.style.backgroundSize='';tip.style.animation='';
    inner.innerHTML='';
    var n=document.createElement('span');n.className='mt-name';n.textContent=cfg.name||'';inner.appendChild(n);
    var sep=document.createElement('hr');sep.className='mt-sep';inner.appendChild(sep);
    var r1=row();
    if(cfg.icon){
      var ic=document.createElement('div');ic.className='mt-icon';ic.style.background=bg;
      var inn=document.createElement('div');inn.className='mt-icon-in';
      var im=document.createElement('img');im.src=cfg.icon;im.alt='';
      im.style.cssText='width:100%;height:100%;object-fit:contain;display:block;margin:0;max-width:none';
      inn.appendChild(im);ic.appendChild(inn);r1.appendChild(ic);
    }
    // label defaults to Amount; a drop chance rather than a quantity passes its own
    if(cfg.qty)r1.appendChild(text((cfg.label||'Amount')+': '+cfg.qty));
    inner.appendChild(r1);
    // optional second line, for a drop that has odds as well as an amount
    if(cfg.note){var rn=row();rn.appendChild(text(cfg.note));inner.appendChild(rn);}
    if(rar){var r2=row();r2.appendChild(text('Rarity: '+cap(rar)));inner.appendChild(r2);}
    // Same placement the metas engine uses: under the tile, flipped above when
    // it would run off the bottom, clamped to the viewport either way.
    tip.style.display='block';tip.style.opacity='0';
    var r=el.getBoundingClientRect(),tw=tip.offsetWidth,th=tip.offsetHeight;
    var left=Math.max(4,Math.min(r.left+r.width/2-tw/2,window.innerWidth-tw-4));
    var top=r.bottom+6;
    if(top+th>window.innerHeight-4)top=r.top-th-6;
    tip.style.left=left+'px';tip.style.top=top+'px';tip.style.opacity='1';
  }
  function hide(){var e=els();if(e){e[0].style.opacity='0';e[0].style.display='none';}}
  var cur=null;
  function tile(n){return n&&n.closest?n.closest('[data-rwtip]'):null;}
  function cfgOf(el){try{return JSON.parse(el.getAttribute('data-rwtip'));}catch(e){return null;}}
  function open(el){var c=cfgOf(el);if(c){cur=el;show(el,c);}}
  document.addEventListener('mouseover',function(ev){
    var t=tile(ev.target);
    if(t&&t!==cur)open(t);
  });
  document.addEventListener('mouseout',function(ev){
    if(!cur)return;
    // ignore the moves between a tile's own children
    if(ev.relatedTarget&&cur.contains(ev.relatedTarget))return;
    cur=null;hide();
  });
  document.addEventListener('click',function(ev){
    var t=tile(ev.target);
    if(t&&t.hasAttribute('data-rwtip-tap')){ev.stopPropagation();open(t);return;}
    cur=null;hide();
  },true);
  window.addEventListener('scroll',function(){cur=null;hide();},{passive:true});
  window.addEventListener('resize',function(){cur=null;hide();},{passive:true});
})();
<\/script>`;

const ACTIVE_SCRIPT = `<script>
(function(){
  var p = window.location.pathname.replace(/[/]+$/, '') || '/';
  // Score a nav href against the current path: exact match wins, otherwise
  // the longest href the path sits under (so deep links like
  // /fntd2/unit-engine/Golden-Freddy still highlight /fntd2/unit-engine).
  function score(href){
    if(!href) return -1;
    if(href === p) return href.length + 1;
    if(href !== '/' && p.indexOf(href + '/') === 0) return href.length;
    return -1;
  }
  function markBest(sel, onMatch){
    var best = null, bestScore = -1;
    document.querySelectorAll(sel).forEach(function(el){
      var s = score(el.getAttribute('data-nav-href'));
      if(s > bestScore){ bestScore = s; best = el; }
    });
    if(best){ best.classList.add('active'); if(onMatch) onMatch(best); }
  }
  markBest('#ug-topnav [data-nav-href]');
  markBest('#ug-mobile-nav [data-nav-href]', function(el){
    var sec = el.closest('.ug-mn-section');
    if(sec){
      sec.classList.add('open');
      var btn = sec.querySelector('.ug-mn-section-btn');
      if(btn && typeof ugMnSpinStart === 'function') ugMnSpinStart(btn);
    }
  });
})();
(function(){
  var bs=document.querySelectorAll('.ug-status-badge[data-gh-file]');
  if(!bs.length)return;
  var TTL=1800000; // re-check GitHub at most every 30 min — protects the 60/hr API limit
  bs.forEach(function(b){
    var file=b.getAttribute('data-gh-file');
    var repo=b.getAttribute('data-gh-repo')||'FNTDUG/Pages';
    var suffix=b.textContent.trim();
    var key='ugh:'+repo+':'+file;
    function show(s){b.textContent='Last updated - '+s+(suffix?' '+suffix:'');}
    var cached=null;
    try{cached=JSON.parse(sessionStorage.getItem(key)||'null');}catch(e){}
    if(cached&&cached.d){show(cached.d);if(Date.now()-(cached.t||0)<TTL)return;} // show cached, revalidate if stale
    fetch('https://api.github.com/repos/'+repo+'/commits?path='+encodeURIComponent(file)+'&per_page=1')
      .then(function(r){return r.json();})
      .then(function(d){
        if(!d||!d[0])return;
        var dt=new Date(d[0].commit.committer.date);
        var s=(dt.getMonth()+1)+'/'+dt.getDate()+'/'+String(dt.getFullYear()).slice(2);
        try{sessionStorage.setItem(key,JSON.stringify({d:s,t:Date.now()}));}catch(e){}
        show(s);
      })
      .catch(function(){});
  });
})();
<\/script>`;

// Injected into <head> on EVERY HTML page. This single tag is what delivers the
// Google consent message (CMP) — pages without it are counted as uncovered page
// views in AdSense "Privacy & messaging", which is what tanks the coverage stat.
// It only LOADS AdSense; ads render where a page has an <ins class="adsbygoogle">
// slot (or via Auto ads). Do not re-add this tag per-page — a second copy on the
// same page can make the consent message misfire.
// Home-screen icons. iOS reads the apple-touch-icon tag and nothing else; Android
// reads the manifest. Injected here rather than per page so all 30 stay in step, and
// apple-mobile-web-app-title is what stops iOS labelling the icon with a page title
// like "Unit Engine / FNTD2 | FNTD Userguide".
const HOME_ICONS =
  '<link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png">' +
  '<link rel="manifest" href="/site.webmanifest">' +
  '<meta name="apple-mobile-web-app-title" content="FNTD Guide">' +
  '<meta name="theme-color" content="#681f62">';

// GA4. Injected here rather than per page so every page is counted, including any
// added later — and so the property can be swapped in one place when the time comes
// to hand traffic figures to an ad network.
const ANALYTICS =
  '<script async src="https://www.googletagmanager.com/gtag/js?id=G-VSK54B7T1G"><\/script>' +
  '<script>' +
  'window.dataLayer = window.dataLayer || [];' +
  'function gtag(){dataLayer.push(arguments);}' +
  "gtag('js', new Date());" +
  "gtag('config', 'G-VSK54B7T1G');" +
  '<\/script>';

const ADSENSE_LOADER =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7017245771068026" crossorigin="anonymous"><\/script>';

// Universe ids allowed through /game-thumb/, so the route cannot be used as an
// open proxy for arbitrary Roblox assets. Same ids the home page stats use.
const GAME_UNIVERSES = ['5479908441', '7934320560', '8202280624'];

// Items the game has but the wiki feed does not carry. Merged into their feed on
// the way through the proxy, so every consumer sees them from one definition:
// the INFO panel's own tab, present rewards, evolution ingredients, prestige and
// anything added later. Kept here rather than hand-edited into the R2 bucket so
// they are version controlled and the pipeline worker cannot overwrite them.
//
// A real feed entry always wins, so each of these retires itself automatically
// the day the wiki starts carrying it.
//
// These two are currencies rather than true materials, and the presents feed
// types them "Currency". They live in materials so they stay browsable in that
// tab; the Presents tab still labels them Currency, because that label comes
// from the reward's own type and not from this lookup.
const EXTRA_ITEMS = {
  materials: {
    'Tokens': { rarity: 'mythic',    image: 'https://images.fntduserguide.com/coins.webp' },
    'Souls':  { rarity: 'nightmare', image: 'https://items.fntduserguide.com/materials/soul.png' }
  }
};

const INF_PROXY = {
  'presents':        'https://presents.fntduserguide.com/fntd2-presents.json',
  'units':           'https://raw.githubusercontent.com/FNTDUG/characters.json/main/json',
  'skins':           'https://cosmetics.fntduserguide.com/skins.json',
  'pets':            'https://cosmetics.fntduserguide.com/pets.json',
  'banners':         'https://cosmetics.fntduserguide.com/banners.json',
  'loading-screens': 'https://cosmetics.fntduserguide.com/loading-screens.json',
  'materials':       'https://items.fntduserguide.com/materials.json',
  'titles':          'https://cosmetics.fntduserguide.com/titles.json',
  'foods':           'https://items.fntduserguide.com/foods.json',
  'potions':         'https://items.fntduserguide.com/potions.json'
};

// Ground truth for the outage notice: the file the site actually needs, read
// from a Cloudflare datacenter. That vantage point is what separates "GitHub is
// down for everyone" from "this one visitor cannot reach GitHub" (ISP block,
// browser extension, school wifi).
// Live rotations. The upstream is the fntd2.com rotations worker; its owner gave
// FNTD User Guide permission to read it directly (2026-09-07) but could not issue a
// token, because the same worker fronts other parts of their site. It gates on
// Origin/Referer, so we present fntd2.com's and identify ourselves in the UA so the
// traffic is attributable to us rather than anonymous.
const ROT_UPSTREAM = 'https://tight-forest-7fdc.eyesofheavenjojo1234.workers.dev/';
const ROT_UA = 'fntduserguide.com rotations proxy (+https://www.fntduserguide.com)';

const X_SYNDICATION = 'https://syndication.twitter.com/srv/timeline-profile/screen-name/';
const X_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
function xEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function xUser(u) {
  if (!u) return null;
  return {
    name: u.name || '',
    handle: u.screen_name || '',
    avatar: (u.profile_image_url_https || '').replace('_normal.', '_200x200.'),
    banner: u.profile_banner_url ? u.profile_banner_url + '/1500x500' : '',
    followers: typeof u.followers_count === 'number' ? u.followers_count : null
  };
}
function xText(t) {
  let text = (t.full_text || t.text || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const ent = t.entities || {};
  const media = ent.media || [];
  const urls = ent.urls || [];
  const range = t.display_text_range;
  if (Array.isArray(range) && range.length === 2) text = Array.from(text).slice(range[0], range[1]).join('');
  media.forEach(m => { if (m.url) text = text.replace(m.url, ''); });
  let html = xEsc(text.trim());
  urls.forEach(u => {
    if (!u.url) return;
    html = html.split(xEsc(u.url)).join('<a href="' + xEsc(u.expanded_url || u.url) + '" target="_blank" rel="noopener noreferrer">' + xEsc(u.display_url || u.expanded_url || u.url) + '</a>');
  });
  html = html
    .replace(/(^|[^\w/])@([A-Za-z0-9_]{1,15})\b/g, '$1<a href="https://x.com/$2" target="_blank" rel="noopener noreferrer">@$2</a>')
    .replace(/(^|\s)#([\p{L}\p{N}_]+)/gu, '$1<a href="https://x.com/hashtag/$2" target="_blank" rel="noopener noreferrer">#$2</a>')
    .replace(/\n/g, '<br>');
  return { text: text.trim(), html };
}
function xMedia(t) {
  const list = ((t.extended_entities && t.extended_entities.media) || (t.entities && t.entities.media) || []);
  return list.map(m => {
    const out = { type: m.type === 'animated_gif' ? 'video' : (m.type || 'photo'), thumb: m.media_url_https ? m.media_url_https + '?name=small' : '' };
    if (m.type === 'video' || m.type === 'animated_gif') {
      const vs = ((m.video_info && m.video_info.variants) || []).filter(v => v.content_type === 'video/mp4' && v.url);
      vs.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
      const pick = vs.find(v => (v.bitrate || 0) <= 1500000) || vs[0];
      out.src = pick ? pick.url : '';
    } else {
      out.src = m.media_url_https || '';
    }
    return out;
  });
}
function xPost(t) {
  const base = t.retweeted_status || t;
  const user = xUser(base.user);
  const txt = xText(base);
  const post = {
    id: base.id_str || '',
    url: 'https://x.com/' + (user ? user.handle : '') + '/status/' + (base.id_str || ''),
    date: new Date(base.created_at).toISOString(),
    text: txt.text,
    html: txt.html,
    media: xMedia(base),
    replies: base.reply_count || 0,
    reposts: base.retweet_count || 0,
    likes: base.favorite_count || 0
  };
  if (t.retweeted_status && user) { post.user = user; post.repostOf = user.handle; }
  if (base.quoted_status) {
    const q = base.quoted_status, qu = q.user || {};
    post.quote = { name: qu.name || '', handle: qu.screen_name || '', text: xText(q).text, url: 'https://x.com/' + (qu.screen_name || '') + '/status/' + (q.id_str || '') };
  }
  return post;
}
function xParse(html) {
  const m = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!m) return null;
  const data = JSON.parse(m[1]);
  const props = (data && data.props && data.props.pageProps) || {};
  const entries = (props.timeline && props.timeline.entries) || [];
  const tweets = entries.filter(e => e && e.type === 'tweet' && e.content && e.content.tweet).map(e => e.content.tweet);
  const posts = tweets.map(xPost).filter(p => p.id);
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const first = tweets.find(t => t.user && !t.retweeted_status) || tweets[0];
  return { user: first ? xUser(first.user) : null, posts, hasResults: props.contextProvider ? props.contextProvider.hasResults !== false : posts.length > 0 };
}
async function xTimeline(handle) {
  const up = await fetch(X_SYNDICATION + handle, {
    headers: { 'user-agent': X_UA, 'accept': 'text/html,application/xhtml+xml' },
    cf: { cacheTtl: 600, cacheEverything: true }
  });
  if (!up.ok) return null;
  return xParse(await up.text());
}

const GH_PROBE = 'https://raw.githubusercontent.com/FNTDUG/characters.json/main/last-updated';
async function ghRawOk() {
  try {
    const r = await fetch(GH_PROBE, { method: 'HEAD', cf: { cacheTtl: 0 } });
    // 429 is this worker being rate limited, not GitHub being down. Reporting an
    // outage on it would show the notice to everyone behind a busy edge IP.
    if (r.status === 429) return true;
    return r.status < 500;
  } catch (e) {
    return false;
  }
}
async function ghHealth() {
  // githubstatus.com is Atlassian Statuspage on CloudFront — separate infra from
  // GitHub, so it stays up precisely when GitHub does not.
  let indicator = 'unknown';
  try {
    const s = await fetch('https://www.githubstatus.com/api/v2/status.json', { cf: { cacheTtl: 30 } });
    const j = await s.json();
    indicator = (j && j.status && j.status.indicator) || 'unknown';
  } catch (e) { /* status page unreachable proves nothing on its own */ }
  // 'minor' covers things like a slow Actions queue, which does not break this
  // site — only escalate on the levels that actually take content down.
  if (indicator === 'major' || indicator === 'critical') return { ok: false, reason: 'status' };
  // A single failed probe can be a transient hiccup between this datacenter and
  // GitHub, so it only counts when it fails twice. This also catches the 5-15
  // minute window before GitHub posts an incident, which the status page misses.
  if (!(await ghRawOk()) && !(await ghRawOk())) return { ok: false, reason: 'unreachable' };
  return { ok: true };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Same-origin liveness probe for the outage notice. Deliberately touches
    // nothing external, so a failure here means the visitor is offline (or we are
    // down) rather than GitHub being broken. Not named /ads.txt or similar —
    // content blockers filter those names and would fake an offline reading.
    if (url.pathname === '/_up') {
      return new Response(null, {
        status: 204,
        headers: { 'cache-control': 'no-store', 'access-control-allow-origin': '*' }
      });
    }

    // Edge verdict on GitHub, cached so it costs one upstream check per 45s per
    // PoP however many visitors ask.
    if (url.pathname === '/gh-health') {
      const verdict = await ghHealth();
      return new Response(JSON.stringify(verdict), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'public, max-age=45'
        }
      });
    }

    // Rotations roll hourly, so the response is held only until the pool actually
    // flips — a fixed TTL would either hammer the upstream or serve a stale pool.
    if (url.pathname === '/rotations') {
      let body = null;
      try {
        const up = await fetch(ROT_UPSTREAM, {
          headers: { 'referer': 'https://fntd2.com/', 'user-agent': ROT_UA },
          cf: { cacheTtl: 60, cacheEverything: true }
        });
        if (up.ok) body = await up.text();
      } catch (e) { /* fall through to 502 */ }
      if (!body) {
        return new Response(JSON.stringify({ error: 'rotations unavailable' }), {
          status: 502,
          headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'no-store' }
        });
      }
      let ttl = 60;
      try {
        const j = JSON.parse(body);
        const ra = j && j.banners && j.banners.data && j.banners.data.refreshAt;
        if (ra) ttl = Math.max(30, Math.min(3600, ra - Math.floor(Date.now() / 1000)));
      } catch (e) { /* keep the floor */ }
      return new Response(body, {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'public, max-age=' + ttl
        }
      });
    }

    if (url.pathname.startsWith('/news-x/')) {
      const handle = url.pathname.slice('/news-x/'.length);
      if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) return new Response('Not found', { status: 404 });
      let feed = null;
      try { feed = await xTimeline(handle); } catch (e) { feed = null; }
      if (!feed) {
        return new Response(JSON.stringify({ error: 'x unavailable' }), {
          status: 502,
          headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'no-store' }
        });
      }
      return new Response(JSON.stringify(feed), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'public, max-age=600, stale-while-revalidate=3600'
        }
      });
    }

    // Same-origin JSON proxy so the browser never needs CORS on the r2.dev buckets
    if (url.pathname.startsWith('/inf-data/')) {
      const feed = url.pathname.slice('/inf-data/'.length);
      const target = INF_PROXY[feed];
      if (!target) return new Response('Not found', { status: 404 });
      const up = await fetch(target, { cf: { cacheTtl: 300, cacheEverything: true } });
      // Rewrite any r2.dev image URLs stored inside the JSON to the custom domains, so
      // renders resolve on the custom domain (CORS) and we can retire the r2.dev dev URLs.
      let body = await up.text();
      body = body
        .replace(/pub-ded986176f754f5fb54de94d2fb15509\.r2\.dev/g, 'cosmetics.fntduserguide.com')
        .replace(/pub-bd8c71834de64b078aa68df269b7d92e\.r2\.dev/g, 'items.fntduserguide.com')
        .replace(/pub-71c3b160626949ae8220d0daad5a9fc8\.r2\.dev/g, 'presents.fntduserguide.com')
        .replace(/pub-147ea4ffd88444cba282e819b9168c94\.r2\.dev/g, 'images.fntduserguide.com');
      // Fold in anything the wiki does not carry. Only the name-keyed feeds take
      // extras — the units feed is an array — and an existing entry always wins.
      const extra = EXTRA_ITEMS[feed];
      if (extra) {
        try {
          const data = JSON.parse(body);
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            let added = false;
            for (const name in extra) if (!(name in data)) { data[name] = extra[name]; added = true; }
            if (added) body = JSON.stringify(data);
          }
        } catch (e) { /* unparseable upstream: pass it through untouched */ }
      }
      return new Response(body, {
        status: up.status,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'public, max-age=300'
        }
      });
    }

    // Live game icons for the home page cards. The thumbnails API hands back a
    // time-limited CDN url (they carry a 180DAY- prefix and rotate), so it is
    // looked up per request and cached at the edge instead of being pasted into
    // index.html, where it would quietly break a few months later.
    if (url.pathname.startsWith('/game-thumb/')) {
      const id = url.pathname.slice('/game-thumb/'.length);
      if (!GAME_UNIVERSES.includes(id)) return new Response('Not found', { status: 404 });
      // Two different things are cached here and they want opposite lifetimes.
      //
      // This call resolves the CURRENT artwork, so it is the only thing that
      // notices a new thumbnail. At the old 6h it could serve art the game had
      // already replaced; 1h keeps the icon close to live for a call that costs
      // almost nothing. The image fetch below is the opposite case — its URL is
      // content-addressed by Roblox, so a given URL never changes and it can be
      // held for a week.
      //
      // THUMB_CACHE_V is part of the cache key: changing an entry's TTL does not
      // evict the copy already stored under that URL, so bump this to force a
      // refresh the moment a deploy goes out. Roblox ignores the parameter.
      const THUMB_CACHE_V = 2;
      const api = 'https://thumbnails.roblox.com/v1/games/icons?universeIds=' + id +
                  '&size=512x512&format=Png&isCircular=false&r=' + THUMB_CACHE_V;
      const meta = await fetch(api, { cf: { cacheTtl: 3600, cacheEverything: true } });
      const j = await meta.json().catch(() => null);
      const src = j && j.data && j.data[0] && j.data[0].imageUrl;
      // On failure return 502 rather than a placeholder: the <img> has an
      // onerror fallback to the previous artwork, so the card still fills.
      if (!src) return new Response('Upstream unavailable', { status: 502 });
      const img = await fetch(src, { cf: { cacheTtl: 604800, cacheEverything: true } });
      return new Response(img.body, {
        status: img.status,
        headers: {
          'content-type': img.headers.get('content-type') || 'image/png',
          // max-age was a day, so a browser that had loaded the home page kept
          // showing the old icon for a day after the worker had the new one.
          // An hour to revalidate, and stale-while-revalidate so the card still
          // paints instantly from cache while the check happens in the
          // background — the reader never waits on Roblox.
          'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
          'access-control-allow-origin': '*'
        }
      });
    }

    // Deep links like /base/<segment> serve the base page; the page's JS reads the
    // segment to open the right unit (unit-engine) / mode (tierlists) / tab (metas).
    let assetReq = request;
    const _deepBases = ['/fntd2/unit-engine', '/fntd2/tierlists-1', '/fntd2/meta-teams'];
    for (let _i = 0; _i < _deepBases.length; _i++) {
      if (url.pathname.indexOf(_deepBases[_i] + '/') === 0) {
        assetReq = new Request(new URL(_deepBases[_i], url).toString(), request);
        break;
      }
    }

    const response = await env.ASSETS.fetch(assetReq);
    const ct = response.headers.get('content-type') || '';
    if (!ct.includes('text/html')) return response;

    // Canonical always points at the www host so www stays the ranked/indexed URL
    // (keeps the *.pages.dev preview and the apex from being indexed as duplicates).
    const canonUrl = ('https://www.fntduserguide.com' + url.pathname).replace(/"/g, '%22');
    // The INFO panel is game content — skip it on the standalone Privacy Policy page.
    const noInfoPanel = url.pathname === '/privacy-policy' || url.pathname === '/privacy-policy.html';
    // The panel is FNTD2 reference data end to end — units, presents, elements,
    // rotations — so it only belongs on FNTD2 pages. FNTD1 and BBN can get their
    // own panels later rather than inheriting this one.
    const hasInfo = !noInfoPanel && infoPanelActive(url.pathname);
    return new HTMLRewriter()
      .on('head', {
        element(el) { el.append(NAV_CSS, { html: true }); el.append('<link rel="canonical" href="' + canonUrl + '">', { html: true }); el.append(HOME_ICONS, { html: true }); el.append(ANALYTICS, { html: true }); el.append(SOUND_GOVERNOR, { html: true }); el.append(ADSENSE_LOADER, { html: true }); }
      })
      // Every page ships a <link rel="icon"> pointing at a 70px jwwb image. Chrome will
      // reach past something that small and use a manifest icon instead, which is how the
      // purple home-screen icon ended up in the tab. Point it at a full-size transparent
      // one so there is nothing better for Chrome to go looking for.
      .on('link[rel="icon"]', {
        element(el) {
          el.setAttribute('href', '/favicon-192.png');
          el.setAttribute('sizes', '192x192');
          el.setAttribute('type', 'image/png');
        }
      })
      .on('img.ug-header-logo', {
        element(el) { el.setAttribute('src', 'https://images.fntduserguide.com/circle_done.png'); }
      })
      .on('img.ug-mn-brand-logo', {
        element(el) { el.setAttribute('src', 'https://images.fntduserguide.com/glowy.webp'); }
      })
      .on('.ug-mn-body', {
        element(el) { el.setInnerContent(MOBILE_NAV_BODY, { html: true }); }
      })
      .on('.ug-tn-inner', {
        element(el) { el.setInnerContent(DESKTOP_NAV_INNER, { html: true }); }
      })
      .on('footer#ug-footer', {
        element(el) { el.setInnerContent(FOOTER_HTML, { html: true }); }
      })
      .on('body', {
        element(el) {
          // With no INFO button above it, the sound toggle moves up into its slot.
          if (!hasInfo) el.append('<style>#ug-sound-btn{top:47px}@media(min-width:769px){#ug-sound-btn{top:63px}}</style>', { html: true });
          el.append(SOUND_BTN_HTML, { html: true });
          // Every page, including the ones without the INFO panel: the notice
          // costs nothing until a GitHub request on that page actually fails.
          el.append(OUTAGE_HTML, { html: true });
          el.append(OUTAGE_SCRIPT, { html: true });
          el.append(REWARD_TIP, { html: true });
          el.append(RAIL_HTML, { html: true });
          el.append(CONTENT_AD_HTML, { html: true });
          // ACTIVE_SCRIPT highlights the current page in the nav and WIP_HTML is
          // page furniture — both belong everywhere the chrome does, so neither
          // rides along with the panel.
          if (hasInfo) el.append(INFO_HTML, { html: true });
          if (!noInfoPanel) {
            el.append(ACTIVE_SCRIPT, { html: true });
            if (wipActive(url.pathname)) el.append(WIP_HTML, { html: true });
          }
          if (xdActive(url.pathname)) el.append(XDISMISS_HTML, { html: true });
        }
      })
      .transform(response);
  }
};
