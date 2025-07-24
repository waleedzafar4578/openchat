import React from 'react';
import { useEffect, useState } from 'react';
import './pages.css';
import Message from '../components/Message';
import DateCard from '../components/DateCard';
import { getMessages } from '../services/chat';
import type { singleMessage } from '../commons/chatModels';

interface Message {
  name: string;
  color: string;
  sms: string;
  time: Date;
}
function ChatScreen() {
  const dateHandler: Date = new Date();
  const [message, setMessage] = useState<singleMessage[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(0, 0);
      console.log(response);
      if (response != null) {
        setMessage(response)
      }

    }

    fetchMessages();
  }, []);


  return (
    <div className="chatscreen-container">
      <DateCard date={dateHandler.toDateString()} />
      <div className="chatscreen-container-messages">
        {message.map((sms, index) => (
          <Message
            key={index}
            name={String(sms.id)}
            color={"#000"}
            sms={sms.sms}
            time={new Date(sms.created_at)}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatScreen;
