// TODO(production): this is an HTML/CSS recreation of the scribe-bench live copilot view for a
// type 2 diabetes follow-up. Replace it with a real capture of that case before launch.
// Copy rule: never say "diagnoses", "alerts" or "CDS" about the copilot.
export default function CopilotPanel({ compact = false }: { compact?: boolean }) {
  return <div className="media copilot" role="img" aria-label="Live visit copilot, recreated: for a type 2 diabetes three-month follow-up, the next question to ask and four questions from guideline lookups">
    <div className="cp-panel" aria-hidden="true">
      <p className="cp-head"><span>Live visit copilot</span><span className="cp-live">listening</span></p>
      <p className="cp-case">Type 2 diabetes — 3-month follow-up</p>
      <p className="cp-lbl">Next question</p>
      <p className="cp-next">Any low-sugar episodes since the dose change?</p>
      <p className="cp-lbl">Questions to ask <span>(from the guideline lookups)</span> <b>4</b></p>
      <ul className="cp-qs">
        <li>How often are you checking your glucose at home?</li>
        <li>Any numbness or tingling in your feet?</li>
        <li>When was your last eye exam?</li>
        <li>Are you taking metformin with food?</li>
      </ul>
      {!compact && <p className="cp-note">Synthetic visit · recreated for this page</p>}
    </div>
  </div>;
}
