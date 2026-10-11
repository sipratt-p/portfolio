export default function NotFound() {
  return <main id="main" className="wrap not-found rise">
    <p className="eyebrow lined">404 · Page not found</p>
    <h1 className="h1-page" style={{ marginTop: 20 }}>A little <em>off the path.</em></h1>
    <p className="lead" style={{ marginTop: 20, maxWidth: 560 }}>This page isn’t here. Some older pages moved when the site was reorganised in October 2026.</p>
    <div className="actions" style={{ marginTop: 32 }}><a href="/" className="btn btn-primary">Back home <span className="arr in" aria-hidden="true">→</span></a><a href="/work" className="btn btn-secondary">See the work <span className="arr in" aria-hidden="true">→</span></a><a href="/writing" className="btn btn-secondary">Read the writing <span className="arr in" aria-hidden="true">→</span></a></div>
  </main>;
}
