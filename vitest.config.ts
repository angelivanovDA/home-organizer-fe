import { mergeConfig, type ConfigEnv, type UserConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

const resolveViteConfig = (env: ConfigEnv): UserConfig =>
  typeof viteConfig === "function" ? viteConfig(env) : viteConfig;

export default defineConfig((env) =>
  mergeConfig(
    resolveViteConfig(env),
    defineConfig({
      test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        css: true,
        coverage: {
          provider: "v8",
          reporter: ["text", "html", "lcov"],
          include: ["src/**/*.{ts,tsx}"],
          exclude: [
            "src/**/*.{test,spec}.{ts,tsx}",
            "src/test/**",
            "src/main.tsx",
            "src/vite-env.d.ts",
          ],
        },
      },
    }),
  ),
);
