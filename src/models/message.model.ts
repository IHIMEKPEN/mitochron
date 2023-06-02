import { model, Schema,Types } from 'mongoose';
import validator from 'validator';
import { IMessage } from '../interfaces';

const schema = new Schema<IMessage>({
  userID: {
    type: Types.ObjectId,
    ref:'Attendee'
  },
  message:String,
  
});



/** Added properties */

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });
schema.set('timestamps', { createdAt: true, updatedAt: true });
schema.set('id', false);

export const MessageModel = model<IMessage>('Message', schema);
