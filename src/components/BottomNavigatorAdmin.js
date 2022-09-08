import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../constant/colors';
import Home from '../feature/home/Home';
import Admin from '../feature/admin/Admin';
import InfoAdmin from '../feature/admin/InfoAdmin';
import ManageBooking from '../feature/admin/ManageBooking';
import Support from '../feature/support/Support';
import Favourite from '../feature/favourite/Favourite';

const Tab = createBottomTabNavigator();

const BottomNavigatorAdmin = ({ route }) => {
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
          name='Quản lý User'
          component={Admin}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='user-cog' color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen 
          name='Quản lý Chuyến đi'
          component={ManageBooking}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="tripadvisor" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name={name}
          component={infoUser ? InfoAdmin : Home}
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

export default BottomNavigatorAdmin;
