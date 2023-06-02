import { Injectable } from '@nestjs/common';
import { APP_NAME } from '../configs'
import { Attendee, Talk } from '../models'
import { AppError } from '../utils';

@Injectable()
export class TalkService {

/**
   * @method addTalk
   * @param data
   */
  public async addTalk(data: any): Promise<any> {
    let talk = await Talk.findOne({ email: data.email })
    if (talk) throw new AppError(`talk with host mail '${data.email}' already exist`)
    data.name=data.name+' '+'(HOST)'
    talk = await Talk.create(data)
    let attendee=await this.addAttendee({email:data.email,name:data.name})
    await this.addAttendee2Talk({
      attendeeID:attendee._id,
      password:data.password,

    },String(talk._id))
    return talk;
  }

  /**
   * @method getTalks
   */
  public async getTalks(): Promise<any> {
    let talks = await Talk.find({  })
    return talks;
  }

    /**
   * @method removeTalk
   * @param id string
   */
  public async removeTalk(id: string): Promise<any> {
    await this.getTalk(id)
    let talk = await Talk.findByIdAndDelete(id)
    return talk;
  }

    /**
   * @method getAttendeesInTalk
   * @param id string
   */
  public async getAttendeesInTalk(id: string): Promise<any> {
    await this.getTalk(id)
    let attendees = await Attendee.find({talkID:id})
    
    return attendees ;
  }

  public async addAttendee2Talk({ attendeeID, password }: any, _id: string): Promise<any> {
    let talk = await Talk.findById(_id)
    if (!talk) throw new AppError(`no talk with id ${_id}`)
    if (talk.password !== password) throw new AppError(`wrong password`)
    await this.getAttendee(attendeeID)
    talk = await Talk.findByIdAndUpdate({ _id }, {
      $push: {
        attendee: attendeeID

      }
    }, { new: true })
    await Attendee.findOneAndUpdate({_id:attendeeID},{talkID:_id},{new:true})
    return talk;
  }

  public async addAttendee({ email, name }: any): Promise<any> {
    let attendee = await Attendee.findOne({ email })
    if (attendee) throw new AppError(`attendee with mail ${email} already exist`)
    attendee = await Attendee.create({ email, name })
    return attendee;
  }

  public async getAttendee(_id: string): Promise<any> {
    let attendee = await Attendee.findById(_id)
    if (!attendee) throw new AppError(`no attendee with id ${_id}`)
    return attendee;
  }
  public async getAttendeebyEmail(email: any): Promise<any> {
    let attendee = await Attendee.findOne({ email })
    if (!attendee) throw new AppError(`no attendee with email${email}`)
    return attendee;
  }
  public async getTalk(_id: string): Promise<any> {
    let talk = await Talk.findById(_id)
    if (!talk) throw new AppError(`no talk with id ${_id}`)
    return talk;
  }

  public async getAttendees(): Promise<any> {
    let attendees = await Attendee.find({})
    return attendees;
  }


  health(): string {
    return `${APP_NAME} APIs are running`;
  }
}
