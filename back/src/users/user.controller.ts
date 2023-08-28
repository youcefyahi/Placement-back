import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../services/prisma.service';
import { AuthGuard } from '../middleware/auth.middleware';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';



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
        const saltOrRounds = 10; // Nombre de "salts" pour le hachage
        const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
        const newUser = await this.prismaService.createUser({
            ...userData,
            password: hashedPassword

        });
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

    @UseGuards(AuthGuard)
    @Put()
    async updateUser(@Request() req, @Body() userData: User) {

        const userId = req['userId'];
        const updatedUser = await this.userService.updateUserProfile(userId, userData);
        return updatedUser;
    }

    @Put('password')
    async updatePassword(@Body() userData: {
        email: string;
        password: string;
    }) {
        // Utilisez bcrypt pour hacher le nouveau mot de passe
        const saltOrRounds = 10; // Nombre de "salts" pour le hachage
        const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
        // Appelez la méthode pour mettre à jour le mot de passe dans le service approprié (par exemple, UserService)
        const updatedPassword = await this.userService.updatedPassword(userData.email, hashedPassword);
        return updatedPassword;
    }


}

