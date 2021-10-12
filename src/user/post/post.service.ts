import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ListPostInput, UpdatePostInput, CreatePostInput } from './post.inputs';
import { PostDocument, Post } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private personModel: Model<PostDocument>,
  ) {}

  create(payload: CreatePostInput) {
    return new this.personModel(payload).save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(_id);
  }

  list(filters: ListPostInput) {
    return this.personModel.find({ ...filters });
  }

  update(payload: UpdatePostInput) {
    return this.personModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id);
  }
}
