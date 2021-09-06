import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function userLogged() {
    const navigation = useNavigation()

    return (
        <View>
            <Text>userLogged...</Text>
            <Button
                title="Prueba De Home"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#442484"
    }
})
