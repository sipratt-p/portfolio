# Portfolio SEO launch checklist

Status: public release approved by Seth on September 5, 2026. Production is an explicitly indexable static build; development and preview builds retain noindex. Product repositories are out of scope.

## What is implemented
- Two substantial independent-project pages, product-context links, and six original field notes, including the complete Fable creative-series collection, creative-tool/autoresearch experiments and local inference engineering, with visible provenance/limits.
- Server-rendered static text, unique titles/descriptions, per-page canonical and Open Graph/X text metadata (no unrequested social-image generation).
- One consistent Person identity; product applications are separate creator-linked entities, never Person.sameAs entries. No ratings, invented credentials, or clinical review markup.
- Breadcrumbs for editorial, work and Studio details; generated sitemap for every content route; robots.txt.
- Nine permanent legacy URL mappings in vercel.json. Simulation links land at the named archived experiment, not the homepage.
- A static export checker and regression coverage. This is not browser QA, a Google Rich Results Test, or proof of indexing/ranking.

## Before public launch (requires Seth's approval)
1. Review the new first-person content and independent-project role wording. Approve public disclosure of the summarized historical local eval results. Decide whether all Studio fan works should be promoted in search; do not invent upload dates or claim VideoObject eligibility.
2. Preserve the original archive, source and Vercel rollback deployment. Confirm domain/redirect configuration in the existing Vercel project before replacing it. The release checkout preserves the original GitHub portfolio history.
3. Verify `www.sethpratt.com` is the canonical host and apex/HTTP routing resolve to it. The page and sitemap URLs already target this host. Keep project pages on this domain canonical to themselves, not to AutoTalent/Dr. Grey homepages.
4. Use the static build settings in vercel.json (Vinext export in dist/client, clean URLs). Metadata-route exports were missing from this Vinext version, so `prebuild` generates public/robots.txt and public/sitemap.xml from the same content records. Do not remove that step.
5. The Vercel build command sets `PORTFOLIO_PUBLIC_INDEXING=true`; the additional `VERCEL_ENV=production` guard restricts indexability to production. Rebuild for a production release. `VERCEL_ENV` must also be `production`; a preview environment or missing approval flag keeps noindex,nofollow. Never promote the current noindex artifact without a production rebuild. Never reuse a production-indexable artifact as a public preview. noindex is not access control.
6. Run the tests, TypeScript check, production build, and `python3 scripts/check-static-seo.py --public` on that production artifact. Default checker mode expects a noindex preview.
7. On the actual deployment, verify status and Location for all nine legacy URLs, extensionless pages, canonical host, sitemap/robots, unknown-page404, and byte-range video playback. Static redirect-map validation is NOT HTTP redirect verification; the local Python preview does not apply vercel.json.
8. Verify the production response has no accidental X-Robots-Tag:noindex and the HTML is indexable. Private previews must remain protected/noindex.
9. Use Google Search Console URL Inspection for the homepage, both projects, and representative notes. Check rendered content and structured data with Google's tools; submit the sitemap after production approval. No ranking or backlink gain is guaranteed.
10. Record the baseline: brand/project queries, indexed landing pages, impressions/clicks, and useful downstream product actions. Outbound analytics are not installed in this change; choose a privacy-appropriate measurement method before collecting events.

## Handoff to the product owners/agents
The portfolio now has relevant contextual links to:
- https://autotalent.ai, https://autotalent.ai/docs and https://autotalent.ai/cli
- https://drgrey.ai, https://drgrey.ai/about, https://drgrey.ai/supplements and https://drgrey.ai/disclaimer

An accurate builder/about link back to Seth is appropriate where it genuinely helps the product's reader. Do not mass-duplicate these articles, trade keyword-stuffed links, or imply medical qualifications.

## References
- Google helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- ProfilePage: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Video discovery: https://developers.google.com/search/docs/appearance/video
- AI Search features: https://developers.google.com/search/docs/appearance/ai-features
- Vercel configuration: https://vercel.com/docs/project-configuration
