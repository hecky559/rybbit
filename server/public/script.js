
        console.error(`Invalid pattern: ${pattern}`, e);
      }
    }
    return null;
  }

  function 
      console.error(
        "Event name is required and must be a string for custom events"
      );
      return;
    }

    const url = new URL(window.location.href);
    let pathname = url.pathname;

    if (findMatchingPattern(pathname, skipPatterns)) {
      return;
    }

    const maskMatch = findMatchingPattern(pathname, maskPatterns);
    if (maskMatch) {
      pathname = maskMatch;
    }

    const payload = {
      site_id: SITE_ID,
      hostname: url.hostname,
      pathname: pathname,
      querystring: trackQuerystring ? url.search : "",
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      language: navigator.language,
      page_title: document.title,
      referrer: document.referrer,
      type: eventType,
      event_name: eventName,
      properties:
        eventType === "custom_event" ? JSON.stringify(properties) : undefined,
    };

    fetch(`${ANALYTICS_HOST}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      mode: "cors",
      keepalive: true,
    }).catch(console.error);
  };

  const trackPageview = () => track("pageview");

  const debouncedTrackPageview =
    debounceDuration > 0
      ? debounce(trackPageview, debounceDuration)
      : trackPageview;

  if (autoTrackSpa) {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      debouncedTrackPageview();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      debouncedTrackPageview();
    };

    window.addEventListener("popstate", debouncedTrackPageview);
  }

  window.rybbit = {
    track,
    pageview: trackPageview,
    event: (name, properties = {}) => track("custom_event", name, properties),
  };

  trackPageview();
})();
