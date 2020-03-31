import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import {TypegooseModule} from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

const models = TypegooseModule.forFeature([User, Course, Episode])

@Global()
@Module({
  imports: [
    // 配置全局异步引用
    TypegooseModule.forRootAsync({
      useFactory(){
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        }
      }
    }),
    // TypegooseModule.forRoot('mongodb://localhost/topfullstack', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: true
    // }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
