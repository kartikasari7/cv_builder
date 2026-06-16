"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TemplateRenderer from "@/components/cv/TemplateRenderer";

const emptyCvData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  city: "",
  summary: "",
  education: [],
  experience: [],
  skills: [],
  organizations: [],
  certifications: [],
  projects: [],
  awards: [],
};

export default function PreviewPage() {
  const router = useRouter();

  const [cvData, setCvData] = useState(emptyCvData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedDraft = localStorage.getItem("cvDraft");
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);

        setCvData({
          ...emptyCvData,
          ...parsedDraft,
          education: parsedDraft.education || [],
          experience: parsedDraft.experience || [],
          skills: parsedDraft.skills || [],
          organizations: parsedDraft.organizations || [],
          certifications: parsedDraft.certifications || [],
          projects: parsedDraft.projects || [],
          awards: parsedDraft.awards || [],
        });
      } catch {
        localStorage.removeItem("cvDraft");
      }
    }

    if (savedTemplate) {
      try {
        setSelectedTemplate(JSON.parse(savedTemplate));
      } catch {
        setSelectedTemplate(null);
      }
    }

    setLoading(false);
  }, []);

  const cvScore = useMemo(() => calculateCvScore(cvData), [cvData]);
  const suggestions = useMemo(() => getCvSuggestions(cvData), [cvData]);

  const handlePrint = () => {
    const oldTitle = document.title;
    const fileName = cvData.name?.trim()
      ? `${cvData.name.trim()} - CV`
      : "CV Builder - Resume";

    document.title = fileName;

    setTimeout(() => {
      window.print();

      setTimeout(() => {
        document.title = oldTitle;
      }, 500);
    }, 100);
  };

  const handleEdit = () => {
    router.push("/editor");
  };

  const handleChangeTemplate = () => {
    router.push("/templates");
  };

  if (loading) {
    return (
      <main className="review-page">
        <section className="review-container">
          <div className="review-empty-card">
            <h1>Memuat CV...</h1>
            <p>Mohon tunggu sebentar.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="review-page">
      <section className="review-container">
        <div className="review-heading no-print">
          <div>
            <span>Review CV</span>
            <h1>Periksa CV Sebelum Dicetak</h1>
            <p>
              Lihat hasil akhir CV Anda, cek skor kelengkapan, lalu cetak atau
              simpan sebagai PDF.
            </p>
          </div>

          <div className="review-actions">
            <button
              type="button"
              className="review-secondary-btn"
              onClick={handleChangeTemplate}
            >
              Ganti Template
            </button>

            <button
              type="button"
              className="review-secondary-btn"
              onClick={handleEdit}
            >
              Edit CV
            </button>

            <button
              type="button"
              className="review-primary-btn"
              onClick={handlePrint}
            >
              Cetak / Simpan PDF
            </button>
          </div>
        </div>

        <div className="review-layout">
          <aside className="review-sidebar no-print">
            <div className="review-score-card">
              <div
                className="review-score-circle"
                style={{ "--score": `${cvScore}%` }}
              >
                <div className="review-score-number">
                  <strong>{cvScore}</strong>
                  <span>/100</span>
                </div>
              </div>

              <h2>CV Score</h2>

              <p>
                {cvScore >= 80
                  ? "CV Anda sudah cukup kuat dan siap untuk dicetak."
                  : "CV masih bisa ditingkatkan dengan melengkapi beberapa bagian."}
              </p>

              <div className="review-score-bar">
                <span style={{ width: `${cvScore}%` }} />
              </div>
            </div>

            <div className="review-info-card">
              <h3>Template Aktif</h3>
              <p>{selectedTemplate?.name || "ATS Classic"}</p>
            </div>

            <div className="review-suggestion-card">
              <h3>Saran Perbaikan</h3>

              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Semua bagian penting sudah cukup lengkap.</p>
              )}
            </div>
          </aside>

          <section className="review-preview-area">
            <div className="review-paper-wrap">
              <TemplateRenderer
                templateId={selectedTemplate?.id}
                data={cvData}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function SafeReviewCV({ data }) {
  return (
    <article className="review-cv-paper cv-print-area">
      <header className="review-cv-header">
        <h1>{data.name || "Nama Lengkap"}</h1>

        {data.role && <h2>{data.role}</h2>}

        <p>
          {[data.phone, data.email, data.linkedin, data.portfolio]
            .filter(Boolean)
            .join(" | ") || "Kontak belum diisi"}
        </p>

        <p>{data.city || "Lokasi belum diisi"}</p>
      </header>

      <p className="review-cv-summary">
        {data.summary ||
          "Tulis ringkasan profesional Anda di halaman editor agar CV terlihat lebih kuat."}
      </p>

      <CVSection title="Education">
        {data.education.length > 0 ? (
          data.education.map((item) => (
            <div className="review-cv-item" key={item.id}>
              <div className="review-cv-row">
                <strong>{item.school || "Nama Institusi"}</strong>
                <span>{item.location || "Lokasi"}</span>
              </div>

              <div className="review-cv-row">
                <em>{item.degree || "Gelar / Jurusan"}</em>
                <span>{item.period || "Periode"}</span>
              </div>

              {item.gpa && <p>GPA: {item.gpa}</p>}

              {item.desc && (
                <ul>
                  {splitBullets(item.desc).map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="review-cv-empty">Belum ada pendidikan.</p>
        )}
      </CVSection>

      <CVSection title="Work Experience">
        {data.experience.length > 0 ? (
          data.experience.map((item) => (
            <div className="review-cv-item" key={item.id}>
              <div className="review-cv-row">
                <strong>{item.company || "Nama Perusahaan"}</strong>
                <span>{item.location || "Lokasi"}</span>
              </div>

              <div className="review-cv-row">
                <em>{item.position || "Posisi"}</em>
                <span>{item.period || "Periode"}</span>
              </div>

              {item.desc && (
                <ul>
                  {splitBullets(item.desc).map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="review-cv-empty">Belum ada pengalaman.</p>
        )}
      </CVSection>

      <CVSection title="Related Experiences">
        {data.organizations.length > 0 ? (
          data.organizations.map((item) => (
            <div className="review-cv-item" key={item.id}>
              <div className="review-cv-row">
                <strong>{item.org || "Nama Organisasi"}</strong>
                <span>{item.location || ""}</span>
              </div>

              <div className="review-cv-row">
                <em>{item.role || "Jabatan"}</em>
                <span>{item.period || "Periode"}</span>
              </div>

              {item.desc && (
                <ul>
                  {splitBullets(item.desc).map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="review-cv-empty">Belum ada pengalaman organisasi.</p>
        )}
      </CVSection>

      <CVSection title="Certification">
        {data.certifications.length > 0 ? (
          <ul>
            {data.certifications.map((item) => (
              <li key={item.id}>
                {item.name || "Nama Sertifikasi"}
                {item.issuer ? `, ${item.issuer}` : ""}
                {item.date ? `, ${item.date}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="review-cv-empty">Belum ada sertifikasi.</p>
        )}
      </CVSection>

      <CVSection title="Award">
        {data.awards.length > 0 ? (
          <ul>
            {data.awards.map((item) => (
              <li key={item.id}>
                {item.name || "Nama Penghargaan"}
                {item.year ? `, ${item.year}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="review-cv-empty">Belum ada penghargaan.</p>
        )}
      </CVSection>

      <CVSection title="Skills">
        {data.skills.length > 0 ? (
          <ul>
            {data.skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          <p className="review-cv-empty">Belum ada skill.</p>
        )}
      </CVSection>
    </article>
  );
}

function CVSection({ title, children }) {
  return (
    <section className="review-cv-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function splitBullets(text) {
  if (!text) return [];

  return text
    .split("\n")
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function calculateCvScore(data) {
  let score = 0;

  // Biodata dasar: 38 poin
  if (data.name?.trim()) score += 8;
  if (data.role?.trim()) score += 8;

  if (data.email?.trim()) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    score += emailValid ? 10 : 5;
  }

  if (data.phone?.trim()) {
    score += data.phone.trim().length >= 10 ? 8 : 4;
  }

  if (data.city?.trim()) score += 4;

  // Ringkasan profil: 15 poin
  const summaryLength = data.summary?.trim().length || 0;

  if (summaryLength >= 120) {
    score += 15;
  } else if (summaryLength >= 80) {
    score += 12;
  } else if (summaryLength >= 50) {
    score += 9;
  } else if (summaryLength > 0) {
    score += 4;
  }

  // Pendidikan: 15 poin
  if (data.education?.length > 0) {
    const education = data.education[0];

    if (education.school?.trim()) score += 5;
    if (education.degree?.trim()) score += 4;
    if (education.period?.trim()) score += 3;
    if (education.location?.trim()) score += 2;
    if (education.gpa?.trim() || education.desc?.trim()) score += 1;
  }

  // Pengalaman: 20 poin
  if (data.experience?.length > 0) {
    const experience = data.experience[0];

    if (experience.company?.trim()) score += 5;
    if (experience.position?.trim()) score += 5;
    if (experience.period?.trim()) score += 3;
    if (experience.location?.trim()) score += 2;

    const descLength = experience.desc?.trim().length || 0;

    if (descLength >= 100) {
      score += 5;
    } else if (descLength >= 50) {
      score += 3;
    } else if (descLength > 0) {
      score += 1;
    }
  }

  // Skill: 12 poin
  const skillCount = data.skills?.length || 0;

  if (skillCount >= 5) {
    score += 12;
  } else if (skillCount >= 3) {
    score += 9;
  } else if (skillCount >= 1) {
    score += 4;
  }

  return Math.min(score, 100);
}

function getCvSuggestions(data) {
  const suggestions = [];

  if (!data.name) suggestions.push("Lengkapi nama lengkap.");
  if (!data.role) suggestions.push("Tambahkan posisi atau jabatan target.");
  if (!data.email) suggestions.push("Tambahkan email aktif.");
  if (!data.phone) suggestions.push("Tambahkan nomor telepon.");
  if (!data.summary || data.summary.length < 50) {
    suggestions.push("Buat ringkasan profil minimal 50 karakter.");
  }
  if (data.education.length === 0) {
    suggestions.push("Tambahkan minimal satu riwayat pendidikan.");
  }
  if (data.experience.length === 0) {
    suggestions.push(
      "Tambahkan pengalaman kerja, magang, atau proyek relevan.",
    );
  }
  if (data.skills.length < 3) {
    suggestions.push("Tambahkan minimal 3 skill utama.");
  }

  return suggestions;
}
