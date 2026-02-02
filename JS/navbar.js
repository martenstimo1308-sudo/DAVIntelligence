const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = document.querySelector('.hamburger i');
const main = document.querySelector('main');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    main.classList.toggle('menu-open');

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
