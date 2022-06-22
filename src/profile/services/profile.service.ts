import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "../entity/profile.entity";

@Injectable()
export class ProfileService{
  constructor(
    @InjectRepository(ProfileEntity) private readonly profileRepository:Repository<ProfileEntity>
  ) {
  }

  async addProfile(profileDto:ProfileEntity){
    return await this.profileRepository.save(profileDto)
  }

}
