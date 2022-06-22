import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hamis')
export class HamiEntity{
  @PrimaryGeneratedColumn('increment')
  id:number
  @PrimaryGeneratedColumn('increment')
  hamidId:number
}
