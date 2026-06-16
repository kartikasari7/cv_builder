"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.1 2.1 0 1 1-2.97 2.97l-.05-.05A1.8 1.8 0 0 0 14.8 19.6a1.8 1.8 0 0 0-1.1 1.65V21a2.1 2.1 0 1 1-4.2 0v-.08A1.8 1.8 0 0 0 8.4 19.3a1.8 1.8 0 0 0-1.98.36l-.05.05a2.1 2.1 0 1 1-2.97-2.97l.05-.05A1.8 1.8 0 0 0 3.8 14.7a1.8 1.8 0 0 0-1.65-1.1H2a2.1 2.1 0 1 1 0-4.2h.08A1.8 1.8 0 0 0 3.7 8.3a1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.1 2.1 0 1 1 6.26 3.3l.05.05A1.8 1.8 0 0 0 8.3 3.7h.1A1.8 1.8 0 0 0 9.5 2.1V2a2.1 2.1 0 1 1 4.2 0v.08a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.05-.05a2.1 2.1 0 1 1 2.97 2.97l-.05.05A1.8 1.8 0 0 0 19.4 8.3v.1a1.8 1.8 0 0 0 1.65 1.1H21a2.1 2.1 0 1 1 0 4.2h-.08A1.8 1.8 0 0 0 19.4 15Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export default function ProfileDropdown() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@cvbuilder.com");
  const [userPhoto, setUserPhoto] = useState("");

  const loadUserData = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setUserName(user.name || "User");
        setUserEmail(user.email || "user@cvbuilder.com");
        setUserPhoto(user.photo || "");
      } catch {
        setUserName("User");
        setUserEmail("user@cvbuilder.com");
        setUserPhoto("");
      }
    }
  };

  useEffect(() => {
    loadUserData();

    window.addEventListener("profile-updated", loadUserData);
    window.addEventListener("storage", loadUserData);

    return () => {
      window.removeEventListener("profile-updated", loadUserData);
      window.removeEventListener("storage", loadUserData);
    };
  }, []);

  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="profile-dropdown">
      <button
        type="button"
        className="profile-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="profile-avatar">
          {userPhoto ? <img src={userPhoto} alt={userName} /> : userInitial}
        </span>

        <span className="profile-meta">
          <small>Akun Saya</small>
          <strong>{userName}</strong>
        </span>

        <span className={`profile-arrow ${open ? "open" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="profile-menu">
          <div className="profile-menu-header">
            <div className="profile-menu-avatar">
              {userPhoto ? <img src={userPhoto} alt={userName} /> : userInitial}
            </div>

            <div>
              <strong>{userName}</strong>
              <small>{userEmail}</small>
            </div>
          </div>

          <div className="profile-menu-list">
            <Link href="/profile" onClick={() => setOpen(false)}>
              <span className="profile-menu-icon">
                <UserIcon />
              </span>

              <span className="profile-menu-text">
                <strong>Akun & Profil</strong>
                <small>Edit identitas dan foto profil</small>
              </span>
            </Link>

            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <span className="profile-menu-icon">
                <FileIcon />
              </span>

              <span className="profile-menu-text">
                <strong>CV Saya</strong>
                <small>Lihat dan kelola CV</small>
              </span>
            </Link>

            <Link href="/settings" onClick={() => setOpen(false)}>
              <span className="profile-menu-icon">
                <SettingsIcon />
              </span>

              <span className="profile-menu-text">
                <strong>Pengaturan</strong>
                <small>Preferensi akun dan aplikasi</small>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="profile-logout"
            onClick={handleLogout}
          >
            <span className="profile-menu-icon logout-icon">
              <LogoutIcon />
            </span>

            <span className="profile-menu-text">
              <strong>Keluar</strong>
              <small>Akhiri sesi akun</small>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
