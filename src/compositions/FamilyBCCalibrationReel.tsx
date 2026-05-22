import { Sequence, interpolate, useCurrentFrame } from "remotion";
import {
  BarComparisonScene,
  CTAKeywordClose,
  ChartMarkerCallout,
  FullBleedChartStage,
  InfrastructureIconScene,
  KineticWordStack,
  LightEditorialStage,
  LogoActorGrid,
  LottieAccentLayer,
  MetricHook,
  familyBCPalette,
} from "../components/family-bc-primitives";
import type { FamilyBCReelHandoff } from "../contracts/family-bc-contract";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type FamilyBCCalibrationReelProps = FamilyBCReelHandoff;

export const FamilyBCCalibrationReel = ({
  watermark,
  ctaKeyword,
  chartProof,
  scenes,
}: FamilyBCCalibrationReelProps) => {
  const frame = useCurrentFrame();
  const sourceNoteOpacity = interpolate(frame, [80, 150], [0, 1], clamp);
  const chartScene = scenes.find((scene) => scene.visualRole === "chart-proof");
  const proofScene = scenes.find((scene) => scene.visualRole === "proof-birth");

  return (
    <LightEditorialStage
      watermark={watermark}
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fbfbfa 55%, #f5f8f2 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 76,
          bottom: 58,
          width: 720,
          opacity: sourceNoteOpacity,
          fontSize: 22,
          lineHeight: 1.2,
          color: "rgba(71, 85, 100, 0.52)",
        }}
      >
        {chartProof.recreationMode}. {chartProof.caveats[0]}
      </div>

      <Sequence durationInFrames={150} premountFor={30}>
        <MetricHook
          eyebrow="Invesense reel system"
          value="B/C"
          subtitle="Light editorial finance reels, with chart proof born on-screen."
        />
        <KineticWordStack
          words={["chart first", "asset led", "residue close"]}
          x={76}
          y={870}
          highlight="asset led"
        />
        <LottieAccentLayer role="highlight-sweep" x={188} y={1410} startFrame={54} />
      </Sequence>

      <Sequence from={150} durationInFrames={270} premountFor={45}>
        <FullBleedChartStage
          x={540}
          y={820}
          width={936}
          height={680}
          title={chartScene?.beat ?? "The chart is the stage"}
          values={[44, 51, 48, 63, 70, 68, 85, 98, 92, 116, 132]}
          axisLabels={["start", "source trace", "proof point"]}
        />
        <div
          style={{
            position: "absolute",
            left: 74,
            top: 1220,
            maxWidth: 760,
            fontSize: 54,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: -2.4,
            color: familyBCPalette.ink,
          }}
        >
          Chart-native proof.
          <br />
          Not a pasted plate.
        </div>
      </Sequence>

      <Sequence from={420} durationInFrames={240} premountFor={45}>
        <FullBleedChartStage
          x={540}
          y={750}
          width={936}
          height={640}
          title={proofScene?.beat ?? "Marker creates proof"}
          values={[44, 51, 48, 63, 70, 68, 85, 98, 92, 116, 132]}
          axisLabels={["start", "touch", "readout"]}
        />
        <ChartMarkerCallout x={802} y={540} label="proof born here" startFrame={40} />
        <LottieAccentLayer role="route-pulse" x={802} y={540} startFrame={40} />
        <div
          style={{
            position: "absolute",
            left: 74,
            top: 1170,
            maxWidth: 760,
            fontSize: 46,
            lineHeight: 1.05,
            fontWeight: 850,
            color: familyBCPalette.navy,
          }}
        >
          The label appears only after contact.
        </div>
        <BarComparisonScene
          title="Strict bars stay measured"
          x={74}
          y={1328}
          width={760}
          bars={[
            {
              label: "source trace",
              valueLabel: "anchored",
              value: 78,
              color: familyBCPalette.green,
            },
            {
              label: "floating proof",
              valueLabel: "blocked",
              value: 28,
              color: familyBCPalette.red,
            },
          ]}
        />
      </Sequence>

      <Sequence from={660} durationInFrames={210} premountFor={35}>
        <div
          style={{
            position: "absolute",
            left: 74,
            top: 176,
            maxWidth: 780,
            fontSize: 66,
            lineHeight: 0.98,
            fontWeight: 900,
            letterSpacing: -3,
          }}
        >
          Family C assets support the mechanism.
        </div>
        <LogoActorGrid
          x={74}
          y={500}
          actors={[
            { label: "LOGO", detail: "actor", color: familyBCPalette.green },
            { label: "BANK", detail: "rail", color: familyBCPalette.blue },
            { label: "DOC", detail: "source", color: familyBCPalette.navy },
            { label: "CTA", detail: "residue", color: familyBCPalette.red },
          ]}
        />
        <InfrastructureIconScene label="source rail" x={790} y={680} />
        <LottieAccentLayer role="proof-burst" x={790} y={680} startFrame={60} />
        <div
          style={{
            position: "absolute",
            left: 74,
            right: 74,
            bottom: 250,
            fontSize: 38,
            lineHeight: 1.12,
            fontWeight: 750,
            color: familyBCPalette.navy,
          }}
        >
          Lottie accents can add pulse, sweep, and route energy, but they never
          replace the hero proof object.
        </div>
      </Sequence>

      <Sequence from={870} durationInFrames={210} premountFor={45}>
        <div
          style={{
            position: "absolute",
            left: 78,
            right: 78,
            top: 148,
            height: 560,
            borderBottom: `8px solid ${familyBCPalette.green}`,
          }}
        />
        <ChartMarkerCallout x={196} y={690} label="residue line" startFrame={0} />
        <CTAKeywordClose
          prompt="If you want the source chart and breakdown,"
          keyword={ctaKeyword}
          residueLabel="The CTA inherits the chart event instead of becoming a generic end card."
        />
      </Sequence>
    </LightEditorialStage>
  );
};
