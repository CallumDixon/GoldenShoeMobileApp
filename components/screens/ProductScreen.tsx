import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ModelSortDirection } from "../../src/API";
import { API, graphqlOperation } from "aws-amplify";
import { listProducts, productByOrder } from "../../src/graphql/queries";

interface IProduct {
  id: string
  name: string
  parent: string
  price: string
  description: string
  image: string
  order: number
}

const ProductScreen = ({navigation,route} : any) => {

  const [getProduct,setProduct] = useState<IProduct | undefined>()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetchProduct(route.params.title)
  },[])

  const fetchProduct = async (name: string) => {

    let filter = {
      name: {
        eq: name
      }
    };

    let products
    products = await API.graphql({ query: listProducts, variables: { filter: filter}})
    // @ts-ignore
    setProduct(products.data.listProducts.items[0])
    setLoading(false)
    return products
  }

  return(
    <SafeAreaView>
      {loading ? <ActivityIndicator size='large' style={{alignSelf:"center"}}/>
        :
        <View>
          <Image source={{ uri: getProduct?.image }} style={styles.img}/>
          <Text style={styles.desc}>{getProduct?.description}</Text>
          <Text style={styles.price}>Price: {getProduct?.price}</Text>
          <Button title="Add to Basket" onPress={() => {console.log("Pressed");}}/>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  img:{
    width: 350,
    height: 300,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center"
  },
  desc:{
    padding: 20,
    alignSelf: "center"
  },
  price:{
    padding: 20,
    alignSelf: "center"
  }
})

export default ProductScreen
