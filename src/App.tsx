import { BackgroundItems } from "components/backgroundItems/BackgroundItems";
import { Camera } from "components/backgroundItems/camera/camera";
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
                  <Camera />
                  <color attach="background" args={[0.96, 0.95, 0.91]} />
                  <Pages />
                  <BackgroundItems />
                </Suspense>
              </TweakContext.Provider>
            </Canvas>
          )}
        </DatGUIContext.Consumer>
      </DatGuiWrapper> */}
      <Canvas orthographic>
        <Suspense fallback={null}>
          <Camera />
          <color attach="background" args={[0.96, 0.95, 0.91]} />
          <Pages />
          <BackgroundItems />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
};

export default App;
