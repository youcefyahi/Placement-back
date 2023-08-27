import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserProfileController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';




@Module({
    imports: [

        JwtModule.register({
            secret: 'RAMDOM_TOKEN_SECRET', // Utilisez la même clé secrète que pour la création de jeton
            signOptions: { expiresIn: '24h' },
        }),PassportModule
    ],
    controllers: [UserController,UserProfileController],
    providers: [AuthService, PrismaService,UserService], // Ajoutez votre contrôleur à la liste des contrôleurs du module
})
export class UserModule { }