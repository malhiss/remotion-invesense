import "./index.css";
import { Composition } from "remotion";
import { FamilyBCCalibrationReel } from "./compositions/FamilyBCCalibrationReel";
import { FamilyBCVisualSystemCalibration } from "./compositions/FamilyBCVisualSystemCalibration";
import { InvesenseReel } from "./compositions/InvesenseReel";
import { FamilyBCReelHandoffSchema } from "./contracts/family-bc-contract";
import { FamilyBCVisualSystemCalibrationSchema } from "./contracts/family-bc-visual-system-contract";
import { ReelHandoffSchema } from "./contracts/reel-contract";
import { calibrationHandoff } from "./data/calibration-handoff";
import { familyBCCalibrationHandoff } from "./data/family-bc-calibration-handoff";
import { familyBCVisualSystemCalibration } from "./data/family-bc-visual-system-calibration";

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
    </>
  );
};
