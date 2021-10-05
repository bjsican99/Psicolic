import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../utils/env'

import { firebaseApp } from '../utils/firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'


const botAvatar = require('../assets/avatar-default.jpg')
const BOT = {
  _id: 2,
  name: 'Psicolic',
  avatar: botAvatar,
};

class Chatbot extends Component {
  state = {
    messages: [],
    id: 1,
    name: '',
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );

    const { name, id } = this.props.route.params;
    firebase.firestore(firebaseApp)
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .get()
      .then((snapshot) => {
        let messages = snapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: doc.text,
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name,
            };
          }
          return data;
        });

        if (messages.length > 0) {
          this.setState({ name, id, messages });
        } else {
          this.setState({
            name,
            id,
            messages: [
              {
                _id: 3,
                text: 'Para comenzar me gustaria realizar 4 preguntas sencillas del PHQ-4 Para evaluar sintomas depresivos\nQuieres comenzar?',
                createdAt: new Date().getTime(),
                user: BOT,
                quickReplies: {
                  type: 'radio', // or 'checkbox',
                  keepIt: true,
                  values: [
                    {
                      title: 'Si', value: 'PHQ-4SI',
                      bColor: 'black', bgColor: 'black',
                    },
                    {
                      title: 'No', value: 'PHQ-4NO',
                      bColor: '#7B68EE', bgColor: '#7B68EE',
                    },
                  ],
                },
              },
              {
                _id: 2,
                text: 'Si necesitas saber más sobre mi Escribe la palabra Ayuda, y con gusto te apoyare en lo que pueda.',
                createdAt: new Date().getTime(),
                user: BOT,
              },
              {
                _id: 1,
                text: `Hola, ${this.props.route.params.name}. Mi Nombre Es Psicolic\nSoy una inteligencia artificial creada para ayudar a detectar sintomas de depresión.`,
                createdAt: new Date().getTime(),
                user: BOT,
              },
            ],
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    let msg;

    //Opciones rapidas.
    if (text == 'Info') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Acerca De Que Quiere Obtener Información',
        createdAt: new Date().getTime(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'Aplicación', value: 'Aplicacion',
              bColor: 'black', bgColor: 'black',
            },
            {
              title: 'Depresión', value: 'Depresion',
              bColor: '#7B68EE', bgColor: '#7B68EE',
            },
            {
              title: 'Pruebas', value: 'Pruebas',
              bColor: '#7B68EE', bgColor: '#7B68EE',
            },
          ],
        },
      };
    } else if (text == 'ayuda') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Estas son las opciones que deberias de saber:',
        createdAt: new Date().getTime(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'Comandos', value: 'Comandos',
              bColor: 'black', bgColor: 'black',
            },
            {
              title: 'Depresión', value: 'Depresion',
              bColor: '#7B68EE', bgColor: '#7B68EE',
            },
            {
              title: 'Pruebas', value: 'Pruebas',
              bColor: '#7B68EE', bgColor: '#7B68EE',
            },
          ],
        },
      };
    }
    else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        user: BOT
      };
    }

    const { id } = this.props.route.params;

    firebase.firestore(firebaseApp)
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .add(msg);

    msg._id = this.state.messages.length + 1;

    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages),
    }));

    let text = messages[0].text;

    const { id, name } = this.props.route.params;

    firebase.firestore(firebaseApp)
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: 1,
          name: name,
        },
      });

    Dialogflow_V2.requestQuery(
      text,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }

  onQuickReply(quickReply) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, quickReply),
    }));

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }

  //estilos para las burbujas de mensajes

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: { color: 'white' },
          left: { color: 'white' }
        }}
        wrapperStyle={{
          left: { backgroundColor: '#07396b' },
          right: { backgroundColor: '#195da2' }
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
          renderBubble={this.renderBubble}
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
    backgroundColor: '#3e4144'
  },

})