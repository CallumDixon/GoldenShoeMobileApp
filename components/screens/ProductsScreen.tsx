import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image, ImageSourcePropType, Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { colors } from "../../config/colors";
import { categoryByOrder, listProducts, productByOrder } from "../../src/graphql/queries";
import { ModelSortDirection } from "../../src/API";
import { IBrowseItem } from "./BrowseScreen";

interface IProductsItem{
  image: string | undefined
  name: string
  price: string
}

interface IProductsItemView{
  item: IProductsItem
}

const ProductsScreen = ({navigation,route} :any) => {

  const [list,setList] = useState<IProductsItem[]>([])
  const [loading,setLoading] = useState(true)

  // The Following are used to fetch the Categories
  useEffect(() => {
    fetchProducts(route.params.title)
      .then((data) => {})
      .catch((e) => {})
  },[])

  const fetchProducts = async (parent: string) => {

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
    // @ts-ignore
    setList(data.items.map((item: {
      name: string
      price: string
      image: string
      }) =>
      ({
        name: item.name,
        price: item.price,
        image: item.image,
      })))
    setLoading(false)
    return products
  }

  const clickedItem = (name : string) => {
      navigation.push('Product', { title: name })
  }

  const ProductsScreenView = ({image,name,price} : IProductsItem) => {

    const imageURI: ImageSourcePropType = {uri: image}
    return(
    <Pressable onPress={() => {clickedItem(name)}}>
      <View style={styles.productView}>
        <View style={styles.productImageView}>
          <Image source={imageURI} style={{ width: 100, height: 100, borderRadius: 20, borderWidth: 1 }} />
        </View>
        <View style={styles.productTextView}>
          <Text style={{ fontSize: 20 }}>
            {name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {price}
          </Text>
        </View>
      </View>
    </Pressable>
    )
  }

  const renderItem = ({item} : IProductsItemView) => {
    return(
      <ProductsScreenView image={item.image} name={item.name} price={item.price} />
    )
  }

  return(
    <SafeAreaView style = {styles.container}>
      {loading ? <ActivityIndicator size='large' style={{ alignSelf: "center" }} />
        :
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  productView: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.Golden_Shoe_Red
  },
  productImageView: {
    flex: 1,
    alignSelf: "flex-start",
    height: 100,
  },
  productTextView: {
    flex: 1.5,
    flexDirection: "column",
    alignSelf: "center",
    height: 100,
    justifyContent: "space-evenly",
    padding: 10,
    borderWidth:1,
    borderRadius:20,
    borderStyle: "dashed",
  }
})

export default ProductsScreen
