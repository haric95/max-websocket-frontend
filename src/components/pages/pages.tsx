import ClevryImage from "assets/clevry.webp";
import FutropolisImage from "assets/futropolis.webp";
import GoogleTrustServicesImage from "assets/google-trust-services.webp";
import LukeImage from "assets/luke-griffiths.webp";
import { Block } from "components/block/block";
import { Content } from "components/content/content";
import { IconButton } from "components/icons/icon-button";
import { EmailIcon, GithubIcon, LinkedinIcon } from "components/icons/icons";
import React from "react";

const colors = ["#B5D3DD", "#D9A59E", "#E3E37E", "#B5DFB6"];

export const Pages: React.FC = () => {
  return (
    <>
      <Block factor={1} offset={0}>
        <Content side="left" className="portfolio-block" color={colors[0]}>
          <h1>Hi - I'm Hari </h1>
          <h2 style={{ color: "var(--blue-600)" }}>
            A London-based <span className="accent">software engineer</span>{" "}
            with a focus on <span className="accent">front-end</span>
          </h2>
          <h3>
            Outside of work you can find me consuming excessive amounts of music
            or testing new recipes in the kitchen
          </h3>
          <h3 style={{ color: "var(--blue-600)" }}>
            Check out some of my favourite projects below. If you think we could
            work together{" "}
            <span className="accent">feel free to get in touch</span>
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
              href="mailto:hari-c@hotmail.co.uk"
              className="icon"
            />
          </div>
        </Content>
      </Block>
      <Block factor={-1} offset={1}>
        <Content side="right" className="portfolio-block" color={colors[1]}>
          <h1>Honeywell's Futropolis</h1>
          <h2 style={{ color: "var(--blue-600)" }}>
            A <span className="accent">modern 3D web experience</span> I built
            whilst at{" "}
            <a
              href="https://phantom.land"
              target="_blank"
              rel="noreferrer"
              className="inline-link"
            >
              Phantom
            </a>{" "}
            using <span className="accent">react-three-fiber</span> and{" "}
            <span className="accent">Next.js</span>
          </h2>
          <a
            className="image-container unstyled-button site-link"
            href="https://futropolis.ft.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={FutropolisImage} alt="Futropolis" />
          </a>
        </Content>
      </Block>
      <Block factor={1} offset={2}>
        <Content side="left" color={colors[2]} className="portfolio-block">
          <h1>Lexii</h1>
          <h2 style={{ color: "var(--blue-600)" }}>
            A <span className="accent">language learning platform</span> aimed
            at supporting refugee community integration. Ideated at the{" "}
            <span className="accent">
              <a
                className="inline-link"
                href="https://deendevelopers.com/"
                target="_blank"
                rel="noreferrer"
              >
                Deen Developers
              </a>{" "}
              x{" "}
              <a
                className="inline-link"
                href="https://www.crisis.org.uk/get-involved/venture-studio/"
                target="_blank"
                rel="noreferrer"
              >
                Crisis Venture Studios
              </a>{" "}
            </span>
            hackathon
          </h2>
          <h2>
            Our site is still a work in progress, but you can check out our
            pitch{" "}
            <a
              className="inline-link"
              href="https://youtu.be/sfegAzGsFgg?t=3835"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </h2>
        </Content>
      </Block>
      <Block factor={-1} offset={3}>
        <Content side="right" color={colors[3]} className="portfolio-block">
          <h1>Others</h1>
          <div className="others">
            <div className="other">
              <a
                className="image-container unstyled-button site-link other-site-link"
                href="https://joy.clevry.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={ClevryImage} alt="Clevry" />
              </a>
              <p style={{ color: "var(--blue-600)" }}>
                A <span className="accent">psychometrics testing platform</span>{" "}
                I worked on whilst at{" "}
                <a
                  href="https://avamae.co.uk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link"
                >
                  AVAMAE
                </a>
              </p>
            </div>
            <div className="other">
              <a
                className="image-container unstyled-button site-link other-site-link"
                href="https://lukegriffiths.co.uk"
                target="_blank"
                rel="noreferrer"
              >
                <img src={LukeImage} alt="Luke Griffiths" />
              </a>
              <p style={{ color: "var(--blue-600)" }}>
                A <span className="accent">portfolio site</span> for
                London-based Graphic Designer{" "}
                <span className="accent">Luke Griffiths</span>
              </p>
            </div>
            <div className="other">
              <a
                className="image-container unstyled-button site-link other-site-link"
                href="https://pki.goog"
                target="_blank"
                rel="noreferrer"
              >
                <img src={GoogleTrustServicesImage} alt="Clevry" />
              </a>
              <p style={{ color: "var(--blue-600)" }}>
                <span className="accent">Google's PKI site</span>. Built at
                Phantom and for which I was the sole developer
              </p>
            </div>
          </div>
        </Content>
      </Block>
    </>
  );
};
