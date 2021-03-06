import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

import { fileToBlob } from './helpers'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

//obtener usuario
export const getCurrentUser = () => {
    return firebase.auth().currentUser
}
//cerrar cesion
export const closeSession = () => {
    return firebase.auth().signOut()
}
//registrar un nuevo usuario
export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

//registrar un nuevo usuario
export const loginUser = async (email, password) => {
    const result = { statusResponse: true, error: null };

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = "Usuario o contrasena no validos.";
    }

    return result;
};

//metodod para subir las imagenes a firebase
export const uploadImage = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL();
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async (data) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const reauthenticate = async (password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credential)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const updateEmail = async (email) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const updatePassword = async (password) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const addDocumentWithoutId = async (collection, data) => {
    const result = { statusResponse: true, error: null }

    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getRecomends = async (limitRecomends) => {
    const result = { statusResponse: true, error: null, recomends:[], startRecomend: null }

    try {
        const response = await db
            .collection("recomend")
            .orderBy("createAt", "desc")
            .limit(limitRecomends)
            .get()
        if(response.docs.length > 0){
            result.startRecomend = response.docs[response.docs.length -1]
        }
        response.forEach((doc) => {
            const recomend = doc.data()
            recomend.id = doc.id
            result.recomends.push(recomend)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getMoreRecomends = async (limitRecomends, startRecomend) => {
    const result = { statusResponse: true, error: null, recomends:[], startRecomend: null }

    try {
        const response = await db
            .collection("recomend")
            .orderBy("createAt", "desc")
            .startAfter(startRecomend.data().createAt)
            .limit(limitRecomends)
            .get()
        if(response.docs.length > 0){
            result.startRecomend = response.docs[response.docs.length -1]
        }
        response.forEach((doc) => {
            const recomend = doc.data()
            recomend.id = doc.id
            result.recomends.push(recomend)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getDocumentById = async (collection, id) => {
    const result = { statusResponse: true, error: null, document: null }

    try {
        const responce = await db.collection(collection).doc(id).get()
        result.document = responce.data()
        result.document.id = responce.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}