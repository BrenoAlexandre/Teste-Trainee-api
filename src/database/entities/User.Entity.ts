import { Column, Entity, Unique } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base {
  @Column({ length: 120 })
  public name: string;

  @Unique(['cpf'])
  @Column({ length: 11 })
  public cpf: string;

  @Column({ length: 50 })
  public password: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column({ length: 500, nullable: true })
  public obs: string;

  @Column()
  public role: string;
}
