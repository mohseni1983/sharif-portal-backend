import { UserEntity } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ProfileEntity } from "../../profile/entity/profile.entity";
import { ContactEntity } from "../../profile/entity/contact.entity";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";

export class CreateUserByAdminDto{
  @ApiProperty()
  userInfo:UserEntity
  @ApiProperty()
  profileInfo:ProfileEntity
  @ApiProperty()
  contactInfo:ContactEntity
  @ApiProperty({default:true})
  isMadadkar:boolean
  @ApiProperty({required:false})
  madadkarInfo:MadadkarEntity
  @ApiProperty({default:false})
  isHami:boolean
}
