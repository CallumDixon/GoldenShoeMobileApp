import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchProduct } from "../../functions/api";
import ImageView from "../ImageView";
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../../src/graphql/subscriptions";

interface IProduct {
  id: string
  name: string
  parent: string
  price: string
  description: string
  image: string
  order: number
  stock: number
}



const ProductScreen = ({navigation,route} : any) => {

  const [getProduct,setProduct] = useState<IProduct | undefined>()
  const [loading,setLoading] = useState(true)
  const [stock,setStock] = useState<number>()

  useEffect(() => {
    fetchProduct(route.params.title)
      .then((data:IProduct) => {
        setProduct(data)
        setStock(data.stock)
        setLoading(false)
      })

    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateProduct)
      // @ts-ignore
    ).subscribe({
      // @ts-ignore
      next: ({ provider, value }) => setStock(value.data.onUpdateProduct.stock),
      // @ts-ignore
      error: error => console.warn(error)
    });
  },[])

  return(
    <SafeAreaView>
      {loading ? <ActivityIndicator size='large' style={{alignSelf:"center"}}/>
        :
        <ScrollView>
          <ImageView name={getProduct?.image}/>
          <Text style={styles.desc}>{getProduct?.description}</Text>
          <Text style={styles.product_text}>Price: {getProduct?.price}</Text>
          <Text style={styles.product_text}>Stock: {stock}</Text>

          {(stock && stock > 0) ?

            <Button title="Add to Basket" onPress={() => {
              console.log("Pressed");
            }} />
            :
            <Text style={styles.product_text}>
              Sorry this item is out of Stock.
            </Text>
          }

        </ScrollView>
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
    alignSelf: "center",
  },
  desc:{
    padding: 16,
    alignSelf: "center"
  },
  product_text:{
    padding: 10,
    alignSelf: "center"
  }
})

export default ProductScreen
