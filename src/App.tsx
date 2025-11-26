import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Header,
  TodoPage,
} from "./components/index";
import "./css/heist-theme.css";

import { Web3ModalProvider } from "./providers/web3Provider";
// import { Toaster } from "react-hot-toast";
const AppTitle = import.meta.env.VITE_APP_TITLE;
const fontFamily = import.meta.env.VITE_APP_FONT_FAMILY || "Arial, sans-serif";
const favicon = import.meta.env.VITE_APP_FAVICON || "/favicon.ico";

const App: React.FC = () => {
  useEffect(() => {
    document.title = AppTitle;
    document.body.style.fontFamily = fontFamily;
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = favicon;
    }

    const root = document.documentElement;
    root.style.setProperty(
      "--heist-box-shadow-card",
      import.meta.env.VITE_APP_BOX_SHADOW_CARD ||
      "0 8px 32px rgba(0, 0, 0, 0.3)"
    );
    root.style.setProperty(
      "--heist-box-shadow-card-hover",
      import.meta.env.VITE_APP_BOX_SHADOW_CARD_HOVER ||
      "0 12px 48px rgba(0, 0, 0, 0.4)"
    );
    root.style.setProperty(
      "--heist-box-shadow-btn",
      import.meta.env.VITE_APP_BOX_SHADOW_BTN ||
      "0 8px 24px rgba(219, 39, 119, 0.3)"
    );
    root.style.setProperty(
      "--heist-box-shadow-glow",
      import.meta.env.VITE_APP_BOX_SHADOW_GLOW ||
      "0 0 20px rgba(244, 114, 182, 0.3)"
    );
    root.style.setProperty(
      "--heist-box-shadow-focus",
      import.meta.env.VITE_APP_BOX_SHADOW_FOCUS ||
      "0 0 0 0.2rem rgba(244, 114, 182, 0.25)"
    );
  }, []);

  return (
    <Web3ModalProvider>
      <div className="heist-container">
        {/* <Toaster /> */}
        <Header />
        <TodoPage />
      </div>
    </Web3ModalProvider>
  );
};

export default App;
