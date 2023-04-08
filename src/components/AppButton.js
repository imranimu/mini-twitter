/*import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
// import Text from '../Text/Text';
// import {COLOR, rf, rh, rw} from '../../theme/Theme';
// import {wp} from '../../utils/ScreenDimensions';
import {useTheme} from 'react-native-paper';
import {hp, RFValue, wp} from '../lib';

export default function AppButton({
  title,
  onPress,
  disabled,
  stylesButton,
  color,
  type,
  textStyle,
  loader,
  icon,
}) {
  //const [loader,setLoader] = useState(false)
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        type === 'sec' && styles.buttonContainerSec,
        {
          width: wp(100),
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderColor: colors.primary,
        },
        stylesButton,
      ]}
      disabled={disabled}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loader && (
          <ActivityIndicator
            color={'#fff'}
            style={[styles.Loader, {right: hp(1)}]}
          />
        )}
        {icon}
        <Text
          style={[
            styles.title,
            {color: color ?? colors.textcolor},
            type === 'sec' && styles.titleSec,
            textStyle,
            icon && {paddingLeft: hp(0.6)},
          ]}
          preset={'h2'}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: hp(6.5),
    width: wp(80),
    // backgroundColor: COLOR.bluishCyan700,
    alignSelf: 'center',
    paddingVertical: hp(1.7),
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: hp(1.5),
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 4.65,
    // elevation: 2.5,
    // zIndex: 2,
  },
  title: {
    fontWeight: 'bold',
    // color: '#fff',
    fontSize: RFValue(14),
  },
  buttonContainerSec: {
    backgroundColor: '#fff',
    borderWidth: 50,
    shadowColor: '#ffff',
    borderColor: '#1691CE',
    paddingVertical: hp(1.4),
  },
  titleSec: {
    color: '#1691CE',
  },
});
*/

import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {hp, RFValue, wp} from '../lib';

export default function AppButton({title, onPress, disabled, stylesButton, color, textStyle, loader}){
    const {colors} = useTheme();
    return(
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={[
                styles.buttonContainer,                 
                {
                    backgroundColor: disabled ? "gray" : colors.primary ,                    
                },
                stylesButton,
            ]}
            disabled={disabled}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                {loader && (
                    <ActivityIndicator
                        color={'#fff'}
                        style={[styles.Loader, {right: hp(1)}]}
                    />
                )} 
                <Text
                    style={[
                        styles.title,
                        {color: color ?? colors.text},                        
                        textStyle, 
                    ]}
                >
                {title}
                    </Text>
            </View>
        </TouchableOpacity>   
    )

}


const styles = StyleSheet.create({
    buttonContainer: {       
        width: "100%",
        alignSelf: 'center',
        paddingVertical: hp(1.7),
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: hp(1.5),      
    },
    title: {
        fontWeight: 'bold',      
        fontSize: RFValue(14),
    }, 
    titleSec: {
        color: '#1691CE',
    },
  });