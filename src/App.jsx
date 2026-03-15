import React from "react";

export default function App() {
  const steps = [
    {
      title: "Community Recognition",
      description:
        "We identify and spotlight residents and homes that reflect care, consistency, pride, and positive environmental values."
    },
    {
      title: "Livestream Features",
      description:
        "Selected honorees are invited to a short, friendly live conversation highlighting neighborhood stewardship and healthy community living."
    },
    {
      title: "Official Recognition",
      description:
        "Honorees receive public recognition, a digital certificate, and the option to request a printed commemorative certificate."
    }
  ];

  const values = [
    "Community pride",
    "Environmental awareness",
    "Healthy living",
    "Clean modern recognition",
    "Positive local impact",
    "Respectful public storytelling"
  ];

  const honorees = [
    {
      name: "Featured Homeowner",
      city: "West Springfield, MA",
      category: "Neighborhood Stewardship Honoree"
    },
    {
      name: "Featured Family",
      city: "Chicopee, MA",
      category: "Community Pride Recognition"
    },
    {
      name: "Featured Resident",
      city: "Springfield, MA",
      category: "Healthy Living Spotlight"
    }
  ];

  const launchKit = [
    "Brand-ready homepage",
    "Livestream spotlight section",
    "Honoree showcase area",
    "Contact block for PO Box and email",
    "Built-in seal styling for certificates and letters",
    "Ready to connect to forms and Twitch"
  ];

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
      a: "Yes. A digital certificate is included, and a printed commemorative version can be offered separately."
    },
    {
      q: "What kinds of qualities do you recognize?",
      a: "We recognize care for the home, consistency, curb appeal, neighborhood pride, and positive community presence."
    }
  ];

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-row">
          <div className="brand">
            <div className="brand-mark">NSP</div>
            <div>
              <div className="brand-kicker">Neighborhood Stewardship</div>
              <div className="brand-name">Project</div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#livestream">Livestream</a>
            <a href="#honorees">Honorees</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div>
            <div className="eyebrow-pill">Community Recognition Initiative</div>
            <h1>
              A modern recognition platform for neighborhood pride, environmental values, and healthy living.
            </h1>
            <p className="hero-copy">
              The Neighborhood Stewardship Project highlights residents and homes that reflect consistency,
              care, pride, and a positive contribution to the local environment and community.
            </p>
            <div className="cta-row">
              <a href="#contact" className="btn btn-primary">Get Started</a>
              <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
            </div>
            <div className="mini-grid">
              {["Recognition", "Livestreams", "Certificates", "Community"].map((item) => (
                <div key={item} className="mini-card">{item}</div>
              ))}
            </div>
          </div>

          <div className="image-stack">
            <div className="image-card offset">
              <div
                className="photo"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')" }}
              />
              <div className="photo-label">Healthy communities</div>
              <div className="photo-title">Recognition designed to feel warm, credible, and modern</div>
            </div>
            <div className="image-card">
              <div
                className="photo"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80')" }}
              />
              <div className="photo-label">Stewardship</div>
              <div className="photo-title">A cleaner, greener message centered on people and place</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container launch-box">
          <div>
            <div className="section-label">Launch package</div>
            <h2>A cleaner one-page foundation you can actually launch from.</h2>
            <div className="tag-grid">
              {launchKit.map((item) => (
                <div key={item} className="tag-card">{item}</div>
              ))}
            </div>
          </div>
          <div className="seal-panel">
            <div className="wax-seal">
              <div className="wax-ring" />
              <div className="wax-ring inner" />
              <div className="wax-text-top">Official</div>
              <div className="wax-text-main">NSP</div>
              <div className="wax-text-bottom">Recognition</div>
            </div>
            <div className="seal-caption">
              <div className="section-label">Seal concept</div>
              <div className="seal-title">Official Recognition Mark</div>
              <div className="seal-copy">
                This can be reused on certificates, invitation letters, and livestream graphics.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container two-col">
          <div>
            <div className="section-label">About</div>
            <h2>Built to spotlight the people who quietly make communities better.</h2>
            <p className="muted">
              This platform exists to celebrate residents whose homes and habits reflect care, consistency,
              neighborhood pride, and environmental awareness. Through public recognition, livestream features,
              and official certificates, the project gives a polished spotlight to everyday stewardship.
            </p>
          </div>
          <div className="card">
            <div className="card-title">Core values</div>
            <div className="value-grid">
              {values.map((value) => (
                <div key={value} className="value-chip">{value}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section band">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2>Simple, premium, and easy to explain.</h2>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step.title} className="step-card">
                <div className="step-num">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="livestream" className="section">
        <div className="container split">
          <div>
            <div className="section-label">Livestream spotlight</div>
            <h2>A short-form feature that feels personal and official.</h2>
            <p className="muted">
              Selected honorees can be invited to a short live conversation to discuss stewardship,
              neighborhood values, and healthy community living. This section can later hold your Twitch
              stream or replay archive.
            </p>
            <div className="soft-card">
              <div className="section-label">Suggested format</div>
              <div className="bullet-stack">
                <div>1 minute introduction</div>
                <div>3 minute honoree conversation</div>
                <div>1 minute community or environmental spotlight</div>
                <div>Closing recognition and certificate mention</div>
              </div>
            </div>
          </div>

          <div className="dark-feature">
            <div className="dark-screen">
              <div className="live-pill">Live Feature Area</div>
              <h3>Neighborhood Spotlight Broadcast</h3>
              <p>Your Twitch or live video embed can go here once you are ready to stream.</p>
              <div className="dark-tags">
                {["Warm", "Modern", "Credible", "Replay-ready"].map((tag) => (
                  <div key={tag} className="dark-tag">{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split episode-box">
          <div>
            <div className="section-label">First livestream page</div>
            <h2>Your first episode is already mapped out.</h2>
            <p className="muted">
              Use this as your first actual broadcast page or featured section while you build momentum and
              start collecting nominations.
            </p>
            <div className="soft-card">
              <div className="section-label">Episode title</div>
              <div className="episode-title">{firstEpisode.title}</div>
              <p className="muted">{firstEpisode.description}</p>
            </div>
          </div>

          <div className="run-of-show">
            <div className="section-label light">Run of show</div>
            <div className="run-list">
              {firstEpisode.bullets.map((item) => (
                <div key={item} className="run-item">{item}</div>
              ))}
            </div>
            <button className="btn btn-light">Add Twitch link here</button>
          </div>
        </div>
      </section>

      <section id="honorees" className="section band">
        <div className="container">
          <div className="section-label">Honorees</div>
          <h2>A polished section for recognized residents and featured homes.</h2>
          <div className="honoree-grid">
            {honorees.map((item) => (
              <div key={item.name} className="honoree-card">
                <div className="honoree-pill">{item.category}</div>
                <h3>{item.name}</h3>
                <p className="muted small">{item.city}</p>
                <div className="inner-note">
                  Future area for profile, interview clip, recognition text, and certificate badge.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">FAQ</div>
          <h2>Clear answers that make the project feel trustworthy.</h2>
          <div className="faq-list">
            {faq.map((item) => (
              <div key={item.q} className="faq-card">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container two-col">
          <div>
            <div className="section-label">Contact</div>
            <h2>Ready for your real contact details and launch setup.</h2>
            <p className="muted">
              This section is ready for your final email, PO Box, livestream links, and any nomination
              or inquiry forms you want connected later.
            </p>
          </div>
          <div className="card">
            <div className="contact-list">
              <div>
                <div className="contact-label">Project name</div>
                <div className="contact-value">Neighborhood Stewardship Project</div>
              </div>
              <div>
                <div className="contact-label">Website</div>
                <div className="contact-value">neighborhoodstewardship.org</div>
              </div>
              <div>
                <div className="contact-label">Primary email</div>
                <div className="contact-value">team@neighborhoodstewardship.org</div>
              </div>
              <div>
                <div className="contact-label">Mailing address</div>
                <div className="contact-value muted">PO Box to be added after activation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-kicker">Neighborhood Stewardship Project</div>
          <div className="footer-copy">
            Community recognition rooted in stewardship, environmental values, and healthy local living.
          </div>
        </div>
      </footer>
    </div>
  );
}
