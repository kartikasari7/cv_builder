export default function ATS4({ data = {} }) {
  return (
    <article className="ats4-template cv-print-area">
      <aside className="ats4-sidebar">
        <div className="ats4-korean-title">이 력 서</div>

        <ProfilePhoto photo={data.photo} name={data.name} />

        <ATS4SideSection icon="👤" title="개인정보">
          <InfoRow label="생년월일" value={data.birthDate || "1997.04.15"} />
          <InfoRow label="연락처" value={data.phone || "010-1234-5678"} />
          <InfoRow label="이메일" value={data.email || "kje0123@email.com"} />
          <InfoRow
            label="주소"
            value={
              formatLocation(data.city, data.postalCode) ||
              "서울특별시 강남구 테헤란로 123"
            }
          />
          <InfoRow
            label="병역사항"
            value={data.military || "병역필 (2020.07~2022.01)"}
          />
        </ATS4SideSection>

        <ATS4SideSection icon="" title="보유역량">
          {data.skills?.length > 0 ? (
            <div className="ats4-rating-list">
              {data.skills.map((skill) => {
                const parsed = parseRatingItem(skill.name);

                return (
                  <RatingItem
                    key={skill.id}
                    label={parsed.label}
                    value={parsed.value}
                  />
                );
              })}
            </div>
          ) : (
            <div className="ats4-rating-list">
              <RatingItem label="데이터 분석" value={4} />
              <RatingItem label="마케팅 전략" value={5} />
              <RatingItem label="콘텐츠 기획" value={4} />
              <RatingItem label="커뮤니케이션" value={5} />
              <RatingItem label="MS Office" value={4} />
              <RatingItem label="GA / GTM" value={4} />
              <RatingItem label="Adobe (Ps, Ai)" value={3} />
            </div>
          )}
        </ATS4SideSection>

        <ATS4SideSection icon="🌐" title="어학능력">
          {data.languages?.length > 0 ? (
            <div className="ats4-language-list">
              {data.languages.map((item) => (
                <InfoRow
                  key={item.id}
                  label={item.name || "Language"}
                  value={item.level || "Intermediate"}
                />
              ))}
            </div>
          ) : (
            <div className="ats4-language-list">
              <InfoRow label="한국어" value="원어민" />
              <InfoRow label="영어" value="TOEIC 920 (2023.06)" />
              <InfoRow label="일본어" value="JLPT N2 (2022.12)" />
            </div>
          )}
        </ATS4SideSection>

        <ATS4SideSection icon="🏆" title="수상내역">
          {data.awards?.length > 0 ? (
            <ul className="ats4-side-bullets">
              {data.awards.map((item) => (
                <li key={item.id}>{formatAward(item)}</li>
              ))}
            </ul>
          ) : (
            <ul className="ats4-side-bullets">
              <li>2022.11 마케팅 아이디어 공모전 최우수상</li>
              <li>2021.09 교내 마케팅 경진대회 우수상</li>
              <li>2020.12 학과 학술제 우수 포스터상</li>
            </ul>
          )}
        </ATS4SideSection>

        <ATS4SideSection icon="📋" title="기타사항">
          {data.hobbies?.length > 0 ? (
            <ul className="ats4-side-bullets">
              {data.hobbies.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <ul className="ats4-side-bullets">
              <li>운전면허 1종 보통</li>
              <li>MBTI: ENFP</li>
              <li>취미: 여행, 사진 촬영, 독서</li>
            </ul>
          )}
        </ATS4SideSection>
      </aside>

      <main className="ats4-main">
        <header className="ats4-header">
          <div className="ats4-apply">
            지원부문: {data.role || "마케팅 / 신입"}
          </div>

          <div className="ats4-name-block">
            <h1>{formatKoreanName(data.name) || "김지은"}</h1>
            <span>{formatRomanName(data.name) || "KIM JI EUN"}</span>
          </div>

          <h2>{data.headline || "성장하는 마케터, 김지은입니다."}</h2>

          <p>
            {formatSummary(data.summary) ||
              "데이터 기반 분석과 창의적인 아이디어로 브랜드의 가치를 높이는 마케터가 되고 싶습니다. 다양한 경험을 통해 고객 인사이트를 도출하고, 효과적인 마케팅 전략을 실행해왔습니다."}
          </p>
        </header>

        <ATS4MainSection icon="🎓" title="학력사항">
          {data.education?.length > 0 ? (
            data.education.map((item) => (
              <ATS4Row
                key={item.id}
                period={item.period}
                title={item.school}
                subtitle={formatEducation(item)}
                location={item.location}
                desc={item.desc}
              />
            ))
          ) : (
            <ATS4Row
              period="2016.03 ~ 2020.08"
              title="서울대학교 경영대학 경영학과 (학사)"
              subtitle="전공: 마케팅 / 소비자행동 / 경영정보시스템 | 평점: 3.8 / 4.5"
              location="서울"
            />
          )}
        </ATS4MainSection>

        <ATS4MainSection icon="💼" title="경력사항">
          {data.experience?.length > 0 ? (
            data.experience.map((item) => (
              <ATS4Row
                key={item.id}
                period={item.period}
                title={`${item.company || ""} ${item.position || ""}`.trim()}
                subtitle={item.type}
                location={item.location}
                desc={item.desc}
              />
            ))
          ) : (
            <>
              <ATS4Row
                period="2023.02 ~ 현재"
                title="(주)마켓링크 마케팅팀 사원"
                location="서울"
                desc={`SNS 채널 운영 및 콘텐츠 기획 / 제작 (인스타그램, 블로그)
광고 캠페인 운영 및 성과 분석 (GA4, Meta Ads)
월간 마케팅 리포트 작성 및 개선안 제안`}
              />

              <ATS4Row
                period="2021.07 ~ 2022.12"
                title="(주)브랜드온 마케팅 인턴"
                location="서울"
                desc={`시장조사 및 경쟁사 분석을 통한 마케팅 전략 수립 지원
프로모션 기획, 온/오프라인 이벤트 운영 보조
콘텐츠 발행 후 성과 데이터 정리 및 인사이트 도출`}
              />

              <ATS4Row
                period="2020.03 ~ 2020.12"
                title="교내 마케팅 동아리 ‘마케터스’ 기획팀장"
                location="서울"
                desc={`팀 프로젝트 기획 및 실행 총괄 (7인 팀)
제휴사와의 협업 마케팅 진행 및 성과 보고
신입부원 교육 및 워크숍 진행`}
              />
            </>
          )}
        </ATS4MainSection>

        <ATS4MainSection icon="📁" title="프로젝트">
          {data.projects?.length > 0 ? (
            data.projects.map((item) => (
              <ATS4Row
                key={item.id}
                period={item.period}
                title={item.name}
                subtitle={item.role}
                location=""
                desc={item.desc}
              />
            ))
          ) : (
            <>
              <ATS4Row
                period="2023.05"
                title="Z세대 대상 친환경 화장품 브랜드 캠페인 제안"
                desc={`설문조사 및 인터뷰 진행 (N=200)
타깃 인사이트 도출 및 IMC 캠페인 전략 수립
최종 제안서 발표, 내부 평가 1위`}
              />

              <ATS4Row
                period="2022.09"
                title="여행 플랫폼 리브랜딩 마케팅 전략 수립"
                desc={`브랜드 진단 및 리서치를 통한 문제점 도출
브랜드 아이덴티티 재정립 및 실행 플랜 제안`}
              />
            </>
          )}
        </ATS4MainSection>

        <ATS4MainSection icon="🧾" title="자격증">
          {data.certifications?.length > 0 ? (
            <div className="ats4-cert-grid">
              {data.certifications.map((item) => (
                <div className="ats4-cert-item" key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{item.issuer}</span>
                  <small>{item.date}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="ats4-cert-grid">
              <div className="ats4-cert-item">
                <strong>
                  Google Analytics Individual Qualification (GAIQ)
                </strong>
                <small>2022.08</small>
              </div>
              <div className="ats4-cert-item">
                <strong>검색광고마케터 1급</strong>
                <small>2022.06</small>
              </div>
              <div className="ats4-cert-item">
                <strong>컴퓨터활용능력 1급</strong>
                <small>2019.08</small>
              </div>
              <div className="ats4-cert-item">
                <strong>MOS Excel Expert</strong>
                <small>2019.07</small>
              </div>
            </div>
          )}
        </ATS4MainSection>

        <ATS4MainSection icon="✒️" title="자기소개">
          <p className="ats4-intro">
            {formatSummary(data.summary) ||
              "저는 사용자 중심의 사고와 데이터 기반의 분석을 통해 문제를 정의하고 해결하는 과정을 즐깁니다. 다양한 경험 속에서 배운 실행력과 커뮤니케이션 역량을 바탕으로, 조직의 목표 달성에 기여하는 마케터로 성장하고자 합니다."}
          </p>
        </ATS4MainSection>
      </main>
    </article>
  );
}

function ProfilePhoto({ photo, name }) {
  if (photo) {
    return (
      <div className="ats4-photo">
        <img src={photo} alt={name || "Profile"} />
      </div>
    );
  }

  return (
    <div className="ats4-photo ats4-photo-placeholder">
      <span>{getInitials(name || "Kim Ji Eun")}</span>
    </div>
  );
}

function ATS4SideSection({ icon, title, children }) {
  return (
    <section className="ats4-side-section">
      <div className="ats4-side-heading">
        {icon && <span>{icon}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ATS4MainSection({ icon, title, children }) {
  return (
    <section className="ats4-main-section">
      <div className="ats4-main-heading">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="ats4-info-row">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function RatingItem({ label, value = 4 }) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, 5));

  return (
    <div className="ats4-rating-item">
      <span>{label}</span>
      <div>
        {[1, 2, 3, 4, 5].map((dot) => (
          <i key={dot} className={dot <= safeValue ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

function ATS4Row({ period, title, subtitle, location, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats4-row">
      <div className="ats4-row-period">{period}</div>

      <div className="ats4-row-content">
        <div className="ats4-row-top">
          <strong>{title}</strong>
          {location && <span>{location}</span>}
        </div>

        {subtitle && <p>{subtitle}</p>}

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

function splitBullets(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
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

function formatEducation(item = {}) {
  const parts = [];

  if (item.degree) parts.push(item.degree);
  if (item.gpa) parts.push(`평점: ${item.gpa}`);

  return parts.join(" | ");
}

function formatAward(item = {}) {
  const parts = [];

  if (item.year) parts.push(item.year);
  if (item.name) parts.push(item.name);
  if (item.organizer) parts.push(item.organizer);

  return parts.join(" ");
}

function parseRatingItem(text = "") {
  const value = String(text).trim();

  if (!value) {
    return {
      label: "Skill",
      value: 4,
    };
  }

  const parts = value.split(":");

  if (parts.length < 2) {
    return {
      label: value,
      value: 4,
    };
  }

  const label = parts[0].trim();
  const rawLevel = parts.slice(1).join(":").trim().toLowerCase();
  const numberLevel = parseInt(rawLevel, 10);

  const levelMap = {
    beginner: 1,
    basic: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
  };

  return {
    label,
    value: Number.isNaN(numberLevel) ? levelMap[rawLevel] || 4 : numberLevel,
  };
}

function formatKoreanName(name = "") {
  const clean = String(name).trim();

  if (!clean) return "";

  return clean;
}

function formatRomanName(name = "") {
  const clean = String(name).trim();

  if (!clean) return "";

  return clean.toUpperCase();
}

function getInitials(name = "") {
  return String(name)
    .split(/\s+/)
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
