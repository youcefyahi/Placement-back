import { Injectable } from '@nestjs/common';
import { PrismaClient,User,Prisma } from '@prisma/client';



@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  

  async findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }


  async modifyUser(userId: number, userData: User): Promise<User> {
    return this.prisma.user.update({
      where: { id:userId },
      data: userData,
    });
  }

  async modifyPassword(email: string, password:string): Promise<User> {
    return this.prisma.user.update({
      where: { email },
      data: {password},
    });
  }
}
