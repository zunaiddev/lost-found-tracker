import { Exclude, Expose, Type } from 'class-transformer';
import { ReportEntity, ReportStatus, ReportType } from '../entity/report.entity.js';
import { UserProfileDto } from '../../users/dto/user-profile.dto.js';

@Exclude()
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  type: ReportType;

  @Expose()
  status: ReportStatus;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  category: string | null;

  @Expose()
  location: string;

  @Expose()
  date: Date | null;

  @Expose()
  imageUrl: string | null;

  @Expose()
  @Type(() => UserProfileDto)
  user?: UserProfileDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(report?: ReportEntity) {
    if (report) {
      this.id = report.id;
      this.type = report.type;
      this.status = report.status;
      this.title = report.title;
      this.description = report.description;
      this.category = report.category ?? null;
      this.location = report.location;
      this.date = report.date ?? null;
      this.imageUrl = report.imageUrl ?? null;
      if (report.user) {
        this.user = new UserProfileDto(report.user);
      }
      this.createdAt = report.createdAt;
      this.updatedAt = report.updatedAt;
    }
  }
}
