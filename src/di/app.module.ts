import { Module } from '@nestjs/common';
import { AppController } from '../infraestructure/app.controller';
import { AppService } from '../domain/app.service';
import { UserModule } from './user.module';
import { DbModule } from './db.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
