/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      parent
      order
      leaf_node
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        parent
        order
        leaf_node
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const categoryByOrder = /* GraphQL */ `
  query CategoryByOrder(
    $parent: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoryByOrder(
      parent: $parent
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        parent
        order
        leaf_node
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
