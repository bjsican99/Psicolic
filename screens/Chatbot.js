import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../utils/env'


const avatarBot = require('../assets/avatar-default.jpg')
const BOT = {
    _id: 2,
    name: 'Psicolic',
    avatar: avatarBot
}

class Chatbot extends Component {
    state = {
        messages: [
            //mensajes de forma automatizada.
            {
                _id: 2,
                text: 'Mi Nombre es: ',
                createdAt: new Date().getTime(),
                user: BOT
            },
            {
                _id: 1,
                text: 'Hola Mucho Gusto....',
                createdAt: new Date().getTime(),
                user: BOT
            }
        ]
    }

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_SPANISH,
            dialogflowConfig.project_id,
        );
    }

    //consulta en dialogflow para mostrar la respuesta adecuada. 
    //consulta al dialogflow
    handleGoogleResponce(result) {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0]

        this.sendBotResponce(text);
    }


    //Recibe el texto que viene de dialogFlow, y lo muestra en pantalla.
    //No pasa por dialogFlow
    sendBotResponce(text) {

        let msg;
        if (text == 'Info') {
            msg = {
                _id: this.state.messages.length + 1,
                text: 'Decea Saber mas información.',
                //image: 'https://faros.hsjdbcn.org/sites/default/files/styles/ficha-contenido/public/nino-triste-faros-min.jpg?itok=HwIFI3iE',
                createdAt: new Date().getTime(),
                user: BOT
            };
        } else if (text == 'Mostrar Opciones') {
            msg = {
                _id: this.state.messages.length + 1,
                text: 'Acerca De Que Quiere Obtener Información',
                createdAt: new Date().getTime(),
                quickReplies: {
                    type: 'radio', // or 'checkbox',
                    keepIt: true,
                    values: [
                        {
                            title: 'Aplicación',
                            value: 'Aplicacion',
                            bColor: '#A0522D',
                            bgColor: '#A0522D',
                        },
                        {
                            title: 'Depresión',
                            value: 'Depresion',
                            bColor: '#7B68EE',
                            bgColor: '#7B68EE',
                        },
                    ],
                },
            };
        } else {
            msg = {
                _id: this.state.messages.length + 1,
                text,
                user: BOT
            };
        }

        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, [msg]),
        }))
    }

    onSend(messages = []) {
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, messages)
        }))

        let message = messages[0].text

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponce(result),
            (error) => console.log(error)
        )
    }

    onQuickReply(quickReply) {
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, quickReply)
        }))

        let message = quickReply[0].value

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponce(result),
            (error) => console.log(error)
        )
    }


    //estilos para las burbujas de mensajes

    renderBubble = (props) =>{
        return (
            <Bubble 
                {...props} 
                textStyle = {{
                    right: {color: 'white'},
                    left: {color: 'white'}
                }}
                wrapperStyle = {{
                    left: {backgroundColor: '#07396b'}, 
                    right: {backgroundColor: '#195da2'}
                }}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
                    renderBubble = {this.renderBubble}
                    user={{ _id: 1 }}
                />
            </View>
        )
    }
}


export default Chatbot;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#78b8f7'
    },

})