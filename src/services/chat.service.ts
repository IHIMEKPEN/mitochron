import { Injectable } from "@nestjs/common";
import { Socket} from 'socket.io'
import { TalkService } from ".";
import { Message } from "src/models";

@Injectable()
export class ChatsService {
    private talkService=new TalkService()
    constructor() {}

    async getUserFromSocket(socket: Socket) {
      let user:any
      let email=socket.handshake.headers.email
        user= this.talkService.getAttendeebyEmail(email)
        return user;
    }

    async createMessage(message: string, email: string) {
    const newMessage = await Message.create({message, email})
       return newMessage
    }
    async getAllMessages() {
       return await Message.find().populate('userID')
    }
}
