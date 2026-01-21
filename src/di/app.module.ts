import { Module } from '@nestjs/common';
import { AppController } from '../infraestructure/app.controller';
import { AppService } from '../core/common/app.service';
import { UserModule } from './user.module';
import { DbModule } from './db.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
