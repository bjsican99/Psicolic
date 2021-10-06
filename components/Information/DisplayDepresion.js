import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DisplayDepresion() {
    return (
        <View>
            <Text
                style={styles.titulo}
                numberOfLines={2}
            >
                La Depresión es un tema bastante delicado.
            </Text>
            <Text
                style={styles.cuerpo}
                numberOfLines={9}
            >
                {"\n"}La depresión es más que una simple tristeza, es por ello que es necesario buscar ayuda a especialistas para recibir un diagnostico más preciso.
                {"\n"}La aplicación busca dar un soporte a padres, maestros y/o tutores que quieran ver si un niño o niña tiene indicios depresivos.
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