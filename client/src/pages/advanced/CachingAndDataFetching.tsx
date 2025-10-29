import CodeExample from '@/components/CodeExample';

export default function CachingAndDataFetching() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Caching and Data Fetching</h1>
          <p className="page-subtitle">
            Modern patterns using the `use` hook and fetch in React Server Components
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">The Evolution of Data Fetching</h2>
          <p className="content-text">
            Data fetching in React has evolved significantly. Early approaches involved fetching in useEffect on the client, 
            which led to waterfalls and poor performance. Modern approaches leverage React Server Components and the `use` hook 
            to fetch data more efficiently.
          </p>
          <p className="content-text">
            The key insight is that data fetching should happen as close to where it's needed as possible, and caching should 
            be automatic and transparent.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Traditional Client-Side Data Fetching</h2>
          <p className="content-text">
            The old pattern of fetching data in useEffect has several problems:
          </p>

          <CodeExample
            title="Problems with useEffect Data Fetching"
            language="javascript"
            code={`// ❌ Old pattern - causes waterfalls
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  
  // First fetch: get user
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser);
  }, [userId]);
  
  // Second fetch: get posts (waits for user!)
  useEffect(() => {
    if (!user) return;
    fetch(\`/api/posts?userId=\${user.id}\`)
      .then(r => r.json())
      .then(setPosts);
  }, [user]);
  
  // Problems:
  // 1. Waterfall: posts fetch waits for user fetch
  // 2. No caching: fetches again on every render
  // 3. Race conditions: multiple requests possible
  // 4. Complex state management
}

// Timeline:
// 0ms: Component mounts
// 100ms: User fetch completes
// 200ms: Posts fetch starts (waterfall!)
// 300ms: Posts fetch completes`}
            description="Why useEffect data fetching is problematic"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Server-Side Data Fetching with RSC</h2>
          <p className="content-text">
            React Server Components allow data fetching directly in components, eliminating waterfalls:
          </p>

          <CodeExample
            title="Data Fetching in Server Components"
            language="javascript"
            code={`// ✅ New pattern - parallel fetching
async function UserProfile({ userId }) {
  // Both fetches happen in parallel on the server
  const [user, posts] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json())
  ]);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <PostsList posts={posts} />
    </div>
  );
}

// Benefits:
// 1. Parallel fetching: both requests happen at once
// 2. No waterfalls: server handles all data fetching
// 3. Automatic caching: React caches fetch results
// 4. Simpler code: no useState or useEffect needed

// Timeline:
// 0ms: Both fetches start in parallel
// 100ms: Both fetches complete
// 200ms: Component renders`}
            description="Parallel data fetching in Server Components"
          />
        </div>

        <div className="section">
          <h2 className="section-title">The `use` Hook</h2>
          <p className="content-text">
            The `use` hook allows client components to consume promises and async data. It's the bridge between server 
            components and client components:
          </p>

          <CodeExample
            title="Using the `use` Hook"
            language="javascript"
            code={`// Server Component
async function getUser(id) {
  const user = await fetch(\`/api/users/\${id}\`).then(r => r.json());
  return user;
}

// Client Component
'use client';

import { use } from 'react';

function UserProfile({ userPromise }) {
  // use() unwraps the promise
  const user = use(userPromise);
  
  return <div>{user.name}</div>;
}

// Usage
export default function Page({ userId }) {
  // Pass promise to client component
  const userPromise = getUser(userId);
  
  return <UserProfile userPromise={userPromise} />;
}

// Benefits:
// 1. Suspense integration: use() works with Suspense
// 2. Error boundaries: errors propagate to nearest boundary
// 3. Streaming: works with streaming SSR
// 4. Caching: React caches promise results`}
            description="Using the `use` hook for promise handling"
          />
        </div>

        <div className="section">
          <h2 className="section-title">React Fetch Caching</h2>
          <p className="content-text">
            React automatically caches fetch results during rendering. This means the same fetch request made multiple times 
            in the same render will only execute once:
          </p>

          <CodeExample
            title="Automatic Fetch Caching"
            language="javascript"
            code={`// React automatically deduplicates fetch calls
async function UserProfile({ userId }) {
  // First fetch - executes
  const user = await fetch(\`/api/users/\${userId}\`);
  
  // Second fetch - same URL, returns cached result!
  const userAgain = await fetch(\`/api/users/\${userId}\`);
  
  // Both variables have the same data
  // But only one network request was made
}

// React's fetch wrapper:
// 1. Checks cache for URL
// 2. If found, returns cached promise
// 3. If not found, makes request and caches it
// 4. Returns same promise to all callers

// Cache is per-render:
// - Cleared after render completes
// - Useful for deduplication within a render
// - Not for long-term caching

// For long-term caching, use:
// - HTTP cache headers (Cache-Control)
// - CDN caching
// - React Query or SWR
// - Custom cache layer`}
            description="How React caches fetch results automatically"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Caching Strategies</h2>
          <p className="content-text">
            Different caching strategies for different scenarios:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Strategy</th>
                  <th>When to Use</th>
                  <th>Implementation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HTTP Cache</td>
                  <td>Static content, assets</td>
                  <td>Cache-Control headers</td>
                </tr>
                <tr>
                  <td>Request Deduplication</td>
                  <td>Same request in one render</td>
                  <td>React's built-in fetch caching</td>
                </tr>
                <tr>
                  <td>ISR/Revalidation</td>
                  <td>Semi-dynamic content</td>
                  <td>Next.js revalidateTag/revalidatePath</td>
                </tr>
                <tr>
                  <td>Client Cache</td>
                  <td>User-specific data</td>
                  <td>React Query, SWR, Zustand</td>
                </tr>
                <tr>
                  <td>Database Cache</td>
                  <td>Frequently accessed data</td>
                  <td>Redis, Memcached</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Data Fetching Patterns</h2>
          <p className="content-text">
            Common patterns for fetching data in modern React applications:
          </p>

          <CodeExample
            title="Common Data Fetching Patterns"
            language="javascript"
            code={`// Pattern 1: Fetch in Server Component
async function Page() {
  const data = await fetch('/api/data').then(r => r.json());
  return <Component data={data} />;
}

// Pattern 2: Pass promise to client component
async function getUser(id) {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}

'use client';
function UserCard({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

export default function Page({ userId }) {
  return <UserCard userPromise={getUser(userId)} />;
}

// Pattern 3: Fetch with Suspense
async function UsersList() {
  const users = await fetch('/api/users').then(r => r.json());
  return users.map(u => <User key={u.id} user={u} />);
}

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UsersList />
    </Suspense>
  );
}

// Pattern 4: Parallel fetching
async function Dashboard() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return (
    <div>
      <Users data={users} />
      <Posts data={posts} />
      <Comments data={comments} />
    </div>
  );
}`}
            description="Common data fetching patterns in modern React"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Error Handling</h2>
          <p className="content-text">
            Proper error handling is crucial for robust data fetching:
          </p>

          <CodeExample
            title="Error Handling in Data Fetching"
            language="javascript"
            code={`// Server Component with error handling
async function UserProfile({ userId }) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`, {
      // Revalidate cache every hour
      next: { revalidate: 3600 }
    }).then(r => {
      if (!r.ok) throw new Error('Failed to fetch user');
      return r.json();
    });
    
    return <div>{user.name}</div>;
  } catch (error) {
    // Error boundaries will catch this
    throw error;
  }
}

