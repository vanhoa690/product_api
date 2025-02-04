import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = new this.doctorModel(createDoctorDto);
    return doctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const updatedDoctor = await this.doctorModel.findByIdAndUpdate(
      id,
      updateDoctorDto,
      { new: true },
    );
    if (!updatedDoctor) throw new NotFoundException('Doctor not found');
    return updatedDoctor;
  }

  async delete(id: string): Promise<void> {
    const result = await this.doctorModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Doctor not found');
  }
}
