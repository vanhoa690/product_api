import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  clinicAddress: string;

  @Prop({ type: [String], default: [] }) // Mảng lưu các khung giờ làm việc
  schedule: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
