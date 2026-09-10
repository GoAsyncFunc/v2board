# Restoration checkpoint

## Goal and current boundary
Deliver independent, maintainable user/admin React source preserving the existing UI. Independent builds work; full source cleanup is NOT complete. Many pages/models and hashed vendor sources still need naming, decomposition and dependency replacement. Do not equate test count with restoration percentage.

## Latest Giftcard edge coverage (local only, after bd22b5cd)
- Test/doc-only round; no production source or original fixture edits.
- Added13 differential lookup/null-row cases (strict IDs, first duplicate, missing/null name, invalid plan list/row).
- Giftcard screenshots6→14, all0 pixels. 824 tests, builds,60 pages,affected Coupon/Plan-price partials,4 notifications,8 checkout traces green.
- No server connection or redeployment; authorized deployment below remains unchanged.
- Next: another isolated readonly slice or expand real rendered error-boundary parity; do not disguise preserved null/type exceptions as fixes.

## Latest authorized test deployment
- User requested deployment. Built checkpoint 2697d75e and deployed to v2board-legacy-dev:7003 as restored-20260911-065410.
- Backed up Blade templates; only app.js assets/entry paths and view cache changed. No DB/account/business configuration changes.
- Public JS byte matches and Chromium user/admin login rendering passed, no pageerrors. No account login or post-login business actions in this deployment verification.
- Rollback path documented in DEPLOYMENT.md. Earlier local-only notes below are historical; changes through2697d75e are now deployed.

## Latest Giftcard readonly slice (local only, after d5f4b571)
- Extracted 7 display columns into GiftcardDisplayColumns.jsx; plans injected from existing render. Clipboard/code and write controls untouched.
- 49 differential cases, 811 total tests/builds/new6 screenshot comparisons green (new pixels 0). Existing server-name mobile rows 6 pixels within unchanged10 threshold.
- Long regression batch hit420s after admin suites; notification/checkout rerun separately and passed. No skip/no server/deploy/data.
- Next: stronger plan lookup/null row tests or another narrowly isolated readonly area. Full page/vendor restoration remains incomplete; references untracked.

## Previous Ticket readonly columns (local only, after b1056e96)
- ServerManage remainder still interaction-heavy; moved to admin Ticket id/subject/level/created/updated readonly columns. Passed original levels array into helper; status filter/write controls untouched.
- 35 parity cases; 762 tests/builds/new6 partial screenshots and all prior suites green, new pixels 0. Pagination/scroll harness-only.
- No controller/action/request/state writes. Next: another readonly list area or clean extracted component readability; full restoration incomplete.
- No server/deploy/data; reference dirs untracked.

## Previous server type Tag slice (local only, after 302e3b54)
- Remaining columns mixed with interactions; extracted only pure getTypeTag into ServerTypeTag.jsx, original method delegates, all callers preserved.
- 39 parity cases, 727 total tests; builds/new6 Tag partial screenshots and all existing regressions green. 8 exact colors and unknown undefined unchanged.
- Fixed initial screenshot harness import naming error and reran complete suite. No business changes/server/deploy/data access.
- Next: inventory another readonly area; avoid broadening ServerManage filters/actions. Full cleanup still incomplete. References untracked.

## Previous ServerManage name/status slice (local only, after 275a7ef3)
- Extracted readonly name column to ServerNameColumn.jsx; pass original local D status mapping, leave other uses untouched. Tooltip/Badge/name output unchanged.
- 18 differential tests cover known/unknown/string/null status, missing fields/name and null record exception. 688 total tests/builds/new6 partial screenshots and all prior suites green; new pixels 0.
- No filters/sort/copy/write/controller/request changes. Next: inventory another safe readonly field or page; most ServerManage code still legacy. Avoid silently broadening into write controls.
- No server/deploy/data; reference dirs untracked.

## Previous ServerManage rate slice (local only, after cbc23dba)
- Skipped ID/filter/controller coupling, address clipboard, online sorter and group filter. Extracted rate column only to ServerRateColumn.jsx; Tooltip/Icon/Tag and concatenation preserved.
- 12 original fixture parity tests; 670 tests, builds, new6 partial rate screenshots at 0 pixels plus all existing regressions green. Symbol throws and null/undefined text remain unchanged.
- No controller/action/request/event/write changes. ServerManage largely remains legacy; single-column extraction is not full-page restoration.
- Next: narrowly scoped readonly status/name renderer or another display area after inventory. References untracked, no server/deploy/data access.

