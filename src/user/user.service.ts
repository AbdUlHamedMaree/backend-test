import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import {
  ListDoctorInput,
  RegisterDoctorInput,
  RegisterPatientInput,
} from './user.inputs';
import { UserDocument, User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findById = (id: Schema.Types.ObjectId) => this.userModel.findById(id);

  findByPhone = (phone: string) => this.userModel.findOne({ phone });

  registerDoctor = (payload: RegisterDoctorInput) =>
    new this.userModel({ ...payload, role: 'doctor' }).save();

  registerPatient = (payload: RegisterPatientInput) =>
    new this.userModel({ ...payload, role: 'patient' }).save();

  listDoctors = (filters?: ListDoctorInput) => this.userModel.find({ filters });
}
