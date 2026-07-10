"use strict";

/*
 * FXG Video tech 2026(c) 西顾视频科技有限公司
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..", "..");
const python = "/Users/apple/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const script = `
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Preformatted, Spacer, KeepTogether

source = Path("${path.join(root, "panorama-viewer/docs/wechat-mini-program-publish.md")}")
output = Path("${path.join(root, "panorama-viewer/docs/FXGVR-fpp-html-wechat-mini-program-publish.pdf")}")
font_path = "/System/Library/Fonts/STHeiti Light.ttc"
font_bold_path = "/System/Library/Fonts/STHeiti Medium.ttc"

pdfmetrics.registerFont(TTFont("FXGHeiti", font_path))
pdfmetrics.registerFont(TTFont("FXGHeitiBold", font_bold_path))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="DocTitle",
    fontName="FXGHeitiBold",
    fontSize=23,
    leading=30,
    alignment=TA_CENTER,
    textColor=colors.HexColor("#12343a"),
    spaceAfter=12,
))
styles.add(ParagraphStyle(
    name="H2",
    fontName="FXGHeitiBold",
    fontSize=15,
    leading=22,
    textColor=colors.HexColor("#0a6f77"),
    spaceBefore=14,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="H3",
    fontName="FXGHeitiBold",
    fontSize=12,
    leading=18,
    textColor=colors.HexColor("#1b232b"),
    spaceBefore=10,
    spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BodyCN",
    fontName="FXGHeiti",
    fontSize=10.5,
    leading=17,
    textColor=colors.HexColor("#1f2933"),
    spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="ListCN",
    parent=styles["BodyCN"],
    leftIndent=12,
    firstLineIndent=-12,
))
styles.add(ParagraphStyle(
    name="Meta",
    parent=styles["BodyCN"],
    alignment=TA_CENTER,
    textColor=colors.HexColor("#66727d"),
))
styles.add(ParagraphStyle(
    name="Footer",
    fontName="FXGHeiti",
    fontSize=8,
    leading=10,
    textColor=colors.HexColor("#7a858f"),
))

def esc(text):
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )

def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#d6e3e5"))
    canvas.line(18 * mm, 282 * mm, 192 * mm, 282 * mm)
    canvas.setFont("FXGHeiti", 8)
    canvas.setFillColor(colors.HexColor("#7a858f"))
    canvas.drawString(18 * mm, 11 * mm, "FXGVR fpp.html 微信小程序发布说明")
    canvas.drawRightString(192 * mm, 11 * mm, f"第 {doc.page} 页")
    canvas.restoreState()

doc = BaseDocTemplate(
    str(output),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=20 * mm,
    bottomMargin=18 * mm,
)
frame = Frame(doc.leftMargin, doc.bottomMargin + 6 * mm, doc.width, doc.height - 8 * mm, id="normal")
doc.addPageTemplates([PageTemplate(id="content", frames=[frame], onPage=draw_page)])

lines = source.read_text(encoding="utf-8").splitlines()
story = []
in_code = False
code_lines = []

def flush_code():
    global code_lines
    if not code_lines:
        return
    text = "\\n".join(code_lines)
    story.append(Spacer(1, 3))
    story.append(Preformatted(
        text,
        ParagraphStyle(
            name="Code",
            fontName="Courier",
            fontSize=8,
            leading=10,
            textColor=colors.HexColor("#17313a"),
            backColor=colors.HexColor("#f3f7f8"),
            borderColor=colors.HexColor("#d7e4e7"),
            borderWidth=0.5,
            borderPadding=6,
            leftIndent=0,
            rightIndent=0,
            spaceAfter=7,
        )
    ))
    code_lines = []

for raw in lines:
    line = raw.rstrip()
    if line.startswith(chr(96) * 3):
        if in_code:
            flush_code()
            in_code = False
        else:
            in_code = True
            code_lines = []
        continue

    if in_code:
        code_lines.append(line)
        continue

    if not line:
        story.append(Spacer(1, 4))
        continue

    if line.startswith("# "):
        story.append(Paragraph(esc(line[2:]), styles["DocTitle"]))
        continue

    if line.startswith("## "):
        story.append(Paragraph(esc(line[3:]), styles["H2"]))
        continue

    if line.startswith("### "):
        story.append(Paragraph(esc(line[4:]), styles["H3"]))
        continue

    if line.startswith("版本：") or line.startswith("日期：") or line.startswith("FXG Video"):
        story.append(Paragraph(esc(line), styles["Meta"]))
        continue

    if line[:3].strip(".").isdigit() and ". " in line[:5]:
        story.append(Paragraph(esc(line), styles["ListCN"]))
        continue

    story.append(Paragraph(esc(line), styles["BodyCN"]))

flush_code()
doc.build(story)
print(output)
`;

const result = spawnSync(python, ["-c", script], {
  cwd: root,
  encoding: "utf8",
});

if (result.status !== 0) {
  process.stderr.write(result.stderr);
  process.exit(result.status || 1);
}

process.stdout.write(result.stdout);
