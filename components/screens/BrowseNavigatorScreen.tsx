import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BrowseScreen from "./BrowseScreen";
import ProductsScreen from "./ProductsScreen";
import ProductScreen from "./ProductScreen";

const Stack = createStackNavigator();

const BrowseScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
          name="Categories"
          component={BrowseScreen}
          initialParams={{title:"Categories",leaf_node:false}}
          options = {({navigation,route}:any) => ({
            title: route.params.title
          })}
      />

      <Stack.Screen
        name={"Products"}
        component = {ProductsScreen}
        options = {({route}:any) => ({
          title: route.params.title
        })}
      />

      <Stack.Screen
        name={"Product"}
        component={ProductScreen}
        options = {({route}:any) => ({
          title:route.params.title
        })}
      />

    </Stack.Navigator>
  );
}
export default BrowseScreenNavigator;
