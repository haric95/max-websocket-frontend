import { TweakContext } from "App";
import { useGLTF } from "drei";
import lerp from "lerp";
import React, { useContext, useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { state } from "store/store";
import { Mesh, MeshBasicMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFLaptopResult = GLTF & {
  nodes: {
    Laptop_Model: THREE.Mesh;
  };
  materials: {};
};

type GLTFCameraResult = GLTF & {
  nodes: {
    Camera: THREE.Mesh;
  };
  materials: {};
};

type GLTFBookResult = GLTF & {
  nodes: {
    Books: THREE.Mesh;
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
  const { nodes: laptopNodes } = useGLTF("/laptop.glb") as GLTFLaptopResult;
  const { nodes: cameraNodes } = useGLTF("/camera.glb") as GLTFCameraResult;
  const { nodes: bookNodes } = useGLTF("/books.glb") as GLTFBookResult;

  const { calculateSize: calculateLaptopSize } = useBackgroundItem(0, 3.5, 15);
  const { calculateSize: calculateCameraSize } = useBackgroundItem(3, 4.5, 15);
  const { calculateSize: calculateBookSize } = useBackgroundItem(4, 6.5, 300);

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
  const cameraRef = useRef<Mesh | null>(null);
  const bookRef = useRef<Mesh | null>(null);

  useFrame(() => {
    if (laptopRef.current) {
      laptopRef.current.rotateX(0.001);
      laptopRef.current.rotateY(0.002);
      const currentScale = laptopRef.current.scale.x;
      const targetScale = calculateLaptopSize(state.top.current);
      const newScale = lerp(currentScale, targetScale, 0.05);
      laptopRef.current.scale.set(newScale, newScale, newScale);
    }

    if (cameraRef.current) {
      cameraRef.current.rotateX(-0.001);
      cameraRef.current.rotateY(-0.002);
      const currentScale = cameraRef.current.scale.x;
      const targetScale = calculateCameraSize(state.top.current);
      const newScale = lerp(currentScale, targetScale, 0.05);
      cameraRef.current.scale.set(newScale, newScale, newScale);
    }

    if (bookRef.current) {
      bookRef.current.rotateZ(-0.002);
      bookRef.current.rotateX(-0.0005);
      const currentScale = bookRef.current.scale.x;
      const targetScale = calculateBookSize(state.top.current);
      const newScale = lerp(currentScale, targetScale, 0.05);
      bookRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <>
      <mesh
        material={material}
        geometry={laptopNodes.Laptop_Model.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[Math.PI / 4, 0, Math.PI]}
        ref={laptopRef}
      />
      <mesh
        material={material}
        geometry={cameraNodes.Camera.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[0.6, 0.3, 0]}
        ref={cameraRef}
      />
      <mesh
        material={material}
        geometry={bookNodes.Books.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[2, 0, 0]}
        ref={bookRef}
      />
    </>
  );
};
