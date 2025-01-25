import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = new this.expenseModel(createExpenseDto);
    return expense.save();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().populate('userId appointmentId').exec();
  }

  async findById(id: string): Promise<Expense> {
    const expense = await this.expenseModel
      .findById(id)
      .populate('userId appointmentId')
      .exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const updated = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Expense not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Expense not found');
    }
  }
}
