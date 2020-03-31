import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 静态文件托管， nest需要指定所使用的类似expree 指定泛型<NestExpressApplication>
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 此局代码可以控制跨域
  app.enableCors();
  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('全栈之巅-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);

  // await app.listen(3000);
  // console.log(`http://localhost:3000/api-docs`);
}
bootstrap();
