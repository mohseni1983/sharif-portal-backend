import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt,Strategy} from 'passport-jwt'
import { JwtPayloadType } from "../type/jwt-payload.type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
  @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>
) {
  super({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration:false,
    secretOrKey:'Ali_Mohseni_1362#',
    passReqToCallback:true,
  });

}
  async validate(request:Request,payload:JwtPayloadType){
    const user=await this.userRepository.findOne({where: {id:payload.userId} })
    return user;
  }
}
