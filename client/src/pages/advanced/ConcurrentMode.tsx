import CodeExample from '@/components/CodeExample';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ConcurrentMode() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Concurrent Mode</h1>
          <p className="page-subtitle">
            How React 18's concurrent rendering model unlocks responsive UIs, cooperative scheduling, and smarter data fetching
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What Does &quot;Concurrent&quot; Mean in React?</h2>
          <p className="content-text">
            Concurrent Mode is not a different version of React—it&apos;s a set of capabilities in React 18+ that let the renderer
            prepare multiple UI versions simultaneously. Instead of blocking the browser while updates finish, React can start,
            pause, abandon, or resume rendering work to keep the interface interactive.
          </p>

          <Alert className="mb-6 border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-slate-900 dark:text-indigo-300">
            <AlertTitle>Big Word Alert: Concurrency</AlertTitle>
            <AlertDescription>
              Concurrency means <em>work in progress can overlap</em>. React still runs on a single JavaScript thread, but it slices
              rendering work into chunks so urgent interactions (typing, clicking, animations) can jump ahead of slow re-renders.
              You get the perception of parallelism without actual multi-threading.
            </AlertDescription>
          </Alert>

          <p className="content-text">
            This ability to juggle work is powered by the Fiber data structure and the Scheduler. React schedules updates based on
            priority so background work doesn&apos;t block user intent.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Core Concurrent Features</h2>
          <p className="content-text">
            Concurrent Mode is exposed through several APIs and behaviors. Each feature targets a different kind of bottleneck.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>What it Does</th>
                  <th>Benefits</th>
                  <th>Use When...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Automatic Batching</td>
                  <td>Groups state updates across async boundaries into one render</td>
                  <td>Fewer re-renders, less layout thrashing</td>
                  <td>You trigger multiple state updates inside promises, timeouts, or event handlers</td>
                </tr>
                <tr>
                  <td>Transitions (useTransition)</td>
                  <td>Marks updates as interruptible low-priority work</td>
                  <td>Keep inputs responsive while heavy UI recalculates</td>
                  <td>Filtering lists, navigation to dense pages, re-rendering expensive charts</td>
                </tr>
                <tr>
                  <td>Deferred Rendering (useDeferredValue)</td>
                  <td>Lets UI display stale data while new data renders in the background</td>
                  <td>Stabilizes visual state and avoids layout popping</td>
                  <td>You have derived values that are expensive to calculate or render</td>
                </tr>
                <tr>
                  <td>Suspense + Streaming</td>
                  <td>Pauses rendering while data loads, streams HTML in chunks</td>
                  <td>Progressive hydration and quicker first paint</td>
                  <td>You fetch data during rendering or stream server-rendered content</td>
                </tr>
                <tr>
                  <td>Selective Hydration</td>
                  <td>Hydrates server-rendered islands based on priority</td>
                  <td>Interactive shell appears quickly even on slow networks</td>
                  <td>SSR apps with critical controls sprinkled across the page</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">How the Scheduler Keeps Things Smooth</h2>
          <p className="content-text">
            React&apos;s Scheduler assigns each update a priority lane. High-priority tasks (like responding to text input) preempt
            low-priority rendering (like recalculating a big chart). If an urgent event happens, rendering work can be paused and
            resumed later without losing progress.
          </p>

          <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-slate-900 dark:text-amber-200">
            <AlertTitle>Big Word Alert: Preemption</AlertTitle>
            <AlertDescription>
              Preemption is the ability to <em>stop what you&apos;re doing</em> so a more important job can run first. In Concurrent
              Mode, React preempts rendering mid-flight to handle higher priority updates. When the coast is clear, it resumes the
              paused work from where it left off.
            </AlertDescription>
          </Alert>

          <CodeExample
            title="Visualizing Cooperative Scheduling"
            language="javascript"
            code={`// Pseudocode that mirrors how React juggles tasks
scheduleHighPriority(() => {
  // keystroke: update input value immediately
  setInput(event.target.value);
});

startTransition(() => {
  // expensive filtering can be paused and resumed
  filterBigDataset(event.target.value);
});

// If another keystroke arrives, React abandons the old
// transition work and restarts it with the latest value.
`}
            description="High-priority user intent always wins over slow re-rendering"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Understanding Suspense in Concurrent Mode</h2>
          <p className="content-text">
            Suspense and concurrent rendering are best friends. When a component suspends (for example, waiting on a data fetch),
            React can show a fallback while continuing other work. With streaming SSR, the server sends HTML chunks as they&apos;re
            ready, and the client hydrates them in priority order.
          </p>

          <Alert className="mb-6 border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-slate-900 dark:text-sky-200">
            <AlertTitle>Important to Understand</AlertTitle>
            <AlertDescription>
              Suspense boundaries partition your UI into <em>islands of async work</em>. Concurrent Mode uses them as checkpoints—
              rendering can skip past a pending boundary to keep the rest of the UI snappy.
            </AlertDescription>
          </Alert>

          <CodeExample
            title="Suspense + Transitions"
            language="tsx"
            code={`import { Suspense, useTransition } from 'react';

function ProductSearch() {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        placeholder="Search products"
        onChange={(event) => {
          startTransition(() => {
            updateSearchQuery(event.target.value);
          });
        }}
      />

      {isPending && <Spinner />}

      <Suspense fallback={<SkeletonList count={8} />}>
        <ProductResults />
      </Suspense>
    </div>
  );
}
`}
            description="Transitions keep the input responsive while Suspense handles async data"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Benefits You Can Feel</h2>
          <p className="content-text">
            Teams adopt concurrent rendering because it transforms UX on real devices, not because it&apos;s trendy. Expect:
          </p>
          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Instant feedback:</strong> Inputs and buttons respond immediately even if the rest of the tree is busy.</li>
            <li><strong>Graceful loading:</strong> Suspense fallbacks and selective hydration show progress instead of blank screens.</li>
            <li><strong>Better CPU sharing:</strong> Rendering yields to the browser so layout, painting, and scrolling stay smooth.</li>
            <li><strong>Predictable data flows:</strong> Automatic batching and Suspense boundaries reduce “setState storms”.</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">When to Reach for Each Feature</h2>
          <p className="content-text">
            Apply concurrent features intentionally. Mixing them gives you fine-grained control over perceived performance.
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Automatic Batching</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Enabled by default in React 18+. Lean on it whenever async callbacks fire multiple state updates. No extra API calls
                required.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">useTransition</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Wrap state changes that drive large re-renders. Ideal for search filters, tab switches, or any update where UX can
                tolerate a tiny delay.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">useDeferredValue</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Defer derived values like filtered arrays or expensive markdown previews. Pair with memoization to avoid redundant
                work.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Suspense Boundaries</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Surround async components (data fetching, lazy imports) so pending work shows a fallback instead of freezing the
                whole screen.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Streaming + Selective Hydration</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Combine when shipping SSR apps. Stream shell markup early, hydrate interactive regions as soon as the JavaScript
                bundles arrive.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Key Takeaways</h2>
          <p className="content-text">
            Concurrent Mode reframes React as a cooperative scheduler instead of a synchronous renderer. Embrace transitions,
            Suspense, and deferred rendering where UX is sensitive to jank. Start with a single screen that feels sluggish, wrap
            the costly updates in transitions, and measure how responsiveness improves.
          </p>
        </div>
      </div>
    </div>
  );
}
