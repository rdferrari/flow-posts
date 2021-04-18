import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { updatePost } from "../graphql/mutations";
import { getPost } from "../graphql/queries";
import { useForm, Controller } from "react-hook-form";
import { lightGrey, darkGrey, action } from "../styles/colors";

import styled from "styled-components";
import Post from "../pages/Post";

const Section = styled.div<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

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
  margin-top: 50px;
  width: 300px;

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
  width: 260px;

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
  width: 260px;

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

const InputTile = styled.textarea`
  background-color: ${darkGrey};
  border: 0.5px solid #ebebeb;
  color: ${lightGrey};
  font-family: titleFont;
  font-size: 18px;
  width: 280px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
    width: 630px;
  }
`;

const InputTextArea = styled.textarea`
  background-color: ${darkGrey};
  border: 0.5px solid #ebebeb;
  color: ${lightGrey};
  font-family: textFontLight;
  font-size: 18px;
  width: 280px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
    width: 630px;
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

const Button = styled.p`
  color: ${action};
  cursor: pointer;
  font-family: textFontBold;
  font-size: 18px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`;

interface FormValues {
  owner?: string;
  relation?: string;
  title: string;
  text: string;
  media: string;
  mediaType?: string;
  externalLink?: string;
  createdAt?: string;
  isPublic?: boolean;
  pdfFile?: string;
  updatedAt?: string;
  latitude?: string;
  longitude?: string;
}

function EditPost({ setPosts, posts, postId }: any) {
  /* 1. Create local state with useState hook */
  const { control, handleSubmit, errors } = useForm();
  const [post, setPost] = useState<any>("");
  const [saving, setSaving] = useState(false);
  const [mediaName, setMediaName] = useState("");
  const [mediaInfo, setMediaInfo] = useState("");
  const [uploading, setUploading] = useState("");
  const [prevImage, setPreviewImage] = useState("");
  // const [editPost, setEditPost] = useState(false);

  useEffect(() => {
    fetchOnePost();
  }, []);

  function onChangeFile(e: any) {
    e.persist();
    if (!e.target.files[0]) return;
    const media = {
      fileInfo: e.target.files[0],
      name: `${uuid()}_${e.target.files[0].name}`,
    };
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setMediaName(media.name);
    setMediaInfo(media.fileInfo);
  }

  async function savePost(data: FormValues) {
    const { title, text } = data;
    setSaving(true);
    try {
      // with media to update
      if (mediaName && mediaInfo) {
        const postInfo = { id: post.id, title, text, media: mediaName };
        await Storage.put(mediaName, mediaInfo, {
          progressCallback(progress: any) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            setUploading(`Uploaded: ${progress.loaded}/${progress.total}`);
          },
        });
        const mediaUrl = await Storage.get(mediaName);

        const updatedPost: any = await API.graphql({
          query: updatePost,
          variables: { input: postInfo },
          // @ts-ignore
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        const postUpdated = updatedPost.data.updatePost;

        posts.filter((post: any) => {
          if (post.id === postId) {
            post.title = postUpdated.title;
            post.text = postUpdated.text;
            post.media = mediaUrl;
            return post;
          }
        });

        setPosts([...posts]);
        setSaving(false);
      }

      // no media to update
      const postInfo = { id: post.id, title, text };
      const updatedPost: any = await API.graphql({
        query: updatePost,
        variables: { input: postInfo },
        // @ts-ignore
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      const postUpdated = updatedPost.data.updatePost;

      posts.filter((post: any) => {
        if (post.id === postId) {
          post.title = postUpdated.title;
          post.text = postUpdated.text;
          return post;
        }
      });

      setPosts([...posts]);
      setSaving(false);
    } catch (err) {
      // error
      console.log(err);
      setSaving(false);
    }
  }

  async function fetchOnePost() {
    try {
      const postFiltered: any = await API.graphql({
        query: getPost,
        variables: { id: postId },
      });
      const postFetched = postFiltered.data.getPost;

      const mediaUrl = await Storage.get(postFetched.media);
      postFetched.media = mediaUrl;
      setPost(postFetched);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <>
      <Link to="/posts">
        <Button>
          <p>Back to posts list</p>
        </Button>
      </Link>
      <Section backgroundColor={darkGrey} color={lightGrey} key={post.id}>
        <ContentContainer>
          <TextContainer>
            <div>
              <p>Title</p>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <InputTile
                    rows={1}
                    onBlur={onBlur}
                    onChange={(value) => onChange(value)}
                    value={value}
                    placeholder="Title"
                  />
                )}
                name="title"
                rules={{ required: true }}
                defaultValue={post.title}
              />

              {errors.code && (
                <p className="error-message">Title is required</p>
              )}
            </div>

            <div>
              <p>Post</p>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <InputTextArea
                    rows={12}
                    onBlur={onBlur}
                    onChange={(value) => onChange(value)}
                    value={value}
                    placeholder="Paragraph"
                  />
                )}
                name="text"
                rules={{ required: true }}
                defaultValue={post.text}
              />
              {errors.code && (
                <p className="error-message">Paragraph is required</p>
              )}
            </div>
          </TextContainer>
          <div>
            <ContentImage alt={post.title} src={post.media} />
            <BoxLineVideo></BoxLineVideo>
            <input type="file" onChange={onChangeFile} />
            {/* {prevImage && <img alt="Uploaded" src={prevImage} />} */}
            {uploading && <p>{uploading}</p>}
          </div>
        </ContentContainer>
      </Section>
      <Button onClick={handleSubmit(savePost)}>
        <p>Save post</p>
      </Button>
    </>

    // <FormContainer>
    //   <h1>Edit Post</h1>
    //   {saving ? (
    //     <p>saving</p>
    //   ) : (
    //     post && (
    //       <>
    //         <Controller
    //           control={control}
    //           render={({ onChange, onBlur, value }) => (
    //             <input
    //               onBlur={onBlur}
    //               onChange={(value) => onChange(value)}
    //               value={value}
    //               placeholder="Title"
    //             />
    //           )}
    //           name="title"
    //           rules={{ required: true }}
    //           defaultValue={post.title}
    //         />
    //         {errors.code && <p className="error-message">Title is required</p>}

    //         <Controller
    //           control={control}
    //           render={({ onChange, onBlur, value }) => (
    //             <textarea
    //               rows={6}
    //               onBlur={onBlur}
    //               onChange={(value) => onChange(value)}
    //               value={value}
    //               placeholder="Paragraph"
    //             />
    //           )}
    //           name="text"
    //           rules={{ required: true }}
    //           defaultValue={post.text}
    //         />
    //         {errors.code && (
    //           <p className="error-message">Paragraph is required</p>
    //         )}

    //         <input type="file" onChange={onChangeFile} />
    //         {prevImage && <img alt="Uploaded" src={prevImage} />}

    //         <button onClick={handleSubmit(savePost)}>
    //           <p>Save post</p>
    //         </button>
    //         {/* <button onClick={() => setEditPost(!editPost)}>Close</button> */}
    //         {uploading && <p>{uploading}</p>}
    //       </>
    //     )
    //   )}
    // </FormContainer>
  );
}

export default EditPost;
