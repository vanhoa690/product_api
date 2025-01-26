import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Children, ChildrenDocument } from './children.schema';
import { CreateChildrenDto, UpdateChildrenDto } from './children.dto';
import { User, UserDocument } from '../auth/user.schema';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel(Children.name) private childrenModel: Model<ChildrenDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createChildrenDto: CreateChildrenDto): Promise<Children> {
    const { userId, ...childData } = createChildrenDto;

    // Tạo đứa trẻ mới
    const child = new this.childrenModel({ ...childData, userId });
    const savedChild = await child.save();

    // Cập nhật thông tin user với đứa trẻ mới
    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { children: savedChild._id } },
      { new: true },
    );

    return savedChild;
  }

  async findAll(): Promise<Children[]> {
    return this.childrenModel.find().populate('userId').exec();
  }

  async findById(id: string): Promise<Children> {
    const child = await this.childrenModel
      .findById(id)
      .populate('userId')
      .exec();
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    return child;
  }

  async update(
    id: string,
    updateChildrenDto: UpdateChildrenDto,
  ): Promise<Children> {
    const updated = await this.childrenModel
      .findByIdAndUpdate(id, updateChildrenDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Child not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const child = await this.childrenModel.findByIdAndDelete(id).exec();
    if (!child) {
      throw new NotFoundException('Child not found');
    }

    // Xóa đứa trẻ khỏi danh sách children của user
    await this.userModel.findByIdAndUpdate(child.userId, {
      $pull: { children: child._id },
    });
  }
}
