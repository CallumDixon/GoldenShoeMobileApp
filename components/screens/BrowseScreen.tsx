import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { graphqlOperation} from "aws-amplify";
import { API } from 'aws-amplify';
import { categoryByOrder} from "../../src/graphql/queries";
import { ModelSortDirection } from "../../src/API";

export interface IBrowseItem {
  name: string
  parent: string
  order: number
  leaf_node: boolean
}

export interface IitemView {
  item: IBrowseItem
}

const BrowseScreen = ({navigation,route} :any) => {

  const [list,setList] = useState<IBrowseItem[]>([])
  const [loading,setLoading] = useState(true)

  // The Following are used to fetch the Categories
  useEffect(() => {

    fetchCategories()
      .then((data) => {})
      .catch((e) => {})
  },[])

  const fetchCategories = async () => {

    const categories = await API.graphql(graphqlOperation(categoryByOrder,{
      sortDirection: ModelSortDirection.ASC,
      parent: route.params.title
    }))

    // @ts-ignore
    setList(categories.data.categoryByOrder.items.map((item: { name: string; parent: string; order: any; leaf_node: boolean}) =>
      ({name:item.name,parent:item.parent,order:item.order, leaf_node: item.leaf_node})))

    setLoading(false)
    return categories
  }


  // When a Category is picked, load the next page
  const clickedItem = (name : string, leaf_node: boolean) => {
    if(leaf_node){
      navigation.push('Products',{title: name})
    }
    else {
      navigation.push('Categories', { title: name, leaf_node: leaf_node })
    }
  }

  // Defining our list of Categories
  const Item = ({ name, leaf_node } : IBrowseItem) => (
    <Pressable onPress={() => clickedItem(name, leaf_node)}>
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );

  const renderItem = ({ item } : IitemView) => (
    <Item name={item.name} parent={item.parent} order={item.order} leaf_node={item.leaf_node}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ?
        <ActivityIndicator size='large' style={{alignSelf:"center"}}/>
        :
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent:"center"
  },
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderWidth:1,
    borderRadius:5,
    borderColor:'grey'
  },
  name: {
    fontSize: 16,
  },
});

export default BrowseScreen;
