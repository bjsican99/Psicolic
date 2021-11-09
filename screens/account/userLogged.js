import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'


import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'

export default function userLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    
    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser
                            user={user}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <AccountOptions
                            user={user}
                            toastRef={toastRef}
                            setReloadUser={setReloadUser}
                        />
                    </View>
                )
            }
            <Button
                title=" Cerrar Sesión."
                buttonStyle={styles.btnCloseSession}
                containerStyle={styles.btnContainer}
                titleStyle={styles.btnCloseSessionTitle}
                icon={
                    <Icon
                        type="material-community"
                        iconStyle={styles.icon}
                        name="exit-to-app"
                    />
                }
                onPress={() => {
                    closeSession()
                    navigation.navigate("Login")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#F2F4F4",
    },
    btnCloseSession: {
        textAlign: "center",
        marginTop: 30,
        borderRadius: 50,
        backgroundColor: "#ef9a9a",
        paddingVertical: 10

    },
    btnCloseSessionTitle: {
        color: "black",
    },
    btnContainer: {
        marginTop: 10,
        width: "90%",
        alignSelf: "center"
    },
    icon: {
        color: "black",
    }
})
