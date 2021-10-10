import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Patient {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  phone: string;

  @Field(() => String)
  @Prop()
  dateOfBirth: string;

  @Field(() => Int)
  @Prop()
  weight: number;

  @Field(() => Int)
  @Prop()
  height: number;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field(() => String)
  @Prop()
  bio: string;

  @Field(() => String)
  @Prop()
  code: string;
}

export type PatientDocument = Patient & Document;

export const PatientSchema = SchemaFactory.createForClass(Patient);
