import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { globalStyles } from './GlobalStyle'
import { RFValue, wp } from '../lib'
import IconMap from './IconMap'
import moment from 'moment';

const Tweet = ({ name, username, duration, content }) => {
    const { colors } = useTheme();
    const JoingedDate = moment(duration).format('Do MMM YYYY');
    return (
        <View
            style={[
                globalStyles.rowflex,
                globalStyles.mb20,
                styles.BlockWrap,
                { alignItems: 'flex-start', borderBottomColor: colors.Input },
            ]}
            >
            <View
                style={{
                width: wp(15),
                height: wp(15),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.Input,
                borderRadius: 100,
                marginRight: wp(3),
                }}
            >
                <IconMap
                    type={'FontAwesome'}
                    name={'user-o'}
                    size={Platform.OS === 'ios' ? 25 : 28}
                    color={colors.iconColor}
                />
            </View>
            <View style={{ width: wp(72) }}>
                <View style={[globalStyles.rowflex, globalStyles.mb10]}>
                    <Text style={[styles.Name, { color: colors.text }]}>{name}</Text>
                    <Text style={[styles.Username, { color: colors.iconColor }]}>
                            {' '}
                            {username}
                    </Text>
                    {duration && (
                        <Text style={{ color: colors.iconColor }}>
                        . {JoingedDate}
                        </Text>
                    )}
                </View>
                <Text
                    style={[
                        styles.ContentStyle,
                        { color: colors.text, paddingRight: 0, textAlign: 'justify' },
                    ]}
                    >
                    {content}
                </Text>
            </View>
        </View>
    );
};

export default Tweet;

const styles = StyleSheet.create({
  BlockWrap: {
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  Name: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  Username: {
    fontSize: RFValue(14),
  },
  ContentStyle: {
    lineHeight: 24,
    fontSize: Platform.OS === 'ios' ? RFValue(13) : RFValue(14),
  },
});
