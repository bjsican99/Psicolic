import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'

export default function ListRecomend({ recomends, navigation, handleLoadMore }) {
    return (
        <View>
            <FlatList
                data={recomends}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(recomend) => (
                    <Recomends recomend={recomend} navigation={navigation} />
                )}
            />
        </View>
    )
}

function Recomends({ recomend, navigation, handleLoadMore }) {
    const { id, images, name, edad, recomendacion } = recomend.item
    const imagenRecomend = images[0]

    const goRecomendGo = () =>{
        navigation.navigate("Recomendacion", {id, name})
    }

    return (
        <TouchableOpacity onPress = {goRecomendGo}>
            <View style={styles.viewRecomend}>
                <View style={styles.viewRecomendacionImagen}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: imagenRecomend }}
                        style={styles.imageRecomendacion}
                    />
                </View>
                <View>
                    <Text style={styles.RecomendName}>Nombre: {name}</Text>
                    <Text style={styles.RecomendEdad}>Edad: {edad} años</Text>
                    <Text style={styles.RecomendRecomend}>
                        {
                            size(recomendacion) > 0
                                ? `${recomendacion.substr(0, 60)}...`
                                : recomendacion
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewRecomend: {
        flexDirection: "row",
        margin: 10
    },
    viewRecomendacionImagen: {
        marginRight: 15,
    },
    imageRecomendacion: {
        width: 90,
        height: 90,
    },
    RecomendName: {
        fontWeight: "bold"
    },
    RecomendEdad: {
        paddingTop: 2,
        color: "grey"
    },
    RecomendRecomend: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})
