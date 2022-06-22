import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "./entity/profile.entity";
import { ProfileController } from "./controller/profile.controller";
import { ProfileService } from "./services/profile.service";
import { ContactEntity } from "./entity/contact.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ProfileEntity,ContactEntity])],
  controllers:[ProfileController],
  providers:[ProfileService]
})
export class ProfileModule {}
