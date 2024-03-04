import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { AdminRepository } from './admin.repository';

import { AdminController } from './admincontroller';

import { AdminService } from './admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class UserModule {}
