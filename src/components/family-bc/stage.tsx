import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import {
  colorForAccent,
  familyBCPalette,
  familyBCType,
  type FamilyBCAccent,
} from "./tokens";

type LightEditorialStageProps = {
  children: ReactNode;
  watermark?: string;
  sourceNote?: string;
  accent?: FamilyBCAccent;
  style?: CSSProperties;
};

export const LightEditorialStage = ({
  children,
  watermark,
  sourceNote,
  accent = "green",
  style,
}: LightEditorialStageProps) => {
  const accentColor = colorForAccent(accent);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${familyBCPalette.white} 0%, ${familyBCPalette.warmWhite} 58%, ${familyBCPalette.sand} 100%)`,
        color: familyBCPalette.ink,
        fontFamily: familyBCType.body,
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
      {sourceNote ? <SourceNoteAnchor note={sourceNote} /> : null}
    </AbsoluteFill>
  );
};

type SourceNoteAnchorProps = {
  note: string;
  opacity?: number;
};

export const SourceNoteAnchor = ({ note, opacity = 1 }: SourceNoteAnchorProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        bottom: 58,
        maxWidth: 720,
        fontSize: 22,
        lineHeight: 1.2,
        color: "rgba(71, 85, 100, 0.52)",
        opacity,
      }}
    >
      {note}
    </div>
  );
};
