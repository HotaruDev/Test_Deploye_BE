import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';
import { EmailVerificationTokenAttributes, EmailVerificationTokenCreationAttributes } from '../utils/interfaces.js';

class EmailVerificationToken extends Model<EmailVerificationTokenAttributes, EmailVerificationTokenCreationAttributes> {
}

EmailVerificationToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'EmailVerificationTokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default EmailVerificationToken; 