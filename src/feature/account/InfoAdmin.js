import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');
const contentWidth = width - 30;
import { getListMyCar } from '../../api/general';

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';

const InfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser?.avatar?.path;
  const [totalMyCar, setTotalMyCar] = useState();

  const handleLogoutBtn = async () => {
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
  }

  const alert = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng không ?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleLogoutBtn }
      ]
    );

    useEffect(async () => {
      let TYPE_LIST_MY_CAR = '';
      let resultGetListMyCar = await getListMyCar({});
      const { error, data, message } = resultGetListMyCar.data;

      if(!error) {
        setTotalMyCar(data.length);
      } else {
        console.log({ message })
      }
    }, []);

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.DEFAULT_BACKGROUND, height: 120, marginTop: -75 }}>
        <Text style={ styles.titleScreen }>Cá nhân</Text>
      </View>
      <View style={ styles.headerStyle }>
        {
          avatar ? 
          (<Image source={{ uri: avatar }} style={ styles.avatarStyle }/>) : 
          (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
        }
        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
          <Text style={ styles.userName }>{ infoUser.lastName + ' ' + infoUser.firstName }</Text>
          <Text style={{ fontStyle: 'italic', color: '#e6b800' }}>
            ADMIN BOOKING
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tài khoản */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tài khoản</Text>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('DetaulInfoUserScreen') }}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="user-alt" size={24} color="#77CBEB" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Thông tin cá nhân</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} >
              <View style={ styles.tabStyle }>
              <FontAwesome5 name="place-of-worship" size={24} color="#EB466E" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Địa chỉ đã lưu</Text>
              </View> 
            </TouchableOpacity>
          </View>
        </View>
        {/* Khách */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Khác</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={alert}>
            <View style={ styles.btnAnotherStyle }>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5 name="sign-out-alt" size={24} color="black" />
                  <Text style={{ fontSize: 16, marginLeft: 15, }}>Đăng xuất</Text>
                </View>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{ marginLeft : 220 }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  headerStyle: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.WHITE,
  },

  accountStyle: {
    width: contentWidth, 
    marginLeft: 15,
    marginTop: 15,
  },

  tabStyle: {
    marginTop: 11,
    height: 100,
    backgroundColor: COLORS.WHITE,
    width: contentWidth / 2 - 5,
    marginRight: 10,
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  btnAnotherStyle: {
    flexDirection: 'row', 
    marginTop: 20, 
    alignContent: 'space-between', 
    backgroundColor: COLORS.WHITE,
    height: 65,
    alignItems: 'center',
    padding: 20,
    borderRadius: 6,
  },

  titleScreen: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 65 
  },
});

export default InfoUser;
