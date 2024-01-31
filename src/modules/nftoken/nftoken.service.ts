import { Injectable } from '@nestjs/common';
import { CreateNftokenDto } from './dto/create-nftoken.dto';
// import { UpdateNftokenDto } from './dto/update-nftoken.dto';
import { NftokenRepository } from './nftoken.repository';

@Injectable()
export class NftokenService {
  constructor(private readonly nftokenRepository: NftokenRepository) {}

  create(createNftokenDto: CreateNftokenDto) {
    const nftoken = this.nftokenRepository.create(createNftokenDto);

    return this.nftokenRepository
      .save(nftoken)
      .then(() => {
        'NFToken created successfully';
      })
      .catch(() => {
        'NFToken creation failed, please try again later';
      });
  }

  async findAll() {
    return await this.nftokenRepository.find();
  }

  async findOne(id: string) {
    return await this.nftokenRepository.findNftokenById(id);
  }

  async update(id: string, updateNftokenDto: any) {
    return await this.nftokenRepository.updateNftoken(id, updateNftokenDto);
  }

  async remove(id: string) {
    return await this.nftokenRepository.deleteNftoken(id);
  }
}
