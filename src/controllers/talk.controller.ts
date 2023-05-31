import {Request,Response, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TalkService } from '../services';
// import { ITalk } from 'src/interfaces';
import { httpResponse } from 'src/utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';

@Controller()
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post('/api/v1/talk/create')
  async addTalk(  @Request() req:IRequest,@Response() res:IResponse,): Promise<void> {
    let talk= await this.talkService.addTalk(req.body);
    res.status(200)
      .json(httpResponse('talk created', { talk}));
  }

  @Post('/api/v1/talk/attendee/:talkID')
 async addAttendee2Talk( @Request() req:IRequest,@Response() res:IResponse, @Param() params:any): Promise<void> {
    let talk= await this.talkService.addAttendee2Talk(req.body,req.params.talkID);
    res.status(200)
      .json(httpResponse('attendee added to talk', { talk}));
  }
  @Post('/api/v1/attendee')
 async addAttendee( @Request() req:IRequest,@Response() res:IResponse, @Param() params:any): Promise<void> {
    let talk= await this.talkService.addAttendee(req.body);
    res.status(200)
      .json(httpResponse('attendee added', { talk}));
  }
  @Get('/api/v1/attendee')
 async getAttendees( @Request() req:IRequest,@Response() res:IResponse, @Param() params:any): Promise<void> {
    let talk= await this.talkService.getAttendees();
    res.status(200)
      .json(httpResponse('attendees fetched', { talk}));
  }
 
}