// Client Component with use() and error boundary
'use client';

import { use } from 'react';

function UserCard({ userPromise }) {
  try {
    const user = use(userPromise);
    return <div>{user.name}</div>;
  } catch (error) {
    return <div>Error loading user: {error.message}</div>;
  }
}

// Or use Error Boundary
export default function Page({ userPromise }) {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <UserCard userPromise={userPromise} />
    </ErrorBoundary>
  );
}`}
            description="Error handling in data fetching"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Best Practices</h2>
          <p className="content-text">
            Follow these practices for effective data fetching:
          </p>

          <ul className="space-y-2 mb-6 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Fetch on the server:</strong> Use Server Components for initial data</li>
            <li><strong>Parallel fetching:</strong> Use Promise.all for independent requests</li>
            <li><strong>Leverage caching:</strong> Use HTTP cache headers and React caching</li>
            <li><strong>Handle errors:</strong> Use Error Boundaries and try/catch</li>
            <li><strong>Use Suspense:</strong> Show loading states with Suspense boundaries</li>
            <li><strong>Avoid waterfalls:</strong> Fetch all data before rendering</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Modern data fetching in React emphasizes server-side fetching, parallel requests, and automatic caching. By using 
            React Server Components and the `use` hook, you can build fast, efficient applications that avoid waterfalls and 
            provide excellent user experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
