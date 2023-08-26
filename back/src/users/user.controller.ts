import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PrismaService } from 'src/services/prisma.service';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';
import { AuthGuard, AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserService } from './user.service';
import { User } from '@prisma/client';



@Controller('auth')
export class UserController {
    constructor(private readonly authService: AuthService, private readonly prismaService: PrismaService) { }

    @Post('login')
    async login(@Body() credentials: { email: string, password: string }) {
        const token = await this.authService.login(credentials);
        if (token) {
            return { token };
        }
        throw new UnauthorizedException('Indentifaint invalid')
    }

    @Post('register')
    async register(@Body() userData: { email: string, password: string, firstName: string, lastName: string, phone: string }) {
        // Utilisez PrismaService pour enregistrer l'utilisateur
        const newUser = await this.prismaService.createUser(userData);
        return { message: 'Utilisateur enregistré avec succès' };
    }
}


@Controller('user')
export class UserProfileController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard) // Utilisez votre middleware d'authentification personnalisé
    @Get('profile')
    async getProfile(@Request() req) {
        // Récupérez l'ID de l'utilisateur à partir du middleware d'authentification
        const userId = req['userId'];

        // Utilisez le service pour récupérer les données de l'utilisateur
        const userProfile = await this.userService.getUserProfile(userId);

        if (!userProfile) {
            return { message: 'Utilisateur non trouvé' };
        }

        return userProfile;
    }


    @Put()
  update(@Body() user:User) {
    return this.userService.updateUserProfile(user)
  }


}

