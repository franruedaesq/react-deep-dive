import CodeExample from '@/components/CodeExample';

export default function ReactServerComponents() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">React Server Components (RSC)</h1>
          <p className="page-subtitle">Components that run exclusively on the server</p>
        </div>

        <div className="section">
          <h2 className="section-title">What are React Server Components?</h2>
          <p className="content-text">
            React Server Components (RSC) are a new paradigm that allows you to write React components that run exclusively on 
            the server. Unlike traditional React components that run in the browser, Server Components execute on the server and 
            send only the rendered output to the client.
          </p>
          <p className="content-text">
            This approach enables direct database access, keeps sensitive data on the server, and reduces the JavaScript sent to 
            the browser. Server Components complement Client Components to create a hybrid rendering model.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Server Components vs Client Components</h2>
          <p className="content-text">
            Understanding the differences between Server and Client Components is fundamental to using RSC effectively:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Server Components</th>
                  <th>Client Components</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Execution</td>
                  <td>Server only</td>
                  <td>Browser only</td>
                </tr>
                <tr>
                  <td>Database Access</td>
                  <td>Direct access</td>
                  <td>Via API</td>
                </tr>
                <tr>
                  <td>Sensitive Data</td>
                  <td>Safe (stays on server)</td>
                  <td>Exposed to client</td>
                </tr>
                <tr>
                  <td>Bundle Size Impact</td>
                  <td>None</td>
                  <td>Increases bundle</td>
                </tr>
                <tr>
                  <td>Interactivity</td>
                  <td>None</td>
                  <td>Full interactivity</td>
                </tr>
                <tr>
                  <td>Hooks</td>
                  <td>No hooks</td>
                  <td>All hooks available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Benefits of Server Components</h2>
          <p className="content-text">
            Server Components offer several significant advantages:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Reduced Bundle Size</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Server Components don't ship JavaScript to the browser. Only the rendered output is sent, significantly reducing 
                bundle size and improving initial load performance.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Direct Database Access</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Server Components can directly query databases without needing API endpoints. This simplifies data fetching and 
                reduces network round-trips.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Enhanced Security</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Sensitive data, API keys, and authentication tokens stay on the server and never reach the client. This improves 
                security and prevents data leaks.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Improved Performance</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                With less JavaScript to download and execute, pages load faster and render more quickly. Server-side rendering 
                also improves Core Web Vitals.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Server Component Example</h2>
          <p className="content-text">
            Here's an example of a Server Component that directly accesses a database:
          </p>

          <CodeExample
            title="Server Component with Database Access"
            language="javascript"
            code={`// app/posts/page.tsx - Server Component
import { db } from '@/lib/db';

export default async function PostsList() {
  // Direct database access on the server
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This component:
// - Runs on the server
// - Directly queries the database
// - Never sends database query to client
// - Only sends rendered HTML to browser`}
            description="A Server Component that directly accesses the database"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Mixing Server and Client Components</h2>
          <p className="content-text">
            In practice, you'll use both Server and Client Components together. Server Components handle data fetching and rendering, 
            while Client Components handle interactivity.
          </p>

          <CodeExample
            title="Combining Server and Client Components"
            language="javascript"
            code={`// app/posts/page.tsx - Server Component
import { db } from '@/lib/db';
import PostCard from './PostCard';  // Client Component

export default async function PostsList() {
  const posts = await db.post.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map(post => (
          // Client Component receives data as props
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

// app/posts/PostCard.tsx - Client Component
'use client';

import { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <button onClick={() => setLiked(!liked)}>
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
}`}
            description="Combining Server Components for data fetching with Client Components for interactivity"
          />
        </div>

        <div className="section">
          <h2 className="section-title">When to Use Server Components</h2>
          <p className="content-text">
            Use Server Components for:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li>Fetching data from databases or APIs</li>
            <li>Accessing sensitive information (API keys, tokens)</li>
            <li>Rendering static or semi-static content</li>
            <li>Reducing JavaScript bundle size</li>
            <li>Improving initial page load performance</li>
          </ul>

          <p className="content-text">
            Use Client Components for:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li>Interactive features (buttons, forms, animations)</li>
            <li>Using browser APIs (localStorage, geolocation)</li>
            <li>Using React hooks (useState, useEffect, useContext)</li>
            <li>Event listeners and user interactions</li>
            <li>Real-time updates and live data</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Server Component Limitations</h2>
          <p className="content-text">
            Server Components have some limitations to be aware of:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">No Hooks</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Server Components cannot use React hooks like useState, useEffect, or useContext. Use Client Components for stateful logic.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">No Browser APIs</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Server Components cannot use browser APIs like localStorage, window, or document. These are only available on the client.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">No Interactivity</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Server Components cannot respond to user events. They're rendered once and sent to the browser as static HTML.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            React Server Components represent a new paradigm in React development, allowing you to leverage the server for data 
            fetching and rendering while using Client Components for interactivity. This hybrid approach reduces bundle size, 
            improves performance, and enhances security.
          </p>
          <p className="content-text">
            By understanding when to use Server Components versus Client Components, you can build more efficient and secure React 
            applications that provide excellent user experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
