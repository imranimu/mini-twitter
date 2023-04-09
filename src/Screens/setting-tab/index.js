import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseLayout from '../../components/BaseLayout'
import LiveTweet from '../../components/LiveTweet'
import { TouchableOpacity } from 'react-native'

const SettingTab = () => {

    const Logout = () => {
        console.log('Log Out');
    }

    return (
        <>
        <BaseLayout>
            <Text>SettingTab</Text>

            <TouchableOpacity onPress={()=> Logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>

            
        </BaseLayout>

        <LiveTweet />         
        </>
    )
}

export default SettingTab

const styles = StyleSheet.create({})