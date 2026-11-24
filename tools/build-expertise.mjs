// Generates expertise.html from assets/data/profile.js. Run: node tools/build-expertise.mjs
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url).pathname;
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(root + 'assets/data/profile.js', 'utf8'), ctx);
const P = ctx.window.PROFILE;
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Calendar years each domain appears in an active role's stack (derived, not estimated).
const years = {};
const now = new Date().getFullYear();
for (const r of P.roles) {
  const a = +r.start.slice(0, 4), b = r.end ? +r.end.slice(0, 4) : now;
  for (const t of r.stack) {
    const d = P.techDomain[t]; if (!d) continue;
    years[d] ??= new Set();
    for (let y = a; y <= b; y++) years[d].add(y);
  }
}
for (const p of P.platforms) {
  const a = +p.start.slice(0, 4), b = p.end ? +p.end.slice(0, 4) : now;
  for (const t of p.stack) {
    const d = P.techDomain[t]; if (!d) continue;
    years[d] ??= new Set();
    for (let y = a; y <= b; y++) years[d].add(y);
  }
}
const leadershipYears = new Set();
for (const r of P.roles) if (/lead|manager|owner|principal|distinguished|architect/i.test(r.title + ' ' + (r.focus || ''))) {
  const a = +r.start.slice(0, 4), b = r.end ? +r.end.slice(0, 4) : now;
  for (let y = a; y <= b; y++) leadershipYears.add(y);
}
years.leadership = leadershipYears;

// Where each domain shows up: platforms whose stack touches it.
const shows = (id) => P.platforms.filter((p) => p.stack.some((t) => P.techDomain[t] === id) || (id === 'leadership'))
  .map((p) => `<li><a href="career.html#${p.id}">${esc(p.short || p.name)}</a></li>`).join('');

const plate = { telecom: 'assets/img/eras/network.jpg', cloud: 'assets/img/eras/intelligence.jpg', ai: 'assets/img/platforms/aiplat.jpg', frontend: 'assets/img/eras/interfaces.jpg', leadership: 'assets/img/eras/enterprise.jpg' };
const alt = { telecom: 'A cellular tower at blue hour with amber radio rings', cloud: 'A glowing core in a dark data hall', ai: 'An AI form reading a device dashboard', frontend: 'Floating interface screens in a dark studio', leadership: 'An office campus at night' };
const [h1a, h1b] = { telecom: ['Telecom &amp;', 'standards'], cloud: ['Cloud &amp;', 'data'], ai: ['AI &amp;', 'analytics'], frontend: ['Frontend &amp;', 'product'], leadership: ['Product &amp;', 'leadership'] }.telecom && [null, null];
const split = (name) => { const i = name.lastIndexOf(' '); return [esc(name.slice(0, i)), esc(name.slice(i + 1))]; };

const strip = P.domains.map((d) => {
  const n = years[d.id] ? years[d.id].size : 0;
  return `<li style="--c:${d.color}"><a href="#d-${d.id}"><span class="gl-n num">${n}</span><span class="gl-u">years</span><span class="gl-name">${esc(d.name)}</span></a></li>`;
}).join('');

const panels = P.domains.map((d, i) => {
  const [a, b] = split(d.name);
  const n = years[d.id] ? years[d.id].size : 0;
  const tags = d.tags.map((t) => `<li class="chip">${esc(t)}</li>`).join('');
  return `
  <section class="dom-panel" id="d-${d.id}" style="--c:${d.color}" aria-labelledby="dh-${d.id}" data-i="${i}">
   <div class="dp-sticky">
    <div class="dp-plate" aria-hidden="true"><img src="${plate[d.id]}" alt="" loading="${i ? 'lazy' : 'eager'}"></div>
    <span class="dp-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
    <div class="wrap dp-in">
      <p class="mono dp-k"><span class="dp-dot" aria-hidden="true"></span>${String(i + 1).padStart(2, '0')} · ${n} years practised</p>
      <h2 class="display dp-h" id="dh-${d.id}">${a} <span class="serif">${b}</span></h2>
      <p class="dp-body">${esc(d.body)}</p>
      <ul class="chips dp-tags" aria-label="${esc(d.name)} skills">${tags}</ul>
      <div class="dp-shows"><span class="mono">Shows up in</span><ul>${shows(d.id)}</ul></div>
    </div>
   </div>
  </section>`;
}).join('\n');

const std = P.standards.map((s) => `<li>${esc(s)}</li>`).join('');
const pr = P.principles.map((p) => { const [x, y] = split(p.name); return `<li class="rv"><p class="pr-t">${x} <span class="serif">${y}</span></p><p>${esc(p.body)}</p></li>`; }).join('');
const sig = P.signature;

