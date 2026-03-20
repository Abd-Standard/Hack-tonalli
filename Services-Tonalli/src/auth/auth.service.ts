import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { StellarService } from '../stellar/stellar.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly stellarService: StellarService,
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.usersService.findByEmail(dto.email);
    if (existingEmail) throw new ConflictException('Email already registered');

    const existingUsername = await this.usersService.findByUsername(
      dto.username,
    );
    if (existingUsername)
      throw new ConflictException('Username already taken');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const stellarKeypair = this.stellarService.createKeypair();

    const user = await this.usersService.create({
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
      displayName: dto.displayName || dto.username,
      city: dto.city || 'Ciudad de México',
      character: dto.character || 'chima',
      stellarPublicKey: stellarKeypair.publicKey,
      stellarSecretKey: stellarKeypair.secretKey,
      xp: 0,
      totalXp: 0,
      currentStreak: 0,
    });

    this.stellarService.fundWithFriendbot(stellarKeypair.publicKey).then(
      (result) => {
        if (result.success) {
          this.usersService.update(user.id, { isFunded: true });
        }
      },
    );

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        xp: user.xp,
        walletAddress: user.stellarPublicKey,
        character: user.character,
        role: user.role || 'user',
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        xp: user.xp,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        walletAddress: user.stellarPublicKey,
        character: user.character,
        role: user.role || 'user',
      },
    };
  }
}
