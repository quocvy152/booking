import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListMyCar } from '../../api/general';
import ButtonCustom from '../../components/ButtonCustom';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const contentWidth = width - 20;

const ListCarUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.name;
  const avatar = infoUser ? infoUser.avatar : '';
  const [listCarRegister, setListCarRegister] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMyListCarRegister = async ({ page }) => {
    let TYPE_GET_MY_CAR_REGISTER = '';
    let resultListCarRegister = await getListMyCar(TYPE_GET_MY_CAR_REGISTER, page);
    let { success, data: { items: data } } = resultListCarRegister.data;

    if(success) {
      setListCarRegister(data);
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyListCarRegister({ page });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchMyListCarRegister({ page });
  }, [checkReload]);

  useEffect(() => {
    let listCarFilter = listCarRegister.filter(car => car.name.toLowerCase().includes(nameSearch.toLowerCase()));
    setListCarRegister(listCarFilter);
    if(!nameSearch) {
      setCheckReload(!checkReload);
    }
  }, [nameSearch]);

  const Card = ({ car }) => {
    car.PREVIOUS_SCREEN_NAME = 'Th??ng Tin C???a B???n';
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
                car.images && car.images.length ?
                (
                  <Image source={{ uri: car.images[0] && car.images[0].url }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ car.name && car.name.length > 16 ? car.name.slice(0, 16) + '...' : car.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hi???u: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + car.brand.name }
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
                value={ car.price }
                displayType="text"
                thousandSeparator
                prefix="??"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ ng??y</Text>}
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Th??ng Tin C???a B???n</Text>
        </View>
        <View 
          style={{ 
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='T??m ki???m xe'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
          <FontAwesome5 name="car" size={20} color="#37A604" style={{ marginRight: 10, }} />
          <Text style={{ color: '#37A604', fontSize: 20, fontWeight: 'bold' }}>Danh s??ch xe b???n ???? ????ng k??</Text>
        </View>
        
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
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                <Image 
                    source={require('../../resources/images/bg_emptyPNG.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>B???n ch??a ????ng k?? xe n??o</Text>
              </View>
            </>
          )
        }
        
        <View style={{ width: contentWidth, flexDirection: 'row', marginLeft: 10, marginBottom: 25, }}>
          <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={() => navigation.navigate("AddCarScreen")}>
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>????ng k?? xe</Text>
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
              <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>Chuy???n c???a t??i</Text>
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
