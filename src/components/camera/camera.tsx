import React from "react";
import { TweakContext } from "App";
import { OrthographicCamera } from "drei";
import { useContext, useMemo } from "react";

export const Camera: React.FC = () => {
  return (
    <OrthographicCamera
      makeDefault
      position={[0, 0, 1000]}
      near={0.1}
      far={10000}
      lookAt={[0, 0, 0] as any}
    />
  );
};
