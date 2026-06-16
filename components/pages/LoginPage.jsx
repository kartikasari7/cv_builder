"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";
import { EyeIcon, EyeOffIcon } from "@/components/ui/PasswordEyeIcon";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      showToast("warning", "Email dan password harus diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.error || "Email atau password salah.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast("success", "Login berhasil. Selamat datang di CV Builder.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("LOGIN PAGE ERROR:", error);
      showToast("error", "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ type: "", message: "" })}
      />

      <main className="login-page">
        <section className="login-left">
          <div className="login-left-circle login-left-circle-one" />
          <div className="login-left-circle login-left-circle-two" />

          <div className="login-brand">
            <h1>CV Builder</h1>
            <p>Create Your Professional CV</p>
          </div>

          <div className="login-hero">
            <div className="login-cv-card">
              <div className="login-cv-header" />

              <div className="login-cv-line login-cv-line-full" />
              <div className="login-cv-line login-cv-line-small" />

              <div className="login-cv-content">
                <div className="login-cv-side">
                  {[80, 60, 70, 55, 90].map((width, index) => (
                    <div
                      key={index}
                      className="login-cv-blue-line"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>

                <div className="login-cv-main">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="login-cv-section">
                      <div className="login-cv-gray-line" />
                      <div className="login-cv-gray-line-small" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2>
              Buat CV Profesional
              <br />
              dalam Hitungan Menit
            </h2>

            <p>Buat, edit, preview, dan ekspor CV profesional dengan mudah.</p>
          </div>

          <div className="login-feature-list">
            {["CV Editor", "Preview", "PDF Export"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="login-right">
          <form onSubmit={handleLogin} className="login-form">
            <h2 className="login-title">Selamat Datang 👋</h2>
            <p className="login-subtitle">Masuk ke akun CV Builder kamu</p>

            <div className="login-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label>Password</label>

              <div className="login-password-wrapper">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={
                    showPass ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="login-forgot">Lupa password?</div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Memeriksa akun..." : "Masuk →"}
            </button>

            <div className="login-divider">
              <span />
              <p>atau</p>
              <span />
            </div>

            <button
              type="button"
              className="login-google-button"
              onClick={() =>
                showToast("info", "Login dengan Google belum tersedia.")
              }
            >
              <span>G</span>
              Login dengan Google
            </button>

            <p className="login-register-text">
              Belum punya akun? <Link href="/register">Daftar sekarang</Link>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
