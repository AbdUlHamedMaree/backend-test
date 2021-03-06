import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@InputType()
class Base {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  bio: string;
}

@InputType()
export class RegisterPatientInput extends Base {
  @Field(() => String)
  dateOfBirth: string;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  height: number;

  @Field(() => String)
  code: string;
}

@InputType()
export class RegisterDoctorInput extends Base {
  @Field(() => String)
  specialty: string;

  @Field(() => String)
  avatar: Schema.Types.ObjectId;
}

@InputType()
export class ListDoctorInput extends PartialType(Base) {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  specialty?: string;

  @Field(() => String, { nullable: true })
  avatar?: Schema.Types.ObjectId;
}
