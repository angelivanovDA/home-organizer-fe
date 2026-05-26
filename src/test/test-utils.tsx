/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import AntProvider from "@/libs/AntProvider";

/** This is a custom render function that wraps the component in a MemoryRouter and AntProvider */
export function AllProviders({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <AntProvider>{children}</AntProvider>
    </MemoryRouter>
  );
}

/* Custom render function */
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
