# FMP No.7: verification-first publication plan

## Implemented in this draft
- Feed entries and the retained queue must be dated within the last 48 hours (UTC-aware RSS dates).
- Missing, malformed, future or older timestamps are rejected.
- Existing domain allowlist and duplicate URL filtering remain.
- Public preview displays only pending-review headlines with a Mauritius live clock.
- No article is automatically published to the FMP editorial website.

## Source onboarding
Le Mauricien RSS was observed working. Other source addresses (L'Express, Défi Media, ION News, Top FM) remain disabled until their feed endpoints, terms and article links have been validated. Do not switch them on merely because the domains exist.

## Required before unattended auto-publication
1. Source licensing and attribution review; no copied full article text or unlicensed images.
2. Independent corroboration for factual claims, or clearly attribute claims to a single publisher.
3. Distinguish allegations, opinions, satire and breaking reports from confirmed facts.
4. Authenticated editorial approval controls for sensitive politics, crime, health and emergencies.
5. Separate approved-content output from the public pending queue; tested rollback and publication logs.
6. Integration tests for the site and feed failures, followed by staged deployment.

This draft is **not** an auto-publisher. Do not merge or enable automatic publication solely on passing unit tests.
