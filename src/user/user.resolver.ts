import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';
import {
  ListDoctorInput,
  RegisterDoctorInput,
  RegisterPatientInput,
} from './user.inputs';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { Roles } from 'src/role/role.decorator';
import { Schema } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() { _id }: User) {
    return this.userService.findById(_id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  @Roles('patient')
  async addDoctorToFavorites(
    @CurrentUser() { _id }: User,
    @Args('doctorId', { type: () => String }) doctorId: string,
  ) {
    return this.userService.addDoctorToFavorites(
      _id,
      new Schema.Types.ObjectId(doctorId),
    );
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  @Roles('patient')
  async removeDoctorToFavorites(
    @CurrentUser() { _id }: User,
    @Args('doctorId', { type: () => String }) doctorId: string,
  ) {
    return this.userService.addDoctorToFavorites(
      _id,
      new Schema.Types.ObjectId(doctorId),
    );
  }

  @Query(() => [User])
  async doctors(
    @Args('filters', { nullable: true }) filters?: ListDoctorInput,
  ) {
    return this.userService.listDoctors(filters);
  }

  @Mutation(() => User)
  async registerDoctor(@Args('payload') payload: RegisterDoctorInput) {
    return this.userService.registerDoctor(payload);
  }

  @Mutation(() => User)
  async registerPatient(@Args('payload') payload: RegisterPatientInput) {
    return this.userService.registerPatient(payload);
  }
}
