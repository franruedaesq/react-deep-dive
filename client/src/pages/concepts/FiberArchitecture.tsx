import CodeExample from "@/components/CodeExample";

export default function FiberArchitecture() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Fiber Architecture Deep Dive</h1>
          <p className="page-subtitle">
            Understanding the cooperative scheduling engine that gives React its responsiveness
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">From Components to Fibers</h2>
          <p className="content-text">
            A Fiber is a lightweight JavaScript object that mirrors a React element instance. It describes the component
            type, its pending work, and its position in the tree. During rendering React creates a work-in-progress fiber
            tree that represents the next frame of the UI, while preserving a current fiber tree that reflects what is on
            screen.
          </p>
          <p className="content-text">
            Every update starts by cloning the current fiber into the work-in-progress tree. React mutates the work-in-progress
            fiber with new props, state, and effect tags. When the update is committed the work-in-progress tree becomes the
            current tree, enabling React to compare the past and next state without mutating the live objects the browser is
            using.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Fiber Node Anatomy</h2>
          <p className="content-text">
            Fiber nodes carry bookkeeping fields that let React schedule, pause, and resume work at any point in the component
            hierarchy. Besides pointers to parent, child, and sibling nodes, each fiber stores flags that describe what work
            needs to happen and lanes that encode the update priority.
          </p>

          <CodeExample
            title="Essential Fiber Fields"
            language="typescript"
            code={`type Lane = number; // Bitmask representing priority buckets

interface FiberNode {
  tag: WorkTag;                 // FunctionComponent, HostComponent, SuspenseComponent, ...
  type: any;                    // Component function, class, or host type (div, span)
  key: null | string;           // For reconciling arrays of children
  stateNode: any;               // DOM node or class instance associated with the fiber

  // Tree structure
  return: FiberNode | null;     // Parent fiber
  child: FiberNode | null;      // First child fiber
  sibling: FiberNode | null;    // Next sibling fiber

  pendingProps: any;            // Props for the next render
  memoizedProps: any;           // Props from the previous committed render
  memoizedState: any;           // State from the previous committed render
  updateQueue: UpdateQueue | null; // Enqueued state updates and effects

  flags: Flags;                 // Placement | Update | Deletion | ...
  subtreeFlags: Flags;          // Aggregated flags from descendants
  lanes: Lane;                  // Priority for this fiber's work
  childLanes: Lane;             // Highest priority work in the subtree

  alternate: FiberNode | null;  // Pointer to the current/work-in-progress counterpart
}`}
            description="Key properties stored on every Fiber node"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Cooperative Scheduling with Lanes</h2>
          <p className="content-text">
            Fiber introduced cooperative multitasking to rendering. Instead of blocking the main thread with a single long
            render, React partitions work into lanes—bitmasks that encode priorities such as synchronous events, user-blocking
            interactions, transitions, or background updates. The scheduler processes the highest-priority pending lane first
            and can yield control back to the browser between units of work.
          </p>
          <p className="content-text">
            When new updates are enqueued React merges their lane information into the affected fibers. If a higher-priority
            update arrives during rendering React can interrupt the current work-in-progress tree, preserve its state, and
            restart from the root with the urgent lane. Once the main thread is idle it resumes the interrupted work exactly
            where it left off.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Render and Commit Phases Revisited</h2>
          <p className="content-text">
            The render phase builds the work-in-progress fiber tree and records side-effect flags. Because the phase is
            interruptible React may traverse the same subtree multiple times until it resolves the highest priority updates.
            Only when the scheduler is confident that the current lanes are complete does React move to the commit phase.
          </p>
          <p className="content-text">
            The commit phase is synchronous and executes in three sub-steps: before-mutation lifecycles, DOM mutations, and
            layout effects. React walks the effect list collected during rendering, applies changes, runs layout effects, and
            finally schedules passive effects like useEffect callbacks in a separate task. This separation keeps the UI
            responsive while maintaining consistent state across renders.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Handling Suspense and Concurrent Features</h2>
          <p className="content-text">
            Fiber makes features like Suspense possible by allowing React to intentionally delay committing a tree until data is
            ready. When a component suspends, its fiber throws a promise. The scheduler marks the suspended fiber's lane as
            pending and continues rendering fallback UI in parallel. Once the promise resolves the lane is retried with the
            cached work preserved.
          </p>
          <p className="content-text">
            Concurrent React layers additional heuristics on top of Fiber: transitions are rendered in a lower-priority lane and
            can be interrupted by urgent events, while selective hydration reuses the same fiber mechanics on the server
            generated tree. Understanding these scheduling semantics helps predict how components will behave under different
            workloads.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Debugging Fiber Work</h2>
          <p className="content-text">
            Because Fiber continually swaps between current and work-in-progress trees, debugging requires tooling awareness.
            The React DevTools profiler visualizes commit durations and highlights which fibers triggered updates. You can also
            inspect the scheduler by enabling the <code>schedulerTracing</code> runtime flag in development builds.
          </p>

          <CodeExample
            title="Inspecting Fiber Commits"
            language="javascript"
            code={`import { unstable_trace as trace } from 'scheduler/tracing';

trace('profile expensive update', performance.now(), () => {
  startTransition(() => {
    setState(expensiveComputation());
  });
});
`}
            description="Tracing a transition to understand Fiber scheduling"
          />
          <p className="content-text">
            Profiling interactions reveals whether work executed in the correct lane. Long commits usually signal synchronous
            lanes doing too much work at once, while a cascade of small commits may hint at missing memoization causing fibers
            to re-render unnecessarily.
          </p>
        </div>
      </div>
    </div>
  );
}
