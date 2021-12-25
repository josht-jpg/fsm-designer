import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BrowserContext from "../contexts/BrowserContext";

const IndexPage = () => {
  const [browserName, setBrowserName] = useState<string>();

  useEffect(() => {
    if (
      window.navigator.userAgent.toLowerCase().includes("firefox") ||
      window.navigator.userAgent.toLowerCase().includes("safari")
    ) {
      document.body.style.fontFamily = "Inter, sans-serif";
    }

    setBrowserName(window.navigator.userAgent.toLowerCase());
  }, [setBrowserName]);

  return (
    <BrowserContext.Provider value={browserName}>
      <Layout />
    </BrowserContext.Provider>
  );
};

export default IndexPage;
