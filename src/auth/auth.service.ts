import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpPayload } from './payload/sign-up.payload';
import { BcryptPasswordService } from './bcrypt-password.service';
import { SignUpData } from './type/sign-up-data.type';
import { Tokens } from './type/tokens.type';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: BcryptPasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(payload: SignUpPayload): Promise<Tokens> {
    const user = await this.authRepository.getUserByEmail(payload.email);
    if (user) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }

    const category = await this.authRepository.getCategoryById(
      payload.categoryId,
    );
    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    if (payload.cityId) {
      const city = await this.authRepository.getCityById(payload.cityId);
      if (!city) {
        throw new NotFoundException('존재하지 않는 도시입니다.');
      }
    }

    const hashedPassword = await this.passwordService.getEncryptPassword(
      payload.password,
    );

    const inputData: SignUpData = {
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
      birthday: payload.birthday,
      categoryId: payload.categoryId,
      cityId: payload.cityId,
    };

    const createdUser = await this.authRepository.createUser(inputData);

    return this.tokenService.generateTokens({
      userId: createdUser.id,
    });
  }
}
