import * as THREE from "three";

interface CertificateText {
  title: string;
  subtitle: string;
  recipient: string;
  bodyLines: string[];
  footerLines: string[];
  signatureLeft: string;
  signatureRight: string;
  sealText: string;
}

/* ---------- Palette ---------- */
const INK = "#2B2620";
const INK_SOFT = "#4A443B";
const MUTED = "#8A8071";
const HAIRLINE = "#C9BFA8";
const SEAL_RED = "#7C2430";
const SEAL_RED_DARK = "#5E1A23";

/* Landscape A4 aspect ratio: 1.4142 : 1 */
const W = 1980;
const H = 1400;

/* Printable area, inset from the plate edge — every line of text is
   clamped to fit inside this box so nothing can ever bleed past the
   border, regardless of how long the supplied strings are. */
const MARGIN_X = 280;
const CONTENT_W = W - MARGIN_X * 2; // 1420px of safe text width
const BORDER_X = 90;
const BORDER_Y = 70;
const BORDER_W = W - BORDER_X * 2;
const BORDER_H = H - BORDER_Y * 2;

export function makeCertificateTexture(text: CertificateText): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  drawPaperBackground(ctx);
  drawFrame(ctx);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  /* ---------- Pass 1: work out sizes/wrapping before any drawing, so the
     whole block's real height is known and can be centered in the frame
     instead of being pinned to fixed offsets that break on long content. */
  const subtitleUpper = text.subtitle.toUpperCase();
  const subtitleSize = fitSpacedFontSize(ctx, subtitleUpper, CONTENT_W, 6, "600", 20, 12);

  const { head, tail } = splitTitle(text.title);
  const headSize = fitFontSize(ctx, head, CONTENT_W, "italic 400", 74, 38);
  const tailSize = tail ? fitFontSize(ctx, tail, CONTENT_W, "italic 400", 30, 18) : 0;

  const recipientSize = fitFontSize(ctx, text.recipient, CONTENT_W, "700", 44, 22);

  const bodySize = 18;
  ctx.font = `italic 400 ${bodySize}px Georgia, serif`;
  const wrappedBody = wrapLines(ctx, text.bodyLines, CONTENT_W);
  const bodyLineHeight = 26;

  const dateText = formatCeremonialDate(new Date()).toUpperCase();

  /* ---------- Pass 1b: lay out relative Y offsets from a running cursor ---------- */
  let y = 40; // relative cursor, shifted into place by topOffset below
  const subtitleY = y;
  y += 40;
  const dotRuleY = y;
  y += 66;
  const titleHeadY = y;
  y += headSize * 0.62;
  let titleTailY = 0;
  if (tail) {
    titleTailY = y + tailSize * 0.55;
    y += tailSize * 1.1;
  }
  y += 42;
  const presentedY = y;
  y += 38 + recipientSize * 0.18;
  const recipientY = y;
  y += recipientSize * 0.6 + 24;
  const bodyStartY = y;
  y += wrappedBody.length * bodyLineHeight;
  y += 8;
  const dateY = y;
  y += 110;
  const rowY = y;
  y += 150;
  const footerY = y;
  y += 24 + 40; // second footer line + bottom padding

  const totalHeight = y;
  const topOffset = BORDER_Y + Math.max(50, (BORDER_H - totalHeight) / 2);

  /* ---------- Pass 2: draw everything at its centered absolute position ---------- */
  ctx.fillStyle = MUTED;
  ctx.font = `600 ${subtitleSize}px Georgia, serif`;
  drawSpacedText(ctx, subtitleUpper, W / 2, topOffset + subtitleY, 6);

  drawDotRule(ctx, W / 2, topOffset + dotRuleY);

  ctx.font = `italic 400 ${headSize}px Georgia, serif`;
  ctx.fillStyle = INK;
  ctx.fillText(head, W / 2, topOffset + titleHeadY);

  if (tail) {
    ctx.font = `italic 400 ${tailSize}px Georgia, serif`;
    ctx.fillStyle = INK_SOFT;
    ctx.fillText(tail, W / 2, topOffset + titleTailY);
  }

  ctx.fillStyle = MUTED;
  ctx.font = "600 18px Georgia, serif";
  drawSpacedText(ctx, "PRESENTED TO", W / 2, topOffset + presentedY, 5);

  ctx.font = `700 ${recipientSize}px Georgia, serif`;
  ctx.fillStyle = INK;
  ctx.fillText(text.recipient, W / 2, topOffset + recipientY);

  ctx.fillStyle = INK_SOFT;
  ctx.font = `italic 400 ${bodySize}px Georgia, serif`;
  wrappedBody.forEach((line, i) => {
    ctx.fillText(line, W / 2, topOffset + bodyStartY + i * bodyLineHeight);
  });

  ctx.fillStyle = MUTED;
  ctx.font = "400 16px Georgia, serif";
  drawSpacedText(ctx, dateText, W / 2, topOffset + dateY, 4);

  const sealX = W / 2 - 368;
  const sig1X = W / 2 + 42;
  const sig2X = W / 2 + 424;
  const rowAbsY = topOffset + rowY;

  drawWaxSeal(ctx, sealX, rowAbsY, text.sealText, 46);
  drawSignatureBlock(ctx, sig1X, rowAbsY, text.signatureLeft, "SIGNATORY");
  drawSignatureBlock(ctx, sig2X, rowAbsY, text.signatureRight, "REGISTRAR");

  ctx.fillStyle = MUTED;
  const footerAbsY = topOffset + footerY;
  text.footerLines.forEach((line, i) => {
    const size = fitSpacedFontSize(ctx, line, CONTENT_W, 3, "400", 15, 10);
    ctx.font = `400 ${size}px Georgia, serif`;
    drawSpacedText(ctx, line, W / 2, footerAbsY + i * 24, 3);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/* ================= Background & frame ================= */

function drawPaperBackground(ctx: CanvasRenderingContext2D) {
  const baseGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.15, W / 2, H / 2, W * 0.85);
  baseGrad.addColorStop(0, "#FCFAF3");
  baseGrad.addColorStop(0.6, "#F5F0E4");
  baseGrad.addColorStop(1, "#E8E1CC");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 26; i++) {
    const y = Math.random() * H;
    const h = 2 + Math.random() * 16;
    ctx.fillStyle = `rgba(120,95,60,${0.006 + Math.random() * 0.01})`;
    ctx.fillRect(0, y, W, h);
  }

  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 0.8;
    const dark = Math.random() > 0.5;
    ctx.fillStyle = dark
      ? `rgba(60,50,40,${0.015 + Math.random() * 0.04})`
      : `rgba(255,255,255,${0.02 + Math.random() * 0.035})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 9; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 18 + Math.random() * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(150,120,80,${0.04 + Math.random() * 0.03})`);
    g.addColorStop(1, "rgba(150,120,80,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const vign = ctx.createRadialGradient(W / 2, H / 2, W * 0.32, W / 2, H / 2, W * 0.72);
  vign.addColorStop(0, "rgba(0,0,0,0)");
  vign.addColorStop(1, "rgba(70,55,35,0.12)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(200,175,130,0.035)";
  ctx.fillRect(0, 0, W, H);
}

function drawFrame(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(BORDER_X, BORDER_Y, BORDER_W, BORDER_H);

  drawCornerOrnament(ctx, BORDER_X, BORDER_Y);
  drawCornerOrnament(ctx, BORDER_X + BORDER_W, BORDER_Y);
  drawCornerOrnament(ctx, BORDER_X, BORDER_Y + BORDER_H);
  drawCornerOrnament(ctx, BORDER_X + BORDER_W, BORDER_Y + BORDER_H);
}

/* ================= Text fitting helpers ================= */

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  weightAndStyle: string,
  startSize: number,
  minSize: number
): number {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weightAndStyle} ${size}px Georgia, serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 1;
  }
  return size;
}

function fitSpacedFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  spacing: number,
  weightAndStyle: string,
  startSize: number,
  minSize: number
): number {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weightAndStyle} ${size}px Georgia, serif`;
    if (measureSpacedWidth(ctx, text, spacing) <= maxWidth) break;
    size -= 1;
  }
  return size;
}

function measureSpacedWidth(ctx: CanvasRenderingContext2D, text: string, spacing: number): number {
  const chars = text.split("");
  const widths = chars.map((c) => ctx.measureText(c).width);
  return widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
}

function wrapLines(ctx: CanvasRenderingContext2D, lines: string[], maxWidth: number): string[] {
  const out: string[] = [];
  lines.forEach((line) => {
    const words = line.split(" ");
    let current = "";
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && current) {
        out.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });
    if (current) out.push(current);
  });
  return out;
}

function splitTitle(title: string): { head: string; tail: string } {
  const idx = title.toLowerCase().indexOf(" of ");
  if (idx === -1) return { head: title, tail: "" };
  return { head: title.slice(0, idx), tail: title.slice(idx + 1) };
}

function formatCeremonialDate(d: Date): string {
  const day = Number(d.toLocaleDateString("en-US", { day: "numeric" }));
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `Given this ${day}${ordinalSuffix(day)} day of ${month}, ${year}`;
}

function ordinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function drawSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  spacing: number
) {
  const chars = text.split("");
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let x = cx - total / 2;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, x, cy);
    x += widths[i] + spacing;
  });
  ctx.textAlign = prevAlign;
}

function drawDotRule(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.strokeStyle = HAIRLINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 34, cy);
  ctx.lineTo(cx - 8, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 8, cy);
  ctx.lineTo(cx + 34, cy);
  ctx.stroke();
  ctx.fillStyle = INK_SOFT;
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-9, -9, 18, 18);
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawSignatureScribble(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(43,38,32,0.78)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx - 65, cy + 6);
  ctx.bezierCurveTo(cx - 42, cy - 22, cx - 20, cy + 14, cx, cy - 4);
  ctx.bezierCurveTo(cx + 14, cy - 18, cx + 28, cy + 10, cx + 50, cy - 8);
  ctx.bezierCurveTo(cx + 60, cy - 14, cx + 64, cy + 2, cx + 68, cy + 2);
  ctx.stroke();
  ctx.restore();
}

function drawSignatureBlock(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  name: string,
  role: string
) {
  const maxWidth = 200;
  drawSignatureScribble(ctx, cx, baseY - 28);

  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - maxWidth / 2, baseY);
  ctx.lineTo(cx + maxWidth / 2, baseY);
  ctx.stroke();

  const nameSize = fitFontSize(ctx, name, maxWidth, "italic 400", 20, 13);
  ctx.font = `italic 400 ${nameSize}px Georgia, serif`;
  ctx.fillStyle = INK;
  ctx.fillText(name, cx, baseY + 24);

  ctx.fillStyle = MUTED;
  const roleSize = fitSpacedFontSize(ctx, role, maxWidth, 3, "600", 12, 9);
  ctx.font = `600 ${roleSize}px Georgia, serif`;
  drawSpacedText(ctx, role, cx, baseY + 48, 3);
}

function drawWaxSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  sealText: string,
  r: number
) {
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;

  const sealGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
  sealGrad.addColorStop(0, SEAL_RED);
  sealGrad.addColorStop(1, SEAL_RED_DARK);
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(252,248,235,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
  ctx.stroke();

  const lines = sealText.split("\n");
  const maxLineWidth = (r - 8) * 1.5;
  ctx.fillStyle = "#FCF8EB";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((line, i) => {
    const size = fitSpacedFontSize(ctx, line, maxLineWidth, 1.5, "700", 11, 7);
    ctx.font = `700 ${size}px Georgia, serif`;
    const offsetY = (i - (lines.length - 1) / 2) * (size + 2);
    drawSpacedText(ctx, line, cx, cy + offsetY, 1.5);
  });

  drawStar(ctx, cx, cy + r + 13, 5, "#FCF8EB");
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const outerX = cx + Math.cos(angle) * r;
    const outerY = cy + Math.sin(angle) * r;
    const innerAngle = angle + Math.PI / 5;
    const innerX = cx + Math.cos(innerAngle) * (r * 0.45);
    const innerY = cy + Math.sin(innerAngle) * (r * 0.45);
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}