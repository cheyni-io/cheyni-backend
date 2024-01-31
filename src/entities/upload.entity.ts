import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { NFTokenEntity } from './nftoken.entity';
import { NFTokenAndUserEntity } from './nfTokenAndUser.entity';

@Entity('uploads')
export class UploadEntity {
  constructor(upload?: Partial<UploadEntity>) {
    Object.assign(this, upload);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  url: string;

  //Cada vídeo pode ter um NFT associado
  @ManyToOne(() => NFTokenEntity, (nftoken) => nftoken.upload)
  nftoken: string;

  @OneToMany(
    () => NFTokenAndUserEntity,
    (nfTokenAndUser) => nfTokenAndUser.user,
  )
  nfTokenAndUser: NFTokenAndUserEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
