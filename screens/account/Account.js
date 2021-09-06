import React, { useState, useEffect, useCallback } from 'react'
import { SegmentedControlIOSBase, StyleSheet } from 'react-native'
import Loading from '../../components/Loading'
import { getCurrentUser, isUserLogged } from '../../utils/actions'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from './userGuest'
import UserLogged from './userLogged'

//verifica si el usuario esta logueado o no esta logueado.
export default function Account() {
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

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
