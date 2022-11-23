import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Skeleton } from "@rneui/themed";
import { Rating, AirbnbRating } from 'react-native-ratings';

import { COLORS } from '../../constant/colors';
import TextInputCustom from '../../components/TextInputCustom';
import { getListMyCar } from '../../api/general';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const contentWidth = width - 20;

const ListCarUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.name;
  const avatar = infoUser?.avatar?.path;
  const [listCarRegister, setListCarRegister] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);
  const [page, setPage] = useState(1);
  const [isDoneFetchData, setIsDoneFetchData] = useState(false);
  const [totalBooking, setTotalBooking] = useState(undefined);
  const [turnover, setTurnover] = useState(undefined);

  const fetchMyListCarRegister = async ({ name }) => {
    let resultListCarRegister = await getListMyCar({ name });
    let { error, data: listMyCar } = resultListCarRegister.data;

    if(!error) {
      setListCarRegister(listMyCar);

      let totalBookingOfUser = listMyCar.reduce((prev, current) => prev + current?.booking?.length, 0);
      setTotalBooking(totalBookingOfUser);

      let turnoverOfUser = 0;
      listMyCar.forEach(car => {
        let turnoverOfCar = car.booking.reduce((prev, current) => prev + (current?.realMoney ? current?.realMoney : current?.totalPrice), 0);
        turnoverOfUser += turnoverOfCar;
      })
      setTurnover(turnoverOfUser);

      setIsDoneFetchData(true);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyListCarRegister({ name: nameSearch });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchMyListCarRegister({ name: nameSearch });
  }, [nameSearch]);

  const Card = ({ car }) => {

    car.PREVIOUS_SCREEN_NAME = 'Thông Tin Của Bạn';
    car.ROUTE_NAME = 'ListCarUserScreen';

    return (
      <>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('InfoBookingOfCarScreen', car)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', }}>
              {
                car.infoCar.avatar ?
                (
                  <Image source={{ uri: (car.infoCar.avatar && car.infoCar.avatar.path) || '../../resources/images/mazda-6-2020-26469.png' }} style={{ height: 140, width: 200, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 140, width: 200, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 15, }}>{ car.infoCar.name && car.infoCar.name.length > 16 ? car.infoCar.name.slice(0, 20) + '...' : car.infoCar.name }</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, }}>
                  <Rating
                    type='custom'
                    ratingColor='#FFD700'
                    ratingBackgroundColor='#c8c7c8'
                    ratingCount={5}
                    imageSize={15}
                    readonly
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 13, }}>{ car?.booking?.length ? car?.booking?.length : 0 } chuyến</Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <NumberFormat
                  value={ car.infoCar.price }
                  displayType="text"
                  thousandSeparator
                  prefix="đ"
                  renderText={(value) => <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#008000' }}>{value}/ngày</Text>}
                />
              </View>
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
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Danh sách xe cho thuê</Text>
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
        
        <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 120, marginTop: 10, width: contentWidth, }}>
          <View style={{}}>
          {
            infoUser?.avatar?.path ?
            (
              <Image source={{ uri: infoUser?.avatar?.path }} style={ styles.avatarStyle }/>
            ) : 
            (
              (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
            )
          }
          </View>
          <View style={{ marginLeft: 15, }}>
          {
            totalBooking === undefined || turnover === undefined ?
            <>
              <Skeleton animation="pulse" width={contentWidth - 120} height={16} style={{ marginBottom: 5, }} />
              <Skeleton animation="pulse" width={contentWidth - 120} height={16} style={{  }} />
            </> : <>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Tổng số chuyến: <Text style={{color: '#008000'}}>{ totalBooking }</Text></Text>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Doanh thu: 
                <NumberFormat
                  value={ turnover }
                  displayType="text"
                  thousandSeparator
                  prefix="đ"
                  renderText={(value) => <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#008000' }}> + {value}</Text>}
                />
              </Text>
            </>
          }
          </View>
        </View>

        {
          listCarRegister.length ?
          (
            <FlatList 
              showsVerticalScrollIndicator={false}
              // numColumns={1}
              onEndReachedThreshold={0.5}
              onEndReached={() => setPage(page + 1)}
              data={listCarRegister}
              renderItem={({ item }) => <Card car={item} />}
            />
          ) : 
          (
            nameSearch || (!listCarRegister.length && isDoneFetchData) ?
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
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Skeleton animation="pulse" width={cardWidth} height={220} style={ styles.cardSkeleton } />
              </View>
              <View style={{ flexDirection: 'row', }}>
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
    height: 220,
    width: contentWidth,
    marginHorizontal: 10,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE,
  },

  cardSkeleton: {
    height: 220,
    width: contentWidth,
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

  avatarStyle: {
    marginLeft: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.BUTTON_AUTH_COLOR,
  },
});

export default ListCarUser;