## Previous ServerGroup readonly slice (local only, after e27479cf)
- Extracted id/name/user_count/server_count; retained Fragment, icon types, space and move cursor styling. Counts passed through unchanged. No event/write/controller/request changes.
- Original fixture +13 differential cases. 658 tests/builds/new6 group partial screenshots (0 pixels) and all existing regressions green. Paging/scroll only in harness, production pagination:false unchanged.
- Null/undefined and nonstandard children preserved; object child tests compare element structure, not successful React rendering.
- Next: inventory small server-manage readonly fields or remaining admin display area; avoid mixed controls. Full restoration still incomplete.
- No server access/deploy; reference dirs untracked.

## Previous server-route readonly slice (local only, after 1bf7089a)
- Inventory inspected ServerGroup/ServerRoute/ServerManage; chose route id/remarks/match count. Extracted ServerRouteDisplayColumns and formatter, original fixture unchanged.
- 12 parity cases preserve empty/string comma filtering without trimming, arrays, null errors, unusual length coercion. No action/controller/request edits.
- 645 tests, builds, new6 route partial screenshots/paging/horizontal scroll + all existing regressions green, new pixels 0.
- Next: group readonly counts or another narrowly isolated admin display; full restoration still incomplete. No server/deploy/data; reference dirs untracked.

## Previous Knowledge readonly slice (local only, after 483beff9)
- Extracted Knowledge id/title/category/updated_at columns. Original fixture preserved; no drag/switch/write/controller changes.
- 14 parity cases for null/missing/long text/category/extreme dates. 633 tests/builds/new6 Knowledge table visuals and all existing visual/notification/checkout suites green; new pixels 0, paging/horizontal scroll checked in harness only.
- Next: inventory remaining readonly admin server/group/route areas; avoid write controls. Complete UI cleanup still not finished.
- No server/deploy/data access. Reference dirs untracked.

## Previous Plan price readonly slice (local only, after e755de6e)
- Extracted 8 period price columns to PlanPriceColumns.jsx; shared formatPlanPrice preserves null-only '-' and direct toFixed exceptions/coercion behavior. Original positions unchanged; switches/drag/write/controller untouched.
- 14 tests cover all 8 columns across normal/zero/null/undefined/string/negative/nonfinite/extreme/missing rows. 619 total green.
- New check-admin-plan-price.mjs: 6 partial desktop/mobile tables, 0 pixels, pagination/horizontal scrolling. Initial generated harness syntax error fixed; full rerun green.
- Both builds, existing 60 pages/all admin partial suites/4 notifications/8 checkout traces green. No server/deploy/data access. References untracked.
- Next: inventory another readonly admin area; full controllers/vendor cleanup still substantial. Never present partial column extraction as completed full-page restoration.

## Previous notice readonly columns (local only, after 966e7b8b)
- Notice ID/title/created_at extracted to NoticeDisplayColumns.jsx; show/edit/delete/controller unchanged. No original type/tag display exists.
- 12 fixture differential tests cover long title/null/missing/extreme timestamps/irrelevant unknown type. 605 tests, builds and all existing regressions green.
- New check-admin-notice-display.mjs: 6 partial table screenshots at zero pixels, pagination and 390px horizontal scrolling. Harness supplies pagination/scroll; production table config unchanged.
- Next low-risk slice: Plan pure price display columns (avoid switches/sort/write menus), or name remaining readonly details. Full UI restoration incomplete.
- No server access/deploy; reference dirs untracked.

## Previous coupon readonly columns (local only, after af1d7583)
- Inventory compared Plan/Coupon/Notice. Extracted Coupon id/name/type/limit_use/started_at columns only into CouponDisplayColumns.jsx. All write/clipboard/controller paths unchanged.
- Original columns fixture +24 parity tests; preserves strict numeric type check, null-only unlimited count, missing/extreme dates and null-row errors.
- 593 tests/builds/new 6 coupon table screenshots + pagination, existing 60 pages/6 order columns/6 detail body/4 notifications/8 checkout traces green.
- Next: small readonly Notice columns or Plan price display; avoid write controls/controller refactors. Full restoration remains incomplete.
- No server access/deploy; reference dirs untracked.

