import { useBlock } from "components/block/block";
import { Plane } from "components/plane/plane";
import { Html } from "drei";
import { stat } from "node:fs";
import React from "react";
import { state } from "store/store";
import { MeshBasicMaterialParameters, Texture } from "three/";

type ContentProps = {
  side: "left" | "right";
  color?: MeshBasicMaterialParameters["color"];
  map?: Texture;
};

export const Content: React.FC<ContentProps> = ({
  side = "left",
  color = "#bfe2ca",
  map = null,
  children,
}) => {
  const { contentMaxWidth, canvasWidth, margin, isMobile, sectionHeight } =
    useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  const planeHeight = contentMaxWidth / aspect;
  const pixelWidth = contentMaxWidth * state.zoom;

  return (
    <group position={[alignRight * (side === "left" ? -1 : 1), 0, 0]}>
      {map ? (
        <Plane scale={[contentMaxWidth, planeHeight, 1]} map={map} />
      ) : (
        <Plane
          scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
          color={color}
        />
      )}
      <Html
        style={{
          width: pixelWidth,
          textAlign: "left",
          top: -planeHeight / 2,
          height: planeHeight,
          padding: 2,
        }}
        position={[-contentMaxWidth / 2, 0, 1]}
      >
        {children}
      </Html>
    </group>
  );
};
