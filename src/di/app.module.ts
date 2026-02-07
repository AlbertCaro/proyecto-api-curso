import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DbModule } from './db.module';
import { AuthModule } from './auth.module';
import { CourseModule } from './course.module';
import { PaymentModule } from './payment.module';

@Module({
  imports: [DbModule, UserModule, AuthModule, CourseModule, PaymentModule],
})
export class AppModule {}
