import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements';
import { View, ActivityIndicator, ScrollView , Image, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native';

const Home =(props)=>{
    return (
        <ScrollView>
            <Image
                source = {require("../assets/Bot.png")} resizeMode="contain" style={styles.image}/>
            <View>
                <Button buttonStyle={styles.buttonScreen} Color="#244484"
                    title ="Conversación con una IA" onPress={() => props.navigation.navigate("Chatbot")}
                />
                <Button buttonStyle={styles.buttonScreen} title ="Recomendaciones Para Combatir La Depresión" onPress={() => props.navigation.navigate("Recomend")}/>
                <Button buttonStyle={styles.buttonScreen} title ="Acerca De La Aplicación" onPress={() => props.navigation.navigate("Information")}/>
                <Button buttonStyle={styles.buttonScreen} title ="Mi Cuenta" onPress={() => props.navigation.navigate("Account")}/>
            </View>
            
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#7bbcfc',
    },
    buttonScreen: {
        flex: 1,
        textAlign: "center",
        marginVertical: 10,
        backgroundColor: "#442484"       
    },
    image:{
        height: 150,
        width: "100%",
        marginTop: 10,
        marginEnd: 10
    }
})

export default Home
// ... other code from the previous section
