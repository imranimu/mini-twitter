import React from 'react';
import {View, StyleSheet, Platform, SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
import { wp } from '../lib';

const BaseLayout = ({children, containerStyle, paddingTop}) => {
    
    const {colors} = useTheme();

    return (
        <View
            style={[
                styles.container,
                {backgroundColor: colors.background},
                containerStyle,
            ]}
        >
            <View
                style={{
                flex: 1,
                width: '100%',
                paddingTop: paddingTop ?? (Platform.OS === 'IOS' ? 40 : 10),
              }}>
                <SafeAreaView>{children}</SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(5),
    },
});

export default BaseLayout;
