import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text } from 'react-native'

import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'
import CarouselImages from '../../components/CarouselImage'

const widthScrenn = Dimensions.get("window").width

export default function Recomendacion({ navigation, route }) {
    const { id, name } = route.params
    const [recomend, setRecomend] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        (async()=>{
            const responce = await getDocumentById("recomend", id)
            if(responce.statusResponse){
                setRecomend(responce.document)
            }else{
                setRecomend({})
                Alert.alert("Ocurrio Un Problema Cargando El Comentario. Intente Más Tarde.")
            }
        })()
    }, [])

    if(!recomend){
        return <Loading isVisible = {true} text="Cargando..."/>
    }

    return (
        <ScrollView style = {styles.viewBody}>
            <CarouselImages
                images = {recomend.images}
                height={200}
                width = {widthScrenn}
                activeSlide = {activeSlide}
                setActiveSlide = {setActiveSlide}
            />
            <Text>{recomend.recomend}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    }
})
