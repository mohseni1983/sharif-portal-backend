import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchEntity } from "../branch/entity/branch.entity";
import { AdminBranchService } from "./services/admin-branch.service";
import { AdminBranchController } from "./controllers/admin-branch.controller";
import { AdminMadadkarService } from "./services/admin-madadkar.service";
import { AdminMadadkarController } from "./controllers/admin-madadkar.controller";
import { UserEntity } from "../auth/entities/user.entity";
import { MadadkarEntity } from "../madadkar/entity/madadkar.entity";
import { AdminManageUsersService } from "./services/admin-manage-users.service";
import { ProfileEntity } from "../profile/entity/profile.entity";
import { AdminUserManageController } from "./controllers/admin-user-manage.controller";
import { ContactEntity } from "../profile/entity/contact.entity";

@Module({
  imports:[TypeOrmModule.forFeature([BranchEntity,UserEntity,MadadkarEntity,UserEntity,ProfileEntity,ContactEntity])],
  providers:[AdminBranchService,AdminMadadkarService,AdminManageUsersService],
  controllers:[AdminBranchController,AdminMadadkarController,AdminUserManageController]
})
export class AdminModule {}
