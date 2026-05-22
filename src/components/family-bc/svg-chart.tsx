import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { ReactNode } from "react";
import { clamp, familyBCPalette, familyBCType } from "./tokens";

export type ExtractedSourceBar = {
  category: string;
  valueLabel: string;
  value: number;
  fill?: string;
};

export type ExtractedGroupedBar = {
  xLabel: string;
  seriesName: string;
  derivedValue: number | null;
  fill?: string;
  height?: number;
};

export type ExtractedStackedBar = {
  xLabel: string;
  totalLabel: string | null;
  segments: Array<{
    seriesName: string;
    fill?: string;
    height?: number;
  }>;
};

export type SourceChartSeries = {
  name: string;
  color: string;
};

type ChartShellProps = {
  title: string;
  sourceNote: string;
  width: number;
  height: number;
  children: ReactNode;
};

const ChartShell = ({ title, sourceNote, width, height, children }: ChartShellProps) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <rect x={0} y={0} width={width} height={height} rx={30} fill={familyBCPalette.white} />
    <text
      x={40}
      y={54}
      fontFamily={familyBCType.display}
      fontSize={30}
      fontWeight={850}
      fill={familyBCPalette.ink}
    >
      {title}
    </text>
    <line x1={40} x2={width - 40} y1={height - 70} y2={height - 70} stroke={familyBCPalette.lightGray} strokeWidth={2} />
    {children}
    <text
      x={40}
      y={height - 30}
      fontFamily={familyBCType.body}
      fontSize={17}
      fontWeight={650}
      fill={familyBCPalette.gray}
    >
      {sourceNote}
    </text>
  </svg>
);

type AnimatedSourceBarChartProps = {
  title: string;
  sourceNote: string;
  bars: ExtractedSourceBar[];
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame?: number;
  highlightIndex?: number;
};

export const AnimatedSourceBarChart = ({
  title,
  sourceNote,
  bars,
  x,
  y,
  width,
  height,
  startFrame = 0,
  highlightIndex = 0,
}: AnimatedSourceBarChartProps) => {
  const frame = useCurrentFrame();
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  const plotX = 220;
  const plotWidth = width - plotX - 70;
  const rowGap = Math.max(34, (height - 170) / Math.max(bars.length, 1));

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      <ChartShell title={title} sourceNote={sourceNote} width={width} height={height}>
        {bars.map((bar, index) => {
          const reveal = interpolate(frame - startFrame, [index * 5, index * 5 + 28], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          const barWidth = (bar.value / max) * plotWidth * reveal;
          const rowY = 110 + index * rowGap;
          const highlighted = index === highlightIndex;

          return (
            <g key={bar.category}>
              <text
                x={40}
                y={rowY + 22}
                fontFamily={familyBCType.body}
                fontSize={22}
                fontWeight={highlighted ? 850 : 680}
                fill={highlighted ? familyBCPalette.ink : familyBCPalette.navy}
              >
                {bar.category}
              </text>
              <rect
                x={plotX}
                y={rowY}
                width={barWidth}
                height={28}
                rx={8}
                fill={bar.fill ?? (highlighted ? familyBCPalette.green : familyBCPalette.blue)}
              />
              <text
                x={plotX + barWidth + 14}
                y={rowY + 22}
                fontFamily={familyBCType.body}
                fontSize={21}
                fontWeight={850}
                opacity={reveal}
                fill={highlighted ? familyBCPalette.green : familyBCPalette.gray}
              >
                {bar.valueLabel}
              </text>
            </g>
          );
        })}
      </ChartShell>
    </div>
  );
};

type AnimatedSourceGroupedBarChartProps = {
  title: string;
  sourceNote: string;
  xLabels: string[];
  series: SourceChartSeries[];
  groupedBars: ExtractedGroupedBar[];
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame?: number;
};

export const AnimatedSourceGroupedBarChart = ({
  title,
  sourceNote,
  xLabels,
  series,
  groupedBars,
  x,
  y,
  width,
  height,
  startFrame = 0,
}: AnimatedSourceGroupedBarChartProps) => {
  const frame = useCurrentFrame();
  const baseline = height - 96;
  const plotTop = 108;
  const groupWidth = (width - 120) / Math.max(xLabels.length, 1);
  const barWidth = Math.min(16, groupWidth / Math.max(series.length + 1, 1));
  const maxHeight = Math.max(...groupedBars.map((bar) => bar.height ?? 1), 1);

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      <ChartShell title={title} sourceNote={sourceNote} width={width} height={height}>
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1={50}
            x2={width - 50}
            y1={plotTop + line * ((baseline - plotTop) / 2)}
            y2={plotTop + line * ((baseline - plotTop) / 2)}
            stroke={familyBCPalette.lightGray}
            strokeWidth={2}
          />
        ))}
        {groupedBars.map((bar, index) => {
          const yearIndex = Math.max(xLabels.indexOf(bar.xLabel), 0);
          const seriesIndex = Math.max(series.findIndex((entry) => entry.name === bar.seriesName), 0);
          const reveal = interpolate(frame - startFrame, [index * 2, index * 2 + 24], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          const rawHeight = ((bar.height ?? 1) / maxHeight) * (baseline - plotTop);
          const animatedHeight = rawHeight * reveal;
          const barX = 60 + yearIndex * groupWidth + seriesIndex * (barWidth + 3);

          return (
            <rect
              key={`${bar.xLabel}-${bar.seriesName}-${index}`}
              x={barX}
              y={baseline - animatedHeight}
              width={barWidth}
              height={animatedHeight}
              rx={4}
              fill={bar.fill ?? series[seriesIndex]?.color ?? familyBCPalette.blue}
            />
          );
        })}
        {xLabels.map((label, index) => (
          <text
            key={label}
            x={64 + index * groupWidth}
            y={height - 78}
            fontFamily={familyBCType.body}
            fontSize={15}
            fontWeight={700}
            fill={familyBCPalette.gray}
          >
            {label}
          </text>
        ))}
      </ChartShell>
    </div>
  );
};

