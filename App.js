import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, 
        createSwitchNavigator} from 'react-navigation';

import SignupLoginScreen from './Screens/SignupLoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ExchangeScreen from './Screens/ExchangeScreen';

/*export default function App() {
  return (
    <View style={styles.container}>
     <AppContainer />
    </View>
  );
}
const TabNavigator = createBottomTabNavigator({
  HomeScreen : {screen : HomeScreen, navigationOptions:{tabBarLabel:"Home Screen",}},
  ExchangeScreen : {screen : ExchangeScreen, navigationOptions:{tabBarLabel:"Exchange Screen"}},
  
})
const SwitchNavigator = createSwitchNavigator({
WelcomeScreen : {screen : SignupLoginScreen},
BottomTab : {screen : TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

export default function App() {
  return (
    <View style={{flex : 1}}>
    <AppContainer />
    </View>
  );
}

const TabNavigator = createBottomTabNavigator({
  HomeScreen : {screen: HomeScreen  },
  ExchangeScreen: { screen: ExchangeScreen},
  });

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  BottomTab:{screen: TabNavigator},
})

const AppContainer =  createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  viewStyle : {
  backgroundColor:'#7912ff', 
  flex:1, 
  justifyContent:'center', 
  alignItems:'center'
  }
})