import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.GetUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name, emails: user.email, phones: user.phone };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getUser(id: string): Promise<any> {
        const user = await this.usersService.GetUser(id);
        const resp = {
            sub: user.id,
            id: user.id,
            email: user.email,
            phone: user.phone,
        }
        return resp;
    }
}