import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import { map, size, filter, isEmpty } from 'lodash'
import uuid from 'random-uuid-v4'

import { loadImageFromGallery } from '../../utils/helpers'
import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../utils/actions'
const widthScreen = Dimensions.get("window").width

export default function AddRecomendForm({ toastRef, setLoading, navigation }) {

    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorEdad, setErrorEdad] = useState(null)
    const [errorRecomend, setErrorRecomend] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const addRecomend = async() => {
        if (!validForm()) {
            return
        }
        setLoading(true)
        const responseUploadImages = await uploadImages()
        const addRecomend = {
            name: formData.name,
            edad: formData.edad,
            recomend: formData.recomend,
            images: responseUploadImages,
            rating: 0,
            ratingTotal: 0,
            createAt: new Date(),
            createBy: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId("recomend", addRecomend)
        setLoading(false)

        if(!responseAddDocument.statusResponse){
            toastRef.current.show("Hubo un error al guardar, Intente Más Tarde.")
        }
        navigation.navigate("Recomend")
    }

    const uploadImages = async() => {
        const imagesUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "recomend", uuid())
                if (response.statusResponse) {
                   imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }

    const validForm = () => {
        clearErrors()
        let isValid = true

        if (isEmpty(formData.name)) {
            setErrorName("Debes Su Nombre.")
            isValid = false
        }
        if (size(formData.edad)<2) {
            setErrorEdad("Debes Ingresar Su Edad.")
            isValid = false
        }
        if (isEmpty(formData.recomend)) {
            setErrorRecomend("Debes ingresar un Comentario o Recomendación.")
            isValid = false
        }
        if (size(imagesSelected) === 0) {
            toastRef.current.show("Debes de agregar al menos una imagen Representativa.", 3000)
            isValid = false
        }

        return isValid
    }

    const clearErrors = () => {
        setErrorRecomend(null)
        setErrorName(null)
        setErrorEdad(null)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImagesRecomend
                imageRecomend={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorEdad={errorEdad}
                errorRecomend={errorRecomend}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Recomendación"
                onPress={addRecomend}
                buttonStyle={styles.btnAddRecomend}
            />
        </ScrollView>
    )
}


function ImagesRecomend({ imageRecomend }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageRecomend
                        ? { uri: imageRecomend }
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageRecomend, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRecomend }}
                        onPress={() => removeImage(imageRecomend)}
                    />
                ))
            }
        </ScrollView>
    )
}

function FormAdd({ formData, setFormData, errorName, errorEdad, errorRecomend }) {
    const [country, setCountry] = useState("GT")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View styles={styles.viewForm}>
            <Input
                placeholder="Escriba Su Nombre..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                keyboardType="number-pad"
                placeholder="Ingrese Su Edad..."
                defaultValue={formData.edad}
                onChange={(e) => onChange(e, "edad")}
                errorMessage={errorEdad}
            />
            <Input
                placeholder="Ingrese Su Comentario..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.recomend}
                onChange={(e) => onChange(e, "recomend")}
                errorMessage={errorRecomend}
            />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        name: "",
        edad: "",
        recomend: ""
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    btnAddRecomend: {
        textAlign: "center",
        margin: 20,
        backgroundColor: "#2ECC71",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 50
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})
