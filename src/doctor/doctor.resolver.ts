import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';
import { CreateDoctorInput, ListDoctorInput } from './doctor.inputs';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private doctorService: DoctorService) {}

  @Query(() => Doctor)
  async doctor(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.doctorService.getById(_id);
  }

  @Query(() => [Doctor])
  async doctors(
    @Args('filters', { nullable: true }) filters?: ListDoctorInput,
  ) {
    return this.doctorService.list(filters);
  }

  @Mutation(() => Doctor)
  async registerDoctor(@Args('payload') payload: CreateDoctorInput) {
    return this.doctorService.create(payload);
  }

  // @Mutation(() => Doctor)
  // async updateDoctor(@Args('payload') payload: UpdateDoctorInput) {
  //   return this.doctorService.update(payload);
  // }

  // @Mutation(() => Doctor)
  // async deleteDoctor(
  //   @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  // ) {
  //   return this.doctorService.delete(_id);
  // }
}
