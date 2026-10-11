'use client';
// Live figures for /writing/watching-a-language-model-think. Each loads its small JSON (real recorded model data)
// from /media/writing/llm-thought/ only when it scrolls near the viewport; without JavaScript a still image shows.
import type { FigureId } from '@/lib/editorial';
import GuessFigure from './guess';
import MapFigure from './map3d';
import RiverFigure from './river';
import AttentionFigure from './attention';
import ForkingFigure from './forking';
import SearchFigure from './search';
import LongContextFigure from './longctx';

export default function LlmtFigure({ id, n }: { id: FigureId; n: number }) {
  switch (id) {
    case 'guess': return <GuessFigure n={n}/>;
    case 'map': return <MapFigure n={n}/>;
    case 'river': return <RiverFigure n={n}/>;
    case 'attention': return <AttentionFigure n={n}/>;
    case 'forking': return <ForkingFigure n={n}/>;
    case 'search': return <SearchFigure n={n}/>;
    case 'longctx': return <LongContextFigure n={n}/>;
  }
}
