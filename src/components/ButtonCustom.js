//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonCustom = ({ 
    title,
    color, 
    btnIcon, 
    btnAction,
    btnHeight,
    btnWidth,
}) => {

  return (
    <TouchableOpacity 
      style={[
        { 
          height: btnHeight ? btnHeight : 50, 
          width : btnWidth  ? btnWidth  : '100%',
          backgroundColor: color ? color : ''
        },
          styles.btnStyle, 
      ]}
        onPress={btnAction}
    >
      <Text style={[styles.textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },

  textStyle: {
    color: '#fff',
    textAlign: 'center'
  },
});

export default ButtonCustom;
