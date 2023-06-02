import { TalkController } from '..';
import { TalkService } from "../../services";
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';

describe('TalkController', () => {
  let talkController: TalkController;
  let talkService: TalkService;

  beforeEach(() => {
    talkService = new TalkService(); // Create an instance of the talkService
    talkController = new TalkController(talkService); // Create an instance of the talkController with the talkService
  });
  describe('addTalk', () => {
    it('should add a talk and return the created talk', async () => {
      // Mock dependencies
      const mockRequest:Partial<IRequest> = {
        body: {
          email: 'oihimekpen@gmail.com',
          name: 'Mitrochron conference',
          password: 'MitrochronPassword'
        }
      };
      const mockResponse :Partial<IResponse>= {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockTalkService =jest.spyOn(talkService, 'addTalk');
      mockTalkService.mockResolvedValueOnce({ email: 'oihimekpen@gmail.com',
      name: 'Mitrochron conference',
      password: 'MitrochronPassword' });

      //  {
      //   addTalk: jest.fn().mockResolvedValue('createdTalk'),
      // };

      // Call the addTalk method
      await talkController.addTalk(mockRequest, mockResponse);
      // Check the expected behavior
      expect(mockTalkService).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'talk created',
        success: true,
        data: { talk: mockRequest.body },
      });
    });
  });
  describe('addAttendee2Talk', () => {
    it('should add an attendee to a talk and return the updated talk', async () => {
      // Mock dependencies
      const mockRequest:Partial<IRequest> = {
        body: {
          attendeeID:'64776dfa4748cd7d49703593',
          password: 'MitrochronPassword'
        },
        params:{ talkID: 'talk123' }
      };
      const mockResponse :Partial<IResponse>= {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      // const params= { talkID: 'talk123' }
      const mockTalkService =jest.spyOn(talkService, 'addAttendee2Talk');
      mockTalkService.mockResolvedValueOnce(mockRequest.body);


      // Call the addTalk method
      await talkController.addAttendee2Talk(mockRequest, mockResponse,mockRequest.params);
      // Check the expected behavior
      expect(mockTalkService).toHaveBeenCalledWith(mockRequest.body,mockRequest.params.talkID);
     expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'attendee added to talk',
        success: true,
        data: { talk: mockRequest.body },
      });
    });
  });

 

  // describe('addAttendee', () => {
  //   it('should add an attendee and return the added attendee', async () => {
  //     // Mock dependencies
  //     const mockRequest = { body: {} };
  //     const mockResponse = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const mockTalkService = {
  //       addAttendee: jest.fn().mockResolvedValue('addedAttendee'),
  //     };

  //     // Call the controller method
  //     await talkController.addAttendee(mockRequest, mockResponse, mockTalkService);

  //     // Check the expected behavior
  //     expect(mockTalkService.addAttendee).toHaveBeenCalledWith({});
  //     expect(mockResponse.status).toHaveBeenCalledWith(200);
  //     expect(mockResponse.json).toHaveBeenCalledWith({
  //       message: 'attendee added',
  //       data: { talk: 'addedAttendee' },
  //     });
  //   });
  // });

  // describe('getAttendees', () => {
  //   it('should retrieve attendees and return them', async () => {
  //     // Mock dependencies
  //     const mockRequest = {};
  //     const mockResponse = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const mockTalkService = {
  //       getAttendees: jest.fn().mockResolvedValue('attendees'),
  //     };

  //     // Call the controller method
  //     await talkController.getAttendees(mockRequest, mockResponse, mockTalkService);

  //     // Check the expected behavior
  //     expect(mockTalkService.getAttendees).toHaveBeenCalled();
  //     expect(mockResponse.status).toHaveBeenCalledWith(200);
  //     expect(mockResponse.json).toHaveBeenCalledWith({
  //       message: 'attendees fetched',
  //       data: { talk: 'attendees' },
  //     });
  //   });
  // });
});
