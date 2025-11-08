import CodeExample from '@/components/CodeExample';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ReactReconciliation() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">React Reconciliation</h1>
          <p className="page-subtitle">
            How React compares trees, schedules work, and keeps the UI in sync with your component state
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Reconciliation?</h2>
          <p className="content-text">
            Reconciliation is the decision-making process React uses to decide which parts of the UI need to change when your
            component tree produces a new result. Every time state or props update, React generates a new virtual representation
            of your UI and reconciles it with the previous one to determine the minimal set of DOM mutations.
          </p>

          <Alert className="mb-6 border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
            <AlertTitle>Big Word Alert: Reconciliation</AlertTitle>
            <AlertDescription>
              In React-land, reconciliation means <em>figuring out the difference</em> between the tree you just rendered and the
              one that is currently on the screen. It&apos;s the core engine that keeps your UI correct without you manually touching
              the DOM.
            </AlertDescription>
          </Alert>
        </div>

        <div className="section">
          <h2 className="section-title">The Diffing Heuristics</h2>
          <p className="content-text">
            React does not perform a perfect tree diff—it relies on heuristics that are extremely fast and usually correct. These
            heuristics allow React to run reconciliation in O(n) time by making assumptions about how your component tree changes
            over time.
          </p>

          <Alert className="mb-6 border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-900 dark:bg-slate-900 dark:text-purple-300">
            <AlertTitle>Big Word Alert: Heuristic</AlertTitle>
            <AlertDescription>
              A heuristic is a shortcut strategy that trades absolute accuracy for incredible speed. React&apos;s diffing algorithm
              assumes that elements of different types produce different trees and that keys uniquely identify list items. When
              those assumptions hold, reconciliation is lightning fast.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Element Type</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                If the element type changes (for example, from a &lt;div&gt; to a &lt;span&gt;), React throws away the old subtree and builds
                a new one. Matching types allow React to update props in place.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Keys for Lists</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Keys tell React how list items correspond between renders. Stable keys preserve state, animation progress, and DOM
                nodes even when items move.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Props and State</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                When type and key match, React assumes the old component instance can be reused and simply updates its props and
                state, scheduling any necessary effects.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Seeing Reconciliation in Action</h2>
          <p className="content-text">
            Consider how React handles inserting a new item into the middle of a list. With stable keys, only one DOM node is
            created. Without keys, React has to touch every item after the insertion.
          </p>

          <CodeExample
            title="Keys Preserve Work"
            language="javascript"
            code={`const items = users.map(user => (
  <li key={user.id}>{user.name}</li>
));

// Later, we insert a user at the top
const nextItems = [
  <li key={newUser.id}>{newUser.name}</li>,
  ...items,
];

// With keys:
// - React matches existing <li> elements by key
// - Only the new user creates a new DOM node
// - Existing inputs keep focus, animations keep running

// Without keys:
// - React reuses DOM nodes in order
// - All subsequent list items re-render and lose state
`}
            description="Keys allow React to surgically update the DOM instead of rebuilding entire subtrees"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Important Concepts to Internalize</h2>
          <p className="content-text">
            These ideas show up whenever you debug rendering glitches or performance issues:
          </p>
          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li>
              <strong>Idempotent renders:</strong> components should be pure functions of props and state so React can re-render them
              freely during reconciliation.
            </li>
            <li>
              <strong>Stable identities:</strong> keys, memoized callbacks, and context values help React understand what should stay and what should change.
            </li>
            <li>
              <strong>Side-effect timing:</strong> effects run after reconciliation chooses the updates, so useEffect/useLayoutEffect fire based on
              commit outcomes, not render attempts.
            </li>
            <li>
              <strong>Minimal mutations:</strong> React batches DOM work in the commit phase, ensuring only the necessary DOM nodes change.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Where Fiber Enters the Story</h2>
          <p className="content-text">
            Fiber is the data structure that implements reconciliation in modern React. Each Fiber node tracks the component type,
            props, state, and links to siblings and children. During the render phase, React walks the Fiber tree to compute the
            next UI, comparing each Fiber with its alternate (the previous render) to determine what changed.
          </p>
          <p className="content-text">
            Because work is stored as Fibers, React can pause, resume, and prioritize different parts of the tree. Reconciliation
            becomes incremental work instead of an all-or-nothing tree walk, enabling concurrent rendering and transitions.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Hydration and Reconciliation</h2>
          <p className="content-text">
            When your app hydrates server-rendered HTML, reconciliation ensures the client render matches the markup already in the
            DOM. React compares the server output to the client tree node-by-node; mismatches trigger warnings and force React to
            rebuild sections of the DOM.
          </p>
          <p className="content-text">
            Hydration uses the same reconciliation rules—matching types, respecting keys, and diffing props—but it adds strict
            validation to guarantee the server and client agree on the initial UI. Good reconciliation hygiene (stable keys,
            deterministic rendering) prevents hydration errors.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Related React Concepts</h2>
          <p className="content-text">
            Reconciliation is the connective tissue linking many other React primitives and patterns:
          </p>
          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Transitions and Scheduling</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Transitions mark updates as non-urgent so reconciliation can pause work and keep the UI responsive. Fiber stores
                priority metadata to make this possible.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Memoization Hooks</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                useMemo and useCallback help you stabilize values between renders so reconciliation can skip unnecessary work and
                avoid re-rendering expensive subtrees.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Suspense and Streaming</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Suspense lets reconciliation pause at specific Fibers until data is ready. Streaming server rendering sends HTML in
                chunks, and hydration reconciles those chunks when they arrive.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Reconciliation is React&apos;s fast, heuristic-driven algorithm for keeping your UI and component tree aligned. Fiber brings
            that process to life, hydration relies on it for correctness, and nearly every advanced React capability—from
            transitions to Suspense—builds on top of it. Mastering reconciliation unlocks a deeper understanding of how React
            really works.
          </p>
        </div>
      </div>
    </div>
  );
}
