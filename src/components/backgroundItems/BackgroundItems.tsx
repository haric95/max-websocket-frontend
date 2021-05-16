import { useGLTF } from "drei";
import { useIsMobile } from "helpers/useIsMobile";
import lerp from "lerp";
import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { state } from "store/store";
import { Mesh, MeshBasicMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFSectionsResult = GLTF & {
  nodes: {
    laptop: THREE.Mesh;
    books: THREE.Mesh;
    camera: THREE.Mesh;
  };
  materials: {};
};

type GLTFGeosResult = GLTF & {
  nodes: {
    geo1: THREE.Mesh;
    geo2: THREE.Mesh;
    geo3: THREE.Mesh;
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
  const { nodes: sectionsNodes } = useGLTF(
    "/sections.glb"
  ) as GLTFSectionsResult;
  const { nodes: geosNodes } = useGLTF("/geos.glb") as GLTFGeosResult;

  const { calculateSize: calculateLaptopSize } = useBackgroundItem(0, 3.5, 15);
  const { calculateSize: calculateCameraSize } = useBackgroundItem(3, 4.5, 15);
  const { calculateSize: calculateBookSize } = useBackgroundItem(4, 6.5, 15);
  const { calculateSize: calculateGeo1Size } = useBackgroundItem(6, 7.5, 180);
  const { calculateSize: calculateGeo3Size } = useBackgroundItem(7, 9, 180);

  const isMobile = useIsMobile();
  const desktopMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        wireframe: true,
        color: "black",
        wireframeLinewidth: 100,
      }),
    []
  );
  const mobileMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        wireframe: true,
        color: "white",
        wireframeLinewidth: 100,
      }),
    []
  );
  const material = isMobile ? mobileMaterial : desktopMaterial;

  const laptopRef = useRef<Mesh | null>(null);
  const cameraRef = useRef<Mesh | null>(null);
  const bookRef = useRef<Mesh | null>(null);

  const geo1Ref = useRef<Mesh | null>(null);
  const geo3Ref = useRef<Mesh | null>(null);

  const updateScale = (element: Mesh, calculator: (num: number) => number) => {
    const currentScale = element.scale.x;
    const targetScale = calculator(state.top.current);
    const newScale = lerp(currentScale, targetScale, 0.05);
    element.scale.set(newScale, newScale, newScale);
  };

  useFrame(() => {
    if (laptopRef.current) {
      laptopRef.current.rotateX(0.001);
      laptopRef.current.rotateY(0.002);
      updateScale(laptopRef.current, calculateLaptopSize);
    }

    if (cameraRef.current) {
      cameraRef.current.rotateX(-0.001);
      cameraRef.current.rotateY(-0.002);
      updateScale(cameraRef.current, calculateCameraSize);
    }

    if (bookRef.current) {
      bookRef.current.rotateZ(-0.002);
      bookRef.current.rotateX(-0.0005);
      updateScale(bookRef.current, calculateBookSize);
    }

    if (geo1Ref.current && geo3Ref.current) {
      geo1Ref.current.rotateZ(-0.002);
      geo1Ref.current.rotateX(-0.0005);
      updateScale(geo1Ref.current, calculateGeo1Size);
      geo3Ref.current.rotateZ(-0.002);
      geo3Ref.current.rotateX(-0.0005);
      updateScale(geo3Ref.current, calculateGeo3Size);
    }
  });

  return (
    <>
      <mesh
        material={material}
        geometry={sectionsNodes.laptop.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[Math.PI / 4, 0, Math.PI]}
        ref={laptopRef}
      />
      <mesh
        material={material}
        geometry={sectionsNodes.camera.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[0.6, 0.3, 0]}
        ref={cameraRef}
      />
      <mesh
        material={material}
        geometry={sectionsNodes.books.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[2, 0, 0]}
        ref={bookRef}
      />
      <mesh
        material={material}
        geometry={geosNodes.geo1.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[Math.PI / 2 + 0.2, 0, 0]}
        ref={geo1Ref}
      />
      <mesh
        material={material}
        geometry={geosNodes.geo3.geometry}
        scale={[0, 0, 0]}
        position={[0, 0, -250]}
        rotation={[Math.PI / 2 + 0.2, 0, 0]}
        ref={geo3Ref}
      />
    </>
  );
};
