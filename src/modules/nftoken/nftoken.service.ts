import { Injectable } from '@nestjs/common';
// import { CreateNftokenDto } from './dto/create-nftoken.dto';
// import { UpdateNftokenDto } from './dto/update-nftoken.dto';
import { NftokenRepository } from './nftoken.repository';
import { NFTokenEntity } from '../../entities/nftoken.entity';
import { uuid } from 'uuidv4';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { CreateNftokenDto } from './dto/create-nftoken.dto';

@Injectable()
export class NftokenService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly nftokenRepository: NftokenRepository,
  ) {}

  private generateRandomHash(): string {
    return uuid();
  }

  async create(
    tokenImage: string,
    tokenFile: Buffer,
    name: string,
    token: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hash: string,
  ) {
    const randomHash = this.generateRandomHash();
    const newNftoken = new NFTokenEntity({
      ...new CreateNftokenDto(),
      tokenImage: tokenImage,
      token: token,
      name: name,
      hash: randomHash,
    });
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'cheyni',
        Key: tokenImage,
        Body: tokenFile,
      }),
    );
    return await this.nftokenRepository.saveNftoken(newNftoken);
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
