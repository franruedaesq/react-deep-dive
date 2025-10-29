import CodeExample from '@/components/CodeExample';

export default function StaticSiteGeneration() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Static Site Generation (SSG)</h1>
          <p className="page-subtitle">
            Pre-rendering pages at build time for maximum performance and SEO
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Static Site Generation?</h2>
          <p className="content-text">
            Static Site Generation (SSG) is an approach where React components are rendered at build time to generate static 
            HTML files. These files are then served directly to users without any server-side rendering, resulting in the fastest 
            possible page loads and minimal server requirements.
          </p>
          <p className="content-text">
            With SSG, you run your build process once to generate all the HTML files, then deploy them to a CDN or static hosting 
            service. Every user receives the same pre-rendered HTML, making this approach ideal for content that doesn't change 
            frequently.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">How SSG Works</h2>
          <p className="content-text">
            SSG happens during the build process, not at request time. The build tool (like Next.js or Gatsby) runs your React 
            components, renders them to HTML, and saves the HTML files. These static files are then deployed to a CDN or static 
            hosting service.
          </p>

          <CodeExample
            title="Static Site Generation Process"
            language="javascript"
            code={`// Build time (happens once during deployment)
// next.js example with getStaticProps

export async function getStaticProps() {
  // Fetch data at build time
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 3600, // Revalidate every hour
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

// Output: /blog/index.html (static file)
// Users receive this pre-rendered HTML directly`}
            description="SSG with Next.js getStaticProps - data fetched at build time"
          />
        </div>

        <div className="section">
          <h2 className="section-title">SSG vs SSR vs CSR</h2>
          <p className="content-text">
            Understanding when to use SSG versus other rendering strategies is crucial for building performant applications. 
            Each approach has different trade-offs:
          </p>

          <div className="overflow-x-auto">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>SSG</th>
                  <th>SSR</th>
                  <th>CSR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rendering Time</td>
                  <td>Build time</td>
                  <td>Request time</td>
                  <td>Browser time</td>
                </tr>
                <tr>
                  <td>Initial Load Time</td>
                  <td>Very Fast</td>
                  <td>Fast</td>
                  <td>Slow</td>
                </tr>
                <tr>
                  <td>Server Load</td>
                  <td>None</td>
                  <td>High</td>
                  <td>Minimal</td>
                </tr>
                <tr>
                  <td>Dynamic Content</td>
                  <td>No (static)</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>SEO</td>
                  <td>Excellent</td>
                  <td>Good</td>
                  <td>Poor</td>
                </tr>
                <tr>
                  <td>Hosting</td>
                  <td>CDN/Static</td>
                  <td>Node.js Server</td>
                  <td>Any</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Advantages of Static Site Generation</h2>
          <p className="content-text">
            SSG offers compelling advantages for many types of applications:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Fastest Performance</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Static HTML files are served directly from a CDN without any processing. This results in the fastest possible 
                page loads, excellent Core Web Vitals scores, and superior user experience.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Zero Server Load</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Since pages are pre-rendered, there's no server-side processing needed. This eliminates server load entirely, 
                allowing you to serve millions of users with minimal infrastructure costs.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Excellent SEO</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Search engines receive fully rendered HTML with all content immediately available. Meta tags, structured data, 
                and content are all present, making indexing straightforward and reliable.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Cheap Hosting</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Static files can be hosted on inexpensive CDNs or static hosting services like Netlify, Vercel, or AWS S3. 
                No expensive server infrastructure required.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Security</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                With no server-side code running, there's a smaller attack surface. Static files are inherently more secure 
                than dynamic applications with databases and APIs.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Limitations of Static Site Generation</h2>
          <p className="content-text">
            While SSG is powerful, it has limitations that make it unsuitable for all applications:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Static Content Only</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                SSG is designed for content that doesn't change frequently. For dynamic, user-specific, or real-time content, 
                you need SSR or CSR. You can't generate millions of pages for every possible user or product variation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Build Time</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Every change requires a rebuild. For sites with thousands of pages, builds can take a long time. This makes 
                it impractical for frequently updated content.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Limited Personalization</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                All users receive the same HTML. Personalized content, user-specific data, or dynamic recommendations require 
                client-side JavaScript or additional API calls.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Stale Content</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Until the next build, users see outdated content. For frequently changing data, this can be problematic. 
                This is where Incremental Static Regeneration (ISR) helps.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">When to Use Static Site Generation</h2>
          <p className="content-text">
            SSG is ideal for applications with the following characteristics:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Blogs and documentation:</strong> Content that changes infrequently</li>
            <li><strong>Marketing websites:</strong> Landing pages, company websites, portfolios</li>
            <li><strong>Static content sites:</strong> Wikis, knowledge bases, reference materials</li>
            <li><strong>E-commerce product pages:</strong> When product count is manageable (hundreds, not millions)</li>
            <li><strong>News archives:</strong> Past articles that don't change after publication</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Rendering Static Pages</h2>
          <p className="content-text">
            At build time, SSG uses renderToStaticMarkup() to generate static HTML. This function renders components to HTML 
            without React-specific attributes, resulting in smaller output.
          </p>

          <CodeExample
            title="renderToStaticMarkup() for Static Content"
            language="javascript"
            code={`import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import Blog from './pages/Blog';

// Build time: Generate static HTML
export async function generateStaticPages() {
  const posts = await fetchAllPosts();
  
  for (const post of posts) {
    // Render component to static HTML
    const html = renderToStaticMarkup(
      <Blog post={post} />
    );
    
    // Write to file
    const filePath = path.join(
      'dist',
      post.slug,
      'index.html'
    );
    
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, \`
      <!DOCTYPE html>
      <html>
        <head>
          <title>\${post.title}</title>
        </head>
        <body>
          <div id="root">\${html}</div>
          <script src="/main.js"></script>
        </body>
      </html>
    \`);
  }
}

// Run during build
generateStaticPages();`}
            description="Using renderToStaticMarkup() to generate static HTML at build time"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Hybrid Approach: SSG + Client-Side Interactivity</h2>
          <p className="content-text">
            You can combine SSG with client-side JavaScript to add interactivity to static pages. The page loads quickly as 
            static HTML, then JavaScript enhances it with interactive features.
          </p>

          <CodeExample
            title="SSG with Client-Side Hydration"
            language="javascript"
            code={`// Build time: Generate static HTML
// index.html (generated at build time)
<!DOCTYPE html>
<html>
  <head>
    <title>Blog Post</title>
  </head>
  <body>
    <div id="root">
      <!-- Static HTML content here -->
      <article>
        <h1>My Blog Post</h1>
        <p>Content...</p>
      </article>
    </div>
    <script src="/main.js"></script>
  </body>
</html>

// Runtime: Add interactivity
import { hydrateRoot } from 'react-dom/client';
import Blog from './Blog';

// Hydrate the static HTML with React
hydrateRoot(document.getElementById('root'), <Blog />);

// Now the page is interactive with comments, likes, etc.`}
            description="Combining static HTML with client-side hydration for interactivity"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Static Site Generation is the fastest and most cost-effective approach for content that doesn't change frequently. 
            By pre-rendering pages at build time, SSG delivers unmatched performance, excellent SEO, and minimal hosting costs.
          </p>
          <p className="content-text">
            However, SSG is limited to static content. For frequently changing content, consider Incremental Static Regeneration (ISR) 
            or Server Side Rendering. For applications requiring real-time updates or personalization, Client Side Rendering may be 
            more appropriate. The best approach often combines multiple strategies for different parts of your application.
          </p>
        </div>
      </div>
    </div>
  );
}
