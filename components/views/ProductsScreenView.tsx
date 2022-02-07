import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageURISource,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../config/colors";

export interface IProductsScreenView{
  image: string | undefined
  name: string
  price: string
}


const ProductsScreenView = ({image ,name ,price } : IProductsScreenView) => {

  const imageURI: ImageSourcePropType = {uri: image}

  return(
    <Pressable>
      <View style = {styles.productView}>
        <View style={styles.productImageView}>
          <Image source={imageURI} style={{width:100,height:100,borderRadius:20,borderWidth:1}} />
        </View>
        <View style={styles.productTextView}>
          <Text style={{fontSize:20}}>
            {name}
          </Text>
          <Text style = {{fontSize:16}}>
            {price}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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

export default ProductsScreenView
