import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChildrenDocument = Children & Document;

@Schema({ timestamps: true, versionKey: false })
export class Children {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ enum: ['male', 'female'], required: true })
  gender: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
