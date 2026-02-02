const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = document.querySelector('.hamburger i');
const main = document.querySelector('main');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
    // Toggle class on main so the hero/content is pushed down when menu opens
    if (main) main.classList.toggle('menu-open');

    const isOpen = navLinks.classList.contains('active');

    if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        main.classList.remove('menu-open');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Set timestamp for contact form honeypot protection
document.addEventListener('DOMContentLoaded', () => {
    const ts = document.getElementById('ts');
    if (ts) ts.value = Math.floor(Date.now() / 1000);

    // Reveal obfuscated email when user requests it
    const revealLinks = document.querySelectorAll('.reveal-email');
    revealLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const codes = link.getAttribute('data-codes');
            if (!codes) return;
            const chars = codes.split(',').map(c => String.fromCharCode(parseInt(c,10)));
            link.textContent = chars.join('');
            link.href = 'mailto:' + chars.join('');
        });
    });

    // Contact form loading states
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Versturen...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            
            // Reset after 3 seconds (Formspree handles the actual submission)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Bedankt! We nemen zo snel mogelijk contact met u op.';
                successMsg.style.cssText = `
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    border-radius: 5px;
                    text-align: center;
                    font-weight: 600;
                `;
                
                // Clear form
                contactForm.reset();
                
                // Add success message below form
                contactForm.appendChild(successMsg);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 5000);
            }, 3000);
        });
    }
});
