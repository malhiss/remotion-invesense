import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ApprovedLottie,
  BrandedResearchCta,
  EventAttachedProof,
  LightEditorialStage,
  PhysicalThresholdGate,
  ReviewOnlyOverlay,
  clamp,
  familyBCPalette,
  familyBCType,
} from "../components/family-bc";
import type { Phase6BSukukStillsHandoff } from "../data/phase6b-sukuk-stills-handoff";

type SukukThresholdRailStillsProps = Phase6BSukukStillsHandoff;

const sourcePathD = `M 81.354886 308.129218
L 106.693333 306.173784
L 132.03178 326.040709
L 157.370227 323.700906
L 182.708674 320.005283
L 208.047121 306.63438
L 233.385568 282.819634
L 258.724015 310.350378
L 284.062462 302.107754
L 309.400909 304.157711
L 334.739356 275.513756
L 360.077803 255.298206
L 385.41625 260.398382
L 410.754697 258.282232
L 436.093144 279.429021
L 461.431591 265.800477
L 486.770038 249.401653
L 512.108485 262.997917
L 537.446932 243.542784
L 562.785379 228.87613
L 588.123826 220.990108
L 613.462273 229.125891
L 638.80072 205.609401
L 664.139167 175.040958
L 689.477614 106.633709`;

const thresholdX = 689.477614;
const thresholdTop = 84;
const thresholdBottom = 346;
const proofBirthFrame = 790;
const thresholdEventFrame = 700;
const approvedDataFlowAssetId = "phase6b-data-flow-rail-pulse";

export const phase6bSukukChartRule = {
  staticSvgAsFinalChartAllowed: false,
} as const;

