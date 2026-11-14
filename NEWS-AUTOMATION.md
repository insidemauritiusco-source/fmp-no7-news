# FMP No.7 media monitoring — safe rollout

This is a **draft**, not deployed. Scheduled GitHub Actions workflows only start on the repository default branch after merging and enabling Actions. RSS URLs are tentative and must be manually checked before enabling each feed.

## Safety
- Only headline, source URL and source attribution are ingested; no full-text copying, images or video downloads.
- Domain allowlist, HTTPS requirement, request timeout, size limit, deduplication, per-feed failure isolation.
- All ingested items are **pending_review**; no automatic publication of factual claims or FMP editorial articles.
- The review page is static and publicly accessible if merged. It is **not an authenticated admin dashboard**. Do not put private editorial notes there.
- No AI-generated claims or inferred verification status.
- For later automatic publication: add a separate verified-news artifact with independently confirmed sources, editorial rules, moderation/rollback, and tested deploy protections. Do not enable until those controls are implemented.

## Manual verification
1. Validate publisher permission and RSS endpoint for each source in news-sources.json.
2. Run `python -m unittest discover -s tests -v`.
3. Run `python scripts/collect_news.py` in a sandbox; inspect output and broken feeds.
4. Review source licensing, robots rules and terms.
5. Confirm that live FMP site remains unchanged until approved merge.
