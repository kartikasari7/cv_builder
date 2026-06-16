export default function ATS3({ data = {} }) {
  return (
    <article className="ats3-template cv-print-area">
      <aside className="ats3-sidebar">
        <ProfilePhoto name={data.name} photo={data.photo} />

        <ATS3SideSection title="About Me">
          <p>
            {formatSummary(data.summary) ||
              "A highly analytical and detail-oriented professional with a background in solving complex problems. Proven ability to think logically and apply advanced research skills. Excellent communication and relationship-building abilities. Looking to apply these skills in an ATS Format Specialist role."}
          </p>
        </ATS3SideSection>

        <ATS3SideSection title="Links">
          <div className="ats3-link-list">
            <div>
              <strong>LinkedIn:</strong>
              <span>
                {data.linkedin || "www.linkedin.com/in/sherlockholmes"}
              </span>
            </div>

            <div>
              <strong>Portfolio:</strong>
              <span>{data.portfolio || "www.twitter.com/sherlockholmes"}</span>
            </div>
          </div>
        </ATS3SideSection>

        <ATS3SideSection title="Reference">
          {data.references?.length > 0 ? (
            data.references.slice(0, 1).map((item) => (
              <div className="ats3-reference" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.company}</p>
                <p>T: {item.phone}</p>
                <p>E: {item.email}</p>
              </div>
            ))
          ) : (
            <div className="ats3-reference">
              <h3>Dr. John Watson</h3>
              <p>Self-Employed</p>
              <p>T: +44 20 7224 3689</p>
              <p>E: john.watson@doctor.com</p>
            </div>
          )}
        </ATS3SideSection>

        <ATS3SideSection title="Hobbies">
          {data.hobbies?.length > 0 ? (
            <ul className="ats3-side-list">
              {data.hobbies.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <ul className="ats3-side-list">
              <li>Playing Violin</li>
              <li>Boxing</li>
              <li>Chemistry Experiments</li>
              <li>Reading</li>
              <li>Observation Skills</li>
            </ul>
          )}
        </ATS3SideSection>
      </aside>

      <main className="ats3-main">
        <header className="ats3-header">
          <div>
            <h1>{formatName(data.name) || "SHERLOCK\nHOLMES"}</h1>
            <p>{data.role || "ATS Format Specialist"}</p>
          </div>

          <div className="ats3-contact">
            <ContactItem icon="📍">
              {formatLocation(data.city, data.postalCode) ||
                "221B Baker Street, London, London, NW1 6XE, United Kingdom"}
            </ContactItem>

            <ContactItem icon="☎">
              {data.phone || "+44 20 7224 3688"}
            </ContactItem>

            <ContactItem icon="✉">
              {data.email || "sherlock.holmes@detective.com"}
            </ContactItem>
          </div>
        </header>

        <ATS3MainSection title="Work Experience">
          {data.experience?.length > 0 ? (
            data.experience.map((item) => (
              <TimelineItem
                key={item.id}
                leftTitle={item.company}
                leftSub={item.location}
                leftDate={item.period}
                title={joinText(item.position, item.type)}
                desc={item.desc}
              />
            ))
          ) : (
            <>
              <TimelineItem
                leftTitle="Self-Employed"
                leftSub="London"
                leftDate="Mar 1881 - Apr 1904"
                title="Private Detective"
                desc={`Solved complex cases using analytical skills and logical reasoning
Developed advanced research and information gathering skills
Utilized excellent attention to detail in analyzing evidence
Demonstrated exceptional problem-solving abilities`}
              />

              <TimelineItem
                leftTitle="Scotland Yard"
                leftSub="London"
                leftDate="Mar 1881 - Apr 1904"
                title="Consultant"
                desc={`Assisted in solving complex criminal cases
Provided expert advice and insights based on evidence analysis
Developed strong relationships with law enforcement officials
Demonstrated high level of confidentiality and professionalism`}
              />
            </>
          )}
        </ATS3MainSection>

        <ATS3MainSection title="Education">
          {data.education?.length > 0 ? (
            data.education.map((item) => (
              <TimelineItem
                key={item.id}
                leftTitle={item.school}
                leftSub={item.location}
                leftDate={item.period}
                title={formatEducationTitle(item)}
                desc={item.desc}
              />
            ))
          ) : (
            <>
              <TimelineItem
                leftTitle="University of Cambridge"
                leftSub="Cambridge"
                leftDate="1878"
                title="Bachelor's in Chemistry"
                desc={`Specialized in Organic and Inorganic Chemistry
Conducted extensive research on various chemical compounds`}
              />

              <TimelineItem
                leftTitle="University of London"
                leftSub="London"
                leftDate="1880"
                title="Diploma in Criminology"
                desc={`Studied criminal behavior and crime prevention methods
Conducted research on various aspects of criminal psychology`}
              />
            </>
          )}
        </ATS3MainSection>

        <ATS3MainSection title="Skills">
          {data.skills?.length > 0 ? (
            <div className="ats3-bar-grid">
              {data.skills.map((skill) => {
                const parsed = parseBarItem(skill.name);

                return (
                  <BarItem
                    key={skill.id}
                    label={parsed.label}
                    value={parsed.value}
                  />
                );
              })}
            </div>
          ) : (
            <div className="ats3-bar-grid">
              <BarItem label="Analytical Thinking" value={95} />
              <BarItem label="Problem Solving" value={100} />
              <BarItem label="Research" value={90} />
              <BarItem label="Attention to Detail" value={100} />
              <BarItem label="Logical Reasoning" value={90} />
              <BarItem label="Communication" value={85} />
            </div>
          )}
        </ATS3MainSection>

        <ATS3MainSection title="Languages">
          {data.languages?.length > 0 ? (
            <div className="ats3-bar-grid">
              {data.languages.map((language) => (
                <BarItem
                  key={language.id}
                  label={language.name}
                  value={Number(language.level) || 80}
                />
              ))}
            </div>
          ) : (
            <div className="ats3-bar-grid">
              <BarItem label="English" value={100} />
              <BarItem label="French" value={100} />
              <BarItem label="German" value={40} />
            </div>
          )}
        </ATS3MainSection>
      </main>
    </article>
  );
}

