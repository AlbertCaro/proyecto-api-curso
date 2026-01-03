import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CreateUser } from './domain/usecases/create-user.usecase';
import { User } from './domain/models/user.model';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const createUser = app.get(CreateUser);

  const user = new User();

  user.correo = 'albertcaronava@gmail.com';
  user.nombres = 'Alberto';
  user.apellidos = 'Caro Navarro';
  user.password = 'hola123';

  await createUser.execute(user);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
