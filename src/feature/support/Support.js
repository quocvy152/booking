import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');
const contentWidth = width - 30;
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getListMyCar } from '../../api/general';

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';

const InfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);

  return (
    <SafeAreaView style={ styles.container }>
      <StatusBar style='dark' />
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.DEFAULT_BACKGROUND, height: 120, marginTop: -75 }}>
        <Text style={ styles.titleScreen }>Hỗ trợ</Text>
      </View>
      <ScrollView style={{ marginTop: 10, width: contentWidth, marginLeft: 15 }}>
        <View style={ styles.contentParapgh }>
          <Text style={ styles.headerStyle }>
            <Ionicons name="car-sport-sharp" style={{ marginRight: 10 }} size={20} color="black" /> Về Chúng Tôi
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={ styles.lineStyle }>
              Booking là nền tảng ứng dụng cho thuê xe tự lái với tất cả loại xe.
            </Text>
            <Text style={ styles.lineStyle }>
              Booking được thành lập với sứ mệnh mang đến nền tảng công nghệ hiện đại kết nối chủ xe ô tô và hành khách theo cách Nhanh Nhất, An Toàn Nhất và Tiết Kiệm Nhất.
            </Text>
            <Text style={ styles.lineStyle }>
              Booking hướng tới việc xây dựng một cộng đồng chia sẻ ô tô văn minh với nhiều tiện ích thông qua ứng dụng trên di động, nhằm nâng cao chất lượng cuộc sống của cộng đồng.
            </Text>
          </View>
        </View>
        <View style={ styles.contentParapgh }>
          <Text style={ styles.headerStyle }>
            <MaterialIcons name="security" size={20} style={{ marginRight: 10 }} color="black" /> Chính Sách Bảo Mật Thông Tin Cá Nhân
          </Text>
          <View style={{ justifyContent: 'center', }}>
            <Text style={ styles.lineStyle }>
              Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây
            </Text>
            <Text style={ styles.lineStyle }>
              Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng;
            </Text>
            <Text style={ styles.lineStyle }>
              Liên lạc với Khách hàng trong cho mục đích tiếp thị của Công ty;
            </Text>
            <Text style={ styles.lineStyle }>
              Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng;
            </Text>
            <Text style={ styles.lineStyle }>
              Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ trên Sàn giao dịch;
            </Text>
            <Text style={ styles.lineStyle }>
              Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu;
            </Text>
            <Text style={ styles.lineStyle }>
              Khi khách hàng đăng ký tài khoản Booking, thông tin cá nhân mà chúng tôi thu thập bao gồm:
            </Text>
            <Text style={ styles.lineStyle }>
              + Tên đăng kí, số điện thoại
            </Text>
            <Text style={ styles.lineStyle }>
              + Email, mật khẩu
            </Text>
          </View>
        </View>
        <View style={ styles.contentParapgh }>
          <Text style={ styles.headerStyle }>
          <MaterialCommunityIcons style={{ marginRight: 10 }} name="account-lock" size={24} color="black" /> Cam Kết Bảo Mật Thông Tin Cá Nhân
          </Text>
          <View style={{ justifyContent: 'center', }}>
            <Text style={ styles.lineStyle }>
              Thông tin cá nhân của thành viên trên Sàn giao dịch Booking được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của Booking. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
            </Text>
            <Text style={ styles.lineStyle }>
              Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ ba nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.
            </Text>
            <Text style={ styles.lineStyle }>
              Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, Booking sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.
            </Text>
            <Text style={ styles.lineStyle }>
              Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của Booking.
            </Text>
            <Text style={ styles.lineStyle }>
              Ban quản lí Sàn giao dịch yêu cầu các cá nhân khi đăng ký là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán …., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lí không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
            </Text>
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  contentParapgh: {
    marginBottom: 10
  },

  lineStyle: {
    textAlign: 'justify', fontSize: 16
  },

  titleScreen: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 55 
  },
});

export default InfoUser;
