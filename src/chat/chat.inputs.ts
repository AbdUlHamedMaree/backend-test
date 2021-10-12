import { Field, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  receiver: Schema.Types.ObjectId;
}
