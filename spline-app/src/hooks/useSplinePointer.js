/**
 * useSplinePointer — subtle mouse-follow parallax for a Spline scene.
 *
 * Rotates a named object (or, if none given, is a no-op you can extend to move
 * the camera) toward the pointer with an eased lerp, on desktop only and only
 * when the pointer is over the scene's container. Respects reduced-motion.
 *
 * @param {React.RefObject} appRef        loaded Spline app
 * @param {React.RefObject} containerRef  element to track the pointer within
 * @param {object} opts  { objectName, intensity }
 */
import { useEffect } from 'react';

export function useSplinePointer(appRef, containerRef, { objectName = '', intensity = 0.12 } = {}) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;
    let target = null;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1..1
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.06;                       // eased pointer position
      cy += (ty - cy) * 0.06;
      const app = appRef.current;
      if (!app) return;
      if (objectName && !target && app.findObjectByName) target = app.findObjectByName(objectName);
      if (target) {
        // NOTE: if this object is ALSO scroll-rotated, use a different object
        // here (e.g. a rig/parent) so the two don't fight. Small offsets only.
        target.rotation.y = cx * intensity;
        target.rotation.x = cy * intensity;
      }
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [appRef, containerRef, objectName, intensity]);
}
