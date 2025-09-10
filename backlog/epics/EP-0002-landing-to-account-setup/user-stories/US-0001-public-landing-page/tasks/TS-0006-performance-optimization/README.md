# Task: Optimize for Core Web Vitals and Performance

## Overview

- **ID**: TS-0006-performance-optimization
- **User Story**: [US-0001-public-landing-page](../../README.md)
- **Assignee**: Frontend Developer
- **Priority**: High
- **Status**: To Do
- **Effort**: 8-10 hours
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Description

Optimize the landing page for Core Web Vitals and overall performance metrics, ensuring fast loading times, smooth interactions, and excellent user experience. This includes image optimization, code splitting, font loading optimization, and implementing performance monitoring.

## Context

### Background

Performance directly impacts conversion rates and SEO rankings. The landing page must load quickly on all devices and connection speeds to maximize user acquisition. Google's Core Web Vitals are critical ranking factors that affect organic traffic.

### Related Work

- Final optimization task after all components are implemented
- Depends on all previous tasks (TS-0001 through TS-0005)
- Foundation for production deployment and monitoring

## Definition of Done

- [ ] **Code**: Performance optimizations implemented across all components
- [ ] **Tests**: Performance tests and monitoring setup
- [ ] **Integration**: Optimizations work across all browsers and devices
- [ ] **Documentation**: Performance guidelines and monitoring setup documented
- [ ] **Review**: Performance audit completed and approved
- [ ] **Standards**: Meets Google Core Web Vitals thresholds
- [ ] **Performance**: Lighthouse score > 90 on mobile and desktop
- [ ] **Security**: Performance optimizations don't introduce vulnerabilities
- [ ] **Accessibility**: Performance improvements maintain accessibility
- [ ] **Deployment**: Production performance monitoring configured

## Technical Requirements

### Core Web Vitals Targets (Conversion-Optimized)

- **Largest Contentful Paint (LCP)**: < 1.8 seconds (aggressive target for maximum conversion)
- **First Input Delay (FID)**: < 50 milliseconds (instant response for touch interactions)
- **Cumulative Layout Shift (CLS)**: < 0.05 (half of Google's recommendation for premium UX)
- **First Contentful Paint (FCP)**: < 1.2 seconds (psychological threshold for "instant")
- **Time to Interactive (TTI)**: < 2.5 seconds (maintain engagement momentum)
- **Interaction to Next Paint (INP)**: < 200ms (new Core Web Vital for 2024)

### Perceived Performance Architecture

- **Skeleton Loading System**: Intelligent placeholder matching final content layout
- **Progressive Enhancement Cascade**: Critical content renders immediately, enhancements load progressively
- **Anticipatory Loading**: Preload likely next actions based on user behavior patterns
- **Micro-Feedback Loops**: Instant visual acknowledgment of all user interactions (< 16ms)
- **Smart Resource Prioritization**: Above-the-fold critical path optimization with background prefetching
- **Conversion-Focused Loading Strategy**: CTA buttons and forms load before decorative elements

### Advanced Performance Metrics

- **Initial Bundle Size**: < 150KB gzipped (reduced for mobile-first approach)
- **Time to First Meaningful Paint**: < 1.5 seconds (psychological engagement threshold)
- **Speed Index**: < 2.0 seconds (visual completeness perception)
- **Resource Loading Intelligence**:
  - Adaptive bitrate for images based on connection speed
  - Progressive JPEG for immediate preview, WebP/AVIF for quality
  - Font subsetting with unicode-range optimization
- **JavaScript Performance**:
  - Tree-shaking with dead code elimination
  - Code splitting with intelligent chunk boundaries
  - Service worker caching with stale-while-revalidate strategy
- **Conversion-Focused Optimizations**:
  - Form fields preload before user interaction
  - CTA button hover states precompute animations
  - Success states prefetch to eliminate post-action delays

## Implementation Guidelines

### Architecture

```typescript
// Performance monitoring setup
interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  tti: number;
}

// Optimization strategies
const optimizationStrategies = {
  images: "next/image with WebP, responsive sizing",
  fonts: "next/font with preload and fallback",
  code: "Dynamic imports and tree shaking",
  assets: "Compression and caching headers",
  monitoring: "Real User Monitoring (RUM)",
};
```

### Technology Stack

- **Image Optimization**: Next.js Image component with WebP
- **Font Optimization**: next/font/google with preload
- **Bundle Optimization**: Webpack tree shaking and code splitting
- **Monitoring**: Web Vitals API and analytics integration
- **CDN**: Optimized asset delivery

### Coding Standards

- Use Next.js performance best practices
- Implement lazy loading for below-the-fold content
- Optimize critical rendering path
- Minimize layout shifts with size hints
- Use efficient image formats and compression

## Artifacts

### Input Artifacts

- All implemented components from previous tasks
- [Performance Best Practices Guide](https://web.dev/fast/)
- Core Web Vitals measurement tools

### Output Artifacts

- [ ] **Code**: Performance optimization implementations
- [ ] **Config**: Next.js performance configuration
- [ ] **Tests**: `apps/landing/__tests__/performance/core-web-vitals.test.ts`
- [ ] **Monitoring**: Performance monitoring setup
- [ ] **Documentation**: `apps/landing/docs/performance-guide.md`
- [ ] **Reports**: Baseline performance audit report

## Testing Strategy

### Performance Testing Tools

- **Google Lighthouse**: Desktop and mobile audits
- **PageSpeed Insights**: Real-world performance data
- **WebPageTest**: Detailed waterfall analysis
- **Chrome DevTools**: Performance profiling
- **Playwright**: Automated performance testing

### Monitoring Setup

```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to monitoring service
  analytics.track("Web Vital", {
    name: metric.name,
    value: metric.value,
    url: window.location.href,
  });
}

// Track all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Budgets

```json
{
  "budgets": {
    "initial": {
      "javascript": "200KB",
      "css": "50KB",
      "images": "500KB",
      "fonts": "100KB"
    },
    "metrics": {
      "lcp": 2500,
      "fid": 100,
      "cls": 0.1
    }
  }
}
```

## Dependencies

### Prerequisites

- [ ] All previous tasks (TS-0001 through TS-0005) completed
- [ ] Components integrated into full landing page
- [ ] Responsive design validated

### Blockers

- None currently identified

### External Dependencies

- Next.js optimization features
- CDN configuration for asset delivery
- Performance monitoring service setup

## Risks & Assumptions

### Technical Risks

- **Third-party script performance impact** - **Impact**: Medium - **Mitigation**: Careful script loading optimization
- **Image loading performance** - **Impact**: High - **Mitigation**: Aggressive optimization and WebP format
- **Mobile device performance** - **Impact**: High - **Mitigation**: Mobile-first optimization approach

### Assumptions

- Users expect sub-3-second loading times
- Image optimization will provide the largest performance gains
- Font loading optimization is critical for CLS
- Bundle size optimization will improve mobile performance

## Implementation Notes

### Image Optimization Strategy

```typescript
// Next.js Image optimization
import Image from 'next/image';

// Hero section image
<Image
  src="/hero-illustration.png"
  alt="TeamHunt platform illustration"
  width={800}
  height={600}
  priority // Above the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Low quality placeholder
  sizes="(max-width: 768px) 100vw, 50vw"
  className="w-full h-auto"
/>

// Below-the-fold images
<Image
  src="/workflow-step.png"
  alt="Workflow step illustration"
  width={400}
  height={300}
  loading="lazy" // Lazy load
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 25vw"
/>
```

### Font Loading Optimization

```typescript
// next.config.js
module.exports = {
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: {
          subsets: ["latin"],
          display: "swap", // Prevent layout shift
          preload: true, // Preload critical fonts
        },
      },
    ],
  },
};

