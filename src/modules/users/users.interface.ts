// users.interface.ts
export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string | null;
    passwordHash: string;
    bio: string | null;
    profilePicture: string | null;
    coverPicture: string | null;
    isVerified: boolean;
    status: string;
    dateOfBirth: Date;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
