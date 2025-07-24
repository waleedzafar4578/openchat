
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
