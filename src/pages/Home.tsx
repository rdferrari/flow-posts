import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tagline from "../components/TagLine";
import List from "../components/List";
import CreatePost from "../components/CreatePost";

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

function Home({ posts, setPosts, deletePost }: any): JSX.Element {
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

          <CreatePost posts={posts} setPosts={setPosts} />
          <List posts={posts} setPosts={setPosts} />
        </HomeContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Home;
