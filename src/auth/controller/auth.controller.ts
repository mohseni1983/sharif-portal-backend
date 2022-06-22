import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/login.dto";
import { JwtGuard } from "../guard/jwt.guard";
import { TransformInterceptor } from "../interceptor/transform.interceptor";

@ApiTags('User authentication endpoints')
@Controller('user/auth')
export class AuthController{
  constructor(
    private readonly authService:AuthService
  ) {
  }

  @Post('/web/login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('test')
  async test(@Req() req){
    console.log(req)
    return req.user
  }
}
