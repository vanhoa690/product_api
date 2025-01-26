import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Children, ChildrenSchema } from './children.schema';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { User, UserSchema } from '../auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Children.name, schema: ChildrenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
