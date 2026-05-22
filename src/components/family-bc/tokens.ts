export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const familyBCPalette = {
  white: "#ffffff",
  warmWhite: "#fbfbfa",
  ink: "#111318",
  navy: "#475564",
  blue: "#75bee9",
  green: "#59aa47",
  red: "#c9252c",
  gray: "#8899aa",
  lightGray: "#e8eef3",
  sand: "#f5f8f2",
};

export const familyBCType = {
  display: "Tahoma, Aptos Display, Segoe UI, sans-serif",
  body: "Tahoma, Aptos, Segoe UI, sans-serif",
};

export const familyBCFormat = {
  width: 1080,
  height: 1920,
  fps: 30,
};

export type FamilyBCAccent = "green" | "blue" | "red";

export const colorForAccent = (accent: FamilyBCAccent) => familyBCPalette[accent];
