import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import Loading from '../../components/Loading'

export default function userGuest() {
    return (
        <View>
            <ScrollView
                centerContent 
                style={styles.viewBody}
            >
                <Image
                    source = {require("../../assets/Bot.png")}
                    resizeMode="contain"
                    style={styles.image} 
                />
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal: 30
    },
    image:{
        height: 300,
        width: "100%",
        marginBottom: 10,
    }
})
