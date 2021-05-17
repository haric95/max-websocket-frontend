import { BackgroundItems } from "components/backgroundItems/BackgroundItems";
import { Camera } from "components/camera/camera";
import {
  DatGUIContext,
  DatGuiWrapper,
} from "components/datGUIWrapper/DatGUIWrapper";
import { Pages } from "components/pages/pages";
import { useHandleKeyPress } from "helpers/useHandleKeyPress";
import React, {
  createContext,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "react-three-fiber";
import { state } from "store/store";

type ThemeContext = {
  isAccesibilityMode: boolean;
};

export const TweakContext = createContext<any>({});
export const ThemeContext = createContext<ThemeContext>({
  isAccesibilityMode: false,
});

const App: React.FC = () => {
  const scrollArea = useRef<HTMLDivElement | null>(null);
  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    state.top.current = e.currentTarget.scrollTop;
  };
  const [theme, setTheme] = useState<ThemeContext>({
    isAccesibilityMode: false,
  });

  const toggleAccessibility = useCallback(() => {
    setTheme((oldTheme) => ({
      isAccesibilityMode: !oldTheme.isAccesibilityMode,
    }));
  }, []);

  useHandleKeyPress("a", toggleAccessibility);

  useEffect(() => {
    if (scrollArea.current) {
      state.top.current = scrollArea.current.scrollTop;
    }
  }, [scrollArea]);

  return (
    <>
      <ThemeContext.Provider value={theme}>
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
          <ThemeContext.Provider value={theme}>
            <Suspense fallback={null}>
              <Camera />
              <color attach="background" args={[0.96, 0.95, 0.91]} />
              <Pages />
              <BackgroundItems />
            </Suspense>
          </ThemeContext.Provider>
        </Canvas>
        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          <div style={{ height: `${state.pages * 100}vh` }} />
          {theme.isAccesibilityMode && (
            <h4 className="accessibility-label ">Accessibility mode on</h4>
          )}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
