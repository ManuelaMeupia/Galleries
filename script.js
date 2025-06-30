let Indexx = 0;
let Category = 'accueil';
let visibleImages = [];

function filtre(categorie) {
    Category = categorie;
    Indexx = 0;
    visibleImages = [];

    let images = document.querySelectorAll('.image');
    images.forEach(image => {
        if (image.classList.contains(categorie)) {
            image.classList.remove('hidden');
            visibleImages.push(image);
        } else {
            image.classList.add('hidden');
        }
    });
    
    updateCarousel();
    updatePrev();
}

function updateCarousel() {
    document.querySelectorAll('.image').forEach(img => {
        img.style.display = 'none';
        img.classList.remove('active');
    });

    if (visibleImages[Indexx]) {
        visibleImages[Indexx].style.display = 'block';
        visibleImages[Indexx].classList.add('active');
    }
}

function updatePrev() {
    const previewContainer = document.querySelector('.preview-container');
    previewContainer.innerHTML = '';

    for (let i = -2; i <= 2; i++) {
        const index = (Indexx + i + visibleImages.length) % visibleImages.length;
        const img = visibleImages[index];
        
        const prevImg = document.createElement('div');
        prevImg.className = `preview-item ${i === 0 ? 'active' : ''}`;
        prevImg.innerHTML = `<img src="${img.src}" alt="Preview">`;
        prevImg.onclick = () => {
            Indexx = index;
            updateCarousel();
            updatePrev();
        };
        
        previewContainer.appendChild(prevImg);
    }
}

function prev() {
    if (visibleImages.length === 0) return;
    Indexx = (Indexx - 1 + visibleImages.length) % visibleImages.length;
    updateCarousel();
    updatePrev();
}

function next() {
    if (visibleImages.length === 0) return;
    Indexx = (Indexx + 1) % visibleImages.length;
    updateCarousel();
    updatePrev();
}

document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.createElement('div');
    previewContainer.className = 'preview-container';
    document.querySelector('.gallery').after(previewContainer);

    filtre('accueil');
    setInterval(next, 5000);
});