import { useContext, useState } from "react";
import type { ChangeEvent } from "react";
import './elements.css';
import { WebSocketContext } from "../context/WsContext";

function InputBar({ doOnClick }: { doOnClick: () => void }) {
  const syb = ">";
  const [smsText, setSmsText] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSmsText(e.target.value)
  }

  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("WebSocket Valuse not provided!");
  }

  const { sendMessage } = context;

  const sendtoMessage = () => {
    if (smsText.trim()) {
      sendMessage(smsText);
      setSmsText("")
      doOnClick()
    }
  }
  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendtoMessage()
    }
  }
  return (
    <div className="inputbar-container">
      <textarea
        value={smsText}
        onChange={handleChange}
        className="input-bar"
        onKeyDown={handleKeydown}
        placeholder="Chalo! tum apni luch taalo."
      />
      {smsText.length < 100 && (
        <div className="inputbar-button-container">
          <div onClick={sendtoMessage} className="inputbar-button">{syb}</div>
        </div>
      )}
      <div className="word-counter" style={{
        width: `${smsText.length}%`,
        backgroundColor: smsText.length > 90 ? "#B9375D" : "#fff"
      }}>
      </div>
    </div>
  )
}

export default InputBar;
