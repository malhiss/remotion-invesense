import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  clamp,
  colorForAccent,
  familyBCPalette,
  familyBCType,
  type FamilyBCAccent,
} from "./tokens";

type ChartPoint = {
  x: number;
  y: number;
};

type LineTraceChartProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  values: number[];
  axisLabels: string[];
  accent?: FamilyBCAccent;
  startFrame?: number;
};

const makePoints = (values: number[], width: number, height: number): ChartPoint[] => {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return values.map((value, index) => {
    const px = 62 + (index / Math.max(values.length - 1, 1)) * (width - 132);
    const normalized = (value - min) / Math.max(max - min, 1);
    const py = height - 74 - normalized * (height - 164);

    return { x: px, y: py };
  });
};

const pointsToPath = (points: ChartPoint[]) =>
  points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

export const LineTraceChart = ({
  x,
  y,
  width,
  height,
  title,
  values,
  axisLabels,
  accent = "green",
  startFrame = 0,
}: LineTraceChartProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, 42], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.9, 0.16, 1),
  });
  const points = makePoints(values, width, height);
  const path = pointsToPath(points);

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
          fill={familyBCPalette.white}
          stroke={familyBCPalette.lightGray}
          strokeWidth={2}
        />
        <text
          x={54}
          y={54}
          fontFamily={familyBCType.body}
          fontSize={26}
          fontWeight={700}
          fill={familyBCPalette.ink}
        >
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
        <path
          d={path}
          fill="none"
          stroke={colorForAccent(accent)}
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
                  : 58 + index * ((width - 150) / Math.max(axisLabels.length - 1, 1))
            }
            y={height - 32}
            textAnchor={index === axisLabels.length - 1 ? "end" : "start"}
            fontFamily={familyBCType.body}
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

export const FullBleedChartStage = LineTraceChart;

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
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0 }}>
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
  productionMode?: boolean;
  attachmentMode?: "endpoint" | "chart-marker" | "bar-end" | "residue-line" | "surface-plate";
  eventSurfaceId?: string;
};

