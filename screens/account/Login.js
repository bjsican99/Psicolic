import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements/dist/divider/Divider';


export default function Login() {
    

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/Bot.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <Text>Login form</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
        </ScrollView>
    )
}

function CreateAccount(props){
    const navigation = useNavigation();
    return (
        <Text 
            style={styles.register}
            onPress={()=> navigation.navigate("Register")}
        >
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnRegister}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 40
    },
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20, 
    },
    divider:{
        backgroundColor: "#442484",
        margin: 40
    },
    register:{
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center",
    },
    btnRegister:{
        color: "#244484",
        fontWeight: "bold"
    }
})

