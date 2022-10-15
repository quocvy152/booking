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
import TextInputCustom from '../../components/TextInputCustom';
import { updateUser, changePassword, changeAvatar, } from '../../api/auth';
import { updateInfoUser } from '../../store/auth';
import { isFulfilled } from '@reduxjs/toolkit';

const DetailInfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const COLOR_BACKGROUND = infoUser.role ? COLORS.DEFAULT_BACKGROUND : COLORS.BACKGROUND_ADMIN; 
  const [Img, setImg] = useState({
    uri: infoUser?.avatar?.path,
    type: 'image/*',
    name: infoUser?.avatar?.path
  });
  const [ImgUpdate, setImgUpdate] = useState(null);
  const [InfoImgUpdate, setInfoImgUpdate] = useState({});
  const [firstName, setFirstName] = useState(infoUser ? infoUser.firstName : '');
  const [lastName, setLastName] = useState(infoUser ? infoUser.lastName : '');
  const [email, setEmail] = useState(infoUser ? infoUser.email : '');
  const [phone, setPhone] = useState(infoUser ? infoUser.phone : '');
  const [Username, setUsername] = useState(infoUser ? infoUser.username : '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [citizenIdentificationNo, setCitizenIdentificationNo] = useState(infoUser?.citizenIdentificationNo);
  const [citizenIdentificationFront, setCitizenIdentificationFront] = useState({
    uri: infoUser?.citizenIdentificationFront?.path,
    type: 'image/*',
    name: infoUser?.citizenIdentificationFront?.path,
  });
  const [citizenIdentificationFrontUpdate, setCitizenIdentificationFrontUpdate] = useState(null);
  const [citizenIdentificationBack, setCitizenIdentificationBack] = useState({
    uri: infoUser?.citizenIdentificationBack?.path,
    type: 'image/*',
    name: infoUser?.citizenIdentificationBack?.path,
  });
  const [citizenIdentificationBackUpdate, setCitizenIdentificationBackUpdate] = useState(null);
  const [drivingLicenseNo, setDrivingLicenseNo] = useState(infoUser?.drivingLicenseNo);
  const [drivingLicenseFront, setDrivingLicenseFront] = useState({
    uri: infoUser?.drivingLicenseFront?.path,
    type: 'image/*',
    name: infoUser?.drivingLicenseFront?.path,
  });
  const [drivingLicenseFrontUpdate, setDrivingLicenseFrontUpdate] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState({
    uri: infoUser?.drivingLicenseBack?.path,
    type: 'image/*',
    name: infoUser?.drivingLicenseBack?.path,
  });
  const [drivingLicenseBackUpdate, setDrivingLicenseBackUpdate] = useState(null);

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

  const handleChoosePhoto = async (typeImage) => {
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
      let objUploadFile = {
        uri: uri,
        type: 'image/*',
        name: uri,
      }

      switch(typeImage) {
        case 'file': {
          setImgUpdate(objUploadFile);
          break;
        }
        case 'CITYZENIDENTIFICATION_FRONT': {
          setCitizenIdentificationFrontUpdate(objUploadFile);
          break;
        }
        case 'CITYZENIDENTIFICATION_BACK': {
          setCitizenIdentificationBackUpdate(objUploadFile);
          break;
        }
        case 'DRIVING_LICENSE_FRONT': {
          setDrivingLicenseFrontUpdate(objUploadFile);
          break;
        }
        case 'DRIVING_LICENSE_BACK': {
          setDrivingLicenseBackUpdate(objUploadFile);
          break;
        }
      }
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

    try {
      let resultChangePass = await changePassword(bodyChangePass);
      let { error, message, data } = resultChangePass.data;

      if(!error) {
        showToast({ content: message, type: 'success' });
        hideLoadingChangePass();
        return;
      } else {
        showToast({ content: message, type: 'error' });
        hideLoadingChangePass();
        return;
      }
    } catch (error) {
      console.log({
        error
      })
      showToast({ content: 'Xảy ra lỗi trong quá trình thay đổi mật khẩu', type: 'error' });
      hideLoadingChangePass();
    }
  }

  const handleUpdateInfoUser = async () => {
    Keyboard.dismiss();
    showLoading();

    let body = {
      userID: infoUser._id,
      username: infoUser.username,
      firstName, 
      lastName, 
      email,
      phone,
      address: infoUser?.address,
      file: ImgUpdate ? ImgUpdate : Img,
      citizenIdentificationNo,
      drivingLicenseNo,
      citizenIdentificationFront: citizenIdentificationFrontUpdate ? citizenIdentificationFrontUpdate : citizenIdentificationFront,
      citizenIdentificationBack: citizenIdentificationBackUpdate ? citizenIdentificationBackUpdate : citizenIdentificationBack,
      drivingLicenseFront: drivingLicenseFrontUpdate ? drivingLicenseFrontUpdate : drivingLicenseFront,
      drivingLicenseBack: drivingLicenseBackUpdate ? drivingLicenseBackUpdate : drivingLicenseBack 
    };

    if(!firstName) {
      showToast({ content: 'Vui lòng nhập tên' });
      hideLoading();
      return;
    }

    if(!lastName) {
      showToast({ content: 'Vui lòng nhập họ' });
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

    try {
      // CALL API
      const resultUpdateInfoUser = await updateUser(body);
      const { error, data, message } = resultUpdateInfoUser.data;

      if(!error) {
        showToast({ content: 'Cập nhật thông tin tài khoản thành công', type: 'success' });
        hideLoading();
        dispatch(updateInfoUser({ infoUser: data }));
        return;
      } else {
        showToast({ content: message, type: 'error' });
        hideLoading();
        return;
      }
    } catch (error) {
      console.log({
        error
      })
      showToast({ content: 'Xảy ra lỗi trong quá trình cập nhật', type: 'error' });
      hideLoading();
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
        {
          console.log({
            COLOR_BACKGROUND
          })
        }
      <View style={[ styles.header, { backgroundColor: COLOR_BACKGROUND }]}>
        <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
          <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
          <Text style={{ marginLeft: -20, color: 'white', fontSize: 20, fontWeight: 'bold', }}>Thông tin cá nhân</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 85 }}>
        <View style={styles.infoUserStyle}>
          {
            ImgUpdate?.uri ?
            (
              <Image source={{ uri: ImgUpdate?.uri }} style={ styles.avatarStyle }/>
            ) : 
            (
              Img?.uri ?
              (<Image source={{ uri: Img?.uri }} style={ styles.avatarStyle }/>) : 
              (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
            )
          }

          {/* Input file avatar user */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.btnStyleUploadPhoto}
            onPress={() => handleChoosePhoto('file')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
              <FontAwesome5 name="camera" size={18} color={ COLORS.BUTTON_AUTH_COLOR } /> 
              {/* <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>
                Tải ảnh đại diện của bạn
              </Text> */}
            </View>
          </TouchableOpacity>

          <TextInput 
            style={[ styles.inputStyle, { backgroundColor: '#DCDCDC' } ]}
            placeholder='Nhập tên tải khoản'
            value={Username}
            onChangeText={val => setUsername(val)}
            editable={false} 
            selectTextOnFocus={false} 
          />

          <TextInput 
            style={ styles.inputStyle }
            placeholder='Nhập tên'
            value={firstName}
            onChangeText={val => setFirstName(val)} 
          />

          <TextInput 
            style={ styles.inputStyle }
            placeholder='Nhập họ'
            value={lastName}
            onChangeText={val => setLastName(val)} 
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

          {/* Căn cước công dân */}
          <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Số căn cước công dân</Text>
              <TextInputCustom 
                style={ styles.inputValidateInfoStyle }
                placeholderText='Nhập số căn cước công dân'
                value={citizenIdentificationNo}
                textInputAction={val => setCitizenIdentificationNo(val)}
                editable={false} 
                selectTextOnFocus={false} 
                isInputNumber="numeric"
              />
            </View>

            {/* Ảnh căn cước công dân */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, }}>Ảnh CCCD mặt trước</Text>
              {
                citizenIdentificationFrontUpdate?.uri ?
                (
                  <Image source={{ uri: citizenIdentificationFrontUpdate?.uri }} style={ styles.avatarValidateInfoStyle }/>
                ) : 
                (
                  citizenIdentificationFront?.uri ?
                  (<Image source={{ uri: citizenIdentificationFront?.uri }} style={ styles.avatarValidateInfoStyle } />) :
                  (<Image source={require('../../resources/images/CCCD_MT.jpg')} style={ styles.avatarValidateInfoStyle } />)
                )
              }
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnValidateInfoStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#6495ED' }
                    ]}
                    onPress={() => handleChoosePhoto('CITYZENIDENTIFICATION_FRONT')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                      <FontAwesome5 name="upload" size={18} color={ '#6495ED' } style={{ marginRight: 5, }} /> 
                      <Text style={{ color: '#6495ED', fontSize: 15, fontWeight: 'bold', }}>
                        Tải ảnh căn cước công dân mặt trước của bạn
                      </Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, }}>Ảnh CCCD mặt sau</Text>
              {
                citizenIdentificationBack?.uri ?
                (
                  <Image source={{ uri: citizenIdentificationBack?.uri }} style={ styles.avatarValidateInfoStyle }/>
                ) : 
                (
                  citizenIdentificationBack?.uri ?
                  (<Image source={{ uri: citizenIdentificationBack?.uri }} style={ styles.avatarValidateInfoStyle } />) :
                  (<Image source={require('../../resources/images/CCCD_MS.jpg')} style={ styles.avatarValidateInfoStyle } />)
                )
              }
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnValidateInfoStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#6495ED' }
                    ]}
                    onPress={() => handleChoosePhoto('CITYZENIDENTIFICATION_BACK')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                      <FontAwesome5 name="upload" size={18} color={ '#6495ED' } style={{ marginRight: 5, }} /> 
                      <Text style={{ color: '#6495ED', fontSize: 15, fontWeight: 'bold', }}>
                        Tải ảnh căn cước công dân mặt sau của bạn
                      </Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Ảnh căn cước công dân */}

            {/* Giấy phép lái xe */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Số giấy phép lái xe</Text>
              <TextInputCustom 
                style={ styles.inputValidateInfoStyle }
                placeholderText='Nhập số giấy phép lái xe'
                value={drivingLicenseNo}
                textInputAction={val => setDrivingLicenseNo(val)}
                editable={false} 
                selectTextOnFocus={false} 
                isInputNumber="numeric"
              />
            </View>

            {/* Ảnh giấy phép lái xe */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, }}>Ảnh GPLX mặt trước</Text>
              {
                drivingLicenseFrontUpdate?.uri ?
                (
                  <Image source={{ uri: drivingLicenseFrontUpdate?.uri }} style={ styles.avatarValidateInfoStyle }/>
                ) :
                (
                  drivingLicenseFront?.uri ?
                  (<Image source={{ uri: drivingLicenseFront?.uri }} style={ styles.avatarValidateInfoStyle } />) :
                  (<Image source={require('../../resources/images/GPLX_MT.jpg')} style={ styles.avatarValidateInfoStyle } />)
                )
              }
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnValidateInfoStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#DAA520' }
                    ]}
                    onPress={() => handleChoosePhoto('DRIVING_LICENSE_FRONT')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                      <FontAwesome5 name="upload" size={18} color={ '#DAA520' } style={{ marginRight: 5, }} /> 
                      <Text style={{ color: '#DAA520', fontSize: 15, fontWeight: 'bold', }}>
                        Tải ảnh giấy phép lái xe mặt trước của bạn
                      </Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, }}>Ảnh GPLX mặt sau</Text>
              {
                drivingLicenseBackUpdate?.uri ?
                (
                  <Image source={{ uri: drivingLicenseBackUpdate?.uri }} style={ styles.avatarValidateInfoStyle }/>
                ) :
                drivingLicenseBack?.uri ?
                (<Image source={{ uri: drivingLicenseBack?.uri }} style={ styles.avatarValidateInfoStyle } />) :
                (<Image source={require('../../resources/images/GPLX_MS.jpg')} style={ styles.avatarValidateInfoStyle } />)
              }
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnValidateInfoStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#DAA520' }
                    ]}
                    onPress={() => handleChoosePhoto('DRIVING_LICENSE_BACK')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                      <FontAwesome5 name="upload" size={18} color={ '#DAA520' } style={{ marginRight: 5, }} /> 
                      <Text style={{ color: '#DAA520', fontSize: 15, fontWeight: 'bold', }}>
                        Tải ảnh giấy phép lái xe mặt sau của bạn
                      </Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Ảnh giấy phép lái xe */}

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

  header: {
    marginTop: -25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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

  avatarValidateInfoStyle: {
    marginTop: 5,
    marginBottom: 5,
    height: 180,
    width: contentWidth,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#FFFFF0',
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
    backgroundColor: '#fff',
  },

  inputValidateInfoStyle: {
    height: 50,
    width: contentWidth,
    borderRadius: 6,
    fontSize: 18,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
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

  btnValidateInfoStyleUploadPhoto: {
    height: 38,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default DetailInfoUser;
