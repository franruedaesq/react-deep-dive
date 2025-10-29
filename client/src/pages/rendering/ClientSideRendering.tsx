import CodeExample from '@/components/CodeExample';

export default function ClientSideRendering() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Client Side Rendering (CSR)</h1>
          <p className="page-subtitle">
            Rendering React components entirely in the browser using JavaScript
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Client Side Rendering?</h2>
          <p className="content-text">
            Client Side Rendering (CSR) is the traditional approach where React applications are rendered entirely in the browser. 
            The server sends a minimal HTML file with a JavaScript bundle, and React takes over to render the UI dynamically.
          </p>
          <p className="content-text">
            When a user visits your application, the browser downloads the JavaScript bundle, React initializes, and then renders 
            the entire UI to the DOM. This approach powers most Single Page Applications (SPAs) and interactive dashboards.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">How CSR Works: The Basic Flow</h2>
          <p className="content-text">
            The CSR flow involves several key steps. First, the browser requests the HTML file from the server. The server responds 
            with minimal HTML containing a root element and a script tag pointing to the JavaScript bundle. The browser then downloads 
            and parses the JavaScript bundle, which includes React and your application code.
          </p>
          <p className="content-text">
            Once the JavaScript is loaded, React initializes and creates a root using the createRoot API. React then renders your 
            component tree to the DOM, attaching event listeners and setting up state management. The application becomes interactive 
            at this point.
          </p>

          <CodeExample
            title="Basic CSR Setup - HTML"
            language="html"
            code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My React App</title>
</head>
<body>
  <!-- Root element where React will render -->
  <div id="root"></div>
  
  <!-- JavaScript bundle -->
  <script src="/main.js"></script>
</body>
</html>`}
            description="Minimal HTML file for CSR - just a root div and a script tag"
          />

          <CodeExample
            title="Creating a Root with createRoot()"
            language="javascript"
            code={`import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a React root
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);`}
            description="Using createRoot() to initialize a React application in the browser"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Understanding createRoot()</h2>
          <p className="content-text">
            The createRoot() function is the entry point for client-side React applications. It creates a root object that manages 
            the React component tree for a specific DOM element. This replaces the older ReactDOM.render() API introduced in React 18.
          </p>

          <div className="highlight-box">
            <p>
              <strong>Key Point:</strong> createRoot() is used for client-only applications. If your HTML was generated on the server, 
              you must use hydrateRoot() instead to avoid hydration mismatches.
            </p>
          </div>

          <CodeExample
            title="createRoot() API Signature"
            language="typescript"
            code={`// Create a root for a DOM element
const root = createRoot(domNode, options?);

// Methods on the root object
root.render(reactNode);    // Render or update components
root.unmount();            // Unmount and clean up

// Options parameter
interface RootOptions {
  onCaughtError?: (error: Error, errorInfo: ErrorInfo) => void;
  onUncaughtError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRecoverableError?: (error: Error, errorInfo: ErrorInfo) => void;
  identifierPrefix?: string;
}`}
            description="The createRoot() function signature and available options"
          />
        </div>

        <div className="section">
          <h2 className="section-title">CSR Lifecycle: From Empty DOM to Interactive App</h2>
          <p className="content-text">
            Understanding the CSR lifecycle is crucial for optimizing performance and debugging issues. Let's trace through what 
            happens from the moment a user visits your application.
          </p>

          <CodeExample
            title="CSR Lifecycle Example"
            language="javascript"
            code={`// Step 1: Initial HTML (minimal)
// <div id="root"></div>

// Step 2: JavaScript loads and executes
import { createRoot } from 'react-dom/client';
import App from './App';

// Step 3: Create root
const root = createRoot(document.getElementById('root'));

// Step 4: Render component tree
root.render(<App />);

// Step 5: React renders to DOM
// <div id="root">
//   <div><!-- App content here --></div>
// </div>

