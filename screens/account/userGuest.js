import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements';
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
                <Text style={styles.title}>Consulta tu perfil en la aplicaicon</Text>
                <Text style={styles.description}>No Ha Iniciado Sesión.</Text>
                <Button
                    buttonStyle={styles.button}
                    title = "Ver tu perfil"
                    onPress={()=> console.log("click!!!!")}
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
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    },
    description:{
        textAlign: "justify",
        marginBottom: 20,
        color: "#044cff"
    },
    button:{
        backgroundColor: "#442484"
    }
})
