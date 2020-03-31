import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 静态文件托管，如使用阿里云之类的线上不需要指定类型
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 此局代码可以控制跨域
  app.enableCors();
  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('全栈之巅-前端API')
    .setDescription('供网站和app调用的服务端API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3002
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);

  // await app.listen(3000);
  // console.log(`http://localhost:3000/api-docs`);
}
bootstrap();
