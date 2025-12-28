import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { User as UserModel } from '../../domain/models/user.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  toDomain() {
    const user = new UserModel();

    user.id = this.id;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.isActive = this.isActive;

    return user;
  }
}
