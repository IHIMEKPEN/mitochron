import { Types, Document } from 'mongoose';



export interface IMessage extends Document {
  _id?: Types.ObjectId;
  userID: any;
  message: string;
 

}
