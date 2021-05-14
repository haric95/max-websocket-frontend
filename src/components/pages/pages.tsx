import { Block } from "components/block/block";
import { Content } from "components/content/content";
import { Html } from "drei";
import React from "react";
import { useLoader } from "react-three-fiber";
import { state } from "store/store";
import { TextureLoader } from "three";
import FutropolisImg from "assets/futropolis.webp";

export const Pages: React.FC = () => {
  const textures = useLoader(TextureLoader, state.images);

  return (
    <>
      <Block factor={1} offset={0}>
        <Content side="left" map={textures[0]} className="portfolio-block">
          <h1>Honeywell's Futropolis</h1>
          <img src={FutropolisImg} />
        </Content>
      </Block>
      <Block factor={-1} offset={1}>
        <Content side="right" color="pink"></Content>
      </Block>
      <Block factor={1} offset={2}>
        <Content side="left" color="yellow"></Content>
      </Block>
      <Block factor={-1} offset={3}>
        <Content side="right" color="orange"></Content>
      </Block>
    </>
  );
};
