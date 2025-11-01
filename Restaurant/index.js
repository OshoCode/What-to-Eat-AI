const menuIcon = document.querySelector('.menu-icon');
const navBar = document.querySelector('.nav-bar');
const closeIcon = document.querySelector('.close-icon');

menuIcon.addEventListener('click', (e) => {
    e.preventDefault();
    navBar.style.display = 'flex';
});

closeIcon.addEventListener('click', (e) => {
    e.preventDefault();
    navBar.style.display = 'none';
});


function scrolltoElement(elementSelector, instance = 0) {
    const element = document.querySelectorAll(elementSelector);
    if (element.length > instance) {
        element[instance].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const link4 = document.getElementById('link4');
const link5 = document.getElementById('link5');
const link6 = document.getElementById('link6');
const link7 = document.getElementById('link7');
const link8 = document.getElementById('link8');
const link9 = document.getElementById('link9');
const link10 = document.getElementById('link10');

link1.addEventListener('click', () => {
    scrolltoElement('header');
});
link6.addEventListener('click', () => {
    scrolltoElement('header');
});
link2.addEventListener('click', () => {
    scrolltoElement('.about');
});
link7.addEventListener('click', () => {
    scrolltoElement('.about');
});
link3.addEventListener('click', () => {
    scrolltoElement('.menu');
});
link8.addEventListener('click', () => {
    scrolltoElement('.menu');
});
link4.addEventListener('click', () => {
    scrolltoElement('.experience');
});
link9.addEventListener('click', () => {
    scrolltoElement('.experience');
});
link5.addEventListener('click', () => {
    scrolltoElement('.reservation');
});
link10.addEventListener('click', () => {
    scrolltoElement('.reservation');
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-bar a:not(.close-icon)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBar.style.display = 'none';
    });
});






// Carousel functionality
const carouselWrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;
const slideCount = slides.length;

function updateCarousel() {
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
});

// Optional: Auto-play functionality
let autoPlayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
}, 5000); // Change slide every 5 seconds

// Pause auto-play on hover
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselWrapper.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }, 5000);
});
