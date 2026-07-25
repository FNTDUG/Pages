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
    <a href="/fntd2/meta-teams-1"       class="ug-mn-child" data-nav-href="/fntd2/meta-teams-1">Meta Teams</a>
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
    <a href="/fntd2/meta-teams-1"        data-nav-href="/fntd2/meta-teams-1">Meta Teams</a>
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
#ug-info-panel{position:fixed;top:0;right:0;width:min(290px,88vw);height:100vh;background:linear-gradient(180deg,#0d0120 0%,#070110 100%);border-left:1px solid rgba(255,164,91,.12);z-index:1050;overflow-y:auto;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-6px 0 40px rgba(0,0,0,.9);will-change:transform;scrollbar-width:thin;scrollbar-color:rgba(255,164,91,.2) transparent}
#ug-info-panel::-webkit-scrollbar{width:3px}
#ug-info-panel::-webkit-scrollbar-thumb{background:rgba(255,164,91,.25);border-radius:2px}
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
</style>`;

const INFO_HTML = `<button id="ug-info-btn" onclick="ugInfoToggle()" aria-label="Info panel">INFO</button>
<div id="ug-info-overlay" onclick="ugInfoClose()"></div>
<div id="ug-info-panel" role="dialog" aria-label="Info">
  <div class="ug-mn-header">
    <div class="ug-mn-brand">
      <img class="ug-mn-brand-logo" src="https://pub-147ea4ffd88444cba282e819b9168c94.r2.dev/glowy.webp" alt="FNTD">
      <span class="ug-mn-brand-name" style="letter-spacing:2px">INFO</span>
    </div>
    <button class="ug-mn-close" onclick="ugInfoClose()" aria-label="Close">&#x2715;</button>
  </div>
  <div id="ug-info-body" style="flex:1;padding:16px"></div>
</div>
<script>
function ugInfoOpen(){document.getElementById('ug-info-panel').classList.add('open');document.getElementById('ug-info-overlay').classList.add('open');document.body.style.overflow='hidden'}
function ugInfoClose(){document.getElementById('ug-info-panel').classList.remove('open');document.getElementById('ug-info-overlay').classList.remove('open');document.body.style.overflow=''}
function ugInfoToggle(){document.getElementById('ug-info-panel').classList.contains('open')?ugInfoClose():ugInfoOpen()}
document.addEventListener('keydown',function(e){if(e.key==='Escape')ugInfoClose()});
<\/script>`;

const ACTIVE_SCRIPT = `<script>
(function(){
  var p = window.location.pathname.replace(/[/]+$/, '') || '/';
  document.querySelectorAll('#ug-topnav [data-nav-href]').forEach(function(el){
    if(el.getAttribute('data-nav-href') === p) el.classList.add('active');
  });
  document.querySelectorAll('#ug-mobile-nav [data-nav-href]').forEach(function(el){
    if(el.getAttribute('data-nav-href') === p){
      el.classList.add('active');
      var sec = el.closest('.ug-mn-section');
      if(sec){
        sec.classList.add('open');
        var btn = sec.querySelector('.ug-mn-section-btn');
        if(btn && typeof ugMnSpinStart === 'function') ugMnSpinStart(btn);
      }
    }
  });
})();
<\/script>`;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const ct = response.headers.get('content-type') || '';
    if (!ct.includes('text/html')) return response;

    return new HTMLRewriter()
      .on('head', {
        element(el) { el.append(NAV_CSS, { html: true }); }
      })
      .on('img.ug-header-logo', {
        element(el) { el.setAttribute('src', 'https://pub-147ea4ffd88444cba282e819b9168c94.r2.dev/circle_done.png'); }
      })
      .on('img.ug-mn-brand-logo', {
        element(el) { el.setAttribute('src', 'https://pub-147ea4ffd88444cba282e819b9168c94.r2.dev/glowy.webp'); }
      })
      .on('.ug-mn-body', {
        element(el) { el.setInnerContent(MOBILE_NAV_BODY, { html: true }); }
      })
      .on('.ug-tn-inner', {
        element(el) { el.setInnerContent(DESKTOP_NAV_INNER, { html: true }); }
      })
      .on('body', {
        element(el) {
          el.append(INFO_HTML, { html: true });
          el.append(ACTIVE_SCRIPT, { html: true });
        }
      })
      .transform(response);
  }
};
