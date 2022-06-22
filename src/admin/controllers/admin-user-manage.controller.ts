import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AdminManageUsersService } from "../services/admin-manage-users.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserByAdminDto } from "../dto/create-user-by-admin.dto";
import { ProfileEntity } from "../../profile/entity/profile.entity";
@ApiTags('Admin manage users and profiles endpoints')
@Controller('admin/users')
export class AdminUserManageController{
  constructor(
    private readonly userService:AdminManageUsersService
  ) {
  }

  @Get('all')
  async getAllUsers(){
    return await this.userService.getAllUsers()
  }

  @Post('/create')
  async createUserByAdmin(@Body() createUserDto:CreateUserByAdminDto){
  }

  @Post('/profile/create')
  async createUserProfileByAdmin(@Body() profileDto:ProfileEntity,@Param('userId') userId:number){
    return await this.userService.createUserProfileByAdmin(profileDto,userId)
  }
}
