//import liraries
import { FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../constant/colors';

const ButtonCustom = ({ 
    title,
    color, 
    btnIcon, 
    iconColor,
    btnAction,
    btnHeight,
    btnWidth,
    btnLoading,
    titleStyle
}) => {

  return (
    <TouchableOpacity 
      style={[
        { 
          height: btnHeight ? btnHeight : 50, 
          width : btnWidth  ? btnWidth  : '100%',
          backgroundColor: color ? color : '',
        },
          styles.btnStyle, 
      ]}
        onPress={btnAction}
    >
      <View style={ styles.titleBtn }>
        {
          btnLoading ? 
          (
            <ActivityIndicator size="large" color="white" style={{ marginRight: 10, }} />
          ) : (
            <FontAwesome5 name={ btnIcon } size={24} color={iconColor ? iconColor : COLORS.DEFAULT_TEXT} />
          )
        }
        <Text style={[styles.textStyle, { ...titleStyle }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  titleBtn: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
});

export default ButtonCustom;
