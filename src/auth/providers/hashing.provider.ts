import { Injectable } from '@nestjs/common';

@Injectable()
// abstract bc we want to use it everywhere, we're going to have a concrete implementation in bcrypt provider
export abstract class HashingProvider {
  abstract hashPassword(data: string | Buffer): Promise<string>;

  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
