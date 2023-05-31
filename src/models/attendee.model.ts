import { model, Schema } from 'mongoose';
import validator from 'validator';
import { ITalk } from '../interfaces';

const schema = new Schema<ITalk>({
  email: {
    type: String,
    required: [true, 'email field is required'],
    validate: [validator.isEmail, 'please provide a valid email address'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  name:String,

 


});




/** Added properties */

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });
schema.set('timestamps', { createdAt: true, updatedAt: true });
schema.set('id', false);

export const AttendeeModel = model<ITalk>('Attendee', schema);
