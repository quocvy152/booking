import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TextInputCustom = ({ icon, placeholderText, textColor, secureTextEntry, isInputNumber, style, textInputAction }) => {
    return (
        <>
          <FontAwesome5 
            name={icon} 
            size={24} 
            color={textColor}
            style={[ styles.iconStyle ]}
          />
          <TextInput 
            style={[ styles.inputStyle, { ...style } ]}
            placeholder={placeholderText}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            placeholderTextColor={textColor}
            keyboardType={isInputNumber}
            onChangeText={textInputAction}
          >
          </TextInput>
        </>
    );
};

const styles = StyleSheet.create({
    container: {

    },

    iconStyle: {
      top: 17,
      left: 20,
      zIndex: 20,
      position: 'absolute',
    },

    inputStyle: {
      fontSize: 18,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingLeft: 60
    }
});

export default TextInputCustom;
