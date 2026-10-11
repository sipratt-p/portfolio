/** Hodgin-style label: Title — TYPE — one measured fact.
 *  The title is the card's one real link. `detail` makes it open that piece's detail dialog (a #hash link,
 *  so it is deep-linkable); `href` makes it a plain link. `stretch` spreads its hit area over the whole card. */
export default function LabLabel({ title, type, fact, href, detail, stretch = false, external = false, className = 'label' }:
  { title: string; type: string; fact: string; href?: string; detail?: string; stretch?: boolean; external?: boolean; className?: string }) {
  const cls = 't' + (stretch ? ' stretch' : '');
  const t = detail
    ? <a className={cls} href={'#' + detail} data-detail={detail} aria-haspopup="dialog" aria-controls="lab-detail">{title}</a>
    : href
      ? <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{title}{external && <span className="sr-only"> (opens in a new tab)</span>}</a>
      : <span className="t">{title}</span>;
  return <p className={className}>
    {t}&nbsp;<span className="sep" aria-hidden="true">—</span> <span className="ty">{type}</span>&nbsp;<span className="sep" aria-hidden="true">—</span> {fact}
  </p>;
}
