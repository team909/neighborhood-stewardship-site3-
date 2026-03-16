export default function NeighborhoodStewardshipWebsite() {
  const steps = [
    {
      title: 'Community Recognition',
      description:
        'We identify and spotlight residents and homes that reflect care, consistency, pride, and positive community values.'
    },
    {
      title: 'Livestream Features',
      description:
        'Selected honorees may be invited to a short, friendly livestream conversation highlighting stewardship, neighborhood pride, and healthy living.'
    },
    {
      title: 'Official Recognition',
      description:
        'Honorees may receive free digital recognition, with an optional physical certificate available for processing and mailing.'
    }
  ];

  const values = [
    'Community pride',
    'Environmental awareness',
    'Healthy living',
    'Recognition and visibility',
    'Positive local impact',
    'Respectful public storytelling'
  ];

  const faq = [
    {
      q: 'Is it free to be nominated?',
      a: 'Yes. Nominations and recognition are free.'
    },
    {
      q: 'Do people have to participate in a livestream?',
      a: 'No. Participation is optional.'
    },
    {
      q: 'Do honorees receive a certificate?',
      a: 'Yes. Digital recognition is free. An optional physical certificate is available for $25, which covers certificate preparation, administrative processing, packaging, and mailing.'
    },
    {
      q: 'What kinds of qualities do we recognize?',
      a: 'We recognize care for the home, consistency, curb appeal, neighborhood pride, and positive community presence.'
    }
  ];

  const honorees = [
    {
      name: 'Featured Homeowner',
      city: 'West Springfield, MA',
      category: 'Neighborhood Stewardship Honoree'
    },
    {
      name: 'Featured Family',
      city: 'Chicopee, MA',
      category: 'Community Pride Recognition'
    },
    {
      name: 'Featured Resident',
      city: 'Springfield, MA',
      category: 'Healthy Living Spotlight'
    }
  ];

  const sponsorItems = ['Community Partner', 'Recognition Partner', 'Civic Supporter', 'Local Steward'];

  const firstEpisode = {
    title: 'Episode 001 — Community Stewardship Spotlight',
    description:
      'A short-form opening broadcast introducing the project, what stewardship means, and how recognized residents will be featured going forward.',
    bullets: [
      '1 minute welcome and mission statement',
      '2 minutes introducing the recognition format',
      '1 minute on environment and healthy living',
      '1 minute closing and nomination call-to-action'
    ]
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3] text-[#19211b]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f6f7f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#9ab19d] bg-white shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#23412c] text-xs font-bold uppercase tracking-[0.18em] text-white">
                NSP
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#4c6b56]">Neighborhood Stewardship</div>
              <div className="text-lg font-semibold">Project</div>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#how-it-works" className="hover:opacity-70">How It Works</a>
            <a href="#livestream" className="hover:opacity-70">Livestream</a>
            <a href="#nominate" className="hover:opacity-70">Nominate</a>
            <a href="#certificate" className="hover:opacity-70">Certificate</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,188,143,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(92,128,99,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <div className="inline-flex rounded-full border border-[#9ab19d] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#4c6b56] shadow-sm">
              Community Recognition Initiative
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              A modern recognition platform for neighborhood pride, environmental values, and healthy living.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70 md:text-xl">
              The Neighborhood Stewardship Project highlights residents and homes that reflect consistency, care, pride, and a positive contribution to the local environment and community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#nominate"
                className="rounded-2xl bg-[#23412c] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Nominate Someone
              </a>
              <a
                href="#certificate"
                className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
              >
                Claim Certificate
              </a>
              <a
                href="https://www.twitch.tv/stewardshipprojectradio"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
              >
                Watch on Twitch
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
              {['Recognition', 'Livestreams', 'Certificates', 'Community'].map((item) => (
                <div key={item} className="rounded-2xl border border-black/5 bg-white p-4 text-sm shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-black/5 bg-white p-4 shadow-xl sm:mt-10">
              <div className="h-80 rounded-[22px] bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="mt-4 text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Healthy communities</div>
              <div className="mt-2 text-xl font-semibold">Recognition designed to feel warm, credible, and modern</div>
            </div>
            <div className="rounded-[28px] border border-black/5 bg-white p-4 shadow-xl">
              <div className="h-80 rounded-[22px] bg-[url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="mt-4 text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Stewardship</div>
              <div className="mt-2 text-xl font-semibold">A cleaner, greener message centered on people and place</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-6 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Official Recognition Program</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A stronger public-facing structure for recognition, nominations, and community spotlighting.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Free digital recognition',
                'Optional physical certificate',
                'Livestream spotlight feature',
                'Community nomination pathway',
                'Built-in seal styling for letters'
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-[#f4f6f1] px-4 py-3 text-sm text-black/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 rounded-[28px] bg-[#f8f9f5] p-8">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#dd4f5f,#992739_68%,#6c1a27)] shadow-[0_20px_45px_rgba(108,26,39,0.28)]">
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <div className="absolute inset-4 rounded-full border border-white/15" />
              <div className="text-center text-white">
                <div className="text-[10px] uppercase tracking-[0.28em] opacity-90">Official</div>
                <div className="mt-1 text-lg font-semibold leading-none">NSP</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.24em] opacity-90">Recognition</div>
              </div>
            </div>
            <div className="text-center">
              <div className="mt-2 text-xl font-semibold">Official NSP Recognition</div>
              <div className="mt-2 max-w-xs text-sm leading-7 text-black/60">
                Official Recognition Mark
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">About</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Built to spotlight the people who quietly make communities better.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
              This platform exists to celebrate residents whose homes and habits reflect care, consistency, neighborhood pride, and environmental awareness. Through public recognition, livestream features, and official certificates, the project gives a polished spotlight to everyday stewardship.
            </p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm">
            <div className="text-lg font-semibold">Core values</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="rounded-2xl bg-[#eef2ea] px-4 py-3 text-sm font-medium text-[#23412c]">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">How it works</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Simple, premium, and easy to explain.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[28px] border border-black/5 bg-[#f8f9f5] p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#23412c] text-lg font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-4 leading-8 text-black/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="livestream" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Livestream spotlight</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              A short-form feature that feels personal and official.
            </h2>
            <p className="mt-6 text-lg leading-8 text-black/70">
              Selected honorees can be invited to a short live conversation to discuss stewardship, neighborhood values, and healthy community living. This section can later hold your Twitch stream or replay archive.
            </p>
            <div className="mt-8 rounded-[28px] border border-[#c8d5ca] bg-[#eef4ee] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Suggested format</div>
              <div className="mt-4 space-y-3 text-black/75">
                <div>1 minute introduction</div>
                <div>3 minute honoree conversation</div>
                <div>1 minute community or environmental spotlight</div>
                <div>Closing recognition and certificate mention</div>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-black/5 bg-[#111714] p-5 shadow-2xl">
            <div className="aspect-video rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(93,149,103,0.45),rgba(17,23,20,1)_60%)] p-8 text-white">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                    Live Feature Area
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold">Neighborhood Spotlight Broadcast</h3>
                  <p className="mt-4 max-w-lg text-white/75">
                    Watch the project livestream on Twitch and follow future community spotlight broadcasts.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {['Warm', 'Modern', 'Credible', 'Replay-ready'].map((tag) => (
                    <div key={tag} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                      {tag}
                    </div>
                  ))}
                </div>
                <a
                  href="https://www.twitch.tv/stewardshipprojectradio"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-2xl bg-[#d8e8d7] px-5 py-3 text-sm font-semibold text-[#1b241d] transition hover:opacity-90"
                >
                  Watch Stewardship Project Radio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 md:px-10 md:py-8">
        <div className="grid gap-8 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">First livestream page</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Your first episode is already mapped out.
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/70">
              Use this as your first actual broadcast page or featured section while you build momentum and start collecting nominations.
            </p>
            <div className="mt-6 rounded-[28px] border border-[#c8d5ca] bg-[#eef4ee] p-6">
              <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Episode title</div>
              <div className="mt-2 text-2xl font-semibold">{firstEpisode.title}</div>
              <p className="mt-4 leading-8 text-black/70">{firstEpisode.description}</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-[#18211b] p-6 text-white shadow-xl">
            <div className="text-sm uppercase tracking-[0.22em] text-[#a8c0ad]">Run of show</div>
            <div className="mt-5 space-y-3">
              {firstEpisode.bullets.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
                  {item}
                </div>
              ))}
            </div>
            <a
              href="https://www.twitch.tv/stewardshipprojectradio"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-2xl bg-[#d8e8d7] px-5 py-3 text-sm font-semibold text-[#1b241d] transition hover:opacity-90"
            >
              Watch on Twitch
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 md:px-10 md:py-8">
        <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Community support</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                A cleaner trust layer for community and local partners.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-black/70">
                This strip creates a natural place for community partners, local recognition supporters, and future collaborators.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorItems.map((item) => (
              <div key={item} className="rounded-2xl border border-black/5 bg-[#f8f9f5] px-5 py-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#4c6b56] shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="honorees" className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Honorees</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                A polished section for recognized residents and featured homes.
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {honorees.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-black/5 bg-[#f8f9f5] p-8 shadow-sm">
                <div className="inline-flex rounded-full bg-[#e5eee5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4c6b56]">
                  {item.category}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{item.name}</h3>
                <p className="mt-3 text-black/60">{item.city}</p>
                <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-black/60">
                  Future area for profile, interview clip, recognition text, and certificate badge.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nominate" className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Nominate someone</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Submit another person or home for recognition.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
              Use this section to nominate someone whose home or presence reflects neighborhood pride, consistency, stewardship, and positive community impact.
            </p>
            <div className="mt-8 rounded-[28px] border border-[#c8d5ca] bg-[#eef4ee] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4c6b56]">Recommended categories</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {['Neighborhood Pride', 'Healthy Living', 'Seasonal Standout', 'Stewardship Honoree'].map((item) => (
                  <div key={item} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#23412c] shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm">
            <div className="text-xl font-semibold">Nomination Form</div>
            <form
              action="https://formspree.io/f/xpqyyell"
              method="POST"
              className="mt-6 space-y-4"
            >
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Nominee name</div>
                <input name="nominee_name" type="text" required placeholder="Nominee name" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Nominee address or neighborhood</div>
                <input name="nominee_address" type="text" required placeholder="Nominee address or neighborhood" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">City and state</div>
                <input name="city_state" type="text" required placeholder="City and state" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Why this person or home stands out</div>
                <textarea name="reason" required placeholder="Why this person or home stands out" rows="5" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Your name</div>
                <input name="submitter_name" type="text" required placeholder="Your name" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Your email</div>
                <input name="submitter_email" type="email" required placeholder="Your email" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <button type="submit" className="mt-6 w-full rounded-2xl bg-[#23412c] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
                Submit Nomination
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="certificate" className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Optional certificate request</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Digital recognition is free. Physical certificate processing and mailing is $25.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
              Honorees may receive free digital recognition. For those who would like a mailed physical certificate, we offer an optional physical certificate processing and mailing service for $25.
            </p>
            <div className="mt-8 rounded-[28px] border-2 border-[#23412c] bg-[#f7fbf7] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#23412c]">Highlighted certificate information</div>
              <div className="mt-4 text-lg leading-8 text-black/80">
                Do honorees receive a certificate? <strong>Yes.</strong> Digital recognition is free, and an optional physical certificate is available for <strong>$25</strong>.
              </div>
            </div>
            <div className="mt-8 rounded-[28px] border border-[#c8d5ca] bg-[#eef4ee] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4c6b56]">What the $25 covers</div>
              <div className="mt-4 space-y-3 text-black/75">
                <div>Certificate preparation</div>
                <div>Administrative processing</div>
                <div>Packaging and mailing</div>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border-2 border-[#23412c] bg-white p-8 shadow-sm">
            <div className="text-xl font-semibold text-[#23412c]">Claim Certificate</div>
            <div className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#4c6b56]">$25 optional physical certificate</div>
            <form
              action="https://formspree.io/f/mzdjjqad"
              method="POST"
              className="mt-6 space-y-4"
            >
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Full name</div>
                <input name="full_name" type="text" required placeholder="Full name" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Mailing address</div>
                <textarea name="mailing_address" required placeholder="Mailing address" rows="4" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Email</div>
                <input name="email" type="email" required placeholder="Email" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium text-black/70">Optional phone number</div>
                <input name="phone" type="text" placeholder="Optional phone number" className="w-full rounded-2xl border border-black/10 bg-[#fafaf8] px-4 py-4 text-sm text-black/70 outline-none" />
              </div>
              <button type="submit" className="mt-2 w-full rounded-2xl bg-[#23412c] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
                Submit Certificate Request
              </button>
            </form>
            <a
              href="https://buy.stripe.com/5kQ5kE4Mx5Nl9yg30bdAk00"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#23412c] shadow-sm transition hover:-translate-y-0.5"
            >
              Pay $25 with Stripe
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4c6b56]">Contact</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Ready for your real contact details and launch setup.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/70">
              The project now has a real mailing address, email, and livestream link. The next upgrades are connecting your nomination flow and Stripe.
            </p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Project name</div>
                <div className="mt-2 text-xl font-semibold">Neighborhood Stewardship Project</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Website</div>
                <div className="mt-2 text-lg">neighborhoodstewardship.org</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Primary email</div>
                <div className="mt-2 text-lg">team@neighborhoodstewardship.org</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Mailing address</div>
                <div className="mt-2 text-lg">PO Box 35</div>
                <div className="mt-1 text-lg">Southwick, MA 01077</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Twitch</div>
                <a href="https://www.twitch.tv/stewardshipprojectradio" target="_blank" rel="noreferrer" className="mt-2 block text-lg underline underline-offset-4">
                  stewardshipprojectradio
                </a>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-[#4c6b56]">Website status</div>
                <div className="mt-2 text-lg">Live and ready for content polish</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <div className="rounded-[32px] bg-[#1f2b22] px-8 py-10 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b7c8b8]">Final polish section</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                The next upgrades are simple: real form, Stripe checkout, and final logo assets.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
                Once those pieces are connected, the website will feel much more complete and much more trustworthy to first-time visitors.
              </p>
            </div>
            <div className="grid gap-3">
              {['Replace Formspree nomination placeholder', 'Replace Formspree certificate placeholder', 'Add your Stripe payment link', 'Swap in your final logo and seal assets'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-[#1a231d] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <div className="text-sm uppercase tracking-[0.25em] text-[#b7c8b8]">Neighborhood Stewardship Project</div>
          <div className="mt-3 max-w-2xl text-white/70">
            Community recognition rooted in stewardship, environmental values, and healthy local living.
          </div>
        </div>
      </footer>
    </div>
  );
}
