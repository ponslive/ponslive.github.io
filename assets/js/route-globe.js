// Dot-matrix globe with animated great-circle flights. Usage: mountRouteGlobe(el, {cities, legs})
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const R = 1;
const DEG = Math.PI / 180;
// lon 0 faces +z, east is +x, north is +y.
const toVec = (lat, lon, r = R) => {
  const la = lat * DEG, lo = lon * DEG;
  return new THREE.Vector3(r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo));
};
const toLatLon = (x, y, z) => [Math.asin(Math.max(-1, Math.min(1, y))) / DEG, Math.atan2(x, z) / DEG];

// Ray-casting point-in-polygon on lon/lat rings.
function inRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function landTest(geo) {
  const polys = [];
  for (const f of geo.features || [geo]) {
    const g = f.geometry || f;
    const list = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const p of list) {
      let minX = 999, minY = 999, maxX = -999, maxY = -999;
      for (const [x, y] of p[0]) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      polys.push({ p, minX, minY, maxX, maxY });
    }
  }
  return (lon, lat) => {
    for (const q of polys) {
      if (lon < q.minX || lon > q.maxX || lat < q.minY || lat > q.maxY) continue;
      if (inRing(lon, lat, q.p[0])) {
        let hole = false;
        for (let h = 1; h < q.p.length; h++) if (inRing(lon, lat, q.p[h])) { hole = true; break; }
        if (!hole) return true;
      }
    }
    return false;
  };
}

