import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { COLORS } from '../../constant/colors';
import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom from '../../components/ToastCustom';
import { resetPassword } from '../../api/auth';
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;

const ValidateAccount = ({ navigation }) => {
  const [citizenIdentificationNo, setCitizenIdentificationNo] = useState('');
  const [citizenIdentificationFront, setCitizenIdentificationFront] = useState('');
  const [citizenIdentificationBack, setCitizenIdentificationBack] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [drivingLicenseFront, setDrivingLicenseFront] = useState('');
  const [drivingLicenseBack, setDrivingLicenseBack] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

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
      setImg(uri);
    }
  };
    
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
          <FontAwesome5 name="chevron-left" style={{ marginTop: 35, marginLeft: 5 }} size={25} color="white" onPress={ navigation.goBack } />
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
                onChangeText={val => setCitizenIdentificationNo(val)}
                editable={false} 
                selectTextOnFocus={false} 
                isInputNumber="numeric"
              />
            </View>

            {/* Ảnh căn cước công dân */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh CCCD mặt trước</Text>
              {
                citizenIdentificationFront ?
                (<Image source={{ uri: citizenIdentificationFront }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/CCCD_MT.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#6495ED' }
                    ]}
                    onPress={handleChoosePhoto}>
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
                citizenIdentificationFront ?
                (<Image source={{ uri: citizenIdentificationFront }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/CCCD_MS.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#6495ED' }
                    ]}
                    onPress={handleChoosePhoto}>
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
                onChangeText={val => setDrivingLicenseNo(val)}
                editable={false} 
                selectTextOnFocus={false} 
                isInputNumber="numeric"
              />
            </View>

            {/* Ảnh giấy phép lái xe */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Ảnh GPLX mặt trước</Text>
              {
                citizenIdentificationFront ?
                (<Image source={{ uri: citizenIdentificationFront }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/GPLX_MT.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#DAA520' }
                    ]}
                    onPress={handleChoosePhoto}>
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
                citizenIdentificationFront ?
                (<Image source={{ uri: citizenIdentificationFront }} style={ styles.avatarStyle } />) :
                (<Image source={require('../../resources/images/GPLX_MS.jpg')} style={ styles.avatarStyle } />)
              }
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[ 
                      styles.btnStyleUploadPhoto, 
                      { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: '#DAA520' }
                    ]}
                    onPress={handleChoosePhoto}>
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

            <View style={{ height: 50,
              backgroundColor: COLORS.DEFAULT_BACKGROUND,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              borderRadius: 5
            }}>
              <TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Tiến hành xác thực</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        
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
    marginLeft: width / 4
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
