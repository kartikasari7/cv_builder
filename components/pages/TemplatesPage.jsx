"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

export default function TemplatesPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const categories = [
    { id: "all", label: "All templates", icon: "▦" },
    { id: "simple", label: "Simple", icon: "▯" },
    { id: "professional", label: "Professional", icon: "▣" },
    { id: "modern", label: "Modern", icon: "◇" },
    { id: "ats", label: "ATS", icon: "▱" },
    { id: "two-columns", label: "Two columns", icon: "▥" },
    { id: "europass", label: "Europass", icon: "★" },
  ];

  const templates = [
    {
      id: "minimal-ats",
      name: "Minimal ATS",
      category: "ats",
      categories: ["ats", "simple"],
      type: "ATS",
      recommended: false,
      withPhoto: false,
      image: "/images/templates/ATS1.png",
    },
    {
      id: "ats-2",
      name: "ATS 2",
      category: "ats",
      categories: ["ats", "two-columns"],
      type: "ATS",
      recommended: false,
      withPhoto: false,
      image: "/images/templates/ATS2.png",
    },
    {
      id: "ats-3",
      name: "ATS 3",
      category: "ats",
      categories: ["ats", "two-columns"],
      type: "ATS",
      recommended: false,
      withPhoto: true,
      image: "/images/templates/ATS3.png",
    },
    {
      id: "ats-4",
      name: "ATS 4",
      category: "ats",
      categories: ["ats", "two-columns", "professional"],
      type: "ATS",
      recommended: false,
      withPhoto: true,
      image: "/images/templates/ATS4.jpeg",
    },
    {
      id: "ats-5",
      name: "ATS 5",
      category: "ats",
      categories: ["ats", "simple"],
      type: "ATS",
      recommended: false,
      withPhoto: false,
      image: "/images/templates/ATS5.png",
    },
    {
      id: "ats-6",
      name: "ATS 6",
      category: "ats",
      categories: ["ats", "two-columns"],
      type: "ATS",
      recommended: false,
      withPhoto: true,
      image: "/images/templates/ATS6.jpeg",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast({ type: "", message: "" });
    }, 2200);
  };

  const filteredTemplates = templates.filter((template) => {
    const templateCategories = template.categories || [template.category];

    const matchCategory =
      activeCategory === "all" || templateCategories.includes(activeCategory);

    const matchPhoto = !onlyWithPhoto || template.withPhoto;

    return matchCategory && matchPhoto;
  });

  const handleOpenChoice = (template) => {
    setSelectedTemplate(template);
    setShowChoiceModal(true);
  };

  const handleStartScratch = () => {
    if (!selectedTemplate) return;

    localStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplate));
    localStorage.removeItem("uploadedResumeName");

    window.dispatchEvent(new Event("template-selected"));

    showToast(
      "success",
      `Template ${selectedTemplate.name} dipilih. Lanjut ke halaman Buat CV.`,
    );

    setTimeout(() => {
      router.push("/editor");
    }, 900);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadResume = (e) => {
    const file = e.target.files?.[0];

    if (!file || !selectedTemplate) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast("warning", "File harus berupa PDF, DOC, atau DOCX.");
      return;
    }

    localStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplate));
    localStorage.setItem("uploadedResumeName", file.name);

    window.dispatchEvent(new Event("template-selected"));

    showToast(
      "success",
      `Resume ${file.name} berhasil dipilih. Lanjut ke halaman Buat CV.`,
    );

    setTimeout(() => {
      router.push("/editor");
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowChoiceModal(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ type: "", message: "" })}
      />

      <main className="templates-page">
        <section className="templates-container">
          <div className="templates-top-heading">
            <span>Template CV</span>
            <h1>Pilih Template CV Profesional</h1>
            <p>
              Pilih tipe template yang paling sesuai, lalu mulai buat CV dari
              awal atau upload resume yang sudah ada.
            </p>
          </div>

          <div className="templates-filter-bar">
            <div className="templates-filter-list">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={
                    activeCategory === category.id
                      ? "template-filter active"
                      : "template-filter"
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={onlyWithPhoto ? "photo-toggle active" : "photo-toggle"}
              onClick={() => setOnlyWithPhoto(!onlyWithPhoto)}
            >
              <span className="photo-toggle-switch">
                <span />
              </span>
              Make all with photo
            </button>
          </div>

          <div className="templates-result-info">
            <p>
              Menampilkan <strong>{filteredTemplates.length}</strong> template
              untuk kategori{" "}
              <strong>
                {categories.find((item) => item.id === activeCategory)?.label}
              </strong>
            </p>
          </div>

          <div className="resume-template-grid">
            {filteredTemplates.map((template) => (
              <article key={template.id} className="resume-template-card">
                {template.recommended && (
                  <div className="resume-template-badge">★ Recommended</div>
                )}

                <div className="resume-template-image-wrap">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="resume-template-image"
                  />
                </div>

                <div className="resume-template-hover">
                  <button
                    type="button"
                    onClick={() => handleOpenChoice(template)}
                  >
                    Start with this template
                  </button>
                </div>

                <div className="resume-template-caption">
                  <h3>{template.name}</h3>
                  <p>{template.type}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {showChoiceModal && selectedTemplate && (
        <div className="template-choice-overlay">
          <div className="template-choice-modal">
            <button
              type="button"
              className="template-choice-close"
              onClick={handleCloseModal}
            >
              ×
            </button>

            <div className="template-choice-brand">
              <div>CV</div>
              <span>CV Builder</span>
            </div>

            <h2>Bagaimana Anda ingin membuat CV?</h2>

            <p className="template-choice-subtitle">
              Template <strong>{selectedTemplate.name}</strong> sudah dipilih.
              Lanjutkan dengan membuat CV dari awal atau upload resume yang
              sudah ada.
            </p>

            <div className="template-choice-grid">
              <button
                type="button"
                className="template-choice-card"
                onClick={handleStartScratch}
              >
                <div className="template-choice-icon">✍</div>
                <h3>Start from scratch</h3>
                <p>Isi data CV dari awal dengan panduan editor.</p>
              </button>

              <button
                type="button"
                className="template-choice-card"
                onClick={handleUploadClick}
              >
                <div className="template-choice-icon">⇩</div>
                <h3>I already have a resume</h3>
                <p>Upload dokumen PDF, DOC, atau DOCX.</p>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="template-upload-input"
              onChange={handleUploadResume}
            />
          </div>
        </div>
      )}
    </>
  );
}
