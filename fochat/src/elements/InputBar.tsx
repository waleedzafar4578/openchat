import { useState } from "react";
import type { ChangeEvent } from "react"; 
import './elements.css'; 
import { sendSms } from "../services/chat";


function InputBar(){
  const syb = ">";
  const [smsText,setSmsText]=useState<string>("");
  const handleChange =(e: ChangeEvent<HTMLInputElement>)=>{
    setSmsText(e.target.value)
  }
  const sendMessage = async ()=>{
    const response =await sendSms(smsText);
    console.log(response)
  }
  
  return(
    <div className="inputbar-container">
      <input
        type="text"
        value={smsText}
        onChange={handleChange}
        className="input-bar"
        placeholder="Chalo! tum apni luch taalo."
          />
      <div className="inputbar-button-container">
        <div onClick={sendMessage} className="inputbar-button">{syb}</div>  
      </div>
    </div>
  )
}

export default InputBar;
