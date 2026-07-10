import { HeroMedia } from "@/components/HeroMedia";
import { RevealObserver } from "@/components/RevealObserver";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";
import { CollapsibleStory } from "@/components/CollapsibleStory";

export default function Home() {
  return (
    <>
      <RevealObserver />

      <header className="hero">
        <div className="heroglow" />
        <HeroMedia />
        <div className="herocontent">
          <div className="wrap">
            <div className="availpill reveal in">
              <span className="livedot" />
              Available for senior product engineering roles
            </div>
            <h1 className="h1 disp reveal in d1">
              I build and <span className="em">own products end-to-end</span> —
              from the problem to what ships.
            </h1>
            <p className="sub reveal in d2">
              Senior product engineer, 10+ years. I&rsquo;ve built and shipped
              platforms across fintech, insurance, and healthcare.
            </p>
            <div className="metaline reveal in d2">
              Usman Tahir&nbsp;&nbsp;·&nbsp;&nbsp;Amsterdam
            </div>
            <div className="ctarow reveal in d3">
              <a
                className="btn btn-primary"
                href="/usman-tahir-cv.pdf"
                download="Usman-Tahir-CV.pdf"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <div className="scrollcue">
          <span className="ln" />
          Scroll
        </div>
      </header>

      <main>
        {/* Selected work */}
        <section className="section" id="work">
          <div className="wrap">
            <div className="sechead reveal">
              <span className="secnum">01</span>
              <h2 className="sectitle disp">Selected work</h2>
            </div>
            <p className="secintro reveal">
              Three products in unfamiliar domains — insurance, healthcare,
              Web3. Each read in five seconds from the outcomes; deeper on a full
              read.
            </p>
            <div className="cases">
              {/* Fidamy */}
              <article className="case reveal">
                <div className="casetop">
                  <span className="caselabel">Platform Ownership</span>
                  <span className="casesub">
                    Fidamy · device insurance via retailers · Amsterdam ·
                    2024–2026
                  </span>
                </div>
                <div className="casegrid">
                  <div className="casebody">
                    <p className="lead disp">
                      <span className="em">
                        I was the first engineer at a venture-backed insurtech,
                        and I built the entire customer-facing platform
                      </span>{" "}
                      — from the first Figma flows to a live product embedded in
                      retailer checkouts.
                    </p>
                    <CollapsibleStory>
                      <p>
                        The first six months weren&rsquo;t code. Fidamy sells
                        device insurance <em>through</em> retail partners rather
                        than directly to consumers, so the real question was what
                        to build — which flows customers actually understood,
                        what our investor (NN) would approve, and what our
                        insurance licensing allowed. In a regulated market, that
                        discovery <em>is</em> the work, not a delay before it.
                      </p>
                      <p>
                        The purchase flow taught me something about architecture
                        and timing. The step count kept moving — six at MVP, then
                        five, then four — as we cleared each version with NN and
                        the regulator. Next.js routing is file-based, so pinning
                        each step to a URL while they churned would have locked me
                        in too early; I drove the wizard from client-side state to
                        stay flexible. That had a cost — a race condition loading
                        step data caused hydration errors. Once the design
                        stabilized at four approved steps, I re-architected to
                        file-based per-step routing, each step loading
                        deterministically. It killed the race condition, made the
                        flow resumable and shareable, and took checkout conversion
                        from ~20% to ~67%.
                      </p>
                      <p>
                        The other hard problem was speed — and cost. Our pricing
                        engine (Peak3) had no bulk-quote endpoint and billed per
                        API call, so four quotations meant four slow, metered
                        requests. Its pricing is deterministic, so I cached quotes
                        in our own price map and built the bulk endpoint it never
                        offered: quote loads dropped from ~10s to under 100ms, and
                        repeat pricing stopped costing us anything.
                      </p>
                      <p>
                        Some decisions were about the business, not the code.
                        Moving payments from Stripe to Twikey wasn&rsquo;t a
                        technical flex — iDEAL and SEPA direct debit are how the
                        Netherlands pays, and direct-debit mandates were a hard
                        requirement for an insurer. What started as a purchase
                        form had become a distribution platform.
                      </p>
                    </CollapsibleStory>
                  </div>
                  <aside className="outcomes">
                    <p className="outh">Outcomes</p>
                    <ul className="outlist">
                      <li>
                        <span className="mk" />
                        <span>
                          <b>Checkout conversion ~20% → ~67%</b> — deterministic
                          per-step routing once the regulated flow stabilized
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Quote loads <b>~10s → &lt;100ms</b> and removed per-call
                          vendor fees via a self-hosted price cache + bulk endpoint
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Re-platformed payments to <b>Twikey</b> (iDEAL/SEPA
                          direct debit) with webhook status handling — zero
                          downtime
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Blank repo → live platform embedded in retailer
                          checkouts, onboarding a growing set of partners
                        </span>
                      </li>
                    </ul>
                  </aside>
                </div>
              </article>

              {/* Droobi */}
              <article className="case reveal">
                <div className="casetop">
                  <span className="caselabel">Inherited Leadership</span>
                  <span className="casesub">
                    Droobi Health · regulated digital-health platform · Doha,
                    Qatar · 2019–2021
                  </span>
                </div>
                <div className="casegrid">
                  <div className="casebody">
                    <p className="lead disp">
                      <span className="em">
                        I was recruited to a Qatari health startup as its first
                        engineer on the ground, and I immediately took over a
                        ten-person cross-platform team
                      </span>{" "}
                      — backend, Android, iOS, and web — while shipping the
                      product&rsquo;s frontend myself.
                    </p>
                    <CollapsibleStory>
                      <p>
                        I was brought in on a referral, not a job posting. I&rsquo;d
                        just led the enterprise integration that migrated Freedom
                        Mobile&rsquo;s customer base into Rogers&rsquo; systems
                        after the acquisition, and the person who watched me
                        deliver it vouched for me directly to Droobi&rsquo;s CTO —
                        ex-McKinsey, ex-Microsoft. That&rsquo;s a pattern I&rsquo;ve
                        come to rely on: the hardest roles reach me because someone
                        has already seen me handle complexity firsthand.
                      </p>
                      <p>
                        My title was &ldquo;Technical Lead,&rdquo; but I was
                        running the engineering function. A ten-person Venture Dive
                        team reported to me across four disciplines; I set the
                        standards and the delivery cadence, had a direct hand in
                        what we paid the vendor and how we allocated engineers
                        against budget, and still built the product&rsquo;s web
                        frontend myself. As the only person on-site, I was the
                        single point where product, delivery, and cost all met.
                      </p>
                      <p>
                        The stakes were clinical and real. We served the diabetes
                        patients of two of Doha&rsquo;s major hospitals — Hamad
                        Medical Corporation and Al Ahli — with iOS and Android apps
                        for patients, dashboards for the clinicians tracking them,
                        and integrations with glucose monitors, scales, and
                        wearables feeding live metrics back to care teams.
                      </p>
                      <p>
                        The hardest constraint wasn&rsquo;t clinical — it was where
                        the data was allowed to live. Qatari law bars
                        government-hospital health data from the public cloud, so
                        AWS and Azure were off the table. I made the call to host
                        on a custom Ooredoo data center, brought in a specialist
                        firm to build it, and steered the architecture around
                        on-shore hosting. That one requirement shaped the entire
                        platform — and we still shipped, including exposure-tracking
                        and in-app video consultations on a compressed timeline
                        when COVID hit.
                      </p>
                    </CollapsibleStory>
                  </div>
                  <aside className="outcomes">
                    <p className="outh">Outcomes</p>
                    <ul className="outlist">
                      <li>
                        <span className="mk" />
                        <span>
                          Led a <b>10-person cross-platform team</b> (backend,
                          Android, iOS, web) as the only on-site engineer — while
                          building the web frontend myself
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Delivered the diabetes platform for{" "}
                          <b>two major Doha hospitals</b> — patient apps, clinician
                          dashboards, connected-device integrations
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Directed the move to a custom{" "}
                          <b>on-shore Ooredoo data center</b> (no AWS/Azure) to
                          meet Qatar&rsquo;s health-data residency law
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Shipped <b>COVID-response features</b> (exposure
                          tracking, in-app video consultations) on a compressed
                          timeline
                        </span>
                      </li>
                    </ul>
                  </aside>
                </div>
              </article>

              {/* Mustaa */}
              <article className="case reveal">
                <div className="casetop">
                  <span className="caselabel">Founder Thinking</span>
                  <span className="casesub">
                    Mustaa · fractional yacht-ownership platform · Rotterdam ·
                    2023–2025
                  </span>
                </div>
                <div className="casegrid">
                  <div className="casebody">
                    <p className="lead disp">
                      <span className="em">
                        As co-founder and CTO, I built a platform around one
                        stubborn idea
                      </span>{" "}
                      — you shouldn&rsquo;t need to be a millionaire to spend time
                      on a yacht; you should be able to own a slice of one and use
                      it when you want.
                    </p>
                    <CollapsibleStory>
                      <p>
                        Owning a yacht is out of reach for almost everyone, but the
                        thing people actually want isn&rsquo;t the asset — it&rsquo;s
                        the time on the water. So we let people buy a fractional
                        share of a yacht — capped at four shares per boat — and
                        each share granted time tokens, one per day of use. That
                        cap was deliberate: four shares map onto the year, so the
                        platform could never promise more time than a boat
                        physically has. The deeper question was what happens when
                        you <em>don&rsquo;t</em> use yours, and the answer became
                        the product: tokens were tradable, so you could spend them
                        on sailing time or sell them back when you weren&rsquo;t.
                      </p>
                      <p>
                        As CTO I made the architecture decisions that turned the
                        idea into something real. Ownership and time tokens were
                        issued on-chain to each buyer, and a booking engine
                        connected that ownership to a real boat, a real date, a
                        real event. The hard part wasn&rsquo;t the blockchain — it
                        was the seam between owning something digitally and using
                        it in the physical world, and making that feel like one
                        seamless product.
                      </p>
                      <p>
                        We were a four-person founding team; I led technical
                        strategy and product engineering from concept to MVP and
                        directed two freelance engineers. We grew a 500+ member
                        community and earned our first real revenue from curated
                        sailing trips and yacht-hosted events run through the
                        platform. We wound the company down in 2025 — but I came
                        away having taken a genuinely novel product from a human
                        need all the way to people using it. The technology was
                        never the point.
                      </p>
                    </CollapsibleStory>
                  </div>
                  <aside className="outcomes">
                    <p className="outh">Outcomes</p>
                    <ul className="outlist">
                      <li>
                        <span className="mk" />
                        <span>
                          Co-founded and <b>led engineering (CTO)</b> — concept to
                          MVP, 4-person team
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Designed the core mechanic:{" "}
                          <b>shares capped at four per boat</b>, each granting
                          tradable time tokens (one = one day)
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Built the platform end to end — digital ownership,
                          tokenized access, and a <b>booking engine</b> tying it to
                          real-world use
                        </span>
                      </li>
                      <li>
                        <span className="mk" />
                        <span>
                          Grew a <b>500+ member community</b> with early revenue
                          from curated sailing trips and yacht-hosted events
                        </span>
                      </li>
                    </ul>
                  </aside>
                </div>
              </article>

              {/* Featured project — Abu Dhabi (Systems at Scale) */}
              <article className="case feature reveal">
                <div className="casetop">
                  <span className="caselabel">
                    <span className="n">Featured</span>Systems at Scale
                  </span>
                  <span className="casesub">
                    Abu Dhabi Government · via Systems Limited · 2021
                  </span>
                </div>
                <p className="lead disp">
                  <span className="em">
                    As application-side tech lead, I led the build of the app Abu
                    Dhabi used to reopen to travel during COVID
                  </span>{" "}
                  — verifying vaccination at visa time, so the airport gates never
                  turned into queues.
                </p>
                <div className="feature-body">
                  <CollapsibleStory>
                    <p>
                      The world needed to reopen, and vaccinated travel was the
                      way — but checking that at the gate would mean long queues.
                      So the check moved upstream: a traveler was vaccinated at
                      visa time, and their lab or embassy uploaded the proof to
                      the portal before the flight. By arrival, Abu Dhabi already
                      knew — travelers whose passports the e-gates could read
                      cleared themselves; everyone else, an officer scanned a
                      passport and the status came straight back. Every traveler
                      through the airport, verified — and we shipped it in four
                      months, working day and night.
                    </p>
                    <p>
                      My side was the application layer and QA. The proof came
                      from labs and embassies all over the world — some on
                      connections you couldn&rsquo;t count on, like Uganda — so I
                      built the upload side to work on 2G, and put a GraphQL
                      backend-for-frontend in front of the Azure APIs: every
                      screen pulled exactly what it needed, with the real
                      endpoints and sensitive health data never exposed to the
                      browser.
                    </p>
                  </CollapsibleStory>
                  <ul className="feature-outcomes">
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Over half a million travelers cleared it</b> — the
                        mandatory vaccination check, at the e-gate or by an
                        officer&rsquo;s passport scan
                      </span>
                    </li>
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Built in 4 months</b> — Feb–May 2021, a five-person
                        team under pandemic pressure
                      </span>
                    </li>
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Built for 2G</b> — so labs and embassies could upload
                        from anywhere, behind a GraphQL BFF that hid the real APIs
                      </span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* The pattern */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="sechead reveal">
              <span className="secnum">02</span>
              <h2 className="sectitle disp">The pattern</h2>
            </div>
            <div className="pattern reveal">
              <p className="eyebrow">The real thread</p>
              <p className="patternq disp">
                None of these were in a field I already knew. Hand me an
                unfamiliar problem and I take it head-on — I start building, learn
                the domain by building my way through it, and ship something real
                at the end.{" "}
                <span className="em">
                  New problem, dive in, make it work
                </span>{" "}
                — that&rsquo;s the part of the work I like most, and what I&rsquo;m
                looking for more of.
              </p>
            </div>
          </div>
        </section>

        {/* Earlier career (interactive) */}
        <Timeline />

        {/* Capabilities */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="sechead reveal">
              <span className="secnum">04</span>
              <h2 className="sectitle disp">Capabilities</h2>
            </div>
            <p className="secintro reveal">
              Where the range lives, grouped by what it does — not an exhaustive
              list.
            </p>
            <div className="skillgrid reveal">
              <div className="skill">
                <span className="skillnum">01</span>
                <span className="skillname disp">Platform Engineering</span>
                <span className="skilltech">
                  Next.js<span className="sep">·</span>React
                  <span className="sep">·</span>TypeScript
                  <span className="sep">·</span>Node.js
                  <span className="sep">·</span>AWS
                </span>
              </div>
              <div className="skill">
                <span className="skillnum">02</span>
                <span className="skillname disp">Payments</span>
                <span className="skilltech">
                  Stripe<span className="sep">·</span>Twikey
                  <span className="sep">·</span>SEPA / iDEAL direct debit
                </span>
              </div>
              <div className="skill">
                <span className="skillnum">03</span>
                <span className="skillname disp">Identity &amp; Auth</span>
                <span className="skilltech">
                  Auth0<span className="sep">·</span>Clerk
                  <span className="sep">·</span>Keycloak
                  <span className="sep">·</span>2FA
                </span>
              </div>
              <div className="skill">
                <span className="skillnum">04</span>
                <span className="skillname disp">Delivery &amp; Quality</span>
                <span className="skilltech">
                  GitHub Actions<span className="sep">·</span>GitLab CI
                  <span className="sep">·</span>AWS CodeBuild
                  <span className="sep">·</span>SonarQube
                  <span className="sep">·</span>Jira
                </span>
              </div>
              <div className="skill skill-wide">
                <span className="skillnum">05</span>
                <span className="skillname disp">Observability</span>
                <span className="skilltech">
                  Sentry<span className="sep">·</span>New Relic
                  <span className="sep">·</span>Amplitude
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How I approach problems */}
        <section className="section" id="approach">
          <div className="wrap">
            <div className="sechead reveal">
              <span className="secnum">05</span>
              <h2 className="sectitle disp">How I approach problems</h2>
            </div>
            <div className="approach reveal">
              <p>
                I came to this site thinking it was a redesign problem. It turned
                out to be a positioning problem — so I didn&rsquo;t write a line of
                code until I&rsquo;d solved that one. I interrogated my own work
                until each case study was specific and honest, locked the
                hierarchy, and only then started to build. That&rsquo;s how I
                approach everything:{" "}
                <span className="em">
                  understand the real problem before reaching for the tools.
                </span>{" "}
                This site is the argument — the design just gets out of its way.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contactgrid">
            <div className="reveal">
              <h2 className="sr-only">Contact</h2>
              <p className="eyebrow" aria-hidden="true">Contact</p>
              <a className="cmail" href="mailto:hello@usmantahir.com">
                hello@usmantahir.com
              </a>
              <p className="cnote">
                Looking for a senior product engineering role at a company that
                takes engineering seriously and keeps evolving. If that&rsquo;s
                you, say hello.
              </p>
              <p className="metaline">
                Usman Tahir&nbsp;&nbsp;·&nbsp;&nbsp;Amsterdam
                &nbsp;&nbsp;·&nbsp;&nbsp;Available now
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="foot">
        <div className="footin">
          <span>© 2026 Usman Tahir</span>
          <span>Amsterdam · Senior Product Engineer</span>
          <span>Built end-to-end — the argument, not a template.</span>
        </div>
      </footer>
    </>
  );
}
