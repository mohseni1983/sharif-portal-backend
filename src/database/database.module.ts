import { Module } from '@nestjs/common';
import { ConfigModule } from "../config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./db-configs/postgres-config.service";

@Module({
  imports:[TypeOrmModule.forRootAsync({
    useClass:PostgresConfigService,
    imports:[ConfigModule]
  })]
})
export class DatabaseModule {}