export async function mountRouteGlobe(host, { cities, legs, onLeg }) {
  const mobile = innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.35, 4.2);
  const globe = new THREE.Group();
  scene.add(globe);

  // Land as an even grid of dots (sunflower spiral = no pole clumping).
  const [topo, { feature }] = await Promise.all([
    fetch('assets/data/land-110m.json').then((r) => r.json()),
    import('./topojson-shim.js'),
  ]);
  const isLand = landTest(feature(topo, topo.objects.land));
  const N = mobile ? 26000 : 52000, pos = [], col = [];
  const amber = new THREE.Color('#e8a066'), dim = new THREE.Color('#4a3a2e');
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963229728653;
    const x = Math.cos(th) * rr, z = Math.sin(th) * rr;
    const [lat, lonN] = toLatLon(x, y, z);
    if (!isLand(lonN, lat)) continue;
    pos.push(x * 1.001, y * 1.001, z * 1.001);
    const c = dim.clone().lerp(amber, 0.25 + Math.random() * 0.25);
    col.push(c.r, c.g, c.b);
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const dotMat = new THREE.PointsMaterial({ size: mobile ? 0.012 : 0.0095, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true });
  globe.add(new THREE.Points(dotGeo, dotMat));

  // Dark core + fresnel atmosphere.
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x07060a })));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 64, 64), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.NormalBlending,
    uniforms: { c: { value: new THREE.Color('#ff8a2a') } },
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'uniform vec3 c; varying vec3 vN; void main(){ float i = pow(clamp(0.62 - dot(vN, vec3(0.,0.,1.)), 0., 1.), 4.0); gl_FragColor = vec4(c, i * 0.55); }',
  }));
  scene.add(atmo);

  // Cities.
  const cityMeshes = {};
  for (const c of cities) {
    const p = toVec(c.lat, c.lon, R * 1.004);
    const g = new THREE.Group(); g.position.copy(p); g.lookAt(p.clone().multiplyScalar(2));
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.014, 24), new THREE.MeshBasicMaterial({ color: 0xffe2c4, transparent: true, depthWrite: false }));
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.028, 40), new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.0, depthWrite: false, side: THREE.DoubleSide }));
    g.add(core, ring); globe.add(g);
    cityMeshes[c.id] = { g, core, ring, p };
  }

  // Great-circle arcs that lift off the surface, drawn progressively.
  const arcs = legs.map((l) => {
    const a = cityMeshes[l.from].p.clone().normalize(), b = cityMeshes[l.to].p.clone().normalize();
    const ang = a.angleTo(b), lift = Math.min(0.32, 0.05 + ang * 0.16), pts = [];
    const S = 160;
    for (let i = 0; i <= S; i++) {
      const t = i / S, v = new THREE.Vector3().copy(a).lerp(b, t).normalize();
      // slerp-like: use proper spherical interpolation for long legs
      const q = new THREE.Quaternion().setFromUnitVectors(a, b); const qi = new THREE.Quaternion().slerp(q, t);
      v.copy(a).applyQuaternion(qi);
      pts.push(v.multiplyScalar(R * 1.004 + Math.sin(Math.PI * t) * lift));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 220, mobile ? 0.0045 : 0.0035, 8, false);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffb26b, transparent: true, opacity: 0.95, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat); geo.setDrawRange(0, 0); globe.add(mesh);
    const ghost = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.0016, 6, false), new THREE.MeshBasicMaterial({ color: 0x7fb4ff, transparent: true, opacity: 0.22, depthWrite: false }));
    globe.add(ghost);
    const comet = new THREE.Mesh(new THREE.SphereGeometry(mobile ? 0.016 : 0.013, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    comet.visible = false; globe.add(comet);
    return { l, curve, mesh, geo, count: geo.index.count, comet };
  });

  // Post: bloom so arcs and cities glow.
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.4, 0.62);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  function resize() {
    const w = host.clientWidth, h = host.clientHeight || w * 0.6;
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
    camera.aspect = w / h; camera.position.z = w / h < 1 ? 6.2 : 5.0; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  // Orientation that brings a lon/lat to face the camera.
  const qFrom = (lat, lon) => new THREE.Quaternion().setFromEuler(new THREE.Euler(lat * DEG * 0.6, -lon * DEG, 0, 'XYZ'));

  // progress 0..1 is driven by scroll; each leg owns an equal slice.
  let progress = 0, target = 0, visible = true, raf = 0, t0 = performance.now();
  const L = arcs.length;
  function apply(p) {
    const seg = Math.min(L - 1, Math.floor(p * L)), local = Math.min(1, p * L - seg);
    arcs.forEach((a, i) => {
      const k = i < seg ? 1 : i > seg ? 0 : Math.min(1, local * 1.25);
      a.geo.setDrawRange(0, Math.floor(a.count * k));
      // completed legs fade so the long intercontinental arc doesn't spike up once the camera has moved on
      a.mesh.material.opacity = i < seg ? Math.max(0.12, 0.95 - (seg - i) * 0.6 - (i === seg - 1 ? local * 0.5 : 0)) : 0.95;
      a.comet.visible = i === seg && k > 0 && k < 1;
      if (a.comet.visible) a.comet.position.copy(a.curve.getPointAt(k));
    });
    // camera follows the active leg's midpoint
    const a = arcs[seg].l, from = cities.find((c) => c.id === a.from), to = cities.find((c) => c.id === a.to);
    const e = local < 0.5 ? 0 : (local - 0.5) * 2;
    const q = qFrom(from.lat, from.lon).slerp(qFrom(to.lat, to.lon), Math.min(1, local * 1.1));
    globe.quaternion.slerp(q, 0.08);
    for (const c of cities) {
      const m = cityMeshes[c.id], on = legs.slice(0, seg + 1).some((x) => x.from === c.id || x.to === c.id);
      m.core.material.opacity = on ? 1 : 0.35;
    }
    if (onLeg) onLeg(seg, local, e);
  }
  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!visible) return;
    progress += (target - progress) * 0.08;
    apply(progress);
    const s = (now - t0) / 1000;
    for (const id in cityMeshes) { const r = cityMeshes[id].ring; const k = (s * 0.6 + id.length * 0.13) % 1; r.scale.setScalar(1 + k * 2.4); r.material.opacity = (1 - k) * 0.85; }
    composer.render();
  }
  globe.quaternion.copy(qFrom(cities[0].lat, cities[0].lon));
  raf = requestAnimationFrame(tick);
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { rootMargin: '200px' }).observe(host);
  addEventListener('pagehide', () => { cancelAnimationFrame(raf); renderer.dispose(); });
  return { setProgress(p) { target = Math.max(0, Math.min(0.9999, p)); } };
}
