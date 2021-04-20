import React from 'react';
import { Image, StyleSheet} from 'react-native';
import { Home } from './src/screens/Home';
import OpeningScreen  from './src/screens/OpeningScreen';


import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import  Note from './src/screens/Notes';



const switchNavigator = createSwitchNavigator({

    landingStack: {
      screen: createStackNavigator({
        Landing: OpeningScreen,
        // search address screen
      },{
        defaultNavigationOptions: {
          headerShown: false,
        }
      }),

    },
    

    homeStack:  createBottomTabNavigator({

      // Home tab Icon
      TODO: {
        screen: createStackNavigator({
          TODO: Home
        }),
      },

       // Home tab Icon
       Notes: {
        screen: createStackNavigator({
          Notes: Note,
        })
      },
     })

});


const AppNavigation = createAppContainer(switchNavigator);
 

export default function App() {
  return (
     <AppNavigation />
  );
}

const styles = StyleSheet.create({
   tabIcon: {
     width: 30,
     height: 30
   }
});