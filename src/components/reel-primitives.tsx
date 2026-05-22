import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const displayFace =
  "'Space Grotesk', 'Archivo', 'Aptos Display', 'Segoe UI', sans-serif";

type HeroObjectProps = {
  startX: number;
  endX: number;
  y: number;
  size: number;
  impactFrame: number;
};

export const HeroObject = ({
  startX,
  endX,
  y,
  size,
  impactFrame,
}: HeroObjectProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const travel = interpolate(frame, [0, impactFrame], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.9, 0.16, 1),
  });
  const settle = spring({
    frame: frame - impactFrame,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.8 },
    durationInFrames: 28,
  });
  const x = interpolate(travel, [0, 1], [startX, endX]);
  const squash = interpolate(settle, [0, 1], [1, 0.9], clamp);
  const glow = interpolate(frame, [0, impactFrame], [0.24, 0.9], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        transform: `translate3d(-50%, -50%, 0) scale(${1 + settle * 0.04}, ${squash})`,
        background:
          "radial-gradient(circle at 34% 28%, #f9fff4 0%, #c7ffd4 17%, #43e07b 42%, #0d4429 72%, #07150f 100%)",
        boxShadow: `0 0 ${70 + glow * 80}px rgba(67, 224, 123, ${glow})`,
        border: "2px solid rgba(210, 255, 223, 0.72)",
      }}
    />
  );
};

type PhysicalConstraintProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  impactFrame: number;
};

export const PhysicalConstraint = ({
  x,
  y,
  width,
  height,
  impactFrame,
}: PhysicalConstraintProps) => {
  const frame = useCurrentFrame();
  const bend = spring({
    frame: frame - impactFrame,
    fps: 30,
    config: { damping: 15, stiffness: 120 },
    durationInFrames: 38,
  });
  const crack = interpolate(frame, [impactFrame + 4, impactFrame + 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg
      width={width}
      height={height + 180}
      viewBox={`0 0 ${width} ${height + 180}`}
      style={{
        position: "absolute",
        left: x,
        top: y - 90,
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="railGradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#d8ffe2" stopOpacity="0.22" />
          <stop offset="46%" stopColor="#79ff9d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d8ffe2" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <path
        d={`M ${width / 2} 30 C ${width / 2 + bend * 46} ${height * 0.34}, ${width / 2 + bend * 54} ${height * 0.66}, ${width / 2} ${height + 150}`}
        fill="none"
        stroke="url(#railGradient)"
        strokeWidth={24}
        strokeLinecap="round"
      />
      <path
        d={`M ${width / 2 - 5} ${height * 0.46} l ${-34 * crack} ${30 * crack} l ${42 * crack} ${20 * crack} l ${-28 * crack} ${36 * crack}`}
        fill="none"
        stroke="#f3fff5"
        strokeOpacity={crack}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type ImpactEventProps = {
  x: number;
  y: number;
  impactFrame: number;
};

const shards = [
  [-1, -0.8, 34],
  [-0.7, 0.9, 28],
  [0.6, -0.6, 22],
  [0.9, 0.5, 31],
  [0.25, -1, 26],
  [-0.15, 1, 24],
];

export const ImpactEvent = ({ x, y, impactFrame }: ImpactEventProps) => {
  const frame = useCurrentFrame();
  const blast = interpolate(frame, [impactFrame, impactFrame + 22], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(blast, [0, 0.82, 1], [0, 1, 0], clamp);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 24 + blast * 240,
          height: 24 + blast * 240,
          borderRadius: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          border: "3px solid rgba(202, 255, 217, 0.75)",
          opacity,
          boxShadow: "0 0 80px rgba(67, 224, 123, 0.55)",
        }}
      />
      {shards.map(([dx, dy, length], index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: x + dx * blast * 150,
            top: y + dy * blast * 150,
            width: length,
            height: 5,
            borderRadius: 999,
            background: "#dfffe8",
            opacity,
            transform: `translate3d(-50%, -50%, 0) rotate(${Math.atan2(dy, dx)}rad)`,
            boxShadow: "0 0 24px rgba(127, 255, 164, 0.8)",
          }}
        />
      ))}
    </>
  );
};

type ProofBirthProps = {
  value: string;
  label: string;
  x: number;
  y: number;
  birthFrame: number;
};

export const ProofBirth = ({
  value,
  label,
  x,
  y,
  birthFrame,
}: ProofBirthProps) => {
  const frame = useCurrentFrame();
  const emerge = interpolate(frame, [birthFrame, birthFrame + 34], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - emerge * 96,
        transform: `translate3d(-50%, -50%, 0) scale(${0.84 + emerge * 0.16})`,
        opacity: emerge,
        textAlign: "center",
        fontFamily: displayFace,
        color: "#effff3",
        textShadow: "0 0 34px rgba(96, 255, 139, 0.76)",
      }}
    >
      <div style={{ fontSize: 154, fontWeight: 800, letterSpacing: -8 }}>
        {value}
      </div>
      <div
        style={{
          marginTop: -16,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "rgba(224, 255, 231, 0.82)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

type ResidueFrameProps = {
  text: string;
  proof: string;
};

export const ResidueFrame = ({ text, proof }: ResidueFrameProps) => {
  const frame = useCurrentFrame();
  const settle = interpolate(frame, [0, 44], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        padding: 84,
        fontFamily: displayFace,
        color: "#f3fff6",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(94, 255, 134, 0.8) 48%, transparent 100%)",
          boxShadow: "0 0 50px rgba(94, 255, 134, 0.6)",
          transform: `scaleX(${settle})`,
          transformOrigin: "50% 50%",
        }}
      />
      <div
        style={{
          marginTop: 38,
          fontSize: 64,
          fontWeight: 780,
          lineHeight: 1.02,
          letterSpacing: -2,
          opacity: settle,
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 110,
          fontWeight: 850,
          lineHeight: 0.95,
          opacity: settle,
          color: "#83ff9f",
        }}
      >
        {proof}
      </div>
    </AbsoluteFill>
  );
};

