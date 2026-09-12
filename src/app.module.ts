import {Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {UsersModule} from './users/users.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MatchesModule } from './matches/matches.module.js';

@Module({
  imports: [UsersModule, ReportsModule, AuthModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}