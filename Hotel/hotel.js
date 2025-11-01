const slides = [
    {
        name: "Standard Ocean View",
        details: "Standard Ocean View is a room with basic facilities and is ideal for travelers who want to have a simple stay but with also breathtaking ocean views.",
        price: "Starting from $129/night",
        image: "room1.jpg"
    },
    {
        name: "Deluxe Ocean View",
        details: "Deluxe Ocean View is a room with more facilities and is ideal for travelers who want to have a luxury stay, Experience elegance ocean views combine with comfort.",
        price: "Starting from $299/night",
        image: "room2.jpg"
    },
    {
        name: "Royal Suite",
        details: "Royal Suite is a room with the most facilities and is ideal for travelers who want to have the most elegance experience, Perfect for creating cherished and precious moments with loved ones.",
        price: "Starting from $349/night",
        image: "room3.jpg"
    }
];
const slideContainer = document.querySelector(".room-slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let counter = 0;
const totalSlides = slides.length;
const displaySlide = () => {
    if(slideContainer && nextBtn && prevBtn) {
        slideContainer.style.opacity = 0;
        setTimeout(() => {
            const slide = slides[counter];
        slideContainer.innerHTML = `
            <div class="slider-img">
                <img src="${slide.image}" alt="${slide.name}">
            </div>
            <div class="slider-content">
                <h2>${slide.name}</h2>
                <p>${slide.details}</p>
                <h1>${slide.price}</h1>
                <button class="room-btn">Book Now</button>
            </div>
        `;
        slideContainer.style.opacity = 1;
        }, 300); // Reduce timeout to make transition quicker
    };
};
nextBtn.addEventListener("click", () => {
    counter++;
    if(counter > totalSlides - 1) {
        counter = 0;
    }
    displaySlide();
});
prevBtn.addEventListener("click", () => {
    counter--;
    if(counter < 0) {
        counter = totalSlides - 1;
    }
    displaySlide();
});
window.onload = displaySlide;