type KineticCaptionProps = {
  text: string;
  style?: CSSProperties;
};

export const KineticCaption = ({ text, style }: KineticCaptionProps) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const visibleWordCount = Math.min(words.length, Math.floor(frame / 5) + 1);
  const reveal = interpolate(frame, [0, 26], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontFamily: displayFace,
        color: "#f6fff8",
        fontSize: 78,
        fontWeight: 780,
        lineHeight: 0.98,
        letterSpacing: -3,
        opacity: reveal,
        transform: `translate3d(0, ${32 - reveal * 32}px, 0)`,
        ...style,
      }}
    >
      {words.slice(0, visibleWordCount).join(" ")}
    </div>
  );
};

type LogoActorProps = {
  label: string;
  x: number;
  y: number;
};

export const LogoActor = ({ label, x, y }: LogoActorProps) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 24], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 112,
        height: 112,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(238, 255, 242, 0.1)",
        border: "1px solid rgba(221, 255, 228, 0.32)",
        color: "#eaffef",
        fontFamily: displayFace,
        fontSize: 26,
        fontWeight: 800,
        opacity: appear,
        transform: `translate3d(-50%, -50%, 0) scale(${0.82 + appear * 0.18})`,
      }}
    >
      {label}
    </div>
  );
};

type ChartAsObjectProps = {
  x: number;
  y: number;
  values: number[];
};

export const ChartAsObject = ({ x, y, values }: ChartAsObjectProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 34], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "flex-end",
        gap: 14,
        transform: "translate3d(-50%, -50%, 0)",
      }}
    >
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          style={{
            width: 34,
            height: value * reveal,
            borderRadius: 8,
            background:
              "linear-gradient(180deg, #e9fff0 0%, #6bff8e 38%, #153823 100%)",
            boxShadow: "0 0 34px rgba(95, 255, 136, 0.24)",
          }}
        />
      ))}
    </div>
  );
};
