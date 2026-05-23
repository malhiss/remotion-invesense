import "./index.css";
import { Composition } from "remotion";
import { FamilyBCCalibrationReel } from "./compositions/FamilyBCCalibrationReel";
import { FamilyBCAssetEventPrimitiveLab } from "./compositions/FamilyBCAssetEventPrimitiveLab";
import { FamilyBCVisualSystemCalibration } from "./compositions/FamilyBCVisualSystemCalibration";
import { InvesenseReel } from "./compositions/InvesenseReel";
import { SukukThresholdRailStills } from "./compositions/SukukThresholdRailStills";
import { FamilyBCAssetEventPrimitiveLabSchema } from "./contracts/asset-event-lab-contract";
import { FamilyBCReelHandoffSchema } from "./contracts/family-bc-contract";
import { FamilyBCVisualSystemCalibrationSchema } from "./contracts/family-bc-visual-system-contract";
import { ReelHandoffSchema } from "./contracts/reel-contract";
import { calibrationHandoff } from "./data/calibration-handoff";
import { familyBCAssetEventPrimitiveLab } from "./data/family-bc-asset-event-primitive-lab";
import { familyBCCalibrationHandoff } from "./data/family-bc-calibration-handoff";
import { familyBCVisualSystemCalibration } from "./data/family-bc-visual-system-calibration";
import { phase6bSukukStillsHandoff } from "./data/phase6b-sukuk-stills-handoff";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="InvesenseCalibrationReel"
        component={InvesenseReel}
        durationInFrames={calibrationHandoff.format.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        schema={ReelHandoffSchema}
        defaultProps={calibrationHandoff}
      />
      <Composition
        id="FamilyBCCalibrationReel"
        component={FamilyBCCalibrationReel}
        durationInFrames={familyBCCalibrationHandoff.format.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        schema={FamilyBCReelHandoffSchema}
        defaultProps={familyBCCalibrationHandoff}
      />
      <Composition
        id="FamilyBCVisualSystemCalibration"
        component={FamilyBCVisualSystemCalibration}
        durationInFrames={familyBCVisualSystemCalibration.format.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        schema={FamilyBCVisualSystemCalibrationSchema}
        defaultProps={familyBCVisualSystemCalibration}
      />
      <Composition
        id="SukukThresholdRailStills"
        component={SukukThresholdRailStills}
        durationInFrames={phase6bSukukStillsHandoff.format.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={phase6bSukukStillsHandoff}
      />
      <Composition
        id="FamilyBCAssetEventPrimitiveLab"
        component={FamilyBCAssetEventPrimitiveLab}
        durationInFrames={familyBCAssetEventPrimitiveLab.format.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        schema={FamilyBCAssetEventPrimitiveLabSchema}
        defaultProps={familyBCAssetEventPrimitiveLab}
      />
    </>
  );
};
