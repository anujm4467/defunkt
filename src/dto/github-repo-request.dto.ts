import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GitHubRepoRequestDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly page: string;

  @ApiProperty()
  @IsString()
  readonly perPage: string;
}

export class CombinedRequestDto extends GitHubRepoRequestDto {
  @ApiProperty()
  @IsString()
  readonly city: string;
}
