import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true }
  }
})
export class Course {
  @ApiProperty({ description: '课程名称'})
  @prop()
  name: string

  @ApiProperty({ description: '封面图'})
  @prop()
  cover: string

  // arrayProp数组  Ref参考 itemsRef每个元素的参考 参数使用字符串，防止初始化获取控制
  @arrayProp({ 
    ref: 'Episode' ,
    localField: '_id',
    foreignField: 'course' })
  episodes: Ref<Episode>[];
}