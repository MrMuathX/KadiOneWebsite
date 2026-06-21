# Kadi One Construction — Website

A professional single-page marketing website for **Kadi One Construction**, a civil construction & development company in the Kingdom of Bahrain (a member of the Kadi Group).

## Stack
- Static HTML / CSS / vanilla JS (no build step)
- Brand colours sourced from the official logo: red `#fd1417` and charcoal `#423d3f`
- Fonts: Oswald (headings) + Open Sans (body)

## Local preview
Open `index.html` in a browser, or run a static server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Structure
```
index.html              # the single page
assets/css/style.css    # styles
assets/js/main.js       # interactions (nav, counters, reveal)
assets/img/             # logo marks
KadiOne.svg             # original brand logo
```

## Hosting
Deployed to GitHub Pages automatically via `.github/workflows/deploy.yml` on every push.
