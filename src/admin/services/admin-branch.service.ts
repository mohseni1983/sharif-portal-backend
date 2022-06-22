import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BranchEntity } from "../../branch/entity/branch.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminBranchService {

  constructor(
    @InjectRepository(BranchEntity) private readonly branchRepository:Repository<BranchEntity>
  ) {
  }
  async createBranch(branchDto:BranchEntity){
    return await this.branchRepository.save(branchDto)
 }


}
