import { ThemeContext } from "App";
import { useBlock } from "components/block/block";
import { Plane } from "components/plane/plane";
import { Html, HtmlProps } from "drei";
import { stat } from "node:fs";
import React, { useContext, useMemo } from "react";
import { state } from "store/store";
import {
  MeshBasicMaterial,
  MeshBasicMaterialParameters,
  Texture,
} from "three/";

type ContentProps = {
  side: "left" | "right";
  color?: MeshBasicMaterialParameters["color"];
  map?: Texture;
} & HtmlProps;

export const Content: React.FC<ContentProps> = ({
  side = "left",
  color,
  map = null,
  children,
  ...props
}) => {
  const { contentMaxWidth, canvasWidth, margin, isMobile, sectionHeight } =
    useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  const planeHeight = contentMaxWidth / aspect;
  const pixelWidth = contentMaxWidth * state.zoom;

  const material = useMemo(() => {
    return new MeshBasicMaterial({ color: "green" });
  }, []);

  return (
    <group position={[alignRight * (side === "left" ? -1 : 1), 0, 0]}>
      {map ? (
        <Plane scale={[contentMaxWidth, planeHeight, 1]} map={map} />
      ) : (
        <Plane
          scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
          color={color ?? undefined}
          material={material}
        />
      )}
      <Html
        style={{
          width: alignRight ? pixelWidth - 12 : pixelWidth,
          textAlign: "left",
          top: -planeHeight / 2,
          height: planeHeight,
        }}
        position={[-contentMaxWidth / 2, 0, 1]}
        {...props}
      >
        {children}
      </Html>
    </group>
  );
};
