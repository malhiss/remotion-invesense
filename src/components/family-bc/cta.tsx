import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp, familyBCPalette } from "./tokens";

type CTAResidueObjectProps = {
  x: number;
  y: number;
  width: number;
  label: string;
  color?: string;
  startFrame?: number;
};

export const CTAResidueObject = ({
  x,
  y,
  width,
  label,
  color = familyBCPalette.green,
  startFrame = 0,
}: CTAResidueObjectProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, 34], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
      }}
    >
      <div
        style={{
          width,
          height: 8,
          borderRadius: 999,
          background: color,
          transform: `scaleX(${reveal})`,
          transformOrigin: "0 50%",
        }}
      />
      <div
        style={{
          marginTop: 14,
          fontSize: 22,
          fontWeight: 800,
          color: familyBCPalette.navy,
          opacity: reveal,
        }}
      >
        {label}
      </div>
    </div>
  );
};

type CTAKeywordCloseProps = {
  prompt: string;
  keyword: string;
  residueLabel: string;
};

export const CTAKeywordClose = ({
  prompt,
  keyword,
  residueLabel,
}: CTAKeywordCloseProps) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 32], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 78,
        right: 78,
        bottom: 176,
        opacity: appear,
        transform: `translate3d(0, ${32 - appear * 32}px, 0)`,
      }}
    >
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: familyBCPalette.green,
          width: 330,
          marginBottom: 32,
          transform: `scaleX(${appear})`,
          transformOrigin: "0 50%",
        }}
      />
      <div style={{ fontSize: 42, lineHeight: 1.05, fontWeight: 800 }}>
        {prompt}
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 112,
          lineHeight: 0.95,
          fontWeight: 900,
          letterSpacing: -5,
          color: familyBCPalette.ink,
        }}
      >
        comment "{keyword}"
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 28,
          color: familyBCPalette.navy,
          fontWeight: 700,
        }}
      >
        {residueLabel}
      </div>
    </div>
  );
};
