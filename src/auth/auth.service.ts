import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getJwtToken(user: UserDocument): Promise<string> {
    return this.jwtService.signAsync(user.toJSON());
  }
}
