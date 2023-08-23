import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './services/prisma.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'RAMDOM_TOKEN_SECRET', // Utilisez la même clé secrète que pour la création de jeton
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [UserController],
    providers: [AuthService,PrismaService],
})
export class AppModule {}

