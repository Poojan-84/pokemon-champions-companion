// Smooth red -> orange -> light-green -> dark-green gradient for stat bar
// fills, interpolated by exact percentage rather than stepped into buckets.
const STOPS: { percent: number; hex: string }[] = [
  { percent: 0, hex: "#e0403c" },
  { percent: 33, hex: "#f2924a" },
  { percent: 66, hex: "#8fd66a" },
  { percent: 100, hex: "#2f9e44" },
];

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getStatGradientColor(percent: number): string {
  const clamped = Math.min(100, Math.max(0, percent));

  let lower = STOPS[0];
  let upper = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (clamped >= STOPS[i].percent && clamped <= STOPS[i + 1].percent) {
      lower = STOPS[i];
      upper = STOPS[i + 1];
      break;
    }
  }

  const range = upper.percent - lower.percent;
  const t = range === 0 ? 0 : (clamped - lower.percent) / range;

  const [r1, g1, b1] = hexToRgb(lower.hex);
  const [r2, g2, b2] = hexToRgb(upper.hex);
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}
