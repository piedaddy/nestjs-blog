import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService)) // bc Users and Auth have a circular dependency
    private readonly usersService: UsersService,

    @Inject() // is it needed?
    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // find the user using email -> create method inside user service that will find by email
    // if found, compaure password to hashed password
    // if matched, sign in user
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      return;
    }
    let isEqual = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'could not compare passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('incorrect password');
    }

    return await this.generateTokensProvider.generateTokens(user);
    // const accessToken = await this.jwtService.signAsync(
    //   {
    //     sub: user.id,
    //     email: user.email,
    //   } as ActiveUserData,
    //   {
    //     audience: this.jwtConfiguration.audience,
    //     issuer: this.jwtConfiguration.issuer,
    //     secret: this.jwtConfiguration.secret,
    //     expiresIn: this.jwtConfiguration.accessTokenTtl,
    //   },
    // );
    // console.log('accessToken', accessToken);
    // return { accessToken };
  }
}
