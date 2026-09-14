import { ReportType } from '../entity/report.entity.js';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportReqDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @MinLength(8, { message: 'title must be at least 8 characters' })
  @MaxLength(200, { message: 'title can not exceed 200 characters' })
  title: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'type is required' })
  @IsEnum(ReportType, {
    message: 'type must be a valid report type (LOST or FOUND)',
  })
  type: ReportType;

  @IsOptional()
  @IsString({ message: 'category must be a string' })
  category?: string;

  @IsNotEmpty({ message: 'location is required' })
  @IsString({ message: 'location must be a string' })
  location: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'date must be a valid date' })
  date?: Date;

  @IsOptional()
  @IsString({ message: 'imageUrl must be a string' })
  imageUrl?: string;
}
