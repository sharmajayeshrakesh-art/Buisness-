# Aureal — React + Spline interactive scenes

An interactive-3D front end built on **React + Vite**, using **Spline** scenes that
are **scroll-synced with GSAP ScrollTrigger + Lenis**. The architecture supports
**multiple scenes** across the site. Everything is wired — **you only paste the
Spline scene URLs.**

## Quick start

```bash
cd spline-app
npm install
npm run dev        # http://localhost:5173
```

Until you add URLs, each 3D section shows an animated **placeholder** telling you
where to paste its URL — the layout is never broken.

## Paste your Spline URL (2 ways)

In Spline: **Export ▸ Code / React ▸ copy the `.splinecode` URL**
(`https://prod.spline.design/XXXX/scene.splinecode`).

**Option A — `.env` (recommended):**
```bash
cp .env.example .env
# then set:
VITE_SPLINE_HERO=https://prod.spline.design/XXXX/scene.splinecode
VITE_SPLINE_SHOWCASE=https://prod.spline.design/YYYY/scene.splinecode
```

**Option B — edit `src/config/scenes.js`:** paste into each scene's `url` field.

Env vars win over the file. Restart `npm run dev` after editing `.env`.

## Add another scene (multi-scene architecture)

1. Add an entry to `src/config/scenes.js` (copy an existing one, give it an `id`,
   `url`, and a `scrollSync` block).
2. Render one more `<SplineSection scene={scenes.yourId} .../>` (see
   `src/sections/Showcase.jsx` — copy it).

That's it. Loading state, placeholder, scroll sync, and pointer parallax are
inherited automatically.

## Wiring a scene to scroll / camera

Per scene, in `scenes.js → scrollSync`:

| field | what it does |
|-------|--------------|
| `objectName` | name of an object in your Spline scene (see Spline's Objects panel) to spin/move on scroll |
| `rotateY` / `rotateX` | radians to rotate that object across the section |
| `moveY` | units to translate it across the section |
| `start` / `end` | GSAP ScrollTrigger positions for the section |
| `onProgress(p, app)` | full custom control — move the camera, set variables, emit events. `p` is 0→1 scrubbed. |

**Camera / advanced control:** the loaded Spline app is passed to `onProgress` and
exposes the runtime API:
```js
onProgress: (p, app) => {
  const cam = app.findObjectByName('Camera');
  if (cam) cam.position.z = 800 - p * 400;   // dolly in on scroll
  app.setVariable?.('progress', p);           // drive a Spline variable
  // app.emitEvent('mouseDown', 'Button');     // trigger a Spline event
}
```

**Pointer parallax:** set `pointer.objectName` (a *different* object or a rig, so it
doesn't fight the scroll rotation) and `pointer.intensity` in `scenes.js`.

## How the scroll sync works

- `src/lib/scroll.js` — one **Lenis** instance, driven by the **GSAP ticker**, with
  `lenis.on('scroll', ScrollTrigger.update)` and `lagSmoothing(0)`.
- `ScrollProvider` boots it once for the app.
- `useSplineScrollSync` creates one scrubbed `ScrollTrigger` per section and, each
  frame, calls your `onProgress` and applies the configured object transform.
- `useSplinePointer` adds eased mouse-follow parallax (desktop, respects
  reduced-motion).

## File map

```
src/
  config/scenes.js            ← paste URLs + per-scene scroll config
  lib/scroll.js               ← Lenis + GSAP ScrollTrigger core
  context/ScrollProvider.jsx  ← boots the scroll core
  hooks/
    useSplineScrollSync.js    ← scene ⇄ scroll
    useSplinePointer.js       ← scene ⇄ pointer parallax
  components/
    SplineScene.jsx           ← react-spline wrapper (loading/placeholder/error)
    SplineSection.jsx         ← copy + scene + sync, the reusable block
    SceneLoader.jsx / ScenePlaceholder.jsx
  sections/Hero.jsx           ← hero scene (replaces the old CSS/Three.js hero)
  sections/Showcase.jsx       ← a 2nd scene (multi-scene proof)
```

## Notes

- Respects `prefers-reduced-motion`.
- Spline runtime is code-split, so its weight only loads when a scene has a URL.
- This app is separate from the existing self-contained `index.html`; migrate copy
  in as you like, or make this the primary site once your scenes are in.
