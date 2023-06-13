import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/enum/enum';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  @Post()
  async buyProduct(@Req() req: any, @Body() body: any) {
    return await this.userService.createOrder(req.user_id, body);
  }
}
