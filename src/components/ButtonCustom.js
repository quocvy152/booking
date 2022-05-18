//import liraries
import { FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';

const ButtonCustom = ({ 
    title,
    color, 
    btnIcon, 
    btnAction,
    btnHeight,
    btnWidth,
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
        <FontAwesome5 name={ btnIcon } size={24} color={ COLORS.DEFAULT_TEXT } />
        <Text style={[styles.textStyle, { ...titleStyle }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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
