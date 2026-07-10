/**
 * ScenePlaceholder — shown when a scene has no URL yet. It's an animated
 * gold-on-dark gradient so the layout looks intentional (not broken) before
 * you paste a Spline URL, and it tells you exactly where to add one.
 */
export default function ScenePlaceholder({ label = 'Scene', envVar }) {
  return (
    <div className="scene-placeholder" aria-label={`${label} scene placeholder`}>
      <div className="scene-placeholder__orb" />
      <div className="scene-placeholder__hint">
        <span className="scene-placeholder__tag">Spline · {label}</span>
        <p>
          Paste this scene's <code>.splinecode</code> URL into
          {envVar ? <> <code>{envVar}</code> (.env)</> : <> <code>src/config/scenes.js</code></>}.
        </p>
      </div>
    </div>
  );
}
