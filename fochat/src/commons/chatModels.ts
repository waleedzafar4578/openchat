
type Status = "success" | "failed";

interface singleMessage{
  id:number;
  sms:string;
  created_at:string;
}


interface GetMessagesResponse {
  data: singleMessage[];
  messages: string;
  status: Status;
}



export type {GetMessagesResponse,singleMessage}
