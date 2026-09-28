import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    {
      name: "samples-directory-index",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const [pathname, search = ""] = req.url.split("?");
          const qs = search ? `?${search}` : "";
          if (pathname === "/samples/gym01" || pathname === "/samples/gym01/en") {
            res.writeHead(302, { Location: `${pathname}/${qs}` });
            res.end();
            return;
          }
          if (pathname === "/samples/gym01/") {
            req.url = `/samples/gym01/index.html${qs}`;
          } else if (pathname === "/samples/gym01/en/") {
            req.url = `/samples/gym01/en/index.html${qs}`;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        en: path.resolve(__dirname, "en/index.html"),
      },
    },
  },
}));