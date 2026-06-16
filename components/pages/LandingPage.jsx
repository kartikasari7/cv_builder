import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-blur landing-hero-blur-one" />
        <div className="landing-hero-blur landing-hero-blur-two" />

        <div className="landing-hero-container">
          <div className="landing-hero-content">
            <div className="landing-badge">
              <span>✨</span>
              Buat CV profesional lebih cepat
            </div>

            <h1>Bangun CV Modern yang Membuatmu Lebih Siap Melamar Kerja</h1>

            <p>
              CV Builder membantu kamu membuat CV profesional, rapi, dan mudah
              diedit. Pilih template, isi data diri, preview hasilnya, lalu
              gunakan untuk melamar pekerjaan impianmu.
            </p>

            <div className="landing-hero-actions">
              <Link href="/login" className="landing-primary-button">
                Mulai Buat CV
              </Link>

              <Link href="/register" className="landing-secondary-button">
                Daftar Sekarang
              </Link>
            </div>

            <div className="landing-hero-stats">
              <div>
                <strong>10+</strong>
                <span>Template CV</span>
              </div>

              <div>
                <strong>PDF</strong>
                <span>Export Ready</span>
              </div>

              <div>
                <strong>ATS</strong>
                <span>Friendly</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-preview">
            <div className="landing-preview-card">
              <div className="landing-preview-top">
                <div>
                  <span className="landing-dot blue" />
                  <span className="landing-dot yellow" />
                  <span className="landing-dot green" />
                </div>
                <p>Live Preview</p>
              </div>

              <div className="landing-cv-paper">
                <div className="landing-cv-header">
                  <div className="landing-avatar">A</div>
                  <div>
                    <div className="landing-line large" />
                    <div className="landing-line small" />
                  </div>
                </div>

                <div className="landing-cv-body">
                  <div className="landing-cv-sidebar">
                    <div className="landing-section-title" />
                    <div className="landing-line tiny" />
                    <div className="landing-line tiny short" />
                    <div className="landing-line tiny" />

                    <div className="landing-section-title space" />
                    <div className="landing-skill" />
                    <div className="landing-skill medium" />
                    <div className="landing-skill short" />
                  </div>

                  <div className="landing-cv-main">
                    {[1, 2, 3].map((item) => (
                      <div className="landing-cv-block" key={item}>
                        <div className="landing-section-title" />
                        <div className="landing-line full" />
                        <div className="landing-line full" />
                        <div className="landing-line half" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="landing-floating-card landing-floating-card-one">
                <span>✅</span>
                ATS Friendly
              </div>

              <div className="landing-floating-card landing-floating-card-two">
                <span>⚡</span>
                Fast Editing
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading">
          <span>Fitur Unggulan</span>
          <h2>Semua yang Dibutuhkan untuk Membuat CV Profesional</h2>
          <p>
            Dibuat agar proses membuat CV jadi lebih mudah, cepat, dan tetap
            terlihat profesional.
          </p>
        </div>

        <div className="landing-feature-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🎨</div>
            <h3>Template Modern</h3>
            <p>
              Pilih tampilan CV yang rapi, bersih, dan cocok untuk kebutuhan
              profesional.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">✍️</div>
            <h3>Editor Mudah</h3>
            <p>
              Isi data diri, pengalaman, pendidikan, dan skill tanpa proses yang
              rumit.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">👀</div>
            <h3>Preview Langsung</h3>
            <p>
              Lihat hasil CV secara real-time sebelum digunakan atau diekspor.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">📄</div>
            <h3>Siap Export PDF</h3>
            <p>
              CV yang sudah selesai dapat disiapkan untuk kebutuhan lamaran
              kerja.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-steps" id="steps">
        <div className="landing-section-heading">
          <span>Cara Kerja</span>
          <h2>Buat CV hanya dalam beberapa langkah</h2>
        </div>

        <div className="landing-step-grid">
          <div className="landing-step-card">
            <div className="landing-step-number">01</div>
            <h3>Daftar atau Login</h3>
            <p>Masuk ke akun agar data CV kamu bisa dikelola dengan aman.</p>
          </div>

          <div className="landing-step-card">
            <div className="landing-step-number">02</div>
            <h3>Isi Data CV</h3>
            <p>Tambahkan profil, pendidikan, pengalaman, skill, dan kontak.</p>
          </div>

          <div className="landing-step-card">
            <div className="landing-step-number">03</div>
            <h3>Preview & Gunakan</h3>
            <p>Lihat hasil CV, rapikan, lalu gunakan untuk melamar kerja.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div>
          <h2>Siap membuat CV profesional pertamamu?</h2>
          <p>
            Mulai sekarang dan buat CV yang lebih rapi, modern, dan menarik.
          </p>
        </div>

        <Link href="/login" className="landing-cta-button">
          Mulai Sekarang
        </Link>
      </section>
    </main>
  );
}
