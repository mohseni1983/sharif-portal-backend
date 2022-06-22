import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory{
  constructor(
    private readonly configService:ConfigService
  ) {
  }

  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const config:TypeOrmModuleOptions={
      type:'postgres',
      host: this.configService.get<string>('database.postgres.host'),
      port: this.configService.get<number>('database.postgres.port'),
      database: this.configService.get<string>('database.postgres.database'),
      username: this.configService.get<string>('database.postgres.username'),
      password: this.configService.get<string>('database.postgres.password'),
      synchronize: this.configService.get<boolean>('database.postgres.synchronize'),
      entities: this.configService.get<string[]>('database.postgres.entities'),
      cache:{
        type:'redis',
        options:{
          host:this.configService.get<string>('database.redis.host'),
          port:this.configService.get<number>('database.redis.port')
        },
        ignoreErrors:true,
        alwaysEnabled:true,
        duration:300000
      }

    }
    return config;
  }

}
