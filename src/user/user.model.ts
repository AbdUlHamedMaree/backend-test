import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { FileModel } from 'src/upload-file/file.model';

function isPatient(this: User) {
  return this.role === 'patient';
}

function isDoctor(this: User) {
  return this.role === 'doctor';
}

@ObjectType()
@Schema()
export class User {
  // shared
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  phone: string;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field(() => String)
  @Prop()
  bio: string;

  @Field(() => String)
  @Prop({ enum: ['doctor', 'patient'] })
  role: 'doctor' | 'patient';

  // patient
  @Field(() => String, { nullable: true })
  @Prop({ required: isPatient })
  dateOfBirth?: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: isPatient })
  weight?: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: isPatient })
  height?: number;

  @Field(() => String, { nullable: true })
  @Prop({ required: isPatient })
  code?: string;

  @Field(() => [User], { nullable: true })
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: User.name,
      required: isPatient,
      default: [],
    },
  ])
  favoriteDoctors?: MongooseSchema.Types.ObjectId[] | User[];

  // doctor
  @Field(() => String, { nullable: true })
  @Prop({ required: isDoctor })
  specialty?: string;

  @Field(() => FileModel, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: FileModel.name,
    required: isDoctor,
  })
  avatar?: MongooseSchema.Types.ObjectId | FileModel;
}

export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('find', function () {
  this.populate('avatar').populate('favoriteDoctors');
});

UserSchema.post('save', (doc, next) => {
  Promise.all([doc.populate('avatar'), doc.populate('favoriteDoctors')]).then(
    () => next(),
  );
});

export { UserSchema };
