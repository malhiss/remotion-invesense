import type { CSSProperties, ReactNode } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, familyBCPalette, familyBCType } from "./tokens";

export const familyBCSafeZones = {
  x: 72,
  top: 96,
  bottom: 148,
  headlineBottom: 430,
  ctaTop: 1260,
} as const;

export const SafeZoneEditorialStack = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      left: familyBCSafeZones.x,
      right: familyBCSafeZones.x,
      top: familyBCSafeZones.top,
      bottom: familyBCSafeZones.bottom,
      ...style,
    }}
  >
    {children}
  </div>
);

export const ReviewOnlyOverlay = ({
  visible = false,
  children,
}: {
  visible?: boolean;
  children: ReactNode;
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 32,
        right: 32,
        bottom: 26,
        padding: "12px 18px",
        borderRadius: 18,
        background: "rgba(71, 85, 100, 0.86)",
        color: "#fff",
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </div>
  );
};

export const PhysicalThresholdGate = ({
  contact,
  label,
}: {
  contact: number;
  label: string;
}) => {
  const open = Math.min(1, Math.max(0, contact));

  return (
    <g>
      <line
        x1={704}
        x2={704 + open * 24}
        y1={86}
        y2={366}
        stroke={familyBCPalette.green}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <line
        x1={668}
        x2={708 + open * 30}
        y1={190 - open * 22}
        y2={190 - open * 22}
        stroke={familyBCPalette.green}
        strokeWidth={12}
        strokeLinecap="round"
        transform={`rotate(${-12 * open} 704 190)`}
      />
      <line
        x1={668}
        x2={708 + open * 30}
        y1={258 + open * 18}
        y2={258 + open * 18}
        stroke={familyBCPalette.green}
        strokeWidth={12}
        strokeLinecap="round"
        transform={`rotate(${10 * open} 704 258)`}
      />
      <rect
        x={628}
        y={310}
        width={154}
        height={58}
        rx={18}
        fill={familyBCPalette.green}
      />
      <text
        x={705}
        y={348}
        textAnchor="middle"
        fontFamily={familyBCType.body}
        fontSize={28}
        fontWeight={950}
        fill="#fff"
      >
        {label}
      </text>
    </g>
  );
};

export const EventAttachedProof = ({
  text,
  subtext,
  startFrame,
  x,
  y,
}: {
  text: string;
  subtext: string;
  startFrame: number;
  x: number;
  y: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame - startFrame, [0, 24], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.72 },
    durationInFrames: 34,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `translate3d(-50%, -50%, 0) scale(${0.88 + pop * 0.12})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: familyBCType.display,
          fontSize: 92,
          lineHeight: 0.86,
          fontWeight: 950,
          letterSpacing: -5,
          color: familyBCPalette.green,
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 16,
          maxWidth: 300,
          fontSize: 24,
          lineHeight: 1.08,
          fontWeight: 850,
          color: familyBCPalette.navy,
        }}
      >
        {subtext}
      </div>
    </div>
  );
};

export const BrandedResearchCta = ({
  opacity,
  lead,
}: {
  opacity: number;
  lead: string;
}) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 174,
      opacity,
      textAlign: "center",
      transform: `translate3d(0, ${28 - opacity * 28}px, 0)`,
    }}
  >
    <div
      style={{
        width: 520,
        height: 10,
        borderRadius: 999,
        background: familyBCPalette.green,
        boxShadow: "0 0 26px rgba(89,170,71,0.22)",
        margin: "0 auto 32px",
        transform: `scaleX(${opacity})`,
      }}
    />
    <div
      style={{
        fontSize: 42,
        lineHeight: 1.08,
        fontWeight: 850,
        color: familyBCPalette.navy,
      }}
    >
      {lead}
    </div>
    <div
      style={{
        marginTop: 42,
        fontFamily: familyBCType.display,
        fontSize: 62,
        lineHeight: 0.92,
        fontWeight: 900,
        letterSpacing: 2,
        color: familyBCPalette.ink,
      }}
    >
      INVE<span style={{ color: familyBCPalette.blue }}>SENSE</span>
    </div>
    <div
      style={{
        marginTop: 30,
        fontSize: 31,
        color: "rgba(71,85,100,0.62)",
      }}
    >
      Read the research -&gt; invesense.com/insights
    </div>
  </div>
);
