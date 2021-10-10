import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './patient.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  providers: [PatientResolver, PatientService],
})
export class PatientModule {}
