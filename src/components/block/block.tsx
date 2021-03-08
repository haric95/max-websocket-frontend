import React, { createContext, useContext, useRef } from "react";
import { Object3DNode, useFrame, useThree } from "react-three-fiber";
import { state } from "store/store";
import lerp from "lerp";
import { Group, Vector3 } from "three";

const offsetContext = createContext(0);

type BlockProps = {
  offset: number;
  factor: number;
};

export const Block: React.FC<BlockProps> = ({
  children,
  factor,
  offset,
  ...props
}) => {
  const { offset: parentOffset, sectionHeight } = useBlock();
  const ref = useRef<Object3DNode<Group, any> | null>(null);
  offset = offset !== undefined ? offset : parentOffset;

  useFrame(() => {
    if (ref.current) {
      const curY = (ref.current.position as Vector3).y;
      const curTop = state.top.current;
      (ref.current.position as Vector3).y = lerp(
        curY,
        (curTop / state.zoom) * factor,
        0.05
      );
    }
  });

  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
};

export const useBlock = () => {
  const { pages, sections } = state;
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
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
  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    isMobile,
    margin,
    contentMaxWidth,
    sectionHeight,
  };
};
