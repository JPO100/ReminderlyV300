import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const uiDir = resolve(__dirname, "..", "src", "app", "components", "ui");

if (existsSync(uiDir)) {
  console.warn(
    "Warning: src/app/components/ui is platform-managed in Figma Make and cannot be deleted here. Do not import from it."
  );
}

process.exit(0);
