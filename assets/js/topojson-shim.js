// ES-module wrapper around the vendored classic topojson-client build.
let ready;
function load() {
  if (window.topojson) return Promise.resolve(window.topojson);
  return ready || (ready = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'assets/vendor/topojson-client.min.js';
    s.onload = () => res(window.topojson); s.onerror = rej;
    document.head.appendChild(s);
  }));
}
const tj = await load();
export const feature = tj.feature;
