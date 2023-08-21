import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        JwtModule.register({
            secret: 'RAMDOM_TOKEN_SECRET', // Utilisez la même clé secrète que pour la création de jeton
            signOptions: { expiresIn: '24h' },
        }),DatabaseModule
    ],
    controllers: [UserController],
    providers: [AuthService],
})
export class AppModule {}

