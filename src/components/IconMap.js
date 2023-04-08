import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {RFValue} from '../lib';

const iconMap = {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  Feather,
  Fontisto,
};

const IconMap = ({type, name, size, color}) => {
  const IconComponent = iconMap[type];
  return <IconComponent name={name} size={RFValue(size)} color={color} />;
};

export default IconMap;
