import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { lightGrey, darkGrey, action } from "../styles/colors";

import { UserStatusContext } from "../App";
import EditPost from "../components/EditPost";

const PostContainer = styled.div`
  background-color: ${darkGrey};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Post({ posts, setPosts }: any): JSX.Element {
  let { id }: any = useParams();

  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <PostContainer>
          {user !== "no user authenticated" && (
            <EditPost posts={posts} setPosts={setPosts} postId={id} />
          )}
        </PostContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Post;
