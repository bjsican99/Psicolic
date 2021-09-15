import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, result } from 'lodash'

import { reauthenticate, updateEmail, updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    //cambiar el nombre del usuario.
    const onSubmit = async() => {
        if(!validateForm()){
            return 
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)
        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorPassword("Contraseña Incorrecta")
            return 
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)
        if(!resultUpdateEmail.statusResponse) {
            setErrorEmail("No Se Puede Cambiar Por Este correo, Ya Esta En uso Por Otro Usuario.")
            return 
        }

        setReloadUser(true)
        toastRef.current.show("Se Han Actualizado El Email.", 3000)
        setShowModal(false)
    }


    //Validar el correo y la contraseña
    const validateForm = () => {
        setErrorEmail(null);
        setErrorPassword(null);
        let isValid = true;
    
        if (!validateEmail(newEmail)) {
          setErrorEmail("Debes ingresar una cuenta de correo valida.");
          isValid = false;
        }
    
        if (newEmail === email) {
          setErrorEmail("Debes ingresar una cuenta de correo diferente a la actual.");
          isValid = false;
        }
    
        if (isEmpty(password)) {
          setErrorPassword("Debes ingresar la contraseña.");
          isValid = false;
        }
    
        return isValid;
      };

    return (
        <View style = {styles.view}>
            <Input
                placeholder = "Ingresa El Nuevo Correo..."
                containerStyle = {styles.input}
                defaultValue = {email}
                keyboardType="email-address"
                onChange = {(e)=> setNewEmail(e.nativeEvent.text)}
                errorMessage = {errorEmail}
                rightIcon = {{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder = "Ingresa Tú contraseña..."
                containerStyle = {styles.input}
                defaultValue = {password}
                onChange = {(e)=> setPassword(e.nativeEvent.text)}
                errorMessage = {errorPassword}
                password = {true}
                secureTextEntry = {!showPassword}
                rightIcon = {
                    <Icon
                        type="material-community"
                        name= { showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle = {{color: "#c2c2c2"}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title = "Cambiar Correo."
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {onSubmit}
                loading = {loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width: "95%",
    },
    btn: {
        backgroundColor: "#442484",
    }
})
