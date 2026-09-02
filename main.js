// ── Scroll reveal ─────────────────────────────────────────
const srEls = document.querySelectorAll('.sr');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = (i % 4) * 80;
      setTimeout(() => e.target.classList.add('vis'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
srEls.forEach(el => io.observe(el));

// Force-reveal for screenshot tools
setTimeout(() => {
  document.querySelectorAll('.sr').forEach(el => el.classList.add('vis'));
}, 300);

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav close on link click
document.querySelectorAll('#mobile-nav a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-nav').classList.remove('open'));
});

// Contact form — placeholder submit handler
function handleForm(e) {
  e.preventDefault();
  document.querySelector('.form-wrap').innerHTML = `
    <div style="text-align:center;padding:40px 0;">
      <div style="width:56px;height:56px;background:var(--y);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:800;text-transform:uppercase;color:var(--dark);margin-bottom:10px;">Request Received</div>
      <p style="color:var(--mid);line-height:1.65;font-size:.95rem;">Thanks for reaching out — this is a placeholder confirmation. We'll be in touch shortly once the form is wired up.</p>
    </div>`;
}
