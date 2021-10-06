import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DisplayAyuda() {
    return (
        <View>
            <Text
                style={styles.titulo}
                numberOfLines={2}
            >
                No se busca reemplazar la terapia con un profesional.
            </Text>
            <Text
                style={styles.cuerpo}
                numberOfLines={7}
            >
                {"\n"}El uso de esta aplicación es únicamente como soporte para verificar posibles indicios de depresión en los niños.
                {"\n"}Si se da un indicio es importante que acudas con un profesional.
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
