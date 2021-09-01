import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Loading from '../../components/Loading'

import { getCurrentUser } from '../../utils/actions'

import UserGuest from './userGuest'
import UserLogged from './userLogged'

//verifica si el usuario esta logueado o no esta logueado.
export default function Account() {
    const [login, setLogin] = useState(null)

    useEffect(() =>{
        const user = getCurrentUser()
        user ? setLogin(true) : setLogin(false)
    }, [])
    

    if(login == null){
        return <Loading isVisible={true} text = "Cargando..."/>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
