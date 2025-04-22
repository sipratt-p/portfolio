import type { DetailedHTMLProps, HTMLAttributes, SVGAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      a: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      canvas: DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
      svg: DetailedHTMLProps<SVGAttributes<SVGElement>, SVGElement>;
      path: DetailedHTMLProps<SVGAttributes<SVGPathElement>, SVGPathElement>;
    }
  }
} 