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

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-bar a:not(.close-icon)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBar.style.display = 'none';
    });
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

link1.addEventListener('click', () => {
    scrolltoElement('header');
});
link2.addEventListener('click', () => {
    scrolltoElement('.about');
});
link3.addEventListener('click', () => {
    scrolltoElement('.features');
});
link4.addEventListener('click', () => {
    scrolltoElement('.projects');
});
link5.addEventListener('click', () => {
    scrolltoElement('.contact');
});



const themeIcon = document.getElementById('theme-icon');

themeIcon.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.innerHTML = '<i class="ri-moon-fill"></i>';
    } else {
        themeIcon.innerHTML = '<i class="ri-sun-fill"></i>';
    }
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.setItem('theme', 'dark-mode');
    }
});

// Check and apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') {
    document.body.classList.add('light-mode');
    themeIcon.innerHTML = '<i class="ri-moon-fill"></i>';
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', reveal);

// Initial reveal check
reveal();


