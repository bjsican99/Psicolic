import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AddRecomendForm from '../../components/Recomends/AddRecomendForm'
import Loading from '../../components/Loading'

export default function AddRecomend() {
    const navigation = useNavigation()
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddRecomendForm
                toastRef={toastRef}
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Creando Recomendación..." />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
