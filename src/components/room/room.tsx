import { Box } from "drei";
import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import {
  BoxBufferGeometry,
  DoubleSide,
  MeshBasicMaterial,
  MeshPhongMaterial,
} from "three";

export const Room: React.FC = () => {
  const material = useMemo(
    () => new MeshPhongMaterial({ color: "white", side: DoubleSide }),
    []
  );

  const boxRef = useRef<BoxBufferGeometry | null>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotateX(0.01);
      boxRef.current.rotateY(0.01);
    }
  });

  return (
    <Box
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[100, 100, 100]}
      material={material}
      ref={boxRef}
    />
  );
};
