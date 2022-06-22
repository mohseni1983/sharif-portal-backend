import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProfileService } from "../services/profile.service";
import { ProfileEntity } from "../entity/profile.entity";

@ApiTags('User profile endpoint')
@Controller('user/profile')
export class ProfileController{
  constructor(
    private readonly profileService:ProfileService
  ) {
  }

  @Post()
  async addProfile(@Body() profileDto:ProfileEntity){
    return await this.profileService.addProfile(profileDto)
  }
}
