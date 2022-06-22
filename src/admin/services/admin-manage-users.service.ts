import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../auth/entities/user.entity";
import { Repository } from "typeorm";
import { ProfileEntity } from "../../profile/entity/profile.entity";
import { CreateUserByAdminDto } from "../dto/create-user-by-admin.dto";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";

@Injectable()
export class AdminManageUsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepository:Repository<ProfileEntity>,
    @InjectRepository(MadadkarEntity) private readonly madadkarRepository:Repository<MadadkarEntity>
  ) {
  }

  async getAllUsers(){
    return await this.userRepository.find({relations:['objBranch']})
  }

  async createUserByAdmin(createUserDto:CreateUserByAdminDto){
    const {userInfo,madadkarInfo,profileInfo,contactInfo,isMadadkar,isHami}=createUserDto
    if(madadkarInfo.madadkarId){
      const existMadadkar=await this.madadkarRepository.findOne({where:{madadkarId:madadkarInfo.madadkarId},relations:['objUser']})
      if(existMadadkar){
        throw new ConflictException({
          message:`کد مددکاری ${madadkarInfo.madadkarId} قبلا برای کاربر ${existMadadkar.objUser.objProfile.firstName} ${existMadadkar.objUser.objProfile.lastName} ثبت شده است.`
        })
      }

    }
    if(profileInfo.nationalCode) {
      const existProfile = await this.profileRepository.findOne({ where: { nationalCode: profileInfo.nationalCode } });
      if(existProfile){
        throw new ConflictException({message:`کاربر دیگری با این کد ملی در سیستم وجود دارد`})
      }
    }
    const profile=await this.profileRepository.save(profileInfo)


  }

  async createUserProfileByAdmin(profileDto:ProfileEntity,userId:number){
    const user:UserEntity=await this.userRepository.findOne({where:{id:userId}})
    if(!user) {
      throw new BadRequestException({
        message: "کاربر مورد نظر پیدا نشد."
      });
    }
    if(user.objProfile){
      if(user.objProfile.isVerified){
        throw new ConflictException({
          message:'اطلاعات پروفایل این کاربر قبلا ثبت و تایید شده است.'
        })
      }
    }
    const existProfile=await this.profileRepository.findOne({where:{nationalCode:profileDto.nationalCode,isVerified:true},relations:['objUser']})
    if(existProfile){
      throw new ConflictException({
        message:`کد ملی ${profileDto.nationalCode} قبلا برای کاربر ${existProfile.objUser.objProfile.firstName} ${existProfile.objUser.objProfile.lastName} ثبت شده است.`
      })
    }

    profileDto.isVerified=true;
    user.objProfile=await this.profileRepository.save(profileDto)
    const savedUser=await this.userRepository.save(user)
    return savedUser.objProfile

  }
}
