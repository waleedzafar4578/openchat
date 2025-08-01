// import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import './pages.css';
import Message from '../components/Message';
import DateCard from '../components/DateCard';
import { getMessages } from '../services/chat';
import type { singleMessage } from '../commons/chatModels';
import InputBar from '../elements/InputBar';
// import { connectWebSocket } from "../services/chat";
import { WebSocketContext } from '../context/WsContext';


interface Message {
  name: string;
  color: string;
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

  const { messages } = context;


  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])

  useEffect(() => {
    if (dateIndex === 0) {
      setMessage((prev) => [...prev, messages])
    }
  }, [messages]);

  // useEffect(() => {
  //   connectWebSocket((message) => {
  //     setMessage((prev) => [...prev, message])
  //   });
  // }, [smsCount]);


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
      {dateHandler != null && (
        <DateCard
          date={dateHandler.toDateString()}
          prevDate={() => setDateIndex(dateIndex + 1)}
          nextDate={() => setDateIndex(dateIndex - 1)}
        />
      )}
      <div className="chatscreen-container-messages">
        {message.map((sms, index) => (
          <Message
            key={index}
            name={sms?.name}
            color={"#FFF9E5"}
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
