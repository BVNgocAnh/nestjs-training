import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/enum';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private reflector: Reflector,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, { secret: 'Bearer' });
      request.user_id = payload.sub;
      const userId = payload.sub;
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const isTokenValid = await this.authService.compareToken(
        token,
        user.access_token,
      );

      if (!isTokenValid) {
        throw new UnauthorizedException();
      }

      // request['userId'] = userId;
      request['userPermission'] = user.permission;
      if (requiredRoles) {
        const hasPermission = requiredRoles.some((role) =>
          user.permission.includes(role),
        );
        if (!hasPermission) {
          throw new UnauthorizedException('Unauthorized access');
        }
      }
    } catch (e) {
      throw e;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
