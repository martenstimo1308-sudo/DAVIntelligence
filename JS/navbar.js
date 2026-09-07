if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = document.querySelector('.hamburger i');
const main = document.querySelector('main');

if (hamburger && navLinks) hamburger.addEventListener('click', () => {
    const isOpen = !navLinks.classList.contains('active');
    navLinks.classList.toggle('active', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
    // Toggle class on main so the hero/content is pushed down when menu opens
    if (main) main.classList.toggle('menu-open');

    if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.addEventListener('keydown', (event) => {
    if (hamburger && navLinks && event.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.click();
        hamburger.focus();
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (main) main.classList.remove('menu-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menu openen');
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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!contactForm.reportValidity()) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            const status = contactForm.querySelector('.form-status');

            const trap = contactForm.querySelector('[name="_gotcha"]');
            const timestamp = Number(contactForm.querySelector('[name="_ts"]')?.value || 0);
            if ((trap && trap.value) || !timestamp || (Date.now() / 1000) - timestamp < 2) {
                status.textContent = 'Controleer je formulier en probeer het opnieuw.';
                status.className = 'form-status form-error';
                return;
            }

            if (window.grecaptcha && !window.grecaptcha.getResponse()) {
                status.textContent = 'Bevestig dat je geen robot bent.';
                status.className = 'form-status form-error';
                return;
            }
            
            submitBtn.textContent = 'Versturen...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) throw new Error('Form submission failed');

                contactForm.reset();
                status.textContent = 'Bedankt! We nemen zo snel mogelijk contact met je op.';
                status.className = 'form-status form-success';
            } catch (error) {
                status.textContent = 'Er ging iets mis. Controleer je gegevens en probeer het opnieuw.';
                status.className = 'form-status form-error';
            } finally {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
            }
        });
    }
});
