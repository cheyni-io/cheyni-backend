import { ApiProperty } from '@nestjs/swagger';

export class PaginatorResponseDTO {
  constructor(page: number, items: number) {
    this.page = page;
    this.items = items;
    this.total = 0;
    this.data = [];
  }

  @ApiProperty({ type: Number, description: 'total' })
  total: number;

  @ApiProperty({ type: Number, description: 'page' })
  page: number;

  @ApiProperty({ type: Number, description: 'items' })
  items: number;

  @ApiProperty({ type: [], description: 'data' })
  data: any[];
}
