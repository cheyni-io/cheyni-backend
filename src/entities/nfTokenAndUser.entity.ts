import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { NFTokenEntity } from './nftoken.entity';
import { UploadEntity } from './upload.entity';

@Entity('nf_token_and_user')
export class NFTokenAndUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.nfTokenAndUser)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @ManyToOne(() => NFTokenEntity, (nftoken) => nftoken.nfTokenAndUser)
  @JoinColumn({ name: 'nftoken_id' })
  nftoken: string;

  @ManyToOne(() => UploadEntity, (upload) => upload.nfTokenAndUser)
  @JoinColumn({ name: 'upload_id' })
  upload: UploadEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
