import type { CSSProperties } from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  clamp,
  colorForAccent,
  familyBCPalette,
  familyBCType,
  type FamilyBCAccent,
} from "./tokens";

type MetricHookProps = {
  eyebrow: string;
  value: string;
  subtitle: string;
  accent?: FamilyBCAccent;
};

export const MetricHook = ({
  eyebrow,
  value,
  subtitle,
  accent = "green",
}: MetricHookProps) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ position: "absolute", left: 74, right: 74, top: 120 }}>
      <div
        style={{
          fontSize: 27,
          fontWeight: 700,
          letterSpacing: 4,
          color: familyBCPalette.navy,
          textTransform: "uppercase",
          opacity: appear,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 42,
          fontFamily: familyBCType.display,
          fontSize: 154,
          lineHeight: 0.9,
          fontWeight: 900,
          letterSpacing: -9,
          color: familyBCPalette.ink,
          transform: `translate3d(0, ${34 - appear * 34}px, 0)`,
          opacity: appear,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 28,
          width: 190,
          height: 10,
          borderRadius: 999,
          background: colorForAccent(accent),
          transform: `scaleX(${appear})`,
          transformOrigin: "0 50%",
        }}
      />
      <div
        style={{
          marginTop: 36,
          maxWidth: 820,
          fontSize: 55,
          lineHeight: 1.02,
          fontWeight: 700,
          color: familyBCPalette.navy,
          opacity: appear,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

type KineticWordStackProps = {
  words: string[];
  x: number;
  y: number;
  highlight?: string;
  style?: CSSProperties;
};

export const KineticWordStack = ({
  words,
  x,
  y,
  highlight,
  style,
}: KineticWordStackProps) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", left: x, top: y, ...style }}>
      {words.map((word, index) => {
        const appear = interpolate(frame, [index * 8, index * 8 + 16], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });

        return (
          <div
            key={`${word}-${index}`}
            style={{
              fontSize: 64,
              lineHeight: 0.96,
              fontWeight: 850,
              letterSpacing: -2.6,
              color: word === highlight ? familyBCPalette.green : familyBCPalette.ink,
              opacity: appear,
              transform: `translate3d(0, ${24 - appear * 24}px, 0)`,
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};
