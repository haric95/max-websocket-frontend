import { Box } from "drei";
import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { MeshBasicMaterial, Object3D } from "three";

export const BackgroundItems: React.FC = () => {
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        wireframe: true,
        color: "black",
        wireframeLinewidth: 100,
      }),
    []
  );

  const boxRef = useRef<Object3D | null>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotateX(0.001);
      boxRef.current.rotateY(0.002);
    }
  });

  return (
    <Box
      material={material}
      scale={[100, 100, 100]}
      position={[0, 0, -100]}
      ref={boxRef}
    />
  );
};
