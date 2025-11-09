import CodeExample from '@/components/CodeExample';

export default function ReactFiberUnderTheHood() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">React Fiber Under the Hood</h1>
          <p className="page-subtitle">
            A historical and architectural deep dive into the engine that powers modern React rendering
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">From Stack Reconciler to Fiber</h2>
          <p className="content-text">
            React&apos;s earliest versions used what is known as the stack reconciler. Each update would synchronously walk the
            component tree from top to bottom, calling render on every component until the entire tree was processed. This
            model matched the call stack in JavaScript, which meant React couldn&apos;t pause work once rendering began. Expensive
            updates resulted in dropped frames, blocked user input, and limited control over prioritizing critical updates
            like typing or animations.
          </p>
          <p className="content-text">
            Fiber, introduced in React 16, reimagined reconciliation as a linked data structure. Rather than relying on the
            JavaScript stack, React maintains its own tree of Fiber nodes, allowing rendering to be split into small work
            units. This shift enabled incremental rendering, interruption, and fine-grained prioritization—all foundational
            for concurrent rendering features introduced in React 18 and beyond.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What Is a Fiber Node Really?</h2>
          <p className="content-text">
            A Fiber node is an object that captures everything React needs to render a component: the component type, pending
            props, hooks state, refs, update queue, and pointers to the node&apos;s parent, child, and siblings. Fibers come in
            pairs—there&apos;s the current tree (committed to the DOM) and the work-in-progress tree being prepared. During the
            render phase React creates or reuses work-in-progress nodes, compares them to their alternates, and records the work
            necessary for the commit phase.
          </p>

          <CodeExample
            title="Fiber Node Anatomy"
            language="typescript"
            code={`interface FiberNode {
  tag: WorkTag;                // FunctionComponent, HostComponent, etc.
  type: any;                   // Component or host type
  key: null | string;          // For stable identity in lists
  pendingProps: Props;         // Props being processed in the render phase
  memoizedProps: Props;        // Props used during the last completed render
  memoizedState: any;          // State or hook memoization
  updateQueue: UpdateQueue | null; // Pending state updates
  dependencies: Dependencies | null; // Context subscriptions

  return: FiberNode | null;    // Parent fiber
  child: FiberNode | null;     // First child fiber
  sibling: FiberNode | null;   // Next sibling fiber
  index: number;               // Position among siblings

  alternate: FiberNode | null; // Link to previous version
  flags: Flags;                // Side-effect indicators for commit phase
  subtreeFlags: Flags;         // Aggregated effects from descendants
}
            `}
            description="A closer look at the fields stored on a Fiber node"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Scheduling Work with the Fiber Architecture</h2>
          <p className="content-text">
            Instead of synchronously rendering everything, React schedules work. Updates enter the scheduler through setState
            or hooks, and the scheduler assigns each update to a priority lane. Higher-priority lanes, such as user input,
            preempt lower-priority work. When the browser has time, React processes a small chunk of the Fiber tree, yielding
            back control when necessary. This cooperative scheduling keeps the UI responsive even during heavy computation.
          </p>

          <CodeExample
            title="Update Scheduling Pseudocode"
            language="javascript"
            code={`function scheduleUpdateOnFiber(fiber, lane) {
  // Mark the lane on the root so React knows work is pending
  const root = markRootUpdated(fiber, lane);

  if (lane === SyncLane) {
    // Render immediately (legacy mode or urgent updates)
    performSyncWorkOnRoot(root);
  } else {
    ensureRootIsScheduled(root);
  }
}

function performConcurrentWorkOnRoot(root) {
  do {
    const shouldYield = performUnitOfWork(root);
    if (shouldYield) {
      // Hand control back to the browser (requestIdleCallback / MessageChannel)
      scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
      return;
    }
  } while (root.hasWork());

  commitRoot(root);
}
            `}
            description="How React coordinates rendering work across different priority lanes"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Understanding the Render and Commit Loop</h2>
          <p className="content-text">
            React alternates between two intertwined loops. In the render phase, React walks the work-in-progress tree one fiber
            at a time, building the next UI and collecting side effects. Because each fiber represents an isolated unit of work,
            React can pause between units if a more urgent update arrives. In the commit phase, React flushes the recorded
            effects synchronously: DOM mutations, ref updates, layout effects, and passive effects all run in carefully ordered
            steps to avoid visual tearing.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Purpose</th>
                  <th>Can Be Interrupted?</th>
                  <th>Side Effects?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Render</td>
                  <td>Compute the next UI tree and gather effects</td>
                  <td>Yes — yields for higher priority work</td>
                  <td>No — effects are only prepared</td>
                </tr>
                <tr>
                  <td>Pre-Commit</td>
                  <td>Snapshot before DOM mutations (getSnapshotBeforeUpdate)</td>
                  <td>No</td>
                  <td>Limited (layout preparation)</td>
                </tr>
                <tr>
                  <td>Commit</td>
                  <td>Apply mutations and run lifecycle hooks</td>
                  <td>No — must complete in one frame</td>
                  <td>Yes — DOM mutations, layout &amp; passive effects</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Concurrent Rendering and Transitions</h2>
          <p className="content-text">
            With Fiber in place, React 18 introduced concurrent rendering APIs like startTransition. Transitions schedule work
            on lower priority lanes, allowing urgent interactions (typing, clicking) to stay synchronous while longer updates
            render in the background. If a transition takes too long, Suspense boundaries let React reveal a fallback and later
            reveal the final content without blocking user input.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Practical Takeaways for Developers</h2>
          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li>
              Keep render work lightweight—large synchronous computations block the commit phase even with Fiber. Defer heavy
              work with <code>useMemo</code>, <code>useDeferredValue</code>, or move it off the main thread.
            </li>
            <li>
              Understand transitions: wrapping state updates in <code>startTransition</code> signals to React that the update can
              be interrupted in favor of urgent work.
            </li>
            <li>
              Use the React DevTools Profiler to inspect commit durations and reveal which components triggered expensive
              renders. Fiber&apos;s linked list structure is what enables this granular profiling data.
            </li>
            <li>
              Error boundaries and Suspense are built on Fiber&apos;s ability to unwind and retry work at specific points in the
              tree. Placing them strategically improves resilience and perceived performance.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Looking Ahead</h2>
          <p className="content-text">
            React&apos;s core team continues to iterate on the scheduler, lane model, and data structures that Fiber introduced. New
            capabilities such as selective hydration, offscreen rendering, and server components all rely on the flexibility of
            Fiber&apos;s design. Understanding the mechanics behind Fiber makes it easier to reason about how React will evolve and
            how to architect applications that thrive in concurrent environments.
          </p>
        </div>
      </div>
    </div>
  );
}