## Previous readonly readability slice (local only, after 9c44fda2)
- Rewrote OrderDetailBody with named props/rowStyle, synchronous detailRow helper and amount/time formatters. Original fixture unchanged; no extra DOM/lifecycle wrapper or business action changes.
- Preserved short-circuit loader, null errors, NaN/coercion, strict plan ID lookup, zero actual commission expression and both filter callbacks.
- 11 additional edge cases; 36 detail parity cases total. 569 all tests, builds, 60 page visuals +6 admin columns +6 body +4 notifications +8 checkout traces green (body pixels 0).
- Next: another low-risk admin readonly page/column slice. Detail fetch/controller and write menus still legacy, not in this scope. Full source cleanup remains incomplete.
- No server access/deployment; recovered-ui and tools still untracked.

## Previous admin detail body slice (local only, after ffdba18f)
- Extracted OrderDetailBody only; original modal lifecycle/title/controller and write menus untouched. Email filter callback preserved, tests record only.
- 25 readonly render parity cases: full/missing/null/extreme amounts/time/status. Null objects still throw; absent email still shows spinner; NaN formatting preserved.
- New check-admin-order-detail.mjs: 6 partial body/title screenshots at 0 pixels, email callback check. Not full modal/network coverage.
- Fixed fixture JSX transform and missing React injection, reran all: 558 tests, builds, 60 pages, 6 admin columns +6 detail body,4 notification,8 checkout trace green.
- Next: name locals/split rows more readably in extracted body, or another readonly admin page. No write menu migration without explicit scope.
- No server access/deploy; references remain untracked.

## Previous admin readonly columns slice (local only, after eda29af5)
- Extracted 5 readonly columns to admin/components/OrderDisplayColumns.jsx (type/period/amount/commission/date); column positions/render outputs retained.
- Status/commission state menus embed writes and remain untouched. Detail modal also not extracted. Next: isolate readonly detail body with mock data, not write handlers.
- Original columns fixture + 15 diff tests; 533 total tests green. New check-admin-order-display.mjs: real Table/Tag, 6 desktop/mobile rows/empty/loading screenshots at zero pixels, pagination interaction.
- Existing builds/60 page visuals/4 notifications/8 checkout traces remain green. Partial table test only; no claim of full admin page visual coverage.
- No server connection, deployment or real data. Reference dirs untracked.

## Previous admin order query slice (local only, after 7dc529b1)
- Admin order model ~33KB/page ~31KB: chose query effects, no mutation or render changes.
- Extracted admin/models/orderQueryEffects.js (fetch/filter/addFilter/changeTable); original selected methods/runtime saved in admin-order-query.cjs.
- 19 differential tests; 518 total green + builds + 60 page visuals + 4 notification visuals + 8 checkout traces.
- Preserved addFilter(clear) malformed put without type; strict mock runner verifies inherited throw. Null data assertion initially used truthiness, fixed to property presence and reran all.
- Amount/status/time remain raw API data; no admin column rendering coverage added this round. Next highest value: admin order columns/detail UI extraction with original fixtures and screenshots.
- No server access/deploy/real data; recovered-ui and tools remain untracked.

## Previous offline integration (local only, after c45c8c4f)
- Added order-integration.test.mjs bundling real OrderDetail controller, order/comm models and request wrapper into isolated VM. Minimal generator/put/select/reducer runner; controlled HTTP promises and timers, mocked React/notifications. Not actual Dva/browser integration.
- 7 cases cover key HTTP500, QR checkout→poll→detail, 422/500 notify, offline loading retention, cancel fetch/details typo and callback, late response after unmount.
- Unresolved actions recorded, not corrected; no semantic changes. Redirect setter records only. No server/network/data operations.
- 499 tests, builds, 60 page visuals, 4 notification visuals, 8 checkout traces green.
- Next: actual Dva+React reactive fixture browser integration or low-risk admin UI restoration. Avoid presenting VM runner as real scheduler equivalence.

## Previous payment effect migration (local only, after 34eeab26)
- Migrated save/checkout/checkoutByStripe/cancel into user/models/orderPaymentEffects.js. order.js now state/reducers and explicit query/payment effect wiring.
- Reused committed verbatim recovered-order-factory.cjs as baseline; 66 new effect differential tests, total 492. Success/422/500/network/empty/null/QR/redirect/type2/token/method/callback cases covered.
- Preserved cancel fetch→details→complete sequence (including typo), undefined tokens, thrown error loading behavior. No semantic fix.
- Builds, 60 screenshots, 4 notification regressions, 8 browser checkout traces green. Updated test build redirect interception for new payment effect file; redirects never navigate.
- Next: reactive mocked integration of page+model+request and key HTTP failure, or low-risk admin page/model cleanup. Keep semantic fixes separate.
- No server access/deploy/data change; recovered-ui and tools still untracked.