// Layout component
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"], // System font fallback
});
```

### Code Splitting and Bundle Optimization

```typescript
// Dynamic imports for non-critical components
const LazyWorkflowSection = dynamic(
  () => import('./components/workflow/WorkflowSection'),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
    ssr: true, // Still render on server
  }
);

// Tree shaking optimization
// Use named imports only
import { Button } from '@teamhunt/ui';
// Avoid: import * as UI from '@teamhunt/ui';
```

### Critical CSS Inlining

```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true, // Inline critical CSS
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```

### Performance Monitoring Implementation

```typescript
// app/layout.tsx - Performance monitoring
"use client";

import { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  if (typeof window !== "undefined") {
    (window as any).gtag?.("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      custom_parameter_1: metric.id,
      custom_parameter_2: metric.navigationType,
    });
  }
}

export function PerformanceMonitoring() {
  useEffect(() => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);

  return null;
}
```

### Resource Hints and Preloading

```typescript
// app/layout.tsx - Resource optimization
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/hero-illustration.webp"
          as="image"
          type="image/webp"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Compression and Caching

```javascript
// next.config.js - Compression and caching
module.exports = {
  compress: true, // Enable gzip compression

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },
};
```

### Performance Testing Automation

```typescript
// __tests__/performance/core-web-vitals.test.ts
import { test, expect } from "@playwright/test";

test.describe("Core Web Vitals", () => {
  test("should meet LCP threshold", async ({ page }) => {
    await page.goto("/");

    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ["largest-contentful-paint"] });
      });
    });

    expect(lcp).toBeLessThan(2500); // 2.5 seconds
  });

  test("should meet CLS threshold", async ({ page }) => {
    await page.goto("/");

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ["layout-shift"] });

        // Resolve after page is fully loaded
        setTimeout(() => resolve(clsValue), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });
});
```

### Gotchas

- Ensure performance optimizations don't break functionality
- Test performance on slow networks (3G simulation)
- Verify font loading doesn't cause layout shift
- Check image loading doesn't block critical rendering
- Monitor third-party script impact on performance
- Test performance regression with each deployment

### Resources

- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Performance Features](https://nextjs.org/docs/basic-features/built-in-css-support)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
- [Font Loading Best Practices](https://web.dev/font-display/)

## Success Criteria

### Performance Targets

- **Lighthouse Performance Score**: > 90 (mobile and desktop)
- **Core Web Vitals**: All metrics in "Good" range
- **Bundle Size**: Initial load < 200KB gzipped
- **Time to Interactive**: < 3.5 seconds on 3G

### Monitoring Alerts

- LCP > 2.5 seconds
- CLS > 0.1
- FID > 100 milliseconds
- Page load time > 3 seconds

## Progress Log

### [To Be Updated] - [Assignee]

Task creation with comprehensive performance optimization strategy and implementation details

---

**Template Version**: 1.0
**Last Template Update**: 2025-09-09
