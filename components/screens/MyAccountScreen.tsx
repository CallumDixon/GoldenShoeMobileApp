import * as React from 'react'
import {View, StyleSheet, Text} from 'react-native'

export const MyAccountScreen = () => {


  return (
    <View style={styles.screen}>
      <Text>Account Screen</Text>
    </View>
  )
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
})

export default MyAccountScreen;
