// script.js

// Wait until the DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
  // Cache references to key elements
  const rleft      = document.querySelector('.rleft');
  const sliderWrap = rleft.querySelector('.slider-wrapper');
  const slidesWrap = rleft.querySelector('.slides');
  const slides     = Array.from(slidesWrap.children);
  const prevBtn    = rleft.querySelector('.prev');
  const nextBtn    = rleft.querySelector('.next');

  let currentIndex = 0;                // Track which slide is showing
  const total      = slides.length;    // Number of slides
  const intervalMs = 5000;             // Time between auto-slides (ms)
  let autoId;                          // ID for setInterval

  // Preload background images from each slide's data attribute
  const bgImages = slides.map(s => s.dataset.bg);

  /**
   * Show the slide at index `idx`.
   * Wraps around if idx is out of bounds.
   */
  function showSlide(idx) {
    // Ensure idx wraps between 0 and total-1
    idx = (idx + total) % total;

    // Fade out the slider content
    sliderWrap.classList.remove('is-on');

    // After the fade-out transition, update background & content, then fade back in
    setTimeout(() => {
      rleft.style.backgroundImage = `url('${bgImages[idx]}')`;
      slidesWrap.style.transform  = `translateY(-${idx * 100}%)`;
      sliderWrap.classList.add('is-on');  // Fade content back in
      currentIndex = idx;
    }, 800);
  }

  // Start automatic cycling through slides
  function startAuto() {
    autoId = setInterval(() => showSlide(currentIndex + 1), intervalMs);
  }

  // Reset auto cycle (useful after manual nav)
  function resetAuto() {
    clearInterval(autoId);
    startAuto();
  }

  // Event handlers for manual navigation
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAuto();
  });
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAuto();
  });

  // 1️⃣ Slide the left panel into view once on page load
  requestAnimationFrame(() => rleft.classList.add('is-visible'));

  // 2️⃣ Once that transition ends, reveal the first testimonial slide
  rleft.addEventListener('transitionend', function onIn(e) {
    // Only run this when the panel's transform animation finishes
    if (e.propertyName !== 'transform') return;
    rleft.removeEventListener('transitionend', onIn);

    // Initialize first slide background and content
    rleft.style.backgroundImage = `url('${bgImages[0]}')`;
    slidesWrap.style.transform  = 'translateY(0)';
    sliderWrap.classList.add('is-on');

    // Begin auto-rotation
    startAuto();
  });
});
