import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Put('/update-user')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.settingsService.updateUser(req.user.id, updateUserDto);
  }

  @Put('/update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req) {
    return this.settingsService.updatePassword(req.user.id, updatePasswordDto);
  }
}
