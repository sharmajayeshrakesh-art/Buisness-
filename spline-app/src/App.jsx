import { ScrollProvider } from './context/ScrollProvider';
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import './styles.css';

export default function App() {
  return (
    <ScrollProvider>
      <header className="topnav">
        <a className="topnav__brand" href="#top">Aureal<span>.</span></a>
        <a className="topnav__cta" href="#showcase">Start a Project</a>
      </header>

      <main id="top">
        <Hero />
        <Showcase />

        {/* A normal content section, to show scenes interleave with real copy. */}
        <section className="prose">
          <h2>Add scenes anywhere.</h2>
          <p>
            Each <code>&lt;SplineSection&gt;</code> is self-contained: loading state,
            placeholder, scroll sync and pointer parallax come for free. Duplicate a
            section, point it at a new scene in <code>src/config/scenes.js</code>, done.
          </p>
        </section>
      </main>
    </ScrollProvider>
  );
}
