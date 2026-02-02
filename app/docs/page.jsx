const exampleBadge = '/?username=your-github-username&style=flat-square&color=blue';
const exampleMarkdown = `![](${exampleBadge})`;

export default function DocsPage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1 className="hero-title">GitHub Profile Views Counter</h1>
          <p className="hero-subtitle">
            Next.js refactor with the same badge logic, tuned for Vercel and Redis.
            Use it as a drop-in replacement for the original PHP endpoint.
          </p>
          <div className="badge-preview">
            <span className="chip">Live badge</span>
            <img src={exampleBadge} alt="Profile views badge" />
          </div>
        </div>
        <div className="hero-card">
          <h2 className="section-title">Quick Start</h2>
          <div className="code">{exampleMarkdown}</div>
          <p className="footer">Replace the username, then paste into your profile README.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Query Parameters</h2>
        <div className="grid">
          <div className="card">
            <h3>username</h3>
            <p>GitHub username (required).</p>
          </div>
          <div className="card">
            <h3>label</h3>
            <p>Override the badge label text.</p>
          </div>
          <div className="card">
            <h3>color</h3>
            <p>Named color or hex without the # prefix.</p>
          </div>
          <div className="card">
            <h3>style</h3>
            <p>flat, flat-square, plastic, for-the-badge, pixel.</p>
          </div>
          <div className="card">
            <h3>base</h3>
            <p>Add an integer to the stored count.</p>
          </div>
          <div className="card">
            <h3>abbreviated</h3>
            <p>Any non-empty value except "0" will abbreviate.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Environment</h2>
        <ul className="list">
          <li className="card">
            <h3>REPOSITORY</h3>
            <p>Use <span className="chip">redis</span> for production, or <span className="chip">file</span> for local testing.</p>
          </li>
          <li className="card">
            <h3>REDIS_URL</h3>
            <p>Redis connection URL (required when REPOSITORY=redis).</p>
          </li>
          <li className="card">
            <h3>FILE_STORAGE_PATH</h3>
            <p>Optional file storage directory (required when REPOSITORY=file).</p>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Examples</h2>
        <div className="code">{`/?username=your-github-username&style=for-the-badge&color=green`}</div>
        <div className="code">{`/?username=your-github-username&label=PROFILE+VIEWS&abbreviated=true`}</div>
        <div className="code">{`/?username=your-github-username&style=pixel`}</div>
      </section>

      <p className="footer">
        This docs page uses the Catppuccin Mocha palette. The badge endpoint remains at the root
        URL for drop-in compatibility.
      </p>
    </main>
  );
}
