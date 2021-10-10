import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { FileModel } from 'src/upload-file/file.model';

@ObjectType()
@Schema()
export class Doctor {
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
  specialty: string;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field(() => String)
  @Prop()
  bio: string;

  @Field(() => FileModel)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: FileModel.name })
  avatar: MongooseSchema.Types.ObjectId | FileModel;
}
export type DoctorDocument = Doctor & Document;

const DoctorSchema = SchemaFactory.createForClass(Doctor);

DoctorSchema.pre('find', function () {
  this.populate('avatar');
});

export { DoctorSchema };
