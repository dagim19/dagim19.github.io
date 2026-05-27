import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const templatePath = resolve(root, "dist", "index.html");
const ssrEntryPath = resolve(root, "dist", "server", "entry-server.mjs");

const template = readFileSync(templatePath, "utf-8");
const { render } = await import(pathToFileURL(ssrEntryPath).href);

const appHtml = render();
const html = template.replace("<!--ssr-outlet-->", appHtml);

writeFileSync(templatePath, html, "utf-8");
rmSync(resolve(root, "dist", "server"), { recursive: true, force: true });
console.log("✓ Pre-rendered dist/index.html");
