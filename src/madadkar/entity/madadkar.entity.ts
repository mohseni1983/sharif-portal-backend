import { AfterInsert, Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BranchEntity } from "../../branch/entity/branch.entity";
import { ApiProperty } from "@nestjs/swagger";
import { generateRandomString, generateUniqueCode } from "../../utils/utils.functions";
import { UserEntity } from "../../auth/entities/user.entity";

@Entity('madadkars')
export class MadadkarEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @ApiProperty({required:false})
  @Column({nullable:true})
  madadkarId?:string

  @OneToOne(()=>UserEntity,p=>p.objMadadkar,{})
  objUser:UserEntity

  @AfterInsert()
  getUniqueId(){
    if(!this.madadkarId)
    this.madadkarId= generateUniqueCode(this.id.toString(),6,'1')
  }
}
