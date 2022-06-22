import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ShareModule } from './share/share.module';
import { ConfigModule } from "./config/config.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "./auth/interceptor/transform.interceptor";
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';
import { MadadkarModule } from './madadkar/madadkar.module';
import { BranchModule } from './branch/branch.module';
import { HamiModule } from './hami/hami.module';
import { MadadjouModule } from './madadjou/madadjou.module';

@Module({
  imports: [AuthModule, DatabaseModule, ShareModule,ConfigModule, ProfileModule, AdminModule, MadadkarModule, BranchModule, HamiModule, MadadjouModule],
  controllers: [],
  providers: [{
    provide:APP_INTERCEPTOR,
    useClass:TransformInterceptor
  }],
})
export class AppModule {}
