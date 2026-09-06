# Portfolio manual review — September 5, 2026

Reviewed the built static preview in the existing in-app Chromium tab using actual navigation, pointer/keyboard interactions, screenshots, and read-only media state. Responsive viewport tests:1366×900,768×1024,390×844 and320×568. These are emulated viewports, not physical-device certification. Kept the original URLs and noindex protections.

## Fixed during review
- Replaced six vague, slogan-like field-note titles with explicit subjects: local agents; H3/LTX render evaluation; coding-agent benchmarks; Fable's creative expression; the four creative tools; local inference optimization.
- Separated first-person card summaries from third-person search descriptions. Removed the repeated introduction on the notes index.
- Made Notes directly accessible in desktop/mobile navigation; highlighted Projects on its detail routes.
- Removed fixed-height letterboxing for widescreen films, while retaining portrait proportions. Verified the Matrix mobile player visually after correction.
- Made the short-screen navigation drawer scrollable. Tested reaching the final link and Escape restoring focus to the menu trigger.
- Added a mobile horizontal-scroll hint for tables. Verified the benchmark table's far-right column is reachable without page-level overflow.
- Starting a second film previously left the first playing. Reproduced with Long Exposure and Keeper, added playback coordination, then verified only the newly selected film played. Opening the story pauses page media; its optional voice uses a window-checked playback signal.
- The embedded story previously auto-scrolled past its opening passage. Initial display now remains at the start; choices still advance the story.

## Observed checks
- Homepage: professional hero, portrait, work/project navigation, About anchor, both themes, no mounted videos or broken images in inspected view.
- Work: opened the enterprise-AI case study from its card; mobile image/text layout.
- Products: AutoTalent desktop; related-project link to Dr. Grey; tablet layout and destination URLs.
- Local AI: desktop layout and agent-first hierarchy; writing links remain available.
- Notes: revised index desktop/mobile, light/dark, article titles, breadcrumb/back links, technical table and TOC jump.
- Studio: collection layout, Spider-Man detail/play/pause/next navigation, Matrix mobile playback/layout, H3 UGC playback and English caption track, Ego archived selfie playback.
- Fable: no video mounted before selection; Things I Love64.632s and Long Exposure581.896s played with readyState4/no media error; Keeper played; switching players stopped the previous player. Long Exposure assembled from the original archive and exposed its download link. Story opened, a choice advanced, then initial-position fix was visually rechecked.
- Missing route: readable404 and working Back home recovery.
- No warnings/errors in the browser log inspected after these flows. Static checks cover all29 content routes and internal links; unit tests cover ordered archive assembly, cancellation, incomplete responses, metadata, themes and player coordination.

## Remaining pre-launch work
- Long Exposure and the larger VR file still download completely before Blob playback. Move large originals to a range-capable media origin before public launch for faster start/seek on slower networks. Current local success is not an internet-speed test.
- Most spoken/music films do not yet have captions or transcripts. H3 UGC has its existing English track. No new transcription jobs were run.
- Did not watch every film end-to-end, traverse every story branch, test physical iOS/Safari/Firefox, send email, or change external product sites. Did not verify live Vercel redirects or submit indexing changes.
- Source review and regression tests supplement, rather than replace, the manual browser pass. No public launch performed.
