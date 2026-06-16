export default function ATS2({ data = {} }) {
  return (
    <article className="ats2-template cv-print-area">
      <aside className="ats2-sidebar">
        <header className="ats2-name-block">
          <h1>{formatName(data.name) || "ALEXANDER BLAKE"}</h1>
        </header>

        <ATS2SideSection title="Skills">
          {data.skills?.length > 0 ? (
            <ul className="ats2-side-list">
              {data.skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          ) : (
            <ul className="ats2-side-list">
              <li>Python (Pandas, PySpark): Expert</li>
              <li>SQL (PostgreSQL, BigQuery): Expert</li>
              <li>AWS (S3, Lambda, Redshift): Expert</li>
              <li>Data Modeling & Warehousing: Expert</li>
              <li>ETL/ELT Pipelines: Expert</li>
              <li>Git, Docker, CI/CD: Advanced</li>
              <li>Snowflake & Databricks: Advanced</li>
            </ul>
          )}
        </ATS2SideSection>

        <ATS2SideSection title="Courses">
          {data.courses?.length > 0 ? (
            <ul className="ats2-course-list">
              {data.courses.map((course) => (
                <li key={course.id}>
                  <strong>{course.name}</strong>
                  {course.institution && <span>{course.institution}</span>}
                  {course.period && <small>{course.period}</small>}
                  {course.location && <small>{course.location}</small>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="ats2-course-list">
              <li>
                <strong>Data Engineering, University of Texas</strong>
                <small>Feb 2022 – May 2022</small>
                <small>Austin</small>
              </li>

              <li>
                <strong>
                  Scalable ETL Systems, UT Austin McCombs School of Business
                </strong>
                <small>Sep 2021 – Dec 2021</small>
                <small>Austin</small>
              </li>
            </ul>
          )}
        </ATS2SideSection>
      </aside>

      <main className="ats2-main">
        <section className="ats2-top">
          <h2>{data.role || "Data Engineer"}</h2>

          <div className="ats2-contact">
            <span>{data.phone || "(737) 212-6384"}</span>
            <span>{data.email || "nblake.data@gmail.com"}</span>
            <span>
              {formatLocation(data.city, data.postalCode) ||
                "301 Brazos Street, Austin"}
            </span>
          </div>
        </section>

        <ATS2MainSection title="Summary">
          <p>
            {formatSummary(data.summary) ||
              "Data Engineer with over 6 years of experience building reliable, scalable pipelines and supporting fast, clean access to data. Skilled in Python, SQL, and modern cloud tools, I work closely with product, analytics, and engineering teams to make sure data is ready when it’s needed."}
          </p>
        </ATS2MainSection>

        <ATS2MainSection title="Work Experience">
          {data.experience?.length > 0 ? (
            data.experience.map((item) => (
              <ATS2ExperienceItem
                key={item.id}
                position={item.position}
                company={item.company}
                location={item.location}
                period={item.period}
                desc={item.desc}
              />
            ))
          ) : (
            <>
              <ATS2ExperienceItem
                position="Senior Data Engineer"
                company="Modexa Analytics"
                location="Austin"
                period="March 2020 – Present"
                desc={`Built and maintained ETL workflows handling over 20M daily events
Led a company-wide migration from Redshift to Snowflake
Integrated Kafka for real-time streaming, powering ops dashboards
Helped product and marketing define KPIs and automate reporting
Designed version-controlled data models using DBT and GitHub
Implemented CI/CD pipelines to auto-deploy schema changes
Set up alerting and logging for pipeline health monitoring
Trained junior engineers and built internal onboarding docs`}
              />

              <ATS2ExperienceItem
                position="Data Engineer"
                company="Quantari Systems"
                location="Austin"
                period="July 2017 – Feb 2020"
                desc={`Built pipelines with Python and Airflow for marketing attribution
Created data marts in BigQuery to support business dashboards
Reduced batch job runtime by 50% through smart partitioning
Modeled clean datasets for Looker and Tableau teams
Worked with QA to validate daily loads and catch data issues early
Migrated legacy SQL scripts to modular Python workflows
Contributed to company-wide data dictionary and field naming standards
Participated in sprint planning and cross-functional backlog grooming`}
              />
            </>
          )}
        </ATS2MainSection>

        <ATS2MainSection title="Education">
          {data.education?.length > 0 ? (
            data.education.map((item) => (
              <ATS2EducationItem
                key={item.id}
                degree={item.degree}
                school={item.school}
                location={item.location}
                period={item.period}
              />
            ))
          ) : (
            <>
              <ATS2EducationItem
                degree="M.S. in Information Studies"
                school="University of Texas"
                location="Austin"
                period="September 2015 — September 2017"
              />

              <ATS2EducationItem
                degree="B.S. in Computer Science"
                school="Texas State University"
                location="San Marcos"
                period="September 2011 — May 2015"
              />
            </>
          )}
        </ATS2MainSection>

        <ATS2MainSection title="References">
          {data.references?.length > 0 ? (
            <div className="ats2-reference-list">
              {data.references.map((item) => (
                <ATS2ReferenceItem
                  key={item.id}
                  name={item.name}
                  company={item.company}
                  email={item.email}
                  phone={item.phone}
                />
              ))}
            </div>
          ) : (
            <div className="ats2-reference-list">
              <ATS2ReferenceItem
                name="Trina Ortega"
                company="Modexa Analytics"
                email="trina.ortega@gmail.com"
                phone="(512) 889-4401"
              />

              <ATS2ReferenceItem
                name="Harold Sung"
                company="Quantari Systems"
                email="h.sung@gmail.com"
                phone="(737) 555-2714"
              />
            </div>
          )}
        </ATS2MainSection>
      </main>
    </article>
  );
}

function ATS2SideSection({ title, children }) {
  return (
    <section className="ats2-side-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ATS2MainSection({ title, children }) {
  return (
    <section className="ats2-main-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ATS2ExperienceItem({ position, company, location, period, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats2-exp-item">
      <div className="ats2-exp-head">
        <div>
          <h3>{position || "Job Position"}</h3>
          <strong>{company || "Company Name"}</strong>
        </div>

        <div className="ats2-exp-meta">
          <span>{location || ""}</span>
          <span>{period || ""}</span>
        </div>
      </div>

      {bullets.length > 0 && (
        <ul className="ats2-main-list">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ATS2EducationItem({ degree, school, location, period }) {
  return (
    <div className="ats2-edu-item">
      <div>
        <h3>{degree || "Degree / Major"}</h3>
        <strong>{school || "University Name"}</strong>
      </div>

      <div className="ats2-edu-meta">
        <span>{location || ""}</span>
        <span>{period || ""}</span>
      </div>
    </div>
  );
}

function ATS2ReferenceItem({ name, company, email, phone }) {
  return (
    <div className="ats2-reference-item">
      <strong>
        {name || "Reference Name"}
        {company ? `, ${company}` : ""}
      </strong>

      <p>
        {[email, phone].filter(Boolean).join("  •  ") ||
          "email@example.com  •  000-000-0000"}
      </p>
    </div>
  );
}

function splitBullets(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter((item) => item.length > 0);
}

function formatName(name = "") {
  const cleanName = String(name).trim();

  if (!cleanName) return "";

  const words = cleanName.split(/\s+/);

  if (words.length === 1) return words[0].toUpperCase();

  const firstName = words[0];
  const lastName = words.slice(1).join(" ");

  return `${firstName}\n${lastName}`.toUpperCase();
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
