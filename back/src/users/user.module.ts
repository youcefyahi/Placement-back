import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from 'src/services/auth.service';
import { PrismaService } from 'src/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [UserModule,
        JwtModule.register({
            secret: 'RAMDOM_TOKEN_SECRET', // Utilisez la même clé secrète que pour la création de jeton
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [UserController],
    providers: [AuthService, PrismaService], // Ajoutez votre contrôleur à la liste des contrôleurs du module
})
export class UserModule { }