export default function InteractiveDiagrams() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Interactive Diagrams</h1>
          <p className="page-subtitle">
            Visual representations of how React rendering flows between server, network, and browser
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Client Side Rendering (CSR) Flow</h2>
          <p className="content-text">
            In CSR, the browser downloads JavaScript and renders the entire page on the client:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4">
                <div className="w-24 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-center font-semibold">Browser</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-center font-semibold">Server</div>
              </div>

              <div className="ml-4 space-y-2 text-slate-700 dark:text-slate-300">
                <div>1. User visits site</div>
                <div className="ml-4 text-blue-600 dark:text-blue-400">→ Request HTML</div>
                <div className="ml-8 text-green-600 dark:text-green-400">← Empty HTML shell</div>
                <div>2. Browser downloads JS (250KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ Parse & execute (2-3s)</div>
                <div>3. React renders components</div>
                <div className="ml-4 text-blue-600 dark:text-blue-400">→ Request data</div>
                <div className="ml-8 text-green-600 dark:text-green-400">← JSON data</div>
                <div>4. Page becomes interactive</div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-700">
                <div className="text-amber-900 dark:text-amber-100 text-xs font-semibold mb-1">Timeline:</div>
                <div className="text-amber-800 dark:text-amber-200 text-xs">TTFB: 50ms | FCP: 2.5s | LCP: 3.2s | TTI: 3.5s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Server Side Rendering (SSR) Flow</h2>
          <p className="content-text">
            In SSR, the server renders the page and sends HTML with data, then the browser hydrates:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4">
                <div className="w-24 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-center font-semibold">Browser</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-center font-semibold">Server</div>
              </div>

              <div className="ml-4 space-y-2 text-slate-700 dark:text-slate-300">
                <div>1. User visits site</div>
                <div className="ml-4 text-blue-600 dark:text-blue-400">→ Request page</div>
                <div className="ml-8 text-green-600 dark:text-green-400">← Fetch data</div>
                <div className="ml-8 text-green-600 dark:text-green-400">← Render HTML (200KB)</div>
                <div>2. Browser displays HTML</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Content visible (1.2s)</div>
                <div>3. Download JS (200KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ Parse & execute</div>
                <div>4. Hydrate components</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Interactive (1.8s)</div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-700">
                <div className="text-amber-900 dark:text-amber-100 text-xs font-semibold mb-1">Timeline:</div>
                <div className="text-amber-800 dark:text-amber-200 text-xs">TTFB: 200ms | FCP: 1.2s | LCP: 1.8s | TTI: 1.8s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Static Site Generation (SSG) Flow</h2>
          <p className="content-text">
            In SSG, pages are pre-rendered at build time and served from a CDN:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-6">
                <div className="w-24 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-center font-semibold">Browser</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded text-center font-semibold">CDN</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-center font-semibold">Server</div>
              </div>

              <div className="ml-4 space-y-2 text-slate-700 dark:text-slate-300">
                <div className="text-purple-600 dark:text-purple-400">BUILD TIME:</div>
                <div className="ml-4">1. Fetch all data</div>
                <div className="ml-4">2. Render all pages to HTML</div>
                <div className="ml-4">3. Upload to CDN</div>

                <div className="text-blue-600 dark:text-blue-400 mt-4">RUNTIME:</div>
                <div className="ml-4">1. User visits site</div>
                <div className="ml-8 text-blue-600 dark:text-blue-400">→ Request from CDN</div>
                <div className="ml-8 text-purple-600 dark:text-purple-400">← Pre-rendered HTML (180KB)</div>
                <div>2. Browser displays HTML</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Content visible (0.8s)</div>
                <div>3. Download JS (50KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ Parse & execute</div>
                <div>4. Hydrate components</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Interactive (1.0s)</div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-700">
                <div className="text-amber-900 dark:text-amber-100 text-xs font-semibold mb-1">Timeline:</div>
                <div className="text-amber-800 dark:text-amber-200 text-xs">TTFB: 50ms | FCP: 0.8s | LCP: 1.0s | TTI: 1.0s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Streaming SSR Flow</h2>
          <p className="content-text">
            In Streaming SSR, the server sends HTML in chunks as data becomes available:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4">
                <div className="w-24 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-center font-semibold">Browser</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-center font-semibold">Server</div>
              </div>

              <div className="ml-4 space-y-2 text-slate-700 dark:text-slate-300">
                <div>1. User visits site</div>
                <div className="ml-4 text-blue-600 dark:text-blue-400">→ Request page</div>
                <div className="ml-8 text-green-600 dark:text-green-400">← Render shell (50KB)</div>
                <div>2. Browser displays shell</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Layout visible (0.7s)</div>
                <div>3. Server fetches data in parallel</div>
                <div className="ml-4 text-green-600 dark:text-green-400">← Stream chunk 1 (50KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ First content (1.0s)</div>
                <div className="ml-4 text-green-600 dark:text-green-400">← Stream chunk 2 (50KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ More content (1.3s)</div>
                <div>4. Download JS & hydrate</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Interactive (1.5s)</div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-700">
                <div className="text-amber-900 dark:text-amber-100 text-xs font-semibold mb-1">Timeline:</div>
                <div className="text-amber-800 dark:text-amber-200 text-xs">TTFB: 100ms | FCP: 0.7s | LCP: 1.3s | TTI: 1.5s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Islands Architecture Flow</h2>
          <p className="content-text">
            In Islands Architecture, static content is pre-rendered and interactive islands hydrate independently:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4">
                <div className="w-24 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-center font-semibold">Browser</div>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="w-24 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded text-center font-semibold">CDN</div>
              </div>

              <div className="ml-4 space-y-2 text-slate-700 dark:text-slate-300">
                <div>1. User visits site</div>
                <div className="ml-4 text-blue-600 dark:text-blue-400">→ Request page</div>
                <div className="ml-8 text-purple-600 dark:text-purple-400">← Static HTML (150KB)</div>
                <div>2. Browser displays static content</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Content visible (0.9s)</div>
                <div>3. Download island JS (80KB)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ Parse & execute</div>
                <div>4. Hydrate islands independently</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Filter island interactive (1.0s)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Cart island interactive (1.1s)</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ All interactive (1.1s)</div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-700">
                <div className="text-amber-900 dark:text-amber-100 text-xs font-semibold mb-1">Timeline:</div>
                <div className="text-amber-800 dark:text-amber-200 text-xs">TTFB: 60ms | FCP: 0.9s | LCP: 1.1s | TTI: 1.1s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Hydration Process</h2>
          <p className="content-text">
            The hydration process attaches JavaScript to server-rendered HTML:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="ml-4 space-y-3 text-slate-700 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-slate-100">Step 1: Server Renders</div>
                <div className="ml-4 p-2 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-700">
                  <div className="text-green-900 dark:text-green-100">&lt;div id="app"&gt;</div>
                  <div className="text-green-900 dark:text-green-100 ml-4">&lt;button&gt;Click me&lt;/button&gt;</div>
                  <div className="text-green-900 dark:text-green-100">&lt;/div&gt;</div>
                </div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-4">Step 2: Browser Receives HTML</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Content visible immediately</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✗ Button not interactive yet</div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-4">Step 3: Download & Parse JS</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ 200KB JS bundle</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">⏳ Parse and compile</div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-4">Step 4: Hydrate</div>
                <div className="ml-4 p-2 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-700">
                  <div className="text-blue-900 dark:text-blue-100">hydrateRoot(</div>
                  <div className="text-blue-900 dark:text-blue-100 ml-4">document.getElementById('app'),</div>
                  <div className="text-blue-900 dark:text-blue-100 ml-4">&lt;App /&gt;</div>
                  <div className="text-blue-900 dark:text-blue-100">)</div>
                </div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-4">Step 5: Attach Event Listeners</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ Button now interactive</div>
                <div className="ml-4 text-slate-600 dark:text-slate-400">✓ onClick handlers attached</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Performance Comparison Chart</h2>
          <p className="content-text">
            Visual comparison of key metrics across rendering modes:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">TTFB (Time to First Byte)</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">CSR</div>
                    <div className="flex-1 h-6 bg-blue-500 rounded" style={{width: '20%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">50ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSR</div>
                    <div className="flex-1 h-6 bg-green-500 rounded" style={{width: '80%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">200ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSG</div>
                    <div className="flex-1 h-6 bg-purple-500 rounded" style={{width: '20%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">50ms</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">FCP (First Contentful Paint)</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">CSR</div>
                    <div className="flex-1 h-6 bg-blue-500 rounded" style={{width: '100%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">2.5s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSR</div>
                    <div className="flex-1 h-6 bg-green-500 rounded" style={{width: '48%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">1.2s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSG</div>
                    <div className="flex-1 h-6 bg-purple-500 rounded" style={{width: '32%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">0.8s</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">JS Bundle Size</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">CSR</div>
                    <div className="flex-1 h-6 bg-blue-500 rounded" style={{width: '100%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">250KB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSR</div>
                    <div className="flex-1 h-6 bg-green-500 rounded" style={{width: '80%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">200KB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-xs text-slate-600 dark:text-slate-400">SSG</div>
                    <div className="flex-1 h-6 bg-purple-500 rounded" style={{width: '20%'}}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">50KB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Summary</h2>
          <p className="content-text">
            These diagrams illustrate the fundamental differences between rendering modes. Understanding these flows is crucial 
            for choosing the right approach for your application. Each rendering mode has different trade-offs between initial 
            load time, interactivity, bundle size, and complexity.
          </p>
        </div>
      </div>
    </div>
  );
}
