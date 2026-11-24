import { HeroMedia } from "@/components/HeroMedia";
import { RevealObserver } from "@/components/RevealObserver";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";
import { CaseRow } from "@/components/CaseRow";
import { Note } from "@/components/Note";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { PERSON } from "@/lib/site";
import { formatDate, getPosts } from "@/lib/writing";
import {
  FidamySpecimen,
  DroobiSpecimen,
  MustaaSpecimen,
  AbuDhabiSpecimen,
} from "@/components/Specimens";

// For search engines: who this site is about. Posts point their author here.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: PERSON,
};

const CAPABILITIES = [
  { name: "Next.js & React", tech: "App Router, TypeScript, React Query, Zustand, multi-step flows" },
  { name: "Node.js & AWS", tech: "Lambda, Step Functions, SQS, DynamoDB, Cognito, NestJS" },
  { name: "Payments", tech: "Stripe, Twikey, SEPA / iDEAL direct debit" },
  { name: "Identity & Auth", tech: "Cognito, Auth0, Clerk, Keycloak, 2FA" },
  { name: "Delivery & Quality", tech: "GitHub Actions, GitLab CI, AWS CodeBuild, SonarQube, Jira" },
  { name: "Observability", tech: "Sentry, New Relic, Amplitude" },
  { name: "AI features", tech: "ElevenLabs text-to-speech and speech-to-text, Meshy character generation, Claude" },
];

const TEAMS = [
  { size: "10", where: "Droobi Health" },
  { size: "7", where: "MobileLive" },
  { size: "6", where: "Banzai" },
  { size: "5", where: "Abu Dhabi" },
];

