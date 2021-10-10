import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDoctorInput, RegisterPatientInput } from './user.inputs';
import { UserDocument, User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  registerDoctor(payload: RegisterDoctorInput) {
    return new this.userModel({ ...payload, role: 'doctor' }).save();
  }

  registerPatient(payload: RegisterPatientInput) {
    return new this.userModel({ ...payload, role: 'patient' }).save();
  }
}
