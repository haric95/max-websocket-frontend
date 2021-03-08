import { extend, ReactThreeFiber } from "react-three-fiber";
import { ShaderMaterial } from "three";

export class CustomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec3 vUv; 
      
        void main() {
          vUv = position; 
      
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition; 
        }
    `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0,1,1,1);
        }
    `,
    });
  }
}

extend({ CustomMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: ReactThreeFiber.Object3DNode<
        CustomMaterial,
        typeof CustomMaterial
      >;
    }
  }
}
