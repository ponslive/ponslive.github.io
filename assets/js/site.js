(function () {
  var d = document.documentElement;
  d.classList.add('js');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) d.classList.add('reduced');

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var nav = document.querySelector('.nav');
    var btn = document.querySelector('.menu-btn');
    if (nav && btn) {
      var setOpen = function (open) {
        nav.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      btn.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    }
    if (nav) {
      var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }

    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var rv = document.querySelectorAll('.rv');
    if (reduced || !('IntersectionObserver' in window)) { rv.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
  });
})();
