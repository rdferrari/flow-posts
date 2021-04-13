import React from "react";
import styled from "styled-components";
import { lightGrey, darkGrey, action } from "../styles/colors";

import { UserStatusContext } from "../App";

const VideoContainer = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const HeroVideo = styled.video`
  display: inherit;
  height: 95vh;
  object-fit: cover;
  width: 100%;
`;

const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 95vh;
  position: relative;
  width: 100%;
  z-index: 2;
`;

const TaglineContainer = styled.div`
  color: white;
  left: 20px;
  position: absolute;
  top: 40vh;
  z-index: 3;

  @media only screen and (min-width: 768px) {
    left: 60px;
  }

  @media only screen and (min-width: 1200px) {
    left: 100px;
  }
`;

const Tagline = styled.h1`
  color: ${lightGrey};
  font-size: 30px;

  @media only screen and (min-width: 768px) {
    font-size: 50px;
  }
`;

const SectionOne = styled.div`
  background-color: ${darkGrey};
  color: ${lightGrey};
  margin-top: -17px;
  padding: 80px 20px;

  @media only screen and (min-width: 768px) {
    @media only screen and (min-width: 768px) {
      left: 60px;
      margin-top: -35px;
    }
  
    @media only screen and (min-width: 1200px) {
      left: 100px;
  }
`;

const Subtitle = styled.h2`
  color: ${lightGrey};
  font-size: 25px;

  @media only screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const BodyText = styled.p`
  color: ${lightGrey};
  font-size: 18px;

  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const VIDEO =
  "https://flowceptionio8aa338f82a884000915b17c1e6ee133a194519-dev.s3-us-west-2.amazonaws.com/public/fire-hero.mp4";

function Home({ posts, setPosts }: any): JSX.Element {
  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <>
          <VideoContainer>
            <HeroVideo autoPlay loop muted playsInline>
              <source src={VIDEO} type="video/mp4" /> Your browser does not
              support HTML5 video.{" "}
            </HeroVideo>
          </VideoContainer>
          <Mask></Mask>
          <TaglineContainer>
            <Tagline>
              Impermanent,
              <br /> substanceless
              <br /> unsatisfactory
            </Tagline>
            <p>Explore</p>
          </TaglineContainer>
          <SectionOne>
            <div>
              <Subtitle>flow + perception = flowception</Subtitle>
              <BodyText>
                This mind-body is arising and passing way, burning like fire.
                Pleasant or painful, both are unsatisfactory. The former because
                of its inevitable end; the last do not need an explanation. If
                it is changing, it is never the same, it is a flow of
                perceptions, which is the experience of Flowception -
                impermanent, substanceless and unsatisfactory.
              </BodyText>
            </div>
          </SectionOne>
        </>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Home;
