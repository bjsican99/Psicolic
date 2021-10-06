import React, { useState, useEffect, useCallback } from 'react'
import { SegmentedControlIOSBase, StyleSheet } from 'react-native'
import Loading from '../../components/Loading'

import { getCurrentUser, isUserLogged } from '../../utils/actions'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from '../account/userGuest'
import LogInformation from './LogInformation'

//verifica si el usuario esta logueado o no esta logueado.
export default function Information() {
    const [login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() =>{
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if(login == null){
        return <Loading isVisible={true} text = "Cargando..."/>
    }

    return login ? <LogInformation/> : <UserGuest/>
}

const styles = StyleSheet.create({})
