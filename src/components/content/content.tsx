import { useBlock } from "components/block/block";
import { Plane } from "components/plane/plane";
import React from "react";
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
  const { contentMaxWidth, canvasWidth, margin } = useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  return (
    <group position={[alignRight * (side === "left" ? -1 : 1), 0, 0]}>
      {map ? (
        <Plane
          scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
          map={map}
        />
      ) : (
        <Plane
          scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
          color={color}
        />
      )}
      {children}
    </group>
  );
};
