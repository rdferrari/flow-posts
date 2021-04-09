import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { createPost } from "../graphql/mutations";
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

export default function CreatePost({ setPosts, posts }: any) {
  /* 1. Create local state with useState hook */
  const { control, handleSubmit, errors, reset } = useForm();
  const [mediaName, setMediaName] = useState("");
  const [mediaInfo, setMediaInfo] = useState("");
  // const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [prevImage, setPreviewImage] = useState("");

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
      const postInfo = { title, text, media: mediaName };
      await Storage.put(mediaName, mediaInfo, {
        progressCallback(progress: any) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          setUploading(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      });
      await API.graphql({
        query: createPost,
        variables: { input: postInfo },
        // @ts-ignore
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(mediaInfo);
      setPosts([...posts, { ...postInfo, media: prevImage }]);
      // setPosts([...posts, postInfo]);
      reset({
        title: "",
        text: "",
      });
    } catch (err) {
      // error
    }
  }

  return (
    <FormContainer>
      <h1>Create Post</h1>
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
        defaultValue=""
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
        defaultValue=""
      />
      {errors.code && <p className="error-message">Paragraph is required</p>}

      <input type="file" onChange={onChangeFile} />
      {prevImage && <img src={prevImage} />}

      <button onClick={handleSubmit(savePost)}>
        <p>Save post</p>
      </button>
      {uploading && <p>{uploading}</p>}
    </FormContainer>
  );
}
