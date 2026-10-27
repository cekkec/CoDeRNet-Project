window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        if (dropdown) dropdown.classList.remove('show');
        if (button) button.classList.remove('active');
    }
});

// Copy the text of a code block (by element id) to the clipboard
function copyCode(button, elementId) {
    const codeElement = document.getElementById(elementId);
    const copyText = button.querySelector('.copy-text');

    if (!codeElement) return;

    function showCopied() {
        button.classList.add('copied');
        copyText.textContent = 'Cop';

        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    }

    // Fallback for older browsers and non-secure contexts
    function fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = codeElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopied();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeElement.textContent).then(showCopied).catch(function(err) {
            console.error('Failed to copy: ', err);
            fallbackCopy();
        });
    } else {
        fallbackCopy();
    }
}

// Copy BibTeX to clipboard
function copyBibTeX() {
    copyCode(document.querySelector('#bibtex .copy-bibtex-btn'), 'bibtex-code');
}

// Figure lightbox: open a.zoomable links in a modal instead of navigating to the image
function setupFigureZoom() {
    const modal = document.getElementById('figure-modal');
    if (!modal) return;
    const modalImg = document.createElement('img');
    modalImg.alt = '';
    modalImg.title = 'Click to toggle full resolution';
    modal.querySelector('.modal-content').appendChild(modalImg);

    function closeModal() {
        modal.classList.remove('is-active', 'is-zoomed');
        document.documentElement.classList.remove('is-clipped');
    }

    document.querySelectorAll('a.zoomable').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const img = link.querySelector('img');
            modalImg.src = link.href;
            modalImg.alt = img ? img.alt : '';
            modal.classList.add('is-active');
            document.documentElement.classList.add('is-clipped');
        });
    });

    // Click the enlarged image to toggle between fit-to-screen and full resolution
    modalImg.addEventListener('click', function() {
        modal.classList.toggle('is-zoomed');
    });

    modal.querySelectorAll('.modal-background, .modal-close').forEach(function(el) {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') closeModal();
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Click-to-enlarge for figures
    setupFigureZoom();

})
