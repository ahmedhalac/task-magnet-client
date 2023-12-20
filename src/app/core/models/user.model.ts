export interface RegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  country: string;
  password: string;
}

export interface UserResponse {
  status: number;
  info: any;
  data: UserData;
  isValid: boolean;
}

export interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  refreshToken: string;
  refreshTokenExpireDate: Date;
  id: number;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}
