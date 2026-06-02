// Regenerate the printed survey's QR code. Run when the survey URL changes:
//   node scripts/gen-survey-qr.mjs
// Writes a crisp black-on-white SVG (best for scanning off paper) to /public.
import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const URL = "https://townofpaonia.co/parking/survey";
const OUT = "public/parking/survey-qr.svg";

const svg = await QRCode.toString(URL, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 1,
  color: { dark: "#1a1916", light: "#ffffff" },
});
writeFileSync(OUT, svg);
console.log(`wrote ${OUT} -> ${URL}`);
