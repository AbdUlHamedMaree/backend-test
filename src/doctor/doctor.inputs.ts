import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema, Schema } from 'mongoose';

@InputType()
class Base {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  specialty: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  avatar: Schema.Types.ObjectId;
}

@InputType()
export class CreateDoctorInput extends Base {}

@InputType()
export class ListDoctorInput extends PartialType(Base) {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdateDoctorInput extends PartialType(Base) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
