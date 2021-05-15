import React, { createContext, useState } from "react";
import DatGui, {
  DatBoolean,
  DatColor,
  DatFolder,
  DatNumber,
  DatSelect,
  DatString,
} from "react-dat-gui";
import "react-dat-gui/dist/index.css";

export const DatGUIContext = createContext<any>({});

export const DatGuiWrapper: React.FC = ({ children }) => {
  const [state, setState] = useState({
    data: {
      string: "Hello World",
      minMaxNumber: 66,
      number: 80,
      boolean: true,
      select: "one",
      color: "#2FA1D6",
      random: Math.random(),
      nested: {
        string: "Goodbye Cruel World",
      },
    },
  });

  const handleUpdate = (data: typeof state) => {
    setState((prevState) => ({ ...prevState, ...data }));
  };

  return (
    <DatGUIContext.Provider value={state}>
      {/* <main className="react-dat-gui-demo"> */}
      <DatGui
        data={state}
        onUpdate={handleUpdate}
        className="react-dat-gui-relative-position"
        style={{ zIndex: 1 }}
      >
        <DatString path="string" label="String" />
        <DatNumber
          path="minMaxNumber"
          label="Number"
          min={0}
          max={100}
          step={1}
        />
        <DatNumber path="number" label="Number" min={0} max={1} step={0.1} />
        <DatBoolean path="boolean" label="Boolean" />
        <DatSelect
          label="Select"
          path="select"
          options={["two", "three", "four"]}
        />
        <DatColor label="Color" path="color" />
        <DatFolder title="Folder" closed={true}>
          <DatString path="string" label="String" />
          <DatNumber
            path="minMaxNumber"
            label="Number"
            min={0}
            max={100}
            step={1}
          />
        </DatFolder>
      </DatGui>
      {children}
      {/* </main> */}
    </DatGUIContext.Provider>
  );
};