const navSrc = fs.readFileSync(root + 'career.html', 'utf8');
const nav = navSrc.match(/<header class="nav"[\s\S]*?<\/header>/)[0].replace(/ aria-current="page"/g, '');
const foot = navSrc.match(/<footer class="foot">[\s\S]*?<\/footer>/)[0];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Expertise · Ponmudi Pandiyan</title>
<meta name="description" content="Technical expertise of Ponmudi Pandiyan: AI-native engineering with Claude Code, telecom standards, cloud and data, AI and analytics, frontend and product, and product leadership.">
<meta name="theme-color" content="#050403">
<link rel="canonical" href="https://ponslive.github.io/expertise.html">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ponmudi Pandiyan">
<meta property="og:title" content="Expertise · Ponmudi Pandiyan">
<meta property="og:description" content="AI-native engineering, telecom standards, cloud and data, AI and analytics, frontend and product, and product leadership.">
<meta property="og:url" content="https://ponslive.github.io/expertise.html">
<meta property="og:image" content="https://ponslive.github.io/assets/img/og-card.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="assets/fonts/instrument-sans-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-serif-italic-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/system.css">
<script src="assets/js/site.js"></script>
<style>
.x-hero { display: flex; align-items: center; padding: calc(var(--nav-h) + clamp(40px, 7vh, 90px)) 0 clamp(48px, 7vh, 88px); position: relative; overflow: hidden; }
.x-hero .wrap { position: relative; }
.x-orbit { position: absolute; right: clamp(-80px, -3vw, 0px); top: calc(var(--nav-h) + 10px); width: min(42vw, 560px); aspect-ratio: 1; pointer-events: none; z-index: -1; }
.x-orbit svg { width: 100%; height: 100%; overflow: visible; }
.x-orbit .ring { fill: none; stroke: var(--line-2); stroke-width: 1; }
.x-orbit .dot { transform-box: fill-box; transform-origin: center; }
.fx .x-orbit .spin { transform-origin: 300px 300px; animation: x-spin 60s linear infinite; }
.fx .x-orbit .spin.r2 { animation-duration: 90s; animation-direction: reverse; }
.fx .x-orbit .spin.r3 { animation-duration: 120s; }
@keyframes x-spin { to { transform: rotate(360deg); } }
.x-orbit .core { fill: url(#xcore); }
@media (max-width: 860px) { .x-orbit { width: 86vw; right: -34vw; top: calc(var(--nav-h) + 20px); opacity: .5; } }
.x-hero::before { content: ''; position: absolute; inset: 0; z-index: -1; background: radial-gradient(60% 70% at 78% 40%, rgba(255,138,42,.22), transparent 70%), radial-gradient(40% 50% at 90% 85%, rgba(127,180,255,.12), transparent 70%); }
.x-hero .lede { margin-top: 26px; max-width: 52ch; }
.glance { list-style: none; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: clamp(40px, 6vh, 72px); border-top: 1px solid var(--line-2); }
.glance li { border-right: 1px solid var(--line); }
.glance li:last-child { border-right: 0; }
.glance a { display: grid; grid-template-columns: auto 1fr; align-items: baseline; column-gap: 8px; padding: 22px 18px 8px 0; text-decoration: none; }
.glance li + li a { padding-left: 18px; }
.gl-n { font-size: clamp(2.6rem, 5vw, 4.4rem); font-weight: 640; letter-spacing: -.045em; line-height: 1; color: var(--c); }
.gl-u { color: var(--ink-3); font: 500 .8rem/1 var(--mono); }
.gl-name { grid-column: 1 / -1; margin-top: 12px; color: var(--ink-2); font-size: .95rem; }
.glance a:hover .gl-name { color: var(--ink); }
.glance-cap { margin-top: 14px; color: var(--ink-3); }
@media (max-width: 860px) { .glance { grid-template-columns: repeat(2, 1fr); } .glance li { border-bottom: 1px solid var(--line); } .glance li:nth-child(2n) { border-right: 0; } .glance li + li a { padding-left: 0; } .glance li:nth-child(2n) a { padding-left: 18px; } }

.sig-band { padding-block: clamp(32px, 5vw, 72px) clamp(80px, 10vw, 140px); }
.sig-card { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: center; padding: clamp(32px, 5vw, 64px); border-radius: 32px; border: 1px solid rgba(255,138,42,.45); background: radial-gradient(80% 120% at 100% 0%, rgba(255,138,42,.2), transparent 60%), var(--deep); position: relative; overflow: hidden; }
.sig-k { display: flex; align-items: center; gap: 10px; color: var(--amber-hi); }
.sig-k i { width: 9px; height: 9px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 5px rgba(255,138,42,.18); }
.sig-card h2 { margin-top: 18px; }
.sig-card .body { margin-top: 18px; font-size: 1.15rem; }
.sig-tags { list-style: none; display: grid; gap: 0; border-top: 1px solid rgba(255,138,42,.3); }
.sig-tags li { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(255,138,42,.18); font-size: 1.1rem; color: var(--ink); }
.sig-tags li::before { content: ''; width: 18px; height: 1px; background: var(--amber); }
@media (max-width: 860px) { .sig-card { grid-template-columns: 1fr; } }

.dom-panel { position: relative; min-height: 100svh; display: grid; align-items: center; isolation: isolate; overflow: hidden; border-top: 1px solid var(--line); }
.dp-plate { position: absolute; inset: 0; z-index: -2; }
.dp-plate img { width: 100%; height: 100%; max-width: none; object-fit: cover; filter: brightness(.42) saturate(.85) contrast(1.05); transform: scale(1.08); }
.dom-panel::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, var(--void) 0%, rgba(5,4,3,.92) 38%, rgba(5,4,3,.45) 70%, rgba(5,4,3,.25) 100%), linear-gradient(to top, var(--void), transparent 30%); }
.dp-in { padding-block: clamp(96px, 14vh, 160px); max-width: var(--max); }
.dp-in > * { max-width: 640px; }
.dp-k { display: flex; align-items: center; gap: 10px; color: var(--ink-2); }
.dp-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 22%, transparent); }
.dp-h { margin-top: 18px; font-size: clamp(3rem, 7vw, 5.6rem); }
.dp-h .serif { color: var(--c); }
.dp-body { margin-top: 24px; font-size: 1.15rem; line-height: 1.65; color: var(--ink-2); }
.dp-tags { margin-top: 28px; }
.dp-tags .chip { background: rgba(5,4,3,.55); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.dp-shows { margin-top: 30px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 18px; padding-top: 18px; border-top: 1px solid var(--line-2); }
.dp-shows .mono { color: var(--ink-3); }
.dp-shows ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 18px; }
.dp-shows a { color: var(--ink); text-decoration-color: color-mix(in srgb, var(--c) 60%, transparent); }

