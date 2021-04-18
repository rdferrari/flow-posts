import { API, Storage } from "aws-amplify";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../graphql/mutations";
import { lightGrey, darkGrey, action } from "../styles/colors";

const Section = styled.div<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -17px;
  padding: 80px 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    width: 630px;
  }

  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 0 80px;
    width: 1100px;
  }
`;

const TextContainer = styled.div`
  @media only screen and (min-width: 768px) {
    width: 630px;
  }
  @media only screen and (min-width: 1200px) {
    margin-right: 50px;
  }
`;

const ContentImage = styled.img`
  display: inherit;
  height: 320px;
  margin-top: 50px;
  object-fit: cover;
  position: absolute;
  width: 85%;

  @media only screen and (min-width: 768px) {
    height: 400px;
    width: 630px;
  }

  @media only screen and (min-width: 1200px) {
    width: 500px;
  }
`;

const BoxLineVideo = styled.video`
  border: 1px solid ${lightGrey};
  height: 318px;
  margin: 70px 0 0 20px;
  position: relative;
  width: 95%;

  @media only screen and (min-width: 768px) {
    height: 400px;
    width: 630px;
  }

  @media only screen and (min-width: 1200px) {
    width: 500px;
  }
`;

const Subtitle = styled.h2`
  font-size: 25px;

  @media only screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const BodyText = styled.p`
  font-size: 18px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`;

const BtContainer = styled.div`
  display: flex;
`;

const Bt = styled.p`
  cursor: pointer;
  font-family: textFontRegular;
  font-size: 18px;
  margin-right: 20px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`;

const List = ({ posts, setPosts }: any) => {
  async function removePost(postId: any, mediaKey: any) {
    try {
      // method
      const postToRemove = {
        id: postId,
      };
      await API.graphql({
        query: deletePost,
        variables: { input: postToRemove },
        // @ts-ignore
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      mediaKey = mediaKey.substring(98, mediaKey.indexOf("?"));
      await Storage.remove(mediaKey);

      const updatedPostsState = posts.filter((post: any) => post.id !== postId);
      setPosts(updatedPostsState);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div>
      {!posts ? (
        <p>loading...</p>
      ) : (
        posts.map((post: any) => (
          <Section backgroundColor={darkGrey} color={lightGrey} key={post.id}>
            <ContentContainer>
              <TextContainer>
                <Subtitle>{post.title}</Subtitle>

                <BodyText>{post.text}</BodyText>
                <BtContainer>
                  <Link to={`/post/${post.id}`}>
                    <Bt>| Edit |</Bt>
                  </Link>
                  <Bt onClick={() => removePost(post.id, post.media)}>
                    | delete |
                  </Bt>
                </BtContainer>
              </TextContainer>
              <div>
                <ContentImage alt={post.title} src={post.media} />
                <BoxLineVideo></BoxLineVideo>
              </div>
            </ContentContainer>
          </Section>
        ))
      )}
    </div>
  );
};

export default List;
