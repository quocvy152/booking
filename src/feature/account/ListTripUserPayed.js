import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListMyCar, getListCarBooking } from '../../api/general';
import ButtonCustom from '../../components/ButtonCustom';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const moment = require('moment');
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const contentWidth = width - 20;

const ListTripUserPayed = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.name;
  const avatar = infoUser?.avatar?.path;
  const [listTrip, setListTrip] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);
  const [page, setPage] = useState(1);

  const fetchListTrip = async ({ page }) => {
    let TYPE_GET_LIST_TRIP_PAYED = 5;
    let resultListCarRegister = await getListCarBooking(TYPE_GET_LIST_TRIP_PAYED);
    let { error, data } = resultListCarRegister.data;
    if(!error) {
      setListTrip(data);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListTrip({ page });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchListTrip({ page });
  }, [checkReload]);

  useEffect(() => {
    let listCarFilter = listTrip.filter(car => car.name.toLowerCase().includes(nameSearch.toLowerCase()));
    setListTrip(listCarFilter);
    if(!nameSearch) {
      setCheckReload(!checkReload);
    }
  }, [nameSearch]);

  const Card = ({ item }) => {
    let newItemToDetailCar = {
      PREVIOUS_SCREEN_NAME: 'Thông Tin Của Bạn',
      ROUTE_NAME: 'ListTripUserPayedScreen',
      infoCar: item?.booking?.car,
      details: item?.details,
      booking: item?.booking
    }

    return (
      <>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CarDetailScreen', newItemToDetailCar)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', top: -15 }}>
              {
                item?.booking?.car?.avatar ?
                (
                  <Image source={{ uri: item?.booking?.car.avatar.path }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ item?.booking?.car.name && item?.booking?.car.name.length > 16 ? item?.booking?.car?.name.slice(0, 16) + '...' : item?.booking?.car.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + item?.booking?.car?.brandID?.name }
                </Text> 
              </Text>
            </View>
            <View
              style={{
                top: -15,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NumberFormat
                value={ item?.booking?.car?.price }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>Giá: <Text style={{ color: 'orange' }}>{value}/ngày</Text></Text>}
              />
            </View>
            <View
              style={{
                top: -15,
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              {/* <Text style={{ marginTop: 10, fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Ngày bắt đầu: 
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  { 
                    '  ' + moment(item?.booking?.startTime).format('L') + ' ' + moment(item?.booking?.startTime).format('LT')  
                  }
                </Text> 
              </Text> */}
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT, fontWeight: 'bold' }}>
                Ngày trả xe: 
                <Text style={{ fontWeight: 'bold', color: '#FFD700' }}>
                  { '  ' + moment(item?.booking?.timeGiveCarBack).format('L') + ' ' + moment(item?.booking?.timeGiveCarBack).format('LT')  }
                </Text> 
              </Text>
            </View>
            <View
              style={{
                top: -15,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NumberFormat
                value={ item?.booking?.realMoney }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>Đã thanh toán: <Text style={{ color: 'green' }}>{value}</Text></Text>}
              />
            </View>
          </View> 
        </TouchableOpacity>
      </>
    );
  }
    
  return (
    <>
      <SafeAreaView style={{ flex: 1, }}>
        <View style={ styles.header }>
          <FontAwesome5 name="chevron-left" size={28} color="black" onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Thông Tin Của Bạn</Text>
        </View>
        <View 
          style={{ 
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='Tìm kiếm chuyến đi'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
          <FontAwesome5 name="hands-helping" size={20} color="#3E89A8" style={{ marginRight: 10, }} />
          <Text style={{ color: '#3E89A8', fontSize: 20, fontWeight: 'bold' }}>Danh sách xe bạn đã trả</Text>
        </View>
        
        {
          listTrip.length ?
          (
            <FlatList 
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={listTrip}
              renderItem={({ item }) => <Card item={item} />}
            />
          ) : 
          (
            <>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, }}>
              <Image 
                  source={require('../../resources/images/trip.png')}
                  style={{ width: 300, height: 200, resizeMode: 'contain' }}
              />
              <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', width: contentWidth, marginTop: 30 }}>Bạn chưa có chuyến nào, hãy thuê ngay một chiếc xe để trải nghiệm dịch vụ</Text>
            </View>
            </>
          )
        }

        <View style={{ width: contentWidth, flexDirection: 'row', marginLeft: 10, marginBottom: 25, }}>
          <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={() => navigation.goBack()}>
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Tìm xe ngay</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[ 
              styles.btnStyle, 
              { backgroundColor: COLORS.WHITE, marginLeft: '2%', borderWidth: 1, borderColor: COLORS.DEFAULT_BACKGROUND }
            ]}
            onPress={() => navigation.navigate('ListCarUserScreen')}>
            <View>
              <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>Xe của tôi</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },

  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    marginLeft: 20, 
    alignItems: 'center',
    marginTop: 15,
  }, 

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },  

  sortBtn: {
    width: 50,
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20
  },

  styleCategoryCar: {
    height: 40,
    width: 125,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row'
  },  

  styleCategoryCarChild: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    height: 280,
    width: cardWidth,
    marginHorizontal: 10,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE
  },

  iconUser: {
    height: 50, 
    width: 50, 
    borderRadius: 25,
  },
  
  btnStyle: {
    height: 48,
    width: '49%',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
});

export default ListTripUserPayed;
