import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import SelectDropdown from 'react-native-select-dropdown';

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListCarBooking } from '../../api/general';
import ButtonCustom from '../../components/ButtonCustom';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Skeleton } from "@rneui/themed";
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const contentWidth = width - 20;
import moment from 'moment';
import 'moment/locale/vi';

const status = ["Đang yêu cầu", "Đã tự động thanh toán"];

const ListTripWaitPayed = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser?.avatar?.path;
  const [listTrip, setListTrip] = useState([]);
  const [nameSearch, setNameSearch] = useState(undefined);
  const [checkReload, setCheckReload] = useState(false);
  const [page, setPage] = useState(1);
  const [isDoneFetchData, setIsDoneFetchData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const fetchListTrip = async ({ page, name, typeGetList }) => {
    let TYPE_GET_LIST_TRIP_WAIT_PAYED = 4;
    let resultListCarRegister = await getListCarBooking(TYPE_GET_LIST_TRIP_WAIT_PAYED, name, typeGetList);
    let { error, data } = resultListCarRegister.data;

    if(!error) {
      setListTrip(data);
      setIsDoneFetchData(true);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListTrip({ page, name: nameSearch, typeGetList: selectedItem == 0 ? 'active' : 'inactive' });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let typeGetList = '';

    if(selectedItem == 0) 
      typeGetList = 'active';
    else if(selectedItem == 1) 
      typeGetList = 'inactive';

    fetchListTrip({ page, name: nameSearch, typeGetList });
  }, [checkReload, selectedItem]);

  useEffect(() => {
    fetchListTrip({ page, name: nameSearch, typeGetList: 'active', nameSearch });
  }, [nameSearch]);

  const Card = ({ item }) => {
    let newItemToDetailCar = {
      PREVIOUS_SCREEN_NAME: 'Thông Tin Của Bạn',
      ROUTE_NAME: 'ListTripWaitPayedScreen',
      infoCar: item?.booking?.car,
      details: item?.details,
      booking: item?.booking
    }

    let infoCar = item?.booking?.car;
    let infoBooking = item?.booking;

    return (
      <>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CarDetailScreen', newItemToDetailCar)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', top: -15 }}>
              {
                infoCar?.avatar?
                (
                  <Image source={{ uri: infoCar?.avatar?.path }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ infoCar?.name && infoCar?.name.length > 16 ? infoCar?.name.slice(0, 16) + '...' : infoCar?.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + infoCar?.brandID?.name }
                </Text> 
              </Text>
            </View>
            <View
              style={{
                top: -20,
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'blue' }}>Ngày thuê: { moment(infoBooking?.startTime).format('LLL') }</Text>
              <Text style={{ color: selectedItem == 1 ? 'red' : 'blue' }}>Ngày trả: { moment(infoBooking?.timeGiveCarBack ? infoBooking?.timeGiveCarBack : infoBooking?.endTime).format('LLL') }</Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NumberFormat
                value={ infoCar?.price }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ ngày</Text>}
              />
            </View>
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NumberFormat
                value={ infoBooking?.realMoney ? infoBooking?.realMoney : (infoBooking?.totalPrice) }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold', color: 'green' }}>+ {value}</Text>}
              />
            </View>
          </View> 
        </TouchableOpacity>
      </>
    );
  }

  const ButtonDropdownText = ({ text }) => {
    return (
      <>
        <Text style={{ fontSize: 18, }}>{ text }</Text>
      </>
    )
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
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Danh sách đợi chủ xe chấp nhận trả xe</Text>
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
                placeholderText='Tìm kiếm chuyến đi'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
          <SelectDropdown
            data={status}
            defaultButtonText={<ButtonDropdownText text={'Đang yêu cầu'} />}
            buttonStyle={{ borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#bbbbbb', width: width - 10  }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              setSelectedItem(index);
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
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
    height: 280,
    width: cardWidth,
    marginHorizontal: 10,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE
  },

  cardSkeleton: {
    height: 220,
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

export default ListTripWaitPayed;
