
import axios, { isAxiosError } from "axios";
const url = "http://127.0.0.1:8000";


import type { GetMessagesResponse } from '../commons/chatModels';


export const getMessages = async (dateIndex = 0, messagesLimit = 0) => {
  try {
    const response = await axios.get<GetMessagesResponse>(`${url}/get?message_no=${messagesLimit}&dateIndex=${dateIndex}`);

    if (response.data.status === "success") {
      return response.data.data;
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
