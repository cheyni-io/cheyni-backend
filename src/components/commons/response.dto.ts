import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  constructor(data: any) {
    this.data = data;
  }

  @ApiProperty({ type: Object, description: 'data' })
  data: any;
}
