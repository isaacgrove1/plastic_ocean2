// Define which element will be animated
const image = document.getElementById("dolphin_top");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // If the element is in the viewport
    if (entry.isIntersecting) {
      // Start the animation
      animation.play();
    } else {
      // Pause the animation
      animation.pause();
    }
  });
});

// Observe the target element
observer.observe(image);

// animate the dolphin moving
let animation = anime({
    targets: image,
    rotate: 140,
    translateY: -300,
    duration: 1000,
    easing: 'easeInQuad',
    delay: 2000,
    opacity: 0,
  });    

