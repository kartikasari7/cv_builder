export default function ATS6({ data = {} }) {
  return (
    <article className="ats6-template cv-print-area">
      <header className="ats6-header">
        <div className="ats6-photo-wrap">
          <ProfilePhoto photo={data.photo} name={data.name} />
        </div>

        <div className="ats6-header-main">
          <h1>{data.name || "张 伟"}</h1>
          <h2>{data.role || "市场营销专员"}</h2>
          <p>
            {formatSummary(data.summary) ||
              "具备良好的沟通能力和团队合作精神，熟悉市场调研与分析，致力于通过创新营销策略提升品牌影响力和业务增长。"}
          </p>
        </div>

        <div className="ats6-contact">
          <ContactRow icon="☎" value={data.phone || "138-0000-0000"} />
          <ContactRow icon="✉" value={data.email || "zhangwei@email.com"} />
          <ContactRow
            icon="📍"
            value={
              formatLocation(data.city, data.postalCode) || "上海市浦东新区"
            }
          />
          <ContactRow icon="▣" value={data.birthDate || "1997.05.20"} />
          <ContactRow icon="●" value={data.politicalStatus || "中共党员"} />
        </div>
      </header>

      <div className="ats6-divider" />

      <div className="ats6-body">
        <aside className="ats6-sidebar">
          <ATS6SideSection icon="👤" title="基本信息">
            <InfoRow label="出生年月" value={data.birthDate || "1997.05.20"} />
            <InfoRow label="籍　　贯" value={data.origin || "江苏 南京"} />
            <InfoRow label="民　　族" value={data.nationality || "汉族"} />
            <InfoRow
              label="政治面貌"
              value={data.politicalStatus || "中共党员"}
            />
            <InfoRow label="婚姻状况" value={data.maritalStatus || "未婚"} />
          </ATS6SideSection>

          <ATS6SideSection icon="🎓" title="教育背景">
            {data.education?.length > 0 ? (
              data.education.slice(0, 1).map((item) => (
                <div className="ats6-side-edu" key={item.id}>
                  <strong>{item.period || "2015.09 - 2019.06"}</strong>
                  <h3>{item.school || "复旦大学"}</h3>
                  <p>{item.degree || "市场营销（本科）"}</p>
                  {item.desc && <p>{formatSummary(item.desc)}</p>}
                  {item.gpa && <p>GPA：{item.gpa}</p>}
                </div>
              ))
            ) : (
              <div className="ats6-side-edu">
                <strong>2015.09 - 2019.06</strong>
                <h3>复旦大学</h3>
                <p>市场营销（本科）</p>
                <p>
                  主修课程：市场营销学、消费者行为学、市场调研与预测、品牌管理、广告学、统计学等
                </p>
                <p>GPA：3.7/4.0</p>
                <p>排名：前20%</p>
              </div>
            )}
          </ATS6SideSection>

          <ATS6SideSection icon="★" title="专业技能">
            {data.skills?.length > 0 ? (
              <ul className="ats6-side-list">
                {data.skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            ) : (
              <ul className="ats6-side-list">
                <li>熟练使用 Office 办公软件（Word / Excel / PPT）</li>
                <li>熟悉 SPSS、Excel 数据分析</li>
                <li>掌握基础的 PS、AI 操作</li>
                <li>具备良好的文案撰写能力与 PPT 制作能力</li>
                <li>普通话：母语水平</li>
                <li>英语：CET-6（520分）</li>
              </ul>
            )}
          </ATS6SideSection>

          <ATS6SideSection icon="🏆" title="荣誉奖项">
            {data.awards?.length > 0 ? (
              <ul className="ats6-side-list">
                {data.awards.map((item) => (
                  <li key={item.id}>{formatAward(item)}</li>
                ))}
              </ul>
            ) : (
              <ul className="ats6-side-list">
                <li>2018-2019 学年校级一等奖学金</li>
                <li>2017-2018 学年校级二等奖学金</li>
                <li>2018 年 “优秀共青团员”</li>
                <li>2019 年 “优秀毕业生”</li>
              </ul>
            )}
          </ATS6SideSection>
        </aside>

        <main className="ats6-main">
          <ATS6MainSection icon="💼" title="实习经历">
            {data.experience?.length > 0 ? (
              data.experience.map((item) => (
                <TimelineItem
                  key={item.id}
                  period={item.period}
                  title={item.company}
                  role={item.position}
                  desc={item.desc}
                />
              ))
            ) : (
              <>
                <TimelineItem
                  period="2022.06 - 2023.02"
                  title="腾讯科技（上海）有限公司"
                  role="市场部实习生"
                  desc={`协助进行市场调研，收集并分析行业及竞品数据，撰写调研报告
参与策划线上推广活动，支持活动执行与效果跟踪
负责整理市场资料和数据，制作PPT汇报材料
配合团队完成其他日常市场相关工作`}
                />

                <TimelineItem
                  period="2021.03 - 2021.06"
                  title="欧莱雅（中国）有限公司"
                  role="市场部实习生"
                  desc={`协助产品推广方案的执行，跟进项目进度
参与社交媒体内容策划与发布，提升品牌曝光度
整理活动反馈数据，制作分析报表，为优化策略提供建议`}
                />

                <TimelineItem
                  period="2020.07 - 2020.09"
                  title="上海某文化传播有限公司"
                  role="市场助理"
                  desc={`协助完成活动策划与执行，负责现场协调工作
撰写活动总结报告，分析活动效果
协助维护客户关系，跟进合作项目进度`}
                />
              </>
            )}
          </ATS6MainSection>

          <ATS6MainSection icon="▣" title="校园经历">
            {data.organizations?.length > 0 ? (
              data.organizations.map((item) => (
                <TimelineItem
                  key={item.id}
                  period={item.period}
                  title={item.org}
                  role={item.role}
                  desc={item.desc}
                />
              ))
            ) : (
              <>
                <TimelineItem
                  period="2016.09 - 2018.06"
                  title="复旦大学学生会"
                  role="宣传部干事"
                  desc={`负责学生会活动的宣传策划与推文撰写
运营学生会官方微信公众号，提高关注度与互动量
组织并参与多项校园活动，提升团队协作与组织能力`}
                />

                <TimelineItem
                  period="2018.09 - 2019.06"
                  title="市场营销协会"
                  role="项目负责人"
                  desc={`带领团队完成市场调研项目，撰写并展示调研报告
策划并组织协会品牌活动，提升协会影响力与会员参与度`}
                />
              </>
            )}
          </ATS6MainSection>

          <ATS6MainSection icon="◔" title="自我评价">
            <ul className="ats6-main-list">
              {formatSelfEvaluation(data.summary).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </ATS6MainSection>

          <ATS6MainSection icon="📖" title="兴趣爱好">
            {data.hobbies?.length > 0 ? (
              <div className="ats6-hobby-list">
                {data.hobbies.map((item) => (
                  <HobbyItem key={item.id} name={item.name} />
                ))}
              </div>
            ) : (
              <div className="ats6-hobby-list">
                <HobbyItem icon="♪" name="音乐" />
                <HobbyItem icon="🏃" name="跑步" />
                <HobbyItem icon="📷" name="摄影" />
                <HobbyItem icon="📖" name="阅读" />
                <HobbyItem icon="▣" name="电影" />
              </div>
            )}
          </ATS6MainSection>
        </main>
      </div>
    </article>
  );
}

function ProfilePhoto({ photo, name }) {
  if (photo) {
    return (
      <div className="ats6-photo">
        <img src={photo} alt={name || "Profile"} />
      </div>
    );
  }

  return (
    <div className="ats6-photo ats6-photo-placeholder">
      <span>{getInitials(name || "张伟")}</span>
    </div>
  );
}

function ContactRow({ icon, value }) {
  return (
    <div className="ats6-contact-row">
      <span>{icon}</span>
      <p>{value}</p>
    </div>
  );
}

function ATS6SideSection({ icon, title, children }) {
  return (
    <section className="ats6-side-section">
      <div className="ats6-side-heading">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>

      {children}
    </section>
  );
}

function ATS6MainSection({ icon, title, children }) {
  return (
    <section className="ats6-main-section">
      <div className="ats6-main-heading">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>

      {children}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="ats6-info-row">
      <strong>{label}：</strong>
      <span>{value}</span>
    </div>
  );
}

function TimelineItem({ period, title, role, desc }) {
  const bullets = splitBullets(desc);

  return (
    <div className="ats6-timeline-item">
      <div className="ats6-time-dot" />

      <div className="ats6-timeline-period">{period}</div>

      <div className="ats6-timeline-content">
        <div className="ats6-timeline-top">
          <strong>{title || "公司 / 组织名称"}</strong>
          <span>{role || "职位"}</span>
        </div>

        {bullets.length > 0 && (
          <ul className="ats6-main-list">
            {bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function HobbyItem({ icon = "•", name }) {
  return (
    <div className="ats6-hobby-item">
      <span>{icon}</span>
      <p>{name}</p>
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

  return parts.join(" ");
}

function formatSummary(summary = "") {
  return String(summary)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
}

function formatAward(item = {}) {
  const parts = [];

  if (item.year) parts.push(item.year);
  if (item.name) parts.push(item.name);
  if (item.organizer) parts.push(item.organizer);

  return parts.join(" ");
}

function formatSelfEvaluation(summary = "") {
  const items = splitBullets(summary);

  if (items.length > 0) return items;

  return [
    "具备良好的沟通表达能力与团队合作精神，工作认真负责",
    "学习能力强，能快速适应新环境并高效完成任务",
    "对市场营销工作充满热情，善于分析问题并提出解决方案",
    "希望在市场营销领域长期发展，为企业创造更大价值",
  ];
}

function getInitials(name = "") {
  const clean = String(name).replace(/\s+/g, "");

  if (!clean) return "ZW";

  return clean.slice(0, 2).toUpperCase();
}
