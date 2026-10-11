import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/how-i-write', 'How I Write These', 'How the notes and case studies on sethpratt.com are made: AI-assisted drafting from experiment records, every number checked against its source, negative results kept, private data left out.');

export default function HowIWrite() {
  return <main id="main">
    <header className="wrap note-head rise">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/writing">Writing</a><span className="sl" aria-hidden="true">/</span><span>Method</span></nav>
      <h1 className="h1-page">How I write <em>these</em></h1>
      <p className="lead">One note for the whole site, instead of a disclaimer on every page.</p>
    </header>
    <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <div className="prose" style={{ maxWidth: 'var(--text)' }}>
        <section><h2 className="h2">Drafting</h2>
          <p>Most pages here are drafted with AI assistance, from my experiment logs, results files, wikis and the public repositories. I decide what each page claims, and I edit it. The same is true of the code: a fleet of AI coding agents does much of the building, against specs and gates I write.</p></section>
        <section><h2 className="h2">Numbers</h2>
          <p>Every number comes from a recorded run, and each page says which files it came from. Where a page and a source disagree, the source wins and the page is corrected; the correction is noted in that page’s sources box. Intervals are reported when the run produced them, and a difference counts only when its interval excludes zero.</p>
          <p>I don’t re-run experiments for a page unless it says so. “Published” is when the page went up; “Updated” is when its facts changed.</p></section>
        <section><h2 className="h2">What stays in</h2>
          <ul className="bullets">
            <li>Negative results, retractions and the bugs in my own harnesses.</li>
            <li>Limits, stated plainly: sample sizes, synthetic data, uncalibrated judges.</li>
            <li>For the Lab: what is real physics and what is choreography, and a photosensitivity gate on every render.</li>
          </ul></section>
        <section><h2 className="h2">What stays out</h2>
          <ul className="bullets">
            <li>Employer-confidential information, private operational data and anyone’s personal data.</li>
            <li>Patient data. Every clinical result here is on public mock or synthetic visits.</li>
            <li>Claims I can’t back with a file: no “researcher” titles, and “discovered” always comes with its caveat.</li>
          </ul></section>
      </div>
    </div>
  </main>;
}
