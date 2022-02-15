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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      parent
      price
      description
      image
      stock
      order
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        parent
        price
        description
        image
        stock
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCSQuery = /* GraphQL */ `
  query GetCSQuery($id: ID!) {
    getCSQuery(id: $id) {
      id
      name
      parent
      description
      leaf_node
      order
      createdAt
      updatedAt
    }
  }
`;
export const listCSQuerys = /* GraphQL */ `
  query ListCSQuerys(
    $filter: ModelCSQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCSQuerys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        parent
        description
        leaf_node
        order
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
export const productByOrder = /* GraphQL */ `
  query ProductByOrder(
    $parent: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByOrder(
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
        price
        description
        image
        stock
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const cSQueryByOrder = /* GraphQL */ `
  query CSQueryByOrder(
    $parent: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCSQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CSQueryByOrder(
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
        description
        leaf_node
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
