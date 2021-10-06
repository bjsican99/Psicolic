import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DisplayDiagnostico() {
    return (
        <View>
            <Text
                style={styles.titulo}
                numberOfLines={2}
            >
                La Aplicación no esta capacitada para realizar un diagnostico.
            </Text>
            <Text
                style={styles.cuerpo}
                numberOfLines={8}
            >
                {"\n"}Las únicas personas capaces de realizar diagnósticos son los profesionales de salud mental médicos, psicólogos y psiquiatras.
                {"\n\n"}Es importante que no consideres las respuestas como un diagnostico, el especialista siempre tendra la ultima palabra.
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