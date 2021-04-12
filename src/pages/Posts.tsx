import React from "react";
// import styled from "styled-components";
import List from "../components/List";
import CreatePost from "../components/CreatePost";

import { UserStatusContext } from "../App";

// const HomeContainer = styled.div`
//   margin-top: 100px;

//   @media only screen and (min-width: 1024px) {
//     margin: 0;
//     position: absolute;
//     top: 40%;
//     left: 50%;
//     transform: translate(-50%, -40%);
//   }
// `;

function Home({ posts, setPosts }: any): JSX.Element {
  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <>
          {user !== "no user authenticated" && (
            <CreatePost posts={posts} setPosts={setPosts} />
          )}
          <List posts={posts} setPosts={setPosts} />
        </>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Home;
