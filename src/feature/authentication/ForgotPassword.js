import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


import { COLORS } from '../../constant/colors';
import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom from '../../components/ToastCustom';
import { resetPassword } from '../../api/auth';

const ForgotPassword = ({ navigation }) => {
  const [Account, setAccount] = useState();

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

  const handleForgotPassSubmit = async () => {
    Keyboard.dismiss();
    showLoading();

    if(!Account) {
      hideLoading();
      showToast({ content: 'Vui lòng nhập đầy đủ thông tin' });
      return;
    }

    let body = {
      account: Account
    }

    let result = await resetPassword(body);
    const { error, message, data } = result.data;

    if(error) {
      hideLoading();
      showToast({ content: message });
      return;
    } else {
      hideLoading();
      showToast({ type: 'success', content: 'Mật khẩu mới đã được gửi đến tài khoản email của bạn. Hãy thử đăng nhập vào hệ thống lại nhé' });
      setTimeout(() => {
        navigation.goBack();
      }, 3000)
    }
  }
    
  return (
    <>
      <View style={ styles.header }>
        <FontAwesome5 name="chevron-left" size={28} color="black" onPress={ navigation.goBack } />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, }}>Đăng nhập</Text>
      </View>
      <ToastCustom 
        isShowToast={isShowToast}
        contentToast={content}
        typeToast={type}
      />
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <View style={ styles.content }>
            <Text style={ styles.hiText }>
            Quên mật khẩu
            </Text>
        </View>

        <View style={ styles.form }>
            <View style={{ marginBottom: 10, }}> 
                <TextInputCustom 
                  icon='user-alt'
                  placeholderText='Nhập tài khoản hoặc email'
                  textColor={ COLORS.DEFAULT_TEXT }
                  textInputAction={(val) => setAccount(val)}
                />
            </View>

            <Text 
              style={{ 
                fontWeight: 'bold', 
                color: COLORS.WHITE, 
                marginTop: 30, 
                borderWidth: 1,
                borderColor: "thistle",
                borderRadius: 10, 
                padding: 10,
              }}>
              Lưu ý: Hệ thống sẽ tự động cập nhật mật khẩu và gửi đến Email bạn đã đăng ký
            </Text>

            {/* <View style={{ marginBottom: 10, }}> 
                <TextInputCustom 
                    icon='unlock'
                    placeholderText='Nhập mật khẩu mới'
                    textColor={ COLORS.DEFAULT_TEXT }
                    secureTextEntry={true}
                />
            </View>
            
            <View> 
                <TextInputCustom 
                    icon='unlock'
                    placeholderText='Nhập mật khẩu xác nhận'
                    textColor={ COLORS.DEFAULT_TEXT }
                    secureTextEntry={true}
                />
            </View> */}
            
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
              <ButtonCustom 
                title='Tạo Lại Mật Khẩu'
                color={ COLORS.BUTTON_AUTH_COLOR }
                btnAction={ handleForgotPassSubmit }
                btnLoading={isLoading}
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

  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    paddingHorizontal: 15,
    paddingVertical: 30
  },
});

export default ForgotPassword;
