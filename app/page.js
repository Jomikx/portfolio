import Shell from "../components/Shell";
import HeadPhoto from "../components/HeadPhoto";
import BeforeAfter from "../components/BeforeAfter";
import { site, facts, projects, workshop, foundations, stack } from "../lib/content";

export default function Home() {
  return (
    <Shell>
      <header className="hero">
        <HeadPhoto />
        <div>
          <h1 data-tour="name">Aljo Tacud</h1>
          <p>{site.intro}</p>
          <p className="sub">{site.school}</p>
          <div className="social">
            <a href={site.github} target="_blank" rel="noopener noreferrer">github ↗</a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer">facebook ↗</a>
            <a href={`mailto:${site.email}`}>email</a>
            <a
              className="dc"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              don&apos;t click me
            </a>
          </div>
        </div>
      </header>

      <div className="facts" data-tour="facts">
        {facts.map((f) => (
          <div key={f.label}>
            <b>{f.value}</b>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      <section className="sec" id="ba">
        <div className="hd"><h2>01 — before / after</h2></div>
        <div>
          <h3>AI is not the problem. How you use it is.</h3>
          <p className="lede">
            Drag the line. Left is how I built sites before AI. Right is how I build now.
          </p>
          <BeforeAfter />
          <p className="quote">Embrace AI. Never forget the fundamentals.</p>
        </div>
      </section>

      <section className="sec" id="projects">
        <div className="hd"><h2>02 — projects</h2></div>
        <div>
          <h3>School projects</h3>
          <p className="lede">Each activity opens as its own page.</p>
          <div className="rows">
            {projects.map((p) => (
              <details key={p.id} open={p.open}>
                <summary>
                  <span className="n">{p.id}</span>
                  <span className="tt">{p.title}</span>
                  <span className="tg">{p.tags}</span>
                </summary>
                <div className="body">
                  <p>{p.desc}</p>
                  <div className="links">
                  <a className="btn" href={p.href} target="_blank" rel="noopener noreferrer">
                    Open activity ↗
                  </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="workshop">
        <div className="hd"><h2>03 — workshop</h2></div>
        <div>
          <h3>Hands-on IT work</h3>
          <p className="lede">From my OJT at an ISP IT office, plus repair work.</p>
          <div className="list">
            {workshop.map((w) => (
              <div key={w.title}>
                <b>{w.title}</b>
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="basics">
        <div className="hd"><h2>04 — foundations</h2></div>
        <div>
          <h3>What I still do by hand</h3>
          <p className="lede">AI cannot replace these if I do not understand them.</p>
          <div className="list">
            {foundations.map((f) => (
              <div key={f.title}>
                <b>{f.title}</b>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="stack">
        <div className="hd"><h2>05 — stack</h2></div>
        <div className="chips">
          {stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="sec" id="contact">
        <div className="hd"><h2>06 — contact</h2></div>
        <div>
          <h3>Say hello</h3>
          <p className="lede">
            Email: <b className="mailtxt">{site.email}</b>
          </p>
          <div className="social nomt">
            <a href={site.github} target="_blank" rel="noopener noreferrer">github ↗</a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer">facebook ↗</a>
          </div>
        </div>
      </section>

      <footer>
        <span>{site.name}</span>
        <span>{site.location}</span>
      </footer>
    </Shell>
  );
}
