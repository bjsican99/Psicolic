import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { map } from 'lodash';
import { Icon, ListItem } from 'react-native-elements';

import Modal from '../Modal';
import DisplayApp from './DisplayApp';
import DisplayAyuda from './DisplayAyuda';
import DisplayDiagnostico from './DisplayDiagnostico';
import DisplayDepresion from './DisplayDepresion';

export default function InformationOption() {

    const [showModal, setShowModal] = useState(false)
    const [renderCoponent, setRenderCoponent] = useState(null)

    //arreglo de objetos
    const generateOptions = () => {
        return [
            {
                title: "Acerca De La App.",
                iconNameLeft: "information",
                iconColorLeft: "#3498DB",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("App")
            },
            {
                title: "No Reemplazo la ayuda profesional.",
                iconNameLeft: "account-multiple",
                iconColorLeft: "#48C9B0",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("ayuda")
            },
            {
                title: "No Determino un Diagnostico.",
                iconNameLeft: "medical-bag",
                iconColorLeft: "#EC7063",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("diagnostico")
            },
            {
                title: "La Depresión.",
                iconNameLeft: "hospital-box",
                iconColorLeft: "#F1C40F",
                iconNameRight: "chevron-right",
                iconColorRight: "#17202A",
                onPress: () => selectedComponent("diagnostico")
            }
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "App":
                setRenderCoponent(
                    <DisplayApp/>
                )
                break;
            case "ayuda":
                setRenderCoponent(
                    <DisplayAyuda/>
                )
                break;
            case "diagnostico":
                setRenderCoponent(
                    <DisplayDiagnostico/>
                );
                break;
            case "diagnostico":
                setRenderCoponent(
                    <DisplayDepresion/>
                );
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions();

    return (
        <View style={styles.container}>
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
