import { API, Storage } from "aws-amplify";
import { deletePost } from "../graphql/mutations";

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

  //   async function removeMedia(madiaKey: any) {
  //     try {
  //       // method

  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   }

  return (
    <div>
      {!posts ? (
        <p>loading...</p>
      ) : (
        posts.map((post: any) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <img alt={post.title} src={post.media} />
            <button onClick={() => removePost(post.id, post.media)}>
              delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
