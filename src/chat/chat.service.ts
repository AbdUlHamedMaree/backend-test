import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { SendMessageInput } from './chat.inputs';
import { ChatDocument, Chat } from './chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}
  addMessage = (
    message: SendMessageInput,
    senderId: Schema.Types.ObjectId,
    at: string,
  ) => {
    return new this.chatModel({ ...message, sender: senderId, at }).save();
  };
}
