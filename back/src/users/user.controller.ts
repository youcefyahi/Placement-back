import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PrismaService } from 'src/services/prisma.service';

@Controller('auth')
export class UserController {
    constructor(private readonly authService: AuthService,private readonly prismaService: PrismaService) {}

    @Post('login')
    async login(@Body() credentials: { email: string, password: string }) {
        const token = await this.authService.login(credentials);
        return { token };
    }

    @Post('register')
    async register(@Body() userData: { username: string, email: string, password: string }) {
        // Utilisez PrismaService pour enregistrer l'utilisateur
        const newUser = await this.prismaService.createUser(userData);
        return { message: 'Utilisateur enregistré avec succès' };
    }
}
