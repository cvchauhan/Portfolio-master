import { useEffect, useRef, useState } from "react";
import { profile, projects, services } from "./content";

function Icon({ type = "arrow" }) {
  const paths = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    diagonal: "M6 18 18 6M6 6h12v12",
    code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16",
    layers: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
    database:
      "M4 6c0-4 16-4 16 0s-16 4-16 0Zm0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0",
    check: "m5 12 4 4L19 6",
    close: "m6 6 12 12M6 18 18 6",
    menu: "M4 8h16M4 16h16",
    copy: "M9 9h11v11H9V9ZM15 5V3H3v12h2",
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type] || paths.arrow} />
    </svg>
  );
}
function External({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function StackSculpture() {
  const ref = useRef(null);
  function move(e) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches
    )
      return;
    const b = e.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty(
      "--rx",
      `${(e.clientY - b.top - b.height / 2) / 45}deg`,
    );
    ref.current.style.setProperty(
      "--ry",
      `${-(e.clientX - b.left - b.width / 2) / 45}deg`,
    );
  }
  function reset() {
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }
  return (
    <div
      className="sculpture"
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <div className="sculpture-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="sculpture-object">
        <div className="glass-layer layer-back">
          <span>03 / DATA</span>
          <Icon type="database" />
          <b>Reliable foundations.</b>
          <small>PostgreSQL · SQL Server</small>
        </div>
        <div className="glass-layer layer-middle">
          <span>02 / LOGIC</span>
          <Icon type="code" />
          <b>Built to connect.</b>
          <small>Node.js · TypeScript</small>
        </div>
        <div className="glass-layer layer-front">
          <span>01 / EXPERIENCE</span>
          <div className="sculpture-monogram">
            C<span>↗</span>
          </div>
          <b>Ideas. Into interfaces.</b>
          <small>Angular · React</small>
          <div className="layer-line" />
        </div>
      </div>
      <span className="sculpture-caption">THINK → BUILD → REFINE</span>
      <div className="floating-tag">
        <span className="status-dot" /> Full-stack, by design
      </div>
    </div>
  );
}
function Terminal() {
  return (
    <div
      className="terminal"
      aria-label="Illustrative create-smart-api command-line workflow"
    >
      <div className="terminal-bar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>create-smart-api / terminal</span>
        <Icon type="code" />
      </div>
      <div className="terminal-body">
        <span className="terminal-muted">~/your-next-project</span>
        <p>
          <span className="terminal-green">❯</span> npx create-smart-api
        </p>
        <div className="terminal-heading">
          Less boilerplate.
          <br />
          <span>More building.</span>
        </div>
        <div className="terminal-choice">
          <span>◇</span> Choose your framework <b>Express / Fastify</b>
        </div>
        <div className="terminal-choice">
          <span>◇</span> Make it yours <b>Database · Auth · Validation</b>
        </div>
        <div className="terminal-result">
          <Icon type="check" /> A structured starting point for your API.
        </div>
        <div className="terminal-cursor">
          ❯ <i />
        </div>
      </div>
    </div>
  );
}
function WebsiteCover({ project }) {
  return (
    <div
      className={`website-cover ${project.id}`}
      aria-label={`${project.name} graphic cover, not a screenshot`}
    >
      <div className="cover-top">
        <span>DEPLOYED / REACT WEBSITE</span>
        <Icon type="diagonal" />
      </div>
      <div className="cover-emblem">
        {project.id === "maru" ? "MR" : "HT"}
        <span>↗</span>
      </div>
      <div className="cover-name">{project.coverTitle}</div>
      <p>{project.coverSubtitle}</p>
      <div className="cover-bottom">
        <span>{new URL(project.liveUrl).hostname}</span>
        <span>GRAPHIC COVER</span>
      </div>
    </div>
  );
}
function Blueprint({ type }) {
  const salon = type === "salon";
  return (
    <div
      className={`blueprint ${salon ? "salon" : "pos"}`}
      aria-label={`${salon ? "Salon SaaS" : "PlatePilot"} architecture illustration, not a product screenshot`}
    >
      <div className="blueprint-head">
        <Icon type="layers" />
        <span>{salon ? "SALON / SYSTEM MAP" : "PLATEPILOT / SYSTEM MAP"}</span>
        <span className="blueprint-dot" />
      </div>
      <div className="system-map">
        <div className="map-root">
          {salon ? "Salon workspace" : "Restaurant workspace"}
          <small>{salon ? "Multi-tenant platform" : "POS & operations"}</small>
        </div>
        <div className="map-connect" />
        <div className="map-branches">
          {(salon
            ? ["Customers", "Staff", "Bookings"]
            : ["Orders", "Billing", "Management"]
          ).map((item, i) => (
            <div key={item}>
              <span>0{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
        <div className="map-base">
          {salon ? "Angular" : "React"} <span>↔</span> Node.js <span>↔</span>{" "}
          PostgreSQL
        </div>
      </div>
      <div className="blueprint-note">ARCHITECTURE ILLUSTRATION</div>
    </div>
  );
}
function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-top">
        <span className="overline">PROJECT NOTES / {project.number}</span>
        <button
          className="icon-button"
          aria-label="Close project details"
          onClick={onClose}
        >
          <Icon type="close" />
        </button>
      </div>
      <span
        className={`badge ${project.type === "cli" || project.type === "website" ? "live" : ""}`}
      >
        {project.status}
      </span>
      <h2 id="dialog-title">{project.name}</h2>
      <p className="dialog-lead">{project.description}</p>
      <div className="dialog-detail">
        <h3>The problem</h3>
        <p>{project.problem}</p>
        <h3>The approach</h3>
        <p>{project.approach}</p>
        <h3>Areas of focus</h3>
        <ul>
          {project.features.map((x) => (
            <li key={x}>
              <Icon type="check" />
              {x}
            </li>
          ))}
        </ul>
        <h3>Current status</h3>
        <p>{project.statusNote}</p>
      </div>
      <div className="tags">
        {project.tags.map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="dialog-actions">
        {project.liveUrl ? (
          <>
            <External href={project.liveUrl} className="button primary">
              Visit website <Icon type="diagonal" />
            </External>
            <External href={project.repoUrl} className="text-link">
              View code <Icon type="diagonal" />
            </External>
          </>
        ) : project.type === "cli" ? (
          <>
            <External href={profile.githubRepo} className="button primary">
              Explore the code <Icon type="diagonal" />
            </External>
            <External href={profile.npm} className="text-link">
              View on npm <Icon type="diagonal" />
            </External>
          </>
        ) : (
          <a href="#contact" className="button primary" onClick={onClose}>
            Discuss a similar project <Icon />
          </a>
        )}
      </div>
    </dialog>
  );
}
function BriefBuilder() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    service: "Angular development",
    budget: "Let’s discuss",
    details: "",
  });
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  function change(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setCopied(false);
    setBrief("");
  }
  function submit(e) {
    e.preventDefault();
    setBrief(
      `Hi Chirag,\n\nI’m ${values.name}. I’d like help with ${values.service}.\n\n${values.details}\n\nBudget: ${values.budget}\nContact: ${values.email}\n\nLet’s discuss the scope and next steps.`,
    );
    setCopied(false);
    setCopyError(false);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="brief-panel">
      <div className="brief-heading">
        <span className="overline">A GOOD PROJECT STARTS HERE</span>
        <span>↗</span>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>
            Your name
            <input
              autoComplete="name"
              name="name"
              placeholder="Alex Morgan"
              required
              maxLength="100"
              value={values.name}
              onChange={change}
            />
          </label>
          <label>
            Email address
            <input
              autoComplete="email"
              type="email"
              name="email"
              placeholder="alex@company.com"
              required
              value={values.email}
              onChange={change}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            What do you need?
            <select name="service" value={values.service} onChange={change}>
              {[
                "Angular development",
                "Node.js & APIs",
                "Database performance",
                "SaaS / business application",
                "Something else",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Budget range
            <select name="budget" value={values.budget} onChange={change}>
              {[
                "Let’s discuss",
                "Under ₹10,000",
                "₹10,000–₹50,000",
                "₹50,000–₹1,00,000",
                "₹1,00,000+",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          A little about your project
          <textarea
            name="details"
            placeholder="What are you building, or what needs fixing? Include your timeline if you have one."
            required
            minLength="20"
            maxLength="4000"
            rows="4"
            value={values.details}
            onChange={change}
          />
        </label>
        <button className="button primary" type="submit">
          Prepare project brief <Icon />
        </button>
        <p className="form-note">
          Prepare a message, then send it through your preferred channel.
        </p>
      </form>
      {brief && (
        <div className="brief-result">
          <h3>Your brief is ready.</h3>
          <textarea
            aria-label="Prepared project brief"
            readOnly
            value={brief}
            rows="8"
          />
          <div className="brief-actions">
            <button className="button secondary" onClick={copy}>
              <Icon type={copied ? "check" : "copy"} />
              {copied ? "Copied" : "Copy brief"}
            </button>
            {profile.email ? (
              <a
                className="text-link"
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Project inquiry: " + values.service)}&body=${encodeURIComponent(brief)}`}
              >
                Open email <Icon type="diagonal" />
              </a>
            ) : (
              <External href={profile.upwork} className="text-link">
                Open Upwork <Icon type="diagonal" />
              </External>
            )}
          </div>
          <p role="status">
            {copyError
              ? "Select the brief above and copy it manually."
              : copied
                ? "Copied. Paste it into your message to Chirag."
                : "Nothing has been sent. Copy the brief and send it when you’re ready."}
          </p>
        </div>
      )}
    </div>
  );
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const visibleProjects = projects.filter(
    (x) =>
      filter === "All work" ||
      (filter === "Live websites"
        ? x.type === "website"
        : filter === "Open source"
          ? x.type === "cli"
          : x.status === "In development"),
  );
  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sections.forEach((x) => observer.observe(x));
    const key = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="header">
        <div className="container header-inner">
          <a
            href="#top"
            className="logo"
            aria-label="Chirag Chauhan home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="logo-mark">
              c<span>c</span>
              <i />
            </span>
            <span>
              chirag chauhan
              <span className="logo-caption">FULL-STACK DEVELOPER</span>
            </span>
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon type={menuOpen ? "close" : "menu"} />
          </button>
          <nav
            id="navigation"
            aria-label="Main navigation"
            className={menuOpen ? "open" : ""}
          >
            {[
              ["work", "Work"],
              ["services", "Services"],
              ["about", "About"],
            ].map(([id, title]) => (
              <a
                key={id}
                className={active === id ? "active" : ""}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                {title}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Icon type="diagonal" />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero container" id="top">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" /> OPEN TO FREELANCE PROJECTS
            </div>
            <h1>
              Your next
              <br />
              big idea.
              <br />
              <span>Built to work.</span>
            </h1>
            <p>
              I’m Chirag Chauhan. I turn complex requirements into thoughtful
              web applications, dependable APIs, and software that moves your
              business forward.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button primary">
                Let’s build something <Icon type="diagonal" />
              </a>
              <a href="#work" className="text-link">
                Explore my work <Icon />
              </a>
            </div>
            <div className="hero-proof">
              <strong>
                8+ <span>years of experience</span>
              </strong>
              <span className="proof-divider" />
              <span>
                Based in India.
                <br />
                Working across the stack.
              </span>
            </div>
          </div>
          <div className="hero-art">
            <span className="art-index">ENGINEERED WITH INTENTION / 001</span>
            <StackSculpture />
          </div>
          <div className="hero-bottom">
            <span>GOOD IDEAS DESERVE GOOD ENGINEERING.</span>
            <a href="#work">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </section>
        <div className="stack-strip">
          <div className="container">
            <span>MY EVERYDAY TOOLKIT</span>
            <div>
              {[
                "Angular",
                "Node.js",
                "TypeScript",
                "React",
                "PostgreSQL",
                "SQL Server",
              ].map((x) => (
                <strong key={x}>
                  {x}
                  <i>✳</i>
                </strong>
              ))}
            </div>
          </div>
        </div>
        <section className="section container" id="work">
          <div className="section-heading">
            <div>
              <p className="overline">01 / SELECTED WORK</p>
              <h2>
                Less talk.
                <br />
                <span>More building.</span>
              </h2>
            </div>
            <div className="section-aside">
              <p>
                Live websites, open-source tools, and personal products.
                <br />
                Explore the work and the code behind it.
              </p>
              <div
                className="filters"
                role="group"
                aria-label="Filter projects"
              >
                {[
                  "All work",
                  "Live websites",
                  "Open source",
                  "In development",
                ].map((x) => (
                  <button
                    key={x}
                    aria-pressed={filter === x}
                    onClick={() => setFilter(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <article
                className={`project-card ${project.type === "cli" ? "featured-project" : ""}`}
                key={project.id}
              >
                {project.type === "cli" ? (
                  <Terminal />
                ) : project.type === "website" ? (
                  <WebsiteCover project={project} />
                ) : (
                  <Blueprint type={project.type} />
                )}
                <div className="project-copy">
                  <div className="project-meta">
                    <span>
                      {project.number} / {project.category}
                    </span>
                    <span
                      className={`badge ${project.type === "cli" || project.type === "website" ? "live" : ""}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.liveUrl && (
                      <div className="website-links">
                        <External href={project.liveUrl} className="text-link">
                          Visit website <Icon type="diagonal" />
                        </External>
                        <External href={project.repoUrl} className="text-link">
                          View code <Icon type="code" />
                        </External>
                      </div>
                    )}
                    <button
                      className="project-link"
                      onClick={() => setSelected(project)}
                    >
                      Explore project <Icon type="diagonal" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-note">
            <span className="status-dot" /> Live links are available for Maru
            Rajwadu and Hi-Tech. SaaS projects remain in development; covers and
            system maps are illustrations.
          </div>
        </section>
        <section id="services" className="services-section">
          <div className="container section">
            <div className="section-heading">
              <div>
                <p className="overline">02 / HOW I CAN HELP</p>
                <h2>
                  A technical partner.
                  <br />
                  <span>For your next step.</span>
                </h2>
              </div>
              <p className="section-aside">
                From one stubborn bug to a new business application. Start with
                a clear scope and build from there.
              </p>
            </div>
            <div className="service-grid">
              {services.map((s, i) => (
                <article className="service" key={s.title}>
                  <div className="service-top">
                    <Icon type={s.icon} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul>
                    {s.items.map((x) => (
                      <li key={x}>
                        <Icon type="check" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a className="text-link" href="#contact">
                    Discuss your project <Icon />
                  </a>
                </article>
              ))}
            </div>
            <div className="process">
              <div>
                <span className="overline">NO GUESSWORK. A CLEAR PROCESS.</span>
                <p>
                  Small scope. Clear communication.
                  <br />
                  Work you can review.
                </p>
              </div>
              {[
                [
                  "01",
                  "Understand",
                  "We define the problem, scope, and what success looks like.",
                ],
                [
                  "02",
                  "Build",
                  "I implement the solution with progress you can follow.",
                ],
                [
                  "03",
                  "Hand over",
                  "You get tested changes, clean code, and a clear walkthrough.",
                ],
              ].map(([n, t, d]) => (
                <div className="process-step" key={n}>
                  <span>{n}</span>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container about" id="about">
          <div className="about-art portrait-card">
            <div className="portrait-heading">
              <span className="overline">THE PERSON BEHIND THE CODE</span>
              <Icon type="diagonal" />
            </div>
            <img
              className="about-portrait"
              src="/chirag-chauhan.png"
              alt="Chirag Chauhan wearing a blue suit"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
            <div className="portrait-caption">
              <div>
                <strong>Chirag Chauhan</strong>
                <span>Full-stack developer · India</span>
              </div>
              <div className="portrait-experience">
                <strong>8+</strong>
                <span>
                  YEARS OF
                  <br />
                  EXPERIENCE
                </span>
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="overline">03 / A LITTLE ABOUT ME</p>
            <h2>
              I care about
              <br />
              how it works.
              <br />
              <span>And who it helps.</span>
            </h2>
            <p>
              Over 8+ years, I’ve worked across enterprise web applications,
              business process automation, backend services, and database-backed
              systems.
            </p>
            <p>
              I’m especially comfortable joining an existing codebase: tracing a
              difficult issue, untangling a slow query, or making a complex
              feature easier to maintain.
            </p>
            <div className="about-facts">
              <div>
                <Icon type="code" />
                <span>
                  Open-source builder
                  <strong>Creator of create-smart-api</strong>
                </span>
              </div>
              <div>
                <Icon type="layers" />
                <span>
                  Full-stack perspective
                  <strong>Angular · Node.js · Databases</strong>
                </span>
              </div>
            </div>
            <div className="about-links">
              <External href={profile.github}>
                GitHub <Icon type="diagonal" />
              </External>
              <External href={profile.linkedin}>
                LinkedIn <Icon type="diagonal" />
              </External>
              <External href={profile.upwork}>
                Upwork <Icon type="diagonal" />
              </External>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container section contact-grid">
            <div className="contact-copy">
              <p className="overline">04 / LET’S MAKE IT HAPPEN</p>
              <h2>
                Something
                <br />
                on your mind?
                <br />
                <span>Let’s build it.</span>
              </h2>
              <p>
                A new idea, a feature that needs shipping, or a bug that refuses
                to leave. Tell me where you’re stuck.
              </p>
              <div className="contact-links">
                <External href={profile.upwork}>
                  <span>
                    <small>START A CONVERSATION</small>Find me on Upwork
                  </span>
                  <Icon type="diagonal" />
                </External>
                <External href={profile.linkedin}>
                  <span>
                    <small>CONNECT DIRECTLY</small>Message on LinkedIn
                  </span>
                  <Icon type="diagonal" />
                </External>
                {profile.email && (
                  <a href={`mailto:${profile.email}`}>
                    <span>
                      <small>EMAIL ME</small>
                      {profile.email}
                    </span>
                    <Icon type="diagonal" />
                  </a>
                )}
                {profile.whatsapp && (
                  <External href={`https://wa.me/${profile.whatsapp}`}>
                    <span>
                      <small>QUICK CONVERSATION</small>Chat on WhatsApp
                    </span>
                    <Icon type="diagonal" />
                  </External>
                )}
              </div>
              <p className="contact-footnote">
                <span className="status-dot" /> Available for focused tasks and
                project collaborations.
              </p>
            </div>
            <BriefBuilder />
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a href="#top" className="footer-signature">
          Chirag Chauhan<span>Ideas into software.</span>
        </a>
        <p>© {new Date().getFullYear()} Chirag Chauhan</p>
        <a href="#top" className="text-link">
          Back to top ↑
        </a>
      </footer>
      {selected && (
        <ProjectDialog
          key={selected.id}
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
export default App;
