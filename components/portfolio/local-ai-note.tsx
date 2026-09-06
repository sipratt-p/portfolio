import { ArrowUpRight } from 'lucide-react';

export default function LocalAINote() {
  return <div className="local-ai-note">
    <div><p className="eyebrow">Local AI & open source</p><h3>Beyond the API.</h3></div>
    <div><p>Long-running AI agents, tailored to video rendering, personal assistance, media management, and coding. Built with local models, open-source tools, and two RTX PRO 6000 GPUs.</p><a className="text-link" href="/local-ai">Inside my local AI lab <ArrowUpRight size={17} aria-hidden="true"/></a></div>
  </div>;
}
