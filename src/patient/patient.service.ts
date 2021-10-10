import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  ListPatientInput,
  UpdatePatientInput,
  CreatePatientInput,
} from './patient.inputs';
import { PatientDocument, Patient } from './patient.model';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private personModel: Model<PatientDocument>,
  ) {}

  create(payload: CreatePatientInput) {
    const createdPatient = new this.personModel(payload);
    return createdPatient.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(_id).exec();
  }

  list(filters: ListPatientInput) {
    return this.personModel.find({ ...filters }).exec();
  }

  update(payload: UpdatePatientInput) {
    return this.personModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id).exec();
  }
}
