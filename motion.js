/* Motion never delays navigation, focus, or the visitor's saved record. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer, transition;
  function observe() {
    if (observer) observer.disconnect();
    const elements = document.querySelectorAll('.station-illustration, .hanging-scene');
    if (reduced.matches) return;
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.2 });
    elements.forEach(element => observer.observe(element));
  }
  function animateTransition() {
    if (transition) transition.cancel();
    if (reduced.matches) return;
    const page = document.querySelector('#content .page');
    if (page && page.animate) transition = page.animate(
      [{ opacity: .88, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 220, easing: 'ease-out' }
    );
  }
  reduced.addEventListener?.('change', () => { if (reduced.matches) transition?.cancel(); else observe(); });
  window.villageMotion = { observe, transition: animateTransition };
})();
