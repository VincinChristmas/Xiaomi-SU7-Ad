let init = () => {
    let container = document.getElementsByClassName('jumbo-slider__container')[0],
        // We use querySelectorAll here to be safe, or just rely on the live collection carefully
        slides = document.getElementsByClassName('jumbo-slider__slide'),
        circles = document.getElementsByClassName('jumbo-slider__circle'),
        links = document.getElementsByClassName('jumbo-slider__link'),
        current = 1,
        time = 6000;

    // 1. INITIAL SETUP
    // Make sure the first slide and nav items are active on load
    slides[0].classList.add('jumbo-slider__slide--active');
    links[0].classList.add('jumbo-slider__link--active'); // Fixed index
    circles[0].classList.add('jumbo-slider__circle--filled');

    // 2. UPDATE NAVIGATION
    let updateNav = (current) => {
        // Loop through all items to remove active states
        for (let i = 0; i < slides.length; i++) {
            // Fixed class names to match standard BEM (using hyphens)
            links[i].classList.remove('jumbo-slider__link--active');
            circles[i].classList.remove('jumbo-slider__circle--filled');
        }
        
        // Add active state to the CURRENT item
        // We use current - 1 because 'current' is 1-based, but arrays are 0-based
        if(links[current - 1] && circles[current - 1]) {
             links[current - 1].classList.add('jumbo-slider__link--active');
             circles[current - 1].classList.add('jumbo-slider__circle--filled');
        }
    }

    // 3. START SLIDING
    let startSliding = () => {
        setInterval(() => {
            // A. Visual Swap
            // Since we are removing index 0, index 1 becomes the new index 0 immediately.
            // We need to be careful here. 
            // A safer way for this specific "clone" logic is to always target index 0 and 1
            
            if (slides.length > 1) {
                slides[1].classList.add('jumbo-slider__slide--active');
                slides[0].classList.remove('jumbo-slider__slide--active');
            }

            // B. DOM Surgery (The Infinite Scroll)
            // Clone the first slide (index 0)
            let firstSlide = slides[0];
            let clone = firstSlide.cloneNode(true);
            
            // Add it to the end
            container.appendChild(clone);
            
            // Remove the original first slide
            container.removeChild(firstSlide);

            // C. Update Counter
            // Since we moved the slide, the 'current' index effectively stays the same visually,
            // but logically we want to advance the counter for the Nav dots.
            
            if (current < slides.length) {
                current++;
            } else {
                current = 1;
            }
            
            updateNav(current);

        }, time);
    }

    startSliding();
}

init();