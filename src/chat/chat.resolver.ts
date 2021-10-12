import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';

import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SendMessageInput } from './chat.inputs';
import { CurrentUser } from 'src/decorators/current-user';
import { User } from 'src/user/user.model';

const pubSub = new PubSub();

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Subscription(() => Chat, {
    filter: (payload, _, ctx) =>
      ctx.user?._id === payload.newMessage.receiver._id.toString(),
    resolve: (val) => val.newMessage,
  })
  async messageSended() {
    return pubSub.asyncIterator('messageSended');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  async sendMessage(
    @CurrentUser() user: User,
    @Args('message', { type: () => SendMessageInput })
    message: SendMessageInput,
  ) {
    const newMessage = await (
      await (
        await this.chatService.addMessage(
          message,
          user._id,
          new Date().toISOString(),
        )
      ).populate('sender')
    ).populate('receiver');
    pubSub.publish('messageSended', { newMessage });

    return newMessage;
  }
}
