import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { updatePost } from "../graphql/mutations";
import { getPost } from "../graphql/queries";
import { useForm, Controller } from "react-hook-form";

import styled from "styled-components";

const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    margin-top: 40px;
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
  const [mediaName, setMediaName] = useState("");
  const [mediaInfo, setMediaInfo] = useState("");
  // const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [prevImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchPost();
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
    try {
      const postInfo = { id: post.id, title, text };
      const updatedPost: any = await API.graphql({
        query: updatePost,
        variables: { input: postInfo },
        // @ts-ignore
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      const postUpdated = updatedPost.data.updatePost;

      const updatedFilteredPost = posts.filter((post: any) => {
        if (post.id === postId) {
          post.title = postUpdated.title;
          post.text = postUpdated.text;
          return post;
        }
      });

      console.log(updatedFilteredPost);

      setPosts([...posts]);

      // const postInfo = { id: post.id, title, text, media: mediaName };
      // await Storage.put(mediaName, mediaInfo, {
      //   progressCallback(progress: any) {
      //     console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      //     setUploading(`Uploaded: ${progress.loaded}/${progress.total}`);
      //   },
      // });
      // const mediaUrl = await Storage.get(mediaName);

      // console.log(mediaInfo);
      // console.log(mediaUrl);
      // setPosts([...posts, { ...postInfo, media: mediaUrl }]);
      // setPosts([...postsArray, { ...postUpdated }]);
    } catch (err) {
      // error
      console.log(err);
    }
  }

  async function fetchPost() {
    try {
      const postFiltered: any = await API.graphql({
        query: getPost,
        variables: { id: postId },
      });
      setPost(postFiltered.data.getPost);
    } catch (err) {
      console.log({ err });
    }
  }

  // let post = posts.filter((post: any) => post.id === postId);
  // console.log(post);

  return (
    <FormContainer>
      <h1>
        Edit Post {postId} - {post.title}
      </h1>
      {post && (
        <>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <input
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
          {errors.code && <p className="error-message">Title is required</p>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <textarea
                rows={6}
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

          {/* <input type="file" onChange={onChangeFile} />
          {prevImage && <img src={prevImage} />} */}

          <button onClick={handleSubmit(savePost)}>
            <p>Save post</p>
          </button>
          {uploading && <p>{uploading}</p>}
        </>
      )}
    </FormContainer>
  );
}

export default EditPost;