export const SukukThresholdRailStills = ({
  title,
  approvedLottie,
  selectedRoute,
}: SukukThresholdRailStillsProps) => {
  const frame = useCurrentFrame();
  const setupFade = interpolate(frame, [20, 60], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const proofOpacity = interpolate(frame, [proofBirthFrame, proofBirthFrame + 34], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const ctaOpacity = interpolate(frame, [1260, 1320], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
      <LightEditorialStage
        watermark="INVESENSE"
        sourceNote="Invesense Research | Bloomberg LEAG | April 2026"
        accent="green"
      >
      <Header title={title} visibleUntil={proofBirthFrame} />
      <RailWorld
        setupFade={setupFade}
        lottie={approvedLottie}
      />
      <MechanismNotes opacity={setupFade} routeName={selectedRoute.name} />
      <ThresholdProof proofOpacity={proofOpacity} />
      <CtaResidue opacity={ctaOpacity} />
      <ReviewOnlyOverlay visible={false}>Review metadata only</ReviewOnlyOverlay>
    </LightEditorialStage>
  );
};

const Header = ({ title, visibleUntil }: { title: string; visibleUntil: number }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [0, 32], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const dim = interpolate(frame, [visibleUntil, visibleUntil + 70], [1, 0.32], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 74,
        right: 74,
        top: 118,
        opacity: appear * dim,
      }}
    >
      <div
        style={{
          maxWidth: 920,
          fontFamily: familyBCType.display,
          fontSize: 78,
          lineHeight: 0.95,
          fontWeight: 900,
          letterSpacing: -3.8,
          color: familyBCPalette.ink,
          transform: `translate3d(0, ${28 - appear * 28}px, 0)`,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const RailWorld = ({
  setupFade,
  lottie,
}: {
  setupFade: number;
  lottie: Phase6BSukukStillsHandoff["approvedLottie"];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chartReveal = interpolate(frame, [40, 320], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const pressure = interpolate(frame, [360, 660], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const contact = spring({
    frame: frame - thresholdEventFrame,
    fps,
    config: { damping: 13, stiffness: 170, mass: 0.7 },
    durationInFrames: 40,
  });
  const lineProgress = Math.min(1, chartReveal + pressure * 0.06);
  const pathLength = getLength(sourcePathD);
  const endpoint = getPointAtLength(sourcePathD, pathLength * Math.min(lineProgress, 1));
  const evolved = evolvePath(lineProgress, sourcePathD);
  const lottieOpacity = interpolate(frame, [240, 340, 620, 720], [0, 0.22, 0.22, 0], clamp);
  const pulsePoint = getPointAtLength(
    sourcePathD,
    pathLength * interpolate(frame, [360, 660], [0.34, 0.94], clamp),
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 372,
        width: 940,
        height: 820,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 44,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(246,250,247,0.92) 100%)",
          border: `2px solid ${familyBCPalette.lightGray}`,
          boxShadow: "0 32px 80px rgba(71, 85, 100, 0.11)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 48,
          fontSize: 30,
          maxWidth: 650,
          fontWeight: 900,
          color: familyBCPalette.ink,
        }}
      >
        The market crosses a hard line
      </div>
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 126,
          width: 826,
          height: 500,
          opacity: setupFade,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: 30,
            opacity: lottieOpacity,
            filter: "saturate(0.6) hue-rotate(72deg)",
          }}
        >
          <ApprovedLottie
            id={approvedDataFlowAssetId}
            localPath={lottie.localPath}
            loop
            playbackRate={0.82}
            style={{
              position: "absolute",
              left: -210,
              top: 98,
              width: 1180,
              height: 382,
            }}
          />
        </div>
        <svg width={826} height={500} viewBox="0 0 826 500">
          <rect x={0} y={0} width={826} height={500} rx={30} fill="#ffffff" />
          {[0, 1, 2, 3].map((index) => (
            <line
              key={index}
              x1={70}
              x2={766}
              y1={120 + index * 76}
              y2={120 + index * 76}
              stroke={familyBCPalette.lightGray}
              strokeWidth={2}
            />
          ))}
          <line x1={70} x2={766} y1={420} y2={420} stroke={familyBCPalette.ink} strokeWidth={3} />
          <line x1={70} x2={70} y1={92} y2={420} stroke={familyBCPalette.ink} strokeWidth={3} />
          <g transform="translate(20 42) scale(1.1)">
            <path
              d={`${sourcePathD} L ${thresholdX} ${thresholdBottom} L 81.354886 ${thresholdBottom} Z`}
              fill="rgba(117, 190, 233, 0.13)"
              opacity={chartReveal}
            />
            <path
              d={sourcePathD}
              fill="none"
              stroke="#75bee9"
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.16}
            />
            <path
              d={sourcePathD}
              fill="none"
              stroke="#75bee9"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={evolved.strokeDasharray}
              strokeDashoffset={evolved.strokeDashoffset}
            />
            <path
              d={sourcePathD}
              fill="none"
              stroke={familyBCPalette.green}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.55}
              strokeDasharray={evolved.strokeDasharray}
              strokeDashoffset={evolved.strokeDashoffset}
            />
            <line
              x1={thresholdX}
              x2={thresholdX + contact * 34}
              y1={thresholdTop}
              y2={thresholdBottom}
              stroke={familyBCPalette.green}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <PhysicalThresholdGate contact={contact} label="$1T" />
            <circle
              cx={endpoint.x}
              cy={endpoint.y}
              r={10 + pressure * 5}
              fill={familyBCPalette.green}
              opacity={lineProgress > 0.08 ? 1 : 0}
            />
            <circle
              cx={pulsePoint.x}
              cy={pulsePoint.y}
              r={12 + pressure * 12}
              fill="none"
              stroke={familyBCPalette.green}
              strokeWidth={4}
              opacity={interpolate(frame, [360, 460, 620, 700], [0, 0.9, 0.65, 0], clamp)}
            />
          </g>
          <text x={70} y={464} fontSize={23} fontWeight={800} fill={familyBCPalette.navy}>
            2001
          </text>
          <text x={720} y={464} textAnchor="end" fontSize={23} fontWeight={800} fill={familyBCPalette.navy}>
            2025
          </text>
          <text x={78} y={92} fontSize={23} fontWeight={800} fill={familyBCPalette.navy}>
            USD billions
          </text>
          <text x={136} y={395} fontSize={28} fontWeight={900} fill={familyBCPalette.navy}>
            $16B
          </text>
          <text x={638} y={118} fontSize={32} fontWeight={900} fill={familyBCPalette.blue}>
            $150.5B
          </text>
        </svg>
      </div>
    </div>
  );
};

const MechanismNotes = ({ opacity, routeName }: { opacity: number; routeName: string }) => (
  <div
    style={{
      position: "absolute",
      left: 104,
      top: 1110,
      width: 560,
      opacity,
    }}
  >
    <div
      style={{
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 2.3,
        textTransform: "uppercase",
        color: familyBCPalette.green,
      }}
    >
      {routeName}
    </div>
    <div
      style={{
        marginTop: 16,
        fontSize: 40,
        lineHeight: 1.02,
        fontWeight: 850,
        letterSpacing: -1.4,
        color: familyBCPalette.ink,
      }}
    >
      A niche market became large enough to cross the line.
    </div>
  </div>
);

const ThresholdProof = ({ proofOpacity }: { proofOpacity: number }) => {
  const frame = useCurrentFrame();
  const pop = spring({
    frame: frame - proofBirthFrame,
    fps: 30,
    config: { damping: 16, stiffness: 180, mass: 0.72 },
    durationInFrames: 34,
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 80,
      top: 970,
        width: 330,
        opacity: proofOpacity,
        transform: `translate3d(0, ${36 - proofOpacity * 36}px, 0) scale(${0.9 + pop * 0.1})`,
        textAlign: "right",
      }}
    >
      <EventAttachedProof
        text="$1T+"
        subtext="outstanding at year-end 2025"
        startFrame={proofBirthFrame}
        x={170}
        y={80}
      />
    </div>
  );
};

const CtaResidue = ({ opacity }: { opacity: number }) => (
  <BrandedResearchCta
    opacity={opacity}
    lead="$1 trillion is no longer alternative. It is fixed income."
  />
);
