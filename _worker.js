// ─── SHARED NAV ───────────────────────────────────────────────────────────────
// Edit the two templates below to add/remove tabs or change nav style.
// Changes here instantly apply to every page — no per-page edits needed.
// ─────────────────────────────────────────────────────────────────────────────

const MOBILE_NAV_BODY = `
<a href="/" class="ug-mn-link" data-nav-href="/">Home</a>
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
    <a href="/fntd2/event-story-endless" class="ug-mn-child" data-nav-href="/fntd2/event-story-endless">Event Story &amp; Endless</a>
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
    <a href="/fntd2/event-story-endless"  data-nav-href="/fntd2/event-story-endless">Event Story &amp; Endless</a>
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
}
@media(min-width:769px){
  #ug-hamburger{top:14px;right:12px;padding:11px 20px 11px 16px;font-size:13px;border-radius:28px;gap:8px}
  #ug-hamburger .hmb-icon{font-size:21px}
  #ug-info-btn{top:63px;right:12px;padding:14px 20px 14px 16px;font-size:13px;border-radius:28px;gap:8px}
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
.inf-subdrop.open .inf-subdrop-body{max-height:1200px}
.inf-subdrop-inner{padding:8px 10px 12px;display:flex;flex-direction:column;gap:6px}
.inf-reward-row{display:flex;align-items:center;gap:8px}
.inf-reward-name{font-size:13px;color:#ccc;flex:1;min-width:0;word-break:break-word}
.inf-reward-chance{font-size:13px;color:#ffa45b;font-family:Audiowide,sans-serif;white-space:nowrap;flex-shrink:0}
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

const INFO_HTML = `<button id="ug-info-btn" onclick="ugInfoToggle()" aria-label="Info panel">INFO</button>
<div id="ug-info-overlay" onclick="ugInfoClose()"></div>
<div id="ug-info-panel" role="dialog" aria-label="Info">
  <div class="ug-mn-header">
    <div class="ug-mn-brand">
      <img class="ug-mn-brand-logo" src="https://images.fntduserguide.com/glowy.webp" alt="FNTD">
      <span class="ug-mn-brand-name" style="letter-spacing:2px">INFO</span>
    </div>
    <button class="ug-mn-close" onclick="ugInfoClose()" aria-label="Close">&#x2715;</button>
  </div>
  <div id="ug-info-body" style="flex:1">
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Bytes <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-bytes-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Chips <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-chips-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Enchants <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-enchants-inner"></div></div>
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
      <button class="inf-drop-btn" data-lazy="hero-quests" onclick="infToggle(this)">Hero Quests <span class="inf-drop-arrow">/</span></button>
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
      <button class="inf-drop-btn" data-lazy="shop-quests" onclick="infToggle(this)">Shop Quests <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-shop-quests-inner"></div></div>
    </div>
    <div class="inf-drop">
      <button class="inf-drop-btn" onclick="infToggle(this)">Stat Chips <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-endo-chips-inner"></div></div>
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
</div>
<script>
var _ugInfoSY=0;
function ugInfoOpen(){var p=document.getElementById('ug-info-panel');var o=document.getElementById('ug-info-overlay');_ugInfoSY=window.scrollY||window.pageYOffset;p.classList.add('open');o.classList.add('open');document.body.style.position='fixed';document.body.style.top='-'+_ugInfoSY+'px';document.body.style.left='0';document.body.style.right='0';}
function ugInfoClose(){document.getElementById('ug-info-panel').classList.remove('open');document.getElementById('ug-info-overlay').classList.remove('open');document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.right='';window.scrollTo(0,_ugInfoSY);document.querySelectorAll('.inf-drop.open').forEach(function(d){d.classList.remove('open');var b=d.querySelector('.inf-drop-btn');if(b)_infStop(b);var db=d.querySelector('.inf-drop-body');if(db)db.style.maxHeight='';});document.querySelectorAll('.inf-subdrop.open').forEach(function(d){d.classList.remove('open');});document.querySelectorAll('.inf-exp-body').forEach(function(b){b.style.maxHeight='0';});_infExp=null;}
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
function infOpen(body){if(!body)return;_infClearEnd(body);body.style.transition='max-height .3s ease';body.style.maxHeight=body.scrollHeight+'px';var f=function(){body.style.maxHeight='none';_infClearEnd(body);};body._infEnd=f;body.addEventListener('transitionend',f);}
function infClose(body){if(!body)return;var _mv=body.querySelectorAll('video');for(var _i=0;_i<_mv.length;_i++){try{_mv[_i].pause();_mv[_i].currentTime=0;}catch(e){}}body.querySelectorAll('.inf-mg-wrap.open').forEach(function(w){w.classList.remove('open');});_infClearEnd(body);body.style.transition='none';body.style.maxHeight=body.scrollHeight+'px';body.offsetHeight;body.style.transition='max-height .3s ease';body.style.maxHeight='0';}
function infLoad(lazy){if(lazy==='presents')return infLoadPresents();if(lazy==='evolutions')return infLoadEvolutions();if(lazy==='hero-quests')return infLoadHeroQuests();if(lazy==='shop-quests')return infLoadShopQuests();if(lazy==='prestige')return infLoadPrestige();return infLoadCategory(lazy);}
function infSubToggle(btn){var s=btn.closest('.inf-subdrop');var par=s.parentElement;par.querySelectorAll('.inf-subdrop.open').forEach(function(d){if(d!==s)d.classList.remove('open');});s.classList.toggle('open');}
// Single expandable card open at a time, across all tabs
var _infExp=null;
function infToggleExp(row,body,arr){
  var wasThis=_infExp&&_infExp.body===body;
  if(_infExp){_infExp.body.style.maxHeight='0';_infExp.row.style.marginBottom='0';if(_infExp.arr)_infExp.arr.textContent='/';_infExp=null;}
  if(wasThis)return;
  body.style.maxHeight='2000px';row.style.marginBottom='8px';if(arr)arr.textContent='-';_infExp={row:row,body:body,arr:arr};
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
    // "Currency" rewards aren't in any JSON: give Tokens the coins render and give Souls the Soul material render.
    var _soul=rewMap['material|soul']||{};
    rewMap['currency|tokens']={img:INF_COINS_IMG,rarity:'',name:'Tokens'};
    rewMap['currency|souls']={img:_soul.img||'',rarity:_soul.rarity||'',name:'Souls'};
    if(pEl)pEl.innerHTML='';
    buildPresents(pEl,presentsData,rewMap);
    var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);
  }).catch(function(){if(pEl){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load presents.';pEl.appendChild(e);var _b=pEl.closest('.inf-drop-body');if(_b)infOpen(_b);}});
}
function buildPresents(pEl,data,rewMap){
  if(!pEl||!data)return;
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
    rewards=rewards.map(function(r){var ro=rovs[r.name||'']||{};var ty=ro.type||r.type;var nm=ro.name||r.name;var look=rewMap[((ty||'Unit').toLowerCase())+'|'+((nm||'').toLowerCase())]||{};return {type:ty,name:(look.name||nm),amount:r.amount,chance:r.chance,rarity:(ro.rarity||look.rarity||r.rarity||'').toLowerCase(),img:look.img||''};});
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
    // Tokens = the base game currency; not in any JSON, so give it its render manually.
    put('material','Tokens',INF_COINS_IMG,'');
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
    pEl.appendChild(card);
  });
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
  ]}
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
function buildShopQuests(pEl,uMap,pMap){
  if(!pEl)return;
  SHOP_QUESTS.forEach(function(h){
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
// Prestige Shop items are looked up generically across every item source (skins/units/presents/pets/etc.)
var PRESTIGE_SHOP=[
  {name:'Radiant Astral Bonnie', type:'skin', cost:10}
];
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
  pets:             {overrides:{}, add:{}, hide:['Shiny Signed Glacier Springtrap','Shiny Signed Scooped Ice Cream Michael']},
  skins:            {overrides:{'Volcanic Party Packer Cupcake':{rarity:'secret'}}, add:{}, hide:['Shiny Signed Glacier Springtrap','Shiny Signed Scooped Ice Cream Michael']},
  'loading-screens':{overrides:{}, add:{}, hide:[]},
  materials:        {overrides:{'Soul':{description:''}}, add:{}, hide:[]},
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
  {name:'Token Card Apex',rarity:'apex',desc:'+20% Tokens Boost'},
  {name:'Faz Rating Card Apex',rarity:'apex',desc:'+17.5% Faz-Rating Boost'},
  {name:'Luck Card Apex',rarity:'apex',desc:'+7.5% Luck Boost'}
];
// Card packs — Cost/Type + per-rarity pull weights. Odds are derived from these
// and the card rarities/weights above.
var EST_PACKS=[
  {name:'Establishment Card Pack',rarity:'epic',cost:'1000 Tokens',rarities:{uncommon:60,rare:32.5,epic:5,mythic:2.5,secret:0.5,nightmare:0.1},cards:['Arcade','Tshirt','Bonnie and Chica Fight','Chocolate Coin','Paycheck','Ticket Eater','Sale','Catalog','Shhh','Clover','In the jar','Fazbear Mafia','Crying Helpy','Scrooge McHelpy','Pimptrap','Puppet Souls','Freddy Fazboost','Springbonnie','You Won!','Peaceful Luck',"Foxy's Throne"]},
  {name:'Establishment Card Pack 2',rarity:'epic',cost:'30 Souls',rarities:{uncommon:60,rare:32.5,epic:5,mythic:2.5,secret:0.5,nightmare:0.1,apex:0.01},cards:['Raid Coin Card Uncommon','Raid Coin Card Rare','Raid Coin Card Epic','Raid Coin Card Mythical','Raid Coin Card Secret','Raid Coin Card Nightmare','Raid Coin Card Apex','Luck Card Apex','Token Card Apex','Faz Rating Card Apex']}
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
function ugInfoToggle(){document.getElementById('ug-info-panel').classList.contains('open')?ugInfoClose():ugInfoOpen()}
document.addEventListener('keydown',function(e){if(e.key==='Escape')ugInfoClose()});
(function(){var ip=document.getElementById('ug-info-panel');ip.addEventListener('wheel',function(e){e.stopPropagation();var atT=ip.scrollTop<=0&&e.deltaY<0;var atB=ip.scrollTop+ip.clientHeight>=ip.scrollHeight-1&&e.deltaY>0;if(atT||atB)e.preventDefault();},{passive:false});ip.addEventListener('touchmove',function(e){e.stopPropagation();},{passive:true});})();
(function(){
  fetch('https://raw.githubusercontent.com/FNTDUG/characters.json/main/metas.json')
    .then(function(r){return r.json();})
    .then(function(d){
      var sh=(d&&d.shared)||{};
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
         'Neon Bee': '[OBTAINMENT]<br>● 0.05% Drop chance when Summoning<br>[PASSIVE]<br>● {+5%} Damage per unique DoT instance on an Enemy<br>[STATS]<br>● DoT Damage: {+5%}<br>● DoT Duration: {-25 ~ +25%}'
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
         'Blazing Fire': '[OBTAINMENT]<br>● Game 6<br>[SYNERGY BOOST]<br>● {+20%} DoT Damage<br>[SYNERGY PASSIVE]<br>● When applying Burn to an enemy for the first time, Buff this Units Damage by {20%} for 10s (does not stack)'
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
      function card(name,imgUrl,rarCls,borderBg,desc){
        var c=document.createElement('div');c.className='inf-card';
        var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px';
        var badge=document.createElement('span');badge.className='inf-img'+(rarCls?' inf-rarity-'+rarCls:'');
        if(borderBg)badge.style.background=borderBg;
        var img=document.createElement('img');img.src=imgUrl||'';img.alt=name;badge.appendChild(img);
        var h4=document.createElement('h4');h4.style.margin='0';h4.textContent=name;
        row.appendChild(badge);row.appendChild(h4);c.appendChild(row);
        var p=document.createElement('p');if(desc)p.innerHTML=hl(desc);c.appendChild(p);
        return c;
      }
      var RAR_ORDER=['hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
      function rarRank(r){var i=RAR_ORDER.indexOf((r||'').toLowerCase());return i===-1?RAR_ORDER.length:i;}
      function sorted(obj,getRar){return Object.keys(obj).sort(function(a,b){var rd=rarRank(getRar(obj[a]))-rarRank(getRar(obj[b]));return rd!==0?rd:a.localeCompare(b);});}
      function addTops(el,tops){if(!tops)return;(Array.isArray(tops)?tops:[tops]).forEach(function(t){el.appendChild(textCard(t));});}
      var bEl=document.getElementById('inf-bytes-inner');
      if(bEl){addTops(bEl,DESCS.bytes._top);if(sh.bytes)sorted(sh.bytes,function(v){return v.rarity;}).forEach(function(n){var b=sh.bytes[n];bEl.appendChild(card(n,b.url,b.rarity,null,(DESCS.bytes[n]||'')));});}
      var cEl=document.getElementById('inf-chips-inner');
      if(cEl){addTops(cEl,DESCS.chips._top);if(sh.chips)sorted(sh.chips,function(v){return v.rarity;}).forEach(function(n){var c=sh.chips[n];cEl.appendChild(card(n,c.url,c.rarity,null,(DESCS.chips[n]||'')));});}
      var eEl=document.getElementById('inf-enchants-inner');
      if(eEl&&sh.enchants){addTops(eEl,DESCS.enchants._top);var _eSeen={};Object.keys(DESCS.enchants).forEach(function(n){if(n==='_top')return;if(sh.enchants[n]){_eSeen[n]=1;var e=sh.enchants[n];eEl.appendChild(card(n,e.url,null,e.color,(DESCS.enchants[n]||'')));}});Object.keys(sh.enchants).sort(function(a,b){return a.localeCompare(b);}).forEach(function(n){if(!_eSeen[n]){var e=sh.enchants[n];eEl.appendChild(card(n,e.url,null,e.color,''));}});}
    })
    .catch(function(){});
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

const INF_PROXY = {
  'presents':        'https://presents.fntduserguide.com/fntd2-presents.json',
  'units':           'https://raw.githubusercontent.com/FNTDUG/characters.json/main/json',
  'skins':           'https://cosmetics.fntduserguide.com/skins.json',
  'pets':            'https://cosmetics.fntduserguide.com/pets.json',
  'banners':         'https://cosmetics.fntduserguide.com/banners.json',
  'loading-screens': 'https://cosmetics.fntduserguide.com/loading-screens.json',
  'materials':       'https://items.fntduserguide.com/materials.json',
  'foods':           'https://items.fntduserguide.com/foods.json',
  'potions':         'https://items.fntduserguide.com/potions.json'
};

export default {
  async fetch(request, env) {
    // Same-origin JSON proxy so the browser never needs CORS on the r2.dev buckets
    const url = new URL(request.url);
    if (url.pathname.startsWith('/inf-data/')) {
      const target = INF_PROXY[url.pathname.slice('/inf-data/'.length)];
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
      return new Response(body, {
        status: up.status,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'public, max-age=300'
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
    return new HTMLRewriter()
      .on('head', {
        element(el) { el.append(NAV_CSS, { html: true }); el.append('<link rel="canonical" href="' + canonUrl + '">', { html: true }); }
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
          if (noInfoPanel) return;
          el.append(INFO_HTML, { html: true });
          el.append(ACTIVE_SCRIPT, { html: true });
        }
      })
      .transform(response);
  }
};
