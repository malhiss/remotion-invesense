import type { CSSProperties, ReactNode } from "react";
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

const fontStack = "Tahoma, Arial, sans-serif";

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
};

type LightEditorialStageProps = {
  children: ReactNode;
  watermark?: string;
  sourceNote?: string;
  accent?: "green" | "blue" | "red";
  style?: CSSProperties;
};

export const LightEditorialStage = ({
  children,
  watermark,
  sourceNote,
  accent = "green",
  style,
}: LightEditorialStageProps) => {
  const accentColor = familyBCPalette[accent];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${familyBCPalette.white} 0%, ${familyBCPalette.warmWhite} 100%)`,
        color: familyBCPalette.ink,
        fontFamily: fontStack,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 0,
          width: 3,
          height: "100%",
          background: `linear-gradient(180deg, transparent, ${accentColor}, transparent)`,
          opacity: 0.16,
        }}
      />
      {children}
      {watermark ? (
        <div
          style={{
            position: "absolute",
            right: 64,
            top: 128,
            fontSize: 24,
            fontWeight: 700,
            color: "rgba(71, 85, 100, 0.42)",
            letterSpacing: 0.2,
          }}
        >
          {watermark}
        </div>
      ) : null}
      {sourceNote ? (
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 58,
            maxWidth: 680,
            fontSize: 22,
            lineHeight: 1.2,
            color: "rgba(71, 85, 100, 0.52)",
          }}
        >
          {sourceNote}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

type MetricHookProps = {
  eyebrow: string;
  value: string;
  subtitle: string;
  accent?: "green" | "blue" | "red";
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
  const accentColor = familyBCPalette[accent];

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
          background: accentColor,
          transform: `scaleX(${appear})`,
          transformOrigin: "0 50%",
        }}
      />
      <div
        style={{
          marginTop: 36,
          maxWidth: 800,
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

type FullBleedChartStageProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  values: number[];
  axisLabels: string[];
  accent?: "green" | "blue" | "red";
};

export const FullBleedChartStage = ({
  x,
  y,
  width,
  height,
  title,
  values,
  axisLabels,
  accent = "green",
}: FullBleedChartStageProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 42], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.9, 0.16, 1),
  });
  const accentColor = familyBCPalette[accent];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((value, index) => {
    const px = 62 + (index / Math.max(values.length - 1, 1)) * (width - 132);
    const normalized = (value - min) / Math.max(max - min, 1);
    const py = height - 74 - normalized * (height - 164);

    return `${px},${py}`;
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: "translate3d(-50%, -50%, 0)",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={26}
          fill="#ffffff"
          stroke={familyBCPalette.lightGray}
          strokeWidth={2}
        />
        <text x={54} y={54} fontFamily={fontStack} fontSize={26} fontWeight={700}>
          {title}
        </text>
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1={54}
            x2={width - 48}
            y1={108 + line * ((height - 190) / 2)}
            y2={108 + line * ((height - 190) / 2)}
            stroke={familyBCPalette.lightGray}
            strokeWidth={2}
          />
        ))}
        <line
          x1={54}
          x2={width - 50}
          y1={height - 72}
          y2={height - 72}
          stroke={familyBCPalette.ink}
          strokeWidth={3}
        />
        <line
          x1={54}
          x2={54}
          y1={92}
          y2={height - 72}
          stroke={familyBCPalette.ink}
          strokeWidth={3}
        />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={accentColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1600}
          strokeDashoffset={1600 - reveal * 1600}
        />
        {axisLabels.map((label, index) => (
          <text
            key={label}
            x={
              index === 0
                ? 58
                : index === axisLabels.length - 1
                  ? width - 58
                  : 58 +
                    index * ((width - 150) / Math.max(axisLabels.length - 1, 1))
            }
            y={height - 32}
            textAnchor={index === axisLabels.length - 1 ? "end" : "start"}
            fontFamily={fontStack}
            fontSize={22}
            fill={familyBCPalette.navy}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

type SourceChartTraceProps = {
  d: string;
  color?: string;
  width: number;
  height: number;
  startFrame?: number;
};

export const SourceChartTrace = ({
  d,
  color = familyBCPalette.green,
  width,
  height,
  startFrame = 0,
}: SourceChartTraceProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, 38], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1400}
        strokeDashoffset={1400 - reveal * 1400}
      />
    </svg>
  );
};

type ChartMarkerCalloutProps = {
  x: number;
  y: number;
  label: string;
  color?: string;
  startFrame?: number;
};

export const ChartMarkerCallout = ({
  x,
  y,
  label,
  color = familyBCPalette.red,
  startFrame = 0,
}: ChartMarkerCalloutProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 180, mass: 0.7 },
    durationInFrames: 22,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate3d(-50%, -50%, 0) scale(${pop})`,
        opacity: pop,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 0 ${8 * pop}px rgba(201, 37, 44, 0.14)`,
        }}
      />
      <div
        style={{
          marginTop: 12,
          padding: "9px 14px",
          borderRadius: 999,
          border: `2px solid ${color}`,
          background: "rgba(255,255,255,0.92)",
          fontSize: 22,
          fontWeight: 800,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

type BarDatum = {
  label: string;
  valueLabel: string;
  value: number;
  color: string;
};

type BarComparisonSceneProps = {
  title: string;
  bars: BarDatum[];
  x: number;
  y: number;
  width: number;
};

export const BarComparisonScene = ({
  title,
  bars,
  x,
  y,
  width,
}: BarComparisonSceneProps) => {
  const frame = useCurrentFrame();
  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div style={{ position: "absolute", left: x, top: y, width }}>
      <div
        style={{
          fontSize: 42,
          fontWeight: 850,
          color: familyBCPalette.ink,
          marginBottom: 42,
          letterSpacing: -1.6,
        }}
      >
        {title}
      </div>
      {bars.map((bar, index) => {
        const reveal = interpolate(frame, [index * 12, index * 12 + 34], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });
        const barWidth = (bar.value / max) * (width - 24) * reveal;

        return (
          <div key={bar.label} style={{ marginBottom: 34 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
                fontSize: 26,
                fontWeight: 800,
                color: familyBCPalette.navy,
              }}
            >
              <span>{bar.label}</span>
              <span>{bar.valueLabel}</span>
            </div>
            <div
              style={{
                width: barWidth,
                height: 54,
                borderRadius: 10,
                background: bar.color,
                boxShadow: "0 10px 28px rgba(71, 85, 100, 0.12)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

type LogoActor = {
  label: string;
  detail: string;
  color: string;
};

type LogoActorGridProps = {
  actors: LogoActor[];
  x: number;
  y: number;
};

export const LogoActorGrid = ({ actors, x, y }: LogoActorGridProps) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "grid",
        gridTemplateColumns: "repeat(2, 210px)",
        gap: 22,
      }}
    >
      {actors.map((actor, index) => {
        const appear = interpolate(frame, [index * 7, index * 7 + 20], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });

        return (
          <div
            key={actor.label}
            style={{
              width: 210,
              height: 152,
              borderRadius: 24,
              border: `2px solid ${familyBCPalette.lightGray}`,
              background: "#ffffff",
              transform: `translate3d(0, ${20 - appear * 20}px, 0)`,
              opacity: appear,
              padding: 22,
              boxShadow: "0 20px 54px rgba(71, 85, 100, 0.1)",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: actor.color,
                marginBottom: 18,
              }}
            />
            <div style={{ fontSize: 30, fontWeight: 900 }}>{actor.label}</div>
            <div style={{ marginTop: 4, fontSize: 18, color: familyBCPalette.gray }}>
              {actor.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
};

type InfrastructureIconSceneProps = {
  label: string;
  x: number;
  y: number;
  color?: string;
};

export const InfrastructureIconScene = ({
  label,
  x,
  y,
  color = familyBCPalette.green,
}: InfrastructureIconSceneProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 32], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg
      width={300}
      height={300}
      viewBox="0 0 300 300"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate3d(-50%, -50%, 0) scale(${0.86 + reveal * 0.14})`,
        opacity: reveal,
      }}
    >
      <rect x="86" y="70" width="128" height="180" rx="18" fill={color} opacity="0.16" />
      <rect x="104" y="92" width="92" height="28" rx="6" fill={color} />
      <rect x="104" y="136" width="92" height="18" rx="6" fill={familyBCPalette.navy} opacity="0.35" />
      <rect x="104" y="170" width="92" height="18" rx="6" fill={familyBCPalette.navy} opacity="0.35" />
      <rect x="104" y="204" width="92" height="18" rx="6" fill={familyBCPalette.navy} opacity="0.35" />
      <text
        x="150"
        y="282"
        textAnchor="middle"
        fontFamily={fontStack}
        fontSize="24"
        fontWeight="800"
        fill={familyBCPalette.ink}
      >
        {label}
      </text>
    </svg>
  );
};

type LottieAccentLayerProps = {
  role: "route-pulse" | "highlight-sweep" | "CTA-pulse" | "proof-burst";
  x: number;
  y: number;
  color?: string;
  startFrame?: number;
};

export const LottieAccentLayer = ({
  role,
  x,
  y,
  color = familyBCPalette.green,
  startFrame = 0,
}: LottieAccentLayerProps) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame - startFrame, [0, 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(pulse, [0, 0.55, 1], [0, 0.35, 0], clamp);
  const sweep = role === "highlight-sweep";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: sweep ? 320 * pulse : 46 + pulse * 160,
        height: sweep ? 18 : 46 + pulse * 160,
        borderRadius: 999,
        transform: "translate3d(-50%, -50%, 0)",
        background: sweep ? color : "transparent",
        border: sweep ? "none" : `4px solid ${color}`,
        opacity,
      }}
    />
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
