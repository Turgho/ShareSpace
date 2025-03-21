// users.interface.ts
export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    username: string;
    dateOfBirth: Date;
    phoneNumber: string;
    bio?: string | null;
    profilePicture?: string | null;
    coverPicture?: string | null;
    isVerified: boolean;
    status: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}  
