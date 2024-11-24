import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,

    //common practice to have other guards inside main guard
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get all auth types from reflector class - using @Auth types as metadata

    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      // array of locations where get metadata from - on our class, classes and handlers/methods
      [
        context.getHandler(), // for handler or controller methods
        context.getClass(),
        // these will get all the keys of the type AUTH_TYPE_KEY in classes or methods
      ],
    ) ?? [AuthenticationGuard.defaultAuthType];
    // create an array of all guards - which would have guards for each of the auth types

    const guards = authTypes.map((type) => {
      return this.authTypeGuardMap[type];
    });

    // loop through each guard, fire canActivate on each instance
    for (const instance of guards) {
      const canActivate = await Promise.resolve(instance.canActivate(context));
      if (canActivate) {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}
