// Common JavaScript for header/footer inclusion and search functionality

// Function to load header and footer
function loadCommonComponents() {
    // Load header
    fetch('/includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initializeSearch();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTools(searchTerm);
        });
    }
}

// Filter tools based on search term
function filterTools(searchTerm) {
    const toolCards = document.querySelectorAll('.tool-card');
    const categories = document.querySelectorAll('.category-section');
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        const toolDescription = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Hide/show categories based on visible tools
    categories.forEach(category => {
        const visibleTools = category.querySelectorAll('.tool-card[style="display: block"], .tool-card:not([style*="display: none"])');
        if (visibleTools.length === 0 && searchTerm !== '') {
            category.style.display = 'none';
        } else {
            category.style.display = 'block';
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCommonComponents();
    initializeSmoothScrolling();
});

// Utility function to show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>';
    }
}

// Utility function to show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }
}

// Utility function to show success message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
    }
}

