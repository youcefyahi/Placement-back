import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) { }

    async login(credentials: { email: string, password: string }) {
        const user = await this.validateUser(credentials);
        return user ?
            this.jwtService.sign({ userId: user.id }) : null;
    }

    async validateUser(credentials: { email: string, password: string }) {
        const user = await this.prisma.findUserByEmail(credentials.email);

        if (user && user.password === credentials.password) {
            return user;
        }

        return null; // Utilisateur non trouvé ou mot de passe incorrect
    }
}
