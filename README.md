# sethpratt.com

Source for [sethpratt.com](https://www.sethpratt.com): Seth Pratt, Applied AI Product Leader. Benchmarks and case studies, dated notes, and a Lab of physics and AI-internals work.

Two rooms, one door: a warm, light **Work** room (evals, agents, inference, products) and a dark **Lab** room (strange attractors, cosmos, life at every scale, inside the machine, live worlds). Dark mode borrows from [everdust.ai](https://everdust.ai): deep space black, warm cream ink, a star-gold accent, and an iridescent teal → magenta → gold gradient used only for hairlines.

## Structure

| Route | What it is | Content |
|---|---|---|
| `/` | Home: positioning, proof numbers, flagship + three cards, Shipped row, Lab band, writing, how I work | `app/page.tsx`, `lib/work.ts` |
| `/start` | Five things to read, in order | `lib/site.ts` |
| `/work`, `/work/<slug>` | Filterable index; results-first case studies (scribe-bench, video evals) and project pages | `lib/work.ts`, `lib/cases.ts`, `lib/editorial.ts` |
| `/work/archive` | Earlier product case studies | `lib/portfolio.ts` |
| `/lab`, `/lab/<series>` | Five series, every piece labelled *Title — TYPE — one measured fact* | `lib/lab.ts` |
| `/writing`, `/writing/<slug>` | Dated notes with a “What I found” box | `lib/editorial.ts` |
| `/about`, `/resume`, `/how-i-write` | Bio, career, contact; HTML résumé; the site-wide note on AI-assisted drafting | |

Legacy URLs (`/notes/*`, `/local-ai`, `/studio/*`, `/projects/*`, the old `/work/*` case studies, `/art/*`, `/simulations*`) 308 to their new homes in `vercel.json`.

## Develop

```bash
npm install
npm run dev                         # vinext dev server
npm run build                       # static export to dist/client (prebuild writes sitemap, robots, llms.txt, rss.xml)
node --test tests/*.test.mjs        # content, link, media, copy-rule and SEO checks
python3 scripts/og.py               # re-render the 1200×630 Open Graph cards in public/og/ (needs Pillow)
```

Rules the tests enforce: every internal link resolves; Lab loops are silent, at most 6 seconds, and passed the photosensitivity gate; the stylesheet uses an eight-size type scale; ↗ appears only on off-site links; and legacy URLs redirect without catch-alls that would swallow media.

## Media

Lab stills and loops live in `public/media/lab/` for now. Production media is meant to move to Cloudinary, which the site already uses; swap the paths in `lib/lab.ts` (`img()` and `loopSrc()`) when that happens. Loops play only on hover or tap, never with sound.

## Hosting

Vercel serves the static export only (`dist/client`). Indexing is enabled only when `PORTFOLIO_PUBLIC_INDEXING=true` and `VERCEL_ENV=production`; every other build is noindex.
