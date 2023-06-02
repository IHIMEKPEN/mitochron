import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { ChatsService } from "../services";

@WebSocketGateway()
export class ChatGateway  {
  private readonly chatService=new ChatsService()
  @WebSocketServer()
  server: Server;

@SubscribeMessage('send_message')
listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
  console.log('handlemessage')
  //   let user=await this.chatService.getUserFromSocket(socket)
  //   // console.log(user)
  //  await this.chatService.createMessage(message,user.email)
    this.server.sockets.emit('receive_message', {message,});
  }

  @SubscribeMessage('get_all_messages')
    async getAllMessages(@ConnectedSocket() socket: Socket) {
       console.log('get all message')
        await this.chatService.getUserFromSocket(socket)
        const messages = await this.chatService.getAllMessages()

        this.server.sockets.emit('receive_message', messages);

        return messages
    }
    async handleConnection(socket: Socket) {
      console.log('handle connection')
      let user=await this.chatService.getUserFromSocket(socket)
      // console.log(user)
      this.server.sockets.emit('receive_message', `${user.name} has joined the talk`);
  }
}