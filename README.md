# Seth Pratt — professional-first redesign

Professional-first redesign, approved for production by Seth on September 5, 2026. The original source and media archive remain preserved separately. Vercel serves only the static export; the Sites manifest remains available for separate private previews.

The existing Vercel project is `seth-pratts-projects/portfolio`. Its approved production build enables indexing only when `VERCEL_ENV=production`; preview builds remain noindex. `vercel.json` contains all nine legacy route redirects and the static output configuration. See `docs/SEO-LAUNCH.md` for validation and search follow-up.

## Structure
- `/`: professional positioning, three featured projects, two earlier projects, independent products (AutoTalent and Dr. Grey AI), career summary, and contact.
- `/local-ai`: the independent local AI practice—dual RTX PRO 6000 hardware, model adaptation/evaluation, H3/LTX rendering, M3/ACE-Step music, and open-source interests. Linked from the shared navigation and a restrained homepage note.
- `/work/[slug]`: five project overviews based on existing portfolio copy, with role and scope made explicit. Unverified numerical impact claims were omitted.
- `/studio`: twelve static film previews across featured renders, films/music, and the original art collection, plus clearly labeled early experiments.
- `/studio/[slug]`: a film loads only after explicit play. Native controls, no looping, no autoplay, no scroll-driven video loading.

## Review before a public launch
- NVIDIA title (AI Product Leader), AI Research scope, and Lyft Level 5 Autonomous Vehicles were confirmed by Seth on September 5, 2026. Confirm remaining dates, location, and career details before public launch.
- Add approved results and decision-making narratives to the project overviews; do not reintroduce impact percentages without supporting evidence.
- Confirm permission to publicly show the existing product screenshots.
- Decide whether the 2025 simulation source links should remain in Studio. They are historical artifacts, not current capability claims.
- Iteration 2 was production-built and type-checked, with route/asset regression checks and desktop/mobile browser QA. About, Studio, and opt-in video playback were exercised. Review the final content and launch rights before public replacement.
- Remove the deliberate noindex setting only when the public replacement is approved, and plan redirects for the old art/simulation URLs.

## Local development
`npm install` then `npm run dev`. `npm run build` creates a static export in `dist/client`. The Sites hosting manifest selects only that public directory; no application server or Server Functions are deployed.

The generated dependency stack currently has npm advisories in build/development/server packages (audit performed September 5, 2026). No claim is made that every dependency is vulnerability-free. This deployment is static-only, excludes server intermediates, and has no uploads, auth implementation, forms, API routes, or Server Functions. Reassess and patch these dependencies before using this checkout as a server-backed production application. Keep the development server loopback-only.

The original five video encodes and source imagery come from the preserved portfolio archive. Six newer renders use full-duration web copies from local master files; larger renders were re-encoded for web delivery. Neither the archive nor the source masters were modified.

## Iteration 2 — September 5, 2026

- Native anchor navigation replaces the Vinext client Link wrapper. The original exported wrapper prevented normal navigation and threw `TypeError: e is not a function` on About/Studio clicks; the fix applies to every portfolio link, not just the header.
- Copper/peach palette drawn from the public AutoTalent CSS (`#c2722a`, `#f9e5d4`, `#fdf5ef`); darker copper `#a86123` is used for readable actions.
- Independent-work section links directly to AutoTalent and Dr. Grey AI.
- Studio includes the requested final V7 Spider-Man/Green Goblin cut (Robin = Spider-Man; Seth = Goblin), final Seth/Smith bullet-time fight, H3 Sophia UGC sample (Aug 4), Fable, The Keeper, Second Winter, and the original five art films.
- Six new full-duration web-viewing copies are included; source masters are unchanged. Each viewing copy is under 25 MB for static hosting. Native sound is opt-in. H3 UGC has English captions; speculative/hallucinated song transcriptions were discarded rather than shipped.
- `redesign-v1` Git tag and adjacent `iterations/sethpratt-v1-static` preserve the first iteration.
- Run `node --test tests/portfolio.test.mjs` for navigation/media regression checks.

These fan-film sequences contain existing third-party characters/music. This is a private design review; confirm public-release rights before publishing the portfolio publicly. UGC is labeled as AI-generated, not a real customer testimonial.

## Dark mode and career copy update

The shared header includes an accessible Dark mode switch on every page and screen size. The initial theme follows the system; an explicit choice is saved locally. A small head script applies the theme before content paints, and system changes remain live until a preference is chosen. Storage restrictions do not prevent toggling. Both palettes retain warm copper accents.

## Local AI and comedy update

Added a text-led Local AI page and a compact homepage entry point; the homepage still embeds no media. The Studio now includes the final 41-second `george_dwight_ai_3clip_final.mp4` as George & Dwight on AI, clearly labeled as an AI-generated Seinfeld/The Office fan parody. Its local master is untouched and the 4.8 MB viewing copy is byte-identical. The four featured films use a two-column desktop grid. All new surfaces inherit both light and dark theme tokens.

Run `node --test tests/*.test.mjs` for the complete regression set.

## Local AI priority update

Long-running, purpose-built agents are now practice 01, presented as a full-width lead item. Video Rendering Agents, Personal Assistant, Media Management Agent, and Coding Agent are explicitly called out. The page introduction, metadata, hardware context, and homepage note lead with agents; model adaptation, inference, video, and music remain as supporting practices 02–05.
