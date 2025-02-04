import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Relative, RelativeDocument } from './relative.schema';
import { CreateRelativeDto, UpdateRelativeDto } from './relative.dto';
import { User, UserDocument } from '../auth/user.schema';

@Injectable()
export class RelativeService {
  constructor(
    @InjectModel(Relative.name) private relativeModel: Model<RelativeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createRelativeDto: CreateRelativeDto): Promise<Relative> {
    const { userId, ...relativeData } = createRelativeDto;

    // Tạo đứa trẻ mới
    const relative = new this.relativeModel({ ...relativeData, userId });
    const savedRelative = await relative.save();

    // Cập nhật thông tin user với đứa trẻ mới
    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { relative: savedRelative._id } },
      { new: true },
    );

    return savedRelative;
  }

  async findAll(): Promise<Relative[]> {
    return this.relativeModel.find().populate('userId').exec();
  }

  async findById(id: string): Promise<Relative> {
    const relative = await this.relativeModel
      .findById(id)
      .populate('userId')
      .exec();
    if (!relative) {
      throw new NotFoundException('Relative not found');
    }
    return relative;
  }

  async update(
    id: string,
    updateRelativeDto: UpdateRelativeDto,
  ): Promise<Relative> {
    const updated = await this.relativeModel
      .findByIdAndUpdate(id, updateRelativeDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Relative not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const relative = await this.relativeModel.findByIdAndDelete(id).exec();
    if (!relative) {
      throw new NotFoundException('Relative not found');
    }

    // Xóa đứa trẻ khỏi danh sách relative của user
    await this.userModel.findByIdAndUpdate(relative.userId, {
      $pull: { relative: relative._id },
    });
  }
}
