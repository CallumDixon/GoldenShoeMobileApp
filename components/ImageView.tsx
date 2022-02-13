import React, { useEffect, useState } from "react";
import { fetchImage } from "../functions/api";
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

const ImageView = (props: { name: string | undefined; }) => {

  const [file,setFile] = useState<string>()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetchImage(props?.name)
      .then((img) => {
        console.log(img)
        setFile(img)
        setLoading(false)
      })
  },[])

  return (
    <View>
    { loading ?
        <ActivityIndicator size='large' style={{alignSelf:"center"}}/>
        :
        <Image source={{uri:file}} style={styles.img}/>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    width: 350,
    height: 300,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center"
  }
})

export default ImageView
