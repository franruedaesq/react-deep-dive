import CodeExample from '@/components/CodeExample';

export default function StreamingAndSuspense() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Streaming and Suspense</h1>
          <p className="page-subtitle">
            How React streams content during SSR and RSC for faster initial page loads
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Streaming?</h2>
          <p className="content-text">
            Streaming is a technique where the server sends HTML to the browser in chunks rather than waiting for the entire 
            page to render. This allows users to see content progressively as it becomes available, significantly improving 
            perceived performance and Time to First Byte (TTFB).
          </p>
          <p className="content-text">
            Instead of the traditional SSR flow where the server renders everything, waits for data, and then sends the complete 
            HTML, streaming allows the server to send the initial HTML shell immediately and stream additional content as it 
            becomes ready.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Traditional SSR vs Streaming SSR</h2>
          <p className="content-text">
            The key difference between traditional SSR and streaming SSR is how and when content reaches the browser:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Traditional SSR</th>
                  <th>Streaming SSR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Initial HTML</td>
                  <td>Waits for all data</td>
                  <td>Sent immediately</td>
                </tr>
                <tr>
                  <td>TTFB</td>
                  <td>Slow (waits for slowest component)</td>
                  <td>Fast (shell only)</td>
                </tr>
                <tr>
                  <td>User sees content</td>
                  <td>All at once</td>
                  <td>Progressively</td>
                </tr>
                <tr>
                  <td>Data fetching</td>
                  <td>Blocking</td>
                  <td>Non-blocking</td>
                </tr>
                <tr>
                  <td>Hydration</td>
                  <td>Full page at once</td>
                  <td>Progressive hydration</td>
                </tr>
                <tr>
                  <td>Best for</td>
                  <td>Simple pages</td>
                  <td>Complex pages with async data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Understanding Suspense</h2>
          <p className="content-text">
            Suspense is a React feature that allows components to "suspend" rendering while they wait for data. When a component 
            suspends, React displays a fallback UI (like a loading spinner) and continues rendering other parts of the tree. Once 
            the data arrives, React resumes rendering the suspended component.
          </p>

          <CodeExample
            title="Using Suspense for Data Loading"
            language="javascript"
            code={`import { Suspense } from 'react';

async function UserProfile({ userId }) {
  const user = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
  return <div>{user.name}</div>;
}

function UserProfileSkeleton() {
  return <div className="skeleton">Loading user...</div>;
}

export default function Page({ userId }) {
  return (
    <div>
      <h1>User Profile</h1>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>
    </div>
  );
}`}
            description="Using Suspense to handle async data loading"
          />
        </div>

        <div className="section">
          <h2 className="section-title">How Streaming Works</h2>
          <p className="content-text">
            The streaming process involves several key steps that work together to deliver content progressively:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">1. Initial Shell</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Server renders the page shell and sends it immediately.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">2. Browser Displays Shell</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Browser renders the shell while data is being fetched.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">3. Stream Chunks</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Server sends HTML chunks as data becomes available.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Streaming with renderToPipeableStream</h2>
          <p className="content-text">
            The React API for streaming is renderToPipeableStream:
          </p>

          <CodeExample
            title="Streaming SSR with renderToPipeableStream"
            language="javascript"
            code={`import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe, abort } = renderToPipeableStream(
    <App />,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        pipe(res);
      },
      onShellError(error) {
        res.statusCode = 500;
        res.send('<h1>Server Error</h1>');
      },
      onError(error) {
        console.error('Streaming error:', error);
      }
    }
  );
  
  req.on('abort', () => abort());
});`}
            description="Implementing streaming SSR"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Benefits of Streaming</h2>
          <p className="content-text">
            Streaming provides several important benefits:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Faster TTFB:</strong> Users see content immediately</li>
            <li><strong>Better perceived performance:</strong> Progressive rendering feels faster</li>
            <li><strong>Improved Core Web Vitals:</strong> Better FCP, LCP, and CLS scores</li>
            <li><strong>Non-blocking data fetching:</strong> Slow components don't block fast ones</li>
            <li><strong>Progressive hydration:</strong> JavaScript loads progressively</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Streaming and Suspense represent a powerful combination for modern React applications. By streaming content 
            progressively and using Suspense to handle async operations, you can dramatically improve perceived performance 
            and user experience.
          </p>
        </div>
      </div>
    </div>
  );
}
