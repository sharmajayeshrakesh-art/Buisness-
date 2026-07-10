/**
 * SplineSection — the reusable building block for every 3D moment on the site.
 * Drop one in per scene; it wires up everything:
 *   • renders the <SplineScene> (with loading / placeholder / error states)
 *   • captures the loaded Spline app in a ref
 *   • scroll-syncs it (useSplineScrollSync) to this section via ScrollTrigger+Lenis
 *   • adds optional pointer parallax (useSplinePointer)
 *   • overlays your copy/children on top
 *
 * Because it's config-driven (from src/config/scenes.js), adding another 3D
 * section is just: add a scene to the registry + render one more <SplineSection>.
 */
import { useRef } from 'react';
import SplineScene from './SplineScene';
import { useSplineScrollSync } from '../hooks/useSplineScrollSync';
import { useSplinePointer } from '../hooks/useSplinePointer';

export default function SplineSection({ scene, envVar, className = '', children }) {
  const sectionRef = useRef(null);
  const appRef = useRef(null);

  useSplineScrollSync({ appRef, triggerRef: sectionRef, sync: scene.scrollSync });
  useSplinePointer(appRef, sectionRef, {
    objectName: scene.pointer?.objectName || '', // separate object from scroll to avoid fighting
    intensity: scene.pointer?.intensity ?? 0.12,
  });

  return (
    <section ref={sectionRef} className={`spline-section ${className}`}>
      <div className="spline-section__scene">
        <SplineScene
          url={scene.url}
          label={scene.label}
          envVar={envVar}
          onLoad={(app) => { appRef.current = app; }}
        />
      </div>
      {children && <div className="spline-section__content">{children}</div>}
    </section>
  );
}
