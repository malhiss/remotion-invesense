import type { FamilyBCVisualSystemCalibration } from "../../contracts/family-bc-visual-system-contract";

export const getPhase3ReviewFrames = (
  handoff: FamilyBCVisualSystemCalibration,
) => handoff.review.frames;

export const phase3ReviewFrameLabels = [
  "hook",
  "chart",
  "event",
  "proof",
  "lottie",
  "ctaResidue",
] as const;
