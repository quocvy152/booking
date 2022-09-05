import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Alert, FlatList, Dimensions, Button } from 'react-native';
import { Badge } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListUser, updateStatuUser } from '../../api/auth';
import { isFulfilled } from '@reduxjs/toolkit';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Admin = ({ navigation }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.lastName + ' ' + infoUser?.firstName;
  const avatar = infoUser?.avatar?.path;
  const currentHour = new Date().getHours();
  const [listUser, setListUser] = useState([]);

  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);

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

  const fetchListUser = async () => {
    let resultGetListUser = await getListUser({ name: nameSearch });
    let { error, data } = resultGetListUser.data;

    if(!error)
      setListUser(data);
  }

  useEffect(() => {
    fetchListUser();
  }, [nameSearch]);

  useEffect(async () => {
    fetchListUser();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListUser();
    });
    return unsubscribe;
  }, [navigation]);

  const handleUpdateStatus = async (userID) => {
    let resultUpdateStatus = await updateStatuUser({ userID });
    let { error, data } = resultUpdateStatus.data;

    if(!error)
      showToast({ type: 'success', content: 'Cập nhật trạng thái thành công' });

    fetchListUser();
  }

  const ListUserView = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.usersListContainer}
      >
        {
          listUser && listUser.length ?
          (
            listUser.map((user) => (
              <View
                style={ styles.userItem }
                // activeOpacity={0.8} 
                // onPress={() => {
                // }}
              >
                {
                  user?.avatar?.path ?
                  (<Image source={{ uri: user?.avatar?.path }} style={ styles.iconUser }/>) : 
                  (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.iconUser } />)
                } 
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>{ user.lastName + ' ' + user.firstName }</Text>
                    {
                      user.status == 1 ?
                      (
                        <View style={{ fontSize: 16,  fontStyle: 'italic', marginTop: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: '#32CD32' }}>
                          <Text style={{ fontStyle: 'italic', fontWeight: 'bole', color: 'white' }}>Hoạt động</Text>
                        </View>
                      ) : (
                        <View style={{ fontSize: 16,  fontStyle: 'italic', marginTop: 10, paddingHorizontal: 25, paddingVertical: 3, borderRadius: 10,  backgroundColor: '#FF0000' }}>
                          <Text style={{ fontStyle: 'italic', fontWeight: 'bole', color: 'white' }}>Khóa</Text>
                        </View>
                      )
                    }
                </View>
                
                  {
                    user.status == 1 ?
                    (
                      <TouchableOpacity 
                        style={{
                          marginRight: 10,
                          paddingVertical: 4,
                          paddingHorizontal: 17,
                          backgroundColor: '#FF0000',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#fff',
                        }}
                        onPress={() => handleUpdateStatus(user._id)}
                      >
                        <FontAwesome name="lock" size={24} color="white" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={{
                          marginRight: 10,
                          paddingVertical: 4,
                          paddingHorizontal: 15,
                          backgroundColor: '#32CD32',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#fff',
                        }}
                        onPress={() => handleUpdateStatus(user._id)}
                      >
                        <FontAwesome name="unlock" size={24} color="white" />
                      </TouchableOpacity>
                    )
                  }
              </View>
            ))
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
              <Image 
                  source={require('../../resources/images/bg_emptyPNG.png')}
                  style={{ width: 300, height: 300, resizeMode: 'contain' }}
              />
              <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>Không tìm thấy kết quả phù hợp</Text>
            </View>
          )
        }
      </ScrollView>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, }}>
        <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
        <View style={ styles.header }>
          <View style={{ width: '80%', marginTop: 25, }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, color: COLORS.WHITE }}>Xin chào Admin,</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, color: COLORS.WHITE }}>{ name }</Text>
            </View>
              {/* Xử lý câu xin chào ADMIN */}
              {
                currentHour >= 3 && currentHour <= 11 ?
                (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.WHITE, marginTop: 10, }}>
                      Chúc Admin buổi sáng tốt lành 
                    </Text> 
                    <FontAwesome5 style={{ marginLeft: 10, marginTop: 10 }} name="smile-beam" size={24} color="white" />
                  </View>
                ) : (
                  currentHour >= 12 && currentHour <= 17 ?
                  (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.WHITE, marginTop: 10, }}>
                        Chúc Admin buổi chiều tốt lành
                      </Text>
                      <FontAwesome5 style={{ marginLeft: 10, marginTop: 10 }} name="smile-wink" size={24} color="black" />
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.WHITE, marginTop: 10, }}>
                        Chúc Admin buổi tối tốt lành 
                      </Text>
                      <Fontisto style={{ marginLeft: 10, marginTop: 10 }} name="smiley" size={24} color="black" />
                    </View>
                  )
                )
              }
          </View>
          {
            avatar ? 
            (<Image source={{ uri: avatar }} style={ styles.iconUser }/>) : 
            (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.iconUser } />)
          }
        </View>
        <View 
          style={{ 
            marginTop: 10,
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='Tìm kiếm người dùng'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
            <View style={ styles.sortBtn }>
              <FontAwesome5 name='align-left' size={24} color={ COLORS.WHITE } />
            </View>
        </View>
        <ListUserView />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#008080',
    paddingVertical: 15,
  },  

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },  

  sortBtn: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },

  usersListContainer: {
    width: width - 30,
    marginLeft: 15,
    paddingVertical: 15,
    justifyContent: 'center',
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
    marginLeft: 10
  },

  userItem: {
    flexDirection: 'row',
    height: 100,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
});

export default Admin;
