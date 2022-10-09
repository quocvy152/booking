import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Skeleton } from "@rneui/themed";

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

  const fetchMyListCarRegister = async ({ name }) => {
    let resultListCarRegister = await getListMyCar({ name });
    let { error, data } = resultListCarRegister.data;

    if(!error) {
      setListCarRegister(data);
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
          onPress={() => navigation.navigate('CarDetailScreen', car)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', top: -15 }}>
              {
                car.infoCar.avatar ?
                (
                  <Image source={{ uri: (car.infoCar.avatar && car.infoCar.avatar.path) || '../../resources/images/mazda-6-2020-26469.png' }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ car.infoCar.name && car.infoCar.name.length > 16 ? car.infoCar.name.slice(0, 16) + '...' : car.infoCar.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + car.infoCar.brandID.name }
                </Text> 
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
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
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ ngày</Text>}
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
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Danh sách xe bạn đã đăng ký</Text>
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

        {/* <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
          <FontAwesome5 name="car" size={20} color="#37A604" style={{ marginRight: 10, }} />
          <Text style={{ color: '#37A604', fontSize: 20, fontWeight: 'bold' }}>Danh sách xe bạn đã đăng ký</Text>
        </View> */}
        {
          listCarRegister.length ?
          (
            <FlatList 
              showsVerticalScrollIndicator={false}
              numColumns={2}
              onEndReachedThreshold={0.5}
              onEndReached={() => setPage(page + 1)}
              data={listCarRegister}
              renderItem={({ item }) => <Card car={item} />}
            />
          ) : 
          (
            nameSearch ?
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
        
        <View style={{ width: contentWidth, flexDirection: 'row', marginLeft: 10, marginBottom: 25, }}>
          <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={() => navigation.navigate("AddCarScreen")}>
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Đăng ký xe</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[ 
              styles.btnStyle, 
              { backgroundColor: COLORS.WHITE, marginLeft: '2%', borderWidth: 1, borderColor: COLORS.DEFAULT_BACKGROUND }
            ]}
            onPress={() => navigation.navigate('ListTripUserScreen')}>
            <View>
              <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>Chuyến của tôi</Text>
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
    // alignItems: 'center',
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

export default ListCarUser;
