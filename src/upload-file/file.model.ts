import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class FileModel {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  path: string;

  @Field(() => String)
  @Prop()
  filename: string;

  @Field(() => String)
  @Prop()
  encoding: string;

  @Field(() => String)
  @Prop()
  mimetype: string;
}

export type FileDocument = FileModel & Document;

export const FileSchema = SchemaFactory.createForClass(FileModel);
