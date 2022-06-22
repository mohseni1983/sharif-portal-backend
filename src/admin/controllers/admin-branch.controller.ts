import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminBranchService } from "../services/admin-branch.service";
import { BranchEntity } from "../../branch/entity/branch.entity";

@ApiTags('Admin branch endpoints')
@Controller('admin/branch')
export class AdminBranchController{
  constructor(
    private readonly adminBranchService:AdminBranchService
  ) {
  }

  @Post()
  async createBranch(@Body() branchDto:BranchEntity){
    return this.adminBranchService.createBranch(branchDto)
  }
}
