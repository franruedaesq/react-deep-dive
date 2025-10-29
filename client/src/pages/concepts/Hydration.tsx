import CodeExample from '@/components/CodeExample';

export default function Hydration() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Hydration</h1>
          <p className="page-subtitle">Attaching JavaScript to server-rendered HTML to make it interactive</p>
        </div>

        <div className="section">
          <h2 className="section-title">What is Hydration?</h2>
          <p className="content-text">
            Hydration is the process of attaching React to server-rendered HTML, transforming static markup into an interactive 
            React application. When a user visits a server-rendered page, the browser receives fully rendered HTML and displays 
            it immediately. Then, React downloads and executes, "hydrating" the HTML by attaching event listeners and initializing state.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">The Hydration Process</h2>
          <p className="content-text">
            Hydration happens in several distinct phases. First, the browser receives HTML from the server and renders it. Second, 
            the JavaScript bundle downloads. Third, React initializes and compares the rendered output with the server HTML. Finally, 
            React attaches event listeners and initializes state without re-rendering the DOM.
          </p>

          <CodeExample
            title="Client-Side Hydration"
            language="javascript"
            code={`import { hydrateRoot } from 'react-dom/client';
import App from './App';

// Hydrate the server-rendered HTML
hydrateRoot(document.getElementById('root'), <App />);

// React now:
// 1. Compares rendered output with server HTML
// 2. Attaches event listeners to existing DOM nodes
// 3. Initializes state and effects
// 4. Makes the page interactive`}
            description="Client hydrates server-rendered HTML with React"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Understanding hydrateRoot()</h2>
          <p className="content-text">
            The hydrateRoot() function is the key API for hydration. Unlike createRoot(), which creates a new React tree, 
            hydrateRoot() attaches React to existing HTML without replacing it.
          </p>

          <CodeExample
            title="hydrateRoot() API Signature"
            language="typescript"
            code={`const root = hydrateRoot(domNode, reactNode, options?);

// Parameters:
// domNode: The DOM element containing server-rendered HTML
// reactNode: The React component to hydrate
// options: Optional configuration

// Methods on the root object:
root.render(reactNode);    // Update components
root.unmount();            // Unmount and clean up`}
            description="The hydrateRoot() function signature"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Hydration Mismatches</h2>
          <p className="content-text">
            The most common hydration issue is a mismatch between server-rendered and client-rendered output. If the server 
            renders different HTML than the client expects, React will warn about the mismatch.
          </p>

          <CodeExample
            title="Avoiding Hydration Mismatches"
            language="javascript"
            code={`// WRONG: Conditional rendering based on typeof window
function Component() {
  if (typeof window !== 'undefined') {
    return <div>Client only</div>;
  }
  return <div>Server or client</div>;
}

// CORRECT: Use useEffect for client-only logic
function Component() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return <div>{isClient ? 'Client only' : 'Server or client'}</div>;
}`}
            description="Avoiding hydration mismatches with proper patterns"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            Hydration is a critical concept in modern React applications that use server rendering. By understanding how 
            hydration works and avoiding common pitfalls, you can build fast, SEO-friendly applications.
          </p>
        </div>
      </div>
    </div>
  );
}
