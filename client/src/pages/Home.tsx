import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const sections = [
    {
      title: 'Rendering Patterns',
      description: 'Understand the different ways React can render your application',
      items: [
        {
          name: 'Client Side Rendering (CSR)',
          description: 'Rendering entirely in the browser with JavaScript',
          href: '/rendering/csr',
        },
        {
          name: 'Server Side Rendering (SSR)',
          description: 'Rendering on the server and hydrating in the browser',
          href: '/rendering/ssr',
        },
        {
          name: 'Static Site Generation (SSG)',
          description: 'Pre-rendering pages at build time',
          href: '/rendering/ssg',
        },
        {
          name: 'Incremental Static Regeneration (ISR)',
          description: 'Updating static pages without full rebuild',
          href: '/rendering/isr',
        },
        {
          name: 'React Server Components (RSC)',
          description: 'Components that run exclusively on the server',
          href: '/rendering/rsc',
        },
      ],
    },
    {
      title: 'Core Concepts',
      description: 'Deep dive into fundamental React internals',
      items: [
        {
          name: 'Hydration',
          description: 'Attaching JavaScript to server-rendered HTML',
          href: '/concepts/hydration',
        },
        {
          name: 'React Fiber',
          description: 'The reconciliation algorithm behind React',
          href: '/concepts/fiber',
        },
      ],
    },
  ];

  return (
    <div className="content-page">
      <div className="container">
        {/* Hero Section */}
        <div className="page-header">
          <h1 className="page-title">React Rendering Deep Dive</h1>
          <p className="page-subtitle">
            Understand how React renders your applications, from basic principles to advanced patterns
          </p>
          <p className="content-text mt-4">
            This interactive guide explores React's rendering mechanisms with detailed explanations and code examples. 
            Learn how renderToString, renderToPipeableStream, createRoot, and hydrateRoot work together to power modern web applications.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="section">
            <h2 className="section-title">{section.title}</h2>
            <p className="content-text">{section.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="group cursor-pointer p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Key Concepts */}
        <div className="section">
          <h2 className="section-title">Key React APIs</h2>
          <p className="content-text">
            This guide covers the fundamental React APIs that power different rendering strategies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'renderToString()',
                desc: 'Synchronous server rendering to HTML string',
              },
              {
                name: 'renderToStaticMarkup()',
                desc: 'Render non-interactive content to HTML',
              },
              {
                name: 'renderToPipeableStream()',
                desc: 'Streaming server rendering with Suspense support',
              },
              {
                name: 'createRoot()',
                desc: 'Create a React root for client-side rendering',
              },
              {
                name: 'hydrateRoot()',
                desc: 'Hydrate server-rendered HTML with interactivity',
              },
              {
                name: 'resumeToPipeableStream()',
                desc: 'Resume rendering from server-side boundaries',
              },
            ].map((api) => (
              <div key={api.name} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <h3 className="font-mono font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {api.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{api.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="section bg-blue-50 dark:bg-blue-950 rounded-lg p-6 md:p-8">
          <h2 className="section-title text-blue-900 dark:text-blue-100 mt-0">Getting Started</h2>
          <p className="content-text text-blue-900 dark:text-blue-100">
            Each section contains detailed explanations, code examples, and comparisons. Start with any rendering pattern 
            that interests you, or follow the recommended learning path from Client Side Rendering through to React Server Components.
          </p>
          <p className="content-text text-blue-900 dark:text-blue-100">
            The code examples build from basic principles, showing how each API works at a fundamental level before exploring 
            real-world applications and best practices.
          </p>
        </div>
      </div>
    </div>
  );
}
