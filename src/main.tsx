import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";

import AntProvider from "@/libs/AntProvider";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AntProvider>
        <App />
      </AntProvider>
    </BrowserRouter>
  </StrictMode>,
);
