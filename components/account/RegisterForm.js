import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { validateEmail } from '../../utils/helpers'
import { size } from 'lodash'


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorConfEmail, setErrorConfEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const registerUser = () => {
        if (!validateData()) {
            return;
        }
        console.log("Funciono...")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorConfEmail("")
        setErrorPassword("")
        setErrorConfirm("")

        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email Valido.")
            isValid = false
        }

        if(size(formData.password) < 6){
            setErrorPassword("Debes ingresar una conraseña de al menos 6 carácteres.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.from}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa Tu Correo..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma Tu Correo..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorConfEmail}
                defaultValue={formData.confemail}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={<Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={<Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />}
            />
            <Button
                title="Registrar Nuevo Usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => registerUser}
            />
        </View>
    )
}
const defaultFormValues = () => {
    return {
        email: "",
        confemail: "",
        password: "",
        confirm: ""
    }
}

const styles = StyleSheet.create({
    from: {
        marginTop: 30,
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center",
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
