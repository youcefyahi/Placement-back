import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(credentials: { email: string, password: string }) {
        const user = await this.validateUser(credentials);
        if (user) {
            const token = this.jwtService.sign({ userId: user.id });
            return token;
        }
        return null;
    }

    async validateUser(credentials: { email: string, password: string }) {
       
        return null;
    }
}
