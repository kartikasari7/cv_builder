export default function ATS5({ data = {} }) {
  return (
    <article className="ats5-template cv-print-area">
      <header className="ats5-header">
        <div className="ats5-top-line" />

        <p className="ats5-contact">
          {formatContact(data) ||
            "NEW YORK, USA • MAILTO:HELENWILLIS@GMAIL.COM • (917) 555-2381"}
        </p>

        <h1>{data.name || "HELEN WILLIS"}</h1>

        <p className="ats5-role">{data.role || "Administrative Assistant"}</p>
      </header>

      <ATS5Section title="Professional Summary">
        <p className="ats5-summary">
          {formatSummary(data.summary) ||
            "Experienced administrative professional with over 6 years supporting busy executives and keeping office operations running smoothly. Skilled in managing calendars, booking travel, handling day-to-day logistics, and improving internal processes. Known for staying organized under pressure, communicating clearly, and being the go-to person for getting things done."}
        </p>
      </ATS5Section>

      <ATS5Section title="Work Experience">
        {data.experience?.length > 0 ? (
          data.experience.map((item) => (
            <ATS5Item
              key={item.id}
              title={item.position}
              subtitle={item.company}
              period={item.period}
              location={item.location}
              desc={item.desc}
            />
          ))
        ) : (
          <>
            <ATS5Item
              title="Executive Administrative Assistant"
              subtitle="BrightLine Consulting"
              period="Mar 2019 — Present"
              location="New York, NY"
              desc={`Support the VP of Operations and leadership team with daily admin tasks
Manage calendars, travel bookings, and internal communication
Improved document workflow, cutting delays by 30%
Organize executive meetings, prepare agendas, and track follow-ups
Oversee new hire onboarding and system setup
Coordinate with clients and vendors for scheduling and billing`}
            />

            <ATS5Item
              title="Office Administrator"
              subtitle="Evermore Tech Solutions"
              period="Aug 2018 — Mar 2019"
              location="New York, NY"
              desc={`Oversaw daily front office operations, including reception, scheduling, and supply inventory management
Handled office correspondence, answered phones, and managed email inquiries
Assisted HR with interview scheduling, onboarding, background checks, and maintaining personnel files`}
            />
          </>
        )}
      </ATS5Section>

      <ATS5Section title="Languages">
        {data.languages?.length > 0 ? (
          <p className="ats5-inline-text">
            {data.languages
              .map((item) => {
                if (item.name && item.level) {
                  return `${item.name} (${item.level})`;
                }

                return item.name || item.level;
              })
              .filter(Boolean)
              .join(", ")}
            .
          </p>
        ) : (
          <p className="ats5-inline-text">
            English <em>(Native)</em>, German <em>(Fluent)</em>, Ukrainian{" "}
            <em>(Basic)</em>.
          </p>
        )}
      </ATS5Section>

      <ATS5Section title="Education">
        {data.education?.length > 0 ? (
          data.education.map((item) => (
            <ATS5Item
              key={item.id}
              title={item.degree}
              subtitle={item.school}
              period={item.period}
              location={item.location}
              desc={item.desc}
            />
          ))
        ) : (
          <>
            <ATS5Item
              title="Master of Science in Management"
              subtitle="New York University, Stern School of Business"
              period="2016 — 2018"
              location="New York"
              desc={`Studied leadership, operations, and organizational strategy
Led a group project helping a local nonprofit improve internal processes`}
            />

            <ATS5Item
              title="Bachelor of Arts in Business Administration"
              subtitle="Baruch College, City University of New York"
              period="2012 — 2016"
              location="New York"
              desc={`Studied core areas of business including management, operations, and organizational behavior
Graduated with distinction`}
            />
          </>
        )}
      </ATS5Section>

      <ATS5Section title="Skills">
        {data.skills?.length > 0 ? (
          <p className="ats5-inline-text">
            {data.skills.map((skill) => skill.name).join(", ")}.
          </p>
        ) : (
          <p className="ats5-inline-text">
            Office and team coordination <em>(Expert)</em>, Calendar & travel
            management <em>(Expert)</em>, Microsoft Office <em>(Expert)</em>,
            Expense tracking <em>(Expert)</em>, Client & vendor support{" "}
            <em>(Expert)</em>, Confidential information handling{" "}
            <em>(Expert)</em>, Onboarding support <em>(Expert)</em>, Project
            tools <em>(Expert)</em>.
          </p>
        )}
      </ATS5Section>

      <ATS5Section title="Hobbies">
        {data.hobbies?.length > 0 ? (
          <p className="ats5-inline-text">
            {data.hobbies
              .map((item) => item.name)
              .filter(Boolean)
              .join(". ")}
            .
          </p>
        ) : (
          <p className="ats5-inline-text">
            I absolutely adore discovering new cafes throughout the city, often
            losing myself in a captivating book while enjoying a warm cup of
            coffee. My rescue dog, Max, is my loyal companion on long walks,
            where we explore hidden gems and vibrant parks.
          </p>
        )}
      </ATS5Section>
    </article>
  );
}

function ATS5Section({ title, children }) {
  return (
    <section className="ats5-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ATS5Item({ title, subtitle, period, location, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats5-item">
      <div className="ats5-item-head">
        <div>
          <h3>{title || "Position / Degree"}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="ats5-item-meta">
          {period && <strong>{period}</strong>}
          {location && <span>{location}</span>}
        </div>
      </div>

      {bullets.length > 0 && (
        <ul className="ats5-list">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function splitBullets(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function formatSummary(summary = "") {
  return String(summary)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
}

function formatContact(data = {}) {
  const location = formatLocation(data.city, data.postalCode);
  const email = data.email ? `MAILTO:${data.email.toUpperCase()}` : "";
  const phone = data.phone || "";

  return [location?.toUpperCase(), email, phone].filter(Boolean).join(" • ");
}

function formatLocation(city, postalCode) {
  const parts = [];

  if (city) parts.push(city);
  if (postalCode) parts.push(postalCode);

  return parts.join(", ");
}
