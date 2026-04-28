import { readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { defineConfig } from "vite";

const rootDir = __dirname;
const excludedHtmlInputs = new Set([
  "ideas/categories/front-door-porch-charm/index.html",
  "ideas/categories/seasonal-sweetness/index.html",
  "ideas/cute-front-door-ideas-that-feel-warm-right-away/index.html",
  "ideas/little-house-details-people-notice-right-away/index.html",
  "ideas/pretty-front-step-flowers-that-make-everything-feel-sweeter/index.html",
]);

function collectHtmlInputs(startDir) {
  const entries = readdirSync(startDir, { withFileTypes: true });
  const inputs = {};

  for (const entry of entries) {
    const absolutePath = resolve(startDir, entry.name);

    if (entry.isDirectory()) {
      Object.assign(inputs, collectHtmlInputs(absolutePath));
      continue;
    }

    if (!entry.isFile() || entry.name !== "index.html") {
      continue;
    }

    const relativePath = relative(rootDir, absolutePath).replace(/\\/g, "/");

    if (excludedHtmlInputs.has(relativePath)) {
      continue;
    }

    const key = relativePath
      .replace(/\\/g, "/")
      .replace(/\/index\.html$/, "")
      .replace(/[^a-zA-Z0-9/_-]/g, "")
      .replace(/\//g, "-") || "main";

    inputs[key] = absolutePath;
  }

  return inputs;
}

const htmlInputs = {
  main: resolve(rootDir, "index.html"),
  ...collectHtmlInputs(resolve(rootDir, "ideas")),
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlInputs,
      output: {
        entryFileNames: "assets/main-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: ({ names }) => {
          const firstName = names?.[0] || "";
          if (firstName.endsWith("ideas.css")) {
            return "assets/ideas-[hash][extname]";
          }
          if (firstName.endsWith("styles.css")) {
            return "assets/main-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
