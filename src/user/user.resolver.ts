import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';
import { RegisterDoctorInput, RegisterPatientInput } from './user.inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async registerDoctor(@Args('payload') payload: RegisterDoctorInput) {
    return this.userService.registerDoctor(payload);
  }

  @Mutation(() => User)
  async registerPatient(@Args('payload') payload: RegisterPatientInput) {
    return this.userService.registerPatient(payload);
  }
}
