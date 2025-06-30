let currentIndex = 0;
let currentCategory = 'accueil';
let visibleImages = [];

function filtre(categorie) {
    currentCategory = categorie;
    currentIndex = 0;
    visibleImages = [];

    // Masquer toutes les images
    document.querySelectorAll('.image').forEach(img => {
        img.classList.remove('active');
    });

    // Filtrer les images visibles
    document.querySelectorAll(`.image.${categorie}`).forEach(img => {
        visibleImages.push(img);
    });

    // Afficher la première image
    if (visibleImages.length > 0) {
        visibleImages[0].classList.add('active');
    }

    updatePreview();
}

function updatePreview() {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    visibleImages.forEach((img, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = `preview-item ${index === currentIndex ? 'active' : ''}`;
        previewItem.innerHTML = `<img src="${img.src}" alt="Preview">`;
        previewItem.onclick = () => {
            currentIndex = index;
            showCurrentImage();
            updatePreview();
        };
        previewContainer.appendChild(previewItem);
    });
}

function showCurrentImage() {
    visibleImages.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
    });
}

function prev() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showCurrentImage();
    updatePreview();
}

function next() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showCurrentImage();
    updatePreview();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Créer le conteneur de prévisualisation s'il n'existe pas
    if (!document.getElementById('preview-container')) {
        const container = document.createElement('div');
        container.id = 'preview-container';
        container.className = 'preview-container';
        document.body.appendChild(container);
    }
    
    filtre('accueil');
    
});