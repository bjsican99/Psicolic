import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

import { loadImageFromGallery } from '../../utils/helpers'
import { updateProfile, uploadImage } from '../../utils/actions'

export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async () => {
        const result = await loadImageFromGallery([1, 1])
        if(!result.status){
            return 
        }
        
        setLoadingText("Actualizando Imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)

        if(!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha Ocurrido Un Error Al Almacener La Foto De Perfil.")
            return 
        }

        const resultUpdateProfile = await updateProfile({photoURL: resultUploadImage.url})
        setLoading(false)
        if(resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("Ha Ocurrido Un Error Al Actualizar La Foto De Perfil.")
        }
    }


    return (
        <View style = {styles.container}>
            <Avatar
                rounded
                size="large"
                onPress = {changePhoto}
                source={
                    photoUrl
                    ? {uri: photoUrl}
                    : require("../../assets/avatar-default.jpg")
                }
            />
            <View style = {styles.styinfouser}>
                <Text style = {styles.stydisplayname}>
                    {
                        user.displayName ? user.displayName : "Anónimo."
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    styinfouser: {
        marginLeft: 20,
    },
    stydisplayname:{
        fontWeight: "bold",
        paddingBottom: 10
    }
})