export default function Home() {
  const [latest, ...others] = getPosts().slice(0, 3);
  return (
    <>
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="hero">
        <div className="heroglow" />
        <HeroMedia />
        <div className="herocontent">
          <div className="wrap">
            <p className="kick rise r1">Usman Tahir, senior product engineer in Amsterdam</p>
            <h1 className="h1 disp rise r1">
              Bring me a <span className="hili hili-load">hard product problem.</span>
            </h1>
            <p className="sub rise r2">
              I&rsquo;ll solve it, usually with AI. More than ten years of
              building and owning products end to end, across fintech,
              insurance and healthcare.
            </p>
            <div className="ctarow rise r3">
              <a
                className="btn btn-primary"
                href="/usman-tahir-cv.pdf"
                download="Usman-Tahir-CV.pdf"
              >
                Download CV
              </a>
              <a className="tlink" href="#contact">
                Get in touch
              </a>
            </div>
            {latest && (
              <Link className="heronew herolatest rise r4" href={`/writing/${latest.slug}`}>
                <b>New</b>
                <span className="heronewtitle">{latest.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="section band" id="work">
          <div className="wrap">
            <h2 className="sectitle disp">
              Problems <span className="hili reveal">I&rsquo;ve solved</span>
            </h2>
            <p className="secintro">
              Four products, four ways of owning one: from zero, inherited,
              founded, and at national scale.
            </p>
            <div className="ptable">
              <div className="prow phead" aria-hidden="true">
                <span>Where</span>
                <span>The problem</span>
                <span>What changed</span>
              </div>
              <CaseRow
                name="Fidamy"
                next="Droobi Health"
                where="Device insurance · Amsterdam · 2024 to 2026"
                problem="Insurance quotes inside retailer checkouts took about ten seconds, and every price call cost a vendor fee."
                result="Checkout conversion from about 20% to 67%, and quotes in under 100ms"
                outs={
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
                }
                figure={<FidamySpecimen />}
              >
                <p className="lead">
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
                <div className="prose">
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
                    <Note label="steps in the checkout">six at MVP, then five, then four</Note>
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
                    <Note label="quote load time">~10s to under 100ms</Note>
                    The other hard problem was speed, and cost. Our pricing
                    engine (Peak3) had no bulk-quote endpoint and billed per
                    API call, so four quotations meant four slow, metered
                    requests. Its pricing is deterministic, so I cached quotes
                    in our own price map and built the bulk endpoint it never
                    offered: quote loads dropped from ~10s to under 100ms, and
                    repeat pricing stopped costing us anything.
                  </p>
                  <p>
                    <Note>iDEAL and SEPA direct debit are how the Netherlands pays</Note>
                    Some decisions were about the business, not the code.
                    Moving payments from Stripe to Twikey wasn&rsquo;t a
                    technical flex: iDEAL and SEPA direct debit are how the
                    Netherlands pays, and direct-debit mandates were a hard
                    requirement for an insurer. What started as a purchase
                    form had become a distribution platform.
                  </p>

                </div>
              </CaseRow>
              <CaseRow
                name="Droobi Health"
                next="Mustaa"
                where="Digital health · Doha · 2019 to 2021"
                problem="A remote ten-person team across four platforms, and health data that by law could not go to the public cloud."
                result="About 10,000 patients across two major Doha hospitals, on an on-shore data centre"
                outs={
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
                        <b>on-shore Ooredoo data center</b>{" "}(no AWS/Azure) to
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
                }
                figure={<DroobiSpecimen />}
              >
                <p className="lead">
                  <span className="em">
                    I was recruited to a Qatari health startup as its first
                    engineer on the ground, and I immediately took over a{" "}
                    <span className="hl">ten-person cross-platform team</span>
                  </span>{" "}
                  (backend, Android, iOS, and web) while shipping the
                  product&rsquo;s frontend myself.
                </p>
                <div className="prose">
                  <p>
                    <Note>a referral, not a job posting</Note>
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
                    <Note>the single point where product, delivery, and cost all met</Note>
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
                    <Note>That one requirement shaped the entire platform</Note>
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

                </div>
              </CaseRow>
              <CaseRow
                name="Mustaa"
                next="Abu Dhabi Government"
                where="Fractional yachts · Rotterdam · 2023 to 2025"
                problem="Owning a yacht is out of reach for almost everyone, but people want the time on the water, not the asset."
                result="Shares capped at four per boat, and a 500+ member community"
                outs={
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
                }
                figure={<MustaaSpecimen />}
              >
                <p className="lead">
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
                <div className="prose">
                  <p>
                    <Note>four shares map onto the year</Note>
                    Owning a yacht is out of reach for almost everyone, but the
                    thing people actually want isn&rsquo;t the asset; it&rsquo;s
                    the time on the water. So we let people buy a fractional
                    share of a yacht, capped at four shares per boat, and
                    each share granted time tokens, one per day of use. That
                    cap was deliberate: four shares map onto the year, so the
                    platform could never promise more time than a boat
                    physically has. The deeper question was what happens when
                    you <em>don&rsquo;t</em>{" "}use yours, and the answer became
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
                    <Note>Each promise lived in exactly one place</Note>
                    So I kept the blockchain as the register of ownership and
                    nothing else; bookings, search, media, and euro payments
                    ran on a serverless AWS backend. Each promise lived in
                    exactly one place: the chain guaranteed a boat never had
                    more days than it physically has, and the database made
                    double-booking impossible.
                  </p>
                  <p>
                    <Note>The technology was never the point.</Note>
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

                </div>
              </CaseRow>
              <CaseRow
                name="Abu Dhabi Government"
                next="Fidamy"
                where="Via Systems Limited · 2020 to 2021"
                problem="Reopen to vaccinated travel during COVID without queues at the airport gates."
                result="Four portals around one visa ID, and over half a million travellers cleared"
                outs={
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
                }
                figure={<AbuDhabiSpecimen />}
              >
                <p className="lead">
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
                <div className="prose">
                  <p>
                    <Note>By arrival, Abu Dhabi already knew.</Note>
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
                    <Note>I built the upload side to work on 2G</Note>
                    My side was the application layer and QA. The proof came
                    from labs and embassies all over the world, some on
                    connections you couldn&rsquo;t count on (like Uganda), so I
                    built the upload side to work on 2G, and put a GraphQL
                    backend-for-frontend in front of the Azure APIs: every
                    screen pulled exactly what it needed, with the real
                    endpoints and sensitive health data never exposed to the
                    browser.
                  </p>

                </div>
              </CaseRow>
            </div>
            <p className="workclose disp">
              None of these were in a field I already knew. Hand me an
              unfamiliar problem and I start building, learn the domain on the
              way through, and ship something real at the end. That is the
              part of the work I like most.

            </p>
          </div>
        </section>

        {latest && (
          <section className="section" id="writing">
            <div className="wrap">
              <h2 className="sectitle disp">Writing</h2>
              <p className="secintro">
                How I build products with AI: what I tried, what broke, and the
                rule that came out of it.
              </p>
              <Link className={latest.card ? "postlead withcard" : "postlead"} href={`/writing/${latest.slug}`}>
                {latest.card && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="leadcard" src={latest.card.src} alt={latest.card.alt} width={1600} height={905} loading="lazy" />
                )}
                <span className="leadtext">
                  <span className="postdate">
                    Latest · <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                    {" · "}
                    {latest.minutes} min read
                  </span>
                  <span className="leadtitle disp">{latest.title}</span>
                  <span className="postdesc">{latest.description}</span>
                  <span className="tlink">Read the post</span>
                </span>
              </Link>
              {others.length > 0 && (
                <ul className="postlist">
                  {others.map((post) => (
                    <li key={post.slug}>
                      <Link className="postrow" href={`/writing/${post.slug}`}>
                        <span className="postdate">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </span>
                        <span className="postrowtext">
                          <span className="posttitle disp">{post.title}</span>
                          <span className="postdesc">{post.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <p className="homewritingmore">
                <Link className="tlink" href="/writing">All posts</Link>
              </p>
            </div>
          </section>
        )}

        <section className="section band" id="skills">
          <div className="wrap">
            <h2 className="sectitle disp">Capabilities</h2>
            <div className="capgrid">
              {CAPABILITIES.map((c) => (
                <div className="cap" key={c.name}>
                  <h3 className="disp">{c.name}</h3>
                  <p>{c.tech}</p>
                </div>
              ))}
            </div>
            <p className="certline">
              <b>Regulated work:</b>{" "}AFM-compliant insurance flows,
              HIPAA-aligned health data, and Qatar&rsquo;s health-data
              residency law.
            </p>
            <p className="certline">
              <b>AWS Certified Developer, Associate</b>, exam booked
            </p>
          </div>
        </section>

        <section className="section teams" id="teams">
          <div className="wrap">
            <div className="teamsgrid">
              <h2 className="sectitle disp">Working with teams</h2>
              <p>
                Most of my work is shipping. When a product needed a team run, I
                ran it: ten engineers at Droobi as the only one on site, setting
                the standards and the delivery cadence while building the web
                frontend myself; five on the national screening platform in Abu
                Dhabi, delivered in four months. I&rsquo;ve also shipped inside
                teams: seven at MobileLive, where I led the Freedom Mobile to
                Rogers integration, and six at Banzai, building AI voice and
                character features for CreateStudio. I hire, review and
                mentor.{" "}
                <span className="em">
                  I&rsquo;d rather be measured by what the team shipped than by my
                  title.
                </span>

              </p>
            </div>
            <div className="teamcount" aria-label="Teams I’ve worked in">
              {TEAMS.map((t) => (
                <div key={t.where}>
                  <b className="disp">{t.size}</b>
                  <span>{t.where}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Timeline />
      </main>

      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contactgrid">
            <div className="contactlead">
              <h2 className="sectitle disp">
                Got a <span className="hili reveal">hard problem?</span>
              </h2>
              <p className="cnote">
                Looking for a senior or lead engineering role at a company that
                takes engineering seriously and keeps evolving. If that&rsquo;s
                you, say hello.

              </p>
              <a className="cmail disp" href="mailto:hello@usmantahir.com">
                hello@usmantahir.com
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
