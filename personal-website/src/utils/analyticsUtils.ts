interface EventProps {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface PageViewProps {
  path: string;
  title: string;
}

declare global {
  interface Window {
    ga: Function & {
      q?: any[];
      l?: number;
    };
    GoogleAnalyticsObject: string;
  }
}

// Initialize Google Analytics
export const initGA = (trackingId: string): void => {
  if (typeof window !== 'undefined' && !window.ga) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.google-analytics.com/analytics.js';
    document.head.appendChild(script);

    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function(...args: any[]) {
      (window.ga.q = window.ga.q || []).push(args);
    };
    window.ga.l = +new Date();

    window.ga('create', trackingId, 'auto');
  }
};

// Track page views
export const trackPageView = ({ path, title }: PageViewProps): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('set', { page: path, title });
    window.ga('send', 'pageview');
  }
};

// Track events
export const trackEvent = ({ category, action, label, value }: EventProps): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'event', category, action, label, value);
  }
};

// Track user timing
export const trackTiming = (category: string, variable: string, value: number, label?: string): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'timing', category, variable, value, label);
  }
};

// Track exceptions
export const trackException = (description: string, fatal: boolean = false): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'exception', {
      exDescription: description,
      exFatal: fatal,
    });
  }
};

// Track social interactions
export const trackSocial = (network: string, action: string, target: string): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'social', network, action, target);
  }
};

// Performance tracking
export const measurePageLoad = (): void => {
  if (typeof window !== 'undefined' && window.performance) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    trackTiming('Page Load', 'Total Load Time', pageLoadTime);
  }
};

// Custom dimension tracking
export const setCustomDimension = (dimensionIndex: number, value: string): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('set', `dimension${dimensionIndex}`, value);
  }
};

// User ID tracking
export const setUserId = (userId: string): void => {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('set', 'userId', userId);
  }
}; 