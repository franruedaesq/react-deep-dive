import CodeExample from '@/components/CodeExample';

export default function IslandsArchitecture() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Islands Architecture</h1>
          <p className="page-subtitle">
            A modern approach combining static HTML with isolated interactive components
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Islands Architecture?</h2>
          <p className="content-text">
            Islands Architecture is a modern web architecture pattern that combines the best aspects of Static Site Generation 
            with selective client-side interactivity. The core idea is to render most of your page as static HTML (the "sea") 
            while keeping interactive components as isolated "islands" that hydrate independently.
          </p>
          <p className="content-text">
            Instead of hydrating the entire page with JavaScript, only the interactive components load and execute their JavaScript. 
            This approach dramatically reduces the amount of JavaScript sent to the browser while maintaining full interactivity where needed.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">The Islands Metaphor</h2>
          <p className="content-text">
            The "islands" metaphor perfectly captures the essence of this architecture:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">The Sea (Static HTML)</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                The vast majority of your page is static HTML rendered at build time. This includes headers, footers, navigation, 
                content sections, and any other non-interactive elements. The "sea" is fast, lightweight, and requires no JavaScript.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">The Islands (Interactive Components)</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Scattered throughout the sea are "islands"—isolated interactive components that need JavaScript. Each island is 
                independent and hydrates separately. Examples include shopping carts, comment sections, search bars, and interactive forms.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">How Islands Architecture Works</h2>
          <p className="content-text">
            The Islands Architecture pattern works through a specific process that optimizes both performance and interactivity:
          </p>

          <CodeExample
            title="Islands Architecture Flow"
            language="javascript"
            code={`// 1. BUILD TIME: Generate static HTML for the entire page
// Only interactive components are marked with metadata
export default function Page() {
  return (
    <>
      {/* Static content - no JavaScript needed */}
      <Header />
      <Hero />
      <ArticleContent />
      
      {/* Islands - marked for hydration */}
      <ShoppingCart island />
      <CommentSection island />
      <SearchBar island />
      
      <Footer />
    </>
  );
}

// 2. OUTPUT: HTML with island markers
// <div id="root">
//   <header>...</header>
//   <section>...</section>
//   <article>...</article>
//   
//   <!-- Island 1: Shopping Cart -->
//   <div data-island="shopping-cart">
//     <div>Shopping Cart</div>
//   </div>
//   
//   <!-- Island 2: Comments -->
//   <div data-island="comment-section">
//     <div>Comments</div>
//   </div>
//   
//   <!-- Island 3: Search -->
//   <div data-island="search-bar">
//     <div>Search</div>
//   </div>
//   
//   <footer>...</footer>
// </div>

// 3. BROWSER: Hydrate only the islands
// Static content is already interactive (no JavaScript needed)
// Islands hydrate independently and in parallel

import { hydrateRoot } from 'react-dom/client';

// Only hydrate the islands
document.querySelectorAll('[data-island]').forEach(island => {
  const islandName = island.dataset.island;
  const IslandComponent = ISLANDS[islandName];
  
  hydrateRoot(island, <IslandComponent />);
});`}
            description="How Islands Architecture processes pages at build time and runtime"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Islands vs Other Rendering Strategies</h2>
          <p className="content-text">
            Understanding how Islands Architecture compares to other rendering methods helps you choose the right approach:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>CSR</th>
                  <th>SSR</th>
                  <th>SSG</th>
                  <th>Islands</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Initial Load</td>
                  <td>Slow (JS download)</td>
                  <td>Fast (HTML sent)</td>
                  <td>Very Fast (static)</td>
                  <td>Very Fast (static)</td>
                </tr>
                <tr>
                  <td>Interactivity</td>
                  <td>Full</td>
                  <td>Full</td>
                  <td>None</td>
                  <td>Selective</td>
                </tr>
                <tr>
                  <td>JavaScript Bundle</td>
                  <td>Large</td>
                  <td>Large</td>
                  <td>Small</td>
                  <td>Very Small</td>
                </tr>
                <tr>
                  <td>Dynamic Content</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>No</td>
                  <td>Partial</td>
                </tr>
                <tr>
                  <td>SEO</td>
                  <td>Requires JS</td>
                  <td>Excellent</td>
                  <td>Excellent</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td>Hydration</td>
                  <td>N/A</td>
                  <td>Full page</td>
                  <td>Full page</td>
                  <td>Selective</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Building with Islands Architecture</h2>
          <p className="content-text">
            Here's a practical example of how to structure an application using Islands Architecture:
          </p>

          <CodeExample
            title="Islands Architecture Example"
            language="javascript"
            code={`// pages/products.astro (or similar framework)
---
import Layout from '../layouts/Layout.astro';
import ProductCard from '../components/ProductCard.astro';
import ShoppingCart from '../components/ShoppingCart.tsx';
import ProductFilter from '../components/ProductFilter.tsx';

const products = await getProducts();
---

<Layout title="Products">
  <div class="products-page">
    {/* Static header and navigation */}
    <h1>Our Products</h1>
    <p>Browse our collection of amazing products</p>
    
    {/* Island 1: Interactive filter */}
    <ProductFilter client:load />
    
    {/* Static product grid */}
    <div class="product-grid">
      {products.map(product => (
        <ProductCard product={product} />
      ))}
    </div>
    
    {/* Island 2: Shopping cart */}
    <ShoppingCart client:idle />
  </div>
</Layout>

// Result:
// - Static HTML for layout, headers, and product cards
// - ProductFilter hydrates on page load (client:load)
// - ShoppingCart hydrates when idle (client:idle)
// - Only 2 islands worth of JavaScript in the bundle
// - Rest of the page is pure HTML`}
            description="Building a product page with Islands Architecture"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Key Benefits of Islands Architecture</h2>
          <p className="content-text">
            Islands Architecture provides several significant advantages:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Minimal JavaScript</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Only interactive components require JavaScript. Static content is pure HTML, dramatically reducing bundle size 
                and improving performance. A page that would normally require 100KB of JavaScript might only need 10KB.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Fast Initial Load</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Since most of the page is static HTML, it renders instantly. Users see content immediately, and interactivity 
                is added progressively only where needed.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Independent Islands</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Each island hydrates independently. One island's JavaScript error doesn't affect others. Islands can use different 
                frameworks or libraries without conflicts.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Excellent SEO</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Search engines receive fully rendered HTML with all content. No JavaScript execution needed for indexing, making 
                Islands Architecture perfect for SEO-critical applications.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Progressive Enhancement</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                The page works without JavaScript. Users get the full static content immediately, and interactivity is added 
                progressively as islands hydrate.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Challenges and Considerations</h2>
          <p className="content-text">
            While Islands Architecture offers many benefits, there are some challenges to be aware of:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">State Management</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Islands are isolated, making it difficult to share state between them. You may need to use global state management 
                or communicate through the DOM.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Hydration Mismatch</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Each island must hydrate to match its static HTML. Mismatches can cause errors. Careful testing is required to 
                ensure consistency.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Build Complexity</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Islands Architecture requires special tooling and build setup. Frameworks like Astro and Fresh handle this, but 
                custom implementations can be complex.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Limited Dynamic Content</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Islands Architecture works best with mostly static content. Highly dynamic pages with frequent updates may not be 
                a good fit.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Hydration Strategies for Islands</h2>
          <p className="content-text">
            Different hydration strategies allow you to optimize when and how islands load:
          </p>

          <CodeExample
            title="Island Hydration Strategies"
            language="javascript"
            code={`// Strategy 1: Eager Hydration (client:load)
// Hydrate immediately when page loads
<ShoppingCart client:load />

// Strategy 2: Idle Hydration (client:idle)
// Hydrate when browser is idle
<Newsletter client:idle />

// Strategy 3: Visible Hydration (client:visible)
// Hydrate only when visible in viewport
<RelatedProducts client:visible />

// Strategy 4: Interaction Hydration (client:click)
// Hydrate only when user interacts
<Modal client:click />

// Strategy 5: Media Query Hydration (client:media)
// Hydrate based on media query
<MobileMenu client:media="(max-width: 768px)" />

// Example in Astro:
---
import ShoppingCart from '../components/ShoppingCart.tsx';
import Newsletter from '../components/Newsletter.tsx';
import RelatedProducts from '../components/RelatedProducts.tsx';
---

<ShoppingCart client:load />
<Newsletter client:idle />
<RelatedProducts client:visible />`}
            description="Different strategies for hydrating islands based on priority and visibility"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Islands Architecture in Practice</h2>
          <p className="content-text">
            Several modern frameworks have adopted Islands Architecture:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Astro</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Astro is built on Islands Architecture. It renders all components to static HTML by default and uses client directives 
                to mark islands for hydration. Perfect for content-heavy sites.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Fresh (Deno)</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Fresh uses Islands Architecture by default. Components are either islands (interactive) or static. Excellent for 
                building fast, lightweight applications.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Qwik</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Qwik takes Islands Architecture further with resumability. Components can pause execution on the server and resume 
                on the client without full hydration.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Next.js (Partial)</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Next.js with App Router and Server Components provides similar benefits. Server Components are static, while Client 
                Components are interactive islands.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">When to Use Islands Architecture</h2>
          <p className="content-text">
            Islands Architecture is ideal for:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Content-heavy sites:</strong> Blogs, documentation, marketing sites with mostly static content</li>
            <li><strong>SEO-critical applications:</strong> E-commerce, news sites where search rankings matter</li>
            <li><strong>Performance-focused projects:</strong> When bundle size and initial load time are critical</li>
            <li><strong>Multi-framework applications:</strong> When different islands need different frameworks</li>
            <li><strong>Progressive enhancement:</strong> When graceful degradation without JavaScript is important</li>
          </ul>

          <p className="content-text">
            Islands Architecture is <strong>not ideal</strong> for:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Highly dynamic applications:</strong> Real-time collaboration tools, chat applications</li>
            <li><strong>Complex state management:</strong> Applications with deeply interconnected state</li>
            <li><strong>Single-page applications:</strong> When the entire page is interactive</li>
            <li><strong>Frequent full-page updates:</strong> When most content changes frequently</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Islands Architecture and Resumability</h2>
          <p className="content-text">
            A newer concept called "resumability" takes Islands Architecture further. Instead of hydrating components, the server 
            serializes the component state and the client resumes execution from where the server left off. This eliminates the need 
            for hydration entirely.
          </p>

          <CodeExample
            title="Resumability vs Hydration"
            language="javascript"
            code={`// Traditional Hydration (Islands)
// 1. Server renders component to HTML
// 2. Browser downloads JavaScript
// 3. React re-renders component in memory
// 4. React compares with HTML and attaches listeners
// Result: Component rendered twice (server + client)

// Resumability (Qwik)
// 1. Server renders component to HTML
// 2. Server serializes component state and event handlers
// 3. Browser receives HTML + serialized state
// 4. Browser resumes execution without re-rendering
// Result: Component rendered once (server only)

// Resumability Example:
export default function Counter() {
  const [count, setCount] = createSignal(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => setCount(count.value + 1)}>
        Increment
      </button>
    </div>
  );
}

// Server serializes:
// {
//   count: 0,
//   onClick: <reference to increment function>
// }

// Browser resumes with this state without re-rendering`}
            description="How resumability differs from hydration in Islands Architecture"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Islands Architecture represents a modern approach to web development that combines the performance benefits of static 
            site generation with the interactivity of client-side rendering. By rendering most of your page as static HTML and 
            keeping interactive components as isolated islands, you can dramatically reduce JavaScript bundle size while maintaining 
            full interactivity where needed.
          </p>
          <p className="content-text">
            This pattern is particularly valuable for content-heavy, SEO-critical applications where performance and user experience 
            are paramount. As frameworks like Astro, Fresh, and Qwik continue to mature, Islands Architecture is becoming an increasingly 
            popular choice for modern web applications.
          </p>
        </div>
      </div>
    </div>
  );
}
