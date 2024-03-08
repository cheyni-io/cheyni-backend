import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProfileEnum } from '../components/enum/profile.enum';

@Entity('admin')
export class AdminEntity {
  constructor(admin?: Partial<AdminEntity>) {
    Object.assign(this, admin);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ unique: true, nullable: false, length: 150 })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column('enum', {
    enum: ProfileEnum,
    default: ProfileEnum.ADMIN,
    nullable: false,
  })
  profile: ProfileEnum;

  // @Column({ nullable: true, select: false })
  // resetPasswordToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
  }
}
