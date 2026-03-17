import React from "react";

export default function NeighborhoodStewardshipWebsite() {
  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: #f5f7f4; color: #1c251e; }
    a { text-decoration: none; color: inherit; }
    .site-shell { min-height: 100vh; background: #f5f7f4; color: #1c251e; }
    .container { width: 92%; max-width: 1200px; margin: 0 auto; }
    .topbar { background: rgba(255,255,255,.94); border-bottom: 1px solid #e6e6e6; padding: 18px 0; position: sticky; top: 0; z-index: 20; backdrop-filter: blur(10px); }
    .nav-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
    .brand-wrap { display: flex; align-items: center; gap: 14px; }
    .brand-box { width: 42px; height: 42px; border-radius: 12px; background: #24412c; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,.08); }
    .brand-inner { color: white; font-weight: 700; font-size: 14px; letter-spacing: .08em; }
    .brand-title { font-weight: 700; font-size: 18px; }
    .eyebrow, .section-kicker, .small-kicker, .price-kicker, .footer-kicker { font-size: 11px; letter-spacing: .12em; color: #57745e; text-transform: uppercase; font-weight: 700; }
    .nav-links { display: flex; gap: 24px; font-size: 14px; flex-wrap: wrap; }
    .nav-links a:hover { opacity: .7; }
    .hero-section { padding: 72px 0 84px; position: relative; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(circle at top left, rgba(143,188,143,0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(92,128,99,0.18), transparent 30%); pointer-events: none; }
    .hero-grid { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; gap: 48px; align-items: center; }
    .hero-title { font-size: clamp(36px, 5vw, 64px); line-height: 1.08; margin: 20px 0; letter-spacing: -.03em; }
    .hero-copy { color: #566059; font-size: 18px; line-height: 1.8; margin-bottom: 28px; max-width: 700px; }
    .pill { background: #e6efe7; padding: 8px 14px; border-radius: 999px; font-size: 12px; display: inline-block; font-weight: 700; color: #476252; }
    .btn { padding: 13px 20px; border-radius: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; transition: transform .18s ease, opacity .18s ease, box-shadow .18s ease; }
    .btn:hover { transform: translateY(-1px); }
    .btn-primary { background: #24412c; color: white; box-shadow: 0 10px 24px rgba(36,65,44,.18); }
    .btn-secondary { border: 1px solid #d7d7d7; background: white; color: #1c251e; }
    .btn-light { background: #dceadf; color: #122016; }
    .button-row { display: flex; gap: 14px; flex-wrap: wrap; }
    .panel { background: white; border-radius: 22px; padding: 30px; box-shadow: 0 10px 28px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,.05); }
    .soft-panel { background: #f4f7f4; }
    .card-grid { display: grid; gap: 24px; }
    .three-up { grid-template-columns: repeat(3, 1fr); }
    .four-up { grid-template-columns: repeat(4, 1fr); }
    .section { padding: 76px 0; }
    .section-band { background: #ffffff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
    .section-title { font-size: clamp(30px, 4vw, 46px); line-height: 1.14; margin: 10px 0 0; letter-spacing: -.02em; }
    .section-title.medium { font-size: clamp(26px, 3.4vw, 34px); }
    .body-copy, .card-copy, .subtle-text, .footer-copy, .dark-copy { color: #59635d; line-height: 1.8; font-size: 17px; }
    .narrow { max-width: 760px; }
    .value-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
    .value-chip { background: #e9f1ea; padding: 12px 14px; border-radius: 12px; font-size: 14px; font-weight: 600; }
    .image-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
    .image-card { background: white; padding: 16px; border-radius: 22px; box-shadow: 0 10px 28px rgba(0,0,0,.05); border: 1px solid rgba(0,0,0,.05); }
    .image-offset { margin-top: 40px; }
    .photo { height: 260px; border-radius: 14px; background-size: cover; background-position: center; }
    .photo-one { background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'); }
    .photo-two { background-image: url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'); }
    .card-heading { font-size: 22px; line-height: 1.35; margin-top: 10px; font-weight: 700; }
    .split-panel, .two-col, .livestream-grid, .form-split, .hero-grid { align-items: start; }
    .split-panel, .two-col, .form-split { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .livestream-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 28px; }
    .feature-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 24px; }
    .feature-pill { background: #f4f6f1; padding: 12px 14px; border-radius: 12px; font-size: 14px; color: #4d5650; }
    .seal-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f8f9f5; border-radius: 22px; padding: 28px; min-height: 100%; }
    .seal-circle { width: 120px; height: 120px; border-radius: 50%; position: relative; display: flex; align-items: center; justify-content: center; color: white; background: radial-gradient(circle at 30% 30%, #dd4f5f, #992739 68%, #6c1a27); box-shadow: 0 20px 45px rgba(108,26,39,.28); }
    .seal-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,.18); }
    .seal-ring-1 { inset: 8px; }
    .seal-ring-2 { inset: 16px; border-color: rgba(255,255,255,.12); }
    .seal-text-top, .seal-text-bottom { position: absolute; font-size: 9px; text-transform: uppercase; letter-spacing: .22em; opacity: .92; }
    .seal-text-top { top: 26px; }
    .seal-text-main { font-size: 20px; font-weight: 800; }
    .seal-text-bottom { bottom: 26px; }
    .seal-name { margin-top: 18px; font-weight: 700; font-size: 22px; text-align: center; }
    .seal-subtitle { margin-top: 8px; color: #5f6661; text-align: center; }
    .panel-title { font-size: 22px; font-weight: 700; }
    .card-title-text { font-size: 22px; margin-top: 16px; }
    .step-badge { width: 46px; height: 46px; border-radius: 12px; background: #24412c; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .soft-callout { margin-top: 26px; background: #eef4ee; border: 1px solid #c8d5ca; padding: 22px; border-radius: 18px; }
    .stack-list { display: grid; gap: 10px; margin-top: 12px; color: #4f5953; }
    .dark-shell { background: #111714; border-radius: 24px; padding: 18px; box-shadow: 0 18px 34px rgba(0,0,0,.18); }
    .dark-card { min-height: 100%; aspect-ratio: 16/9; border-radius: 18px; padding: 28px; border: 1px solid rgba(255,255,255,.08); color: white; background: radial-gradient(circle at top, rgba(93,149,103,0.45), rgba(17,23,20,1) 60%); display: flex; flex-direction: column; justify-content: space-between; }
    .live-pill { display: inline-block; background: #ef4444; color: white; border-radius: 999px; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .18em; font-weight: 700; }
    .dark-title { font-size: 34px; line-height: 1.15; margin: 18px 0 10px; }
    .dark-copy { color: rgba(255,255,255,.8); }
    .dark-tag-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 20px; }
    .dark-tag, .run-item, .dark-list-item { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); padding: 12px; border-radius: 12px; color: rgba(255,255,255,.88); font-size: 14px; }
    .episode-title { margin-top: 10px; font-size: 28px; font-weight: 700; }
    .runofshow-box { background: #18211b; color: white; border-radius: 22px; padding: 28px; box-shadow: 0 18px 34px rgba(0,0,0,.18); }
    .light { color: #b7c8b8; }
    .support-tile { border: 1px solid rgba(0,0,0,.05); background: #f8f9f5; padding: 18px; border-radius: 14px; text-align: center; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: #4c6b56; font-weight: 700; }
    .mini-pill { display: inline-block; background: #e5eee5; padding: 8px 12px; border-radius: 999px; font-size: 11px; text-transform: uppercase; letter-spacing: .16em; color: #4c6b56; font-weight: 700; }
    .top-space-sm { margin-top: 14px; }
    .inner-note { margin-top: 18px; background: white; border-radius: 14px; padding: 16px; color: #646b66; font-size: 14px; }
    .form-panel { padding-top: 28px; }
    .form-stack { display: grid; gap: 16px; margin-top: 18px; }
    .field-block { display: flex; flex-direction: column; gap: 8px; }
    .field-block span { font-size: 14px; font-weight: 600; color: #49524d; }
    .field-block input, .field-block textarea { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid #d9ddd8; background: #fafaf8; color: #1c251e; font: inherit; resize: vertical; }
    .field-block input:focus, .field-block textarea:focus { outline: none; border-color: #8daf94; box-shadow: 0 0 0 4px rgba(141,175,148,.14); }
    .full-width { width: 100%; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
    .category-chip { background: white; border-radius: 999px; padding: 10px 14px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,.05); }
    .highlight-box { margin-top: 26px; border: 2px solid #24412c; background: #f7fbf7; padding: 22px; border-radius: 18px; }
    .green-dark { color: #24412c; }
    .highlight-copy { margin-top: 14px; font-size: 18px; line-height: 1.7; color: #2d3630; }
    .bordered-panel { border: 2px solid #24412c; }
    .green-title { color: #24412c; }
    .price-kicker { margin-top: 8px; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; color: #4c6b56; }
    .contact-list { display: grid; gap: 22px; }
    .contact-value { margin-top: 8px; font-size: 21px; font-weight: 700; color: #1c251e; }
    .small-value { font-size: 18px; }
    .contact-link { display: inline-block; margin-top: 8px; color: #24412c; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
    .dark-panel { background: #1f2b22; color: white; padding: 34px; border-radius: 24px; box-shadow: 0 18px 34px rgba(0,0,0,.18); display: grid; grid-template-columns: 1.05fr .95fr; gap: 28px; }
    .white-title { color: white; }
    .dark-list { display: grid; gap: 12px; align-self: center; }
    .footer { background: #16231a; color: white; padding: 40px 0; margin-top: 10px; }
    .footer-inner { display: grid; gap: 6px; }
    .footer-kicker { color: #8fa89a; }
    .footer-copy { color: #c6d3c9; margin-top: 0; }
    .quick-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 26px; }
    .quick-card { background: white; border: 1px solid rgba(0,0,0,.05); border-radius: 14px; padding: 14px; font-size: 14px; box-shadow: 0 8px 18px rgba(0,0,0,.03); }
    .compact-top { padding-top: 22px; }
    .top-gap { margin-top: 28px; }
    .top-space { margin-top: 18px; }
    .small { font-size: 11px; }
    @media (max-width: 1024px) {
      .hero-grid, .split-panel, .two-col, .livestream-grid, .form-split, .dark-panel { grid-template-columns: 1fr; }
      .three-up, .four-up, .quick-grid { grid-template-columns: repeat(2, 1fr); }
      .image-grid { grid-template-columns: 1fr; }
      .image-offset { margin-top: 0; }
      .dark-tag-grid { grid-template-columns: repeat(2,1fr); }
      .nav-links { display: none; }
    }
    @media (max-width: 640px) {
      .container { width: 94%; }
      .hero-section, .section { padding: 54px 0; }
      .panel, .soft-panel, .runofshow-box, .dark-panel { padding: 22px; }
      .three-up, .four-up, .quick-grid, .value-grid, .feature-grid { grid-template-columns: 1fr; }
      .button-row { flex-direction: column; }
      .btn { width: 100%; }
    }
  `;

  const steps = [
    {
      title: "Community Recognition",
      description:
        "We identify and spotlight residents and homes that reflect care, consistency, pride, and positive community values."
    },
    {
      title: "Livestream Features",
      description:
        "Selected honorees may be invited to a short, friendly livestream conversation highlighting stewardship, neighborhood pride, and healthy living."
    },
    {
      title: "Official Recognition",
      description:
        "Honorees may receive free digital recognition, with an optional physical certificate available for processing and mailing."
    }
  ];

  const values = [
    "Community pride",
    "Environmental awareness",
    "Healthy living",
    "Recognition and visibility",
    "Positive local impact",
    "Respectful public storytelling"
  ];

  const faq = [
    {
      q: "Is it free to be nominated?",
      a: "Yes. Nominations and recognition are free."
    },
    {
      q: "Do people have to participate in a livestream?",
      a: "No. Participation is optional."
    },
    {
      q: "Do honorees receive a certificate?",
      a: "Yes. Digital recognition is free. An optional physical certificate is available for $25, which covers certificate preparation, administrative processing, packaging, and mailing."
    },
    {
      q: "What kinds of qualities do we recognize?",
      a: "We recognize care for the home, consistency, curb appeal, neighborhood pride, and positive community presence."
    }
  ];

  const honorees = [
    { name: "Featured Homeowner", city: "West Springfield, MA", category: "Neighborhood Stewardship Honoree" },
    { name: "Featured Family", city: "Chicopee, MA", category: "Community Pride Recognition" },
    { name: "Featured Resident", city: "Springfield, MA", category: "Healthy Living Spotlight" }
  ];

  const sponsorItems = ["Community Partner", "Recognition Partner", "Civic Supporter", "Local Steward"];

  const firstEpisode = {
    title: "Episode 001 — Community Stewardship Spotlight",
    description:
      "A short-form opening broadcast introducing the project, what stewardship means, and how recognized residents will be featured going forward.",
    bullets: [
      "1 minute welcome and mission statement",
      "2 minutes introducing the recognition format",
      "1 minute on environment and healthy living",
      "1 minute closing and nomination call-to-action"
    ]
  };

  return (
    <div className="site-shell">
      <style>{css}</style>
      <header className="topbar">
        <div className="container nav-row">
          <div className="brand-wrap">
            <div className="brand-box"><div className="brand-inner">NSP</div></div>
            <div>
              <div className="eyebrow">Neighborhood Stewardship</div>
              <div className="brand-title">Project</div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#livestream">Livestream</a>
            <a href="#nominate">Nominate</a>
            <a href="#certificate">Certificate</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div>
            <div className="pill">Community Recognition Initiative</div>
            <h1 className="hero-title">A modern recognition platform for neighborhood pride, environmental values, and healthy living.</h1>
            <p className="hero-copy">The Neighborhood Stewardship Project highlights residents and homes that reflect consistency, care, pride, and a positive contribution to the local environment and community.</p>
            <div className="button-row">
              <a href="#nominate" className="btn btn-primary">Nominate Someone</a>
              <a href="#certificate" className="btn btn-secondary">Claim Certificate</a>
              <a href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer" className="btn btn-secondary">Watch on Twitch</a>
            </div>
            <div className="quick-grid">
              {['Recognition', 'Livestreams', 'Certificates', 'Community'].map((item) => <div key={item} className="quick-card">{item}</div>)}
            </div>
          </div>

          <div className="image-grid">
            <div className="image-card image-offset">
              <div className="photo photo-one" />
              <div className="small-kicker">Healthy communities</div>
              <div className="card-heading">Recognition designed to feel warm, credible, and modern</div>
            </div>
            <div className="image-card">
              <div className="photo photo-two" />
              <div className="small-kicker">Stewardship</div>
              <div className="card-heading">A cleaner, greener message centered on people and place</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact-top">
        <div className="container panel split-panel">
          <div>
            <div className="section-kicker">Official Recognition Program</div>
            <h2 className="section-title medium">A stronger public-facing structure for recognition, nominations, and community spotlighting.</h2>
            <div className="feature-grid">
              {["Free digital recognition", "Optional physical certificate", "Livestream spotlight feature", "Community nomination pathway", "Built-in seal styling for letters"].map((item) => <div key={item} className="feature-pill">{item}</div>)}
            </div>
          </div>
          <div className="seal-panel">
            <div className="seal-circle">
              <div className="seal-ring seal-ring-1" />
              <div className="seal-ring seal-ring-2" />
              <div className="seal-text-top">Official</div>
              <div className="seal-text-main">NSP</div>
              <div className="seal-text-bottom">Recognition</div>
            </div>
            <div className="seal-name">Official NSP Recognition</div>
            <div className="seal-subtitle">Official Recognition Mark</div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container two-col">
          <div>
            <div className="section-kicker">About</div>
            <h2 className="section-title">Built to spotlight the people who quietly make communities better.</h2>
            <p className="body-copy">This platform exists to celebrate residents whose homes and habits reflect care, consistency, neighborhood pride, and environmental awareness. Through public recognition, livestream features, and official certificates, the project gives a polished spotlight to everyday stewardship.</p>
          </div>
          <div className="panel value-panel">
            <div className="panel-title">Core values</div>
            <div className="value-grid">{values.map((value) => <div key={value} className="value-chip">{value}</div>)}</div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-band">
        <div className="container">
          <div className="section-kicker">How it works</div>
          <h2 className="section-title">Simple, premium, and easy to explain.</h2>
          <div className="card-grid three-up top-gap">
            {steps.map((step, index) => (
              <div key={step.title} className="panel soft-panel">
                <div className="step-badge">{index + 1}</div>
                <h3 className="card-title-text">{step.title}</h3>
                <p className="card-copy">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="livestream" className="section">
        <div className="container livestream-grid">
          <div>
            <div className="section-kicker">Livestream spotlight</div>
            <h2 className="section-title">A short-form feature that feels personal and official.</h2>
            <p className="body-copy">Selected honorees can be invited to a short live conversation to discuss stewardship, neighborhood values, and healthy community living. This section can later hold your Twitch stream or replay archive.</p>
            <div className="soft-callout">
              <div className="section-kicker small">Suggested format</div>
              <div className="stack-list">
                <div>1 minute introduction</div>
                <div>3 minute honoree conversation</div>
                <div>1 minute community or environmental spotlight</div>
                <div>Closing recognition and certificate mention</div>
              </div>
            </div>
          </div>
          <div className="dark-shell">
            <div className="dark-card">
              <div>
                <div className="live-pill">Live Feature Area</div>
                <h3 className="dark-title">Neighborhood Spotlight Broadcast</h3>
                <p className="dark-copy">Watch the project livestream on Twitch and follow future community spotlight broadcasts.</p>
              </div>
              <div className="dark-tag-grid">{['Warm', 'Modern', 'Credible', 'Replay-ready'].map((tag) => <div key={tag} className="dark-tag">{tag}</div>)}</div>
              <a href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer" className="btn btn-light">Watch Stewardship Project Radio</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact-top">
        <div className="container panel split-panel">
          <div>
            <div className="section-kicker">First livestream page</div>
            <h2 className="section-title medium">Your first episode is already mapped out.</h2>
            <p className="body-copy">Use this as your first actual broadcast page or featured section while you build momentum and start collecting nominations.</p>
            <div className="soft-callout">
              <div className="section-kicker small">Episode title</div>
              <div className="episode-title">{firstEpisode.title}</div>
              <p className="card-copy">{firstEpisode.description}</p>
            </div>
          </div>
          <div className="runofshow-box">
            <div className="section-kicker small light">Run of show</div>
            <div className="stack-list">{firstEpisode.bullets.map((item) => <div key={item} className="run-item">{item}</div>)}</div>
            <a href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer" className="btn btn-light top-space">Watch on Twitch</a>
          </div>
        </div>
      </section>

      <section className="section compact-top">
        <div className="container panel">
          <div className="section-kicker">Community support</div>
          <h2 className="section-title medium">A cleaner trust layer for community and local partners.</h2>
          <p className="body-copy narrow">This strip creates a natural place for community partners, local recognition supporters, and future collaborators.</p>
          <div className="card-grid four-up top-gap">{sponsorItems.map((item) => <div key={item} className="support-tile">{item}</div>)}</div>
        </div>
      </section>

      <section id="honorees" className="section section-band">
        <div className="container">
          <div className="section-kicker">Honorees</div>
          <h2 className="section-title">A polished section for recognized residents and featured homes.</h2>
          <div className="card-grid three-up top-gap">
            {honorees.map((item) => (
              <div key={item.name} className="panel soft-panel">
                <div className="mini-pill">{item.category}</div>
                <h3 className="card-title-text top-space-sm">{item.name}</h3>
                <p className="subtle-text">{item.city}</p>
                <div className="inner-note">Future area for profile, interview clip, recognition text, and certificate badge.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nominate" className="section">
        <div className="container form-split">
          <div>
            <div className="section-kicker">Nominate someone</div>
            <h2 className="section-title">Submit another person or home for recognition.</h2>
            <p className="body-copy">Use this section to nominate someone whose home or presence reflects neighborhood pride, consistency, stewardship, and positive community impact.</p>
            <div className="soft-callout">
              <div className="section-kicker small">Recommended categories</div>
              <div className="chip-row">{['Neighborhood Pride', 'Healthy Living', 'Seasonal Standout', 'Stewardship Honoree'].map((item) => <div key={item} className="category-chip">{item}</div>)}</div>
            </div>
          </div>
          <div className="panel form-panel">
            <div className="panel-title">Nomination Form</div>
            <form action="https://formspree.io/f/xpqyyell" method="POST" className="form-stack">
              <label className="field-block"><span>Nominee name</span><input name="nominee_name" type="text" required placeholder="Nominee name" /></label>
              <label className="field-block"><span>Nominee address or neighborhood</span><input name="nominee_address" type="text" required placeholder="Nominee address or neighborhood" /></label>
              <label className="field-block"><span>City and state</span><input name="city_state" type="text" required placeholder="City and state" /></label>
              <label className="field-block"><span>Why this person or home stands out</span><textarea name="reason" required rows="5" placeholder="Why this person or home stands out" /></label>
              <label className="field-block"><span>Your name</span><input name="submitter_name" type="text" required placeholder="Your name" /></label>
              <label className="field-block"><span>Your email</span><input name="submitter_email" type="email" required placeholder="Your email" /></label>
              <button type="submit" className="btn btn-primary full-width">Submit Nomination</button>
            </form>
          </div>
        </div>
      </section>

      <section id="certificate" className="section compact-top">
        <div className="container form-split">
          <div>
            <div className="section-kicker">Optional certificate request</div>
            <h2 className="section-title">Digital recognition is free. Physical certificate processing and mailing is $25.</h2>
            <p className="body-copy">Honorees may receive free digital recognition. For those who would like a mailed physical certificate, we offer an optional physical certificate processing and mailing service for $25.</p>
            <div className="highlight-box">
              <div className="section-kicker small green-dark">Highlighted certificate information</div>
              <div className="highlight-copy">Do honorees receive a certificate? <strong>Yes.</strong> Digital recognition is free, and an optional physical certificate is available for <strong>$25</strong>.</div>
            </div>
            <div className="soft-callout top-space">
              <div className="section-kicker small">What the $25 covers</div>
              <div className="stack-list">
                <div>Certificate preparation</div>
                <div>Administrative processing</div>
                <div>Packaging and mailing</div>
              </div>
            </div>
          </div>
          <div className="panel form-panel bordered-panel">
            <div className="panel-title green-title">Claim Certificate</div>
            <div className="price-kicker">$25 optional physical certificate</div>
            <form action="https://formspree.io/f/mzdjjqad" method="POST" className="form-stack">
              <label className="field-block"><span>Full name</span><input name="full_name" type="text" required placeholder="Full name" /></label>
              <label className="field-block"><span>Mailing address</span><textarea name="mailing_address" required rows="4" placeholder="Mailing address" /></label>
              <label className="field-block"><span>Email</span><input name="email" type="email" required placeholder="Email" /></label>
              <label className="field-block"><span>Optional phone number</span><input name="phone" type="text" placeholder="Optional phone number" /></label>
              <button type="submit" className="btn btn-primary full-width">Submit Certificate Request</button>
            </form>
            <a href="https://buy.stripe.com/5kQ5kE4Mx5Nl9yg30bdAk00" target="_blank" rel="noreferrer" className="btn btn-secondary full-width top-space">Pay $25 with Stripe</a>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container two-col">
          <div>
            <div className="section-kicker">Contact</div>
            <h2 className="section-title">Ready for your real contact details and launch setup.</h2>
            <p className="body-copy">The project now has a real mailing address, email, and livestream link. The next upgrades are connecting your final logo assets and future public recognition pages.</p>
          </div>
          <div className="panel value-panel">
            <div className="contact-list">
              <div><div className="section-kicker small">Project name</div><div className="contact-value">Neighborhood Stewardship Project</div></div>
              <div><div className="section-kicker small">Website</div><div className="contact-value small-value">neighborhoodstewardship.org</div></div>
              <div><div className="section-kicker small">Primary email</div><div className="contact-value small-value">team@neighborhoodstewardship.org</div></div>
              <div><div className="section-kicker small">Mailing address</div><div className="contact-value small-value">PO Box 35</div><div className="contact-value small-value">Southwick, MA 01077</div></div>
              <div><div className="section-kicker small">Twitch</div><a href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer" className="contact-link">stewardshipprojectradio</a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact-top">
        <div className="container dark-panel">
          <div>
            <div className="section-kicker small light">Final polish section</div>
            <h2 className="section-title medium white-title">The website is functional. The next upgrades are visual refinement and public recognition pages.</h2>
            <p className="dark-copy narrow">Your nomination form works, your certificate request form works, and your Stripe payment link is connected. The next phase is improving presentation and adding public-facing honoree content.</p>
          </div>
          <div className="dark-list">{['Nomination form connected', 'Certificate request form connected', 'Stripe payment link connected', 'Final logo and seal assets can be added next'].map((item) => <div key={item} className="dark-list-item">{item}</div>)}</div>
        </div>
      </section>

      <section className="section compact-top">
        <div className="container">
          <div className="section-kicker">FAQ</div>
          <h2 className="section-title medium">Clear answers for first-time visitors.</h2>
          <div className="card-grid two-col top-gap">
            {faq.map((item) => (
              <div key={item.q} className="panel soft-panel">
                <h3 className="card-title-text">{item.q}</h3>
                <p className="card-copy">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-kicker">Neighborhood Stewardship Project</div>
          <div className="footer-copy">Community recognition rooted in stewardship, environmental values, and healthy local living.</div>
        </div>
      </footer>
    </div>
  );
}
