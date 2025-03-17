// src/modules/auth/services/password-comparer.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordComparer } from '../interfaces/password-comparer.interface';

@Injectable()
export class PasswordComparerService implements IPasswordComparer {
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