.std-band { padding-block: clamp(96px, 12vw, 180px); }
.std-list { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); margin-top: clamp(40px, 5vw, 64px); border-top: 1px solid var(--line); }
.std-list li { padding: 20px 0; border-bottom: 1px solid var(--line); font: 500 .95rem/1.4 var(--mono); color: var(--ink); }
@media (max-width: 760px) { .std-list { grid-template-columns: 1fr 1fr; } }
.pr { list-style: none; display: grid; gap: clamp(40px, 6vw, 72px); margin-top: clamp(48px, 6vw, 80px); }
.pr li { display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(24px, 5vw, 80px); align-items: baseline; padding-top: clamp(24px, 3vw, 40px); border-top: 1px solid var(--line); }
.pr-t { font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 640; letter-spacing: -.04em; line-height: 1; }
.pr-t .serif { color: var(--amber-hi); }
.pr li p:last-child { color: var(--ink-2); font-size: 1.1rem; line-height: 1.65; }
@media (max-width: 760px) { .pr li { grid-template-columns: 1fr; } }
.x-close { padding-block: clamp(80px, 10vw, 140px); border-top: 1px solid var(--line); }
.x-close .row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }

/* 3D scroll: each domain pins, its photo pushes in, content tilts out of depth, chips fly in */
.fx .dom-panel { min-height: 0; height: 200vh; display: block; overflow: visible; border-top: 0; }
.fx .dp-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; display: grid; align-items: center; isolation: isolate; perspective: 1100px; perspective-origin: 30% 50%; }
.fx .dp-sticky::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, var(--void) 0%, rgba(5,4,3,.92) 38%, rgba(5,4,3,.45) 70%, rgba(5,4,3,.25) 100%), linear-gradient(to top, var(--void), transparent 30%); }
.fx .dom-panel::after { display: none; }
.fx .dp-sticky .dp-plate { will-change: transform; }
.fx .dp-in { transform-style: preserve-3d; will-change: transform, opacity; }
.fx .dp-tags .chip { will-change: transform, opacity; }
.dp-num { position: absolute; right: clamp(16px, 5vw, 80px); bottom: clamp(16px, 6vh, 60px); font: 640 clamp(8rem, 22vw, 20rem)/0.8 var(--sans); letter-spacing: -.06em; color: transparent; -webkit-text-stroke: 1px color-mix(in srgb, var(--c) 45%, transparent); pointer-events: none; z-index: -1; will-change: transform; }
/* motion: panels reveal as they pin in */
.fx .dom-panel .dp-in > * { opacity: 0; transform: translateY(40px); filter: blur(8px); }
.fx .dom-panel.on .dp-in > * { opacity: 1; transform: none; filter: none; transition: opacity 1s var(--ease-out), transform 1.2s var(--ease-out), filter 1s var(--ease-out); }
.fx .dom-panel.on .dp-in > :nth-child(2) { transition-delay: .08s; }
.fx .dom-panel.on .dp-in > :nth-child(3) { transition-delay: .16s; }
.fx .dom-panel.on .dp-in > :nth-child(4) { transition-delay: .24s; }
.fx .dom-panel.on .dp-in > :nth-child(5) { transition-delay: .32s; }
.dom-rail { position: fixed; right: clamp(16px, 2.4vw, 36px); top: 50%; transform: translateY(-50%); z-index: 60; list-style: none; display: grid; gap: 14px; opacity: 0; pointer-events: none; transition: opacity .4s; }
.dom-rail.show { opacity: 1; pointer-events: auto; }
.dom-rail a { display: flex; align-items: center; justify-content: flex-end; gap: 10px; text-decoration: none; color: var(--ink-3); font: 500 .74rem/1 var(--mono); }
.dom-rail a i { width: 34px; height: 2px; border-radius: 2px; background: currentColor; transform: scaleX(.53); transform-origin: right center; transition: transform .4s var(--ease-out), background .3s; }
.dom-rail a span { opacity: 0; transform: translateX(6px); transition: opacity .3s, transform .4s var(--ease-out); }
.dom-rail a:hover span, .dom-rail a[aria-current="true"] span { opacity: 1; transform: none; }
.dom-rail a[aria-current="true"] { color: var(--ink); }
.dom-rail a[aria-current="true"] i { transform: scaleX(1); background: var(--c); }
@media (max-width: 860px) { .dom-rail { display: none; } }
@media (prefers-reduced-motion: reduce) { .fx .dom-panel .dp-in > * { opacity: 1; transform: none; filter: none; } .dp-plate img { transform: none !important; } }
</style>
<script>try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('fx');}catch(e){}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${nav.replace('<li><a href="expertise.html">Expertise</a></li>', '<li><a href="expertise.html" aria-current="page">Expertise</a></li>')}
<main id="main">
  <section class="x-hero" aria-labelledby="x-h">
    <div class="x-orbit" aria-hidden="true"><svg viewBox="0 0 600 600"><defs><radialGradient id="xcore"><stop offset="0" stop-color="#ffb26b" stop-opacity=".9"/><stop offset=".35" stop-color="#ff8a2a" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient></defs>
      <circle class="core" cx="300" cy="300" r="120"/>
      ${P.domains.map((d, i) => { const r = 120 + i * 36; const ang = (i * 72 + 20) * Math.PI / 180; const cls = 'spin r' + ((i % 3) + 1); return `<g class="${cls}"><circle class="ring" cx="300" cy="300" r="${r}"/><circle class="dot" cx="${(300 + r * Math.cos(ang)).toFixed(1)}" cy="${(300 + r * Math.sin(ang)).toFixed(1)}" r="7" fill="${d.color}"/><circle cx="${(300 + r * Math.cos(ang)).toFixed(1)}" cy="${(300 + r * Math.sin(ang)).toFixed(1)}" r="18" fill="${d.color}" opacity=".18"/></g>`; }).join('')}
    </svg></div>
    <div class="wrap">
      <h1 class="display rv" id="x-h">Technical depth, <span class="serif">at a glance.</span></h1>
      <p class="lede rv" style="--d:1">Twenty years of building across wireless standards, cloud and data platforms, AI and the interfaces people use every day, with AI-native engineering now running through all of it.</p>
      <ul class="glance rv" style="--d:2" aria-label="Years practised per domain">${strip}</ul>
      <p class="mono glance-cap rv" style="--d:3">Years practised, derived from the roles and platforms on this site.</p>
    </div>
  </section>

  <section class="sig-band" id="ai-native" aria-labelledby="sig-h">
    <div class="wrap">
      <div class="sig-card rv">
        <div>
          <p class="mono sig-k"><i aria-hidden="true"></i>Signature skill</p>
          <h2 class="h1" id="sig-h">AI-native <span class="serif">engineering</span></h2>
          <p class="body">${esc(sig.line)}</p>
        </div>
        <ul class="sig-tags" aria-label="AI-native engineering skills">${sig.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <ol class="dom-rail" id="domRail" aria-label="Domains">${P.domains.map((d) => `<li style="--c:${d.color}"><a href="#d-${d.id}"><span>${esc(d.name)}</span><i></i></a></li>`).join('')}</ol>
${panels}

  <section class="std-band" aria-labelledby="std-h">
    <div class="wrap">
      <h2 class="h1 rv" id="std-h">Standards worked <span class="serif">with</span>, not just read.</h2>
      <p class="body rv" style="--d:1">Compliance frameworks and industry standards applied in certification, conformance and device-management work.</p>
      <ul class="std-list rv" style="--d:2">${std}</ul>
      <h2 class="h1 rv" style="margin-top:clamp(96px,12vw,170px)">How I <span class="serif">build</span></h2>
      <ol class="pr">${pr}</ol>
    </div>
  </section>

  <section class="x-close" aria-labelledby="xc-h">
    <div class="wrap">
      <h2 class="display rv" id="xc-h">See it <span class="serif">in the work.</span></h2>
      <div class="row rv" style="--d:1">
        <a class="btn btn-primary" href="career.html">Rewind the career <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <a class="btn btn-ghost" href="personal.html">The person behind it</a>
      </div>
    </div>
  </section>
</main>

${foot}

<script src="assets/vendor/gsap.min.js"></script>
<script src="assets/vendor/ScrollTrigger.min.js"></script>
<script>
(function(){
  var panels=[].slice.call(document.querySelectorAll('.dom-panel'));
  var rail=document.getElementById('domRail'), links=rail?[].slice.call(rail.querySelectorAll('a')):[];
  var fx=document.documentElement.classList.contains('fx');
  function setCur(i){ links.forEach(function(a,k){ a.setAttribute('aria-current', k===i?'true':'false'); }); }
  if(!fx||!window.gsap){ panels.forEach(function(p){ p.classList.add('on'); }); return; }
  gsap.registerPlugin(ScrollTrigger);
  panels.forEach(function(p,i){
    p.classList.add('on');
    var img=p.querySelector('.dp-plate img'), inn=p.querySelector('.dp-in'), num=p.querySelector('.dp-num'), chips=p.querySelectorAll('.dp-tags .chip');
    ScrollTrigger.create({ trigger:p, start:'top 55%', end:'bottom 45%', onToggle:function(s){ if(s.isActive) setCur(i); } });
    var tl=gsap.timeline({ scrollTrigger:{ trigger:p, start:'top bottom', end:'bottom top', scrub:.7 } });
    tl.fromTo(img,{ scale:1.32, z:-200, rotationY:-8, filter:'brightness(.25) saturate(.7) blur(6px)' },{ scale:1.08, z:0, rotationY:0, filter:'brightness(.42) saturate(.85) blur(0px)', ease:'power2.out', duration:.42 },0)
      .fromTo(inn,{ opacity:0, z:-420, rotationX:14, rotationY:10, y:120 },{ opacity:1, z:0, rotationX:0, rotationY:0, y:0, ease:'power3.out', duration:.38 },.04)
      .fromTo(chips,{ opacity:0, z:-300, y:40, rotationX:30 },{ opacity:1, z:0, y:0, rotationX:0, stagger:.012, ease:'back.out(1.6)', duration:.22 },.2)
      .fromTo(num,{ x:220, opacity:0 },{ x:0, opacity:1, ease:'power2.out', duration:.4 },.02)
      .to({}, { duration:.24 })
      .to(inn,{ opacity:0, z:300, rotationX:-10, y:-90, ease:'power2.in', duration:.24 },'>-0.02')
      .to(img,{ scale:1.0, filter:'brightness(.18) saturate(.7) blur(4px)', ease:'power1.in', duration:.24 },'<')
      .to(num,{ x:-160, opacity:0, ease:'power1.in', duration:.24 },'<');
  });
  ScrollTrigger.create({ trigger:panels[0], endTrigger:panels[panels.length-1], start:'top 60%', end:'bottom 40%', onToggle:function(s){ rail.classList.toggle('show', s.isActive); } });
})();
</script>
</body>
</html>
`;
fs.writeFileSync(root + 'expertise.html', html);
console.log('expertise.html', html.length, 'bytes;', Object.fromEntries(Object.entries(years).map(([k, v]) => [k, v.size])));
