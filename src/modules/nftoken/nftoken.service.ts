import { Injectable } from '@nestjs/common';
import { CreateNftokenDto } from './dto/create-nftoken.dto';
// import { UpdateNftokenDto } from './dto/update-nftoken.dto';
import { NftokenRepository } from './nftoken.repository';
import { NFTokenEntity } from 'src/entities/nftoken.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class NftokenService {
  constructor(private readonly nftokenRepository: NftokenRepository) {}

  async create(createNftokenDto: CreateNftokenDto): Promise<NFTokenEntity> {
    const randomHash = this.generateRandomHash();
    const nftoken = this.nftokenRepository.create({
      ...createNftokenDto,
      hash: randomHash,
    });
    return this.nftokenRepository.save(nftoken);
  }

  private generateRandomHash(): string {
    return uuid();
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
