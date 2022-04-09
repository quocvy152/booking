import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

import ButtonCustom    from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom'

const ForgotPassword = () => {
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
            Quên mật khẩu
            </Text>
        </View>

        <View style={ styles.form }>
            <View style={{ marginBottom: 10, }}> 
                <TextInputCustom 
                    icon='pen'
                    placeholderText='Nhập mã tạo lại mật khẩu'
                    textColor='#929292'
                />
            </View>

            <View style={{ marginBottom: 10, }}> 
                <TextInputCustom 
                    icon='unlock'
                    placeholderText='Nhập mật khẩu mới'
                    textColor='#929292'
                    secureTextEntry={true}
                />
            </View>
            
            <View> 
                <TextInputCustom 
                    icon='unlock'
                    placeholderText='Nhập mật khẩu xác nhận'
                    textColor='#929292'
                    secureTextEntry={true}
                />
            </View>
            
            <View style={{ marginTop: 15, }}>
            <ButtonCustom 
                title='Tạo lại mật khẩu'
                color='#2F4F4F'
                btnAction={() => console.log('ForgotPassword click...')}
            />
            </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const DEFAULT_TEXT = {
  color: '#fff',
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#198c51',
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
});

export default ForgotPassword;
