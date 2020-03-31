import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User
})
@ApiTags('用户')
@Controller('users')
export class UsersController {
  // 模型类
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  option() {
    return {
      title: "用户管理",
      column: [
        { label: "用户", prop: "username" },
      ]
    }
  }
}

