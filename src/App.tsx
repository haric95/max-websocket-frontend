import {
  DatGUIContext,
  DatGuiWrapper,
} from "components/datGUIWrapper/DatGUIWrapper";
import { Pages } from "components/pages/pages";
import React, { createContext, Suspense, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { state } from "store/store";

export const TweakContext = createContext<any>({});

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
      {/* Uncomment to enable tweakpanes */}
      {/* <DatGuiWrapper>
        <DatGUIContext.Consumer>
          {(context) => (
            <Canvas orthographic>
              <TweakContext.Provider value={context}>
                <Suspense fallback={null}>
                  <color attach="background" args={[0.96, 0.95, 0.91]} />
                  <Pages />
                  <Room />
                  <pointLight position={[10, 10, 0]} />
                </Suspense>
              </TweakContext.Provider>
            </Canvas>
          )}
        </DatGUIContext.Consumer>
      </DatGuiWrapper> */}
      <Canvas orthographic>
        <Suspense fallback={null}>
          <color attach="background" args={[0.96, 0.95, 0.91]} />
          <Pages />
          {/* <Room /> */}
          <pointLight position={[10, 10, 0]} />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
};

export default App;
