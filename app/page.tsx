import "@/assets/styles/public-navbar.css";
import "@/assets/styles/landing.css";

import PublicNavbar from "@/components/layout/PublicNavbar";
import LandingPage from "@/components/pages/LandingPage";

export default function Page() {
  return (
    <>
      <PublicNavbar />
      <LandingPage />
    </>
  );
}
