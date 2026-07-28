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

// Sets the active link + opens the right mobile section based on current URL.
const ACTIVE_SCRIPT = `<script>
(function(){
  var p = window.location.pathname.replace(/\/+$/, '') || '/';
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
</script>`;

export async function onRequest(context) {
  const response = await context.next();
  const ct = response.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('.ug-mn-body', {
      element(el) { el.setInnerContent(MOBILE_NAV_BODY, { html: true }); }
    })
    .on('.ug-tn-inner', {
      element(el) { el.setInnerContent(DESKTOP_NAV_INNER, { html: true }); }
    })
    .on('body', {
      element(el) { el.append(ACTIVE_SCRIPT, { html: true }); }
    })
    .transform(response);
}
