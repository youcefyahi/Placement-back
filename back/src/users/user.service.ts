// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserProfile(userId: number) {
        // Utilisez PrismaService ou votre propre logique pour récupérer les données de l'utilisateur
        return this.prisma.findUserById(userId)
    }

    async updateUserProfile(userId: number, userData: User) {

        return this.prisma.modifyUser(userId, userData);
    }

    async updateUserPassword(email: string, password: string) {

        return this.prisma.modifyPassword(email, password);
    }
    
}
