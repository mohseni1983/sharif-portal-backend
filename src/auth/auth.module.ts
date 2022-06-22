import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtGuard } from "./guard/jwt.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity],),
    JwtModule.register({
      secret:'Ali_Mohseni_1362#',
      signOptions:{
        expiresIn: '2h',
      }
    }),
    PassportModule.register({defaultStrategy:'jwt'}),
  ],

  providers:[AuthService,JwtGuard,JwtStrategy],
  controllers:[AuthController]
})
export class AuthModule {

}
