import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { RolesEnum } from "../enum/roles.enum";
import { Exclude } from "class-transformer";
import { ProfileEntity } from "../../profile/entity/profile.entity";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ContactEntity } from "../../profile/entity/contact.entity";
import { BranchEntity } from "../../branch/entity/branch.entity";
@Entity('users')
export class UserEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @ApiProperty()
  @Column()
  username:string


  @ApiProperty()
  @Exclude()
  @Column()
  password:string
  @Column({type:"enum",enum:RolesEnum,array:true,default:[RolesEnum.MADADKAR],})
  roles:RolesEnum[]

  @ApiProperty({required:false})
  @Column({default:true})
  enabled:boolean

  @OneToOne(()=>ProfileEntity,p=>p.objUser,{nullable:true,cascade:true,eager:true})
  @JoinColumn()
  objProfile?:ProfileEntity

  @OneToOne(()=>ContactEntity,p=>p.objUser,{nullable:true,cascade:true,eager:true})
  @JoinColumn()
  objContact?:ContactEntity

  @OneToOne(()=>MadadkarEntity,{nullable:true,cascade:true,eager:true})
  @JoinColumn()
  objMadadkar?:MadadkarEntity

  @ManyToOne(()=>BranchEntity,p=>p.objUsers,)
  objBranch:BranchEntity


  async validatePassword(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password)
  }
}
