import { TweakContext } from "App";
import { Block } from "components/block/block";
import { Content } from "components/content/content";
import { DatGUIContext } from "components/datGUIWrapper/DatGUIWrapper";
import React, { useContext } from "react";
import { useLoader } from "react-three-fiber";
import { state } from "store/store";
import { TextureLoader } from "three";

const colors = ["#B5D3DD", "#D9A59E", "#E3E37E", "#B5DFB6"];

export const Pages: React.FC = () => {
  const textures = useLoader(TextureLoader, state.images);

  const { color } = useContext(TweakContext);

  return (
    <>
      <Block factor={1} offset={0}>
        <Content side="left" className="portfolio-block" color={colors[0]}>
          <h1>Honeywell's Futropolis</h1>
          <p>
            A modern web experience built with <b>react-three-fiber</b> and{" "}
            <b>Next.js</b>
          </p>
        </Content>
      </Block>
      <Block factor={-1} offset={1}>
        <Content side="right" color={colors[1]}></Content>
      </Block>
      <Block factor={1} offset={2}>
        <Content side="left" color={colors[2]}></Content>
      </Block>
      <Block factor={-1} offset={3}>
        <Content side="right" color={colors[3]}></Content>
      </Block>
    </>
  );
};
