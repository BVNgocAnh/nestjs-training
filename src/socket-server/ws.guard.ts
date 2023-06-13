import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const token = client.handshake.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token.toString());
      const isTokenValid = this.authService.validateToken(payload);
      const userID = payload.sub;
      const user = await this.userRepository.findOne({
        where: { user_id: userID },
      });
      if (!isTokenValid) {
        return false;
      }
      client['user_id'] = userID;
      return true;
    } catch (error) {
      return false;
    }
  }
}
