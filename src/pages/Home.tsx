import React from "react";
import styled from "styled-components";

import { UserStatusContext } from "../App";

const HeaderContainer = styled.div`
  position: relative;
`;

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
  top: 50vh;
  z-index: 3;

  @media only screen and (min-width: 768px) {
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
            <p>
              Impermanent,
              <br /> unsatisfactory
              <br /> and substanceless
            </p>
            <p>Explore</p>
          </TaglineContainer>
          <h1>Home</h1>
        </>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Home;
