import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import {
  ChartTerrainPath,
  EventAttachedLabel,
  ImpactPulse,
  PhysicalResistanceLine,
  ProofStampLatch,
  ResidueCTAAnchor,
} from "../components/family-bc";
import { familyBCPalette, familyBCType } from "../components/family-bc/tokens";
import type { FamilyBCAssetEventPrimitiveLab as FamilyBCAssetEventPrimitiveLabProps } from "../contracts/asset-event-lab-contract";

export const FamilyBCAssetEventPrimitiveLab = ({
  benchmarkTarget,
  structuralAttachment,
  noLabelReadSelfAssessment,
  humanNoLabelReview,
  hideLabels = false,
}: FamilyBCAssetEventPrimitiveLabProps) => {
  const frame = useCurrentFrame();
  const approach = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 0.86, 0.25, 1),
  });
  const reaction = interpolate(frame, [45, 60, 90], [0, 1, 0.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const proofVisible = frame >= structuralAttachment.proofBirthFrame;
  const objectX = 192 + approach * 508;
  const objectY = 1002 - approach * 266 + reaction * 24;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbfbf8 74%, #f4f7f1 100%)",
        color: familyBCPalette.ink,
        fontFamily: familyBCType.body,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 74,
          right: 74,
          top: 92,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 48,
          opacity: hideLabels ? 0 : 1,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 900,
              color: familyBCPalette.green,
              textTransform: "uppercase",
              letterSpacing: 2.2,
            }}
          >
            Phase 6B.2 primitive lab
          </div>
          <div
            style={{
              marginTop: 18,
              maxWidth: 650,
              fontFamily: familyBCType.display,
              fontSize: 73,
              lineHeight: 0.91,
              fontWeight: 950,
              letterSpacing: -4,
            }}
          >
            Can the object explain the event first?
          </div>
        </div>
        <div
          style={{
            maxWidth: 220,
            fontSize: 20,
            lineHeight: 1.16,
            fontWeight: 800,
            color: "rgba(71,85,100,0.72)",
            textAlign: "right",
          }}
        >
          human no-label review: {humanNoLabelReview}
          <br />
          self-assessment: {noLabelReadSelfAssessment}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 338,
          height: 1010,
          borderRadius: 54,
          background: "rgba(255,255,255,0.72)",
          border: "2px solid rgba(71,85,100,0.1)",
          boxShadow: "0 34px 82px rgba(71,85,100,0.09)",
          overflow: "hidden",
        }}
      >
        <ChartTerrainPath
          id="asset-event-lab-chart-terrain"
          hideLabels={hideLabels}
        />
        <PhysicalResistanceLine
          eventSurfaceId={structuralAttachment.eventSurfaceId}
          contactFrame={45}
          hideLabels={hideLabels}
        />
        <svg
          width={1080}
          height={1010}
          viewBox="0 0 1080 1010"
          style={{ position: "absolute", inset: 0 }}
        >
          <g transform={`translate(${objectX} ${objectY}) rotate(${reaction * -10})`}>
            <ellipse
              cx={0}
              cy={46}
              rx={64}
              ry={16}
              fill="rgba(71,85,100,0.14)"
            />
            <circle
              cx={0}
              cy={0}
              r={56 + reaction * 7}
              fill="#fff"
              stroke={familyBCPalette.green}
              strokeWidth={10}
            />
            <path
              d={`M -26 ${-4 + reaction * 4} C -8 ${-22 - reaction * 10}, 22 ${-22 - reaction * 7}, 34 ${-2 + reaction * 3}`}
              fill="none"
              stroke={familyBCPalette.navy}
              strokeWidth={9}
              strokeLinecap="round"
            />
            <path
              d={`M -30 ${18 + reaction * 5} C -8 ${34 + reaction * 8}, 22 ${34 + reaction * 6}, 34 ${18 + reaction * 4}`}
              fill="none"
              stroke={familyBCPalette.navy}
              strokeWidth={9}
              strokeLinecap="round"
            />
          </g>
        </svg>
        <ImpactPulse contactFrame={45} x={objectX + 72} y={objectY + 338} />
        <EventAttachedLabel
          eventSurfaceId={structuralAttachment.eventSurfaceId}
          text="contact creates the proof"
          x={718}
          y={626}
          startFrame={58}
          hideLabels={hideLabels}
        />
        <ProofStampLatch
          eventSurfaceId={structuralAttachment.eventSurfaceId}
          proofSurfaceId={structuralAttachment.proofSurfaceId}
          proofAttachmentMode={structuralAttachment.proofAttachmentMode}
          proofBirthFrame={structuralAttachment.proofBirthFrame}
          text="PROOF"
          hideLabels={hideLabels}
        />
      </div>

      <ResidueCTAAnchor
        residueObjectId={structuralAttachment.residueObjectId}
        proofBirthFrame={structuralAttachment.proofBirthFrame}
        hideLabels={hideLabels}
      />

      {!hideLabels && (
        <div
          style={{
            position: "absolute",
            left: 88,
            right: 88,
            bottom: 76,
            fontSize: 18,
            lineHeight: 1.25,
            fontWeight: 700,
            color: "rgba(71,85,100,0.56)",
            display: "flex",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <span>
            Target: {benchmarkTarget.benchmarkTargetId}
          </span>
          <span>
            Structural recreation only. No benchmark/premium pass claimed.
          </span>
        </div>
      )}
      {proofVisible && hideLabels && (
        <div
          style={{
            position: "absolute",
            left: 150,
            right: 150,
            bottom: 226,
            height: 11,
            borderRadius: 999,
            background: "rgba(18,32,45,0.92)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
