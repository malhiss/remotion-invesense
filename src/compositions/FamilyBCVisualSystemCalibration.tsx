import { Sequence } from "remotion";
import {
  ActorRail,
  ApprovedLottie,
  CTAKeywordClose,
  CTAResidueObject,
  ChartMarkerCallout,
  DocumentStampObject,
  LightEditorialStage,
  LineTraceChart,
  LogoActor,
  LottieAccentLayer,
  MetricHook,
  PaymentDataRoute,
  ProofReadoutFromEvent,
  SourceNoteAnchor,
  StrictBarSeries,
  SupportResistanceEventLine,
  familyBCPalette,
} from "../components/family-bc";
import type { FamilyBCVisualSystemCalibration as FamilyBCVisualSystemCalibrationHandoff } from "../contracts/family-bc-visual-system-contract";

type FamilyBCVisualSystemCalibrationProps = FamilyBCVisualSystemCalibrationHandoff;

const chartValues = [42, 48, 46, 57, 63, 61, 75, 82, 80, 94, 106];

export const FamilyBCVisualSystemCalibration = ({
  title,
  review,
  approvedLottieAssets,
}: FamilyBCVisualSystemCalibrationProps) => {
  const approvedPulse = approvedLottieAssets[0];

  return (
    <LightEditorialStage
      watermark="INVESENSE"
      sourceNote="Phase 3 calibration only. This validates Family B/C visual foundations, not a production claim."
    >
      <Sequence durationInFrames={160} premountFor={30}>
        <MetricHook
          eyebrow="Phase 3 visual system"
          value="B/C"
          subtitle={title}
        />
      </Sequence>

      <Sequence from={160} durationInFrames={245} premountFor={45}>
        <LineTraceChart
          x={540}
          y={800}
          width={936}
          height={660}
          title="Chart-native proof surface"
          values={chartValues}
          axisLabels={["start", "event", "proof"]}
        />
        <SupportResistanceEventLine
          x={128}
          y={1010}
          width={824}
          label="event line bends after contact"
          eventFrame={review.frames.event - 160}
        />
        <ChartMarkerCallout
          x={780}
          y={565}
          label="event point"
          startFrame={review.frames.event - 160}
        />
      </Sequence>

      <Sequence from={405} durationInFrames={205} premountFor={45}>
        <LineTraceChart
          x={540}
          y={690}
          width={936}
          height={560}
          title="Proof is born from the chart"
          values={chartValues}
          axisLabels={["start", "touch", "readout"]}
        />
        <ProofReadoutFromEvent
          value="SOURCE"
          label="born after marker contact"
          x={720}
          y={910}
          proofBirthFrame={review.frames.proof - 405}
        />
        <StrictBarSeries
          title="Strict bars keep value labels"
          x={74}
          y={1165}
          width={780}
          bars={[
            {
              label: "anchored proof",
              valueLabel: "100%",
              value: 100,
              color: familyBCPalette.green,
            },
            {
              label: "floating card",
              valueLabel: "blocked",
              value: 38,
              color: familyBCPalette.red,
            },
          ]}
          startFrame={26}
        />
      </Sequence>

      <Sequence from={610} durationInFrames={235} premountFor={35}>
        <ActorRail x={120} y={420} width={820} label="logos travel as actors" />
        <LogoActor label="LOGO" detail="actor" x={215} y={485} />
        <LogoActor label="BANK" detail="rail" x={560} y={485} color={familyBCPalette.blue} />
        <PaymentDataRoute
          x={130}
          y={660}
          width={820}
          startLabel="source"
          endLabel="proof"
        />
        <DocumentStampObject
          x={128}
          y={955}
          label="source doc"
          stamp="LOCKED"
          stampFrame={review.frames.lottie - 610}
        />
        <div style={{ position: "absolute", left: 660, top: 1020, width: 210, height: 210 }}>
          <ApprovedLottie
            id={approvedPulse.id}
            localPath={approvedPulse.localPath}
            style={{ width: 210, height: 210 }}
          />
        </div>
        <LottieAccentLayer
          role="route-pulse"
          x={762}
          y={1126}
          startFrame={review.frames.lottie - 610}
        />
      </Sequence>

      <Sequence from={845} durationInFrames={235} premountFor={45}>
        <CTAResidueObject
          x={78}
          y={650}
          width={530}
          label="CTA inherits the chart event residue"
        />
        <CTAKeywordClose
          prompt="If you want the source chart and the breakdown,"
          keyword="SOURCE"
          residueLabel="This close is not a reusable card; it carries the earlier chart mark."
        />
        <SourceNoteAnchor note="No production reel has started. Phase 4 requires an approved Workspace Agent handoff." />
      </Sequence>
    </LightEditorialStage>
  );
};
