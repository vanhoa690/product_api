import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { validateObjectId } from 'src/utils';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    validateObjectId(id);
    return this.expenseService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    validateObjectId(id);
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    validateObjectId(id);
    return this.expenseService.delete(id);
  }
}
