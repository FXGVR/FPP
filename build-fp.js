"use strict";

/*
 * FXG Video tech 2026(c) 西顾视频科技有限公司
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = __dirname;
const indexPath = path.join(root, "index.html");
const stylesPath = path.join(root, "styles.css");
const appPath = path.join(root, "app.js");
const outputPath = path.join(root, "fpp.html");
const gzipPath = path.join(root, "fpp.html.gz");
const checkOnly = process.argv.includes("--check");

const html = fs.readFileSync(indexPath, "utf8");
const css = fs.readFileSync(stylesPath, "utf8").trimEnd();
const js = fs.readFileSync(appPath, "utf8").trimEnd();

const inlineCss = minifyCss(css).replace(/<\/style/gi, "<\\/style");
const inlineJs = minifyJs(js).replace(/<\/script/gi, "<\\/script");
const htmlShell = minifyHtmlShell(html);

const output = htmlShell
  .replace(
    '<link rel="stylesheet" href="./styles.css">',
    `<style>${inlineCss}</style>`
  )
  .replace(
    '<script src="./app.js"></script>',
    `<script>${inlineJs}</script>`
  );

const compressedOutput = zlib.gzipSync(output, { level: 9 });

if (output === htmlShell) {
  throw new Error("没有找到 styles.css 或 app.js 的外链标签，无法生成 fpp.html。");
}

if (checkOnly) {
  assertFileMatches(outputPath, Buffer.from(output));
  assertFileMatches(gzipPath, compressedOutput);
  console.log("发布产物检查通过：fpp.html 和 fpp.html.gz 与源码一致。");
} else {
  fs.writeFileSync(outputPath, output);
  fs.writeFileSync(gzipPath, compressedOutput);
  console.log(`已生成 ${outputPath}`);
  console.log(`已生成 ${gzipPath}`);
  console.log(`原始合计 ${formatBytes(html.length + css.length + js.length)}，部署文件 ${formatBytes(output.length)}，gzip 文件 ${formatBytes(compressedOutput.length)}`);
}

function assertFileMatches(filePath, expected) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`缺少发布产物：${path.basename(filePath)}。请先运行 node build-fp.js。`);
  }

  const actual = fs.readFileSync(filePath);
  if (!actual.equals(expected)) {
    throw new Error(`发布产物已过期：${path.basename(filePath)}。请先运行 node build-fp.js。`);
  }
}

function minifyHtmlShell(source) {
  return source
    .replace(/<!--(?! FXG Video tech 2026\(c\) 西顾视频科技有限公司 -->)[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function minifyCss(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJs(source) {
  return stripJsComments(source)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function stripJsComments(source) {
  let output = "";
  let state = "normal";
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (state === "lineComment") {
      if (char === "\n") {
        output += char;
        state = "normal";
      }
      continue;
    }

    if (state === "blockComment") {
      if (char === "*" && next === "/") {
        index += 1;
        state = "normal";
      }
      continue;
    }

    if (state === "single" || state === "double" || state === "template") {
      output += char;

      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if ((state === "single" && char === "'")
        || (state === "double" && char === "\"")
        || (state === "template" && char === "`")) {
        state = "normal";
      }

      continue;
    }

    if (char === "/" && next === "/") {
      state = "lineComment";
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      state = "blockComment";
      index += 1;
      continue;
    }

    if (char === "'") {
      state = "single";
    } else if (char === "\"") {
      state = "double";
    } else if (char === "`") {
      state = "template";
    }

    output += char;
  }

  return output;
}

function formatBytes(value) {
  return `${(value / 1024).toFixed(1)}KB`;
}
