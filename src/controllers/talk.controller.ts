import { Request, Response, Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { TalkService } from '../services';
// import { ITalk } from '../interfaces';
import { httpResponse } from '../utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';

@Controller()
export class TalkController {
  constructor(private readonly talkService: TalkService) { }

  /**
   * @method addTalk
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Post('/api/v1/talk/create')
  async addTalk(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>,): Promise<void> {
    let talk = await this.talkService.addTalk(req.body);
    res.status(200)
      .json(httpResponse('talk created', { talk }));
  }

  /**
   * @method getTalks
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Get('/api/v1/talk')
  async getTalks(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>,): Promise<void> {
    let talks = await this.talkService.getTalks();
    res.status(200)
      .json(httpResponse('talks fetched', { talks }));
  }

   /**
   * @method removeTalk
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Delete('/api/v1/talk/:talkID')
  async removeTalk(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>): Promise<void> {
    let talk = await this.talkService.removeTalk(req.params.talkID);
    res.status(200)
      .json(httpResponse('talk removed', { talk }));
  }

   /**
   * @method addAttendee2Talk
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Post('/api/v1/talk/attendee/:talkID')
  async addAttendee2Talk(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>): Promise<void> {
    let talk = await this.talkService.addAttendee2Talk(req.body, req.params.talkID);
    res.status(200)
      .json(httpResponse('attendee added to talk', { talk }));
  }
   /**
   * @method getAttendeesInTalk
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Get('/api/v1/talk/attendee/:talkID')
  async getAttendeesInTalk(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>): Promise<void> {
    let attendees = await this.talkService.getAttendeesInTalk(req.params.talkID);
    res.status(200)
      .json(httpResponse('attendees fetched', { attendees }));
  }

   /**
   * @method addAttendee
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Post('/api/v1/attendee')
  async addAttendee(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>): Promise<void> {
    let talk = await this.talkService.addAttendee(req.body);
    res.status(200)
      .json(httpResponse('attendee added', { talk }));
  }

   /**
   * @method getAttendees
   * @param {Request} req - express request object
   * @param {Response} res - express response object
   */
  @Get('/api/v1/attendee')
  async getAttendees(@Request() req: Partial<IRequest>, @Response() res: Partial<IResponse>): Promise<void> {
    let talk = await this.talkService.getAttendees();
    res.status(200)
      .json(httpResponse('attendees fetched', { talk }));
  }

}
