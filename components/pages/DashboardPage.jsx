"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const slides = [
    {
      badge: "CV BUILDER",
      title: "Buat CV Profesional dengan Mudah",
      description:
        "Bangun CV modern, rapi, dan siap digunakan untuk melamar pekerjaan impianmu.",
      button: "Mulai Buat CV",
      href: "/editor",
      variant: "blue",
    },
    {
      badge: "TEMPLATE MODERN",
      title: "Pilih Template yang Sesuai",
      description:
        "Gunakan template CV yang bersih, menarik, dan mudah dibaca oleh recruiter.",
      button: "Lihat Template",
      href: "/templates",
      variant: "purple",
    },
    {
      badge: "LIVE PREVIEW",
      title: "Lihat Hasil CV Secara Langsung",
      description:
        "Preview CV kamu sebelum digunakan agar tampilan akhirnya lebih rapi dan profesional.",
      button: "Preview CV",
      href: "/preview",
      variant: "dark",
    },
  ];

  const templates = [
    {
      title: "Modern Blue",
      desc: "Template profesional dengan tampilan modern.",
    },
    {
      title: "Clean Minimal",
      desc: "Template simpel, rapi, dan mudah dibaca.",
    },
    {
      title: "Creative CV",
      desc: "Template menarik untuk profil yang lebih kreatif.",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[activeSlide];

  return (
    <main className="home-page">
      <section className={`home-hero home-hero-${currentSlide.variant}`}>
        <div className="home-hero-overlay" />

        <button
          type="button"
          className="home-slider-arrow home-slider-arrow-left"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
        >
          ‹
        </button>

        <div className="home-hero-content">
          <span className="home-hero-badge">{currentSlide.badge}</span>

          <h1>{currentSlide.title}</h1>

          <p>{currentSlide.description}</p>

          <Link href={currentSlide.href} className="home-hero-button">
            {currentSlide.button}
          </Link>
        </div>

        <div className="home-hero-preview">
          <div className="home-cv-card">
            <div className="home-cv-header">
              <div className="home-cv-avatar" />
              <div>
                <div className="home-cv-line home-cv-line-title" />
                <div className="home-cv-line home-cv-line-small" />
              </div>
            </div>

            <div className="home-cv-body">
              <div className="home-cv-side">
                <div className="home-cv-section-title" />
                <div className="home-cv-line" />
                <div className="home-cv-line short" />
                <div className="home-cv-line" />

                <div className="home-cv-section-title space" />
                <div className="home-skill" />
                <div className="home-skill medium" />
                <div className="home-skill short" />
              </div>

              <div className="home-cv-main">
                {[1, 2, 3].map((item) => (
                  <div className="home-cv-block" key={item}>
                    <div className="home-cv-section-title" />
                    <div className="home-cv-line" />
                    <div className="home-cv-line" />
                    <div className="home-cv-line short" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="home-slider-arrow home-slider-arrow-right"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
        >
          ›
        </button>
      </section>

      <div className="home-slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={activeSlide === index ? "active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Pilih slide ${index + 1}`}
          />
        ))}
      </div>

      <section className="home-template-section">
        <div className="home-section-heading">
          <h2>Template Center</h2>
          <span />
          <p>Pilih template CV yang paling sesuai dengan kebutuhanmu.</p>
        </div>

        <div className="home-template-grid">
          {templates.map((template) => (
            <div className="home-template-card" key={template.title}>
              <div className="home-template-preview">
                <div className="home-template-top" />
                <div className="home-template-line big" />
                <div className="home-template-line medium" />
                <div className="home-template-content">
                  <div>
                    <div className="home-template-line" />
                    <div className="home-template-line short" />
                    <div className="home-template-line" />
                  </div>

                  <div>
                    <div className="home-template-line" />
                    <div className="home-template-line" />
                    <div className="home-template-line short" />
                  </div>
                </div>
              </div>

              <h3>{template.title}</h3>
              <p>{template.desc}</p>

              <Link href="/templates">Gunakan Template</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
