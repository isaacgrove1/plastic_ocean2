// SCROLL ANIMATION source https://www.youtube.com/watch?v=T33NN_pPeNI

// Observer for viewfinder intersecting elements
// Define observer
const second_observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // change the class of element to 'show' if screen is intersecting with element
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    })
})

// Run the observer for classes with 'hidden'
const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => second_observer.observe(el));