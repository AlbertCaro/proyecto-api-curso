import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from '../data/database/db.datasource';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig)],
})
export class DbModule {}
