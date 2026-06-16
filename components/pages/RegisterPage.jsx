"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";
import { EyeIcon, EyeOffIcon } from "@/components/ui/PasswordEyeIcon";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !pass || !confirmPass) {
      showToast("warning", "Semua field harus diisi terlebih dahulu.");
      return;
    }

    if (pass.length < 8) {
      showToast("warning", "Password minimal 8 karakter.");
      return;
    }

    if (pass !== confirmPass) {
      showToast("error", "Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: pass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.error || data.detail || "Registrasi gagal.");
        return;
      }

      showToast(
        "success",
        "Akun berhasil dibuat. Silakan login terlebih dahulu.",
      );

      setName("");
      setEmail("");
      setPass("");
      setConfirmPass("");

      setTimeout(() => {
        router.push("/login");
      }, 1300);
    } catch (error) {
      console.error("REGISTER PAGE ERROR:", error);
      showToast("error", "Terjadi kesalahan saat registrasi.");
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

      <main className="register-page">
        <form onSubmit={handleRegister} className="register-card">
          <div className="register-header">
            <h1>CV Builder</h1>
            <h2>Buat Akun Baru ✨</h2>
            <p>Daftar untuk mulai membuat CV profesionalmu</p>
          </div>

          <div className="register-field">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Password</label>

            <div className="register-password-wrapper">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPass(!showPass)}
                aria-label={
                  showPass ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label>Konfirmasi Password</label>

            <div className="register-password-wrapper">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Ulangi password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                aria-label={
                  showConfirmPass
                    ? "Sembunyikan konfirmasi password"
                    : "Tampilkan konfirmasi password"
                }
              >
                {showConfirmPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Mendaftarkan..." : "Daftar Sekarang →"}
          </button>

          <p className="register-login-text">
            Sudah punya akun? <Link href="/login">Masuk</Link>
          </p>
        </form>
      </main>
    </>
  );
}
