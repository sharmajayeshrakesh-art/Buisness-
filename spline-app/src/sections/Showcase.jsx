/**
 * Showcase — a SECOND Spline scene, proving the multi-scene architecture.
 * Copy it to add as many 3D moments as you like: add a scene to the registry,
 * render another <SplineSection>.
 */
import SplineSection from '../components/SplineSection';
import { scenes } from '../config/scenes';

export default function Showcase() {
  return (
    <div id="showcase">
      <SplineSection scene={scenes.showcase} envVar="VITE_SPLINE_SHOWCASE" className="showcase">
        <div className="showcase__inner">
          <span className="eyebrow">Interactive by default</span>
          <h2>Every scene reacts to your scroll.</h2>
          <p className="lede">
            This second scene is wired to its own ScrollTrigger and pointer parallax —
            drop in a URL and it comes alive, no extra plumbing.
          </p>
        </div>
      </SplineSection>
    </div>
  );
}
