import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from '../../jwt/jwt.service.js';
import type {JwtPayload} from 'jsonwebtoken';
import {UserEntity} from "../../users/entity/user.entity.js";
import {UsersService} from "../../users/users.service.js";

export interface AuthenticatedRequest extends Request {
  user: UserEntity;
  userId: number;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
              private readonly usersService: UsersService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<AuthenticatedRequest>();

    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid or missing Bearer');
    }

    const payload: JwtPayload = this.jwtService.validateToken(token, 'AUTH');

    const userId = Number(payload.sub);

    if (!payload.sub || Number.isNaN(userId)) {
      throw new UnauthorizedException('Invalid sub token');
    }

    const user: UserEntity | null= await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException(`Could not find user user with id ${userId}`);
    }

    request.user = user
    request.userId = userId;

    return true;
  }
}
