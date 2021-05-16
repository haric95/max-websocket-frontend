import { useGLTF } from "drei";
import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { state } from "store/store";
import { Mesh, MeshBasicMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Laptop_Model: THREE.Mesh;
  };
  materials: {};
};

export const useBackgroundItem = (
  appearAtSection: number,
  disappearAtSection: number,
  maxSize: number
) => {
  const { pages, sections } = state;
  const { size, viewport } = useThree();
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth;
  const canvasHeight = viewportHeight;
  const isMobile = size.width < 768;
  const margin = isMobile ? 0.1 : 0.8;
  const contentMaxWidth = canvasWidth * (isMobile ? 0.8 : 0.6);
  // 1 page is 100vh scroll distance. So 3 pages would be a height of 300vh.
  // Sections is the number of sections this distance is divided up into.
  // Subtract 1 as pages and sections include 0 index.
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));

  // https://www.desmos.com/calculator/6svqaqt7h1
  const calculateSize = (scrollTop: number) => {
    const pixelIn = appearAtSection * sectionHeight;
    const pixelOut = disappearAtSection * sectionHeight;
    // The number of pixels taken to take from min -> max and max -> min;
    // Defaulting to half a section;
    const gradientScaler = sectionHeight / 2;
    const inFunction = Math.min(
      Math.max((scrollTop - pixelIn) * (maxSize / gradientScaler), 0),
      maxSize
    );
    const outFunction = Math.min(
      Math.max((-scrollTop + pixelOut) * (maxSize / gradientScaler), 0),
      maxSize
    );
    return Math.min(inFunction, outFunction);
  };

  return {
    viewport,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    isMobile,
    margin,
    contentMaxWidth,
    sectionHeight,
    calculateSize,
  };
};

export const BackgroundItems: React.FC = () => {
  const { nodes } = useGLTF("/laptop.glb") as GLTFResult;

  const { calculateSize } = useBackgroundItem(0, 4, 15);

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
      const scale = calculateSize(state.top.current);
      laptopRef.current.scale.set(scale, scale, scale);
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
