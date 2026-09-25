import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';

@Injectable()
export class optionalJwtGaurd implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const client = context.switchToHttp();
    const req = client.getRequest();

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    if (!token) {
      req.user = null;
      return true;
    }

    
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('accessTokenSecret'),
      });
      req.user = decode;
    } catch (error) {
      req.user = null;
    }

    return true;
  }
}
