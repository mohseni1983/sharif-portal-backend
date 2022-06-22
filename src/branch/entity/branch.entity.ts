import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { MadadkarEntity } from "../../madadkar/entity/madadkar.entity";
import { UserEntity } from "../../auth/entities/user.entity";

@Entity('branches')
export class BranchEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @ApiProperty()
  @Column()
  branchName:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  address?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  phone?:string

  @OneToMany(()=>UserEntity,p=>p.objBranch,{cascade:true,eager:true,nullable:true})
  objUsers:UserEntity[]

}
