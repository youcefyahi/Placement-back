import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class UserController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: { email: string, password: string }) {
        const token = await this.authService.login(credentials);
        return { token };
    }
}
