import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS } from '../../constant/colors';
import {
  checkEmail
} from '../../utils/utils';
import { registerUser } from '../../api/auth';

import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom     from '../../components/ToastCustom';

const Register = ({ navigation }) => {
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Name, setName] = useState();

  // === START TOAST MESSAGE === //
  const [isShowToast, setIsShowToast]    = useState(false);
  const [typeToast, setTypeToast]        = useState();
  const [contentToast, setContentToast]  = useState();

  const showToast = ({ type, content }) => {
    setIsShowToast(true);
    setTypeToast(type);
    setContentToast(content);
    setTimeout(() => {
      setIsShowToast(false)
    }, 1500);
}
// === END TOAST MESSAGE === //

  const handleSubmitRegister = () => {
    Keyboard.dismiss();

    if(!Username || !Email || !Password || !ConfirmPassword || !PhoneNumber || !Name) {
      showToast({ content: 'Vui lòng điền thông tin đầy đủ' });
      return;
    }

    if(!checkEmail(Email)) {
      showToast({ content: 'Email chưa đúng định dạng' });
      return;
    }

    if(Password !== ConfirmPassword) {
      showToast({ content: 'Mật khẩu xác nhận không khớp' });
      return;
    }

    const body = {
      Username,
      Email,
      Password,
      PhoneNumber,
      Name
    };

    registerUser(body)
      .then(res => {
        console.log({
          res
        })
      })
      .catch(err => {
        return;
      })
    
  }
    
  return (
    <>
      <ToastCustom typeToast={typeToast} contentToast={contentToast} isShowToast={isShowToast} />
      <View style={ styles.header }>
        <FontAwesome5 name="chevron-left" size={28} color="black" onPress={ navigation.goBack } />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, }}>Đăng nhập</Text>
      </View>
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <View style={ styles.content }>
            <Text style={ styles.hiText }>
            Đăng Ký Booking
            </Text>
        </View>

        <View style={ styles.form }>
            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='mail-bulk'
                  placeholderText='Nhập Email'
                  textColor={ COLORS.DEFAULT_TEXT }
                  textInputAction={val => {
                    setEmail(val)
                  }}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='user-alt'
                  placeholderText='Nhập tài khoản'
                  textColor={ COLORS.DEFAULT_TEXT }
                  textInputAction={val => {
                    setUsername(val)
                  }}
              />
            </View>
            
            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='lock'
                  placeholderText='Nhập mật khẩu'
                  textColor={ COLORS.DEFAULT_TEXT }
                  secureTextEntry={true}
                  textInputAction={val => {
                    setPassword(val)
                  }}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='lock'
                  placeholderText='Nhập mật khẩu xác nhận'
                  textColor={ COLORS.DEFAULT_TEXT }
                  secureTextEntry={true}
                  textInputAction={val => {
                    setConfirmPassword(val)
                  }}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='phone-alt'
                  placeholderText='Nhập số điện thoại'
                  textColor={ COLORS.DEFAULT_TEXT }
                  isInputNumber='numeric'
                  textInputAction={val => {
                    setPhoneNumber(val)
                  }}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='info'
                  placeholderText='Nhập tên'
                  textColor={ COLORS.DEFAULT_TEXT }
                  textInputAction={val => {
                    setName(val)
                  }}
              />
            </View>
            
            <View style={{ marginTop: 15 }}>
              <ButtonCustom 
                  title='Đăng Ký'
                  color={ COLORS.BUTTON_AUTH_COLOR }
                  btnAction={handleSubmitRegister}
              />
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },

  hiText: {
    ...DEFAULT_TEXT,
    fontSize: 20,
    lineHeight: 50,
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 30,
  },

  form: {
    width: '90%',
  },

  buttonActionText: {
    ...DEFAULT_TEXT,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonAction: {
    paddingHorizontal: 90,
    paddingVertical: 20
  },

  action: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    paddingHorizontal: 15,
    paddingVertical: 30
  },
});

export default Register;
