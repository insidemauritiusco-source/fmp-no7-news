# Facebook media integration — authorization required
This draft does not access the official Page yet.
A Page administrator must approve the integration and obtain valid Meta Graph API permissions and a Page access token.
Store FMP_FACEBOOK_PAGE_ID and FMP_FACEBOOK_PAGE_ACCESS_TOKEN only as GitHub Actions secrets, never in code or chat.
Run the workflow manually to test API access and media links before allowing the six-hour schedule.
The workflow stores public Facebook post metadata and links only. Videos open on Facebook, not rehosted.
No unauthorized scraping or copying. Facebook API availability and permissions may change.
