import type { LabPiece } from '@/lib/lab';
import PreviewMedia from './preview-media';
import LabLabel from './lab-label';

/** A Lab tile. The whole tile is one link: on its own series page it opens the piece's detail
 *  (`detail`); elsewhere it goes to `piece.href`. The silent-preview button sits above that link. */
export default function LabTile({ piece, sizes, reveal = true, detail = false }: { piece: LabPiece; sizes?: string; reveal?: boolean; detail?: boolean }) {
  const live = detail || !!piece.href;
  return <article className={'card tile' + (live ? ' hoverable' : '')} id={piece.id} data-reveal={reveal ? '' : undefined}>
    {piece.image && <PreviewMedia image={piece.image} alt={piece.alt ?? piece.title} pos={piece.pos} loop={piece.loop} loopSeconds={piece.loopSeconds} sizes={sizes}/>}
    <div className="card-body">
      <LabLabel title={piece.title} type={piece.type} fact={piece.fact} detail={detail ? piece.id : undefined} href={detail ? undefined : piece.href} stretch={live}/>
      {piece.status && <p className="status">{piece.status}</p>}
    </div>
  </article>;
}
