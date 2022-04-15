import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS } from '../../constant/colors';

import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom'

const ForgotPassword = ({ navigation }) => {
  useEffect(() => {
    return () => {
    
    }
  }, [])
    
  return (
    <>
      <View style={ styles.header }>
        <FontAwesome5 name="chevron-left" size={28} color="black" onPress={ navigation.goBack } />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, }}>Đăng nhập</Text>
      </View>
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
                    icon='pen'
                    placeholderText='Nhập mã tạo lại mật khẩu'
                    textColor={ COLORS.DEFAULT_TEXT }
                />
            </View>

            <View style={{ marginBottom: 10, }}> 
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
            </View>
            
            <View style={{ marginTop: 30, }}>
            <ButtonCustom 
                title='Tạo Lại Mật Khẩu'
                color={ COLORS.BUTTON_AUTH_COLOR }
                btnAction={() => console.log('ForgotPassword click...')}
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
