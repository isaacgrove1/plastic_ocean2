// SOURCE OF THIS CODE IS https://codepen.io/akhijannat/pen/JjYQgNK up to line 26

const counters = document.querySelectorAll('.value');
// define how quick the counting happens
const speed = 400;

// defining variables
const startAnimation = (counter) => {
  const target_val = +counter.getAttribute('akhi');
  const temp_data = +counter.dataset.current || 0;
  const time_take = target_val / speed;

// count up until target val is reached
  if (temp_data < target_val) {
    const increment = Math.ceil(time_take);
    counter.dataset.current = temp_data + increment;
    // appending the text
    counter.innerText = (temp_data + increment).toLocaleString();
    setTimeout(() => startAnimation(counter), 1);
  } 
  
  // keep targetval as the text once it is reached
  else {
    counter.innerText = target_val.toLocaleString();
  }
};

// use observer to ensure animation starts only when it is in view
// I used the same principle of the observer from here https://www.youtube.com/watch?v=T33NN_pPeNI and chatGPT to debug the code in order to adapt to this purpose
const scroll_in_view = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      startAnimation(counter);
      scroll_in_view.unobserve(counter); // Stop observing once animation starts
    }
  });
});

// run
counters.forEach((counter) => {
  scroll_in_view.observe(counter);
});
