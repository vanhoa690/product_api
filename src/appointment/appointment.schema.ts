import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true, versionKey: false })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Relative' })
  relativeId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ enum: ['confirmed', 'canceled', 'completed'], default: 'confirmed' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
