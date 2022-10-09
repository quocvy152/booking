import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import NumberFormat from 'react-number-format';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputCustom from '../../components/TextInputCustom';
const { width, height } = Dimensions.get('screen');
const contentWidth = width - 30;
const contentHeight = height;
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getListCarFavourite } from '../../api/general';
import { Skeleton } from "@rneui/themed";

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';

const cardWidth = width / 2 - 20;

const Favourite = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const [listCar, setListCar] = useState([]);
  const [nameSearch, setNameSearch] = useState('');

  const fetchListCarFavourite = async ({ userID, name }) => {
    let resultGetList = await getListCarFavourite({ userID, name });
    let { error, data } = resultGetList.data;
    if(!error)
      setListCar(data);
  }

  // const handleUnFavourite = ({ carID, userID }) => {
  //   console.log({ carID, userID })
  // }

  useEffect(() => {
    fetchListCarFavourite({ userID: infoUser._id, name: nameSearch });
  }, [nameSearch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListCarFavourite({ userID: infoUser._id, name: nameSearch });
    });
    return unsubscribe;
  }, [navigation]);

  const Card = ({ item }) => {
    let newItemToDetailCar = {
      infoCar: item?.infoCar,
      details: item?.details,
      favouriteID: item?.favouriteID
    }

    let car = item?.infoCar;

    return (
      <>
        {/* <View style={{ height: 40, justifyContent: 'center', alignSelf: 'flex-end', marginRight: 10 }}>
          <MaterialCommunityIcons onPress={handleUnFavourite} name="heart-remove-outline" size={25} color="red" />
        </View> */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CarDetailScreen', newItemToDetailCar)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', top: -15, height: 120, }}>
              {
                car.avatar ?
                (
                  <Image source={{ uri: car.avatar && car.avatar.path }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ car.name && car.name.length > 16 ? car.name.slice(0, 16) + '...' : car.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + car.brandID.name }
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='light' />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.DEFAULT_BACKGROUND, height: 120, marginTop: -75 }}>
        <Icon name="heart" size={20} color="white" style={{ marginTop: 55, marginRight: 10, }} />
        <Text style={ styles.titleScreen }>Xe yêu thích</Text>
      </View>
      <View 
        style={{ 
          marginTop: 20,
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
          <View style={ styles.sortBtn }>
            <FontAwesome5 name='align-left' size={24} color={ COLORS.WHITE } />
          </View>
      </View>
      {
        listCar.length ?
        (
          <FlatList 
            showsVerticalScrollIndicator={false}
            numColumns={2}
            //onEndReachedThreshold={0.5}
            //onEndReached={() => setPageIndex(pageIndex + 1)}
            data={listCar}
            renderItem={({ item }) => <Card item={item} />}
          />
        ) : (
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: contentWidth,
    marginLeft: 15
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
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
  },

  contentParapgh: {
    marginBottom: 10
  },

  lineStyle: {
    textAlign: 'justify', fontSize: 16
  },

  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    paddingVertical: 15,
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

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },  

  titleScreen: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 55 
  },
});

export default Favourite;
