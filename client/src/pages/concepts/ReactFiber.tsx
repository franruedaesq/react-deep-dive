import CodeExample from '@/components/CodeExample';

export default function ReactFiber() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">React Fiber</h1>
          <p className="page-subtitle">The reconciliation algorithm that powers React's rendering engine</p>
        </div>

        <div className="section">
          <h2 className="section-title">What is React Fiber?</h2>
          <p className="content-text">
            React Fiber is the reconciliation engine introduced in React 16 that determines how to update the DOM when state or props change. 
            It's the algorithm that React uses internally to decide which components need to re-render and how to efficiently update the DOM.
          </p>
          <p className="content-text">
            The term "Fiber" refers to the data structure used to represent work that needs to be done. Each React component instance 
            corresponds to a Fiber node, and the Fiber algorithm works through these nodes to determine what changes need to be made.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Why Fiber?</h2>
          <p className="content-text">
            Before Fiber, React used a "stack reconciler" that would process the entire component tree synchronously. This meant that 
            once React started rendering, it couldn't stop until the entire tree was processed, blocking the main thread and causing 
            janky animations and unresponsive interfaces.
          </p>
          <p className="content-text">
            Fiber introduced incremental rendering—the ability to split rendering work into small units and spread it across multiple 
            frames. This allows React to pause work, prioritize different types of work, and reuse previously completed work.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">The Fiber Architecture</h2>
          <p className="content-text">
            Each Fiber node represents a unit of work. The Fiber tree mirrors the component tree but includes additional information 
            needed for rendering and reconciliation.
          </p>

          <CodeExample
            title="Fiber Node Structure"
            language="typescript"
            code={`interface Fiber {
  // Component information
  type: any;                    // Component function or class
  key: string | null;           // Key for list items
  props: any;                   // Component props
  
  // Fiber tree structure
  parent: Fiber | null;         // Parent Fiber
  child: Fiber | null;          // First child Fiber
  sibling: Fiber | null;        // Next sibling Fiber
  
  // Instance information
  instance: any;                // Component instance (for class components)
  state: any;                   // Component state
  
  // Work information
  effectTag: string;            // 'PLACEMENT' | 'UPDATE' | 'DELETION'
  effects: Fiber[];             // Child Fibers with effects
  
  // Hooks information
  hooks: Hook[];                // Hooks state
  
  // Alternate (previous version)
  alternate: Fiber | null;      // Previous Fiber for comparison
}`}
            description="The internal structure of a Fiber node"
          />
        </div>

        <div className="section">
          <h2 className="section-title">The Two Phases of Fiber</h2>
          <p className="content-text">
            React Fiber works in two main phases: the render phase and the commit phase. Understanding these phases is crucial for 
            understanding how React works.
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Render Phase</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                In the render phase, React walks through the Fiber tree and determines what changes need to be made. This phase is 
                interruptible—React can pause and resume work. Side effects are NOT run during this phase.
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                <li>Determine which components need to update</li>
                <li>Calculate new state and props</li>
                <li>Create new Fiber nodes or update existing ones</li>
                <li>Mark nodes with effect tags (PLACEMENT, UPDATE, DELETION)</li>
                <li>Can be paused and resumed</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Commit Phase</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                In the commit phase, React applies the changes to the DOM. This phase is synchronous and cannot be interrupted. 
                Side effects (like useEffect) are run during this phase.
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                <li>Apply DOM mutations</li>
                <li>Update DOM attributes and content</li>
                <li>Run lifecycle methods and hooks</li>
                <li>Cannot be paused or interrupted</li>
                <li>Must complete before browser can paint</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">How Fiber Reconciliation Works</h2>
          <p className="content-text">
            When state or props change, React uses the Fiber algorithm to determine the minimal set of DOM changes needed:
          </p>

          <CodeExample
            title="Fiber Reconciliation Process"
            language="javascript"
            code={`// 1. State change triggers update
setState(newValue);

// 2. React schedules work (Fiber)
scheduleWork(fiber);

// 3. Render phase - walk Fiber tree
// React compares old and new props/state
// Creates new Fiber nodes or updates existing ones
// Marks nodes with effect tags

// 4. Commit phase - apply changes
// Walk Fiber tree with effect tags
// Apply DOM mutations
// Run lifecycle methods and effects

// 5. Browser paints
// Screen updates with new content`}
            description="The complete Fiber reconciliation flow"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Fiber Priorities</h2>
          <p className="content-text">
            One of Fiber's key features is the ability to prioritize work. Different updates have different priorities, allowing 
            React to handle urgent updates (like user input) before less urgent ones (like data fetching).
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Type</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Immediate</td>
                  <td>Synchronous</td>
                  <td>User input, animations</td>
                </tr>
                <tr>
                  <td>User-blocking</td>
                  <td>High priority</td>
                  <td>Form submission, click handlers</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>Medium priority</td>
                  <td>Regular state updates</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>Low priority</td>
                  <td>Data fetching, logging</td>
                </tr>
                <tr>
                  <td>Idle</td>
                  <td>Lowest priority</td>
                  <td>Background tasks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Key Fiber Concepts</h2>
          <p className="content-text">
            Understanding these key concepts helps you write more efficient React code:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Reconciliation</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                The process of comparing old and new component trees to determine what changed. Fiber uses a diffing algorithm 
                to efficiently identify changes.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Work Units</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Each Fiber node represents a unit of work. React can pause between work units, allowing the browser to handle 
                user input and animations.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Effect Tags</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Tags that indicate what type of work needs to be done (PLACEMENT, UPDATE, DELETION). These guide the commit phase.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Alternate Fiber</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Each Fiber maintains a reference to its previous version (alternate). This allows React to compare old and new 
                trees efficiently.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Benefits of Fiber</h2>
          <p className="content-text">
            Fiber provides several important benefits that improve React application performance and user experience:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Incremental rendering:</strong> Spread rendering work across multiple frames</li>
            <li><strong>Priority-based updates:</strong> Handle urgent updates before less urgent ones</li>
            <li><strong>Better error handling:</strong> Error boundaries can catch and recover from errors</li>
            <li><strong>Suspense support:</strong> Ability to pause rendering while waiting for data</li>
            <li><strong>Improved performance:</strong> More efficient DOM updates and animations</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            React Fiber is the modern reconciliation algorithm that powers React's rendering engine. By splitting work into small 
            units and allowing interruption, Fiber enables React to handle complex applications while maintaining responsive user 
            interfaces. Understanding Fiber helps you write more efficient React code and debug performance issues.
          </p>
        </div>
      </div>
    </div>
  );
}
