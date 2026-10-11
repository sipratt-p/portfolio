import { startHere } from '@/lib/site';
import { Arrow, isOffsite } from './smart-link';
/** The five-step reading path, shared by /start and /about. */
export default function StartList() {
  return <ol>{startHere.map(s => <li key={s.n}>
    <a href={s.href} {...(isOffsite(s.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span className="i">{s.n}</span>
      <span className="st">{s.prefix && <span className="m">{s.prefix} </span>}{s.label}{isOffsite(s.href) && <span className="sr-only"> (opens in a new tab)</span>}</span>
      <span className="chip">{s.minutes} min</span>
      <span className="go"><Arrow href={s.href}/></span>
    </a>
  </li>)}</ol>;
}
export const startMinutes = startHere.reduce((n, s) => n + s.minutes, 0);
