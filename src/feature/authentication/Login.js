import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../constant/colors';
import images from '../../resources/images';

import ButtonCustom from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom from '../../components/ToastCustom';

const Login = () => {
  const navigate = useNavigation();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  useEffect(() => {
    return () => {
    
    }
  }, []);

  const openForgotPassword = () => {
    navigate.navigate('ForgotPasswordScreen');
  }

  const openRegister = () => {
    navigate.navigate('RegisterScreen');
  }

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleLoginSubmit = () => {
    if(!userName || !password) {
      showToast({ content: 'Vui lòng điền thông tin đầy đủ' })
      return;
    }
  }
    
  return (
    <>
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
        <View style={ styles.content }>
            <Text style={ styles.hiText }>
            Đăng Nhập Booking
            </Text>
        </View>

        <View>
          <Image 
            style={{ 
              width: 350, 
              height: 150,
              marginBottom: 25, 
              borderRadius: 10,
            }} 
            source={ images.bg_login } 
          />
        </View>

        <View style={ styles.form }>
            <View style={{ marginBottom: 10, }}> 
            <TextInputCustom 
                icon='user-alt'
                placeholderText='Nhập tài khoản'
                textColor={ COLORS.DEFAULT_TEXT } 
                textInputAction={(val) => {
                  setUserName(val)
                }}
            />
            </View>
            
            <View> 
            <TextInputCustom 
                icon='lock'
                placeholderText='Nhập mật khẩu'
                textColor={ COLORS.DEFAULT_TEXT }
                secureTextEntry={true}
                textInputAction={(val) => {
                  setPassword(val);
                }}
            />
            </View>
            
            <View style={{ marginTop: 15 }}>
            <ButtonCustom 
                title='Đăng Nhập'
                color='#2F4F4F'
                btnAction={handleLoginSubmit}
            />
            </View>
        </View>

        <View style={ styles.action }>
            <TouchableOpacity style={ styles.buttonAction } onPress={openForgotPassword}>
              <Text style={ styles.buttonActionText }>Quên mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.buttonAction } onPress={openRegister}>
              <Text style={ styles.buttonActionText }>Đăng ký</Text>
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
});

export default Login;
