import React, { useEffect, useState } from "react";

export default function App() {
  const css = `
    * { box-sizing: border-box; }
    :root {
      --bg: #eef5ee;
      --surface: rgba(250,255,249,.84);
      --text: #17301d;
      --muted: #546256;
      --green: #1d5a32;
      --green-soft: #d5ead8;
      --line: rgba(23,48,29,.1);
      --shadow: 0 24px 50px rgba(32,83,46,.12);
      --max-width: 1180px;
    }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(208,161,93,.18), transparent 22%),
        radial-gradient(circle at 85% 16%, rgba(127,168,137,.2), transparent 22%),
        radial-gradient(circle at bottom right, rgba(78,133,90,.14), transparent 28%),
        linear-gradient(180deg, #f4fbf3 0%, var(--bg) 100%);
    }
    a { color: inherit; text-decoration: none; }
    .page-shell { width: min(calc(100% - 2rem), var(--max-width)); margin: 0 auto; padding-bottom: 4rem; }
    .site-header {
      position: sticky; top: 0; z-index: 10;
      display: flex; justify-content: space-between; align-items: center; gap: 1rem;
      padding: 1.1rem 0; backdrop-filter: blur(18px); background: rgba(238,245,238,.72);
    }
    .brand { display: inline-flex; align-items: center; gap: .9rem; }
    .brand-mark {
      width: 3rem; height: 3rem; border-radius: .95rem; display: inline-flex; align-items: center; justify-content: center;
      background: linear-gradient(145deg, #2b4b34, #1a2f20); color: #fdf8ef; font-weight: 800; letter-spacing: .1em;
      box-shadow: 0 10px 20px rgba(36,65,44,.22);
    }
    .brand-copy { display: flex; flex-direction: column; }
    .brand-kicker,.eyebrow,.panel-label,.feature-kicker,.mini-kicker,.intro-kicker,.footer-kicker {
      text-transform: uppercase; letter-spacing: .16em; font-size: .72rem; font-weight: 800; color: #58705e;
    }
    .brand-name { font-weight: 800; font-size: 1.1rem; }
    .site-nav { display: flex; flex-wrap: wrap; gap: 1.2rem; font-size: .94rem; }

    .hero {
      display: grid; grid-template-columns: 1.25fr .85fr; gap: 1.4rem;
      padding: 3.8rem 0 1.2rem; align-items: start;
    }
    .hero-copy,.hero-panel,.certificate-strip,.intro-band,.feature-card,.recognition-panel,.environment-card,.honoree-card,.certificate-card,.join-panel,.join-form,.media-screen,.media-card {
      background: var(--surface); border: 1px solid rgba(255,255,255,.6); box-shadow: var(--shadow); backdrop-filter: blur(18px);
    }
    .hero-copy { border-radius: 2rem 2rem .8rem 2rem; padding: 3rem; }
    h1,h2,h3,p { margin-top: 0; }
    h1,h2 { font-family: Georgia, "Times New Roman", serif; letter-spacing: -.04em; }
    h1 { margin-bottom: 1rem; font-size: clamp(3.2rem, 8vw, 6.4rem); line-height: .92; }
    h1 span { color: var(--green); }
    h2 { font-size: clamp(2.1rem, 5vw, 3.8rem); line-height: .96; }
    h3 { font-size: 1.35rem; margin-bottom: .65rem; }
    .hero-lede,.feature-card p,.journey-item p,.environment-card p,.honoree-card p,.certificate-highlight span,.join-points,.join-form label span,.intro-copy,.panel-note,.signal-card p,.media-screen p,.media-list,.footer-copy,.story-modal-location,.story-modal-body {
      color: var(--muted); line-height: 1.7;
    }
    .hero-actions,.certificate-actions { display: flex; flex-wrap: wrap; gap: .9rem; margin-top: 2rem; }
    .button {
      display: inline-flex; align-items: center; justify-content: center; min-height: 3.25rem; padding: 0 1.25rem;
      border-radius: 999px; border: 1px solid transparent; transition: transform .18s ease;
      font-weight: 700;
    }
    .button:hover,.story-button:hover { transform: translateY(-2px); }
    .button-primary { background: var(--green); color: #fbf7ef; box-shadow: 0 12px 22px rgba(36,65,44,.22); }
    .button-secondary { background: rgba(255,250,243,.7); border-color: var(--line); color: var(--text); }

    .hero-promise { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1rem; margin-top: 2rem; }
    .promise-card { padding: 1.1rem 1rem; border-radius: 1.1rem; background: rgba(255,255,255,.46); border: 1px solid rgba(36,65,44,.08); }
    .promise-card strong,.certificate-highlight strong { display: block; margin-bottom: .45rem; }

    .hero-panel { border-radius: 1.7rem; padding: 1.6rem; }
    .hero-visual,.ribbon-photo,.environment-photo,.honoree-photo { background-size: cover; background-position: center; }
    .hero-visual {
      position: relative; height: 21rem; margin-bottom: 1.2rem; border-radius: 1.4rem; overflow: hidden;
      box-shadow: inset 0 -80px 100px rgba(20,30,22,.22);
      background:
        linear-gradient(180deg, rgba(29,90,50,.06), rgba(29,90,50,.16)),
        url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80");
    }
    .hero-visual::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(23,33,25,.34));
    }
    .hero-badge {
      position: absolute; right: 1rem; bottom: 1rem; z-index: 1; width: min(16rem,78%);
      padding: 1rem; border-radius: 1rem; background: rgba(255,250,243,.82); backdrop-filter: blur(14px);
      box-shadow: 0 18px 28px rgba(19,27,21,.16);
    }

    .panel-stack,.journey-list,.certificate-options,.media-broadcast,.media-sidebar { display: grid; gap: 1rem; }
    .signal-card,.option-card { padding: 1rem; border-radius: 1.1rem; background: rgba(255,255,255,.54); border: 1px solid rgba(36,65,44,.08); }
    .signal-card h2 { font-size: 2rem; margin-bottom: .35rem; }

    .certificate-strip {
      margin-top: 1rem; border-radius: 1.3rem; padding: 1rem 1.2rem;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
      background: linear-gradient(135deg, rgba(213,234,216,.78), rgba(248,255,246,.82));
    }
    .certificate-strip-copy { display: flex; align-items: baseline; flex-wrap: wrap; gap: .65rem 1rem; margin: 0; }
    .certificate-strip-copy strong { font-size: 1.05rem; }

    .intro-band { margin-top: 1rem; padding: 1.4rem 1.6rem; border-radius: 1.5rem; }
    .image-ribbon { display: grid; grid-template-columns: 1.15fr .85fr .85fr; gap: 1rem; margin-top: 1.2rem; }
    .ribbon-card { border-radius: 1.6rem; overflow: hidden; background: var(--surface); border: 1px solid rgba(255,255,255,.65); box-shadow: var(--shadow); }
    .ribbon-photo { height: 16rem; }
    .ribbon-card-large .ribbon-photo { height: 20rem; }
    .ribbon-copy { padding: 1.15rem 1.2rem 1.3rem; }
    .ribbon-photo-porch { background-image: linear-gradient(180deg, rgba(29,90,50,.04), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80"); }
    .ribbon-photo-greenspace { background-image: linear-gradient(180deg, rgba(29,90,50,.08), rgba(29,90,50,.22)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"); }
    .ribbon-photo-community { background-image: linear-gradient(180deg, rgba(29,90,50,.06), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1400&q=80"); }

    .section { padding-top: 4.5rem; }
    .section-heading { margin-bottom: 1.4rem; }
    .feature-grid,.environment-layout,.honoree-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1rem; }
    .feature-card,.environment-card,.honoree-card { border-radius: 1.5rem; padding: 1.5rem; }

    .recognition-layout,.certificate-layout,.join-layout,.media-layout {
      display: grid; grid-template-columns: 1.1fr .9fr; gap: 1.2rem; align-items: start;
    }
    .journey-item { display: grid; grid-template-columns: auto 1fr; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--line); }
    .journey-step {
      width: 2.5rem; height: 2.5rem; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
      background: var(--green); color: #fff8f0; font-weight: 800;
    }
    .recognition-panel,.certificate-card,.join-panel,.join-form { border-radius: 1.5rem; padding: 1.5rem; }
    .tag-grid { display: flex; flex-wrap: wrap; gap: .75rem; margin: 1rem 0 1.2rem; }
    .tag-grid span { padding: .75rem .95rem; border-radius: 999px; background: rgba(220,232,220,.8); color: var(--green); font-size: .94rem; font-weight: 700; }
    .panel-note { padding: 1rem; border-radius: 1rem; background: rgba(255,255,255,.52); }

    .media-screen {
      min-height: 26rem; padding: 1.6rem; display: flex; flex-direction: column; justify-content: space-between;
      background: linear-gradient(180deg, rgba(12,29,17,.2), rgba(12,29,17,.7)), url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80");
      background-size: cover; background-position: center; color: #f5fff4;
      border-radius: 1.6rem;
    }
    .media-screen p { color: rgba(245,255,244,.82); }
    .live-pill {
      display: inline-flex; width: fit-content; padding: .5rem .8rem; border-radius: 999px;
      background: #ef4444; color: white; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
    }
    .media-tags { display: flex; flex-wrap: wrap; gap: .6rem; margin: 1rem 0 1.2rem; }
    .media-tags span {
      padding: .6rem .85rem; border-radius: 999px; background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.12); color: #f5fff4; font-size: .9rem;
    }
    .media-card { padding: 1.35rem; border-radius: 1.6rem; }
    .media-card-accent { background: linear-gradient(135deg, rgba(213,234,216,.92), rgba(248,255,246,.92)); }
    .media-list { margin: 0; padding-left: 1.1rem; }

    .environment-card-image { padding: 0; overflow: hidden; }
    .environment-photo { height: 15rem; background-image: linear-gradient(180deg, rgba(36,65,44,.06), rgba(36,65,44,.18)), url("https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=80"); }
    .environment-copy { padding: 1.25rem 1.35rem 1.45rem; }

    .honoree-location { color: var(--green); font-weight: 700; }
    .honoree-photo { height: 12rem; margin-bottom: 1rem; border-radius: 1rem; }
    .honoree-photo-home { background-image: linear-gradient(180deg, rgba(29,90,50,.04), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"); }
    .honoree-photo-family { background-image: linear-gradient(180deg, rgba(29,90,50,.04), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80"); }
    .honoree-photo-garden { background-image: linear-gradient(180deg, rgba(29,90,50,.04), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80"); }
    .honoree-photo-block { background-image: linear-gradient(180deg, rgba(29,90,50,.04), rgba(29,90,50,.18)), url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80"); }

    .story-button {
      margin-top: .9rem; min-height: 2.85rem; width: 100%; border: 0; border-radius: 999px;
      background: rgba(29,90,50,.12); color: var(--green); font: inherit; font-weight: 800; cursor: pointer;
      transition: transform .18s ease, background-color .18s ease;
    }

    .certificate-highlight {
      margin-top: 1.4rem; padding: 1.1rem 1.2rem; border-radius: 1.1rem;
      border: 1px solid rgba(36,65,44,.14); background: linear-gradient(180deg, rgba(220,232,220,.6), rgba(255,250,243,.9));
    }
    .certificate-seal-strip { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; margin-top: 1.1rem; }
    .seal-medallion {
      width: 5rem; height: 5rem; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 30% 30%, #d44c5c, #90273a 68%, #681523); color: #fff4ea; font-weight: 800;
    }
    .option-card-featured { border-color: rgba(208,161,93,.28); background: linear-gradient(180deg, rgba(255,249,239,.96), rgba(244,236,217,.92)); }

    .join-points { padding-left: 1.2rem; margin-bottom: 0; }
    .join-form { display: grid; gap: .95rem; }
    .join-form label { display: grid; gap: .4rem; }
    .join-form input,.join-form textarea {
      width: 100%; padding: .95rem 1rem; border-radius: 1rem; border: 1px solid rgba(36,65,44,.12);
      background: rgba(255,255,255,.76); color: var(--text); font: inherit;
    }
    .form-button { width: 100%; }

    .site-footer {
      margin-top: 4rem; padding: 2rem 0 1rem; display: flex; justify-content: space-between; gap: 1rem;
      border-top: 1px solid rgba(36,65,44,.1);
    }
    .footer-copy { max-width: 42rem; margin-bottom: 0; }
    .footer-link { color: var(--green); font-weight: 700; }

    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }

    .story-modal {
      position: fixed; inset: 0; z-index: 40; display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .story-modal-backdrop { position: absolute; inset: 0; background: rgba(13,24,15,.58); backdrop-filter: blur(8px); }
    .story-modal-card {
      position: relative; z-index: 1; width: min(42rem, 100%); padding: 1.6rem; border-radius: 1.5rem;
      background: linear-gradient(180deg, rgba(248,255,246,.98), rgba(237,247,237,.98)); box-shadow: 0 28px 60px rgba(16,41,22,.22);
    }
    .story-modal-close {
      position: absolute; top: .8rem; right: .8rem; width: 2.5rem; height: 2.5rem; border: 0; border-radius: 999px;
      background: rgba(29,90,50,.1); color: var(--green); font-size: 1.5rem; cursor: pointer;
    }
    .story-modal-location { font-weight: 800; color: var(--green); }

    @media (max-width: 980px) {
      .hero,.media-layout,.recognition-layout,.certificate-layout,.join-layout,.feature-grid,.environment-layout,.honoree-grid,.image-ribbon { grid-template-columns: 1fr; }
      .site-nav { display: none; }
      .hero-copy { padding: 2rem; }
    }
    @media (max-width: 700px) {
      .page-shell { width: min(calc(100% - 1rem), var(--max-width)); }
      .hero-promise { grid-template-columns: 1fr; }
      h1 { font-size: 3.2rem; }
      .hero-copy,.hero-panel,.certificate-strip,.intro-band,.feature-card,.recognition-panel,.environment-card,.honoree-card,.certificate-card,.join-panel,.join-form,.media-card,.media-screen { padding: 1.2rem; }
      .site-footer,.certificate-strip,.hero-actions,.certificate-actions { flex-direction: column; }
      .button { width: 100%; }
      .certificate-strip-copy { align-items: flex-start; flex-direction: column; gap: .25rem; }
      .story-modal-card { padding: 1.2rem; }
    }
  `;

  const stories = [
    {
      title: "Longmeadow Stewardship Story",
      location: "Longmeadow, MA",
      body: "Longmeadow families and residents can be recognized for the quiet consistency that makes a block feel dignified and cared for. This story format highlights curb appeal, respect for neighbors, and the kind of environmental thoughtfulness that makes a street feel settled, healthy, and welcoming."
    },
    {
      title: "Wilbraham Community Pride Story",
      location: "Wilbraham, MA",
      body: "Wilbraham recognition can spotlight homes and residents who create a visible feeling of welcome through consistent upkeep, healthy routines, and positive community presence. The goal is to make recognition feel generous, local, and worth aspiring to."
    },
    {
      title: "Southwick Healthy Living Story",
      location: "Southwick, MA",
      body: "Southwick stories can bring together neighborhood pride and healthy local living. The recognition frame here is not only about what looks good, but what creates a cleaner, more hopeful, and more uplifting environment for people nearby."
    },
    {
      title: "West Springfield Recognition Story",
      location: "West Springfield, MA",
      body: "West Springfield recognition can spotlight the people and places that make community pride visible. This story format gives visitors something emotional to click into, helping them feel the program is alive, credible, and ready to reward good stewardship."
    }
  ];

  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    const revealNodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeStory ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStory]);

  return (
    <div className="page-shell">
      <style>{css}</style>

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">NSP</span>
          <span className="brand-copy">
            <span className="brand-kicker">Neighborhood Stewardship</span>
            <span className="brand-name">Project</span>
          </span>
        </a>

        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#recognition">Recognition</a>
          <a href="#media">Media</a>
          <a href="#environment">Environment</a>
          <a href="#honorees">Honorees</a>
          <a href="#certificate">Certificate</a>
          <a href="#join">Join</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Warm recognition for everyday stewardship</p>
            <h1>
              A place where care for your home,
              <span> your block, and your environment </span>
              is seen and celebrated.
            </h1>
            <p className="hero-lede">
              The Neighborhood Stewardship Project honors residents, families, and homes that reflect pride,
              consistency, healthy living, environmental awareness, and positive community impact.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#certificate">Order a Certificate</a>
              <a className="button button-secondary" href="#join">Nominate Someone</a>
            </div>
            <div className="hero-promise">
              <div className="promise-card">
                <strong>You belong here</strong>
                <span>This platform is built to make thoughtful people feel welcomed, respected, and publicly appreciated.</span>
              </div>
              <div className="promise-card">
                <strong>Recognition with purpose</strong>
                <span>We connect neighborhood pride with stewardship, healthy local living, and a cleaner community future.</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel reveal">
            <div className="hero-visual">
              <div className="hero-badge">
                <span className="intro-kicker">Visible good</span>
                <strong>Recognition that feels human from the first glance.</strong>
              </div>
            </div>
            <p className="panel-label">What this platform does</p>
            <div className="panel-stack">
              <article className="signal-card">
                <h2>Recognize</h2>
                <p>Spotlight residents and homes that quietly make communities stronger.</p>
              </article>
              <article className="signal-card">
                <h2>Encourage</h2>
                <p>Reinforce environmental care, healthy habits, curb appeal, and neighborhood pride.</p>
              </article>
              <article className="signal-card">
                <h2>Welcome</h2>
                <p>Give visitors an inviting path to nominate, participate, and request official recognition.</p>
              </article>
            </div>
          </aside>
        </section>

        <section className="certificate-strip reveal">
          <p className="certificate-strip-copy">
            <span className="intro-kicker">Certificate ordering is open</span>
            <strong>Official mailed certificate for $25</strong>
            <span>Prepared, processed, packaged, and mailed.</span>
          </p>
          <a className="button button-primary" href="https://buy.stripe.com/5kQ5kE4Mx5Nl9yg30bdAk00" target="_blank" rel="noreferrer">
            Order Certificate
          </a>
        </section>

        <section className="intro-band reveal">
          <p className="intro-kicker">The feeling of the first page matters</p>
          <p className="intro-copy">
            This website is designed to greet visitors with dignity, warmth, and optimism so they immediately
            understand that stewardship is something valuable, visible, and worth joining.
          </p>
        </section>

        <section className="image-ribbon">
          <article className="ribbon-card ribbon-card-large reveal">
            <div className="ribbon-photo ribbon-photo-porch" />
            <div className="ribbon-copy">
              <p className="feature-kicker">Welcoming neighborhoods</p>
              <h3>Show the beauty of homes, blocks, and everyday care.</h3>
            </div>
          </article>
          <article className="ribbon-card reveal">
            <div className="ribbon-photo ribbon-photo-greenspace" />
            <div className="ribbon-copy">
              <p className="feature-kicker">Environmental focus</p>
              <h3>Connect stewardship to green, healthy, uplifting places.</h3>
            </div>
          </article>
          <article className="ribbon-card reveal">
            <div className="ribbon-photo ribbon-photo-community" />
            <div className="ribbon-copy">
              <p className="feature-kicker">Community spirit</p>
              <h3>Make the platform feel warm, social, and worth joining.</h3>
            </div>
          </article>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">About the platform</p>
            <h2>Recognition rooted in people, place, and responsibility.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal">
              <p className="feature-kicker">Neighborhood Pride</p>
              <h3>Honor the care people bring to where they live.</h3>
              <p>We celebrate the visible choices that make a street feel safer, more welcoming, and more respected.</p>
            </article>
            <article className="feature-card reveal">
              <p className="feature-kicker">Environmental Values</p>
              <h3>Make stewardship part of a cleaner, healthier message.</h3>
              <p>The platform ties recognition to environmental awareness, upkeep, beauty, and healthy local living.</p>
            </article>
            <article className="feature-card reveal">
              <p className="feature-kicker">Community Visibility</p>
              <h3>Give good habits a public spotlight.</h3>
              <p>Recognition helps people feel seen and gives others a positive example to follow.</p>
            </article>
            <article className="feature-card reveal">
              <p className="feature-kicker">Official Reward</p>
              <h3>Make appreciation feel real and collectible.</h3>
              <p>Certificates, stories, livestreams, and public recognition give the platform a real sense of value.</p>
            </article>
          </div>
        </section>

        <section className="section recognition-section" id="recognition">
          <div className="recognition-layout">
            <div className="recognition-copy reveal">
              <p className="eyebrow">How recognition works</p>
              <h2>A clear path from appreciation to participation.</h2>
              <div className="journey-list">
                <div className="journey-item">
                  <span className="journey-step">1</span>
                  <div>
                    <h3>Nominate</h3>
                    <p>Submit a resident, family, or home that reflects care, consistency, pride, and positive influence.</p>
                  </div>
                </div>
                <div className="journey-item">
                  <span className="journey-step">2</span>
                  <div>
                    <h3>Recognize</h3>
                    <p>Selected honorees can receive digital recognition and may be featured publicly.</p>
                  </div>
                </div>
                <div className="journey-item">
                  <span className="journey-step">3</span>
                  <div>
                    <h3>Celebrate</h3>
                    <p>Visitors can request an official certificate and continue building momentum through community storytelling.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="recognition-panel reveal">
              <p className="panel-label">Recognized qualities</p>
              <div className="tag-grid">
                <span>Care for home</span>
                <span>Neighborhood pride</span>
                <span>Healthy living</span>
                <span>Positive presence</span>
                <span>Environmental awareness</span>
                <span>Consistency</span>
              </div>
              <div className="panel-note">
                Recognition should feel encouraging, not distant. The site leads with appreciation first, then action.
              </div>
            </div>
          </div>
        </section>

        <section className="section media-section" id="media">
          <div className="section-heading reveal">
            <p className="eyebrow">Livestream and podcast</p>
            <h2>Recognition should be seen, heard, and shared.</h2>
          </div>

          <div className="media-layout">
            <div className="media-broadcast reveal">
              <div className="media-screen">
                <div>
                  <div className="live-pill">Live on Twitch</div>
                  <h3>Neighborhood Spotlight Broadcast</h3>
                  <p>
                    A warm short-form livestream and podcast-style feature for stewardship stories,
                    honoree spotlights, and healthy community living.
                  </p>
                </div>
                <div>
                  <div className="media-tags">
                    <span>Livestream</span>
                    <span>Podcast feel</span>
                    <span>Replay-ready</span>
                    <span>Community voice</span>
                  </div>
                  <a className="button button-primary" href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer">
                    Watch Stewardship Project Radio
                  </a>
                </div>
              </div>
            </div>

            <div className="media-sidebar reveal">
              <article className="media-card">
                <p className="feature-kicker">Suggested format</p>
                <h3>Short, human, and official</h3>
                <ul className="media-list">
                  <li>1 minute welcome and mission</li>
                  <li>3 minute honoree or stewardship conversation</li>
                  <li>1 minute environment or healthy living spotlight</li>
                  <li>Recognition close with certificate mention</li>
                </ul>
              </article>
              <article className="media-card media-card-accent">
                <p className="feature-kicker">Episode 001</p>
                <h3>Community Stewardship Spotlight</h3>
                <p>
                  An opening episode that explains what stewardship means, how honorees are featured,
                  and why visible community care matters.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section environment-section" id="environment">
          <div className="section-heading reveal">
            <p className="eyebrow">Environment and healthy living</p>
            <h2>The mission is bigger than appearance. It is about care.</h2>
          </div>
          <div className="environment-layout">
            <article className="environment-card environment-card-image reveal">
              <div className="environment-photo" />
              <div className="environment-copy">
                <p className="feature-kicker">A softer visual language</p>
                <h3>Let the environment feel present throughout the site.</h3>
                <p>Natural imagery adds emotional credibility and helps visitors feel the platform is grounded in real places and real care.</p>
              </div>
            </article>
            <article className="environment-card reveal">
              <h3>Cleaner surroundings</h3>
              <p>Stewardship includes the everyday decisions that keep homes, yards, and shared spaces cleaner and more cared for.</p>
            </article>
            <article className="environment-card reveal">
              <h3>Healthier communities</h3>
              <p>The platform connects recognition to habits that contribute to healthier, more uplifting neighborhood life.</p>
            </article>
            <article className="environment-card reveal">
              <h3>Visible encouragement</h3>
              <p>Public appreciation helps good stewardship spread by making it feel meaningful and worth continuing.</p>
            </article>
          </div>
        </section>

        <section className="section honorees-section" id="honorees">
          <div className="section-heading reveal">
            <p className="eyebrow">Honoree spotlights</p>
            <h2>Recognition should feel personal, uplifting, clickable, and real.</h2>
          </div>

          <div className="honoree-grid">
            <article className="honoree-card reveal">
              <div className="honoree-photo honoree-photo-home" />
              <p className="mini-kicker">Neighborhood Stewardship Honoree</p>
              <h3>Longmeadow</h3>
              <p className="honoree-location">Longmeadow, MA</p>
              <p>A polished story card for residents whose care makes a street feel calm, beautiful, and respected.</p>
              <button className="story-button" type="button" onClick={() => setActiveStory(stories[0])}>Read Story</button>
            </article>

            <article className="honoree-card reveal">
              <div className="honoree-photo honoree-photo-family" />
              <p className="mini-kicker">Community Pride Recognition</p>
              <h3>Wilbraham</h3>
              <p className="honoree-location">Wilbraham, MA</p>
              <p>A story space for homes and families that make their area feel more welcoming through steady care.</p>
              <button className="story-button" type="button" onClick={() => setActiveStory(stories[1])}>Read Story</button>
            </article>

            <article className="honoree-card reveal">
              <div className="honoree-photo honoree-photo-garden" />
              <p className="mini-kicker">Healthy Living Spotlight</p>
              <h3>Southwick</h3>
              <p className="honoree-location">Southwick, MA</p>
              <p>A greener recognition story for residents whose habits support a healthier and more uplifting local environment.</p>
              <button className="story-button" type="button" onClick={() => setActiveStory(stories[2])}>Read Story</button>
            </article>

            <article className="honoree-card reveal">
              <div className="honoree-photo honoree-photo-block" />
              <p className="mini-kicker">Visible Good Award</p>
              <h3>West Springfield</h3>
              <p className="honoree-location">West Springfield, MA</p>
              <p>A featured spotlight for blocks, homes, and people who make care visible and contagious.</p>
              <button className="story-button" type="button" onClick={() => setActiveStory(stories[3])}>Read Story</button>
            </article>
          </div>
        </section>

        <section className="section certificate-section" id="certificate">
          <div className="certificate-layout">
            <div className="certificate-copy reveal">
              <p className="eyebrow">Certificate selection</p>
              <h2>Make the next step feel official and easy.</h2>
              <p className="hero-lede">Digital recognition is free. Honorees who want a physical certificate can request one through a clear, welcoming path.</p>
              <div className="certificate-highlight">
                <strong>Optional physical certificate: $25</strong>
                <span>Covers certificate preparation, administrative processing, packaging, and mailing.</span>
              </div>
              <div className="certificate-seal-strip">
                <div className="seal-medallion"><span>NSP</span></div>
                <p>A stronger visual certificate area helps the platform feel more ceremonial, collectible, and memorable.</p>
              </div>
            </div>

            <div className="certificate-card reveal">
              <p className="panel-label">Select your certificate path</p>
              <div className="certificate-options">
                <div className="option-card">
                  <h3>Free Digital Recognition</h3>
                  <p>Best for honorees who want recognition without mailing.</p>
                </div>
                <div className="option-card option-card-featured">
                  <h3>Physical Certificate</h3>
                  <p>A more ceremonial option for visitors who want an official mailed keepsake.</p>
                </div>
              </div>
              <div className="certificate-actions">
                <a className="button button-primary" href="https://buy.stripe.com/5kQ5kE4Mx5Nl9yg30bdAk00" target="_blank" rel="noreferrer">
                  Select Physical Certificate
                </a>
                <a className="button button-secondary" href="#join">Start with Recognition Form</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section join-section" id="join">
          <div className="section-heading reveal">
            <p className="eyebrow">Join the platform</p>
            <h2>Invite people in with clarity, warmth, and momentum.</h2>
          </div>

          <div className="join-layout">
            <div className="join-panel reveal">
              <h3>Why visitors keep scrolling</h3>
              <ul className="join-points">
                <li>They feel welcomed instead of talked at.</li>
                <li>They understand what gets recognized and why.</li>
                <li>They see a clear path to nominate or request a certificate.</li>
                <li>They understand the platform supports community good.</li>
              </ul>
            </div>

            <form className="join-form reveal" action="https://formspree.io/f/xpqyyell" method="POST">
              <p className="panel-label">Nomination form</p>
              <label><span>Nominee name</span><input name="nominee_name" type="text" placeholder="Nominee name" required /></label>
              <label><span>Address or neighborhood</span><input name="nominee_address" type="text" placeholder="Address or neighborhood" required /></label>
              <label><span>City and state</span><input name="city_state" type="text" placeholder="City and state" required /></label>
              <label><span>Why they stand out</span><textarea name="reason" rows="5" placeholder="Share what makes this person, family, or home worthy of recognition." required /></label>
              <label><span>Your email</span><input name="submitter_email" type="email" placeholder="Your email" required /></label>
              <button className="button button-primary form-button" type="submit">Submit Nomination</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-kicker">Neighborhood Stewardship Project</p>
          <p className="footer-copy">Community recognition shaped around stewardship, environmental values, healthy living, and a more welcoming public message.</p>
        </div>
        <a className="footer-link" href="mailto:team@neighborhoodstewardship.org">team@neighborhoodstewardship.org</a>
      </footer>

      {activeStory && (
        <div className="story-modal" aria-hidden="false">
          <div className="story-modal-backdrop" onClick={() => setActiveStory(null)} />
          <div className="story-modal-card" role="dialog" aria-modal="true" aria-labelledby="story-modal-title">
            <button className="story-modal-close" type="button" aria-label="Close story" onClick={() => setActiveStory(null)}>
              &times;
            </button>
            <p className="intro-kicker">Community recognition story</p>
            <h2 id="story-modal-title">{activeStory.title}</h2>
            <p className="story-modal-location">{activeStory.location}</p>
            <p className="story-modal-body">{activeStory.body}</p>
            <a className="button button-primary" href="#certificate" onClick={() => setActiveStory(null)}>
              Order Recognition Certificate
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
