import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image, Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../config/colors";
import { fetchProductsWithFilter, fetchImage } from "../../functions/api";

interface IProductsItem{
  image: string
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
    fetchProductsWithFilter(route.params.title)
      .then((data) => {
        setList(data)
        setLoading(false)
      })
      .catch((e) => {})
  },[])


  const clickedItem = (name : string) => {
      navigation.push('Product', { title: name })
  }

  const ProductsScreenView = ({image,name,price} : IProductsItem) => {

    const [file,setFile] = useState<string>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

      fetchImage(image)
        // @ts-ignore
        .then((img:string) => {
          setFile(img)
          setLoading(false)
        })
    },[])

    return(
    <Pressable onPress={() => {clickedItem(name)}}>
      <View style={styles.productView}>
        <View style={styles.productImageView}>
          <Image source={{ uri: file}} style={{ width: 100, height: 100, borderRadius: 20, borderWidth: 1 }} />
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
