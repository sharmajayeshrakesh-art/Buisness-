/**
 * useSplineScrollSync — drives a Spline scene from scroll position via GSAP
 * ScrollTrigger (which is fed by Lenis in lib/scroll.js).
 *
 * It creates ONE scrubbed ScrollTrigger for the given section. On every scroll
 * frame it:
 *   1. calls your `onProgress(progress, splineApp)` (for cameras, variables,
 *      events — anything, once you know your scene's names), and
 *   2. optionally rotates / moves a named object by an amount you configure.
 *
 * The Spline app is only touched once it has loaded (appRef.current is set by
 * <SplineScene onLoad>), so this is safe to mount before the scene is ready.
 *
 * @param {object}   opts
 * @param {React.RefObject} opts.appRef      ref holding the loaded Spline app
 * @param {React.RefObject} opts.triggerRef  ref to the section element
 * @param {object}   opts.sync               a scene's `scrollSync` config
 */
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/scroll';

export function useSplineScrollSync({ appRef, triggerRef, sync = {} }) {
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const {
      objectName = '',
      rotateY = 0,
      rotateX = 0,
      moveY = 0,
      start = 'top top',
      end = 'bottom top',
      onProgress = null,
    } = sync;

    // Cache the target object once the app is ready (findObjectByName is cheap
    // but we avoid calling it every frame).
    let target = null;
    let base = null;

    const resolveTarget = (app) => {
      if (target || !objectName || !app?.findObjectByName) return;
      target = app.findObjectByName(objectName);
      if (target) {
        base = {
          rx: target.rotation.x, ry: target.rotation.y,
          py: target.position.y,
        };
      }
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        const app = appRef.current;
        if (!app) return;
        const p = self.progress;

        if (typeof onProgress === 'function') onProgress(p, app);

        if (objectName) {
          resolveTarget(app);
          if (target && base) {
            target.rotation.y = base.ry + p * rotateY;
            target.rotation.x = base.rx + p * rotateX;
            target.position.y = base.py + p * moveY;
          }
        }
      },
    });

    return () => st.kill();
    // Re-create if the section element or sync config identity changes.
  }, [appRef, triggerRef, sync]);
}
