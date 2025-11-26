import { useEffect, useState } from "react";
import WalletConnect from "../walletConnect";
import WalletBalance from "../walletConnect/Walletbalance";



const Navbars = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {

    VITE_APP_BG_PRIMARY: bgPrimary,
    VITE_APP_BG_SECONDARY: bgSecondary,
    VITE_APP_BORDER: borderColor,
  } = import.meta.env;

  return (
    <header
      id="sticky-menu"
      className={`heist-navbar site-header ${scrolled ? "navbar-shadow" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? `${bgSecondary}f2` : `${bgPrimary}e6`,
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${borderColor}`,
        transition: "all 0.3s ease",
      }}
    >
      <div className="container">
        <nav
          className="navbar site-navbar w-100 d-flex align-items-center justify-content-between"
          style={{
            padding: "16px 0",
          }}
        >
          {/* 1. Left Section: Colorful Title */}
          <div
            className="d-flex align-items-center"
            style={{
              fontSize: '28px', // Slightly larger font
              fontWeight: '900', // Extra bold
              // 🚨 COLORFUL TITLE STYLING
              background: 'linear-gradient(90deg, #007bff, #28a745)', // Blue to Green gradient
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              MozBackgroundClip: 'text',

              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            TODO Dapp
          </div>
          <WalletBalance/>

          {/* 3. Right Section: Wallet Connect Button */}
          <div className="d-flex align-items-center gap-3">
            <WalletConnect />
          </div>
        </nav>
      </div>
    </header>
  )
};

export default Navbars;
