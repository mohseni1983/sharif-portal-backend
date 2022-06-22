import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { generateHashedString } from "../../utils/utils.functions";
import { LoginDto } from "../dto/login.dto";
import { RolesEnum } from "../enum/roles.enum";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadType } from "../type/jwt-payload.type";

@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    private readonly jwtService:JwtService
  ) {
    this.userRepository.findOne({where:{username:'admin'}}).then((res)=>{
      if(!res){
        this.userRepository.save({username:'admin',password:generateHashedString('admin'),roles:[RolesEnum.ADMIN]}).then(
          (r)=>console.log('Admin User created...')
        )
      }
    })
  }

  async login(loginDto:LoginDto){
    const {username, password}=loginDto
    const user=await this.userRepository.findOne({where:{username:username}})
    if(!user)
      throw new NotFoundException({
        message:'کاربری با مشخصات مورد نظر پیدا نشد.'
      })
    const checkPassword=await user.validatePassword(password)
    if(!checkPassword)
      throw new ForbiddenException({
        message:'نام کاربری یا رمز عبور اشتباه است.'
      })

    const userRoles=user.roles
    let payloads=[]
    const tokens=[];
    for(let role of userRoles){
      const payload:JwtPayloadType={userId:user.id,role:role}
      const token=this.jwtService.sign(payload,{expiresIn:'200h'})
      payloads.push({token:token,role:role})
    }
    return payloads
  }
}
