import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Image, Animated, Platform } from 'react-native'

import images from '../resources/images';
import * as THEME from '../constant/mainTheme';

const ToastCustom = ({ isShowToast: isShow, typeToast: type, contentToast: content, setTop }) => {

    const [transY] = useState(new Animated.Value(Platform.OS == 'android' ? -200 : -500))

    if(isShow) {
        Animated.spring(transY, {
            toValue: 0,
            duration: 300,
            friction: 3, 
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(transY, {
                toValue: Platform.OS == 'android' ? -200 : -500,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }, 2500)
    }

    const hidenToast = () => {
        Animated.timing(transY, {
            toValue: Platform.OS == 'android' ? -200 : -500,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View  style={{
                ...styles.container, 
                top: setTop ? setTop : 50,
                borderColor: type == 'success' ? THEME.SUCCESS_COLOR : type == 'error' ? THEME.DANGER_COLOR : THEME.WARNING_COLOR,
                transform: [
                {
                    translateY: transY
                }
                ]
            }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
          }}>
            <Image
              style={{...styles.icon, tintColor: type == 'success' ? THEME.SUCCESS_COLOR : type == 'error' ? THEME.DANGER_COLOR : THEME.WARNING_COLOR}}
              source={type == 'success' ? images.ic_successToast : type == 'error' ? images.ic_errorToast : images.ic_warnToast}
            />
            <View style={{ width: '88%' }}>
              <Text style={{
                fontFamily: THEME.FONT_BOLD,
                fontSize: 13,
                marginBottom: 1
                }}
              >
                {type == 'success' ? 'Thông báo' : type == 'error' ? 'Thông báo' : 'Cảnh báo'}
              </Text>
              <Text 
                style={{fontSize: 12, color: THEME.GRAY1_COLOR}}
              >
                {content}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={hidenToast}
            style={{
              padding: 10,
              width: '10%',
              right: -5,
            }}
          >
             <Image
              style={styles.iconClose}
              source={images.ic_close}
            />
          </TouchableOpacity>
        </Animated.View>
    )
}

export default ToastCustom

const styles = StyleSheet.create({
    container: {
        padding: 15, 
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        position: 'absolute',
        width: '90%',
        left: '5%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        backgroundColor: 'rgba(255,255,255,0.99)',
        borderRightWidth: 5,
        borderLeftWidth: 5,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        zIndex: 1000000000100000000010000000001000000000,
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    iconClose: {
        height: 13,
        width: 13,
        tintColor: THEME.GRAY1_COLOR,
    }


})
