import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import ImagePicker from 'react-native-image-crop-picker';
const { width } = Dimensions.get('screen');
const contentWidth = width - 42;

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';
import { TextInput } from 'react-native-gesture-handler';

const DetailInfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser ? infoUser.avatar : '';
  const [name, setName] = useState(infoUser ? infoUser.name : '');
  const [email, setEmail] = useState(infoUser ? infoUser.email : '');
  const [phone, setPhone] = useState(infoUser ? infoUser.phoneNumber : '');
  const [Username, setUsername] = useState(infoUser ? infoUser.username : '');
  const [resourcePath, setResourcePath] = useState();

  // const pickPicture = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     setUri(image.path);
  //     props.onChange?.(image);
  //   });
  // };

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <View style={ styles.navigateStyle }>
        <Icon name="chevron-left" size={28} color="black" onPress={navigation.goBack} style={{ marginLeft: 15 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Thông Tin Của Bạn</Text>
      </View>
      <View style={styles.infoUserStyle}>
        {
          avatar ? 
          (<Image source={{ uri: avatar }} style={ styles.avatarStyle }/>) : 
          (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
        }
        <TextInput 
          style={ styles.inputStyle }
          placeholder='Nhập tên'
          value={name}
          onChangeText={val => setName(val)} 
        />
        <TextInput 
          style={ styles.inputStyle }
          placeholder='Nhập email'
          value={email}
          onChangeText={val => setEmail(val)} 
        />
        <TextInput 
          style={ styles.inputStyle }
          placeholder='Nhập tên tải khoản'
          value={Username}
          onChangeText={val => setUsername(val)} 
        />
        <TextInput 
          style={ styles.inputStyle }
          placeholder='Nhập số điện thoại'
          value={phone}
          onChangeText={val => setPhone(val)} 
          keyboardType='number-pad'
        />
        <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle }>
          <View>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Cập nhật tải khoản</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigateStyle: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },  

  infoUserStyle: {
    width: contentWidth,
    marginLeft: 21,
    alignItems: 'center',
  },

  avatarStyle: {
    height: 106,
    width: 106,
    borderRadius: 53,
    marginBottom: 30,
  },

  inputStyle: {
    height: 50,
    width: '100%',
    borderRadius: 6,
    fontSize: 18,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  btnStyle: {
    height: 48,
    width: '100%',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default DetailInfoUser;
