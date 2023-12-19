import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({ type: String, description: 'birthDate' })
  @IsNotEmpty({ message: 'birthDate is required' })
  birthDate: string;

  @ApiProperty({ type: String, description: 'profilePicture' })
  profilePicture: string;

  @ApiProperty({ type: String, description: 'address' })
  address: string;

  @ApiProperty({ type: String, description: 'number' })
  number: string;

  @ApiProperty({ type: String, description: 'complement' })
  complement: string;

  @ApiProperty({ type: String, description: 'neighborhood' })
  neighborhood: string;

  @ApiProperty({ type: String, description: 'city' })
  city: string;

  @ApiProperty({ type: String, description: 'state' })
  state: string;

  @ApiProperty({ type: String, description: 'country' })
  country: string;

  @ApiProperty({ type: String, description: 'zipCode' })
  zipCode: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
