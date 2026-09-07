(function () {
    const consentKey = 'dav-analytics-consent';
    const banner = document.getElementById('cookie-banner');
    const settings = document.getElementById('cookie-settings');
    let storedConsent = null;
    try {
        storedConsent = localStorage.getItem(consentKey);
    } catch (error) {
        storedConsent = null;
    }

    function loadAnalytics() {
        if (document.querySelector('script[data-ga4-analytics]')) return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'G-GFJ072TDH3');

        const script = document.createElement('script');
        script.async = true;
        script.dataset.ga4Analytics = 'true';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GFJ072TDH3';
        document.head.appendChild(script);
    }

    function setConsent(value) {
        try {
            localStorage.setItem(consentKey, value);
        } catch (error) {
            // The banner still works when storage is blocked.
        }
        storedConsent = value;
        const currentBanner = document.getElementById('cookie-banner');
        const currentSettings = document.getElementById('cookie-settings');
        if (currentBanner) {
            currentBanner.hidden = true;
            currentBanner.classList.add('is-hidden');
        }
        if (currentSettings) {
            currentSettings.hidden = true;
            currentSettings.classList.add('is-hidden');
        }
        if (value === 'accepted') loadAnalytics();
    }

    function openSettings() {
        if (banner) {
            banner.hidden = true;
            banner.classList.add('is-hidden');
        }
        if (settings) {
            settings.hidden = false;
            settings.classList.remove('is-hidden');
        }
    }

    function closeSettings() {
        if (settings) {
            settings.hidden = true;
            settings.classList.add('is-hidden');
        }
        if (!storedConsent && banner) {
            banner.hidden = false;
            banner.classList.remove('is-hidden');
        }
    }

    if (storedConsent === 'accepted') loadAnalytics();
    if (!storedConsent && banner) banner.hidden = false;
    document.querySelectorAll('.cookie-accept, .cookie-accept-all').forEach(button => button.addEventListener('click', () => setConsent('accepted')));
    document.querySelectorAll('button.cookie-settings-button').forEach(button => button.addEventListener('click', openSettings));
    document.querySelectorAll('.cookie-modal-close').forEach(button => button.addEventListener('click', closeSettings));
    document.querySelectorAll('.cookie-save').forEach(button => button.addEventListener('click', () => {
        const analytics = document.querySelector('#analytics-cookies');
        setConsent(analytics && analytics.checked ? 'accepted' : 'rejected');
    }));
}());
