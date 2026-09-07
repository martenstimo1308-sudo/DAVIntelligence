# DAV Intelligence
Repo for the company "DAV Intelligence"

## Deployment

- Gebruik GitHub Pages en zet onder **Settings > Pages** de optie **Enforce HTTPS** aan. De frontend redirect HTTP ook naar HTTPS zodra de site niet lokaal draait.
- `privacy.html`, `voorwaarden.html`, `404.html`, `sitemap.xml` en `robots.txt` zijn onderdeel van de statische deploy.
- Het contactformulier gebruikt Formspree en reCAPTCHA. De zichtbare Formspree-endpoint en reCAPTCHA-sitekey zijn publieke browserconfiguratie; geheime keys horen alleen in de Formspree/serverconfiguratie.
- Analytics gebruikt Google Analytics 4 met Measurement ID `G-GFJ072TDH3` en wordt pas na cookie-toestemming geladen.
- Controleer na deploy de sitemap-URL en meet Lighthouse/PageSpeed op de echte HTTPS-URL. De grootste lokale assets zijn `images/dashboard.png` en `images/timo.jpg`; serveer bij voorkeur WebP/AVIF-varianten via de hosting-build.

