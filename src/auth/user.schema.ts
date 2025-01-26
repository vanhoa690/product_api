import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop([
    {
      _id: { type: Types.ObjectId, auto: true },
      name: { type: String, required: true },
      birthdate: { type: Date, required: true },
      gender: { type: String, enum: ['male', 'female'], required: true },
    },
  ])
  children: {
    _id: Types.ObjectId;
    name: string;
    birthdate: Date;
    gender: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
