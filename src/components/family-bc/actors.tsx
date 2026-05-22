import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp, familyBCPalette, familyBCType } from "./tokens";

type LogoActorProps = {
  label: string;
  x: number;
  y: number;
  color?: string;
  detail?: string;
};

export const LogoActor = ({
  label,
  x,
  y,
  color = familyBCPalette.green,
  detail,
}: LogoActorProps) => {
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
        width: 132,
        height: 132,
        borderRadius: 36,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: familyBCPalette.white,
        border: `3px solid ${color}`,
        boxShadow: "0 20px 54px rgba(71, 85, 100, 0.12)",
        color: familyBCPalette.ink,
        fontFamily: familyBCType.display,
        fontSize: 30,
        fontWeight: 900,
        opacity: appear,
        transform: `translate3d(-50%, -50%, 0) scale(${0.82 + appear * 0.18})`,
      }}
    >
      {label}
      {detail ? (
        <span
          style={{
            marginTop: 8,
            fontSize: 16,
            fontWeight: 800,
            color: familyBCPalette.navy,
            letterSpacing: 0.6,
          }}
        >
          {detail}
        </span>
      ) : null}
    </div>
  );
};

type ActorRailProps = {
  x: number;
  y: number;
  width: number;
  color?: string;
  label?: string;
};

export const ActorRail = ({
  x,
  y,
  width,
  color = familyBCPalette.green,
  label = "actor rail",
}: ActorRailProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 36], [0, 1], clamp);

  return (
    <svg width={width} height={92} viewBox={`0 0 ${width} 92`} style={{ position: "absolute", left: x, top: y }}>
      <path
        d={`M 0 46 H ${width * reveal}`}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <text
        x={width}
        y={32}
        textAnchor="end"
        fontFamily={familyBCType.body}
        fontSize={22}
        fontWeight={800}
        fill={familyBCPalette.navy}
      >
        {label}
      </text>
    </svg>
  );
};

type LogoActorGridProps = {
  actors: Array<{
    label: string;
    detail: string;
    color: string;
  }>;
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
              background: familyBCPalette.white,
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

type InstitutionalIconProps = {
  label: string;
  x: number;
  y: number;
  color?: string;
};

export const InstitutionalIcon = ({
  label,
  x,
  y,
  color = familyBCPalette.green,
}: InstitutionalIconProps) => {
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
      <rect x="86" y="112" width="128" height="116" rx="18" fill={color} opacity="0.16" />
      <path d="M 70 112 L 150 58 L 230 112 Z" fill={color} opacity="0.84" />
      {[104, 132, 160, 188].map((pillar) => (
        <rect key={pillar} x={pillar} y="128" width="14" height="82" rx="4" fill={familyBCPalette.navy} opacity="0.36" />
      ))}
      <text
        x="150"
        y="278"
        textAnchor="middle"
        fontFamily={familyBCType.body}
        fontSize="24"
        fontWeight="800"
        fill={familyBCPalette.ink}
      >
        {label}
      </text>
    </svg>
  );
};

export const InfrastructureIconScene = InstitutionalIcon;

type DocumentStampObjectProps = {
  x: number;
  y: number;
  label: string;
  stamp: string;
  stampFrame: number;
};

export const DocumentStampObject = ({
  x,
  y,
  label,
  stamp,
  stampFrame,
}: DocumentStampObjectProps) => {
  const frame = useCurrentFrame();
  const stampIn = interpolate(frame, [stampFrame, stampFrame + 18], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 250,
        height: 310,
        borderRadius: 28,
        background: familyBCPalette.white,
        border: `2px solid ${familyBCPalette.lightGray}`,
        boxShadow: "0 24px 64px rgba(71, 85, 100, 0.12)",
        padding: 28,
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 900 }}>{label}</div>
      <div
        style={{
          marginTop: 24,
          width: 150,
          height: 8,
          borderRadius: 999,
          background: familyBCPalette.lightGray,
        }}
      />
      <div
        style={{
          marginTop: 18,
          width: 112,
          height: 8,
          borderRadius: 999,
          background: familyBCPalette.lightGray,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 44,
          bottom: 44,
          border: `5px solid ${familyBCPalette.green}`,
          color: familyBCPalette.green,
          borderRadius: 18,
          padding: "12px 18px",
          fontSize: 25,
          fontWeight: 900,
          letterSpacing: 1.4,
          transform: `rotate(-10deg) scale(${stampIn})`,
          opacity: stampIn,
        }}
      >
        {stamp}
      </div>
    </div>
  );
};

type PaymentDataRouteProps = {
  x: number;
  y: number;
  width: number;
  startLabel: string;
  endLabel: string;
  color?: string;
};

export const PaymentDataRoute = ({
  x,
  y,
  width,
  startLabel,
  endLabel,
  color = familyBCPalette.blue,
}: PaymentDataRouteProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 54], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <svg width={width} height={150} viewBox={`0 0 ${width} 150`} style={{ position: "absolute", left: x, top: y }}>
      <circle cx="44" cy="74" r="34" fill={familyBCPalette.white} stroke={color} strokeWidth="5" />
      <circle cx={width - 44} cy="74" r="34" fill={familyBCPalette.white} stroke={color} strokeWidth="5" />
      <path
        d={`M 82 74 H ${82 + (width - 164) * progress}`}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <text x="44" y="132" textAnchor="middle" fontSize="20" fontWeight="800" fill={familyBCPalette.navy}>
        {startLabel}
      </text>
      <text x={width - 44} y="132" textAnchor="middle" fontSize="20" fontWeight="800" fill={familyBCPalette.navy}>
        {endLabel}
      </text>
    </svg>
  );
};