## Previous payment boundary coverage (local only, after 42c4845c)
- No production code changes. Browser page scenarios now 60, adding absent key, mock token error/malformed token, zero/no-method UI and action checks.
- New check-checkout-effects.mjs compares verbatim recovered order factory (committed test fixture) and current model in browser. 8 outcomes: 422/500/network/QR/redirect/zero/Stripe/malformed token. Both redirect assignments transformed into recording variable only; no URL navigation.
- 426 unit tests, both builds, 60 page comparisons, 4 error notifications and 8 checkout traces green. SDK form/key callback mocked, not full Stripe integration. Notification and effect suites are separate, not end-to-end payment proof.
- Next: integrate reactive order model + request wrapper + page mocks for key HTTP failure and QR->polling transitions, or migrate payment effects themselves. Do not silently fix inherited semantics.
- No server access/deployment; reference dirs untracked.

## Previous order-query slice (local only, after 5efe8238)
- Inventory: 11 user and 22 admin models still contain legacy exports. Chose lower-risk order query effects, not payment mutation/form changes.
- Extracted user/models/orderQueryEffects.js with detail/check/getPaymentMethod/fetch; original selected effects saved in fixtures/models/user-order-query.cjs.
- Added 52 differential cases: success/422/500, empty/null/numeric data, optional/required callback contracts, network rejection. getPaymentMethod missing complete and loading on network throw remain inherited behavior.
- 426 tests, both builds, 52 page comparisons and 4 real notification/mock response comparisons green; no server access or deployment.
- Next: mock browser payment form/key failure coverage OR migrate checkout/save/cancel with explicit original fixtures. Preserve the inherited cancel `details` action spelling unless separately fixing behavior.
- recovered-ui/ and tools/ remain untracked/reference only.

## Previous product/order-info split (local only, after 71627913)
- Extracted ProductInfo/OrderInfo; existing cancellation UI/dispatch unchanged.
- 374 tests, builds, 52 page visual cases and 4 notification cases green. Notification runner uses real request wrapper + real notification/message components with mocked 422/500 and i18n; tests manual desktop close/mobile expiry. Not original error UI differential.
- QR modal screenshot timing fixed with explicit portal/QR visibility wait; full rerun passed without tolerance changes (one intermediate tool timeout at 240s; full run succeeded with 420s).
- Interleaving parity records late completion after unmount, duplicate pending callbacks, multiple timers/latest-only cleanup. No inherited behavior fixed.
- Next: extend payment form/key failure and error state UI coverage; identify heavy dependencies; proceed to admin pages or order models. Keep semantic improvements separately scoped.
- No deployment/server access; reference dirs remain untracked.

## Previous summary/status split (local only, after ea48c94f)
- Extracted OrderPaymentSummary and OrderStatusResult; unchanged layout/calculations/status semantics. Product/order information remains in the controller render.
- 371 tests, builds, 52 visual comparisons green (identical DOM/zero pixels).
- Real request wrapper tested with fake responses for validation/server notifications, forbidden redirect, transport/JSON rejection. Notification recording only, not error UI screenshot coverage.
- Added close-before-complete/complete-before-close polling traces and empty response parity. Empty data still interpreted as complete; network/JSON rejects still unnotified. No inherited risk fixed.
- Next: product/information extraction, real notification component mocked browser error rendering, stronger async interleaving harness. Lifecycle fixes require separate deliberate semantic-change scope.
- No server access or deployment. Reference dirs untracked.

## Previous payment-component split (local only, after 851325cb)
- Extracted checkout/PaymentMethods.jsx and PaymentQrModal.jsx; summary/result remains in page.
- 363 tests, both builds, 52 desktop/mobile comparisons green (identical DOM/zero pixels). Added QR mask close and disabled checkout interaction checks, empty methods/loading/unknown state visuals.
- Differential tests explicitly preserve late callback restart after unmount, missing paid method TypeError and free/missing checkout behavior. No lifecycle fix was made; do not claim these risks are resolved.
- Next: extract summary/status and add actual network-error/QR callback-race coverage. Any lifecycle fix needs a separate intentional behavior change and regression tests.
- No server access/deployment; recovered-ui/ and tools/ remain untracked.

## Previous OrderDetail round (local only, after Order checkpoint 8a64d47f)
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
