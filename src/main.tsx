import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";

import AntProvider from "@/libs/AntProvider";
import "@/styles/index.css";

async function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_ENABLE_MOCK_API !== "true") {
    return;
  }

  try {
    const { worker } = await import("@/mocks/browser");
    const { exposeMockDbInDev } = await import("@/mocks/devTools");
    exposeMockDbInDev();

    await worker.start({
      onUnhandledRequest: "warn",
      quiet: import.meta.env.DEV ? false : true,
    });
  } catch (error) {
    console.error("[mock] Failed to start mock API:", error);
  }
}

async function bootstrap(): Promise<void> {
  try {
    await enableMocking();

    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error('Root element "#root" not found.');
    }

    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <AntProvider>
            <App />
          </AntProvider>
        </BrowserRouter>
      </StrictMode>,
    );
  } catch (error) {
    console.error("Failed to bootstrap application:", error);
  }
}

void bootstrap();
