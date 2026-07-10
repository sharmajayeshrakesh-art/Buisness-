/**
 * SplineScene — the reusable wrapper around @splinetool/react-spline.
 *
 * Responsibilities:
 *   • No URL yet        → render an animated <ScenePlaceholder> (never a blank hole).
 *   • Loading           → show <SceneLoader> until Spline fires onLoad.
 *   • Loaded            → hand the live Spline app up via onLoad(app) so hooks
 *                         (scroll sync, pointer parallax) can control it.
 *   • Error             → graceful message instead of a crash.
 *
 * The Spline runtime is code-split (React.lazy) so its weight is only pulled in
 * when a scene actually has a URL.
 */
import { Suspense, lazy, useState } from 'react';
import SceneLoader from './SceneLoader';
import ScenePlaceholder from './ScenePlaceholder';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function SplineScene({ url, label = 'Scene', envVar, onLoad, className = '' }) {
  const [status, setStatus] = useState('loading'); // loading | ready | error

  if (!url) {
    return (
      <div className={`spline-scene ${className}`}>
        <ScenePlaceholder label={label} envVar={envVar} />
      </div>
    );
  }

  return (
    <div className={`spline-scene ${className}`}>
      {status === 'loading' && <SceneLoader />}
      {status === 'error' && (
        <div className="scene-error" role="alert">
          Couldn't load the <strong>{label}</strong> scene. Check its URL in the config.
        </div>
      )}
      <Suspense fallback={<SceneLoader />}>
        <Spline
          scene={url}
          onLoad={(app) => { setStatus('ready'); onLoad && onLoad(app); }}
          onError={() => setStatus('error')}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
}
