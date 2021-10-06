import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import { getMoreRecomends, getRecomends } from '../../utils/actions'
import ListRecomend from '../../components/Recomends/ListRecomend'

export default function Recomend() {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [startRecomend, setStartRecomend] = useState(null)
    const [recomends, setRecomends] = useState([])
    const [loading, setLoading] = useState(false)

    const limitRecomends = 7

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(async () => {
            setLoading(true)
            const response = await getRecomends(limitRecomends)
            if (response.statusResponse) {
                setStartRecomend(response.startRecomend)
                setRecomends(response.recomends)
            }
            setLoading(false)
        }, [])
    )

    const handleLoadMore = async () => {
        if (!startRecomend) {
            return
        }
        setLoading(true)
        const response = await getMoreRecomends(limitRecomends, startRecomend)
        if (response.statusResponse) {
            setStartRecomend(response.startRecomend)
            setRecomends([...recomends, ...response.recomends])
        }
        setLoading(false)
    }

    if (user == null) {
        return <Loading isVisible={true} text="Cargando" />
    }

    return (
        <View style={styles.viewBody}>
            {
                size(recomends) > 0 ? (
                    <ListRecomend
                        recomends={recomends}
                        navigation={navigation}
                        handleLoadMore = {handleLoadMore}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No Hay Recomendaciones Registradas</Text>
                    </View>
                )
            }
            {
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#0c7cfc"
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("AddRecomend")}
                    />
                )
            }
            <Loading isVisible={loading} text="Cargando Recomendaciones..." />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
