
import { useContext, useEffect, useRef, useState } from 'react';
import './pages.css';
import Message from '../components/Message';
import DateCard from '../components/DateCard';
import { getMessages } from '../services/chat';
import type { singleMessage } from '../commons/chatModels';
import InputBar from '../elements/InputBar';
import { WebSocketContext } from '../context/WsContext';

interface Message {
  name: string;
  align: string;
  sms: string;
  time: Date;
}
function ChatScreen() {
  const [smsCount, setSmsCount] = useState<number>(0);
  const [dateHandler, setdateHandler] = useState<Date | null>(null);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [message, setMessage] = useState<singleMessage[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("Websocket Context is not provided!");
  };

  const { messages, userName, ws } = context;

  const displayNotification = (title: string | undefined, message: any) => {
    title = title === undefined ? "New message" : title;
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
        });
      } else if (Notification.permission === 'default' || Notification.permission === 'denied') {
        try {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification(title, {
                body: message,
              })
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      console.log("it not find Notificaion in window!")
    }
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])

  useEffect(() => {
    if (dateIndex === 0) {
      if (messages != null) {
        setMessage((prev) => [...prev, messages])
      }
    }
    if (ws != null) {
      if (document.visibilityState === 'hidden' || !document.hasFocus()) {
        displayNotification(messages?.name, messages?.sms)
      }
    }
  }, [messages]);


  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(dateIndex, 0);
      console.log(response);
      if (response != null) {
        setMessage(response.data)
        setdateHandler(new Date(response.dataDate))
      }

    }
    fetchMessages();
  }, [dateIndex]);


  return (
    <div className="chatscreen-container">
      <div className='chatscreen-container-date'>
        {dateHandler != null && (
          <DateCard
            date={dateHandler.toDateString()}
            prevDate={() => setDateIndex(dateIndex + 1)}
            nextDate={() => setDateIndex(dateIndex - 1)}
          />
        )}
      </div>
      <div className="chatscreen-container-messages">
        {message.map((sms, index) => (
          <Message
            key={index}
            name={sms?.name === userName ? "You" : sms?.name}
            align={userName === sms?.name ? "center" : "flex-end"}
            sms={sms?.sms}
            time={new Date(sms?.created_at)}
          />

        ))}
        <div ref={messageEndRef}></div>
      </div>
      {dateIndex === 0 && (
        <InputBar doOnClick={() => setSmsCount(smsCount + 1)} />
      )
      }
    </div>
  )
}

export default ChatScreen;
