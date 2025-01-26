import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildrenDto, UpdateChildrenDto } from './children.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildrenDto: CreateChildrenDto) {
    return this.childrenService.create(createChildrenDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.childrenService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateChildrenDto: UpdateChildrenDto,
  ) {
    return this.childrenService.update(id, updateChildrenDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.childrenService.delete(id);
  }
}
