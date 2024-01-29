import { Injectable } from '@nestjs/common';
import { NFTokenAndUserEntity } from 'src/entities/nfTokenAndUser.entity';

import { NfTokenAndUserRepository } from './nf-token-and-user.repository';
import { CreateNFTokenAndUserDto } from './dto/create-nf-token-and-user.dto';

@Injectable()
export class NfTokenAndUserService {
  constructor(
    private readonly nfTokenAndUserRepository: NfTokenAndUserRepository,
  ) {}

  async create(
    userId: string,
    createNfTokenAndUserDto: CreateNFTokenAndUserDto,
  ) {
    const nfTokenAndUser = new NFTokenAndUserEntity();
    nfTokenAndUser.user = userId;
    nfTokenAndUser.nftoken = createNfTokenAndUserDto.nftoken;

    return await this.nfTokenAndUserRepository.saveNfTokenAndUser(
      nfTokenAndUser,
    );
  }
}

// findAll() {
//   return `This action returns all nfTokenAndUser`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} nfTokenAndUser`;
// }

// update(id: number, updateNfTokenAndUserDto: UpdateNfTokenAndUserDto) {
//   return `This action updates a #${id} nfTokenAndUser`;
// }

// remove(id: number) {
//   return `This action removes a #${id} nfTokenAndUser`;
// }
