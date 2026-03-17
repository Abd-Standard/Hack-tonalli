import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch('users/me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req,
    @Body() body: { displayName?: string; city?: string; character?: string },
  ) {
    const updated = await this.usersService.update(req.user.id, body);
    return this.usersService.getProfile(updated.id);
  }

  @Get('rankings')
  async getRankings() {
    return this.usersService.getRankings();
  }
}
