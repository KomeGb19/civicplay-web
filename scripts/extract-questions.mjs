import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(
  path.resolve(__dirname, "../../CivicPlay/scripts/quiz.js"),
  "utf8",
);

function extract(name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error(`missing ${name}`);
  const bracketStart = src.indexOf("[", start);
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`unclosed ${name}`);
  const literal = src.slice(bracketStart, end + 1);
  const arr = eval(literal);
  return arr.map((q) => ({
    text: q.q,
    options: q.a,
    correctIndex: q.c,
    explanation: q.e,
  }));
}

const levels = {
  basic: extract("BASIC_QUESTIONS"),
  intermediary: extract("INTERMEDIARY_QUESTIONS"),
  advance: extract("ADVANCE_QUESTIONS"),
};

const outDir = path.resolve(__dirname, "../src/lib/questions");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "banks.json"),
  JSON.stringify(levels, null, 2),
);
for (const [k, v] of Object.entries(levels)) {
  console.log(k, v.length);
}
console.log("wrote banks.json");
