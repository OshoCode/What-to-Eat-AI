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

link1.addEventListener('click', () => {
    scrolltoElement('header');
});
link2.addEventListener('click', () => {
    scrolltoElement('.features-text');
});
link3.addEventListener('click', () => {
    scrolltoElement('.pricing-text');
});
link4.addEventListener('click', () => {
    scrolltoElement('.foot-column1');
});