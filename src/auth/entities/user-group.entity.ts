import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserGroupEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @Column()
  groupName:string
}
