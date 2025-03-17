export interface IPasswordHasher {
    hashPassword(password: string): Promise<string>;
}