// Step 6: Event listeners attached, app interactive
// User can now interact with the application`}
            description="The complete CSR lifecycle from empty DOM to interactive application"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Advantages of Client Side Rendering</h2>
          <p className="content-text">
            CSR offers several significant advantages that make it ideal for certain types of applications:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Rich Interactivity</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Once loaded, CSR applications provide instant, smooth interactions without server round-trips. State changes, 
                animations, and UI updates happen immediately in the browser.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Reduced Server Load</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                The server only needs to serve static files. All rendering logic runs in the browser, significantly reducing 
                server CPU and memory requirements.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Simplified Deployment</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                CSR applications can be deployed to simple static hosting services like AWS S3, Netlify, or Vercel without 
                needing a Node.js server.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Offline Capability</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                With service workers, CSR applications can work offline and sync data when the connection returns, enabling 
                true progressive web app experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Disadvantages and Trade-offs</h2>
          <p className="content-text">
            While CSR offers advantages, it comes with trade-offs that may not suit all applications:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Slow Initial Page Load</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Users see a blank or loading screen until the JavaScript bundle downloads and React renders the UI. Large 
                bundles can significantly delay the first contentful paint.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">SEO Challenges</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Search engines may have difficulty indexing dynamically rendered content. While modern crawlers can execute 
                JavaScript, it's not guaranteed and can be slower than indexing static HTML.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Larger Bundle Size</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                The entire React library and your application code must be sent to the browser, increasing bandwidth usage 
                and initial load time, especially on slow networks.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">JavaScript Dependency</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                If JavaScript fails to load or execute, users see nothing. There's no fallback content, making the application 
                completely non-functional without JavaScript.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">When to Use Client Side Rendering</h2>
          <p className="content-text">
            CSR is the best choice for specific types of applications where its advantages outweigh the disadvantages:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Single Page Applications (SPAs):</strong> Apps like Gmail, Figma, or Notion that require rich interactivity</li>
            <li><strong>Internal Tools and Dashboards:</strong> Admin panels, analytics dashboards, project management tools</li>
            <li><strong>Real-time Collaborative Apps:</strong> Applications with live updates, multiplayer features, or real-time data</li>
            <li><strong>Progressive Web Apps (PWAs):</strong> Apps that need offline functionality and native-like experiences</li>
            <li><strong>Complex Interactive UIs:</strong> Applications with heavy animations, gestures, and state management</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Performance Optimization Strategies</h2>
          <p className="content-text">
            While CSR has inherent performance challenges, several strategies can significantly improve the user experience:
          </p>

          <CodeExample
            title="Code Splitting and Lazy Loading"
            language="javascript"
            code={`import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
      <Settings />
    </Suspense>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`}
            description="Using code splitting to reduce initial bundle size"
          />

          <CodeExample
            title="Loading State and Skeleton Screens"
            language="javascript"
            code={`import { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonLoader />;  // Show skeleton while loading
  }

  return <div>{/* Render data */}</div>;
}`}
            description="Showing skeleton screens during data loading improves perceived performance"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Comparison with Other Rendering Strategies</h2>
          <p className="content-text">
            Here's how CSR compares to other rendering approaches:
          </p>

          <div className="overflow-x-auto">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>CSR</th>
                  <th>SSR</th>
                  <th>SSG</th>
                  <th>ISR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Initial Load Time</td>
                  <td>Slow</td>
                  <td>Fast</td>
                  <td>Very Fast</td>
                  <td>Very Fast</td>
                </tr>
                <tr>
                  <td>SEO</td>
                  <td>Poor</td>
                  <td>Good</td>
                  <td>Excellent</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td>Interactivity</td>
                  <td>Instant (after load)</td>
                  <td>Delayed (hydration)</td>
                  <td>Delayed (hydration)</td>
                  <td>Delayed (hydration)</td>
                </tr>
                <tr>
                  <td>Server Load</td>
                  <td>Minimal</td>
                  <td>High</td>
                  <td>None</td>
                  <td>Low</td>
                </tr>
                <tr>
                  <td>Dynamic Content</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>No</td>
                  <td>Yes (with revalidation)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Client Side Rendering is a powerful approach for building interactive, responsive applications. By rendering entirely 
            in the browser, you gain instant interactivity and reduce server load. However, the trade-off is slower initial page 
            loads and SEO challenges.
          </p>
          <p className="content-text">
            CSR is ideal for internal tools, dashboards, and applications where user interactivity is paramount. For public-facing 
            content and SEO-critical pages, consider SSR, SSG, or ISR instead. Modern applications often use a hybrid approach, 
            combining CSR for interactive components with SSR or SSG for better initial load performance and SEO.
          </p>
        </div>
      </div>
    </div>
  );
}
