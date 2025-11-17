// Get the hamburger button and the navigation menu
const hamburgerButton = document.getElementById('hamburger-button');
const navMenu = document.getElementById('nav-menu');

// Add a click event listener to the hamburger button
hamburgerButton.addEventListener('click', () => {
    // Toggle the 'active' class on both the button and the menu
    hamburgerButton.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close nav menu when a link is clicked (for mobile)
document.querySelectorAll('#nav-menu ul li a').forEach(item => {
    item.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            hamburgerButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});


// Scroll Animation Logic (Fade In Sections)
const sections = document.querySelectorAll('.fade-in-section');

const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


// Current Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();


// Statistics Counting Animation for About Page
const statsObserverOptions = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: "0px"
};

const countUp = (element, target) => {
    let startTime = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Add '+' for specific targets
            element.textContent = target + (target === 10 || target === 700 || target === 5 ? '+' : '');
        }
    };

    requestAnimationFrame(animate);
};



const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                // Reset text to 0 before starting to handle re-scrolling if ever needed
                stat.textContent = '0'; 
                countUp(stat, target);
            });
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, statsObserverOptions);

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
    statsObserver.observe(statsBar);
}


// =================================================================
//    WhatsApp Redirect for Service Cards
// =================================================================
document.addEventListener('DOMContentLoaded', function() {
    const whatsAppLinks = document.querySelectorAll('.whatsapp-link');
    const phoneNumber = '254702195761'; // Your WhatsApp number in international format

    whatsAppLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the link from navigating to "#"

            const serviceName = this.getAttribute('data-service');
            const message = `Hey there 👋👋👋, I was wishing to know more of the ${serviceName} service I learned about from your website. Would you please enlighten me on that?`;

            // This encodes the message so it can be used in a URL
            const encodedMessage = encodeURIComponent(message);

            // This is the standard format for WhatsApp click-to-chat links
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Opens the WhatsApp link in a new tab
            window.open(whatsappUrl, '_blank');
        });
    });
});