import React from "react";
import './components.css';

interface MessageProps {
  name: string;
  color: string;
  sms: string;
  time: Date;
}

function Message({ name, color, sms, time }: MessageProps) {
  return (
    <div className="message-container" style={{ backgroundColor: color }}>
      <div className="message-container-header">
        <div> {name} </div>
        <div> {time.toLocaleTimeString()} </div>
      </div>
      <div className="message-container-body">
        <p>{sms}</p>
      </div>
    </div>
  )
}
export default Message;
