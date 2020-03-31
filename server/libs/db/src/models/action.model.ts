import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { User } from './user.model'
import { Course } from './course.model'
import { Episode } from './episode.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Action {
  // 用户
  @prop({ref: 'User'})
  user: Ref<User>

  // 收藏的什么课程 | 书。。。
  @prop({enum: ['Course', 'Episode']})
  type: string

  // 收藏对象根据收藏的类型关联
  @prop({refPath: 'type'})
  object: Ref<Course|Episode>

  // 操作，收藏。踩。顶等
  @prop({enum: ['like', 'upvote']})
  name: string
}