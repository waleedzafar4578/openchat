
import './components.css';

interface MessageProps {
  name: string;
  align: string;
  sms: string;
  time: Date;
}

function Message({ name, align, sms, time }: MessageProps) {
  return (
    <div className='message-parent-container' style={{
      alignItems:align
    }}>
      <div className="message-container">
        <div className="message-container-header">
          <div> {name} </div>
          <div> {time.toLocaleTimeString()} </div>
        </div>
        <div className="message-container-body">
          <p className="item">{sms}</p>
        </div>
      </div>
    </div>
  )
}
export default Message;
