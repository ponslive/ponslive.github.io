"""Compacts career.html: summary at top, collapsible platform detail, tabbed after-section."""
import re, sys, json, subprocess
f = 'career.html'; s = open(f).read()

def must(cond, msg):
    if not cond: sys.exit('STOP: ' + msg)

# --- data for the summary ---------------------------------------------------
P = json.loads(subprocess.run(['node', '-e', "global.window={};require('./assets/data/profile.js');process.stdout.write(JSON.stringify({about:window.PROFILE.about,sig:window.PROFILE.signature}))"], capture_output=True, text=True, check=True).stdout)
A, S = P['about'], P['sig']
esc = lambda t: t.replace('&', '&amp;').replace('<', '&lt;')
summary = f'''
  <section class="about-me" id="about" aria-labelledby="about-h">
    <div class="wrap about-grid">
      <div class="about-copy">
        <h2 class="h2 rv" id="about-h">In <span class="serif">short.</span></h2>
        <p class="about-who rv" style="--d:1">{esc(A['who'])}</p>
        <p class="body rv" style="--d:2">{esc(A['now'])}</p>
        <p class="body rv" style="--d:3">{esc(A['how'])}</p>
      </div>
      <div class="about-side">
        <ul class="strengths rv" style="--d:2" aria-label="Core strengths">{''.join(f'<li>{esc(x)}</li>' for x in A['strengths'])}</ul>
        <div class="sig rv" style="--d:3">
          <p class="mono sig-k"><span class="sig-dot" aria-hidden="true"></span>Signature skill</p>
          <h3>{esc(S['name'])}</h3>
          <p>{esc(S['line'])}</p>
          <ul class="chips">{''.join(f'<li class="chip">{esc(t)}</li>' for t in S['tags'])}</ul>
        </div>
      </div>
    </div>
  </section>
'''
m = re.search(r'(  <section class="intro" id="timeline".*?</section>\n)', s, re.S)
must(m, 'intro section')
s = s[:m.end()] + summary + s[m.end():]
s = s.replace('<li><a href="#era-intelligence"><i aria-hidden="true"></i>Timeline</a></li>',
              '<li><a href="#about"><i aria-hidden="true"></i>In short</a></li>\n          <li><a href="#era-intelligence"><i aria-hidden="true"></i>Timeline</a></li>', 1)

# --- collapse role lists and platform detail ------------------------------
n_roles = len(re.findall(r'<div class="roles">', s))
s = re.sub(r'<div class="roles"><p class="mono roles-k">(.*?)</p>(<ol class="role-list">.*?</ol>)</div>',
           lambda m: f'<details class="roles more"><summary><span class="mono">{m.group(1)}</span><span class="more-l">Show roles</span></summary>{m.group(2)}</details>', s, flags=re.S)

def fold(m):
    block = m.group(0)
    ach = re.search(r'\s*<ul class="ach">.*?</ul>', block, re.S)
    flow = re.search(r'\s*<figure class="flowx.*?</figure>', block, re.S)
    stack = re.search(r'\s*<div class="ch-stack">.*?</div>\s*</div>', block, re.S)
    must(ach and flow, 'platform parts in ' + block[:80])
    inner = ach.group(0) + flow.group(0)
    block = block.replace(ach.group(0), '', 1).replace(flow.group(0), '', 1)
    st = re.search(r'\s*<div class="ch-stack">.*?</ul></div>', block, re.S)
    if st:
        inner += st.group(0); block = block.replace(st.group(0), '', 1)
    block = re.sub(r'(\n    </div>\n  </article>)$', '\n      <details class="more ch-more"><summary><span class="more-l">How it works</span><span class="mono">achievements · flow · stack</span></summary><div class="more-body">' + inner + '</div></details>\\1', block)
    return block
n_plat = len(re.findall(r'<article class="ch[ "]', s))
s = re.sub(r'<article class="ch[ "].*?</article>', fold, s, flags=re.S)
must(s.count('ch-more') == n_plat, 'fold count')

# --- tabbed "after" block --------------------------------------------------
must('<div class="after">' in s, 'after block')
tabs = '''  <div class="after">
  <nav class="after-tabs wrap" aria-label="Depth">
    <div class="tabs" role="tablist" aria-label="More about the work">
      <button role="tab" id="t-expertise" aria-controls="expertise" aria-selected="true">Expertise</button>
      <button role="tab" id="t-how" aria-controls="how" aria-selected="false" tabindex="-1">Standards &amp; principles</button>
      <button role="tab" id="t-charts" aria-controls="charts" aria-selected="false" tabindex="-1">At a glance</button>
    </div>
  </nav>
'''
s = s.replace('  <div class="after">\n', tabs, 1)
s = s.replace('<section class="section wrap" id="expertise" aria-labelledby="x-h">', '<section class="section wrap tabpanel" id="expertise" role="tabpanel" aria-labelledby="t-expertise">', 1)
# merge standards + principles into one panel
m1 = re.search(r'  <section class="section wrap" aria-labelledby="w-t">(.*?)</section>\n\n  <section class="section wrap" aria-labelledby="pr-h">(.*?)</section>', s, re.S)
must(m1, 'standards+principles')
s = s[:m1.start()] + f'  <section class="section wrap tabpanel" id="how" role="tabpanel" aria-labelledby="t-how" hidden>{m1.group(1)}<div class="how-gap"></div>{m1.group(2)}</section>' + s[m1.end():]
s = s.replace('<section class="section" id="charts" aria-labelledby="c-h">', '<section class="section tabpanel" id="charts" role="tabpanel" aria-labelledby="t-charts" hidden>', 1)
s = s.replace('how it grew year by year is in the <a href="#charts">charts below</a>.', 'how it grew year by year is under <a href="#charts">At a glance</a>.')

