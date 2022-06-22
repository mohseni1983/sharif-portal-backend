import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminMadadkarService } from "../services/admin-madadkar.service";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";

@ApiTags('Admin madadkar endpoints')
@Controller('admin/madadkar')
export class AdminMadadkarController{
  constructor(
    private readonly adminMadadkarService:AdminMadadkarService
  ) {
  }

  @Post('/:userId')
  async createAddMadadkarToUser(@Body() madadkarDto:MadadkarEntity,@Param('userId') userId:number){
    return await this.adminMadadkarService.createMadadkar(madadkarDto,userId)
  }

  @Get('all')
  async getAllMadadkars(){
    return await this.adminMadadkarService.getAllMadadkars()
  }

}
