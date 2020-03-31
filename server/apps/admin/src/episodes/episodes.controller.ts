import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Course } from '@libs/db/models/course.model';
@Crud({
  model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModule: ReturnModelType<typeof Course>
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModule.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    return {
      title: "课时管理",
      translate: false,
      column: [
        { prop: "name",  label: "课时名称",span: 24},
        { prop: "course", label: "所属课程", type: 'select', dicData: courses, row: true },
        { prop: "file",  label: "视频文件",width: 100, span: 24, type: 'upload', action: '/upload', listType: 'picture-img'},
      ]
    }
  }
}
