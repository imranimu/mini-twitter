// NavigationOptions.js
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {hp, wp} from '../lib';
import IconMap from './IconMap';

export const navigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShadowOpacity: 0,
  headerStyle: {
    borderBottomWidth: 0,
  },
};

function SearchComp() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp(17),
        justifyContent: 'space-between',
        right: hp(2),
      }}>
      <TouchableOpacity>
        <IconMap
          type="Ionicons"
          name="search-outline"
          size={hp(3)}
          color={colors.iconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconMap
          type="Feather"
          name="filter"
          size={hp(3)}
          color={colors.iconColor}
        />
      </TouchableOpacity>
    </View>
  );
}
export const useOptions = () => {
  const {colors} = useTheme();

  return {
    ...navigationOptions,
    headerTintColor: colors.textcolor,
    headerStyle: {
      ...navigationOptions.headerStyle,
      backgroundColor: colors.bgcolor,
    },
  };
};
export const useMoreOptions = () => {
  const {colors} = useTheme();

  return {
    ...navigationOptions,
    headerTintColor: colors.textcolor,
    headerStyle: {
      ...navigationOptions.headerStyle,
      backgroundColor: colors.bgcolor,
    },
    // headerTitle: () => {
    //   return <Text>Hello</Text>;
    // },
    headerRight: () => {
      return <SearchComp />;
    },
  };
};