export const ChartMarkerCallout = ({
  x,
  y,
  label,
  color = familyBCPalette.red,
  startFrame = 0,
  productionMode = false,
  attachmentMode,
  eventSurfaceId,
}: ChartMarkerCalloutProps) => {
  // calibration-only by default; production use must attach the callout to an event surface.
  if (productionMode && (!attachmentMode || !eventSurfaceId)) {
    throw new Error(
      "ChartMarkerCallout productionMode requires attachmentMode and eventSurfaceId.",
    );
  }

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

type StrictBarSeriesProps = {
  title: string;
  bars: BarDatum[];
  x: number;
  y: number;
  width: number;
  startFrame?: number;
  valuePlacement?: "inside" | "bar-end";
  productionMode?: boolean;
};

export const StrictBarSeries = ({
  title,
  bars,
  x,
  y,
  width,
  startFrame = 0,
  valuePlacement = "bar-end",
  productionMode = false,
}: StrictBarSeriesProps) => {
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
        const reveal = interpolate(
          frame - startFrame,
          [index * 12, index * 12 + 34],
          [0, 1],
          {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          },
        );
        const barWidth = (bar.value / max) * (width - 24) * reveal;

        return (
          <div key={bar.label} style={{ marginBottom: 34 }}>
            <div
              style={{
                marginBottom: 10,
                fontSize: 26,
                fontWeight: 800,
                color: familyBCPalette.navy,
              }}
            >
              {bar.label}
            </div>
            <div
              style={{
                position: "relative",
                width: Math.max(barWidth, productionMode ? 84 : 0),
                height: 54,
                borderRadius: 10,
                background: bar.color,
                boxShadow: "0 10px 28px rgba(71, 85, 100, 0.12)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left:
                    valuePlacement === "inside"
                      ? 18
                      : Math.max(barWidth, productionMode ? 84 : 0) + 14,
                  top: "50%",
                  transform: "translate3d(0, -50%, 0)",
                  fontSize: 24,
                  lineHeight: 1,
                  fontWeight: 900,
                  color:
                    valuePlacement === "inside"
                      ? familyBCPalette.white
                      : familyBCPalette.ink,
                  whiteSpace: "nowrap",
                }}
              >
                {bar.valueLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const BarComparisonScene = StrictBarSeries;

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

type CandlestickMiniChartProps = {
  candles: Candle[];
  x: number;
  y: number;
  width: number;
  height: number;
};

export const CandlestickMiniChart = ({
  candles,
  x,
  y,
  width,
  height,
}: CandlestickMiniChartProps) => {
  const frame = useCurrentFrame();
  const values = candles.flatMap((candle) => [candle.open, candle.close, candle.high, candle.low]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yForValue = (value: number) =>
    24 + (1 - (value - min) / Math.max(max - min, 1)) * (height - 48);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", left: x, top: y }}>
      {candles.map((candle, index) => {
        const reveal = interpolate(frame, [index * 5, index * 5 + 16], [0, 1], clamp);
        const center = 28 + index * ((width - 56) / Math.max(candles.length - 1, 1));
        const up = candle.close >= candle.open;
        const color = up ? familyBCPalette.green : familyBCPalette.red;
        const bodyTop = Math.min(yForValue(candle.open), yForValue(candle.close));
        const bodyHeight = Math.max(Math.abs(yForValue(candle.open) - yForValue(candle.close)), 5);

        return (
          <g key={`${candle.open}-${index}`} opacity={reveal}>
            <line
              x1={center}
              x2={center}
              y1={yForValue(candle.high)}
              y2={yForValue(candle.low)}
              stroke={color}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <rect
              x={center - 11}
              y={bodyTop}
              width={22}
              height={bodyHeight}
              rx={4}
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  );
};

type SupportResistanceEventLineProps = {
  x: number;
  y: number;
  width: number;
  label: string;
  eventFrame: number;
  color?: string;
};

export const SupportResistanceEventLine = ({
  x,
  y,
  width,
  label,
  eventFrame,
  color = familyBCPalette.green,
}: SupportResistanceEventLineProps) => {
  const frame = useCurrentFrame();
  const bend = spring({
    frame: frame - eventFrame,
    fps: 30,
    config: { damping: 18, stiffness: 150, mass: 0.8 },
    durationInFrames: 26,
  });

  return (
    <svg width={width} height={120} viewBox={`0 0 ${width} 120`} style={{ position: "absolute", left: x, top: y }}>
      <path
        d={`M 0 58 C ${width * 0.35} ${58 + bend * 22}, ${width * 0.65} ${58 - bend * 16}, ${width} 58`}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <text
        x={width - 4}
        y={36}
        textAnchor="end"
        fontFamily={familyBCType.body}
        fontSize={23}
        fontWeight={800}
        fill={familyBCPalette.navy}
      >
        {label}
      </text>
    </svg>
  );
};

type ProofReadoutFromEventProps = {
  value: string;
  label: string;
  x: number;
  y: number;
  proofBirthFrame: number;
  color?: string;
  productionMode?: boolean;
  eventSurfaceId?: string;
  proofSurfaceId?: string;
  proofAttachmentMode?: "stamp" | "latch" | "endpoint" | "bar-end" | "chart-marker" | "residue-line" | "surface-plate";
};

export const ProofReadoutFromEvent = ({
  value,
  label,
  x,
  y,
  proofBirthFrame,
  color = familyBCPalette.green,
  productionMode = false,
  eventSurfaceId,
  proofSurfaceId,
  proofAttachmentMode,
}: ProofReadoutFromEventProps) => {
  // calibration-only by default; production use must bind proof to the event surface that created it.
  if (
    productionMode &&
    (!eventSurfaceId || !proofSurfaceId || !proofAttachmentMode)
  ) {
    throw new Error(
      "ProofReadoutFromEvent productionMode requires eventSurfaceId, proofSurfaceId, and proofAttachmentMode.",
    );
  }

  const frame = useCurrentFrame();
  const emerge = interpolate(frame, [proofBirthFrame, proofBirthFrame + 34], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - emerge * 52,
        opacity: emerge,
        transform: `translate3d(-50%, -50%, 0) scale(${0.88 + emerge * 0.12})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 104,
          lineHeight: 0.9,
          fontWeight: 900,
          letterSpacing: -5,
          color,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 24,
          fontWeight: 800,
          textTransform: "uppercase",
          color: familyBCPalette.navy,
          letterSpacing: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
