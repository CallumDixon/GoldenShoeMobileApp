/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from './src/aws-exports'
import * as subscriptions from "./src/graphql/subscriptions";
Amplify.configure(awsconfig)

AppRegistry.registerComponent(appName, () => App);

const subscription = API.graphql(graphqlOperation(subscriptions.onUpdateProduct))
  .subscribe({
    next: ({ provider, value }) => console.log("render"),
    error: error => console.warn(error)
  })
