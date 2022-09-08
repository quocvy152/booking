import moment from 'moment';
import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import NumberFormat from 'react-number-format';
const { width } = Dimensions.get('screen');
const contentWidth = width - 10;

export default function TabViewComp({ listBookingActive, listBookingPayed }) {
  const ActiveBookingRoute = () => (
    <ScrollView style={{ flex: 1, width: contentWidth, marginLeft: 5, marginTop: 10 }}>
      {
        listBookingActive.length ?
        (
          listBookingActive.map(bookingActive => (
            <View style={ styles.itemBooking }>
              {
                bookingActive?.car?.avatar ?
                <Image 
                  source={{ uri: bookingActive?.car?.avatar?.path }}
                  style={{ width: 100, height: 150, resizeMode: 'contain' }}
                /> : <Image source={require('../../src/resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
              }
              <View style={ styles.infoBooking }>
                {/* Thông tin chủ xe */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Chủ xe: </Text>
                  {
                    bookingActive?.car?.userID?.avatar ?
                    <Image 
                      source={{ uri: bookingActive?.car?.userID?.avatar?.path }}
                      style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'contain' }}
                    /> : <Image source={require('../../src/resources/images/user-300x300.png')} style={{ height: 50, width: 50, borderRadius: 25, resizeMode: 'contain' }} />
                  }
                  <Text>{ bookingActive?.car?.userID?.lastName + ' ' + bookingActive?.car?.userID?.firstName }</Text>
                </View> */}

                {/* Thông tin người thuê xe */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Người thuê xe : </Text>
                  {
                    bookingActive?.user?.avatar ?
                    <Image 
                      source={{ uri: bookingActive?.user?.avatar?.path }}
                      style={{ width: 50, height: 50, borderRadius: 100, resizeMode: 'contain', marginRight: 10 }}
                    /> : <Image source={require('../../src/resources/images/user-300x300.png')} style={{ height: 50, width: 50, borderRadius: 25, resizeMode: 'contain', marginRight: 10 }} />
                  }
                  <Text>{ bookingActive?.user?.lastName + ' ' + bookingActive?.user?.firstName }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày bắt đầu  : </Text>
                  <Text>{ moment(bookingActive?.startTime).format('L') + ' ' + moment(bookingActive?.startTime).format('LT') }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày kết thúc  : </Text>
                  <Text>{ moment(bookingActive?.endTime).format('L') + ' ' + moment(bookingActive?.endTime).format('LT') }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Giá thuê           : </Text>
                  <NumberFormat
                    value={ bookingActive?.price }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text>{value}/ngày</Text>}
                  /> 
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Tổng số tiền    : </Text>
                  <NumberFormat
                    value={ bookingActive?.totalPrice }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ color: '#D2691E' }}>{value}</Text>}
                  /> 
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100, }}>
            <Image 
                source={require('../../src/resources/images/bg_emptyPNG.png')}
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
            <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>Hiện chưa có chuyến xe nào đang hoạt động</Text>
          </View>
        )
      }
      
    </ScrollView>
  );
  
  const PayedBookingRoute = () => (
    <ScrollView style={{ flex: 1, width: contentWidth, marginLeft: 5, marginTop: 10 }}>
      {
        listBookingPayed.length ?
        (
          listBookingPayed.map(bookingPayed => (
            <View style={ styles.itemBooking }>
              {
                bookingPayed?.car?.avatar ?
                <Image 
                  source={{ uri: bookingPayed?.car?.avatar?.path }}
                  style={{ width: 100, height: 150, resizeMode: 'contain' }}
                /> : <Image source={require('../../src/resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
              }
              <View style={ styles.infoBooking }>
                {/* Thông tin chủ xe */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Chủ xe: </Text>
                  {
                    bookingPayed?.car?.userID?.avatar ?
                    <Image 
                      source={{ uri: bookingPayed?.car?.userID?.avatar?.path }}
                      style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'contain' }}
                    /> : <Image source={require('../../src/resources/images/user-300x300.png')} style={{ height: 50, width: 50, borderRadius: 25, resizeMode: 'contain' }} />
                  }
                  <Text>{ bookingPayed?.car?.userID?.lastName + ' ' + bookingPayed?.car?.userID?.firstName }</Text>
                </View> */}

                {/* Thông tin người thuê xe */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Người thuê xe: </Text>
                  {
                    bookingPayed?.user?.avatar ?
                    <Image 
                      source={{ uri: bookingPayed?.user?.avatar?.path }}
                      style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'contain', marginRight: 10 }}
                    /> : <Image source={require('../../src/resources/images/user-300x300.png')} style={{ height: 50, width: 50, borderRadius: 25, resizeMode: 'contain', marginRight: 10 }} />
                  }
                  <Text>{ bookingPayed?.user?.lastName + ' ' + bookingPayed?.user?.firstName }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày bắt đầu: </Text>
                  <Text>{ moment(bookingPayed?.startTime).format('L') + ' ' + moment(bookingPayed?.startTime).format('LT') }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày kết thúc: </Text>
                  <Text>{ moment(bookingPayed?.endTime).format('L') + ' ' + moment(bookingPayed?.endTime).format('LT') }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày trả xe    : </Text>
                  <Text>{ moment(bookingPayed?.timeGiveCarBack).format('L') + ' ' + moment(bookingPayed?.timeGiveCarBack).format('LT') }</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Giá thuê         : </Text>
                  <NumberFormat
                    value={ bookingPayed?.price }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text>{value}/ngày</Text>}
                  /> 
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Số tiền đã thanh toán: </Text>
                  <NumberFormat
                    value={ bookingPayed?.realMoney }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ color: '#228B22' }}>{value}</Text>}
                  /> 
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100, }}>
            <Image 
                source={require('../../src/resources/images/bg_emptyPNG.png')}
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
            <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>Hiện chưa có chuyến xe nào đang hoạt động</Text>
          </View>
        )
      }
      
    </ScrollView>
  );
  
  const renderScene = SceneMap({
    active_booking: ActiveBookingRoute,
    payed_booking: PayedBookingRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'active_booking', title: 'Hoạt động' },
    { key: 'payed_booking', title: 'Hoàn thành' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  itemBooking: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 175,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    marginBottom: 5,
  },

  infoBooking: {
    flexDirection: 'column',
    marginLeft: 15,
  },
});