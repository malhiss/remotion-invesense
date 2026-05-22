import "./index.css";
import { Composition } from "remotion";
import { FamilyBCCalibrationReel } from "./compositions/FamilyBCCalibrationReel";
import { InvesenseReel } from "./compositions/InvesenseReel";
import { FamilyBCReelHandoffSchema } from "./contracts/family-bc-contract";
import { ReelHandoffSchema } from "./contracts/reel-contract";
import { calibrationHandoff } from "./data/calibration-handoff";
import { familyBCCalibrationHandoff } from "./data/family-bc-calibration-handoff";

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
    </>
  );
};
