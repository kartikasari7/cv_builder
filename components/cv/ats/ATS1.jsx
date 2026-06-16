export default function ATS1({ data = {} }) {
  const contactItems = [
    data.phone,
    data.email,
    data.linkedin,
    data.portfolio,
  ].filter(Boolean);

  return (
    <article className="ats1-template cv-print-area">
      <header className="ats1-header">
        <h1>{data.name || "BASKARA ANTONIO"}</h1>

        <div className="ats1-contact">
          {contactItems.length > 0 ? (
            contactItems.map((item, index) => (
              <span key={index}>
                <span className={isLinkText(item) ? "ats1-link" : ""}>
                  {item}
                </span>

                {index < contactItems.length - 1 && (
                  <span className="ats1-separator">|</span>
                )}
              </span>
            ))
          ) : (
            <>
              <span>082389007652</span>
              <span className="ats1-separator">|</span>
              <span className="ats1-link">baskaraantonio@gmail.com</span>
              <span className="ats1-separator">|</span>
              <span className="ats1-link">linkedin.com/in/baskara antonio</span>
              <span className="ats1-separator">|</span>
              <span className="ats1-link">suratplus.com</span>
            </>
          )}
        </div>

        <p className="ats1-location">
          {formatLocation(data.city, data.postalCode) ||
            "Jakarta Selatan, Daerah Khusus Ibukota Jakarta, 12560"}
        </p>
      </header>

      <p className="ats1-summary">
        {formatSummary(data.summary) ||
          "I am a law graduate student looking for opportunities in legal compliance, regulation researching and legal drafting with a background in private and corporate law."}
      </p>

      <ATSSection title="Education">
        {data.education?.length > 0 ? (
          data.education.map((item) => (
            <ATSItem
              key={item.id}
              title={item.school}
              location={item.location}
              subtitle={
                <>
                  {item.degree}
                  {item.gpa ? ` | GPA: ${item.gpa}` : ""}
                </>
              }
              period={item.period}
              desc={item.desc}
            />
          ))
        ) : (
          <ATSItem
            title="Syiah Kuala University"
            location="Banda Aceh, Aceh"
            subtitle="Bachelor Degree in Law | GPA: 3.85/4.00"
            period="Aug 19 - Nov 23"
            desc={`Head of Syiah Kuala Debating Club, 2019-2029
Member of Syiah Kuala International Law Society (SKILS.), 2019-now
Head of International Journal Project Teams with 2345 readers on IUS Journal in 2023`}
          />
        )}
      </ATSSection>

      <ATSSection title="Work Experience">
        {data.experience?.length > 0 ? (
          data.experience.map((item) => (
            <ATSItem
              key={item.id}
              title={item.company}
              location={item.location}
              subtitle={joinText(item.position, item.type)}
              period={item.period}
              desc={item.desc}
            />
          ))
        ) : (
          <>
            <ATSItem
              title="PT Bank Negara Indonesia"
              location="Jakarta, Indonesia"
              subtitle="Legal and Compliance Officer-Full Time"
              period="Jun 20 - Jul 23 (Present)"
              desc={`Evaluated compliance processes and risk assessment goals to offer solutions that were particularly fit for the needs of the client: resulted in 85% client satisfactions within 8 months.
Addressed several legal compliance issues, consulted with company counsel when necessary, reduced minor litigations by 8.9% yearly.
Assisted employees in communicating with management, seeking clarity on difficulties or challenges, or reporting anomalies in private legal matters, enhanced employee and employer relationship by 65% and freedom of speech and employee participation and inclusion.
Provided guidance and support to business units on compliance matters, including contract review, third-party due diligence, and risk assessments.`}
            />

            <ATSItem
              title="PT Freeport Indonesia"
              location="Bandung, Indonesia"
              subtitle="Legal Staff-Internship"
              period="Jun 19 - Jul 20"
              desc={`Legal Research: assigning legal research tasks, analyzing and summarizing legal documents and presenting findings to senior staff.
Case Support: preparing for litigation or administrative proceedings by organizing case files, conducting factual investigations, and assisting in the preparation of legal arguments.`}
            />
          </>
        )}
      </ATSSection>

      <ATSSection title="Related Experiences">
        {data.organizations?.length > 0 ? (
          data.organizations.map((item) => (
            <ATSItem
              key={item.id}
              title={item.org}
              location={item.location}
              subtitle={item.role}
              period={item.period}
              desc={item.desc}
            />
          ))
        ) : (
          <>
            <ATSItem
              title="ASEAN Youth Advocate Network (AYAN Indonesia)"
              location="Jakarta, Indonesia"
              subtitle="Director for Research and Education"
              period="Apr 20 - Oct 21"
              desc={`Leading a team of 20 individuals from various regions in Indonesia to execute the objectives of the division
Researching and publishing legal opinions on political and economic issues in ASEAN
Leading the ASEAN Youth Advocacy Conference attended by 13 representatives from ASEAN state member in Jakarta.`}
            />

            <ATSItem
              title="Hukum Online"
              location="Jakarta, Indonesia"
              subtitle="Legal Writer"
              period="Apr 22 - Oct 23"
              desc={`Drafting the legal articles, which have been read by 4321 users.
Giving solution to the user questions regarding legal issues by providing legal solutions based on Indonesia regulation.
Since 2022 I have helped 265 user to solve their problems.`}
            />
          </>
        )}
      </ATSSection>

      <ATSSection title="Certification">
        {data.certifications?.length > 0 ? (
          <ul className="ats1-list">
            {data.certifications.map((item) => (
              <li key={item.id}>{formatCertification(item)}</li>
            ))}
          </ul>
        ) : (
          <ul className="ats1-list">
            <li>
              Certified Legal Compliance Professional (CLCP), LBBH, Nomor
              CLCP0762, 2022
            </li>
            <li>
              Certified Contract Drafter Professional, LBBH, Nomor CCDP098, 2021
            </li>
            <li>
              International English Language Testing System (IELTS), Universal
              English, Nomor IELST65872872, 2022
            </li>
          </ul>
        )}
      </ATSSection>

      <ATSSection title="Award">
        {data.awards?.length > 0 ? (
          <ul className="ats1-list">
            {data.awards.map((item) => (
              <li key={item.id}>{formatAward(item)}</li>
            ))}
          </ul>
        ) : (
          <ul className="ats1-list">
            <li>
              1st place in the Constitutional Debate Competition, DRP Republic
              of Indonesia
            </li>
            <li>
              2nd place in the ALSA Indonesia Legal Review Competition,
              Universitas Indonesia, 2021
            </li>
          </ul>
        )}
      </ATSSection>

      <ATSSection title="Skills">
        {data.skills?.length > 0 ? (
          <ul className="ats1-list">
            {data.skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          <ul className="ats1-list">
            <li>
              Hard Skill: Legal drafting, legal writing, legal research, and
              public speaking
            </li>
            <li>Software: Microsoft Office, Microsoft Excel, Aline GRC.</li>
          </ul>
        )}
      </ATSSection>
    </article>
  );
}

function ATSSection({ title, children }) {
  return (
    <section className="ats1-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ATSItem({ title, location, subtitle, period, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats1-item">
      <div className="ats1-row ats1-main-row">
        <strong>{title || "Nama Institusi / Perusahaan"}</strong>
        <strong>{location || ""}</strong>
      </div>

      <div className="ats1-row ats1-sub-row">
        <em>{subtitle || "Posisi / Program"}</em>
        <strong>{period || ""}</strong>
      </div>

      {bullets.length > 0 && (
        <ul className="ats1-list">
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
    .filter((item) => item.length > 0);
}

function isLinkText(text = "") {
  const value = String(text).toLowerCase();

  return (
    value.includes("@") ||
    value.includes("linkedin") ||
    value.includes(".com") ||
    value.includes("http")
  );
}

function joinText(first, second) {
  if (first && second) return `${first}-${second}`;
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

function formatCertification(item) {
  const parts = [];

  if (item.name) parts.push(item.name);
  if (item.issuer) parts.push(item.issuer);
  if (item.credential) parts.push(`Nomor ${item.credential}`);
  if (item.date) parts.push(item.date);

  return parts.join(", ");
}

function formatAward(item) {
  const parts = [];

  if (item.name) parts.push(item.name);
  if (item.organizer) parts.push(item.organizer);
  if (item.year) parts.push(item.year);

  return parts.join(", ");
}
