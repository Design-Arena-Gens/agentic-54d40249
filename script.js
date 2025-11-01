// Presentation Controller
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');
const progress = document.getElementById('progress');

// Initialize
function init() {
    showSlide(currentSlide);
    updateProgress();
}

// Show specific slide
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide
    slides[n].classList.add('active');

    // Update counter
    slideCounter.textContent = `${n + 1} / ${totalSlides}`;

    // Update button states
    prevBtn.disabled = n === 0;
    nextBtn.disabled = n === totalSlides - 1;

    // Update progress
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
    progress.style.width = progressPercent + '%';
}

// Next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'Home':
            e.preventDefault();
            currentSlide = 0;
            showSlide(currentSlide);
            break;
        case 'End':
            e.preventDefault();
            currentSlide = totalSlides - 1;
            showSlide(currentSlide);
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Initialize presentation
init();

// Add animation on slide change
slides.forEach((slide, index) => {
    slide.style.animation = 'none';
});

// Fullscreen toggle (optional - double click)
document.querySelector('.presentation').addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
