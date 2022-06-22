import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../../auth/entities/user.entity";
import { generateRandomString } from "../../utils/utils.functions";

@Injectable()
export class AdminMadadkarService{
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(MadadkarEntity) private readonly madadkarRepositoy:Repository<MadadkarEntity>

  ) {
  }

  async createMadadkar(madadkarDto:MadadkarEntity,userId:number){
    const user:UserEntity=await this.userRepository.findOne({where:{id:userId}})
    if(!user)
      throw new BadRequestException({
        message:'کاربر مورد نظر پیدا نشد.'
      })
    if(madadkarDto.madadkarId)
    {
      const existMadadkar=await this.madadkarRepositoy.findOne({where:{madadkarId:madadkarDto.madadkarId},relations:['objUser']})
      if(existMadadkar){
        throw new ConflictException({
          message:`کد مددکاری ${madadkarDto.madadkarId} قبلا برای کاربر ${existMadadkar.objUser.objProfile.firstName} ${existMadadkar.objUser.objProfile.lastName} ثبت شده است.`
        })
      }
    }


    if(user.objMadadkar){
      throw new ConflictException({
        message:`برای این کاربر قبلا پروفایل مددکاری با کد ${user.objMadadkar.madadkarId} تعریف شده است.`
      })
    }
    if(!user.objProfile){
      throw new BadRequestException({
        message:'برای ثبت کد مددکاری باید ابتدا اطلاعات پروفایل هویتی کاربر تکمیل گردد.'
      })
    }
    const madadkar=new MadadkarEntity()
    if(madadkarDto.madadkarId)
      madadkar.madadkarId=madadkarDto.madadkarId
    await this.madadkarRepositoy.save(madadkar)
    user.objMadadkar=madadkar
    const savedUser=await this.userRepository.save(user)
    return savedUser.objMadadkar;
  }

  async getAllMadadkars(){
    return await this.madadkarRepositoy.find({relations:['objUser']})
  }
}
