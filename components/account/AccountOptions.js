import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { map } from 'lodash';
import { Icon, ListItem } from 'react-native-elements';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions({ user, toastRef, setReloadUser }) {

    const [showModal, setShowModal] = useState(false)
    const [renderCoponent, setRenderCoponent] = useState(null)

    //arreglo de objetos
    const generateOptions = () => {
        return [
            {
                title: "Cambiar Nombres y Apellidos.",
                iconNameLeft: "account-circle",
                iconColorLeft: "#52BE80",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Correo.",
                iconNameLeft: "at",
                iconColorLeft: "#2980B9",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Cambiar Contraseña.",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#DC7633",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("password")
            }
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderCoponent(
                    <ChangeDisplayNameForm
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderCoponent(
                    <ChangeEmailForm
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderCoponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                );
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions();

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderCoponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3",
        width: "95%",
        alignSelf: "center",
        borderRadius: 50
    },
    container: {
        minHeight: "100%",
        backgroundColor: "#F2F4F4",
    },
})