function ProfilePhoto({ name, photo }) {
  if (photo) {
    return (
      <div className="ats3-photo">
        <img src={photo} alt={name || "Profile"} />
      </div>
    );
  }

  return (
    <div className="ats3-photo ats3-photo-placeholder">
      <span>{getInitials(name || "Sherlock Holmes")}</span>
    </div>
  );
}

function ATS3SideSection({ title, children }) {
  return (
    <section className="ats3-side-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ATS3MainSection({ title, children }) {
  return (
    <section className="ats3-main-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ContactItem({ icon, children }) {
  return (
    <div className="ats3-contact-item">
      <span>{icon}</span>
      <p>{children}</p>
    </div>
  );
}

function TimelineItem({ leftTitle, leftSub, leftDate, title, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats3-timeline-item">
      <div className="ats3-timeline-left">
        <h3>{leftTitle || "Institution / Company"}</h3>
        <p>{leftSub || ""}</p>
        <span>{leftDate || ""}</span>
      </div>

      <div className="ats3-timeline-line">
        <span />
      </div>

      <div className="ats3-timeline-right">
        <h3>{title || "Title"}</h3>

        {bullets.length > 0 && (
          <ul>
            {bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BarItem({ label, value = 80 }) {
  const safeValue = Math.max(5, Math.min(Number(value) || 80, 100));

  return (
    <div className="ats3-bar-item">
      <p>{label}</p>
      <div className="ats3-bar">
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

function splitBullets(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function formatName(name = "") {
  const clean = String(name).trim();

  if (!clean) return "";

  const words = clean.split(/\s+/);

  if (words.length === 1) return words[0].toUpperCase();

  return `${words[0]}\n${words.slice(1).join(" ")}`.toUpperCase();
}

function getInitials(name = "") {
  return String(name)
    .split(/\s+/)
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function joinText(first, second) {
  if (first && second) return `${first}`;
  if (first) return first;
  if (second) return second;
  return "";
}

function formatLocation(city, postalCode) {
  const parts = [];

  if (city) parts.push(city);
  if (postalCode) parts.push(postalCode);

  return parts.join(", ");
}

function formatSummary(summary = "") {
  return String(summary)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
}

function formatEducationTitle(item = {}) {
  const parts = [];

  if (item.degree) parts.push(item.degree);
  if (item.gpa) parts.push(`GPA: ${item.gpa}`);

  return parts.join(" | ");
}

function parseBarItem(text = "") {
  const value = String(text).trim();

  if (!value) {
    return {
      label: "Skill",
      value: 80,
    };
  }

  const parts = value.split(":");

  if (parts.length < 2) {
    return {
      label: value,
      value: 80,
    };
  }

  const label = parts[0].trim();
  const levelText = parts.slice(1).join(":").trim().toLowerCase();

  const levelMap = {
    beginner: 35,
    basic: 35,
    intermediate: 60,
    advanced: 80,
    expert: 100,
  };

  const numberLevel = parseInt(levelText, 10);

  return {
    label,
    value: Number.isNaN(numberLevel) ? levelMap[levelText] || 80 : numberLevel,
  };
}
