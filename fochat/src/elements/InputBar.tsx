import { useState } from "react";
import type { ChangeEvent } from "react";
import './elements.css';
import { send_sms_ws } from "../services/chat";


function InputBar({ doOnClick }: { doOnClick: () => void }) {
  const syb = ">";
  const [smsText, setSmsText] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSmsText(e.target.value)
  }
  const sendMessage = () => {
    if (smsText.trim()) {
      console.log(smsText, "Outgoing Text")
      send_sms_ws(smsText);
      setSmsText("")
      doOnClick()
    }
  }
  const handleKeydown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendMessage()
    }
  }
  return (
    <div className="inputbar-container">
      <input
        type="text"
        value={smsText}
        onChange={handleChange}
        className="input-bar"
        onKeyDown={handleKeydown}
        placeholder="Chalo! tum apni luch taalo."
      />
      <div className="inputbar-button-container">
        <div onClick={sendMessage} className="inputbar-button">{syb}</div>
      </div>
    </div>
  )
}

export default InputBar;
