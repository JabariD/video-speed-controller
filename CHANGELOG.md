# Changelog

## v0.1.4 — 2026-03-02

### Added
- Hover the speed badge to reveal **+** and **−** buttons
- **+** jumps speed up by 1x; **−** steps down by 1x when above 1x, or by 0.1x
  when at or below 1x (so you step 1.0 → 0.9 → 0.8 rather than 1.0 → 0.1)

### Changed
- Speed display now uses one decimal place (`1.1x`) instead of two (`1.10x`)

---

## v0.1.3 — prior

- Fix TypeError in handleKeydown when `e.key` is undefined

## v0.1.2

- Prevent speed reversion on video change (YouTube navigation fix)

## v0.1.1

- Add `r` key to reset speed to 1.0x

## v0.1.0

- Initial release: faint ghost-UI speed badge, `s`/`d` hotkeys, MutationObserver
  for dynamic video detection
