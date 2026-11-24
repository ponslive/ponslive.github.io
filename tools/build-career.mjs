// Composes career.html from profile.js + reusable markup in journey.html / platforms.html.
import fs from 'node:fs';
import vm from 'node:vm';
const ROOT = '/Users/pandipo/Documents/workspace-1/personal-website/';
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(ROOT + 'assets/data/profile.js', 'utf8'), ctx);
const P = ctx.window.PROFILE;
const J = fs.readFileSync(ROOT + 'journey.html', 'utf8');
const W = fs.readFileSync(ROOT + 'platforms.html', 'utf8');
const T = fs.readFileSync(ROOT + 'assets/partials/_template.html', 'utf8');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const between = (s, a, b, from = 0) => { const i = s.indexOf(a, from); if (i < 0) throw new Error('missing ' + a); const j = s.indexOf(b, i + a.length); if (j < 0) throw new Error('missing ' + b); return s.slice(i + a.length, j); };
const accent = s => { const w = s.trim().split(/\s+/); let last = w.pop(); if (last.replace(/\W/g, '').length < 6 && w.length > 2) last = w.pop() + ' ' + last; return esc(w.join(' ')) + ' <span class="serif">' + esc(last) + '</span>'; };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = s => { if (!s) return 'now'; const [y, m] = s.split('-'); return MON[+m - 1] + ' ' + y; };

