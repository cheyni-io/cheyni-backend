import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { UploadEntity } from './upload.entity';
import { NFTokenAndUserEntity } from './nfTokenAndUser.entity';

@Entity('nf_tokens')
export class NFTokenEntity {
  constructor(token?: Partial<NFTokenEntity>) {
    Object.assign(this, token);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: true })
  hash: string;

  @OneToOne(() => UploadEntity, (upload) => upload.nftoken, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  upload: UploadEntity;

  // @OneToMany(
  //   () => NFTokenAndUserEntity,
  //   (nfTokenAndUser) => nfTokenAndUser.nftoken,
  //   {
  //     cascade: true,
  //     onDelete: 'CASCADE',
  //   },
  // )
  // nfTokenAndUser: NFTokenAndUserEntity[]; // Adicionado para suportar a relação One-to-Many
  @OneToMany(
    () => NFTokenAndUserEntity,
    (nfTokenAndUser) => nfTokenAndUser.nftoken,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  nfTokenAndUser: NFTokenAndUserEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }
}
