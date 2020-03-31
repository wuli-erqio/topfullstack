import { Controller, Get, UploadedFile } from '@nestjs/common';
import { Course } from '@libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) { }

  @Get('option')
  option() {
    return {
      title: "课程管理",
      searchMenuSpan: 8,
      column: [
        { label: "课程名称", prop: "name", sortable:true, span: 24, search:true, regex: true, row: true },
        { label: "课程封面图", prop: "cover", type: "upload",width: 100, listType: "picture-img" , action: '/upload', row: true }
      ]
    }
  }
}
