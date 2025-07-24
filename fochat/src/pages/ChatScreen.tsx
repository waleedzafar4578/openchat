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
  const [dateHandler, setdateHandler] = useState<Date | null>(null);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [message, setMessage] = useState<singleMessage[]>([]);
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
            name={String(sms.id)}
            color={"#FFF9E5"}
            sms={sms.sms}
            time={new Date(sms.created_at)}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatScreen;
