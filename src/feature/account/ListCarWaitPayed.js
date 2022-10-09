import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
const unwind = require('javascript-unwind');
const moment = require('moment');
import { Skeleton } from "@rneui/themed";

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListCustomerBookingMyCar } from '../../api/general';
import ButtonCustom from '../../components/ButtonCustom';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const contentWidth = width - 20;

const ListCarWaitPayed = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.name;
  const avatar = infoUser?.avatar?.path;
  const [listTrip, setListTrip] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);
  const [page, setPage] = useState(1);  
  const [isDoneFetchData, setIsDoneFetchData] = useState(false);

  const fetchListTrip = async ({ page, name }) => {
    let TYPE_GET_LIST_CAR_WAIT_APPROVE = 4;
    let resultListCarRegister = await getListCustomerBookingMyCar(TYPE_GET_LIST_CAR_WAIT_APPROVE, name);
    let { error, data } = resultListCarRegister.data;

    if(!error) {
      setListTrip(data);
      setIsDoneFetchData(true);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListTrip({ page, name: nameSearch });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchListTrip({ page, name: nameSearch });
  }, [nameSearch]);

  const Card = ({ item }) => {
    let newItemToDetailCar = {
      PREVIOUS_SCREEN_NAME: 'Thông Tin Của Bạn',
      ROUTE_NAME: 'ListCarWaitPayedScreen',
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
                  <Image source={{ uri: item?.booking?.car?.avatar?.path }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ item?.booking?.car?.name && item?.booking?.car?.name.length > 16 ? item?.booking?.car.name.slice(0, 16) + '...' : item?.booking?.car.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + item?.booking?.car?.brandID?.name }
                </Text> 
              </Text>
            </View>
            <Text style={{ top: -15, marginHorizontal: 20, fontSize: 15 }}>
              Trả xe:
              <Text style={{ fontWeight: 'bold', color: 'orange' }}>
                { moment(item?.booking?.timeGiveCarBack).format('L') + ' ' + moment(item?.booking?.timeGiveCarBack).format('LT')  }
              </Text> 
            </Text>
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
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>Đơn giá: <Text style={{ color: 'blue' }}>{value}/ngày</Text></Text>}
              />
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
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>Số tiền cần trả: <Text style={{ color: 'green' }}>{value}</Text> </Text>}
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
        <StatusBar style='dark' />
        <View style={ styles.header }>
          <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
            <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => navigation.goBack()} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Danh sách yêu cầu trả xe</Text>
          </View>
        </View>
        <View 
          style={{ 
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='Tìm kiếm xe'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
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
            nameSearch || (!listTrip.length && isDoneFetchData) ?
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '100%' }}>
                <Image 
                    source={require('../../resources/images/bg_emptyPNG.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>Không tìm thấy kết quả phù hợp</Text>
              </View>
            </> : <>
              <View style={{ flexDirection: 'row', }}>
                <Skeleton animation="pulse" width={cardWidth} height={220} style={ styles.cardSkeleton } />
                <Skeleton animation="pulse" width={cardWidth} height={220} style={ styles.cardSkeleton } />
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Skeleton animation="pulse" width={cardWidth} height={220} style={ styles.cardSkeleton } />
                <Skeleton animation="pulse" width={cardWidth} height={220} style={ styles.cardSkeleton } />
              </View>
            </>
          )
        }
        
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
    justifyContent: 'space-between',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
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
    height: 270,
    width: cardWidth,
    marginHorizontal: 10,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE
  },

  cardSkeleton: {
    height: 270,
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

export default ListCarWaitPayed;
