import CodeExample from '@/components/CodeExample';

export default function IncrementalStaticRegeneration() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Incremental Static Regeneration (ISR)</h1>
          <p className="page-subtitle">
            Update static pages after deployment without rebuilding—the best of SSG and SSR combined
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is ISR?</h2>
          <p className="content-text">
            Incremental Static Regeneration (ISR) is a rendering strategy that allows you to update static pages on-demand 
            after deployment without rebuilding the entire site. Instead of regenerating all pages at build time (SSG) or 
            rendering every request on the server (SSR), ISR generates pages on-demand and caches them for subsequent requests.
          </p>
          <p className="content-text">
            The key insight is that not all pages need to be updated at the same frequency. A product page might need updates 
            every hour, while a blog post might only need updates when explicitly revalidated. ISR lets you set different 
            revalidation times for different pages.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">The Problem ISR Solves</h2>
          <p className="content-text">
            Traditional approaches have significant limitations:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Approach</th>
                  <th>Problem</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pure SSG</td>
                  <td>All pages regenerated at build time; stale data until next build</td>
                  <td>Product catalog with 10,000 items—rebuild takes 30 minutes</td>
                </tr>
                <tr>
                  <td>Pure SSR</td>
                  <td>Every request hits the server; slower response times, higher costs</td>
                  <td>Blog with 100,000 posts—each request requires database query</td>
                </tr>
                <tr>
                  <td>ISR</td>
                  <td>None—best of both worlds!</td>
                  <td>Pages cached but updated every hour without full rebuild</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">How ISR Works</h2>
          <p className="content-text">
            ISR operates in three phases:
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Phase 1: Build Time</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Some pages are pre-generated at build time. You specify which pages to generate upfront (e.g., popular products, 
                recent blog posts). Pages not generated at build time will be generated on first request.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Phase 2: First Request</h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                When a user requests a page that wasn't pre-generated, the server renders it on-demand and caches the result. 
                The user sees the generated page, and subsequent users get the cached version.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Phase 3: Revalidation</h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                After the revalidation period expires, the next request triggers a background regeneration. The old cached page 
                is served while the new page is generated. Once complete, the cache is updated.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">ISR Timeline Example</h2>
          <p className="content-text">
            Here's a concrete example of how ISR works over time:
          </p>

          <CodeExample
            title="ISR Timeline for a Product Page"
            language="javascript"
            code={`// Product page with ISR: revalidate every 60 seconds

// 0:00 - Build time
// - Generate top 100 products
// - Product #5 is generated and cached

// 0:05 - User requests product #5
// - Serve cached page (instant)
// - Cache is still valid

// 0:30 - User requests product #5001 (not pre-generated)
// - Server renders on-demand
// - Cache the result
// - Serve to user (slightly slower)

// 0:45 - Product #5 data updates in database
// - Cache is still valid (revalidate time not reached)
// - Users still see old data

// 1:05 - User requests product #5
// - Revalidation period expired (60 seconds)
// - Serve stale cached page immediately
// - Start background regeneration with fresh data
// - Next request gets fresh data

// 1:06 - User requests product #5
// - Serve newly generated page with fresh data
// - Cache updated

// Key insight: Users never wait for regeneration!
// Old page served while new one is generated in background`}
            description="How ISR handles requests and revalidation over time"
          />
        </div>

        <div className="section">
          <h2 className="section-title">ISR Implementation (Next.js)</h2>
          <p className="content-text">
            ISR is most commonly used with Next.js. Here's how to implement it:
          </p>

          <CodeExample
            title="Basic ISR with Next.js"
            language="javascript"
            code={`// app/products/[id]/page.tsx

// Define which pages to generate at build time
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products?limit=100')
    .then(r => r.json());
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: \${product.price}</p>
    </div>
  );
}

// Configure ISR revalidation - revalidate every hour
export const revalidate = 3600;

async function getProduct(id) {
  const res = await fetch(
    \`https://api.example.com/products/\${id}\`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) return null;
  return res.json();
}`}
            description="Basic ISR implementation in Next.js App Router"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Advanced ISR Patterns</h2>
          <p className="content-text">
            ISR supports several advanced patterns for different use cases:
          </p>

          <CodeExample
            title="Advanced ISR Patterns"
            language="javascript"
            code={`// Pattern 1: On-Demand Revalidation
// Revalidate a page immediately when data changes

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  const path = request.nextUrl.searchParams.get('path');
  
  try {
    await revalidatePath(path);
    return Response.json({ revalidated: true });
  } catch (err) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

// Usage: POST /api/revalidate?secret=X&path=/products/123

---

// Pattern 2: Stale-While-Revalidate (SWR)
// Serve stale content while regenerating in background

export const revalidate = 3600;

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600, tags: ['data'] }
  });
  
  return <div>{/* render data */}</div>;
}

---

// Pattern 3: Dynamic Revalidation
// Different pages revalidate at different intervals

export async function generateStaticParams() {
  const items = await fetch('https://api.example.com/items')
    .then(r => r.json());
  
  return items.map(item => ({
    id: item.id.toString(),
  }));
}

// Pattern 4: Fallback Pages
// Show fallback for pages not pre-generated

export const dynamicParams = true;
export const revalidate = 3600;

export default async function Page({ params }) {
  try {
    const data = await getDataWithTimeout(params.id, 5000);
    return <div>{/* render data */}</div>;
  } catch (error) {
    return <div>Loading... Please refresh</div>;
  }
}`}
            description="Advanced ISR patterns for production applications"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Real-World Use Cases</h2>
          <p className="content-text">
            ISR is ideal for these scenarios:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">E-Commerce Product Catalog</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Pre-generate top 1,000 products at build time. Generate other products on first request. Revalidate every hour 
                to catch price/inventory changes. Result: Fast page loads, fresh data, no server overload.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Blog with Comments</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Pre-generate all published posts at build time. Revalidate every 5 minutes to show new comments. On-demand 
                revalidate when a new post is published. Result: Instant page loads, fresh comments, no database queries.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Documentation Site</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Generate all docs at build time. On-demand revalidate when docs are updated. Revalidate search index every hour. 
                Result: Instant navigation, fresh content, searchable docs.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">News Website</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Pre-generate homepage and top stories. Generate article pages on first request. Revalidate every 5 minutes for 
                breaking news. On-demand revalidate when new articles are published.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">When to Use ISR</h2>
          <p className="content-text">
            ISR is the best choice when:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>You have many pages:</strong> Thousands or millions of pages that can't all be pre-generated</li>
            <li><strong>Data changes periodically:</strong> Content updates on a predictable schedule (hourly, daily, etc.)</li>
            <li><strong>You need fast initial loads:</strong> Pre-generated pages serve instantly from CDN</li>
            <li><strong>You need fresh data:</strong> Revalidation ensures data doesn't get too stale</li>
            <li><strong>You want to avoid server load:</strong> Cached pages reduce database queries and server requests</li>
            <li><strong>SEO is important:</strong> Static HTML is better for search engines than client-rendered content</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">When NOT to Use ISR</h2>
          <p className="content-text">
            ISR is NOT the right choice when:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Data changes in real-time:</strong> Stock prices, live scores, chat messages—use SSR or WebSockets</li>
            <li><strong>Personalized content:</strong> User-specific data—use SSR or client-side rendering</li>
            <li><strong>User authentication required:</strong> Protected pages—use SSR with session validation</li>
            <li><strong>Few pages:</strong> If you have &lt;100 pages, just pre-generate everything with SSG</li>
            <li><strong>Unpredictable updates:</strong> If you can't predict when data changes, SSR is more reliable</li>
            <li><strong>Complex dependencies:</strong> If pages depend on multiple data sources that update independently</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Comparison with Other Rendering Modes</h2>
          <p className="content-text">
            Here's how ISR compares to other approaches:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>SSG</th>
                  <th>ISR</th>
                  <th>SSR</th>
                  <th>CSR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Build Time</td>
                  <td>Slow (all pages)</td>
                  <td>Fast (some pages)</td>
                  <td>Fast (no pages)</td>
                  <td>Fast (no pages)</td>
                </tr>
                <tr>
                  <td>Initial Load</td>
                  <td>Instant</td>
                  <td>Instant (cached) / Slow (first request)</td>
                  <td>Slow</td>
                  <td>Very slow</td>
                </tr>
                <tr>
                  <td>Data Freshness</td>
                  <td>Stale (until rebuild)</td>
                  <td>Fresh (revalidates periodically)</td>
                  <td>Always fresh</td>
                  <td>Depends on client</td>
                </tr>
                <tr>
                  <td>Server Load</td>
                  <td>None (static)</td>
                  <td>Low (only revalidations)</td>
                  <td>High (every request)</td>
                  <td>None (client-side)</td>
                </tr>
                <tr>
                  <td>Scalability</td>
                  <td>Excellent (CDN)</td>
                  <td>Excellent (CDN + caching)</td>
                  <td>Limited (server bound)</td>
                  <td>Excellent (client-side)</td>
                </tr>
                <tr>
                  <td>SEO</td>
                  <td>Perfect</td>
                  <td>Perfect</td>
                  <td>Good</td>
                  <td>Poor</td>
                </tr>
                <tr>
                  <td>Real-time Data</td>
                  <td>No</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Personalization</td>
                  <td>No</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Pros and Cons</h2>
          <p className="content-text">
            Understanding the trade-offs is crucial for making the right decision:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 text-lg">Pros</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Instant page loads:</strong> Pre-generated pages serve from CDN instantly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Fresh data:</strong> Periodic revalidation keeps data current</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Low server load:</strong> Cached pages reduce database queries</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Scales infinitely:</strong> CDN handles traffic, not your server</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Perfect for SEO:</strong> Static HTML is ideal for search engines</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>Cost-effective:</strong> Minimal server resources needed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span><strong>On-demand revalidation:</strong> Update pages immediately when needed</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3 text-lg">Cons</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>Stale data window:</strong> Data can be stale until revalidation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>First request slow:</strong> Non-pre-generated pages are slow initially</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>No real-time updates:</strong> Can't show live data or personalization</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>Complexity:</strong> More complex than pure SSG or SSR</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>Revalidation overhead:</strong> Background regeneration uses resources</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>Debugging challenges:</strong> Hard to debug stale data issues</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span><strong>Framework dependent:</strong> Not all frameworks support ISR</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">ISR vs SSG vs SSR: Decision Tree</h2>
          <p className="content-text">
            Use this decision tree to choose the right rendering mode:
          </p>

          <CodeExample
            title="Choosing the Right Rendering Mode"
            language="javascript"
            code={`// Decision Tree for Rendering Mode Selection

// Question 1: Do you need real-time data?
if (needsRealTimeData) {
  if (isUserSpecific) {
    return 'CSR or SSR with authentication';
  } else {
    return 'SSR or Streaming SSR';
  }
}

// Question 2: How many pages do you have?
if (pageCount < 100) {
  return 'SSG (pre-generate all pages)';
}

// Question 3: How often does data change?
if (dataChangesRealTime) {
  return 'SSR';
} else if (dataChangesOften) { // hourly, daily
  return 'ISR with short revalidation (5-60 minutes)';
} else if (dataChangesRarely) { // weekly, monthly
  return 'ISR with long revalidation (1-24 hours)';
} else {
  return 'SSG with on-demand revalidation';
}

// Examples:
// Blog with 100 posts, updated weekly → SSG
// Blog with 10,000 posts, updated daily → ISR (1 hour)
// E-commerce with 1M products, prices change hourly → ISR (30 min)
// Stock trading app with live prices → SSR or WebSockets
// SaaS dashboard with user data → SSR or CSR
// Marketing site with static content → SSG`}
            description="Decision tree for choosing the right rendering mode"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Common Pitfalls and Solutions</h2>
          <p className="content-text">
            Here are common mistakes when implementing ISR:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pitfall: Revalidation Too Frequent</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm mb-2">
                Setting revalidation to every second defeats the purpose of caching.
              </p>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-mono text-xs">
                ❌ Bad: revalidate = 1<br/>
                ✅ Good: revalidate = 3600
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pitfall: Not Pre-generating Popular Pages</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm mb-2">
                If you don't pre-generate popular pages, first visitors will experience slow loads.
              </p>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-mono text-xs">
                ✅ Good: Pre-generate top 1,000 products, generate others on demand
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pitfall: Ignoring Revalidation Errors</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm mb-2">
                If revalidation fails, the old page stays cached indefinitely.
              </p>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-mono text-xs">
                ✅ Good: Add error handling and fallbacks in revalidation logic
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pitfall: Not Monitoring Stale Data</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm mb-2">
                Without monitoring, you won't know when data becomes stale.
              </p>
              <p className="text-amber-800 dark:text-amber-200 text-sm font-mono text-xs">
                ✅ Good: Log revalidation events and monitor cache hit rates
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Performance Characteristics</h2>
          <p className="content-text">
            Here's how ISR performs compared to other modes:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>SSG</th>
                  <th>ISR</th>
                  <th>SSR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TTFB (cached)</td>
                  <td>50ms</td>
                  <td>50ms</td>
                  <td>200ms</td>
                </tr>
                <tr>
                  <td>TTFB (first request)</td>
                  <td>N/A</td>
                  <td>500ms</td>
                  <td>200ms</td>
                </tr>
                <tr>
                  <td>FCP (cached)</td>
                  <td>0.8s</td>
                  <td>0.8s</td>
                  <td>1.2s</td>
                </tr>
                <tr>
                  <td>FCP (first request)</td>
                  <td>N/A</td>
                  <td>1.5s</td>
                  <td>1.2s</td>
                </tr>
                <tr>
                  <td>LCP</td>
                  <td>1.0s</td>
                  <td>1.0s (cached) / 1.8s (first)</td>
                  <td>1.8s</td>
                </tr>
                <tr>
                  <td>Server Load</td>
                  <td>None</td>
                  <td>Low (revalidations)</td>
                  <td>High (every request)</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Low</td>
                  <td>Low</td>
                  <td>High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Best Practices</h2>
          <p className="content-text">
            Follow these best practices when implementing ISR:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Pre-generate strategically:</strong> Focus on pages that get the most traffic</li>
            <li><strong>Set appropriate revalidation times:</strong> Match your data update frequency</li>
            <li><strong>Use on-demand revalidation:</strong> Revalidate immediately when data changes</li>
            <li><strong>Monitor revalidation:</strong> Track success/failure rates and cache hit rates</li>
            <li><strong>Handle errors gracefully:</strong> Serve stale data if revalidation fails</li>
            <li><strong>Test thoroughly:</strong> Test both cached and first-request scenarios</li>
            <li><strong>Use CDN caching:</strong> Maximize cache hit rates with CDN edge caching</li>
            <li><strong>Document revalidation strategy:</strong> Make it clear why each page has its revalidation time</li>
            <li><strong>Implement fallbacks:</strong> Have a plan if revalidation fails repeatedly</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Incremental Static Regeneration is a powerful rendering strategy that combines the best of SSG and SSR. It provides 
            instant page loads like SSG while keeping data fresh like SSR. ISR is ideal for sites with many pages where data 
            changes periodically. By understanding when to use ISR, how to implement it correctly, and what trade-offs it involves, 
            you can build fast, scalable applications that deliver excellent user experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
