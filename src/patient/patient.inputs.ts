import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
class Base {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  code: string;
}

@InputType()
export class CreatePatientInput extends Base {}

@InputType()
export class ListPatientInput extends PartialType(Base) {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdatePatientInput extends PartialType(Base) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
