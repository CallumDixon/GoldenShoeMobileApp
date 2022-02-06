import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import * as mutations from "../../src/graphql/mutations";
import Amplify, { API, Storage } from "aws-amplify";
import awsconfig from "../../src/aws-exports";

Amplify.configure(awsconfig)
const categories = [{name :'All'}, {name :'Men\'s sports'}, {name : 'Men\'s Evening Wear'}, {name : 'Men\'s Casual'},
  {name :'Men\'s Slippers'}, {name :'Men\'s Sandles'}, {name :'Women\'s Sandles'},
  {name :'Women\'s Evening Wear'}, {name :'Women\'s Casual'}, {name :'Women\' Slippers'},
  {name :'Women\'s High heels'}, {name :'Women\'s Pumps'}
]

const post = async (parentArray:any,parentName: string) => {
  for (let i = 0; i < parentArray.length; i++) {
    await API.graphql({query: mutations.createCategory, variables: {input: {
          "name": parentArray[i].name,
          "parent": parentName,
          "order": i+1,
          "leaf_node": true
        }}})
  }
}

export const HomeScreen = () => {

  return(
    <SafeAreaView>
      <Text>Home</Text>

      <Button title={"Base Categories"} onPress={() => {
        post(categories,"Categories")
      }}>Base Categories</Button>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  img: {
    width: 200,
    height: 200
  }
})

export default HomeScreen
