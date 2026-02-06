import { Module } from '@nestjs/common';
import { EncrypterService } from '../core/common/encrypter.service';
import { RequestService } from 'src/core/common/request.service';

@Module({
  providers: [EncrypterService, RequestService],
  exports: [EncrypterService, RequestService],
})
export class CommonModule {}
