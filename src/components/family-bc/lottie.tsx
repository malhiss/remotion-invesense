import { Lottie, type LottieAnimationData } from "@remotion/lottie";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { clamp, familyBCPalette } from "./tokens";

type ApprovedLottieProps = {
  id: string;
  localPath: string;
  style?: CSSProperties;
  loop?: boolean;
  playbackRate?: number;
};

export const ApprovedLottie = ({
  id,
  localPath,
  style,
  loop = false,
  playbackRate = 1,
}: ApprovedLottieProps) => {
  const [handle] = useState(() => delayRender(`Loading approved Lottie ${id}`));
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(
    null,
  );

  useEffect(() => {
    fetch(staticFile(localPath))
      .then((response) => response.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err: unknown) => {
        cancelRender(err instanceof Error ? err : new Error(String(err)));
      });
  }, [handle, localPath]);

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      playbackRate={playbackRate}
      style={style}
    />
  );
};

type LottieAccentLayerProps = {
  role: "route-pulse" | "highlight-sweep" | "CTA-pulse" | "proof-burst";
  x: number;
  y: number;
  color?: string;
  startFrame?: number;
};

export const LottieAccentLayer = ({
  role,
  x,
  y,
  color = familyBCPalette.green,
  startFrame = 0,
}: LottieAccentLayerProps) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame - startFrame, [0, 28], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(pulse, [0, 0.55, 1], [0, 0.35, 0], clamp);
  const sweep = role === "highlight-sweep";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: sweep ? 320 * pulse : 46 + pulse * 160,
        height: sweep ? 18 : 46 + pulse * 160,
        borderRadius: 999,
        transform: "translate3d(-50%, -50%, 0)",
        background: sweep ? color : "transparent",
        border: sweep ? "none" : `4px solid ${color}`,
        opacity,
      }}
    />
  );
};
