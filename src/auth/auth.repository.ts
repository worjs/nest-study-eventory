import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserBaseInfo } from './type/user-base-info.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        birthday: true,
        categoryId: true,
        cityId: true,
      },
    });
  }
}
