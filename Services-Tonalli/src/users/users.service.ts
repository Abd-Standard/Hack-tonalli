import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  async addXP(userId: string, xp: number): Promise<User> {
    const user = await this.findById(userId);
    user.xp += xp;
    user.totalXp += xp;
    return this.userRepository.save(user);
  }

  async updateStreak(userId: string): Promise<User> {
    const user = await this.findById(userId);
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = user.lastActivityDate;

    if (lastActivity === today) {
      return user;
    }

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    if (lastActivity === yesterday) {
      user.currentStreak += 1;
    } else {
      user.currentStreak = 1;
    }

    user.lastActivityDate = today;
    return this.userRepository.save(user);
  }

  async setupUser(userId: string, companion: string, avatarType: string): Promise<User> {
    await this.userRepository.update(userId, {
      companion,
      avatarType,
      isFirstLogin: false,
    });
    return this.findById(userId);
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this.findById(userId);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      city: user.city,
      xp: user.xp,
      totalXp: user.totalXp,
      currentStreak: user.currentStreak,
      lastActivityDate: user.lastActivityDate,
      walletAddress: user.stellarPublicKey,
      character: user.character,
      isPremium: user.isPremium || false,
      subscriptionExpiry: user.subscriptionExpiry,
      isFirstLogin: user.isFirstLogin,
      companion: user.companion,
      avatarType: user.avatarType,
      createdAt: user.createdAt,
    };
  }

  async getRankings(): Promise<any[]> {
    const users = await this.userRepository.find({
      order: { totalXp: 'DESC' },
      take: 50,
    });

    return users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      displayName: user.displayName || user.username,
      city: user.city || 'Ciudad de México',
      xp: user.totalXp,
      streak: user.currentStreak,
      character: user.character || 'chima',
    }));
  }
}
