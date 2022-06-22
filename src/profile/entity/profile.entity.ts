import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum } from "../enums/gender.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('user_profile')
export class ProfileEntity{
  @PrimaryGeneratedColumn('increment')
  id:number

  @ApiProperty()
  @Column()
  firstName:string

  @ApiProperty()
  @Column()
  lastName:string

  @ApiProperty()
  @Column()
  father:string

  @ApiProperty({nullable:true,required:false,example:'1234567890'})
  @Column({nullable:true})
  nationalCode:string

  @ApiProperty({nullable:true,required:false})
  @Column({nullable:true})
  identityId:string

  @ApiProperty({nullable:true,required:false})
  @Column({nullable:true})
  birth:Date

  @ApiProperty({type:'enum',enum:GenderEnum,enumName:'GenderEnum'})
  @Column({type:"enum",enum:GenderEnum})
  gender:GenderEnum

  @ApiProperty({nullable:true,required:false})
  @Column({nullable:true})
  profileAvatar:string

  @Column({type:'boolean',default:false})
  isVerified:boolean
  @OneToOne(()=>UserEntity,{nullable:true,})
  verifyAgent:UserEntity
  @OneToOne(()=>UserEntity,p=>p.objProfile)
  objUser:UserEntity

}
