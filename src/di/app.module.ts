import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DbModule } from './db.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [DbModule, UserModule, AuthModule],
})
export class AppModule {}
