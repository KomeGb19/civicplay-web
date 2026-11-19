"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { PLEDGE_STEPS, SHARE_TEXT } from "@/lib/pledge";
import { signatureFont } from "@/components/pledge/signature-font";

type Props = { name: string; state?: string; signedAt: string };

const W = 1080;
const H = 1350;

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function drawCard(canvas: HTMLCanvasElement, p: Props) {
  const ctx = canvas.getContext("2d") as Ctx | null;
  if (!ctx) return;
  canvas.width = W;
  canvas.height = H;

  const navy = cssVar("--color-navy", "#0b1b3a");
  const navyDeep = cssVar("--color-navy-deep", "#071226");
  const cream = cssVar("--color-cream", "#f7f1e4");
  const creamMuted = cssVar("--color-cream-muted", "#b9b4a6");
  const green = cssVar("--color-green", "#2ee59d");
  const gold = cssVar("--color-gold", "#f5c542");
  const display = cssVar("--font-cal", "system-ui, sans-serif");
  const script = `${signatureFont.style.fontFamily}, cursive`;

  try {
    await Promise.all([
      document.fonts.load(`800 100px ${display}`),
      document.fonts.load(`120px ${script}`),
    ]);
  } catch {
    /* fall back to whatever is available */
  }

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, navy);
  bg.addColorStop(1, navyDeep);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = (x: number, y: number, r: number, color: string, a: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  };
  glow(W * 0.2, 0, 760, green, 0.22);
  glow(W * 0.95, H * 0.92, 700, gold, 0.16);

  // Frame
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = gold;
  ctx.lineWidth = 3;
  roundRect(ctx, 36, 36, W - 72, H - 72, 44);
  ctx.stroke();
  ctx.restore();

  // Logo and wordmark
  const logo = await loadImage("/props/civicplaywhite.png");
  if (logo) ctx.drawImage(logo, 90, 84, 84, 84);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = cream;
  ctx.font = `700 36px ${display}`;
  ctx.fillText("CIVIC PLAY", logo ? 196 : 90, 140);

  // Eyebrow
  ctx.textAlign = "center";
  ctx.fillStyle = green;
  ctx.font = `700 30px ${display}`;
  ctx.letterSpacing = "8px";
  ctx.fillText("NIGERIA · 2027 ELECTIONS", W / 2, 290);
  ctx.letterSpacing = "0px";

  // Title
  ctx.fillStyle = cream;
  let titleSize = 170;
  ctx.font = `800 ${titleSize}px ${display}`;
  while (ctx.measureText("I PLEDGED.").width > W - 180 && titleSize > 90) {
    titleSize -= 6;
    ctx.font = `800 ${titleSize}px ${display}`;
  }
  ctx.fillText("I PLEDGED.", W / 2, 440);

  // Three promises
  ctx.textAlign = "left";
  PLEDGE_STEPS.forEach((step, i) => {
    const y = 570 + i * 112;
    ctx.fillStyle = green;
    ctx.beginPath();
    ctx.arc(170, y - 16, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = navyDeep;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(156, y - 15);
    ctx.lineTo(166, y - 5);
    ctx.lineTo(186, y - 29);
    ctx.stroke();
    ctx.fillStyle = cream;
    ctx.font = `700 50px ${display}`;
    ctx.fillText(step.cardLine, 232, y);
  });

  // Divider
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = cream;
  ctx.fillRect(110, 900, W - 220, 2);
  ctx.restore();

  // Signature
  ctx.textAlign = "center";
  ctx.fillStyle = creamMuted;
  ctx.font = `600 26px ${display}`;
  ctx.letterSpacing = "8px";
  ctx.fillText("SIGNED", W / 2, 960);
  ctx.letterSpacing = "0px";

  let sigSize = 240;
  ctx.font = `${sigSize}px ${script}`;
  while (ctx.measureText(p.name).width > 880 && sigSize > 60) {
    sigSize -= 8;
    ctx.font = `${sigSize}px ${script}`;
  }
  ctx.fillStyle = gold;
  ctx.fillText(p.name, W / 2, 1100);

  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = gold;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(240, 1135);
  ctx.bezierCurveTo(400, 1118, 700, 1150, 840, 1118);
  ctx.stroke();
  ctx.restore();

  // Name, state and date
  ctx.fillStyle = cream;
  ctx.font = `700 40px ${display}`;
  ctx.fillText(p.state ? `${p.name}  ·  ${p.state}` : p.name, W / 2, 1200);

  const date = new Date(p.signedAt).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  ctx.fillStyle = creamMuted;
  ctx.font = `500 30px ${display}`;
  ctx.fillText(`Signed on ${date}`, W / 2, 1246);

  // Footer
  ctx.fillStyle = green;
  ctx.font = `700 32px ${display}`;
  ctx.fillText(`${window.location.host}/pledge`, W / 2, 1306);
}

export function PledgeCard(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");
  const [canShare, setCanShare] = useState(false);
  // Filled in after mount so server and client markup match
  const [shareUrl, setShareUrl] = useState("/pledge");

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (canvas) {
      void drawCard(canvas, props).then(() => {
        if (cancelled) return;
        setCanShare(typeof navigator !== "undefined" && "share" in navigator);
        setShareUrl(`${window.location.origin}/pledge`);
      });
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name, props.state, props.signedAt]);

  const toBlob = () =>
    new Promise<Blob | null>((resolve) =>
      canvasRef.current
        ? canvasRef.current.toBlob(resolve, "image/png")
        : resolve(null),
    );

  const download = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "civic-play-pledge.png";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Image saved.");
  };

  const share = async () => {
    try {
      const blob = await toBlob();
      if (blob) {
        const file = new File([blob], "civic-play-pledge.png", {
          type: "image/png",
        });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            text: `${SHARE_TEXT} ${shareUrl}`,
          });
          return;
        }
      }
      await navigator.share({ text: SHARE_TEXT, url: shareUrl });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setStatus("Sharing isn’t available here. Try the buttons below.");
      }
    }
  };

  const text = encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`);

  const btn =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition";

  return (
    <div className="mx-auto w-full max-w-sm">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Pledge card signed by ${props.name}`}
        className="aspect-[4/5] w-full rounded-3xl border border-cream/10 shadow-2xl"
      />

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {canShare ? (
          <button
            type="button"
            onClick={share}
            className={`${btn} bg-green text-navy-deep hover:opacity-90`}
          >
            <Share2 className="size-4" aria-hidden /> Share
          </button>
        ) : null}
        <button
          type="button"
          onClick={download}
          className={`${btn} border border-cream/25 text-cream hover:bg-cream/10`}
        >
          <Download className="size-4" aria-hidden /> Save image
        </button>
        <a
          href={`https://wa.me/?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-cream/25 text-cream hover:bg-cream/10`}
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-cream/25 text-cream hover:bg-cream/10`}
        >
          X
        </a>
      </div>
      <p role="status" className="mt-3 min-h-5 text-center text-xs text-cream-muted">
        {status}
      </p>
    </div>
  );
}
