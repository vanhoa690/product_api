import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { RelativeService } from './relative.service';
import { CreateRelativeDto, UpdateRelativeDto } from './relative.dto';
import { validateObjectId } from 'src/utils';

@Controller('relatives')
export class RelativeController {
  constructor(private readonly relativeService: RelativeService) {}

  @Post()
  create(@Body() createRelativeDto: CreateRelativeDto) {
    return this.relativeService.create(createRelativeDto);
  }

  @Get()
  findAll() {
    return this.relativeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    validateObjectId(id);
    return this.relativeService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRelativeDto: UpdateRelativeDto,
  ) {
    validateObjectId(id);
    return this.relativeService.update(id, updateRelativeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    validateObjectId(id);
    return this.relativeService.delete(id);
  }
}
