import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Dialogflow_V2 } from 'react-native-dialogflow'
import ListShoes from './src/components/Shoes/ListShoes.js'
import { dialogflowConfig } from './env'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
}
 
export default function App() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Hi! I am the FAQ bot 🤖`,
      createdAt: new Date(),
      user: BOT_USER
    }
  ])

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    )
  }, [])

  const handleGoogleResponse = (result) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text)
  }

  const onSend = (message) => {
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, message);
    })
    let msg = message[0].text
    Dialogflow_V2.requestQuery(
      msg,
      result => handleGoogleResponse(result),
      error => console.log(error)
    )
  }
 
  const sendBotResponse = (text) => {
    let msg
    if(text == 'travel') {
      msg = {
        _id: messages.length + 1,
        text,
        image: 'https://i.ibb.co/kQ3wSfL/banner.png',
        createdAt: new Date(),
        user: BOT_USER
      }
    }else if(text === 'show options'){
      msg = {
        _id: messages.length + 1,
        text: 'Please choose your option',
        createdAt: new Date(),
        user: BOT_USER,
        isOptions: true,
        data: [
          {
            title: 'Adidas',
            image: 'https://i.ibb.co/VqGs4mp/3.png'
          },
          {
            title: 'Nike',
            image: 'https://i.ibb.co/94C6Ghv/1.png'
          },
          {
            title: 'Vans',
            image: 'https://i.ibb.co/WcY3K4B/2.png'
          }
        ]
      }
    }else {
      msg = {
        _id: messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      }
    }
  
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, [msg]);
    });
  }
 
  const renderBubble = (props) => {
    if (props.currentMessage.isOptions) {
    return (
      <ListShoes data={props.currentMessage.data} sendBotResponse={sendBotResponse}/>
      )
    }

    return (
      <Bubble 
        {...props}
      />
    )
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        user={{
          _id: 1
        }}
      />
    </SafeAreaProvider>
  )
}

