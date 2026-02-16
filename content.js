(function() {
  let globalPlaybackRate = 1.0;
  const SPEED_STEP = 0.1;
  const MIN_SPEED = 0.1;
  const MAX_SPEED = 16.0;
  const FADE_TIMEOUT = 1000;

  // Track all videos in the current document/frame
  const videoStates = new Map();

  function createIndicator(video) {
    if (videoStates.has(video)) return videoStates.get(video).indicator;

    const container = document.createElement('div');
    container.className = 'vsc-indicator-container';
    
    const badge = document.createElement('div');
    badge.className = 'vsc-indicator-badge';
    badge.innerText = `${globalPlaybackRate.toFixed(2)}x`;
    
    container.appendChild(badge);

    // Try to find a suitable parent. Most players have a container.
    // If we append to the video directly, it doesn't always show.
    // If we append to the parent, we need to ensure the parent is relative/absolute.
    const targetParent = video.parentElement || document.body;
    
    // Ensure parent can contain absolute children
    if (window.getComputedStyle(targetParent).position === 'static') {
      targetParent.style.position = 'relative';
    }

    targetParent.appendChild(container);
    
    const state = {
      indicator: container,
      badge: badge,
      fadeTimer: null
    };
    
    videoStates.set(video, state);

    // Re-apply speed if it changes (e.g. YouTube resets it on new video)
    video.addEventListener('ratechange', () => {
      if (video.playbackRate !== globalPlaybackRate) {
        updateVideoSpeed(video, globalPlaybackRate);
      }
    });

    return container;
  }

  function updateVideoSpeed(video, rate) {
    video.playbackRate = rate;
    
    const state = videoStates.get(video);
    if (state) {
      state.badge.innerText = `${rate.toFixed(2)}x`;
      
      // Visual feedback
      state.indicator.classList.add('vsc-active');
      
      if (state.fadeTimer) clearTimeout(state.fadeTimer);
      state.fadeTimer = setTimeout(() => {
        state.indicator.classList.remove('vsc-active');
      }, FADE_TIMEOUT);
    }
  }

  function applyGlobalSpeed() {
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
      if (!videoStates.has(v)) createIndicator(v);
      updateVideoSpeed(v, globalPlaybackRate);
    });
  }

  function handleKeydown(e) {
    // 1. Check for input fields
    const active = document.activeElement;
    if (active && (
      active.tagName === 'INPUT' || 
      active.tagName === 'TEXTAREA' || 
      active.isContentEditable
    )) {
      return;
    }

    if (!e.key) return;
    const key = e.key.toLowerCase();
    if (key === 'd') {
      globalPlaybackRate = Math.min(globalPlaybackRate + SPEED_STEP, MAX_SPEED);
      applyGlobalSpeed();
    } else if (key === 's') {
      globalPlaybackRate = Math.max(globalPlaybackRate - SPEED_STEP, MIN_SPEED);
      applyGlobalSpeed();
    } else if (key === 'r') {
      globalPlaybackRate = 1.0;
      applyGlobalSpeed();
    }
  }

  // Monitor for new videos (Dynamic content)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === 'VIDEO') {
          createIndicator(node);
          updateVideoSpeed(node, globalPlaybackRate);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('video').forEach(v => {
            createIndicator(v);
            updateVideoSpeed(v, globalPlaybackRate);
          });
        }
      }
    }
  });

  // Initialization
  function init() {
    document.addEventListener('keydown', handleKeydown, true);
    
    // Initial scan
    document.querySelectorAll('video').forEach(v => {
      createIndicator(v);
      updateVideoSpeed(v, globalPlaybackRate);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Periodically check for videos that might have been missed or have wrong speed
    setInterval(() => {
      document.querySelectorAll('video').forEach(v => {
        if (!videoStates.has(v)) {
          createIndicator(v);
          updateVideoSpeed(v, globalPlaybackRate);
        } else if (v.playbackRate !== globalPlaybackRate) {
          updateVideoSpeed(v, globalPlaybackRate);
        }
      });
    }, 1000);
  }

  // Run on load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();
