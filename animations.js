document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".scroll-card, .bento-card");
  if (cards.length === 0) return;

  const animateCounter = (counterElement) => {
    const target = parseFloat(counterElement.getAttribute('data-target'));
    const suffix = counterElement.getAttribute('data-suffix') || '';
    const decimals = parseInt(counterElement.getAttribute('data-decimals')) || 0;
    const duration = 2000; 
    const frameDuration = 1000 / 60; 
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const count = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = target * Math.pow(progress, 3); // cubic ease out

      if (frame === totalFrames) {
        clearInterval(count);
        counterElement.innerText = target.toFixed(decimals) + suffix;
      } else {
        counterElement.innerText = current.toFixed(decimals) + suffix;
      }
    }, frameDuration);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("entered")) {
          entry.target.classList.add("entered");
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => animateCounter(counter));
        }
      } else {
        entry.target.classList.remove("entered");
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const suffix = counter.getAttribute('data-suffix') || '';
          const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
          counter.innerText = (0).toFixed(decimals) + suffix;
        });
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});
