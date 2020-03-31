import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';


@Module({
  imports: [
    CommonModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
    // 此处后期使用线上，需要设置成MulterModule.registerAsync
    MulterModule.register({
    dest: 'uploads'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
