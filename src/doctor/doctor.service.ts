import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  ListDoctorInput,
  UpdateDoctorInput,
  CreateDoctorInput,
} from './doctor.inputs';
import { DoctorDocument, Doctor } from './doctor.model';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private personModel: Model<DoctorDocument>,
  ) {}

  create(payload: CreateDoctorInput) {
    const createdDoctor = new this.personModel(payload);
    return createdDoctor.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(_id).exec();
  }

  list(filters: ListDoctorInput) {
    return this.personModel.find({ ...filters }).exec();
  }

  update(payload: UpdateDoctorInput) {
    return this.personModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id).exec();
  }
}
