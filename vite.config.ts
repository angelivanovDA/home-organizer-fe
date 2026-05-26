import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.API_PROXY_TARGET ?? "http://localhost:3000";
  const devPort = Number(env.VITE_DEV_PORT) || 4000;
  const analyze = env.ANALYZE === "true";

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
      tailwindcss(),
      analyze &&
        visualizer({
          filename: "dist/stats.html",
          gzipSize: true,
          open: true,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: devPort,
      strictPort: true,
      open: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
        "/socket.io": {
          target: proxyTarget,
          ws: true,
        },
        "/uploads": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4001,
      strictPort: true,
    },
    build: {
      target: "es2020",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return;
            }
            if (id.includes("antd") || id.includes("@ant-design")) {
              return "antd";
            }
            if (id.includes("react-router")) {
              return "router";
            }
            if (id.includes("react-dom") || id.includes("/react/")) {
              return "react";
            }
            if (id.includes("socket.io-client")) {
              return "socket";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["antd", "@ant-design/icons", "socket.io-client"],
    },
  };
});
