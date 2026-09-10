# Restoration checkpoint

## Goal and current boundary
Deliver independent, maintainable user/admin React source preserving the existing UI. Independent builds work; full source cleanup is NOT complete. Many pages/models and hashed vendor sources still need naming, decomposition and dependency replacement. Do not equate test count with restoration percentage.

## OrderDetail round (local only, after Order checkpoint 8a64d47f)
- OrderDetail now standard imports/named class/JSX; key render/payment locals renamed. Still a large page with some comma expressions; split payment selector and summary next.
- Saved original fixture user-order-detail.jsx. 10 controller differential tests: mount/detail callbacks, payment choice/fees, Stripe key/token checks, 3-second fake-timer pending/complete polling, unmount cleanup, status results.
- 358 unit tests, both builds, 44 screenshot comparisons green; zero pixels and identical DOM. Browser checks selection, cancel confirmation and completed tutorial navigation. Stripe/QR/XMLHttpRequest are mocked; no external server access.
- Known inherited risks NOT fixed: shared timer across instances, delayed callbacks after unmount, synchronous image HEAD, missing payment method guard. Address in a separately scoped behavior change with tests.
- Next: split OrderDetail and expand loading/error/QR dismissal and late-callback tests; then order models or next admin page. No deployment. Reference dirs remain untracked.

## Previous round (local only, after checkpoint 99c1fc7c)
- Rewrote user Order.jsx; extracted components/OrderColumns.jsx and isolated embedded dependency vendor/MobileList.js. MobileList remains recovered third-party code, not fully cleaned.
- Added pre-rewrite user-order.jsx fixture, 3 controller tests, 6 desktop/mobile visual cases, desktop detail/cancel confirmation and mobile navigation browser interactions.
- Full checks: 348 unit tests; both builds; 28 screenshot cases identical DOM/zero pixels. Fixed fixture spillover and hidden fixed-column link locator before successful full rerun.
- Next priority: OrderDetail and its payment/status/polling interactions, mocked only; retain order-list checks. No deployment/server access occurred. Reference dirs remain untracked.

## Previous completed work
- PlanDetail split into components/checkout/{Pricing,Coupon,OrderSummary}.jsx; readable controller, createRef coupon input; confirmation/cancellation decisions preserved.
- User Traffic, Node, Plan and PlanDetail pages rewritten with extracted components.
- User/admin login, layout/navigation, request services, session/user and plan models substantially cleaned.
- Fixed DOM anchor downloads accidentally converted to JSX, including coupon/giftcard export.

## Verified at checkpoint
- `npm --prefix frontend test`: 345 passed.
- `npm --prefix frontend run build`: both targets passed.
- `node frontend/scripts/check-page-screenshots.mjs`: 22 cases (11 states × desktop/mobile), identical DOM, zero pixel differences. Includes mocked checkout interaction checks in both baseline/source versions.
- `node frontend/scripts/check-download.mjs`: Chromium filename/content check passed.
- Browser comparisons use saved pre-rewrite fixtures, actual UI libraries/assets but mocked layout/state/helpers; all external requests blocked. Not live API/full-app acceptance.
- Reports/screenshots under frontend/test-results are ignored and reproducible, not committed.

## Next highest-value work
1. Expand mocked browser interactions: modal confirmation/cancellation, reactive period/discount updates, saving/disabled states. Current dispatch recorder does not update fixture state.
2. Further split OrderDetail and clean corresponding models with pre-change fixtures and behavior comparisons. Order.jsx is now rewritten; its extracted MobileList dependency still needs identification/cleanup.
3. Continue remaining user pages (dashboard, profile, invite, knowledge, tickets, register/forget password) and admin pages (only login manually rewritten so far).
4. Replace/name remaining hashed vendor modules with verified npm dependencies; preserve single React 16.14.0 instance until an explicitly tested upgrade.
5. Improve deferred legacy behaviors separately: network-error loading cleanup, failed-sort rollback, missing-price handling, random keys. Avoid changing semantics silently during migration.

## Repository and deployment
- Before this checkpoint all frontend/, recovered-ui/, tools/ were untracked. Commit includes the self-contained frontend project, not only latest deltas; recovery/tool workspaces are intentionally left untracked.
- Normal frontend build/dev/page-screenshot tests are self-contained. Historical one-time migration scripts and `check-browser.mjs` reference the local recovery workspace; do not rerun migration over edited source.
- Server remains restored-20260911-010759 (200-test-era version); subsequent plan/page/checkout cleanup is LOCAL ONLY. See DEPLOYMENT.md for historical URLs/rollback.
- No deployment or real server data operations authorized for this checkpoint. Do not run deployment scripts or live write actions without a new request. Do not put test-account credentials into repository files.
