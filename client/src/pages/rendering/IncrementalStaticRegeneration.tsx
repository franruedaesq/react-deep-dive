import CodeExample from '@/components/CodeExample';

export default function IncrementalStaticRegeneration() {
  return (
    <div className="content-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Incremental Static Regeneration (ISR)</h1>
          <p className="page-subtitle">Update static pages after deployment without rebuilding</p>
        </div>
        <div className="section">
          <h2 className="section-title">What is ISR?</h2>
          <p className="content-text">
            Incremental Static Regeneration (ISR) combines SSG and SSR benefits, allowing you to update static pages after deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
