import Link from "next/link";

export default function PublicNavbar() {
  return (
    <header className="public-navbar">
      <div className="public-navbar-container">
        <Link href="/" className="public-navbar-brand">
          <div className="public-navbar-logo">CV</div>
          <div>
            <h1>CV Builder</h1>
            <p>Professional Resume Maker</p>
          </div>
        </Link>

        <nav className="public-navbar-menu">
          <Link href="/" className="public-navbar-link">
            Home
          </Link>

          <a href="#features" className="public-navbar-link">
            Fitur
          </a>

          <a href="#steps" className="public-navbar-link">
            Cara Kerja
          </a>

          <Link href="/login" className="public-navbar-link">
            Login
          </Link>

          <Link href="/register" className="public-navbar-button">
            Daftar Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}
