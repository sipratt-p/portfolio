import { ArrowRight } from 'lucide-react';
import { notes } from '@/lib/editorial';
export default function FieldNotes({compact=false}:{compact?:boolean}) {
  return <section className={"field-notes"+(compact?" field-notes-compact":"")} aria-labelledby="field-notes-title">{compact ? <h2 id="field-notes-title" className="sr-only">Articles and experiments</h2> : <div className="section-heading"><div><p className="eyebrow">From the workbench</p><h2 id="field-notes-title">Field notes & experiments.</h2></div><p>Agents, evaluations, and creative experiments. Original notes about what worked, what failed, and what was worth making.</p></div>}<div className="notes-list">{notes.map((note,i) => <a key={note.slug} href={'/notes/'+note.slug}><span className="note-number">0{i+1}</span><div><h3>{note.title}</h3><p>{note.summary ?? note.description}</p></div><ArrowRight size={21} aria-hidden="true"/></a>)}</div></section>;
}
