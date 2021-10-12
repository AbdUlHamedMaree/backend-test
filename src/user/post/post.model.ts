import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { FileModel } from 'src/upload-file/file.model';

@ObjectType()
@Schema()
export class Post {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => FileModel)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: FileModel.name,
  })
  cover: MongooseSchema.Types.ObjectId | FileModel;

  @Field(() => [String])
  @Prop()
  tags: string[];

  @Field(() => String)
  @Prop({ enum: ['new', 'tip'] })
  type: 'new' | 'tip';
}

export type PostDocument = Post & Document;

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('find', function () {
  this.populate('cover');
});

PostSchema.post('save', (doc, next) => {
  doc.populate('cover').then(() => {
    next();
  });
});

export { PostSchema };
