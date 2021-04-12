import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { UserStatusContext } from "../App";
import EditPost from "../components/EditPost";

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

// const ButtonContainer = styled.div`
//   margin-top: 30px;
//   text-align: center;

//   @media only screen and (min-width: 1024px) {
//     text-align: left;
//   }
// `;

function Post({ posts, setPosts }: any): JSX.Element {
  let { id }: any = useParams();

  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <HomeContainer>
          <h1>Post</h1>
          {user !== "no user authenticated" && (
            <EditPost posts={posts} setPosts={setPosts} postId={id} />
          )}
        </HomeContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Post;
