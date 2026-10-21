import { HeroMedia } from "@/components/HeroMedia";
import { RevealObserver } from "@/components/RevealObserver";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";
import { CollapsibleStory } from "@/components/CollapsibleStory";
import {
  FidamySpecimen,
  DroobiSpecimen,
  MustaaSpecimen,
  AbuDhabiSpecimen,
} from "@/components/Specimens";

export default function Home() {
  return (
    <>
      <RevealObserver />

      <header className="hero">
        <div className="heroglow" />
        <HeroMedia />
        <div className="herocontent">
          <div className="wrap">
            <h1 className="h1 disp rise r1">
              I build and <span className="em">own products end-to-end</span>,
              from the problem to what ships.
            </h1>
            <p className="sub rise r2">
              Senior product engineer, 10+ years, across fintech, insurance and
              healthcare.
            </p>
            <div className="stackline rise r3" aria-label="Main stack">
              Next.js<span className="sep">·</span>React
              <span className="sep">·</span>Node.js
              <span className="sep">·</span>AWS
            </div>
            <div className="ctarow rise r4">
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
            <div className="availpill rise r5">
              <span className="livedot" />
              Amsterdam · available for senior and lead engineering roles
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
              <h2 className="sectitle disp">Selected work</h2>
            </div>
            <p className="secintro reveal">
              Four products, four ways of owning one: from zero, inherited,
              founded, and at national scale.
            </p>
            <div className="cases">
              {/* Fidamy */}
              <article className="case reveal">
                <header className="casewho">
                  <h3 className="casedim disp">Platform ownership</h3>
                  <p className="caseco">Fidamy · device insurance via retailers</p>
                  <p className="caseyr">Amsterdam · 2024 to 2026</p>
                  <svg className="glyph" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4 l10 4 v8 c0 7 -5 11 -10 14 c-5 -3 -10 -7 -10 -14 v-8 z" /><path d="M12 17 l4 4 l7 -8" /></svg>
                </header>
                <div className="casewhat">
                  <p className="lead disp">
                    <span className="em">
                      I was the first engineer at a venture-backed insurtech,
                      and I built the entire customer-facing platform
                    </span>
                    ,{" "}
                    <span className="hl">
                      from the first Figma flows to a live product embedded in
                      retailer checkouts
                    </span>
                    .
                  </p>
<aside className="outcomes">
                  <ul className="outlist">
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Reliable, resumable checkout</b>: each step on its own
                        URL once the regulated flow stabilized
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
                        direct debit) with webhook status handling and zero
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
                  <FidamySpecimen />
                  <CollapsibleStory>
                    <p>
                      The first six months weren&rsquo;t code. Fidamy sells
                      device insurance <em>through</em> retail partners rather
                      than directly to consumers, so the real question was what
                      to build: which flows customers actually understood,
                      what our investor (NN) would approve, and what our
                      insurance licensing allowed. In a regulated market, that
                      discovery <em>is</em> the work, not a delay before it.
                    </p>
                    <p>
                      The purchase flow taught me something about architecture
                      and timing. The step count kept moving (six at MVP, then
                      five, then four) as we cleared each version with NN and
                      the regulator. Next.js routing is file-based, so pinning
                      each step to a URL while they churned would have locked me
                      in too early; I drove the wizard from client-side state to
                      stay flexible. That had a cost: a race condition loading
                      step data caused hydration errors. Once the design
                      stabilized at four approved steps, I re-architected to
                      file-based per-step routing, each step loading
                      deterministically. It killed the race condition and made
                      the flow resumable and shareable.
                    </p>
                    <p>
                      The other hard problem was speed, and cost. Our pricing
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
                      technical flex: iDEAL and SEPA direct debit are how the
                      Netherlands pays, and direct-debit mandates were a hard
                      requirement for an insurer. What started as a purchase
                      form had become a distribution platform.
                    </p>
                  </CollapsibleStory>
                </div>
              </article>

              {/* Droobi */}
              <article className="case reveal">
                <header className="casewho">
                  <h3 className="casedim disp">Inherited leadership</h3>
                  <p className="caseco">Droobi Health · regulated digital health</p>
                  <p className="caseyr">Doha · 2019 to 2021</p>
                  <svg className="glyph" viewBox="0 0 34 34" aria-hidden="true"><polyline points="4,21 10,21 13,13 18,26 22,17 25,21 30,21" /></svg>
                </header>
                <div className="casewhat">
                  <p className="lead disp">
                    <span className="em">
                      I was recruited to a Qatari health startup as its first
                      engineer on the ground, and I immediately took over a
                      <span className="hl">ten-person cross-platform team</span>
                    </span>{" "}
                    (backend, Android, iOS, and web) while shipping the
                    product&rsquo;s frontend myself.
                  </p>
<aside className="outcomes">
                  <ul className="outlist">
                    <li>
                      <span className="mk" />
                      <span>
                        Led a <b>10-person cross-platform team</b> (backend,
                        Android, iOS, web) as the only on-site engineer, while
                        building the web frontend myself
                      </span>
                    </li>
                    <li>
                      <span className="mk" />
                      <span>
                        Delivered the diabetes platform for{" "}
                        <b>two major Doha hospitals</b>: patient apps, clinician
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
                  <DroobiSpecimen />
                  <CollapsibleStory>
                    <p>
                      I was brought in on a referral, not a job posting. I&rsquo;d
                      just led the enterprise integration that migrated Freedom
                      Mobile&rsquo;s customer base into Rogers&rsquo; systems
                      after the acquisition, and the person who watched me
                      deliver it vouched for me directly to Droobi&rsquo;s CTO,
                      ex-McKinsey and ex-Microsoft. That&rsquo;s a pattern I&rsquo;ve
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
                      patients of two of Doha&rsquo;s major hospitals, Hamad
                      Medical Corporation and Al Ahli, with iOS and Android apps
                      for patients, dashboards for the clinicians tracking them,
                      and integrations with glucose monitors, scales, and
                      wearables feeding live metrics back to care teams.
                    </p>
                    <p>
                      The hardest constraint wasn&rsquo;t clinical. It was where
                      the data was allowed to live. Qatari law bars
                      government-hospital health data from the public cloud, so
                      AWS and Azure were off the table. I made the call to host
                      on a custom Ooredoo data center, brought in a specialist
                      firm to build it, and steered the architecture around
                      on-shore hosting. That one requirement shaped the entire
                      platform, and we still shipped, including exposure-tracking
                      and in-app video consultations on a compressed timeline
                      when COVID hit.
                    </p>
                  </CollapsibleStory>
                </div>
              </article>

              {/* Mustaa */}
              <article className="case reveal">
                <header className="casewho">
                  <h3 className="casedim disp">Founder thinking</h3>
                  <p className="caseco">Mustaa · fractional yacht ownership</p>
                  <p className="caseyr">Rotterdam · 2023 to 2025</p>
                  <svg className="glyph" viewBox="0 0 34 34" aria-hidden="true"><path d="M5 23 q12 7 24 0 l-3 6 h-18 z" /><line x1="17" y1="23" x2="17" y2="5" /><path d="M17 6 l10 14 h-10 z" /><path d="M17 6 l-8 14 h8 z" /></svg>
                </header>
                <div className="casewhat">
                  <p className="lead disp">
                    <span className="em">
                      As co-founder and CTO, I built a platform around one
                      stubborn idea
                    </span>
                    : you shouldn&rsquo;t need to be a millionaire to spend time
                    on a yacht;{" "}
                    <span className="hl">
                      you should be able to own a slice of one and use it when
                      you want
                    </span>
                    .
                  </p>
<aside className="outcomes">
                  <ul className="outlist">
                    <li>
                      <span className="mk" />
                      <span>
                        Co-founded and <b>led engineering (CTO)</b>: concept to
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
                        Designed the system: blockchain only for ownership, a{" "}
                        <b>serverless AWS backend</b> (Step Functions, Aurora,
                        SQS) for everything members use
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
                  <MustaaSpecimen />
                  <CollapsibleStory>
                    <p>
                      Owning a yacht is out of reach for almost everyone, but the
                      thing people actually want isn&rsquo;t the asset; it&rsquo;s
                      the time on the water. So we let people buy a fractional
                      share of a yacht, capped at four shares per boat, and
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
                      real event. The hard part wasn&rsquo;t the blockchain; it
                      was the seam between owning something digitally and using
                      it in the physical world, and making that feel like one
                      seamless product.
                    </p>
                    <p>
                      So I kept the blockchain as the register of ownership and
                      nothing else; bookings, search, media, and euro payments
                      ran on a serverless AWS backend. Each promise lived in
                      exactly one place: the chain guaranteed a boat never had
                      more days than it physically has, and the database made
                      double-booking impossible.
                    </p>
                    <p>
                      We were a four-person founding team; I led technical
                      strategy and product engineering from concept to MVP and
                      directed two freelance engineers. We grew a 500+ member
                      community and earned our first real revenue from curated
                      sailing trips and yacht-hosted events run through the
                      platform. We wound the company down in 2025, but I came
                      away having taken a genuinely novel product from a human
                      need all the way to people using it. The technology was
                      never the point.
                    </p>
                  </CollapsibleStory>
                </div>
              </article>

              {/* Abu Dhabi */}
              <article className="case reveal">
                <header className="casewho">
                  <h3 className="casedim disp">Systems at scale</h3>
                  <p className="caseco">Abu Dhabi Government · via Systems Limited</p>
                  <p className="caseyr">Abu Dhabi · 2020 to 2021</p>
                  <svg className="glyph" viewBox="0 0 34 34" aria-hidden="true"><rect x="8" y="5" width="18" height="24" rx="2" /><circle cx="17" cy="13" r="3.5" /><path d="M11 23 q6 -5 12 0" /><line x1="3" y1="17" x2="31" y2="17" strokeDasharray="2 3" /></svg>
                </header>
                <div className="casewhat">
                  <p className="lead disp">
                  <span className="em">
                    As application-side tech lead, I led the build of the app Abu
                    Dhabi used to reopen to travel during COVID
                  </span>
                  , verifying vaccination at visa time{" "}
                  <span className="hl">
                    so the airport gates never turned into queues
                  </span>
                  .
                </p>
                  <aside className="outcomes">
                    <ul className="outlist">
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Over half a million travelers cleared it</b>: the
                        mandatory vaccination check, at the e-gate or by an
                        officer&rsquo;s passport scan
                      </span>
                    </li>
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Built in 4 months</b>: February to May 2021, a five-person
                        team under pandemic pressure
                      </span>
                    </li>
                    <li>
                      <span className="mk" />
                      <span>
                        <b>Built for 2G</b>, so labs and embassies could upload
                        from anywhere, behind a GraphQL BFF that hid the real APIs
                      </span>
                    </li>
                  </ul>
                  </aside>
                  <AbuDhabiSpecimen />
                  <CollapsibleStory>
                    <p>
                      The world needed to reopen, and vaccinated travel was the
                      way, but checking that at the gate would mean long queues.
                      So the check moved upstream: a traveler was vaccinated at
                      visa time, and their lab or embassy uploaded the proof to
                      the portal before the flight. By arrival, Abu Dhabi already
                      knew. Travelers whose passports the e-gates could read
                      cleared themselves; for everyone else, an officer scanned
                      the passport and the status came straight back. Every
                      traveler through the airport, verified, and we shipped it in four
                      months, working day and night.
                    </p>
                    <p>
                      My side was the application layer and QA. The proof came
                      from labs and embassies all over the world, some on
                      connections you couldn&rsquo;t count on (like Uganda), so I
                      built the upload side to work on 2G, and put a GraphQL
                      backend-for-frontend in front of the Azure APIs: every
                      screen pulled exactly what it needed, with the real
                      endpoints and sensitive health data never exposed to the
                      browser.
                    </p>
                  </CollapsibleStory>
                </div>
              </article>
            </div>
            <p className="workclose disp reveal">
              None of these were in a field I already knew. Hand me an
              unfamiliar problem and I start building, learn the domain on the
              way through, and ship something real at the end. That is the
              part of the work I like most.
            </p>
          </div>
        </section>



        {/* Working with teams */}
        <section className="section band" id="teams">
          <div className="wrap">
            <div className="sechead reveal">
              <h2 className="sectitle disp">Working with teams</h2>
            </div>
            <div className="approach reveal">
              <p>
                Most of my work is shipping. When a product needed a team run, I
                ran it: ten engineers at Droobi as the only one on site, setting
                the standards and the delivery cadence while building the web
                frontend myself; five on the national screening platform in Abu
                Dhabi, delivered in four months; two freelancers at Mustaa, where
                I designed the system as CTO. I hire, review and mentor.{" "}
                <span className="em">
                  I&rsquo;d rather be measured by what the team shipped than by my
                  title.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="sechead reveal">
              <h2 className="sectitle disp">Capabilities</h2>
            </div>
            <div className="skillgrid reveal">
              <div className="skill">
                <span className="skillname disp">Next.js &amp; React</span>
                <span className="skilltech">
                  App Router{" "}<span className="sep">·</span>{" "}TypeScript
                  {" "}<span className="sep">·</span>{" "}React Query
                  {" "}<span className="sep">·</span>{" "}Zustand
                  {" "}<span className="sep">·</span>{" "}multi-step flows
                </span>
              </div>
              <div className="skill">
                <span className="skillname disp">Node.js &amp; AWS</span>
                <span className="skilltech">
                  Lambda{" "}<span className="sep">·</span>{" "}Step Functions
                  {" "}<span className="sep">·</span>{" "}SQS
                  {" "}<span className="sep">·</span>{" "}DynamoDB
                  {" "}<span className="sep">·</span>{" "}Cognito
                  {" "}<span className="sep">·</span>{" "}NestJS
                </span>
              </div>
              <div className="skill">
                <span className="skillname disp">Payments</span>
                <span className="skilltech">
                  Stripe{" "}<span className="sep">·</span>{" "}Twikey
                  {" "}<span className="sep">·</span>{" "}SEPA / iDEAL direct debit
                </span>
              </div>
              <div className="skill">
                <span className="skillname disp">Identity &amp; Auth</span>
                <span className="skilltech">
                  Cognito{" "}<span className="sep">·</span>{" "}Auth0
                  {" "}<span className="sep">·</span>{" "}Clerk
                  {" "}<span className="sep">·</span>{" "}Keycloak
                  {" "}<span className="sep">·</span>{" "}2FA
                </span>
              </div>
              <div className="skill">
                <span className="skillname disp">Delivery &amp; Quality</span>
                <span className="skilltech">
                  GitHub Actions{" "}<span className="sep">·</span>{" "}GitLab CI
                  {" "}<span className="sep">·</span>{" "}AWS CodeBuild
                  {" "}<span className="sep">·</span>{" "}SonarQube
                  {" "}<span className="sep">·</span>{" "}Jira
                </span>
              </div>
              <div className="skill">
                <span className="skillname disp">Observability</span>
                <span className="skilltech">
                  Sentry{" "}<span className="sep">·</span>{" "}New Relic
                  {" "}<span className="sep">·</span>{" "}Amplitude
                </span>
              </div>
            </div>
            <p className="certpill reveal">
              <span className="certdot" aria-hidden="true" />
              <span>
                <b>AWS Certified Developer, Associate</b>
                <span className="certsep" aria-hidden="true">
                  ·
                </span>
                exam booked
              </span>
            </p>
          </div>
        </section>

        {/* Earlier career */}
        <Timeline />
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
                Looking for a senior or lead engineering role at a company that
                takes engineering seriously and keeps evolving. If that&rsquo;s
                you, say hello.
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
        </div>
      </footer>
    </>
  );
}
