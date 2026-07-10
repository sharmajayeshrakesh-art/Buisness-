/**
 * Hero — replaces the old CSS/Three.js hero with an interactive Spline scene.
 * The scene sits fixed behind the copy; scroll spins/moves the configured object
 * and pointer parallax adds life. Paste the hero URL in scenes.js / .env.
 */
import SplineSection from '../components/SplineSection';
import { scenes } from '../config/scenes';
import { scrollTo } from '../lib/scroll';

export default function Hero() {
  return (
    <SplineSection scene={scenes.hero} envVar="VITE_SPLINE_HERO" className="hero">
      <div className="hero__inner">
        <span className="eyebrow">Web Development Studio</span>
        <h1>
          We Build Websites <br />
          That <em>Work</em> While <br />
          You Sleep.
        </h1>
        <p className="lede">Premium web solutions for Indian businesses.</p>
        <button className="btn btn--primary" onClick={() => scrollTo('#showcase')}>
          See What We Can Build <span className="btn__arrow">→</span>
        </button>
      </div>
      <div className="hero__scrollcue" aria-hidden="true">Scroll</div>
    </SplineSection>
  );
}
