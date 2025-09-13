// scripts/clean.js
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");

// Pastas que queremos apagar
const FOLDERS_TO_CLEAN = ["node_modules", "dist", ".nuxt", ".turbo", ".output"];

// Função para remover pasta recursivamente
function removeFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Removed: ${folderPath}`);
  }
}

// Função que percorre todas as pastas e limpa
function cleanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (FOLDERS_TO_CLEAN.includes(entry.name)) {
        removeFolder(fullPath);
      } else {
        cleanDir(fullPath); // recursivo
      }
    }
  }
}

// Limpa a raiz
cleanDir(ROOT_DIR);
console.log("✅ Clean finished!");