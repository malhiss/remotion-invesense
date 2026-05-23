import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, familyBCPalette, familyBCType } from "./tokens";

export type ProofAttachmentMode =
  | "stamp"
  | "latch"
  | "endpoint"
  | "bar-end"
  | "chart-marker"
  | "residue-line"
  | "surface-plate";

export const ChartTerrainPath = ({
  id,
  hideLabels = false,
}: {
  id: string;
  hideLabels?: boolean;
}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 34], [0.12, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg
      width={860}
      height={560}
      viewBox="0 0 860 560"
      style={{ position: "absolute", left: 110, top: 538 }}
      aria-label={id}
    >
      <defs>
        <linearGradient id={`${id}-terrain-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(89,170,71,0.18)" />
          <stop offset="100%" stopColor="rgba(89,170,71,0)" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((line) => (
        <line
          key={line}
          x1={18}
          x2={842}
          y1={118 + line * 92}
          y2={118 + line * 92}
          stroke="rgba(71,85,100,0.13)"
          strokeWidth={2}
        />
      ))}
      <path
        d="M 22 450 C 140 420, 210 384, 308 350 C 428 308, 504 292, 610 212 C 682 158, 730 128, 826 104 L 826 494 L 22 494 Z"
        fill={`url(#${id}-terrain-fill)`}
        opacity={draw}
      />
      <path
        d="M 22 450 C 140 420, 210 384, 308 350 C 428 308, 504 292, 610 212 C 682 158, 730 128, 826 104"
        fill="none"
        stroke={familyBCPalette.green}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1350}
        strokeDashoffset={1350 - draw * 1350}
      />
      {!hideLabels && (
        <>
          <text
            x={28}
            y={522}
            fontFamily={familyBCType.body}
            fontSize={25}
            fontWeight={850}
            fill={familyBCPalette.navy}
          >
            chart terrain
          </text>
          <text
            x={828}
            y={82}
            textAnchor="end"
            fontFamily={familyBCType.body}
            fontSize={24}
            fontWeight={850}
            fill={familyBCPalette.navy}
          >
            rising source path
          </text>
        </>
      )}
    </svg>
  );
};

export const PhysicalResistanceLine = ({
  eventSurfaceId,
  contactFrame,
  hideLabels = false,
}: {
  eventSurfaceId: string;
  contactFrame: number;
  hideLabels?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reaction = spring({
    frame: frame - contactFrame,
    fps,
    config: { damping: 13, stiffness: 145, mass: 0.76 },
    durationInFrames: 34,
  });
  const settle = interpolate(frame, [contactFrame + 8, 90], [0, 1], clamp);
  const bend = reaction * 42 - settle * 18;

  return (
    <svg
      width={860}
      height={180}
      viewBox="0 0 860 180"
      style={{ position: "absolute", left: 110, top: 664 }}
      aria-label={eventSurfaceId}
    >
      <path
        d={`M 58 86 C 256 ${86 + bend}, 530 ${86 - bend * 0.38}, 804 ${86 + bend * 0.2}`}
        fill="none"
        stroke={familyBCPalette.navy}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <path
        d={`M 58 86 C 256 ${86 + bend}, 530 ${86 - bend * 0.38}, 804 ${86 + bend * 0.2}`}
        fill="none"
        stroke="rgba(89,170,71,0.34)"
        strokeWidth={30}
        strokeLinecap="round"
        opacity={Math.min(0.75, reaction)}
      />
      {!hideLabels && (
        <text
          x={804}
          y={54}
          textAnchor="end"
          fontFamily={familyBCType.body}
          fontSize={26}
          fontWeight={900}
          fill={familyBCPalette.ink}
        >
          hard threshold line
        </text>
      )}
    </svg>
  );
};

export const ImpactPulse = ({
  contactFrame,
  x,
  y,
}: {
  contactFrame: number;
  x: number;
  y: number;
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame - contactFrame, [0, 14, 30], [0, 1, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  if (pulse <= 0) {
    return null;
  }

  return (
    <svg
      width={220}
      height={220}
      viewBox="0 0 220 220"
      style={{ position: "absolute", left: x - 110, top: y - 110 }}
    >
      <circle
        cx={110}
        cy={110}
        r={26 + pulse * 76}
        fill="none"
        stroke={familyBCPalette.green}
        strokeWidth={8 - pulse * 5}
        opacity={0.72 - pulse * 0.45}
      />
      {[0, 1, 2, 3, 4, 5].map((spark) => {
        const angle = (spark / 6) * Math.PI * 2;
        const inner = 40 + pulse * 18;
        const outer = 68 + pulse * 44;
        return (
          <line
            key={spark}
            x1={110 + Math.cos(angle) * inner}
            y1={110 + Math.sin(angle) * inner}
            x2={110 + Math.cos(angle) * outer}
            y2={110 + Math.sin(angle) * outer}
            stroke={familyBCPalette.green}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={pulse}
          />
        );
      })}
    </svg>
  );
};

export const EventAttachedLabel = ({
  eventSurfaceId,
  text,
  x,
  y,
  startFrame,
  hideLabels = false,
}: {
  eventSurfaceId: string;
  text: string;
  x: number;
  y: number;
  startFrame: number;
  hideLabels?: boolean;
}) => {
  const frame = useCurrentFrame();
  const opacity = hideLabels
    ? 0
    : interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
        ...clamp,
        easing: Easing.out(Easing.cubic),
      });

  return (
    <div
      data-event-surface-id={eventSurfaceId}
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `translate3d(-50%, -50%, 0)`,
        fontSize: 28,
        fontWeight: 900,
        letterSpacing: 0.8,
        color: familyBCPalette.navy,
      }}
    >
      {text}
    </div>
  );
};

