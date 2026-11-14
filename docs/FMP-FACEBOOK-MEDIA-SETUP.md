# FMP No.7 — Facebook media synchronization (draft)
This is not active until approved, merged, and authorized.
1. An official Facebook Page administrator must authorize access through a Meta app with appropriate Page read permissions, subject to Meta requirements.
2. Set GitHub Actions repository variable FMP_FACEBOOK_PAGE_ID and secret FMP_FACEBOOK_PAGE_TOKEN. Never commit or share the token in chat.
3. After review and merge, manually run the FMP Facebook media sync workflow and check results and the gallery on Android and desktop.
4. The workflow attempts updates every six hours; GitHub schedules are not exact. API failures preserve the last feed.
5. Only links and public post metadata are displayed. No Facebook images or videos are downloaded or rehosted.
6. The existing gallery is preserved. The integration is not connected until authorized.
