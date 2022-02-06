import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Storage } from "aws-amplify";
import { colors } from "../../config/colors";

const ProductsScreen = ({navigation,route} :any) => {

  const [getImage,setImage] = useState<string | undefined>(undefined)

  const fetchImage = async () : Promise<string> => {
    return await Storage.get(
      'shoe1.jpeg', {
        level: 'public'
      }
    )
  }

  useEffect(() => {
    fetchImage()
      .then((img: string) => {
        setImage(img)
      })
      .catch()
  },[])


  return(
    <SafeAreaView style = {styles.container}>

      <View style = {styles.productView}>
        <View style={styles.productImageView}>
        {getImage
          ?
          <Image source={{ uri: getImage }} style={{width:100,height:100,borderRadius:20,borderWidth:1}} />
          :
          <ActivityIndicator size='large' style={{alignSelf:"center"}}/>
        }
        </View>
        <View style={styles.productTextView}>
          <Text style={{fontSize:20}}>
            Name
          </Text>
          <Text style = {{fontSize:16}}>
            Price
          </Text>
        </View>
      </View>

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
