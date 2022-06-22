import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../auth/entities/user.entity";

@Entity('contacts')
export class ContactEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @ApiProperty()
  @Column()
  mobile1:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  mobile2?:string
  @ApiProperty()
  @Column()
  province:string
  @ApiProperty()
  @Column()
  city:string
  @ApiProperty({required:false,description:'not required'})
  @Column({default:'0'})
  region?:string
  @ApiProperty()
  @Column()
  street1:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  street2?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  alley1?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  alley2?:string
  @ApiProperty({required:false})
  @Column({default:'0'})
  no?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  building?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  floor?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  apartment?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  phone1?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  phone2?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  email?:string
  @ApiProperty({required:false})
  @Column({nullable:true})
  postalCode?:string

  @OneToOne(()=>UserEntity,p=>p.objContact)
  objUser:UserEntity
}