type AnimatedSourceStackedBarChartProps = {
  title: string;
  sourceNote: string;
  xLabels: string[];
  totalLabels: string[];
  series: SourceChartSeries[];
  stackedBars: ExtractedStackedBar[];
  benchmarkLabel?: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame?: number;
};

export const AnimatedSourceStackedBarChart = ({
  title,
  sourceNote,
  xLabels,
  totalLabels,
  series,
  stackedBars,
  benchmarkLabel,
  x,
  y,
  width,
  height,
  startFrame = 0,
}: AnimatedSourceStackedBarChartProps) => {
  const frame = useCurrentFrame();
  const baseline = height - 96;
  const plotTop = 110;
  const columnWidth = (width - 130) / Math.max(xLabels.length, 1);
  const barWidth = Math.min(28, columnWidth * 0.52);
  const maxStack = Math.max(
    ...stackedBars.map((bar) => bar.segments.reduce((sum, segment) => sum + (segment.height ?? 10), 0)),
    1,
  );
  const benchmarkReveal = interpolate(frame - startFrame, [80, 112], [0, 1], clamp);

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      <ChartShell title={title} sourceNote={sourceNote} width={width} height={height}>
        {benchmarkLabel ? (
          <g opacity={benchmarkReveal}>
            <line
              x1={52}
              x2={width - 50}
              y1={baseline - (baseline - plotTop) * 0.34}
              y2={baseline - (baseline - plotTop) * 0.34}
              stroke={familyBCPalette.gray}
              strokeDasharray="7 7"
              strokeWidth={3}
            />
            <text
              x={width - 52}
              y={baseline - (baseline - plotTop) * 0.34 - 10}
              textAnchor="end"
              fontFamily={familyBCType.body}
              fontSize={18}
              fontWeight={850}
              fill={familyBCPalette.gray}
            >
              {benchmarkLabel}
            </text>
          </g>
        ) : null}
        {stackedBars.map((bar, barIndex) => {
          const stackHeight = bar.segments.reduce((sum, segment) => sum + (segment.height ?? 10), 0);
          const scale = ((baseline - plotTop) / maxStack) * interpolate(frame - startFrame, [barIndex * 5, barIndex * 5 + 28], [0, 1], clamp);
          let cursor = baseline;
          const barX = 62 + barIndex * columnWidth;

          return (
            <g key={bar.xLabel}>
              {bar.segments.map((segment, segmentIndex) => {
                const segmentHeight = (segment.height ?? 10) * scale;
                cursor -= segmentHeight;

                return (
                  <rect
                    key={`${bar.xLabel}-${segment.seriesName}-${segmentIndex}`}
                    x={barX}
                    y={cursor}
                    width={barWidth}
                    height={segmentHeight}
                    rx={segmentIndex === bar.segments.length - 1 ? 5 : 0}
                    fill={segment.fill ?? series[segmentIndex]?.color ?? familyBCPalette.blue}
                  />
                );
              })}
              <text
                x={barX + barWidth / 2}
                y={cursor - 12}
                textAnchor="middle"
                fontFamily={familyBCType.body}
                fontSize={16}
                fontWeight={850}
                fill={familyBCPalette.ink}
                opacity={stackHeight > 0 ? 1 : 0}
              >
                {totalLabels[barIndex] ?? bar.totalLabel}
              </text>
              <text
                x={barX + barWidth / 2}
                y={height - 78}
                textAnchor="middle"
                fontFamily={familyBCType.body}
                fontSize={15}
                fontWeight={700}
                fill={familyBCPalette.gray}
              >
                {bar.xLabel}
              </text>
            </g>
          );
        })}
      </ChartShell>
    </div>
  );
};

type AnimatedSourceLineChartProps = {
  title: string;
  sourceNote: string;
  pathD: string;
  stroke?: string;
  headlineValue?: string | null;
  headlineLabel?: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame?: number;
};

export const AnimatedSourceLineChart = ({
  title,
  sourceNote,
  pathD,
  stroke = familyBCPalette.blue,
  headlineValue,
  headlineLabel,
  x,
  y,
  width,
  height,
  startFrame = 0,
}: AnimatedSourceLineChartProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame - startFrame, [0, 48], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const proofReveal = interpolate(frame - startFrame, [54, 82], [0, 1], clamp);

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      <ChartShell title={title} sourceNote={sourceNote} width={width} height={height}>
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1={46}
            x2={width - 46}
            y1={116 + line * ((height - 210) / 2)}
            y2={116 + line * ((height - 210) / 2)}
            stroke={familyBCPalette.lightGray}
            strokeWidth={2}
          />
        ))}
        <path
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1800}
          strokeDashoffset={1800 - reveal * 1800}
        />
        {headlineValue ? (
          <g opacity={proofReveal}>
            <text
              x={width - 54}
              y={112}
              textAnchor="end"
              fontFamily={familyBCType.display}
              fontSize={58}
              fontWeight={900}
              fill={stroke}
            >
              {headlineValue}
            </text>
            <text
              x={width - 56}
              y={148}
              textAnchor="end"
              fontFamily={familyBCType.body}
              fontSize={22}
              fontWeight={850}
              fill={familyBCPalette.navy}
            >
              {headlineLabel ?? "proof endpoint"}
            </text>
          </g>
        ) : null}
      </ChartShell>
    </div>
  );
};
