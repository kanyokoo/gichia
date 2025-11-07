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
    let start = 0;
    const duration = 2000; // 2 seconds
    
    // Ensure increment is at least 1 to avoid infinite loops for small numbers
    const increment = Math.max(target / (duration / 16), 1);
    
    const timer = setInterval(() => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
        } else {
            // UPDATED LOGIC: Only add '+' for 10 and 5
            element.textContent = target + (target === 10 || target === 5 ? '+' : '');
            clearInterval(timer);
        }
    }, 16); // Update every 16ms for smoother animation
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