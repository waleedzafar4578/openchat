
import axios, { isAxiosError } from "axios";
const url = import.meta.env.VITE_API_LOCAL_URL;


import type { GetMessagesResponse } from '../commons/chatModels';


export const getMessages = async (dateIndex = 0, messagesLimit = 0) => {
  try {

    console.log(url)
    const response = await axios.get<GetMessagesResponse>(`${url}/get?message_no=${messagesLimit}&dateIndex=${dateIndex}`);

    if (response.data.status === "success") {
      return response.data;
    } else {
      return null;
    }


  } catch (error: any) {
    if (isAxiosError(error)) {
      console.log(error.message)
    } else {
      console.log("Somethings wrong!", error)
    }
  }
  return null;
}


export const sendSms = async (userSms: string) => {

  try {
    const response = await axios.get(`${url}/send?userSms=${userSms}`);
    console.log(response)
  } catch (error: any) {
    console.log(error)
  }
  return null;
}

type Callback = (message: any) => void;
let socket: WebSocket | null = null;

export const connectWebSocket = (onMessage: Callback) => {
  if (socket === null) {
    console.log("-Where start to connect with server using websocket!-")
    const wsUrl = url.replace(/^http/, "ws");
    let userInfo = localStorage.getItem("userInfo");
    console.log("[userInfo]:", userInfo)

    if (userInfo) {
      socket = new WebSocket(`${wsUrl}/ws/chat?userInfo=${userInfo}`);
    } else {
      socket = new WebSocket(`${wsUrl}/ws/chat`);
    }
  }

  socket.onopen = () => {
    console.log("✅ WebSocket connected!");
  };

  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log("[OnMessage]:", data);
    if (data.type === "userInfo") {
      let userInfo = data.userInfo;
      localStorage.setItem("userInfo", userInfo);
    }
    else {
      onMessage(data);
    }
  };

  socket.onclose = () => {
    // localStorage.removeItem("userInfo");
    // socket = null;
    console.log("❌ WebSocket closed!");
  };

  socket.onerror = (err: Event) => {
    console.error("WebSocket error:", err);
  };
};

export const send_sms_ws = (message: string) => {
  // console.log("inside the send sms");
  if (socket && socket.readyState === WebSocket.OPEN) {
    // console.log("ready for sending sms")
    let userInfo = localStorage.getItem("userInfo");
    let request = {
      "sms": message,
      "userInfo": userInfo
    };
    console.log("[Requested Data]:", request);
    socket.send(JSON.stringify(request));
  } else {
    console.warn("Websocket not connected!")
  }
}
