import React, { Component, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, 
  Dimensions, ScrollView, TouchableOpacity, 
  Alert, Button, ActivityIndicator, Keyboard
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');
const contentWidth = width - 42;
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';
import { TextInput } from 'react-native-gesture-handler';
import ToastCustom from '../../components/ToastCustom';
import { updateUser, changePassword, changeAvatar, } from '../../api/auth';
import { updateInfoUser } from '../../store/auth';
import { isFulfilled } from '@reduxjs/toolkit';

const DetailInfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const [Img, setImg] = useState(infoUser ? infoUser.avatar : '');
  const [ImgUpdate, setImgUpdate] = useState(null);
  const [InfoImgUpdate, setInfoImgUpdate] = useState({});
  // const avatar = infoUser ? infoUser.avatar : '';
  const [name, setName] = useState(infoUser ? infoUser.name : '');
  const [email, setEmail] = useState(infoUser ? infoUser.email : '');
  const [phone, setPhone] = useState(infoUser ? infoUser.phoneNumber : '');
  const [Username, setUsername] = useState(infoUser ? infoUser.username : '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  // STATE HANDLE BUTTON
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChangePass, setIsLoadingChangePass] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledChangePass, setIsDisabledChangePass] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setInfoImgUpdate({
      
  //   })
  // }, [ImgUpdate])

  const showLoading = () => {
    setIsLoading(true);
    setIsDisabled(true);
  }

  const hideLoading = () => {
    setIsLoading(false);
    setIsDisabled(false);
  }

  const showLoadingChangePass = () => {
    setIsLoadingChangePass(true);
    setIsDisabledChangePass(true);
  }

  const hideLoadingChangePass = () => {
    setIsLoadingChangePass(false);
    setIsDisabledChangePass(false);
  }

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let { cancelled, height, type, width, uri } = result;
    if(!cancelled) {
      setImgUpdate(uri);
    }
  };

  const handleChangePass = async () => {
    Keyboard.dismiss();
    showLoadingChangePass();

    if(!password) {
      showToast({ content: 'Vui lòng nhập mật khẩu hiện tại để tiến hành thay đổi mật khẩu' });
      hideLoadingChangePass();
      return;
    }

    if(!newPassword) {
      showToast({ content: 'Vui lòng nhập mật khẩu mới để tiến hành thay đổi mật khẩu' });
      hideLoadingChangePass();
      return;
    }

    if(!confirmPassword) {
      showToast({ content: 'Vui lòng nhập mật khẩu xác nhận để tiến hành thay đổi mật khẩu' });
      hideLoadingChangePass();
      return;
    }

    const bodyChangePass = {
      oldPassword: password,
      newPassword,
      confirmPassword,
    }

    let resultChangePass = await changePassword(bodyChangePass);
    let { success, message, data } = resultChangePass.data;

    if(success) {
      showToast({ content: data, type: 'success' });
      hideLoadingChangePass();
      return;
    } else {
      showToast({ content: message, type: 'error' });
      hideLoadingChangePass();
      return;
    }
  }

  const handleUpdateInfoUser = async () => {
    Keyboard.dismiss();
    showLoading();

    let body = {
      name, 
      email,
      phoneNumber: phone,
    };

    if(!name) {
      showToast({ content: 'Vui lòng nhập tên' });
      hideLoading();
      return;
    }

    if(!email) {
      showToast({ content: 'Vui lòng nhập email' });
      hideLoading();
      return;
    }

    if(!phone) {
      showToast({ content: 'Vui lòng nhập số điện thoại' });
      hideLoading();
      return;
    }

    if(ImgUpdate) {
      const resultChangeAvatar = await changeAvatar({
        avatar: {
          uri: ImgUpdate,
          type: 'image/*',
          name: ImgUpdate,
        },
      });
      const { success, data, message } = resultChangeAvatar.data;
      if(!success) {
        showToast({ content: message, type: 'error' });
        hideLoading();
        return;
      }
    }

    // CALL API
    const resultUpdateInfoUser = await updateUser(body);
    const { success, data, message } = resultUpdateInfoUser.data;

    if(success) {
      showToast({ content: 'Cập nhật thông tin tài khoản thành công', type: 'success' });
      hideLoading();
      dispatch(updateInfoUser({ infoUser: data }));
      return;
    } else {
      showToast({ content: message, type: 'error' });
      hideLoading();
      return;
    }
  }

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
      <View style={ styles.navigateStyle }>
        <Icon name="chevron-left" size={28} color="black" onPress={navigation.goBack} style={{ marginLeft: 15 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Thông Tin Của Bạn</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 85 }}>
        <View style={styles.infoUserStyle}>
          {
            ImgUpdate ?
            (
              <Image source={{ uri: ImgUpdate }} style={ styles.avatarStyle }/>
            ) : 
            (
              Img ?
              (<Image source={{ uri: Img }} style={ styles.avatarStyle }/>) : 
              (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
            )
          }

          {/* Input file avatar user */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.btnStyleUploadPhoto}
            onPress={handleChoosePhoto}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
              <FontAwesome5 name="camera" size={18} color={ COLORS.BUTTON_AUTH_COLOR } /> 
              {/* <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>
                Tải ảnh đại diện của bạn
              </Text> */}
            </View>
          </TouchableOpacity>

          <TextInput 
            style={ styles.inputStyle }
            placeholder='Nhập tên tải khoản'
            value={Username}
            onChangeText={val => setUsername(val)}
            editable={false} 
            selectTextOnFocus={false} 
          />

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
            placeholder='Nhập số điện thoại'
            value={phone}
            onChangeText={val => setPhone(val)} 
            keyboardType='number-pad'
          />

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.btnStyle, { marginBottom: 20, }]} 
            onPress={handleUpdateInfoUser}
            disabled={isDisabled}
          >
            {
              isLoading ?
              (
                <ActivityIndicator size="large" color="white" style={{ marginRight: 10, }} />
              ) : (
                <></>
              )
            }
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Cập nhật tài khoản</Text>
            </View>
          </TouchableOpacity>

          <TextInput 
            style={ styles.inputStyle }
            value={password}
            secureTextEntry={true}
            onChangeText={val => setPassword(val)} 
            placeholder='Nhập mật khẩu cũ'
          />

          <TextInput 
            style={ styles.inputStyle }
            value={newPassword}
            secureTextEntry={true}
            onChangeText={val => setNewPassword(val)} 
            placeholder='Nhập mật khẩu mới'
          />

          <TextInput 
            style={ styles.inputStyle }
            value={confirmPassword}
            secureTextEntry={true}
            placeholder='Nhập mật khẩu xác nhận'
            onChangeText={val => setConfirmPassword(val)} 
          />

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.btnChangePasswordStyle} 
            onPress={handleChangePass}
            disabled={isDisabledChangePass}
          >
              {
                isLoadingChangePass ?
                (
                  <ActivityIndicator size="large" color={COLORS.DEFAULT_BACKGROUND} style={{ marginRight: 10, }} />
                ) : (
                  <></>
                )
              }
              <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>Đổi mật khẩu</Text>
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
    marginBottom: 5,
    borderWidth: 1,
    borderColor: COLORS.BUTTON_AUTH_COLOR,
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
    flexDirection: 'row',
  },

  btnChangePasswordStyle: {
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.DEFAULT_BACKGROUND,
    flexDirection: 'row',
  },

  btnStyleUploadPhoto: {
    borderRadius: 15,
    top: -45,
    left: 35,
    backgroundColor: COLORS.WHITE, 
    borderWidth: 1, 
    borderColor: COLORS.BUTTON_AUTH_COLOR,
    height: 30,
    width: 30
  },
});

export default DetailInfoUser;
