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

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
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
