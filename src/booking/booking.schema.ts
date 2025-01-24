import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interface Booking
export type BookingDocument = Booking & Document;

@Schema({ timestamps: true, versionKey: false })
export class Booking {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
