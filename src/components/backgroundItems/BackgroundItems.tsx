import { useGLTF } from "drei";
import React, { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Mesh, MeshBasicMaterial, Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Laptop_Model: THREE.Mesh;
  };
  materials: {};
};

export const BackgroundItems: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { nodes } = useGLTF("/laptop.glb") as GLTFResult;

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        wireframe: true,
        color: "black",
        wireframeLinewidth: 100,
      }),
    []
  );

  const laptopRef = useRef<Mesh | null>(null);

  useFrame(() => {
    if (laptopRef.current) {
      laptopRef.current.rotateX(0.001);
      laptopRef.current.rotateY(0.002);
    }
  });

  return (
    <mesh
      material={material}
      geometry={nodes.Laptop_Model.geometry}
      scale={[15, 15, 15]}
      position={[0, 0, -250]}
      rotation={[Math.PI / 4, 0, Math.PI]}
      ref={laptopRef}
    />
  );
};
