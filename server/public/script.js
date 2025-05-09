// Rybbit Analytics Script
(function () {
  const scriptTag = document.currentScript;
  const ANALYTICS_HOST = scriptTag.getAttribute("src").split("/script.js")[0];

  if (!ANALYTICS_HOST) {
    console.error("Please provide a valid analytics host");
    return;
  }

  const SITE_ID =
    scriptTag.getAttribute("data-site-id") || scriptTag.getAttribute("site-id");

  if (!SITE_ID || isNaN(Number(SITE_ID))) {
    console.error(
      "Please provide a valid site ID using the data-site-id attribute"
    );
    return;
  }

  const debounceDuration = scriptTag.getAttribute("data-debounce")
    ? Math.max(0, parseInt(scriptTag.getAttribute("data-debounce")))
    : 500;

  const autoTrackSpa = scriptTag.getAttribute("data-track-spa") !== "false";
  const .replace(/\*/g, "[^/]+");
    return new RegExp(`^${regexString}$`);
  }

  function findMatchingPattern(path, patterns) {
    for (const pattern of patterns) {
      try {
        const regex = patternToRegex(pattern);
        if (regex.test(path)) {
          return pattern; // Return the pattern string itself
        }
      } catch (e) {
        console.error(`Invalid pattern: ${pattern}`, e);
      }
    }
    return null;
  }

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const track = (eventType = "pageview", eventName = "", properties = {}) => {
    if (
      eventType === "custom_event" &&
      (!eventName || typeof eventName !== "string")
    ) {
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
