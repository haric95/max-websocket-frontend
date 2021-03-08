import "materials/custom-material";
import { CustomMaterial } from "materials/custom-material";
import React, { useRef } from "react";
import { Object3DNode } from "react-three-fiber";
import {
  BufferGeometry,
  Geometry,
  Material,
  Mesh,
  MeshBasicMaterialParameters,
  ShaderMaterial,
  Texture,
} from "three";

type PlaneProps = {
  color?: MeshBasicMaterialParameters["color"];
  map?: Texture;
} & Object3DNode<
  Mesh<Geometry | BufferGeometry, Material | Material[]>,
  typeof Mesh
>;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(0,1,1,1);
  }
`;

const vertexShader = `
  varying vec3 vUv; 

  void main() {
    vUv = position; 

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
  }
`;

export const Plane: React.FC<PlaneProps> = ({ map, color, ...props }) => {
  const material = useRef<CustomMaterial>(null);
  const shader = React.useRef<ShaderMaterial>();
  return (
    <mesh {...props}>
      <planeBufferGeometry />
      {map ? (
        // <shaderMaterial
        //   fragmentShader={fragmentShader}
        //   vertexShader={vertexShader}
        // />
        <customMaterial attach="material" />
      ) : color ? (
        <meshBasicMaterial color={color} />
      ) : null}
    </mesh>
  );
};
