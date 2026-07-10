/**
 * SCENE REGISTRY — the one place to configure every Spline scene on the site.
 *
 * To add a scene: paste its `.splinecode` URL into `url` (or set the matching
 * VITE_SPLINE_* env var in .env). Everything else — loading state, placeholder,
 * scroll sync, pointer parallax — is already wired by the component system.
 *
 * URL resolution order: env var  ▸  `url` field below  ▸  '' (shows placeholder).
 *
 * scrollSync fields (all optional):
 *   objectName  – name of an object in the Spline scene to drive on scroll
 *                 (find it in Spline's Objects panel). Leave '' to use onProgress only.
 *   rotateY / rotateX – radians to rotate that object across the section's scroll.
 *   moveY       – world units to translate that object across scroll.
 *   start / end – GSAP ScrollTrigger positions for the section.
 *   onProgress  – (progress 0..1, splineApp) => void  for fully custom control
 *                 (camera moves, variables, events). Wire it once you know your
 *                 scene's object/variable names. Runs every scroll frame (scrubbed).
 *
 * pointer (optional): { intensity } — subtle mouse-follow parallax on the scene.
 */

const env = import.meta.env;

export const scenes = {
  hero: {
    id: 'hero',
    label: 'Hero',
    url: env.VITE_SPLINE_HERO || '', // ← paste your hero .splinecode URL here
    scrollSync: {
      objectName: '',          // e.g. 'Globe' — the object to spin as you scroll
      rotateY: Math.PI * 1.2,  // full-ish spin over the hero
      moveY: -40,
      start: 'top top',
      end: 'bottom top',
      onProgress: null,
    },
    pointer: { intensity: 0.15, objectName: '' }, // objectName: a DIFFERENT object (or rig) from the scroll one
  },

  showcase: {
    id: 'showcase',
    label: 'Showcase',
    url: env.VITE_SPLINE_SHOWCASE || '', // ← paste your second scene URL here
    scrollSync: {
      objectName: '',
      rotateY: Math.PI,
      moveY: 0,
      start: 'top 80%',
      end: 'bottom 20%',
      onProgress: null,
    },
    pointer: { intensity: 0.1, objectName: '' },
  },

  // Add more scenes here — they automatically get loading states, placeholders,
  // scroll sync and pointer parallax. Just add a matching <SplineSection>.
  // contact: { id:'contact', label:'Contact', url: env.VITE_SPLINE_CONTACT || '', scrollSync:{...}, pointer:{intensity:0.1} },
};

export function getScene(id) {
  return scenes[id] || { id, url: '', scrollSync: {}, pointer: {} };
}
