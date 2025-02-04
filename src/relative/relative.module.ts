import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Relative, RelativeSchema } from './relative.schema';
import { RelativeService } from './relative.service';
import { RelativeController } from './relative.controller';
import { User, UserSchema } from '../auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relative.name, schema: RelativeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [RelativeController],
  providers: [RelativeService],
})
export class RelativeModule {}
