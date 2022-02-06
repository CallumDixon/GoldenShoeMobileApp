import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/screens/HomeScreen";
import BrowseScreenNavigator from "./components/screens/BrowseNavigatorScreen";
import MyAccountScreen from "./components/screens/MyAccountScreen";
import BasketScreen from "./components/screens/BasketScreen";
import CustomerServiceScreen from "./components/screens/CustomerServiceScreen";
import BrowseScreen from "./components/screens/BrowseScreen";
import { colors } from "./config/colors";
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator

        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.Golden_Shoe_Red,
          },
          tabBarInactiveTintColor: '#4d4d4d',
          tabBarActiveTintColor: colors.Golden_Shoe_Red,
          tabBarStyle:{

          },
          tabBarLabelStyle: {
            width: 400
          },
        }}
      >

      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options = {{
          tabBarIcon: ({color}) => (
            <Icon name="home" size={30} color={color}/>
          ),
          headerTitle:() => {
            return(
              <View style={[{flexDirection:"row"}]}>
                <Text style={[{fontSize:18}]}>Golden Shoe</Text>
              </View>
            )
          }
        }}/>

      <Tab.Screen
        name="Browse"
        component={BrowseScreenNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="book" size={30} color={color}/>
          )
        }}/>

      <Tab.Screen
        name="My Account"
        component={MyAccountScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" size={30} color={color}/>
          )
        }}/>

      <Tab.Screen
        name="Customer Service"
        component={CustomerServiceScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="comments" size={30} color={color}/>
          )
        }}/>

      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shopping-basket" size={30} color={color}/>
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
