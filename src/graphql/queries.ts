/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      relation
      title
      text
      media
      mediaType
      externalLink
      createdAt
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
        relation
        title
        text
        media
        mediaType
        externalLink
        createdAt
        pdfFile
        updatedAt
        latitude
        longitude
      }
      nextToken
    }
  }
`;