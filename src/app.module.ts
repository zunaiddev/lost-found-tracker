import {Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {UsersModule} from './users/users.module.js';
import {ReportsModule} from './reports/reports.module.js';
import {AuthModule} from './auth/auth.module.js';
import {MatchesModule} from './matches/matches.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtModule} from './jwt/jwt.module.js';
import {GuardsModule} from './common/guards/guards.module.js';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./common/guards/auth.guard.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'pass',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
    AuthModule,
    MatchesModule,
    JwtModule,
    GuardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}