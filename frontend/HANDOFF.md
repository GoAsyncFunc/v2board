# Restoration checkpoint

## Goal and current boundary
Deliver independent, maintainable user/admin React source preserving the existing UI. Independent builds work; full source cleanup is NOT complete. Many pages/models and hashed vendor sources still need naming, decomposition and dependency replacement. Do not equate test count with restoration percentage.

## Latest completed work
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
2. Clean Order/OrderDetail pages and corresponding models with pre-change fixtures and behavior comparisons. Order.jsx includes embedded third-party mobile-list code: identify/extract rather than blindly rename it.
3. Continue remaining user pages (dashboard, profile, invite, knowledge, tickets, register/forget password) and admin pages (only login manually rewritten so far).
4. Replace/name remaining hashed vendor modules with verified npm dependencies; preserve single React 16.14.0 instance until an explicitly tested upgrade.
5. Improve deferred legacy behaviors separately: network-error loading cleanup, failed-sort rollback, missing-price handling, random keys. Avoid changing semantics silently during migration.

## Repository and deployment
- Before this checkpoint all frontend/, recovered-ui/, tools/ were untracked. Commit includes the self-contained frontend project, not only latest deltas; recovery/tool workspaces are intentionally left untracked.
- Normal frontend build/dev/page-screenshot tests are self-contained. Historical one-time migration scripts and `check-browser.mjs` reference the local recovery workspace; do not rerun migration over edited source.
- Server remains restored-20260911-010759 (200-test-era version); subsequent plan/page/checkout cleanup is LOCAL ONLY. See DEPLOYMENT.md for historical URLs/rollback.
- No deployment or real server data operations authorized for this checkpoint. Do not run deployment scripts or live write actions without a new request. Do not put test-account credentials into repository files.
