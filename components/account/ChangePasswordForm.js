import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, result, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null);
    const [errorNewPassword, setErrorNewPassword] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    //cambiar el nombre del usuario.
    const onSubmit = async () => {
        if (!validateForm()) {
          return;
        }
    
        setLoading(true);
        const resultValidateCredential = await reauthenticate(currentPassword);
        if (!resultValidateCredential.statusResponse) {
          setErrorCurrentPassword("Contraseña Incorrecta");
          setLoading(false);
          return;
        }
    
        const resultUpdatePassword = await updatePassword(newPassword);
        setLoading(false);
        if (!resultUpdatePassword.statusResponse) {
          setErrorNewPassword("Hubo Un Problema Cambiando La Contraseña, Por Favor Intente Más Tarde.");
          return;
        }
    
        toastRef.current.show("Se Actualizo La contraseña.", 3000);
        setShowModal(false);
      };


    //Validar el correo y la contraseña
    const validateForm = () => {
        setErrorNewPassword(null);
        setErrorCurrentPassword(null);
        setErrorConfirmPassword(null);

        let isValid = true;

        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar la contraseña.");
            isValid = false;
        }

        if (size(newPassword) < 6) {
            setErrorNewPassword(
                "Debes ingresar una contraseña de al menos 6 caracteres."
            );
            isValid = false;
        }

        if (size(confirmPassword) < 6) {
            setErrorConfirmPassword(
                "Debes ingresar una contraseña de confirmacion de al menos 6 caracteres."
            );
            isValid = false;
        }

        if (!isEmpty(newPassword) && !isEmpty(confirmPassword)) {
            if (newPassword != confirmPassword) {
                setErrorNewPassword(
                    "La nueva contraseña y la confirmacion no son iguales."
                );
                setErrorConfirmPassword(
                    "La nuevo contraseña y la confirmacion no son iguales."
                );
                isValid = false;
            }
        }

        if (!isEmpty(newPassword) && !isEmpty(currentPassword)) {
            if (newPassword === currentPassword) {
                setErrorCurrentPassword(
                    "La nueva contraseña y la actual deben ser diferente."
                );
                setErrorNewPassword(
                    "La nueva contraseña y la actual deben ser diferente."
                );
                setErrorConfirmPassword(
                    "La nueva contraseña y la actual deben ser diferente."
                );
                isValid = false;
            }
        }

        return isValid;
    };

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa Tú Contraseña Actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa Tú Nueva Contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa Tú Confirmación De Contraseña..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Contraseña."
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
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
