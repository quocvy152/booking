import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, SafeAreaView } from "react-native";
import { MaterialCommunityIcons  } from '@expo/vector-icons'; 
import { COLORS } from '../../constant/colors';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;

const AlertValidateAccount = ({ navigation, route }) => {
  const userID = route?.params?.userID;
  const [modalVisible, setModalVisible] = useState(route?.params?.visibleAlert ? route?.params?.visibleAlert : true);
  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <View style={{ flexDirection: 'row', alignItems: 'center', width: width, height: 80, backgroundColor: COLORS.DEFAULT_BACKGROUND, }}>
        <FontAwesome5 name="chevron-left" style={{ marginTop: 35, marginLeft: 5 }} size={25} color="white" onPress={() => {
            navigation.goBack();
          }} />
        <Text style={ styles.hiText }>
          Yêu cầu xác thực tài khoản
        </Text>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MaterialCommunityIcons  name="alert-circle-check" style={{ marginTop: -20, marginBottom: 20 }} size={65} color="#FF4500" />
              <Text style={styles.modalText}>Đăng nhập thành công! Bạn vui lòng xác thực thông tin tài khoản để có thể sử dụng dịch vụ của chúng tôi</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('ValidateAccountScreen', { userID, ROUTE_NAME: 'ALERT_VALIDATE_ACCOUNT' })
                }}
              >
                <Text style={styles.textStyle}>Tiến hành xác thực</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hiText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35,
    justifyContent: 'center',
    marginLeft: width / 4 - 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 30,
    marginBottom: -20,  
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
    fontSize: 16
  }
});

export default AlertValidateAccount;