css = '''
/* compact career: summary, folds, tabs */
.about-me { padding-block: clamp(72px, 10vw, 140px); border-top: 1px solid var(--line); }
.about-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
.about-who { font-size: clamp(1.4rem, 2.3vw, 2rem); line-height: 1.3; font-weight: 560; letter-spacing: -.02em; color: var(--ink); margin: 22px 0 20px; max-width: 30ch; text-wrap: balance; }
.about-copy .body { margin-top: 14px; }
.strengths { list-style: none; display: grid; gap: 0; border-top: 1px solid var(--line); }
.strengths li { padding: 14px 0; border-bottom: 1px solid var(--line); font-size: 1.05rem; color: var(--ink); display: flex; gap: 14px; align-items: baseline; }
.strengths li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--amber); flex: none; transform: translateY(-2px); }
.sig { margin-top: 28px; padding: 26px 26px 24px; border-radius: 22px; border: 1px solid rgba(255,138,42,.45); background: linear-gradient(160deg, rgba(255,138,42,.12), rgba(255,138,42,.02) 60%), var(--deep); }
.sig-k { display: flex; align-items: center; gap: 10px; color: var(--amber-hi); }
.sig-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 4px rgba(255,138,42,.18); }
.sig h3 { font-size: clamp(1.5rem, 2.4vw, 2rem); font-weight: 620; letter-spacing: -.03em; margin: 12px 0 10px; }
.sig p:not(.sig-k) { color: var(--ink-2); line-height: 1.6; }
.sig .chips { margin-top: 18px; }
.sig .chip { border-color: rgba(255,138,42,.4); color: var(--ink); }
@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } }
details.more { border-top: 1px solid var(--line); margin-top: 22px; }
details.more > summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 0; color: var(--ink-2); }
details.more > summary::-webkit-details-marker { display: none; }
details.more > summary .more-l { color: var(--ink); font-weight: 560; display: inline-flex; align-items: center; gap: 10px; }
details.more > summary .more-l::after { content: ''; width: 9px; height: 9px; border-right: 1.5px solid var(--amber); border-bottom: 1.5px solid var(--amber); transform: rotate(45deg) translateY(-3px); transition: transform .35s var(--ease-out); }
details.more[open] > summary .more-l::after { transform: rotate(225deg) translate(-2px,-2px); }
details.more > summary:hover .more-l { color: var(--amber-hi); }
details.roles.more { max-width: var(--max); margin-inline: auto; }
.more-body { padding-bottom: 12px; }
.after-tabs { position: sticky; top: calc(var(--nav-h) + 12px); z-index: 40; display: flex; justify-content: center; padding-top: clamp(64px, 9vw, 120px); pointer-events: none; }
.after-tabs .tabs { pointer-events: auto; display: inline-flex; gap: 4px; padding: 5px; border-radius: 999px; background: rgba(13,10,7,.78); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border: 1px solid var(--line-2); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.after-tabs [role="tab"] { white-space: nowrap; padding: 10px 18px; border-radius: 999px; color: var(--ink-3); font-weight: 520; font-size: .92rem; transition: color .25s, background .25s; }
.after-tabs [role="tab"][aria-selected="true"] { color: var(--void); background: var(--amber); }
.after-tabs [role="tab"]:hover:not([aria-selected="true"]) { color: var(--ink); }
.tabpanel { padding-top: clamp(40px, 5vw, 72px) !important; }
.how-gap { height: clamp(64px, 8vw, 110px); }
'''
must('</style>' in s, 'style tag')
s = s.replace('</style>', css + '</style>', 1)

js = '''<script>
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.after-tabs [role="tab"]'));
  if(!tabs.length) return;
  function show(t, focus){
    tabs.forEach(function(b){ var on=b===t; b.setAttribute('aria-selected',on); b.tabIndex=on?0:-1; document.getElementById(b.getAttribute('aria-controls')).hidden=!on; });
    if(focus) t.focus();
    window.dispatchEvent(new Event('resize'));
    if(window.Highcharts) Highcharts.charts.forEach(function(c){ if(c) c.reflow(); });
  }
  tabs.forEach(function(b,i){
    b.addEventListener('click',function(){ show(b); });
    b.addEventListener('keydown',function(e){ var k=e.key, n=null; if(k==='ArrowRight') n=tabs[(i+1)%tabs.length]; if(k==='ArrowLeft') n=tabs[(i-1+tabs.length)%tabs.length]; if(k==='Home') n=tabs[0]; if(k==='End') n=tabs[tabs.length-1]; if(n){ e.preventDefault(); show(n,true);} });
  });
  function fromHash(){
    var id=(location.hash||'').slice(1); if(!id) return;
    var el=document.getElementById(id); if(!el) return;
    var panel=el.closest('.tabpanel'); if(panel){ var t=document.querySelector('[aria-controls="'+panel.id+'"]'); if(t) show(t); }
    var d=el.closest('details'); if(d) d.open=true;
  }
  fromHash(); window.addEventListener('hashchange',fromHash);
  document.addEventListener('keydown',function(e){ if((e.key==='p'||e.key==='P')&&!e.metaKey&&!e.ctrlKey){ var t=document.getElementById('t-charts'); if(t&&t.getAttribute('aria-selected')!=='true') show(t); } }, true);
})();
</script>
</body>'''
s = s.replace('</body>', js, 1)
open(f, 'w').write(s)
print('ok roles', n_roles, 'platforms', n_plat)
