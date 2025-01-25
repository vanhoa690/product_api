import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true, versionKey: false })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  childId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({
    type: {
      name: { type: String, required: true },
      specialty: { type: String, required: true },
      clinic: { type: String, required: true },
    },
    required: true,
  })
  doctor: {
    name: string;
    specialty: string;
    clinic: string;
  };

  @Prop({ enum: ['confirmed', 'canceled', 'completed'], default: 'confirmed' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
