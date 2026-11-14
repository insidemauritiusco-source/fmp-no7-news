# FMP No.7 automatic news publication safety

The current pipeline only collects attributed third-party headlines into a public preview queue. It must not be described as independently verified reporting.

## Before enabling automatic publication

1. Verify source feed endpoints, permission to reuse headlines and any media licensing. Keep unvalidated sources disabled.
2. Independently verify each claim against reliable primary records or corroborating sources. Mere appearance on RSS is not verification.
3. Add a separate publication stage with a documented review policy, explicit source links, corrections/rollback, rate limits and audit logs.
4. Protect private moderation information with real authentication; GitHub Pages is public.
5. Test against misleading headlines, date manipulation, duplicates, broken feeds and malicious URLs.
6. Review the PR and deploy only after all checks pass. No automatic publication code is enabled in this PR.