export const ProofStampLatch = ({
  eventSurfaceId,
  proofSurfaceId,
  proofAttachmentMode,
  proofBirthFrame,
  text,
  hideLabels = false,
}: {
  eventSurfaceId: string;
  proofSurfaceId: string;
  proofAttachmentMode: ProofAttachmentMode;
  proofBirthFrame: number;
  text: string;
  hideLabels?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const birth = spring({
    frame: frame - proofBirthFrame,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.72 },
    durationInFrames: 28,
  });
  const opacity = interpolate(frame, [proofBirthFrame, proofBirthFrame + 16], [0, 1], clamp);

  return (
    <div
      data-event-surface-id={eventSurfaceId}
      data-proof-surface-id={proofSurfaceId}
      data-proof-attachment-mode={proofAttachmentMode}
      style={{
        position: "absolute",
        left: 716,
        top: 730,
        opacity,
        transform: `translate3d(-50%, -50%, 0) rotate(${-5 + birth * 5}deg) scale(${0.78 + birth * 0.22})`,
        transformOrigin: "50% 60%",
      }}
    >
      <div
        style={{
          minWidth: 190,
          padding: "19px 28px 21px",
          borderRadius: 28,
          background: familyBCPalette.green,
          color: "#fff",
          border: "6px solid rgba(255,255,255,0.9)",
          boxShadow: "0 24px 58px rgba(34,80,28,0.22)",
          fontFamily: familyBCType.display,
          fontSize: 58,
          lineHeight: 0.9,
          fontWeight: 950,
          letterSpacing: -3,
          textAlign: "center",
        }}
      >
        <span style={{ opacity: hideLabels ? 0 : 1 }}>{text}</span>
      </div>
    </div>
  );
};

export const ResidueCTAAnchor = ({
  residueObjectId,
  proofBirthFrame,
  hideLabels = false,
}: {
  residueObjectId: string;
  proofBirthFrame: number;
  hideLabels?: boolean;
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [proofBirthFrame + 4, 90], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      data-residue-object-id={residueObjectId}
      style={{
        position: "absolute",
        left: 150,
        right: 150,
        bottom: 226,
        opacity: reveal,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 11,
          borderRadius: 999,
          background: familyBCPalette.navy,
          transform: `scaleX(${reveal})`,
          transformOrigin: "0 50%",
        }}
      />
      {!hideLabels && (
        <div
          style={{
            marginTop: 30,
            textAlign: "center",
            fontSize: 35,
            lineHeight: 1.08,
            fontWeight: 900,
            color: familyBCPalette.ink,
          }}
        >
          residue from the changed threshold
        </div>
      )}
    </div>
  );
};
