import { liveHref, liveImg, liveMeta, type LivePiece } from '@/lib/lab';
import LabLabel from './lab-label';

/** A piece hosted on everdust.ai/play. The whole tile is one link that opens it in a new tab.
 *  The thumbnail is our own still of the live page, not an image from everdust.ai. */
export default function LiveTile({ piece }: { piece: LivePiece }) {
  return <article className="card tile live-tile hoverable" id={'live-' + piece.slug}>
    <div className="media"><img src={liveImg(piece.slug)} alt={piece.alt} width={800} height={450} loading="lazy" decoding="async"/></div>
    <div className="card-body">
      <LabLabel title={piece.title} type={piece.type} fact={piece.fact} href={liveHref(piece.slug)} external stretch/>
      <p className="status live-meta"><span>{liveMeta(piece)}</span><span className="arr out" aria-hidden="true">↗</span></p>
    </div>
  </article>;
}
