import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  gender: string;

  @Column()
  phone_number: string;

  @Column()
  social_insurance_number: string;

  @Column()
  date_of_birth: Date;

  @Column()
  city: string;

  @Column()
  street_name: string;

  @Column()
  street_address: string;

  @Column()
  zip_code: string;

  @Column()
  state: string;

  @Column()
  country: string;
}
