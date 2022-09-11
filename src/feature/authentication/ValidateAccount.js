import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../constant/colors';
import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom from '../../components/ToastCustom';
import { updateValidateInfo } from '../../api/auth';
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import InfoUser from '../account/InfoUser';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;

import { updateInfoUser } from '../../store/auth';

const ValidateAccount = ({ navigation, route }) => {
  const userID = route?.params?.userID;
  const ROUTE_NAME = route.params.ROUTE_NAME;
  const [citizenIdentificationNo, setCitizenIdentificationNo] = useState('');
  const [citizenIdentificationFront, setCitizenIdentificationFront] = useState(null);
  const [citizenIdentificationBack, setCitizenIdentificationBack] = useState(null);
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const dispatch = useDispatch();

  const showLoading = () => {
    setIsLoading(true);
    setIsDisabled(true);
  }

  const hideLoading = () => {
    setIsLoading(false);
    setIsDisabled(false);
  }

  const showToast = ({ type, content }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500);
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
        case 'CITYZENIDENTIFICATION_FRONT': {
          setCitizenIdentificationFront(objUploadFile);
          break;
        }
        case 'CITYZENIDENTIFICATION_BACK': {
          setCitizenIdentificationBack(objUploadFile);
          break;
        }
        case 'DRIVING_LICENSE_FRONT': {
          setDrivingLicenseFront(objUploadFile);
          break;
        }
        case 'DRIVING_LICENSE_BACK': {
          setDrivingLicenseBack(objUploadFile);
          break;
        }
      }
    }
  };

  const checkFormValidateInfo = (data) => {
    let { 
      citizenIdentificationNo,
      citizenIdentificationFront, 
      citizenIdentificationBack,
      drivingLicenseNo,
      drivingLicenseFront,
      drivingLicenseBack
    } = data;

    if(!citizenIdentificationNo)
      return{ error: true, content: 'Vui lòng nhập số Căn cước công dân của bạn' };

    if(!citizenIdentificationFront)
      return{ error: true, content: 'Vui lòng chọn hình ảnh Căn cước công dân mặt trước của bạn' };

    if(!citizenIdentificationBack)
      return{ error: true, content: 'Vui lòng chọn hình ảnh Căn cước công dân mặt sau của bạn' };

    if(!drivingLicenseNo)
      return{ error: true, content: 'Vui lòng nhập số Giấy phép lái xe của bạn' };

    if(!drivingLicenseFront)
      return{ error: true, content: 'Vui lòng chọn hình ảnh Giấy phép lái xe mặt trước của bạn' };

    if(!drivingLicenseBack)
      return{ error: true, content: 'Vui lòng chọn hình ảnh Giấy phép lái xe mặt sau của bạn' };

    return { 
      error: false,
      content: 'validate_done'
    }
  }

  const handleValidateInfo = async () => {
    showLoading();
    showToast({  type: 'warning', content: 'Quá trình xác thực đang diễn ra vui lòng đợi đến khi hoàn thành'})

    let data = {
      userID: userID,
      citizenIdentificationNo,
      citizenIdentificationFront, 
      citizenIdentificationBack,
      drivingLicenseNo,
      drivingLicenseFront,
      drivingLicenseBack
    };

    let { error, content } = checkFormValidateInfo(data);
    if(error) {
      hideLoading();
      showToast({ type: 'error', content });
      return;
    }

    let resultAfterUpdateValidateInfo = await updateValidateInfo(data);
    let { error: errorAfterUpdate, data: dataAfterUpdate, message } = resultAfterUpdateValidateInfo.data;
    if(errorAfterUpdate) {
      showToast({ type: 'error', content: message });
      hideLoading();
    } else {
      hideLoading();
      dispatch(updateInfoUser({ infoUser: dataAfterUpdate }));
      setTimeout(() => {
        showToast({ type: 'success', content: 'Bạn đã xác thực thông tin thành công. Hãy sử dụng các dịch vụ của chúng tôi' });
      }, 2000)
      
      setTimeout(() => {
        // if(ROUTE_NAME == 'ALERT_VALIDATE_ACCOUNT') {
        //   navigation.navigate('HomeScreen');
        // } else {
        //   navigation.navigate('LoginScreen');
        // }
        navigation.navigate('LoginScreen');
      }, 3000)
    }
  }
    
  return (
    <>
      <View style={ styles.header }>
        {/* <FontAwesome5 name="chevron-left" size={28} color="black" onPress={ navigation.goBack } />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, }}>Đăng nhập</Text> */}
      </View>
      <ToastCustom 
        isShowToast={isShowToast}
        contentToast={content}
        typeToast={type}
      />
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <View style={{ flexDirection: 'row', alignItems: 'center', width: width, height: 80, backgroundColor: COLORS.DEFAULT_BACKGROUND, }}>
          <FontAwesome5 name="chevron-left" style={{ marginTop: 35, marginLeft: 5 }} size={25} color="white" onPress={() => {
            navigation.goBack();
          }} />
          <Text style={ styles.hiText }>
            Xác thực tài khoản
          </Text>
        </View>

        {/* Form */}
        <ScrollView>
          <View style={{ marginTop: 10 }}>

            {/* Căn cước công dân */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Số căn cước công dân</Text>
              <TextInputCustom 
                style={ styles.inputStyle }
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
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh CCCD mặt trước</Text>
              {
                citizenIdentificationFront?.uri ?
                (<Image source={{ uri: citizenIdentificationFront?.uri }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/CCCD_MT.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
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
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh CCCD mặt sau</Text>
              {
                citizenIdentificationBack?.uri ?
                (<Image source={{ uri: citizenIdentificationBack?.uri }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/CCCD_MS.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
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
                style={ styles.inputStyle }
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
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh GPLX mặt trước</Text>
              {
                drivingLicenseFront?.uri ?
                (<Image source={{ uri: drivingLicenseFront?.uri }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/GPLX_MT.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
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
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh GPLX mặt sau</Text>
              {
                drivingLicenseBack?.uri ?
                (<Image source={{ uri: drivingLicenseBack?.uri }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/GPLX_MS.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
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

          </View>
        </ScrollView>
        <View style={{ 
            height: 50,
            backgroundColor: COLORS.DEFAULT_BACKGROUND,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginVertical: 10,
            width: contentWidth,
            marginLeft: 10
          }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                onPress={handleValidateInfo}
              >
                {
                  isLoading ?
                  (
                    <ActivityIndicator size="large" color="white" style={{ marginRight: 10, }} />
                  ) : (
                    <></>
                  )
                }
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Tiến hành xác thực</Text>
              </TouchableOpacity>
            </View>
      </SafeAreaView>
    </>
  );
};

const DEFAULT_TEXT = {
  color: COLORS.WHITE,
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },

  hiText: {
    ...DEFAULT_TEXT,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35,
    justifyContent: 'center',
    marginLeft: width / 4 - 10
  },

  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    paddingHorizontal: 15,
  },

  inputStyle: {
    height: 50,
    width: contentWidth,
    borderRadius: 6,
    fontSize: 18,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  },

  btnStyleUploadPhoto: {
    height: 38,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  avatarStyle: {
    marginTop: 15,
    height: 180,
    width: contentWidth,
    marginBottom: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#FFFFF0',
  },
});

export default ValidateAccount;
