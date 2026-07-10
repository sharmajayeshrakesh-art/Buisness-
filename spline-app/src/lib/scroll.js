/**
 * Smooth-scroll core: a single Lenis instance driving GSAP ScrollTrigger.
 * This is the heartbeat every Spline scene syncs to.
 *
 * - Lenis handles the smooth wheel/touch scrolling.
 * - GSAP's ticker drives Lenis (one rAF loop, no double loops).
 * - lenis.on('scroll', ScrollTrigger.update) keeps triggers frame-accurate.
 * - lagSmoothing(0) stops GSAP from "catching up" in one huge jump after a
 *   stall, which is what makes scrubbed animations feel like they lag.
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tickerFn = null;

export function initSmoothScroll() {
  if (lenis) return lenis; // singleton

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenis = new Lenis({
    lerp: 0.18,           // snappy — resolved position stays close to the wheel
    wheelMultiplier: 1.0,
    smoothWheel: !prefersReduced,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  tickerFn = (time) => lenis.raf(time * 1000); // GSAP time is seconds → Lenis wants ms
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  if (lenis) lenis.destroy();
  lenis = null;
  tickerFn = null;
}

export function getLenis() {
  return lenis;
}

/** Smooth-scroll to an element or offset. */
export function scrollTo(target, opts) {
  if (lenis) lenis.scrollTo(target, opts);
}

export { gsap, ScrollTrigger };
