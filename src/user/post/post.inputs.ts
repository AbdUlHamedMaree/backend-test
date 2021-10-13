import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
class Base {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  cover: Schema.Types.ObjectId;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  type: 'new' | 'tip';
}

@InputType()
export class CreatePostInput extends Base {}

@InputType()
export class ListPostInput extends PartialType(Base) {
  @Field(() => String, { nullable: true })
  _id?: Schema.Types.ObjectId;
}

@InputType()
export class UpdatePostInput extends PartialType(Base) {
  @Field(() => String)
  _id: Schema.Types.ObjectId;
}
