import CodeExample from '@/components/CodeExample';

export default function ConcurrentFeatures() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Concurrent Features</h1>
          <p className="page-subtitle">
            Transitions, priority updates, and the React Scheduler for responsive applications
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">What are Concurrent Features?</h2>
          <p className="content-text">
            Concurrent features allow React to interrupt long-running renders to handle high-priority updates. Instead of 
            blocking the main thread while rendering, React can pause, prioritize urgent updates, and resume rendering later. 
            This keeps the UI responsive even during heavy computations.
          </p>
          <p className="content-text">
            The key insight is that not all updates are equally important. User interactions like typing or clicking should 
            be prioritized over background data fetching or animations.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Understanding Transitions</h2>
          <p className="content-text">
            A transition is an update that can be interrupted. When you mark an update as a transition, React treats it as 
            low-priority and can interrupt it to handle more urgent updates. This is perfect for non-blocking updates like 
            filtering lists or searching.
          </p>

          <CodeExample
            title="Using useTransition Hook"
            language="javascript"
            code={`import { useState, useTransition } from 'react';

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (e) => {
    const value = e.target.value;
    
    // Mark this update as a transition
    startTransition(() => {
      setQuery(value);
    });
  };
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search users..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <UserList query={query} />
    </div>
  );
}

// Without transitions:
// 1. User types in input
// 2. React starts rendering large list
// 3. Input freezes until render completes
// 4. User sees lag

// With transitions:
// 1. User types in input (high priority)
// 2. React starts rendering list (low priority)
// 3. Input responds immediately
// 4. List updates in background`}
            description="Using useTransition for non-blocking updates"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Priority Levels in React</h2>
          <p className="content-text">
            React uses a priority system to determine which updates to process first:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Use Case</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Immediate</td>
                  <td>Urgent user interactions</td>
                  <td>Typing, clicking, scrolling</td>
                </tr>
                <tr>
                  <td>User-blocking</td>
                  <td>Important but can wait slightly</td>
                  <td>Form submissions, navigation</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>Regular updates</td>
                  <td>Data loading, animations</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>Background work</td>
                  <td>Analytics, prefetching</td>
                </tr>
                <tr>
                  <td>Idle</td>
                  <td>When browser is idle</td>
                  <td>Cleanup, optimization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">The React Scheduler</h2>
          <p className="content-text">
            The React Scheduler is the engine that powers concurrent features. It manages a queue of tasks and determines 
            which task to execute based on priority and deadline. The scheduler can pause and resume work, enabling React 
            to keep the UI responsive.
          </p>

          <CodeExample
            title="How the Scheduler Works"
            language="javascript"
            code={`// Simplified React Scheduler concept

class Scheduler {
  constructor() {
    this.taskQueue = [];
    this.isScheduled = false;
  }
  
  scheduleTask(task, priority) {
    this.taskQueue.push({ task, priority });
    this.taskQueue.sort((a, b) => b.priority - a.priority);
    
    if (!this.isScheduled) {
      this.isScheduled = true;
      // Use requestIdleCallback or MessageChannel
      // to yield to browser for user interactions
      requestIdleCallback(() => this.flushTasks());
    }
  }
  
  flushTasks() {
    const deadline = performance.now() + 5; // 5ms time slice
    
    while (this.taskQueue.length > 0) {
      if (performance.now() > deadline) {
        // Time slice expired, yield to browser
        requestIdleCallback(() => this.flushTasks());
        return;
      }
      
      const { task } = this.taskQueue.shift();
      task();
    }
    
    this.isScheduled = false;
  }
}

// React uses this internally to:
// 1. Render components in time slices
// 2. Yield to browser for user input
// 3. Prioritize urgent updates
// 4. Keep 60fps smooth animations`}
            description="Simplified view of how React Scheduler manages tasks"
          />
        </div>

        <div className="section">
          <h2 className="section-title">useDeferredValue Hook</h2>
          <p className="content-text">
            useDeferredValue is similar to useTransition but works differently. Instead of marking an update as a transition, 
            you defer a value. React will render with the old value first, then update to the new value when it's ready.
          </p>

          <CodeExample
            title="Using useDeferredValue"
            language="javascript"
            code={`import { useState, useDeferredValue } from 'react';

export default function SearchWithDeferredValue() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {/* Input shows current query immediately */}
      {/* Results show deferredQuery when ready */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

// Difference from useTransition:
// useTransition: You control when to update
// useDeferredValue: React defers the value automatically

// Use useTransition when you have a function to call
// Use useDeferredValue when you have a value to defer`}
            description="Using useDeferredValue for deferred rendering"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Practical Example: Search with Concurrent Features</h2>
          <p className="content-text">
            Here's a real-world example combining transitions and deferred values:
          </p>

          <CodeExample
            title="Complete Search Component"
            language="javascript"
            code={`import { useState, useTransition, useDeferredValue } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mark expensive filtering as transition
    startTransition(() => {
      // This will be interrupted if user types again
      filterAndSortResults(value);
    });
  };
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
        className={isPending ? 'opacity-50' : ''}
      />
      
      {isPending && (
        <div className="spinner">Searching...</div>
      )}
      
      {/* Show results for deferred query */}
      <Results query={deferredQuery} />
    </div>
  );
}

// Flow:
// 1. User types "react"
// 2. Input updates immediately (high priority)
// 3. startTransition marks filtering as low priority
// 4. User types "reactive"
// 5. React interrupts filtering and starts over
// 6. Results update when filtering completes`}
            description="Complete search component using concurrent features"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Benefits of Concurrent Features</h2>
          <p className="content-text">
            Concurrent features provide several important benefits:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Responsive UI:</strong> User interactions are never blocked by rendering</li>
            <li><strong>Better perceived performance:</strong> App feels snappier and more responsive</li>
            <li><strong>Automatic prioritization:</strong> React handles priority without manual intervention</li>
            <li><strong>Interruptible rendering:</strong> Long renders can be paused for urgent updates</li>
            <li><strong>Improved user experience:</strong> Especially on lower-end devices</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Challenges and Considerations</h2>
          <p className="content-text">
            While concurrent features are powerful, there are some challenges:
          </p>

          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Complexity</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Concurrent rendering adds complexity. Components may render multiple times before committing.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Side Effects</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Components may render multiple times. Side effects must be idempotent and only in useEffect.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Debugging</h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Concurrent rendering makes debugging harder. Renders may happen in unexpected order.
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Best Practices</h2>
          <p className="content-text">
            Follow these practices when using concurrent features:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Use transitions for expensive updates:</strong> Search, filtering, sorting</li>
            <li><strong>Keep render pure:</strong> No side effects in render function</li>
            <li><strong>Use useEffect for side effects:</strong> Only run effects after commit</li>
            <li><strong>Provide loading states:</strong> Show isPending indicator to users</li>
            <li><strong>Test on real devices:</strong> Concurrent features matter most on slower devices</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Concurrent features represent a fundamental shift in how React handles rendering. By allowing renders to be 
            interrupted and prioritized, React can keep the UI responsive even during heavy computations. Understanding 
            transitions, priority levels, and the scheduler is essential for building fast, responsive React applications.
          </p>
        </div>
      </div>
    </div>
  );
}
