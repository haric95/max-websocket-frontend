import { Pages } from "components/pages/pages";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { state } from "store/store";

const App = () => {
  const scrollArea = useRef<HTMLDivElement | null>(null);
  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    state.top.current = e.currentTarget.scrollTop;
  };

  useEffect(() => {
    if (scrollArea.current) {
      state.top.current = scrollArea.current.scrollTop;
    }
  }, [scrollArea]);

  return (
    <>
      <Canvas orthographic>
        <Suspense fallback={null}>
          <color attach="background" args={[0.01, 0.01, 0.05]} />
          <Pages />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
};

export default App;
