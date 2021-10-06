import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DisplayApp() {
    return (
        <View>
            <Text
                style={styles.titulo}
                numberOfLines={2}
            >
                La aplicación esta destinada a Padres Maestros y/o Tutores
            </Text>
            <Text
                style={styles.cuerpo}
                numberOfLines={5}
            >
                {"\n"}Esta aplicacion tiene objetivo ayudar a a detectar posibles casos de depresión infantil.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    cuerpo: {
        color: "black",
        
        fontStyle: "normal"
    }
})
