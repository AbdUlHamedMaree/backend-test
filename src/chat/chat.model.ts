import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.model';

@ObjectType()
@Schema()
export class Chat {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => String)
  @Prop()
  at: string;

  @Field(() => User)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  sender: User | MongooseSchema.Types.ObjectId;

  @Field(() => User)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  receiver: User | MongooseSchema.Types.ObjectId;
}

export type ChatDocument = Chat & Document;

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.pre('find', function () {
  this.populate('receiver').populate('sender');
});

export { ChatSchema };
