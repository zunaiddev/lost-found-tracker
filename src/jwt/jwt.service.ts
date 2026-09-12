import {Injectable, UnauthorizedException} from '@nestjs/common';
import type {JwtPayload} from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey: string;

  constructor() {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Missing JWT_SECRET_KEY environment variable');
    }

    this.secretKey = secretKey;
  }

  generateToken(id: string, type: string): string {
    return jwt.sign({ type }, this.secretKey, {
      subject: id,
      expiresIn: '15m',
    });
  }

  validateToken(token: string, type: string): JwtPayload {
    try {
      const payload = jwt.verify(token, this.secretKey);

      if (typeof payload === 'string' || payload.type !== type) {
        throw new UnauthorizedException('Invalid token type');
      }

      return payload;
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      if (error instanceof jwt.NotBeforeError) {
        throw new UnauthorizedException(
          `Token not active until ${error.date.toISOString()}`,
        );
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException(`Invalid token: ${error.message}`);
      }
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
