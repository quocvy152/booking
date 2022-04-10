import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../constant/colors';

import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom'

const Register = () => {
  const navigate = useNavigation();

  useEffect(() => {
    return () => {
    
    }
  }, [])
    
  return (
    <>
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
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='user-alt'
                  placeholderText='Nhập tài khoản'
                  textColor={ COLORS.DEFAULT_TEXT }
              />
            </View>
            
            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='lock'
                  placeholderText='Nhập mật khẩu'
                  textColor={ COLORS.DEFAULT_TEXT }
                  secureTextEntry={true}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='lock'
                  placeholderText='Nhập mật khẩu xác nhận'
                  textColor={ COLORS.DEFAULT_TEXT }
                  secureTextEntry={true}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='phone-alt'
                  placeholderText='Nhập số điện thoại'
                  textColor={ COLORS.DEFAULT_TEXT }
                  isInputNumber={true}
              />
            </View>

            <View style={{ marginBottom: 10, }}> 
              <TextInputCustom 
                  icon='info'
                  placeholderText='Nhập tên'
                  textColor={ COLORS.DEFAULT_TEXT }
              />
            </View>
            
            <View style={{ marginTop: 15 }}>
              <ButtonCustom 
                  title='Đăng Ký'
                  color={ COLORS.BUTTON_AUTH_COLOR }
                  btnAction={() => console.log('Register click...')}
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
});

export default Register;
