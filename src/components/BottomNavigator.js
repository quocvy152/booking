import React, { useEffect } from 'react';
import { StyleSheet, Icon } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS } from '../constant/colors';

import Home from '../feature/home/Home';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 55,
            borderTopWidth: 0,
            elevation: 0,
          },
          showLabel: false,
          activeTintColor: COLORS.CHOOSED_COLOR
        }}
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen 
          name='HomeScreen'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='home' color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name='FavouriteCarScreen'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='heart' color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name='AccountScreen'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='user-circle' color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name='SupportScreen'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='question-circle' color={color} size={25} />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },
});

export default BottomNavigator;
