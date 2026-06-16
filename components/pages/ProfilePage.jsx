"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const PROFILE_API_URL = "/api/auth/profile";

  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    location: "",
    about: "",
    photo: "",
  };

  const [user, setUser] = useState(emptyProfile);
  const [formData, setFormData] = useState(emptyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const readJsonResponse = async (response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `Response dari server bukan JSON. Pastikan API ${PROFILE_API_URL} sudah benar dan server sudah direstart.`,
      );
    }
  };

  const displayValue = (value) => {
    return value && value.trim() ? value : "Belum diisi";
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("warning", "Silakan login terlebih dahulu.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }

    try {
      setLoadingProfile(true);

      const response = await fetch(PROFILE_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        showToast("error", data.error || "Gagal mengambil data profil.");

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }

        return;
      }

      const loadedUser = {
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        jobTitle: data.user.jobTitle || "",
        location: data.user.location || "",
        about: data.user.about || "",
        photo: data.user.photo || "",
      };

      setUser(loadedUser);
      setFormData(loadedUser);

      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("profile-updated"));
    } catch (error) {
      console.error("FETCH PROFILE ERROR:", error);
      showToast(
        "error",
        error.message || "Terjadi kesalahan saat mengambil profil.",
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("warning", "File harus berupa gambar.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("warning", "Ukuran gambar maksimal 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result,
      }));

      showToast("success", "Foto profil berhasil dipilih.");
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showToast("warning", "Nama dan email wajib diisi.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      showToast("warning", "Silakan login terlebih dahulu.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }

    try {
      setSaving(true);

      const response = await fetch(PROFILE_API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
          location: formData.location,
          about: formData.about,
          photo: formData.photo,
        }),
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        showToast("error", data.error || "Gagal memperbarui profil.");
        return;
      }

      const updatedUser = {
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        jobTitle: data.user.jobTitle || "",
        location: data.user.location || "",
        about: data.user.about || "",
        photo: data.user.photo || "",
      };

      setUser(updatedUser);
      setFormData(updatedUser);

      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("profile-updated"));

      setIsEditing(false);
      showToast("success", "Profil berhasil diperbarui.");
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      showToast(
        "error",
        error.message || "Terjadi kesalahan saat memperbarui profil.",
      );
    } finally {
      setSaving(false);
    }
  };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";
  const editInitial = formData.name
    ? formData.name.charAt(0).toUpperCase()
    : "U";

  if (loadingProfile) {
    return (
      <main className="profile-page">
        <section className="profile-container">
          <div className="profile-card profile-loading-card">
            <h2>Memuat profil...</h2>
            <p>Mohon tunggu sebentar.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ type: "", message: "" })}
      />

      <main className="profile-page">
        <section className="profile-container">
          <div className="profile-heading">
            <span>Akun & Profil</span>
            <h1>Profil Pengguna</h1>
            <p>
              Lihat informasi akun Anda dan lengkapi data diri untuk kebutuhan
              pembuatan CV.
            </p>
          </div>

          {!isEditing ? (
            <div className="profile-view-layout">
              <aside className="profile-card profile-user-card">
                <div className="profile-photo">
                  {user.photo ? (
                    <img src={user.photo} alt="Foto Profil" />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>

                <h2>{displayValue(user.name)}</h2>
                <p>{displayValue(user.email)}</p>

                <button
                  type="button"
                  className="profile-main-button"
                  onClick={handleEdit}
                >
                  Edit Profil
                </button>
              </aside>

              <section className="profile-card profile-detail-card">
                <div className="profile-detail-header">
                  <div>
                    <h2>Informasi Profil</h2>
                    <p>Data akun dan identitas profesional Anda.</p>
                  </div>

                  <button
                    type="button"
                    className="profile-secondary-button"
                    onClick={handleEdit}
                  >
                    Edit Data
                  </button>
                </div>

                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span>Nama Lengkap</span>
                    <strong>{displayValue(user.name)}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>Email</span>
                    <strong>{displayValue(user.email)}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>No. Telepon</span>
                    <strong>{displayValue(user.phone)}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>Profesi / Posisi</span>
                    <strong>{displayValue(user.jobTitle)}</strong>
                  </div>

                  <div className="profile-info-item">
                    <span>Lokasi</span>
                    <strong>{displayValue(user.location)}</strong>
                  </div>
                </div>

                <div className="profile-about-box">
                  <span>Tentang Saya</span>
                  <p>{displayValue(user.about)}</p>
                </div>
              </section>
            </div>
          ) : (
            <div className="profile-edit-layout">
              <aside className="profile-card profile-user-card">
                <div className="profile-photo">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Foto Profil" />
                  ) : (
                    <span>{editInitial}</span>
                  )}
                </div>

                <h2>{displayValue(formData.name)}</h2>
                <p>{displayValue(formData.email)}</p>

                <button
                  type="button"
                  className="profile-main-button"
                  onClick={handlePhotoClick}
                >
                  Ganti Foto Profil
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="profile-file-input"
                  onChange={handlePhotoChange}
                />
              </aside>

              <form onSubmit={handleSave} className="profile-card profile-form">
                <div className="profile-form-header">
                  <div>
                    <h2>Edit Profil</h2>
                    <p>Ubah informasi yang ingin diperbarui.</p>
                  </div>
                </div>

                <div className="profile-grid">
                  <div className="profile-field">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-field">
                    <label>No. Telepon</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-field">
                    <label>Profesi / Posisi</label>
                    <input
                      type="text"
                      name="jobTitle"
                      placeholder="Contoh: Frontend Developer"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-field profile-field-full">
                    <label>Lokasi</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Contoh: Jakarta, Indonesia"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-field profile-field-full">
                    <label>Tentang Saya</label>
                    <textarea
                      name="about"
                      placeholder="Tulis ringkasan singkat tentang diri Anda"
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="profile-action">
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="profile-save-button"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
