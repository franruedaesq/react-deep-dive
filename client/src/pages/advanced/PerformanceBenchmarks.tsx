import CodeExample from '@/components/CodeExample';

export default function PerformanceBenchmarks() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Performance Benchmarks</h1>
          <p className="page-subtitle">
            Practical comparisons between rendering modes and optimization techniques
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Measuring Performance</h2>
          <p className="content-text">
            Before comparing rendering modes, it's important to understand what metrics matter. The key performance metrics for 
            web applications are:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>What It Measures</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TTFB</td>
                  <td>Time to First Byte - server response time</td>
                  <td>&lt; 600ms</td>
                </tr>
                <tr>
                  <td>FCP</td>
                  <td>First Contentful Paint - first visible content</td>
                  <td>&lt; 1.8s</td>
                </tr>
                <tr>
                  <td>LCP</td>
                  <td>Largest Contentful Paint - main content visible</td>
                  <td>&lt; 2.5s</td>
                </tr>
                <tr>
                  <td>CLS</td>
                  <td>Cumulative Layout Shift - visual stability</td>
                  <td>&lt; 0.1</td>
                </tr>
                <tr>
                  <td>FID</td>
                  <td>First Input Delay - interactivity</td>
                  <td>&lt; 100ms</td>
                </tr>
                <tr>
                  <td>TTI</td>
                  <td>Time to Interactive - fully interactive</td>
                  <td>&lt; 3.8s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Rendering Mode Comparison</h2>
          <p className="content-text">
            Here's a practical comparison of how different rendering modes perform on a typical e-commerce product page:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>TTFB</th>
                  <th>FCP</th>
                  <th>LCP</th>
                  <th>JS Bundle</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CSR</td>
                  <td>50ms</td>
                  <td>2.5s</td>
                  <td>3.2s</td>
                  <td>250KB</td>
                  <td>Apps, dashboards</td>
                </tr>
                <tr>
                  <td>SSR</td>
                  <td>200ms</td>
                  <td>1.2s</td>
                  <td>1.8s</td>
                  <td>200KB</td>
                  <td>Dynamic content</td>
                </tr>
                <tr>
                  <td>SSG</td>
                  <td>50ms</td>
                  <td>0.8s</td>
                  <td>1.0s</td>
                  <td>50KB</td>
                  <td>Static content</td>
                </tr>
                <tr>
                  <td>Islands</td>
                  <td>60ms</td>
                  <td>0.9s</td>
                  <td>1.1s</td>
                  <td>80KB</td>
                  <td>Mixed content</td>
                </tr>
                <tr>
                  <td>RSC + Streaming</td>
                  <td>100ms</td>
                  <td>0.7s</td>
                  <td>1.3s</td>
                  <td>120KB</td>
                  <td>Modern apps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="content-text">
            These numbers are based on a typical 100KB HTML page with 50KB of data. Results vary based on network conditions, 
            device capabilities, and implementation details.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Real-World Performance Scenarios</h2>
          <p className="content-text">
            Performance varies significantly based on network conditions. Here's how rendering modes perform on different networks:
          </p>

          <CodeExample
            title="Performance on Different Networks"
            language="javascript"
            code={`// 4G Network (25 Mbps, 50ms latency)
// CSR:  TTFB=50ms,  FCP=2500ms, LCP=3200ms
// SSR:  TTFB=200ms, FCP=1200ms, LCP=1800ms
// SSG:  TTFB=50ms,  FCP=800ms,  LCP=1000ms
// Islands: TTFB=60ms, FCP=900ms, LCP=1100ms

// 3G Network (5 Mbps, 100ms latency)
// CSR:  TTFB=50ms,  FCP=5200ms, LCP=6800ms  ❌ Too slow
// SSR:  TTFB=400ms, FCP=2100ms, LCP=3200ms  ⚠️ Acceptable
// SSG:  TTFB=50ms,  FCP=1200ms, LCP=1500ms  ✅ Good
// Islands: TTFB=80ms, FCP=1300ms, LCP=1600ms ✅ Good

// Slow 3G (400 Kbps, 400ms latency)
// CSR:  TTFB=50ms,  FCP=15000ms, LCP=18000ms ❌ Unusable
// SSR:  TTFB=1200ms, FCP=5000ms, LCP=7000ms  ⚠️ Poor
// SSG:  TTFB=50ms,  FCP=3000ms,  LCP=4000ms  ⚠️ Acceptable
// Islands: TTFB=100ms, FCP=3200ms, LCP=4200ms ⚠️ Acceptable

// Key insight: SSG and Islands shine on slow networks!`}
            description="Performance comparison across different network conditions"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Optimization Techniques</h2>
          <p className="content-text">
            These techniques can significantly improve performance across all rendering modes:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Code Splitting</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Split JavaScript into smaller chunks and load only what's needed. Can reduce initial bundle by 40-60%.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Image Optimization</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Use modern formats (WebP), responsive images, and lazy loading. Can reduce page size by 30-50%.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Caching Strategy</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Implement HTTP caching, CDN caching, and browser caching. Can improve repeat visits by 80-90%.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Compression</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Use gzip or brotli compression for text assets. Can reduce transfer size by 60-70%.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Prefetching</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Prefetch resources that users are likely to need. Can improve perceived performance significantly.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Benchmarking Tools</h2>
          <p className="content-text">
            Tools to measure and analyze performance:
          </p>

          <CodeExample
            title="Performance Measurement Tools"
            language="javascript"
            code={`// 1. Web Vitals API
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);  // Cumulative Layout Shift
getFID(console.log);  // First Input Delay
getFCP(console.log);  // First Contentful Paint
getLCP(console.log);  // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte

// 2. Performance Observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Navigation timing:', entry);
  }
});

observer.observe({ entryTypes: ['navigation'] });

// 3. Custom Timing
const start = performance.now();
// ... do work ...
const end = performance.now();
console.log(\`Took \${end - start}ms\`);

// 4. Lighthouse (CLI)
// lighthouse https://example.com --view

// 5. WebPageTest
// https://www.webpagetest.org

// 6. Chrome DevTools
// Performance tab, Network tab, Lighthouse tab`}
            description="Tools for measuring web performance"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Performance Budget</h2>
          <p className="content-text">
            A performance budget is a limit on metrics that shouldn't be exceeded. Here's a recommended budget:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Budget</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JS Bundle</td>
                  <td>&lt; 170KB</td>
                  <td>Decompresses to ~500KB, takes 1.5s on 3G</td>
                </tr>
                <tr>
                  <td>CSS Bundle</td>
                  <td>&lt; 50KB</td>
                  <td>Blocks rendering, should be minimal</td>
                </tr>
                <tr>
                  <td>Images</td>
                  <td>&lt; 200KB</td>
                  <td>Largest asset type, optimize aggressively</td>
                </tr>
                <tr>
                  <td>Total Page</td>
                  <td>&lt; 500KB</td>
                  <td>2 seconds on 3G network</td>
                </tr>
                <tr>
                  <td>FCP</td>
                  <td>&lt; 1.8s</td>
                  <td>Google Core Web Vital</td>
                </tr>
                <tr>
                  <td>LCP</td>
                  <td>&lt; 2.5s</td>
                  <td>Google Core Web Vital</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Case Study: E-Commerce Product Page</h2>
          <p className="content-text">
            A real-world comparison of rendering modes for an e-commerce product page:
          </p>

          <CodeExample
            title="Product Page Performance Comparison"
            language="javascript"
            code={`// Page: Product listing with 50 items, images, filters, reviews

// CSR Approach
// - Initial HTML: 5KB
// - JavaScript: 250KB (React + app code)
// - Data: 100KB (product list JSON)
// Total: 355KB
// TTFB: 50ms, FCP: 2.5s, LCP: 3.2s
// Problem: Slow initial render, large JS bundle

// SSR Approach
// - Initial HTML: 200KB (includes product list)
// - JavaScript: 200KB (hydration code)
// - Data: Already in HTML
// Total: 400KB
// TTFB: 200ms, FCP: 1.2s, LCP: 1.8s
// Better: Faster initial render, but larger HTML

// SSG + ISR Approach
// - Initial HTML: 180KB (pre-rendered)
// - JavaScript: 50KB (minimal, islands only)
// - Data: Already in HTML
// Total: 230KB
// TTFB: 50ms, FCP: 0.8s, LCP: 1.0s
// Revalidate: Every hour
// Best: Fastest, smallest bundle, but less dynamic

// Islands Approach
// - Initial HTML: 150KB (static content)
// - JavaScript: 80KB (only filter and cart islands)
// - Data: Already in HTML
// Total: 230KB
// TTFB: 60ms, FCP: 0.9s, LCP: 1.1s
// Best of both: Static content + interactive islands

// Recommendation: Use Islands Architecture
// - Pre-render product list (SSG)
// - Make filter/cart interactive (islands)
// - Revalidate every hour
// - Result: 3x faster than CSR, 50% smaller bundle`}
            description="Real-world performance comparison for e-commerce"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Best Practices</h2>
          <p className="content-text">
            Follow these practices for optimal performance:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Measure first:</strong> Establish baseline metrics before optimizing</li>
            <li><strong>Set budgets:</strong> Define performance budgets and enforce them</li>
            <li><strong>Choose the right rendering mode:</strong> Match mode to content type</li>
            <li><strong>Optimize images:</strong> Use modern formats and responsive images</li>
            <li><strong>Minimize JavaScript:</strong> Code split and tree-shake unused code</li>
            <li><strong>Cache aggressively:</strong> Use HTTP caching and CDNs</li>
            <li><strong>Test on real devices:</strong> Performance varies on different hardware</li>
            <li><strong>Monitor continuously:</strong> Track metrics in production</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Performance is not a one-time optimization but an ongoing process. By understanding the trade-offs between rendering 
            modes, measuring key metrics, and applying optimization techniques, you can build fast, responsive applications that 
            provide excellent user experiences across all devices and network conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
