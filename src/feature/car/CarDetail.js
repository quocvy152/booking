import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { removeCar, cancelBookingCar } from '../../api/general';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import ToastCustom from '../../components/ToastCustom';

const CarDetail = ({ navigation, route }) => {
  const car = route.params;
  const PREVIOUS_SCREEN_NAME = route.params.PREVIOUS_SCREEN_NAME;
  const ROUTE_NAME = route.params.ROUTE_NAME;
  const [infoSeats, setInfoSeats] = useState(car.details.find(detail => detail.detailType.code === 'SOGHE'));
  const [infoTranmission, setInfoTranmission] = useState(car.details.find(detail => detail.detailType.code === 'TRUYENDONG'));
  const [infoFuel, setInfoFuel] = useState(car.details.find(detail => detail.detailType.code === 'NHIENLIEU'));
  const [infoFuelConsumption, setInfoFuelConsumption] = useState(car.details.find(detail => detail.detailType.code === 'MUCTIEUTHUNHIENLIEU'));
  const [listFeature, setListFeature] = useState(car.details.filter(detail => detail.detailType.code == 'TINHNANG'));
  const [listLicense, setListLicense] = useState(car.details.filter(detail => detail.detailType.code == 'GIAYTOTHUEXE'));

   // START TOASTCUSTOM MESSAGE
   const [isShowToast, setIsShowToast] = useState(false);
   const [content, setContent] = useState();
   const [type, setType] = useState();
   // END TOASTCUSTOM MESSAGE

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleCancelRegisterCar = async () => {
    let carID = car.id;
    let resultRemoveCar = await removeCar(carID);
    let { success, data, message } = resultRemoveCar.data;
    if(success) {
      showToast({ content: 'Hủy đăng ký xe thành công', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListCarUserScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const alert = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn hủy đăng ký xe không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleCancelRegisterCar }
      ]
    );

    const alertBooking = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn hủy xe đã đặt không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleCancelBooking }
      ]
    );

  const handleCancelBooking = async () => {
    let carID = car.id;
    let resultCancelBooking = await cancelBookingCar(carID);
    let { success, data, message } = resultCancelBooking.data;
    if(success) {
      showToast({ content: 'Hủy đặt xe thành công', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListTripUserScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1, flexDirection: 'column', }}>
      <StatusBar style='dark' />
      <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
      <View style={ styles.header }>
        <FontAwesome5 name="chevron-left" size={28} color="black" onPress={navigation.goBack} />
        {
          PREVIOUS_SCREEN_NAME ?  
          (
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{ PREVIOUS_SCREEN_NAME }</Text>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Trang chủ</Text>
          )
        }
      </View>

      <View style={ styles.body }>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 280, justifyContent: 'center', alignItems: 'center' }} >
            {
              car.images && car.images.length ?
              (
                <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={{ uri: car.images[0].url }} />
              ) : (
                <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={require('../../resources/images/mazda-6-2020-26469.png')} />
              )
            }
            
          </View>
          <View style={ styles.styleParagraph }>
            <View style={ styles.headerParagraph }>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 20, color: COLORS.WHITE, width: '75%' }} >{ car.name }</Text>
              <View style={{ width: 50, height: 50, marginRight: 20, }}>
                <ButtonCustom
                  color={ COLORS.WHITE }
                  btnIcon='heart'
                  btnAction={() => console.log('You clicked favourite')}
                />
              </View>
            </View>
            <View style={ styles.contentParagraph }>
              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Đặc điểm</Text>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoSeats && (
                      <>
                        <FontAwesome5 name="chair" size={18} color='white' style={{ marginRight: 5, }}/>
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            marginRight: 15,
                            lineHeight: 22, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>
                            { infoSeats.detailType.name }:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoSeats.val }</Text>
                      </>
                    )
                  }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                      infoTranmission && (
                        <>
                          <FontAwesome5 name="cogs" size={18} color="white" style={{ marginRight: 5, }} />
                          <Text 
                            style={{ 
                              color: COLORS.WHITE, 
                              textAlign: 'justify', 
                              lineHeight: 22, 
                              marginRight: 15,
                              fontSize: 18, 
                              fontWeight: 'bold',
                            }}>{ infoTranmission.detailType.name }:
                          </Text>
                          <Text style={{ color: COLORS.WHITE, textAlign: 'justify',lineHeight: 22, fontSize: 16, }}>{ infoTranmission.val }</Text>
                        </>
                      )
                    }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoFuel && (
                      <>
                        <FontAwesome5 name="charging-station" size={18} color="white" style={{ marginRight: 5, }} />
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            lineHeight: 22, 
                            marginRight: 15,
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>{ infoFuel.detailType.name }:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoFuel.val }</Text>
                      </>
                    )
                  }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoFuelConsumption && (
                      <>
                        <FontAwesome5 name="battery-half" size={18} color="white" style={{ marginRight: 5, }} />
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            marginRight: 15, 
                            lineHeight: 22, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>Mức tiêu thụ nhiên liệu:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoFuelConsumption.val }</Text>
                      </>
                    )
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Tính năng</Text>
                <View style={{ margin: 25, flex: 1, }}>
                  { 
                    listFeature.map(feature => (
                      <View style={{ borderWidth: 1, borderColor: 'white', padding: 10, borderRadius: 20, marginBottom: 10, }}>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            feature.val
                          }
                        </Text>
                      </View> 
                    ))
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Giấy tờ thuê xe</Text>
                <View style={{ margin: 25, flex: 1, }}>
                  { 
                    listLicense.map(license => (
                      <View style={{ marginBottom: 10, borderWidth: 1, borderColor: 'white', padding: 10, borderRadius: 20, }}>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            license.val
                          }
                        </Text>
                      </View> 
                    ))
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Điều khoản</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>{ car.rules }</Text>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thông tin thuê</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>Đơn giá thuê: { car.price }/ngày</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>Địa chỉ: { car.address }</Text>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Mô tả</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>{ car.description }</Text>
              </View>

            </View>
            {
              ROUTE_NAME ?
              (
                ROUTE_NAME == 'ListCarUserScreen' ?
                (
                  <View style={ styles.groupBtnParagraph }>
                    <ButtonCustom 
                      title='Cập nhật xe'
                      color='#FFD700'
                      btnIcon='edit'
                      titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnWidth={contentWidth}
                      btnAction={() => navigation.navigate('UpdateCarScreen', car)}
                    />
                    <View style={{ marginBottom: 20, }}></View>

                    <ButtonCustom 
                      title='Hủy đăng ký xe'
                      color='red'
                      btnIcon='luggage-cart'
                      titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnWidth={contentWidth}
                      btnAction={alert}
                    />
                  </View>
                ) : (
                  <View style={ styles.btnParagraph }>
                    <ButtonCustom 
                      title='Hủy đặt xe'
                      color='yellow'
                      titleStyle={{ color: COLORS.DEFAULT_BACKGROUND, fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnIcon='holly-berry'
                      btnWidth={contentWidth}
                      btnAction={alertBooking}
                    />
                  </View>
                )
              ) : (
                <View style={ styles.btnParagraph }>
                  <ButtonCustom 
                    title='Thuê xe'
                    color={ COLORS.WHITE }
                    titleStyle={{ color: COLORS.DEFAULT_BACKGROUND, fontWeight: 'bold', fontSize: 20 }}
                    btnHeight={60}
                    btnWidth={contentWidth}
                    btnAction={() => navigation.navigate('BorrowCarScreen', car)}
                  />
                </View>
              )
            }
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    marginLeft: 20, 
    alignItems: 'center',
  },

  body: {
  },

  headerParagraph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },  
  
  contentParagraph: {
  },  

  frameImage: {
  },  

  styleParagraph: {
    flexDirection: 'column', 
    backgroundColor: COLORS.DEFAULT_BACKGROUND, 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,
  },  

  btnParagraph: {
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  
  groupBtnParagraph: {
    height: 250,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },  
});

export default CarDetail;
