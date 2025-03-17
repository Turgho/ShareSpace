// src/modules/auth/services/password-hasher.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../interfaces/password-hasher.interface';

@Injectable()
export class PasswordHasherService implements IPasswordHasher {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