/* ---------- CSS ---------- */
let rewindCSS = between(J, '<style>\n', '</style>');
rewindCSS = rewindCSS
  .replace(/\.variant[^\n]*\n/g, '').replace(/\.close \.variant[^\n]*\n/g, '')
  .replace(/\.preview-badge[\s\S]*$/, '')
  .replace(/  \.variant \{[^\n]*\n/g, '')
  .replace('.era { position: relative; height: 190vh; }', '.era { position: relative; }\n.era-stage { position: relative; height: 165vh; }')
  .replace('.static .era { height: auto; }', '.static .era-stage { height: auto; }')
  .replace('.fx .intro-copy, .fx .era-copy, .fx .origin .wrap, .fx .close .wrap { opacity: 0; }', '.fx .intro-copy, .fx .era-copy { opacity: 0; }');
let workCSS = between(W, '/* PLATFORM CHAPTERS — Personal\'s photo panel + sticky pull story */', '/* Close */');
workCSS = workCSS.replace(/\.fx\b/g, '.steps').replace('.steps h3 {', '.steps h4 {');
const pageCSS = `
/* Era work — solid ground so the stage reads only in the pinned moments */
.era-work { position: relative; z-index: 2; background: var(--void); }
.era-work::before { content: ''; position: absolute; left: 0; right: 0; bottom: 100%; height: 30vh; pointer-events: none; background: linear-gradient(to top, var(--void), rgba(5,4,3,0)); }
.era-work > .wrap:first-child { padding-top: clamp(56px, 8vw, 110px); }
.era-work .ch { padding-block: clamp(64px, 9vw, 130px); }
.era-work .ch:last-child { padding-bottom: clamp(80px, 11vw, 160px); }
.roles { display: grid; grid-template-columns: minmax(0, 15rem) minmax(0, 1fr); gap: 24px clamp(28px, 4vw, 64px); align-items: start; }
.roles-k { color: var(--amber-hi); padding-top: 22px; }
.role-list { list-style: none; border-top: 1px solid var(--line); }
.role-list > li { display: grid; grid-template-columns: 11rem minmax(0, 1fr) minmax(0, 1fr); gap: 8px 32px; align-items: baseline; padding-block: 20px; border-bottom: 1px solid var(--line); }
.role-list .yr { color: var(--ink-3); }
.role-list h3 { font-size: 1.12rem; font-weight: 600; letter-spacing: -.015em; line-height: 1.3; }
.role-list p { color: var(--ink-2); font-size: .98rem; }
.role-list .where { display: inline-flex; align-items: center; gap: 6px; color: var(--ink-3); font: 500 .76rem/1.2 var(--mono); margin-top: 6px; }
.role-list .where svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.6; }
.role-list .pts { grid-column: 2 / -1; list-style: none; display: grid; gap: 6px; margin-top: 6px; }
.role-list .pts li { position: relative; padding-left: 20px; color: var(--ink-2); font-size: .96rem; }
.role-list .pts li::before { content: ''; position: absolute; left: 0; top: .78em; width: 10px; height: 1px; background: var(--amber); }
@media (max-width: 860px) { .roles { grid-template-columns: 1fr; } .roles-k { padding-top: 0; } .role-list > li { grid-template-columns: 1fr; gap: 6px; } .role-list .pts { grid-column: auto; } }

/* Flight — the moves between continents */
.flight { margin-top: clamp(56px, 8vw, 110px); border-radius: 28px; border: 1px solid var(--line); background: radial-gradient(ellipse 70% 120% at 50% -10%, rgba(127,180,255,.08), transparent 70%), rgba(255,214,170,.012); padding: clamp(28px, 4vw, 56px) clamp(18px, 3vw, 48px); }
.flight-h { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; align-items: baseline; margin-bottom: 24px; }
.flight-h .h3 .serif { color: #a8c8ff; }
.flight svg { width: 100%; height: auto; display: block; overflow: visible; }
.flight .route { fill: none; stroke: #7fb4ff; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 4 7; opacity: .9; }
.flight .route-draw { fill: none; stroke: #a8c8ff; stroke-width: 2; stroke-linecap: round; stroke-dasharray: var(--len) var(--len); stroke-dashoffset: var(--len); transition: stroke-dashoffset 2.2s var(--ease-out); transition-delay: calc(var(--k) * .7s); }
.flight.in .route-draw { stroke-dashoffset: 0; }
.flight .city circle { fill: var(--void); stroke: #7fb4ff; stroke-width: 1.6; }
.flight .city .dot { fill: #a8c8ff; stroke: none; }
.flight .city text { fill: var(--ink); font: 600 15px var(--sans); letter-spacing: -.01em; }
.flight .city text.sub { fill: var(--ink-3); font: 500 11px var(--mono); }
.flight .leg-label { fill: #a8c8ff; font: 500 11px var(--mono); }
.flight ol { list-style: none; display: flex; flex-wrap: wrap; gap: 10px 32px; margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--line); }
.flight ol li { color: var(--ink-2); font-size: .95rem; }
.flight ol b { font: 500 .78rem/1 var(--mono); color: #a8c8ff; margin-right: 10px; }
.reduced .flight .route-draw, .static .flight .route-draw { transition: none; stroke-dashoffset: 0; }

/* Origin block in the Student era */
.origin-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; border-top: 1px solid var(--line); }
.origin-grid > div { padding: 28px 0 32px; border-bottom: 1px solid var(--line); }
.origin-grid > div + div { padding-left: clamp(20px, 3vw, 48px); border-left: 1px solid var(--line); }
.origin-grid .mono { color: var(--amber-hi); }
.origin-grid h3 { margin-top: 10px; font-size: clamp(1.4rem, 2.4vw, 2rem); font-weight: 620; letter-spacing: -.03em; line-height: 1.1; }
.origin-grid p { color: var(--ink-2); margin-top: 6px; }
@media (max-width: 760px) { .origin-grid { grid-template-columns: 1fr; } .origin-grid > div + div { padding-left: 0; border-left: 0; } }

/* Intro index */
.intro-index { margin-top: 44px; display: flex; flex-wrap: wrap; gap: 10px; list-style: none; }
.intro-index a { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 999px; border: 1px solid var(--line-2); text-decoration: none; color: var(--ink-2); font: 500 .8rem/1 var(--mono); transition: color .25s, border-color .25s, background .25s; }
.intro-index a:hover { color: var(--ink); border-color: rgba(255,138,42,.6); background: rgba(255,138,42,.06); }
.intro-index i { width: 6px; height: 6px; border-radius: 50%; background: var(--amber); }

/* Expertise + charts sit on solid ground */
.after { position: relative; z-index: 2; background: var(--void); }
.x-head a { color: var(--ink); }

/* Charts */
.c-head { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 24px 48px; align-items: end; margin-bottom: 28px; }
.c-head .h1 .serif { color: var(--amber-hi); }
.c-head p { color: var(--ink-2); margin-top: 18px; max-width: 58ch; }
.c-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: flex-end; }
.seg { display: inline-flex; padding: 4px; border-radius: 999px; border: 1px solid var(--line-2); }
.seg button { font: 500 .76rem/1 var(--mono); color: var(--ink-2); padding: 9px 13px; border-radius: 999px; transition: color .2s, background .2s; }
.seg button[aria-pressed="true"] { background: rgba(255,214,170,.09); color: var(--ink); }
.seg button:hover { color: var(--ink); }
.tool { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line-2); font: 500 .8rem/1 var(--mono); color: var(--ink-2); transition: color .2s, border-color .2s; }
.tool:hover { color: var(--ink); border-color: rgba(255,138,42,.5); }
.tool.primary { background: var(--amber); color: #140a02; border-color: transparent; }
.tool.primary:hover { background: var(--amber-hi); color: #140a02; }
.tool kbd { font: inherit; font-size: .7rem; opacity: .7; border: 1px solid currentColor; border-radius: 4px; padding: 1px 5px; }
.lanes-box { border-radius: 24px; border: 1px solid var(--line); background: rgba(255,214,170,.012); padding: 18px clamp(8px, 1.4vw, 20px) 12px; }
#lanes { height: 520px; }
.ms { list-style: none; counter-reset: ms; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 32px; margin-top: 28px; border-top: 1px solid var(--line); }
.ms li { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 4px 12px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.ms .n { grid-row: span 2; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font: 600 .72rem/1 var(--mono); color: #140a02; background: var(--amber); }
.ms .n.move { background: #7fb4ff; }
.ms b { font-weight: 600; font-size: .98rem; letter-spacing: -.01em; }
.ms b span { font: 500 .74rem/1 var(--mono); color: var(--ink-3); margin-left: 8px; }
.ms em { font-style: normal; color: var(--ink-2); font-size: .9rem; }
@media (max-width: 1000px) { .ms { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .ms { grid-template-columns: 1fr; } .c-head { grid-template-columns: 1fr; } .c-tools { justify-content: flex-start; } }
.stream-box { margin-top: clamp(64px, 8vw, 110px); }
.stream-box .h2 .serif { color: var(--amber-hi); }
.stream-box > p { color: var(--ink-2); margin: 16px 0 24px; max-width: 62ch; }
#stream { height: 460px; }
.legend { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; margin-bottom: 10px; }
.legend li { display: inline-flex; align-items: center; gap: 8px; font-size: var(--fs-small); color: var(--ink-2); }
.legend i { width: 14px; height: 10px; border-radius: 3px; display: inline-block; }
.caption { margin-top: 16px; color: var(--ink-3); font-size: var(--fs-small); max-width: 92ch; line-height: 1.55; }
.caption b { color: var(--ink-2); font-weight: 560; }
.tbl-wrap { margin-top: 28px; overflow-x: auto; }
.tbl-wrap[hidden] { display: none; }
.tbl { width: 100%; border-collapse: collapse; font-size: .92rem; }
.tbl caption { text-align: left; font: 500 .78rem/1 var(--mono); color: var(--ink-3); padding: 0 0 12px; }
.tbl th, .tbl td { text-align: left; padding: 12px 14px 12px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
.tbl th { font: 500 .74rem/1.2 var(--mono); color: var(--ink-3); letter-spacing: .03em; }
.tbl td { color: var(--ink-2); }
.tbl td:first-child { white-space: nowrap; font: 500 .8rem/1.4 var(--mono); color: var(--ink-3); }
.tbl strong { color: var(--ink); font-weight: 560; }
.tt { min-width: 260px; max-width: 360px; padding: 14px 16px; white-space: normal; font-family: var(--sans); border-radius: 14px; background: rgba(13,10,7,.92); border: 1px solid rgba(255,214,170,.16); box-shadow: 0 24px 60px -16px rgba(0,0,0,.75); }
.tt .k { font: 500 .72rem/1.2 var(--mono); color: var(--ink-3); letter-spacing: .04em; }
.tt .t { margin-top: 6px; font-size: .98rem; font-weight: 600; color: var(--ink); line-height: 1.25; }
.tt .o { margin-top: 2px; font-size: .84rem; color: var(--ink-2); }
.tt .d { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: baseline; font: 500 .76rem/1.3 var(--mono); color: var(--ink); }
.tt .d em { font-style: normal; color: var(--ink-3); }
.tt .row { display: flex; align-items: center; gap: 8px; margin-top: 6px; font-size: .84rem; color: var(--ink-2); }
.tt .row b { font: 600 .84rem/1 var(--mono); color: var(--ink); min-width: 44px; text-align: right; }
.tt .row i { width: 12px; height: 2px; border-radius: 2px; display: inline-block; }
.highcharts-tooltip-container { z-index: 120 !important; }


/* Career page: keep each pinned era inside one screen */
.era-pin { padding-top: var(--nav-h); }
.era-copy > * { max-width: min(640px, 50vw); }
.era-copy > .era-name { max-width: min(880px, 62vw); font-size: clamp(2.8rem, 6.2vw, 5.4rem); }
.era-line { font-size: clamp(1.6rem, 2.6vw, 2.4rem); }
.era-body { margin-bottom: 26px; }
.proof { gap: 18px 36px; margin-bottom: 22px; }
.proof strong { font-size: clamp(1.45rem, 2.1vw, 1.9rem); }
@media (max-height: 860px) and (min-width: 761px) { .era-pin .chips { display: none; } .era-body { font-size: 1rem; } }
html.presenting .c-head { display: none; }
@media (max-width: 760px) {
  .era-stage { height: auto; }
  .era-pin { position: relative; height: auto; min-height: 100svh; align-items: flex-end; padding: calc(var(--nav-h) + 38vh) 0 56px; }
  .era-copy > .era-name { max-width: none; font-size: clamp(2.6rem, 12vw, 3.6rem); }
  .era-copy > * { max-width: none; }
}


/* Presentation mode */
.pres-cap { display: none; }
html.presenting body > *:not(main), html.presenting main > *:not(.after), html.presenting .after > *:not(#charts) { display: none !important; }
html.presenting #stage, html.presenting .scrim, html.presenting #year, html.presenting .rail { display: none !important; }
html.presenting #charts { min-height: 100vh; padding-block: 28px; display: flex; flex-direction: column; }
html.presenting #charts .wrap { max-width: none; }
html.presenting .c-head p, html.presenting .ms, html.presenting .tbl-wrap, html.presenting .stream-box > p, html.presenting .caption { display: none; }
html.presenting .pres-cap { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin: 6px 0 22px; }
.pres-cap .mono { color: var(--amber-hi); }
.pres-cap h3 { margin-top: 8px; font-size: clamp(2.2rem, 4.6vw, 4.2rem); font-weight: 640; letter-spacing: -.04em; line-height: 1; }
.pres-cap h3 .serif { color: var(--amber-hi); }
.pres-cap p { color: var(--ink-2); max-width: 52ch; margin-top: 10px; font-size: 1.1rem; }
.pres-cap .step { font: 500 .8rem/1 var(--mono); color: var(--ink-3); white-space: nowrap; }
html.presenting #lanes { height: 58vh; }
html.presenting #stream { height: 58vh; }
html.presenting .p-lanes-off .lanes-box, html.presenting .p-stream-off .stream-box { display: none; }
html.presenting .stream-box { margin-top: 0; }

.close-c { position: relative; z-index: 2; background: var(--void); }
.close-c .display .serif { color: var(--amber-hi); }
.close-row { margin-top: 40px; display: flex; gap: 12px; flex-wrap: wrap; }
`;

/* ---------- markup pieces ---------- */
function platformArticle(id) {
  const re = new RegExp('<section class="ch section[^"]*" id="' + id + '"[\\s\\S]*?</section>');
  const m = W.match(re); if (!m) throw new Error('no platform ' + id);
  return m[0]
    .replace(/^<section class="ch section([^"]*)"/, '<article class="ch$1"')
    .replace(/<\/section>$/, '</article>')
    .replace(/\s*<div class="gl-slot" aria-hidden="true"><\/div>/, '')
    .replace(/<h2 class="pull/, '<h3 class="pull')
    .replace(/<\/h2>/, '</h3>')
    .replace(/class="fx-run"/g, 'class="steps-run"')
    .replace(/class="fx"/g, 'class="steps"')
    .replace(/<h3>([^<]*(?:&amp;[^<]*)*)<\/h3>/g, '<h4>$1</h4>');
}
const PIN = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s-4.5-4.2-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.3-4.5 7.5-4.5 7.5z"/><circle cx="8" cy="7" r="1.5"/></svg>';
function rolesBlock(era) {
  const roles = P.roles.filter(r => r.era === era.id);
  if (!roles.length) return '';
  const li = roles.map(r => '<li class="rv"><span class="mono yr">' + fmt(r.start) + ' – ' + fmt(r.end) + '</span>' +
    '<div><h3>' + esc(r.title) + '</h3><p>' + esc(r.org.replace(' · client ', ' · ')) + '</p>' + (r.location ? '<span class="where">' + PIN + esc(r.location) + '</span>' : '') + '</div>' +
    '<p>' + esc(r.focus) + '</p>' +
    (r.points && r.points.length ? '<ul class="pts">' + r.points.slice(0, 3).map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' : '') + '</li>').join('');
  return '<div class="wrap"><div class="roles"><p class="mono roles-k">Roles · ' + esc(era.years) + '</p><ol class="role-list">' + li + '</ol></div></div>';
}
function flightBlock() {
  const moves = P.milestones.filter(m => m.kind === 'move');
  const LON = { 'Chennai': 80.3, 'New York': -74, 'Burbank': -118.3, 'New Jersey': -74.4 };
  const SUB = { 'Chennai': 'Tamil Nadu, India', 'New York': 'New York, USA', 'Burbank': 'California, USA', 'New Jersey': 'USA' };
  const Wd = 1000, Hd = 260;
  const X = { 'Burbank': 90, 'New Jersey': 360, 'New York': 300, 'Chennai': 910 };
  const Y = { 'Burbank': 190, 'New Jersey': 96, 'New York': 190, 'Chennai': 190 };
  const SIDE = { 'New Jersey': 1 };
  const cities = [...new Set(moves.flatMap(m => [m.from, m.to]))];
  let paths = '', labels = '';
  moves.forEach((m, k) => {
    const x1 = X[m.from], y1 = Y[m.from], x2 = X[m.to], y2 = Y[m.to];
    const dx = x2 - x1, dist = Math.abs(dx) + Math.abs(y2 - y1), lift = Math.min(170, 40 + dist * .32);
    const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - lift;
    const d = `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
    const len = Math.round(dist * 1.35 + lift * 1.2);
    paths += `<path class="route" d="${d}"/><path class="route-draw" d="${d}" style="--len:${len};--k:${k}"/>`;
    const lx = cx, ly = (cy + (y1 + y2) / 2) / 2 - 4;
    labels += `<text class="leg-label" x="${lx}" y="${ly}" text-anchor="middle">${esc(fmt(m.date))}</text>`;
  });
  const cityG = cities.map(c => { const side = SIDE[c], tx = side ? X[c] + 18 : X[c], ty = side ? Y[c] - 2 : Y[c] + 34, an = side ? 'start' : 'middle'; return `<g class="city"><circle cx="${X[c]}" cy="${Y[c]}" r="9"/><circle class="dot" cx="${X[c]}" cy="${Y[c]}" r="3.5"/><text x="${tx}" y="${ty}" text-anchor="${an}">${esc(c)}</text><text class="sub" x="${tx}" y="${ty + 18}" text-anchor="${an}">${esc(SUB[c] || '')}</text></g>`; }).join('');
  const list = moves.map(m => `<li><b>${esc(fmt(m.date))}${m.approx ? ' (approx.)' : ''}</b>${esc(m.from)} → ${esc(m.to)} · ${esc(m.note)}</li>`).join('');
  return `<div class="wrap"><figure class="flight" id="moves" aria-labelledby="moves-h">
    <div class="flight-h"><h3 class="h3" id="moves-h">From Chennai to the <span class="serif">United States.</span></h3><span class="mono ink-3">The moves, ${esc(moves[0].date.slice(0, 4))} – ${esc(moves[moves.length - 1].date.slice(0, 4))}</span></div>
    <svg viewBox="0 0 ${Wd} ${Hd}" role="img" aria-label="Route: ${esc(moves.map(m => m.from + ' to ' + m.to).join(', '))}">${paths}${labels}${cityG}</svg>
    <ol>${list}</ol></figure></div>`;
}
function originBlock() {
  const e = P.education, s = P.school;
  return `<div class="wrap" style="padding-bottom:clamp(80px,11vw,160px)"><div class="origin-grid">
    <div class="rv"><p class="mono">${esc(e.start.slice(0, 4))} – ${esc(e.end.slice(0, 4))}</p><h3>${esc(e.degree)}</h3><p>${esc(e.school)} · ${esc(e.place)}</p></div>
    <div class="rv" style="--d:1"><p class="mono">${esc(s.years)}</p><h3>${esc(s.what)} in ${esc(s.place.split(',')[0])}</h3><p>Born and brought up in ${esc(s.place)}.</p></div>
  </div></div>`;
}
const WORK = {
  intelligence: ['aiplat', 'diag'],
  network: ['cert'],
  interfaces: ['compliance'],
  enterprise: [],
  foundations: []
};
let eras = '';
P.eras.forEach((e, i) => {
  const plats = WORK[e.id].map(platformArticle).join('\n');
  let extra = '';
  if (e.id === 'enterprise') extra = flightBlock();
  if (e.id === 'foundations') extra = originBlock();
  const workId = e.id === 'intelligence' ? ' id="work"' : '';
  eras += `
  <section class="era" id="era-${e.id}" data-i="${i}" aria-labelledby="h-${e.id}">
    <div class="era-stage"><div class="era-pin"><span class="era-ghost" aria-hidden="true">${e.from}</span><div class="era-copy">
      <h2 class="display era-name" id="h-${e.id}"><span class="mask"><span class="ln">${esc(e.name)}</span></span></h2>
      <p class="mono era-meta"><span class="bar" aria-hidden="true"></span>${esc(e.years)} · ${esc(e.area)}</p>
      <p class="h2 era-line">${accent(e.line)}</p>
      <p class="era-body">${esc(e.body)}</p>
      <ul class="proof">${e.proof.map(p => '<li><strong>' + esc(p[0]) + '</strong><span>' + esc(p[1]) + '</span></li>').join('')}</ul>
      <ul class="chips" aria-label="Technologies">${e.tags.map(t => '<li class="chip">' + esc(t) + '</li>').join('')}</ul>
    </div></div></div>
    <div class="era-work"${workId}>
${rolesBlock(e)}
${plats}
${extra}
    </div>
  </section>`;
});

let expertise = W.slice(W.indexOf('<section class="section wrap" id="expertise"'), W.indexOf('<section class="section wrap" aria-labelledby="proj-h">'));
expertise = expertise
  .replace('how it grew year by year lives on the <a href="timeline.html#expertise">timeline</a>.', 'how it grew year by year is in the <a href="#charts">charts below</a>.')
  .replace('<h2 class="h2 rv" id="w-t">', '<h2 class="h2 rv" id="w-t">');
const showsScript = between(W, '<script>\n/* Keep "Shows up in" in step with PROFILE */', '</script>');

/* ---------- head / nav / footer from template ---------- */
const head = T.slice(0, T.indexOf('<style>'))
  .replace('<title>PAGE · Ponmudi Pandiyan</title>', '<title>Career · Ponmudi Pandiyan</title>')
  .replace(/PAGE-SPECIFIC DESCRIPTION/g, 'Twenty years, rewound: the roles, platforms and places from AI and device analytics at Verizon today back to Computer Science at Karunya in 2002, with the work behind each era.')
  .replace(/PAGE · Ponmudi Pandiyan/g, 'Career · Ponmudi Pandiyan')
  .replace(/PAGE\.html/g, 'career.html')
  .replace('<!-- Only on pages that use three.js: -->\n', '')
  .replace('<script src="assets/js/site.js"></script>', '<link rel="preload" href="assets/fonts/martian-mono-var-latin.woff2" as="font" type="font/woff2" crossorigin>\n<script src="assets/js/site.js"></script>\n<script>try{if(!matchMedia(\'(prefers-reduced-motion: reduce)\').matches)document.documentElement.classList.add(\'fx\');}catch(e){}</script>');
const navEtc = T.slice(T.indexOf('<body>'), T.indexOf('<main id="main">'))
  .replace('<li><a href="career.html">Career</a></li>', '<li><a href="career.html" aria-current="page">Career</a></li>')
  .replace('<!-- set aria-current="page" on the active link -->\n', '');
const footer = T.slice(T.indexOf('<footer class="foot">'), T.indexOf('<script src="assets/data/profile.js"></script>'));

const ARROW = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const body = `
<canvas id="stage" aria-hidden="true"></canvas>
<div class="scrim" aria-hidden="true"></div>
<div id="year" aria-hidden="true">${P.eras[0].to}</div>
<nav class="rail" aria-label="Eras"><ol id="rail">${P.eras.map((e, i) => `<li><button type="button" data-i="${i}" aria-label="${esc(e.name + ', ' + e.years)}"><span class="r-yr">${i === 0 ? 'Now' : e.from}</span><span class="r-name">${esc(e.name)}</span><span class="r-mark" aria-hidden="true"></span></button></li>`).join('')}</ol></nav>

<main id="main">
  <section class="intro" id="timeline" aria-labelledby="intro-name">
    <div class="wrap">
      <div class="intro-copy">
        <h1 class="display" id="intro-name">Career, <span class="ln2 serif">rewound.</span></h1>
        <p class="lede">${esc(P.positioning)}</p>
        <ul class="intro-index" aria-label="On this page">
          <li><a href="#era-${P.eras[0].id}"><i aria-hidden="true"></i>Timeline</a></li>
          <li><a href="#work"><i aria-hidden="true"></i>Platforms</a></li>
          <li><a href="#expertise"><i aria-hidden="true"></i>Expertise</a></li>
          <li><a href="#charts"><i aria-hidden="true"></i>Charts</a></li>
        </ul>
        <div class="cue" aria-hidden="true">
          <div class="cue-line"></div>
          <div><strong>Scroll to rewind</strong><span class="mono">${P.eras[0].to} → ${P.eras[P.eras.length - 1].from}</span></div>
        </div>
      </div>
    </div>
  </section>
${eras}

  <div class="after">
${expertise}
  <section class="section" id="charts" aria-labelledby="c-h">
    <div class="wrap">
      <div class="c-head">
        <div><h2 class="h1 rv" id="c-h">Twenty years on <span class="serif">one axis.</span></h2>
        <p class="rv" style="--d:1">Where I lived, the role I played, who I built for and the platforms I owned, on one timeline. Numbered pins mark the milestones listed below.</p></div>
        <div class="c-tools rv" style="--d:2">
          <div class="seg" role="group" aria-label="Zoom">
            <button type="button" data-range="all" aria-pressed="true">All</button><button type="button" data-range="2006,2014.25">2006–14</button><button type="button" data-range="2014,2019.75">2014–19</button><button type="button" data-range="2019,now">2019–now</button>
          </div>
          <button class="tool" type="button" id="tblBtn" aria-expanded="false" aria-controls="tblWrap">Table view</button>
          <button class="tool" type="button" id="fsBtn">Fullscreen <kbd>F</kbd></button>
          <button class="tool primary" type="button" id="presBtn">Present <kbd>P</kbd></button>
        </div>
      </div>
      <div class="pres-cap" aria-live="polite"><div><p class="mono" id="pcYears"></p><h3 id="pcTitle"></h3><p id="pcLine"></p></div><span class="step" id="pcStep"></span></div>
      <div class="lanes-box rv"><div id="lanes" role="img" aria-label="Career timeline with four lanes: where I lived, role, clients and platforms, from 2002 to today, with numbered milestones"></div></div>
      <ol class="ms" id="msList"></ol>
      <div class="tbl-wrap" id="tblWrap" hidden></div>
      <div class="stream-box">
        <h3 class="h2 rv">How the focus <span class="serif">shifted.</span></h3>
        <p class="rv">The share of focus by domain, year by year, from the first role in 2006 to today.</p>
        <ul class="legend" id="streamLegend" aria-label="Domains"></ul>
        <div id="stream" role="img" aria-label="Stream graph of the share of focus by domain per year"></div>
        <p class="caption"><b>Derived, not estimated.</b> For each year, every active role and platform contributes weight in proportion to the months it was active. That weight is split evenly across its technologies, each mapped to a domain. Product-manager roles give a third of their weight to leadership and the Principal role a quarter. Each year is then normalised to 100%.</p>
      </div>
    </div>
  </section>
  </div>

  <section class="section close-c" aria-labelledby="close-h">
    <div class="wrap">
      <h2 class="display rv" id="close-h">The person <span class="serif">behind it.</span></h2>
      <div class="close-row rv" style="--d:1">
        <a class="btn btn-primary" href="personal.html">Madurai to New Jersey ${ARROW}</a>
        <a class="btn btn-ghost" href="index.html">Back to home</a>
      </div>
    </div>
  </section>
</main>
`;

const forms = between(J, '/* ───────── procedural forms ───────── */', '/* ───────── era imagery');
const SCRIPTS = fs.readFileSync('/tmp/ppfix/career-scripts.html', 'utf8').replace('/*__FORMS__*/', forms);
const html = head + '<style>\n' + rewindCSS + '\n' + workCSS + '\n' + pageCSS + '</style>\n</head>\n' + navEtc + body.trim() + '\n\n' + footer +
  '<script src="assets/data/profile.js"></script>\n<script>' + showsScript + '</script>\n' + SCRIPTS + '</body>\n</html>\n';
fs.writeFileSync(ROOT + 'career.html', html);
console.log('career.html', html.length);
