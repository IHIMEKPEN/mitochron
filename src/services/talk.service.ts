import { Injectable } from '@nestjs/common';
import {APP_NAME} from '../configs'
import {Attendee, Talk} from '../models'
import { AppError } from 'src/utils';
@Injectable()
export class TalkService {
public  async addTalk(data:any): Promise<any> {
    let talk=await Talk.create(data)
    return talk;
  }
  public  async addAttendee2Talk({attendeeID,password}:any,_id:string): Promise<any> {
    let talk=await Talk.findById(_id)
    if(!talk)throw new AppError(`no talk with id ${_id}`)
    if(talk.password!==password)throw new AppError(`wrong password`)
    await this.getAttendee(attendeeID)
    talk=await Talk.findByIdAndUpdate({_id},{
      $push:{
        attendee:attendeeID
        
      }
    },{new:true})
    return talk;
  }

  public  async addAttendee({email,name}:any): Promise<any> {
    let attendee=await Attendee.findOne({email})
    if(attendee)throw new AppError(`attendee with mail ${email} already exist`)
    attendee=await Attendee.create({email,name})
    return attendee;
  }

  public  async getAttendee(_id:string): Promise<any> {
    let attendee=await Attendee.findById(_id)
    if(!attendee)throw new AppError(`no attendee with id ${_id}`)
    return attendee;
  }

  public  async getAttendees(): Promise<any> {
    let attendees=await Attendee.find({})
    return attendees;
  }


  health(): string {
    return `${APP_NAME} APIs are running`;
  }
}
