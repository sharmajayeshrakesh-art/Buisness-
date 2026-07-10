/** Loading overlay shown while a Spline scene downloads/initialises. */
export default function SceneLoader() {
  return (
    <div className="scene-loader" role="status" aria-label="Loading 3D scene">
      <div className="scene-loader__ring" />
      <span className="scene-loader__label">Loading scene…</span>
    </div>
  );
}
