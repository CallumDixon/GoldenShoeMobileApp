import {API, graphqlOperation} from "aws-amplify";
import { Storage } from "@aws-amplify/storage"
import {categoryByOrder, listProducts, productByOrder} from "../src/graphql/queries";
import {ModelSortDirection} from "../src/API";

export const fetchProducts = async () => {


  let products = await API.graphql(graphqlOperation(listProducts))
  // @ts-ignore
  return products.data.listProducts.items
}

export const fetchProduct = async (name: string) => {

  let filter = {
    name: {
      eq: name
    }
  };

  let products
  products = await API.graphql({ query: listProducts, variables: { filter: filter}})
  // @ts-ignore
  return products.data.listProducts.items[0]
}

export const fetchProductsWithFilter = async (parent: string) => {

  let variables = {
    sortDirection: ModelSortDirection.ASC,
    parent: parent
  }

  let products
  let data
  if(parent == "All"){
    products = await API.graphql(graphqlOperation(listProducts))
    // @ts-ignore
    data = products.data.listProducts
  }
  else {
    products = await API.graphql(graphqlOperation(productByOrder, variables))
    // @ts-ignore
    data = products.data.productByOrder
  }
  return data.items
}

export const fetchCategories = async (parent: string) => {

  const categories = await API.graphql(graphqlOperation(categoryByOrder,{
    sortDirection: ModelSortDirection.ASC,
    parent: parent
  }))

  // @ts-ignore
  return(categories.data.categoryByOrder.items.map((item: { name: string; parent: string; order: any; leaf_node: boolean}) =>
    ({name:item.name,parent:item.parent,order:item.order, leaf_node: item.leaf_node})))
}

export const fetchImage = async (name: string | undefined) => {

  return await Storage.get(<string>name, {
    level: "public"
  })
}
