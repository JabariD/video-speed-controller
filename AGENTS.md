# AGENTS.md

## Tech Stack
- **Type**: Chrome/Browser Extension (Manifest V3)
- **Language**: Vanilla JavaScript (ES6+)
- **Components**: 
  - `content.js`: Main logic injected into pages. Handles video detection, speed control, and UI indicators.
  - `styles.css`: Injected styles for the speed indicator badge.
  - `manifest.json`: Extension configuration and permissions.

## Critical Code Paths
- **Video Detection**: `init()` starts a `MutationObserver` on `document.body` and a fallback `setInterval` to find `<video>` elements.
- **Speed Persistence**: `createIndicator()` attaches a `ratechange` listener to every video to prevent players (like YouTube) from resetting the speed to 1x.
- **UI Updates**: `updateVideoSpeed()` syncs the `video.playbackRate` with the `globalPlaybackRate` and toggles the `.vsc-active` class for visual feedback.

## Key Hotkeys
- `d`: Increase speed (+0.1)
- `s`: Decrease speed (-0.1)
- `r`: Reset speed (1.0)

## Development Notes
- No build step required. Load the root directory as an "Unpacked Extension" in Chrome.
- Extension uses a global `videoStates` Map to track active indicators and timers for each video element on the page.
