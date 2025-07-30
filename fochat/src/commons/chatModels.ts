
type Status = "success" | "failed";

interface singleMessage{
  name:string;
  sms:string;
  created_at:string;
}


interface GetMessagesResponse {
  data: singleMessage[];
  dataDate: any;
  status: Status;
}



export type {GetMessagesResponse,singleMessage}
