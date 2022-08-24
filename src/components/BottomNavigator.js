import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../constant/colors';
import Home from '../feature/home/Home';
import InfoCustomer from '../feature/account/InfoUser';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser?.avatar?.path;
  const name = infoUser ? (infoUser.lastName + ' ' + infoUser.firstName) : 'Tài khoản';

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 55,
            borderTopWidth: 0,
            elevation: 0,
          },
          // showLabel: false,
          activeTintColor: COLORS.CHOOSED_COLOR
        }}
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen 
          name='Trang chủ'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='home' color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen 
          name='Yêu thích'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='heart' color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name='Hỗ trợ'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='question-circle' color={color} size={25} />
            )
          }}
        />
        <Tab.Screen 
          name={name}
          component={infoUser ? InfoCustomer : Home}
          options={{
            tabBarIcon: props => {
              return (
                <>
                  {
                    infoUser ? (
                      avatar ? 
                      (<Image source={{ uri: avatar }} style={ styles.iconUser }/>) : 
                      (<Image source={require('../resources/images/user-300x300.png')} style={ styles.iconUser } />)
                    ) : (
                      <FontAwesome5 name='user-circle' color={props.color} size={25} />
                    )
                  }
                </>
              )
            }
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

  iconUser: {
    height: 25, 
    width: 25, 
    borderRadius: 25,
  },
});

export default BottomNavigator;
