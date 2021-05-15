import { TweakContext } from "App";
import { EmailIcon, GithubIcon, LinkedinIcon } from "components/icons/icons";
import { Block } from "components/block/block";
import { Content } from "components/content/content";
import { DatGUIContext } from "components/datGUIWrapper/DatGUIWrapper";
import React, { useContext } from "react";
import { useLoader } from "react-three-fiber";
import { state } from "store/store";
import { TextureLoader } from "three";
import { IconButton } from "components/icons/icon-button";

const colors = ["#B5D3DD", "#D9A59E", "#E3E37E", "#B5DFB6"];

export const Pages: React.FC = () => {
  const linkToExternal = () => {};
  return (
    <>
      <Block factor={1} offset={0}>
        <Content side="left" className="portfolio-block" color={colors[0]}>
          <h1>Hi - I'm Hari </h1>
          <h2 style={{ color: "var(--blue-600)" }}>
            A London based <span className="accent">software engineer</span>{" "}
            with a focus on <span className="accent">front-end</span>.
          </h2>
          <h3>
            Outside of work you can find consuming excessive amount of music or
            testing new recipies in the kitchen.
          </h3>
          <h3 style={{ color: "var(--blue-600)" }}>
            Check out some of my favourite projects below. If you think we could
            work together{" "}
            <span className="accent">feel free to get in touch!</span>
          </h3>
          <div className="socials">
            <IconButton
              icon={GithubIcon}
              href="https://github.com/haric95"
              className="icon"
            />
            <IconButton
              icon={LinkedinIcon}
              href="https://www.linkedin.com/in/hari-chauhan-a07213122/"
              className="icon"
            />
            <IconButton
              icon={EmailIcon}
              href="mailto:someone@yoursite.com"
              className="icon"
            />
          </div>
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
