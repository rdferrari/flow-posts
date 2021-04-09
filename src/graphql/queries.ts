/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      relation
      title
      text
      media
      mediaType
      externalLink
      createdAt
      isPublic
      pdfFile
      updatedAt
      latitude
      longitude
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        relation
        title
        text
        media
        mediaType
        externalLink
        createdAt
        isPublic
        pdfFile
        updatedAt
        latitude
        longitude
      }
      nextToken
    }
  }
`;
