export declare type Object3DNode<T, P> = Overwrite<
  Node<T, P>,
  {
    position: Vector3;
    up?: Vector3;
    scale?: Vector3;
    rotation?: Euler;
    matrix?: Matrix4;
    quaternion?: Quaternion;
    layers?: Layers;
    dispose?: (() => void) | null;
  }
> &
  EventHandlers;
