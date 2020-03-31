import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';
// import { CurrentUser } from './current-user.decorator';


@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel:ReturnModelType<typeof User>
  ){}

  @ApiOperation({ summary: '注册'})
  @Post('register')
  async register(@Body() dto: registerDto) {
    const { username, password } = dto
    const user = await this.userModel.create({
      username,
      password
    })
    return user
  }


  @ApiOperation({ summary: '登陆'})
  @Post('login')
  // 授权登陆
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req) {
  // async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      // token: this.jwtService.sign(String(user))
      token: this.jwtService.sign(String(req.user._id))
    }
  }

  @ApiOperation({ summary: '用户信息'})
  @Get('user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async user(@Req() req) {
  // async user(@CurrentUser() user: UserDocument) {
    return req.user
    // return user
  }
}
