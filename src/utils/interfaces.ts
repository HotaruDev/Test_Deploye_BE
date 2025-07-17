import { Model, Optional } from 'sequelize';

export interface UserAttributes {
  uuid: string;
  email: string;
  password: string; 
  is_verified: boolean;
  role: 'USER' | 'ADMIN';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'uuid' | 'is_verified' | 'is_active' | 'created_at' | 'updated_at'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export interface EmailVerificationTokenAttributes {
  id: number;
  user_uuid: string;
  token: string;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface EmailVerificationTokenCreationAttributes extends Optional<EmailVerificationTokenAttributes, 'id' | 'created_at' | 'updated_at'> {}

export interface EmailVerificationTokenInstance extends Model<EmailVerificationTokenAttributes, EmailVerificationTokenCreationAttributes>, EmailVerificationTokenAttributes {}