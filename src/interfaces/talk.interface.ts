import { Types, Document } from 'mongoose';



export interface ITalk extends Document {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  attendee:string[]

  

}
export interface IAttendee extends Document {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  talkID:Types.ObjectId
  

}
