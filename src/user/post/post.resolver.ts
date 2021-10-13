import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Post } from './post.model';
import { PostService } from './post.service';
import { CreatePostInput, ListPostInput, UpdatePostInput } from './post.inputs';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/role/role.decorator';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post)
  async post(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.postService.getById(_id);
  }

  @Query(() => [Post])
  async posts(@Args('filters', { nullable: true }) filters?: ListPostInput) {
    return this.postService.list(filters);
  }

  @UseGuards(GqlAuthGuard)
  @Roles('doctor')
  @Mutation(() => Post)
  async createPost(@Args('payload') payload: CreatePostInput) {
    return this.postService.create(payload);
  }

  @UseGuards(GqlAuthGuard)
  @Roles('doctor')
  @Mutation(() => Post)
  async updatePost(@Args('payload') payload: UpdatePostInput) {
    return this.postService.update(payload);
  }

  @UseGuards(GqlAuthGuard)
  @Roles('doctor')
  @Mutation(() => Post)
  async deletePost(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.postService.delete(_id);
  }
}
