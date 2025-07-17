import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Seraloka API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk aplikasi Seraloka',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            uuid: {
              type: 'string',
              format: 'uuid',
              description: 'UUID unik pengguna',
              example: 'some-uuid-string',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Alamat email pengguna',
              example: 'user@example.com',
            },
            password_hash: {
              type: 'string',
              description: 'Hash kata sandi pengguna',
              example: 'hashedpassword123',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              description: 'Peran pengguna',
              example: 'USER',
            },
            is_active: {
              type: 'boolean',
              description: 'Status aktif pengguna',
              example: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan pengguna',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembaruan terakhir pengguna',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Pesan kesalahan',
              example: 'Terjadi kesalahan internal server',
            },
          },
        },
        UserRegisterRequest: {
          type: 'object',
          required: [
            'email',
            'password',
          ],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email pengguna untuk pendaftaran',
              example: 'newuser@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Kata sandi pengguna untuk pendaftaran',
              example: 'securepassword',
            },
          },
        },
        UserLoginRequest: {
          type: 'object',
          required: [
            'email',
            'password',
          ],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email pengguna untuk login',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Kata sandi pengguna untuk login',
              example: 'password123',
            },
          },
        },
        UserRegisteredSuccess: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User registered successfully',
            },
          },
        },
        UserLoginSuccess: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Login successful',
            },
            token: {
              type: 'string',
              description: 'Token otentikasi JWT',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; 