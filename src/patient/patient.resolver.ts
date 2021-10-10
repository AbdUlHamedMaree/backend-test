import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Patient } from './patient.model';
import { PatientService } from './patient.service';
import {
  CreatePatientInput,
  ListPatientInput,
  UpdatePatientInput,
} from './patient.inputs';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private patientService: PatientService) {}

  @Query(() => Patient)
  async patient(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.patientService.getById(_id);
  }

  @Query(() => [Patient])
  async patients(
    @Args('filters', { nullable: true }) filters?: ListPatientInput,
  ) {
    return this.patientService.list(filters);
  }

  @Mutation(() => Patient)
  async createPatient(@Args('payload') payload: CreatePatientInput) {
    return this.patientService.create(payload);
  }

  @Mutation(() => Patient)
  async updatePatient(@Args('payload') payload: UpdatePatientInput) {
    return this.patientService.update(payload);
  }

  @Mutation(() => Patient)
  async deletePatient(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.patientService.delete(_id);
  }
}
