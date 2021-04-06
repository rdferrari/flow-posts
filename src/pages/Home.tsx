import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tagline from "../components/TagLine";

import { UserStatusContext } from "../App";

const HomeContainer = styled.div`
  margin-top: 100px;

  @media only screen and (min-width: 1024px) {
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;

  @media only screen and (min-width: 1024px) {
    text-align: left;
  }
`;

function Home(): JSX.Element {
  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <HomeContainer>
          <Tagline />

          {user !== "no user authenticated" ? (
            <p>Hello {user}</p>
          ) : (
            <ButtonContainer>
              <Link to="/auth">
                <button>
                  <p>Sign in</p>
                </button>
              </Link>
            </ButtonContainer>
          )}
        </HomeContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Home;
