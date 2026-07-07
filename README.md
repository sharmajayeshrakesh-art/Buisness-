# Aureal — Agency Portfolio

A single-page showcase site for a web development studio, built to convince
potential clients at a glance.

- **Stack:** vanilla HTML/CSS/JS. GSAP + ScrollTrigger (CDN) for motion. No frameworks, no build step.
- **Design:** dark (`#0a0a0a`), off-white text (`#f0f0f0`), deep-gold accent (`#C9A84C`); Cormorant Garamond + Inter.
- **Sections:** hero (3D mouse-follow card), capabilities, industry demos, process timeline, testimonials, WhatsApp CTA.
- **Motion:** custom lerp cursor, scroll reveals, hover tilt — all `transform`/`opacity`, hardware-accelerated, disabled on touch.

## Run

No build. Open `index.html` in a browser, or serve statically:

```bash
python3 -m http.server 8000
```
