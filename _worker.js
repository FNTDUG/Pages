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
#ug-info-panel{position:fixed;top:0;right:0;width:min(290px,88vw);height:100vh;background:linear-gradient(180deg,#0d0120 0%,#070110 100%);border-left:1px solid rgba(255,164,91,.12);z-index:1050;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-6px 0 40px rgba(0,0,0,.9);will-change:transform;scrollbar-width:thin;scrollbar-color:rgba(255,164,91,.2) transparent}
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
.inf-rarity-shiny{background:linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)}
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
.inf-reward-name{font-size:11px;color:#ccc;flex:1;min-width:0;word-break:break-word}
.inf-reward-chance{font-size:10px;color:#ffa45b;font-family:Audiowide,sans-serif;white-space:nowrap;flex-shrink:0}
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
      <button class="inf-drop-btn" data-lazy="presents" onclick="infToggle(this)">Presents <span class="inf-drop-arrow">/</span></button>
      <div class="inf-drop-body"><div class="inf-drop-inner" id="inf-presents-inner"></div></div>
    </div>
  </div>
</div>
<script>
function ugInfoOpen(){document.getElementById('ug-info-panel').classList.add('open');document.getElementById('ug-info-overlay').classList.add('open');document.body.style.overflow='hidden'}
function ugInfoClose(){document.getElementById('ug-info-panel').classList.remove('open');document.getElementById('ug-info-overlay').classList.remove('open');document.body.style.overflow='';document.querySelectorAll('.inf-drop.open').forEach(function(d){d.classList.remove('open');var b=d.querySelector('.inf-drop-btn');if(b)_infStop(b);});document.querySelectorAll('.inf-subdrop.open').forEach(function(d){d.classList.remove('open');});}
var _infTimers=new Map();var _IF=['/','-','\\\\','|'];
function _infSpin(btn){if(_infTimers.has(btn))clearInterval(_infTimers.get(btn));var a=btn.querySelector('.inf-drop-arrow');if(!a)return;var i=0;a.textContent=_IF[0];_infTimers.set(btn,setInterval(function(){i=(i+1)%_IF.length;a.textContent=_IF[i];},135));}
function _infStop(btn){if(_infTimers.has(btn)){clearInterval(_infTimers.get(btn));_infTimers.delete(btn);}var a=btn.querySelector('.inf-drop-arrow');if(a)a.textContent='/';}
function infToggle(btn){var s=btn.closest('.inf-drop');var wasOpen=s.classList.contains('open');document.querySelectorAll('.inf-drop.open').forEach(function(d){if(d!==s){d.classList.remove('open');var b=d.querySelector('.inf-drop-btn');if(b)_infStop(b);}});s.classList.toggle('open');wasOpen?_infStop(btn):_infSpin(btn);if(!wasOpen&&btn.getAttribute('data-lazy')==='presents')infLoadPresents();}
function infSubToggle(btn){var s=btn.closest('.inf-subdrop');var par=s.parentElement;par.querySelectorAll('.inf-subdrop.open').forEach(function(d){if(d!==s)d.classList.remove('open');});s.classList.toggle('open');}
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
  fetch('https://pub-71c3b160626949ae8220d0daad5a9fc8.r2.dev/fntd2-presents.json')
    .then(function(r){return r.json();})
    .then(function(presentsData){
      if(pEl)pEl.innerHTML='';
      fetch('https://raw.githubusercontent.com/FNTDUG/characters.json/main/json')
        .then(function(r){return r.json();})
        .catch(function(){return [];})
        .then(function(unitsArr){
          var imgMap={};
          (Array.isArray(unitsArr)?unitsArr:[]).forEach(function(u){if(u.name&&u.imgNormal)imgMap[u.name.toLowerCase()]=u.imgNormal;});
          buildPresents(pEl,presentsData,imgMap);
        });
    })
    .catch(function(){if(pEl){pEl.innerHTML='';var e=document.createElement('p');e.style.cssText='color:#f66;font-size:11px;padding:12px 14px';e.textContent='Failed to load presents.';pEl.appendChild(e);}});
}
function buildPresents(pEl,data,imgMap){
  if(!pEl||!data)return;
  var _RO=['hero','shiny','apex','exclusive','nightmare','secret','mythic','epic','rare','uncommon'];
  function _rr(r){var i=_RO.indexOf((r||'').toLowerCase());return i===-1?_RO.length:i;}
  var _RG={nightmare:'linear-gradient(135deg,#492590,#2A1E42)',secret:'linear-gradient(135deg,#FF8800,#FF0C0C)',mythic:'linear-gradient(135deg,#FFB81F,#FFFF00)',exclusive:'linear-gradient(135deg,rgb(140,255,203),rgb(51,231,255),rgb(79,164,255))',epic:'linear-gradient(135deg,#FF35FF,#87009F)',rare:'linear-gradient(135deg,#58A6FF,#1C3AA0)',uncommon:'linear-gradient(135deg,rgb(29,107,19),rgb(32,219,144))',apex:'linear-gradient(135deg,rgb(109,47,138),rgb(156,20,27))',hero:'linear-gradient(135deg,rgb(126,138,86),rgb(156,130,35))',shiny:'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)'};
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
    rewards=rewards.map(function(r){var ro=rovs[r.name||'']||{};return {type:ro.type||r.type,name:ro.name||r.name,amount:r.amount,chance:r.chance,rarity:(ro.rarity||r.rarity||'').toLowerCase()};});
    (PRESENTS_CFG.addRewards[name]||[]).forEach(function(r){rewards.push(r);});
    rewards.sort(function(a,b){var rd=_rr(a.rarity)-_rr(b.rarity);return rd!==0?rd:(a.name||'').localeCompare(b.name||'');});
    var card=document.createElement('div');card.className='inf-card';
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px;cursor:pointer';
    var badge=document.createElement('span');badge.className='inf-img'+(displayRar?' inf-rarity-'+displayRar:'');
    var img=document.createElement('img');img.src=displayImg;img.alt=displayName;badge.appendChild(img);
    var h4=document.createElement('h4');h4.style.cssText='margin:0;flex:1';h4.textContent=displayName;
    var arr=document.createElement('span');arr.style.cssText='color:#ffa45b;font-family:monospace;font-size:13px;opacity:.6';arr.textContent='/';
    row.appendChild(badge);row.appendChild(h4);row.appendChild(arr);card.appendChild(row);
    var body=document.createElement('div');body.style.cssText='max-height:0;overflow:hidden;transition:max-height .3s ease';
    var inner=document.createElement('div');inner.style.cssText='margin-top:8px;padding:8px;background:rgba(0,0,0,.4);border-radius:6px;display:flex;flex-direction:column;gap:6px';
    rewards.forEach(function(r){
      var rrow=document.createElement('div');rrow.className='inf-reward-row';
      var rb=document.createElement('span');rb.className='inf-img'+(r.rarity?' inf-rarity-'+r.rarity:'');
      if(!r.rarity)rb.style.background='rgba(25,24,40,.9)';
      var ri=document.createElement('img');ri.src=imgMap[(r.name||'').toLowerCase()]||'';ri.alt=r.name||'';rb.appendChild(ri);
      var rname=document.createElement('div');rname.className='inf-reward-name';
      var _rg=_RG[(r.rarity||'').toLowerCase()];
      if(_rg){rname.style.cssText='background:'+_rg+';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:600;flex:1;min-width:0;font-size:11px;word-break:break-word';}
      rname.textContent=(r.name||'')+(r.type?' ('+r.type+')':'');
      var rchance=document.createElement('div');rchance.className='inf-reward-chance';rchance.textContent=r.chance!=null?r.chance+'%':'';
      rrow.appendChild(rb);rrow.appendChild(rname);rrow.appendChild(rchance);inner.appendChild(rrow);
    });
    body.appendChild(inner);card.appendChild(body);
    var open=false;
    row.addEventListener('click',function(){
      open=!open;
      body.style.maxHeight=open?'2000px':'0';
      row.style.marginBottom=open?'8px':'0';
      arr.textContent=open?'-':'/';
    });
    pEl.appendChild(card);
  });
}
function ugInfoToggle(){document.getElementById('ug-info-panel').classList.contains('open')?ugInfoClose():ugInfoOpen()}
document.addEventListener('keydown',function(e){if(e.key==='Escape')ugInfoClose()});
(function(){
  fetch('https://raw.githubusercontent.com/FNTDUG/characters.json/main/metas.json')
    .then(function(r){return r.json();})
    .then(function(d){
      var sh=(d&&d.shared)||{};
      var DESCS={
        bytes:{
         'The Box': '[OBTAINMENT]<br>● Chance when opening any present<br>[STATS]<br>● COOLDOWN: {+10% ~ -10%}<br>● RANGE: {-20% ~ +20%}<br>● DAMAGE: {-20% ~ +20%}',
         'Boss Drain': '[OBTAINMENT]<br>● Purchasable in Boss Raids Shop<br>[STATS]<br>● DAMAGE: {0% ~ +10%}<br>● BOSS DAMAGE: {-20% ~ +25%}',
         'Reaper': '[OBTAINMENT]<br>● Chance when killing any Enemy<br>[STAT]<br>● CRIT DAMAGE {0% ~ +40%}',
         'KABOOM!': '[OBTAINMENT]<br>● Chance after completing any Quest<br>[PASSIVE]<br>● Unit Attack Type Changes to Circle<br>[STATS]<br>● RANGE: {0% ~ +25%}',
         'The Fan': '[OBTAINMENT]<br>● Chance when leveling up in Boss Raids<br>[PASSIVE]<br>● Slow based on Bytes Stats<br>[STATS]<br>● CHARGE COOLDOWN: {30s ~ 25s}<br>● SLOW%: {-5% ~ -20%}<br>● SLOW DURATION: {2s ~ 5s}<br>● APPLY DURATION: {3s ~ 8s}',
         'UFO': '[OBTAINMENTS]<br>● 100% Drop chance when winning a minigame<br>● 25% Drop chance when losing a minigame<br>[PASSIVE]<br>● Able to give any single Element Boost<br>[STATS]<br>● ELEMENT DAMAGE: {+2% ~ +10%}<br>● ACTIVE DAMAGE: {+10% ~ +35%}',
         'Pearl': '[OBTAINMENT]<br>● 1% Drop chance when losing a Stock (not Story)<br>[STAT]<br>● INCOME: {-50% ~ +50%}'
        },
        chips:{
         _top: [
           '[OBTAINMENT]<br>● Select a Game, then Night 7, and a difficulty level of 2 or higher. Each rarity of Chip is a ~rare:30%~, ~epic:20%~, ~mythic:20%~, ~secret:15%~, ~nightmare:15%~ drop chance respectively. Whether or not it is Part A or Part B is random',
           '[BASE STATS]<br>● Buff Potency: {+6% ~ +30%}<br>● Follow Up Damage: {+6% ~ +30%}<br>● Damage: {+5% ~ +25%}<br>● Cooldown: {-2.5% ~ -12.5%}<br>● DoT Damage: {+6% ~ +30%}<br>● Crit Chance: {+5% ~ +25%}<br>● Range: {+5% ~ +25%}<br>● Crit Damage: {+8% ~ +40%}',
           '[STAT BONUSES]<br>{Chip Rarity}<br>~nightmare:● Nightmare: +5%~<br>~secret:● Secret: +3.75%~<br>~mythic:● Mythic: +2.5%~<br>~epic:● Epic: +1.25%~<br>{Sub-Stats}<br>● Buff Potency: {+2% → +10%}<br>● Follow Up Damage: {+2.5% → +12.5%}<br>● Damage: {+2% → +10%}<br>● Cooldown: {-1% → -5%}<br>● DoT Damage: {+2% → +10%}<br>● Crit Chance: {+1.5% → +7.5%}<br>● Range: {+2% → +10%}<br>● Crit Damage: {+3% → +15%}'
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
(function(){
  var bs=document.querySelectorAll('.ug-status-badge[data-gh-file]');
  if(!bs.length)return;
  bs.forEach(function(b){
    var file=b.getAttribute('data-gh-file');
    var repo=b.getAttribute('data-gh-repo')||'FNTDUG/Pages';
    var suffix=b.textContent.trim();
    var key='ugh:'+repo+':'+file;
    var hit=sessionStorage.getItem(key);
    if(hit){b.textContent='Last updated - '+hit+(suffix?' '+suffix:'');return;}
    fetch('https://api.github.com/repos/'+repo+'/commits?path='+encodeURIComponent(file)+'&per_page=1')
      .then(function(r){return r.json();})
      .then(function(d){
        if(!d||!d[0])return;
        var dt=new Date(d[0].commit.committer.date);
        var s=(dt.getMonth()+1)+'/'+dt.getDate()+'/'+String(dt.getFullYear()).slice(2);
        sessionStorage.setItem(key,s);
        b.textContent='Last updated - '+s+(suffix?' '+suffix:'');
      })
      .catch(function(){});
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
