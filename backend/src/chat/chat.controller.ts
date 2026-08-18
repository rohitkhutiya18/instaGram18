import { UseGuards, Injectable, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsguardGuard } from './wsguard/wsguard.guard';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';
import { AuthenticatedSocket } from './dto/authenticatedSocket.interface';
import { NotificationService } from 'src/notification/notification.service';
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsguardGuard)
@Injectable()
export class ChatGateWay implements OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly socketService: SocketService,
    private readonly notificationService: NotificationService,
  ) {}

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('register')
  @UseGuards(WsguardGuard)
  async register(@ConnectedSocket() client: Partial<AuthenticatedSocket>) {
    const userId = client.user?.id;

    if (!userId || !client.id) {
      return;
    }
    this.socketService.mapUser(userId, client.id);

    const conversationList = await this.chatService.getConversation(userId);

    this.server.to(client.id).emit('conversaction-list', conversationList);

    return {
      message: 'registered',
    };
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsguardGuard)
  async sendMessage(
    @ConnectedSocket() client: Partial<AuthenticatedSocket>,
    @MessageBody() payload: any,
  ) {
    const senderId = client.user?.id;
    const receiverId = payload.receiverId;

    console.log(payload);

    if (!receiverId) {
      throw new WsException('recever not found');
    }
    if (!senderId) {
      return;
    }

    const savedMessage = await this.chatService.createMessage(
      { message: payload.message },
      senderId,
      receiverId,
    );

    const findRecever = this.socketService.getClient(receiverId);
    const findSender = this.socketService.getClient(senderId);

    const message = {
      message: savedMessage.message,
      id: savedMessage.id,
      sender: savedMessage.sender.id,
      createdAt: savedMessage.createdAt,
      conversactionId: savedMessage.conversation,
    };

    if (findSender) {
      this.server.to(findSender).emit('newMessage', message);
    }

    if (!findRecever) {
      await this.notificationService.notifyMail(payload.reciverEmail);
    }

    if (findRecever) {
      this.server.to(findRecever).emit('newMessage', message);
    }
    return payload.message;
  }

  @SubscribeMessage('chat-history')
  @UseGuards(WsguardGuard)
  async getClinetList(
    @ConnectedSocket() clinet: Partial<AuthenticatedSocket>,
    @MessageBody() payload: any,
  ) {
    const userId = clinet.user?.id;
    const recever = payload?.receiverId;

    if (userId && recever) {
      const list = await this.chatService.getChatHistory(userId, recever);
      if (clinet.id) this.server.to(clinet.id).emit('get-chat-history', list);
    }
  }

  @UseGuards(WsguardGuard)
  handleDisconnect(@ConnectedSocket() client: Partial<AuthenticatedSocket>) {
    const userId = client.user?.id;
    if (!userId) {
      return;
    }
    return this.socketService.removeMapping(userId);
  }
}
