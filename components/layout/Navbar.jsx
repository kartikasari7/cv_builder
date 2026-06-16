"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logoIcon from "@/assets/images/icon.png";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [user, setUser] = useState({
    name: "User",
    email: "",
    photo: "",
  });

  const loadUser = () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setUser({
        name: "User",
        email: "",
        photo: "",
      });
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      setUser({
        name: parsedUser.name || "User",
        email: parsedUser.email || "",
        photo: parsedUser.photo || parsedUser.profilePhoto || "",
      });
    } catch {
      setUser({
        name: "User",
        email: "",
        photo: "",
      });
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("profile-updated", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("profile-updated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const menus = [
    { label: "Home", href: "/dashboard" },
    { label: "Template", href: "/templates" },
    { label: "Buat CV", href: "/editor" },
    { label: "Review CV", href: "/preview" },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cvDraft");
    localStorage.removeItem("selectedTemplate");

    setOpenDropdown(false);
    router.push("/login");
  };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="app-topbar">
      <div className="app-navbar">
        <Link href="/dashboard" className="app-brand">
          <div className="app-brand-logo-wrap">
            <img
              src={logoIcon.src}
              alt="CV Builder"
              className="app-brand-logo"
            />
          </div>

          <div className="app-brand-text">
            <h1>CV Builder</h1>
            <span>Professional Resume Maker</span>
          </div>
        </Link>

        <nav className="app-navbar-menu">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={
                isActive(menu.href) ? "app-nav-link active" : "app-nav-link"
              }
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        <div className="app-navbar-user">
          <div className="profile-dropdown">
            <button
              type="button"
              className="profile-button"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="profile-avatar">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} />
                ) : (
                  <span>{initial}</span>
                )}
              </div>

              <div className="profile-meta">
                <small>Akun Saya</small>
                <strong>{user.name}</strong>
              </div>

              <span
                className={
                  openDropdown ? "profile-arrow open" : "profile-arrow"
                }
              >
                ▾
              </span>
            </button>

            {openDropdown && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <div className="profile-menu-avatar">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} />
                    ) : (
                      <span>{initial}</span>
                    )}
                  </div>

                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email || "Belum ada email"}</small>
                  </div>
                </div>

                <div className="profile-menu-list">
                  <Link href="/profile" onClick={() => setOpenDropdown(false)}>
                    <span className="profile-menu-icon">👤</span>

                    <span className="profile-menu-text">
                      <strong>Akun Saya</strong>
                      <small>Lihat dan edit profil</small>
                    </span>
                  </Link>

                  <Link href="/settings" onClick={() => setOpenDropdown(false)}>
                    <span className="profile-menu-icon">⚙️</span>

                    <span className="profile-menu-text">
                      <strong>Pengaturan</strong>
                      <small>Kelola preferensi akun</small>
                    </span>
                  </Link>

                  <button
                    type="button"
                    className="profile-logout"
                    onClick={handleLogout}
                  >
                    <span className="profile-menu-icon logout-icon">↩</span>

                    <span className="profile-menu-text">
                      <strong>Logout</strong>
                      <small>Keluar dari akun</small>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
