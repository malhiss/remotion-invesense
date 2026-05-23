import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  ChartAsObject,
  HeroObject,
  ImpactEvent,
  KineticCaption,
  LogoActor,
  PhysicalConstraint,
  ProofBirth,
  ResidueFrame,
} from "../components/reel-primitives";
import type { ReelHandoff } from "../contracts/reel-contract";

const stageBackground =
  "radial-gradient(circle at 50% 26%, rgba(47, 255, 112, 0.18), transparent 34%), linear-gradient(180deg, #06110c 0%, #07100d 52%, #020403 100%)";

type InvesenseReelProps = ReelHandoff;

export const InvesenseReel = ({
  title,
  sourceClaims,
  scenes,
}: InvesenseReelProps) => {
  const frame = useCurrentFrame();
  const claim = sourceClaims[0];
  const eventScene = scenes.find((scene) => scene.physicalEvent === "impact");
  const proofFrame = eventScene?.proofBirthFrame ?? 58;
  const backgroundShift = Math.min(frame / 300, 1);

  return (
    <AbsoluteFill
      style={{
        background: stageBackground,
        color: "#f2fff5",
        fontFamily: "Tahoma, Aptos Display, Segoe UI, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(112deg, transparent 0%, rgba(117, 255, 151, 0.08) 50%, transparent 100%)",
          opacity: 0.28 + backgroundShift * 0.18,
        }}
      />

      <Sequence durationInFrames={90} premountFor={30}>
        <AbsoluteFill style={{ padding: 86, justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontSize: 24,
                letterSpacing: 5,
                color: "rgba(222, 255, 230, 0.72)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Invesense Remotion foundation
            </div>
            <KineticCaption
              text="Show the mechanism, not the dashboard."
              style={{ marginTop: 34, maxWidth: 820 }}
            />
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.15,
              color: "rgba(235, 255, 241, 0.62)",
              maxWidth: 760,
            }}
          >
            {title}
          </div>
        </AbsoluteFill>
        <HeroObject startX={230} endX={530} y={1320} size={210} impactFrame={84} />
        <LogoActor label="INV" x={850} y={420} />
      </Sequence>

      <Sequence from={90} durationInFrames={130} premountFor={30}>
        <HeroObject startX={190} endX={618} y={946} size={238} impactFrame={58} />
        <PhysicalConstraint
          x={650}
          y={560}
          width={240}
          height={740}
          impactFrame={58}
        />
        <ImpactEvent x={618} y={946} impactFrame={58} />
        <ProofBirth
          value={claim.value}
          label={claim.label}
          x={618}
          y={846}
          birthFrame={proofFrame}
        />
        <ChartAsObject x={260} y={1340} values={[80, 126, 174, 214]} />
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            padding: 86,
            pointerEvents: "none",
          }}
        >
          <KineticCaption
            text={eventScene?.labels[0] ?? "Impact creates proof."}
            style={{ fontSize: 58, maxWidth: 680 }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={220} durationInFrames={80} premountFor={30}>
        <PhysicalConstraint
          x={650}
          y={520}
          width={240}
          height={800}
          impactFrame={0}
        />
        <ImpactEvent x={618} y={946} impactFrame={0} />
        <ProofBirth
          value={claim.value}
          label="still attached to the scar"
          x={618}
          y={842}
          birthFrame={0}
        />
        <ResidueFrame text="The final frame keeps the wound." proof={claim.value} />
      </Sequence>
    </AbsoluteFill>
  );
};
