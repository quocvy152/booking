import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');
const contentWidth = width - 30;
import { getListBookingAdmin } from '../../api/general';

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import TabViewComp from '../../components/TabView';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';

const ManageBooking = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser?.avatar?.path;

  const [listBookingActive, setListBookingActive] = useState([]); 
  const [listBookingPayed, setListBookingPayed] = useState([]); 

  useEffect(async () => {
    const BOOKING_ACTIVE = 1;
    const BOOKING_PAYED = 5;

    let [resultListBookingActiveAdmin, resultListBookingPayedAdmin] = await Promise.all([ getListBookingAdmin(BOOKING_ACTIVE), getListBookingAdmin(BOOKING_PAYED) ]);
    let { error: errorBookingActive, data: dataBookingActive, message: messageBookingActive } = resultListBookingActiveAdmin.data;
    let { error: errorBookingPayed, data: dataBookingPayed, message: messageBookingPayed } = resultListBookingPayedAdmin.data;
  
    if(!errorBookingActive) setListBookingActive(dataBookingActive);
    if(!errorBookingPayed) setListBookingPayed(dataBookingPayed);

  }, []);

  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BACKGROUND_ADMIN, height: 140, marginTop: -75 }}>
        <Text style={ styles.titleScreen }>Quản lý Chuyến đi</Text>
      </View>
      <TabViewComp listBookingActive={listBookingActive} listBookingPayed={listBookingPayed} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  titleScreen: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 85 
  },
});

export default ManageBooking;
