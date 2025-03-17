export interface IPasswordComparer {
    comparePasswords(password: string, hash: string): Promise<boolean>;
}
  