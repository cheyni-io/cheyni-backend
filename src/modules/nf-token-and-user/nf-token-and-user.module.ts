import { Module } from '@nestjs/common';
import { NfTokenAndUserService } from './nf-token-and-user.service';
import { NfTokenAndUserController } from './nf-token-and-user.controller';
import { NfTokenAndUserRepository } from './nf-token-and-user.repository';
import { UsersModule } from '../users/users.module';
import { NftokenModule } from '../nftoken/nftoken.module';

@Module({
  imports: [UsersModule, NftokenModule],
  controllers: [NfTokenAndUserController],
  providers: [NfTokenAndUserService, NfTokenAndUserRepository],
  exports: [NfTokenAndUserService, NfTokenAndUserRepository],
})
export class NfTokenAndUserModule {}
