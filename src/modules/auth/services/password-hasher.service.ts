// password-hasher.service.ts
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

export interface PasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}

@Injectable()
export class PasswordHasherService implements PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    // Gera um salt para o hash da senha e retorna a senha com hash
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
