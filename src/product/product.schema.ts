import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interface Product
export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false }) // Thêm timestamps và loại bỏ _v
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
