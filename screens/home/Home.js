import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { getCurrentUser } from '../../utils/actions'
import InfoUser from '../../components/account/InfoUser'

export default function userLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    //obtener el usuario.
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
                    </View>
                )
            }
            <ScrollView>
                <View>
                    <Button
                        buttonStyle={styles.buttonScreen}
                        containerStyle={styles.btnContainer}
                        icon={
                            <Icon
                                type="material-community"
                                name="forum"
                                iconStyle={styles.icon}
                            />
                        }
                        title=" Conversación con una IA"
                        onPress={() =>
                            navigation.navigate("Chatbot", {
                                name: user.displayName,
                                id: user.uid
                            })}
                    />
                    <Button
                        buttonStyle={styles.buttonScreen}
                        containerStyle={styles.btnContainer}
                        icon={
                            <Icon
                                type="material-community"
                                iconStyle={styles.icon}
                                name="account-multiple-check"
                            />
                        }
                        title=" Recomendaciones Sobre La Depresión"
                        onPress={() => navigation.navigate("Recomend")}
                    />
                    <Button
                        buttonStyle={styles.buttonScreen}
                        containerStyle={styles.btnContainer}
                        icon={
                            <Icon
                                type="material-community"
                                iconStyle={styles.icon}
                                name="cellphone-information"
                            />
                        }
                        title=" Acerca De La Aplicación"
                        onPress={() => navigation.navigate("Information")}
                    />
                    <Button
                        buttonStyle={styles.buttonScreen}
                        containerStyle={styles.btnContainer}
                        icon={
                            <Icon
                                type="material-community"
                                iconStyle={styles.icon}
                                name="badge-account-horizontal"
                            />
                        }
                        title=" Mi Cuenta"
                        onPress={() => navigation.navigate("Account")}
                    />
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9",
    },
    buttonScreen: {
        textAlign: "center",
        marginTop: 10,
        backgroundColor: "#0c7cfc",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 50
    },
    icon: {
        color: "white",
        alignItems: "center"
    },
    btnContainer: {
        marginTop: 10,
        width: "90%",
        alignSelf: "center"
    },
})