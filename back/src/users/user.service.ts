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

    async updateUserProfile(user: User) {
        // Utilisez PrismaService ou votre propre logique pour mettre à jour les données de l'utilisateur
        return this.prisma.modifyUser(user)
    }
}
