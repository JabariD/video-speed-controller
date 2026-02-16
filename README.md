# Integrated Video Speed Controller

A minimal, "ghost-UI" Chrome extension to control HTML5 video playback rates with precision.

## Features

- **Integrated UI**: A faint speed indicator (e.g., `1.10x`) appears in the top-left of the video container.
- **Minimalist Design**: Starts at 15% opacity. Pulses to 90% when speed changes, then fades back.
- **Glassmorphism**: Uses background blur to remain readable over any video content.
- **Global Tab Sync**: Adjusting the speed affects all videos within the current tab (perfect for feeds).
- **Smart Input Detection**: Automatically disables hotkeys while you are typing in comment boxes or search bars.

## Controls

- **`d`**: Increase speed by **0.1x**
- **`s`**: Decrease speed by **0.1x**

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the extension folder.

## Technical Details

- **Manifest V3**: Built using the latest Chrome extension standards.
- **Dynamic DOM Handling**: Uses `MutationObserver` to detect videos added after the page loads (e.g., YouTube navigation).
- **Fullscreen Support**: Injected via the video's parent container to ensure it stays visible during native fullscreen playback.
